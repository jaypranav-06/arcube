import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Services({ onOpenConsultation }) {
  const services = [
    {
      number: '01',
      title: 'Full Home Interiors',
      description: 'End-to-end space planning, 3D concepts, and on-site supervision until move-in day.'
    },
    {
      number: '02',
      title: 'Custom Joinery & Furniture',
      description: 'Bespoke wardrobes, modern kitchens, and dining tables built to measure in solid Ceylon teak.'
    },
    {
      number: '03',
      title: 'Lighting & Comfort',
      description: 'Warm architectural lighting layers, automated dimmer scenes, and quiet acoustic finishes.'
    },
    {
      number: '04',
      title: 'Villa & Home Renovations',
      description: 'Open-plan layout updates, tropical cross-ventilation, and turnkey contractor management.'
    }
  ];

  return (
    <section id="services" className="py-14 sm:py-20 lg:py-24 bg-[#192420] relative border-t border-[#D0AE89]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        
        {/* Header — Short & Crisp */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 sm:pb-8 border-b border-[#D0AE89]/15 mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-xs font-sans font-medium text-[#D0AE89] tracking-[0.2em] uppercase block mb-2">
              What we offer
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#F5F0E8] font-display tracking-tight">
              Our <span className="font-extralight text-[#D0AE89]">services</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#cfc8bc] font-sans font-light max-w-sm leading-relaxed">
            Four focused architectural disciplines tailored to modern residences in Sri Lanka.
          </p>
        </div>

        {/* 4 Crisp & Readable Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((srv) => (
            <div
              key={srv.number}
              onClick={onOpenConsultation}
              className="group relative bg-[#141e1a] rounded-sm border border-[#D0AE89]/20 hover:border-[#D0AE89]/60 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
            >
              <div>
                {/* Number & Top Arrow */}
                <div className="flex items-center justify-between pb-4 border-b border-[#D0AE89]/10 mb-4">
                  <span className="text-xl font-display font-light text-[#D0AE89]">
                    {srv.number}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#192420] border border-[#D0AE89]/20 flex items-center justify-center text-[#D0AE89] group-hover:text-[#F5F0E8] group-hover:border-[#D0AE89] transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-lg sm:text-xl text-[#F5F0E8] font-display font-light tracking-wide mb-2 group-hover:text-[#D0AE89] transition-colors">
                  {srv.title}
                </h3>

                {/* Short 1-Line Description */}
                <p className="text-xs sm:text-sm text-[#cfc8bc] font-sans font-light leading-relaxed">
                  {srv.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
