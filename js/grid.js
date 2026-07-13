import { APPS } from '../assets/data/apps.js';
import { tr, iconSrc } from './common.js';
import { onApp } from './phone.js';
import { tpl, text, qs } from './dom.js';

export function renderGrid() {
  var g = document.getElementById('grid');
  g.replaceChildren();
  APPS.forEach(function (a) {
    var frag = tpl('tpl-tile');
    var btn = qs(frag, '.tile');
    btn.setAttribute('data-id', a.id);
    var img = qs(frag, '.tile-icon');
    img.src = iconSrc(a.id);
    if (a.kind === 'info' && a.badge) {
      var badgeFrag = tpl('tpl-tile-badge');
      text(badgeFrag, '.badge', a.badge);
      btn.appendChild(badgeFrag);
    }
    text(frag, '.tile-label', tr(a.label));
    g.appendChild(frag);
  });
  Array.prototype.forEach.call(g.querySelectorAll('.tile'), function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      onApp(btn.getAttribute('data-id'));
    });
  });
}
