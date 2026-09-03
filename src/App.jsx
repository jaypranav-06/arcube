import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StudioIntro from './components/StudioIntro';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import RoomRedesign from './components/RoomRedesign';
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
    <div className="min-h-screen bg-[#192420] text-[#F5F0E8] flex flex-col selection:bg-[#D0AE89]/30 selection:text-[#D0AE89] font-sans">
      {/* Floating Header with Logo in Top-Left and Gold CTA */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Main Content Flow — Ordered per Arcube Website Standard Guide */}
      <main className="flex-1">
        {/* 1. Hero: Positioning statement + strongest single image + primary CTA */}
        <Hero onOpenConsultation={handleOpenConsultation} />

        {/* 2. Studio Intro: Philosophy + Interior Atelier Focus */}
        <StudioIntro />

        {/* 3. Selected Works: Curated high-impact architectural commissions */}
        <Portfolio onOpenConsultation={handleOpenConsultation} />

        {/* 4. Services: 4 core architectural offerings with tangible deliverables */}
        <Services onOpenConsultation={handleOpenConsultation} />

        {/* 5. Structural Metamorphosis Slider: Before & After comparison */}
        <BeforeAfterSlider />

        {/* 7. AI Redesign Tool: Mid-funnel exploratory visualizer */}
        <RoomRedesign />

      </main>

      {/* 11. Expanded Studio Footer with sitemap, legal, and restated credentials */}
      <Footer onOpenConsultation={handleOpenConsultation} />

      {/* Confidential Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={handleCloseConsultation}
      />
    </div>
  );
}
