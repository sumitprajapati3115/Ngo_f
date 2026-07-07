import React, { useState, useEffect } from 'react';
import { FaCertificate, FaCheckCircle, FaClock } from 'react-icons/fa';
import { apiRequest } from './api';
import Loader from '../../components/Loader';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        // Assuming an endpoint for certificates exists
        const data = await apiRequest('/api/certificates');
        setCertificates(Array.isArray(data) ? data : (data.certificates || []));
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch certificates.');
        setCertificates([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const issuedCount = certificates.filter(c => c.status === 'Issued').length;
  const pendingCount = certificates.filter(c => c.status === 'Pending').length;

  if (loading) return <Loader />;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">Certificates</p>
            <h1 className="text-3xl font-bold text-slate-800">Certificate Management</h1>
            <p className="mt-2 text-slate-600">Generate and monitor certificates for members, volunteers, and donors.</p>
          </div>
          <button className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600">Create certificate</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total</p>
            <FaCertificate className="text-orange-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-800">{certificates.length}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Issued</p>
            <FaCheckCircle className="text-green-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-800">{issuedCount}</p>
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
                <th className="px-6 py-4">Recipient</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((certificate) => (
                <tr key={certificate._id} className="border-b transition hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-800">{certificate.recipientName}</td>
                  <td className="px-6 py-4">{certificate.type}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${certificate.status === 'Issued' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {certificate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{new Date(certificate.issueDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
