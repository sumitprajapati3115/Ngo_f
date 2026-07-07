import React from 'react';

export default function Contact() {
  return (
    <section className="section-shell px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FF6B00]">Contact</p>
          <h2 className="mt-3 text-3xl font-bold text-[#0B3C91] sm:text-4xl">Let’s build meaningful impact together.</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-[#0B3C91] to-[#154da8] p-7 text-white shadow-xl">
            <h3 className="text-2xl font-semibold">Reach out</h3>
            <p className="mt-4 text-white/80">Phone: +91 98765 43210</p>
            <p className="mt-2 text-white/80">Email: contact@shriramyouthfoundation.org</p>
            <p className="mt-2 text-white/80">Address: 12, Gandhi Nagar, Lucknow, India</p>
            <div className="mt-6 h-56 rounded-[1.25rem] overflow-hidden">
              <iframe title="Map" src="https://www.google.com/maps?q=Lucknow&output=embed" className="h-full w-full" loading="lazy" />
            </div>
          </div>
          <form className="space-y-4 rounded-[1.5rem] border border-slate-200 p-6 shadow-inner">
            <input className="w-full rounded-2xl border border-slate-200 p-3" placeholder="Your Name" />
            <input className="w-full rounded-2xl border border-slate-200 p-3" placeholder="Email Address" />
            <textarea className="min-h-32 w-full rounded-2xl border border-slate-200 p-3" placeholder="Your Message" />
            <button className="rounded-full bg-[#FF6B00] px-6 py-3 font-semibold text-white">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

