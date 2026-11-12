/**
 * Fusam Pronto-Socorro - Aplicação Principal (Minimalist & Cool)
 * Gerenciamento de chamados, inbox, triagem com efeitos sonoros táteis e sirene médica.
 */

import { INITIAL_TICKETS, INBOX_MESSAGES, CATEGORIES_LIST, DEPARTMENTS_LIST } from './data.js';
import { Icons, getCategoryIcon, getPriorityMeta } from './icons.js';
import { audioEngine } from './audio.js';
import { RepairTracker, TRACKING_STEPS } from './tracker.js';

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
          
          <!-- TOP ROW: ICON, ID, PRIORITY -->
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

            <!-- TITLE & LOCATION -->
            <h3 class="text-sm font-bold text-slate-900 mt-2.5 leading-snug line-clamp-2">
              ${t.title}
            </h3>
            
            <div class="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1.5 truncate">
              <span class="text-cyan-700 font-semibold truncate">${t.department}</span>
              <span class="text-slate-300">•</span>
              <span class="text-slate-400 text-[11px] font-mono">Pat: ${t.patrimony || 'S/N'}</span>
            </div>
          </div>

          <!-- MINI DELIVERY TRACKER -->
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

            <!-- MINI TECH INFO -->
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

    // Dropdown de Categoria
    const filterCatSelect = document.getElementById('filterCategorySelect');
    if (filterCatSelect) {
      filterCatSelect.onchange = (e) => {
        audioEngine.playClick();
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
        soundToggleBtn.innerHTML = this.soundActive ? `${Icons.volume2} Som: Ativado` : `${Icons.volumeX} Som: Silenciado`;
        soundToggleBtn.classList.toggle('text-slate-400', !this.soundActive);
      };
    }

    // Presets rápidos no formulário
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
