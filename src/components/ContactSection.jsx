import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Compass, ArrowRight } from 'lucide-react';

export default function ContactSection({ onOpenConsultation }) {
  return (
    <section id="contact" className="py-12 sm:py-20 lg:py-24 bg-[#141e1a] relative border-t border-[#D0AE89]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 pb-4 sm:pb-6 border-b border-[#D0AE89]/15 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-medium text-[#D0AE89] tracking-[0.15em] uppercase block mb-1.5 font-sans">
              Contact us
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-[#F5F0E8] font-display tracking-tight">
              Let's talk about <span className="font-extralight text-[#D0AE89]">your home</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#cfc8bc] font-sans max-w-sm leading-relaxed">
            Send us a message or visit our Colombo 06 studio to discuss your space.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          
          {/* Direct Contact Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Phone & WhatsApp */}
              <div className="p-4 sm:p-5 rounded-sm bg-[#192420]/80 border border-[#D0AE89]/15 hover:border-[#D0AE89]/40 transition-all">
                <div className="w-8 h-8 rounded-sm bg-[#141e1a] border border-[#D0AE89]/25 flex items-center justify-center text-[#D0AE89] mb-3">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] text-[#cfc8bc]/60 uppercase tracking-wider font-sans block mb-0.5">
                  Call or WhatsApp
                </span>
                <a
                  href="tel:+94112584090"
                  className="text-sm sm:text-base text-[#F5F0E8] hover:text-[#D0AE89] font-sans font-medium transition-colors block"
                >
                  +94 11 258 4090
                </a>
                <a
                  href="https://wa.me/94770000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#D0AE89] hover:underline font-sans mt-1 inline-block"
                >
                  Chat on WhatsApp →
                </a>
              </div>

              {/* Direct Email */}
              <div className="p-4 sm:p-5 rounded-sm bg-[#192420]/80 border border-[#D0AE89]/15 hover:border-[#D0AE89]/40 transition-all">
                <div className="w-8 h-8 rounded-sm bg-[#141e1a] border border-[#D0AE89]/25 flex items-center justify-center text-[#D0AE89] mb-3">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] text-[#cfc8bc]/60 uppercase tracking-wider font-sans block mb-0.5">
                  Email
                </span>
                <a
                  href="mailto:atelier@arcubedesign.com"
                  className="text-sm sm:text-base text-[#F5F0E8] hover:text-[#D0AE89] font-sans font-medium transition-colors block truncate"
                >
                  atelier@arcubedesign.com
                </a>
                <span className="text-xs text-[#cfc8bc]/50 font-sans mt-1 block">
                  Replies within 24 hours
                </span>
              </div>

              {/* Physical Studio */}
              <div className="p-4 sm:p-5 rounded-sm bg-[#192420]/80 border border-[#D0AE89]/15 hover:border-[#D0AE89]/40 transition-all">
                <div className="w-8 h-8 rounded-sm bg-[#141e1a] border border-[#D0AE89]/25 flex items-center justify-center text-[#D0AE89] mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] text-[#cfc8bc]/60 uppercase tracking-wider font-sans block mb-0.5">
                  Colombo studio
                </span>
                <p className="text-xs sm:text-sm text-[#F5F0E8] font-sans leading-relaxed">
                  16 Harmers Avenue<br />Colombo 06, Sri Lanka
                </p>
              </div>

              {/* Studio Hours */}
              <div className="p-4 sm:p-5 rounded-sm bg-[#192420]/80 border border-[#D0AE89]/15 hover:border-[#D0AE89]/40 transition-all">
                <div className="w-8 h-8 rounded-sm bg-[#141e1a] border border-[#D0AE89]/25 flex items-center justify-center text-[#D0AE89] mb-3">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] text-[#cfc8bc]/60 uppercase tracking-wider font-sans block mb-0.5">
                  Studio hours
                </span>
                <p className="text-xs sm:text-sm text-[#F5F0E8] font-sans leading-relaxed">
                  Mon – Fri: 9am – 6pm<br />
                  <span className="text-xs text-[#cfc8bc]/60">Saturdays by appointment</span>
                </p>
              </div>

            </div>

            {/* Quick Consultation Banner */}
            <div className="p-4 sm:p-5 rounded-sm bg-[#192420] border border-[#D0AE89]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <h4 className="text-sm sm:text-base text-[#F5F0E8] font-display font-light mb-0.5">
                  Ready to plan your space?
                </h4>
                <p className="text-xs text-[#cfc8bc]/80 font-sans">
                  Answer a few quick questions to book an initial design chat.
                </p>
              </div>
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-sm bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-xs font-medium tracking-[0.08em] transition-all flex items-center justify-center gap-2 shadow-sm font-sans flex-shrink-0"
              >
                <span>Book a consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Location Map Tile */}
          <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[320px] rounded-sm overflow-hidden border border-[#D0AE89]/20 bg-[#192420]">
            <img
              src="/images/colombo-lotus-hero.jpg"
              alt="Colombo Studio Location"
              className="w-full h-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141e1a] via-[#141e1a]/60 to-[#141e1a]/40"></div>

            {/* Map Overlay Badge */}
            <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-sm bg-[#192420]/90 backdrop-blur-md border border-[#D0AE89]/30 text-xs text-[#D0AE89] font-sans">
                  Colombo 06 Studio
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-sm bg-[#192420]/95 backdrop-blur-md border border-[#D0AE89]/30 max-w-sm">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D0AE89] animate-ping"></span>
                  <span className="text-xs text-[#D0AE89] font-medium font-sans">
                    Arcube Studio
                  </span>
                </div>
                <p className="text-xs text-[#F5F0E8] font-sans leading-relaxed mb-2.5">
                  16 Harmers Avenue, Colombo 06. Just off Galle Road with convenient customer parking.
                </p>
                <div>
                  <a
                    href="https://maps.google.com/?q=Harmers+Avenue+Colombo+06"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#D0AE89] hover:underline font-sans flex items-center gap-1 font-medium"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
