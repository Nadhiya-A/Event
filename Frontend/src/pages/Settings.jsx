import { useEffect, useState } from "react";
import {
  Palette,
  Bell,
  Shield,
  Info,
  Sun,
  Moon,
  Monitor,
  Lock,
  Mail,
  Smartphone,
  CheckCircle2,
  Settings2,
  Package,
  Cpu,
  Server,
  Database,
  KeyRound,
} from "lucide-react";

import "../styles/Settings.css";

function Settings() {

  const [theme, setTheme] = useState("light");

  const [notifications, setNotifications] = useState({
    email: true,
    reminders: true,
    registrations: true,
  });

  useEffect(() => {

    const savedTheme =
      localStorage.getItem("theme") || "light";

    setTheme(savedTheme);

    document.documentElement.setAttribute(
      "data-theme",
      savedTheme
    );

  }, []);

  const changeTheme = (newTheme) => {

    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    document.documentElement.setAttribute(
      "data-theme",
      newTheme
    );

  };

  const toggleNotification = (key) => {

    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

  };

  return (

    <div className="settings-page">

      {/* ================= HERO ================= */}

      <section className="settings-hero">

        <div className="hero-content">

          <div className="settings-badge">

            <Palette size={16} />

            Workspace Preferences

          </div>

          <h1>Settings</h1>

          <p>

            Personalize your EventSphere experience,
            switch themes, manage notifications and
            configure your account preferences.

          </p>

        </div>

        <div className="hero-icon">

          <Settings2 size={120} />

        </div>

      </section>

      {/* ================= GRID ================= */}

      <div className="settings-grid">

        {/* ================= APPEARANCE ================= */}

        <div className="settings-card full-width">

          <div className="settings-title">

            <Palette size={22} />

            <h3>Appearance</h3>

          </div>

          <div className="theme-options">

            <div
              className={`theme-card ${
                theme === "light"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                changeTheme("light")
              }
            >

              <Sun size={34} />

              <h4>Light</h4>

              <p>Bright Workspace</p>

              {theme === "light" && (

                <CheckCircle2
                  className="theme-check"
                  size={22}
                />

              )}

            </div>

            <div
              className={`theme-card ${
                theme === "dark"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                changeTheme("dark")
              }
            >

              <Moon size={34} />

              <h4>Dark</h4>

              <p>Dark Experience</p>

              {theme === "dark" && (

                <CheckCircle2
                  className="theme-check"
                  size={22}
                />

              )}

            </div>

            <div
              className={`theme-card ${
                theme === "system"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                changeTheme("system")
              }
            >

              <Monitor size={34} />

              <h4>System</h4>

              <p>Auto Detect</p>

              {theme === "system" && (

                <CheckCircle2
                  className="theme-check"
                  size={22}
                />

              )}

            </div>

          </div>

        </div>
                {/* ================= NOTIFICATIONS ================= */}

        <div className="settings-card">

          <div className="settings-title">

            <Bell size={22} />

            <h3>Notifications</h3>

          </div>

          <div className="setting-row">

            <div>

              <h4>Email Notifications</h4>

              <span>
                Receive important account updates
              </span>

            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() =>
                  toggleNotification("email")
                }
              />

              <span className="slider"></span>

            </label>

          </div>

          <div className="setting-row">

            <div>

              <h4>Registration Alerts</h4>

              <span>
                Notify when a new attendee registers
              </span>

            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={notifications.registrations}
                onChange={() =>
                  toggleNotification("registrations")
                }
              />

              <span className="slider"></span>

            </label>

          </div>

          <div className="setting-row">

            <div>

              <h4>Event Reminders</h4>

              <span>
                Upcoming event reminders
              </span>

            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={notifications.reminders}
                onChange={() =>
                  toggleNotification("reminders")
                }
              />

              <span className="slider"></span>

            </label>

          </div>

        </div>

        {/* ================= SECURITY ================= */}

        <div className="settings-card">

          <div className="settings-title">

            <Shield size={22} />

            <h3>Security</h3>

          </div>

          <div className="security-item">

            <Lock size={20} />

            <div>

              <h4>Password</h4>

              <p>Your password is protected</p>

            </div>

            <span className="status success">
              Protected
            </span>

          </div>

          <div className="security-item">

            <Mail size={20} />

            <div>

              <h4>Email Verification</h4>

              <p>Your email is verified</p>

            </div>

            <span className="status success">
              Verified
            </span>

          </div>

          <div className="security-item">

            <Smartphone size={20} />

            <div>

              <h4>Two-Factor Authentication</h4>

              <p>Additional account protection</p>

            </div>

            <span className="status pending">
              Soon
            </span>

          </div>

        </div>
                {/* ================= ABOUT ================= */}

        <div className="settings-card full-width">

          <div className="settings-title">

            <Info size={22} />

            <h3>About EventSphere</h3>

          </div>

          <div className="about-list">

            <div>

              <div className="about-left">
                <Package size={18} />
                <span>Version</span>
              </div>

              <strong>v1.0.0</strong>

            </div>

            <div>

              <div className="about-left">
                <Cpu size={18} />
                <span>Framework</span>
              </div>

              <strong>MERN Stack</strong>

            </div>

            <div>

              <div className="about-left">
                <Monitor size={18} />
                <span>Frontend</span>
              </div>

              <strong>React + Vite</strong>

            </div>

            <div>

              <div className="about-left">
                <Server size={18} />
                <span>Backend</span>
              </div>

              <strong>Node + Express</strong>

            </div>

            <div>

              <div className="about-left">
                <Database size={18} />
                <span>Database</span>
              </div>

              <strong>MongoDB</strong>

            </div>

            <div>

              <div className="about-left">
                <KeyRound size={18} />
                <span>Authentication</span>
              </div>

              <strong>JWT</strong>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Settings;