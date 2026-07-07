import React from 'react';
import SEO from '../components/SEO.jsx';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaTwitter, FaHeart, FaHandsHelping, FaArrowRight } from 'react-icons/fa';

const leadership = [
  { name: 'Shri Abhijeet Singh Sanga', role: 'Founder & President', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80', social: { linkedin: '#', twitter: '#' } },
  { name: 'Aarav Sharma', role: 'Vice President', image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=500&q=80', social: { linkedin: '#', twitter: '#' } },
  { name: 'Meera Verma', role: 'Secretary', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80', social: { linkedin: '#', twitter: '#' } },
  { name: 'Rohan Gupta', role: 'Treasurer', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&q=80', social: { linkedin: '#', twitter: '#' } },
  { name: 'Priya Singh', role: 'Programs Lead', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80', social: { linkedin: '#', twitter: '#' } },
  { name: 'Sanjay Kumar', role: 'Volunteer Coordinator', image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&q=80', social: { linkedin: '#', twitter: '#' } },
];

const volunteers = [
  'Anjali Patel', 'Vikram Rathore', 'Sunita Devi', 'Amit Kumar', 'Kavita Sharma', 'Rajesh Singh', 'Pooja Mishra', 'Deepak Verma', 'Neha Gupta', 'Arun Kumar', 'Sonia Singh', 'Ravi Prakash'
];

// Reusable Social Link Button
const SocialLink = ({ href, children }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 hover:bg-[#F97316] hover:text-white hover:shadow-lg hover:-translate-y-1"
  >
    {children}
  </a>
);

// Premium Team Card Component
const TeamMemberCard = ({ member, index }) => (
  <motion.div 
    className="group relative flex flex-col items-center text-center rounded-[2rem] bg-white p-8 shadow-xl transition-all duration-500 hover:shadow-2xl border border-slate-50 overflow-hidden"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
  >
    {/* Decorative background blob on hover */}
    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gradient-to-br from-blue-50 to-orange-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

    <div className="relative z-10 w-full flex flex-col items-center">
      <div className="relative mb-6">
        {/* Animated Gradient Ring on Hover */}
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#F97316] to-[#0B2F78] opacity-0 blur-sm group-hover:opacity-40 transition-opacity duration-500"></div>
        
        <img 
          className="relative h-36 w-36 rounded-full object-cover shadow-lg border-4 border-white transition-transform duration-500 group-hover:scale-105" 
          src={member.image} 
          alt={member.name} 
        />
        
        {/* Star Badge for distinction */}
        <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white shadow-md border-2 border-white">
          <FaHandsHelping className="text-sm" />
        </span>
      </div>

      <h3 className="text-2xl font-extrabold text-[#0B2F78] mb-1">{member.name}</h3>
      <div className="inline-block px-4 py-1 mb-4 rounded-full bg-orange-50 text-[#EA580C] text-sm font-bold tracking-wide">
        {member.role}
      </div>
      
      {/* Divider */}
      <hr className="w-12 border-slate-200 mb-5 transition-all duration-300 group-hover:w-24 group-hover:border-orange-300" />

      <div className="flex space-x-3">
        <SocialLink href={member.social.linkedin}>
          <FaLinkedinIn className="text-lg" />
        </SocialLink>
        <SocialLink href={member.social.twitter}>
          <FaTwitter className="text-lg" />
        </SocialLink>
      </div>
    </div>
  </motion.div>
);

// Enhanced Marquee for Volunteers
const VolunteerMarquee = ({ volunteers }) => {
  const marqueeContent = [...volunteers, ...volunteers]; // Duplicate for seamless loop
  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Gradient masks for smooth fade effect at edges */}
      <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#FFF9F2] to-transparent z-10"></div>
      <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#FFF9F2] to-transparent z-10"></div>

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          ease: 'linear',
          duration: 35, // Adjust speed here
          repeat: Infinity,
        }}
      >
        {marqueeContent.map((name, index) => (
          <div key={index} className="flex-shrink-0 px-3">
            <div className="group flex items-center gap-2 rounded-full bg-white border border-slate-100 px-6 py-3 shadow-sm transition-all duration-300 hover:shadow-md hover:border-orange-200 cursor-default">
              <FaHeart className="text-orange-400 text-sm group-hover:animate-ping" />
              <p className="text-base font-bold text-slate-700">{name}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Team = () => {
  return (
    <>
      <SEO 
        title="Our Team"
        description="Meet the dedicated leadership team and volunteers behind Shri Ram Youth Foundation who are driving our mission forward with passion."
        keywords="NGO team, foundation members, volunteers, leadership" 
      />
      
      {/* Premium Hero Section */}
      <div className="relative py-24 text-white text-center overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80"
          alt="Our Team"
          className="absolute inset-0 h-full w-full object-cover z-0"
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2F78]/90 via-[#0B2F78]/70 to-[#132B6B]/90 z-10" />
        
        <div className="relative z-20 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-block mb-3 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs sm:text-sm font-semibold tracking-wider uppercase text-blue-100"
          >
            Our Team
          </motion.div>
          <motion.h1 
            className="text-4xl font-extrabold sm:text-5xl lg:text-6xl drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          >
            Meet the Changemakers
          </motion.h1>
          <motion.p 
            className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-blue-100/90 font-medium leading-relaxed drop-shadow-md"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
          >
            The dedicated individuals leading our mission with passion and commitment.
          </motion.p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-[#FFF9F2] py-24 min-h-screen relative overflow-hidden">
        {/* Background Decorative Blurs */}
        <div className="absolute top-40 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl -z-10"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Leadership Section */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0B2F78] to-[#F97316]">Leadership Team</h2>
              <p className="mt-4 text-lg text-slate-500 font-medium">The visionaries guiding our foundation's path.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-0">
              {leadership.map((member, index) => (
                <TeamMemberCard key={member.name} member={member} index={index} />
              ))}
            </div>
          </div>

          {/* Volunteers Section */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-[#0B2F78]">Our Volunteers</h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                The absolute heart and soul of our foundation. These incredible individuals volunteer their time and energy tirelessly to make a real difference on the ground.
              </p>
            </div>
            
            <VolunteerMarquee volunteers={volunteers} />
          </div>

          {/* Call To Action Section */}
          <motion.div 
            className="relative rounded-[2rem] bg-gradient-to-br from-[#0B2F78] to-[#1340A0] p-10 sm:p-16 text-center text-white shadow-2xl overflow-hidden mt-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* CTA Background Details */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-orange-400 opacity-20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <FaHandsHelping className="text-4xl text-orange-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Want to make a real difference?</h2>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                Join our growing family of changemakers. Whether you can give a few hours a month or want to lead a project, we have a place for you.
              </p>
              <a 
                href="/membership" 
                className="inline-flex justify-center items-center gap-3 rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-1"
              >
                Become a Volunteer <FaArrowRight />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default Team;