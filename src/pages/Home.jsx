import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Users, Briefcase, Award, ArrowRight, Activity, Zap, Monitor } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content text-center">
          <img src="/logo.png" alt="Nexus Logo" className="hero-logo animate-fade-in" />
          <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.2s' }}>
            NEXUS <br/> <span className="gold-gradient-text">ELITE CLUB</span>
          </h1>
          <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.4s' }}>
            WHERE CAPITAL MEETS INFLUENCE
          </p>
          <div className="gold-accent mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}></div>
          <p className="hero-description animate-fade-in" style={{ animationDelay: '0.6s' }}>
            A private global ecosystem of<br />
            Entrepreneurs • Investors • Visionaries
          </p>
          <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Link to="/apply" className="btn btn-primary">Apply For Membership</Link>
          </div>
        </div>
      </section>

      {/* Global Access Section */}
      <section className="section section-dark text-center">
        <div className="container">
          <h2 className="section-title">Global Membership Access</h2>
          <div className="gold-accent mx-auto"></div>
          
          <div className="features-grid">
            <div className="feature-card premium-card">
              <Globe className="feature-icon text-gold" size={48} />
              <h3>12 International Destinations</h3>
              <p>Exclusive access to our global network of venues.</p>
            </div>
            <div className="feature-card premium-card">
              <Briefcase className="feature-icon text-gold" size={48} />
              <h3>Private Deal Rooms</h3>
              <p>Confidential spaces for high-level business transactions.</p>
            </div>
            <div className="feature-card premium-card">
              <Users className="feature-icon text-gold" size={48} />
              <h3>Luxury Networking</h3>
              <p>Connect with the world's most influential minds.</p>
            </div>
            <div className="feature-card premium-card">
              <Activity className="feature-icon text-gold" size={48} />
              <h3>Investment Platforms</h3>
              <p>Direct opportunities via our curated investment deals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Event Banner */}
      <section className="event-banner">
        <div className="container text-center">
          <h3 className="gold-gradient-text">🏔️ FLAGSHIP EVENT</h3>
          <h2>NEXUS ELITE GLOBAL SUMMIT</h2>
          <p className="event-location">SWITZERLAND</p>
          <Link to="/events" className="btn btn-outline" style={{ marginTop: '20px' }}>
            Explore Calendar <ArrowRight size={16} style={{ marginLeft: '10px' }} />
          </Link>
        </div>
      </section>

      {/* Tiers Summary */}
      <section className="section section-green text-center">
        <div className="container">
          <h2 className="section-title text-white">Membership Tiers</h2>
          <div className="gold-accent mx-auto"></div>
          
          <div className="tiers-preview-grid">
            <div className="tier-preview premium-card">
              <Award className="tier-icon text-gold" size={40} />
              <h3>Millionaire</h3>
              <p className="text-gray">Entry into Global Ecosystem</p>
              <Link to="/membership" className="tier-link">View Benefits</Link>
            </div>
            <div className="tier-preview premium-card border-gold">
              <Award className="tier-icon text-gold" size={40} />
              <h3 className="gold-gradient-text">Billionaire</h3>
              <p className="text-gray">Priority Global Networking</p>
              <Link to="/membership" className="tier-link">View Benefits</Link>
            </div>
            <div className="tier-preview premium-card">
              <Award className="tier-icon text-gold" size={40} />
              <h3>Trillionaire</h3>
              <p className="text-gray">Entry by Invitation Only</p>
              <Link to="/membership" className="tier-link">View Benefits</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Ecosystem */}
      <section className="section section-dark text-center">
        <div className="container">
           <Zap className="text-gold mx-auto" size={40} style={{ marginBottom: '20px' }} />
           <h2 className="section-title">Digital Ecosystem</h2>
           <p className="text-gray" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>Powered by OMNEX</p>
           <p style={{ marginTop: '20px', fontSize: '18px' }}>(Token • Credits • Global Utility)</p>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="footer-cta" style={{ borderTop: '1px solid rgba(207, 168, 97, 0.2)' }}>
        <div className="container text-center section">
          <h2 className="gold-gradient-text">Not a Club. A Global Power Network.</h2>
          <p className="text-gray" style={{ marginBottom: '40px', marginTop: '20px' }}>⚠️ LIMITED FOUNDING MEMBERSHIP (First 100–300 Members Worldwide)</p>
          <Link to="/apply" className="btn btn-primary pulse-btn">Request Invitation</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
