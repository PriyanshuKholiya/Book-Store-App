import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          <span role="img" aria-label="books" style={{ marginRight: 6 }}>📚</span>
          <strong>Book Store</strong> by Priyanshu Kholiya &copy; {new Date().getFullYear()}<br />
          <span style={{ fontSize: '0.95em', color: '#bbb' }}>All rights reserved.</span>
        </p>
        <ul className="footer-links" style={{ listStyle: 'none', padding: 0, margin: '1rem 0', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <li><Link to="/about" aria-label="About Us">About Us</Link></li>
          <li><Link to="/contact" aria-label="Contact">Contact</Link></li>
          <li><Link to="/privacy" aria-label="Privacy Policy">Privacy Policy</Link></li>
          <li><Link to="/terms" aria-label="Terms of Service">Terms of Service</Link></li>
        </ul>
        <div className="social-media" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '0.5rem' }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" style={{ width: 28, height: 28, filter: 'invert(30%) sepia(100%) saturate(500%) hue-rotate(190deg)' }} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg" alt="Twitter" style={{ width: 28, height: 28, filter: 'invert(30%) sepia(100%) saturate(500%) hue-rotate(190deg)' }} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" style={{ width: 28, height: 28, filter: 'invert(30%) sepia(100%) saturate(500%) hue-rotate(290deg)' }} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;