import { state } from './common.js';
import { renderGrid } from './grid.js';
import { renderContent, updatePageBackground } from './card.js';
import { setPh } from './dom.js';

export function detectLang() {
  var supported = { pt: true, en: true, es: true };
  var list = [];
  try {
    if (navigator.languages && navigator.languages.length) {
      list = Array.prototype.slice.call(navigator.languages);
    } else if (navigator.language) {
      list = [navigator.language];
    }
  } catch (e) { }
  for (var i = 0; i < list.length; i++) {
    var code = String(list[i] || '').toLowerCase().split('-')[0];
    if (supported[code]) return code;
  }
  return 'en';
}

export function detectTheme() {
  try {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  } catch (e) { }
  return 'light';
}

export function setLang(l) {
  state.lang = l;
  document.body.classList.remove('lang-pt', 'lang-en', 'lang-es');
  document.body.classList.add('lang-' + l);
  document.getElementById('btn-pt').className = l === 'pt' ? 'on' : '';
  document.getElementById('btn-en').className = l === 'en' ? 'on' : '';
  document.getElementById('btn-es').className = l === 'es' ? 'on' : '';
  document.documentElement.lang = l;
  renderGrid();
  renderContent();
}

export function themeGlyph() {
  var dark = state.theme === 'dark';
  setPh(document, '#theme-btn i', dark ? 'sun' : 'moon');
}

export function toggleTheme() {
  applyTheme(state.theme === 'dark' ? 'light' : 'dark');
}

export function applyTheme(theme) {
  state.theme = theme === 'dark' ? 'dark' : 'light';
  document.body.classList.toggle('dark', state.theme === 'dark');
  themeGlyph();
  updatePageBackground();
}
