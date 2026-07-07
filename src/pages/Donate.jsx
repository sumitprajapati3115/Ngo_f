import React, { useState } from 'react';
import SEO from '../components/SEO.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, FaEnvelope, FaPhone, FaRupeeSign, FaUniversity, FaHashtag, 
  FaUpload, FaHeart, FaBookOpen, FaUtensils, FaStethoscope, 
  FaCheckCircle, FaExclamationCircle, FaShieldAlt
} from 'react-icons/fa';
import qrCodeImage from '../assets/images/qr-code.png';
import hero3 from '../assets/images/hero3.jpg';
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

const Donate = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        donationAmount: '',
        transactionId: '',
        bankName: '',
        screenshot: null,
    });
    const [screenshotPreview, setScreenshotPreview] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, screenshot: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setScreenshotPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');

        if (!formData.screenshot) {
            setError('Please upload the payment screenshot.');
            setIsSubmitting(false);
            return;
        }

        try {
            const screenshotBase64 = await toBase64(formData.screenshot);
            const payload = { ...formData, screenshot: screenshotBase64 };
            
            const result = await apiRequest('/api/donations', {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            // Set success message to trigger the dynamic animation
            setSuccess(result.message || 'Thank you for your generous donation! Your details have been submitted successfully. Our team will verify and send the receipt shortly.');
            setFormData({ fullName: '', email: '', mobile: '', donationAmount: '', transactionId: '', bankName: '', screenshot: null });
            setScreenshotPreview('');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const bankDetails = {
        bankName: "Axis Bank, Shyam Nagar Branch",
        accountName: "Shri Ram Youth Foundation",
        accountNumber: "926010005168853",
        ifsc: "UTIB0004175",
    };

    return (
        <>
            <SEO 
                title="Donate Now"
                description="Make a donation to Shri Ram Youth Foundation. Your contribution helps us provide education, food, and medical support to those in need."
                keywords="donate NGO, charity donation, support youth, donate online India" 
            />

            {/* Premium Hero Section */}
            <div className="relative py-24 text-white text-center overflow-hidden">
                <motion.img
                    src={hero3}
                    alt="Donate for Humanity"
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
                        Give Hope, Save Lives
                    </motion.div>
                    <motion.h1 
                        className="text-4xl font-extrabold sm:text-5xl lg:text-6xl drop-shadow-lg"
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        Donate for Humanity
                    </motion.h1>
                    <motion.p 
                        className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-blue-100/90 font-medium leading-relaxed drop-shadow-md"
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        Every rupee you contribute goes directly towards bringing a smile to someone's face. Be the reason someone believes in the goodness of people.
                    </motion.p>
                </div>
            </div>

            <div className="bg-[#FFF9F2] py-20 min-h-screen relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-20 left-0 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-40 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                    
                    {/* Impact of Donation Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-extrabold text-[#0B2F78] mb-10">The Impact of Your Donation</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 transition-transform hover:-translate-y-2 hover:shadow-2xl">
                                <div className="mx-auto w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-3xl mb-4">
                                    <FaUtensils />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Food & Nutrition</h3>
                                <p className="text-slate-600 text-sm">Providing healthy meals and ration kits to underprivileged families and disaster victims.</p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 transition-transform hover:-translate-y-2 hover:shadow-2xl">
                                <div className="mx-auto w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-4">
                                    <FaBookOpen />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Child Education</h3>
                                <p className="text-slate-600 text-sm">Distributing school supplies, books, and funding tuition for children who want to learn.</p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 transition-transform hover:-translate-y-2 hover:shadow-2xl">
                                <div className="mx-auto w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-3xl mb-4">
                                    <FaStethoscope />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Medical Relief</h3>
                                <p className="text-slate-600 text-sm">Organizing free health checkups, blood donation camps, and providing essential medicines.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Payment & Verification Section Container */}
                    <div className="space-y-12">
                        {/* 1. Payment Details Section */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                            className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl border border-slate-100"
                        >
                            <div className="text-center mb-10">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-bold mb-3 uppercase tracking-wide">Step 1</span>
                                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#EA580C]">Complete Payment</h2>
                                <p className="mt-2 text-slate-500 font-medium">Use the secure bank details or QR code below to make your donation.</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-100">
                                {/* Bank Details Card */}
                                <div className="bg-gradient-to-br from-[#0B2F78] to-[#0F4AA8] text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><FaUniversity className="text-orange-400" /> Bank Transfer</h3>
                                    <div className="space-y-4 text-sm relative z-10">
                                        <div className="flex justify-between border-b border-white/10 pb-2">
                                            <span className="text-blue-200">Bank Name</span>
                                            <span className="font-semibold text-right">{bankDetails.bankName}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/10 pb-2">
                                            <span className="text-blue-200">A/C Name</span>
                                            <span className="font-semibold text-right">{bankDetails.accountName}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/10 pb-2">
                                            <span className="text-blue-200">A/C Number</span>
                                            <span className="font-bold tracking-wider text-[#FFD54F]">{bankDetails.accountNumber}</span>
                                        </div>
                                        <div className="flex justify-between pb-2">
                                            <span className="text-blue-200">IFSC Code</span>
                                            <span className="font-bold tracking-wider text-right">{bankDetails.ifsc}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* QR Code Card */}
                                <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center h-full">
                                    <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><FaHashtag className="text-orange-500"/> Scan UPI QR Code</h3>
                                    <div className="p-4 border-2 border-dashed border-orange-200 rounded-2xl bg-orange-50/50">
                                        <img src={qrCodeImage} alt="QR Code for Payment" className="w-40 h-40 object-contain rounded-xl" />
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 text-sm text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full border border-green-200">
                                        <FaShieldAlt /> Secure & Encrypted
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 2. Dynamic Form / Success Section */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl border border-slate-100 min-h-[500px] flex flex-col justify-center overflow-hidden"
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
                                                className="absolute -top-2 -right-2 text-red-500 text-3xl drop-shadow-md"
                                            >
                                                <FaHeart />
                                            </motion.div>
                                        </motion.div>
                                        
                                        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 mb-4">
                                            Thank You!
                                        </h2>
                                        <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto leading-relaxed">
                                            {success}
                                        </p>
                                        
                                        <button 
                                            onClick={() => setSuccess('')} 
                                            className="inline-flex justify-center items-center gap-2 rounded-full border-2 border-[#0B2F78] px-8 py-3 text-base font-bold text-[#0B2F78] hover:bg-[#0B2F78] hover:text-white transition-colors duration-300"
                                        >
                                            Make Another Donation
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
                                        <div className="text-center mb-10">
                                            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-3 uppercase tracking-wide">Step 2</span>
                                            <h2 className="text-3xl font-extrabold text-[#0B2F78]">Verify Donation</h2>
                                            <p className="mt-2 text-slate-500 font-medium">After donating, please fill this form so we can generate your receipt.</p>
                                        </div>

                                        {error && <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl"><FaExclamationCircle className="w-5 h-5 shrink-0" /> <p>{error}</p></div>}

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                                                <FormInput icon={<FaUser />} name="fullName" label="Full Name" value={formData.fullName} onChange={handleInputChange} required placeholder="Your full name" />
                                                <FormInput icon={<FaEnvelope />} name="email" label="Email Address" type="email" value={formData.email} onChange={handleInputChange} required placeholder="For tax receipt" />
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                                                <FormInput icon={<FaPhone />} name="mobile" label="Mobile Number" type="tel" value={formData.mobile} onChange={handleInputChange} placeholder="Optional" />
                                                <FormInput icon={<FaRupeeSign />} name="donationAmount" label="Donation Amount (₹)" type="number" value={formData.donationAmount} onChange={handleInputChange} required placeholder="e.g. 500" />
                                            </div>

                                            <hr className="border-slate-200 my-4" />
                                            <h3 className="text-xl font-bold text-[#0B2F78] mb-4">Transaction Details</h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                                                <FormInput icon={<FaHashtag />} name="transactionId" label="Transaction ID / UTR No" value={formData.transactionId} onChange={handleInputChange} required placeholder="e.g. UPI Ref No" />
                                                <FormInput icon={<FaUniversity />} name="bankName" label="Your Bank Name" value={formData.bankName} onChange={handleInputChange} placeholder="Where money was sent from" />
                                            </div>

                                            <div className="flex flex-col mb-5">
                                                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Upload Payment Screenshot <span className="text-red-500">*</span></label>
                                                <div className="flex items-center gap-4 p-4 border-2 border-dashed border-slate-300 rounded-xl bg-white transition-colors hover:border-orange-400">
                                                    <label htmlFor="screenshot" className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-[#0B2F78] bg-slate-50 hover:bg-slate-100 shadow-sm transition-all hover:shadow-md">
                                                        <FaUpload className="text-orange-500" />
                                                        <span>{formData.screenshot ? 'Change File' : 'Choose File'}</span>
                                                        <input id="screenshot" name="screenshot" type="file" className="hidden" onChange={handleFileChange} accept="image/*" required={!formData.screenshot} />
                                                    </label>
                                                    {screenshotPreview ? (
                                                        <img src={screenshotPreview} alt="Screenshot Preview" className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-lg border border-slate-200 shadow-md" />
                                                    ) : (
                                                        <span className="text-sm text-slate-400 font-medium">No file selected</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="pt-6">
                                                <button 
                                                    type="submit" 
                                                    disabled={isSubmitting} 
                                                    className="w-full inline-flex justify-center items-center gap-3 rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                                                >
                                                    {isSubmitting ? 'Submitting Details...' : <><FaHeart /> Submit Donation Details</>}
                                                </button>
                                                <p className="text-center text-xs text-slate-500 mt-4">
                                                    By submitting, you agree to our Terms and acknowledge that this donation is made voluntarily.
                                                </p>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Donate;