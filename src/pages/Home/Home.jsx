import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const countDownDate = new Date('Jul 10, 2027 12:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home animate-fade-in">
      <section className="hero">
        <div className="countdown-bar">
          <ul>
            <li className="countdown-item">Days<span className="number">{timeLeft.days}</span></li>
            <li className="countdown-item">Hours<span className="number">{timeLeft.hours}</span></li>
            <li className="countdown-item">Minutes<span className="number">{timeLeft.minutes}</span></li>
            <li className="countdown-item">Seconds<span className="number">{timeLeft.seconds}</span></li>
          </ul>
        </div>
        <div className="hero-overlay"></div>
        <div className="container hero-container">
          <div className="hero-content">
            <h6 className="hero-date">Date TBD</h6>
            <h2 className="hero-title">Corcoran Family Reunion</h2>
            <div className="hero-actions">
              <NavLink to="/reunion-details" className="btn btn-primary">
                More Details
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Show Events Carousel Mockup */}
      <section className="photos-carousel">
        <NavLink to="/photos"><img src="/photos/CFR_007.jpeg" alt="Reunion Photo 1" /></NavLink>
        <NavLink to="/photos"><img src="/photos/CFR_008.jpeg" alt="Reunion Photo 2" /></NavLink>
        <NavLink to="/photos"><img src="/photos/CFR_009.jpeg" alt="Reunion Photo 3" /></NavLink>
        <NavLink to="/photos"><img src="/photos/CFR_010.jpeg" alt="Reunion Photo 4" /></NavLink>
      </section>

      {/* Amazing Venues / About Preview */}
      <section className="about-preview">
        <div className="about-grid">
          <div className="about-text">
            <h2>A Tradition Spanning Forty Years</h2>
            <p>
              Since sometime in the 1980s, this ragtag group of jokers has been coming together to eat, drink, and be merry.
              Join us July 99th, 2027, for the greatest family reunion on either side of the Mississippi.
            </p>
            <p>
              See the <NavLink to="/reunion-details" style={{color: 'var(--accent-primary)', textDecoration: 'underline'}}>Reunion Details</NavLink> page for more information.
            </p>
          </div>
          <div className="about-location">
            <h3><MapPin size={24} color="#2a2a2a" /> The Destination</h3>
            <p>
              555 Corcoran St N,<br />
              TBD, MN 51515<br />
              United States
            </p>
            <NavLink to="/reunion-details" className="btn-link">
              Need Directions? <ArrowRight size={14} />
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
