import React, { useState } from 'react';
import { ArrowDownRight, Sparkles } from 'lucide-react';

export default function Hero({ onOpenConsultation }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const heroSlides = [
    {
      id: 'lotus',
      title: 'The Lotus Sky Pavilion',
      coordinates: '6°55\'38" N, 79°51\'30" E',
      location: 'Colombo 02',
      image: '/images/colombo-lotus-hero.jpg',
      hasHotspot: true,
      hotspotX: '61%',
      hotspotY: '22%'
    },
    {
      id: 'cinnamon',
      title: 'The Barnes Place Pavilion',
      coordinates: '6°54\'12" N, 79°52\'04" E',
      location: 'Colombo 07',
      image: '/images/sl-minimal-living.jpg',
      hasHotspot: false
    },
    {
      id: 'lunuganga',
      title: 'The Lunuganga Veranda',
      coordinates: '6°25\'18" N, 80°00\'22" E',
      location: 'Bentota',
      image: '/images/sl-bawa-dining.jpg',
      hasHotspot: false
    }
  ];

  const current = heroSlides[activeSlide];

  return (
    <section className="relative min-h-[100svh] sm:min-h-[92vh] flex items-end justify-between overflow-hidden pb-12 sm:pb-16 pt-24 sm:pt-28 bg-[#192420]">
      {/* Background Architectural Canvas */}
      <div className="absolute inset-0 z-0">
        <img
          key={current.image}
          src={current.image}
          alt={current.title}
          className="w-full h-full object-cover object-center animate-fade-in duration-1000 scale-[1.01]"
        />
        {/* Gradients blending with deep forest green #192420 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#192420] via-[#192420]/50 to-[#192420]/75"></div>
        <div className="absolute inset-0 bg-[#192420]/35"></div>
      </div>



      {/* Lotus Tower Landmark Hotspot Marker */}
      {current.hasHotspot && (
        <div
          className="absolute z-30"
          style={{ top: current.hotspotY, left: current.hotspotX, transform: 'translate(-50%, -50%)' }}
        >
          <div
            className="relative group cursor-pointer p-2"
            onClick={() => setShowEasterEgg(!showEasterEgg)}
          >

            {/* Tooltip */}
            <div
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 sm:w-56 p-3 rounded-sm bg-[#141e1a]/95 border border-[#D0AE89]/30 backdrop-blur-xl text-left transition-all ${
                showEasterEgg ? 'block' : 'hidden group-hover:block'
              }`}
            >
              <div className="text-[9px] font-mono text-[#D0AE89] uppercase tracking-wider mb-0.5">
                Colombo Landmark
              </div>
              <div className="text-xs text-[#F5F0E8] font-normal">
                Colombo Lotus Tower
              </div>
              <p className="text-[10px] text-[#cfc8bc] font-light mt-0.5 leading-snug">
                Nelum Kuluna framed across Beira Lake.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-10 flex flex-col justify-end">
        {/* Top Meta Line: Clean responsive flex on mobile */}
        <div className="flex flex-col xs:flex-row xs:items-center justify-between pb-3.5 border-b border-[#D0AE89]/15 mb-6 sm:mb-8 text-[10px] sm:text-[11px] font-mono text-[#cfc8bc]/70 gap-2 xs:gap-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-[#D0AE89] tracking-widest uppercase font-medium">
              ARCUBE
            </span>
          </div>

          {current.hasHotspot && (
            <button
              onClick={() => setShowEasterEgg(!showEasterEgg)}
              className="text-[10px] text-[#D0AE89] hover:text-[#F5F0E8] transition-colors flex items-center gap-1.5 self-start xs:self-auto py-0.5"
            >
              <Sparkles className="w-3 h-3" />
              <span>{showEasterEgg ? 'Hide Landmark Tag' : 'Spot Lotus Tower'}</span>
            </button>
          )}
        </div>

        {/* Hero Headline & Tagline in thin-weight typography */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <span className="text-[11px] sm:text-xs tracking-[0.25em] font-light text-[#D0AE89] uppercase block mb-2 sm:mb-3">
            Architecture & Interior Design Studio
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#F5F0E8] tracking-wide leading-[1.12] mb-3 sm:mb-4">
            Interior Architecture <br />
            <span className="font-extralight text-[#D0AE89] tracking-wider">& Spatial Design</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#F5F0E8]/85 font-normal max-w-lg leading-relaxed">
            Minimal, bespoke spaces tailored to Sri Lankan tropical living.
          </p>
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-5 sm:pt-6 border-t border-[#D0AE89]/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            {/* Primary Gold CTA against dark green */}
            <button
              onClick={onOpenConsultation}
              className="flex-1 sm:flex-none justify-center px-5 sm:px-6 py-3 rounded-sm bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-xs font-medium uppercase tracking-[0.18em] transition-all shadow-[0_4px_20px_rgba(208,174,137,0.25)] flex items-center gap-2 group active:scale-[0.99]"
            >
              <span>Start a Project</span>
              <ArrowDownRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>

            <a
              href="#works"
              className="px-3.5 sm:px-5 py-3 text-xs font-mono uppercase tracking-[0.18em] text-[#F5F0E8]/75 hover:text-[#D0AE89] transition-colors text-center"
            >
              Works →
            </a>
          </div>

          {/* Minimal Vista Switcher with touch targets */}
          <div className="flex items-center justify-between sm:justify-start gap-3 text-xs font-mono pt-1 sm:pt-0">
            <span className="text-[#cfc8bc]/50 text-[10px] uppercase tracking-widest mr-1">VISTA:</span>
            <div className="flex items-center gap-2 sm:gap-3">
              {heroSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setActiveSlide(idx);
                    setShowEasterEgg(false);
                  }}
                  className={`px-2.5 py-1 transition-all rounded-sm ${
                    activeSlide === idx
                      ? 'text-[#D0AE89] border-b-2 border-[#D0AE89] font-medium bg-[#141e1a]/40'
                      : 'text-[#cfc8bc]/50 hover:text-[#F5F0E8]'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
