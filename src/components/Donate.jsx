import React, { useState } from 'react';
import { useLanguage } from './LanguageContext.jsx';
import { translations } from './translations.js';
import { apiRequest } from '../pages/admin/api.js';

const amounts = ['₹501', '₹1100', '₹2100', '₹5100', '₹11000'];

export default function Donate() {
  const { language } = useLanguage();
  const t = translations[language].donate_page;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    donationAmount: '',
    screenshot: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, screenshot: file }));
    } else {
      setFormData(prev => ({ ...prev, screenshot: null }));
    }
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: '', text: '' });

    if (!formData.screenshot || !formData.fullName || !formData.email || !formData.mobile || !formData.donationAmount) {
      setStatusMessage({ type: 'error', text: 'Please fill all fields and upload a screenshot.' });
      setIsSubmitting(false);
      return;
    }

    try {
      const fileData = await toBase64(formData.screenshot);
      const payload = { ...formData, screenshot: fileData };

      const result = await apiRequest('/api/donations', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      const successMessage = result.message || 'Thank you! Your donation details have been submitted successfully.';
      setStatusMessage({ type: 'success', text: successMessage });
      setFormData({ fullName: '', email: '', mobile: '', donationAmount: '', screenshot: null });
      document.getElementById('screenshot').value = '';
    } catch (error) {
      setStatusMessage({ type: 'error', text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="donate" className="bg-[#FFF9F2] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="rounded-[2rem] bg-gradient-to-br from-[#F97316] to-[#FFD54F] p-10 text-[#1F2937] shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#0B2F78]">{t.header}</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.title}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#1F2937]">
            {t.description}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div className="grid gap-4 sm:grid-cols-3">
            <p className="sm:col-span-3 text-center text-sm font-semibold uppercase tracking-[0.3em] text-[#F97316]">{t.choose_amount}</p>
            {amounts.map((amount) => (
              <div key={amount} className="rounded-[2rem] bg-white p-6 text-center shadow-[0_25px_45px_rgba(11,45,109,0.08)] transition hover:-translate-y-1 hover:shadow-2xl">
                <p className="text-xl font-bold text-[#0B2F78]">{amount}</p>
                <p className="mt-2 text-sm text-[#6B7280]">{t.premium_support}</p>
              </div>
            ))}
            <div className="rounded-[2rem] bg-white p-6 text-center shadow-[0_25px_45px_rgba(11,45,109,0.08)] transition hover:-translate-y-1 hover:shadow-2xl">
              <p className="text-xl font-bold text-[#0B2F78]">{t.custom_amount}</p>
              <p className="mt-2 text-sm text-[#6B7280]">{t.custom_desc}</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#E5E7EB] bg-white p-8 shadow-xl">
            <h3 className="text-2xl font-semibold text-[#0B2F78]">{t.payment_method}</h3>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="space-y-4 text-sm text-[#1F2937]">
                <div className="rounded-2xl border border-[#E5E7EB] bg-[#FFF9F2] p-4">
                  <p className="font-semibold">{t.upi_id}</p>
                  <p className="mt-1">srmapfoundation@oksbi</p>
                </div>
                <div className="rounded-2xl border border-[#E5E7EB] bg-[#FFF9F2] p-4">
                  <p className="font-semibold">{t.bank}</p>
                  <p className="mt-1">State Bank of India</p>
                  <p className="mt-1">A/C: 1234567890</p>
                  <p className="mt-1">IFSC: SBIN0001234</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E5E7EB] bg-[#FFF9F2] p-4">
                <p className="font-semibold">{t.scan_qr}</p>
                <div className="mt-2 h-32 w-32 rounded-lg bg-[#E5E7EB]" />
              </div>
            </div>
            <div className="mt-8 border-t border-slate-200 pt-8">
              <h3 className="text-2xl font-semibold text-[#0B2F78]">{t.your_details}</h3>
              <p className="mt-2 text-sm text-slate-500">{t.details_desc}</p>

              {statusMessage.text && (
                <div className={`mt-4 rounded-lg p-4 text-sm ${statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {statusMessage.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">{t.full_name}</label>
                  <input type="text" id="fullName" value={formData.fullName} onChange={handleInputChange} placeholder={t.full_name_placeholder} className="w-full rounded-full border border-slate-300 px-5 py-3 focus:border-[#F97316] focus:ring-[#F97316]" required />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">{t.email}</label>
                  <input type="email" id="email" value={formData.email} onChange={handleInputChange} placeholder={t.email_placeholder} className="w-full rounded-full border border-slate-300 px-5 py-3 focus:border-[#F97316] focus:ring-[#F97316]" required />
                </div>
                <div>
                  <label htmlFor="mobile" className="mb-1.5 block text-sm font-medium text-slate-700">{t.mobile}</label>
                  <input type="tel" id="mobile" value={formData.mobile} onChange={handleInputChange} placeholder={t.mobile_placeholder} className="w-full rounded-full border border-slate-300 px-5 py-3 focus:border-[#F97316] focus:ring-[#F97316]" required />
                </div>
                <div>
                  <label htmlFor="amount" className="mb-1.5 block text-sm font-medium text-slate-700">{t.donation_amount}</label>
                  <input type="text" id="donationAmount" value={formData.donationAmount} onChange={handleInputChange} placeholder={t.donation_amount_placeholder} className="w-full rounded-full border border-slate-300 px-5 py-3 focus:border-[#F97316] focus:ring-[#F97316]" required />
                </div>
                <div>
                  <label htmlFor="screenshot" className="mb-1.5 block text-sm font-medium text-slate-700">{t.screenshot}</label>
                  <label htmlFor="screenshot" className="relative flex cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-slate-300 p-3.5 text-center transition-colors hover:border-[#F97316] hover:bg-orange-50/50">
                    <svg className="mr-2 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    <span className="text-sm font-medium text-slate-600">
                      {formData.screenshot?.name || t.screenshot_placeholder}
                    </span>
                    <input type="file" id="screenshot" className="absolute inset-0 h-full w-full cursor-pointer opacity-0" onChange={handleFileChange} />
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting && (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {isSubmitting ? 'Submitting...' : t.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
