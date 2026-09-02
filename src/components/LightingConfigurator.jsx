import React, { useState } from 'react';
import { Sun, Moon, Sunrise } from 'lucide-react';

export default function LightingConfigurator() {
  const [activeTime, setActiveTime] = useState('twilight');
  const [activeAmbiance, setActiveAmbiance] = useState('cinnamon');

  const timeStates = {
    dawn: {
      label: 'Dawn • 06:15',
      temp: '3,200K',
      overlayClass: 'bg-amber-100/5 mix-blend-soft-light',
      glowFilter: 'sepia(0.06) saturate(0.96) brightness(1.01)'
    },
    zenith: {
      label: 'Zenith • 12:30',
      temp: '5,400K',
      overlayClass: 'bg-white/[0.02]',
      glowFilter: 'contrast(0.98) brightness(1.0) saturate(0.92)'
    },
    twilight: {
      label: 'Nocturne • 20:00',
      temp: '2,400K',
      overlayClass: 'bg-black/20 mix-blend-multiply',
      glowFilter: 'sepia(0.1) saturate(0.94) contrast(1.02) brightness(0.92)'
    }
  };

  const ambiances = {
    cinnamon: {
      name: 'Barnes Place // Colombo 07',
      image: '/images/sl-minimal-living.jpg'
    },
    lotus: {
      name: 'Lotus Sky // Colombo 02',
      image: '/images/colombo-lotus-hero.jpg'
    },
    lunuganga: {
      name: 'Lunuganga // Bentota',
      image: '/images/sl-bawa-dining.jpg'
    }
  };

  const currentLighting = timeStates[activeTime];
  const currentAmbiance = ambiances[activeAmbiance];

  return (
    <section id="configurator" className="py-24 bg-obsidian-900 border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Minimal Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono text-champagne-400 tracking-[0.3em] uppercase block mb-2">
              Diurnal Cycle
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
              Light as <span className="italic font-light text-champagne-200">Substance</span>
            </h2>
          </div>
          <p className="text-travertine-500 text-xs font-mono tracking-wider mt-3 sm:mt-0 uppercase">
            Circadian lighting response in Sri Lanka
          </p>
        </div>

        {/* Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Canvas */}
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-white/10 bg-obsidian-950">
              <img
                src={currentAmbiance.image}
                alt={currentAmbiance.name}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                style={{ filter: currentLighting.glowFilter }}
              />
              <div className={`absolute inset-0 transition-all duration-700 pointer-events-none ${currentLighting.overlayClass}`}></div>

              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-obsidian-950/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-travertine-300 flex items-center gap-2">
                <span>{currentLighting.label}</span>
                <span className="text-champagne-400 font-semibold">{currentLighting.temp}</span>
              </div>

              <div className="absolute bottom-4 left-4 z-10 px-3 py-1 bg-obsidian-950/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
                {currentAmbiance.name}
              </div>
            </div>

            {/* Vista Switcher */}
            <div className="mt-3 flex gap-2">
              {Object.entries(ambiances).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setActiveAmbiance(key)}
                  className={`px-3 py-1 text-[11px] font-mono tracking-wider transition-all border ${
                    activeAmbiance === key
                      ? 'border-champagne-400 text-champagne-300 bg-obsidian-950'
                      : 'border-white/5 text-travertine-500 hover:text-white'
                  }`}
                >
                  {data.name}
                </button>
              ))}
            </div>
          </div>

          {/* Minimal Controls */}
          <div className="lg:col-span-4 space-y-3">
            <button
              onClick={() => setActiveTime('dawn')}
              className={`w-full p-4 text-left transition-all flex items-center justify-between border ${
                activeTime === 'dawn'
                  ? 'border-champagne-400 bg-obsidian-950'
                  : 'border-white/5 bg-obsidian-950/40 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sunrise className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-serif text-white">Equatorial Dawn</span>
              </div>
              <span className="text-[11px] font-mono text-travertine-400">3,200K</span>
            </button>

            <button
              onClick={() => setActiveTime('zenith')}
              className={`w-full p-4 text-left transition-all flex items-center justify-between border ${
                activeTime === 'zenith'
                  ? 'border-champagne-400 bg-obsidian-950'
                  : 'border-white/5 bg-obsidian-950/40 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sun className="w-4 h-4 text-sky-200" />
                <span className="text-xs font-serif text-white">Zenith Monsoon</span>
              </div>
              <span className="text-[11px] font-mono text-travertine-400">5,400K</span>
            </button>

            <button
              onClick={() => setActiveTime('twilight')}
              className={`w-full p-4 text-left transition-all flex items-center justify-between border ${
                activeTime === 'twilight'
                  ? 'border-champagne-400 bg-obsidian-950'
                  : 'border-white/5 bg-obsidian-950/40 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <Moon className="w-4 h-4 text-champagne-400" />
                <span className="text-xs font-serif text-white">Colombo Nocturne</span>
              </div>
              <span className="text-[11px] font-mono text-travertine-400">2,400K</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
