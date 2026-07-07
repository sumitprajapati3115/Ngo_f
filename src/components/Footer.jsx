import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import logoSrc from '../assets/images/logo.png';
import { useLanguage } from './LanguageContext.jsx';
import { translations } from './translations.js';

// Real brand colors for social media
const socialLinks = [
  { icon: FaFacebookF, href: '#', color: '#1877F2', name: 'Facebook' },
  { icon: FaTwitter, href: '#', color: '#1DA1F2', name: 'Twitter' },
  { icon: FaInstagram, href: '#', color: '#E4405F', name: 'Instagram' },
  { icon: FaLinkedinIn, href: '#', color: '#0A66C2', name: 'LinkedIn' },
  { icon: FaYoutube, href: '#', color: '#FF0000', name: 'YouTube' },
];

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="relative bg-gradient-to-br from-[#0B2F78] to-[#081e52] text-white overflow-hidden">
      {/* Subtle Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Column 1: Brand & Social (Spans 4 columns on large screens) */}
          <div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-2 rounded-2xl backdrop-blur-sm border border-white/10">
                <img src={logoSrc} alt="Shri Ram Youth Foundation Logo" className="h-20 w-auto object-contain drop-shadow-md" />
              </div>
              <div className="flex flex-col">
                <p className="text-2xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FFD54F]">
                  {t.shree_ram}
                </p>
                <p className="text-sm font-bold tracking-widest text-blue-100 uppercase mt-0.5">
                  {t.youth_foundation}
                </p>
              </div>
            </div>
            
            <p className="mt-6 text-blue-100/80 leading-relaxed max-w-sm font-medium">
              {t.tagline}
            </p>
            
            {/* Dynamic Social Icons */}
            <div className="mt-8 flex gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.1, 
                    backgroundColor: link.color, 
                    color: '#ffffff',
                    boxShadow: `0 10px 15px -3px ${link.color}60`
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 border border-white/5"
                >
                  <link.icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (Spans 2 columns) */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-lg font-bold uppercase tracking-wider text-[#FFD54F] mb-6 relative inline-block">
              {t.quick_links.title}
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#F97316] rounded-full hidden md:block"></span>
            </p>
            <ul className="space-y-4">
              {t.quick_links.links.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="group flex items-center text-blue-100/80 transition-all hover:text-white font-medium">
                    <span className="h-1 w-1 bg-orange-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">{link.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Work (Spans 2 columns) */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-lg font-bold uppercase tracking-wider text-[#FFD54F] mb-6 relative inline-block">
              {t.our_work.title}
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#F97316] rounded-full hidden md:block"></span>
            </p>
            <ul className="space-y-4">
              {t.our_work.links.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="group flex items-center text-blue-100/80 transition-all hover:text-white font-medium">
                    <span className="h-1 w-1 bg-orange-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">{link.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Map (Spans 4 columns) */}
          <div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-lg font-bold uppercase tracking-wider text-[#FFD54F] mb-6 relative inline-block">
              {t.get_in_touch.title}
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#F97316] rounded-full hidden md:block"></span>
            </p>
            
            <ul className="space-y-4 text-blue-100/90 font-medium w-full max-w-sm">
              <li className="flex items-start justify-center md:justify-start gap-3">
                <FaMapMarkerAlt className="text-orange-400 mt-1 shrink-0 text-lg" />
                <span>{t.get_in_touch.address}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <FaEnvelope className="text-orange-400 shrink-0 text-lg" />
                <a href={`mailto:${t.get_in_touch.email}`} className="transition-colors hover:text-orange-300">{t.get_in_touch.email}</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <FaPhoneAlt className="text-orange-400 shrink-0 text-lg" />
                <a href={`tel:${t.get_in_touch.phone.replace(/ /g, '')}`} className="transition-colors hover:text-orange-300">{t.get_in_touch.phone}</a>
              </li>
            </ul>

            {/* Premium Map Container */}
            <div className="mt-8 w-full h-40 md:h-48 rounded-2xl overflow-hidden shadow-lg border-2 border-white/10 group relative">
              <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none z-10"></div>
              <iframe
                title="Location Map"
                src={t.get_in_touch.map_url}
                className="h-full w-full border-0 grayscale-[20%] contrast-[1.1] group-hover:grayscale-0 transition-all duration-500 relative z-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-blue-200/60">
          <p>&copy; {new Date().getFullYear()} Shri Ram Youth Foundation. {t.copyright}</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-orange-500">❤</span> for Humanity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;