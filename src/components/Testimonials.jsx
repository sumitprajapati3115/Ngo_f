import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext.jsx';
import { translations } from './translations.js';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Volunteer',
    rating: 5,
  },
  {
    name: 'Ramesh Kumar',
    role: 'Beneficiary',
    rating: 5,
  },
  {
    name: 'Sunita Devi',
    role: 'Teacher',
    rating: 5,
  },
   {
    name: 'Vikram Singh',
    role: 'Donor',
    rating: 5,
  },
  {
    name: 'Anjali Patel',
    role: 'Volunteer',
    rating: 4,
  },
];

const StarRating = ({ rating }) => (
  <div className="flex text-yellow-400 gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-5 h-5 drop-shadow-sm ${i < rating ? 'text-[#FFD54F]' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.365 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.448a1 1 0 00-1.175 0l-3.365 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
      </svg>
    ))}
  </div>
);

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const { language } = useLanguage();
  const t = translations[language];

  const nextTestimonial = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000); // Slightly slower for better reading
    return () => clearInterval(timer);
  }, [index]);

  const getCardStyle = (cardIndex) => {
    const total = testimonials.length;
    const offset = (cardIndex - index + total) % total;

    if (offset === 0) return { zIndex: 30, transform: 'scale(1) translateX(0)', opacity: 1 };
    if (offset === 1) return { zIndex: 20, transform: 'scale(0.85) translateX(90%)', opacity: 0.5 };
    if (offset === total - 1) return { zIndex: 20, transform: 'scale(0.85) translateX(-90%)', opacity: 0.5 };
    
    return { zIndex: 10, transform: `scale(0.7) translateX(${offset < total / 2 ? 150 : -150}%)`, opacity: 0 };
  };

  return (
    <section className="bg-gradient-to-b from-[#FFF9F2] to-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Decorative Blurs */}
      <div className="absolute top-10 left-0 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-12 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-sm font-bold tracking-widest uppercase mb-4">
            {t.testimonials.section_title}
          </span>
          <h2 className="text-4xl font-extrabold text-[#0B2F78] sm:text-5xl">{t.testimonials.title}</h2>
        </div>

        {/* Carousel Container - Height reduced here */}
        <div className="relative h-[24rem] sm:h-[20rem] flex items-center justify-center">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              // Width reduced from max-w-2xl to max-w-xl
              className="absolute w-full max-w-xl px-4 sm:px-0"
              initial={false}
              animate={getCardStyle(i)}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
              {/* Premium Testimonial Card - Padding adjusted */}
              <div className="rounded-[2rem] bg-white p-6 sm:p-8 text-center shadow-xl border border-slate-100 relative overflow-hidden h-full flex flex-col justify-center items-center group">
                
                {/* Background Watermark Quote */}
                <FaQuoteLeft className="absolute -top-4 -left-4 text-8xl text-slate-50 opacity-60 -rotate-12 transition-transform duration-500 group-hover:scale-110" />

                <div className="relative z-10 flex flex-col items-center w-full">
                  {/* Floating Top Quote Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 text-orange-500 rounded-full flex items-center justify-center text-lg mb-4 shadow-sm border border-orange-100">
                    <FaQuoteLeft />
                  </div>
                  
                  <StarRating rating={testimonial.rating} />
                  
                  {/* Text size slightly adjusted for compact card */}
                  <p className="mt-4 text-base sm:text-lg italic text-slate-600 leading-relaxed font-medium min-h-[80px] flex items-center justify-center">
                    "{t.testimonials.quotes[i]}"
                  </p>
                  
                  {/* Custom Divider */}
                  <div className="w-10 h-1 bg-gradient-to-r from-[#F97316] to-[#0B2F78] rounded-full mt-6 mb-4"></div>
                  
                  <h3 className="text-xl font-extrabold text-[#0B2F78]">{testimonial.name}</h3>
                  <p className="text-xs font-bold tracking-widest text-orange-500 uppercase mt-1">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Navigation Buttons */}
        <div className="mt-12 flex justify-center gap-6">
          <button 
            onClick={prevTestimonial} 
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md border border-slate-100 text-[#0B2F78] hover:bg-[#F97316] hover:text-white hover:scale-110 hover:shadow-orange-500/30 transition-all duration-300"
            aria-label="Previous Testimonial"
          >
            <FaChevronLeft className="text-lg" />
          </button>
          <button 
            onClick={nextTestimonial} 
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md border border-slate-100 text-[#0B2F78] hover:bg-[#F97316] hover:text-white hover:scale-110 hover:shadow-orange-500/30 transition-all duration-300"
            aria-label="Next Testimonial"
          >
            <FaChevronRight className="text-lg" />
          </button>
        </div>

      </div>
    </section>
  );
}