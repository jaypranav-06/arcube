import React, { useState } from 'react';
import { ArrowUp, CheckCircle2 } from 'lucide-react';

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
    <footer className="bg-[#141e1a] text-[#F5F0E8] pt-16 sm:pt-24 pb-10 sm:pb-12 border-t border-[#D0AE89]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Address */}
        <div className="pb-12 sm:pb-16 border-b border-[#D0AE89]/10">
          <h4 className="text-2xl sm:text-3xl text-[#F5F0E8] tracking-wider font-light mb-2">
            Colombo 06
          </h4>
          <p className="text-sm text-[#cfc8bc]/70 font-light leading-relaxed">
            16 Harmers Avenue, Colombo 06
          </p>
        </div>

        {/* Brand Row with Monochrome Logo */}
        <div className="py-10 sm:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 border-b border-[#D0AE89]/10">
          <div>
            {/* Real Brand Logo */}
            <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
              <img
                src="/images/brand/arcube-emblem.png"
                alt="Arcube"
                className="h-8 sm:h-9 w-auto object-contain"
              />
              <span className="text-xl sm:text-2xl font-light tracking-[0.22em] text-[#F5F0E8] lowercase">
                arcube
              </span>
            </div>
            <div className="text-[11px] font-mono text-[#cfc8bc]/60 tracking-wider">
              Architecture & Interior Design Studio • Colombo 06
            </div>
          </div>

          {/* Confidential Dispatch Subscription */}
          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="text-xs font-mono text-[#D0AE89] flex items-center gap-2 py-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Added to private studio updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3.5 py-2.5 bg-[#192420] border border-[#D0AE89]/20 text-xs text-[#F5F0E8] placeholder-[#cfc8bc]/40 focus:border-[#D0AE89] focus:outline-none rounded-sm flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-xs font-medium uppercase tracking-[0.18em] transition-all rounded-sm text-center"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright and Top-Scroll */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-[#cfc8bc]/50 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} ARCUBE ATELIER (PVT) LTD. CHARTERED PRACTICE SLIA & RIBA.
          </div>

          <button
            onClick={scrollToTop}
            className="hover:text-[#D0AE89] transition-colors flex items-center gap-1.5 uppercase tracking-widest py-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
