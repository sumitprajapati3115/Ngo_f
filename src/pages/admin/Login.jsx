// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import logoSrc from '../../assets/images/logo.png';
// import { apiRequest } from './api';

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const data = await apiRequest('/api/admin/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       // Assuming the backend returns a token on successful login
//       localStorage.setItem('token', data.token);
//       navigate('/admin/dashboard');

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 px-4">
//       <motion.div
//         className="w-full max-w-md"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="mb-8 text-center">
//           <Link to="/" className="inline-block">
//             <img src={logoSrc} alt="Shri Ram Youth Foundation Logo" className="mx-auto h-24 w-auto" />
//           </Link>
//         </div>
//         <div className="rounded-2xl bg-white p-8 shadow-2xl">
//           <h1 className="text-center text-3xl font-bold text-slate-800">Admin Login</h1>
//           <p className="mt-2 text-center text-slate-600">Sign in to access the admin dashboard.</p>

//           <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
//               <input
//                 id="email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="mt-1 block w-full rounded-lg border-slate-300 px-4 py-3 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
//               <input
//                 id="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 block w-full rounded-lg border-slate-300 px-4 py-3 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//               />
//             </div>
//             {error && <p className="text-center text-sm text-red-600">{error}</p>}
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] py-3 px-4 font-semibold text-white shadow-lg transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
//             >
//               {loading && (
//                 <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//               )}
//               {loading ? 'Signing in...' : 'Sign In'}
//             </button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoSrc from '../../assets/images/logo.png';
import { apiRequest } from './api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await apiRequest('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Assuming the backend returns a token on successful login
      localStorage.setItem('token', data.token);
      navigate('/admin/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center">
          <Link to="/" className="inline-block">
            <img src={logoSrc} alt="Shri Ram Youth Foundation Logo" className="mx-auto h-24 w-auto" />
          </Link>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          <h1 className="text-center text-3xl font-bold text-slate-800">Admin Login</h1>
          <p className="mt-2 text-center text-slate-600">Sign in to access the admin dashboard.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border-slate-300 px-4 py-3 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border-slate-300 px-4 py-3 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            {error && <p className="text-center text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] py-3 px-4 font-semibold text-white shadow-lg transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading && (
                <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
