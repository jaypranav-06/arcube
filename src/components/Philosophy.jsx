import React from 'react';

export default function Philosophy() {
  const pillars = [
    {
      number: '01',
      title: 'The Void',
      line: 'Negative space sculpted over ornament. Allowing sea breeze and silence to circulate.'
    },
    {
      number: '02',
      title: 'Honest Material',
      line: 'Raw cut-cement, aged Ceylon teak, and unpolished stone that age with grace.'
    },
    {
      number: '03',
      title: 'Filtered Light',
      line: 'Deep timber eaves and frangipani leaves transforming equatorial glare into calm.'
    },
    {
      number: '04',
      title: 'Stillness',
      line: 'Acoustic calm and private water courtyards shielded from urban noise.'
    }
  ];

  return (
    <section id="philosophy" className="py-16 sm:py-24 bg-[#141e1a] border-t border-b border-[#D0AE89]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Monograph Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 pb-6 sm:pb-8 border-b border-[#D0AE89]/15">
          <div>
            <span className="text-[10px] font-mono text-[#D0AE89] tracking-[0.3em] uppercase block mb-1.5 sm:mb-2">
              The Creed
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-[#F5F0E8] tracking-wide">
              Quietude & <span className="font-extralight text-[#D0AE89] tracking-wider">Discipline</span>
            </h2>
          </div>
          <p className="text-[#cfc8bc]/80 text-xs sm:text-sm font-light mt-3 md:mt-0 max-w-sm leading-relaxed">
            Rooted in Sri Lankan tropical modernism and honest craftsmanship.
          </p>
        </div>

        {/* 4 Clean Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.number} className="border-t border-[#D0AE89]/15 pt-4 sm:pt-5">
              <span className="font-mono text-[11px] text-[#D0AE89] block mb-1.5 sm:mb-2">
                // {pillar.number}
              </span>
              <h3 className="text-base sm:text-lg text-[#F5F0E8] mb-1 font-light tracking-wide">
                {pillar.title}
              </h3>
              <p className="text-xs text-[#cfc8bc]/85 font-normal leading-relaxed">
                {pillar.line}
              </p>
            </div>
          ))}
        </div>

        {/* Minimalist Quote */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[#D0AE89]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <blockquote className="text-base sm:text-xl text-[#F5F0E8] font-light tracking-wide italic">
            “Architecture as a silent instrument of breeze, stone, and shadow.”
          </blockquote>
          <div className="text-[10px] sm:text-[11px] font-mono text-[#D0AE89]/80 uppercase tracking-widest">
            Arcube Atelier • Colombo 07
          </div>
        </div>
      </div>
    </section>
  );
}
