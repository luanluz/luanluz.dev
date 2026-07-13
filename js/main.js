import { state } from './common.js';
import {
  detectLang,
  detectTheme,
  setLang,
  applyTheme,
  toggleTheme
} from './theme-lang.js';
import { initStatusBar } from './status.js';
import { setPhoneCollapsed, isPhoneSheetMode } from './phone.js';
import { fitHeroTitle } from './hero.js';
import { updateCardScrollFade } from './card.js';
import { loadTemplates } from './dom.js';

function bindChrome() {
  document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.getAttribute('data-set-lang'));
    });
  });
  var themeBtn = document.getElementById('theme-btn');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
}

function bindPhone() {
  var phoneWrap = document.querySelector('.phone-wrap');
  if (!phoneWrap) return;
  phoneWrap.addEventListener('animationend', function (e) {
    if (e.animationName === 'phoneRise') phoneWrap.classList.add('is-ready');
  });
  phoneWrap.addEventListener('click', function (e) {
    if (!state.phoneCollapsed) return;
    e.preventDefault();
    e.stopPropagation();
    setPhoneCollapsed(false);
  });
}

async function init() {
  await loadTemplates('templates/app.html');
  bindChrome();
  setLang(detectLang());
  applyTheme(detectTheme());
  initStatusBar();
  bindPhone();

  window.addEventListener('resize', function () {
    if (!isPhoneSheetMode() && state.phoneCollapsed) setPhoneCollapsed(false);
    if (!state.active) fitHeroTitle();
    else updateCardScrollFade();
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      if (!state.active) fitHeroTitle();
    });
  }
}

init();
