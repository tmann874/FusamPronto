/**
 * Fusam Pronto-Socorro - Delivery Tracker Engine (com Fusam Google Maps)
 * Rastreamento de reparos hospitalares em tempo real estilo aplicativo de entregas.
 */

import { Icons, getCategoryIcon, getPriorityMeta } from './icons.js';
import { audioEngine } from './audio.js';
import { GoogleStyleHospitalMap } from './map.js';

export const TRACKING_STEPS = [
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

export class RepairTracker {
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

          <!-- HISTÓRICO DE MANUTENÇÃO -->
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
