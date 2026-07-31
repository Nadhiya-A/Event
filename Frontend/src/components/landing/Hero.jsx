import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import dashboardImage from "../../assets/images/hero-mockup.png";
import "../../styles/hero.css";
function Hero() {

  return (
<section
  className="hero"
  id="platform"
>
      <div className="hero-glow hero-glow-left"></div>
      <div className="hero-glow hero-glow-right"></div>

      <div className="hero-content">

        <motion.div
          className="hero-top"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <div className="hero-badge">
            <CheckCircle2 size={16} />
            Trusted by Universities & Student Organizations
          </div>

          <h1>
  Build Better
  <br />
  <span className="single-line">Event Experiences.</span>
</h1>

          <p>
            Plan, organize and analyze events from one powerful platform.
            Everything you need to manage registrations, attendees,
            schedules and insights beautifully.
          </p>

       <div className="hero-buttons">

  <Link to="/signin" className="hero-primary">
    Get Started
    <ArrowRight size={18} />
  </Link>

  <button className="hero-secondary">
    <Play size={18} />
    Watch Demo
  </button>

</div>

          <div className="hero-stats">

            <div>
              <h3>1200+</h3>
              <span>Events</span>
            </div>

            <div>
              <h3>5200+</h3>
              <span>Registrations</span>
            </div>

            <div>
              <h3>98%</h3>
              <span>Attendance</span>
            </div>

          </div>

        </motion.div>

        <motion.div
          className="hero-dashboard"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >

          <div className="browser">

            <div className="browser-header">

              <span></span>
              <span></span>
              <span></span>

              <div className="browser-url">
                app.eventsphere.com/dashboard
              </div>

            </div>

            <img
              src={dashboardImage}
              alt="EventSphere Dashboard"
            />

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;