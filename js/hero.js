import { state } from './common.js';
import { UI } from '../assets/data/ui.js';
import { tpl, text } from './dom.js';

export function renderHero() {
  var u = UI[state.lang];
  var frag = tpl('tpl-hero');
  text(frag, '[data-line="1"]', u.title[0]);
  text(frag, '[data-line="2"]', u.title[1]);
  return frag;
}

export function fitHeroTitle() {
  var el = document.getElementById('hero-title');
  if (!el) return;
  var spans = el.querySelectorAll('.hero-line');
  if (!spans.length) return;

  el.style.width = '100%';
  el.style.maxWidth = '100%';
  el.style.marginLeft = '0';
  el.style.marginRight = '0';
  el.style.height = 'auto';
  el.style.fontSize = '';

  var maxW = el.clientWidth;
  if (!maxW) maxW = Math.min(window.innerWidth - 40, 1920);
  var cs = getComputedStyle(el);

  function textWidth(span) {
    var range = document.createRange();
    range.selectNodeContents(span);
    var w = range.getBoundingClientRect().width;
    range.detach();
    return w;
  }

  function fitSpan(span, index) {
    var scaleVar = cs.getPropertyValue('--hero-line-' + (index + 1) + '-scale').trim();
    var scale = parseFloat(scaleVar);
    if (!scale || scale <= 0) scale = 1;
    var target = maxW * Math.min(scale, 1);

    span.style.display = 'block';
    span.style.width = '100%';
    span.style.textAlign = 'center';
    span.style.fontSize = '12px';

    var lo = 12;
    var hi = 520;
    var best = lo;

    while (hi - lo > 0.25) {
      var mid = (lo + hi) / 2;
      span.style.fontSize = mid + 'px';
      if (textWidth(span) <= target) {
        best = mid;
        lo = mid;
      } else {
        hi = mid;
      }
    }

    span.style.fontSize = best + 'px';
  }

  for (var i = 0; i < spans.length; i++) fitSpan(spans[i], i);
}
