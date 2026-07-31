import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  CalendarDays,
  Users,
  TrendingUp,
  Trophy,
} from "lucide-react";

import "../../styles/Statistics.css";

const stats = [
  {
    icon: CalendarDays,
    value: 500,
    suffix: "+",
    label: "Successful Events",
  },
  {
    icon: Users,
    value: 25000,
    suffix: "+",
    label: "Happy Attendees",
  },
  {
    icon: Trophy,
    value: 99,
    suffix: "%",
    label: "Client Satisfaction",
  },
  {
    icon: TrendingUp,
    value: 24,
    suffix: "/7",
    label: "Platform Availability",
  },
];

function LandingStatistics() {
  return (
    <section className="landing-statistics">

      <div className="statistics-container">

        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
              }}
            >
              <div className="stat-icon">
                <Icon size={28} />
              </div>

             <h2>
  {stat.value}
  {stat.suffix}
</h2>

              <p>{stat.label}</p>

            </motion.div>
          );
        })}

      </div>

    </section>
  );
}

export default LandingStatistics;