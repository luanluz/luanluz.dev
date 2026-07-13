import { state } from './common.js';
import { APPS } from '../assets/data/apps.js';
import { resumeHref, resumeFilename } from '../assets/data/resume.js';
import { renderContent } from './card.js';

export function isPhoneSheetMode() {
  return window.matchMedia('(max-width: 560px)').matches;
}

export function setPhoneCollapsed(collapsed) {
  if (!isPhoneSheetMode()) collapsed = false;
  state.phoneCollapsed = !!collapsed;
  var wrap = document.querySelector('.phone-wrap');
  if (wrap) {
    wrap.classList.add('is-ready');
    wrap.classList.toggle('is-collapsed', state.phoneCollapsed);
  }
  document.body.classList.toggle('phone-collapsed', state.phoneCollapsed);
}

export function onApp(id) {
  var app = APPS.filter(function (a) { return a.id === id; })[0];
  if (!app) return;
  if (app.kind === 'info') {
    state.active = state.active === id ? null : id;
    renderContent();
    setPhoneCollapsed(!!state.active);
  } else if (app.kind === 'download') {
    var el = document.createElement('a');
    el.href = resumeHref(state.lang);
    el.download = resumeFilename(state.lang);
    document.body.appendChild(el);
    el.click();
    el.remove();
  } else {
    window.open(app.href, '_blank', 'noopener');
  }
}

export function goHome() { state.active = null; setPhoneCollapsed(false); renderContent(); }
