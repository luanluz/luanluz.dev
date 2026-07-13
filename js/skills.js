import { tr } from './common.js';
import { tpl, text, qs, setPh } from './dom.js';

export function skillsIconFor(label) {
  var t = String(label || '').toLowerCase();
  if (/mobile$/.test(t) && !/prác|prac|practice/.test(t)) return 'device-mobile';
  if (/prác|prac|practice/.test(t)) return 'wrench';
  if (/front/.test(t)) return 'browser';
  if (/back/.test(t)) return 'database';
  if (/arqui|devops|arch/.test(t)) return 'tree-structure';
  if (/soft/.test(t)) return 'users';
  return 'squares-four';
}

export function renderSkills(blocks) {
  var frag = document.createDocumentFragment();
  blocks.filter(function (b) { return b.k === 'g'; }).forEach(function (b) {
    var label = tr(b.l);
    var group = tpl('tpl-skill-group');
    setPh(group, '.group-label i', skillsIconFor(label));
    text(group, '.group-label-text', label);
    var chips = qs(group, '.chips');
    (b.items || []).forEach(function (c) {
      var chip = tpl('tpl-skill-chip');
      text(chip, '.chip', c);
      chips.appendChild(chip);
    });
    frag.appendChild(group);
  });
  return frag;
}

export function renderLangRow(b) {
  var frag = tpl('tpl-lang-row');
  text(frag, '.n', tr(b.name));
  text(frag, '.lv', tr(b.level));
  return frag;
}
