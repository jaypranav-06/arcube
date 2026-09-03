import React from 'react';
import { ShieldCheck, MapPin, Compass } from 'lucide-react';

export default function StudioIntro({ onOpenConsultation }) {
  return (
    <section id="studio" className="py-7 sm:py-20 bg-[#141e1a] border-b border-[#D0AE89]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        
        {/* Eyebrow & Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-6 border-b border-[#D0AE89]/15 gap-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#D0AE89] animate-pulse"></span>
            <span className="text-xs tracking-[0.15em] uppercase text-[#D0AE89] font-medium font-sans">
              What we do
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-[#cfc8bc]/85">
            <span className="px-3 py-1 rounded-sm bg-[#192420] border border-[#D0AE89]/30 text-[#F5F0E8] font-sans font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D0AE89]" />
              Custom interiors
            </span>
          </div>
        </div>

        {/* Philosophy Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 pt-4 sm:pt-10 items-baseline">
          <div className="lg:col-span-8">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-[#F5F0E8] leading-[1.2] font-display tracking-tight mb-3 sm:mb-5">
              Calm, modern interiors built to stay cool.
            </h2>
            <p className="text-sm sm:text-base text-[#cfc8bc] font-normal leading-relaxed max-w-2xl font-sans">
              Arcube is an interior design studio based in Colombo 06. We help you turn bare spaces into beautiful, functional homes designed for everyday living, comfort, and lasting quality.
            </p>
          </div>

          <div className="lg:col-span-4 space-y-3 sm:space-y-4 pt-1 lg:pt-0">
            <div className="p-4 sm:p-5 rounded-sm bg-[#192420]/80 border border-[#D0AE89]/20">
              <span className="text-xs uppercase tracking-wider text-[#D0AE89] block mb-1 font-medium font-sans">
                Where we work
              </span>
              <p className="text-xs sm:text-sm text-[#F5F0E8] font-sans leading-relaxed mb-3">
                Apartments, family homes, and holiday villas across Sri Lanka.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#cfc8bc]/70 font-sans">
                <MapPin className="w-3.5 h-3.5 text-[#D0AE89] flex-shrink-0" />
                <span>16 Harmers Avenue, Colombo 06</span>
              </div>
            </div>

            <div>
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-sm bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-xs font-medium tracking-[0.08em] transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] font-sans"
              >
                <span>Book a consultation</span>
                <Compass className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
