import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenConsultation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our work', href: '#works' },
    { name: 'Services', href: '#services' },
    { name: 'Room preview', href: '#redesign' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#192420]/95 backdrop-blur-xl py-3 shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
            : 'bg-gradient-to-b from-[#192420]/95 via-[#192420]/60 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group py-1" aria-label="Arcube Home">
            <img
              src="/images/brand/arcube-emblem.png"
              alt="Arcube"
              className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.05]"
            />
            <span className="text-xl sm:text-2xl font-light tracking-[0.22em] text-[#F5F0E8] group-hover:text-[#D0AE89] transition-colors lowercase font-display">
              arcube
            </span>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xl font-sans font-light text-[#F5F0E8]/75 hover:text-[#D0AE89] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D0AE89] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenConsultation}
              className="hidden sm:flex px-4 py-2.5 rounded-sm bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-sm font-sans font-medium tracking-[0.06em] transition-all shadow-[0_4px_16px_rgba(208,174,137,0.2)] items-center gap-1.5 active:scale-[0.99]"
            >
              <span>Book consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#F5F0E8] hover:text-[#D0AE89] transition-colors rounded-sm border border-[#D0AE89]/15 bg-[#141e1a]/80 active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#141e1a]/98 backdrop-blur-2xl border-b border-[#D0AE89]/20 px-6 py-6 animate-fade-in flex flex-col gap-2.5 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-sans font-light text-[#F5F0E8]/85 hover:text-[#D0AE89] py-3 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-sm text-[#D0AE89]/50">→</span>
              </a>
            ))}
            <div className="pt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3.5 rounded-sm bg-[#D0AE89] text-[#192420] text-sm font-sans font-medium text-center shadow-lg active:scale-[0.99]"
              >
                Book a consultation
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
