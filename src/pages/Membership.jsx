import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Shield, Users, Globe } from 'lucide-react';
import './Membership.css';

const Membership = () => {
  return (
    <div className="membership-page">
      {/* Header */}
      <section className="membership-header">
        <div className="container text-center">
          <h1 className="hero-title animate-fade-in text-gold">MEMBERSHIP</h1>
          <div className="gold-accent mx-auto"></div>
          <p className="hero-subtitle text-white">Join the global elite</p>
        </div>
      </section>

      {/* Intro Text */}
      <section className="section section-dark text-center" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
         <div className="container">
           <p className="text-gray" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '18px' }}>
             Nexus Elite Club membership is highly curated. We bring together a private global ecosystem 
             of entrepreneurs, investors, and visionaries. Membership is divided into distinct tiers 
             designed for the level of global access and influence you require.
           </p>
         </div>
      </section>

      {/* Pricing/Tiers */}
      <section className="section section-green" id="tiers">
        <div className="container">
          <div className="pricing-grid">
            
            {/* Millionaire Tier */}
            <div className="pricing-card premium-card">
              <div className="card-header">
                <h2>MILLIONAIRE<br/>MEMBERSHIP</h2>
                <div className="price-tag">
                  <span className="currency">₹</span>
                  <span className="amount">10L+</span>
                  <span className="period">/ year</span>
                </div>
                <p className="lifetime-fee">Lifetime: ₹1 Crore+</p>
              </div>
              <ul className="benefits-list">
                <li><Check size={20} className="text-gold" /> Access to 4–6 Global Events</li>
                <li><Check size={20} className="text-gold" /> Business Networking Rooms</li>
                <li><Check size={20} className="text-gold" /> Investor Rooms Access</li>
                <li><Check size={20} className="text-gold" /> Entry into Global Ecosystem</li>
                <li><Check size={20} className="text-gold" /> Premium Metal Card (Bronze/Silver/Gold)</li>
              </ul>
              <div className="card-footer">
                <Link to="/apply?tier=millionaire" className="btn btn-outline w-100 text-center">Apply Now</Link>
              </div>
            </div>

            {/* Billionaire Tier */}
            <div className="pricing-card premium-card highlighted-card">
              <div className="popular-badge">MOST EXCLUSIVE</div>
              <div className="card-header">
                <h2 className="gold-gradient-text">BILLIONAIRE<br/>CIRCLE</h2>
                <div className="price-tag">
                  <span className="currency text-gold">₹</span>
                  <span className="amount text-gold">25L+</span>
                  <span className="period">/ year</span>
                </div>
                <p className="lifetime-fee text-gold">Lifetime: ₹2–5 Crore+</p>
              </div>
              <ul className="benefits-list">
                <li><Check size={20} className="text-gold" /> 8–10 Global Events Access</li>
                <li><Check size={20} className="text-gold" /> Private Deal Rooms</li>
                <li><Check size={20} className="text-gold" /> Speaker & Investment Access</li>
                <li><Check size={20} className="text-gold" /> Priority Global Networking</li>
                <li><Check size={20} className="text-gold" /> Platinum Metal Card</li>
              </ul>
              <div className="card-footer">
                <Link to="/apply?tier=billionaire" className="btn btn-primary w-100 text-center">Apply Now</Link>
              </div>
            </div>

            {/* Trillionaire Tier */}
            <div className="pricing-card premium-card invite-only-card">
              <div className="card-header">
                <h2>TRILLIONAIRE<br/>COUNCIL</h2>
                <div className="price-tag">
                  <span className="amount" style={{ fontSize: '28px' }}>INVITE ONLY</span>
                </div>
                <p className="lifetime-fee">Exclusive Council</p>
              </div>
              <ul className="benefits-list">
                <li><Check size={20} className="text-gold" /> Unlimited Global Access</li>
                <li><Check size={20} className="text-gold" /> Closed-Door Strategic Meetings</li>
                <li><Check size={20} className="text-gold" /> Direct Global Investment Opportunities</li>
                <li><Check size={20} className="text-gold" /> Policy & Influence Network</li>
                <li><Check size={20} className="text-gold" /> Black Metal Identity Card</li>
              </ul>
              <div className="card-footer">
                <button className="btn btn-outline w-100 text-center" disabled style={{ cursor: 'not-allowed', opacity: 0.5 }}>Invitation Only</button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Membership Types & Process */}
      <section className="section section-dark">
        <div className="container">
          <div className="split-layout">
            
            <div className="info-block">
              <h3 className="gold-gradient-text" style={{ fontSize: '24px', marginBottom: '20px' }}>MEMBERSHIP TYPES</h3>
              <ul className="type-list">
                <li>
                  <Users className="text-gold" size={24} />
                  <div>
                    <h4>Individual</h4>
                    <p>For standalone visionaries and entrepreneurs.</p>
                  </div>
                </li>
                <li>
                  <Users className="text-gold" size={24} />
                  <div>
                    <h4>Couple</h4>
                    <p>Shared access for power couples.</p>
                  </div>
                </li>
                <li>
                  <Users className="text-gold" size={24} />
                  <div>
                    <h4>Family / House</h4>
                    <p>Generational access and legacy building.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="info-block">
              <h3 className="gold-gradient-text" style={{ fontSize: '24px', marginBottom: '20px' }}>APPROVAL PROCESS</h3>
              <div className="process-timeline">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Apply</h4>
                    <p>Submit your application and documentation.</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Verify & Approve</h4>
                    <p>Our committee reviews your profile and influence.</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Full Payment</h4>
                    <p>Complete your membership dues via secure gateway.</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Activation</h4>
                    <p>Receive your metal card, dashboard access, and global calendar.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* Cards Section */}
      <section className="section text-center" style={{ background: 'linear-gradient(to bottom, var(--color-black), var(--color-green))' }}>
         <div className="container">
            <Shield className="text-gold mx-auto" size={48} style={{ marginBottom: '20px' }} />
            <h2 className="section-title text-white">Premium Metal Cards</h2>
            <div className="gold-accent mx-auto"></div>
            <p className="text-gray" style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px' }}>
              Your physical and digital identity access to our global ecosystem.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginTop: '30px' }}>
               <span style={{ color: '#CD7F32', fontWeight: 'bold', fontSize: '20px', letterSpacing: '2px' }}>BRONZE</span> • 
               <span style={{ color: '#C0C0C0', fontWeight: 'bold', fontSize: '20px', letterSpacing: '2px' }}>SILVER</span> • 
               <span style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '20px', letterSpacing: '2px' }}>GOLD</span> • 
               <span style={{ color: '#E5E4E2', fontWeight: 'bold', fontSize: '20px', letterSpacing: '2px' }}>PLATINUM</span> • 
               <span style={{ color: '#000000', textShadow: '0 0 2px rgba(255,255,255,0.5)', fontWeight: 'bold', fontSize: '20px', letterSpacing: '2px' }}>BLACK</span>
            </div>
         </div>
      </section>

    </div>
  );
};

export default Membership;
