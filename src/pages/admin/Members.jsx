import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest, getApiUrl } from './api';
import { FaSearch, FaEye, FaPen, FaCheck, FaTrash, FaFileDownload, FaFileAlt } from 'react-icons/fa';
import Loader from '../../components/Loader';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) {
        params.append('search', searchQuery);
      }
      if (statusFilter !== 'All') {
        params.append('status', statusFilter);
      }
      params.append('page', page);

      const data = await apiRequest(`/api/members?${params.toString()}`);
      setMembers(data.docs || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching members:', error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, statusFilter, page]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchMembers();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [fetchMembers]);

  const handleApprove = async (id) => {
    if (!window.confirm('Are you sure you want to approve this member?')) return;
    try {
      await apiRequest(`/api/members/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'Active' }),
      });
      fetchMembers();
    } catch (error) {
      console.error('Error approving member:', error);
      alert('Failed to approve member.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member? This action cannot be undone.')) return;
    try {
      await apiRequest(`/api/members/${id}`, { method: 'DELETE' });
      fetchMembers();
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Failed to delete member.');
    }
  };

  const backendUrl = getApiUrl();

  if (loading && members.length === 0) {
    return <Loader />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-white p-6 shadow-sm mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Members Management</h1>
          <p className="mt-2 text-slate-600">Search, filter, and manage all member records.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search by name, ID, email..."
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
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Member ID</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Certificate</th>
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
                {!loading && members.length === 0 && (
                  <tr><td colSpan="5" className="text-center py-16 text-slate-500">
                    <h3 className="text-lg font-semibold">No members found</h3>
                    <p>Try adjusting your search or filter.</p>
                  </td></tr>
                )}
                {!loading && members.map((member, index) => (
                  <tr key={member._id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="py-4 px-6 border-b border-slate-200 font-semibold text-slate-800">{member.fullName}</td>
                    <td className="py-4 px-6 border-b border-slate-200">{member.memberId}</td>
                    <td className="py-4 px-6 border-b border-slate-200">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          member.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : member.membershipPlan === 'free'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {member.status === 'Pending' ? 'Pending' : member.membershipPlan}
                      </span>
                    </td>
                    <td className="py-4 px-6 border-b border-slate-200">
                      {member.status === 'Active' && member.certificateNumber ? (
                        <div className="flex items-center gap-3">
                          <a href={`${backendUrl}/api/certificates/preview/${member._id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline" title="View Certificate">
                            <FaFileAlt />
                            <span>View</span>
                          </a>
                          <a href={`${backendUrl}/api/certificates/download/${member._id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-green-600 hover:underline" title="Download Certificate">
                            <FaFileDownload />
                            <span>Download</span>
                          </a>
                        </div>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="py-4 px-6 border-b border-slate-200 text-center">
                      <div className="flex items-center justify-center gap-x-1">
                        <Link to={`/admin/members/${member._id}`} className="p-2 rounded-full hover:bg-slate-200 transition text-slate-600" aria-label="View Profile">
                          <FaEye />
                        </Link>
                        <Link to={`/admin/members/edit/${member._id}`} className="p-2 rounded-full hover:bg-blue-100 transition text-blue-600" aria-label="Edit Member">
                          <FaPen />
                        </Link>
                        {member.status === 'Pending' && (
                          <button onClick={() => handleApprove(member._id)} className="p-2 rounded-full hover:bg-green-100 transition text-green-600" aria-label="Approve Member">
                            <FaCheck />
                          </button>
                        )}
                        <button onClick={() => handleDelete(member._id)} className="p-2 rounded-full hover:bg-red-100 transition text-red-600" aria-label="Delete Member">
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
            <div className="mt-8 flex justify-center items-center gap-2 text-slate-600">
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

export default Members;