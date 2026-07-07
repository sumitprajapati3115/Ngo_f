import React from 'react';
import { motion } from 'framer-motion';

const founders = [
  {
    name: 'Mr. Abhijeet Singh Sanga',
    role: 'Member of UP Legislative Assembly',
    description: 'He represents the Bithoor assembly. A dedicated leader striving for the development and welfare of the community.',
    image: '/src/assets/images/Member1.webp',
    tag: 'Community Leader',
    // Card background aur text color
    cardClass: 'from-[#F97316] to-[#FDBA74] text-slate-900',
    // Badges ke dark variants for light background
    badgeClass: 'bg-black/10 text-slate-900 shadow-black/5 ring-black/20',
    dotClass: 'bg-slate-800'
  },
  {
    name: 'Manoj Kumar Bhadauria',
    role: 'Advocate, Educationist & Social Worker',
    description: 'Chairman Shriram Group of Education. Passionate about empowering society through quality education and social service.',
    image: '/src/assets/images/Member2.webp',
    tag: 'Social Worker',
    // Card background aur text color
    cardClass: 'from-[#0B2F78] to-[#1D4ED8] text-white',
    // Badges ke light variants for dark background
    badgeClass: 'bg-white/15 text-white shadow-black/10 ring-white/20',
    dotClass: 'bg-white/90'
  },
];

const Founder = () => {
  return (
    <section id="founder" className="bg-[#FFF9F2] py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mx-auto max-w-3xl pb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F97316]">
            Our Founder
          </p>
          <h2 className="mt-4 text-3xl font-bold text-[#0B2F78] sm:text-4xl lg:text-5xl leading-tight">
            Visionary leaders driving our mission.
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {founders.map((founder) => (
            <motion.div
              key={founder.name}
              className={`rounded-[2rem] shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br ${founder.cardClass}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_1.5fr] items-center h-full">
                
                {/* Image Container with fixed aspect ratio for mobile and flexible for desktop */}
                <div className="relative overflow-hidden rounded-[1.5rem] border-4 border-white/40 shadow-lg aspect-square md:aspect-[4/5] w-full max-w-sm mx-auto md:max-w-none">
                  <img 
                    src={founder.image} 
                    alt={founder.name} 
                    className="h-full w-full object-cover object-top hover:scale-105 transition-transform duration-500" 
                  />
                </div>

                {/* Content Section */}
                <div className="flex flex-col h-full justify-center text-left">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                      {founder.name}
                    </h3>
                    <p className={`mt-3 inline-flex rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm ${founder.badgeClass}`}>
                      {founder.role}
                    </p>
                    <p className="mt-5 text-base sm:text-lg leading-relaxed font-medium opacity-90">
                      {founder.description}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center">
                    <div className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg ring-1 ${founder.badgeClass}`}>
                      <span className={`inline-block h-2.5 w-2.5 rounded-full ${founder.dotClass}`} />
                      {founder.tag}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founder;