import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext.jsx';
import { translations } from './translations.js';

const services = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12.25A10 10 0 0 0 12 22a10 10 0 0 0 10-9.75" /><path d="M2 12.25h20" /><path d="m16 6-4-4-4 4" /></svg>,
    image: 'https://c8.alamy.com/comp/FJ1MH2/food-distribution-in-a-street-of-delhi-india-FJ1MH2.jpg' // Food Distribution
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
    image: 'https://www.21kschool.com/tw/wp-content/uploads/sites/25/2021/01/jpg.jpg' // Education Support
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
    image: 'https://tse2.mm.bing.net/th/id/OIP.-ahukAzY9F04Dftl7T4vJwHaE8?w=660&h=440&rs=1&pid=ImgDetMain&o=7&rm=3' // Medical Camps
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>,
    image: 'https://tse2.mm.bing.net/th/id/OIP.hJ_CfeZg7dz5ucHW7Sli9QHaD2?rs=1&pid=ImgDetMain&o=7&rm=3' // Blood Donation
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.9 10.4A6.25 6.25 0 0 1 12 18a6.25 6.25 0 0 1-8.9-8.6A6.25 6.25 0 0 1 12 2a6.25 6.25 0 0 1 8.9 8.4z" /><path d="M12 18a6.25 6.25 0 0 1 0-12c0 4.42 4.42 8 0 12z" /></svg>,
    image: 'https://cutn.ac.in/wp-content/uploads/2023/08/Tree-Plantation-1.jpg' // Tree Plantation
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    image: 'https://cms.foundationallearning.in/wp-content/uploads/2024/07/Image-2.jpeg' // Women Empowerment
  },
];

export default function Services() {
  const { language } = useLanguage();
  const t = translations[language];
  const serviceData = t.services.services.map((service, index) => ({ ...service, ...services[index] }));
  const [activeService, setActiveService] = useState(serviceData[0]);

  return (
    <section id="services" className="bg-[#FFF9F2] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#F97316]">{t.services.section_title}</p>
          <h2 className="mt-3 text-3xl font-bold text-[#0B2F78] sm:text-4xl">{t.services.title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Image */}
          <motion.div className="relative h-96 lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <AnimatePresence>
              <motion.img
                key={activeService.image}
                src={activeService.image}
                alt={activeService.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h3 className="text-3xl font-bold">{activeService.title}</h3>
              <p className="mt-2 text-lg text-white/90">{activeService.desc}</p>
            </div>
          </motion.div>

          {/* Right Side: Service List */}
          <div className="space-y-4">
            {serviceData.map((service) => (
              <motion.div
                key={service.title}
                onHoverStart={() => setActiveService(service)}
                className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  activeService.title === service.title ? 'bg-white shadow-xl' : 'bg-white/50 hover:bg-white/80'
                }`}
              >
                {activeService.title === service.title && (
                  <motion.div
                    layoutId="active-service-border"
                    className="absolute inset-0 rounded-2xl border-2 border-[#F97316]"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white shadow-lg">
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#0B2F78]">{service.title}</h4>
                    <AnimatePresence>
                      {activeService.title === service.title && (
                        <motion.p
                          className="text-sm text-gray-600 mt-1"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {service.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
