(function () {
'use strict';
function all(sel, root) {
return [].slice.call((root || document).querySelectorAll(sel));
}
function pageStem() {
if (window.EDUXAssess && EDUXAssess.pageStem) return EDUXAssess.pageStem();
var parts = location.pathname.split('/').filter(Boolean);
return (parts.pop() || '').replace(/\.html?$/, '');
}
function scope() {
try {
var acct = window.EDUXChrome && EDUXChrome.account;
var p = acct && acct.prefix ? acct.prefix() : '';
if (!p) return '';
var a = acct.auth && acct.auth();
var uid = a && a.getCurrentUserId && a.getCurrentUserId();
return p + (uid || 'guest') + ':';
} catch (e) { return ''; }
}
function read(key) {
try {
var v = JSON.parse(localStorage.getItem(key));
return Array.isArray(v) ? v : null;
} catch (e) { return null; }
}
function write(key, val) {
try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
}
function restore(key, legacyKeys) {
var cur = read(key);
if (cur) return cur;
for (var i = 0; i < legacyKeys.length; i++) {
var old = read(legacyKeys[i]);
if (!old) continue;
write(key, old);
try { localStorage.removeItem(legacyKeys[i]); } catch (e) {}
return old;
}
return [];
}
function mountOne(box, n, opts) {
if (box.__eduxBuild) return;
box.__eduxBuild = true;
var stem = box.getAttribute('data-build') || pageStem();
if (n) stem += '#' + n;
var sc = scope();
var key = sc ? sc + 'build:' + stem : 'edux:build:' + stem;
var legacy = [];
if (opts.legacy) {
try { legacy = opts.legacy({ box: box, stem: stem, scope: sc }) || []; } catch (e) {}
}
var btns = all('.bd-n', box);
var count = box.querySelector('.bd-count');
var saved = restore(key, legacy);
var on = btns.map(function (_, k) { return saved.indexOf(k) !== -1; });
function paintOne(k) {
var step = btns[k].closest('.build-step');
if (step) step.classList.toggle('is-checked', on[k]);
btns[k].setAttribute('aria-pressed', on[k] ? 'true' : 'false');
}
function paint() {
var done = on.filter(Boolean).length, total = btns.length;
var full = total > 0 && done === total;
if (count) count.textContent = done + ' of ' + total + ' steps done' + (full ? ' 🎉' : '');
box.classList.toggle('is-done', full);
}
function announce(i) {
if (i < 0) for (var k = on.length - 1; k >= 0; k--) if (on[k]) { i = k; break; }
try {
box.dispatchEvent(new CustomEvent('bd:step', { bubbles: true, detail: { index: i } }));
} catch (e) {}
}
btns.forEach(function (b, k) {
paintOne(k);
b.addEventListener('click', function () {
on[k] = !on[k];
paintOne(k);
write(key, on.reduce(function (acc, v, j) { if (v) acc.push(j); return acc; }, []));
paint();
announce(on[k] ? k : -1);
});
});
paint();
setTimeout(function () { announce(-1); }, 0);
}
function mount(opts) {
opts = opts || {};
all('.bd-steps', opts.root).forEach(function (box, n) {
try { mountOne(box, n, opts); } catch (e) { console.error('[EDUXBuild] mount failed', e); }
});
}
window.EDUXBuild = { mount: mount };
})();
