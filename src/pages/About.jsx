import React from 'react';
import SEO from '../components/SEO.jsx';
import { motion } from 'framer-motion';
import hero1 from '../assets/images/hero1.jpg';
import aboutImage from '../assets/images/about.jpg';
import Member1 from '../assets/images/Member1.webp';
import Member2 from '../assets/images/Member2.webp';

const coreValues = [
  { 
    icon: '❤️', 
    title: 'Humanity', 
    description: 'We serve everyone with compassion, irrespective of caste, creed, or religion.',
    hoverBg: 'from-pink-500 to-rose-500',
    hoverShadow: 'hover:shadow-pink-500/40'
  },
  { 
    icon: '🤝', 
    title: 'Selfless Service (Seva)', 
    description: 'Our actions are driven by a spirit of selfless service for the greater good.',
    hoverBg: 'from-blue-500 to-cyan-500',
    hoverShadow: 'hover:shadow-blue-500/40'
  },
  { 
    icon: '🌱', 
    title: 'Empowerment', 
    description: 'We empower youth and communities with the tools they need to build a better future.',
    hoverBg: 'from-green-500 to-emerald-500',
    hoverShadow: 'hover:shadow-green-500/40'
  },
  { 
    icon: '🌍', 
    title: 'Unity', 
    description: 'We believe in the power of unity to overcome social challenges and build a stronger nation.',
    hoverBg: 'from-purple-500 to-indigo-500',
    hoverShadow: 'hover:shadow-purple-500/40'
  },
  { 
    icon: '✨', 
    title: 'Integrity', 
    description: 'We operate with complete transparency and accountability in all our endeavors.',
    hoverBg: 'from-orange-500 to-amber-500',
    hoverShadow: 'hover:shadow-orange-500/40'
  },
];

const members = [
  {
    name: "Mr. Abhijeet Singh Sanga",
    role: "Member of Uttar Pradesh Legislative Assembly",
    description: "He represents the Bithoor assembly. A dedicated leader striving for the development and welfare of the community.",
    image: Member1,
    gradient: "from-[#F97316] to-[#FFD54F]",
    textColor: "text-[#1F2937]"
  },
  {
    name: "Manoj Kumar Bhadauria",
    role: "Advocate, Educationist & Social Worker",
    description: "Chairman Shriram Group of Education. Passionate about empowering society through quality education and social service.",
    image: Member2,
    gradient: "from-[#0B2F78] to-[#0F4AA8]",
    textColor: "text-white"
  }
];

const About = () => {
  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about Shri Ram Youth Foundation, our mission, vision, and our commitment to social service, youth empowerment, and nation building."
        keywords="about us, our mission, vision, NGO objectives, foundation story" 
      />
      
      {/* Page Header */}
      <motion.div
        className="relative py-24 text-white text-center overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${hero1})`,
        }}
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B2F78]/80 to-[#132B6B]/70" />
        <motion.h1 
          className="relative text-4xl font-extrabold sm:text-5xl"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
        >About Our Foundation</motion.h1>
        <motion.p 
          className="relative mt-4 text-lg text-blue-200"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
        >Connecting Youth, Serving Humanity</motion.p>
      </motion.div>

      <div className="bg-[#FFF9F2]">
        
        {/* NEW ENHANCED Our Story Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-100/50 blur-3xl z-0"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl z-0"></div>

          <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#0B2F78] to-[#F97316] rounded-3xl blur-lg opacity-30"></div>
              <img src={aboutImage} alt="Our Story" className="relative rounded-3xl shadow-2xl w-full h-full object-cover border-4 border-white" />
            </motion.div>
            
            {/* Right Content (Enhanced Text) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }}
              className="flex flex-col justify-center"
            >
              <motion.h2 
                className="text-4xl font-extrabold bg-gradient-to-r from-[#F97316] via-[#FFD54F] to-[#0B2F78] bg-clip-text text-transparent sm:text-5xl mb-8"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                Our Story
              </motion.h2>
              
              <motion.div 
                className="relative bg-white/80 backdrop-blur-sm p-8 sm:p-10 rounded-3xl shadow-xl border-t-4 border-[#F97316] hover:shadow-2xl transition-shadow duration-300"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                {/* Floating Quote Icon */}
                <div className="absolute -top-6 left-8 bg-gradient-to-br from-[#0B2F78] to-[#0F4AA8] text-white p-4 rounded-full shadow-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-6 pt-4">
                  <span className="font-bold text-[#0B2F78] text-xl">Every great movement begins with a single spark.</span> For Shri Ram Youth Foundation, that spark was a profound vision: to harness the boundless energy and untapped potential of our youth towards monumental social change.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Rooted deeply in the timeless principles of <span className="font-bold text-[#F97316] bg-orange-50 px-2 py-1 rounded-md">equality, brotherhood, and selfless service (Seva)</span>, we set out on a mission to dismantle the barriers of discrimination. We recognized early on that the youth are not just the leaders of tomorrow, but the architects of today.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  We are more than just an organization; we are a vibrant community of change-makers. By educating and empowering the younger generation, we are laying down the foundation for a <span className="font-extrabold bg-gradient-to-r from-[#0B2F78] to-[#F97316] bg-clip-text text-transparent">more just, compassionate, and unified India</span>. From bridging educational gaps and delivering healthcare, to rapid disaster relief—every single initiative is a bold step toward a self-reliant future.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Our Members Section */}
        <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl font-bold bg-gradient-to-r from-[#0B2F78] to-[#F97316] bg-clip-text text-transparent sm:text-5xl"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Our Founder
              </motion.h2>
              <motion.p 
                className="mt-4 text-lg text-gray-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                The visionaries leading our mission forward with dedication and service.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {members.map((member, index) => (
                <motion.div
                  key={index}
                  className={`rounded-3xl bg-gradient-to-br ${member.gradient} p-8 ${member.textColor} shadow-2xl flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden`}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    boxShadow: "0px 25px 40px rgba(0,0,0,0.2)"
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                  
                  <motion.div 
                    className="w-full sm:w-64 h-72 sm:h-80 shrink-0 rounded-2xl border-4 border-white/30 shadow-lg overflow-hidden bg-white/10 flex items-center justify-center"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-top"
                    />
                  </motion.div>
                  
                  <div className="text-center sm:text-left z-10 w-full">
                    <h3 className="text-2xl font-extrabold mb-2">{member.name}</h3>
                    <div className={`inline-block px-3 py-1 mb-4 rounded-full text-sm font-bold ${index === 0 ? 'bg-white/30 text-gray-900' : 'bg-orange-500/90 text-white'}`}>
                      {member.role}
                    </div>
                    <p className={`text-lg leading-relaxed ${index === 0 ? 'text-gray-800' : 'text-blue-100'}`}>
                      {member.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div 
              className="rounded-3xl bg-gradient-to-br from-[#0B2F78] to-[#0F4AA8] p-10 text-white shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, boxShadow: "0px 20px 30px rgba(11, 47, 120, 0.3)" }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-3xl font-bold">Our Vision</h3>
              <p className="mt-4 text-lg leading-8 text-[#FFD54F]">To build an equal, empowered, and healthy India where every young person has the opportunity to thrive and contribute to nation-building.</p>
            </motion.div>
            <motion.div 
              className="rounded-3xl bg-gradient-to-br from-[#F97316] to-[#FFD54F] p-10 text-[#1F2937] shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, boxShadow: "0px 20px 30px rgba(249, 115, 22, 0.2)" }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold">Our Mission</h3>
              <p className="mt-4 text-lg leading-8">To bring about lasting positive change in society through impactful programs in education, healthcare, social awareness, and community relief.</p>
            </motion.div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-[#0B2F78] to-[#F97316] bg-clip-text text-transparent sm:text-5xl">
                Our Core Values
              </h2>
              <p className="mt-4 text-lg text-gray-600 font-medium">The principles that guide every action we take.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {coreValues.map((value, index) => (
                <motion.div 
                  key={value.title} 
                  className={`group relative overflow-hidden text-center p-8 rounded-3xl bg-white shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${value.hoverShadow} cursor-pointer border border-gray-100`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.hoverBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`}></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 shadow-sm transition-all duration-500 group-hover:bg-white/20 group-hover:scale-110 group-hover:-rotate-12 group-hover:shadow-inner">
                      <span className="text-4xl transition-transform duration-500 group-hover:scale-110">{value.icon}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-extrabold text-[#0B2F78] transition-colors duration-500 group-hover:text-white">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm font-medium text-gray-600 transition-colors duration-500 group-hover:text-white/90 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;