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
   * Sirene médica de emergência de alta fidelidade (100% eletrônica, autêntica e tática)
   * Sequência clínica: Bipe duplo rápido de alta frequência (Crash-Cart DEA) seguido por
   * sirene modulada de telemetria hospitalar (988Hz <-> 784Hz <-> 1046Hz).
   */
  playUrgentSiren() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;

      // 1. PRIMEIRO BIPE DE ALARME DE EMERGÊNCIA (988Hz - B5 com rampa harmônica)
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(987.77, now);
      osc1.frequency.exponentialRampToValueAtTime(1174.66, now + 0.11);
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.22, now + 0.015);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.13);

      // 2. SEGUNDO BIPE RÁPIDO DE EMERGÊNCIA (180ms depois)
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(987.77, now + 0.18);
      osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.29);
      gain2.gain.setValueAtTime(0, now + 0.18);
      gain2.gain.linearRampToValueAtTime(0.24, now + 0.195);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.30);
      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);
      osc2.start(now + 0.18);
      osc2.stop(now + 0.31);

      // 3. SIRENE HOSPITALAR MODULADA E RESSONANTE (Alternância médica 784Hz <-> 1046Hz)
      const tones = [
        { freq: 1046.50, start: 0.36, dur: 0.14 }, // C6
        { freq: 783.99,  start: 0.50, dur: 0.14 }, // G5
        { freq: 1046.50, start: 0.64, dur: 0.14 }, // C6
        { freq: 880.00,  start: 0.78, dur: 0.22 }  // A5 com cauda de ressonância
      ];

      tones.forEach(t => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(t.freq, now + t.start);
        gain.gain.setValueAtTime(0, now + t.start);
        gain.gain.linearRampToValueAtTime(0.18, now + t.start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t.start + t.dur);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + t.start);
        osc.stop(now + t.start + t.dur + 0.01);
      });
    } catch (e) {}
  }

  /**
   * Batimento cardíaco de telemetria médica (Lub-Dub do monitor hospitalar)
   */
  playHeartbeatPulse() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;

      // Primeiro tom do batimento: Lub (grave suave 60Hz)
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(75, now);
      osc1.frequency.exponentialRampToValueAtTime(45, now + 0.07);
      gain1.gain.setValueAtTime(0.22, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.075);

      // Segundo tom do batimento: Dub (95Hz, 110ms depois)
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(105, now + 0.11);
      osc2.frequency.exponentialRampToValueAtTime(55, now + 0.19);
      gain2.gain.setValueAtTime(0.18, now + 0.11);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.19);
      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);
      osc2.start(now + 0.11);
      osc2.stop(now + 0.20);
    } catch (e) {}
  }

  /**
   * Rádio walkie-talkie da equipe biomédica (Squelch + bipe de transmissão)
   */
  playRadioComm() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;

      // Bipe agudo inicial de rádio VHF (1180Hz)
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1180, now);
      osc.frequency.setValueAtTime(1420, now + 0.04);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.095);

      // Chiado tático característico de rádio (micro noise burst)
      const bufferSize = this.audioCtx.sampleRate * 0.06;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.04;
      }
      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = this.audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.05, now + 0.09);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      noise.connect(noiseGain);
      noiseGain.connect(this.audioCtx.destination);
      noise.start(now + 0.09);
    } catch (e) {}
  }

  /**
   * Ping de sonar / radar de navegação hospitalar (Fusam Maps)
   */
  playRadarScan() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1320, now);
      osc.frequency.exponentialRampToValueAtTime(1100, now + 0.25);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.29);
    } catch (e) {}
  }

  /**
   * Despacho de chamado em tempo real (Whoosh tecnológico + confirmação de bloqueio)
   */
  playDispatchWhoosh() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;

      // Sweep ascendente
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(260, now);
      osc1.frequency.exponentialRampToValueAtTime(1240, now + 0.15);
      gain1.gain.setValueAtTime(0.02, now);
      gain1.gain.linearRampToValueAtTime(0.12, now + 0.10);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.19);

      // Acorde estelar de bloqueio
      [784, 1046.5, 1318.5].forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + 0.16 + idx * 0.03);
        gain.gain.setValueAtTime(0.08, now + 0.16 + idx * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35 + idx * 0.03);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + 0.16 + idx * 0.03);
        osc.stop(now + 0.40);
      });
    } catch (e) {}
  }

  /**
   * Micro-tick tátil de alta fidelidade para interações em cards e botões
   */
  playMicroTick() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1600, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.012);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.014);
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

  /**
   * Som biomédico distintivo e com diversidade ao selecionar equipamentos (Presets ou Dropdown)
   * Varia a assinatura sonora conforme o tipo de aparelho (Ventilador, Desfibrilador, O2, Maca, Monitor)
   */
  playEquipmentSelect(category = 'general') {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;

      if (category === 'ventilator') {
        // Ventilador Pulmonar: som fluido de fluxo com rampa dupla
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.16);
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.17);
      } else if (category === 'defibrillator') {
        // Desfibrilador: carga rápida de capacitor com chirp ascendente de alta energia
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.12);
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.09, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (category === 'oxygen') {
        // Oxigênio medicinal: som suave de pressurização pneumática
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.14);
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.10, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (category === 'stretcher') {
        // Maca hospitalar / Mecânica: trava mecânica de segurança tátil (dois cliques rápidos)
        [0, 0.045].forEach(delay => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(320, now + delay);
          osc.frequency.exponentialRampToValueAtTime(120, now + delay + 0.035);
          gain.gain.setValueAtTime(0.12, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.035);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.04);
        });
      } else {
        // Padrão Geral: bipe digital nítido estilo scanner biomédico hospitalar
        const osc1 = this.audioCtx.createOscillator();
        const gain1 = this.audioCtx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(587.33, now);
        osc1.frequency.exponentialRampToValueAtTime(880, now + 0.045);
        gain1.gain.setValueAtTime(0, now);
        gain1.gain.linearRampToValueAtTime(0.11, now + 0.01);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc1.connect(gain1);
        gain1.connect(this.audioCtx.destination);
        osc1.start(now);
        osc1.stop(now + 0.055);

        const osc2 = this.audioCtx.createOscillator();
        const gain2 = this.audioCtx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(1174.66, now + 0.04);
        osc2.frequency.exponentialRampToValueAtTime(1480, now + 0.12);
        gain2.gain.setValueAtTime(0, now + 0.04);
        gain2.gain.linearRampToValueAtTime(0.13, now + 0.05);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc2.connect(gain2);
        gain2.connect(this.audioCtx.destination);
        osc2.start(now + 0.04);
        osc2.stop(now + 0.16);
      }
    } catch (e) {}
  }

  /**
   * Som de avanço de etapa no rastreador (Tracer Progress Chime)
   */
  playStepAdvance() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      [
        { freq: 440, time: 0, dur: 0.07 },     // A4
        { freq: 554.37, time: 0.05, dur: 0.08 }, // C#5
        { freq: 659.25, time: 0.10, dur: 0.12 }  // E5
      ].forEach(t => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(t.freq, now + t.time);
        gain.gain.setValueAtTime(0.08, now + t.time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t.time + t.dur);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + t.time);
        osc.stop(now + t.time + t.dur);
      });
    } catch (e) {}
  }

  /**
   * Som de retrocesso de etapa no rastreador
   */
  playStepRegress() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      [
        { freq: 659.25, time: 0, dur: 0.06 },
        { freq: 554.37, time: 0.04, dur: 0.06 },
        { freq: 440, time: 0.08, dur: 0.09 }
      ].forEach(t => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(t.freq, now + t.time);
        gain.gain.setValueAtTime(0.06, now + t.time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t.time + t.dur);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + t.time);
        osc.stop(now + t.time + t.dur);
      });
    } catch (e) {}
  }

  /**
   * Som de nota técnica adicionada
   */
  playNoteAdded() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.04);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.045);
    } catch (e) {}
  }

  /**
   * Efeito sonoro comemorativo de Confetes (Passo Final / Equipamento 100% Liberado)
   * Fanfarra brilhante com pop de celebração e arpeggio triunfante
   */
  playConfettiCelebration() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;

      // 1. Pop inicial de confete (popper snap)
      const popOsc = this.audioCtx.createOscillator();
      const popGain = this.audioCtx.createGain();
      popOsc.type = 'sine';
      popOsc.frequency.setValueAtTime(320, now);
      popOsc.frequency.exponentialRampToValueAtTime(80, now + 0.06);
      popGain.gain.setValueAtTime(0.18, now);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      popOsc.connect(popGain);
      popGain.connect(this.audioCtx.destination);
      popOsc.start(now);
      popOsc.stop(now + 0.065);

      // 2. Cascata alegre de arpeggio triunfante (C5 -> E5 -> G5 -> C6 -> E6)
      const notes = [
        { freq: 523.25, time: 0.04, dur: 0.12 }, // C5
        { freq: 659.25, time: 0.10, dur: 0.14 }, // E5
        { freq: 783.99, time: 0.16, dur: 0.16 }, // G5
        { freq: 1046.50, time: 0.22, dur: 0.22 }, // C6
        { freq: 1318.51, time: 0.28, dur: 0.38 }  // E6 (agudo brilhante com cauda)
      ];

      notes.forEach(note => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.freq, now + note.time);

        gain.gain.setValueAtTime(0, now + note.time);
        gain.gain.linearRampToValueAtTime(0.12, now + note.time + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.time + note.dur);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + note.time);
        osc.stop(now + note.time + note.dur + 0.01);
      });

      // 3. Acorde ressonante de sustentação dourada ao fundo
      const chordFrequencies = [523.25, 659.25, 783.99, 1046.50];
      chordFrequencies.forEach(f => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + 0.32);
        gain.gain.setValueAtTime(0, now + 0.32);
        gain.gain.linearRampToValueAtTime(0.06, now + 0.36);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + 0.32);
        osc.stop(now + 0.90);
      });
    } catch (e) {}
  }
}

export const audioEngine = new FusamAudioEngine();
