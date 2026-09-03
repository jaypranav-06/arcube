import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Upload } from 'lucide-react';

export default function ConsultationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    typology: 'Penthouse (Colombo)',
    location: '',
    sqft: '',
    budget: '',
    timeline: 'Within 6 Months',
    elements: [],
    name: '',
    email: '',
    phone: '',
    atelier: 'Colombo 07 (Barnes Place)',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const elementOptions = [
    'Custom Teak Cabinets & Furniture',
    'Cool Cut-Cement Wall Plaster',
    'Warm Cove Lighting & Dimming',
    'Quiet Sound Insulation',
    'Courtyard Garden & Greenery',
    'Natural Stone Bathroom & Vanity'
  ];

  const toggleElement = (item) => {
    if (formData.elements.includes(item)) {
      setFormData({
        ...formData,
        elements: formData.elements.filter((e) => e !== item)
      });
    } else {
      setFormData({
        ...formData,
        elements: [...formData.elements, item]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetModal = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#192420]/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#141e1a] border border-[#D0AE89]/30 rounded-sm shadow-2xl p-5 sm:p-8 lg:p-10 max-h-[94vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={resetModal}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-[#192420] border border-[#D0AE89]/20 text-[#cfc8bc] hover:text-[#F5F0E8] transition-colors active:scale-95"
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-5 sm:mb-8 pr-8">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <img 
                  src="/images/brand/arcube-emblem.png" 
                  alt="Arcube" 
                  className="h-6 sm:h-7 w-auto object-contain"
                />
                <span className="text-lg sm:text-xl font-light tracking-[0.22em] text-[#F5F0E8] lowercase">
                  arcube
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-sans text-[#D0AE89] tracking-wider uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Consultation // Step {step} of 3</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-[#F5F0E8] font-light tracking-wide">
                Book a design consultation
              </h2>
              {/* Step indicator bar */}
              <div className="w-full h-1 bg-[#192420] rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full bg-[#D0AE89] transition-all duration-500"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* STEP 1: Property Info */}
              {step === 1 && (
                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="text-xs font-sans tracking-wide text-[#D0AE89] uppercase block mb-1.5 font-medium">
                      Property type
                    </label>
                    <select
                      value={formData.typology}
                      onChange={(e) => setFormData({ ...formData, typology: e.target.value })}
                      className="w-full p-3 rounded-sm bg-[#192420] border border-[#D0AE89]/20 text-xs sm:text-sm text-[#F5F0E8] font-light focus:border-[#D0AE89] focus:outline-none"
                    >
                      <option>Apartment or Penthouse</option>
                      <option>Family House (Colombo)</option>
                      <option>Coastal Villa or Holiday Home</option>
                      <option>Country Home (Kandy / Nuwara Eliya)</option>
                      <option>Office, Cafe, or Boutique Hotel</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs font-sans tracking-wide text-[#D0AE89] uppercase block mb-1.5 font-medium">
                        Location / City
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Colombo 07, Colombo 03, Galle"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full p-3 rounded-sm bg-[#192420] border border-[#D0AE89]/20 text-xs sm:text-sm text-[#F5F0E8] placeholder-[#cfc8bc]/40 focus:border-[#D0AE89] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-sans tracking-wide text-[#D0AE89] uppercase block mb-1.5 font-medium">
                        Approximate size (sq ft)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2,500 sq ft (optional)"
                        value={formData.sqft}
                        onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                        className="w-full p-3 rounded-sm bg-[#192420] border border-[#D0AE89]/20 text-xs sm:text-sm text-[#F5F0E8] placeholder-[#cfc8bc]/40 focus:border-[#D0AE89] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-sans tracking-wide text-[#D0AE89] uppercase block mb-1.5 font-medium">
                      When would you like to start?
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full p-3 rounded-sm bg-[#192420] border border-[#D0AE89]/20 text-xs sm:text-sm text-[#F5F0E8] font-light focus:border-[#D0AE89] focus:outline-none"
                    >
                      <option>As soon as possible</option>
                      <option>Within 1 – 3 months</option>
                      <option>In 3 – 6 months</option>
                      <option>Just exploring ideas for now</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 2: Artisanal Elements */}
              {step === 2 && (
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="text-[10px] sm:text-xs font-sans tracking-widest text-[#D0AE89] uppercase block mb-2 sm:mb-3">
                      Select Desired Design Elements
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                      {elementOptions.map((elem) => (
                        <button
                          type="button"
                          key={elem}
                          onClick={() => toggleElement(elem)}
                          className={`p-3 rounded-sm text-left text-xs font-light transition-all border flex items-center justify-between ${
                            formData.elements.includes(elem)
                              ? 'bg-[#D0AE89]/15 border-[#D0AE89] text-[#D0AE89] font-medium'
                              : 'bg-[#192420]/60 border-[#D0AE89]/15 text-[#cfc8bc]/80 hover:border-[#D0AE89]/40'
                          }`}
                        >
                          <span>{elem}</span>
                          {formData.elements.includes(elem) && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D0AE89] flex-shrink-0 ml-2" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Document Upload Simulation */}
                  <div>
                    <label className="text-xs font-sans tracking-wide text-[#D0AE89] uppercase block mb-1.5 font-medium">
                      Floorplans or photos (optional)
                    </label>
                    <label className="border border-dashed border-[#D0AE89]/30 hover:border-[#D0AE89] rounded-sm p-4 sm:p-5 flex flex-col items-center justify-center cursor-pointer bg-[#192420]/40 hover:bg-[#192420] transition-colors">
                      <Upload className="w-5 h-5 text-[#D0AE89] mb-1.5" />
                      <span className="text-xs text-[#F5F0E8]/90 text-center font-sans">
                        Click or drag your floorplans or room photos here
                      </span>
                      <span className="text-[11px] font-sans text-[#cfc8bc]/50 mt-1">
                        Accepts JPG, PNG, PDF
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 3: Contact Details */}
              {step === 3 && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs font-sans tracking-wide text-[#D0AE89] uppercase block mb-1.5 font-medium">
                        Your full name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shanil Perera"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 rounded-sm bg-[#192420] border border-[#D0AE89]/20 text-xs sm:text-sm text-[#F5F0E8] focus:border-[#D0AE89] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-sans tracking-wide text-[#D0AE89] uppercase block mb-1.5 font-medium">
                        Email address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="s.perera@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 rounded-sm bg-[#192420] border border-[#D0AE89]/20 text-xs sm:text-sm text-[#F5F0E8] focus:border-[#D0AE89] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs font-sans tracking-wide text-[#D0AE89] uppercase block mb-1.5 font-medium">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+94 77 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 rounded-sm bg-[#192420] border border-[#D0AE89]/20 text-xs sm:text-sm text-[#F5F0E8] focus:border-[#D0AE89] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-sans tracking-wide text-[#D0AE89] uppercase block mb-1.5 font-medium">
                        Preferred meeting type
                      </label>
                      <select
                        value={formData.atelier}
                        onChange={(e) => setFormData({ ...formData, atelier: e.target.value })}
                        className="w-full p-3 rounded-sm bg-[#192420] border border-[#D0AE89]/20 text-xs sm:text-sm text-[#F5F0E8] font-light focus:border-[#D0AE89] focus:outline-none"
                      >
                        <option>At our Colombo 06 studio</option>
                        <option>On site at your property</option>
                        <option>Video call (Google Meet / Zoom)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-sans tracking-wide text-[#D0AE89] uppercase block mb-1.5 font-medium">
                      Tell us about your project (optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="What rooms would you like to design? Any specific ideas or deadlines?"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full p-3 rounded-sm bg-[#192420] border border-[#D0AE89]/20 text-xs sm:text-sm text-[#F5F0E8] placeholder-[#cfc8bc]/40 focus:border-[#D0AE89] focus:outline-none"
                    ></textarea>
                  </div>

                  <div className="p-3 sm:p-4 rounded-sm bg-[#192420]/80 border border-[#D0AE89]/10 flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#D0AE89] flex-shrink-0" />
                    <span className="text-[10px] sm:text-[11px] font-sans text-[#cfc8bc]/70">
                      Your information is confidential and will not be shared.
                    </span>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#D0AE89]/15 flex items-center justify-between gap-3">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2.5 rounded-sm text-xs font-sans uppercase tracking-wider text-[#cfc8bc] hover:text-[#F5F0E8] flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-3 rounded-sm bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-xs font-medium uppercase tracking-widest flex items-center gap-2 shadow-lg active:scale-[0.99]"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 sm:px-8 py-3.5 rounded-sm bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-xs font-medium uppercase tracking-widest shadow-xl flex items-center gap-2 active:scale-[0.99]"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Send Enquiry</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-6 sm:py-8 text-center animate-fade-in">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#D0AE89]/20 border border-[#D0AE89] flex items-center justify-center mx-auto mb-5 sm:mb-6">
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#D0AE89]" />
            </div>

            <span className="text-[10px] sm:text-xs font-sans text-[#D0AE89] tracking-widest uppercase block mb-2">
              Enquiry Received // Ref #ARC-LK-2026
            </span>

            <h3 className="text-2xl sm:text-3xl text-[#F5F0E8] font-light tracking-wide mb-3 sm:mb-4">
              Thank you, {formData.name || 'there'}
            </h3>

            <p className="text-xs sm:text-sm text-[#cfc8bc]/85 font-light leading-relaxed max-w-md mx-auto mb-6 sm:mb-8">
              A member of our team will review your project requirements and be in touch within one working day.
            </p>

            <button
              onClick={resetModal}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-sm bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-xs font-medium uppercase tracking-widest"
            >
              Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
