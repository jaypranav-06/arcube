/**
 * Subtle Generative Atelier Ambient Soundscape using Web Audio API
 * Generates an ethereal, warm acoustic resonance simulating a serene architectural atelier.
 */
class AtelierSoundscape {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.oscillators = [];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
  }

  start() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) return;

    // Master volume control with gentle fade in
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 3);

    // Warm low-pass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, this.ctx.currentTime);

    this.gainNode.connect(filter);
    filter.connect(this.ctx.destination);

    // Harmonic frequencies for spatial architectural warmth: 110Hz (A2), 164.8Hz (E3), 220Hz (A3)
    const freqs = [110, 164.81, 220, 329.63];

    this.oscillators = freqs.map((freq, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle LFO for breathing movement
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.08 + i * 0.03, this.ctx.currentTime);

      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(1.5, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      osc.connect(this.gainNode);
      osc.start();
      return { osc, lfo };
    });

    this.isPlaying = true;
  }

  stop() {
    if (!this.isPlaying || !this.gainNode) return;

    this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
    setTimeout(() => {
      this.oscillators.forEach(({ osc, lfo }) => {
        try {
          osc.stop();
          lfo.stop();
        } catch (e) {
          // ignore already stopped
        }
      });
      this.oscillators = [];
      this.isPlaying = false;
    }, 1500);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const soundscape = new AtelierSoundscape();

