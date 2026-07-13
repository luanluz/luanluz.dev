/** Clone and fill HTML <template> elements. */

export function tpl(id) {
  var t = document.getElementById(id);
  if (!t || !t.content) throw new Error('Missing template: ' + id);
  return t.content.cloneNode(true);
}

export function qs(root, sel) {
  return root.querySelector(sel);
}

export function qsa(root, sel) {
  return Array.prototype.slice.call(root.querySelectorAll(sel));
}

export function text(root, sel, value) {
  var n = root.querySelector(sel);
  if (n) n.textContent = value == null ? '' : String(value);
  return n;
}

export function attr(root, sel, name, value) {
  var n = root.querySelector(sel);
  if (n) {
    if (value == null || value === false) n.removeAttribute(name);
    else n.setAttribute(name, value === true ? '' : String(value));
  }
  return n;
}

export function addClass(root, sel, className) {
  var n = root.querySelector(sel);
  if (n && className) n.classList.add(className);
  return n;
}

export function setPh(root, sel, name, weight) {
  var n = root.querySelector(sel);
  if (!n) return null;
  var prefix = weight === 'fill' ? 'ph-fill' : weight === 'duotone' ? 'ph-duotone' : 'ph';
  n.className = prefix + ' ph-' + name;
  n.setAttribute('aria-hidden', 'true');
  return n;
}

export function remove(root, sel) {
  var n = root.querySelector(sel);
  if (n) n.remove();
}

export function append(parent, child) {
  parent.append(child);
}

/** Load templates HTML and inject <template> nodes into document.body. */
export function loadTemplates(url) {
  return fetch(url)
    .then(function (res) {
      if (!res.ok) throw new Error('Failed to load templates: ' + url);
      return res.text();
    })
    .then(function (html) {
      var box = document.createElement('div');
      box.innerHTML = html;
      var nodes = box.querySelectorAll('template');
      for (var i = 0; i < nodes.length; i++) {
        document.body.appendChild(nodes[i]);
      }
    });
}
