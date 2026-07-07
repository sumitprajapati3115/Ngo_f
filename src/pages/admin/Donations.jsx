import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDonate, FaRupeeSign, FaCheckCircle, FaClock, FaSearch, FaEye } from 'react-icons/fa';
import { apiRequest } from './api';
import Loader from '../../components/Loader';

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) {
          params.append('search', search);
        }
        if (statusFilter !== 'All') {
          params.append('status', statusFilter);
        }
        params.append('page', page);
        const data = await apiRequest(`/api/donations?${params.toString()}`);
        setDonations(data.docs || []);
        setTotalPages(data.totalPages || 1);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch donations.');
        setDonations([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchDonations();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [search, statusFilter, page]);

  const handleView = (id) => {
    navigate(`/admin/donations/${id}`);
  };

  const totalRaised = donations.reduce((sum, d) => (d.status === 'Completed' ? sum + d.donationAmount : sum), 0);
  const completedCount = donations.filter(d => d.status === 'Completed').length;
  const pendingCount = donations.filter(d => d.status === 'Pending').length;

  if (loading && donations.length === 0) return <Loader />;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">Donations</p>
            <h1 className="text-3xl font-bold text-slate-800">Donation Records</h1>
            <p className="mt-2 text-slate-600">Monitor incoming support and payment status with a clear overview.</p>
          </div>
          <div className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
            ₹{totalRaised.toLocaleString('en-IN')} raised
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by name, email, or amount..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
        <div className="flex-shrink-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total donations</p>
            <FaDonate className="text-orange-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-800">{donations.length}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Completed</p>
            <FaCheckCircle className="text-green-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-800">{completedCount}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Pending</p>
            <FaClock className="text-blue-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-800">{pendingCount}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b bg-slate-100 text-xs uppercase text-slate-700">
              <tr>
                <th className="px-6 py-4">Donor</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.length > 0 ? (
                donations.map((donation) => (
                  <tr key={donation._id} className="border-b transition hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-800">{donation.fullName || 'Anonymous'}</td>
                    <td className="px-6 py-4">₹{donation.donationAmount.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4">{donation.method || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${donation.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {donation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{new Date(donation.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => handleView(donation._id)} className="p-2 rounded-full hover:bg-gray-200 transition text-slate-600" aria-label="View Donation">
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-slate-500">
                    <h3 className="text-lg font-semibold">No donations found</h3>
                    <p>Try adjusting your search or filter.</p>
                  </td>
                </tr>
              )}
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
  );
};

export default Donations;
