import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from '../App.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Loader from '../components/Loader.jsx';

const Home = React.lazy(() => import('../pages/Home.jsx'));
const About = React.lazy(() => import('../pages/About.jsx'));
const Membership = React.lazy(() => import('../pages/Membership.jsx'));
const Donate = React.lazy(() => import('../pages/Donate.jsx'));
const Gallery = React.lazy(() => import('../pages/Gallery.jsx'));
const Events = React.lazy(() => import('../pages/Events.jsx'));
const Team = React.lazy(() => import('../pages/Team.jsx'));
const Contact = React.lazy(() => import('../pages/Contact.jsx'));
const Privacy = React.lazy(() => import('../pages/Privacy.jsx'));
const Terms = React.lazy(() => import('../pages/Terms.jsx'));
const ActivitiesPage = React.lazy(() => import('../pages/Activities.jsx'));

// Admin Pages
const AdminLayout = React.lazy(() => import('../pages/admin/AdminLayout.jsx'));
const AdminDashboard = React.lazy(() => import('../pages/admin/Dashboard.jsx'));
const AdminMembers = React.lazy(() => import('../pages/admin/Members.jsx'));
const MemberProfile = React.lazy(() => import('../pages/admin/MemberProfile.jsx'));
const EditMember = React.lazy(() => import('../pages/admin/EditMember.jsx'));
const AdminDonations = React.lazy(() => import('../pages/admin/Donations.jsx'));
const AdminLogin = React.lazy(() => import('../pages/admin/Login.jsx'));
const AdminCertificates = React.lazy(() => import('../pages/admin/Certificates.jsx'));
const DonationDetails = React.lazy(() => import('../pages/admin/DonationDetails.jsx'));
const Contacts = React.lazy(() => import('../pages/admin/Contacts.jsx'));
const ContactDetails = React.lazy(() => import('../pages/admin/ContactDetails.jsx'));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="membership" element={<Membership />} />
            <Route path="donate" element={<Donate />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="activities" element={<ActivitiesPage />} />
            <Route path="events" element={<Events />} />
            <Route path="team" element={<Team />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
          </Route>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="members/:id" element={<MemberProfile />} />
            <Route path="members/edit/:id" element={<EditMember />} />
            <Route path="donations" element={<AdminDonations />} />
            <Route path="donations/:id" element={<DonationDetails />} />
            <Route path="certificates" element={<AdminCertificates />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="contacts/:id" element={<ContactDetails />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;