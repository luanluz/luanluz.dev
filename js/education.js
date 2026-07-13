import { state, tr } from './common.js';
import { UI } from '../assets/data/ui.js';
import { tpl, text, qs, setPh, attr, addClass } from './dom.js';

function appendFact(factsRoot, iconName, value) {
  var fact = tpl('tpl-study-fact');
  setPh(fact, 'i', iconName);
  var spans = fact.querySelectorAll('span');
  if (spans.length) spans[spans.length - 1].textContent = value;
  factsRoot.appendChild(fact);
}

export function renderEducation(blocks) {
  var u = UI[state.lang];
  var bachelor = blocks.filter(function (b) { return b.score; })[0];
  var starred = blocks.filter(function (b) { return b.highlight; })[0];
  var home = tpl('tpl-study-home');
  var awards = qs(home, '.study-awards');
  var courses = qs(home, '.study-courses');

  if (starred) {
    var starAward = tpl('tpl-study-award');
    addClass(starAward, '.study-award', 'is-star');
    setPh(starAward, '.study-award-icon i', 'trophy');
    text(starAward, '.study-award-value', tr(starred.highlight));
    text(starAward, '.study-award-sub', tr(starred.level));
    text(starAward, '.study-award-foot', tr(starred.title));
    awards.appendChild(starAward);
  }

  if (bachelor && bachelor.score) {
    var iraAward = tpl('tpl-study-award');
    addClass(iraAward, '.study-award', 'is-ira');
    attr(iraAward, '.study-award', 'title', tr(bachelor.score.tip || bachelor.score.label));
    setPh(iraAward, '.study-award-icon i', 'star', 'fill');
    text(iraAward, '.study-award-value', tr(bachelor.score.value));
    text(iraAward, '.study-award-sub', tr(bachelor.score.label) + ' · ' + tr(bachelor.level));
    text(iraAward, '.study-award-foot', tr(bachelor.title));
    awards.appendChild(iraAward);
  }

  blocks.forEach(function (b) {
    var tone = b.tone === 'bachelor' ? 'bachelor' : 'tech';
    var course = tpl('tpl-study-course');
    addClass(course, '.study-course', 'is-' + tone);
    text(course, '.study-course-title', tr(b.title));
    text(course, '.study-course-school', tr(b.school));
    var factsRoot = qs(course, '.study-course-facts');
    appendFact(factsRoot, 'clock', tr(b.period));
    appendFact(factsRoot, 'map-pin', tr(b.place));
    if (b.highlight) appendFact(factsRoot, 'star', tr(b.highlight));
    appendFact(factsRoot, 'check', u.completed);
    courses.appendChild(course);
  });

  return home;
}
