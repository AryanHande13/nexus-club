import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Payment = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Load Razorpay Script dynamically
    const loadRazorpay = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    setStatus('Initializing secure gateway...');

    // Sandbox Limit: Razorpay test mode limits single transactions to 5 Lakhs maximum.
    // For this dummy simulation, we will send 1 Lakh (100,000) to bypass the Test Error, 
    // while keeping the UI visually displaying 10 Lakhs.
    const feeAmount = 100000; 

    try {
      // 1. Create Order on Backend
      const orderRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: feeAmount, receipt: `rcpt_${applicationId}` })
      });
      const orderData = await orderRes.json();

      if (!orderData.success) {
        setStatus(`Failed to initiate order. Trace: ${orderData.error ? JSON.stringify(orderData.error) : 'Invalid Razorpay Configurations!'}`);
        setLoading(false);
        return;
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: orderData.key, // Dynamically mapped from your live .env configured key!
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Nexus Elite Club',
        description: 'Annual Membership Fee',
        image: '/logo.png',
        order_id: orderData.order.id,
        handler: async function (response) {
          // 3. Verify Payment
          setStatus('Payment processing... verifying signature.');
          const verifyRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              applicationId
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
             setStatus('✅ Payment Complete. Your Account is now Activated.');
             setTimeout(() => navigate('/login'), 3000);
          } else {
             setStatus('❌ Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: 'Elite Member',
          email: 'member@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#cfa861' // Nexus Gold
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        setStatus(`Payment Failed: ${response.error.description}`);
      });
      rzp.open();
      setLoading(false);

    } catch (err) {
      setStatus(`Error: ${err.message}`);
      setLoading(false);
    }
  };

  const handleStripePayment = async () => {
    setLoading(true);
    setStatus('Initializing Stripe global gateway...');
    const feeAmountUSD = 10000; // Mock USD 10,000 for $1M tier approx (test limits)

    try {
      const orderRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/payment/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: feeAmountUSD, currency: 'usd', receipt: `rcpt_${applicationId}`, applicationId })
      });
      const orderData = await orderRes.json();

      if (!orderData.success) {
        setStatus(`Failed to initiate Stripe order. Trace: ${orderData.error ? JSON.stringify(orderData.error) : 'Invalid Stripe Configurations!'}`);
        setLoading(false);
        return;
      }
      
      // Redirect directly to the Stripe-hosted checkout page
      window.location.href = orderData.url;
    } catch (err) {
      setStatus(`Stripe Error: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="home-page" style={{ paddingTop: '150px', paddingBottom: '100px', display: 'flex', justifyContent: 'center' }}>
      <div className="premium-card text-center" style={{ width: '100%', maxWidth: '600px', borderTop: '4px solid var(--color-gold)' }}>
        <Shield className="text-gold mx-auto" size={48} style={{ marginBottom: '20px' }} />
        <h2 className="text-white" style={{ letterSpacing: '2px', marginBottom: '10px' }}>SECURE PAYMENT GATEWAY</h2>
        <p className="text-gray" style={{ marginBottom: '30px' }}>Complete your induction. Application Ref: #{applicationId}</p>

        <div style={{ background: 'var(--color-black)', padding: '20px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '30px', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span className="text-white">Millionaire Membership (Annual)</span>
            <span className="text-gold">₹10,00,000</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', marginTop: '10px' }}>
            <span className="text-gray" style={{ fontSize: '12px' }}>Taxes included (assuming local rules)</span>
            <span className="text-white" style={{ fontWeight: 'bold' }}>Total: ₹10,00,000</span>
          </div>
        </div>

        {status && <div style={{ color: 'var(--color-gold)', marginBottom: '20px', padding: '10px', border: '1px solid var(--color-gold)' }}>{status}</div>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button 
            className="btn btn-primary" 
            onClick={handlePayment} 
            disabled={loading}
            style={{ width: '100%', padding: '16px', fontSize: '16px' }}
          >
            {loading ? 'Initializing...' : 'Proceed to Pay (Domestic / Razorpay)'}
          </button>
          
          <button 
            onClick={handleStripePayment} 
            disabled={loading}
            style={{ width: '100%', padding: '16px', fontSize: '16px', backgroundColor: '#635BFF', color: 'white', border: 'none', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Cinzel' }}
          >
            {loading ? 'Initializing...' : 'Pay International (Stripe)'}
          </button>
        </div>
        
        <p className="text-gray" style={{ marginTop: '20px', fontSize: '12px' }}>Powered by Razorpay & Stripe Secure Pipelines.</p>
      </div>
    </div>
  );
};

export default Payment;
