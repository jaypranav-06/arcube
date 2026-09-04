import React, { useState, useEffect } from 'react';
import { portfolioProjects } from '../data/portfolioData';
import { ArrowUpRight, X, MapPin } from 'lucide-react';

export default function Portfolio({ onOpenConsultation }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeModalImage, setActiveModalImage] = useState(0);

  const categories = [
    { id: 'All', label: 'All' },
    { id: 'Apartment', label: 'Apartments' },
    { id: 'House', label: 'Houses' },
    { id: 'Villa', label: 'Villas' }
  ];

  const filteredProjects = activeFilter === 'All'
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === activeFilter);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setActiveModalImage(0);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeProjectModal();
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section id="works" className="py-12 sm:py-20 lg:py-24 bg-[#192420] relative border-t border-[#D0AE89]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 pb-6 sm:pb-8 border-b border-[#D0AE89]/15 gap-4">
          <div>
            <span className="text-sm font-medium text-[#D0AE89] tracking-[0.12em] uppercase block mb-4 font-sans">
              Our work
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#F5F0E8] font-display tracking-tight">
              Our projects
            </h2>
          </div>

          {/* Filter links - responsive horizontal scroll on mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`whitespace-nowrap px-4 py-2 text-sm font-sans transition-all rounded-sm border ${
                  activeFilter === cat.id
                    ? 'border-[#D0AE89] text-[#192420] bg-[#D0AE89] font-medium'
                    : 'border-[#D0AE89]/20 text-[#cfc8bc]/70 hover:text-[#F5F0E8] hover:border-[#D0AE89]/50 bg-[#141e1a]/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Minimalist Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 sm:gap-y-16">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => openProjectModal(project)}
              className="group cursor-pointer flex flex-col transition-all duration-300"
            >
              {/* Project Image Viewport */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#141e1a] mb-4 sm:mb-5 rounded-sm border border-[#D0AE89]/15 group-hover:border-[#D0AE89]/50 transition-colors">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#192420]/20 group-hover:bg-transparent transition-colors duration-500"></div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[10px] font-sans tracking-wider uppercase text-[#F5F0E8] bg-[#192420]/90 backdrop-blur-md px-2.5 py-1 border border-[#D0AE89]/20 rounded-sm">
                    {project.category}
                  </span>
                </div>

                {/* Arrow trigger on hover */}
                <div className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full bg-[#D0AE89] text-[#192420] flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 shadow-lg">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Minimal Text Content */}
              <div>
                <div className="flex items-center justify-between text-xs font-sans mb-1.5 pt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#D0AE89] font-display text-sm font-light tracking-wider">
                      0{idx + 1}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#D0AE89]/40"></span>
                    <span className="text-[#cfc8bc]/70 text-xs font-sans tracking-wider">
                      {project.year}
                    </span>
                  </div>
                  <span className="text-[#cfc8bc]/60 text-xs font-sans tracking-wide">
                    {project.area}
                  </span>
                </div>

                <h3 className="text-2xl lg:text-3xl text-[#F5F0E8] font-display font-light tracking-wide group-hover:text-[#D0AE89] transition-colors mb-2">
                  {project.title}
                </h3>

                <div className="flex items-center gap-1.5 text-sm text-[#cfc8bc]/80 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-[#D0AE89] flex-shrink-0" />
                  <span className="truncate">{project.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architectural Case Study Modal */}
      {selectedProject && (
        <div
          onClick={closeProjectModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-[#192420]/95 backdrop-blur-2xl animate-fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[94vh] overflow-y-auto bg-[#141e1a] border border-[#D0AE89]/30 shadow-2xl p-4 sm:p-7 lg:p-9 rounded-sm cursor-default"
          >
            
            {/* Top Bar: Sticky so it stays visible while scrolling */}
            <div className="sticky -top-4 sm:-top-7 lg:-top-9 z-30 bg-[#141e1a] pt-4 sm:pt-7 lg:pt-9 -mt-4 sm:-mt-7 lg:-mt-9 pb-3 border-b border-[#D0AE89]/15 mb-3 sm:mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-sans font-medium uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#192420] border border-[#D0AE89]/30 text-[#D0AE89]">
                  {selectedProject.category}
                </span>
                <span className="text-xs text-[#cfc8bc]/70 font-sans">
                  {selectedProject.area}
                </span>
              </div>

              <button
                onClick={closeProjectModal}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#192420] border border-[#D0AE89]/30 text-[#cfc8bc] hover:text-[#F5F0E8] hover:border-[#D0AE89] transition-colors active:scale-95 flex-shrink-0 shadow-sm"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Header: Full width, zero lopsided indent */}
            <div className="mb-4 sm:mb-5">
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-[#F5F0E8] font-display font-light tracking-tight leading-snug mb-1">
                {selectedProject.title}
              </h2>

              <div className="flex items-center gap-1.5 text-xs text-[#cfc8bc]/80 font-sans mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#D0AE89] flex-shrink-0" />
                <span>{selectedProject.location}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#D0AE89] font-sans font-light leading-relaxed">
                {selectedProject.tagline}
              </p>
            </div>

            {/* Main Interactive Gallery Viewer */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#0f1714] border border-[#D0AE89]/20 mb-3 rounded-sm">
              <img
                src={selectedProject.gallery[activeModalImage] || selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gallery Thumbnail Selector with smooth horizontal scroll */}
            <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-7 overflow-x-auto pb-1">
              {selectedProject.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveModalImage(idx)}
                  className={`relative w-16 sm:w-20 h-12 sm:h-14 rounded-sm overflow-hidden flex-shrink-0 border transition-all ${
                    activeModalImage === idx
                      ? 'border-[#D0AE89] ring-1 ring-[#D0AE89]'
                      : 'border-[#D0AE89]/20 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Narrative & Specifications Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 py-5 sm:py-6 border-t border-b border-[#D0AE89]/15">
              <div className="lg:col-span-7">
                <h4 className="text-xs font-sans font-medium tracking-[0.15em] text-[#D0AE89] uppercase mb-2 sm:mb-3">
                  Project narrative
                </h4>
                <p className="text-xs sm:text-sm text-[#F5F0E8]/85 font-sans font-light leading-relaxed mb-5 whitespace-pre-line">
                  {selectedProject.description}
                </p>

                <h4 className="text-xs font-sans font-medium tracking-[0.15em] text-[#D0AE89] uppercase mb-2">
                  Material palette
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedProject.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-[#192420] border border-[#D0AE89]/20 text-xs font-sans text-[#F5F0E8] rounded-sm"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Highlights */}
              <div className="lg:col-span-5 bg-[#192420] p-4 sm:p-5 border border-[#D0AE89]/20 rounded-sm self-start">
                <h4 className="text-xs tracking-[0.15em] text-[#D0AE89] uppercase mb-3 sm:mb-4 font-sans font-medium">
                  Key specifications
                </h4>
                <div className="space-y-3">
                  {selectedProject.highlights.map((item, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-[10px] text-[#cfc8bc]/60 uppercase tracking-wider font-sans">
                        {item.label}
                      </span>
                      <span className="text-xs font-medium text-[#F5F0E8] mt-0.5 font-sans leading-snug">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer CTA with both Close and Consultation buttons */}
            <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <span className="text-xs text-[#cfc8bc]/60 font-sans text-center sm:text-left">
                Colombo studio commission • {selectedProject.location}
              </span>
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={closeProjectModal}
                  className="w-1/3 sm:w-auto px-4 py-3 bg-[#192420] border border-[#D0AE89]/30 hover:border-[#D0AE89] text-[#cfc8bc] hover:text-[#F5F0E8] text-xs font-sans transition-colors rounded-sm text-center active:scale-[0.99]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    closeProjectModal();
                    onOpenConsultation();
                  }}
                  className="flex-1 sm:flex-none px-6 py-3 bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-xs font-sans font-medium tracking-[0.08em] transition-all rounded-sm shadow-md text-center active:scale-[0.99]"
                >
                  Book a consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
