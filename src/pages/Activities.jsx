import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO.jsx';
import hero1 from '../assets/images/hero1.jpg';
import hero2 from '../assets/images/hero2.jpg';
import hero3 from '../assets/images/hero3.jpg';
import aboutImage from '../assets/images/about.jpg';

const activities = [
  {
    date: 'July 2026',
    title: 'Monsoon Tree Plantation Drive',
    description: 'Planted over 2,000 saplings across various urban areas to combat pollution and increase green cover. Engaged with local schools to involve students.',
    image: hero1,
    stats: '2000+ Saplings Planted',
  },
  {
    date: 'May 2026',
    title: 'Summer Health & Hydration Camp',
    description: 'Organized medical camps in rural areas, providing free check-ups, medicines, and distributing oral rehydration salts to over 1,500 people.',
    image: hero2,
    stats: '1500+ People Served',
  },
  {
    date: 'January 2026',
    title: 'Winter Blanket Distribution',
    description: 'Distributed high-quality warm blankets and clothing to more than 1,000 homeless and underprivileged families to help them survive the harsh winter.',
    image: hero3,
    stats: '1000+ Families Helped',
  },
  {
    date: 'October 2025',
    title: 'Educational Kit Distribution',
    description: 'Provided complete school kits including bags, books, and stationery to over 5,000 students from low-income backgrounds to support their education.',
    image: aboutImage,
    stats: '5000+ Students Supported',
  },
];

const TimelineItem = ({ activity, index }) => {
  const isOdd = index % 2 !== 0;
  return (
    <motion.div
      className="flex justify-between items-center w-full mb-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
    >
      {/* Content for large screens */}
      <div className={`hidden lg:flex w-5/12 ${isOdd ? 'order-3' : 'order-1'}`}>
        <div className="rounded-[2rem] bg-white p-6 shadow-2xl border border-gray-200/50 group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_25px_50px_-12px_rgba(249,115,22,0.25)]">
          <div className="overflow-hidden rounded-2xl mb-4 h-56">
            <img src={activity.image} alt={activity.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <p className="text-sm font-semibold text-[#EA580C]">{activity.date}</p>
          <h3 className="mt-2 text-2xl font-bold text-[#0B2F78]">{activity.title}</h3>
          <p className="mt-3 text-gray-600 leading-relaxed">{activity.description}</p>
          <p className="mt-4 text-lg font-bold text-[#0B2F78] bg-orange-100/50 inline-block px-4 py-2 rounded-full">{activity.stats}</p>
        </div>
      </div>

      {/* Timeline Separator */}
      <div className="hidden lg:flex order-2 w-2/12 justify-center">
        <div className="w-1 h-full bg-gradient-to-b from-transparent via-[#F97316]/50 to-transparent relative">
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] border-4 border-white shadow-lg flex items-center justify-center text-white font-bold animate-pulse">
            {index + 1}
          </div>
        </div>
      </div>
      
      {/* Empty div for alignment on large screens */}
      <div className={`hidden lg:block w-5/12 ${isOdd ? 'order-1' : 'order-3'}`}></div>

      {/* Content for small screens */}
      <div className="lg:hidden w-full ml-12">
        <div className="rounded-[2rem] bg-white p-6 shadow-2xl border border-gray-200/50 group">
           <div className="overflow-hidden rounded-2xl mb-4 h-56">
            <img src={activity.image} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <p className="text-sm font-semibold text-[#EA580C]">{activity.date}</p>
          <h3 className="mt-2 text-2xl font-bold text-[#0B2F78]">{activity.title}</h3>
          <p className="mt-3 text-gray-600 leading-relaxed">{activity.description}</p>
          <p className="mt-4 text-lg font-bold text-[#0B2F78] bg-orange-100/50 inline-block px-4 py-2 rounded-full">{activity.stats}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ActivitiesPage = () => {
  return (
    <>
      <SEO 
        title="Our Activities"
        description="Explore the timeline of our activities, including tree plantation drives, health camps, blanket distribution, and educational support programs."
        keywords="NGO activities, social work timeline, tree plantation, health camps" 
      />
    <div className="bg-[#FFF9F2]">
      {/* Page Header */}
      <motion.div
        className="relative py-24 text-white text-center overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${hero1})`,
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B2F78]/80 to-[#132B6B]/60" />
        <h1 className="relative text-4xl font-extrabold sm:text-5xl">Our Activities</h1>
        <p className="relative mt-4 max-w-3xl mx-auto text-xl text-blue-200">
          A timeline of our journey, showcasing the milestones we've achieved in our mission to serve humanity.
        </p>
      </motion.div>

      <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative">
          <div className="absolute left-4 lg:left-1/2 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#F97316]/50 to-transparent -translate-x-1/2"></div>
          {activities.map((activity, index) => (
            <TimelineItem key={index} activity={activity} index={index} />
          ))}
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default ActivitiesPage;