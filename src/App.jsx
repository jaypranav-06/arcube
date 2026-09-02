import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import RoomRedesign from './components/RoomRedesign';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleOpenConsultation = () => {
    setIsConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultationOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#192420] text-[#F5F0E8] flex flex-col selection:bg-[#D0AE89]/30 selection:text-[#D0AE89]">
      {/* Floating Header with Logo in Top-Left and Gold CTA */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Main One-Page Content Flow */}
      <main className="flex-1">
        {/* 1. Hero with Logo Emblem + Tagline + Primary Gold CTA */}
        <Hero onOpenConsultation={handleOpenConsultation} />

        {/* 2. AI Room Redesign Studio (Spec Implementation: 2 Free Attempts, Chips, Gate & Lead Capture) */}
        <RoomRedesign />

        {/* 4. Curated Portfolio: Authentic Sri Lankan Commissions */}
        <Portfolio onOpenConsultation={handleOpenConsultation} />

        {/* 6. Structural Metamorphosis Slider (Before & After) */}
        <BeforeAfterSlider />
      </main>

      {/* 7. Footer with Logo Repeated in Monochrome */}
      <Footer onOpenConsultation={handleOpenConsultation} />

      {/* Confidential Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={handleCloseConsultation}
      />
    </div>
  );
}
