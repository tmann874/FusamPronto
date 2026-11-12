/**
 * Fusam Pronto-Socorro - Dados Iniciais de Chamados e Equipamentos
 */

export const INITIAL_TICKETS = [
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

export const INBOX_MESSAGES = [
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

export const CATEGORIES_LIST = [
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

export const DEPARTMENTS_LIST = [
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
