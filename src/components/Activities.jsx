import React from 'react';

const activities = [
  { title: 'Food Distribution', image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80' },
  { title: 'Medical Camps', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80' },
  { title: 'Blood Donation Drive', image: 'https://images.unsplash.com/photo-1581480624397-9f386d4eb8ba?auto=format&fit=crop&w=900&q=80' },
  { title: 'Tree Plantation', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80' },
  { title: 'Education Programs', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80' },
  { title: 'Social Campaigns', image: 'https://images.unsplash.com/photo-1573164574394-14a139430d9d?auto=format&fit=crop&w=900&q=80' },
];

export default function Activities() {
  return (
    <section id="activities" className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#F97316]">Our Activities</p>
          <h2 className="mt-3 text-3xl font-bold text-[#0B2F78] sm:text-4xl">Real service in action across communities.</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {activities.map((item) => (
            <div key={item.title} className="group overflow-hidden rounded-[2rem] border border-[#E5E7EB] shadow-[0_20px_50px_rgba(11,45,109,0.08)] transition hover:-translate-y-2 hover:shadow-2xl">
              <img src={item.image} alt={item.title} className="h-72 w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="bg-white p-6">
                <h3 className="text-xl font-semibold text-[#0B2F78]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#1F2937]">{item.title} के माध्यम से हम जीवन को बेहतर बना रहे हैं।</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

