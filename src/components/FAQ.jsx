import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext.jsx';
import { translations } from './translations.js';

const AccordionItem = ({ faq, isOpen, onClick }) => (
  <div className={`border-b border-gray-200 last:border-b-0 transition-colors duration-300 ${isOpen ? 'bg-orange-50/50' : ''}`}>
    <button
      className="flex justify-between items-center w-full text-left p-6"
      onClick={onClick}
    >
      <h3 className={`text-lg font-semibold ${isOpen ? 'text-[#EA580C]' : 'text-[#0B2F78]'}`}>{faq.question}</h3>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-[#F97316]"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0, marginTop: 0 }}
          animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }}
          exit={{ height: 0, opacity: 0, marginTop: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="text-gray-600 leading-relaxed px-6 pb-4">{faq.answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0B2F78] sm:text-4xl">{t.faq.title}</h2>
        </div>
        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
          {t.faq.questions.map((faq, index) => (
            <AccordionItem key={index} faq={faq} isOpen={openIndex === index} onClick={() => setOpenIndex(openIndex === index ? null : index)} />
          ))}
        </div>
      </div>
    </section>
  );
}