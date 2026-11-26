/**
 * Fusam Pronto-Socorro - Fusam Maps 2.0 (1000x Cooler Google Maps Navigation Engine)
 * Motor vetorial avançado estilo Apple/Google Maps com visual 2.5D arquitetônico,
 * rota de laser com setas direcionais animadas, sonar de emergência e HUD de telemetria.
 */

import { audioEngine } from './audio.js';

export class GoogleStyleHospitalMap {
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
