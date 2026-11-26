/**
 * Fusam Pronto-Socorro - Bundle Unificado Ultra-Cool (Fusam Maps 2.0 & Cyber-Clinical Edition)
 * Suporta execução direta em file:/// e servidor HTTP sem dependências externas.
 */

(function () {
  'use strict';

  /* =========================================================================
     1. BIBLIOTECA DE ÍCONES SVG MÉDICOS E UI
     ========================================================================= */
/**
 * Fusam Pronto-Socorro - Biblioteca de Ícones SVG
 * Ícones médicos, de engenharia clínica e interface para rápida leitura visual.
 */

const Icons = {
  // Equipamentos e Categorias Médicas
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

  // Prioridades & Alertas
  siren: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M7 12a5 5 0 0 1 10 0v6H7v-6Z"/><path d="M5 20h14"/><path d="M12 2v3"/><path d="M4 4l2 2"/><path d="M20 4l-2 2"/><path d="M2 13h2"/><path d="M20 13h2"/></svg>`,
  
  alertTriangle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  
  shieldAlert: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  
  clock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,

  // Ações e Interface
  inbox: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>`,
  
  plusCircle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
  
  send: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  
  search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  
  filter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  
  checkCircle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  
  xCircle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  
  refreshCw: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>`,

  // Etapas de Rastreio (Estilo Delivery de Reparo)
  received: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  
  userCheck: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`,
  
  transit: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><circle cx="18.5" cy="17.5" r="2.5"/><circle cx="5.5" cy="17.5" r="2.5"/><path d="M10 17h4"/><path d="M5 17H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11v12h-2"/><path d="M14 9h4l4 4v2h-4"/></svg>`,
  
  wrench: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  
  calibration: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
  
  completed: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>`,

  // Localização e Hospital
  hospital: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M12 6v4"/><path d="M14 8h-4"/><path d="M18 18v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2"/><path d="M4 18h16"/><path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11H3V7z"/></svg>`,
  
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  
  phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  
  volume2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
  
  volumeX: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>`,

  chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="m9 18 6-6-6-6"/></svg>`,
  
  info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,

  printer: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`
};

/**
 * Retorna o ícone SVG correspondente à categoria do equipamento ou problema
 */
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

/**
 * Retorna o ícone e classe para a prioridade
 */
function getPriorityMeta(priority) {
  switch (priority) {
    case 'critical':
      return {
        label: 'Emergência Crítica',
        badgeClass: 'badge-critical',
        borderClass: 'card-border-critical',
        icon: Icons.siren,
        slaText: 'SLA: 15 min'
      };
    case 'high':
      return {
        label: 'Urgência Alta',
        badgeClass: 'badge-high',
        borderClass: 'card-border-high',
        icon: Icons.alertTriangle,
        slaText: 'SLA: 1h'
      };
    case 'medium':
      return {
        label: 'Prioridade Média',
        badgeClass: 'badge-medium',
        borderClass: 'card-border-medium',
        icon: Icons.clock,
        slaText: 'SLA: 4h'
      };
    case 'low':
    default:
      return {
        label: 'Baixa Prioridade',
        badgeClass: 'badge-low',
        borderClass: 'card-border-low',
        icon: Icons.info,
        slaText: 'SLA: 24h'
      };
  }
}

  /* =========================================================================
     2. MOTOR DE ÁUDIO TÁTIL & SIRENE MÉDICA (WEB AUDIO API)
     ========================================================================= */
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

const audioEngine = new FusamAudioEngine();

  /* =========================================================================
     3. BASE DE DADOS CLÍNICA & CONFIGURAÇÕES HOSPITALARES
     ========================================================================= */
/**
 * Fusam Pronto-Socorro - Dados Iniciais de Chamados e Equipamentos
 */

const INITIAL_TICKETS = [
  {
    id: "CH-8492",
    title: "Respirador Pulmonar UTI 03 com Falha de Pressão",
    category: "ventilator",
    equipmentName: "Ventilador Mecânico Mindray SV300",
    patrimony: "PAT-004812",
    department: "UTI Adulto - Leito 03",
    sectorLocation: "Bloco A - 2º Andar",
    priority: "critical", // critical, high, medium, low
    status: "in_transit", // received, assigned, in_transit, in_repair, testing, completed
    reporter: {
      name: "Dra. Camila Duarte",
      role: "Médica Intensivista",
      badge: "CRM 12948-SP",
      contact: "Ramal 2403"
    },
    technician: {
      name: "Eng. Marcos Teles",
      role: "Engenheiro Clínico Especialista",
      avatar: "👨‍🔬",
      badge: "CREA 58192-SP",
      phone: "(11) 98765-4321",
      eta: "4 minutos",
      currentLocation: "Corredor Central - Elevador Bloco A"
    },
    description: "Ventilador apresentou alarme contínuo de perda de pressão inspiratória máxima e queda no volume corrente durante ventilação invasiva. Paciente transferido temporariamente para ambu. Equipamento de suporte à vida crucial.",
    createdAt: "12/11/2026 17:32",
    slaMinutes: 15,
    estimatedMinutesRemaining: 8,
    timeline: [
      {
        step: "received",
        title: "Chamado de Emergência Aberto",
        time: "17:32",
        description: "Chamado registrado com classificação Código Vermelho (Prioridade Máxima)."
      },
      {
        step: "assigned",
        title: "Especialista em Suporte à Vida Alocado",
        time: "17:34",
        description: "Engenheiro Clínico Marcos Teles assumiu o chamado imediatamente."
      },
      {
        step: "in_transit",
        title: "Técnico a Caminho do Setor",
        time: "17:37",
        description: "Técnico em deslocamento com kit de válvulas de exalação e sensor de fluxo. Previsão: 4 min."
      }
    ],
    technicalNotes: "Kit de calibração e sensor de fluxo reserva retirados da oficina biomédica."
  },
  {
    id: "CH-8490",
    title: "Desfibrilador Bifásico da Sala Vermelha não carrega choque",
    category: "defibrillator",
    equipmentName: "Cardioversor / Desfibrilador Zoll R Series",
    patrimony: "PAT-003190",
    department: "Pronto-Socorro - Sala Vermelha",
    sectorLocation: "Térreo - Ala de Ressuscitação",
    priority: "critical",
    status: "in_repair",
    reporter: {
      name: "Enf. Rodrigo Albuquerque",
      role: "Enfermeiro Chefe Sala Vermelha",
      badge: "COREN 88123-SP",
      contact: "Ramal 1102"
    },
    technician: {
      name: "Téc. Juliana Rocha",
      role: "Técnica de Equipamentos Médicos",
      avatar: "👩‍🔧",
      badge: "CFT 44291-SP",
      phone: "(11) 97654-3210",
      eta: "No local",
      currentLocation: "Sala Vermelha - Box 01"
    },
    description: "Durante checagem diária matinal e após teste de carga em 200J, o aparelho travou com mensagem 'Erro de Capacitor / Trocar Bateria'. Sala Vermelha precisa de DEA 100% operacional imediatamente.",
    createdAt: "12/11/2026 17:15",
    slaMinutes: 15,
    estimatedMinutesRemaining: 5,
    timeline: [
      {
        step: "received",
        title: "Chamado Recebido",
        time: "17:15",
        description: "Classificação automática de Código Vermelho (Equipamento de Parada Cardíaca)."
      },
      {
        step: "assigned",
        title: "Técnica Designada",
        time: "17:17",
        description: "Téc. Juliana Rocha direcionada da Sala Amarela para a Sala Vermelha."
      },
      {
        step: "in_transit",
        title: "Deslocamento Rápido",
        time: "17:19",
        description: "Deslocamento com módulo de bateria e analisador de desfibrilador Fluke."
      },
      {
        step: "in_repair",
        title: "Reparo e Diagnóstico em Andamento",
        time: "17:23",
        description: "Técnica desmontou painel de carga. Bateria secundária substituída; medindo curva de descarga."
      }
    ],
    technicalNotes: "Bateria interna de chumbo-ácido apresentava sulfatação nos polos. Conexão reajustada."
  },
  {
    id: "CH-8488",
    title: "Tomógrafo Computadorizado - Erro de Aquisição e Detector",
    category: "scanner",
    equipmentName: "Tomógrafo Philips 64 Canais",
    patrimony: "PAT-001004",
    department: "Centro de Diagnóstico por Imagem",
    sectorLocation: "Subsolo - Sala de Tomografia 01",
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
      role: "Especialista em Diagnóstico por Imagem",
      avatar: "👨‍💻",
      badge: "CREA 99201-SP",
      phone: "(11) 98112-2233",
      eta: "12 minutos",
      currentLocation: "Laboratório Central de Imagens"
    },
    description: "Gantry emite erro de comunicação óptica com os detectores ao iniciar scan com contraste. Pacientes de trauma do PS aguardando laudo urgente.",
    createdAt: "12/11/2026 16:45",
    slaMinutes: 60,
    estimatedMinutesRemaining: 40,
    timeline: [
      {
        step: "received",
        title: "Chamado Registrado",
        time: "16:45",
        description: "Urgência Alta acionada devido a fila de exames de trauma."
      },
      {
        step: "assigned",
        title: "Especialista em Radiologia Acionado",
        time: "16:50",
        description: "Eng. Carlos Eduardo assumiu o atendimento e solicitou log de erros remoto."
      }
    ],
    technicalNotes: "Aguardando reinicialização do subsistema de anel deslizante (slip ring)."
  },
  {
    id: "CH-8485",
    title: "Vazamento em Saída de Oxigênio Medicinal - Leito 12",
    category: "oxygen",
    equipmentName: "Régua de Gases Medicinais / Fluxômetro",
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
      role: "Técnico de Utilidades e Gases",
      avatar: "👨‍🏭",
      badge: "CFT 19284-SP",
      phone: "(11) 99444-5566",
      eta: "No local",
      currentLocation: "Sala Amarela - Leito 12"
    },
    description: "Ruído audível de escape de gás na válvula de engate rápido de O2 com perda de pressão no fluxômetro.",
    createdAt: "12/11/2026 16:10",
    slaMinutes: 60,
    estimatedMinutesRemaining: 10,
    timeline: [
      {
        step: "received",
        title: "Chamado Aberto",
        time: "16:10",
        description: "Vazamento identificado pela equipe de enfermagem."
      },
      {
        step: "assigned",
        title: "Manutenção de Gases Acionada",
        time: "16:12",
        description: "Téc. Geraldo Lima mobilizado com kit de vedação O-ring."
      },
      {
        step: "in_transit",
        title: "Técnico no Setor",
        time: "16:18",
        description: "Chegada com manômetro digital calibrado."
      },
      {
        step: "in_repair",
        title: "Troca do Bloco Valvulado",
        time: "16:25",
        description: "Substituição do anel de vedação de alta pressão e aperto do acoplamento."
      },
      {
        step: "testing",
        title: "Teste de Estanqueidade e Pressurização",
        time: "17:10",
        description: "Verificação com líquido detector de microvazamentos e medição estável a 3,5 bar."
      }
    ],
    technicalNotes: "Teste com manômetro concluído com pressão estável. Liberando para uso seguro."
  },
  {
    id: "CH-8479",
    title: "Bomba de Infusão Contínua com Alarme Falso de Oclusão",
    category: "infusion",
    equipmentName: "Bomba de Infusão Linear B.Braun",
    patrimony: "PAT-005671",
    department: "UTI Pediátrica",
    sectorLocation: "3º Andar - Box 04",
    priority: "medium",
    status: "completed",
    reporter: {
      name: "Dr. André Villas",
      role: "Pediatra Neonatal",
      badge: "CRM 11094-SP",
      contact: "Ramal 3404"
    },
    technician: {
      name: "Téc. Juliana Rocha",
      role: "Técnica de Equipamentos Médicos",
      avatar: "👩‍🔧",
      badge: "CFT 44291-SP",
      phone: "(11) 97654-3210",
      eta: "Finalizado",
      currentLocation: "Oficina Biomédica"
    },
    description: "Bomba apitava acusando oclusão proximal mesmo com cateter desobstruído. Sensor óptico com poeira ou desalinhamento.",
    createdAt: "12/11/2026 14:20",
    slaMinutes: 240,
    estimatedMinutesRemaining: 0,
    timeline: [
      {
        step: "received",
        title: "Chamado Aberto",
        time: "14:20",
        description: "Equipamento colocado em quarentena técnica pela equipe."
      },
      {
        step: "assigned",
        title: "Técnica Alocada",
        time: "14:25",
        description: "Atendimento agendado para o bloco pediátrico."
      },
      {
        step: "in_transit",
        title: "Em Deslocamento",
        time: "14:35",
        description: "Técnica recolheu aparelho para bancada com bomba substituta entregue."
      },
      {
        step: "in_repair",
        title: "Limpeza de Sensores",
        time: "14:50",
        description: "Descontaminação do sensor fotoelétrico e troca das sapatas peristálticas."
      },
      {
        step: "testing",
        title: "Calibração de Vazão Volumétrica",
        time: "15:30",
        description: "Calibração com balança analítica e proveta graduada (erro < 1.2%)."
      },
      {
        step: "completed",
        title: "Equipamento Liberado e Certificado",
        time: "16:05",
        description: "Equipamento higienizado, selo de calibração 2026 afixado e entregue ao setor."
      }
    ],
    technicalNotes: "Bomba de infusão liberada com calibração válida por 12 meses. Laudo Nº 2026-9921."
  },
  {
    id: "CH-8472",
    title: "Maca de Transporte com Trava Hidráulica Emperrada",
    category: "stretcher",
    equipmentName: "Maca Hospitalar de Emergência Stryker",
    patrimony: "PAT-009104",
    department: "Pronto-Socorro - Triagem",
    sectorLocation: "Recepção / Entrada de Ambulâncias",
    priority: "low",
    status: "received",
    reporter: {
      name: "Téc. Enfermagem Paulo Santos",
      role: "Triagem e Admissão",
      badge: "COREN 77219-SP",
      contact: "Recepção"
    },
    technician: null,
    description: "Pedal de elevação de altura está travado na posição intermediária, dificultando transferência de pacientes da ambulância.",
    createdAt: "12/11/2026 17:01",
    slaMinutes: 1440,
    estimatedMinutesRemaining: 1400,
    timeline: [
      {
        step: "received",
        title: "Chamado Registrado",
        time: "17:01",
        description: "Aguardando alocação da equipe de manutenção mecânica e predial."
      }
    ],
    technicalNotes: "Pendente inspeção do pistão hidráulico."
  }
];

const INBOX_MESSAGES = [
  {
    id: "MSG-101",
    sender: "Engenharia Clínica - Central de Operações",
    subject: "Aviso de Calibração Preventiva nos Eletrocardiógrafos",
    time: "Hoje às 15:00",
    priority: "medium",
    unread: false,
    content: "Prezada equipe do Pronto-Socorro e UTI, informamos que a partir das 19h realizaremos o recolhimento escalonado dos eletrocardiógrafos para atualização de firmware e teste de segurança elétrica NBR IEC 60601-1."
  },
  {
    id: "MSG-102",
    sender: "Diretoria Médica Fusam",
    subject: "Protocolo Código Vermelho: Prioridade Máxima para Ventiladores",
    time: "Hoje às 11:30",
    priority: "critical",
    unread: false,
    content: "Reforçamos a todas as alas: qualquer falha em ventilador mecânico ou cardioversor deve ser registrada imediatamente neste sistema como EMERGÊNCIA CRÍTICA. O tempo limite de resposta da equipe biomédica é de 15 minutos."
  },
  {
    id: "MSG-103",
    sender: "Manutenção Predial & Utilidades",
    subject: "Teste Programado do Gerador Principal de Emergência",
    time: "Ontem às 18:20",
    priority: "low",
    unread: false,
    content: "O gerador a diesel 750kVA passou por teste de carga automática com transição de no-break perfeita. Sistema de redundância 100% operacional para todas as salas cirúrgicas e UTIs."
  }
];

const CATEGORIES_LIST = [
  { id: "ventilator", name: "Ventilador / Respirador Pulmonar", icon: "ventilator", isLifeSupport: true },
  { id: "defibrillator", name: "Desfibrilador / Cardioversor DEA", icon: "defibrillator", isLifeSupport: true },
  { id: "monitor", name: "Monitor Multiparâmetros / ECG", icon: "monitor", isLifeSupport: true },
  { id: "infusion", name: "Bomba de Infusão / Seringa", icon: "infusion", isLifeSupport: true },
  { id: "oxygen", name: "Rede de Oxigênio e Vácuo", icon: "oxygen", isLifeSupport: true },
  { id: "scanner", name: "Tomógrafo / Raio-X / Ultrassom", icon: "scanner", isLifeSupport: false },
  { id: "stretcher", name: "Maca / Leito / Cadeira de Rodas", icon: "stretcher", isLifeSupport: false },
  { id: "electrical", name: "Elétrica / No-Break / Gerador", icon: "electrical", isLifeSupport: true },
  { id: "plumbing", name: "Hidráulica / Torneiras Cirúrgicas", icon: "plumbing", isLifeSupport: false },
  { id: "hvac", name: "Ar Condicionado / Pressão Negativa", icon: "hvac", isLifeSupport: false },
  { id: "general", name: "Geral / Infraestrutura Hospitalar", icon: "general", isLifeSupport: false }
];

const DEPARTMENTS_LIST = [
  "Pronto-Socorro - Sala Vermelha (Emergência)",
  "Pronto-Socorro - Sala Amarela (Observação)",
  "Pronto-Socorro - Sala Verde (Atendimento)",
  "Pronto-Socorro - Triagem / Acolhimento",
  "UTI Adulto - Bloco A",
  "UTI Pediátrica e Neonatal - Bloco B",
  "Centro Cirúrgico Geral (Salas 1 a 6)",
  "Centro de Diagnóstico por Imagem (CDI)",
  "Laboratório de Análises Clínicas",
  "Ambulatório de Especialidades",
  "Central de Material Esterilizado (CME)"
];

  /* =========================================================================
     4. MOTOR DE NAVEGAÇÃO GOOGLE MAPS STYLE (FUSAM MAPS 2.0)
     ========================================================================= */
/**
 * Fusam Pronto-Socorro - Fusam Maps 2.0 (1000x Cooler Google Maps Navigation Engine)
 * Motor vetorial avançado estilo Apple/Google Maps com visual 2.5D arquitetônico,
 * rota de laser com setas direcionais animadas, sonar de emergência e HUD de telemetria.
 */



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
    this.radarAngle = 0;
    
    // Rota turn-by-turn do hospital
    this.routePoints = [
      { x: 100, y: 310 }, // Oficina da Engenharia Clínica
      { x: 210, y: 310 }, // Cruzamento Corredor Central
      { x: 210, y: 190 }, // Elevadores e Rampa Bloco A
      { x: 310, y: 190 }, // Acesso ao 2º Andar
      { x: 400, y: 120 }  // UTI Adulto - Leito 03
    ];

    this.init();
  }

  init() {
    if (!this.container) return;
    this.container.innerHTML = '';
    this.container.style.position = 'relative';
    this.container.style.overflow = 'hidden';
    this.container.style.borderRadius = '16px';
    this.container.style.userSelect = 'none';
    this.container.style.touchAction = 'none';

    // Canvas de Alto Desempenho
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
        this.routeProgress = 0.18;
        break;
      case 'in_transit':
        this.routeProgress = 0.62;
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
    // Painel de Controles Estilo Google Maps com Efeito Glassmorphism
    const controls = document.createElement('div');
    controls.className = 'absolute right-3 bottom-3 flex flex-col gap-1.5 z-20';
    controls.innerHTML = `
      <div class="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200/80 overflow-hidden flex flex-col">
        <button id="mapZoomIn" class="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold text-base transition-colors" title="Aproximar">+</button>
        <div class="w-full h-px bg-slate-200"></div>
        <button id="mapZoomOut" class="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold text-base transition-colors" title="Afastar">−</button>
      </div>
      <button id="mapRecenter" class="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors" title="Centralizar na Rota">
        🎯
      </button>
    `;
    this.container.appendChild(controls);

    // Botões no Topo do Mapa
    const topBar = document.createElement('div');
    topBar.className = 'absolute left-3 top-3 z-20 flex items-center gap-2';
    topBar.innerHTML = `
      <button id="mapToggleFloor" class="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-bold text-slate-800 shadow-md border border-slate-200/80 hover:border-cyan-500 hover:text-cyan-700 transition-all flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
        <span id="mapModeLabel">Planta Arquitetônica</span>
      </button>
      <span class="bg-slate-900/80 text-white backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider hidden sm:inline-flex items-center gap-1">
        LIVE GPS • 60 FPS
      </span>
    `;
    this.container.appendChild(topBar);

    // Banner Flutuante de Rota / Telemetria em Tempo Real
    this.etaBanner = document.createElement('div');
    this.etaBanner.className = 'absolute left-3 bottom-3 z-10 bg-slate-900/90 text-white backdrop-blur-md px-3.5 py-2 rounded-xl shadow-xl border border-slate-700/80 text-xs flex items-center gap-2.5 pointer-events-none max-w-[270px]';
    this.updateEtaBanner();
    this.container.appendChild(this.etaBanner);

    // Eventos dos Controles
    controls.querySelector('#mapZoomIn').onclick = (e) => {
      e.stopPropagation();
      audioEngine.playRadarScan();
      this.zoomAt(1.25);
    };
    controls.querySelector('#mapZoomOut').onclick = (e) => {
      e.stopPropagation();
      audioEngine.playRadarScan();
      this.zoomAt(0.8);
    };
    controls.querySelector('#mapRecenter').onclick = (e) => {
      e.stopPropagation();
      audioEngine.playRadarScan();
      this.recenter();
    };
    topBar.querySelector('#mapToggleFloor').onclick = (e) => {
      e.stopPropagation();
      audioEngine.playTabSwitch();
      this.isFloorPlan = !this.isFloorPlan;
      const lbl = topBar.querySelector('#mapModeLabel');
      if (lbl) lbl.textContent = this.isFloorPlan ? 'Vista Campus 3D' : 'Planta Arquitetônica';
      this.render();
    };
  }

  updateEtaBanner() {
    if (!this.etaBanner) return;
    const isDone = this.ticket?.status === 'completed';
    const eta = isDone ? 'Finalizado' : (this.ticket?.technician?.eta || '4 min');
    const dest = this.ticket?.department || 'UTI Adulto - Leito 03';
    
    this.etaBanner.innerHTML = `
      <div class="w-3 h-3 rounded-full ${isDone ? 'bg-emerald-400' : 'bg-cyan-400 animate-ping'} flex-shrink-0"></div>
      <div class="truncate">
        <div class="font-extrabold text-[11px] leading-tight text-white flex items-center gap-1.5">
          <span>${isDone ? 'Equipamento Entregue' : 'Técnico em Deslocamento'}</span>
          <span class="text-cyan-400 font-mono text-[10px]">(${isDone ? 'OK' : eta})</span>
        </div>
        <div class="text-[10px] text-slate-300 truncate mt-0.5">Destino: <strong class="text-white">${dest}</strong></div>
      </div>
    `;
  }

  zoomAt(factor) {
    this.zoom = Math.max(0.6, Math.min(2.8, this.zoom * factor));
    this.render();
  }

  recenter() {
    this.zoom = 1.05;
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
      const delta = e.deltaY < 0 ? 1.12 : 0.88;
      this.zoomAt(delta);
    }, { passive: false });
  }

  startAnimationLoop() {
    let dashOffset = 0;
    const loop = () => {
      dashOffset += 0.55;
      this.dashOffset = dashOffset;
      this.radarAngle += 0.04;
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
    if (this.routePoints.length < 2) return { x: 100, y: 100, angle: 0 };
    
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
    return { ...this.routePoints[this.routePoints.length - 1], angle: 0 };
  }

  render() {
    if (!this.ctx || !this.width) return;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.save();
    ctx.clearRect(0, 0, w, h);

    // Pan & Zoom
    ctx.translate(w / 2 + this.panX, h / 2 + this.panY);
    ctx.scale(this.zoom, this.zoom);
    ctx.translate(-250, -210);

    // 1. TERRENO / GRID GOOGLE MAPS
    this.drawTerrain(ctx);

    // 2. RUAS, CORREDORES E FAIXAS DE PEDESTRE
    this.drawRoads(ctx);

    // 3. EDIFÍCIOS HOSPITALARES COM SOMBRA 2.5D
    this.drawBuildings(ctx);

    // 4. ROTA DE NAVEGAÇÃO LASER COM SETAS ANIMADAS
    this.drawLaserRoute(ctx);

    // 5. SONAR RADAR E PINO DE DESTINO DO LEITO
    this.drawDestinationSonar(ctx);

    // 6. MARCADOR DO TÉCNICO COM AURÉOLA DE DESLOCAMENTO
    this.drawTechnicianVehicle(ctx);

    // 7. ROSA DOS VENTOS / COMPASSO
    this.drawCompass(ctx);

    ctx.restore();
  }

  drawTerrain(ctx) {
    // Fundo limpo de mapa urbano
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(-250, -250, 1000, 950);

    // Grid sutil arquitetônico
    ctx.strokeStyle = 'rgba(203, 213, 225, 0.45)';
    ctx.lineWidth = 0.5;
    for (let x = -200; x < 750; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, -200);
      ctx.lineTo(x, 700);
      ctx.stroke();
    }
    for (let y = -200; y < 700; y += 50) {
      ctx.beginPath();
      ctx.moveTo(-200, y);
      ctx.lineTo(750, y);
      ctx.stroke();
    }

    // Praças e Áreas Arborizadas
    ctx.fillStyle = '#e2f4e8';
    this.roundRect(ctx, -60, -30, 160, 120, 18);
    ctx.fill();

    this.roundRect(ctx, 360, 270, 180, 130, 18);
    ctx.fill();

    // Árvores em vetor Google Maps
    const trees = [
      { x: -20, y: 0 }, { x: 30, y: 15 }, { x: 60, y: -10 },
      { x: 380, y: 300 }, { x: 430, y: 340 }, { x: 480, y: 310 }, { x: 500, y: 360 }
    ];
    trees.forEach(t => {
      ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
      ctx.beginPath();
      ctx.arc(t.x, t.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(t.x, t.y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  drawRoads(ctx) {
    ctx.save();
    // Vias principais
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 28;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(-150, 190);
    ctx.lineTo(650, 190);
    ctx.moveTo(210, -150);
    ctx.lineTo(210, 550);
    ctx.moveTo(100, 310);
    ctx.lineTo(550, 310);
    ctx.stroke();

    // Asfalto Branco Iluminado
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 24;
    ctx.stroke();

    // Faixas pontilhadas de tráfego interno
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 12]);
    ctx.beginPath();
    ctx.moveTo(-120, 190);
    ctx.lineTo(620, 190);
    ctx.moveTo(210, -120);
    ctx.lineTo(210, 520);
    ctx.stroke();

    // Nome das Avenidas
    ctx.setLineDash([]);
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 8.5px "JetBrains Mono", sans-serif';
    ctx.fillText('AV. CENTRAL DE RESGATE FUSAM', 230, 185);
    ctx.fillText('CORREDOR TÉCNICO BIOMÉDICO', 222, 305);
    ctx.restore();
  }

  drawBuildings(ctx) {
    const buildings = [
      {
        id: 'uti',
        title: 'UTI ADULTO - BLOCO A',
        sub: '2º ANDAR • LEITO 03 (ALVO)',
        x: 320, y: 60, w: 160, h: 100,
        color: '#f0f9ff',
        edgeColor: '#bae6fd',
        borderColor: '#0284c7',
        badge: 'CÓDIGO VERMELHO',
        isTarget: true
      },
      {
        id: 'ps',
        title: 'PRONTO-SOCORRO',
        sub: 'SALA VERMELHA & RESGATE',
        x: 30, y: 60, w: 145, h: 100,
        color: '#fff1f2',
        edgeColor: '#fecdd3',
        borderColor: '#e11d48',
        badge: 'EMERGÊNCIA'
      },
      {
        id: 'surg',
        title: 'CENTRO CIRÚRGICO',
        sub: 'SALAS 01 A 06',
        x: 320, y: 220, w: 160, h: 85,
        color: '#f0fdf4',
        edgeColor: '#bbf7d0',
        borderColor: '#10b981',
        badge: 'CIRURGIA'
      },
      {
        id: 'biomed',
        title: 'ENGENHARIA CLÍNICA',
        sub: 'OFICINA & LAB BIOMÉDICO',
        x: 30, y: 260, w: 145, h: 90,
        color: '#ecfeff',
        edgeColor: '#a5f3fc',
        borderColor: '#0891b2',
        badge: 'BASE TÉCNICA'
      }
    ];

    buildings.forEach(b => {
      ctx.save();

      // 2.5D Extrusão / Sombra Arquitetônica
      ctx.fillStyle = b.edgeColor;
      this.roundRect(ctx, b.x + 3, b.y + 4, b.w, b.h, 12);
      ctx.fill();

      // Face Superior do Edifício
      ctx.fillStyle = b.color;
      this.roundRect(ctx, b.x, b.y, b.w, b.h, 12);
      ctx.fill();

      // Borda com Destaque
      ctx.strokeStyle = b.borderColor;
      ctx.lineWidth = b.isTarget ? 2 : 1;
      ctx.stroke();

      // Badge no Canto
      ctx.fillStyle = b.isTarget ? '#e11d48' : b.borderColor;
      this.roundRect(ctx, b.x + 10, b.y + 12, 70, 14, 4);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 7px -apple-system, sans-serif';
      ctx.fillText(b.badge, b.x + 15, b.y + 22);

      // Título e Subtítulo
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 9.5px -apple-system, sans-serif';
      ctx.fillText(b.title, b.x + 10, b.y + 42);

      ctx.fillStyle = '#64748b';
      ctx.font = '8px -apple-system, sans-serif';
      ctx.fillText(b.sub, b.x + 10, b.y + 55);

      // Leitos Internos em Zoom
      if (this.zoom > 1.1) {
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
          ctx.strokeRect(b.x + 10 + i * 46, b.y + 64, 40, 24);
          ctx.fillStyle = '#94a3b8';
          ctx.font = '7px monospace';
          ctx.fillText(`L0${i + 1}`, b.x + 14 + i * 46, b.y + 76);
        }
      }

      ctx.restore();
    });

    // Heliporto H1 com Radar Giratório
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(520, 115, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Feixe de Radar no Heliporto
    ctx.beginPath();
    ctx.moveTo(520, 115);
    ctx.arc(520, 115, 25, this.radarAngle, this.radarAngle + 0.4);
    ctx.closePath();
    ctx.fillStyle = 'rgba(6, 182, 212, 0.3)';
    ctx.fill();

    ctx.fillStyle = '#0b5cab';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('H', 520, 115);
    ctx.restore();
  }

  drawLaserRoute(ctx) {
    if (this.routePoints.length < 2) return;

    ctx.save();

    // 1. Halo Neon Externo (Glow)
    ctx.beginPath();
    ctx.moveTo(this.routePoints[0].x, this.routePoints[0].y);
    for (let i = 1; i < this.routePoints.length; i++) {
      ctx.lineTo(this.routePoints[i].x, this.routePoints[i].y);
    }
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // 2. Trilha Azul Profundo
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 6;
    ctx.stroke();

    // 3. Laser Elétrico Ciano
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // 4. Setas Direcionais Dinâmicas em Movimento
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 14]);
    ctx.lineDashOffset = -this.dashOffset;
    ctx.stroke();

    ctx.restore();
  }

  drawDestinationSonar(ctx) {
    const target = this.routePoints[this.routePoints.length - 1];

    ctx.save();
    // Sonar Ondular de Emergência
    for (let r = 0; r < 3; r++) {
      const pulse = ((Date.now() / 600 + r * 0.4) % 1.2);
      ctx.beginPath();
      ctx.arc(target.x, target.y, 8 + pulse * 28, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(225, 29, 72, ${1 - pulse / 1.2})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Pino Estilo Google Maps 3D
    ctx.translate(target.x, target.y);

    ctx.fillStyle = '#e11d48';
    ctx.beginPath();
    ctx.arc(0, -20, 13, 0, Math.PI * 2);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.shadowColor = 'rgba(225, 29, 72, 0.4)';
    ctx.shadowBlur = 10;
    ctx.fill();

    // Núcleo Branco
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, -20, 5.5, 0, Math.PI * 2);
    ctx.fill();

    // Tooltip Holográfico
    ctx.fillStyle = '#090d16';
    this.roundRect(ctx, -48, -50, 96, 20, 6);
    ctx.fill();
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 8.5px "JetBrains Mono", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LEITO 03 • UTI', 0, -36);

    ctx.restore();
  }

  drawTechnicianVehicle(ctx) {
    const pos = this.getPointAlongRoute(this.routeProgress);

    ctx.save();
    ctx.translate(pos.x, pos.y);

    // Pulso Ciano de Telemetria
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(6, 182, 212, 0.25)';
    ctx.fill();

    // Sombra do Veículo
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fillStyle = '#0b5cab';
    ctx.shadowColor = 'rgba(6, 182, 212, 0.6)';
    ctx.shadowBlur = 10;
    ctx.fill();

    // Anel Branco
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Ícone de Deslocamento
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🛵', 0, 0.5);

    // Badge com Telemetria e Velocidade ao Vivo
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    this.roundRect(ctx, -42, -30, 84, 16, 5);
    ctx.fill();
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 8px "JetBrains Mono", sans-serif';
    ctx.fillText('24 km/h • EM ROTA', 0, -19);

    ctx.restore();
  }

  drawCompass(ctx) {
    ctx.save();
    ctx.translate(560, 40);

    // Fundo da Bússola
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(226, 232, 240, 0.9)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Agulha Norte Vermelha
    ctx.fillStyle = '#e11d48';
    ctx.beginPath();
    ctx.moveTo(0, -12);
    ctx.lineTo(-4, 0);
    ctx.lineTo(4, 0);
    ctx.closePath();
    ctx.fill();

    // Agulha Sul Cinza
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(0, 12);
    ctx.lineTo(-4, 0);
    ctx.lineTo(4, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 8px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('N', 0, -14);
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
     5. RASTREADOR DE REPAROS ESTILO DELIVERY (COM FUSAM GOOGLE MAPS)
     ========================================================================= */
/**
 * Fusam Pronto-Socorro - Delivery Tracker Engine (com Fusam Google Maps)
 * Rastreamento de reparos hospitalares em tempo real estilo aplicativo de entregas.
 */





const TRACKING_STEPS = [
  {
    key: 'received',
    title: 'Chamado Aberto',
    subtitle: 'Triagem e Verificação',
    icon: Icons.received
  },
  {
    key: 'assigned',
    title: 'Especialista Alocado',
    subtitle: 'Técnico Biomédico Designado',
    icon: Icons.userCheck
  },
  {
    key: 'in_transit',
    title: 'A Caminho do Leito',
    subtitle: 'Deslocamento no Hospital',
    icon: Icons.transit
  },
  {
    key: 'in_repair',
    title: 'Em Manutenção',
    subtitle: 'Diagnóstico e Reparo Técnico',
    icon: Icons.wrench
  },
  {
    key: 'testing',
    title: 'Testes & Calibração',
    subtitle: 'Controle de Qualidade Hospitalar',
    icon: Icons.calibration
  },
  {
    key: 'completed',
    title: 'Equipamento Liberado',
    subtitle: 'Certificado e Pronto para Paciente',
    icon: Icons.completed
  }
];

class RepairTracker {
  constructor(app) {
    this.app = app;
    this.currentTicket = null;
    this.autoSimTimer = null;
    this.modalEl = null;
    this.hospitalMap = null;
    this.confettiAnimFrame = null;
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
    this.stopConfettiVFX();
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
    const curIdx = this.getCurrentStepIndex();
    if (curIdx < TRACKING_STEPS.length - 1) {
      const nextStep = TRACKING_STEPS[curIdx + 1];
      if (nextStep.key === 'completed') {
        // Clicando para a etapa final: aciona a celebração completa com confetes e fanfarra
        this.updateStatus('completed');
      } else {
        audioEngine.playStepAdvance();
        this.updateStatus(nextStep.key);
      }
    }
  }

  regressStep() {
    if (!this.currentTicket) return;
    audioEngine.playStepRegress();
    const curIdx = this.getCurrentStepIndex();
    if (curIdx > 0) {
      const prevStep = TRACKING_STEPS[curIdx - 1];
      this.updateStatus(prevStep.key);
    }
  }

  /**
   * Dispara o efeito comemorativo completo: SFX de vitória + VFX de confetes em tela cheia
   */
  triggerConfetti() {
    audioEngine.playConfettiCelebration();
    this.launchConfettiVFX();
  }

  launchConfettiVFX() {
    this.stopConfettiVFX();

    let canvas = document.getElementById('fusamConfettiCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'fusamConfettiCanvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '99999';
      document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      '#06b6d4', // Cyan elétrico Fusam
      '#0284c7', // Azul Hospitalar Fusam
      '#10b981', // Verde Esmeralda Sucesso
      '#f59e0b', // Dourado Celebração
      '#ec4899', // Rosa Magenta
      '#8b5cf6', // Violeta
      '#38bdf8'  // Azul Celeste
    ];

    const particleCount = 150;
    const particles = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.32;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 8 + Math.random() * 15;
      particles.push({
        x: centerX + (Math.random() - 0.5) * 200,
        y: centerY + (Math.random() - 0.5) * 80,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 5,
        gravity: 0.28 + Math.random() * 0.16,
        friction: 0.98,
        wobble: Math.random() * 10,
        wobbleSpeed: 0.08 + Math.random() * 0.06,
        size: 7 + Math.random() * 7,
        width: 6 + Math.random() * 9,
        height: 10 + Math.random() * 9,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 1,
        shape: Math.random() > 0.4 ? 'rect' : (Math.random() > 0.5 ? 'circle' : 'ribbon')
      });
    }

    const startTime = performance.now();
    const duration = 3800;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      if (elapsed > duration) {
        this.stopConfettiVFX();
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.wobble += p.wobbleSpeed;
        p.rotation += p.rotationSpeed;

        if (elapsed > duration * 0.65) {
          p.opacity = Math.max(0, 1 - (elapsed - duration * 0.65) / (duration * 0.35));
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;

        const wobbleX = p.x + Math.sin(p.wobble) * 8;
        ctx.translate(wobbleX, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'ribbon') {
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(-p.width / 2, -p.height / 2);
          ctx.quadraticCurveTo(0, p.height / 4, p.width / 2, p.height / 2);
          ctx.stroke();
        } else {
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        }

        ctx.restore();
      });

      this.confettiAnimFrame = requestAnimationFrame(animate);
    };

    this.confettiAnimFrame = requestAnimationFrame(animate);
  }

  stopConfettiVFX() {
    if (this.confettiAnimFrame) {
      cancelAnimationFrame(this.confettiAnimFrame);
      this.confettiAnimFrame = null;
    }
    const canvas = document.getElementById('fusamConfettiCanvas');
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
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
      // Disparo automático de confetes e áudio ao concluir chamado
      this.triggerConfetti();
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
    
    // Atualizar mapa interativo sem recriar se já existir
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
    audioEngine.playNoteAdded();
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
      <!-- HEADER DO RASTREADOR -->
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

      <!-- HERO BANNER COM STATUS DELIVERY -->
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

        ${t.status === 'completed' ? `
          <div class="celebration-hero-pill">
            <div class="flex items-center gap-2.5">
              <span class="text-xl">🎉</span>
              <div>
                <div class="font-extrabold text-xs text-emerald-950 uppercase tracking-wider">Equipamento Liberado & Certificado!</div>
                <div class="text-[11px] text-emerald-700">Controle de qualidade concluído e laudo emitido com sucesso.</div>
              </div>
            </div>
            <button id="triggerConfettiAgainBtn" class="btn-stylish btn-fusam-cyan text-xs py-1 px-3 ml-auto">
              🎉 Soltar Confetes
            </button>
          </div>
        ` : ''}
      </div>

      <!-- STEPPER HORIZONTAL -->
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

      <!-- GRID COM MAPA ESTILO GOOGLE MAPS -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-3">
        
        <!-- COLUNA ESQUERDA: MAPA INTERATIVO FUSAM MAPS -->
        <div class="lg:col-span-7 space-y-3">
          
          <!-- GOOGLE MAPS CONTAINER INTERATIVO -->
          <div class="bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm">
            <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs">
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></span>
                <span class="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Fusam Maps • Rota de Intervenção</span>
              </div>
              <span class="text-slate-400 text-[10px]">Arraste para mover • Scroll para zoom</span>
            </div>

            <!-- CANVAS CONTAINER DO MAPA INTERATIVO -->
            <div id="interactiveHospitalMapContainer" class="w-full h-64 rounded-xl relative overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
            </div>
          </div>

          <!-- CARD DO TÉCNICO BIOMÉDICO -->
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

        <!-- COLUNA DIREITA: CONTROLES, TIMELINE & OS -->
        <div class="lg:col-span-5 space-y-3">
          
          <!-- CONTROLES DO SIMULADOR -->
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

          <!-- HISTÓRICO DE MANUTENÇÃO & FEED DE ATIVIDADES (ULTRA-CLEAN) -->
          <div class="activity-feed-container">
            <div class="activity-feed-header">
              <div class="flex items-center gap-2">
                <span class="activity-feed-dot"></span>
                <h3 class="activity-feed-title">Histórico de Atendimento</h3>
              </div>
              <span class="activity-feed-count">${t.timeline.length} eventos</span>
            </div>

            <div class="activity-feed-scroll">
              <div class="activity-timeline-track">
                ${t.timeline.slice().reverse().map((event, idx) => `
                  <div class="activity-timeline-item ${idx === 0 ? 'is-latest' : ''}">
                    <div class="activity-timeline-node"></div>
                    <div class="activity-card">
                      <div class="activity-card-header">
                        <span class="activity-event-title">${event.title}</span>
                        <span class="activity-time-pill">${event.time}</span>
                      </div>
                      <p class="activity-event-desc">${event.description}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <form id="addNoteForm" class="activity-note-form">
              <div class="activity-input-wrapper">
                <input type="text" id="techNoteInput" placeholder="Adicionar nota técnica ao chamado..." class="activity-note-input" required />
                <button type="submit" class="activity-note-btn">
                  ${Icons.send} Registrar
                </button>
              </div>
            </form>
          </div>

          <!-- DESCRIÇÃO TÉCNICA & LAUDO -->
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

    // Inicializa o mapa estilo Google Maps no container
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
      callBtn.onclick = (e) => {
        e.preventDefault();
        audioEngine.playRadioComm();
      };
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

    const confettiBtn = document.getElementById('triggerConfettiAgainBtn');
    if (confettiBtn) {
      confettiBtn.onclick = () => this.triggerConfetti();
    }

    const stepNodes = document.querySelectorAll('.step-node');
    stepNodes.forEach((node, idx) => {
      node.style.cursor = 'pointer';
      node.title = `Ir para: ${TRACKING_STEPS[idx].title}`;
      node.onclick = () => {
        if (idx === TRACKING_STEPS.length - 1) {
          this.updateStatus(TRACKING_STEPS[idx].key);
        } else {
          audioEngine.playStepAdvance();
          this.updateStatus(TRACKING_STEPS[idx].key);
        }
      };
    });
  }
}

  /* =========================================================================
     6. APLICAÇÃO PRINCIPAL FUSAM PRONTO
     ========================================================================= */
/**
 * Fusam Pronto-Socorro - Aplicação Principal (1000x Cooler Edition)
 * Gerenciamento de chamados, relógio de telemetria em tempo real, filtros dinâmicos e áudio tátil.
 */






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
    this.startClock();
  }

  startClock() {
    const update = () => {
      const clock = document.getElementById('clockTime');
      if (clock) {
        const now = new Date();
        clock.textContent = now.toLocaleTimeString('pt-BR');
      }
    };
    update();
    setInterval(update, 1000);
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
        const topTicket = activeCritical[0];
        textEl.innerHTML = `
          <div class="flex items-center gap-2 flex-wrap mb-1">
            <span class="emergency-badge-code-red">🚨 ${activeCritical.length} CÓDIGO VERMELHO ATIVO</span>
            <span class="emergency-equip-title">${topTicket.equipmentName}</span>
            <span class="emergency-pat-tag">Pat: ${topTicket.patrimony || 'PAT-003190'}</span>
            <span class="emergency-sector-tag">${topTicket.department}</span>
          </div>
          <div class="flex items-center gap-2 flex-wrap text-xs text-slate-600">
            <span class="emergency-sla-tag">⏱️ SLA Resposta: &lt; ${topTicket.estimatedMinutesRemaining || 15} min</span>
            <span class="text-slate-300">•</span>
            <span class="emergency-tech-tag">👨‍🔬 ${topTicket.technician?.name || 'Técnico Biomédico em Deslocamento'}</span>
            <span class="text-slate-300">•</span>
            <span class="text-slate-500 text-[11px] font-mono">Local: ${topTicket.sectorLocation}</span>
          </div>
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
        <div class="col-span-full py-14 text-center bg-white/90 backdrop-blur rounded-3xl border border-slate-200/80 p-8 shadow-sm">
          <div class="w-14 h-14 mx-auto mb-3 text-cyan-600 bg-cyan-50 rounded-2xl flex items-center justify-center shadow-inner">
            ${Icons.inbox}
          </div>
          <h3 class="text-base font-bold text-slate-800">Nenhum chamado no filtro ativo</h3>
          <p class="text-xs text-slate-400 max-w-xs mx-auto mt-1">
            Abra uma nova solicitação ou selecione outra categoria.
          </p>
          <button id="openNewTicketEmptyBtn" class="mt-4 btn-stylish btn-fusam-primary text-xs">
            ${Icons.plusCircle} Abrir Nova Solicitação
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
            <!-- LINHA SUPERIOR COM ÍCONE GLOW E BADGE HOLOGRÁFICA -->
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-3">
                <div class="ticket-icon-box ${isCritical ? 'critical' : ''}">
                  ${categoryIcon}
                </div>
                <div>
                  <span class="ticket-id-tag font-mono font-bold">${t.id}</span>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">${t.createdAt.split(' ')[1] || t.createdAt}</div>
                </div>
              </div>

              <span class="badge-clean ${t.priority}">
                ${priorityMeta.icon}
                ${priorityMeta.label}
              </span>
            </div>

            <!-- TÍTULO PRINCIPAL E LOCALIZAÇÃO -->
            <h3 class="text-sm font-bold text-slate-900 mt-3 leading-snug line-clamp-2">
              ${t.title}
            </h3>
            
            <div class="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5 truncate">
              <span class="text-cyan-700 font-semibold truncate">${t.department}</span>
              <span class="text-slate-300">•</span>
              <span class="text-slate-400 text-[11px] font-mono">Pat: ${t.patrimony || 'S/N'}</span>
            </div>
          </div>

          <!-- MINI RADAR DE DELIVERY HUD -->
          <div class="card-delivery-bar">
            <div class="flex items-center justify-between text-[11px] font-semibold text-slate-800">
              <span class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full ${t.status === 'completed' ? 'bg-emerald-500' : (isCritical ? 'bg-rose-500 animate-ping' : 'bg-cyan-500')}"></span>
                <span>${stepMeta.title}</span>
              </span>
              <span class="text-cyan-700 text-[11px] font-extrabold font-mono">
                ${t.status === 'completed' ? '✅ Liberado' : (t.technician ? `ETA ${t.technician.eta}` : 'Aguardando')}
              </span>
            </div>

            <div class="mini-track-line">
              <div class="mini-track-fill" style="width: ${progressPercent}%;"></div>
            </div>

            <!-- TÉCNICO DESIGNADO -->
            <div class="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
              <div class="flex items-center gap-2 truncate">
                <span class="text-sm">${t.technician?.avatar || '👨‍🔬'}</span>
                <span class="font-medium text-slate-700 truncate">${t.technician?.name || 'Técnico em designação'}</span>
              </div>
              <span class="text-cyan-600 font-bold text-[10px] uppercase font-mono tracking-wider">${priorityMeta.slaText}</span>
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
        <div class="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200/80">
          <div class="w-12 h-12 mx-auto mb-2 text-cyan-600 bg-cyan-50 rounded-full flex items-center justify-center">
            ${Icons.inbox}
          </div>
          <h4 class="text-sm font-bold text-slate-800">Caixa de entrada vazia</h4>
          <p class="text-xs text-slate-400 mt-1">Nenhum comunicado da central no momento.</p>
        </div>
      `;
      return;
    }

    const priorityBadge = (priority) => {
      if (priority === 'critical') {
        return `<span class="badge-clean critical">🚨 Prioridade Máxima</span>`;
      } else if (priority === 'high' || priority === 'medium') {
        return `<span class="badge-clean medium">⚡ Engenharia Clínica</span>`;
      } else {
        return `<span class="badge-clean low">ℹ️ Informativo</span>`;
      }
    };

    listEl.innerHTML = this.inbox.map(m => `
      <div class="inbox-msg-card ${m.priority || 'medium'}" data-msg-id="${m.id}">
        <div class="flex items-center justify-between flex-wrap gap-2 mb-1.5">
          <div class="flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center text-xs font-bold">
              ${m.priority === 'critical' ? '🚨' : (m.priority === 'medium' ? '⚙️' : '📢')}
            </span>
            <div>
              <span class="font-extrabold text-xs text-slate-900">${m.sender}</span>
              <div class="text-[10px] text-slate-400 font-mono">${m.time}</div>
            </div>
          </div>
          ${priorityBadge(m.priority)}
        </div>

        <h4 class="text-xs font-bold text-slate-900 mt-2 mb-1 leading-snug">${m.subject}</h4>
        <p class="text-xs text-slate-600 leading-relaxed">${m.content}</p>

        <div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span class="flex items-center gap-1 text-cyan-700 font-semibold">
            ${Icons.checkCircle} Comunicado Oficial Fusam
          </span>
          <span class="text-slate-400 text-[10px] font-mono">${m.id}</span>
        </div>
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
    const pinnedFooter = document.querySelector('.modal-pinned-footer');
    const modalTitle = document.getElementById('modalHeaderTitle');
    const modalSubtitle = document.getElementById('modalHeaderSubtitle');
    const modalBadge = document.getElementById('modalIconBadge');

    if (tab === 'create') {
      tabCreate?.classList.add('active');
      tabMessages?.classList.remove('active');
      contentCreate?.classList.remove('hidden');
      contentMessages?.classList.add('hidden');
      if (pinnedFooter) pinnedFooter.style.display = 'flex';

      if (modalTitle) modalTitle.textContent = 'Nova Solicitação de Manutenção';
      if (modalSubtitle) modalSubtitle.textContent = 'Pronto-Socorro & Engenharia Clínica Fusam';
      if (modalBadge) {
        modalBadge.innerHTML = `<svg class="lucide" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`;
      }
    } else {
      tabMessages?.classList.add('active');
      tabCreate?.classList.remove('active');
      contentMessages?.classList.remove('hidden');
      contentCreate?.classList.add('hidden');
      if (pinnedFooter) pinnedFooter.style.display = 'none';

      if (modalTitle) modalTitle.textContent = 'Caixa de Entrada & Avisos da Central';
      if (modalSubtitle) modalSubtitle.textContent = 'Comunicados oficiais, diretoria e despachos biomédicos';
      if (modalBadge) {
        modalBadge.innerHTML = `<svg class="lucide" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>`;
      }
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
      audioEngine.playDispatchWhoosh();
      setTimeout(() => {
        audioEngine.playUrgentSiren();
      }, 250);
    } else {
      audioEngine.playDispatchWhoosh();
      setTimeout(() => {
        audioEngine.playSuccess();
      }, 200);
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
    // Telemetria ECG interativa: clique para ouvir batimentos cardíacos simulados
    const ecgBadge = document.getElementById('telemetryEcgBadge');
    if (ecgBadge) {
      ecgBadge.onclick = () => {
        ecgBadge.classList.add('ecg-beating');
        audioEngine.playHeartbeatPulse();
        setTimeout(() => ecgBadge.classList.remove('ecg-beating'), 1400);
      };
    }

    // Botão Caixa de Entrada no cabeçalho: abre diretamente a tela de Mensagens/Avisos
    const openInboxHeaderBtn = document.getElementById('openInboxHeaderBtn');
    if (openInboxHeaderBtn) {
      openInboxHeaderBtn.onclick = () => this.openInboxModal('messages');
    }

    // Botão Novo Chamado no cabeçalho: abre diretamente o formulário de abertura de chamado
    const openNewTicketHeaderBtn = document.getElementById('openNewTicketHeaderBtn');
    if (openNewTicketHeaderBtn) {
      openNewTicketHeaderBtn.onclick = () => this.openInboxModal('create');
    }

    // Botão flutuante inferior: abre formulário de nova solicitação
    const floatingActionBtn = document.getElementById('floatingNewTicketBtn');
    if (floatingActionBtn) {
      floatingActionBtn.onclick = () => this.openInboxModal('create');
    }

    // Atalho dentro da tela da Caixa de Entrada para abrir nova solicitação
    const inboxNewTicketShortcutBtn = document.getElementById('inboxNewTicketShortcutBtn');
    if (inboxNewTicketShortcutBtn) {
      inboxNewTicketShortcutBtn.onclick = () => this.switchInboxTab('create');
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
        if (!catSelect.value) {
          audioEngine.playClick();
          return;
        }

        // Tocar som biomédico distintivo e com diversidade conforme o equipamento selecionado
        audioEngine.playEquipmentSelect(catSelect.value || 'general');

        const selectedOpt = catSelect.options[catSelect.selectedIndex];
        const isLife = selectedOpt && selectedOpt.getAttribute('data-lifesupport') === 'true';
        if (isLife) {
          lifeSupportCheckbox.checked = true;
          prioritySelect.value = 'critical';
          const alertHelp = document.getElementById('lifeSupportAlert');
          if (alertHelp) alertHelp.classList.remove('hidden');
          // Alerta sonoro de emergência médica logo após o bip do aparelho
          setTimeout(() => audioEngine.playUrgentSiren(), 180);
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

    // Segmented Control Tabs
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

    // Dropdown de Categoria (Filtro Superior) - Som de Equipamento
    const filterCatSelect = document.getElementById('filterCategorySelect');
    if (filterCatSelect) {
      filterCatSelect.onchange = (e) => {
        if (e.target.value !== 'all') {
          audioEngine.playEquipmentSelect(e.target.value);
        } else {
          audioEngine.playClick();
        }
        this.categoryFilter = e.target.value;
        this.renderTickets();
      };
    }

    // Campo de Busca
    const searchInput = document.getElementById('searchTicketsInput');
    if (searchInput) {
      searchInput.oninput = (e) => {
        this.searchQuery = e.target.value;
        this.renderTickets();
      };
    }

    // Alerta Sonoro Toggle
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    if (soundToggleBtn) {
      soundToggleBtn.onclick = () => {
        this.soundActive = audioEngine.toggleSound();
        soundToggleBtn.classList.toggle('sound-muted', !this.soundActive);
        const spanText = soundToggleBtn.querySelector('span');
        if (spanText) {
          spanText.textContent = this.soundActive ? 'Som: Ativado' : 'Som: Silenciado';
        }
        soundToggleBtn.classList.toggle('text-slate-400', !this.soundActive);
      };
    }

    // Presets rápidos no formulário (Preenchimento em 1 clique) - Som Biomédico com Assinatura do Aparelho
    const presetButtons = document.querySelectorAll('.quick-preset-btn');
    presetButtons.forEach(btn => {
      btn.onclick = () => {
        const cat = btn.getAttribute('data-cat') || 'general';
        // Tocar som biomédico específico com rica diversidade sonora
        audioEngine.playEquipmentSelect(cat);

        const title = btn.getAttribute('data-title');
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

    // Reset de Demonstração
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
