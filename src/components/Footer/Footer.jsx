import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <NavLink to="/" className="logo">
              Corcoran<span>Reunion</span>
            </NavLink>
            <p className="footer-subtitle">Celebrating Family Since Sometime in the 1980s</p>
          </div>
          <div className="footer-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/photos">Photos</NavLink>
            <NavLink to="/reunion-details">Reunion Details</NavLink>
            <NavLink to="/family-tree">Family Tree</NavLink>
            <NavLink to="/donate">Donate</NavLink>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Corcoran Family Reunion. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
