import React, { useState } from 'react';
import { portfolioProjects } from '../data/portfolioData';
import { ArrowUpRight, X, MapPin } from 'lucide-react';

export default function Portfolio({ onOpenConsultation }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeModalImage, setActiveModalImage] = useState(0);

  const categories = ['All', 'Sky Penthouse', 'Private Residence', 'Estate Pavilion'];

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

  return (
    <section id="works" className="py-16 sm:py-24 lg:py-28 bg-[#192420] relative border-t border-[#D0AE89]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 pb-5 sm:pb-6 border-b border-[#D0AE89]/15 gap-4">
          <div>
            <span className="text-[10px] font-mono text-[#D0AE89] tracking-[0.3em] uppercase block mb-1.5 sm:mb-2">
              Selected Works
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-[#F5F0E8] tracking-wide">
              Architectural <span className="font-extralight text-[#D0AE89] tracking-wider">Commissions</span>
            </h2>
          </div>

          {/* Filter links - responsive horizontal scroll on mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`whitespace-nowrap px-3 py-1.5 text-xs font-mono tracking-wider transition-all rounded-sm border ${
                  activeFilter === cat
                    ? 'border-[#D0AE89] text-[#192420] bg-[#D0AE89] font-medium'
                    : 'border-[#D0AE89]/20 text-[#cfc8bc]/70 hover:text-[#F5F0E8] hover:border-[#D0AE89]/50 bg-[#141e1a]/40'
                }`}
              >
                {cat}
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

                {/* Minimalist Index & Category */}
                <div className="absolute top-3 left-3 z-10 text-[9px] sm:text-[10px] font-mono tracking-widest text-[#F5F0E8] bg-[#192420]/90 backdrop-blur-md px-2 sm:px-2.5 py-1 border border-[#D0AE89]/20 uppercase rounded-sm">
                  {project.category}
                </div>

                {/* Arrow trigger on hover */}
                <div className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full bg-[#D0AE89] text-[#192420] flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 shadow-lg">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Minimal Text Content */}
              <div>
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#cfc8bc]/60 mb-1">
                  <span className="text-[#D0AE89] tracking-wider">0{idx + 1} // {project.year}</span>
                  <span>{project.area}</span>
                </div>

                <h3 className="text-lg sm:text-xl lg:text-2xl text-[#F5F0E8] font-light tracking-wide group-hover:text-[#D0AE89] transition-colors mb-1">
                  {project.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-[#cfc8bc]/80 font-light mb-2">
                  <MapPin className="w-3 h-3 text-[#D0AE89] flex-shrink-0" />
                  <span className="truncate">{project.location}</span>
                </div>

                <p className="text-xs text-[#F5F0E8]/80 font-normal line-clamp-2 leading-relaxed">
                  {project.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architectural Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-[#192420]/95 backdrop-blur-2xl animate-fade-in">
          <div className="relative w-full max-w-5xl max-h-[94vh] overflow-y-auto bg-[#141e1a] border border-[#D0AE89]/30 shadow-2xl p-4 sm:p-8 lg:p-10 rounded-sm">
            {/* Close button with 44px tap area */}
            <button
              onClick={closeProjectModal}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-[#192420] border border-[#D0AE89]/30 text-[#cfc8bc] hover:text-[#F5F0E8] hover:border-[#D0AE89] transition-colors z-20 active:scale-95"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-5 sm:mb-6 pr-10">
              <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-mono text-[#D0AE89] tracking-widest uppercase mb-1.5">
                <span>{selectedProject.category}</span>
                <span>•</span>
                <span>{selectedProject.location}</span>
                <span>•</span>
                <span>{selectedProject.area}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#F5F0E8] font-light tracking-wide">
                {selectedProject.title}
              </h2>
              <p className="text-[#D0AE89] text-sm sm:text-base font-light tracking-wider mt-1">
                "{selectedProject.tagline}"
              </p>
            </div>

            {/* Main Interactive Gallery Viewer */}
            <div className="relative aspect-[16/9] overflow-hidden bg-[#0f1714] border border-[#D0AE89]/20 mb-3 sm:mb-4 rounded-sm">
              <img
                src={selectedProject.gallery[activeModalImage] || selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gallery Thumbnail Selector with horizontal scroll */}
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 -mx-2 px-2">
              {selectedProject.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveModalImage(idx)}
                  className={`relative w-20 sm:w-24 h-14 sm:h-16 rounded-sm overflow-hidden flex-shrink-0 border transition-all ${
                    activeModalImage === idx
                      ? 'border-[#D0AE89] ring-1 ring-[#D0AE89]'
                      : 'border-[#D0AE89]/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Narrative & Specifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 py-5 sm:py-6 border-t border-b border-[#D0AE89]/15">
              <div className="md:col-span-2">
                <h4 className="text-[11px] sm:text-xs font-mono tracking-widest text-[#D0AE89] uppercase mb-2 sm:mb-3">
                  Architectural Narrative & Site Context
                </h4>
                <p className="text-xs sm:text-sm md:text-base text-[#F5F0E8]/85 font-light leading-relaxed mb-5 whitespace-pre-line">
                  {selectedProject.description}
                </p>

                <h4 className="text-[11px] sm:text-xs font-mono tracking-widest text-[#D0AE89] uppercase mb-2.5">
                  Tactile Material Palette
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedProject.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-[#192420] border border-[#D0AE89]/20 text-[11px] font-mono text-[#F5F0E8] rounded-sm"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Highlights */}
              <div className="bg-[#192420] p-4 sm:p-6 border border-[#D0AE89]/20 rounded-sm">
                <h4 className="text-[11px] sm:text-xs font-mono tracking-widest text-[#D0AE89] uppercase mb-3 sm:mb-4">
                  Engineering & Performance
                </h4>
                <div className="space-y-3 sm:space-y-4">
                  {selectedProject.highlights.map((item, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-[9px] sm:text-[10px] font-mono text-[#cfc8bc]/60 uppercase">
                        {item.label}
                      </span>
                      <span className="text-xs font-medium text-[#F5F0E8] mt-0.5">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <span className="text-[10px] sm:text-xs text-[#cfc8bc]/60 font-mono text-center sm:text-left">
                Ref: ARCUBE-LK-{selectedProject.year}-{selectedProject.id.toUpperCase()}
              </span>
              <button
                onClick={() => {
                  closeProjectModal();
                  onOpenConsultation();
                }}
                className="w-full sm:w-auto px-6 py-3 bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-xs font-medium uppercase tracking-[0.18em] transition-all rounded-sm shadow-md text-center"
              >
                Inquire About a Similar Residence
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
