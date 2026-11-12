# 🏥 FUSAM PRONTO - Central de Emergências e Engenharia Clínica

> Interface minimalista, moderna e de alta usabilidade para triagem de emergências hospitalares, abertura de solicitações e **rastreamento de reparos em tempo real com mapa interativo estilo Google Maps / Uber Eats**.

---

## 🎨 Identidade Visual & Design Minimalista
- **Logo Oficial Fusam**: Integrado diretamente no título/cabeçalho da aplicação e como favicon.
- **Visual Clean & Sofisticado**:
  - Predominantemente branco (`#ffffff` / `#fcfcfd`) com tipografia nítida, espaçamento generoso e visual despoluído.
  - Detalhes em azul marinho hospitalar (`#0b5cab`) e ciano eletro-médico (`#06b6d4`, `#0891b2`), fiéis às cores do logotipo.
  - Cartões com bordas ultrafinas (*hairline*), cantos arredondados suaves e elevação sutil em hover.
  - Controle segmentado em pílula (*Apple/Linear style*) para filtragem rápida sem poluição visual.
- **Alertas de Emergência Sutis**: Alerta em pílula flutuante (*toast*) com ponto pulsante vermelho e botão para ouvir a sirene, substituindo banners pesados.

---

## 🗺️ Fusam Maps (Navegação Interativa Estilo Google Maps)
O mapa estático foi completamente reformulado para um **motor de navegação vetorial interativo**, inspirado diretamente no Google Maps e Uber Eats:
- **Totalmente Interativo**:
  - 🖱️ **Arrastar e Mover (Pan)**: Clique e arraste pelo campus e corredores hospitalares.
  - 🔍 **Zoom Fluido (+ / −)**: Controles na lateral e suporte a rolagem do mouse (wheel).
  - 🎯 **Botão Centralizar**: Foco imediato na posição do técnico e no destino do chamado.
  - 🏥 **Alternar Visão**: Alterne entre a vista do complexo hospitalar e a visualização detalhada de leitos.
- **Rota Dinâmica e Viva**:
  - Linha azul elétrico com **traços animados em movimento contínuo** mostrando o trajeto exato da Oficina Biomédica até a UTI / Leito.
  - **Marcador do Técnico em Tempo Real**: Ícone de deslocamento que avança suavemente pela rota conforme o status do reparo é atualizado.
  - **Pino de Destino Pulsante**: Marcador vermelho com radar animado afixado sobre o leito/box que necessita de intervenção.
  - **Badge Flutuante de ETA**: Previsão de chegada estimada (ex: *🛵 Chegando em 4 min • Rumo a: UTI Adulto*).

---

## 🔊 Efeitos Sonoros Táteis & Sirene Médica (Web Audio API)
- **Feedback de Clique Tátil**: Cada clique em botões, abas, cartões e opções emite um clique sonoro suave e satisfatório (sintetizado via Web Audio API, sem depender de arquivos externos).
- **Sirene Médica de Urgência**: Para chamados com prioridade máxima (Código Vermelho / equipamentos de suporte à vida), toca um alarme hospitalar característico em dois tons.
- **Botão de Som no Cabeçalho**: Permite ativar ou silenciar todos os efeitos sonoros com um único clique.

---

## ✨ Funcionalidades Principais

### 1. 📋 Registro Descomplicado de Problemas
- Formulário minimalista e objetivo para médicos, enfermeiros e equipes de apoio.
- Botões de **1 clique** (*Presets rápidos*) para problemas recorrentes:
  - 🚨 Respirador Pulmonar com queda de pressão (UTI)
  - ⚡ Desfibrilador com erro de bateria (Sala Vermelha)
  - 💧 Vazamento na rede de oxigênio medicinal
  - 🛏️ Maca de resgate com trava hidráulica bloqueada
- Detecção automática de equipamento de suporte à vida com ativação imediata de Código Vermelho (SLA < 15 min).

### 2. 🛵 Rastreamento de Reparos no Estilo App de Entregas (Delivery)
Ao clicar em qualquer cartão de chamado:
- **Etapas Visuais do Reparo**:
  1. *Aberto* (Triagem e verificação)
  2. *Alocado* (Técnico biomédico de plantão designado com foto, registro CREA/CFT e ramal)
  3. *A Caminho* (Deslocamento no hospital com estimativa em minutos)
  4. *Em Reparo* (Diagnóstico, bancada e substituição de peças)
  5. *Calibração* (Testes de segurança elétrica e aferição técnica)
  6. *Liberado* (Certificado e liberado para uso com paciente)
- **Simulador Interativo**: Botões para avançar etapas manualmente ou ativar a simulação ao vivo automática.
- **Linha do Tempo & OS**: Histórico cronológico e botão direto para impressão da Ordem de Serviço hospitalar.

### 3. 📥 Caixa de Entrada de Solicitações
- Botão no cabeçalho e botão flutuante (*Floating Action Pill*) para acesso imediato.
- Divisão em abas: *Escrever Solicitação* e *Avisos da Central de Engenharia*.

---

## 🚀 Como Visualizar e Testar

### Opção 1: Abrir diretamente no navegador (Sem instalação)
Dê um duplo clique no arquivo:
```
index.html
```

### Opção 2: Iniciar o servidor local Node.js
```bash
node server.js
```
Acesse em:
```
http://localhost:3000
```

---

## 📁 Estrutura do Projeto

```
FusamPronto/
├── assets/
│   └── fusam-logo.jpg   # Logotipo oficial da Fusam
├── index.html           # Interface minimalista e responsiva
├── css/
│   └── style.css        # Design System minimalista, branco, azul e ciano
├── js/
│   ├── map.js           # Motor interativo Fusam Maps (estilo Google Maps)
│   ├── audio.js         # Sintetizador de cliques táteis e sirene de emergência
│   ├── tracker.js       # Rastreamento de reparos estilo app de entrega
│   ├── app.js           # Gerenciador de chamados, filtros e modais
│   ├── bundle.js        # Script empacotado para compatibilidade total file:/// e HTTP
│   ├── icons.js         # Biblioteca de ícones SVG clínicos
│   └── data.js          # Base de demonstração com chamados realistas
├── server.js            # Servidor local nativo em Node.js
├── package.json         # Configurações do projeto
└── README.md            # Documentação
```

---

*Fusam Pronto — Tecnologia, precisão e cuidado a serviço da vida.*
