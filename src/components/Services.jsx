import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GeometricDivider } from './GeometricAccents';

export default function Services({ onOpenConsultation }) {
  const services = [
    {
      number: '01',
      title: 'Interior Architecture & Spatial Planning',
      description: 'We plan private homes and high-rise penthouses around open light, natural cross-ventilation, and functional layouts tailored to your lifestyle.',
      deliverable: 'Floor plans, 3D visualizations, and municipal council submissions.'
    },
    {
      number: '02',
      title: 'Bespoke Joinery & Real Materials',
      description: 'Custom cabinetry, doors, and furniture made from genuine Ceylon teak, Kumbuk timber, and hand-finished cut-cement mineral plaster.',
      deliverable: 'Single-source stone sourcing, master carpentry, and solid brass fittings.'
    },
    {
      number: '03',
      title: 'Circadian Lighting & Acoustic Comfort',
      description: 'Balancing bright daytime sunlight with deep eaves, and transitioning to warm, subtle lighting at night with acoustic sound dampening.',
      deliverable: 'Lighting plans, smart home controls, and quiet room acoustic insulation.'
    },
    {
      number: '04',
      title: 'Coastal & Heritage Conservation',
      description: 'Renovating historic buildings in Galle Fort and beachside villas along the southern coast, built to withstand tropical monsoons and sea air.',
      deliverable: 'Salt-resistant materials, traditional roof tile restoration, and weatherproofing.'
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-24 lg:py-28 bg-[#192420] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section Header: About & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 sm:mb-20 pb-8 sm:pb-12 border-b border-[#D0AE89]/15">
          <div className="lg:col-span-5">
            <span className="text-[10px] font-mono text-[#D0AE89] tracking-[0.3em] uppercase block mb-2 sm:mb-3">
              About Us
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-[#F5F0E8] tracking-wide leading-[1.15]">
              Design That <br />
              <span className="font-extralight text-[#D0AE89] tracking-wider">Works With Nature</span>
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-end">
            <p className="text-sm sm:text-base text-[#F5F0E8]/85 font-normal leading-relaxed mb-5 sm:mb-6">
              Arcube is a design studio based in Colombo 07. We work with real materials — stone, reclaimed teak, and natural cement — chosen to suit Sri Lanka’s tropical climate and age well over time.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-6 text-xs font-mono text-[#cfc8bc]/70">
              <span className="flex items-center gap-2 text-[#D0AE89]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D0AE89]"></span>
                Colombo 07 • Barnes Place
              </span>
              <span className="flex items-center gap-2">
                <span className="hidden sm:inline text-[#D0AE89]/30">•</span>
                Galle Fort • Church Street
              </span>
              <span className="flex items-center gap-2">
                <span className="hidden sm:inline text-[#D0AE89]/30">•</span>
                London • Berkeley Square
              </span>
            </div>
          </div>
        </div>

        {/* Services Grid with thin-weight typography and gold accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {services.map((srv) => (
            <div
              key={srv.number}
              className="p-6 sm:p-8 rounded-sm bg-[#141e1a]/60 border border-[#D0AE89]/15 hover:border-[#D0AE89]/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <span className="font-mono text-xs text-[#D0AE89] tracking-widest">
                    // {srv.number}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#cfc8bc]/40 group-hover:text-[#D0AE89] transition-colors" />
                </div>

                <h3 className="text-lg sm:text-xl lg:text-2xl text-[#F5F0E8] font-light tracking-wide mb-2.5 group-hover:text-[#D0AE89] transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#F5F0E8]/85 font-normal leading-relaxed mb-5">
                  {srv.description}
                </p>
              </div>

              <div className="pt-3.5 border-t border-[#D0AE89]/10">
                <span className="text-[11px] font-mono text-[#cfc8bc]/70 block">
                  Deliverable: {srv.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle geometric line divider */}
        <GeometricDivider className="mt-14 sm:mt-20" />
      </div>
    </section>
  );
}
