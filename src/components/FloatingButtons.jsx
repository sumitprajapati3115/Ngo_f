import React from 'react';

const buttons = [
  { label: 'WhatsApp', icon: '💬', href: 'https://wa.me/919876543210' },
  { label: 'Call', icon: '📞', href: 'tel:+919876543210' },
  { label: 'Donate', icon: '💛', href: '/donate' },
];

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      {buttons.map((button) => (
        <a key={button.label} href={button.href} className="rounded-full bg-[#0B3C91] px-4 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-105">
          {button.icon} {button.label}
        </a>
      ))}
    </div>
  );
}

