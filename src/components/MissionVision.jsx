import React from 'react';
import { useLanguage } from './LanguageContext.jsx';
import { translations } from './translations.js';

export default function MissionVision() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <section id="mission" className="section-shell px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] bg-gradient-to-br from-[#0B3C91] to-[#154da8] p-8 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-200">{t.mission_vision.section_title}</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.mission_vision.title}</h2>
          <p className="mt-5 text-lg leading-8 text-white/80">{t.mission_vision.description}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {t.mission_vision.pillars.map((pillar) => (
            <div key={pillar.title} className="glass-card rounded-[1.5rem] p-6 shadow-lg">
              <div className="text-3xl">{pillar.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-[#0B3C91]">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
