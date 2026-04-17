import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Apply = () => {
  const query = new URLSearchParams(useLocation().search);
  const tierFromUrl = query.get('tier') || '';

  const [formData, setFormData] = useState({
    fullName: '', email: '', mobile: '', country: '', 
    companyName: '', turnover: '', linkedin: '', 
    membershipType: 'Individual', tierSelection: tierFromUrl || 'Millionaire'
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if(response.ok) {
        setStatus('Application submitted successfully. Under review by our committee.');
        // Reset form
        setFormData({fullName: '', email: '', mobile: '', country: '', companyName: '', turnover: '', linkedin: '', membershipType: 'Individual', tierSelection: 'Millionaire'});
      } else {
        setStatus(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('Failed to connect to the secure server.');
    }
  };

  return (
    <div className="home-page" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="premium-card text-center" style={{ borderTop: '4px solid var(--color-gold)' }}>
          <h1 className="hero-title text-gold" style={{ fontSize: '32px' }}>Request Invitation</h1>
          <p className="text-gray" style={{ marginBottom: '30px' }}>Please complete the form below to initiate your application process.</p>
          
          {status && <div style={{ padding: '15px', border: '1px solid var(--color-gold)', color: 'var(--color-gold)', marginBottom: '20px' }}>{status}</div>}

          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label">Country of Residence</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} className="form-control" required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Company Name / Affiliation</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="form-control" required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Annual Income / Turnover (USD)</label>
                <input type="text" name="turnover" value={formData.turnover} onChange={handleChange} className="form-control" placeholder="e.g. $5M+" required />
              </div>
              <div className="form-group">
                <label className="form-label">LinkedIn Profile URL</label>
                <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} className="form-control" required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Membership Type</label>
                <select name="membershipType" value={formData.membershipType} onChange={handleChange} className="form-control" required>
                  <option value="Individual">Individual</option>
                  <option value="Couple">Couple</option>
                  <option value="Family">Family / House</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tier Selection</label>
                <select name="tierSelection" value={formData.tierSelection} onChange={handleChange} className="form-control" required>
                  <option value="Millionaire">Millionaire Membership</option>
                  <option value="Billionaire">Billionaire Circle</option>
                </select>
              </div>
            </div>

            <div className="form-group">
               <label className="form-label text-gray" style={{ fontSize: '12px' }}>Due to absolute privacy, Upload Documents (ID Proof & Business Proof) will be requested via secure link after initial vetting.</label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px', padding: '18px' }}>Submit Application for Review</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Apply;
