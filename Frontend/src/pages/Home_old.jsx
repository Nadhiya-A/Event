import { Link } from "react-router-dom";

function Home({ user }) {
  return (
    <div className="landing-page">

      {/* HERO */}
      <section className="hero-section">
<div className="hero-layout">

  <div className="hero-card">

    <div className="hero-logo">
      ⚡
    </div>

    <h1 className="hero-title">
      Manage Events Beautifully
    </h1>

    <p className="hero-subtitle">
      Registrations • Attendees • Analytics
    </p>

    <p className="hero-description">
      Manage events, registrations, attendees and experiences
      in one beautiful platform.
    </p>

        

          <div className="hero-buttons">
            <Link
              to="/dashboard"
              className="btn-cta-main"
            >
              Go To Dashboard
            </Link>

            <Link
              to="/add-registration"
              className="secondary-btn"
            >
              Register Event
            </Link>
          </div>
          </div>
<div className="dashboard-card">

    <div className="dashboard-top">

        <h3>Dashboard</h3>

        <span className="live-badge">
            ● Live
        </span>

    </div>

    <div className="event-card">

        <span>🚀 Hackathon</span>

        <strong>120</strong>

    </div>

    <div className="event-card">

        <span>🎤 AI Workshop</span>

        <strong>82</strong>

    </div>

    <div className="event-card">

        <span>💻 Web Summit</span>

        <strong>215</strong>

    </div>

    <div className="mini-chart">

        <div style={{height:"45%"}}></div>

        <div style={{height:"70%"}}></div>

        <div style={{height:"90%"}}></div>

        <div style={{height:"60%"}}></div>

        <div style={{height:"100%"}}></div>

    </div>

    <div className="dashboard-bottom">

        <div className="mini-box">

            <h4>12K</h4>

            <p>Users</p>

        </div>

        <div className="mini-box">

            <h4>8.9K</h4>

            <p>Tickets</p>

        </div>

    </div>

</div>
</div>
      </section>

      {/* STATS */}

      <section className="stats-section">

        <div className="stat-card">
          <h2>500+</h2>
          <p>Registrations</p>
        </div>

        <div className="stat-card">
          <h2>100+</h2>
          <p>Events</p>
        </div>

        <div className="stat-card">
          <h2>24/7</h2>
          <p>Availability</p>
        </div>

      </section>

    <section className="features-section">

  <div className="feature-card">
    <div className="feature-icon">🎟️</div>
    <h3>Registration Management</h3>
    <p>
      Create, edit and manage registrations
      seamlessly.
    </p>
  </div>

  <div className="feature-card">
    <div className="feature-icon">📅</div>
    <h3>Event Management</h3>
    <p>
      Organize events and manage attendee
      information effortlessly.
    </p>
  </div>

  <div className="feature-card">
    <div className="feature-icon">📊</div>
    <h3>Analytics Dashboard</h3>
    <p>
      Monitor registrations and event statistics
      in real time.
    </p>
  </div>

</section>

<section className="testimonials-section">

  <h2 className="section-heading">
    What Users Say
  </h2>

  <div className="testimonial-grid">

    <div className="testimonial-card">
      <p>
        "EventSphere made event registration
        incredibly simple and organized."
      </p>

      <h4>Sarah K.</h4>
      <span>Event Organizer</span>
    </div>

    <div className="testimonial-card">
      <p>
        "The dashboard is beautiful and easy
        to use. Everything feels professional."
      </p>

      <h4>James M.</h4>
      <span>Administrator</span>
    </div>

    <div className="testimonial-card">
      <p>
        "Managing registrations has never
        been this smooth."
      </p>

      <h4>David R.</h4>
      <span>Event Coordinator</span>
    </div>

  </div>

</section>

<footer className="footer-section">

  <div className="footer-grid">

    <div>
      <h3 className="footer-logo">
        ⚡ EventSphere
      </h3>

      <p>
        Discover • Register • Experience

        <br /><br />

        EventSphere helps organizations
        manage events and registrations
        through one modern platform.
      </p>
    </div>

    <div>
      <h3>Quick Links</h3>

      <ul className="footer-links">
        <li>Home</li>
        <li>Dashboard</li>
        <li>Registrations</li>
        <li>Events</li>
      </ul>
    </div>

    <div>
      <h3>Contact</h3>

      <p>📧 support@eventsphere.com</p>
      <p>📞 +91 98765 43210</p>
      <p>📍 Kerala, India</p>
    </div>

    <div>
      <h3>Connect</h3>

      <div className="social-icons">
        <span>🌐</span>
        <span>💼</span>
        <span>📷</span>
        <span>🐦</span>
      </div>
    </div>

  </div>

  <div className="footer-bottom">
    © 2026 EventSphere. All Rights Reserved.
  </div>

</footer>








    </div>
  );
}

export default Home;