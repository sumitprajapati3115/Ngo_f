import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO.jsx';
import { useLanguage } from '../components/LanguageContext.jsx';
import { translations } from '../components/translations.js';

// Dummy static data for images, as content will come from translations
const postImages = [
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
  'https://images.unsplash.com/photo-1615461038855-298d35459357?w=800&q=80',
  'https://images.unsplash.com/photo-1605299801352-92b3a7352431?w=800&q=80',
];

const BlogCard = ({ post, index, t }) => (
  <motion.div
    className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Link to={`/blog/${post.slug}`} className="block">
      <div className="overflow-hidden h-56">
        <img src={postImages[index]} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="p-6">
        <p className="text-sm font-medium text-gray-500">{post.date} • by {post.author}</p>
        <h3 className="mt-2 text-xl font-bold text-[#0B2F78] group-hover:text-[#F97316] transition-colors">{post.title}</h3>
        <p className="mt-3 text-base leading-7 text-gray-600">{post.excerpt}</p>
        <div className="mt-4 font-semibold text-[#EA580C] group-hover:underline">
          {t.blog_page.read_more}
        </div>
      </div>
    </Link>
  </motion.div>
);

const Blog = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      <SEO
        title="Blog & News"
        description="Stay updated with the latest news, stories, and activities from Shri Ram Youth Foundation."
        keywords="NGO blog, foundation news, social service stories, community updates"
      />
      {/* Page Header */}
      <motion.div
        className="relative py-24 text-white text-center overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B2F78]/80 to-[#132B6B]/70" />
        <motion.h1
          className="relative text-4xl font-extrabold sm:text-5xl z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.blog_page.title}
        </motion.h1>
        <motion.p
          className="relative mt-4 max-w-2xl mx-auto text-xl text-blue-200 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t.blog_page.description}
        </motion.p>
      </motion.div>

      <div className="bg-[#FFF9F2] py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {t.blog_posts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} t={t} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;