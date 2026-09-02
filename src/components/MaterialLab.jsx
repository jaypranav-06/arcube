import React, { useState } from 'react';
import { materialsData } from '../data/materialsData';

export default function MaterialLab() {
  const [selectedMaterial, setSelectedMaterial] = useState(materialsData[0]);

  return (
    <section id="materiality" className="py-24 bg-obsidian-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Minimal Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono text-champagne-400 tracking-[0.3em] uppercase block mb-2">
              Tactility
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
              The Material <span className="italic font-light text-champagne-200">Palette</span>
            </h2>
          </div>
          <p className="text-travertine-500 text-xs font-mono tracking-wider mt-3 sm:mt-0 uppercase">
            Honest substances sourced for tropical longevity
          </p>
        </div>

        {/* Minimal Swatch Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Swatch List Selector */}
          <div className="lg:col-span-5 space-y-2">
            {materialsData.map((mat, idx) => (
              <button
                key={mat.id}
                onClick={() => setSelectedMaterial(mat)}
                className={`w-full p-4 text-left transition-all flex items-center justify-between border ${
                  selectedMaterial.id === mat.id
                    ? 'border-champagne-400 bg-obsidian-900'
                    : 'border-white/5 bg-obsidian-900/30 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-champagne-400/80">0{idx + 1}</span>
                  <div>
                    <h3 className="font-serif text-sm text-white">
                      {mat.name}
                    </h3>
                    <span className="text-[10px] font-mono text-travertine-500 uppercase">
                      {mat.origin}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-travertine-400">
                  {mat.finish}
                </span>
              </button>
            ))}
          </div>

          {/* Large Focused Swatch Preview */}
          <div className="lg:col-span-7 flex flex-col md:flex-row items-center gap-8 p-6 sm:p-8 bg-obsidian-900/60 border border-white/10">
            <div className="w-full md:w-64 aspect-square flex-shrink-0 overflow-hidden border border-white/10">
              <img
                src={selectedMaterial.image}
                alt={selectedMaterial.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-mono text-champagne-400 uppercase tracking-widest block mb-1">
                {selectedMaterial.category}
              </span>
              <h3 className="font-serif text-2xl text-white mb-3">
                {selectedMaterial.name}
              </h3>
              <p className="text-xs text-travertine-300 font-light leading-relaxed mb-4">
                {selectedMaterial.tactileDescription}
              </p>
              <div className="text-[11px] font-mono text-travertine-500">
                Provenance: {selectedMaterial.origin}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
