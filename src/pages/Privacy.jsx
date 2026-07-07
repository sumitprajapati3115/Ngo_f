import React from 'react';
import SEO from '../components/SEO.jsx';

const Privacy = () => {
  return (
    <>
      <SEO 
        title="Privacy Policy"
        description="Read the privacy policy of Shri Ram Youth Foundation. We are committed to protecting your personal information and being transparent about what we do." 
      />
    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0B2F78] sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-xl text-[#1F2937]">
            Your privacy is important to us.
          </p>
        </div>
        <div className="mt-12 prose prose-lg text-gray-700 mx-auto">
          <p>
            Shri Ram Youth Foundation ("us", "we", or "our") operates the website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </p>
          <h2>Information Collection and Use</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our Service to you. This includes information you provide when you sign up for membership, donate, or contact us.
          </p>
          <h2>Types of Data Collected</h2>
          <p>
            <strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to: Name, Email address, Phone number, Address.
          </p>
          <h2>Use of Data</h2>
          <p>
            Shri Ram Youth Foundation uses the collected data for various purposes:
          </p>
          <ul>
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
            <li>To provide member support</li>
            <li>To gather analysis or valuable information so that we can improve our Service</li>
            <li>To monitor the usage of our Service</li>
          </ul>
          <h2>Security of Data</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Privacy;