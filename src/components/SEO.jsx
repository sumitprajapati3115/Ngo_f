import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, author, image, url }) => {
  const siteName = "Shri Ram Youth Foundation";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = "Shri Ram Youth Foundation is a social organization dedicated to humanity, youth empowerment, education, healthcare, and nation building.";
  const defaultKeywords = "Shri Ram Youth Foundation, NGO, social service, youth empowerment, humanity, education, healthcare, Kanpur";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={`${defaultKeywords}, ${keywords || ''}`} />
      <meta name="author" content={author || siteName} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || window.location.href} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || "/logo.png"} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url || window.location.href} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={image || "/logo.png"} />
    </Helmet>
  );
};

export default SEO;