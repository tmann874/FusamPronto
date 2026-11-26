# 🏥 Fusam Pronto — Sistema de Atendimento e Rastreamento de Reparos Hospitalares

> **1000x Cooler Cyber-Clinical Edition**  
> Interface predominantemente branca com detalhes em azul royal e ciano elétrico, telemetria em tempo real, motor de navegação Fusam Maps 2.0 (estilo Google Maps), efeitos sonoros táteis e priorização inteligente de emergências médicas.

---

## ✨ Destaques Visuais & Funcionais

1. **Estética Cyber-Clínica Minimalista**:
   - Predominantemente branca e limpa com gradientes sutis de azul Fusam (`#0b5cab`) e ciano elétrico (`#06b6d4`).
   - Efeito Glassmorphism de alta tecnologia (`backdrop-filter: blur(20px)`), anel holográfico giratório ao redor do logo oficial da Fusam e cantos arredondados modernos.
   - Linha de ECG (eletrocardiograma) animada no topo com indicador de telemetria "SISTEMA OPERACIONAL • SLA 100%".
   - Relógio de telemetria de plantão em tempo real no cabeçalho.

2. **Fusam Maps 2.0 (Estilo Google Maps)**:
   - Motor em HTML5 Canvas de alta performance com visão isométrica 2.5D dos blocos hospitalares (Bloco Cirúrgico, UTI Adulto, Pronto-Socorro, Heliponto H1).
   - Rota vetorial com feixe de laser animado e setas pulsantes de direção.
   - Sonar dinâmico no leito de destino e radar giratório no heliponto.
   - Controles interativos estilo Google Maps: **arrastar/pan**, **zoom (+ / -)**, **botão de recentralizar 🎯** e alternância entre **Planta Arquitetônica** e **Campus 3D**.
   - Avatar do técnico biomédico com telemetria ao vivo de velocidade e rumo.

3. **Rastreamento Estilo Delivery (iFood / Uber)**:
   - Acompanhamento etapa por etapa: *Chamado Aberto ➔ Especialista Alocado ➔ A Caminho ➔ Em Manutenção ➔ Testes & Calibração ➔ Liberado*.
   - Botão **"Simular Avanço"** para demonstração interativa do progresso em tempo real.
   - Registro de notas técnicas ao vivo e botão para impressão de Ordem de Serviço (OS).

4. **Motor de Áudio Tátil & Sirene Médica (Web Audio API)**:
   - Sons sintetizados em tempo real sem arquivos pesados: clique mecânico suave para botões, tom de troca de abas, acorde de sucesso ao liberar equipamento e sirene de dois tons para chamados de Código Vermelho (suporte à vida).
   - Botão para silenciar/ativar áudio no cabeçalho.

5. **Caixa de Entrada & Abertura Rápida de Chamados**:
   - Botão dinâmico flutuante e atalho no cabeçalho para abrir a caixa de mensagens e formulário.
   - Botões de preenchimento rápido em 1 clique (Respirador UTI, Desfibrilador Sala Vermelha, Vazamento O2, Maca Travada).
   - Priorização automática de emergências críticas quando marcado equipamento de suporte à vida.

---

## 🚀 Como Executar

O projeto é 100% autocontido, sem necessidade de instalar pacotes npm externos.

### Opção 1: Execução Direta (Sem Servidor)
Dê um duplo clique no arquivo [`index.html`](file:///c:/Users/NOTE-GAMTLAB-06/Desktop/FusamPronto/index.html) para abrir diretamente no Google Chrome ou Microsoft Edge via protocolo `file:///`.

### Opção 2: Servidor Local Node.js
No terminal, execute:
```bash
node server.js
```
Em seguida, abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 📁 Estrutura de Arquivos

```
FusamPronto/
├── index.html           # Estrutura principal da aplicação com HUD e modais
├── README.md            # Documentação completa
├── server.js            # Servidor HTTP local leve em Node.js nativo
├── build_bundle.js      # Script de empacotamento unificado
├── assets/
│   └── fusam-logo.jpg   # Logo oficial da Fusam
├── css/
│   └── style.css        # Sistema de design cyber-clínico (1000x cooler)
└── js/
    ├── icons.js         # Biblioteca de ícones SVG médicos e UI
    ├── audio.js         # Sintetizador de áudio Web Audio API (cliques e sirene)
    ├── data.js          # Dados iniciais de chamados, mensagens e equipamentos
    ├── map.js           # Motor de navegação Fusam Maps 2.0 (Google Maps Canvas)
    ├── tracker.js       # Rastreamento de entregas/reparos e controle de etapas
    ├── app.js           # Orquestrador da aplicação, formulários e relógio
    └── bundle.js        # Script unificado para compatibilidade offline total
```
