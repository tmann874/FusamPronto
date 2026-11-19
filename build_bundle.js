import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function cleanModule(code) {
  // Remove import statements (single or multiline)
  let clean = code.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '');
  // Replace export const / export function / export class with const / function / class
  clean = clean.replace(/export\s+(const|let|var|function|class)\s+/g, '$1 ');
  // Remove export default
  clean = clean.replace(/export\s+default\s+/g, '');
  // Remove named export lists like export { a, b };
  clean = clean.replace(/export\s*\{[\s\S]*?\};?/g, '');
  return clean.trim();
}

const icons = cleanModule(fs.readFileSync(path.join(__dirname, 'js/icons.js'), 'utf8'));
const audio = cleanModule(fs.readFileSync(path.join(__dirname, 'js/audio.js'), 'utf8'));
const data = cleanModule(fs.readFileSync(path.join(__dirname, 'js/data.js'), 'utf8'));
const map = cleanModule(fs.readFileSync(path.join(__dirname, 'js/map.js'), 'utf8'));
const tracker = cleanModule(fs.readFileSync(path.join(__dirname, 'js/tracker.js'), 'utf8'));
const app = cleanModule(fs.readFileSync(path.join(__dirname, 'js/app.js'), 'utf8'));

const bundle = `/**
 * Fusam Pronto-Socorro - Bundle Unificado Ultra-Cool (Fusam Maps 2.0 & Cyber-Clinical Edition)
 * Suporta execução direta em file:/// e servidor HTTP sem dependências externas.
 */

(function () {
  'use strict';

  /* =========================================================================
     1. BIBLIOTECA DE ÍCONES SVG MÉDICOS E UI
     ========================================================================= */
${icons}

  /* =========================================================================
     2. MOTOR DE ÁUDIO TÁTIL & SIRENE MÉDICA (WEB AUDIO API)
     ========================================================================= */
${audio}

  /* =========================================================================
     3. BASE DE DADOS CLÍNICA & CONFIGURAÇÕES HOSPITALARES
     ========================================================================= */
${data}

  /* =========================================================================
     4. MOTOR DE NAVEGAÇÃO GOOGLE MAPS STYLE (FUSAM MAPS 2.0)
     ========================================================================= */
${map}

  /* =========================================================================
     5. RASTREADOR DE REPAROS ESTILO DELIVERY (COM FUSAM GOOGLE MAPS)
     ========================================================================= */
${tracker}

  /* =========================================================================
     6. APLICAÇÃO PRINCIPAL FUSAM PRONTO
     ========================================================================= */
${app}

})();
`;

fs.writeFileSync(path.join(__dirname, 'js/bundle.js'), bundle, 'utf8');
console.log('Bundle generated successfully! Size: ' + bundle.length + ' bytes');
