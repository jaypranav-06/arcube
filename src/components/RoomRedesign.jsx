import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, Upload, ArrowRight, RefreshCw, CheckCircle2, ShieldCheck, Phone, User, MessageSquare, AlertCircle, Eye, SlidersHorizontal } from 'lucide-react';

const ROOM_TYPES = ['Living room', 'Bedroom', 'Kitchen', 'Dining room', 'Home office', 'Bathroom'];

const STYLES = [
  'Modern', 'Contemporary', 'Minimalist', 'Scandinavian', 'Industrial',
  'Mid-Century Modern', 'Bohemian', 'Farmhouse', 'Coastal', 'Traditional', 'Japandi', 'Art Deco'
];

const SAMPLE_ROOMS = [
  { id: 'living', label: 'Living Room', image: '/images/before-concrete.jpg', type: 'Living room', style: 'Minimalist' },
  { id: 'bedroom', label: 'Master Bedroom', image: '/images/master-sanctuary.jpg', type: 'Bedroom', style: 'Japandi' },
  { id: 'dining', label: 'Dining Pavilion', image: '/images/dining-pavilion.jpg', type: 'Dining room', style: 'Coastal' }
];

export default function RoomRedesign() {
  const [viewState, setViewState] = useState('select');
  const [selectedRoomType, setSelectedRoomType] = useState('Living room');
  const [selectedStyle, setSelectedStyle] = useState('Minimalist');
  const [extraNote, setExtraNote] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedBase64, setUploadedBase64] = useState(null);

  const [userDetails, setUserDetails] = useState(() => {
    try {
      const saved = localStorage.getItem('arcube_user_details') || sessionStorage.getItem('arcube_user_details');
      return saved ? JSON.parse(saved) : { name: '', phone: '' };
    } catch {
      return { name: '', phone: '' };
    }
  });

  const [generations, setGenerations] = useState(() => {
    try {
      const saved = localStorage.getItem('arcube_generations') || sessionStorage.getItem('arcube_generations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeGenerationIndex, setActiveGenerationIndex] = useState(0);
  const [preferredDesignIndex, setPreferredDesignIndex] = useState(0);
  const [contactMessage, setContactMessage] = useState('I like this redesign — can we talk about getting this done?');
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sliderPos, setSliderPos] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const sliderContainerRef = useRef(null);

  const saveUserDetails = (details) => {
    setUserDetails(details);
    try {
      sessionStorage.setItem('arcube_user_details', JSON.stringify(details));
    } catch {}
  };

  const saveGenerations = (gens) => {
    setGenerations(gens);
    try {
      sessionStorage.setItem('arcube_generations', JSON.stringify(gens));
    } catch {}
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
      setUploadedBase64(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const loadSampleRoom = (sample) => {
    setUploadedImage(sample.image);
    setUploadedBase64(sample.image);
    setSelectedRoomType(sample.type);
    setSelectedStyle(sample.style);
  };

  const handleInitiateRedesign = () => {
    if (!uploadedBase64) {
      alert('Please upload a photo of your room or select a sample.');
      return;
    }
    if (generations.length >= 2) {
      setViewState('blocked');
      return;
    }
    if (generations.length === 0 && (!userDetails.name.trim() || !userDetails.phone.trim())) {
      setViewState('gate');
    } else {
      executeGeneration();
    }
  };

  const handleGateSubmit = (e) => {
    e.preventDefault();
    if (!userDetails.name.trim() || !userDetails.phone.trim()) return;
    executeGeneration();
  };

  const executeGeneration = async () => {
    setViewState('generating');
    setErrorMessage('');

    try {
      const response = await fetch('/api/generate-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userDetails.name,
          contact: userDetails.phone,
          room_type: selectedRoomType,
          style: selectedStyle,
          extra_note: extraNote,
          image: uploadedBase64
        })
      });

      const data = await response.json();

      if (response.status === 429 || data.blocked) {
        setViewState('blocked');
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Generation failed. Please try again.');
      }

      const newGen = {
        id: Date.now(),
        image: data.image,
        originalImage: uploadedImage,
        roomType: selectedRoomType,
        style: selectedStyle,
        note: extraNote,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const updatedGens = [...generations, newGen];
      saveGenerations(updatedGens);
      setActiveGenerationIndex(updatedGens.length - 1);
      setPreferredDesignIndex(updatedGens.length - 1);
      setViewState('result');

    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong. No attempt was counted against your limit.');
      setViewState('select');
    }
  };

  const updateSliderPosition = useCallback((clientX) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleSliderMove = useCallback((e) => {
    if (!isDraggingSlider) return;
    updateSliderPosition(e.clientX);
  }, [isDraggingSlider, updateSliderPosition]);

  const handleSliderTouch = useCallback((e) => {
    if (!isDraggingSlider) return;
    if (e && e.touches && e.touches[0]) {
      updateSliderPosition(e.touches[0].clientX);
    }
  }, [isDraggingSlider, updateSliderPosition]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const chosenDesign = generations[preferredDesignIndex] || generations[0];
    try {
      await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userDetails.name,
          phone: userDetails.phone,
          message: contactMessage,
          preferredImage: chosenDesign?.image,
          roomType: chosenDesign?.roomType,
          style: chosenDesign?.style
        })
      });
    } catch {}
    setIsContactSubmitted(true);
  };

  const currentGen = generations[activeGenerationIndex] || generations[0];

  // Derive current step for the visual flow tracker
  const getActiveStep = () => {
    if (viewState === 'generating') return 3;
    if (viewState === 'result') return 3;
    if (viewState === 'compare' || viewState === 'contact' || viewState === 'blocked') return 4;
    if (uploadedBase64) return 2;
    return 1;
  };

  const activeStep = getActiveStep();

  return (
    <section id="redesign" className="py-12 sm:py-20 lg:py-24 bg-[#141e1a] relative border-t border-b border-[#D0AE89]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-[#D0AE89]/15 gap-3">
          <div>
            <span className="text-xs font-medium text-[#D0AE89] tracking-[0.15em] uppercase block mb-1.5 font-sans">
              Free room preview tool
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-[#F5F0E8] font-display tracking-tight">
              See new ideas <span className="font-extralight text-[#D0AE89]">for your room</span>
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <div className="px-3 py-1.5 rounded-sm bg-[#192420] border border-[#D0AE89]/20 text-xs font-sans text-[#F5F0E8] flex items-center gap-2">
              <span className="text-xs text-[#cfc8bc]/70">Free previews:</span>
              <span className="text-[#D0AE89] font-medium">{generations.length} / 2 used</span>
            </div>
            {generations.length === 1 && viewState !== 'result' && (
              <button
                onClick={() => { setActiveGenerationIndex(0); setViewState('result'); }}
                className="px-3 py-1.5 rounded-sm border border-[#D0AE89]/50 text-[#D0AE89] hover:bg-[#D0AE89]/10 text-xs font-medium transition-all"
              >
                View design 1
              </button>
            )}
            {generations.length >= 2 && viewState !== 'compare' && (
              <button
                onClick={() => setViewState('compare')}
                className="px-3 py-1.5 rounded-sm border border-[#D0AE89] text-[#D0AE89] hover:bg-[#D0AE89] hover:text-[#192420] text-xs font-medium transition-all"
              >
                Compare both
              </button>
            )}
          </div>
        </div>

        {/* 4-Step Progress Tracker: Desktop only for clean mobile flow */}
        <div className="hidden md:grid md:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-10">
          {[
            { step: 1, title: 'Upload photo', desc: 'Picture of your room' },
            { step: 2, title: 'Pick style', desc: 'Room type and look' },
            { step: 3, title: 'See preview', desc: 'Instant redesign' },
            { step: 4, title: 'Talk to us', desc: 'Get expert advice' },
          ].map((item) => {
            const isCompleted = activeStep > item.step;
            const isCurrent = activeStep === item.step;
            return (
              <div
                key={item.step}
                className={`p-2.5 sm:p-3.5 rounded-sm border transition-all flex items-center gap-2.5 sm:gap-3 ${
                  isCurrent
                    ? 'border-[#D0AE89] bg-[#192420] shadow-[0_4px_16px_rgba(208,174,137,0.15)]'
                    : isCompleted
                    ? 'border-[#D0AE89]/40 bg-[#141e1a]'
                    : 'border-white/5 bg-[#141e1a]/40 opacity-60'
                }`}
              >
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-sans flex-shrink-0 transition-colors ${
                    isCurrent
                      ? 'bg-[#D0AE89] text-[#192420] font-semibold'
                      : isCompleted
                      ? 'bg-[#D0AE89]/20 text-[#D0AE89]'
                      : 'bg-white/5 text-[#cfc8bc]/50'
                  }`}
                >
                  {isCompleted ? '✓' : `0${item.step}`}
                </div>
                <div className="overflow-hidden">
                  <span className={`text-[9px] sm:text-[10px] font-sans uppercase block ${isCurrent ? 'text-[#D0AE89]' : 'text-[#cfc8bc]/50'}`}>
                    Step 0{item.step}
                  </span>
                  <div className="text-[11px] sm:text-xs text-[#F5F0E8] font-medium truncate">
                    {item.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-sm bg-red-900/20 border border-red-500/30 text-xs text-red-200 flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* VIEW 1: SELECT */}
        {viewState === 'select' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Upload */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans text-[#D0AE89] uppercase tracking-widest">
                  1 — Upload your room
                </span>
                {uploadedImage && (
                  <span className="text-[10px] font-sans text-emerald-400">● Photo loaded</span>
                )}
              </div>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className={`relative aspect-[4/3] rounded-sm border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden cursor-pointer ${
                  uploadedImage ? 'border-[#D0AE89] bg-[#192420]' : 'border-[#D0AE89]/30 hover:border-[#D0AE89] bg-[#192420]/70'
                }`}
              >
                {uploadedImage ? (
                  <>
                    <img src={uploadedImage} alt="Uploaded room" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#192420]/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3.5 py-1.5 rounded-sm bg-[#D0AE89] text-[#192420] text-xs font-medium uppercase tracking-wider">Change photo</span>
                    </div>
                  </>
                ) : (
                  <div className="p-6 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#141e1a] border border-[#D0AE89]/30 flex items-center justify-center text-[#D0AE89] mb-3">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-[#F5F0E8] font-light mb-1">Drag & drop your room photo here</p>
                    <span className="text-xs font-sans text-[#cfc8bc]/60 mb-3">or click to browse</span>
                    <span className="text-[10px] font-sans text-[#D0AE89]/80 px-2.5 py-1 rounded-sm bg-[#141e1a] border border-[#D0AE89]/20">
                      JPG, PNG or WebP
                    </span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handlePhotoSelect} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>

              <div>
                <span className="text-[10px] font-sans text-[#cfc8bc]/70 uppercase tracking-widest block mb-2">Or explore with a sample room:</span>
                <div className="grid grid-cols-3 gap-2">
                  {SAMPLE_ROOMS.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => loadSampleRoom(sample)}
                      className={`relative aspect-[4/3] rounded-sm overflow-hidden border transition-all ${
                        uploadedImage === sample.image ? 'border-[#D0AE89] ring-1 ring-[#D0AE89]' : 'border-white/10 opacity-70 hover:opacity-100 hover:border-[#D0AE89]/50'
                      }`}
                    >
                      <img src={sample.image} alt={sample.label} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-sans text-[#F5F0E8] truncate block">{sample.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-sans text-[#D0AE89] uppercase tracking-widest border-b border-[#D0AE89]/15 pb-2 block">
                2 — Choose room type & style
              </span>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-sans text-[#cfc8bc]/70 uppercase tracking-widest">Room type:</span>
                  <span className="text-xs font-sans text-[#D0AE89]">{selectedRoomType}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ROOM_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedRoomType(type)}
                      className={`px-3.5 py-2 text-xs font-light tracking-wide transition-all rounded-sm border ${
                        selectedRoomType === type
                          ? 'border-[#D0AE89] text-[#192420] bg-[#D0AE89] font-medium'
                          : 'border-[#D0AE89]/20 text-[#F5F0E8]/80 bg-[#192420]/80 hover:border-[#D0AE89]/50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-sans text-[#cfc8bc]/70 uppercase tracking-widest">Style:</span>
                  <span className="text-xs font-sans text-[#D0AE89]">{selectedStyle}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {STYLES.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setSelectedStyle(style)}
                      className={`px-3.5 py-2 text-xs font-light tracking-wide transition-all rounded-sm border ${
                        selectedStyle === style
                          ? 'border-[#D0AE89] text-[#192420] bg-[#D0AE89] font-medium'
                          : 'border-[#D0AE89]/20 text-[#F5F0E8]/80 bg-[#192420]/80 hover:border-[#D0AE89]/50'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-sans text-[#cfc8bc]/70 uppercase tracking-widest block mb-2">
                  Extra detail (optional):
                </label>
                <input
                  type="text"
                  maxLength={100}
                  placeholder="e.g. keep the existing sofa, add warm timber storage"
                  value={extraNote}
                  onChange={(e) => setExtraNote(e.target.value)}
                  className="w-full px-4 py-3 rounded-sm bg-[#192420] border border-[#D0AE89]/20 text-xs text-[#F5F0E8] placeholder-[#cfc8bc]/40 focus:border-[#D0AE89] focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#D0AE89]/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <span className="text-xs font-sans text-[#cfc8bc]/70 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  {generations.length === 0 ? 'Attempt 1 of 2 free' : 'Attempt 2 of 2 free'}
                </span>
                <button
                  onClick={handleInitiateRedesign}
                  disabled={!uploadedBase64}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-sm bg-[#D0AE89] hover:bg-[#c49e75] disabled:opacity-40 disabled:pointer-events-none text-[#192420] text-xs font-medium uppercase tracking-[0.18em] transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Redesign ({generations.length === 0 ? '1 of 2' : '2 of 2'})</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: DETAILS GATE */}
        {viewState === 'gate' && (
          <div className="max-w-xl mx-auto p-6 sm:p-10 rounded-sm bg-[#192420] border border-[#D0AE89]/30 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl text-[#F5F0E8] font-light tracking-wide mb-2">
                Where should we send your designs?
              </h3>
              <p className="text-xs sm:text-sm text-[#cfc8bc]/80 font-light leading-relaxed">
                Enter your details once to unlock your 2 free redesigns. We will never spam you.
              </p>
            </div>

            <form onSubmit={handleGateSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-sans tracking-widest text-[#D0AE89] uppercase block mb-1.5">Your Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#D0AE89] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shanil Perera"
                    value={userDetails.name}
                    onChange={(e) => saveUserDetails({ ...userDetails, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-sm bg-[#141e1a] border border-[#D0AE89]/20 text-xs text-[#F5F0E8] focus:border-[#D0AE89] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-sans tracking-widest text-[#D0AE89] uppercase block mb-1.5">Phone or WhatsApp</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#D0AE89] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+94 77 000 0000"
                    value={userDetails.phone}
                    onChange={(e) => saveUserDetails({ ...userDetails, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-sm bg-[#141e1a] border border-[#D0AE89]/20 text-xs text-[#F5F0E8] focus:border-[#D0AE89] focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 rounded-sm bg-[#141e1a] border border-[#D0AE89]/10 flex items-center gap-2.5 text-[10px] font-sans text-[#cfc8bc]/70">
                <ShieldCheck className="w-4 h-4 text-[#D0AE89] flex-shrink-0" />
                <span>Saved to your session — not asked again on your 2nd attempt.</span>
              </div>

              <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button type="button" onClick={() => setViewState('select')} className="text-xs font-sans text-[#cfc8bc] hover:text-[#F5F0E8] py-2.5 text-center">
                  ← Back
                </button>
                <button type="submit" className="w-full sm:w-auto px-6 py-3.5 rounded-sm bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-xs font-medium uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 shadow-lg">
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* VIEW 3: GENERATING */}
        {viewState === 'generating' && (
          <div className="max-w-xl mx-auto py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-[#192420] border-2 border-[#D0AE89] border-t-transparent animate-spin mx-auto mb-6"></div>
            <span className="text-[10px] font-sans text-[#D0AE89] uppercase tracking-widest block mb-2">
              {selectedRoomType} → {selectedStyle}
            </span>
            <h3 className="text-2xl sm:text-3xl text-[#F5F0E8] font-light tracking-wide mb-3">
              Generating your redesign...
            </h3>
            <p className="text-xs sm:text-sm text-[#cfc8bc]/75 font-light max-w-md mx-auto leading-relaxed">
              This usually takes 20–30 seconds. The room layout and perspective are preserved.
            </p>
          </div>
        )}

        {/* VIEW 4: RESULT */}
        {viewState === 'result' && currentGen && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D0AE89]/15">
              <div>
                <div className="flex items-center gap-2 text-xs font-sans text-[#D0AE89] mb-1">
                  <span>Attempt {activeGenerationIndex + 1} of 2</span>
                  <span>•</span>
                  <span>{currentGen.roomType}</span>
                  <span>•</span>
                  <span className="text-[#F5F0E8]">{currentGen.style}</span>
                </div>
                <h3 className="text-xl sm:text-2xl text-[#F5F0E8] font-light">Your Redesign</h3>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                {generations.length < 2 && (
                  <button
                    onClick={() => setViewState('select')}
                    className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-sm border border-[#D0AE89]/40 text-[#D0AE89] hover:bg-[#D0AE89]/10 text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Try another style (1 left)</span>
                  </button>
                )}
                {generations.length === 2 && (
                  <button
                    onClick={() => setViewState('compare')}
                    className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-sm border border-[#D0AE89] text-[#D0AE89] hover:bg-[#D0AE89] hover:text-[#192420] text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-1.5"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Compare both designs</span>
                  </button>
                )}
                <button
                  onClick={() => { setPreferredDesignIndex(activeGenerationIndex); setViewState('contact'); }}
                  className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-sm bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Contact us about this design</span>
                </button>
              </div>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div
                ref={sliderContainerRef}
                onMouseDown={() => setIsDraggingSlider(true)}
                onMouseUp={() => setIsDraggingSlider(false)}
                onMouseLeave={() => setIsDraggingSlider(false)}
                onMouseMove={handleSliderMove}
                onTouchStart={() => setIsDraggingSlider(true)}
                onTouchEnd={() => setIsDraggingSlider(false)}
                onTouchMove={handleSliderTouch}
                className="relative aspect-[4/3] sm:aspect-[16/9] w-full select-none overflow-hidden rounded-sm border border-[#D0AE89]/20 shadow-2xl cursor-ew-resize touch-none"
              >
                <img src={currentGen.image} alt="Redesigned Room" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                <div
                  className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                  style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
                >
                  <img src={currentGen.originalImage} alt="Original Room" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                </div>
                <div className="absolute top-0 bottom-0 w-px bg-[#D0AE89] pointer-events-none" style={{ left: `${sliderPos}%` }}>
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#192420] border border-[#D0AE89] flex items-center justify-center shadow-xl">
                    <div className="flex items-center gap-0.5">
                      <span className="w-0.5 h-2.5 bg-[#D0AE89]"></span>
                      <span className="w-0.5 h-2.5 bg-[#D0AE89]"></span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-[#192420]/90 backdrop-blur-md border border-white/10 text-[10px] font-sans text-[#F5F0E8] uppercase pointer-events-none rounded-sm">Before</div>
                <div className="absolute top-3 right-3 z-20 px-2.5 py-1 bg-[#192420]/90 backdrop-blur-md border border-[#D0AE89]/40 text-[10px] font-sans text-[#D0AE89] uppercase pointer-events-none rounded-sm">After</div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 bg-[#192420]/90 backdrop-blur-md border border-white/10 text-[10px] font-sans text-[#cfc8bc] pointer-events-none rounded-sm">
                  {Math.round(sliderPos)}% • Drag to compare
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: COMPARE */}
        {viewState === 'compare' && generations.length >= 2 && (
          <div className="space-y-8">
            <div className="text-center max-w-xl mx-auto">
              <h3 className="text-2xl sm:text-3xl text-[#F5F0E8] font-light tracking-wide mb-2">Which design do you prefer?</h3>
              <p className="text-xs sm:text-sm text-[#cfc8bc]/80 font-light">Select one — it will be attached to your enquiry automatically.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {generations.map((gen, idx) => (
                <div
                  key={gen.id}
                  onClick={() => setPreferredDesignIndex(idx)}
                  className={`relative p-5 rounded-sm bg-[#192420] border transition-all cursor-pointer flex flex-col justify-between group ${
                    preferredDesignIndex === idx ? 'border-[#D0AE89] ring-2 ring-[#D0AE89]/50 shadow-2xl' : 'border-[#D0AE89]/20 hover:border-[#D0AE89]/60'
                  }`}
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[#141e1a] mb-4">
                      <img src={gen.image} alt={`Option ${idx + 1}`} className="w-full h-full object-cover" />
                      {preferredDesignIndex === idx && (
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-sm bg-[#D0AE89] text-[#192420] text-xs font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Selected</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs font-sans text-[#cfc8bc]/70 mb-1">
                      <span className="text-[#D0AE89]">Design 0{idx + 1}</span>
                      <span>{gen.roomType}</span>
                    </div>
                    <h4 className="text-lg text-[#F5F0E8] font-light mb-1">{gen.style}</h4>
                  </div>
                  <div className="pt-4 border-t border-[#D0AE89]/10 mt-4 flex items-center justify-between">
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveGenerationIndex(idx); setViewState('result'); }}
                      className="text-xs font-sans text-[#cfc8bc] hover:text-[#D0AE89] flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View slider</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setPreferredDesignIndex(idx); setViewState('contact'); }}
                      className="px-4 py-2 rounded-sm bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-xs font-medium uppercase tracking-wider"
                    >
                      Choose this →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setViewState('contact')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-xs font-medium uppercase tracking-[0.18em] shadow-xl"
              >
                Continue with Design 0{preferredDesignIndex + 1} →
              </button>
            </div>
          </div>
        )}

        {/* VIEW 6: CONTACT */}
        {viewState === 'contact' && (
          <div className="max-w-2xl mx-auto p-5 sm:p-10 rounded-sm bg-[#192420] border border-[#D0AE89]/30 shadow-2xl">
            {!isContactSubmitted ? (
              <>
                <div className="mb-6 pb-6 border-b border-[#D0AE89]/15">
                  <h3 className="text-2xl sm:text-3xl text-[#F5F0E8] font-light tracking-wide mb-2">Talk to our team</h3>
                  <p className="text-xs sm:text-sm text-[#cfc8bc]/80 font-light">Your preferred redesign will be attached automatically.</p>
                </div>

                {generations[preferredDesignIndex] && (
                  <div className="mb-6 p-3.5 rounded-sm bg-[#141e1a] border border-[#D0AE89]/20 flex items-center gap-3 sm:gap-4">
                    <img src={generations[preferredDesignIndex].image} alt="Selected design" className="w-16 sm:w-20 h-12 sm:h-14 object-cover rounded-sm border border-[#D0AE89]/30 flex-shrink-0" />
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-sans text-[#D0AE89] uppercase block">Attached design</span>
                      <div className="text-xs text-[#F5F0E8] font-medium truncate">
                        {generations[preferredDesignIndex].roomType} — {generations[preferredDesignIndex].style}
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-sans tracking-widest text-[#D0AE89] uppercase block mb-1.5">Your Name</label>
                      <input
                        type="text"
                        required
                        value={userDetails.name}
                        onChange={(e) => saveUserDetails({ ...userDetails, name: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-sm bg-[#141e1a] border border-[#D0AE89]/20 text-xs text-[#F5F0E8] focus:border-[#D0AE89] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-sans tracking-widest text-[#D0AE89] uppercase block mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={userDetails.phone}
                        onChange={(e) => saveUserDetails({ ...userDetails, phone: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-sm bg-[#141e1a] border border-[#D0AE89]/20 text-xs text-[#F5F0E8] focus:border-[#D0AE89] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-sans tracking-widest text-[#D0AE89] uppercase block mb-1.5">Message</label>
                    <textarea
                      rows={3}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-sm bg-[#141e1a] border border-[#D0AE89]/20 text-xs text-[#F5F0E8] focus:border-[#D0AE89] focus:outline-none"
                    ></textarea>
                  </div>

                  <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <button type="button" onClick={() => setViewState(generations.length >= 2 ? 'compare' : 'result')} className="text-xs font-sans text-[#cfc8bc] hover:text-[#F5F0E8] py-2 text-center">
                      ← Back
                    </button>
                    <button type="submit" className="w-full sm:w-auto px-6 py-3.5 rounded-sm bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-xs font-medium uppercase tracking-[0.18em] transition-all shadow-lg flex items-center justify-center gap-2">
                      <span>Send Enquiry</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-[#D0AE89]/20 border border-[#D0AE89] flex items-center justify-center mx-auto mb-4 text-[#D0AE89]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl text-[#F5F0E8] font-light mb-2">Enquiry Received</h3>
                <p className="text-xs text-[#cfc8bc]/85 font-light leading-relaxed max-w-md mx-auto mb-6">
                  Thank you, {userDetails.name}. We will be in touch within one business day.
                </p>
                <button
                  onClick={() => setViewState('result')}
                  className="px-6 py-2.5 rounded-sm border border-[#D0AE89] text-[#D0AE89] hover:bg-[#D0AE89] hover:text-[#192420] text-xs font-medium uppercase tracking-wider"
                >
                  Back to Redesign
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 7: BLOCKED */}
        {viewState === 'blocked' && (
          <div className="max-w-xl mx-auto p-6 sm:p-10 rounded-sm bg-[#192420] border border-[#D0AE89]/40 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-[#D0AE89]/10 border border-[#D0AE89]/30 flex items-center justify-center mx-auto mb-4 text-[#D0AE89]">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-sans text-[#D0AE89] uppercase tracking-widest block mb-2">2 of 2 free designs used</span>
            <h3 className="text-2xl sm:text-3xl text-[#F5F0E8] font-light tracking-wide mb-3">Ready to bring your vision to life?</h3>
            <p className="text-xs sm:text-sm text-[#cfc8bc]/80 font-light leading-relaxed mb-6">
              You've used both free redesigns. Talk to our team to take the next step.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {generations.length >= 2 && (
                <button
                  onClick={() => setViewState('compare')}
                  className="w-full sm:w-auto px-5 py-3 rounded-sm border border-[#D0AE89] text-[#D0AE89] hover:bg-[#D0AE89] hover:text-[#192420] text-xs font-medium uppercase tracking-wider transition-all"
                >
                  Compare My 2 Designs
                </button>
              )}
              <button
                onClick={() => setViewState('contact')}
                className="w-full sm:w-auto px-6 py-3 rounded-sm bg-[#D0AE89] hover:bg-[#c49e75] text-[#192420] text-xs font-medium uppercase tracking-wider shadow-lg transition-all"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
