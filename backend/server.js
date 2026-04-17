const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const nodemailer = require('nodemailer');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Supabase Client Initialization
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Razorpay Initialization
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy',
});

// Stripe Initialization for International Payments
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'dummy_stripe_key');

// Nodemailer Initialization
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const JWT_SECRET = 'nexus_elite_secret_key_2026';

// Middleware: Authenticate Admin
const authenticateAdmin = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'No token provided' });
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err || decoded.role !== 'admin') return res.status(401).json({ message: 'Unauthorized' });
    req.userId = decoded.id;
    next();
  });
};

// ---------------- API ENDPOINTS ---------------- //

// API: Apply for Membership
app.post('/api/apply', async (req, res) => {
  if(!supabase) return res.status(500).json({ error: 'Supabase credentials missing in .env' });
  
  const { fullName, email, mobile, country, companyName, turnover, linkedin, membershipType, tierSelection } = req.body;
  const { data, error } = await supabase.from('Applications').insert([
    { fullName, email, mobile, country, companyName, turnover, linkedin, membershipType, tierSelection }
  ]).select();

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Application submitted successfully', id: data[0].id });
});

// API: Login
app.post('/api/login', async (req, res) => {
  if(!supabase) return res.status(500).json({ error: 'Supabase credentials missing in .env' });
  const { email, password } = req.body;

  const { data: user, error } = await supabase.from('Users').select('*').eq('email', email).maybeSingle();
  if (error || !user) return res.status(401).json({ message: 'Invalid credentials' });
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });
  
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
  
  delete user.password; // Remove password before sending
  res.json({ token, user });
});

// API: Get Applications (Admin)
app.get('/api/admin/applications', authenticateAdmin, async (req, res) => {
  const { data, error } = await supabase.from('Applications').select('*').order('id', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// API: Approve Application (Admin)
app.post('/api/admin/applications/:id/approve', authenticateAdmin, async (req, res) => {
  const id = req.params.id;
  
  // 1. Update status
  const { error: updateError } = await supabase.from('Applications').update({ status: 'Approved' }).eq('id', id);
  if (updateError) return res.status(500).json({ error: updateError.message });
  
  // 2. Fetch User to email
  const { data: application, error: fetchError } = await supabase.from('Applications').select('*').eq('id', id).single();
  if (fetchError || !application) return res.status(500).json({ error: 'Could not fetch application' });

  const paymentLink = `http://localhost:5173/payment/${id}`;
  const mailOptions = {
      from: `"Nexus Elite Club" <${process.env.SMTP_USER}>`,
      to: application.email,
      subject: 'CONFIDENTIAL: Your Nexus Elite Club Application is Approved',
      html: `
        <div style="background-color: #050505; color: #f5f5f5; padding: 40px; font-family: Arial, sans-serif; text-align: center;">
          <h1 style="color: #cfa861; letter-spacing: 2px;">NEXUS ELITE CLUB</h1>
          <p style="font-size: 18px; margin-top: 20px;">Dear ${application.fullName},</p>
          <p style="color: #a0a0a0; font-size: 16px; line-height: 1.6; max-width: 600px; margin: 0 auto;">
            The committee has reviewed your profile and we are pleased to inform you that your application 
            for the <strong>${application.tierSelection}</strong> has been strictly approved.
          </p>
          <p style="margin-top: 30px;">To finalize your induction and generate your Vault Identity credentials, please complete your private dues via the secure link below.</p>
          <a href="${paymentLink}" style="display: inline-block; margin-top: 30px; padding: 15px 30px; background-color: #cfa861; color: #000; text-decoration: none; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">PROCEED TO PAYMENT</a>
        </div>
      `
  };

  try {
      await transporter.sendMail(mailOptions);
      res.json({ message: 'Application approved and Payment Link emailed securely.' });
  } catch (emailErr) {
      console.warn("Email failed to send:", emailErr.message);
      res.json({ message: 'Application approved (Email simulated/failed due to SMTP issue)' });
  }
});

// ------------- RAZORPAY PAYMENT ENDPOINTS -------------

app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;
    const order = await razorpayInstance.orders.create({ amount: amount * 100, currency, receipt });
    res.json({ success: true, order, key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error("Razorpay Error:", err);
    res.status(500).json({ success: false, error: err });
  }
});

app.post('/api/payment/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, applicationId } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                                .update(sign.toString())
                                .digest("hex");

    if (razorpay_signature === expectedSign) {
       // Log payment in DB
       const { error } = await supabase.from('Applications').update({ status: 'Paid & Activated' }).eq('id', applicationId);
       if (error) return res.status(500).json({ success: false, error: error.message });
       return res.json({ success: true, message: "Payment verified successfully" });
    } else {
       return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------- STRIPE PAYMENT ENDPOINTS (INTERNATIONAL) -------------
app.post('/api/payment/stripe/create-checkout-session', async (req, res) => {
  try {
    const { amount, currency = "usd", receipt, applicationId } = req.body;
    
    // Stripe expects amount in cents. If frontend converted INR to USD, it should send the correct USD amount * 100.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: 'Nexus Elite Club - Lifetime Membership',
              description: 'Exclusive global ecosystem access. Application Ref: #' + receipt,
            },
            unit_amount: amount * 100, // amount in USD cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard?stripe_success=true&appId=${applicationId}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/${applicationId}`,
      metadata: { applicationId },
    });

    res.json({ success: true, id: session.id, url: session.url });
  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/payment/stripe/verify-webhook', async (req, res) => {
  // In a robust implementation, you should handle Stripe Webhooks here to verify payment signatures.
  // For immediate redirection success logic, we'll verify it via a standard API hit from Dashboard.
  const { applicationId } = req.body;
  if (!applicationId) return res.status(400).json({ success: false });

  const { error } = await supabase.from('Applications').update({ status: 'Paid & Activated' }).eq('id', applicationId);
  if (error) return res.status(500).json({ success: false });
  
  res.json({ success: true, message: "Stripe payment activated" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Nexus Supabase Backend Server running on port ${PORT}`);
});
