import React, { useState, useId } from 'react';
import { ArrowRight } from 'lucide-react';

export default function ProjectEstimator({ onOpenConsultation }) {
  const [typology, setTypology] = useState('penthouse');
  const [sqft, setSqft] = useState(4500);
  const [tier, setTier] = useState('haute');
  const [location, setLocation] = useState('colombo07');

  const areaSliderId = useId();

  const typologies = [
    { id: 'penthouse', label: 'Sky Penthouse // Colombo', multiplier: 1.15 },
    { id: 'villa', label: 'Coastal Estate // Galle', multiplier: 1.25 },
    { id: 'townhouse', label: 'Residence // Colombo 07', multiplier: 1.2 },
    { id: 'retreat', label: 'Hill Sanctuary // Kandy', multiplier: 1.1 }
  ];

  const tiers = [
    { id: 'signature', title: 'Artisanal Signature', rateLKR: 45000, desc: 'Reclaimed Ceylon teak & cut-cement' },
    { id: 'haute', title: 'Haute Monolith', rateLKR: 68000, desc: 'Travertine slabs & acoustic glazing' },
    { id: 'museum', title: 'Museum Grade', rateLKR: 98000, desc: 'Single-block stone baths & private courts' }
  ];

  const locations = [
    { id: 'colombo07', name: 'Colombo 07 // Cinnamon Gardens & Barnes Place' },
    { id: 'galleface', name: 'Colombo 02 // Beira Lake & Port City' },
    { id: 'galle', name: 'Galle // Talpe Oceanfront (Millionaire’s Mile)' },
    { id: 'bentota', name: 'Bentota // River & Dedduwa Lagoon' },
    { id: 'kandy', name: 'Kandy // Hanthana Mountain Sanctuary' }
  ];

  const currentTier = tiers.find((t) => t.id === tier);
  const currentTypology = typologies.find((tp) => tp.id === typology);

  // Pure LKR calculations
  const baseCostLKR = sqft * currentTier.rateLKR * currentTypology.multiplier;
  const minCostMillion = Math.round((baseCostLKR * 0.9) / 1000000);
  const maxCostMillion = Math.round((baseCostLKR * 1.15) / 1000000);

  const monthsEstimate = sqft < 3500 ? '8 – 11 Months' : sqft < 7000 ? '11 – 15 Months' : '15 – 20 Months';

  return (
    <section id="estimator" className="py-16 sm:py-24 bg-[#192420] border-t border-[#D0AE89]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Minimal Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 pb-5 sm:pb-6 border-b border-[#D0AE89]/15 gap-3 sm:gap-0">
          <div>
            <span className="text-[10px] font-mono text-[#D0AE89] tracking-[0.3em] uppercase block mb-1.5 sm:mb-2">
              Feasibility & Investment
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-[#F5F0E8] tracking-wide">
              Residence <span className="font-extralight text-[#D0AE89] tracking-wider">Estimator</span>
            </h2>
          </div>

          {/* Currency indicator badge: 100% LKR */}
          <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-sm bg-[#141e1a] border border-[#D0AE89]/20 text-[10px] sm:text-[11px] font-mono text-[#D0AE89]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D0AE89] animate-pulse"></span>
            <span>CURRENCY: SRI LANKAN RUPEE (LKR)</span>
          </div>
        </div>

        {/* Minimalist Grid Layout */}
        <div className="grid grid-cols-1 gap-8 items-start">
          {/* Controls Column */}
          <div className="space-y-6">
            {/* Typology */}
            <div>
              <span className="text-[10px] font-mono text-[#cfc8bc]/60 uppercase tracking-widest block mb-2">
                01 // Typology
              </span>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                {typologies.map((tp) => (
                  <button
                    key={tp.id}
                    onClick={() => setTypology(tp.id)}
                    className={`p-3 sm:p-3.5 text-left text-xs font-light tracking-wide transition-all border rounded-sm ${
                      typology === tp.id
                        ? 'border-[#D0AE89] text-[#192420] bg-[#D0AE89] font-medium'
                        : 'border-[#D0AE89]/15 text-[#F5F0E8]/80 bg-[#141e1a]/60 hover:border-[#D0AE89]/40'
                    }`}
                  >
                    {tp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Area Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-[#cfc8bc]/60 uppercase tracking-widest">
                  02 // Residence Area
                </span>
                <span className="text-xs font-mono text-[#D0AE89]">
                  {sqft.toLocaleString()} SQ.FT
                </span>
              </div>
              <input
                id={areaSliderId}
                type="range"
                min="1500"
                max="15000"
                step="250"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                aria-label="Area in square feet"
                className="w-full h-2 bg-[#141e1a] rounded-lg appearance-none cursor-pointer accent-[#D0AE89]"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#cfc8bc]/50 mt-1">
                <span>1,500 sq.ft</span>
                <span>15,000 sq.ft</span>
              </div>
            </div>

            {/* Artisanal Tier - stacked on mobile, 3 columns on tablet/desktop */}
            <div>
              <span className="text-[10px] font-mono text-[#cfc8bc]/60 uppercase tracking-widest block mb-2">
                03 // Artisanship Tier
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {tiers.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTier(t.id)}
                    className={`p-3 sm:p-3.5 text-left sm:text-center text-xs font-light tracking-wide transition-all border rounded-sm ${
                      tier === t.id
                        ? 'border-[#D0AE89] text-[#192420] bg-[#D0AE89] font-medium'
                        : 'border-[#D0AE89]/15 text-[#F5F0E8]/80 bg-[#141e1a]/60 hover:border-[#D0AE89]/40'
                    }`}
                  >
                    <div className="font-medium">{t.title}</div>
                    <div className="text-[10px] font-mono opacity-80 mt-0.5 sm:mt-1">
                      Rs. {t.rateLKR.toLocaleString()}/sq.ft
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <span className="text-[10px] font-mono text-[#cfc8bc]/60 uppercase tracking-widest block mb-2">
                04 // Sri Lanka Location
              </span>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 sm:p-3.5 bg-[#141e1a] border border-[#D0AE89]/20 text-xs text-[#F5F0E8] font-light focus:border-[#D0AE89] focus:outline-none rounded-sm"
              >
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id} className="bg-[#141e1a] text-[#F5F0E8]">
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
              onClick={onOpenConsultation}
              className="w-full py-3.5 bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] font-medium text-xs uppercase tracking-[0.18em] transition-all rounded-sm flex items-center justify-center gap-2 shadow-lg active:scale-[0.99]"
            >
              <span>Get a Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
        </div>
      </div>
    </section>
  );
}
