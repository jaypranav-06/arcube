import React from 'react';

// Subtle decorative line divider echoing the logo's angled cut
export function GeometricDivider({ className = '' }) {
  return (
    <div className={`relative flex items-center justify-center py-6 ${className}`}>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D0AE89]/20 to-transparent"></div>
      <div className="absolute flex items-center gap-1.5 px-3 bg-[#192420]">
        <span className="w-1.5 h-1.5 rotate-45 border border-[#D0AE89]/40"></span>
        <span className="w-6 h-px bg-[#D0AE89]/40 rotate-12"></span>
        <span className="w-1.5 h-1.5 rotate-45 border border-[#D0AE89]/40"></span>
      </div>
    </div>
  );
}

// Large background watermark of the Arcube geometric 'A' emblem
export function EmblemWatermark({ className = '' }) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <img
        src="/images/brand/arcube-emblem.png"
        alt=""
        aria-hidden="true"
        className="w-full h-full object-contain opacity-100"
      />
    </div>
  );
}

