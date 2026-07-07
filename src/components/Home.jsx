import React from 'react';

import SEO from '../components/SEO.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Founder from '../components/Founder.jsx';
import MissionVision from '../components/MissionVision.jsx';
import Stats from '../components/Stats.jsx';
import Services from '../components/Services.jsx';
import Team from '../components/Team.jsx';
import Testimonials from '../components/Testimonials.jsx';
import LatestNews from '../components/LatestNews.jsx';
import FAQ from '../components/FAQ.jsx';
import JoinMember from '../components/JoinMember.jsx';

const Home = () => {
  return (
    <>
      <SEO
        title="Home - Shri Ram Youth Foundation"
        description="A youth-led organization bringing positive change to society through education, health, food, blood donation, and nation building in Kanpur, India."
        keywords="NGO Kanpur, Shri Ram Youth Foundation, youth empowerment, social service, education NGO, healthcare NGO"
      />
      <Hero />
      <About />
      <Founder />
      <MissionVision />
      <Services />
      <Stats />
      <Team />
      <Testimonials />
      <LatestNews />
      <FAQ />
      <JoinMember />
    </>
  );
};

export default Home;