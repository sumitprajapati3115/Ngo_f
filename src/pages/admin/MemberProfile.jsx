import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiRequest, getApiUrl } from './api';
import { FaCertificate, FaDownload, FaUser, FaEnvelope, FaPhone, FaIdCard, FaCheckCircle, FaClock, FaArrowLeft, FaExchangeAlt, FaEye, FaBirthdayCake, FaVenusMars, FaBriefcase, FaMapMarkerAlt, FaTint, FaPen, FaRupeeSign, FaHashtag, FaUniversity, FaImage, FaCreditCard } from 'react-icons/fa';

const DetailItem = ({ icon, label, value, capitalize = false }) => (
    <li className="flex items-start gap-4 py-2">
      <div className="flex-shrink-0 w-6 text-center text-slate-400">{icon}</div>
      <div>
        <span className="font-semibold text-slate-600">{label}:</span>
        <span className={`ml-2 text-slate-800 ${capitalize ? 'capitalize' : ''}`}>{value || 'N/A'}</span>
      </div>
    </li>
);

const MemberProfile = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const data = await apiRequest(`/api/members/${id}`);
        setMember(data || null);
        setError(null);
      } catch (error) {
        console.error('Error fetching member:', error);
        setError(error.message || 'Failed to fetch member details.');
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  const handlePlanChange = async (newPlan) => {
    if (!window.confirm(`Are you sure you want to change this member to a ${newPlan} member?`)) return;
    try {
      const { member: updatedMember } = await apiRequest(`/api/members/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ membershipPlan: newPlan }),
      });
      setMember(updatedMember);
      alert('Membership plan updated successfully!');
    } catch (error) {
      console.error('Error updating membership plan:', error);
      alert('Failed to update membership plan.');
    }
  };

  const backendUrl = getApiUrl();

  if (loading) {
    return <div className="p-8 text-center">Loading member profile...</div>;
  }

  if (!member) {
    return <div className="p-8 text-center text-red-500">{error || 'Member not found.'}</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <Link to="/admin/members" className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-500 transition font-semibold">
            <FaArrowLeft />
            Back to Members List
          </Link>
          <Link to={`/admin/members/edit/${id}`} className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700">
            <FaPen /> Edit Profile
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white shadow-lg">
                <FaUser size={40} />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-slate-800">{member.fullName}</h1>
                <p className="text-slate-500 mt-1">{member.memberId}</p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-700 mb-4 border-b pb-2">Personal & Contact</h2>
                <ul className="space-y-1 text-sm">
                  <DetailItem icon={<FaUser />} label="Father's Name" value={member.fatherName} />
                  <DetailItem icon={<FaBirthdayCake />} label="Date of Birth" value={member.dob ? new Date(member.dob).toLocaleDateString('en-IN') : 'N/A'} />
                  <DetailItem icon={<FaVenusMars />} label="Gender" value={member.gender} capitalize />
                  <DetailItem icon={<FaTint />} label="Blood Group" value={member.bloodGroup} />
                  <DetailItem icon={<FaBriefcase />} label="Occupation" value={member.occupation} />
                  <DetailItem icon={<FaEnvelope />} label="Email" value={member.email} />
                  <DetailItem icon={<FaPhone />} label="Mobile" value={member.phone} />
                  <DetailItem icon={<FaMapMarkerAlt />} label="Address" value={`${member.address || ''}, ${member.city || ''}, ${member.state || ''} - ${member.zipCode || ''}`} />
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-700 mb-4 border-b pb-2">Membership & Payment</h2>
                 <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-4 py-2">
                    <div className="flex-shrink-0 w-6 text-center text-slate-400">
                      {member.status === 'Active' ? <FaCheckCircle className="text-green-500" /> : <FaClock className="text-amber-500" />}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-600">Status:</span>
                      <span className="ml-2 font-semibold">{member.status}</span>
                    </div>
                  </li>
                  <DetailItem icon={<FaIdCard />} label="Plan" value={member.membershipPlan} capitalize />
                  <DetailItem icon={<FaCertificate />} label="Certificate No" value={member.certificateNumber} />
                  <DetailItem icon={<FaRupeeSign />} label="Amount Paid" value={member.paymentAmount} />
                  <DetailItem icon={<FaCreditCard />} label="Payment Mode" value={member.modeOfPayment} />
                  <DetailItem icon={<FaHashtag />} label="Transaction ID" value={member.transactionId} />
                  <DetailItem icon={<FaUniversity />} label="Bank Name" value={member.bankName} />
                  {member.paymentScreenshot && (
                    <li className="flex items-start gap-4 py-2">
                      <div className="flex-shrink-0 w-6 text-center text-slate-400"><FaImage /></div>
                      <div>
                        <span className="font-semibold text-slate-600">Screenshot:</span>
                        <a href={member.paymentScreenshot.url} target="_blank" rel="noopener noreferrer" className="ml-2">
                          <img src={member.paymentScreenshot.url} alt="Payment Screenshot" className="mt-1 max-w-xs h-auto rounded-lg border shadow-sm" />
                        </a>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {member.status === 'Active' && (
              <div className="mt-6 border-t pt-6">
                <h2 className="text-lg font-bold text-slate-700 mb-4">Manage Membership</h2>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                  <p className="flex-grow text-sm text-slate-600">
                    {member.membershipPlan === 'free'
                      ? 'Upgrade this member to a full "Active" membership.'
                      : 'Downgrade this member to a "Free" membership.'}
                  </p>
                  {member.membershipPlan === 'free' ? (
                    <button onClick={() => handlePlanChange('active')} className="inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600">
                      <FaExchangeAlt /> Upgrade to Active
                    </button>
                  ) : (
                    <button onClick={() => handlePlanChange('free')} className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600">
                      <FaExchangeAlt /> Downgrade to Free
                    </button>
                  )}
                </div>
              </div>
            )}

            {member.status === 'Active' && member.certificateNumber && (
              <div className="mt-6 border-t pt-6">
                <h2 className="text-lg font-bold text-slate-700 mb-4">Certificate Actions</h2>
                <div className="flex gap-4">
                  <a href={`${backendUrl}/api/certificates/preview/${member._id}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <FaEye /> View Certificate
                  </a>
                  <a href={`${backendUrl}/api/certificates/download/${member._id}`} className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                    <FaDownload /> Download
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;