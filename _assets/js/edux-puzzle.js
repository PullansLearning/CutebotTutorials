(function () {
'use strict';
function all(sel, root) {
return [].slice.call((root || document).querySelectorAll(sel));
}
function on(el, ev, fn) { el.addEventListener(ev, fn); }
function acceptOf(box) {
var raw = (box.getAttribute('data-accept') || '').trim();
if (raw === 'any') return { any: true, orders: [] };
if (!raw) return { any: false, orders: [] };
return {
any: false,
orders: raw.split(/\s+/).map(function (one) {
return one.split(',').map(function (n) { return parseInt(n, 10); });
})
};
}
function judge(orders, rule) {
if (rule.any) {
return orders.map(function (o) { return !(o >= 0); });
}
var want = rule.orders.length
? rule.orders
: [orders.map(function (_o, i) { return i; })];
var best = null;
for (var i = 0; i < want.length; i++) {
var miss = orders.map(function (o, n) { return o !== want[i][n]; });
var n_wrong = miss.filter(Boolean).length;
if (best === null || n_wrong < best.n) best = { n: n_wrong, miss: miss };
if (n_wrong === 0) break;
}
return best.miss;
}
var FROZEN = ['color', 'background-color', 'overflow-x', 'overflow-y'];
['top', 'right', 'bottom', 'left'].forEach(function (side) {
FROZEN.push('padding-' + side, 'border-' + side + '-width',
'border-' + side + '-style', 'border-' + side + '-color');
});
function lift(card, sx, sy) {
var r = card.getBoundingClientRect();
var cs = getComputedStyle(card);
var keep = card.getAttribute('style');
var frozen = FROZEN.map(function (p) { return [p, cs.getPropertyValue(p)]; });
var ph = document.createElement('div');
ph.setAttribute('aria-hidden', 'true');
ph.setAttribute('data-ds-ph', '');
ph.style.cssText = 'flex:0 0 auto;visibility:hidden;box-sizing:border-box;'
+ 'width:' + r.width + 'px;height:' + r.height + 'px;'
+ 'margin:' + cs.marginTop + ' ' + cs.marginRight + ' '
+ cs.marginBottom + ' ' + cs.marginLeft;
card.parentNode.insertBefore(ph, card);
card.classList.add('is-dragging');
frozen.forEach(function (p) { card.style.setProperty(p[0], p[1]); });
var s = card.style;
s.position = 'fixed'; s.boxSizing = 'border-box';
s.width = r.width + 'px'; s.height = r.height + 'px';
s.minWidth = '0'; s.minHeight = '0'; s.maxWidth = 'none'; s.maxHeight = 'none';
s.margin = '0'; s.right = 'auto'; s.bottom = 'auto';
s.left = r.left + 'px'; s.top = r.top + 'px';
s.zIndex = '2147483000'; s.pointerEvents = 'none';
s.transform = 'none'; s.transition = 'none';
var top = false;
if (typeof card.showPopover === 'function') {
try { card.setAttribute('popover', 'manual'); card.showPopover(); top = true; }
catch (err) { card.removeAttribute('popover'); }
}
var now = card.getBoundingClientRect();
var ox = now.left - r.left, oy = now.top - r.top;
return {
follow: function (x, y) {
s.left = (r.left + x - sx - ox) + 'px';
s.top = (r.top + y - sy - oy) + 'px';
},
drop: function () {
if (top) {
try { card.hidePopover(); } catch (err) { /* 이미 닫힘 */ }
card.removeAttribute('popover');
}
card.setAttribute('style', keep || '');
if (keep === null) card.removeAttribute('style');
card.classList.remove('is-dragging');
if (ph.parentNode) ph.parentNode.removeChild(ph);
}
};
}
function initPuzzle(box) {
var source = box.querySelector('.ds-source');
var slots = all('.ds-slot', box);
var btn = box.querySelector('.ds-check-btn');
var say = box.querySelector('.ds-feedback');
var rule = acceptOf(box);
var picked = null;
function select(card) {
if (picked) picked.classList.remove('is-picked');
picked = card === picked ? null : card;
if (picked) picked.classList.add('is-picked');
}
function place(card, target) {
if (!card) return;
var slot = target && target.closest ? target.closest('.ds-slot') : null;
var home = slot || source;
if (slot) {
var sitting = slot.querySelector('.ds-card');
if (sitting && sitting !== card) {
(card.parentNode.classList.contains('ds-slot')
? card.parentNode : source).appendChild(sitting);
}
}
home.appendChild(card);
slots.forEach(function (sl) {
sl.classList.toggle('is-filled', !!sl.querySelector('.ds-card'));
});
select(null);
if (say) { say.textContent = ''; say.className = 'ds-feedback'; }
}
function firstEmpty() {
for (var i = 0; i < slots.length; i++) {
if (!slots[i].querySelector('.ds-card')) return slots[i];
}
return null;
}
function tap(card, e) {
if (e) e.stopPropagation();
if (picked && picked !== card) {
place(picked, card.parentNode);
return;
}
if (source && card.parentNode === source) {
var slot = firstEmpty();
if (slot) { place(card, slot); return; }
}
select(card);
}
all('.ds-card', box).forEach(function (card) {
card.tabIndex = 0;
on(card, 'click', function (e) { tap(card, e); });
on(card, 'keydown', function (e) {
if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(card, e); }
});
on(card, 'pointerdown', function (e) {
if (e.pointerType === 'mouse' && e.button !== 0) return;
if (card.classList.contains('is-dragging')) return;
var pid = e.pointerId, sx = e.clientX, sy = e.clientY;
var lifted = null;
function move(ev) {
if (ev.pointerId !== pid) return;
if (!lifted && Math.abs(ev.clientX - sx) + Math.abs(ev.clientY - sy) < 6) return;
if (!lifted) lifted = lift(card, sx, sy);
lifted.follow(ev.clientX, ev.clientY);
var under = document.elementFromPoint(ev.clientX, ev.clientY);
slots.forEach(function (sl) {
sl.classList.toggle('is-over', !!(under && sl.contains(under)));
});
}
function end(ev) {
if (ev.pointerId !== pid) return;
document.removeEventListener('pointermove', move);
document.removeEventListener('pointerup', end);
document.removeEventListener('pointercancel', end);
slots.forEach(function (sl) { sl.classList.remove('is-over'); });
if (!lifted) return;
var under = ev.type === 'pointerup'
? document.elementFromPoint(ev.clientX, ev.clientY) : null;
lifted.drop();
if (ev.type === 'pointerup') place(card, under);
}
document.addEventListener('pointermove', move);
document.addEventListener('pointerup', end);
document.addEventListener('pointercancel', end);
});
});
slots.forEach(function (slot) {
on(slot, 'click', function () { if (picked) place(picked, slot); });
});
if (source) on(source, 'click', function (e) {
if (picked && e.target === source) place(picked, source);
});
if (btn) on(btn, 'click', function () {
var placed = slots.map(function (sl) { return sl.querySelector('.ds-card'); });
if (placed.some(function (c) { return !c; })) {
say.textContent = 'Fill every slot first.';
say.className = 'ds-feedback is-wait';
return;
}
var orders = placed.map(function (c) {
return parseInt(c.getAttribute('data-order'), 10);
});
var miss = judge(orders, rule);
var wrong = 0;
placed.forEach(function (c, i) {
c.classList.toggle('is-wrong', miss[i]);
if (miss[i]) wrong++;
});
box.classList.toggle('is-solved', wrong === 0);
say.textContent = wrong === 0
? 'That is the fix. 🎉'
: wrong + (wrong === 1 ? ' block is' : ' blocks are') + ' not right yet.';
say.className = 'ds-feedback ' + (wrong === 0 ? 'is-right' : 'is-wrong');
box.dispatchEvent(new CustomEvent('ds:result', {
detail: { ok: wrong === 0 }, bubbles: true
}));
});
}
function mount(root) {
all('.ds-puzzle', root).forEach(function (box) {
if (box.dataset.dsReady) return;
box.dataset.dsReady = '1';
try { initPuzzle(box); }
catch (e) { console.error('[edux-puzzle] failed', e); }
});
}
window.EDUXPuzzle = { mount: mount };
})();
