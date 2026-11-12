/**
 * Fusam Pronto-Socorro - Bundle Unificado (Minimalist & Cool + Fusam Google Maps)
 * Suporta execução direta em file:/// e servidor HTTP.
 */

(function () {
  'use strict';

  /* =========================================================================
     1. BIBLIOTECA DE ÍCONES SVG MÉDICOS E UI
     ========================================================================= */
  const Icons = {
    ventilator: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M6 18H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8" rx="1"/><path d="M12 5V2"/><path d="M10 8h4"/><path d="M10 11h4"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/></svg>`,
    defibrillator: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><rect x="3" y="6" width="18" height="15" rx="3"/><path d="M9 2v4"/><path d="M15 2v4"/><path d="m13 10-3 5h4l-2 4"/><circle cx="7" cy="17" r="1"/><circle cx="17" cy="17" r="1"/></svg>`,
    monitor: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/><path d="M6 10h2l2-4 3 8 2-4h3"/></svg>`,
    infusion: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10h4"/><path d="M6 3v18"/><path d="M4 6h4"/><rect x="8" y="11" width="8" height="10" rx="1"/><path d="M12 14v4"/><path d="M10 16h4"/></svg>`,
    scanner: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><rect x="9" y="15" width="6" height="3" rx="1"/></svg>`,
    oxygen: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M7 10a5 5 0 0 1 10 0v8a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3v-8Z"/><path d="M10 4a2 2 0 0 1 4 0v2h-4V4Z"/><path d="M12 13v4"/><path d="M10 15h4"/></svg>`,
    stretcher: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M3 10h18"/><path d="M5 10v7"/><path d="M19 10v7"/><circle cx="5" cy="18" r="1.5"/><circle cx="19" cy="18" r="1.5"/><path d="M3 6h4l2 4"/><path d="M12 10v4"/><path d="M16 10v4"/></svg>`,
    electrical: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    plumbing: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
    hvac: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/><path d="m9 2 3 3-3 3"/><path d="m15 16-3 3 3 3"/></svg>`,
    general: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    siren: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M7 12a5 5 0 0 1 10 0v6H7v-6Z"/><path d="M5 20h14"/><path d="M12 2v3"/><path d="M4 4l2 2"/><path d="M20 4l-2 2"/><path d="M2 13h2"/><path d="M20 13h2"/></svg>`,
    alertTriangle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    clock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    inbox: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>`,
    plusCircle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
    send: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    checkCircle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    xCircle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    refreshCw: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>`,
    received: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    userCheck: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`,
    transit: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><circle cx="18.5" cy="17.5" r="2.5"/><circle cx="5.5" cy="17.5" r="2.5"/><path d="M10 17h4"/><path d="M5 17H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11v12h-2"/><path d="M14 9h4l4 4v2h-4"/></svg>`,
    wrench: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    calibration: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
    completed: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
    mapPin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    volume2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
    volumeX: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
    printer: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`
  };

  function getCategoryIcon(category) {
    const map = {
      'ventilator': Icons.ventilator,
      'defibrillator': Icons.defibrillator,
      'monitor': Icons.monitor,
      'infusion': Icons.infusion,
      'scanner': Icons.scanner,
      'oxygen': Icons.oxygen,
      'stretcher': Icons.stretcher,
      'electrical': Icons.electrical,
      'plumbing': Icons.plumbing,
      'hvac': Icons.hvac,
      'general': Icons.general
    };
    return map[category] || Icons.general;
  }

  function getPriorityMeta(priority) {
    switch (priority) {
      case 'critical':
        return {
          label: 'Crítico',
          badgeClass: 'critical',
          borderClass: 'card-border-critical',
          icon: Icons.siren,
          slaText: 'SLA: 15 min'
        };
      case 'high':
        return {
          label: 'Urgente',
          badgeClass: 'high',
          borderClass: 'card-border-high',
          icon: Icons.alertTriangle,
          slaText: 'SLA: 1h'
        };
      case 'medium':
        return {
          label: 'Médio',
          badgeClass: 'medium',
          borderClass: 'card-border-medium',
          icon: Icons.clock,
          slaText: 'SLA: 4h'
        };
      case 'low':
      default:
        return {
          label: 'Rotina',
          badgeClass: 'low',
          borderClass: 'card-border-low',
          icon: Icons.info,
          slaText: 'SLA: 24h'
        };
    }
  }

  /* =========================================================================
     2. EFEITOS SONOROS TÁTEIS & SIRENE MÉDICA (WEB AUDIO API)
     ========================================================================= */
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

    playClick() {
      if (!this.enabled) return;
      this.init();
      if (!this.audioCtx) return;

      try {
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.025);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.028);
      } catch (e) {}
    }

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

    playUrgentSiren() {
      if (!this.enabled) return;
      this.init();
      if (!this.audioCtx) return;

      try {
        const now = this.audioCtx.currentTime;

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

    playSuccess() {
      if (!this.enabled) return;
      this.init();
      if (!this.audioCtx) return;

      try {
        const now = this.audioCtx.currentTime;
        [
          { freq: 523.25, time: 0, dur: 0.12 },
          { freq: 659.25, time: 0.08, dur: 0.14 },
          { freq: 783.99, time: 0.16, dur: 0.22 }
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

  const audioEngine = new FusamAudioEngine();

  /* =========================================================================
     3. DADOS INICIAIS
     ========================================================================= */
  const INITIAL_TICKETS = [
    {
      id: "CH-8492",
      title: "Respirador Pulmonar UTI 03 com Falha de Pressão",
      category: "ventilator",
      equipmentName: "Ventilador Mecânico Mindray SV300",
      patrimony: "PAT-004812",
      department: "UTI Adulto - Leito 03",
      sectorLocation: "Bloco A - 2º Andar",
      priority: "critical",
      status: "in_transit",
      reporter: {
        name: "Dra. Camila Duarte",
        role: "Médica Intensivista",
        badge: "CRM 12948-SP",
        contact: "Ramal 2403"
      },
      technician: {
        name: "Eng. Marcos Teles",
        role: "Engenheiro Clínico",
        avatar: "👨‍🔬",
        badge: "CREA 58192-SP",
        phone: "(11) 98765-4321",
        eta: "4 minutos",
        currentLocation: "Corredor Central - Elevador Bloco A"
      },
      description: "Alarme contínuo de perda de pressão inspiratória máxima durante ventilação invasiva. Paciente temporariamente em ambu. Suporte vital urgente.",
      createdAt: "12/11/2026 17:32",
      slaMinutes: 15,
      estimatedMinutesRemaining: 8,
      timeline: [
        { step: "received", title: "Chamado Aberto", time: "17:32", description: "Classificação Código Vermelho." },
        { step: "assigned", title: "Especialista Alocado", time: "17:34", description: "Eng. Marcos Teles assumiu o chamado." },
        { step: "in_transit", title: "Técnico a Caminho", time: "17:37", description: "Deslocamento com kit de válvulas. ETA: 4 min." }
      ],
      technicalNotes: "Kit de calibração retirado da oficina biomédica."
    },
    {
      id: "CH-8490",
      title: "Desfibrilador da Sala Vermelha não carrega choque",
      category: "defibrillator",
      equipmentName: "Cardioversor Zoll R Series",
      patrimony: "PAT-003190",
      department: "Pronto-Socorro - Sala Vermelha",
      sectorLocation: "Térreo - Ala de Ressuscitação",
      priority: "critical",
      status: "in_repair",
      reporter: {
        name: "Enf. Rodrigo Albuquerque",
        role: "Enfermeiro Chefe",
        badge: "COREN 88123-SP",
        contact: "Ramal 1102"
      },
      technician: {
        name: "Téc. Juliana Rocha",
        role: "Técnica de Equipamentos",
        avatar: "👩‍🔧",
        badge: "CFT 44291-SP",
        phone: "(11) 97654-3210",
        eta: "No local",
        currentLocation: "Sala Vermelha - Box 01"
      },
      description: "Após teste de carga em 200J aparelho travou com mensagem 'Erro de Capacitor / Trocar Bateria'. Sala Vermelha requer DEA imediato.",
      createdAt: "12/11/2026 17:15",
      slaMinutes: 15,
      estimatedMinutesRemaining: 5,
      timeline: [
        { step: "received", title: "Chamado Recebido", time: "17:15", description: "Prioridade Código Vermelho." },
        { step: "assigned", title: "Técnica Designada", time: "17:17", description: "Téc. Juliana Rocha direcionada." },
        { step: "in_transit", title: "Deslocamento Rápido", time: "17:19", description: "Com módulo de bateria reserva." },
        { step: "in_repair", title: "Reparo em Andamento", time: "17:23", description: "Bateria secundária substituída; medindo curva de descarga." }
      ],
      technicalNotes: "Bateria interna apresentava sulfatação nos polos."
    },
    {
      id: "CH-8488",
      title: "Tomógrafo Computadorizado - Erro de Detector",
      category: "scanner",
      equipmentName: "Tomógrafo Philips 64 Canais",
      patrimony: "PAT-001004",
      department: "Centro de Diagnóstico por Imagem",
      sectorLocation: "Subsolo - Sala 01",
      priority: "high",
      status: "assigned",
      reporter: {
        name: "Dr. Marcelo Fagundes",
        role: "Médico Radiologista",
        badge: "CRM 94012-SP",
        contact: "Ramal 3010"
      },
      technician: {
        name: "Eng. Carlos Eduardo",
        role: "Especialista em Imagem",
        avatar: "👨‍💻",
        badge: "CREA 99201-SP",
        phone: "(11) 98112-2233",
        eta: "12 minutos",
        currentLocation: "Laboratório de Imagens"
      },
      description: "Gantry emite erro de comunicação óptica com os detectores ao iniciar scan com contraste. Fila de trauma aguardando.",
      createdAt: "12/11/2026 16:45",
      slaMinutes: 60,
      estimatedMinutesRemaining: 40,
      timeline: [
        { step: "received", title: "Chamado Registrado", time: "16:45", description: "Urgência Alta acionada." },
        { step: "assigned", title: "Especialista Alocado", time: "16:50", description: "Eng. Carlos Eduardo acionado." }
      ],
      technicalNotes: "Aguardando reinicialização do subsistema de slip ring."
    },
    {
      id: "CH-8485",
      title: "Vazamento em Saída de Oxigênio - Leito 12",
      category: "oxygen",
      equipmentName: "Régua de Gases / Fluxômetro",
      patrimony: "PAT-008912",
      department: "Pronto-Socorro - Sala Amarela",
      sectorLocation: "Térreo - Leito 12",
      priority: "high",
      status: "testing",
      reporter: {
        name: "Enfª Tatiane Meireles",
        role: "Enfermeira Assistencial",
        badge: "COREN 10239-SP",
        contact: "Ramal 1112"
      },
      technician: {
        name: "Téc. Geraldo Lima",
        role: "Técnico de Gases",
        avatar: "👨‍🏭",
        badge: "CFT 19284-SP",
        phone: "(11) 99444-5566",
        eta: "No local",
        currentLocation: "Sala Amarela - Leito 12"
      },
      description: "Escape de gás na válvula de engate rápido com perda de pressão.",
      createdAt: "12/11/2026 16:10",
      slaMinutes: 60,
      estimatedMinutesRemaining: 10,
      timeline: [
        { step: "received", title: "Chamado Aberto", time: "16:10", description: "Vazamento comunicado." },
        { step: "assigned", title: "Equipe Mobilizada", time: "16:12", description: "Téc. Geraldo Lima acionado." },
        { step: "in_transit", title: "No Setor", time: "16:18", description: "Chegada com manômetro digital." },
        { step: "in_repair", title: "Troca do Bloco", time: "16:25", description: "Substituição do O-ring." },
        { step: "testing", title: "Teste de Estanqueidade", time: "17:10", description: "Pressão estabilizada em 3,5 bar." }
      ],
      technicalNotes: "Estanqueidade verificada."
    },
    {
      id: "CH-8479",
      title: "Bomba de Infusão com Alarme Falso de Oclusão",
      category: "infusion",
      equipmentName: "Bomba de Infusão B.Braun",
      patrimony: "PAT-005671",
      department: "UTI Pediátrica",
      sectorLocation: "3º Andar - Box 04",
      priority: "medium",
      status: "completed",
      reporter: {
        name: "Dr. André Villas",
        role: "Pediatra",
        badge: "CRM 11094-SP",
        contact: "Ramal 3404"
      },
      technician: {
        name: "Téc. Juliana Rocha",
        role: "Técnica Biomédica",
        avatar: "👩‍🔧",
        badge: "CFT 44291-SP",
        phone: "(11) 97654-3210",
        eta: "Finalizado",
        currentLocation: "Oficina Biomédica"
      },
      description: "Bomba acusava oclusão indevida. Sensor óptico limpo e calibrado.",
      createdAt: "12/11/2026 14:20",
      slaMinutes: 240,
      estimatedMinutesRemaining: 0,
      timeline: [
        { step: "received", title: "Chamado Aberto", time: "14:20", description: "Equipamento em quarentena." },
        { step: "completed", title: "Equipamento Liberado", time: "16:05", description: "Calibração concluída e selo emitido." }
      ],
      technicalNotes: "Calibração válida por 12 meses."
    },
    {
      id: "CH-8472",
      title: "Maca de Transporte com Trava Emperrada",
      category: "stretcher",
      equipmentName: "Maca Hospitalar Stryker",
      patrimony: "PAT-009104",
      department: "Pronto-Socorro - Triagem",
      sectorLocation: "Recepção / Entrada",
      priority: "low",
      status: "received",
      reporter: {
        name: "Téc. Paulo Santos",
        role: "Triagem",
        badge: "COREN 77219-SP",
        contact: "Recepção"
      },
      technician: null,
      description: "Pedal de elevação travado na posição intermediária.",
      createdAt: "12/11/2026 17:01",
      slaMinutes: 1440,
      estimatedMinutesRemaining: 1400,
      timeline: [
        { step: "received", title: "Chamado Registrado", time: "17:01", description: "Aguardando alocação predial." }
      ],
      technicalNotes: "Pendente inspeção do pistão."
    }
  ];

  const INBOX_MESSAGES = [
    {
      id: "MSG-101",
      sender: "Engenharia Clínica",
      subject: "Aviso de Calibração Preventiva nos Eletrocardiógrafos",
      time: "Hoje às 15:00",
      priority: "medium",
      unread: false,
      content: "Recolhimento escalonado dos ECGs a partir das 19h para atualização de firmware e teste elétrico."
    },
    {
      id: "MSG-102",
      sender: "Diretoria Médica",
      subject: "Protocolo Código Vermelho: Prioridade em Suporte à Vida",
      time: "Hoje às 11:30",
      priority: "critical",
      unread: false,
      content: "Qualquer falha em respirador ou DEA deve ser registrada como Emergência Crítica (SLA < 15 min)."
    }
  ];

  const CATEGORIES_LIST = [
    { id: "ventilator", name: "Ventilador Pulmonar", icon: "ventilator", isLifeSupport: true },
    { id: "defibrillator", name: "Desfibrilador / DEA", icon: "defibrillator", isLifeSupport: true },
    { id: "monitor", name: "Monitor Multiparâmetros", icon: "monitor", isLifeSupport: true },
    { id: "infusion", name: "Bomba de Infusão", icon: "infusion", isLifeSupport: true },
    { id: "oxygen", name: "Rede de Oxigênio / Vácuo", icon: "oxygen", isLifeSupport: true },
    { id: "scanner", name: "Tomógrafo / Raio-X", icon: "scanner", isLifeSupport: false },
    { id: "stretcher", name: "Maca / Leito", icon: "stretcher", isLifeSupport: false },
    { id: "electrical", name: "Elétrica / No-Break", icon: "electrical", isLifeSupport: true },
    { id: "plumbing", name: "Hidráulica", icon: "plumbing", isLifeSupport: false },
    { id: "hvac", name: "Climatização", icon: "hvac", isLifeSupport: false },
    { id: "general", name: "Infraestrutura Geral", icon: "general", isLifeSupport: false }
  ];

  const DEPARTMENTS_LIST = [
    "Pronto-Socorro - Sala Vermelha (Emergência)",
    "Pronto-Socorro - Sala Amarela (Observação)",
    "Pronto-Socorro - Sala Verde (Atendimento)",
    "Pronto-Socorro - Triagem / Acolhimento",
    "UTI Adulto - Bloco A",
    "UTI Pediátrica - Bloco B",
    "Centro Cirúrgico Geral",
    "Centro de Diagnóstico por Imagem (CDI)",
    "Laboratório Clínico"
  ];

  /* =========================================================================
     4. MOTOR DE NAVEGAÇÃO GOOGLE MAPS STYLE (FUSAM MAPS)
     ========================================================================= */
  class GoogleStyleHospitalMap {
    constructor(canvasContainerId, options = {}) {
      this.container = typeof canvasContainerId === 'string' 
        ? document.getElementById(canvasContainerId) 
        : canvasContainerId;
      
      this.ticket = options.ticket || null;
      this.zoom = 1;
      this.panX = 0;
      this.panY = 0;
      this.isDragging = false;
      this.startX = 0;
      this.startY = 0;
      this.animFrameId = null;
      this.routeProgress = 0.58;
      this.isFloorPlan = false;
      
      this.routePoints = [
        { x: 110, y: 310 },
        { x: 210, y: 310 },
        { x: 210, y: 200 },
        { x: 310, y: 200 },
        { x: 390, y: 130 }
      ];

      this.init();
    }

    init() {
      if (!this.container) return;
      this.container.innerHTML = '';
      this.container.style.position = 'relative';
      this.container.style.overflow = 'hidden';
      this.container.style.borderRadius = '12px';
      this.container.style.userSelect = 'none';
      this.container.style.touchAction = 'none';

      this.canvas = document.createElement('canvas');
      this.canvas.className = 'w-full h-full block cursor-grab';
      this.canvas.style.display = 'block';
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
      this.container.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d');

      this.createMapControls();
      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.bindInteractions();
      this.updateRouteProgressFromStatus();
      this.startAnimationLoop();
    }

    resize() {
      if (!this.canvas || !this.container) return;
      const rect = this.container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      this.width = rect.width;
      this.height = rect.height || 260;
      
      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.ctx.scale(dpr, dpr);
      this.render();
    }

    updateRouteProgressFromStatus() {
      if (!this.ticket) return;
      switch (this.ticket.status) {
        case 'received':
          this.routeProgress = 0.05;
          break;
        case 'assigned':
          this.routeProgress = 0.15;
          break;
        case 'in_transit':
          this.routeProgress = 0.58;
          break;
        case 'in_repair':
        case 'testing':
        case 'completed':
          this.routeProgress = 0.98;
          break;
        default:
          this.routeProgress = 0.5;
      }
    }

    setTicket(ticket) {
      this.ticket = ticket;
      this.updateRouteProgressFromStatus();
      this.render();
    }

    createMapControls() {
      const controls = document.createElement('div');
      controls.className = 'absolute right-3 bottom-3 flex flex-col gap-1.5 z-20';
      controls.innerHTML = `
        <div class="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden flex flex-col">
          <button id="mapZoomIn" class="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold text-base transition-colors" title="Aproximar">+</button>
          <div class="w-full h-px bg-slate-200"></div>
          <button id="mapZoomOut" class="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold text-base transition-colors" title="Afastar">−</button>
        </div>
        <button id="mapRecenter" class="w-8 h-8 rounded-lg bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors" title="Centralizar">
          🎯
        </button>
      `;
      this.container.appendChild(controls);

      const modeBtn = document.createElement('div');
      modeBtn.className = 'absolute left-3 top-3 z-20 flex gap-1.5';
      modeBtn.innerHTML = `
        <button id="mapToggleFloor" class="bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-700 shadow-sm border border-slate-200 hover:border-cyan-500 transition-all flex items-center gap-1">
          <span>🏥</span> <span id="mapModeLabel">Planta Interna</span>
        </button>
      `;
      this.container.appendChild(modeBtn);

      this.etaBanner = document.createElement('div');
      this.etaBanner.className = 'absolute left-3 bottom-3 z-10 bg-slate-900/90 text-white backdrop-blur px-3 py-1.5 rounded-xl shadow-lg border border-slate-700 text-xs flex items-center gap-2 pointer-events-none max-w-[240px]';
      this.updateEtaBanner();
      this.container.appendChild(this.etaBanner);

      controls.querySelector('#mapZoomIn').onclick = (e) => {
        e.stopPropagation();
        this.zoomAt(1.25);
      };
      controls.querySelector('#mapZoomOut').onclick = (e) => {
        e.stopPropagation();
        this.zoomAt(0.8);
      };
      controls.querySelector('#mapRecenter').onclick = (e) => {
        e.stopPropagation();
        this.recenter();
      };
      modeBtn.querySelector('#mapToggleFloor').onclick = (e) => {
        e.stopPropagation();
        this.isFloorPlan = !this.isFloorPlan;
        const lbl = modeBtn.querySelector('#mapModeLabel');
        if (lbl) lbl.textContent = this.isFloorPlan ? 'Vista Campus' : 'Planta Interna';
        this.render();
      };
    }

    updateEtaBanner() {
      if (!this.etaBanner) return;
      const isDone = this.ticket?.status === 'completed';
      const eta = isDone ? 'Chegou' : (this.ticket?.technician?.eta || 'Em rota');
      const dest = this.ticket?.department || 'UTI Adulto';
      
      this.etaBanner.innerHTML = `
        <div class="w-2.5 h-2.5 rounded-full ${isDone ? 'bg-emerald-400' : 'bg-cyan-400 animate-ping'}"></div>
        <div class="truncate">
          <div class="font-bold text-[11px] leading-tight text-white">${isDone ? 'No local do chamado' : `Chegando em ${eta}`}</div>
          <div class="text-[10px] text-slate-300 truncate">Rumo a: ${dest}</div>
        </div>
      `;
    }

    zoomAt(factor) {
      this.zoom = Math.max(0.65, Math.min(2.5, this.zoom * factor));
      this.render();
    }

    recenter() {
      this.zoom = 1;
      this.panX = 0;
      this.panY = 0;
      this.render();
    }

    bindInteractions() {
      this.canvas.addEventListener('mousedown', (e) => {
        this.isDragging = true;
        this.startX = e.clientX - this.panX;
        this.startY = e.clientY - this.panY;
        this.canvas.style.cursor = 'grabbing';
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.isDragging) return;
        this.panX = e.clientX - this.startX;
        this.panY = e.clientY - this.startY;
        this.render();
      });

      window.addEventListener('mouseup', () => {
        if (this.isDragging) {
          this.isDragging = false;
          this.canvas.style.cursor = 'grab';
        }
      });

      this.canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          this.isDragging = true;
          this.startX = e.touches[0].clientX - this.panX;
          this.startY = e.touches[0].clientY - this.panY;
        }
      }, { passive: true });

      this.canvas.addEventListener('touchmove', (e) => {
        if (!this.isDragging || e.touches.length !== 1) return;
        this.panX = e.touches[0].clientX - this.startX;
        this.panY = e.touches[0].clientY - this.startY;
        this.render();
      }, { passive: true });

      this.canvas.addEventListener('touchend', () => {
        this.isDragging = false;
      });

      this.canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 1.15 : 0.88;
        this.zoomAt(delta);
      }, { passive: false });
    }

    startAnimationLoop() {
      let dashOffset = 0;
      const loop = () => {
        dashOffset += 0.45;
        this.dashOffset = dashOffset;
        this.render();
        this.animFrameId = requestAnimationFrame(loop);
      };
      loop();
    }

    destroy() {
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }
    }

    getPointAlongRoute(progress) {
      if (this.routePoints.length < 2) return { x: 100, y: 100 };
      
      let totalLen = 0;
      const segmentLens = [];
      for (let i = 0; i < this.routePoints.length - 1; i++) {
        const p1 = this.routePoints[i];
        const p2 = this.routePoints[i + 1];
        const len = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        segmentLens.push(len);
        totalLen += len;
      }

      let targetDist = Math.max(0, Math.min(1, progress)) * totalLen;
      let accumulated = 0;

      for (let i = 0; i < segmentLens.length; i++) {
        const segLen = segmentLens[i];
        if (accumulated + segLen >= targetDist || i === segmentLens.length - 1) {
          const segProgress = (targetDist - accumulated) / segLen;
          const p1 = this.routePoints[i];
          const p2 = this.routePoints[i + 1];
          return {
            x: p1.x + (p2.x - p1.x) * segProgress,
            y: p1.y + (p2.y - p1.y) * segProgress,
            angle: Math.atan2(p2.y - p1.y, p2.x - p1.x)
          };
        }
        accumulated += segLen;
      }
      return this.routePoints[this.routePoints.length - 1];
    }

    render() {
      if (!this.ctx || !this.width) return;
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;

      ctx.save();
      ctx.clearRect(0, 0, w, h);

      ctx.translate(w / 2 + this.panX, h / 2 + this.panY);
      ctx.scale(this.zoom, this.zoom);
      ctx.translate(-250, -220);

      this.drawTerrain(ctx);
      this.drawRoadsAndCorridors(ctx);
      this.drawHospitalBuildings(ctx);
      this.drawNavigationRoute(ctx);
      this.drawDestinationPin(ctx);
      this.drawTechnicianMarker(ctx);

      ctx.restore();
    }

    drawTerrain(ctx) {
      ctx.fillStyle = '#f4f3f0';
      ctx.fillRect(-200, -200, 900, 900);

      ctx.fillStyle = '#e5f3e5';
      this.roundRect(ctx, -50, -40, 160, 120, 16);
      ctx.fill();

      this.roundRect(ctx, 360, 260, 160, 140, 16);
      ctx.fill();

      const trees = [
        { x: -10, y: 0 }, { x: 40, y: 20 }, { x: 70, y: -10 },
        { x: 390, y: 300 }, { x: 440, y: 340 }, { x: 480, y: 290 }
      ];
      ctx.fillStyle = '#a8dab5';
      trees.forEach(t => {
        ctx.beginPath();
        ctx.arc(t.x, t.y, 6, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    drawRoadsAndCorridors(ctx) {
      ctx.save();
      ctx.strokeStyle = '#dadce0';
      ctx.lineWidth = 26;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(-150, 200);
      ctx.lineTo(650, 200);
      ctx.moveTo(210, -150);
      ctx.lineTo(210, 550);
      ctx.moveTo(110, 310);
      ctx.lineTo(550, 310);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 22;
      ctx.stroke();

      ctx.fillStyle = '#9aa0a6';
      ctx.font = 'bold 9px -apple-system, sans-serif';
      ctx.fillText('AV. HOSPITALAR FUSAM', 230, 195);
      ctx.fillText('CORREDOR CENTRAL DE INTERVENÇÃO', 218, 305);
      ctx.restore();
    }

    drawHospitalBuildings(ctx) {
      const buildings = [
        {
          id: 'uti',
          title: 'UTI ADULTO - BLOCO A',
          sub: '2º Andar • Suporte Intensivo',
          x: 320, y: 70, w: 150, h: 95,
          color: '#e8f0fe',
          borderColor: '#0284c7',
          isTarget: true
        },
        {
          id: 'ps',
          title: 'PRONTO-SOCORRO CENTRAL',
          sub: 'Sala Vermelha & Triagem',
          x: 40, y: 70, w: 140, h: 95,
          color: '#fef2f2',
          borderColor: '#dc2626'
        },
        {
          id: 'surg',
          title: 'CENTRO CIRÚRGICO',
          sub: 'Bloco Cirúrgico 1 a 6',
          x: 320, y: 220, w: 150, h: 80,
          color: '#f0fdf4',
          borderColor: '#059669'
        },
        {
          id: 'biomed',
          title: 'ENGENHARIA CLÍNICA',
          sub: 'Oficina & Laboratório Biomédico',
          x: 40, y: 260, w: 140, h: 90,
          color: '#ecfeff',
          borderColor: '#0891b2'
        }
      ];

      buildings.forEach(b => {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.06)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 3;

        ctx.fillStyle = b.color;
        this.roundRect(ctx, b.x, b.y, b.w, b.h, 10);
        ctx.fill();

        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = b.borderColor;
        ctx.lineWidth = b.isTarget ? 2 : 1;
        ctx.stroke();

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 9.5px -apple-system, sans-serif';
        ctx.fillText(b.title, b.x + 10, b.y + 24);

        ctx.fillStyle = '#64748b';
        ctx.font = '8px -apple-system, sans-serif';
        ctx.fillText(b.sub, b.x + 10, b.y + 38);

        if (this.zoom > 1.1) {
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
          ctx.lineWidth = 1;
          for (let i = 1; i <= 3; i++) {
            ctx.strokeRect(b.x + 10 + (i - 1) * 42, b.y + 48, 36, 32);
          }
        }

        ctx.restore();
      });

      // Heliporto
      ctx.save();
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.arc(520, 115, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('H', 520, 115);
      ctx.restore();
    }

    drawNavigationRoute(ctx) {
      if (this.routePoints.length < 2) return;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(this.routePoints[0].x, this.routePoints[0].y);
      for (let i = 1; i < this.routePoints.length; i++) {
        ctx.lineTo(this.routePoints[i].x, this.routePoints[i].y);
      }
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 5;
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 12]);
      ctx.lineDashOffset = -this.dashOffset;
      ctx.stroke();

      ctx.restore();
    }

    drawDestinationPin(ctx) {
      const endPoint = this.routePoints[this.routePoints.length - 1];

      ctx.save();
      const pulseRadius = 14 + Math.sin(Date.now() / 250) * 4;
      ctx.beginPath();
      ctx.arc(endPoint.x, endPoint.y, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(225, 29, 72, 0.2)';
      ctx.fill();

      ctx.translate(endPoint.x, endPoint.y);
      
      ctx.beginPath();
      ctx.ellipse(0, 4, 8, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fill();

      ctx.fillStyle = '#e11d48';
      ctx.beginPath();
      ctx.arc(0, -18, 12, 0, Math.PI * 2);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, -18, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.fillStyle = '#0f172a';
      this.roundRect(ctx, -45, -46, 90, 18, 4);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 8.5px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('LEITO 03 - UTI', 0, -34);

      ctx.restore();
    }

    drawTechnicianMarker(ctx) {
      const currentPos = this.getPointAlongRoute(this.routeProgress);

      ctx.save();
      ctx.translate(currentPos.x, currentPos.y);

      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, 11, 0, Math.PI * 2);
      ctx.fillStyle = '#0891b2';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;
      ctx.fill();

      ctx.shadowColor = 'transparent';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🛵', 0, 0.5);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      this.roundRect(ctx, -38, -26, 76, 15, 4);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 8px -apple-system, sans-serif';
      ctx.fillText(this.ticket?.technician?.name ? this.ticket.technician.name.split(' ')[1] || 'Técnico' : 'Técnico', 0, -16);

      ctx.restore();
    }

    roundRect(ctx, x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }
  }

  /* =========================================================================
     5. RASTREADOR DE REPAROS ESTILO DELIVERY (COM GOOGLE MAPS)
     ========================================================================= */
  const TRACKING_STEPS = [
    { key: 'received', title: 'Aberto', subtitle: 'Triagem e Verificação', icon: Icons.received },
    { key: 'assigned', title: 'Alocado', subtitle: 'Técnico Biomédico Designado', icon: Icons.userCheck },
    { key: 'in_transit', title: 'A Caminho', subtitle: 'Deslocamento no Hospital', icon: Icons.transit },
    { key: 'in_repair', title: 'Em Reparo', subtitle: 'Diagnóstico e Manutenção', icon: Icons.wrench },
    { key: 'testing', title: 'Calibração', subtitle: 'Testes de Qualidade', icon: Icons.calibration },
    { key: 'completed', title: 'Liberado', subtitle: 'Pronto para Paciente', icon: Icons.completed }
  ];

  class RepairTracker {
    constructor(app) {
      this.app = app;
      this.currentTicket = null;
      this.autoSimTimer = null;
      this.modalEl = null;
      this.hospitalMap = null;
    }

    init() {
      this.modalEl = document.getElementById('trackingModal');
    }

    openTicket(ticketId) {
      const ticket = this.app.getTicketById(ticketId);
      if (!ticket) return;

      this.currentTicket = ticket;
      audioEngine.playClick();

      if (ticket.priority === 'critical' && ticket.status !== 'completed') {
        setTimeout(() => audioEngine.playUrgentSiren(), 200);
      }

      this.renderModal();
      if (this.modalEl) {
        this.modalEl.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      }
    }

    closeModal() {
      audioEngine.playClick();
      if (this.autoSimTimer) {
        clearInterval(this.autoSimTimer);
        this.autoSimTimer = null;
      }
      if (this.hospitalMap) {
        this.hospitalMap.destroy();
        this.hospitalMap = null;
      }
      if (this.modalEl) {
        this.modalEl.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    }

    getCurrentStepIndex() {
      if (!this.currentTicket) return 0;
      const idx = TRACKING_STEPS.findIndex(s => s.key === this.currentTicket.status);
      return idx >= 0 ? idx : 0;
    }

    advanceStep() {
      if (!this.currentTicket) return;
      audioEngine.playClick();
      const curIdx = this.getCurrentStepIndex();
      if (curIdx < TRACKING_STEPS.length - 1) {
        const nextStep = TRACKING_STEPS[curIdx + 1];
        this.updateStatus(nextStep.key);
      }
    }

    regressStep() {
      if (!this.currentTicket) return;
      audioEngine.playClick();
      const curIdx = this.getCurrentStepIndex();
      if (curIdx > 0) {
        const prevStep = TRACKING_STEPS[curIdx - 1];
        this.updateStatus(prevStep.key);
      }
    }

    updateStatus(newStatusKey) {
      if (!this.currentTicket) return;
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const stepMeta = TRACKING_STEPS.find(s => s.key === newStatusKey);

      if (!this.currentTicket.technician && newStatusKey !== 'received') {
        this.currentTicket.technician = {
          name: "Eng. Marcos Teles",
          role: "Engenheiro Biomédico",
          avatar: "👨‍🔬",
          badge: "CREA 58192-SP",
          phone: "(11) 98765-4321",
          eta: newStatusKey === 'completed' ? "Finalizado" : "No local",
          currentLocation: this.currentTicket.department
        };
      }

      this.currentTicket.status = newStatusKey;

      if (newStatusKey === 'completed') {
        this.currentTicket.estimatedMinutesRemaining = 0;
        if (this.currentTicket.technician) this.currentTicket.technician.eta = "Concluído";
        audioEngine.playSuccess();
      } else if (newStatusKey === 'testing') {
        this.currentTicket.estimatedMinutesRemaining = 5;
      } else if (newStatusKey === 'in_repair') {
        this.currentTicket.estimatedMinutesRemaining = 12;
      }

      const exists = this.currentTicket.timeline.some(t => t.step === newStatusKey);
      if (!exists) {
        this.currentTicket.timeline.push({
          step: newStatusKey,
          title: stepMeta.title,
          time: timeStr,
          description: `Status atualizado: ${stepMeta.subtitle}.`
        });
      }

      this.app.saveTickets();
      this.app.renderTickets();
      this.app.renderStats();

      if (this.hospitalMap) {
        this.hospitalMap.setTicket(this.currentTicket);
        this.hospitalMap.updateEtaBanner();
      }

      this.renderModal();

      if (newStatusKey === 'completed' && this.autoSimTimer) {
        clearInterval(this.autoSimTimer);
        this.autoSimTimer = null;
      }
    }

    toggleAutoSimulation() {
      audioEngine.playClick();
      const btn = document.getElementById('autoSimBtn');
      if (this.autoSimTimer) {
        clearInterval(this.autoSimTimer);
        this.autoSimTimer = null;
        if (btn) {
          btn.innerHTML = `${Icons.refreshCw} Simular Avanço Automático`;
        }
      } else {
        if (btn) {
          btn.innerHTML = `<span class="animate-spin inline-block">${Icons.refreshCw}</span> Simulando ao vivo...`;
        }
        this.autoSimTimer = setInterval(() => {
          const curIdx = this.getCurrentStepIndex();
          if (curIdx >= TRACKING_STEPS.length - 1) {
            clearInterval(this.autoSimTimer);
            this.autoSimTimer = null;
            if (btn) {
              btn.innerHTML = `${Icons.checkCircle} Simulação Concluída`;
            }
          } else {
            this.advanceStep();
          }
        }, 3000);
      }
    }

    addTechnicianNote(noteText) {
      if (!this.currentTicket || !noteText.trim()) return;
      audioEngine.playClick();
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      this.currentTicket.timeline.push({
        step: this.currentTicket.status,
        title: "Nota Técnica Registrada",
        time: timeStr,
        description: noteText.trim()
      });

      this.app.saveTickets();
      this.renderModal();
    }

    renderModal() {
      const t = this.currentTicket;
      if (!t) return;

      const modalContent = document.getElementById('trackingModalContent');
      if (!modalContent) return;

      const curIdx = this.getCurrentStepIndex();
      const priorityMeta = getPriorityMeta(t.priority);
      const categoryIcon = getCategoryIcon(t.category);
      const progressPercent = Math.round((curIdx / (TRACKING_STEPS.length - 1)) * 100);

      modalContent.innerHTML = `
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
          <div class="flex items-center gap-3">
            <div class="ticket-icon-box ${t.priority === 'critical' ? 'critical' : ''}">
              ${categoryIcon}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="ticket-id-tag font-mono font-bold">${t.id}</span>
                <span class="badge-clean ${t.priority}">
                  ${priorityMeta.icon}
                  ${priorityMeta.label}
                </span>
                <span class="text-xs text-slate-400 font-mono">Pat: ${t.patrimony || 'N/A'}</span>
              </div>
              <h2 class="text-base font-bold text-slate-900 mt-0.5">${t.title}</h2>
              <p class="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <span class="text-cyan-700 font-semibold">${t.department}</span>
                <span>•</span>
                <span>${t.sectorLocation}</span>
                <span>•</span>
                <span class="text-slate-400">${priorityMeta.slaText}</span>
              </p>
            </div>
          </div>

          <button id="closeTrackerModalBtn" class="modal-close-btn" title="Fechar">
            ${Icons.xCircle}
          </button>
        </div>

        <div class="delivery-hero-card">
          <div class="flex items-center justify-between flex-wrap gap-3">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-full bg-white border border-cyan-200 flex items-center justify-center text-cyan-700">
                ${t.status === 'completed' ? Icons.checkCircle : (t.priority === 'critical' ? Icons.siren : Icons.transit)}
              </div>
              <div>
                <div class="text-[10px] uppercase tracking-wider font-bold text-cyan-800">Status em Tempo Real (Delivery)</div>
                <div class="text-sm font-extrabold text-slate-900">${TRACKING_STEPS[curIdx].title}</div>
                <div class="text-xs text-slate-500">${TRACKING_STEPS[curIdx].subtitle}</div>
              </div>
            </div>

            <div class="bg-white border border-slate-200/80 rounded-xl px-3 py-1.5 text-right">
              <div class="text-[10px] font-semibold uppercase text-slate-400">Previsão</div>
              <div class="text-sm font-black text-cyan-700">
                ${t.status === 'completed' ? '✅ Liberado' : `${t.estimatedMinutesRemaining} min`}
              </div>
            </div>
          </div>

          <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-3">
            <div class="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full transition-all duration-500" style="width: ${progressPercent}%;"></div>
          </div>
        </div>

        <div class="stepper-track-clean">
          ${TRACKING_STEPS.map((step, idx) => {
            const isDone = idx < curIdx;
            const isCurrent = idx === curIdx;
            let stateClass = isDone ? 'done' : (isCurrent ? 'active' : 'pending');

            return `
              <div class="step-node ${stateClass}">
                <div class="step-node-circle">
                  ${isDone ? Icons.checkCircle : step.icon}
                </div>
                <div class="step-node-title">${step.title}</div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-3">
          
          <div class="lg:col-span-7 space-y-3">
            <div class="bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm">
              <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></span>
                  <span class="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Fusam Maps • Rota de Intervenção</span>
                </div>
                <span class="text-slate-400 text-[10px]">Arraste para mover • Scroll para zoom</span>
              </div>

              <div id="interactiveHospitalMapContainer" class="w-full h-64 rounded-xl relative overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
              </div>
            </div>

            <div class="bg-white p-3 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3">
              ${t.technician ? `
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center text-lg">
                    ${t.technician.avatar || '👨‍🔬'}
                  </div>
                  <div>
                    <div class="font-bold text-slate-900 text-xs">${t.technician.name}</div>
                    <div class="text-[11px] text-slate-500">${t.technician.role} • <strong class="text-cyan-700">${t.technician.badge}</strong></div>
                    <div class="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      ${Icons.mapPin} ${t.technician.currentLocation}
                    </div>
                  </div>
                </div>

                <a href="tel:${t.technician.phone}" id="callTechBtn" class="btn-stylish btn-fusam-ghost text-xs py-1.5 px-3 flex-shrink-0">
                  ${Icons.phone} Acionar Rádio
                </a>
              ` : `
                <div class="text-xs text-slate-400 py-1">Aguardando alocação técnica.</div>
              `}
            </div>
          </div>

          <div class="lg:col-span-5 space-y-3">
            <div class="bg-white p-3 rounded-xl border border-cyan-100 shadow-sm bg-gradient-to-r from-sky-50/20 to-cyan-50/10">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-slate-800">Controles de Progresso</span>
                <button id="autoSimBtn" class="btn-stylish btn-fusam-cyan text-xs py-0.5 px-2.5">
                  ${Icons.refreshCw} Simular Avanço
                </button>
              </div>

              <div class="flex items-center gap-2">
                <button id="prevStepBtn" class="btn-stylish btn-fusam-ghost text-xs flex-1 py-1" ${curIdx === 0 ? 'disabled' : ''}>
                  ◀ Voltar
                </button>
                <button id="nextStepBtn" class="btn-stylish btn-fusam-primary text-xs flex-2 py-1" ${curIdx === TRACKING_STEPS.length - 1 ? 'disabled' : ''}>
                  Avançar: <strong>${curIdx < TRACKING_STEPS.length - 1 ? TRACKING_STEPS[curIdx + 1].title : 'Final'}</strong> ▶
                </button>
              </div>
            </div>

            <div class="bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm">
              <div class="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-100">
                <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wider">Histórico</h3>
                <span class="text-[10px] text-slate-400">${t.timeline.length} eventos</span>
              </div>

              <div class="space-y-2 max-h-40 overflow-y-auto pr-1">
                ${t.timeline.slice().reverse().map((event, idx) => `
                  <div class="flex items-start gap-2 text-xs">
                    <div class="w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-cyan-500' : 'bg-slate-300'} mt-1.5 flex-shrink-0"></div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-slate-800">${event.title}</span>
                        <span class="text-[10px] text-slate-400 font-mono">${event.time}</span>
                      </div>
                      <p class="text-[11px] text-slate-500 leading-tight">${event.description}</p>
                    </div>
                  </div>
                `).join('')}
              </div>

              <form id="addNoteForm" class="mt-2.5 pt-2 border-t border-slate-100 flex gap-2">
                <input type="text" id="techNoteInput" placeholder="Adicionar nota técnica..." class="form-input-clean text-xs flex-1" required />
                <button type="submit" class="btn-stylish btn-fusam-cyan text-xs py-1 px-2.5">
                  ${Icons.send} Registrar
                </button>
              </form>
            </div>

            <div class="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs">
              <div class="flex items-center justify-between pb-1 mb-1 border-b border-slate-200/60 font-bold text-slate-700 text-[10px]">
                <span>Descrição do Problema</span>
                <button id="printWorkOrderBtn" class="text-cyan-700 hover:text-cyan-900 font-semibold flex items-center gap-1">
                  ${Icons.printer} Imprimir OS
                </button>
              </div>
              <p class="text-slate-600 text-[11px] leading-relaxed">"${t.description}"</p>
            </div>
          </div>

        </div>
      `;

      this.bindEvents();

      setTimeout(() => {
        if (this.hospitalMap) {
          this.hospitalMap.destroy();
        }
        this.hospitalMap = new GoogleStyleHospitalMap('interactiveHospitalMapContainer', {
          ticket: this.currentTicket
        });
      }, 50);
    }

    bindEvents() {
      const closeBtn = document.getElementById('closeTrackerModalBtn');
      if (closeBtn) closeBtn.onclick = () => this.closeModal();

      const nextBtn = document.getElementById('nextStepBtn');
      if (nextBtn) nextBtn.onclick = () => this.advanceStep();

      const prevBtn = document.getElementById('prevStepBtn');
      if (prevBtn) prevBtn.onclick = () => this.regressStep();

      const simBtn = document.getElementById('autoSimBtn');
      if (simBtn) simBtn.onclick = () => this.toggleAutoSimulation();

      const callBtn = document.getElementById('callTechBtn');
      if (callBtn) {
        callBtn.onclick = () => audioEngine.playClick();
      }

      const noteForm = document.getElementById('addNoteForm');
      if (noteForm) {
        noteForm.onsubmit = (e) => {
          e.preventDefault();
          const input = document.getElementById('techNoteInput');
          if (input && input.value.trim()) {
            this.addTechnicianNote(input.value.trim());
            input.value = '';
          }
        };
      }

      const printBtn = document.getElementById('printWorkOrderBtn');
      if (printBtn) {
        printBtn.onclick = () => {
          audioEngine.playClick();
          window.print();
        };
      }
    }
  }

  /* =========================================================================
     6. APLICAÇÃO PRINCIPAL FUSAM
     ========================================================================= */
  class FusamApp {
    constructor() {
      this.tickets = [];
      this.inbox = [];
      this.currentFilter = 'all';
      this.searchQuery = '';
      this.categoryFilter = 'all';
      this.tracker = new RepairTracker(this);
      this.soundActive = true;
    }

    init() {
      this.loadState();
      this.tracker.init();
      this.populateFormDropdowns();
      this.renderStats();
      this.renderTickets();
      this.renderInbox();
      this.updateEmergencyBanner();
      this.bindGlobalEvents();
    }

    loadState() {
      try {
        const savedTickets = localStorage.getItem('fusam_tickets');
        this.tickets = savedTickets ? JSON.parse(savedTickets) : INITIAL_TICKETS;

        const savedInbox = localStorage.getItem('fusam_inbox');
        this.inbox = savedInbox ? JSON.parse(savedInbox) : INBOX_MESSAGES;
      } catch (e) {
        console.error('Erro ao carregar do localStorage:', e);
        this.tickets = INITIAL_TICKETS;
        this.inbox = INBOX_MESSAGES;
      }
    }

    saveTickets() {
      try {
        localStorage.setItem('fusam_tickets', JSON.stringify(this.tickets));
      } catch (e) {
        console.warn('Erro ao salvar chamados', e);
      }
    }

    saveInbox() {
      try {
        localStorage.setItem('fusam_inbox', JSON.stringify(this.inbox));
      } catch (e) {
        console.warn('Erro ao salvar inbox', e);
      }
    }

    getTicketById(id) {
      return this.tickets.find(t => t.id === id);
    }

    populateFormDropdowns() {
      const catSelect = document.getElementById('ticketCategory');
      if (catSelect) {
        catSelect.innerHTML = `
          <option value="">Selecione o Equipamento...</option>
          ${CATEGORIES_LIST.map(c => `
            <option value="${c.id}" data-lifesupport="${c.isLifeSupport}">
              ${c.isLifeSupport ? '🚨 ' : ''}${c.name}
            </option>
          `).join('')}
        `;
      }

      const deptSelect = document.getElementById('ticketDepartment');
      if (deptSelect) {
        deptSelect.innerHTML = `
          <option value="">Selecione a Ala / Setor...</option>
          ${DEPARTMENTS_LIST.map(d => `<option value="${d}">${d}</option>`).join('')}
        `;
      }

      const filterCatSelect = document.getElementById('filterCategorySelect');
      if (filterCatSelect) {
        filterCatSelect.innerHTML = `
          <option value="all">Todas as Categorias</option>
          ${CATEGORIES_LIST.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
        `;
      }
    }

    renderStats() {
      const totalTickets = this.tickets.length;
      const criticalTickets = this.tickets.filter(t => t.priority === 'critical' && t.status !== 'completed').length;
      const inTransitTickets = this.tickets.filter(t => t.status === 'in_transit' || t.status === 'in_repair').length;
      const completedTickets = this.tickets.filter(t => t.status === 'completed').length;

      const elTotal = document.getElementById('statTotal');
      const elCritical = document.getElementById('statCritical');
      const elInTransit = document.getElementById('statInTransit');
      const elCompleted = document.getElementById('statCompleted');

      if (elTotal) elTotal.textContent = totalTickets;
      if (elCritical) elCritical.textContent = criticalTickets;
      if (elInTransit) elInTransit.textContent = inTransitTickets;
      if (elCompleted) elCompleted.textContent = completedTickets;

      const inboxUnread = this.inbox.filter(m => m.unread).length;
      const inboxBadge = document.getElementById('inboxBadge');
      if (inboxBadge) {
        if (inboxUnread > 0) {
          inboxBadge.textContent = inboxUnread;
          inboxBadge.classList.remove('hidden');
        } else {
          inboxBadge.classList.add('hidden');
        }
      }
    }

    updateEmergencyBanner() {
      const banner = document.getElementById('emergencyCodeRedBanner');
      if (!banner) return;

      const activeCritical = this.tickets.filter(t => t.priority === 'critical' && t.status !== 'completed');

      if (activeCritical.length > 0) {
        banner.classList.remove('hidden');
        const textEl = document.getElementById('emergencyBannerText');
        if (textEl) {
          textEl.innerHTML = `
            <span class="font-bold text-red-700">${activeCritical.length} Emergência Ativa:</span>
            <span class="text-slate-700 ml-1 font-medium">${activeCritical[0].equipmentName} (${activeCritical[0].department})</span>
          `;
        }

        const viewBtn = document.getElementById('quickJumpCriticalBtn');
        if (viewBtn) {
          viewBtn.onclick = () => {
            audioEngine.playClick();
            this.tracker.openTicket(activeCritical[0].id);
          };
        }

        const sirenTestBtn = document.getElementById('testAlarmBtn');
        if (sirenTestBtn) {
          sirenTestBtn.onclick = () => {
            audioEngine.playUrgentSiren();
          };
        }
      } else {
        banner.classList.add('hidden');
      }
    }

    getFilteredTickets() {
      return this.tickets.filter(t => {
        if (this.currentFilter === 'critical' && (t.priority !== 'critical' || t.status === 'completed')) return false;
        if (this.currentFilter === 'active' && t.status === 'completed') return false;
        if (this.currentFilter === 'in_transit' && t.status !== 'in_transit') return false;
        if (this.currentFilter === 'in_repair' && t.status !== 'in_repair') return false;
        if (this.currentFilter === 'completed' && t.status !== 'completed') return false;

        if (this.categoryFilter !== 'all' && t.category !== this.categoryFilter) return false;

        if (this.searchQuery.trim()) {
          const q = this.searchQuery.toLowerCase();
          const matchTitle = t.title.toLowerCase().includes(q);
          const matchEquip = (t.equipmentName || '').toLowerCase().includes(q);
          const matchDept = (t.department || '').toLowerCase().includes(q);
          const matchId = t.id.toLowerCase().includes(q);
          const matchPat = (t.patrimony || '').toLowerCase().includes(q);
          const matchTech = (t.technician?.name || '').toLowerCase().includes(q);
          if (!matchTitle && !matchEquip && !matchDept && !matchId && !matchPat && !matchTech) {
            return false;
          }
        }

        return true;
      }).sort((a, b) => {
        const pWeights = { critical: 4, high: 3, medium: 2, low: 1 };
        const statusWeight = (s) => (s === 'completed' ? 0 : 1);

        if (statusWeight(a.status) !== statusWeight(b.status)) {
          return statusWeight(b.status) - statusWeight(a.status);
        }
        return pWeights[b.priority] - pWeights[a.priority];
      });
    }

    renderTickets() {
      const container = document.getElementById('ticketsGrid');
      if (!container) return;

      const filtered = this.getFilteredTickets();

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
            <div class="w-12 h-12 mx-auto mb-2 text-cyan-600 bg-cyan-50 rounded-xl flex items-center justify-center">
              ${Icons.inbox}
            </div>
            <h3 class="text-sm font-bold text-slate-800">Nenhum chamado no filtro</h3>
            <p class="text-xs text-slate-400 max-w-xs mx-auto mt-0.5">
              Abra uma nova solicitação ou limpe a busca.
            </p>
            <button id="openNewTicketEmptyBtn" class="mt-3 btn-stylish btn-fusam-primary text-xs">
              ${Icons.plusCircle} Nova Solicitação
            </button>
          </div>
        `;

        const emptyBtn = document.getElementById('openNewTicketEmptyBtn');
        if (emptyBtn) emptyBtn.onclick = () => {
          audioEngine.playClick();
          this.openInboxModal('create');
        };
        return;
      }

      container.innerHTML = filtered.map(t => {
        const priorityMeta = getPriorityMeta(t.priority);
        const categoryIcon = getCategoryIcon(t.category);
        const isCritical = t.priority === 'critical' && t.status !== 'completed';
        const stepMeta = TRACKING_STEPS.find(s => s.key === t.status) || TRACKING_STEPS[0];
        const stepIdx = TRACKING_STEPS.findIndex(s => s.key === t.status);
        const progressPercent = Math.round((stepIdx / (TRACKING_STEPS.length - 1)) * 100);

        return `
          <div class="ticket-card ${priorityMeta.borderClass} ${isCritical ? 'ticket-critical-glow' : ''}" data-id="${t.id}">
            
            <div>
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2.5">
                  <div class="ticket-icon-box ${isCritical ? 'critical' : ''}">
                    ${categoryIcon}
                  </div>
                  <div>
                    <span class="ticket-id-tag font-mono font-bold">${t.id}</span>
                    <div class="text-[11px] text-slate-400 font-medium">${t.createdAt.split(' ')[1] || t.createdAt}</div>
                  </div>
                </div>

                <span class="badge-clean ${t.priority}">
                  ${priorityMeta.icon}
                  ${priorityMeta.label}
                </span>
              </div>

              <h3 class="text-sm font-bold text-slate-900 mt-2.5 leading-snug line-clamp-2">
                ${t.title}
              </h3>
              
              <div class="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1.5 truncate">
                <span class="text-cyan-700 font-semibold truncate">${t.department}</span>
                <span class="text-slate-300">•</span>
                <span class="text-slate-400 text-[11px] font-mono">Pat: ${t.patrimony || 'S/N'}</span>
              </div>
            </div>

            <div class="card-delivery-bar">
              <div class="flex items-center justify-between text-[11px] font-semibold text-slate-700">
                <span class="flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full ${t.status === 'completed' ? 'bg-emerald-500' : (isCritical ? 'bg-red-500 animate-ping' : 'bg-cyan-500')}"></span>
                  ${stepMeta.title}
                </span>
                <span class="text-cyan-700 text-[11px] font-bold">
                  ${t.status === 'completed' ? 'Liberado' : (t.technician ? t.technician.eta : 'Aguardando')}
                </span>
              </div>

              <div class="mini-track-line">
                <div class="mini-track-fill" style="width: ${progressPercent}%;"></div>
              </div>

              <div class="mt-2 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <div class="flex items-center gap-1.5 truncate">
                  <span class="text-xs">${t.technician?.avatar || '👨‍🔧'}</span>
                  <span class="truncate">${t.technician?.name || 'Aguardando técnico'}</span>
                </div>
                <span class="text-cyan-600 font-semibold text-[10px] uppercase font-mono">${priorityMeta.slaText}</span>
              </div>
            </div>

          </div>
        `;
      }).join('');

      container.querySelectorAll('.ticket-card').forEach(card => {
        card.onclick = () => {
          const id = card.getAttribute('data-id');
          this.tracker.openTicket(id);
        };
      });
    }

    renderInbox() {
      const listEl = document.getElementById('inboxMessagesList');
      if (!listEl) return;

      if (this.inbox.length === 0) {
        listEl.innerHTML = `
          <div class="p-6 text-center text-slate-400 text-xs">
            ${Icons.inbox} Nenhuma mensagem.
          </div>
        `;
        return;
      }

      listEl.innerHTML = this.inbox.map(m => `
        <div class="p-3 rounded-xl border border-slate-200/80 bg-white hover:border-cyan-400 transition-all cursor-pointer">
          <div class="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span class="font-bold text-slate-700">${m.sender}</span>
            <span class="font-mono">${m.time}</span>
          </div>
          <h4 class="text-xs font-bold text-slate-900 mb-0.5">${m.subject}</h4>
          <p class="text-[11px] text-slate-500 leading-relaxed">${m.content}</p>
        </div>
      `).join('');
    }

    openInboxModal(tab = 'create') {
      audioEngine.playClick();
      const modal = document.getElementById('inboxModal');
      if (!modal) return;

      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      this.switchInboxTab(tab);
    }

    closeInboxModal() {
      audioEngine.playClick();
      const modal = document.getElementById('inboxModal');
      if (!modal) return;

      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }

    switchInboxTab(tab) {
      audioEngine.playTabSwitch();
      const tabCreate = document.getElementById('tabCreateRequest');
      const tabMessages = document.getElementById('tabInboxMessages');
      const contentCreate = document.getElementById('inboxContentCreate');
      const contentMessages = document.getElementById('inboxContentMessages');

      if (tab === 'create') {
        tabCreate?.classList.add('active');
        tabMessages?.classList.remove('active');
        contentCreate?.classList.remove('hidden');
        contentMessages?.classList.add('hidden');
      } else {
        tabMessages?.classList.add('active');
        tabCreate?.classList.remove('active');
        contentMessages?.classList.remove('hidden');
        contentCreate?.classList.add('hidden');
      }
    }

    handleCreateTicket(formData) {
      const isLifeSupport = formData.get('isLifeSupport') === 'on' || formData.get('priority') === 'critical';
      const priority = isLifeSupport ? 'critical' : (formData.get('priority') || 'medium');

      const newId = `CH-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

      const newTicket = {
        id: newId,
        title: formData.get('title'),
        category: formData.get('category'),
        equipmentName: formData.get('equipmentName') || 'Equipamento Hospitalar',
        patrimony: formData.get('patrimony') || `PAT-${Math.floor(100000 + Math.random() * 900000)}`,
        department: formData.get('department'),
        sectorLocation: formData.get('sectorLocation') || 'Ala de Atendimento',
        priority: priority,
        status: 'received',
        reporter: {
          name: formData.get('reporterName') || 'Profissional de Saúde',
          role: formData.get('reporterRole') || 'Equipe Assistencial',
          badge: formData.get('reporterBadge') || 'COREN/CRM',
          contact: formData.get('reporterContact') || 'Ramal'
        },
        technician: null,
        description: formData.get('description'),
        createdAt: `${dateStr} ${timeStr}`,
        slaMinutes: priority === 'critical' ? 15 : (priority === 'high' ? 60 : 240),
        estimatedMinutesRemaining: priority === 'critical' ? 15 : (priority === 'high' ? 60 : 240),
        timeline: [
          {
            step: 'received',
            title: priority === 'critical' ? '🚨 Emergência Crítica Aberta' : 'Chamado Recebido',
            time: timeStr,
            description: `Chamado registrado por ${formData.get('reporterName')}.`
          }
        ],
        technicalNotes: ''
      };

      if (priority === 'critical') {
        audioEngine.playUrgentSiren();
      } else {
        audioEngine.playSuccess();
      }

      this.tickets.unshift(newTicket);
      this.saveTickets();
      this.renderStats();
      this.updateEmergencyBanner();
      this.renderTickets();
      this.closeInboxModal();
      this.tracker.openTicket(newId);
    }

    bindGlobalEvents() {
      const openInboxHeaderBtn = document.getElementById('openInboxHeaderBtn');
      if (openInboxHeaderBtn) {
        openInboxHeaderBtn.onclick = () => this.openInboxModal('create');
      }

      const floatingActionBtn = document.getElementById('floatingNewTicketBtn');
      if (floatingActionBtn) {
        floatingActionBtn.onclick = () => this.openInboxModal('create');
      }

      const closeInboxBtn = document.getElementById('closeInboxModalBtn');
      if (closeInboxBtn) {
        closeInboxBtn.onclick = () => this.closeInboxModal();
      }

      const tabCreate = document.getElementById('tabCreateRequest');
      if (tabCreate) {
        tabCreate.onclick = () => this.switchInboxTab('create');
      }

      const tabMessages = document.getElementById('tabInboxMessages');
      if (tabMessages) {
        tabMessages.onclick = () => this.switchInboxTab('messages');
      }

      const ticketForm = document.getElementById('createTicketForm');
      if (ticketForm) {
        ticketForm.onsubmit = (e) => {
          e.preventDefault();
          const data = new FormData(ticketForm);
          this.handleCreateTicket(data);
          ticketForm.reset();
        };
      }

      const catSelect = document.getElementById('ticketCategory');
      const prioritySelect = document.getElementById('ticketPriority');
      const lifeSupportCheckbox = document.getElementById('isLifeSupport');

      if (catSelect && prioritySelect && lifeSupportCheckbox) {
        catSelect.onchange = () => {
          audioEngine.playClick();
          const selectedOpt = catSelect.options[catSelect.selectedIndex];
          const isLife = selectedOpt.getAttribute('data-lifesupport') === 'true';
          if (isLife) {
            lifeSupportCheckbox.checked = true;
            prioritySelect.value = 'critical';
            const alertHelp = document.getElementById('lifeSupportAlert');
            if (alertHelp) alertHelp.classList.remove('hidden');
            audioEngine.playUrgentSiren();
          } else {
            lifeSupportCheckbox.checked = false;
            const alertHelp = document.getElementById('lifeSupportAlert');
            if (alertHelp) alertHelp.classList.add('hidden');
          }
        };

        lifeSupportCheckbox.onchange = () => {
          audioEngine.playClick();
          if (lifeSupportCheckbox.checked) {
            prioritySelect.value = 'critical';
            const alertHelp = document.getElementById('lifeSupportAlert');
            if (alertHelp) alertHelp.classList.remove('hidden');
            audioEngine.playUrgentSiren();
          } else {
            const alertHelp = document.getElementById('lifeSupportAlert');
            if (alertHelp) alertHelp.classList.add('hidden');
          }
        };
      }

      const filterTabs = document.querySelectorAll('.segmented-tab-btn');
      filterTabs.forEach(tab => {
        tab.onclick = () => {
          audioEngine.playTabSwitch();
          filterTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          this.currentFilter = tab.getAttribute('data-filter');
          this.renderTickets();
        };
      });

      const filterCatSelect = document.getElementById('filterCategorySelect');
      if (filterCatSelect) {
        filterCatSelect.onchange = (e) => {
          audioEngine.playClick();
          this.categoryFilter = e.target.value;
          this.renderTickets();
        };
      }

      const searchInput = document.getElementById('searchTicketsInput');
      if (searchInput) {
        searchInput.oninput = (e) => {
          this.searchQuery = e.target.value;
          this.renderTickets();
        };
      }

      const soundToggleBtn = document.getElementById('soundToggleBtn');
      if (soundToggleBtn) {
        soundToggleBtn.onclick = () => {
          this.soundActive = audioEngine.toggleSound();
          soundToggleBtn.innerHTML = this.soundActive ? `${Icons.volume2} Som: Ativado` : `${Icons.volumeX} Som: Silenciado`;
          soundToggleBtn.classList.toggle('text-slate-400', !this.soundActive);
        };
      }

      const presetButtons = document.querySelectorAll('.quick-preset-btn');
      presetButtons.forEach(btn => {
        btn.onclick = () => {
          audioEngine.playClick();
          const title = btn.getAttribute('data-title');
          const cat = btn.getAttribute('data-cat');
          const dept = btn.getAttribute('data-dept');
          const desc = btn.getAttribute('data-desc');
          const equip = btn.getAttribute('data-equip');

          const titleInput = document.getElementById('ticketTitle');
          const descInput = document.getElementById('ticketDescription');
          const equipInput = document.getElementById('ticketEquipment');

          if (titleInput) titleInput.value = title;
          if (descInput) descInput.value = desc;
          if (equipInput) equipInput.value = equip;
          if (catSelect) catSelect.value = cat;
          const deptSelect = document.getElementById('ticketDepartment');
          if (deptSelect) deptSelect.value = dept;

          catSelect.dispatchEvent(new Event('change'));
        };
      });

      const resetDataBtn = document.getElementById('resetDataBtn');
      if (resetDataBtn) {
        resetDataBtn.onclick = () => {
          audioEngine.playClick();
          if (confirm('Deseja restaurar os chamados de demonstração originais da Fusam?')) {
            localStorage.removeItem('fusam_tickets');
            localStorage.removeItem('fusam_inbox');
            this.tickets = JSON.parse(JSON.stringify(INITIAL_TICKETS));
            this.inbox = JSON.parse(JSON.stringify(INBOX_MESSAGES));
            this.saveTickets();
            this.saveInbox();
            this.renderStats();
            this.updateEmergencyBanner();
            this.renderTickets();
            this.renderInbox();
            audioEngine.playSuccess();
          }
        };
      }
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    window.fusamApp = new FusamApp();
    window.fusamApp.init();
  });

})();
