import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiRequest } from './api';
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaRupeeSign, FaHashtag, FaUniversity, FaImage, FaCheckCircle, FaClock } from 'react-icons/fa';

const DetailItem = ({ icon, label, value }) => (
    <li className="flex items-start gap-4 py-2">
        <div className="flex-shrink-0 w-6 text-center text-slate-400">{icon}</div>
        <div>
            <span className="font-semibold text-slate-600">{label}:</span>
            <span className="ml-2 text-slate-800">{value || 'N/A'}</span>
        </div>
    </li>
);

const DonationDetails = () => {
    const { id } = useParams();
    const [donation, setDonation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDonation = async () => {
        try {
            setLoading(true);
            const data = await apiRequest(`/api/donations/${id}`);
            setDonation(data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to fetch donation details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonation();
    }, [id]);

    const handleStatusUpdate = async (status) => {
        if (!window.confirm(`Are you sure you want to mark this donation as ${status}?`)) return;
        try {
            await apiRequest(`/api/donations/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status }),
            });
            fetchDonation(); // Refetch to show updated status
        } catch (err) {
            alert('Failed to update status: ' + err.message);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading donation details...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!donation) return <div className="p-8 text-center text-slate-500">Donation not found.</div>;

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link to="/admin/donations" className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-500 transition font-semibold">
                        <FaArrowLeft />
                        Back to Donations
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                            <div className="flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white shadow-lg">
                                <FaRupeeSign size={40} />
                            </div>
                            <div className="text-center sm:text-left">
                                <h1 className="text-3xl font-bold text-slate-800">{donation.fullName}</h1>
                                <p className="text-slate-500 mt-1">Donation on {new Date(donation.createdAt).toLocaleDateString('en-IN')}</p>
                            </div>
                        </div>

                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-slate-700 mb-4 border-b pb-2">Donor Information</h2>
                                <ul className="space-y-1 text-sm">
                                    <DetailItem icon={<FaUser />} label="Full Name" value={donation.fullName} />
                                    <DetailItem icon={<FaEnvelope />} label="Email" value={donation.email} />
                                    <DetailItem icon={<FaPhone />} label="Mobile" value={donation.mobile} />
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-700 mb-4 border-b pb-2">Payment Details</h2>
                                <ul className="space-y-1 text-sm">
                                    <DetailItem icon={<FaRupeeSign />} label="Amount" value={`₹${donation.donationAmount}`} />
                                    <DetailItem icon={<FaHashtag />} label="Transaction ID" value={donation.transactionId} />
                                    <DetailItem icon={<FaUniversity />} label="Bank Name" value={donation.bankName} />
                                    <li className="flex items-center gap-4 py-2">
                                        <div className="flex-shrink-0 w-6 text-center text-slate-400">
                                            {donation.status === 'Completed' ? <FaCheckCircle className="text-green-500" /> : <FaClock className="text-amber-500" />}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-slate-600">Status:</span>
                                            <span className="ml-2 font-semibold">{donation.status}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {donation.screenshot && (
                            <div className="mt-8 border-t pt-6">
                                <h2 className="text-xl font-bold text-slate-700 mb-4">Payment Screenshot</h2>
                                <a href={donation.screenshot.url} target="_blank" rel="noopener noreferrer">
                                    <img src={donation.screenshot.url} alt="Payment Screenshot" className="max-w-sm h-auto rounded-lg border shadow-sm cursor-pointer" />
                                </a>
                            </div>
                        )}

                        {donation.status === 'Pending' && (
                            <div className="mt-8 border-t pt-6">
                                <h2 className="text-xl font-bold text-slate-700 mb-4">Actions</h2>
                                <div className="flex gap-4">
                                    <button onClick={() => handleStatusUpdate('Completed')} className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-700">
                                        <FaCheckCircle /> Mark as Completed
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationDetails;