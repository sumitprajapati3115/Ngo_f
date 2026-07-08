import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext.jsx';
import { translations } from './translations.js';

export default function JoinMember() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="bg-[#F97316]/5 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="rounded-[2rem] bg-gradient-to-br from-[#0B2F78] to-[#0F4AA8] p-10 text-white shadow-2xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#FFD54F]">{t.membership_process}</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.join_family}</h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-[#F3E1A3]">
              {t.join_description}
            </p>
          </div>
          <div className="relative mt-12">
            <div className="absolute left-1/2 top-4 hidden h-full w-0.5 bg-white/20 lg:block" aria-hidden="true"></div>
            <div className="relative grid gap-8 lg:grid-cols-2">
              {t.processes.map((item, index) => (
                <motion.div 
                  key={item.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-center gap-6 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] text-3xl shadow-lg">
                    {item.icon}
                  </div>
                  <p className="text-lg font-semibold text-white">{item.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Free Member Card */}
          <motion.div 
            whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }} 
            className="relative flex flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all"
          >
            <div className="flex-grow">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-3xl text-[#EA580C]">
                  👤
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0B2F78]">{t.free_member}</h3>
                  <p className="text-sm font-medium text-slate-500">Get started for free</p>
                </div>
              </div>
              <p className="mt-6 text-slate-600">{t.free_member_desc}</p>
            </div>
            <Link to="/membership" className="mt-8 block w-full rounded-full border-2 border-[#0B2F78] px-6 py-3 text-center font-semibold text-[#0B2F78] transition-colors hover:bg-[#0B2F78] hover:text-white">
              {t.form.join_now}
            </Link>
          </motion.div>

          {/* Active Member Card */}
          <motion.div 
            whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }} 
            className="relative flex flex-col rounded-3xl border-2 border-[#F97316] bg-gradient-to-br from-orange-50 to-amber-100 p-6 sm:p-8 shadow-lg transition-all"
          >
            <div className="absolute top-0 right-8 -mt-4 rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] px-4 py-1.5 text-xs font-bold uppercase text-white shadow-md">
              Recommended
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-3xl text-[#EA580C] shadow-inner">
                  ⭐
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0B2F78]">{t.active_member}</h3>
                  <p className="text-sm font-medium text-slate-500">Unlock full benefits</p>
                </div>
              </div>
              <p className="mt-6 text-slate-600">{t.active_member_desc}</p>
              <ul className="mt-6 space-y-3 text-slate-700">
                <li className="flex items-center gap-3"><svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>All Free Member benefits</li>
                <li className="flex items-center gap-3"><svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Photo & Aadhaar Upload</li>
                <li className="flex items-center gap-3"><svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Membership ID & Certificate</li>
                <li className="flex items-center gap-3"><svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Access to Dashboard</li>
              </ul>
            </div>
            <Link to="/membership" className="mt-auto block w-full rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] px-6 py-3 text-center font-semibold text-white shadow-lg transition-transform hover:scale-105">
              Become an Active Member
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
