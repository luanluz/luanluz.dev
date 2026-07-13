import { state, tr } from './common.js';
import { UI } from '../assets/data/ui.js';
import { tpl, text, qs, setPh, remove } from './dom.js';

export function parseJobChips(chips) {
  var meta = { place: '', mode: '', period: '' };
  (chips || []).forEach(function (c) {
    var t = tr(c);
    var tl = t.toLowerCase();
    if (/remoto|remote|híbrido|hibrido|hybrid|presencial|on-site|onsite/.test(tl)) meta.mode = t;
    else if (/(–|—|-)/.test(t) && /\d{4}|atual|present|actual/i.test(t)) meta.period = t;
    else if (/brasil|brazil|tocantins|palmas/i.test(t)) meta.place = t;
  });
  return meta;
}

export function jobModeIcon(mode) {
  var m = String(mode || '').toLowerCase();
  if (/remoto|remote/.test(m)) return 'laptop';
  if (/híbrido|hibrido|hybrid/.test(m)) return 'house';
  return 'buildings';
}

function appendFact(factsRoot, iconName, value) {
  var fact = tpl('tpl-career-fact');
  setPh(fact, 'i', iconName);
  var spans = fact.querySelectorAll('span');
  if (spans.length) spans[spans.length - 1].textContent = value;
  factsRoot.appendChild(fact);
}

export function renderCareer(blocks) {
  var u = UI[state.lang];
  var home = tpl('tpl-career-home');
  var root = qs(home, '.career-home');

  blocks.filter(function (b) { return b.k === 'j'; }).forEach(function (b) {
    var meta = parseJobChips(b.chips);
    var year = typeof b.year === 'string' ? b.year : tr(b.year);
    var badge = b.current ? u.now : year;
    var job = tpl('tpl-career-job');
    var article = qs(job, '.career-job');
    if (b.current) article.classList.add('is-current');

    text(job, '.career-job-title', tr(b.role));
    text(job, '.career-job-badge', badge);
    text(job, '.career-job-org', b.org);
    text(job, '.career-job-cta-label', u.details);

    var factsRoot = qs(job, '.career-job-facts');
    if (meta.period) appendFact(factsRoot, 'clock', meta.period);
    if (meta.place) appendFact(factsRoot, 'map-pin', meta.place);
    if (meta.mode) appendFact(factsRoot, jobModeIcon(meta.mode), meta.mode);

    var bullets = b.b || [];
    if (bullets.length) {
      var ul = qs(job, '.career-job-details ul');
      bullets.forEach(function (x) {
        var liFrag = tpl('tpl-career-bullet');
        text(liFrag, 'li', tr(x));
        ul.appendChild(liFrag);
      });
    } else {
      remove(job, '.career-job-details');
    }

    root.appendChild(job);
  });

  return home;
}

export function bindCareerApp(onToggle) {
  var u = UI[state.lang];
  Array.prototype.forEach.call(document.querySelectorAll('.career-job'), function (card) {
    function toggle() {
      if (!card.querySelector('.career-job-details')) return;
      var open = card.classList.toggle('is-open');
      card.setAttribute('aria-expanded', open ? 'true' : 'false');
      var label = card.querySelector('.career-job-cta-label');
      if (label) label.textContent = open ? u.hideDetails : u.details;
      if (typeof onToggle === 'function') onToggle();
    }
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
}
