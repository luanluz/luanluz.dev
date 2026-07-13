import { state, tr } from './common.js';
import { APPS } from '../assets/data/apps.js';
import { SEC } from '../assets/data/sections.js';
import { renderHero, fitHeroTitle } from './hero.js';
import { renderAbout, bindAboutApp } from './about.js';
import { renderSkills } from './skills.js';
import { renderCareer, bindCareerApp } from './career.js';
import { renderEducation } from './education.js';
import { renderLanguages, bindTranslateApp } from './languages.js';
import { renderContacts, bindContactsApp } from './contacts.js';
import { goHome } from './phone.js';
import { tpl, text, qs, attr } from './dom.js';

var SECTION_RENDERERS = {
  sobre: renderAbout,
  skills: renderSkills,
  exp: renderCareer,
  edu: renderEducation,
  lang: renderLanguages,
  contato: renderContacts
};

export function renderCard(id) {
  var sec = SEC[id];
  if (!sec) return document.createDocumentFragment();
  var render = SECTION_RENDERERS[id] || renderSkills;
  var bodyFrag = render(sec.blocks);
  var frag = tpl('tpl-card');
  text(frag, '.card-title', tr(sec.title));
  attr(frag, '.card-close', 'aria-label', 'fechar');
  qs(frag, '.card-body').appendChild(bodyFrag);
  return frag;
}

export function updateCardScrollFade() {
  var main = document.querySelector('.card-main');
  var body = document.querySelector('.card-body');
  if (!main || !body) return;
  var canScroll = body.scrollHeight > body.clientHeight + 1;
  main.classList.toggle('has-scroll', canScroll);
  body.classList.toggle('has-scroll', canScroll);
}

export function updatePageBackground() {
  var dark = state.theme === 'dark';
  var home = dark ? '#000000' : '#f9f9f9';
  var bg = home;
  if (state.active) {
    var app = APPS.filter(function (a) { return a.id === state.active; })[0];
    if (app && app.pageBg) bg = dark ? app.pageBg.dark : app.pageBg.light;
  }
  document.body.style.setProperty('--bg', bg);
  document.body.style.setProperty('--bg-fade', bg);
}

export function renderContent() {
  var root = document.getElementById('content');
  root.replaceChildren(state.active ? renderCard(state.active) : renderHero());
  updatePageBackground();
  if (!state.active) {
    requestAnimationFrame(function () {
      fitHeroTitle();
      requestAnimationFrame(fitHeroTitle);
    });
  } else {
    requestAnimationFrame(function () {
      document.querySelectorAll('[data-go-home]').forEach(function (btn) {
        btn.addEventListener('click', goHome);
      });
      bindContactsApp();
      bindTranslateApp();
      bindCareerApp(updateCardScrollFade);
      bindAboutApp();
      updateCardScrollFade();
      requestAnimationFrame(updateCardScrollFade);
    });
  }
}
