import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenConsultation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timezones, setTimezones] = useState({
    colombo: '',
    london: '',
    singapore: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTimes = () => {
      const getFormattedTime = (tz) => {
        try {
          return new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: tz,
            hour12: false
          }).format(new Date());
        } catch (e) {
          return '12:00';
        }
      };

      setTimezones({
        colombo: getFormattedTime('Asia/Colombo'),
        london: getFormattedTime('Europe/London'),
        singapore: getFormattedTime('Asia/Singapore')
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 30000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Our work', href: '#works' },
    { name: 'Services', href: '#services' },
    { name: 'How it works', href: '#process' },
    { name: 'Room preview', href: '#redesign' },
    { name: 'About', href: '#studio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>

      {/* Main floating navigation bar */}
      <header
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#192420]/95 backdrop-blur-xl border-b border-[#D0AE89]/15 py-2.5 sm:py-3 shadow-2xl'
            : 'bg-gradient-to-b from-[#192420]/95 via-[#192420]/60 to-transparent py-3.5 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 flex items-center justify-between">
          {/* Logo placed in the top-left with clear padding */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group py-1" aria-label="Arcube Home">
            <img
              src="/images/brand/arcube-emblem.png"
              alt="Arcube"
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.05]"
            />
            <span className="text-lg sm:text-xl font-light tracking-[0.22em] text-[#F5F0E8] group-hover:text-[#D0AE89] transition-colors lowercase font-display">
              arcube
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs tracking-[0.1em] font-sans font-light text-[#F5F0E8]/75 hover:text-[#D0AE89] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D0AE89] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Actions: Primary Gold CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Primary CTA in Gold-Tan (desktop/tablet; mobile has it inside drawer) */}
            <button
              onClick={onOpenConsultation}
              className="hidden sm:flex px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-sm bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-xs font-sans font-medium tracking-[0.08em] transition-all shadow-[0_4px_16px_rgba(208,174,137,0.2)] items-center gap-1.5 active:scale-[0.99]"
            >
              <span>Book consultation</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            {/* Mobile Menu Toggle button with a11y 44px touch target */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#F5F0E8] hover:text-[#D0AE89] transition-colors rounded-sm border border-[#D0AE89]/15 bg-[#141e1a]/80 active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with smooth layout and touch friendly links */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#141e1a]/98 backdrop-blur-2xl border-b border-[#D0AE89]/20 px-6 py-6 animate-fade-in flex flex-col gap-2.5 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-wide font-sans font-light text-[#F5F0E8]/85 hover:text-[#D0AE89] py-2.5 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-[#D0AE89]/50">→</span>
              </a>
            ))}
            <div className="pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3.5 rounded-sm bg-[#D0AE89] text-[#192420] text-xs tracking-[0.08em] font-sans font-medium text-center shadow-lg active:scale-[0.99]"
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
