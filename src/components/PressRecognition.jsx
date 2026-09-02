import React, { useState } from 'react';
import { Quote } from 'lucide-react';

export default function PressRecognition() {
  const [activeTab, setActiveTab] = useState('press');

  const pressReviews = [
    {
      publication: 'SLIA Architect Journal',
      quote: 'Arcube’s Lotus Sky Residence is a watershed moment for high-density tropical modernism in Colombo.',
      tag: 'SLIA Excellence'
    },
    {
      publication: 'Architectural Digest',
      quote: 'Stepping into their Barnes Place courtyard is an acoustic revelation of cut-cement, teak, and frangipani.',
      tag: 'Cover Feature'
    },
    {
      publication: 'Wallpaper* Magazine',
      quote: 'A masterwork of monolithic restraint along the southern Sri Lankan reef.',
      tag: 'Design Awards'
    },
    {
      publication: 'Bawa Trust Review',
      quote: 'Rooted in local reclaimed timbers, honest stones, and natural convective cooling.',
      tag: 'Critic’s Choice'
    }
  ];

  const clientAccolades = [
    {
      author: 'Dr. & Mrs. Wickremasinghe',
      location: 'Barnes Place // Colombo 07',
      text: 'Arcube crafted a sanctuary where courtyard breezes and water reflections make every day tranquil.'
    },
    {
      author: 'R. Fernando',
      location: 'Talpe Oceanfront // Galle',
      text: 'Their mastery over coastal saline winds, monsoon rains, and tropical light is unmatched.'
    },
    {
      author: 'T. Senanayake',
      location: 'Beira Lake // Colombo 02',
      text: 'The sight of the Lotus Tower from our sunken travertine lounge at dusk is pure art.'
    }
  ];

  return (
    <section className="py-24 bg-obsidian-900 border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Minimal Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono text-champagne-400 tracking-[0.3em] uppercase block mb-2">
              Acclaim
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
              Recognition & <span className="italic font-light text-champagne-200">Notes</span>
            </h2>
          </div>

          <div className="flex gap-4 mt-4 sm:mt-0">
            <button
              onClick={() => setActiveTab('press')}
              className={`text-xs font-mono tracking-wider transition-all pb-1 ${
                activeTab === 'press'
                  ? 'border-b border-champagne-400 text-champagne-300'
                  : 'text-travertine-500 hover:text-white'
              }`}
            >
              Publications
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`text-xs font-mono tracking-wider transition-all pb-1 ${
                activeTab === 'clients'
                  ? 'border-b border-champagne-400 text-champagne-300'
                  : 'text-travertine-500 hover:text-white'
              }`}
            >
              Client Notes
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'press' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pressReviews.map((item, idx) => (
              <div key={idx} className="p-6 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-3">
                    <span className="text-champagne-400 uppercase tracking-widest font-medium">
                      {item.publication}
                    </span>
                    <span className="text-travertine-500">{item.tag}</span>
                  </div>
                  <p className="font-serif text-base text-white/90 font-light italic leading-relaxed">
                    “{item.quote}”
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clientAccolades.map((item, idx) => (
              <div key={idx} className="p-6 border border-white/10 flex flex-col justify-between">
                <div>
                  <Quote className="w-4 h-4 text-champagne-400/40 mb-3" />
                  <p className="text-xs text-travertine-300 font-light leading-relaxed mb-4">
                    “{item.text}”
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5">
                  <div className="font-serif text-xs text-white">{item.author}</div>
                  <div className="text-[10px] font-mono text-champagne-400/80 mt-0.5">{item.location}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
