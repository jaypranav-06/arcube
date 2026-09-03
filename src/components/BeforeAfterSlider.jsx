import React, { useState, useRef, useCallback } from 'react';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updateSliderPosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  }, [isDragging, updateSliderPosition]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    updateSliderPosition(e.touches[0].clientX);
  }, [isDragging, updateSliderPosition]);

  const handleStart = () => setIsDragging(true);
  const handleEnd = () => setIsDragging(false);

  return (
    <section id="transformation" className="py-12 sm:py-20 bg-[#141e1a] border-t border-b border-[#D0AE89]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Minimal Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-[#D0AE89]/15 gap-3">
          <div>
            <span className="text-xs font-medium text-[#D0AE89] tracking-[0.15em] uppercase block mb-1.5 font-sans">
              Before & after
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-[#F5F0E8] font-display tracking-tight">
              See the <span className="font-extralight text-[#D0AE89]">transformation</span>
            </h2>
          </div>
          <p className="text-[#cfc8bc] text-xs sm:text-sm font-sans tracking-wide">
            From bare concrete to a finished, comfortable home.
          </p>
        </div>

        {/* Interactive Comparison Slider */}
        <div className="relative max-w-5xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={handleStart}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onMouseMove={handleMouseMove}
            onTouchStart={handleStart}
            onTouchEnd={handleEnd}
            onTouchMove={handleTouchMove}
            className="relative aspect-[4/3] sm:aspect-[16/9] w-full select-none overflow-hidden rounded-sm border border-[#D0AE89]/20 shadow-2xl cursor-ew-resize touch-none"
          >
            {/* Base Image: AFTER */}
            <img
              src="/images/after-luxury.jpg"
              alt="After: Arcube Finished Luxury Penthouse"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />

            {/* Overlaid Image: BEFORE with clip-path */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img
                src="/images/before-concrete.jpg"
                alt="Before: Raw Concrete Structural Shell"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              />
            </div>

            {/* Draggable Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-px bg-[#D0AE89] shadow-[0_0_10px_rgba(208,174,137,0.8)] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#192420] border border-[#D0AE89] flex items-center justify-center shadow-xl">
                <div className="flex items-center gap-0.5">
                  <span className="w-0.5 h-2.5 bg-[#D0AE89]"></span>
                  <span className="w-0.5 h-2.5 bg-[#D0AE89]"></span>
                </div>
              </div>
            </div>

            {/* Floating Minimal Labels */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 px-2.5 sm:px-3 py-1 bg-[#192420]/90 backdrop-blur-md border border-[#D0AE89]/20 text-xs font-sans tracking-wider text-[#F5F0E8] pointer-events-none rounded-sm">
              Before
            </div>

            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 px-2.5 sm:px-3 py-1 bg-[#192420]/90 backdrop-blur-md border border-[#D0AE89]/30 text-xs font-sans tracking-wider text-[#D0AE89] pointer-events-none rounded-sm">
              After
            </div>

            {/* Percentage indicator */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1 bg-[#192420]/90 backdrop-blur-md border border-[#D0AE89]/20 text-xs font-sans text-[#cfc8bc] pointer-events-none rounded-sm whitespace-nowrap">
              {Math.round(sliderPosition)}% • Drag to compare
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
