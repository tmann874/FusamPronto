/**
 * Fusam Pronto-Socorro - Web Audio API Sound System
 * Efeitos sonoros táteis e minimalistas: cliques de interface, sirene médica de urgência e notificações.
 */

class FusamAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleSound(forceState) {
    this.enabled = typeof forceState === 'boolean' ? forceState : !this.enabled;
    if (this.enabled) {
      this.playClick();
    }
    return this.enabled;
  }

  /**
   * Som de clique suave e tátil (estilo teclado iOS / switcher minimalista)
   */
  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      // Pitch drop rápido para criar o efeito "pop / click" analógico agradável
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.025);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.028);
    } catch (e) {
      // Audio fallback silencioso
    }
  }

  /**
   * Som suave ao trocar de aba ou selecionar filtro
   */
  playTabSwitch() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(720, now + 0.04);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch (e) {}
  }

  /**
   * Pequena sirene médica de urgência (tom duplo alternado suave e realista)
   */
  playUrgentSiren() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;

      // Ciclo 1: Tom agudo de alarme hospitalar (880Hz)
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now);
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.18);

      // Ciclo 2: Tom de resposta (698Hz - F5)
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(698, now + 0.18);
      gain2.gain.setValueAtTime(0, now + 0.18);
      gain2.gain.linearRampToValueAtTime(0.12, now + 0.20);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.36);
      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);
      osc2.start(now + 0.18);
      osc2.stop(now + 0.36);

      // Ciclo 3: Segundo pulso agudo para reforçar urgência
      const osc3 = this.audioCtx.createOscillator();
      const gain3 = this.audioCtx.createGain();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(987, now + 0.38);
      gain3.gain.setValueAtTime(0, now + 0.38);
      gain3.gain.linearRampToValueAtTime(0.15, now + 0.40);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc3.connect(gain3);
      gain3.connect(this.audioCtx.destination);
      osc3.start(now + 0.38);
      osc3.stop(now + 0.55);
    } catch (e) {}
  }

  /**
   * Notificação harmoniosa de sucesso / chamado despachado
   */
  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      [
        { freq: 523.25, time: 0, dur: 0.12 },     // C5
        { freq: 659.25, time: 0.08, dur: 0.14 },  // E5
        { freq: 783.99, time: 0.16, dur: 0.22 }   // G5
      ].forEach(tone => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(tone.freq, now + tone.time);
        gain.gain.setValueAtTime(0, now + tone.time);
        gain.gain.linearRampToValueAtTime(0.08, now + tone.time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + tone.time + tone.dur);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + tone.time);
        osc.stop(now + tone.time + tone.dur);
      });
    } catch (e) {}
  }
}

export const audioEngine = new FusamAudioEngine();
