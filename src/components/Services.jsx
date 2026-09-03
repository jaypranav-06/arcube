import React from 'react';
import { ArrowUpRight, Compass } from 'lucide-react';

export default function Services({ onOpenConsultation }) {
  const services = [
    {
      number: '01',
      title: 'Full home interior design',
      description: 'We plan your room layout, furniture, and lighting so your home feels open, tidy, and comfortable for daily family life.',
      deliverable: '3D room previews, floor plans, and lighting layouts.'
    },
    {
      number: '02',
      title: 'Custom teak furniture & cabinets',
      description: 'Built-in wardrobes, modern kitchens, dining tables, and TV consoles made from real Ceylon teak wood and quality hardware.',
      deliverable: 'Made-to-measure furniture built by master carpenters.'
    },
    {
      number: '03',
      title: 'Lighting & room comfort',
      description: 'Soft, warm lighting and quiet room finishes that make your home peaceful, cozy, and relaxing in the evenings.',
      deliverable: 'Warm lighting plan, dimmer setups, and soft furnishings.'
    },
    {
      number: '04',
      title: 'Home renovations & villa makeovers',
      description: 'Refreshing older houses, apartments, and holiday villas with cool cement floors, fresh paint, and modern fittings.',
      deliverable: 'Full renovation with daily site supervision.'
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-20 lg:py-24 bg-[#141e1a] relative border-t border-[#D0AE89]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-8 sm:mb-14 pb-6 sm:pb-10 border-b border-[#D0AE89]/15">
          <div className="lg:col-span-5">
            <span className="text-xs font-medium text-[#D0AE89] tracking-[0.15em] uppercase block mb-1.5 font-sans">
              What we offer
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-[#F5F0E8] font-display tracking-tight leading-[1.18]">
              Interior <br />
              <span className="font-extralight text-[#D0AE89]">services</span>
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-end">
            <p className="text-sm sm:text-base text-[#cfc8bc] font-sans leading-relaxed mb-3">
              We handle everything from empty rooms to the day you move in. You work directly with our lead designer and our trusted team of carpenters and painters.
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-sans text-[#cfc8bc]/70">
              <span className="flex items-center gap-1.5 text-[#D0AE89]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D0AE89]"></span>
                Colombo 06 Studio
              </span>
              <span>•</span>
              <span>Colombo Homes & Apartments</span>
              <span>•</span>
              <span>Southern Villas</span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8">
          {services.map((srv) => (
            <div
              key={srv.number}
              className="p-5 sm:p-7 rounded-sm bg-[#192420]/80 border border-[#D0AE89]/15 hover:border-[#D0AE89]/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-5">
                  <span className="text-xs font-display text-[#D0AE89] tracking-wider">
                    // {srv.number}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#cfc8bc]/40 group-hover:text-[#D0AE89] transition-colors" />
                </div>

                <h3 className="text-lg sm:text-xl lg:text-2xl text-[#F5F0E8] font-display font-light tracking-wide mb-2 group-hover:text-[#D0AE89] transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#cfc8bc] font-sans leading-relaxed mb-4">
                  {srv.description}
                </p>
              </div>

              <div className="pt-3.5 border-t border-[#D0AE89]/10">
                <span className="text-xs font-sans text-[#D0AE89]/90 block">
                  <span className="text-[#cfc8bc]/50 mr-1.5">What you get:</span>
                  {srv.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 sm:mt-12 pt-6 border-t border-[#D0AE89]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#cfc8bc]/80 font-sans text-center sm:text-left">
            Have a new home or renovation project in mind?
          </p>
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-sm bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-xs font-medium tracking-[0.08em] transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] font-sans"
          >
            <span>Book a consultation</span>
            <Compass className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
