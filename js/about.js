import { state, tr } from './common.js';
import { UI } from '../assets/data/ui.js';
import { ABOUT } from '../assets/data/about.js';
import { onApp } from './phone.js';
import { tpl, text, qs, attr, remove } from './dom.js';

export function renderAbout(blocks) {
  var u = UI[state.lang];
  var paras = (blocks || ABOUT.blocks).filter(function (b) { return b.k === 'p'; });
  var bio = paras[0] ? tr(paras[0].t) : '';
  var more = paras[1] ? tr(paras[1].t) : '';
  var tags = ABOUT.tags || [];
  var frag = tpl('tpl-about');

  var avatar = qs(frag, '.about-avatar');
  avatar.src = ABOUT.avatar;
  avatar.alt = u.aboutName;
  attr(frag, '.about-online', 'title', u.aboutAvailable);

  qs(frag, '.about-link-github').href = ABOUT.links.github;
  qs(frag, '.about-link-linkedin').href = ABOUT.links.linkedin;
  qs(frag, '.about-github-cta').href = ABOUT.links.github;

  text(frag, '.about-name', u.aboutName);
  text(frag, '.about-handle', u.aboutHandle);
  if (bio) text(frag, '.about-bio', bio);
  else remove(frag, '.about-bio');

  text(frag, '.about-location', u.aboutLocation);
  text(frag, '.about-available', u.aboutAvailable);
  text(frag, '.about-years', u.aboutYears);
  text(frag, '.about-years-label', u.aboutYearsLabel);
  text(frag, '.about-focus', u.aboutFocus);
  text(frag, '.about-focus-label', u.aboutFocusLabel);
  text(frag, '.about-stack', u.aboutStack);
  text(frag, '.about-stack-label', u.aboutStackLabel);
  text(frag, '.about-contact-label', u.aboutContact);
  text(frag, '.about-github-label', u.aboutGithub);
  text(frag, '.about-tags-title', u.aboutTagsTitle);

  var tagsRoot = qs(frag, '.about-tags');
  tags.forEach(function (t) {
    var tagFrag = tpl('tpl-about-tag');
    text(tagFrag, '.about-tag', t);
    tagsRoot.appendChild(tagFrag);
  });

  if (more) {
    text(frag, '.about-more-title', u.aboutMoreTitle);
    text(frag, '.about-text', more);
  } else {
    remove(frag, '.about-more-block');
  }

  return frag;
}

export function bindAboutApp() {
  var root = document.querySelector('.about-profile');
  if (!root) return;
  root.querySelectorAll('[data-open-app]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-open-app');
      if (id) onApp(id);
    });
  });
}
