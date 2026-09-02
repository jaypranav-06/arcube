import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { soundscape } from '../utils/soundscape';

export default function Navbar({ onOpenConsultation }) {
  const [scrolled, setScrolled] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
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

  const toggleAudio = () => {
    const playing = soundscape.toggle();
    setIsAudioPlaying(playing);
  };

  const navLinks = [
    { name: 'AI Redesign', href: '#redesign' },
    { name: 'Works', href: '#works' },
    { name: 'Services', href: '#services' },
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
            <span className="text-lg sm:text-xl font-light tracking-[0.22em] text-[#F5F0E8] group-hover:text-[#D0AE89] transition-colors lowercase">
              arcube
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] font-light text-[#F5F0E8]/75 hover:text-[#D0AE89] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D0AE89] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Actions: Soundscape toggle + Primary Gold CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Ambient Soundscape (Tablet and Desktop) */}
            <button
              onClick={toggleAudio}
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-sm border text-[10px] font-mono tracking-wider transition-all duration-300 ${
                isAudioPlaying
                  ? 'border-[#D0AE89] text-[#D0AE89] bg-[#D0AE89]/10'
                  : 'border-[#D0AE89]/20 text-[#cfc8bc]/70 hover:border-[#D0AE89]/50 hover:text-[#F5F0E8]'
              }`}
              title={isAudioPlaying ? 'Mute Sound' : 'Play Sound'}
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-3 h-3 text-[#D0AE89] animate-pulse" />
                  <span>SOUND ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3 h-3 opacity-60" />
                  <span>SOUND</span>
                </>
              )}
            </button>

            {/* Primary CTA in Gold-Tan */}
            <button
              onClick={onOpenConsultation}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-sm bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-[11px] sm:text-xs font-medium uppercase tracking-[0.18em] transition-all shadow-[0_4px_16px_rgba(208,174,137,0.2)] flex items-center gap-1.5"
            >
              <span>Inquire</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            {/* Mobile Menu Toggle button with a11y 44px touch target */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-[#F5F0E8] hover:text-[#D0AE89] transition-colors rounded-sm border border-[#D0AE89]/15 bg-[#141e1a]/80 active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with smooth layout and touch friendly links */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#141e1a]/98 backdrop-blur-2xl border-b border-[#D0AE89]/20 px-6 py-6 animate-fade-in flex flex-col gap-3 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-[0.2em] font-light text-[#F5F0E8]/85 hover:text-[#D0AE89] py-2.5 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-[#D0AE89]/50">→</span>
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-3">
              <button
                onClick={() => {
                  toggleAudio();
                }}
                className="flex items-center justify-between px-4 py-3 rounded-sm bg-[#192420] border border-[#D0AE89]/20 text-xs font-mono text-[#F5F0E8]"
              >
                <div className="flex items-center gap-2">
                  {isAudioPlaying ? (
                    <Volume2 className="w-4 h-4 text-[#D0AE89] animate-pulse" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-[#cfc8bc]/60" />
                  )}
                  <span>STUDIO ATMOSPHERE</span>
                </div>
                <span className="text-[#D0AE89] font-semibold">{isAudioPlaying ? 'ACTIVE' : 'OFF'}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3.5 rounded-sm bg-[#D0AE89] text-[#192420] text-xs uppercase tracking-[0.2em] font-medium text-center shadow-lg active:scale-[0.99]"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
