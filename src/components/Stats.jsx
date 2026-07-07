import React, { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';
import { useLanguage } from './LanguageContext.jsx';
import { translations } from './translations.js';

function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && ref.current) {
      const node = ref.current;
      const controls = animate(0, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = `${Math.round(value).toLocaleString()}${suffix}`;
        },
      });
      return () => controls.stop();
    }
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Stats() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="bg-gradient-to-b from-white to-[#FFF9F2] py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F97316]">{t.stats.section_title}</p>
          <h2 className="mt-3 text-3xl font-bold text-[#0B2F78] sm:text-4xl">{t.stats.title}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[#1F2937]">
            {t.stats.description}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {t.stats.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center rounded-3xl bg-white p-8 shadow-xl transition-transform duration-300 hover:-translate-y-2">
              <div className="text-5xl">{stat.icon}</div>
              <div className="mt-4 text-5xl font-extrabold text-[#0B2F78]">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-3 text-lg font-semibold text-[#F97316]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}