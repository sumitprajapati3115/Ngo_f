import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Founder from '../components/Founder.jsx';
import MissionVision from '../components/MissionVision.jsx';
import Stats from '../components/Stats.jsx';
import Services from '../components/Services.jsx';
import Team from '../components/Team.jsx';
import JoinMember from '../components/JoinMember.jsx';
import Testimonials from '../components/Testimonials.jsx';
import FAQ from '../components/FAQ.jsx';

const Home = () => {
  return (
    <>
      <SEO 
        title="Home" 
        description="Shri Ram Youth Foundation - A youth-led organization connecting youth and serving humanity through social service, education, and healthcare initiatives."
        keywords="NGO, social work, youth foundation, Kanpur, humanity, education, healthcare" 
      />
      
      {/* Premium Page Load Animation Wrapper */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full overflow-hidden bg-[#FFF9F2]"
      >
        <Hero />
        <About />
        <Founder />
        <MissionVision />
        <Stats />
        <Services />
        <Team />
        <Testimonials />
        <JoinMember />
        <FAQ />
      </motion.main>
    </>
  );
};

export default Home;