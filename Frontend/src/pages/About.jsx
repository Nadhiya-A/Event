import {
  CalendarDays,
  ClipboardList,
  BarChart3,
  ShieldCheck,
  Cpu,
  Server,
  Rocket,
  Database,
  KeyRound,
  Globe,
  Users,
  Zap,
  LineChart,Laptop 
} from "lucide-react";

import "../styles/About.css";

function About() {
  return (
    <div className="about-page">

      {/* ================= HERO ================= */}

      <section className="about-hero">

        <div className="about-badge">
          🚀 EventSphere Platform
        </div>

        <h1>
          About EventSphere
        </h1>

        <p>
          EventSphere is a modern Event Registration Management System
          built using the MERN Stack. It streamlines event organization,
          attendee registration, analytics, and administration through
          a responsive, secure, and intuitive dashboard.
        </p>

      </section>

      {/* ================= STATS ================= */}

      <section className="about-stats">

        <div className="stat-card">

          <div className="stat-icon">
            <CalendarDays size={30}/>
          </div>

          <h2>120+</h2>

          <span>Events Managed</span>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            <Users size={30}/>
          </div>

          <h2>500+</h2>

          <span>Registrations</span>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            <BarChart3 size={30}/>
          </div>

          <h2>98%</h2>

          <span>Success Rate</span>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            <ShieldCheck size={30}/>
          </div>

          <h2>100%</h2>

          <span>Secure Access</span>

        </div>
        </section>

      {/* ================= MAIN GRID ================= */}

      <section className="about-grid">

        {/* ================= FEATURES ================= */}

        <div className="about-card">

        <h2>
  <Rocket size={32} />
  Core Features
</h2>

          <div className="feature-list">

 <div className="feature-item">

    <div className="feature-icon">
        <CalendarDays size={24}/>
    </div>

    <div className="feature-content">

        <h4>Event Management</h4>

        <p>Create, edit and organize events effortlessly.</p>

    </div>

</div>

  <div className="feature-item">

    <div className="feature-icon">
      <ClipboardList size={24}/>
    </div>

    <div>
      <h4>Registration System</h4>
      <p>Manage attendees with room allocation and ticket tracking.</p>
    </div>

  </div>

  <div className="feature-item">

    <div className="feature-icon">
      <BarChart3 size={24}/>
    </div>

    <div>
      <h4>Analytics Dashboard</h4>
      <p>Visualize registrations and event performance using charts.</p>
    </div>

  </div>

  <div className="feature-item">

    <div className="feature-icon">
    <ShieldCheck size={28}/>
</div>

    <div>
      <h4>Secure Authentication</h4>
      <p>JWT authentication with role-based access control.</p>
    </div>

  </div>

</div>

        </div>

        {/* ================= TECH STACK ================= */}

        <div className="about-card">
<h2>
  <Laptop size={32} />
  Technology Stack
</h2>

<div className="tech-grid">

  <div className="tech-card">
    <Cpu size={20}/>
    React.js
  </div>

  <div className="tech-card">
    <Server size={20}/>
    Node.js
  </div>

  <div className="tech-card">
    <Rocket size={20}/>
    Express.js
  </div>

  <div className="tech-card">
    <Database size={20}/>
    MongoDB
  </div>

  <div className="tech-card">
    <KeyRound size={20}/>
    JWT
  </div>

  <div className="tech-card">
    <Globe size={20}/>
    REST API
  </div>

</div>
        </div>

      </section>

      {/* ================= WHY EVENTSPHERE ================= */}

      <section className="why-section">

        <h2>Why EventSphere?</h2>

        <div className="why-grid">

          <div className="why-card">

    <div className="why-icon">
        <Zap size={34}/>
    </div>

    <h3>Fast</h3>

    <p>
        Designed with a responsive interface that makes event
        management quick and efficient.
    </p>

</div>
<div className="why-card">

    <div className="why-icon">
        <ShieldCheck size={34}/>
    </div>

    <h3>Secure</h3>

    <p>
        Authentication and authorization are protected using
        JWT and role-based access control.
    </p>

</div>

          <div className="why-card">

    <div className="why-icon">
        <LineChart size={34}/>
    </div>

    <h3>Insightful</h3>

    <p>
        Interactive analytics help administrators understand
        registrations and event performance.
    </p>

</div>

        </div>

      </section>

      {/* ================= DEVELOPER ================= */}

      <section className="developer-card">

        <div className="developer-avatar">
          N
        </div>

        <h2>Nadhiya</h2>

        <h4>Full Stack MERN Developer</h4>

        <p>
          Computer Science Engineering student passionate about
          building responsive, user-friendly and scalable web
          applications. EventSphere showcases practical experience
          with React, Node.js, Express.js, MongoDB, JWT
          authentication, dashboard development and modern UI design.
        </p>

      </section>
      
    </div>
  );
}

export default About;