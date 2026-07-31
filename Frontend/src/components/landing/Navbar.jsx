import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  ArrowRight,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import logo from "../../assets/logos/logo.png";
import "../../styles/navbar.css";

function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;

      setScrolled(current > 25);

      if (current > lastScroll && current > 120) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      lastScroll = current;
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`navbar ${
        scrolled ? "scrolled" : ""
      } ${showNav ? "show" : "hide"}`}
    >

      <div className="navbar-container">
      
     <Link to="/" className="logo">
  <img
    src={logo}
    alt="EventSphere"
    className="navbar-logo-img"
  />
    <span className="logo-text">
      <span className="logo-event">Event</span>
      <span className="logo-sphere">Sphere</span>
    </span>
</Link>

        {/* Desktop Navigation */}

        <nav
          className={`nav-links ${
            menuOpen ? "active" : ""
          }`}
        >
          <a
            href="#platform"
            onClick={closeMenu}
          >
            Platform
          </a>

          <a
            href="#features"
            onClick={closeMenu}
          >
            Features
          </a>

          <a
            href="#showcase"
            onClick={closeMenu}
          >
            Showcase
          </a>

          <a
            href="#experience"
            onClick={closeMenu}
          >
            Experience
          </a>

          <a
            href="#about"
            onClick={closeMenu}
          >
            About
          </a>

          <div className="mobile-divider"></div>

          <button
            className="mobile-theme"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <>
                <Moon size={18} />
                Dark Mode
              </>
            ) : (
              <>
                <Sun size={18} />
                Light Mode
              </>
            )}
          </button>

         <Link
  to="/signin"
  className="mobile-btn"
  onClick={closeMenu}
>Get Started
            <ArrowRight size={18} />
          </Link>
        </nav>

        {/* Right Side */}

        <div className="right-section">

          <button
            className="theme-btn"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <Moon size={18} />
            ) : (
              <Sun size={18} />
            )}
          </button>

        <Link
  to="/signin"
  className="cta-btn"
>
  Get Started
  <ArrowRight size={18} />
</Link>
          <button
            className="menu-btn"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>

        </div>

      </div>
    </header>
  );
}

export default Navbar;