import React, { useState } from 'react';
import { ArrowDownRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Hero({ onOpenConsultation }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

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

  const current = heroSlides[activeSlide] || heroSlides[0];

  const handleTouchStart = (e) => {
    if (e && e.touches && e.touches[0]) {
      setTouchStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    if (e && e.changedTouches && e.changedTouches[0]) {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          // Swiped left -> next
          setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        } else {
          // Swiped right -> prev
          setActiveSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
        }
      }
    }
    setTouchStartX(null);
  };

  return (
    <section 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[100svh] sm:min-h-[92vh] flex items-end justify-between overflow-hidden pb-5 sm:pb-16 pt-20 sm:pt-28 bg-[#192420] border-b border-[#D0AE89]/15"
    >
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

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-10 flex flex-col justify-end">
        {/* Top Bar on Mobile */}
        <div className="flex sm:hidden items-center justify-between pb-3 border-b border-[#D0AE89]/15 mb-4 text-xs font-sans">
          <button
            type="button"
            onClick={() => {
              setActiveSlide((prev) => (prev + 1) % heroSlides.length);
            }}
            className="flex items-center gap-2 py-0.5 text-left active:opacity-75 transition-opacity"
          >
            <span className="w-2 h-2 rounded-full bg-[#D0AE89] animate-pulse flex-shrink-0"></span>
            <span className="text-sm text-[#F5F0E8] font-light font-sans">
              {current.location}
            </span>
          </button>

          {/* Easy-to-tap Chevron Arrows */}
          <div className="flex items-center bg-[#141e1a]/95 backdrop-blur-md border border-[#D0AE89]/30 rounded-sm shadow-md">
            <button
              type="button"
              onClick={() => {
                setActiveSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
              }}
              className="w-8 h-8 flex items-center justify-center text-[#F5F0E8] hover:text-[#D0AE89] active:bg-[#D0AE89]/20 transition-colors"
              aria-label="Previous Vista"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-[#D0AE89]" />
            </button>
            <span className="w-px h-3 bg-[#D0AE89]/20"></span>
            <button
              type="button"
              onClick={() => {
                setActiveSlide((prev) => (prev + 1) % heroSlides.length);
              }}
              className="w-8 h-8 flex items-center justify-center text-[#F5F0E8] hover:text-[#D0AE89] active:bg-[#D0AE89]/20 transition-colors"
              aria-label="Next Vista"
            >
              <ChevronRight className="w-3.5 h-3.5 text-[#D0AE89]" />
            </button>
          </div>
        </div>

        {/* Top Meta Line: Desktop */}
        <div className="hidden sm:flex items-center justify-between pb-3.5 border-b border-[#D0AE89]/15 mb-8 text-sm font-sans text-[#cfc8bc]/80">
          <div className="flex items-center gap-3">
            <span className="text-[#D0AE89] tracking-widest uppercase font-medium text-xs">
              ARCUBE
            </span>
            <span>•</span>
            <span className="text-[#F5F0E8]">Interior Design Studio, Colombo</span>
          </div>
          <span className="text-sm text-[#F5F0E8]/70">{current.location}</span>
        </div>

        <div className="max-w-2xl mb-6 sm:mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#F5F0E8] font-display tracking-tight leading-[1.12] mb-4 sm:mb-5">
            Interiors designed <br />
            <span className="font-extralight text-[#D0AE89]">for real living.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#F5F0E8]/90 font-sans font-normal max-w-lg leading-relaxed">
            Calm, modern homes and apartments across Sri Lanka.
          </p>
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-4 sm:pt-6 border-t border-[#D0AE89]/15 flex items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Primary Gold CTA */}
            <button
              onClick={onOpenConsultation}
              className="flex-1 sm:flex-none justify-center px-5 sm:px-6 py-3 rounded-sm bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-sm font-medium tracking-[0.06em] transition-all shadow-[0_4px_20px_rgba(208,174,137,0.25)] flex items-center gap-2 group active:scale-[0.99] font-sans"
            >
              <span>Book a consultation</span>
              <ArrowDownRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>

            <a
              href="#works"
              className="px-4 sm:px-5 py-3 text-sm font-sans text-[#F5F0E8]/85 hover:text-[#D0AE89] transition-colors text-center"
            >
              See our work →
            </a>
          </div>

          {/* Desktop Controller */}
          <div className="hidden sm:flex items-center gap-3 text-xs font-sans">
            <div className="flex items-center gap-1 p-1 rounded-sm bg-[#141e1a]/90 backdrop-blur-md border border-[#D0AE89]/20">
              {heroSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setActiveSlide(idx);
                  }}
                  className={`px-3 py-1 text-xs font-sans rounded-sm transition-all ${
                    activeSlide === idx
                      ? 'bg-[#D0AE89] text-[#192420] font-medium'
                      : 'text-[#cfc8bc]/60 hover:text-[#F5F0E8]'
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
