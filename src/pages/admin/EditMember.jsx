import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiRequest } from './api';
import Loader from '../../components/Loader';
import { FaArrowLeft, FaSave, FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaBriefcase, FaMapMarkerAlt, FaTint } from 'react-icons/fa';

// Reusable input component
const FormInput = ({ id, label, type = 'text', value, onChange, placeholder, icon }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-700">
      {label}
    </label>
    <div className="relative mt-1">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {icon || <FaUser className="h-5 w-5 text-slate-400" />}
      </div>
      <input
        type={type}
        id={id}
        name={id}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        className="block w-full rounded-lg border-slate-300 py-3 pl-10 shadow-sm focus:border-orange-500 focus:ring-orange-500"
      />
    </div>
  </div>
);

const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);
        const data = await apiRequest(`/api/members/${id}`);
        // Ensure all form fields are initialized to prevent uncontrolled components
        const initialData = {
          fullName: '',
          fatherName: '',
          email: '',
          mobile: '',
          dob: '',
          gender: '',
          occupation: '',
          bloodGroup: '',
          address: '', city: '', state: '', zipCode: ''
        };
        setFormData({ ...initialData, ...data });
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch member details.');
        setFormData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await apiRequest(`/api/members/${id}`, {
        method: 'PUT', // Or PATCH
        body: JSON.stringify(formData),
      });
      alert('Member updated successfully!');
      navigate(`/admin/members/${id}`); // Navigate back to profile page
    } catch (err) {
      setError(err.message || 'Failed to update member.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (error && !formData) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!formData) return <div className="p-8 text-center text-slate-500">Member not found.</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to={`/admin/members/${id}`} className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-500 transition font-semibold">
            <FaArrowLeft />
            Back to Profile
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-slate-800">Edit Member</h1>
            <p className="text-slate-500 mt-1">Update details for {formData.fullName}.</p>
            
            {error && <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>}

            <div className="mt-8 space-y-8 border-t pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput id="fullName" label="Full Name" value={formData.fullName} onChange={handleInputChange} icon={<FaUser className="h-5 w-5 text-slate-400" />} />
                <FormInput id="fatherName" label="Father's Name" value={formData.fatherName} onChange={handleInputChange} icon={<FaUser className="h-5 w-5 text-slate-400" />} />
                <FormInput id="email" label="Email" type="email" value={formData.email} onChange={handleInputChange} icon={<FaEnvelope className="h-5 w-5 text-slate-400" />} />
                <FormInput id="mobile" label="Mobile" type="tel" value={formData.mobile || formData.phone || ''} onChange={handleInputChange} icon={<FaPhone className="h-5 w-5 text-slate-400" />} />
                <FormInput id="dob" label="Date of Birth" type="date" value={formData.dob ? new Date(formData.dob).toISOString().split('T')[0] : ''} onChange={handleInputChange} icon={<FaBirthdayCake className="h-5 w-5 text-slate-400" />} />
                
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-slate-700">Gender</label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaVenusMars className="h-5 w-5 text-slate-400" />
                    </div>
                    <select id="gender" name="gender" value={formData.gender || ''} onChange={handleInputChange} className="block w-full rounded-lg border-slate-300 py-3 pl-10 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <FormInput id="occupation" label="Occupation" value={formData.occupation} onChange={handleInputChange} icon={<FaBriefcase className="h-5 w-5 text-slate-400" />} />
                
                <div>
                  <label htmlFor="bloodGroup" className="block text-sm font-medium text-slate-700">Blood Group</label>
                  <div className="relative mt-1">
                     <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaTint className="h-5 w-5 text-slate-400" />
                    </div>
                    <select id="bloodGroup" name="bloodGroup" value={formData.bloodGroup || ''} onChange={handleInputChange} className="block w-full rounded-lg border-slate-300 py-3 pl-10 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                      <option value="">Select Blood Group</option>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <label htmlFor="address" className="block text-sm font-medium text-slate-700">Address</label>
                <div className="relative">
                   <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pt-3">
                      <FaMapMarkerAlt className="h-5 w-5 text-slate-400" />
                    </div>
                  <textarea id="address" name="address" rows="3" value={formData.address || ''} onChange={handleInputChange} className="block w-full rounded-lg border-slate-300 py-3 pl-10 shadow-sm focus:border-orange-500 focus:ring-orange-500" placeholder="Enter full address" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormInput id="city" label="City" value={formData.city} onChange={handleInputChange} />
                  <FormInput id="state" label="State" value={formData.state} onChange={handleInputChange} />
                  <FormInput id="zipCode" label="Zip Code" value={formData.zipCode} onChange={handleInputChange} />
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t pt-6 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : <><FaSave /> Save Changes</>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMember;