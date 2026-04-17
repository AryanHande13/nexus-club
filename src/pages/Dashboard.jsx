import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, CreditCard, Calendar } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('nexus_token');
    const userData = localStorage.getItem('nexus_user');
    
    if (!token || !userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  if (!user) return <div className="home-page" style={{ paddingTop: '100px', textAlign: 'center' }}>Loading Vault...</div>;

  return (
    <div className="home-page" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--color-black)' }}>
      <div className="container" style={{ paddingBottom: '100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid rgba(207, 168, 97, 0.2)', paddingBottom: '20px' }}>
          <div>
            <h1 className="text-white" style={{ fontSize: '32px' }}>Welcome, {user.fullName}</h1>
            <p className="text-gold" style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px' }}>{user.tier} Member</p>
          </div>
          <button className="btn btn-outline" onClick={() => { localStorage.clear(); navigate('/login'); }}>Secure Logout</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          <div className="premium-card">
            <User className="text-gold" size={32} style={{ marginBottom: '20px' }} />
            <h3 className="text-white" style={{ marginBottom: '10px' }}>Profile Information</h3>
            <p className="text-gray" style={{ marginBottom: '5px' }}>Email: {user.email}</p>
            <p className="text-gray" style={{ marginBottom: '5px' }}>Status: <span style={{ color: 'var(--color-gold)' }}>Active</span></p>
            <button className="text-gold" style={{ background: 'none', border: 'none', textDecoration: 'underline', marginTop: '15px', cursor: 'pointer' }}>Edit Profile Setup</button>
          </div>

          <div className="premium-card">
            <Shield className="text-gold" size={32} style={{ marginBottom: '20px' }} />
            <h3 className="text-white" style={{ marginBottom: '10px' }}>Digital Identity</h3>
            <div style={{ padding: '20px', background: 'var(--color-black-light)', border: '1px solid var(--color-gold)', borderRadius: '10px', textAlign: 'center', margin: '20px 0' }}>
               <h4 className="text-gold" style={{ letterSpacing: '4px' }}>NEXUS {user.tier.toUpperCase()}</h4>
               <p style={{ marginTop: '10px', fontSize: '12px', letterSpacing: '2px', color: 'var(--color-gray)' }}>NO: 000{user.id || '245'}</p>
            </div>
          </div>

          <div className="premium-card" style={{ gridColumn: '1 / -1' }}>
            <Calendar className="text-gold" size={32} style={{ marginBottom: '20px' }} />
            <h3 className="text-white" style={{ marginBottom: '10px' }}>Your Upcoming Approved Events</h3>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '10px 0', color: 'var(--color-gold)' }}>Event</th>
                  <th style={{ padding: '10px 0', color: 'var(--color-gold)' }}>Date</th>
                  <th style={{ padding: '10px 0', color: 'var(--color-gold)' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '15px 0', color: 'var(--color-gray)' }}>NEXUS ELITE GLOBAL SUMMIT (Zurich)</td>
                  <td style={{ padding: '15px 0', color: 'var(--color-gray)' }}>August 15-18, 2026</td>
                  <td style={{ padding: '15px 0', color: '#00cc66' }}>Approved / VIP Access</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
