
import {
  Mail,
  CalendarDays,
} from "lucide-react";

import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import logo from "../../assets/logos/logo.png";
import "../../styles/Footer.css";

function Footer() {
  return (
<footer
  className="landing-footer"
  id="about"
>
      <div className="footer-container">

        <div className="footer-brand">

          <div className="footer-logo">
          <img
  src={logo}
  alt="EventSphere"
  className="footer-logo-img"
/>

<span className="logo-text">
  <span className="logo-event">Event</span>
  <span className="logo-sphere">Sphere</span>
</span>
          </div>

          <p>
            A modern MERN Stack Event Management Platform
            for organizing events, registrations,
            analytics and room allocation effortlessly.
          </p>

        </div>

        <div className="footer-links">

          <h4>Quick Links</h4>

          <a href="#platform">Platform</a>
          <a href="#features">Features</a>
          <a href="#showcase">Showcase</a>
          <a href="#about">About</a>

        </div>

        <div className="footer-social">

          <h4>Connect</h4>

          <div className="social-icons">

            <a href="#">
<FaGithub size={20} />
            </a>

            <a href="#">
              <FaLinkedin size={20} />
            </a>

            <a href="#">
              <FaInstagram size={20} />
            </a>

            <a href="mailto:example@email.com">
              <Mail size={20} />
            </a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 EventSphere • Built with ❤️ using MERN Stack

      </div>

    </footer>
  );
}

export default Footer;