import { motion } from "framer-motion";
import {
  CalendarDays,
  Users,
  BarChart3
} from "lucide-react";

import "../../styles/eventExperience.css";
import featuresImage from "../../assets/images/features-mockup.png";
const features = [
  {
    icon: <CalendarDays size={26} />,
    title: "Plan Beautiful Events",
    text: "Create conferences, workshops, festivals and university events in minutes."
  },
  {
    icon: <Users size={26} />,
    title: "Manage Every Attendee",
    text: "Track registrations, ticket sales, payments and participant details effortlessly."
  },
  {
    icon: <BarChart3 size={26} />,
    title: "Measure Success",
    text: "Real-time analytics help organizers understand attendance and engagement."
  }
];

function EventExperience() {
  return (
<section
    className="experience-section"
    id="experience"
>
      <div className="experience-left">

        <span className="experience-tag">
          EXPERIENCE
        </span>

        <h2>
          Built for modern
          <br />
          event organizers.
        </h2>

        <p>
          Everything from planning to analytics is designed to save time,
          reduce manual work and deliver a better experience for organizers
          and attendees.
        </p>

        <div className="experience-list">

          {features.map((item) => (

            <motion.div
              whileHover={{ x: 8 }}
              className="experience-item"
              key={item.title}
            >
              <div className="experience-icon">
                {item.icon}
              </div>

              <div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </motion.div>

          ))}

        </div>

      </div>

<motion.div
  className="experience-right"
  initial={{ opacity: 0, x: 60 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
        <img
  src={featuresImage}
  alt="Event Experience"
  loading="lazy"
/>

</motion.div>
    </section>
  );
}

export default EventExperience;