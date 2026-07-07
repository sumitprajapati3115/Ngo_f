import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Loader from './components/Loader.jsx';
import ScrollTop from './components/ScrollTop.jsx';
import FloatingButtons from './components/FloatingButtons.jsx';
import ParticleBackground from './components/ParticleBackground.jsx';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen text-slate-800">
      {/* Solid Background Color */}
      <div className="fixed inset-0 -z-20 bg-[#FFF9F2]" />
      {/* Watermark Background */}
      <motion.div
        className="fixed inset-0 z-[-5] bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage: `url('https://e1.pxfuel.com/desktop-wallpaper/810/556/desktop-wallpaper-shree-ram-navami-ram-ji-black-and-white.jpg')`,
          backgroundSize: 'contain',
          backgroundPosition: 'center 10%',
        }}
      />
      {!isLoaded ? <Loader /> : null}
      <div className="absolute inset-0 -z-10"><ParticleBackground /></div>
      <Navbar />
      <main className="overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <ScrollTop />
    </div>
  );
}

export default App;
