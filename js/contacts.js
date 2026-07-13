import { state, tr } from './common.js';
import { UI } from '../assets/data/ui.js';
import { tpl, text, qs, attr, setPh, addClass } from './dom.js';

var ACTION_ICONS = {
  open: 'arrow-square-out',
  map: 'map-pin',
  copy: 'copy',
  mail: 'envelope'
};

function appendAction(actionsRoot, type, b) {
  var icon = ACTION_ICONS[type] || ACTION_ICONS.open;
  var label = { mail: 'email', open: 'open', map: 'map', copy: 'copy' }[type] || type;
  if (type === 'copy') {
    var copyFrag = tpl('tpl-contacts-act-copy');
    attr(copyFrag, '.act-copy', 'data-copy', b.detail);
    attr(copyFrag, '.act-copy', 'aria-label', label);
    actionsRoot.appendChild(copyFrag);
    return;
  }
  var openFrag = tpl('tpl-contacts-act-open');
  var link = qs(openFrag, 'a');
  link.href = b.href;
  link.classList.add('act-' + type);
  link.setAttribute('aria-label', label);
  setPh(openFrag, 'i', icon);
  actionsRoot.appendChild(openFrag);
}

export function renderContacts(blocks) {
  var grouped = {};
  var order = [];
  blocks.forEach(function (b) {
    var name = tr(b.name);
    var letter = (name.charAt(0) || '#').toUpperCase();
    if (!grouped[letter]) {
      grouped[letter] = [];
      order.push(letter);
    }
    grouped[letter].push(b);
  });

  var home = tpl('tpl-contacts-app');
  var list = qs(home, '.contacts-list');

  order.forEach(function (letter) {
    var group = tpl('tpl-contacts-group');
    text(group, '.contacts-letter', letter);
    var groupRoot = qs(group, '.contacts-group');

    grouped[letter].forEach(function (b) {
      var name = tr(b.name);
      var row = tpl('tpl-contacts-row');
      addClass(row, '.contacts-avatar', 'tone-' + (b.tone || 'violet'));
      text(row, '.contacts-avatar', b.initial || name.charAt(0));
      text(row, '.contacts-name', name);
      text(row, '.contacts-detail', b.detail);
      var actionsRoot = qs(row, '.contacts-actions');
      (b.actions || ['open']).forEach(function (a) {
        appendAction(actionsRoot, a, b);
      });
      groupRoot.appendChild(row);
    });

    list.appendChild(group);
  });

  return home;
}

export function bindContactsApp() {
  Array.prototype.forEach.call(document.querySelectorAll('.contacts-act.act-copy'), function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var copyText = btn.getAttribute('data-copy') || '';
      var done = function () {
        var prev = btn.getAttribute('aria-label');
        btn.setAttribute('aria-label', UI[state.lang].copied);
        btn.style.transform = 'scale(.94)';
        setTimeout(function () {
          btn.style.transform = '';
          btn.setAttribute('aria-label', prev || 'copy');
        }, 900);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyText).then(done).catch(done);
      } else {
        done();
      }
    });
  });
}
