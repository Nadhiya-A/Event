import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import ProductShowcase from "../components/landing/ProductShowcase";
import EventExperience from "../components/landing/EventExperience";
import FeatureTimeline from "../components/landing/FeatureTimeline";
import LandingStatistics from "../components/landing/LandingStatistics";
import Testimonials from "../components/landing/Testimonials";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

import "../styles/LandingPage.css";

function LandingPage({ theme, toggleTheme }) {
  return (
    <>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <Hero />

      <ProductShowcase />

      <EventExperience />

      <FeatureTimeline />

      <LandingStatistics />

      <Testimonials />

      <CTA />

      <Footer />
    </>
  );
}

export default LandingPage;