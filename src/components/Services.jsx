import React from 'react';

export default function Services({ onOpenConsultation }) {
  const services = [
    {
      title: 'Full home interior design',
      description: 'Complete room layouts, bespoke cabinetry drawings, lighting plans, and site supervision from concept through move-in day.'
    },
    {
      title: 'Custom furniture & cabinetry',
      description: 'Made-to-measure wardrobes, kitchen units, dining tables, and storage consoles built by master carpenters to fit your space.'
    },
    {
      title: 'Lighting & room comfort',
      description: 'Thoughtful lighting layouts, dimmer controls, and quiet acoustic wall and ceiling finishes to make living spaces peaceful and restful.'
    },
    {
      title: 'Renovations & villa makeovers',
      description: 'Structural and interior updates for older houses, apartments, and holiday homes, managed on-site from demolition to final paint.'
    }
  ];

  return (
    <section id="services" className="bg-[#15201B] py-20 sm:py-28 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="max-w-[760px]">

          {/* Section Header */}
          <div className="mb-12 sm:mb-16 animate-fade-in">
<h2 className="text-4xl sm:text-5xl lg:text-[64px] font-serif font-normal text-[#EDE8E0] leading-[1.18]">
              Our services
            </h2>
          </div>

          {/* Plain Stacked List */}
          <div className="border-b border-[#2A362F]">
            {services.map((service) => (
              <div
                key={service.title}
                className="border-t border-[#2A362F] py-10 sm:py-12 lg:py-14"
              >
                <h3 className="text-2xl sm:text-3xl font-serif text-[#EDE8E0] font-normal leading-snug hover:text-[#EDE8E0]/90 transition-colors">
                  {service.title}
                </h3>
                <p className="text-base sm:text-lg text-[#9CA69E] font-sans font-normal leading-relaxed mt-3 sm:mt-4">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Reassurance & CTA (inline on desktop, stacked on mobile) */}
          <div className="pt-10 sm:pt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="text-sm sm:text-base text-[#EDE8E0] font-sans font-normal leading-relaxed">
              Not sure where to start? We'll walk you through it.
            </p>
            <button
              onClick={onOpenConsultation}
              className="self-start sm:self-auto px-6 py-3.5 rounded-sm bg-[#B08D5B] hover:bg-[#9c7b4d] text-[#15201B] text-sm font-sans font-medium transition-colors whitespace-nowrap active:scale-[0.99]"
            >
              Book a consultation
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
