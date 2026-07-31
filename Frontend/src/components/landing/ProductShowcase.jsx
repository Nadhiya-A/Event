import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardCheck,
  BarChart3,
  Sparkles,
  Monitor,
  Users,
  ShieldCheck,
  ArrowRight,
  FileText,
  CreditCard,
  MailCheck,
  Ticket,
   Zap,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  PieChart,
  Activity
} from "lucide-react";

import "../../styles/productShowcase.css";

const showcaseItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    description:
      "Monitor every event with a beautiful real-time dashboard.",
  },
  {
    title: "Events",
    icon: CalendarDays,
    description:
      "Create, edit and organize events effortlessly.",
  },
  {
    title: "Registrations",
    icon: ClipboardCheck,
    description:
      "Manage attendees and registrations from one place.",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    description:
      "Track registrations, growth and performance instantly.",
  },
];
const floatingCards = [
  {
    icon: Users,
    title: "Active Users",
    value: "1,500+",
  },
  {
    icon: CalendarDays,
    title: "Events Managed",
    value: "250+",
  },
  {
    icon: BarChart3,
    title: "Growth",
    value: "+28%",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    value: "100%",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};
function renderDashboard() {
  return (
    <div className="fake-dashboard">

      <div className="fd-top">

        <div className="fd-card">
          <span>Total Events</span>
          <h3>124</h3>
        </div>

        <div className="fd-card">
          <span>Registrations</span>
          <h3>5.2K</h3>
        </div>

        <div className="fd-card">
          <span>Revenue</span>
          <h3>$18.4K</h3>
        </div>

      </div>

      <div className="fd-middle">

        <div className="fd-chart">

          <div className="bar h1"></div>
          <div className="bar h2"></div>
          <div className="bar h3"></div>
          <div className="bar h4"></div>
          <div className="bar h5"></div>
          <div className="bar h6"></div>

        </div>

        <div className="fd-side">

          <div className="mini-card">
            <span>Upcoming</span>
            <strong>12</strong>
          </div>

          <div className="mini-card">
            <span>Checked In</span>
            <strong>94%</strong>
          </div>

        </div>

      </div>

      <div className="fd-table">

        <div className="row">
          <span>AI Summit</span>
          <span className="success">Live</span>
        </div>

        <div className="row">
          <span>Hackathon</span>
          <span className="pending">Draft</span>
        </div>

        <div className="row">
          <span>Tech Expo</span>
          <span className="success">Live</span>
        </div>

      </div>

    </div>
  );
}
function renderEvents() {
  return (
    <div className="event-board">

      <div className="event-card orange">

        <CalendarDays size={26}/>

        <h4>Tech Summit 2026</h4>

        <span>July 30 • Main Auditorium</span>

        <div className="event-progress">
          <div style={{width:"82%"}}></div>
        </div>

      </div>

      <div className="event-card teal">

        <Users size={26}/>

        <h4>Hackathon</h4>

        <span>480 Participants</span>

        <div className="event-progress">
          <div style={{width:"65%"}}></div>
        </div>

      </div>

      <div className="event-card purple">

        <Sparkles size={26}/>

        <h4>Workshop</h4>

        <span>Registration Open</span>

        <div className="event-progress">
          <div style={{width:"92%"}}></div>
        </div>

      </div>

    </div>
  );
}

function renderRegistrations() {
  return (
    <div className="registration-flow">

      <h4>Registration Journey</h4>

      <div className="flow-container">

        <div className="flow-step">

          <div className="flow-circle orange">
            <FileText size={28}/>
          </div>

          <h5>Registered</h5>

          <span>2,540</span>

        </div>

        <div className="flow-line"></div>

        <div className="flow-step">

          <div className="flow-circle teal">
            <CreditCard size={28}/>
          </div>

          <h5>Payment</h5>

          <span>2,310</span>

        </div>

        <div className="flow-line"></div>

        <div className="flow-step">

          <div className="flow-circle blue">
            <MailCheck size={28}/>
          </div>

          <h5>Confirmation</h5>

          <span>2,280</span>

        </div>

        <div className="flow-line"></div>

        <div className="flow-step">

          <div className="flow-circle green">
            <Ticket size={28}/>
          </div>

          <h5>Ticket Issued</h5>

          <span>2,200</span>

        </div>

        <div className="flow-line"></div>

        <div className="flow-step">

          <div className="flow-circle purple">
            <CheckCircle2 size={28}/>
          </div>

          <h5>Checked In</h5>

          <span>1,980</span>

        </div>

      </div>

      <div className="flow-progress">

        <div className="progress-item">

          <span>Completion</span>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: "92%" }}
            ></div>
          </div>

          <strong>92%</strong>

        </div>

        <div className="progress-item">

          <span>Attendance</span>

          <div className="progress-bar">
            <div
              className="progress-fill attendance"
              style={{ width: "81%" }}
            ></div>
          </div>

          <strong>81%</strong>

        </div>

      </div>

    </div>
  );
}
function renderAnalytics() {
  return (
    <div className="analytics-ui">

      <div className="analytics-top">

        <div className="analytics-card">
          <DollarSign size={22}/>
          <span>Revenue</span>
          <h3>$48K</h3>
          <small>+18%</small>
        </div>

        <div className="analytics-card">
          <Users size={22}/>
          <span>Registrations</span>
          <h3>2,540</h3>
          <small>+12%</small>
        </div>

        <div className="analytics-card">
          <Activity size={22}/>
          <span>Attendance</span>
          <h3>92%</h3>
          <small>Excellent</small>
        </div>

        <div className="analytics-card">
          <TrendingUp size={22}/>
          <span>Growth</span>
          <h3>31%</h3>
          <small>This Month</small>
        </div>

      </div>

      <div className="analytics-bottom">

        <div className="donut-widget">

          <div className="donut">

            <div className="donut-inner">
              <strong>82%</strong>
              <span>Success</span>
            </div>

          </div>

        </div>

        <div className="line-widget">

          <svg viewBox="0 0 420 170">

            <polyline
              fill="none"
              stroke="#F97316"
              strokeWidth="6"
              points="
              10,140
              70,105
              130,120
              190,70
              250,92
              310,38
              410,55"
            />

          </svg>

          <div className="line-label">
            Registration Trend
          </div>

        </div>

      </div>

      <div className="analytics-bars">

        <div className="bar-item">
          <span>Conferences</span>
          <div className="bar-track">
            <div style={{width:"84%"}}></div>
          </div>
        </div>

        <div className="bar-item">
          <span>Workshops</span>
          <div className="bar-track">
            <div style={{width:"68%"}}></div>
          </div>
        </div>

        <div className="bar-item">
          <span>Hackathons</span>
          <div className="bar-track">
            <div style={{width:"91%"}}></div>
          </div>
        </div>

      </div>

    </div>
  );
}
function ProductShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % showcaseItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const ActiveIcon = showcaseItems[active].icon;

  return (
    <section
  className="product-showcase"
  id="showcase"
>

      {/* Background Glow */}
      <div className="ps-glow ps-glow-1"></div>
      <div className="ps-glow ps-glow-2"></div>
      <div className="ps-grid"></div>

      <div className="product-showcase-container">

        {/* ================= HEADER ================= */}

        <motion.div
          className="ps-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="ps-badge">
            <Sparkles size={16} />
            Product Showcase
          </span>

          <h2>
            See
            <span> EventSphere </span>
            in Action
          </h2>

          <p>
            Discover how EventSphere simplifies event management with a
            premium dashboard, seamless registrations, insightful analytics,
            and a modern user experience designed for organizers.
          </p>
        </motion.div>

        {/* ================= NAVIGATION ================= */}

        <motion.div
          className="ps-tabs"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {showcaseItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.button
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.96 }}
                className={`ps-tab ${
                  active === index ? "active" : ""
                }`}
                onClick={() => setActive(index)}
              >
                <Icon size={18} />
                {item.title}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ================= SHOWCASE ================= */}

        <div className="ps-content">

          {/* Browser Mockup */}

          <motion.div
            className="browser-window"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="browser-top">

              <div className="browser-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="browser-address">
                <Monitor size={16} />
                eventsphere.app/dashboard
              </div>

            </div>

       <div className="browser-body">

  <AnimatePresence mode="wait">

    <motion.div
      key={active}
      className="browser-screen"
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -25,
      }}
      transition={{
        duration: 0.45,
      }}
    >

      {active === 0 && renderDashboard()}
      {active === 1 && renderEvents()}
      {active === 2 && renderRegistrations()}
      {active === 3 && renderAnalytics()}

    </motion.div>

  </AnimatePresence>

  <motion.div
    className="browser-overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="overlay-content">

      <ActiveIcon size={22} />

      <div>
        <h3>{showcaseItems[active].title}</h3>
        <p>{showcaseItems[active].description}</p>
      </div>

      <ArrowRight size={18} />

    </div>
  </motion.div>

</div>
                        </motion.div>

          {/* ================= FLOATING GLASS CARDS ================= */}

          <motion.div
            className="ps-floating-cards"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {floatingCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 18,
                  }}
                  className={`floating-card card-${index + 1}`}
                >
                  <div className="floating-icon">
                    <Icon size={22} />
                  </div>

                  <div className="floating-info">
                    <span>{card.title}</span>
                    <h4>{card.value}</h4>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

        {/* ================= BRANDING ================= */}


      </div>

    </section>
  );
}

export default ProductShowcase;