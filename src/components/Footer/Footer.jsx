import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="sub-footer">
              <div className="footer-layout">
                <div className="footer-logo">
                  <span className="logo">Corcoran<em>Reunion</em></span>
                </div>
                <div className="footer-menu">
                  <ul>
                    <li><NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink></li>
                    <li><NavLink to="/photos" className={({isActive}) => isActive ? 'active' : ''}>Photos</NavLink></li>
                    <li><NavLink to="/reunion-details" className={({isActive}) => isActive ? 'active' : ''}>Reunion Details</NavLink></li>
                    <li><NavLink to="/family-tree" className={({isActive}) => isActive ? 'active' : ''}>Family Tree</NavLink></li>
                    <li><NavLink to="/donate" className={({isActive}) => isActive ? 'active' : ''}>Donate</NavLink></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
