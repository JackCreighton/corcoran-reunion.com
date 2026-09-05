import { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Copy, 
  Check, 
  Car, 
  Plane, 
  Waves, 
  Trees, 
  Sparkles,
  Download,
  Navigation
} from 'lucide-react';
import './ReunionDetails.css';

const ReunionDetails = () => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const venueName = "Cragun's Resort & Hotel";
  const venueAddress = "11000 Craguns Dr, East Gull Lake, MN 56401, US";
  const dateRange = "July 25–30, 2027";

  // Real-time Countdown calculation to July 25, 2027
  useEffect(() => {
    const targetDate = new Date('2027-07-25T15:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${venueName}, ${venueAddress}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Could not copy address: ', err);
    }
  };

  // Google Calendar URL Generator
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Corcoran Family Reunion 2027')}&dates=20270725/20270731&details=${encodeURIComponent('Corcoran Family Reunion at Cragun\'s Resort & Hotel on Gull Lake. Five days of family memories, water sports, and celebrations!')}&location=${encodeURIComponent(`${venueName}, ${venueAddress}`)}`;

  // Download .ics file for Outlook, Apple Calendar, etc.
  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Corcoran Family Reunion//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'SUMMARY:Corcoran Family Reunion 2027',
      'DESCRIPTION:Corcoran Family Reunion at Cragun\'s Resort & Hotel on Gull Lake.',
      `LOCATION:${venueName}, ${venueAddress}`,
      'DTSTART;VALUE=DATE:20270725',
      'DTEND;VALUE=DATE:20270731',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'corcoran-reunion-2027.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${venueName}, ${venueAddress}`)}`;

  return (
    <div className="reunion-details-page animate-fade-in">
      {/* Hero Showcase Section */}
      <section 
        className="details-hero"
        style={{ backgroundImage: `url('/images/craguns-resort.jpg')` }}
      >
        <div className="details-hero-overlay"></div>
        <div className="details-hero-content">
          <div className="details-badge-row">
            <span className="details-badge badge-accent">
              <Calendar size={14} /> {dateRange}
            </span>
            <span className="details-badge">
              <MapPin size={14} /> East Gull Lake, Minnesota
            </span>
            <span className="details-badge badge-green">
              <Waves size={14} /> Gull Lake Resort
            </span>
          </div>

          <h1 className="details-hero-title">2027 Corcoran Family Reunion</h1>
          <p className="details-hero-subtitle">
            Mark your calendars! We are coming together at Minnesota's premier lakeside getaway for five unforgettable days of family, laughter, and lake adventures.
          </p>

          {/* Countdown Clock */}
          <div className="details-countdown">
            <span className="countdown-label">
              <Clock size={14} /> Countdown to Reunion
            </span>
            <div className="countdown-units">
              <div className="countdown-box">
                <span className="countdown-num">{timeLeft.days}</span>
                <span className="countdown-txt">Days</span>
              </div>
              <div className="countdown-box">
                <span className="countdown-num">{timeLeft.hours}</span>
                <span className="countdown-txt">Hours</span>
              </div>
              <div className="countdown-box">
                <span className="countdown-num">{timeLeft.minutes}</span>
                <span className="countdown-txt">Mins</span>
              </div>
              <div className="countdown-box">
                <span className="countdown-num">{timeLeft.seconds}</span>
                <span className="countdown-txt">Secs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container">
        <div className="details-main-grid">

          {/* Dates & Schedule Overview Card */}
          <div className="details-card card-span-6">
            <div className="card-icon-header">
              <div className="card-icon-wrap accent">
                <Calendar size={24} />
              </div>
              <div className="card-title-group">
                <h2>Dates & Timeline</h2>
                <p>5 Nights of Family Fun</p>
              </div>
            </div>

            <div className="dates-highlight-box">
              <div className="date-pillar">
                <span className="date-pillar-label">Check-In</span>
                <span className="date-pillar-day">Sunday, July 25</span>
                <span className="date-pillar-sub">Summer 2027 • Afternoon</span>
              </div>

              <div className="date-arrow-separator">
                <span>5 Nights</span>
                <span>→</span>
              </div>

              <div className="date-pillar">
                <span className="date-pillar-label">Check-Out</span>
                <span className="date-pillar-day">Friday, July 30</span>
                <span className="date-pillar-sub">Summer 2027 • Morning</span>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Save the dates now so you can plan your summer travel. Add the event directly to your personal calendar with all location details pre-loaded.
            </p>

            <div className="date-actions-group">
              <a 
                href={googleCalendarUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                id="btn-add-google-calendar"
              >
                <Calendar size={16} style={{ marginRight: '8px' }} />
                Add to Google Calendar
              </a>
              <button 
                type="button" 
                onClick={handleDownloadIcs} 
                className="btn btn-secondary"
                id="btn-download-ics"
              >
                <Download size={16} style={{ marginRight: '8px' }} />
                Download iCal (.ics)
              </button>
            </div>
          </div>

          {/* Location & Directions Card */}
          <div className="details-card card-span-6">
            <div className="card-icon-header">
              <div className="card-icon-wrap">
                <MapPin size={24} />
              </div>
              <div className="card-title-group">
                <h2>The Destination</h2>
                <p>Cragun's Resort & Hotel</p>
              </div>
            </div>

            <div className="venue-meta">
              <h3 className="venue-name">{venueName}</h3>
              <p className="venue-address">
                11000 Craguns Dr<br />
                East Gull Lake, MN 56401<br />
                United States
              </p>
            </div>

            <div className="venue-actions">
              <a 
                href={googleMapsDirectionsUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                id="btn-get-directions"
              >
                <Navigation size={16} style={{ marginRight: '8px' }} />
                Get Directions
              </a>

              <button 
                type="button" 
                onClick={handleCopyAddress} 
                className="btn btn-secondary"
                id="btn-copy-address"
              >
                {copied ? (
                  <>
                    <Check size={16} style={{ marginRight: '8px', color: '#16a34a' }} />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy size={16} style={{ marginRight: '8px' }} />
                    Copy Address
                  </>
                )}
              </button>
            </div>

            {/* Embedded Google Map */}
            <div className="map-frame-wrapper">
              <iframe
                title="Cragun's Resort & Hotel Location Map"
                src="https://maps.google.com/maps?q=Cragun's+Resort+%26+Hotel,+11000+Craguns+Dr,+East+Gull+Lake,+MN+56401&t=&z=13&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Resort Experience / Highlights */}
          <div className="details-card card-span-7">
            <div className="card-icon-header">
              <div className="card-icon-wrap">
                <Trees size={24} />
              </div>
              <div className="card-title-group">
                <h2>About the Resort</h2>
                <p>Minnesota's iconic Gull Lake gathering spot</p>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Nestled on the sandy shores of Gull Lake in East Gull Lake, Minnesota, Cragun's Resort offers the quintessential Northwoods lake experience. From pontoon cruises and golf to evening lakeside bonfires, there is something for every generation of the family.
            </p>

            <div className="resort-perks-grid">
              <div className="perk-item">
                <Waves size={20} />
                <div className="perk-text">
                  <h4>Gull Lake Beach & Marina</h4>
                  <p>Sandy swimming beaches, pontoon rentals, paddleboards, and lake cruises.</p>
                </div>
              </div>

              <div className="perk-item">
                <Trees size={20} />
                <div className="perk-text">
                  <h4>Cabins & Lodge Rooms</h4>
                  <p>Spacious accommodations suitable for both individual families and larger groups.</p>
                </div>
              </div>

              <div className="perk-item">
                <Sparkles size={20} />
                <div className="perk-text">
                  <h4>Championship Golf</h4>
                  <p>Home to the Lehman 18 and Dutch 27 golf courses designed for all skill levels.</p>
                </div>
              </div>

              <div className="perk-item">
                <Clock size={20} />
                <div className="perk-text">
                  <h4>Family Activities</h4>
                  <p>Evening fire pits, indoor/outdoor pools, pickleball, tennis, and lawn games.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Travel & Getting There */}
          <div className="details-card card-span-5">
            <div className="card-icon-header">
              <div className="card-icon-wrap accent">
                <Car size={24} />
              </div>
              <div className="card-title-group">
                <h2>Getting There</h2>
                <p>Travel & Airport Information</p>
              </div>
            </div>

            <div className="travel-options">
              <div className="travel-item">
                <div className="travel-item-icon">
                  <Plane size={20} />
                </div>
                <div className="travel-item-content">
                  <h4>Minneapolis-St. Paul Airport (MSP)</h4>
                  <p>Major international hub located approximately 2.5 hours south. Ideal for non-stop flights and rental cars.</p>
                </div>
              </div>

              <div className="travel-item">
                <div className="travel-item-icon">
                  <Plane size={20} />
                </div>
                <div className="travel-item-content">
                  <h4>Brainerd Lakes Regional (BRD)</h4>
                  <p>Located just 20–25 minutes from the resort, offering daily connecting flights via Delta from MSP.</p>
                </div>
              </div>

              <div className="travel-item">
                <div className="travel-item-icon">
                  <Car size={20} />
                </div>
                <div className="travel-item-content">
                  <h4>Scenic Road Trip & Parking</h4>
                  <p>Easy highway driving north on US-10 / MN-371. Complimentary self-parking is provided on resort grounds.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stay Tuned Banner */}
          <div className="card-span-12">
            <div className="stay-tuned-banner">
              <div className="stay-tuned-info">
                <div className="stay-tuned-icon">
                  <Sparkles size={26} />
                </div>
                <div className="stay-tuned-text">
                  <h3>Lodging Blocks & Full Schedule Coming Soon</h3>
                  <p>
                    We are coordinating our group reservation codes and a fun schedule of reunion events (reception, group dinners, and lake outings). Keep an eye on this page and your email for updates!
                  </p>
                </div>
              </div>

              <a 
                href="https://www.craguns.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline"
                id="btn-visit-resort-site"
                style={{ whiteSpace: 'nowrap' }}
              >
                Visit Cragun's Website <ExternalLink size={14} style={{ marginLeft: '6px' }} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReunionDetails;
