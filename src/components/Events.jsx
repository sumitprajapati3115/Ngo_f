import React from 'react';

const events = [
  { title: 'Free Health Camp', date: '12 Aug 2026', location: 'Kanpur', status: 'Upcoming', description: 'Free checkups and medicines for families.' },
  { title: 'Blood Donation Drive', date: '20 Sept 2026', location: 'Lucknow', status: 'Upcoming', description: 'Voluntary blood collection for hospitals.' },
  { title: 'Winter Relief Distribution', date: 'Completed', location: 'Prayagraj', status: 'Completed', description: 'Warm blankets and essentials distributed.' },
];

export default function Events() {
  return (
    <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#F97316]">Events</p>
          <h2 className="mt-3 text-3xl font-bold text-[#0B2F78] sm:text-4xl">Upcoming & completed events that inspire action.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event.title} className="rounded-[2rem] border border-[#E5E7EB] bg-[#FFF9F2] p-6 shadow-[0_25px_50px_rgba(11,45,109,0.08)] transition hover:-translate-y-1 hover:shadow-2xl">
              <p className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${event.status === 'Upcoming' ? 'bg-[#F97316]/10 text-[#EA580C]' : 'bg-[#D1FAE5] text-[#065F46]'}`}>{event.status}</p>
              <h3 className="mt-4 text-2xl font-semibold text-[#0B2F78]">{event.title}</h3>
              <p className="mt-2 text-sm text-[#475569]">{event.location} • {event.date}</p>
              <p className="mt-4 text-sm leading-7 text-[#475569]">{event.description}</p>
              <a href="#contact" className="mt-6 inline-flex rounded-full bg-[linear-gradient(90deg,_#F97316,_#EA580C)] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-1">Register</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

