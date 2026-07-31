import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarPlus,
  Sparkles,
  ShieldCheck,
  Users,
  Star,
} from "lucide-react";

import "../../styles/cta.css";

function CTA() {
  return (
    <section className="cta-section">

      <div className="cta-glow cta-glow-left"></div>
      <div className="cta-glow cta-glow-right"></div>
<motion.div
  className="cta-container"
  initial={{
    opacity:0,
    y:50,
    scale:.97
  }}
  whileInView={{
    opacity:1,
    y:0,
    scale:1
  }}
  viewport={{ once:true }}
  transition={{
    duration:.8,
    ease:[0.22,1,0.36,1]
  }}
>

        <div className="cta-badge">
          <Sparkles size={16} />
          Trusted by Event Organizers Worldwide
        </div>

        <h2>
          Ready to Create
          <span> Extraordinary Events?</span>
        </h2>

        <p>
          Manage registrations, analytics, attendees and events from one
          beautiful dashboard. EventSphere gives you everything you need to
          organize unforgettable experiences with confidence.
        </p>

        <div className="cta-buttons">

          <Link
            to="/signup"
            className="cta-primary-btn"
          >
            Get Started Free
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/signin"
            className="cta-secondary-btn"
          >
            <CalendarPlus size={18} />
            Live Demo
          </Link>

        </div>

        <div className="cta-stats">

          <div className="stat-card">

            <div className="stat-icon">
              <Users size={22}/>
            </div>

            <h3>10K+</h3>

            <span>Active Users</span>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              <CalendarPlus size={22}/>
            </div>

            <h3>500+</h3>

            <span>Events Hosted</span>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              <Star
                size={22}
                fill="currentColor"
              />
            </div>

            <h3>4.9</h3>

            <span>User Rating</span>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              <ShieldCheck size={22}/>
            </div>

            <h3>99.9%</h3>

            <span>Platform Uptime</span>

          </div>

        </div>

      </motion.div>

    </section>
  );
}

export default CTA;