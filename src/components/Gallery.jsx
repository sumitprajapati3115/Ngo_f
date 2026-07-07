import React, { useState, useEffect } from 'react';

const galleryItems = [
  { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80', title: 'Community Service', category: 'Food' },
  { src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80', title: 'Medical Camp', category: 'Medical' },
  { src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=80', title: 'Relief Drive', category: 'Relief' },
  { src: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80', title: 'Tree Plantation', category: 'Environment' },
  { src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1400&q=80', title: 'Education Programs', category: 'Education' },
  { src: 'https://images.unsplash.com/photo-1573164574394-14a139430d9d?auto=format&fit=crop&w=1400&q=80', title: 'Social Campaign', category: 'Awareness' },
];

const categories = ['All', 'Food', 'Medical', 'Relief', 'Environment', 'Education', 'Awareness'];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [visible, setVisible] = useState(galleryItems);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    setVisible(filter === 'All' ? galleryItems : galleryItems.filter((g) => g.category === filter));
  }, [filter]);

  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIndex === -1) return;
      if (e.key === 'Escape') setLightboxIndex(-1);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => Math.min(i + 1, visible.length - 1));
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, visible.length]);

  return (
    <section id="gallery" className="bg-[#FFF9F2] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#F97316]">Gallery</p>
          <h2 className="mt-3 text-3xl font-bold text-[#0B2F78] sm:text-4xl">Moments of courage, kindness, and collective purpose.</h2>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${filter === cat ? 'bg-[#F97316] text-white shadow-lg' : 'bg-white border border-[#E5E7EB] text-[#0B2F78]'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, idx) => (
            <button
              key={item.title + idx}
              onClick={() => setLightboxIndex(idx)}
              className="group overflow-hidden rounded-[1.5rem] shadow-lg focus:outline-none"
            >
              <img src={item.src} alt={item.title} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="p-4 text-left">
                <h3 className="text-lg font-semibold text-[#0B2F78]">{item.title}</h3>
                <p className="mt-1 text-sm text-[#475569]">{item.category}</p>
              </div>
            </button>
          ))}
        </div>

        {lightboxIndex > -1 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="relative max-w-4xl w-full">
              <button onClick={() => setLightboxIndex(-1)} className="absolute right-2 top-2 rounded-full bg-white/10 p-2 text-white">✕</button>
              <img src={visible[lightboxIndex].src} alt={visible[lightboxIndex].title} className="w-full rounded-lg object-contain" />
              <div className="mt-4 flex items-center justify-between text-white">
                <div>
                  <h3 className="text-xl font-bold">{visible[lightboxIndex].title}</h3>
                  <p className="text-sm text-white/80">{visible[lightboxIndex].category}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setLightboxIndex((i) => Math.max(i - 1, 0))} className="rounded-full bg-white/10 px-3 py-2">Prev</button>
                  <button onClick={() => setLightboxIndex((i) => Math.min(i + 1, visible.length - 1))} className="rounded-full bg-white/10 px-3 py-2">Next</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

