import React from 'react';
import { Quote } from 'lucide-react';

export default function ClientWords() {
  const testimonials = [
    {
      id: 1,
      quote: "Our living room stays so much cooler in the heat now. The custom teak cabinets are beautiful and fitted neatly.",
      author: "Priyanka & Kanishka",
      context: "Home renovation, Colombo 07"
    },
    {
      id: 2,
      quote: "They turned our empty apartment into a calm, quiet home. The lighting and woodwork look stunning at night.",
      author: "Dr. Aritha",
      context: "Apartment interior, Colombo 02"
    },
    {
      id: 3,
      quote: "Honest, reliable, and easy to talk to. They kept the site tidy and finished right on schedule.",
      author: "Danushka",
      context: "Holiday villa, Bentota"
    }
  ];

  return (
    <section id="client-words" className="py-12 sm:py-20 bg-[#192420] relative border-t border-[#D0AE89]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 pb-4 sm:pb-5 border-b border-[#D0AE89]/15 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-medium text-[#D0AE89] tracking-[0.15em] uppercase block mb-1.5 font-sans">
              Client reviews
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-[#F5F0E8] font-display tracking-tight">
              What clients <span className="font-extralight text-[#D0AE89]">say</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#cfc8bc]/70 font-sans max-w-xs">
            Feedback from recent home and apartment projects in Sri Lanka.
          </p>
        </div>

        {/* 3 Client Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-7 rounded-sm bg-[#141e1a]/70 border border-[#D0AE89]/15 hover:border-[#D0AE89]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <Quote className="w-5 h-5 text-[#D0AE89]/40 mb-3 group-hover:text-[#D0AE89] transition-colors" />
                <p className="text-xs sm:text-sm text-[#F5F0E8]/90 font-sans leading-relaxed mb-5 font-light">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#D0AE89]/10">
                <span className="text-xs sm:text-sm text-[#F5F0E8] font-sans font-medium block">
                  {item.author}
                </span>
                <span className="text-xs text-[#D0AE89] font-sans block mt-0.5">
                  {item.context}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
