import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt, FaUsers, FaCertificate, FaDonate, FaCalendarAlt, FaNewspaper,
  FaImages, FaGlobe, FaChartBar, FaUserShield, FaCog, FaCheckCircle,
  FaSignOutAlt, FaBars, FaTimes, FaEnvelope
} from 'react-icons/fa';
import logoSrc from '../../assets/images/logo.png';

const navItems = [
  { to: '/admin/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
  { to: '/admin/members', icon: <FaUsers />, label: 'Members' },
  { to: '/admin/certificates', icon: <FaCertificate />, label: 'Certificates' },
  { to: '/admin/donations', icon: <FaDonate />, label: 'Donations' },
  { to: '/admin/events', icon: <FaCalendarAlt />, label: 'Events' },
  { to: '/admin/news', icon: <FaNewspaper />, label: 'News & Notices' },
  { to: '/admin/gallery', icon: <FaImages />, label: 'Gallery' },
  { to: '/admin/contacts', icon: <FaEnvelope />, label: 'Contacts' },
  { to: '/', icon: <FaGlobe />, label: 'Website', external: true },
  { to: '/admin/reports', icon: <FaChartBar />, label: 'Reports' },
  { to: '/admin/users', icon: <FaUserShield />, label: 'Admin Users' },
  { to: '/admin/settings', icon: <FaCog />, label: 'Settings' },
  { to: '/admin/verification', icon: <FaCheckCircle />, label: 'Verification' },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="font-sans text-slate-900 bg-slate-50">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-full bg-slate-800 p-3 text-white shadow-lg lg:hidden"
        aria-label="Open sidebar"
      >
        <FaBars />
      </button>

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 transform flex-col bg-slate-900 text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="Logo" className="h-11 w-auto" />
            <div>
              <p className="text-sm font-semibold">NGO Admin</p>
              <p className="text-xs text-slate-400">Control Panel</p>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="rounded-full p-2 text-slate-300 hover:bg-slate-800 lg:hidden" aria-label="Close sidebar">
            <FaTimes />
          </button>
        </div>

        <nav className="flex-1 mt-6 space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-orange-500/15 text-orange-400 shadow-inner'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-left font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <main className="min-h-screen p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
