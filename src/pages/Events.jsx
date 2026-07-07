import React from 'react';
import SEO from '../components/SEO.jsx';
import { motion } from 'framer-motion';
import hero1 from '../assets/images/hero1.jpg';
import hero2 from '../assets/images/hero2.jpg';
import hero3 from '../assets/images/hero3.jpg';
import aboutImage from '../assets/images/about.jpg';
import img1 from '../assets/images/11a549e0-7b04-4301-ab52-fce4c275da46.jpg';

const upcomingEvents = [
  { title: 'Free Health Camp', date: '12 Aug 2026', location: 'Kanpur', description: 'Free health checkups, consultations, and medicines for families in need. Our team of volunteer doctors will be available.', image: hero2 },
  { title: 'Blood Donation Drive', date: '20 Sep 2026', location: 'Lucknow', description: 'Join us to save lives. Your contribution can make a huge difference. Organized in partnership with City Hospital.', image: img1 },
  { title: 'Career Guidance Seminar', date: '15 Oct 2026', location: 'Online', description: 'A webinar for students to explore career options, with guidance from industry experts. Register to get the link.', image: hero3 },
];

const completedEvents = [
  { title: 'Winter Relief Distribution', date: '15 Jan 2026', location: 'Prayagraj', description: 'Distributed warm blankets, clothes, and essentials to over 500 families to help them through the cold wave.', image: aboutImage },
  { title: 'Tree Plantation Drive', date: '05 Jun 2025', location: 'Kanpur Dehat', description: 'Planted over 1000 saplings to promote a greener environment, with active participation from local youth.', image: hero1 },
  { title: 'Women Empowerment Workshop', date: '08 Mar 2025', location: 'Unnao', description: 'A workshop on skill development and financial literacy for women, empowering them to be self-reliant.', image: img1 },
];

const EventCard = ({ event, isUpcoming, index }) => (
  <motion.div 
    className="group rounded-3xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="overflow-hidden h-56 relative">
      <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute top-4 left-4">
        <p className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold backdrop-blur-sm ${isUpcoming ? 'bg-[#F97316]/80 text-white' : 'bg-blue-900/70 text-white'}`}>
          {isUpcoming ? 'Upcoming' : 'Completed'}
        </p>
      </div>
    </div>
    <div className="p-6">
      <p className="text-sm font-medium text-gray-500">{event.date}</p>
      <h3 className="mt-2 text-xl font-bold text-[#0B2F78]">{event.title}</h3>
      <p className="mt-1 text-sm font-semibold text-[#F97316]">{event.location}</p>
      <p className="mt-4 text-base leading-7 text-gray-600">{event.description}</p>
      {isUpcoming && (
        <a href="#contact" className="mt-6 inline-block rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105">
          Register Now
        </a>
      )}
    </div>
  </motion.div>
);

const Events = () => {
  return (
    <>
      <SEO 
        title="Events"
        description="Find out about upcoming and completed events by Shri Ram Youth Foundation, including health camps, blood donation drives, and seminars."
        keywords="NGO events, upcoming events, social events, health camps" 
      />
      {/* Page Header */}
      <motion.div
        className="relative py-24 text-white text-center overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${hero3})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B2F78]/80 to-[#132B6B]/70" />
        <motion.h1 
          className="relative text-4xl font-extrabold sm:text-5xl z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Our Events
        </motion.h1>
        <motion.p 
          className="relative mt-4 max-w-2xl mx-auto text-xl text-blue-200 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Join us in our mission to create a positive impact. Find out about our upcoming and past events.
        </motion.p>
      </motion.div>

    <div className="bg-[#FFF9F2] py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#0B2F78] mb-8">Upcoming Events</h2>
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {upcomingEvents.map((event, index) => (
              <EventCard key={event.title} event={event} isUpcoming={true} index={index} />
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-[#0B2F78] mb-8">Completed Events</h2>
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {completedEvents.map((event, index) => (
              <EventCard key={event.title} event={event} isUpcoming={false} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Events;