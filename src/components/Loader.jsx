import React from 'react';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/90 backdrop-blur-lg">
      <div className="flex items-center gap-3 text-[#0B3C91]">
        <div className="h-4 w-4 animate-bounce rounded-full bg-[#FF6B00]" />
        <div className="h-4 w-4 animate-bounce rounded-full bg-[#0B3C91] [animation-delay:0.15s]" />
        <div className="h-4 w-4 animate-bounce rounded-full bg-[#FF6B00] [animation-delay:0.3s]" />
      </div>
    </div>
  );
}

