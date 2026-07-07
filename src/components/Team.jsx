import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { apiRequest } from '../pages/admin/api.js';
import { useLanguage } from './LanguageContext.jsx';
import { translations } from './translations.js';

const TeamMemberCard = ({ member, role }) => (
  <motion.div
    className="text-center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5 }}
  >
    <img className="mx-auto h-32 w-32 rounded-full object-cover shadow-lg" src={member.imageUrl || 'https://via.placeholder.com/150'} alt={member.name} />
    <h3 className="mt-4 text-lg font-semibold text-[#0B2F78]">{member.name}</h3>
    <p className="text-sm font-medium text-orange-600">{role}</p>
  </motion.div>
);

const Team = () => {
  const [team, setTeam] = useState([]);
  const [error, setError] = useState('');
  const { language } = useLanguage();
  const t = translations[language].team_page;

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        // एपीआई एंडपॉइंट को ठीक किया गया। ":1" एक त्रुटि लग रही थी।
        const data = await apiRequest('/api/team');
        // यह मानते हुए कि एपीआई टीम के सदस्यों की एक ऐरे लौटाता है
        if (Array.isArray(data)) {
          setTeam(data);
        } else {
          setTeam([]);
        }
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch team data:', err);
      }
    };

    fetchTeam();
  }, []);

  return (
    <section id="team" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">{t.section_title}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0B2F78] sm:text-4xl">{t.title}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">{t.description}</p>
        </div>

        {error && <p className="text-center text-red-500 mt-8">{error}</p>}

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {team.map((member) => (
            <TeamMemberCard key={member._id || member.id} member={member} role={t.roles[member.role] || member.role} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;