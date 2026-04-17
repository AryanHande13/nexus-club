import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('nexus_token');
    const user = JSON.parse(localStorage.getItem('nexus_user') || '{}');
    
    if (!token || user.role !== 'admin') {
      navigate('/login');
    } else {
      fetchApplications();
    }
  }, [navigate]);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/applications`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('nexus_token')}` }
      });
      if(response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch(err) {
      console.error(err);
    }
  };

  const approveApplication = async (id, email) => {
    try {
       // First mark as approved
       await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/applications/${id}/approve`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('nexus_token')}` }
       });
       
       // Simulate Payment Link Setup Email
       alert(`Application approved. Payment link email simulating to ${email}...`);
       fetchApplications();
    } catch (err) { }
  }

  return (
    <div className="home-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container" style={{ paddingBottom: '100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 className="text-gold" style={{ fontSize: '32px' }}>Admin Command Center</h1>
          <button className="btn btn-outline" onClick={() => { localStorage.clear(); navigate('/login'); }}>Secure Logout</button>
        </div>

        <div className="premium-card">
          <h3 className="text-white" style={{ marginBottom: '20px' }}>Pending Applications</h3>
          {applications.length === 0 ? <p className="text-gray">No new applications.</p> : (
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-gold)' }}>
                  <th style={{ padding: '10px' }}>Name</th>
                  <th style={{ padding: '10px' }}>Company & Turnover</th>
                  <th style={{ padding: '10px' }}>Tier Requested</th>
                  <th style={{ padding: '10px' }}>Status</th>
                  <th style={{ padding: '10px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <td style={{ padding: '15px 10px', color: 'var(--color-white)' }}>{app.fullName}<br/><span className="text-gray" style={{ fontSize: '12px' }}>{app.email}</span></td>
                    <td style={{ padding: '15px 10px', color: 'var(--color-gray)' }}>{app.companyName}<br/>{app.turnover}</td>
                    <td style={{ padding: '15px 10px', color: 'var(--color-gold)' }}>{app.tierSelection}</td>
                    <td style={{ padding: '15px 10px' }}>
                       <span style={{ padding: '5px 10px', background: app.status === 'Pending' ? 'rgba(255,255,0,0.1)' : 'rgba(0,255,0,0.1)', color: app.status === 'Pending' ? 'yellow' : 'lime', borderRadius: '4px', fontSize: '12px' }}>{app.status}</span>
                    </td>
                    <td style={{ padding: '15px 10px' }}>
                      {app.status === 'Pending' && (
                        <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '10px' }} onClick={() => approveApplication(app.id, app.email)}>Approve & Request Payment</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
