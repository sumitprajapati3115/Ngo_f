import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiRequest } from './api';
import { FaArrowLeft, FaUser, FaEnvelope, FaCalendarAlt, FaTag, FaCheck, FaArchive, FaPhone } from 'react-icons/fa';
import Loader from '../../components/Loader';

const ContactDetails = () => {
    const { id } = useParams();
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchContact = useCallback(async () => {
        try {
            setLoading(true);
            const data = await apiRequest(`/api/contact/${id}`);
            setContact(data); // Assuming the API returns the contact object directly
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to fetch contact details.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchContact();
    }, [fetchContact]);

    const handleStatusUpdate = async (status) => {
        if (!window.confirm(`Are you sure you want to mark this message as '${status}'?`)) return;
        try {
            await apiRequest(`/api/contact/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status }),
            });
            fetchContact();
        } catch (err) {
            alert('Failed to update status: ' + err.message);
        }
    };

    if (loading) return <Loader />;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!contact) return <div className="p-8 text-center text-slate-500">Message not found.</div>;

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link to="/admin/contacts" className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-500 transition font-semibold">
                        <FaArrowLeft />
                        Back to Messages
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">{contact.subject}</h1>
                                <div className="mt-2 flex items-center gap-4 text-sm text-slate-500">
                                    <span className="flex items-center gap-2"><FaUser /> {contact.name}</span>
                                    <span className="flex items-center gap-2"><FaEnvelope /> {contact.email}</span>
                                    {contact.mobile && <span className="flex items-center gap-2"><FaPhone /> {contact.mobile}</span>}
                                    <span className="flex items-center gap-2"><FaCalendarAlt /> {new Date(contact.createdAt).toLocaleString()}</span>
                                </div>
                            </div>
                            <span className={`capitalize inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                                contact.status === 'new' ? 'bg-blue-100 text-blue-800' :
                                contact.status === 'read' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                                <FaTag /> {contact.status}
                            </span>
                        </div>

                        <div className="mt-8 border-t pt-6">
                            <h2 className="text-lg font-bold text-slate-700 mb-4">Message</h2>
                            <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{contact.message}</p>
                        </div>

                        <div className="mt-8 border-t pt-6">
                            <h2 className="text-lg font-bold text-slate-700 mb-4">Actions</h2>
                            <div className="flex gap-4">
                                {contact.status !== 'closed' && (
                                    <button onClick={() => handleStatusUpdate('closed')} className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-700">
                                        <FaArchive /> Mark as Closed
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactDetails;