import React from 'react';
import { ArrowUp, Instagram, Facebook } from 'lucide-react';

export default function Footer({ onOpenConsultation }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141e1a] text-[#F5F0E8] border-t border-[#D0AE89]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">

        {/* Section 2: Main Architectural Directory */}
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12">
          
          {/* Brand & Studio Identity */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#" className="inline-flex items-center gap-2.5 group" aria-label="Arcube Home">
              <img
                src="/images/brand/arcube-emblem.png"
                alt="Arcube"
                className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-xl font-light tracking-[0.22em] text-[#F5F0E8] lowercase font-display group-hover:text-[#D0AE89] transition-colors">
                arcube
              </span>
            </a>
            <p className="text-xs sm:text-sm text-[#cfc8bc]/75 font-sans font-light leading-relaxed max-w-sm">
              Interior architecture, custom furniture, and renovation atelier based in Colombo, Sri Lanka. Built for comfort, warmth, and everyday living.
            </p>
            <div className="pt-1 text-[11px] font-sans text-[#cfc8bc]/50">
              Arcube Atelier (Pvt) Ltd · Colombo 06, Sri Lanka
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 lg:pl-6">
            <h3 className="text-xs font-sans font-medium text-[#D0AE89] tracking-[0.15em] uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#cfc8bc]/80">
              <li>
                <a href="#works" className="hover:text-[#D0AE89] transition-colors">Our projects</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D0AE89] transition-colors">What we do</a>
              </li>
              <li>
                <a href="#transformation" className="hover:text-[#D0AE89] transition-colors">Before & after</a>
              </li>
              <li>
                <a href="#redesign" className="hover:text-[#D0AE89] transition-colors">Room preview</a>
              </li>
            </ul>
          </div>

          {/* Direct Inquiries & Studio Address */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-sans font-medium text-[#D0AE89] tracking-[0.15em] uppercase mb-4">
              Studio & Inquiries
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm font-sans text-[#cfc8bc]/80">
              <div>
                <a href="tel:+94112584090" className="hover:text-[#D0AE89] transition-colors block">
                  +94 11 258 4090
                </a>
                <span className="text-[11px] text-[#cfc8bc]/50">Mon – Sat, 9:00 AM – 6:00 PM</span>
              </div>
              <div>
                <a href="mailto:hello@arcube.com" className="hover:text-[#D0AE89] transition-colors block">
                  hello@arcube.com
                </a>
              </div>
              <div className="pt-1 text-[#cfc8bc]/70">
                Colombo 06, Sri Lanka
              </div>
            </div>
          </div>

          {/* Connect & Social Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-sans font-medium text-[#D0AE89] tracking-[0.15em] uppercase mb-4">
              Connect
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm font-sans text-[#cfc8bc]/80">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#D0AE89] transition-colors group"
              >
                <Instagram className="w-4 h-4 text-[#D0AE89]/70 group-hover:text-[#D0AE89] transition-colors flex-shrink-0" />
                <span>Instagram</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#D0AE89] transition-colors group"
              >
                <Facebook className="w-4 h-4 text-[#D0AE89]/70 group-hover:text-[#D0AE89] transition-colors flex-shrink-0" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

        </div>

        {/* Section 3: Bottom Legal Bar & Smooth Back to Top */}
        <div className="py-6 border-t border-[#D0AE89]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#cfc8bc]/50">
          <span>
            © {new Date().getFullYear()} Arcube Atelier (Pvt) Ltd. All rights reserved.
          </span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#D0AE89] transition-colors active:scale-95 group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
