import React, { useState, useMemo } from 'react';
import SEO from '../components/SEO.jsx';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaRupeeSign, FaUniversity, FaHashtag, FaUpload, FaBirthdayCake, FaVenusMars, FaCheckCircle, FaExclamationCircle, FaIdCard, FaStar } from 'react-icons/fa';
import qrCodeImage from '../assets/images/qr-code.png'; // Make sure this path is correct
import { motion, AnimatePresence } from 'framer-motion';
import hero3 from '../assets/images/hero3.jpg';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { apiRequest } from './admin/api.js';
import { useLanguage } from '../components/LanguageContext.jsx';
import { translations } from '../components/translations.js';

// Premium Reusable Input Component
const FormInput = ({ name, label, type = 'text', register, error, required, icon, placeholder }) => (
  <div className="flex flex-col group">
    <label htmlFor={name} className="block text-sm font-bold text-slate-700 mb-1.5 ml-1 transition-colors group-focus-within:text-orange-600">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-orange-500 transition-colors duration-300 z-10">
        {icon}
      </div>
      <input 
        type={type} 
        id={name} 
        {...register(name)}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`} 
        className={`block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-slate-800 shadow-sm transition-all duration-300 hover:border-slate-300 hover:bg-white focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:outline-none ${error ? 'border-red-500' : ''}`}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
  </div>
);

// Free Member Form Component
const FreeMemberForm = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);

  const schema = useMemo(() => yup.object().shape({
    fullName: yup.string().required(t.form.validation.name_required),
    fatherName: yup.string().required(t.form.validation.fatherName_required),
    dob: yup.date().required(t.form.validation.dob_required).typeError(t.form.validation.dob_required),
    gender: yup.string().required(t.form.validation.gender_required),
    mobile: yup.string().matches(/^$|^[0-9]{10}$/, t.form.validation.mobile_invalid),
    email: yup.string().email(t.form.validation.email_invalid).required(t.form.validation.email_required),
    address: yup.string().required(t.form.validation.address_required),
    city: yup.string().required(t.form.validation.city_required),
    state: yup.string().required(t.form.validation.state_required),
    zipCode: yup.string().required(t.form.validation.zipCode_required),
  }), [t]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { gender: '' }
  });

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    setIsSubmittingLocal(true);

    const fallbackTimer = window.setTimeout(() => {
      setIsSubmittingLocal(false);
      setError('The server is taking longer than usual. Please wait a moment and try again if it does not complete.');
    }, 12000);

    try {
      const payload = { ...data, membershipPlan: 'free' };
      const result = await apiRequest('/api/members', {
        method: 'POST',
        body: payload,
      });

      const successMessage = result?.message || 'Your free membership request was submitted successfully.';
      setSuccess(successMessage);
      reset();
    } catch (err) {
      const fallbackError = err?.message || 'We could not submit your request right now. Please try again later.';
      setError(fallbackError);
    } finally {
      window.clearTimeout(fallbackTimer);
      setIsSubmittingLocal(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
        {/* Benefits Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="relative overflow-hidden bg-gradient-to-br from-[#0B2F78] to-[#1340A0] text-white p-10 rounded-[2rem] shadow-2xl text-center"
        >
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-orange-400 opacity-20 rounded-full blur-2xl"></div>
            <h2 className="relative z-10 text-3xl font-extrabold mb-4">Benefits of Free Membership</h2>
            <p className="relative z-10 text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Join our community and be a part of the change. As a free member, you will receive event updates, get opportunities to volunteer, and be a part of a nationwide youth network.
            </p>
        </motion.div>

        {/* Application Form & Success Screen */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl border border-slate-100 relative min-h-[500px] flex flex-col justify-center overflow-hidden"
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
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-20"
                  />
                  <FaCheckCircle className="relative z-10" />
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }} animate={{ y: -10, opacity: 1 }} transition={{ delay: 0.5, type: 'spring' }}
                    className="absolute -top-2 -right-4 text-[#0B2F78] text-4xl drop-shadow-md"
                  >
                    <FaIdCard />
                  </motion.div>
                </motion.div>
                
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 mb-4">
                  Welcome to the Family!
                </h2>
                <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto leading-relaxed">
                  {success}
                </p>
                
                <button 
                  onClick={() => setSuccess('')} 
                  className="inline-flex justify-center items-center gap-2 rounded-full border-2 border-[#0B2F78] px-8 py-3 text-base font-bold text-[#0B2F78] hover:bg-[#0B2F78] hover:text-white transition-colors duration-300"
                >
                  Register Another Member
                </button>
              </motion.div>
            ) : (
              // FORM UI
              <motion.div
                key="form-content"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0B2F78] to-[#F97316]">Join for Free</h2>
                  <p className="mt-2 text-slate-500 font-medium">Fill in your details to get your free membership instantly.</p>
                </div>

                {error && <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl"><FaExclamationCircle className="w-5 h-5 shrink-0" /> <p>{error}</p></div>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput icon={<FaUser />} name="fullName" label="Full Name" register={register} error={errors.fullName} required />
                        <FormInput icon={<FaUser />} name="fatherName" label="Father's Name" register={register} error={errors.fatherName} required />
                        <FormInput icon={<FaBirthdayCake />} name="dob" label="Date of Birth" type="date" register={register} error={errors.dob} required />
                        
                        <div className="flex flex-col group">
                            <label htmlFor="gender_free" className="block text-sm font-bold text-slate-700 mb-1.5 ml-1 group-focus-within:text-orange-600">Gender <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-orange-500 transition-colors z-10">
                                    <FaVenusMars className="h-5 w-5" />
                                </div>
                                <select id="gender_free" {...register('gender')} className={`block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-slate-800 shadow-sm appearance-none transition-all duration-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:outline-none cursor-pointer ${errors.gender ? 'border-red-500' : ''}`}>
                                    <option value="" disabled>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender.message}</p>}
                            </div>
                        </div>

                        <FormInput icon={<FaPhone />} name="mobile" label="Mobile Number" type="tel" register={register} error={errors.mobile} />
                        <FormInput icon={<FaEnvelope />} name="email" label="Email Address" type="email" register={register} error={errors.email} required />
                    </div>

                    <FormInput icon={<FaMapMarkerAlt />} name="address" label="Full Address" register={register} error={errors.address} required placeholder="House No, Street, Area" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormInput name="city" label="City" register={register} error={errors.city} required />
                        <FormInput name="state" label="State" register={register} error={errors.state} required />
                        <FormInput name="zipCode" label="Pincode" register={register} error={errors.zipCode} required />
                    </div>

                    <div className="pt-4">
                      <button type="submit" disabled={isSubmittingLocal} className="w-full inline-flex justify-center items-center gap-3 rounded-full bg-gradient-to-r from-[#0B2F78] to-[#1340A0] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-[#0B2F78]/30 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed">
                          {isSubmittingLocal ? 'Processing Application...' : 'Get Free Membership'}
                      </button>
                    </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
    </div>
  );
};

// Active Member Form Component
const ActiveMemberForm = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState('');
  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const schema = useMemo(() => yup.object().shape({
    fullName: yup.string().required(t.form.validation.name_required),
    fatherName: yup.string().required(t.form.validation.fatherName_required),
    dob: yup.date().required(t.form.validation.dob_required).typeError(t.form.validation.dob_required),
    gender: yup.string().required(t.form.validation.gender_required),
    mobile: yup.string().matches(/^[0-9]{10}$/, t.form.validation.mobile_invalid).required(t.form.validation.mobile_required),
    email: yup.string().email(t.form.validation.email_invalid).required(t.form.validation.email_required),
    address: yup.string().required(t.form.validation.address_required),
    city: yup.string().required(t.form.validation.city_required),
    state: yup.string().required(t.form.validation.state_required),
    zipCode: yup.string().required(t.form.validation.zipCode_required),
    amount: yup.number().required().min(501),
    modeOfPayment: yup.string().required(),
    transactionId: yup.string().required(t.form.validation.transactionId_required),
    bankName: yup.string(),
    paymentScreenshot: yup.mixed().required(t.form.validation.screenshot_required)
      .test('fileSize', 'File is too large', value => value && value[0] && value[0].size <= 2 * 1024 * 1024) // 2MB limit
  }), [t]);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { gender: '', amount: 501, modeOfPayment: 'UPI' }
  });

  const paymentScreenshotFile = watch('paymentScreenshot');
  React.useEffect(() => {
    if (paymentScreenshotFile && paymentScreenshotFile[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setScreenshotPreview(reader.result);
      reader.readAsDataURL(paymentScreenshotFile[0]);
    } else {
      setScreenshotPreview('');
    }
  }, [paymentScreenshotFile]);

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    setIsSubmittingLocal(true);

    const fallbackTimer = window.setTimeout(() => {
      setIsSubmittingLocal(false);
      setError('The server is taking longer than usual. Please wait a moment and try again if it does not complete.');
    }, 12000);

    try {
      if (!data.paymentScreenshot || data.paymentScreenshot.length === 0) {
        setError(t.form.validation.screenshot_required);
        return;
      }

      const screenshotBase64 = await toBase64(data.paymentScreenshot[0]);

      const payload = {
        ...data,
        paymentAmount: data.amount,
        paymentScreenshot: screenshotBase64,
        membershipPlan: 'active'
      };

      const result = await apiRequest('/api/members', {
        method: 'POST',
        body: payload,
      });

      const successMessage = result?.message || 'Your application has been submitted successfully! We will verify and get back to you soon.';
      setSuccess(successMessage);
      reset();
      setScreenshotPreview('');
    } catch (err) {
      const fallbackError = err?.message || 'We could not submit your application right now. Please try again later.';
      setError(fallbackError);
    } finally {
      window.clearTimeout(fallbackTimer);
      setIsSubmittingLocal(false);
    }
  };

  const bankDetails = {
    bankName: "Axis Bank, Shyam Nagar Branch",
    accountName: "Shri Ram Youth Foundation",
    accountNumber: "926010005168853",
    ifsc: "UTIB0004175",
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      
      {/* 1. Payment Details Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl border border-slate-100"
      >
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-bold mb-3 uppercase tracking-wide">Step 1</span>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#EA580C]">Complete Payment</h2>
          <p className="mt-2 text-slate-500 font-medium">Contribute ₹501 to become an Active Member using details below.</p>
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
          </div>
        </div>
      </motion.div>

      {/* 2. Application Form Section & Success Screen */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl border border-slate-100 min-h-[600px] flex flex-col justify-center overflow-hidden"
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
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-20"
                />
                <FaCheckCircle className="relative z-10" />
                <motion.div 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: -10, opacity: 1 }} transition={{ delay: 0.5, type: 'spring' }}
                  className="absolute -top-2 -right-4 text-orange-500 text-4xl drop-shadow-md"
                >
                  <FaStar />
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
                className="inline-flex justify-center items-center gap-2 rounded-full border-2 border-[#F97316] px-8 py-3 text-base font-bold text-[#F97316] hover:bg-[#F97316] hover:text-white transition-colors duration-300"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            // FORM UI
            <motion.div
              key="form-content"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-3 uppercase tracking-wide">Step 2</span>
                <h2 className="text-3xl font-extrabold text-[#0B2F78]">Fill Your Details</h2>
                <p className="mt-2 text-slate-500 font-medium">Submit your personal details and payment proof to complete registration.</p>
              </div>

              {error && <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl"><FaExclamationCircle className="w-5 h-5 shrink-0" /> <p>{error}</p></div>}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput icon={<FaUser />} name="fullName" label="Full Name" register={register} error={errors.fullName} required />
                  <FormInput icon={<FaUser />} name="fatherName" label="Father's Name" register={register} error={errors.fatherName} required />
                  <FormInput icon={<FaBirthdayCake />} name="dob" label="Date of Birth" type="date" register={register} error={errors.dob} required />
                  
                  <div className="flex flex-col group">
                    <label htmlFor="gender_active" className="block text-sm font-bold text-slate-700 mb-1.5 ml-1 group-focus-within:text-orange-600">Gender <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-orange-500 transition-colors z-10">
                        <FaVenusMars className="h-5 w-5" />
                      </div>
                      <select id="gender_active" {...register('gender')} className={`block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-slate-800 shadow-sm appearance-none transition-all duration-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:outline-none cursor-pointer ${errors.gender ? 'border-red-500' : ''}`}>
                        <option value="" disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender.message}</p>}
                    </div>
                  </div>

                  <FormInput icon={<FaPhone />} name="mobile" label="Mobile Number" type="tel" register={register} error={errors.mobile} required />
                  <FormInput icon={<FaEnvelope />} name="email" label="Email Address" type="email" register={register} error={errors.email} required />
                </div>

                <FormInput icon={<FaMapMarkerAlt />} name="address" label="Full Address" register={register} error={errors.address} required placeholder="House No, Street, Area" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormInput name="city" label="City" register={register} error={errors.city} required />
                  <FormInput name="state" label="State" register={register} error={errors.state} required />
                  <FormInput name="zipCode" label="Pincode" register={register} error={errors.zipCode} required />
                </div>

                <hr className="border-slate-200" />

                {/* Payment Section in Form */}
                <div className="bg-orange-50/50 p-6 sm:p-8 rounded-2xl border border-orange-100 space-y-8">
                  <h3 className="text-xl font-bold text-[#0B2F78] mb-2 flex items-center gap-2"><FaRupeeSign className="text-orange-500"/> Payment Verification</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput icon={<FaRupeeSign />} name="amount" label="Amount Paid" type="number" register={register} error={errors.amount} required />
                    
                    <div className="flex flex-col">
                      <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Mode of Payment <span className="text-red-500">*</span></label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['UPI', 'Bank Transfer', 'Cash', 'Cheque'].map(mode => (
                          <label key={mode} className={`cursor-pointer border text-center px-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 select-none ${
                            watch('modeOfPayment') === mode 
                            ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm' 
                            : 'border-slate-200 bg-white text-slate-600 hover:border-orange-300'
                          }`}>
                            <input type="radio" {...register('modeOfPayment')} value={mode} className="hidden" />
                            {mode}
                          </label>
                        ))}
                      </div>
                      {errors.modeOfPayment && <p className="mt-1 text-xs text-red-600">{errors.modeOfPayment.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput icon={<FaHashtag />} name="transactionId" label="Transaction ID / UTR No." register={register} error={errors.transactionId} required />
                    <FormInput icon={<FaUniversity />} name="bankName" label="Your Bank Name (Optional)" register={register} error={errors.bankName} />
                  </div>

                  <div className="flex flex-col">
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Upload Payment Screenshot <span className="text-red-500">*</span></label>
                    <div className={`flex items-center gap-4 p-4 border-2 border-dashed rounded-xl bg-white transition-colors hover:border-orange-400 ${errors.paymentScreenshot ? 'border-red-500' : 'border-slate-300'}`}>
                      <label htmlFor="paymentScreenshot" className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-[#0B2F78] bg-slate-50 hover:bg-slate-100 shadow-sm transition-all hover:shadow-md">
                        <FaUpload className="text-orange-500" />
                        <span>{watch('paymentScreenshot')?.[0] ? 'Change File' : 'Choose File'}</span>
                        <input id="paymentScreenshot" type="file" className="hidden" {...register('paymentScreenshot')} accept="image/*" />
                      </label>
                      {screenshotPreview ? (
                        <img src={screenshotPreview} alt="Screenshot Preview" className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-lg border border-slate-200 shadow-md" />
                      ) : (
                        <span className="text-sm text-slate-400 font-medium">No file selected</span>
                      )}
                    </div>
                    {errors.paymentScreenshot && <p className="mt-1 text-xs text-red-600">{errors.paymentScreenshot.message}</p>}
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" disabled={isSubmittingLocal} className="w-full inline-flex justify-center items-center gap-3 rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSubmittingLocal ? 'Submitting Application...' : 'Submit Active Membership'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Main Membership Page Component
const Membership = () => {
  const [memberType, setMemberType] = useState('free');
  const { language } = useLanguage();

  // This is needed to pass translations to the form components if they were separate files
  // Since they are in the same file, they can access it directly.
  // But it's good practice to be explicit.
  const t = translations[language];

  return (
    <>
      <SEO 
        title="Membership"
        description="Become a member of Shri Ram Youth Foundation. Choose between Free or Active membership and contribute to building a better society."
        keywords="NGO membership, join NGO, free membership, active member, volunteer India" 
      />
      
      {/* Premium Hero Section */}
      <div className="relative py-24 text-white text-center overflow-hidden">
        <motion.img
          src={hero3}
          alt="People joining hands together"
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
            Become a Part of Change
          </motion.div>
          <motion.h1 
            className="text-4xl font-extrabold sm:text-5xl lg:text-6xl drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          >
            Join Our Family
          </motion.h1>
          <motion.p 
            className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-blue-100/90 font-medium leading-relaxed drop-shadow-md"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
          >
            Choose your membership type, share your passion, and start your journey with us to empower communities.
          </motion.p>
        </div>
      </div>

      <div className="bg-[#FFF9F2] py-20 min-h-screen relative overflow-hidden">
        {/* Subtle background blurs */}
        <div className="absolute top-40 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Custom Toggle Switch */}
          <div className="flex justify-center mb-16 relative z-10">
            <div className="inline-flex rounded-full bg-white p-2 shadow-lg border border-slate-100">
              <button
                onClick={() => setMemberType('free')}
                className={`relative px-6 sm:px-10 py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 flex items-center gap-2 ${
                  memberType === 'free' ? 'text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {memberType === 'free' && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-[#0B2F78] to-[#1340A0] rounded-full" transition={{ type: "spring", stiffness: 300, damping: 25 }} />
                )}
                <span className="relative z-10">👤 Free Member</span>
              </button>

              <button
                onClick={() => setMemberType('active')}
                className={`relative px-6 sm:px-10 py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 flex items-center gap-2 ${
                  memberType === 'active' ? 'text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {memberType === 'active' && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-[#F97316] to-[#EA580C] rounded-full" transition={{ type: "spring", stiffness: 300, damping: 25 }} />
                )}
                <span className="relative z-10">⭐ Active Member (₹501)</span>
              </button>
            </div>
          </div>

          {/* Render Form with Smooth AnimatePresence */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {memberType === 'free' ? (
                <motion.div key="free" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                  <FreeMemberForm />
                </motion.div>
              ) : (
                <motion.div key="active" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <ActiveMemberForm />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </>
  );
};

export default Membership;