import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext.jsx';
import { translations } from './translations.js';

// Dummy static data for images, as content will come from translations
const postImages = [
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
  'https://images.unsplash.com/photo-1615461038855-298d35459357?w=800&q=80',
  'https://images.unsplash.com/photo-1605299801352-92b3a7352431?w=800&q=80',
];

const NewsCard = ({ post, index, t }) => (
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
        <h3 className="mt-2 text-xl font-bold text-[#0B2F78] group-hover:text-[#F97316] transition-colors truncate">{post.title}</h3>
        <p className="mt-3 text-base leading-7 text-gray-600 h-14 overflow-hidden">{post.excerpt}</p>
        <div className="mt-4 font-semibold text-[#EA580C] group-hover:underline">
          {t.blog_page.read_more}
        </div>
      </div>
    </Link>
  </motion.div>
);

export default function LatestNews() {
  const { language } = useLanguage();
  const t = translations[language];
  // Take only the first 3 posts for the homepage
  const latestPosts = t.blog_posts.slice(0, 3);

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F97316]">{t.latest_news.section_title}</p>
          <h2 className="mt-3 text-3xl font-bold text-[#0B2F78] sm:text-4xl">{t.latest_news.title}</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {latestPosts.map((post, index) => (
            <NewsCard key={post.slug} post={post} index={index} t={t} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/blog" className="inline-block rounded-full bg-gradient-to-r from-[#0B2F78] to-[#132B6B] px-8 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105">
            {t.latest_news.view_all}
          </Link>
        </div>
      </div>
    </section>
  );
}