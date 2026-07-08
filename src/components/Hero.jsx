import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext.jsx';
import { translations } from './translations.js';
import heroBg1 from '../assets/images/hero1.jpg';
import heroBg2 from '../assets/images/hero2.jpg';
import heroBg3 from '../assets/images/hero3.jpg';


const backgroundImages = [
  heroBg1,
  heroBg2,
  heroBg3,
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const { language } = useLanguage(); 
  const t = translations[language];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-gray-900 text-white">
      <AnimatePresence>
        <motion.img
          key={currentImage}
          src={backgroundImages[currentImage]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0B2F78]/60 via-[#132B6B]/40 to-transparent" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-32 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-40">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-8 text-left"
        >
          {/* Top tagline removed to show clean hero text */}

          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {t.hero.title}
            </h1>
            <p className="max-w-3xl mx-auto lg:mx-0 text-lg leading-8 text-[#FCE8B0] sm:text-xl">
              {t.hero.description}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-wrap justify-start gap-4"
          >
            <Link to="/membership" className="rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] px-8 py-3 text-sm font-semibold text-white shadow-2xl transition-transform hover:scale-105">
              {t.hero.join_now}
            </Link>
            <Link to="/donate" className="rounded-full border border-white/40 bg-white/10 px-8 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-white/20">
              {t.donate_now}
            </Link>
            <a href="#about" className="rounded-full border border-[#FFD54F]/40 bg-[#FFD54F]/10 px-8 py-3 text-sm font-semibold text-[#FFD54F] transition-transform hover:scale-105 hover:bg-[#FFD54F]/20">
              {t.hero.learn_more}
            </a>
          </motion.div>

          {/* Stats removed per request */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative hidden items-center justify-center lg:flex"
        >
          <div className="relative w-[450px] h-[450px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F97316] to-[#0B2F78] rounded-full blur-2xl opacity-50"></div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
