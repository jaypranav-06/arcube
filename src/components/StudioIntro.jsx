import React from 'react';

export default function StudioIntro() {
  return (
    <section id="studio-intro" className="py-16 sm:py-24 lg:py-28 bg-[#141e1a] border-b border-[#D0AE89]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">

        <span className="text-sm font-medium text-[#D0AE89] tracking-[0.15em] uppercase block mb-10 sm:mb-14 pb-6 border-b border-[#D0AE89]/15 font-sans">
          About us
        </span>

        <div className="max-w-2xl">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#F5F0E8] font-display tracking-[-0.01em] mb-8"
            style={{ lineHeight: '1.45' }}
          >
            We design homes that feel good to live in.
          </h2>
          <p className="text-lg sm:text-xl text-[#cfc8bc] font-normal leading-relaxed font-sans">
            Arcube is an interior design studio in Colombo. We work on homes, apartments, and villas — handling everything from layouts and materials to furniture and lighting.
          </p>
        </div>

      </div>
    </section>
  );
}
