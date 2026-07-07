import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO.jsx';
import hero1 from '../assets/images/hero1.jpg';
import hero2 from '../assets/images/hero2.jpg';
import hero3 from '../assets/images/hero3.jpg';
import aboutImage from '../assets/images/about.jpg';
import imgA from '../assets/images/0d4a03e1-ee66-43d4-8d53-c7536d025842.jpg';
import imgB from '../assets/images/11a549e0-7b04-4301-ab52-fce4c275da46.jpg';
import imgC from '../assets/images/5f5120f6-527b-48aa-a8b3-24ee5ccfe130.jpg';

const galleryItems = [
  { src: imgA, category: 'Food Distribution', title: 'Meal Donation Drive' },
  { src: hero2, category: 'Medical Camps', title: 'Free Health Checkup' },
  { src: imgB, category: 'Education Programs', title: 'Supporting Young Minds' },
  { src: hero3, category: 'Social Campaigns', title: 'Community Gathering' },
  { src: imgC, category: 'Blood Donation', title: 'Saving Lives Together' },
  { src: hero1, category: 'Tree Plantation', title: 'Greener Tomorrow' },
  { src: aboutImage, category: 'Food Distribution', title: 'Nourishing Communities' },
  { src: imgB, category: 'Medical Camps', title: 'Rural Healthcare Outreach' },
  { src: imgC, category: 'Social Campaigns', title: 'Youth Empowerment Meet' },
];

const filters = ['All', 'Food Distribution', 'Medical Camps', 'Education Programs', 'Blood Donation', 'Tree Plantation', 'Social Campaigns'];

const Lightbox = ({ items, activeIndex, onClose, onPrev, onNext }) => {
  if (activeIndex === null) return null;

  const activeItem = items[activeIndex];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Main Image Container */}
      <motion.div
        className="relative max-w-5xl max-h-[90vh] w-full px-4 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeItem.src}-${activeIndex}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
            className="relative"
          >
            <img
              src={activeItem.src}
              alt={activeItem.title}
              className="w-full h-auto max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />
            {/* Caption Box */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-4 rounded-2xl shadow-xl text-center min-w-[250px]">
              <h3 className="text-xl font-bold text-white">{activeItem.title}</h3>
              <p className="text-sm font-medium text-orange-400 mt-1">{activeItem.category}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Controls */}
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 lg:top-10 lg:right-10 bg-white/10 hover:bg-red-500 hover:text-white p-3 rounded-full text-white/80 backdrop-blur-md transition-all duration-300 z-50 group"
      >
        <svg className="w-8 h-8 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      {activeIndex > 0 && (
        <button 
          onClick={(e) => { e.stopPropagation(); onPrev(); }} 
          className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 bg-white/10 p-4 rounded-full text-white backdrop-blur-md border border-white/10 hover:bg-white/30 hover:scale-110 transition-all duration-300 z-50"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
      )}

      {activeIndex < items.length - 1 && (
        <button 
          onClick={(e) => { e.stopPropagation(); onNext(); }} 
          className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 bg-white/10 p-4 rounded-full text-white backdrop-blur-md border border-white/10 hover:bg-white/30 hover:scale-110 transition-all duration-300 z-50"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
        </button>
      )}
    </motion.div>
  );
};

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(prev => (prev > 0 ? prev - 1 : prev));
  const nextImage = () => setLightboxIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : prev));

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeFilter]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <>
      <SEO 
        title="Gallery"
        description="View moments of service, compassion, and community spirit from our various activities and events captured in our photo gallery."
        keywords="NGO gallery, social work photos, event photos, foundation images" 
      />
      
      {/* Page Header (Height Adjusted back to py-24) */}
      <div className="relative py-20 text-white text-center overflow-hidden">
        <motion.img
          src={hero2}
          alt="A collection of photos representing the foundation's work"
          className="absolute inset-0 h-full w-full object-cover z-0"
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2F78]/90 via-[#0B2F78]/70 to-[#132B6B]/90 z-10" />
        
        <div className="relative z-20 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-3 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs sm:text-sm font-semibold tracking-wider uppercase text-blue-100"
          >
            Visual Journey
          </motion.div>
          <motion.h1 
            className="text-4xl font-extrabold sm:text-5xl lg:text-6xl drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Our Gallery
          </motion.h1>
          <motion.p 
            className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-blue-100/90 font-medium leading-relaxed drop-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Moments of service, compassion, and community spirit captured in time. Witness the impact of our united efforts.
          </motion.p>
        </div>
      </div>

      <div className="bg-[#FFF9F2] py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="mx-auto max-w-7xl">
          
          {/* Enhanced Filter Section (No Slider, Smart Wrap) */}
          <div className="mb-14">
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
              {filters.map(filter => (
                <motion.button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-5 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base font-bold transition-all duration-300 border ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white border-transparent shadow-[0_8px_20px_rgba(249,115,22,0.3)]'
                      : 'bg-white text-[#0B2F78] border-gray-200 hover:bg-orange-50 hover:border-orange-200 shadow-sm'
                  }`}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Enhanced Gallery Grid */}
          <motion.div layout className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  layout
                  key={`${item.src}-${index}`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                  onClick={() => openLightbox(index)}
                  className="group relative overflow-hidden rounded-[2rem] shadow-md hover:shadow-2xl bg-white border border-gray-100 cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative h-80 w-full overflow-hidden">
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                    />
                    
                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2F78] via-[#0B2F78]/50 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500"></div>
                    
                    {/* Centered Zoom Icon on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/40">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Caption Info */}
                  <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-lg">
                      <p className="text-sm font-bold text-[#FFD54F] tracking-wide uppercase">{item.category}</p>
                      <h3 className="text-xl font-extrabold text-white mt-1 drop-shadow-md">{item.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
      
      {/* Lightbox Rendering */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox 
            items={filteredItems} 
            activeIndex={lightboxIndex} 
            onClose={closeLightbox} 
            onPrev={prevImage} 
            onNext={nextImage} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;