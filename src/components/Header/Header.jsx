import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Handle sticky scroll state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={`header-area ${isSticky ? 'header-sticky background-header' : ''}`}>
      <div className="container">
        <nav className="main-nav">
          {/* Logo */}
          <NavLink to="/" className="logo" onClick={() => setIsOpen(false)}>
            Corcoran<em>Reunion</em>
          </NavLink>
          
          {/* Menu */}
          <ul className={`nav ${isOpen ? 'active' : ''}`}>
            <li>
              <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/photos" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>Photos</NavLink>
            </li>
            <li>
              <NavLink to="/reunion-details" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>Reunion Details</NavLink>
            </li>
            <li>
              <NavLink to="/family-tree" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>Family Tree</NavLink>
            </li>
            <li>
              <NavLink to="/donate" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>Donate</NavLink>
            </li>
          </ul>

          {/* Mobile Menu Trigger */}
          <a className={`menu-trigger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span>Menu</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
