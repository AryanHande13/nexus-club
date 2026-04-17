import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const Events = () => {
  const events = [
    {
      id: 1,
      title: "NEXUS ELITE GLOBAL SUMMIT",
      date: "August 15-18",
      location: "Zurich, Switzerland",
      type: "Flagship",
      desc: "Our marquee annual gathering. Closed-door strategic sessions, sovereign wealth fund introductions, and luxury galas."
    },
    {
      id: 2,
      title: "Private Deal Flow Breakfast",
      date: "September 10",
      location: "Dubai, UAE",
      type: "Investment",
      desc: "Exclusive insights into the Middle Eastern markets with top-tier sovereign capital representatives."
    },
    {
      id: 3,
      title: "Tech & Capital Convergence",
      date: "October 5",
      location: "Singapore",
      type: "Networking",
      desc: "A junction of profound technological advancement and the venture capital that scales it."
    }
  ];

  return (
    <div className="home-page" style={{ paddingTop: '100px' }}>
      <section className="section">
        <div className="container">
          <h1 className="hero-title text-gold text-center" style={{ fontSize: '48px' }}>
            GLOBAL CALENDAR
          </h1>
          <div className="gold-accent mx-auto"></div>
          
          <div style={{ display: 'grid', gap: '30px', marginTop: '50px', maxWidth: '900px', margin: '50px auto 0' }}>
            {events.map(event => (
              <div key={event.id} className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="gold-gradient-text" style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    {event.type} Event
                  </span>
                  <div style={{ display: 'flex', gap: '15px', color: 'var(--color-gray)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={16} className="text-gold" /> {event.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={16} className="text-gold" /> {event.location}
                    </span>
                  </div>
                </div>
                <h2 style={{ fontSize: '28px', color: 'var(--color-white)' }}>{event.title}</h2>
                <p style={{ color: 'var(--color-gray)', fontSize: '16px' }}>{event.desc}</p>
                <div>
                  <button className="btn btn-outline" style={{ marginTop: '15px' }}>
                    RSVP / Details <ArrowRight size={14} style={{ marginLeft: '5px' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
