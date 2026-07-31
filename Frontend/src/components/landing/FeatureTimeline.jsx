import { motion } from "framer-motion";
import {
  CalendarPlus,
  Users,
  ClipboardCheck,
  BarChart3,
} from "lucide-react";

import "../../styles/featureTimeline.css";

const steps = [
  {
    number: "01",
    icon: CalendarPlus,
    title: "Create Event",
    description:
      "Create conferences, workshops, hackathons or university events with all essential details.",
  },
  {
    number: "02",
    icon: Users,
    title: "Manage Registrations",
    description:
      "Collect registrations, attendee information and manage participants effortlessly.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Organize Everything",
    description:
      "Allocate rooms, manage schedules, approvals and event operations from one dashboard.",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Track Analytics",
    description:
      "Monitor registrations, attendance, engagement and event performance in real time.",
  },
];

function FeatureTimeline() {
  return (
<section
  className="timeline-section"
  id="features"
>
      <div className="timeline-glow timeline-glow-left"></div>
      <div className="timeline-glow timeline-glow-right"></div>

      <div className="timeline-container">

        {/* Header */}

        <motion.div
          className="timeline-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="timeline-badge">
            ✦ HOW IT WORKS
          </span>

          <h2>
            Organize Every Event
            <br />
            in Four <span>Simple Steps</span>
          </h2>

          <p>
            EventSphere streamlines your workflow from event creation
            to analytics so you can focus on delivering memorable
            experiences instead of managing spreadsheets.
          </p>
        </motion.div>

        {/* Timeline */}

        <div className="timeline-wrapper">

          {/* Connecting Line */}

          <div className="timeline-line"></div>

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <motion.div
                key={step.number}
                className="timeline-column"
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: .6,
                  delay: index * .15,
                }}
              >

                {/* Number */}

                <div className="timeline-step">

                  <div className="timeline-number">
                    {step.number}
                  </div>

                </div>

                {/* Connector */}

                <div className="timeline-connector"></div>

                {/* Card */}

                <div className="timeline-card">

                  <div className="timeline-icon">

                    <Icon size={42} />

                  </div>

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.description}
                  </p>

                </div>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}

export default FeatureTimeline;