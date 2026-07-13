import { IC } from '../assets/data/icons.js';

export const state = {
  active: null,
  lang: 'en',
  theme: 'light',
  translate: { from: 'pt', to: 'en' },
  phoneCollapsed: false
};

export function tr(v) {
  return (v && typeof v === 'object' && !Array.isArray(v)) ? (v[state.lang] || v.en || v.pt) : v;
}

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function iconSrc(id) {
  return IC[id] || 'assets/icons/about.webp';
}
