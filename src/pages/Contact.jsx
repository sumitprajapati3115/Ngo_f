import React, { useState } from 'react';
import SEO from '../components/SEO.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUser, FaHeading, FaCommentDots, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaChevronDown, FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaHeart } from 'react-icons/fa';

import { apiRequest } from './admin/api.js';
// Premium Reusable Input Component
const FormInput = ({ name, label, type = 'text', value, onChange, required, icon, placeholder }) => (
  <div className="flex flex-col group mb-5">
    <label htmlFor={name} className="block text-sm font-bold text-slate-700 mb-1.5 ml-1 transition-colors group-focus-within:text-orange-600">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-orange-500 transition-colors duration-300">
        {icon}
      </div>
      <input 
        type={type} 
        id={name} 
        name={name} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        required={required} 
        className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-slate-800 shadow-sm transition-all duration-300 hover:border-slate-300 hover:bg-white focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
      />
    </div>
  </div>
);

// Reusable Textarea Component
const FormTextarea = ({ name, label, value, onChange, required, icon, placeholder }) => (
  <div className="flex flex-col group mb-5">
    <label htmlFor={name} className="block text-sm font-bold text-slate-700 mb-1.5 ml-1 transition-colors group-focus-within:text-orange-600">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-slate-400 group-focus-within:text-orange-500 transition-colors duration-300">
        {icon}
      </div>
      <textarea 
        id={name} 
        name={name} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        required={required} 
        rows={4}
        className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-slate-800 shadow-sm transition-all duration-300 hover:border-slate-300 hover:bg-white focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:outline-none resize-none"
      />
    </div>
  </div>
);

// FAQ Data
const faqs = [
  {
    question: "How can I join Shri Ram Youth Foundation?",
    answer: "You can easily join us by visiting our Membership page. We offer both Free and Active Memberships. Just fill out the required form and submit!"
  },
  {
    question: "Can I donate items like clothes or books instead of money?",
    answer: "Yes, absolutely! We regularly organize donation drives for clothes, books, and essential items. Please contact our team via phone or email to schedule a drop-off."
  },
  {
    question: "Where are your main activities conducted?",
    answer: "Our primary office is located in Kanpur, Uttar Pradesh. Most of our social campaigns, medical camps, and education programs are currently conducted across various districts in UP."
  },
  {
    question: "How do I get updates about upcoming events?",
    answer: "By becoming a Free Member, you will receive email updates. You can also follow us on our social media channels linked on this page to stay updated on our latest campaigns."
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', mobile: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const result = await apiRequest('/api/contact', {
        method: 'POST',
        body: formData,
      });

      setSuccess(result.message || 'Your message has been sent successfully! Our team will contact you soon.');
      setFormData({ name: '', email: '', subject: '', mobile: '', message: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us"
        description="Get in touch with Shri Ram Youth Foundation. Reach out to us for questions, suggestions, or to join our mission. Find our address, phone, and email."
        keywords="contact NGO, foundation address, phone number, email" 
      />
      
      {/* BULLETPROOF PAGE HEADER */}
      <div className="relative py-24 text-white text-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1920&auto=format&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B2F78]/90 to-[#132B6B]/80 z-10" />
        
        <div className="relative z-20 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-block mb-3 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs sm:text-sm font-semibold tracking-wider uppercase text-blue-100"
          >
            We are here for you
          </motion.div>
          <motion.h1 
            className="text-4xl font-extrabold sm:text-5xl lg:text-6xl drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-blue-100/90 font-medium leading-relaxed drop-shadow-md"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
          >
            We'd love to hear from you. Whether you have a question, a suggestion, or want to join our mission, get in touch.
          </motion.p>
        </div>
      </div>

      <div className="bg-[#FFF9F2] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-40 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10"></div>

        <div className="mx-auto max-w-7xl">
          
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-12">
            
            {/* Left Side: Contact Details & Social */}
            <motion.div 
              className="lg:col-span-2 flex flex-col gap-8"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <div className="rounded-[2rem] bg-gradient-to-br from-[#0B2F78] to-[#1340A0] p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
                
                <h2 className="text-3xl font-extrabold mb-2">Get in Touch</h2>
                <p className="text-blue-200 mb-8 font-medium">Our team is ready to assist you. Reach out via phone, email, or visit our office.</p>
                
                <div className="space-y-8 relative z-10">
                  <div className="flex items-start gap-5 group">
                    <div className="p-3 bg-white/10 rounded-xl group-hover:bg-orange-500 transition-colors duration-300">
                      <FaPhoneAlt className="text-xl text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm text-blue-200 uppercase tracking-wider font-semibold mb-1">Call Us</h3>
                      <a href="tel:+919621850080" className="block text-lg font-bold hover:text-orange-300 transition-colors">+91 96218 50080</a>
                      <a href="tel:+919621850081" className="block text-lg font-bold hover:text-orange-300 transition-colors">+91 96218 50081</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5 group">
                    <div className="p-3 bg-white/10 rounded-xl group-hover:bg-orange-500 transition-colors duration-300">
                      <FaEnvelope className="text-xl text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm text-blue-200 uppercase tracking-wider font-semibold mb-1">Email Us</h3>
                      <a href="mailto:shriramyouthfoundation@gmail.com" className="text-base sm:text-lg font-bold hover:text-orange-300 transition-colors break-all">
                        shriramyouthfoundation<br/>@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5 group">
                    <div className="p-3 bg-white/10 rounded-xl group-hover:bg-orange-500 transition-colors duration-300">
                      <FaMapMarkerAlt className="text-xl text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm text-blue-200 uppercase tracking-wider font-semibold mb-1">Visit Us</h3>
                      <p className="text-lg font-bold leading-snug">Om Bhawan, Subedar Nagar Vitthar,<br/> Kanpur - 209217</p>
                    </div>
                  </div>
                </div>

                {/* Social Connect Divider */}
                <hr className="border-white/10 my-8" />
                
                <div>
                  <h3 className="text-sm text-blue-200 uppercase tracking-wider font-semibold mb-4">Connect With Us</h3>
                  <div className="flex gap-4">
                    {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                      <a key={i} href="#" className="p-3 bg-white/10 rounded-full hover:bg-orange-500 hover:-translate-y-1 transition-all duration-300">
                        <Icon className="text-white text-lg" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Contact Form / Dynamic Success Screen */}
            <motion.div 
              className="lg:col-span-3 rounded-[2rem] bg-white p-8 sm:p-10 shadow-2xl border border-slate-100 min-h-[550px] flex flex-col justify-center overflow-hidden"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {success ? (
                  // DYNAMIC SUCCESS SCREEN
                  <motion.div 
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
                    className="text-center py-10 px-4"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="relative w-28 h-28 mx-auto bg-green-100 text-green-500 rounded-full flex items-center justify-center text-6xl mb-6 shadow-inner"
                    >
                      {/* Pulsing effect in background */}
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-20"
                      />
                      <FaCheckCircle className="relative z-10" />
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }} animate={{ y: -10, opacity: 1 }} transition={{ delay: 0.5, type: 'spring' }}
                        className="absolute -top-2 -right-4 text-orange-500 text-3xl drop-shadow-md"
                      >
                        <FaPaperPlane />
                      </motion.div>
                    </motion.div>
                    
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 mb-4">
                      Thank You!
                    </h2>
                    <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
                      {success}
                    </p>
                    
                    <button 
                      onClick={() => setSuccess('')} 
                      className="inline-flex justify-center items-center gap-2 rounded-full border-2 border-[#0B2F78] px-8 py-3 text-base font-bold text-[#0B2F78] hover:bg-[#0B2F78] hover:text-white transition-colors duration-300"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  // VERIFICATION FORM
                  <motion.div
                    key="form-content"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-8">
                      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0B2F78] to-[#F97316]">Send a Message</h2>
                      <p className="text-slate-500 mt-2 font-medium">Fill out the form below and we will get back to you as soon as possible.</p>
                    </div>

                    {error && <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl"><FaExclamationCircle className="w-5 h-5 shrink-0" /> <p>{error}</p></div>}
                    
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                        <FormInput icon={<FaUser />} name="name" label="Full Name" value={formData.name} onChange={handleInputChange} required placeholder="John Doe" />
                        <FormInput icon={<FaEnvelope />} name="email" label="Email Address" type="email" value={formData.email} onChange={handleInputChange} required placeholder="john@example.com" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                        <FormInput icon={<FaPhoneAlt />} name="mobile" label="Mobile Number" type="tel" value={formData.mobile} onChange={handleInputChange} placeholder="+91 XXXXX XXXXX" />
                        <FormInput icon={<FaHeading />} name="subject" label="Subject" value={formData.subject} onChange={handleInputChange} required placeholder="How can we help?" />
                      </div>

                      <FormTextarea icon={<FaCommentDots />} name="message" label="Your Message" value={formData.message} onChange={handleInputChange} required placeholder="Write your message here..." />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex justify-center items-center gap-3 mt-4 rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending Message...' : <><FaPaperPlane /> Send Message</>}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Frequently Asked Questions (FAQ) */}
          <div className="mt-24 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-[#0B2F78]">Frequently Asked Questions</h2>
              <p className="text-slate-500 mt-2 font-medium">Quick answers to common questions about our foundation.</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
                >
                  <button 
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-800 pr-4">{faq.question}</span>
                    <FaChevronDown className={`text-orange-500 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                        className="px-6 pb-5 text-slate-600 leading-relaxed"
                      >
                        <div className="pt-2 border-t border-slate-100">{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <motion.div 
            className="mt-24 h-[450px] w-full overflow-hidden rounded-[2rem] shadow-2xl border-4 border-white relative group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-blue-900/10 pointer-events-none group-hover:bg-transparent transition-colors duration-500 z-10"></div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.302685329184!2d80.2885938150351!3d26.44573898333098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c395b5817c7b7%3A0x1e8c31301b4b3819!2sKanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1672233445566!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
              className="relative z-0"
            ></iframe>
          </motion.div>
          
        </div>
      </div>
    </>
  );
};

export default Contact;