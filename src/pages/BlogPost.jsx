import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO.jsx';
import { useLanguage } from '../components/LanguageContext.jsx';
import { translations } from '../components/translations.js';

// Dummy static data for images, as content will come from translations
const postImages = {
  'launch-of-new-education-program': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80',
  'successful-blood-donation-camp': 'https://images.unsplash.com/photo-1615461038855-298d35459357?w=1200&q=80',
  'tree-plantation-drive-for-a-greener-tomorrow': 'https://images.unsplash.com/photo-1605299801352-92b3a7352431?w=1200&q=80',
};

const BlogPost = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const t = translations[language];

  const post = t.blog_posts.find(p => p.slug === slug);
  const image = postImages[slug];

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">{t.blog_page.post_not_found}</h1>
        <Link to="/blog" className="text-orange-500 hover:underline mt-4 inline-block">{t.blog_page.back_to_blog}</Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={image}
      />
      <div className="bg-white">
        <div className="relative h-96">
          <img src={image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-white max-w-4xl mx-auto w-full">
            <motion.h1
              className="text-4xl font-extrabold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {post.title}
            </motion.h1>
            <motion.p
              className="mt-2 text-lg text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {post.date} • by {post.author}
            </motion.p>
          </div>
        </div>

        <div className="py-20 px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg mx-auto max-w-3xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </>
  );
};

export default BlogPost;