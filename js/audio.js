/* ============================================================
   Hong Kong Memory Match — Audio Manager
   Procedural BGM (pentatonic) + SFX via Web Audio API
   Speech via Web Speech API
   ============================================================ */

class AudioManager {
  constructor() {
    this.ctx = null;
    this.bgmPlaying = false;
    this.bgmTimeout = null;
    this.masterGain = null;
    this.bgmGain = null;
    this.sfxGain = null;
  }

  /* ── Initialise AudioContext (must be triggered by user gesture) ── */
  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.5;
    this.masterGain.connect(this.ctx.destination);

    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.value = 0.25;
    this.bgmGain.connect(this.masterGain);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.6;
    this.sfxGain.connect(this.masterGain);
  }

  ensureContext() {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  /* ── Low-level note player ── */
  _playTone(freq, duration, type, gainNode, vol) {
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const t = this.ctx.currentTime;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.connect(g);
    g.connect(gainNode);
    osc.start(t);
    osc.stop(t + duration);
  }

  /* ═══════════════════════════════════════════
     Sound Effects
     ═══════════════════════════════════════════ */

  playFlip() {
    this.ensureContext();
    this._playTone(900, 0.08, 'sine', this.sfxGain, 0.12);
    setTimeout(() => this._playTone(1300, 0.06, 'sine', this.sfxGain, 0.08), 40);
  }

  playMatch() {
    this.ensureContext();
    this._playTone(523, 0.18, 'sine', this.sfxGain, 0.15);
    setTimeout(() => this._playTone(659, 0.18, 'sine', this.sfxGain, 0.15), 100);
    setTimeout(() => this._playTone(784, 0.25, 'sine', this.sfxGain, 0.15), 200);
    setTimeout(() => this._playTone(1047, 0.35, 'sine', this.sfxGain, 0.12), 320);
  }

  playWrong() {
    this.ensureContext();
    this._playTone(220, 0.25, 'sawtooth', this.sfxGain, 0.06);
    setTimeout(() => this._playTone(196, 0.3, 'sawtooth', this.sfxGain, 0.05), 120);
  }

  playWin() {
    this.ensureContext();
    const notes = [523, 587, 659, 784, 880, 1047, 1175, 1319];
    notes.forEach((f, i) => {
      setTimeout(() => this._playTone(f, 0.35, 'sine', this.sfxGain, 0.12), i * 120);
    });
  }

  playHint() {
    this.ensureContext();
    this._playTone(660, 0.15, 'triangle', this.sfxGain, 0.1);
    setTimeout(() => this._playTone(880, 0.2, 'triangle', this.sfxGain, 0.08), 120);
  }

  /* ═══════════════════════════════════════════
     BGM — Ambient Pentatonic Generator
     Chinese-flavoured pentatonic: C D E G A (宮商角徵羽)
     ═══════════════════════════════════════════ */

  startBGM() {
    if (this.bgmPlaying) return;
    this.ensureContext();
    this.bgmPlaying = true;

    // Two octaves of pentatonic
    const scale = [
      262, 294, 330, 392, 440,   // C4 D4 E4 G4 A4
      523, 587, 659, 784, 880    // C5 D5 E5 G5 A5
    ];

    const scheduleNote = () => {
      if (!this.bgmPlaying) return;

      const freq = scale[Math.floor(Math.random() * scale.length)];
      const dur = 1.2 + Math.random() * 2.5;
      this._playTone(freq, dur, 'sine', this.bgmGain, 0.06 + Math.random() * 0.04);

      // Occasional harmony
      if (Math.random() > 0.55) {
        const h = scale[Math.floor(Math.random() * scale.length)];
        this._playTone(h, dur * 0.6, 'triangle', this.bgmGain, 0.03);
      }

      // Occasional low drone
      if (Math.random() > 0.8) {
        this._playTone(131, dur * 1.5, 'sine', this.bgmGain, 0.025);
      }

      this.bgmTimeout = setTimeout(scheduleNote, 400 + Math.random() * 1200);
    };

    scheduleNote();
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimeout) {
      clearTimeout(this.bgmTimeout);
      this.bgmTimeout = null;
    }
  }

  toggleBGM() {
    if (this.bgmPlaying) {
      this.stopBGM();
    } else {
      this.startBGM();
    }
    return this.bgmPlaying;
  }

  /* ═══════════════════════════════════════════
     Text-to-Speech for Card Pronunciation
     ═══════════════════════════════════════════ */

  speak(text, lang) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === 'zh' ? 'zh-HK' : 'en-GB';
    u.rate = 0.85;
    u.volume = 0.8;
    window.speechSynthesis.speak(u);
  }
}
