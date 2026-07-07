import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from './api';
import { FaSearch, FaEnvelope, FaEnvelopeOpen, FaCheck, FaTrash, FaInbox } from 'react-icons/fa';
import Loader from '../../components/Loader';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (statusFilter !== 'All') params.append('status', statusFilter);
      params.append('page', page);

      const data = await apiRequest(`/api/contact?${params.toString()}`);
      setContacts(data.docs || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, statusFilter, page]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => fetchContacts(), 300);
    return () => clearTimeout(debounceTimer);
  }, [fetchContacts]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await apiRequest(`/api/contact/${id}`, { method: 'DELETE' });
      fetchContacts();
    } catch (error) {
      alert('Failed to delete message: ' + error.message);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800"><FaEnvelope /> New</span>;
      case 'read':
        return <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800"><FaEnvelopeOpen /> Read</span>;
      case 'closed':
        return <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800"><FaCheck /> Closed</span>;
      default:
        return null;
    }
  };

  if (loading && contacts.length === 0) return <Loader />;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-white p-6 shadow-sm mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Contact Messages</h1>
          <p className="mt-2 text-slate-600">View and manage all inquiries from the contact form.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search by name, email, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              />
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            <div className="flex-shrink-0">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto px-4 py-3.5 rounded-full border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition bg-white"
              >
                <option value="All">All Statuses</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-6 text-left">From</th>
                  <th className="py-3 px-6 text-left">Subject</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Received</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {loading && (
                  <tr>
                    <td colSpan="5" className="text-center py-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                      <p className="mt-2">Loading...</p>
                    </td>
                  </tr>
                )}
                {!loading && contacts.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-16 text-slate-500">
                      <FaInbox className="mx-auto h-12 w-12 text-slate-400" />
                      <h3 className="mt-4 text-lg font-semibold">No messages found</h3>
                      <p>Try adjusting your search or filter.</p>
                    </td>
                  </tr>
                )}
                {!loading && contacts.map((contact) => (
                  <tr key={contact._id} className={`transition hover:bg-slate-50 ${contact.status === 'new' ? 'bg-blue-50' : ''}`}>
                    <td className="py-4 px-6 border-b border-slate-200">
                      <p className="font-semibold text-slate-800">{contact.name}</p>
                      <p className="text-xs text-slate-500">{contact.email}</p>
                    </td>
                    <td className="py-4 px-6 border-b border-slate-200">{contact.subject}</td>
                    <td className="py-4 px-6 border-b border-slate-200">{getStatusBadge(contact.status)}</td>
                    <td className="py-4 px-6 border-b border-slate-200">{new Date(contact.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-6 border-b border-slate-200 text-center">
                      <div className="flex items-center justify-center gap-x-1">
                        <button onClick={() => navigate(`/admin/contacts/${contact._id}`)} className="p-2 rounded-full hover:bg-blue-100 transition text-blue-600" aria-label="View Message">
                          <FaEnvelopeOpen />
                        </button>
                        <button onClick={() => handleDelete(contact._id)} className="p-2 rounded-full hover:bg-red-100 transition text-red-600" aria-label="Delete Message">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!loading && totalPages > 1 && (
            <div className="p-4 flex justify-center items-center gap-2 text-slate-600">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>
              <span className="px-4 py-2 rounded-lg bg-slate-100 font-semibold text-slate-800">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;