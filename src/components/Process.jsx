import React from 'react';
import { Compass, FileText, Hammer, KeyRound } from 'lucide-react';

export default function Process({ onOpenConsultation }) {
  const steps = [
    {
      number: '01',
      icon: Compass,
      title: 'First visit & measurements',
      description: 'We meet at your home, listen to what you need and your budget, and measure the space.',
      deliverable: 'Clear project plan and initial cost estimate.'
    },
    {
      number: '02',
      icon: FileText,
      title: '3D designs & samples',
      description: 'We create 3D views of your rooms. You can touch real teak wood, stone, and fabric samples.',
      deliverable: '3D pictures and real material samples.'
    },
    {
      number: '03',
      icon: Hammer,
      title: 'Building & fitting',
      description: 'Our carpenters build your custom furniture. We supervise work on site daily so every detail is neat.',
      deliverable: 'Weekly photo updates and tidy craftsmanship.'
    },
    {
      number: '04',
      icon: KeyRound,
      title: 'Move-in & handover',
      description: 'We test all lights, clean the rooms thoroughly, and hand over your keys ready to live in.',
      deliverable: 'Finished rooms and 1-year warranty.'
    }
  ];

  return (
    <section id="process" className="py-12 sm:py-20 lg:py-24 bg-[#192420] relative border-t border-[#D0AE89]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 pb-4 sm:pb-6 border-b border-[#D0AE89]/15 gap-3">
          <div>
            <span className="text-xs font-medium text-[#D0AE89] tracking-[0.15em] uppercase block mb-1.5 font-sans">
              How it works
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-[#F5F0E8] font-display tracking-tight">
              Our 4-step <span className="font-extralight text-[#D0AE89]">process</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#cfc8bc] font-sans max-w-sm leading-relaxed">
            From our first chat to the day you move in, we keep every step clear and stress-free.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="p-5 sm:p-6 rounded-sm bg-[#141e1a]/80 border border-[#D0AE89]/15 hover:border-[#D0AE89]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-display text-[#D0AE89] tracking-wider font-light">
                      Step {step.number}
                    </span>
                    <div className="w-7 h-7 rounded-sm bg-[#192420] border border-[#D0AE89]/25 flex items-center justify-center text-[#D0AE89] group-hover:bg-[#D0AE89] group-hover:text-[#192420] transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg text-[#F5F0E8] font-display font-light tracking-wide mb-2 group-hover:text-[#D0AE89] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#cfc8bc] font-sans leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D0AE89]/10">
                  <span className="text-xs font-sans text-[#D0AE89]/85 block leading-relaxed">
                    <span className="text-[#cfc8bc]/50 block text-[11px] mb-0.5">What you get:</span>
                    {step.deliverable}
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
