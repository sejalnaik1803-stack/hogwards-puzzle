// A fully procedural, elegant sound synthesizer using the Web Audio API.
// No external assets are needed, ensuring 100% reliability and zero load latency.

class SoundSynth {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  // Realtime loop properties
  private ambienceType: "rain" | "fireplace" | "forest" | "celestial" | "none" = "none";
  private crackleInterval: any = null;
  private rainSource: AudioBufferSourceNode | null = null;
  private rainGainNode: GainNode | null = null;
  private windSource: AudioBufferSourceNode | null = null;
  private windGainNode: GainNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbience();
    } else if (this.ambienceType !== "none") {
      const prevType = this.ambienceType;
      this.ambienceType = "none";
      this.startAmbienceType(prevType);
    }
    return this.isMuted;
  }

  public getMuteStatus(): boolean {
    return this.isMuted;
  }

  // Soft wooden/paper click for dragging or touching pieces
  public playClick() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      // Noise click
      const bufferSize = ctx.sampleRate * 0.02; // 20ms of noise
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = buffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime(500, now);
      bandpass.Q.setValueAtTime(4, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      noiseNode.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(ctx.destination);

      noiseNode.start(now);

      // Low wooden tone
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);

      oscGain.gain.setValueAtTime(0.12, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      console.warn("AudioContext active early click guard", e);
    }
  }

  // Sweet wood snap when a piece aligns/snaps to grid
  public playSnap() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);

      this.playClick();
    } catch (e) {
      console.warn("AudioContext error", e);
    }
  }

  // Soft high-pitched organic bubble / bubblepop sound for hover
  public playBubble() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {
      // ignore
    }
  }

  // Whirl / Wind whoosh for scattering
  public playWhoosh() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      const duration = 0.5;

      // Soft noise sweep
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(100, now);
      filter.frequency.exponentialRampToValueAtTime(1200, now + duration * 0.5);
      filter.frequency.linearRampToValueAtTime(300, now + duration);
      filter.Q.setValueAtTime(2.5, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + duration * 0.3);
      gain.gain.linearRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch (e) {
      // ignore
    }
  }

  // Magic chime chord / chime sparkle on reshuffling or success
  public playSparkleChime() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      // Play a beautiful, sparkling pentatonic chord
      const freqs = [523.25, 659.25, 783.99, 880.00, 1046.50, 1318.51]; // C5, E5, G5, A5, C6, E6
      
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.value = freq;
        
        const startTime = now + idx * 0.05;
        const noteDuration = 0.7;
        
        gain.gain.setValueAtTime(0.0, now);
        gain.gain.setValueAtTime(0.0, startTime);
        gain.gain.linearRampToValueAtTime(0.05 - idx * 0.003, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + noteDuration);
        
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        vibrato.frequency.value = 14; // speed of sparkle
        vibratoGain.gain.value = 10; // depth in Hz
        
        vibrato.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        vibrato.start(startTime);
        osc.start(startTime);
        
        vibrato.stop(startTime + noteDuration);
        osc.stop(startTime + noteDuration);
      });
    } catch (e) {
      // ignore
    }
  }

  // Low frequency cozy, warm hum for ambient backing
  public playHum() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(110, now);
      
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(165, now);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(150, now);

      gain.gain.setValueAtTime(0.012, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);

      osc1.stop(now + 1.2);
      osc2.stop(now + 1.2);
    } catch (e) {
      // ignore
    }
  }

  /**
   * Starts a continuous, procedurally synthesized ambient loop matching the scene's spirit.
   */
  public startSceneAmbience(sceneIndex: number) {
    // Map sceneIndex modulo 4 to different relaxation audio streams
    // Index 0: Rain on Greenhouse, Index 1: Crackling Fireplace, Index 2: Forest Whistling Wind, Index 3: Cozy Celestial bells
    const cycle = sceneIndex % 4;
    const targets: ("rain" | "fireplace" | "forest" | "celestial")[] = ["rain", "fireplace", "forest", "celestial"];
    const targetType = targets[cycle];

    this.startAmbienceType(targetType);
  }

  public startAmbienceType(type: "rain" | "fireplace" | "forest" | "celestial") {
    if (this.isMuted) return;
    if (this.ambienceType === type) return; // already playing this beautiful ambience

    try {
      this.stopAmbience();
      this.ambienceType = type;

      const ctx = this.initCtx();
      const bufferSize = ctx.sampleRate * 2.5; // 2.5-second white noise seed
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      if (type === "rain") {
        // Soft, calming rainfall hiss using filtered white noise
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const biquad = ctx.createBiquadFilter();
        biquad.type = "bandpass";
        biquad.frequency.value = 850;
        biquad.Q.value = 1.2;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.035, ctx.currentTime);

        source.connect(biquad);
        biquad.connect(gainNode);
        gainNode.connect(ctx.destination);

        source.start(0);
        this.rainSource = source;
        this.rainGainNode = gainNode;
      } else if (type === "fireplace") {
        // Gentle rustly crackle hum with custom randomized interval pops
        this.crackleInterval = setInterval(() => {
          if (this.isMuted) return;
          this.triggerProceduralCrackle();
        }, 180);
      } else if (type === "forest") {
        // Slow, modulated whistling forest wind
        const wind = ctx.createOscillator();
        const windGain = ctx.createGain();

        wind.type = "triangle";
        wind.frequency.setValueAtTime(90, ctx.currentTime);

        // Low frequency oscillator (LFO) to swell the wind up and down
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.18, ctx.currentTime); // very slow swell (every 5-6 sec)
        lfoGain.gain.setValueAtTime(14, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 120;

        lfo.connect(lfoGain);
        lfoGain.connect(wind.frequency);

        wind.connect(filter);
        filter.connect(windGain);
        windGain.gain.setValueAtTime(0.015, ctx.currentTime);
        windGain.connect(ctx.destination);

        wind.start(0);
        lfo.start(0);

        this.windSource = wind as any; // save reference to dispose
        this.windGainNode = windGain;
      } else if (type === "celestial") {
        // Slow ambient sparkles every few seconds automatically
        this.crackleInterval = setInterval(() => {
          if (this.isMuted) return;
          this.playHum();
        }, 3000);
      }
    } catch (err) {
      console.warn("Unable to boot procedural audio loops", err);
    }
  }

  // Trigger a single dry fireplace wood-pop
  private triggerProceduralCrackle() {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Irregular chance of crisp sound
      if (Math.random() < 0.42) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1400 + Math.random() * 800, now);

        gain.gain.setValueAtTime(0.012, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.015);
      }
      // Low hum glow of coals
      if (Math.random() < 0.15) {
        const lowOsc = this.ctx.createOscillator();
        const lowGain = this.ctx.createGain();
        lowOsc.type = "triangle";
        lowOsc.frequency.setValueAtTime(55, now);

        lowGain.gain.setValueAtTime(0.02, now);
        lowGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

        lowOsc.connect(lowGain);
        lowGain.connect(this.ctx.destination);
        lowOsc.start(now);
        lowOsc.stop(now + 0.12);
      }
    } catch (e) {
      // guard
    }
  }

  public stopAmbience() {
    try {
      if (this.crackleInterval) {
        clearInterval(this.crackleInterval);
        this.crackleInterval = null;
      }
      if (this.rainSource) {
        this.rainSource.stop();
        this.rainSource.disconnect();
        this.rainSource = null;
      }
      if (this.rainGainNode) {
        this.rainGainNode.disconnect();
        this.rainGainNode = null;
      }
      if (this.windSource) {
        (this.windSource as any).stop();
        (this.windSource as any).disconnect();
        this.windSource = null;
      }
      if (this.windGainNode) {
        this.windGainNode.disconnect();
        this.windGainNode = null;
      }
      this.ambienceType = "none";
    } catch (e) {
      // ignore
    }
  }
}

export const sound = new SoundSynth();
export default sound;
