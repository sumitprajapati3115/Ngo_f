import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext.jsx';
import { translations } from './translations.js';
import aboutImage from '../assets/images/about.jpg';

export default function About() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <section id="about" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-24">
          {/* Image Section */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <img src={aboutImage} alt="Community Service" className="rounded-3xl shadow-2xl" />
            <div className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 w-48 rounded-2xl bg-gradient-to-br from-[#0B2F78] to-[#132B6B] p-6 text-white shadow-2xl">
              <h4 className="text-4xl font-bold">12K+</h4>
              <p className="mt-2 text-sm text-blue-200">{t.about.members_strong}</p>
            </div>
          </motion.div>

          {/* Text Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F97316]">{t.about.section_title}</p>
            <h2 className="mt-4 text-3xl font-bold text-[#0B2F78] sm:text-4xl">{t.about.title}</h2>
            <p className="mt-6 text-lg leading-8 text-[#1F2937]">
              {t.about.description}
            </p>
            
            <div className="mt-8 space-y-6">
              {t.about.values.map((value, index) => (
                <motion.div 
                  key={value.title} 
                  className="flex items-start gap-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] text-2xl text-white shadow-lg">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0B2F78]">{value.title}</h3>
                    <p className="mt-1 text-gray-600">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
             <a href="/about" className="mt-10 inline-block rounded-full bg-gradient-to-r from-[#0B2F78] to-[#132B6B] px-8 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105">
                {t.about.learn_more}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
