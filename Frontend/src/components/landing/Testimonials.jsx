import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import "../../styles/testimonials.css";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Event Organizer",
    avatar: "https://i.pravatar.cc/150?img=32",
    review:
      "EventSphere completely transformed the way we manage our university events. Registrations and analytics are now effortless.",
  },
  {
    name: "David Wilson",
    role: "Conference Manager",
    avatar: "https://i.pravatar.cc/150?img=12",
    review:
      "The dashboard is incredibly intuitive. Everything from attendees to reports is available in one place.",
  },
  {
    name: "Emily Carter",
    role: "Community Lead",
    avatar: "https://i.pravatar.cc/150?img=45",
    review:
      "Professional design, smooth performance, and excellent event management features. Highly recommended!",
  },
  {
    name: "Michael Brown",
    role: "Corporate Planner",
    avatar: "https://i.pravatar.cc/150?img=56",
    review:
      "Our entire workflow became faster after switching to EventSphere. The analytics are especially impressive.",
  },
  {
    name: "Sophia Davis",
    role: "College Coordinator",
    avatar: "https://i.pravatar.cc/150?img=24",
    review:
      "The interface is beautiful and easy to use. Students love how simple registration has become.",
  },
  {
    name: "James Miller",
    role: "Tech Meetup Host",
    avatar: "https://i.pravatar.cc/150?img=18",
    review:
      "Exactly what we needed for managing multiple events. Everything feels premium and polished.",
  },
];

function TestimonialCard({ item }) {
  return (
    <div className="testimonial-card">
      <Quote className="quote-icon" size={28} />

      <div className="testimonial-stars">
        {[...Array(5)].map((_, index) => (
          <Star key={index} size={16} fill="currentColor" />
        ))}
      </div>

      <p>{item.review}</p>

      <div className="testimonial-user">
        <img src={item.avatar} alt={item.name} />

        <div>
          <h4>{item.name}</h4>
          <span>{item.role}</span>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="testimonials-bg"></div>

      <motion.div
        className="testimonials-header"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">
          Trusted by Event Organizers
        </span>

        <h2>
          Loved by
          <span> Thousands of Teams</span>
        </h2>

        <p>
          EventSphere empowers organizations, universities, and businesses to
          manage events with confidence.
        </p>

        <div className="testimonial-stats">
          <div>
            <h3>4.9★</h3>
            <span>Average Rating</span>
          </div>

          <div>
            <h3>10K+</h3>
            <span>Active Users</span>
          </div>

          <div>
            <h3>500+</h3>
            <span>Successful Events</span>
          </div>
        </div>
      </motion.div>

      <div className="testimonial-slider">
        <motion.div
          className="testimonial-track"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          {[...testimonials, ...testimonials].map((item, index) => (
            <TestimonialCard
              key={index}
              item={item}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;