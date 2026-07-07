import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaUserClock, FaRupeeSign, FaHeart, FaUserPlus, FaDonate, FaArrowRight, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { apiRequest } from './api';
import { ResponsiveContainer, LineChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Bar } from 'recharts';

const fallbackDashboardData = {
  stats: [
    { name: 'Total Members', value: 248, icon: 'FaUsers', isCurrency: false },
    { name: 'Pending Requests', value: 14, icon: 'FaUserClock', isCurrency: false },
    { name: 'Funds Raised', value: 1825000, icon: 'FaRupeeSign', isCurrency: true },
    { name: 'Active Supporters', value: 96, icon: 'FaHeart', isCurrency: false },
  ],
  recentMembers: [
    { _id: 'm1', fullName: 'Aarav Sharma', createdAt: '2026-07-05T10:30:00Z' },
    { _id: 'm2', fullName: 'Priya Mehta', createdAt: '2026-07-04T14:20:00Z' },
  ],
  recentDonations: [
    { _id: 'd1', fullName: 'Rohan Singh', donationAmount: 5000, createdAt: '2026-07-05T08:45:00Z' },
    { _id: 'd2', fullName: 'Anonymous', donationAmount: 2500, createdAt: '2026-07-04T19:10:00Z' },
  ],
  memberGrowthData: [
    { name: 'Jan', 'New Members': 18 },
    { name: 'Feb', 'New Members': 22 },
    { name: 'Mar', 'New Members': 31 },
    { name: 'Apr', 'New Members': 27 },
    { name: 'May', 'New Members': 36 },
    { name: 'Jun', 'New Members': 44 },
  ],
  donationTrendData: [
    { name: 'Jan', Donations: 180000 },
    { name: 'Feb', Donations: 220000 },
    { name: 'Mar', Donations: 260000 },
    { name: 'Apr', Donations: 240000 },
    { name: 'May', Donations: 310000 },
    { name: 'Jun', Donations: 350000 },
  ],
};

const iconMap = {
  FaUsers: <FaUsers />,
  FaUserClock: <FaUserClock />,
  FaRupeeSign: <FaRupeeSign />,
  FaHeart: <FaHeart />,
  FaUserPlus: <FaUserPlus />,
  FaDonate: <FaDonate />,
  FaEnvelope: <FaEnvelope />,
};

const StatCard = ({ stat, colorClasses }) => (
  <motion.div
    className={`rounded-2xl p-6 text-white shadow-lg ${colorClasses}`}
    whileHover={{ y: -5, scale: 1.03 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <div className="flex items-center justify-between">
      <div className="text-4xl opacity-80">{iconMap[stat.icon]}</div>
      <div className="text-right">
        <p className="text-sm font-medium opacity-90">{stat.name}</p>
        <p className="text-3xl font-bold">
          {stat.isCurrency ? `₹${Number(stat.value).toLocaleString('en-IN')}` : stat.value}
        </p>
      </div>
    </div>
  </motion.div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-600 bg-slate-800 p-3 text-white shadow-lg">
        <p className="mb-1 font-bold">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>
            {`${p.name}: ${p.dataKey === 'Donations' ? '₹' : ''}${Number(p.value).toLocaleString('en-IN')}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const MemberGrowthChart = ({ data }) => (
  <div className="h-[380px] rounded-2xl bg-white p-6 shadow-lg">
    <h3 className="mb-4 text-lg font-semibold text-slate-800">Member Growth</h3>
    {data && data.length > 0 ? (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 55 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} tick={{ fontSize: 11 }} />
          <YAxis allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
          <Bar dataKey="New Members" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    ) : (
      <div className="-m-6 flex h-full items-center justify-center rounded-lg bg-slate-50 text-slate-400">
        Not enough data to display chart.
      </div>
    )}
  </div>
);

const DonationTrendChart = ({ data }) => (
  <div className="h-[380px] rounded-2xl bg-white p-6 shadow-lg">
    <h3 className="mb-4 text-lg font-semibold text-slate-800">Donation Trends</h3>
    {data && data.length > 0 ? (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 55 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} tick={{ fontSize: 11 }} />
          <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="Donations" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    ) : (
      <div className="-m-6 flex h-full items-center justify-center rounded-lg bg-slate-50 text-slate-400">
        Not enough data to display chart.
      </div>
    )}
  </div>
);

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="text-right">
      <p className="text-2xl font-bold text-slate-700">
        {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
      </p>
      <p className="text-sm text-slate-500">
        {time.toLocaleString('en-IN', { weekday: 'long' })}, {time.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
    </div>
  );
};


const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(fallbackDashboardData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiRequest('/api/admin/stats');
        const nextData = {
          ...fallbackDashboardData,
          ...data,
          stats: data?.stats?.length ? data.stats : fallbackDashboardData.stats,
          recentMembers: data?.recentMembers?.length ? data.recentMembers : fallbackDashboardData.recentMembers,
          recentDonations: data?.recentDonations?.length ? data.recentDonations : fallbackDashboardData.recentDonations,
          memberGrowthData: data?.memberGrowthData?.length ? data.memberGrowthData : fallbackDashboardData.memberGrowthData,
          donationTrendData: data?.donationTrendData?.length ? data.donationTrendData : fallbackDashboardData.donationTrendData,
        };
        setDashboardData(nextData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setDashboardData(fallbackDashboardData);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return `${Math.floor(interval)} years ago`;
    interval = seconds / 2592000;
    if (interval > 1) return `${Math.floor(interval)} months ago`;
    interval = seconds / 86400;
    if (interval > 1) return `${Math.floor(interval)} days ago`;
    interval = seconds / 3600;
    if (interval > 1) return `${Math.floor(interval)} hours ago`;
    interval = seconds / 60;
    if (interval > 1) return `${Math.floor(interval)} minutes ago`;
    return `${Math.floor(seconds)} seconds ago`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' } },
  };

  const cardColors = [
    'bg-gradient-to-br from-orange-500 to-red-500',
    'bg-gradient-to-br from-blue-500 to-indigo-600',
    'bg-gradient-to-br from-green-500 to-teal-500',
    'bg-gradient-to-br from-purple-500 to-pink-500',
  ];

  return (
    <section className="space-y-8">
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{getGreeting()}, Admin</h1>
            <p className="mt-1 text-slate-500">Here's what's happening with your foundation today.</p>
          </div>
          <div className="flex items-center gap-4">
            <Clock />
          </div>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-200" />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">
          <p className="font-bold">Using sample dashboard data.</p>
          <p className="mt-1">{error}</p>
        </div>
      )}

      {!loading && (
        <>
          <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" variants={containerVariants} initial="hidden" animate="visible">
            {dashboardData?.stats?.map((stat, index) => (
              <motion.div key={stat.name} variants={itemVariants}>
                {stat.icon === 'FaUsers' ? (
                  <Link to="/admin/members" className="cursor-pointer">
                    <StatCard stat={stat} colorClasses={cardColors[index % cardColors.length]} />
                  </Link>
                ) : (
                  <StatCard stat={stat} colorClasses={cardColors[index % cardColors.length]} />
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="grid grid-cols-1 gap-8 lg:grid-cols-2" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants}><MemberGrowthChart data={dashboardData.memberGrowthData} /></motion.div>
            <motion.div variants={itemVariants}><DonationTrendChart data={dashboardData.donationTrendData} /></motion.div>
          </motion.div>

          <motion.div className="rounded-2xl bg-white p-6 shadow-lg" variants={itemVariants}>
            <h2 className="text-xl font-bold text-slate-800">Recent Activity</h2>
            <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 border-b pb-2 font-semibold text-slate-600">New Members</h3>
                <ul className="space-y-4">
                  {dashboardData?.recentMembers?.length > 0 ? (
                    dashboardData.recentMembers.map((member) => (
                      <li key={member._id} className="flex items-center gap-3 text-sm">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600"><FaUserPlus /></div>
                        <div>
                          <p className="font-semibold text-slate-800">{member.fullName}</p>
                          <p className="text-xs text-slate-500">{timeAgo(new Date(member.createdAt))}</p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className="py-4 text-sm text-slate-400">No recent member sign-ups.</p>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 border-b pb-2 font-semibold text-slate-600">Recent Donations</h3>
                <ul className="space-y-4">
                  {dashboardData?.recentDonations?.length > 0 ? (
                    dashboardData.recentDonations.map((donation) => (
                      <li key={donation._id} className="flex items-center gap-3 text-sm">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600"><FaDonate /></div>
                        <div>
                          <p className="font-semibold text-slate-800">{donation.fullName || 'Anonymous'}</p>
                          <p className="text-xs text-slate-500">{timeAgo(new Date(donation.createdAt))}</p>
                        </div>
                        <p className="ml-auto font-bold text-green-700">₹{Number(donation.donationAmount).toLocaleString('en-IN')}</p>
                      </li>
                    ))
                  ) : (
                    <p className="py-4 text-sm text-slate-400">No recent completed donations.</p>
                  )}
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </section>
  );
};

export default Dashboard;
