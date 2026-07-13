import { state, tr } from './common.js';
import { UI } from '../assets/data/ui.js';
import { LANG_PHRASE, LANG_CODES } from '../assets/data/languages.js';
import { LANGUAGES } from '../assets/data/languages-list.js';
import { renderLangRow } from './skills.js';
import { tpl, text, qs, attr } from './dom.js';

export function langBlockByCode(blocks, code) {
  return blocks.filter(function (b) { return b.code === code; })[0];
}

export function nextTranslateLang(current, avoid) {
  var i = LANG_CODES.indexOf(current);
  if (i < 0) i = 0;
  for (var n = 1; n <= LANG_CODES.length; n++) {
    var c = LANG_CODES[(i + n) % LANG_CODES.length];
    if (c !== avoid) return c;
  }
  return current;
}

export function renderLanguages(blocks) {
  var u = UI[state.lang];
  var from = state.translate.from;
  var to = state.translate.to;
  if (from === to) state.translate.to = nextTranslateLang(to, from);
  to = state.translate.to;
  var fromBlock = langBlockByCode(blocks, from);
  var toBlock = langBlockByCode(blocks, to);

  var frag = tpl('tpl-translate-app');
  text(frag, '#translate-from-btn', tr(fromBlock.name));
  text(frag, '#translate-to-btn', tr(toBlock.name));
  attr(frag, '#translate-swap', 'aria-label', u.swap);
  text(frag, '.translate-from-label', u.phraseFrom);
  text(frag, '.translate-to-label', u.phraseTo + ' · ' + u.level);
  text(frag, '#translate-src', LANG_PHRASE[from]);
  text(frag, '#translate-dst', LANG_PHRASE[to]);
  text(frag, '#translate-level', tr(toBlock.level));

  var list = qs(frag, '.lang-list');
  blocks.forEach(function (b) {
    list.appendChild(renderLangRow(b));
  });

  return frag;
}

export function bindTranslateApp() {
  var root = document.querySelector('.translate-app');
  if (!root) return;
  var blocks = LANGUAGES.blocks;

  function refresh() {
    var from = state.translate.from;
    var to = state.translate.to;
    var fromBlock = langBlockByCode(blocks, from);
    var toBlock = langBlockByCode(blocks, to);
    var fromBtn = document.getElementById('translate-from-btn');
    var toBtn = document.getElementById('translate-to-btn');
    var src = document.getElementById('translate-src');
    var dst = document.getElementById('translate-dst');
    var level = document.getElementById('translate-level');
    if (fromBtn) fromBtn.textContent = tr(fromBlock.name);
    if (toBtn) toBtn.textContent = tr(toBlock.name);
    if (src) src.textContent = LANG_PHRASE[from];
    if (dst) dst.textContent = LANG_PHRASE[to];
    if (level) level.textContent = tr(toBlock.level);
  }

  var swap = document.getElementById('translate-swap');
  if (swap) swap.addEventListener('click', function () {
    var tmp = state.translate.from;
    state.translate.from = state.translate.to;
    state.translate.to = tmp;
    refresh();
  });

  Array.prototype.forEach.call(root.querySelectorAll('.translate-lang'), function (btn) {
    btn.addEventListener('click', function () {
      var side = btn.getAttribute('data-side');
      if (side === 'from') {
        state.translate.from = nextTranslateLang(state.translate.from, state.translate.to);
      } else {
        state.translate.to = nextTranslateLang(state.translate.to, state.translate.from);
      }
      refresh();
    });
  });
}
