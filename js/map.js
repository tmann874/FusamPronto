/**
 * Fusam Pronto-Socorro - Google Maps Style Interactive Hospital Navigation Engine
 * Mapa interativo estilo Google Maps / Uber Eats com suporte a arrastar (pan),
 * zoom (+ / -), rota animada em tempo real, marcadores dinâmicos e planta do hospital.
 */

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
    this.routeProgress = 0.55; // 0 = Oficina, 1 = Leito
    this.isFloorPlan = false; // false: Campus, true: Planta Interna
    
    // Rota definida por pontos no mapa
    this.routePoints = [
      { x: 110, y: 310 }, // Oficina Biomédica
      { x: 210, y: 310 }, // Corredor Principal
      { x: 210, y: 200 }, // Elevadores Bloco A
      { x: 310, y: 200 }, // Hall 2º Andar
      { x: 390, y: 130 }  // UTI Adulto - Leito 03
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

    // Criação do Canvas
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'w-full h-full block cursor-grab';
    this.canvas.style.display = 'block';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    // Controles estilo Google Maps (Zoom +, Zoom -, Centralizar, Alternar Visão)
    this.createMapControls();

    // Eventos de redimensionamento
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Eventos de Mouse & Touch (Arrastar e Zoom)
    this.bindInteractions();

    // Iniciar loop de renderização e animação
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
    // Container de Controles
    const controls = document.createElement('div');
    controls.className = 'absolute right-3 bottom-3 flex flex-col gap-1.5 z-20';
    controls.innerHTML = `
      <div class="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden flex flex-col">
        <button id="mapZoomIn" class="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold text-base transition-colors" title="Aproximar">+</button>
        <div class="w-full h-px bg-slate-200"></div>
        <button id="mapZoomOut" class="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold text-base transition-colors" title="Afastar">−</button>
      </div>
      <button id="mapRecenter" class="w-8 h-8 rounded-lg bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors" title="Centralizar no Técnico">
        🎯
      </button>
    `;
    this.container.appendChild(controls);

    // Botão de Alternar Modo (Campus / Planta Interna)
    const modeBtn = document.createElement('div');
    modeBtn.className = 'absolute left-3 top-3 z-20 flex gap-1.5';
    modeBtn.innerHTML = `
      <button id="mapToggleFloor" class="bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-700 shadow-sm border border-slate-200 hover:border-cyan-500 transition-all flex items-center gap-1">
        <span>🏥</span> <span id="mapModeLabel">Planta Interna</span>
      </button>
    `;
    this.container.appendChild(modeBtn);

    // Banner de Rota Google Maps Style no Topo
    this.etaBanner = document.createElement('div');
    this.etaBanner.className = 'absolute left-3 bottom-3 z-10 bg-slate-900/90 text-white backdrop-blur px-3 py-1.5 rounded-xl shadow-lg border border-slate-700 text-xs flex items-center gap-2 pointer-events-none max-w-[240px]';
    this.updateEtaBanner();
    this.container.appendChild(this.etaBanner);

    // Bind dos cliques nos controles
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
    // Mouse Drag (Pan)
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

    // Touch Drag (Mobile)
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

    // Mouse Wheel (Zoom)
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
    
    // Calcula distâncias totais dos segmentos
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

    // Transformação Pan & Zoom centralizado
    ctx.translate(w / 2 + this.panX, h / 2 + this.panY);
    ctx.scale(this.zoom, this.zoom);
    ctx.translate(-250, -220); // Centraliza no complexo hospitalar

    // 1. TERRENO / MAPA BASE ESTILO GOOGLE MAPS
    this.drawTerrain(ctx);

    // 2. RUAS E CORREDORES HOSPITALARES
    this.drawRoadsAndCorridors(ctx);

    // 3. BLOCOS E PAVILHÕES DO HOSPITAL COM NOMES
    this.drawHospitalBuildings(ctx);

    // 4. ROTA DE NAVEGAÇÃO GOOGLE MAPS STYLE (CYAN / BLUE GLOW)
    this.drawNavigationRoute(ctx);

    // 5. MARCADOR DE DESTINO (LEITO / EQUIPAMENTO)
    this.drawDestinationPin(ctx);

    // 6. MARCADOR DO TÉCNICO (VEÍCULO / TÉCNICO EM DESLOCAMENTO)
    this.drawTechnicianMarker(ctx);

    ctx.restore();
  }

  drawTerrain(ctx) {
    // Fundo cinza suave típico do Google Maps
    ctx.fillStyle = '#f4f3f0';
    ctx.fillRect(-200, -200, 900, 900);

    // Áreas Verdes / Jardins do Hospital
    ctx.fillStyle = '#e5f3e5';
    this.roundRect(ctx, -50, -40, 160, 120, 16);
    ctx.fill();

    this.roundRect(ctx, 360, 260, 160, 140, 16);
    ctx.fill();

    // Pequenas árvores decorativas no estilo Google Maps
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
    // Avenidas e Ruas de Acesso Externo
    ctx.strokeStyle = '#dadce0';
    ctx.lineWidth = 26;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Traçado das vias principais
    ctx.beginPath();
    ctx.moveTo(-150, 200);
    ctx.lineTo(650, 200);
    ctx.moveTo(210, -150);
    ctx.lineTo(210, 550);
    ctx.moveTo(110, 310);
    ctx.lineTo(550, 310);
    ctx.stroke();

    // Superfície branca das ruas (Google Maps Style)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 22;
    ctx.stroke();

    // Nomes sutis das ruas no estilo Google Maps
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

      // Sombra suave do edifício
      ctx.shadowColor = 'rgba(0, 0, 0, 0.06)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 3;

      // Fundo do edifício
      ctx.fillStyle = b.color;
      this.roundRect(ctx, b.x, b.y, b.w, b.h, 10);
      ctx.fill();

      // Borda sutil
      ctx.shadowColor = 'transparent';
      ctx.strokeStyle = b.borderColor;
      ctx.lineWidth = b.isTarget ? 2 : 1;
      ctx.stroke();

      // Rótulos do edifício
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 9.5px -apple-system, sans-serif';
      ctx.fillText(b.title, b.x + 10, b.y + 24);

      ctx.fillStyle = '#64748b';
      ctx.font = '8px -apple-system, sans-serif';
      ctx.fillText(b.sub, b.x + 10, b.y + 38);

      // Divisórias internas dos leitos quando der zoom
      if (this.zoom > 1.1) {
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
        ctx.lineWidth = 1;
        for (let i = 1; i <= 3; i++) {
          ctx.strokeRect(b.x + 10 + (i - 1) * 42, b.y + 48, 36, 32);
        }
      }

      ctx.restore();
    });

    // Ponto de Heliporto H1
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

    // 1. Linha base de contorno da rota (Google Maps Route Border)
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

    // 2. Linha principal azul elétrico Google Maps
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 5;
    ctx.stroke();

    // 3. Efeito de traços animados em direção ao destino (Uber / Google style)
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
    // Efeito de radar pulsante sob o leito
    const pulseRadius = 14 + Math.sin(Date.now() / 250) * 4;
    ctx.beginPath();
    ctx.arc(endPoint.x, endPoint.y, pulseRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(225, 29, 72, 0.2)';
    ctx.fill();

    // Marcador Pin estilo Google Maps
    ctx.translate(endPoint.x, endPoint.y);
    
    // Sombra do pin
    ctx.beginPath();
    ctx.ellipse(0, 4, 8, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fill();

    // Corpo do Pin Vermelho/Ciano
    ctx.fillStyle = '#e11d48';
    ctx.beginPath();
    ctx.arc(0, -18, 12, 0, Math.PI * 2);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();

    // Círculo branco central
    ctx.beginPath();
    ctx.arc(0, -18, 5.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Tooltip estilo Google Maps com nome do leito
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

    // Efeito de pulso ciano de rastreamento
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(6, 182, 212, 0.25)';
    ctx.fill();

    // Base circular com sombra
    ctx.beginPath();
    ctx.arc(0, 0, 11, 0, Math.PI * 2);
    ctx.fillStyle = '#0891b2';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;
    ctx.fill();

    // Borda branca do marcador
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Ícone de Scooter / Técnico no centro
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🛵', 0, 0.5);

    // Etiqueta com o nome do técnico
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
