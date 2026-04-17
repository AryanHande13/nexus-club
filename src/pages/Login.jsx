import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if(response.ok) {
        localStorage.setItem('nexus_token', data.token);
        localStorage.setItem('nexus_user', JSON.stringify(data.user));
        
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch(err) {
      setError('Secure server connection failed');
    }
  };

  return (
    <div className="home-page" style={{ paddingTop: '150px', paddingBottom: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="premium-card text-center" style={{ width: '100%', maxWidth: '450px' }}>
        <img src="/logo.png" alt="Logo" style={{ width: '60px', marginBottom: '20px' }} />
        <h2 className="text-gold" style={{ marginBottom: '30px', letterSpacing: '4px' }}>MEMBER PORTAL</h2>
        
        {error && <div style={{ color: 'red', border: '1px solid red', padding: '10px', marginBottom: '20px', background: 'rgba(255,0,0,0.1)' }}>{error}</div>}

        <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
          <div className="form-group">
            <label className="form-label">Registered Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" required />
          </div>
          <div className="form-group">
            <label className="form-label">Vault Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>Access Portal</button>
        </form>
        <p className="text-gray" style={{ marginTop: '20px', fontSize: '12px' }}>
          <a href="#" style={{ textDecoration: 'underline' }}>Forgot Vault Password?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
