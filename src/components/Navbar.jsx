import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logoSrc from '../assets/images/logo.png';
import { useLanguage } from './LanguageContext.jsx';
import { translations } from './translations.js';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { key: 'home', path: '/' },
    { key: 'about_us', path: '/about' },
    { key: 'team', path: '/team' },
    { key: 'activities', path: '/activities' },
    { key: 'events', path: '/events' },
    { key: 'gallery', path: '/gallery' },
    { key: 'membership', path: '/membership' },
    { key: 'contact', path: '/contact' },
  ];

  // Dynamic classes for shrinking effect on scroll
  const navContainerClass = isScrolled
    ? 'bg-white/95 shadow-md backdrop-blur-xl border-b border-slate-200 py-1'
    : 'bg-white/90 shadow-sm backdrop-blur-xl border-b border-transparent py-3';

  const logoImageClass = isScrolled 
    ? 'h-16 sm:h-20' 
    : 'h-24 sm:h-28'; // Much bigger logo when at the top

  const textScaleClass = isScrolled 
    ? 'text-lg sm:text-xl' 
    : 'text-xl sm:text-2xl';

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col">
      {/* Top Branding Thin Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#F97316] via-[#FFD54F] to-[#0B2F78]"></div>

      <div className={`transition-all duration-500 ease-in-out w-full ${navContainerClass}`}>
        {/* Adjusted max-width and padding for better edge-to-edge alignment */}
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 xl:px-12">
          
          {/* Logo & Brand Name (Left Aligned) */}
          <NavLink to="/" className="flex flex-shrink-0 items-center gap-3 sm:gap-4 group">
            <img 
              src={logoSrc} 
              alt="Shri Ram Youth Foundation Logo" 
              className={`w-auto object-contain drop-shadow-sm transition-all duration-500 ease-in-out group-hover:scale-105 ${logoImageClass}`} 
            />
            <div className="flex flex-col justify-center">
              <span className={`bg-gradient-to-r from-[#F97316] to-[#0B2F78] bg-clip-text font-black uppercase tracking-widest text-transparent transition-all duration-500 leading-tight ${textScaleClass}`}>
                श्री राम
              </span>
              <span className="text-[10px] sm:text-xs font-extrabold tracking-[0.2em] text-slate-600 uppercase mt-0.5">
                Youth Foundation
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation (Centered between logo and buttons) */}
          <ul className="hidden items-center justify-center lg:flex whitespace-nowrap flex-1 ml-4 xl:ml-8">
            {menuItems.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={item.path}
                  onClick={() => window.scrollTo(0, 0)}
                  className={({ isActive }) => `relative block rounded-full px-3 xl:px-4 py-2 text-sm xl:text-[15px] font-bold tracking-wide transition-colors duration-300 ${isActive ? 'text-[#0B2F78]' : 'text-slate-600 hover:text-[#EA580C]'}`}
                >
                  {({ isActive }) => (
                    <>
                      {t[item.key]}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-3 right-3 h-[3px] rounded-t-full bg-gradient-to-r from-[#F97316] to-[#EA580C]"
                          layoutId="navbar-underline"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Action Buttons (Right Aligned) */}
          <div className="hidden items-center gap-3 lg:flex whitespace-nowrap shrink-0">
            <button
              onClick={toggleLanguage}
              className="flex h-10 items-center justify-center rounded-full border-2 border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-700 transition-all hover:border-[#0B2F78] hover:text-[#0B2F78] hover:shadow-sm"
              aria-label="Toggle Language"
            >
              {language === 'en' ? 'हिन्दी' : 'ENG'}
            </button>
            
            <NavLink 
              to="/admin/login" 
              className="flex h-10 items-center justify-center rounded-full border-2 border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition-all hover:bg-slate-100"
            >
              {t.login}
            </NavLink>

            <a 
              href="/donate" 
              className="relative flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] px-6 text-sm font-extrabold text-white shadow-[0_4px_14px_rgba(249,115,22,0.4)] transition-all hover:scale-105 hover:shadow-[0_6px_20px_rgba(249,115,22,0.6)]"
            >
              {t.donate_now}
              <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-[#0B2F78] transition-colors hover:bg-orange-50 hover:border-orange-200 lg:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-[#0B2F78]/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
                <span className="font-extrabold text-[#0B2F78] tracking-widest uppercase">Menu</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full bg-white shadow-sm border border-slate-200 text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <div className="p-5 overflow-y-auto flex-1">
                <ul className="flex flex-col gap-2">
                  {menuItems.map((item) => (
                    <li key={item.key}>
                      <NavLink
                        to={item.path}
                        onClick={() => {
                          setIsMenuOpen(false);
                          window.scrollTo(0, 0);
                        }}
                        className={({ isActive }) => `block rounded-xl px-5 py-3.5 text-base font-bold transition-all ${isActive ? 'bg-orange-50 text-[#EA580C] shadow-sm border border-orange-100' : 'text-slate-600 hover:bg-slate-50 hover:text-[#0B2F78]'}`}
                      >
                        {t[item.key]}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
                <a href="/donate" className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#F97316] to-[#EA580C] px-4 py-4 text-center text-base font-extrabold text-white shadow-[0_4px_14px_rgba(249,115,22,0.4)]">
                  {t.donate_now}
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={toggleLanguage}
                    className="flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-100"
                  >
                    {language === 'en' ? 'हिन्दी' : 'English'}
                  </button>
                  <NavLink
                    to="/admin/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-100"
                  >
                    {t.login}
                  </NavLink>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;