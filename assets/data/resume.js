/** Resume PDF paths by UI language (fallback: English). */

var RESUME_DIR = 'assets/resume/';
var RESUME_FILES = {
  pt: 'luan-luz-resume_pt.pdf',
  en: 'luan-luz-resume_en.pdf',
  es: 'luan-luz-resume_es.pdf'
};
var RESUME_NAMES = {
  pt: 'Luan Luz - Desenvolvedor Mobile - Currículo.pdf',
  en: 'Luan Luz - Mobile Developer - Resume.pdf',
  es: 'Luan Luz - Desarrollador Mobile - Currículum.pdf'
};
var FALLBACK_LANG = 'en';

function resumeLang(lang) {
  return RESUME_FILES[lang] ? lang : FALLBACK_LANG;
}

export function resumeHref(lang) {
  var code = resumeLang(lang);
  return RESUME_DIR + RESUME_FILES[code];
}

export function resumeFilename(lang) {
  var code = resumeLang(lang);
  return RESUME_NAMES[code];
}
