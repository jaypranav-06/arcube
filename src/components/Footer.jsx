import { ArrowUp, Instagram, Linkedin } from 'lucide-react';

export default function Footer({ onOpenConsultation }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#141e1a] text-[#F5F0E8] py-10 sm:py-14 border-t border-[#D0AE89]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">

        {/* Main row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[#D0AE89]/15">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <img src="/images/brand/arcube-emblem.png" alt="Arcube" className="h-8 w-auto object-contain" />
            <span className="text-xl font-light tracking-[0.22em] text-[#F5F0E8] lowercase font-display">arcube</span>
          </div>

          {/* Contact + Socials */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm font-sans text-[#cfc8bc]/80">
            <a href="tel:+94112584090" className="hover:text-[#D0AE89] transition-colors">+94 11 258 4090</a>
            <a href="mailto:atelier@arcubedesign.com" className="hover:text-[#D0AE89] transition-colors">atelier@arcubedesign.com</a>
            <div className="flex items-center gap-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-7 h-7 rounded-sm bg-[#192420] border border-[#D0AE89]/20 flex items-center justify-center hover:text-[#D0AE89] hover:border-[#D0AE89] transition-all">
                <Instagram className="w-3 h-3" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-7 h-7 rounded-sm bg-[#192420] border border-[#D0AE89]/20 flex items-center justify-center hover:text-[#D0AE89] hover:border-[#D0AE89] transition-all">
                <Linkedin className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-5 py-2.5 rounded-sm bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-sm font-medium tracking-[0.06em] transition-all font-sans"
          >
            Book a consultation
          </button>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm font-sans text-[#cfc8bc]/40">
          <span>© {new Date().getFullYear()} Arcube Atelier (Pvt) Ltd. · Colombo 06, Sri Lanka</span>
          <button onClick={scrollToTop} className="flex items-center gap-1.5 hover:text-[#D0AE89] transition-colors">
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
