import React, { useState } from 'react';
import { ArrowUp, CheckCircle2, Phone, Mail, MapPin, Instagram, Linkedin } from 'lucide-react';

export default function Footer({ onOpenConsultation }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141e1a] text-[#F5F0E8] pt-16 sm:pt-24 pb-12 sm:pb-16 border-t border-[#D0AE89]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 sm:pb-16 border-b border-[#D0AE89]/15">
          
          {/* Brand & Credentials */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/images/brand/arcube-emblem.png"
                alt="Arcube"
                className="h-8 sm:h-9 w-auto object-contain"
              />
              <span className="text-2xl font-light tracking-[0.22em] text-[#F5F0E8] lowercase font-display">
                arcube
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#cfc8bc]/85 font-sans leading-relaxed max-w-sm">
              Interior design studio in Colombo 06. We create calm, comfortable homes, apartments, and villas across Sri Lanka.
            </p>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-sm bg-[#192420] border border-[#D0AE89]/30 text-xs text-[#D0AE89] font-sans font-medium">
                Interior Design Studio • Colombo 06
              </span>
            </div>
          </div>

          {/* Quick Links / Sitemap */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-medium text-[#D0AE89] tracking-[0.15em] uppercase font-sans mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans text-[#cfc8bc]/80">
              <li>
                <a href="#works" className="hover:text-[#D0AE89] transition-colors">Our work</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D0AE89] transition-colors">Services</a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#D0AE89] transition-colors">How it works</a>
              </li>
              <li>
                <a href="#transformation" className="hover:text-[#D0AE89] transition-colors">Before & after</a>
              </li>
              <li>
                <a href="#redesign" className="hover:text-[#D0AE89] transition-colors">Room preview tool</a>
              </li>
              <li>
                <a href="#studio" className="hover:text-[#D0AE89] transition-colors">About our studio</a>
              </li>
            </ul>
          </div>

          {/* Direct Atelier Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-medium text-[#D0AE89] tracking-[0.15em] uppercase font-sans mb-3">
              Direct contact
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm font-sans text-[#cfc8bc]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D0AE89] flex-shrink-0 mt-0.5" />
                <span>16 Harmers Avenue, Colombo 06, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D0AE89] flex-shrink-0" />
                <a href="tel:+94112584090" className="hover:text-[#D0AE89] transition-colors">
                  +94 11 258 4090
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D0AE89] flex-shrink-0" />
                <a href="mailto:atelier@arcubedesign.com" className="hover:text-[#D0AE89] transition-colors">
                  atelier@arcubedesign.com
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-2 flex items-center gap-3 text-[#cfc8bc]/70">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-sm bg-[#192420] border border-[#D0AE89]/20 flex items-center justify-center hover:text-[#D0AE89] hover:border-[#D0AE89] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-sm bg-[#192420] border border-[#D0AE89]/20 flex items-center justify-center hover:text-[#D0AE89] hover:border-[#D0AE89] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onOpenConsultation}
                className="text-xs text-[#D0AE89] hover:underline font-sans ml-2 font-medium"
              >
                Book consultation →
              </button>
            </div>
          </div>

          {/* Studio Dispatch Subscription */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-medium text-[#D0AE89] tracking-[0.15em] uppercase font-sans mb-3">
              Studio dispatch
            </h4>
            <p className="text-xs text-[#cfc8bc]/70 font-sans leading-relaxed">
              Quarterly private notes on Sri Lankan architectural joinery, stone sourcing, and completed commissions.
            </p>

            {subscribed ? (
              <div className="text-xs font-sans text-[#D0AE89] flex items-center gap-2 py-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Subscribed to private atelier dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3.5 py-2.5 bg-[#192420] border border-[#D0AE89]/20 text-xs text-[#F5F0E8] placeholder-[#cfc8bc]/40 focus:border-[#D0AE89] focus:outline-none rounded-sm font-sans"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-xs font-medium tracking-[0.08em] transition-all rounded-sm text-center font-sans"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#cfc8bc]/50 text-center sm:text-left">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <span>© {new Date().getFullYear()} Arcube Atelier (Pvt) Ltd.</span>
            <span>•</span>
            <span>Interior Architecture & Design Atelier</span>
            <span>•</span>
            <button onClick={onOpenConsultation} className="hover:text-[#D0AE89] transition-colors">
              Privacy policy
            </button>
            <span>•</span>
            <button onClick={onOpenConsultation} className="hover:text-[#D0AE89] transition-colors">
              Terms of engagement
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="hover:text-[#D0AE89] transition-colors flex items-center gap-1.5 py-1 text-xs font-sans font-medium"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
