import React from 'react';
import { Layers, Feather, Sun, VolumeX, ShieldCheck, Compass } from 'lucide-react';

export default function FeaturesGrid() {
  const features = [
    {
      index: '01',
      icon: Layers,
      title: 'Real, Honest Materials',
      description: 'No imitation surfaces. We work only with real stone, reclaimed Ceylon teak, and hand-finished cut-cement plaster that looks better as it ages.'
    },
    {
      index: '02',
      icon: Compass,
      title: 'Built for the Tropics',
      description: 'Deep roof eaves, courtyard reflection pools, and cross-ventilation designed to keep spaces naturally cool in Sri Lanka\'s climate.'
    },
    {
      index: '03',
      icon: VolumeX,
      title: 'Quiet Interiors',
      description: 'Sound-dampening materials placed behind timber wall paneling to keep out traffic noise, rain on the roof, and coastal winds.'
    },
    {
      index: '04',
      icon: Sun,
      title: 'Thoughtful Natural Light',
      description: 'Windows and skylights placed to bring in soft daylight without harsh glare, transitioning into warm, gentle cove lighting at night.'
    },
    {
      index: '05',
      icon: ShieldCheck,
      title: 'Complete Project Management',
      description: 'We take bare concrete spaces and turn them into fully finished homes, with a dedicated carpenter and stone craftsman on every project.'
    },
    {
      index: '06',
      icon: Feather,
      title: 'Local Craftsmanship',
      description: 'Handcrafted furniture, woven cane seating, and local stonework that reflect Sri Lanka\'s design traditions.'
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-24 lg:py-28 bg-[#141e1a] relative border-t border-b border-[#D0AE89]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-16 pb-5 sm:pb-6 border-b border-[#D0AE89]/15">
          <div>
            <span className="text-[10px] font-mono text-[#D0AE89] tracking-[0.3em] uppercase block mb-1.5 sm:mb-2">
              Our Approach
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-[#F5F0E8] tracking-wide">
              Design <span className="font-extralight text-[#D0AE89] tracking-wider">Principles</span>
            </h2>
          </div>
          <p className="text-xs font-light text-[#cfc8bc]/70 tracking-wider mt-2.5 sm:mt-0 uppercase">
            Six Core Principles
          </p>
        </div>

        {/* Features Grid: Minimalist responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.index}
                className="p-6 sm:p-8 rounded-sm bg-[#192420]/80 border border-[#D0AE89]/15 hover:border-[#D0AE89]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <span className="font-mono text-xs text-[#D0AE89] tracking-widest">
                      // {feat.index}
                    </span>
                    <div className="p-2 rounded-sm bg-[#141e1a] border border-[#D0AE89]/20 text-[#D0AE89] group-hover:bg-[#D0AE89] group-hover:text-[#192420] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl text-[#F5F0E8] font-light tracking-wide mb-2.5 group-hover:text-[#D0AE89] transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#F5F0E8]/85 font-normal leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#D0AE89]/10 flex items-center gap-1.5">
                  <span className="w-1.5 h-px bg-[#D0AE89]"></span>
                  <span className="text-[10px] font-mono text-[#cfc8bc]/60 uppercase tracking-widest">
                    Arcube Standard
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
