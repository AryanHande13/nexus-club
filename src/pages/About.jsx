import React from 'react';
import { Shield, BookOpen, Target, Navigation } from 'lucide-react';
import './Home.css'; // Reuse styles

const About = () => {
  return (
    <div className="home-page" style={{ paddingTop: '100px' }}>
      <section className="section text-center">
        <div className="container">
          <h1 className="hero-title text-gold" style={{ fontSize: '48px' }}>
            ABOUT NEXUS
          </h1>
          <div className="gold-accent mx-auto"></div>
          <p className="hero-subtitle text-white" style={{ marginBottom: '40px' }}>The Philosophy of Power</p>
          
          <div className="premium-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
            <p className="text-gray" style={{ fontSize: '18px', marginBottom: '20px' }}>
              Nexus Elite Club is not merely an association; it is a meticulously engineered global power network. 
              Founded on the principles of capital velocity and strategic influence, we exist to connect the world's 
              most consequential individuals.
            </p>
            <p className="text-gray" style={{ fontSize: '18px' }}>
              Whether securing a private deal room in Geneva, accessing untethered investment platforms, 
              or forging generational alliances, Nexus guarantees absolute confidentiality and unprecedented access.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-green text-center">
        <div className="container">
          <h2 className="section-title text-white">The Four Pillars</h2>
          <div className="gold-accent mx-auto"></div>
          
          <div className="features-grid">
            <div className="feature-card">
              <Shield className="feature-icon text-gold" size={48} />
              <h3>Absolute Secrecy</h3>
              <p>Your transactions and conversations remain untraceable and fully encrypted.</p>
            </div>
            <div className="feature-card">
              <Target className="feature-icon text-gold" size={48} />
              <h3>Direct Access</h3>
              <p>Bypass the gatekeepers. We negotiate directly at the highest levels of global commerce.</p>
            </div>
            <div className="feature-card">
              <BookOpen className="feature-icon text-gold" size={48} />
              <h3>Curated Intelligence</h3>
              <p>Insights derived from our private counsel of global industry leaders.</p>
            </div>
            <div className="feature-card">
              <Navigation className="feature-icon text-gold" size={48} />
              <h3>Global Ecosystem</h3>
              <p>12 Hubs. 1 Interface. From Singapore to Zurich, operate everywhere.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
