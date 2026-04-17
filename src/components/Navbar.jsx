import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css'; // I will create this

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Membership', path: '/membership' },
    { name: 'Events', path: '/events' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="nav-logo" onClick={() => setMobileMenuOpen(false)}>
          <img src="/logo.png" alt="Nexus Logo" className="logo-img" />
          <div className="logo-text">
            <h1>NEXUS</h1>
            <span>Elite Club</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="nav-links desktop-menu">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                to={link.path} 
                className={location.pathname === link.path ? 'active' : ''}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/apply" className="btn btn-primary nav-btn">Apply Now</Link>
          </li>
          <li>
            <Link to="/login" className="btn btn-outline nav-btn">Login</Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} color="#cfa861" /> : <Menu size={28} color="#cfa861" />}
        </button>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="mobile-menu animate-fade-in">
            <ul className="mobile-nav-links">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    onClick={() => setMobileMenuOpen(false)}
                    className={location.pathname === link.path ? 'active' : ''}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/apply" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Apply Now</Link>
              </li>
              <li>
                <Link to="/login" className="btn btn-outline" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
