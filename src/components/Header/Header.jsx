import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="header glass-panel">
      <div className="container header-container">
        <NavLink to="/" className="logo">
          Corcoran<span>Reunion</span>
        </NavLink>
        
        <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/photos" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsOpen(false)}>Photos</NavLink>
          <NavLink to="/reunion-details" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsOpen(false)}>Reunion Details</NavLink>
          <NavLink to="/family-tree" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsOpen(false)}>Family Tree</NavLink>
          <NavLink to="/donate" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link btn btn-primary'} onClick={() => setIsOpen(false)}>Donate</NavLink>
        </nav>

        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
