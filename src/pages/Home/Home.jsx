import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
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
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-date">July 10, 2027</span>
            <h1>Corcoran Family Reunion</h1>
            <p className="hero-subtitle">The greatest gathering on either side of the Mississippi.</p>
            <div className="hero-actions">
              <NavLink to="/reunion-details" className="btn btn-primary">
                More Details <ArrowRight size={20} className="ml-2" />
              </NavLink>
            </div>
          </div>
          
          <div className="countdown glass-panel">
            <div className="countdown-item">
              <span className="number">{timeLeft.days}</span>
              <span className="label">Days</span>
            </div>
            <div className="countdown-item">
              <span className="number">{timeLeft.hours}</span>
              <span className="label">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="number">{timeLeft.minutes}</span>
              <span className="label">Minutes</span>
            </div>
            <div className="countdown-item">
              <span className="number">{timeLeft.seconds}</span>
              <span className="label">Seconds</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-preview container">
        <div className="about-grid">
          <div className="about-text">
            <h2>A Tradition Spanning Forty Years</h2>
            <p>Since sometime in the 1980s, this ragtag group of jokers has been coming together to eat, drink, and be merry.</p>
            <p>Join us for the greatest family reunion on either side of the Mississippi.</p>
            <NavLink to="/reunion-details" className="btn btn-outline" style={{marginTop: '1rem'}}>
              Read the History
            </NavLink>
          </div>
          <div className="about-location glass-panel">
            <MapPin size={48} color="var(--accent-primary)" />
            <h3>The Destination</h3>
            <p>555 Corcoran St N,<br/>TBD, MN 51515<br/>United States</p>
            <NavLink to="/reunion-details" className="btn-link">Need Directions? <ArrowRight size={16} /></NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
