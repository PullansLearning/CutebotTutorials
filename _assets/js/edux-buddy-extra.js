(function () {
'use strict';
var W = window, D = document, E = W.EDUXBuddy;
if (!E || E.x) return;
var el = E.el, btn = E.btn, L = E.L, svg = E.svg, B = E.B, IDS = E.ids, rm = E.rm;
Object.assign(E.lines, {
title: 'Pick a learning buddy', close: 'Close',
g_stars: 'Catch the stars!', g_bounce: 'Tap to keep me bouncing!', g_peek: 'Find me!', g_pattern: 'Copy my pattern!',
watch: 'Watch…', you: 'Your turn!', again: 'Oops! Watch again.', star: 'Star', hole: 'Hole {n}',
won: 'You got {s}! ⭐ Back to it?', fun: 'Fun break! 🎈 Back to it?',
talk: 'Talk', c_title: 'AI English helper', c_note: 'AI answers · {m} chats a day', c_left: '{n} of {m} chats used today',
c_hello: "Hi! Let's talk about this chapter. What did you learn today?", c_hint: 'Type here, or tap 🎤 to speak',
c_send: 'Send', c_mic: 'Speak', c_listen: 'Listening…', c_wait: 'Thinking…',
c_day: "That's all the chats for today. See you tomorrow! 👋", c_month: 'The AI helper is resting until next month.',
c_err: "I can't answer right now. Try again in a moment.", c_login: 'Log in to talk with me.'
});
var CSS = [
'@keyframes ebd-got{to{transform:scale(1.6);opacity:0}}',
'.edux-buddy.is-drag .edux-buddy__tap,.edux-buddy.is-fly .edux-buddy__tap{transition:none}.edux-buddy.is-drag .edux-buddy__tap{cursor:grabbing}',
'.edux-buddy__orb{border-radius:30px}.edux-buddy.is-squash .bdy-body{animation:none;transform:scale(1.16,.8)}',
'.edux-buddy__fan{position:absolute;left:0;top:0;width:64px;height:64px;pointer-events:none}.edux-buddy.is-menu{z-index:905}.edux-buddy__orb.is-side small{position:absolute;right:calc(100% - 2px);top:14px;white-space:nowrap}',
'.edux-buddy__orb{position:absolute;display:flex;flex-direction:column;align-items:center;gap:3px;width:60px;padding:0;border:0;background:none;color:#2B2340;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;pointer-events:auto;animation:ebd-orb .46s cubic-bezier(.3,1.6,.5,1) calc(var(--i)*70ms) backwards}',
'.edux-buddy__orb .o{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:var(--ebd-bg,var(--color-surface));box-shadow:inset 0 0 0 2.5px var(--ebd-btn,var(--_accent-deep)),0 4px 12px rgb(43 35 64/.22);font-size:24px;line-height:1}',
'.edux-buddy__orb small{padding:1px 7px;border-radius:9px;background:var(--ebd-bg,var(--color-surface));font:var(--w-bold) 11px/1.3 var(--font-display);box-shadow:0 1px 4px rgb(43 35 64/.18)}',
'.edux-buddy__fan.is-closing .edux-buddy__orb{animation:ebd-orb-out .2s ease-in forwards}',
'.edux-buddy.is-away .edux-buddy__say,.edux-buddy.is-away .edux-buddy__menu{visibility:hidden}.edux-buddy.is-ghost .edux-buddy__tap{pointer-events:none}',
'@keyframes ebd-orb{from{transform:translate(var(--fx),var(--fy)) scale(.15);opacity:0}}@keyframes ebd-orb-out{to{transform:translate(var(--fx),var(--fy)) scale(.15);opacity:0}}',
':is(.edux-bpick,.edux-bplay) button:focus-visible{outline:3px solid var(--focus-ring);outline-offset:2px}',
'.edux-bpick{position:fixed;inset:0;z-index:1000;display:grid;place-items:end center;padding:16px;background:rgb(27 31 58/.4)}',
'@media (min-width:700px){.edux-bpick{place-items:center}}',
'.edux-bchat__card{display:flex;flex-direction:column;width:min(480px,100%);height:min(620px,calc(100dvh - 32px));padding:0;overflow:hidden;background:var(--color-surface);color:var(--color-ink);border-radius:var(--radius-card);box-shadow:0 20px 60px -20px rgb(27 31 58/.5)}',
'.edux-bchat__head{display:flex;align-items:center;gap:10px;padding:12px 12px 10px 14px;border-bottom:1px solid var(--color-hairline)}.edux-bchat__head svg{width:40px;height:40px;flex:none}',
'.edux-bchat__head div{flex:1;min-width:0}.edux-bchat__head b{display:block;font:var(--w-bold) 16px/1.25 var(--font-display)}.edux-bchat__head small{display:block;color:var(--color-muted);font-size:12.5px;line-height:1.3}',
'.edux-bchat__log{flex:1;overflow:auto;display:flex;flex-direction:column;gap:8px;padding:14px;overscroll-behavior:contain}',
'.edux-bchat__m{max-width:85%;padding:9px 12px;border-radius:16px;font-size:15.5px;line-height:1.45;white-space:pre-wrap;overflow-wrap:anywhere}',
'.edux-bchat__m.is-bot{align-self:flex-start;background:var(--color-bg);border:1px solid var(--color-hairline);border-bottom-left-radius:6px}',
'.edux-bchat__m.is-me{align-self:flex-end;background:var(--color-accent-deep);color:var(--color-on-accent);border-bottom-right-radius:6px}',
'.edux-bchat__m.is-note{align-self:center;max-width:100%;background:none;color:var(--color-muted);font-size:13px;text-align:center}',
'.edux-bchat__form{display:flex;align-items:flex-end;gap:6px;padding:10px;border-top:1px solid var(--color-hairline)}',
'.edux-bchat__form textarea{flex:1;min-height:44px;max-height:120px;resize:none;box-sizing:border-box;padding:10px 12px;border:1.5px solid var(--color-hairline);border-radius:14px;background:var(--color-surface);color:var(--color-ink);font:inherit;font-size:16px;line-height:1.35}',
'.edux-bchat__form textarea:focus-visible{outline:none;border-color:var(--color-accent-deep)}',
'.edux-bchat__form .edux-buddy__act{flex:none;padding:0 12px}.edux-bchat__mic.is-on{background:var(--color-danger) padding-box;box-shadow:none;color:#fff}',
'.edux-bpick__card{width:min(560px,100%);max-height:calc(100dvh - 32px);overflow:auto;padding:20px 18px 16px;background:var(--color-surface);color:var(--color-ink);border-radius:var(--radius-card);box-shadow:0 20px 60px -20px rgb(27 31 58/.5)}',
'.edux-bpick__h{margin:0 0 12px;font:var(--w-xbold) var(--text-xl)/1.2 var(--font-display)}',
'.edux-bpick__opts{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:8px}',
'.edux-bpick__opt{display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 6px;border:2px solid transparent;border-radius:18px;background:var(--color-bg);color:inherit;font:var(--w-bold) var(--text-sm)/1.2 var(--font-display);cursor:pointer}',
'.edux-bpick__opt svg{width:60px;height:60px}.edux-bpick__opt small{font:400 var(--text-xs)/1.3 var(--font-body);color:var(--color-muted)}',
'.edux-bpick__opt[aria-pressed=true]{border-color:var(--_accent-deep);background:var(--color-accent-soft)}',
'.edux-bpick__foot{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:8px;margin-top:14px}',
'.edux-bplay{position:fixed;top:0;left:0;width:100%;height:100vh;height:100dvh;box-sizing:border-box;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);touch-action:none;overscroll-behavior:none;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;z-index:1000;display:flex;flex-direction:column;align-items:center;overflow:hidden;background:radial-gradient(circle at 50% 60%,var(--color-surface),var(--color-accent-soft) 75%);color:var(--color-ink);font-family:var(--font-display)}',
'.edux-bplay__top{display:flex;align-items:center;gap:12px;width:min(560px,100%);padding:12px 16px}',
'.edux-bplay__score{min-width:3.2em;font-size:var(--text-lg)}',
'.edux-bplay__bar{flex:1;height:10px;border:1px solid var(--color-hairline);border-radius:9px;background:var(--color-surface);overflow:hidden}',
'.edux-bplay__bar i{display:block;height:100%;background:var(--_accent-deep);transform-origin:0 50%}',
'.edux-bplay__x{width:48px;height:48px;border:1px solid var(--color-hairline);border-radius:50%;background:var(--color-surface);color:inherit;font-size:18px;cursor:pointer}',
'.edux-bplay__msg{margin:0;padding:0 16px;text-align:center;font-size:var(--text-lg);font-weight:var(--w-bold);color:var(--_accent-ink)}',
'.edux-bplay__area{position:relative;display:flex;flex:1;min-height:0;width:100%;outline:0;touch-action:none}',
'.edux-bplay__hero{position:absolute;left:50%;bottom:10%;width:120px;height:120px;transform:translateX(-50%);pointer-events:none}',
'.edux-bplay__hero svg{width:120px;height:120px}.edux-bplay__hero.is-sm,.edux-bplay__hero.is-sm svg{width:84px;height:84px}',
'.edux-bplay__hero .bdy-body{animation:ebd-bob 2.6s ease-in-out infinite}.edux-bplay__hero .bdy-shadow{animation:ebd-shadow 2.6s ease-in-out infinite}',
'.edux-bplay__star{position:absolute;left:0;top:0;width:56px;height:56px;padding:0;border:0;background:none;cursor:pointer;will-change:transform}',
'.edux-bplay__star svg{width:56px;height:56px;pointer-events:none}.edux-bplay__star.is-got svg{animation:ebd-got .3s ease-out forwards}',
'.edux-bplay__pad{position:absolute;inset:0;width:100%;border:0;background:none;cursor:pointer;touch-action:none}',
'.edux-bplay__holes,.edux-bplay__pads{display:grid;grid-template-columns:repeat(3,clamp(64px,22dvh,120px));gap:12px;justify-content:center;align-content:center;margin:auto;padding:12px}',
'.edux-bplay__pads{grid-template-columns:repeat(2,clamp(88px,24dvh,150px))}',
'.edux-bplay__hole{position:relative;aspect-ratio:1;padding:0;border:0;border-radius:50%;background:radial-gradient(circle at 50% 70%,rgb(27 31 58/.55),rgb(27 31 58/.22) 70%);overflow:hidden;cursor:pointer}',
'.edux-bplay__hole svg{position:absolute;left:12%;top:12%;width:76%;height:88%;transform:translateY(105%);transition:transform .15s ease-out}',
'.edux-bplay__hole.is-up svg{transform:none}.edux-bplay__hole.is-hit{background:var(--color-accent-soft)}',
'.edux-bplay__pad4{display:grid;place-items:center;aspect-ratio:1;padding:0;border:4px solid transparent;border-radius:28px;opacity:.65;cursor:pointer;transition:transform .1s,opacity .1s}',
'.edux-bplay__pad4 svg{width:80%;height:80%}.edux-bplay__pad4.is-lit{opacity:1;transform:scale(1.08);border-color:var(--_accent-deep)}',
'@media print{.edux-bpick,.edux-bplay{display:none}}',
'@media (prefers-reduced-motion:reduce){.edux-bplay *{animation:none!important;transition:none!important}}'
].join('');
var s = el('style'); s.id = 'edux-buddy-xcss'; s.textContent = CSS; D.head.appendChild(s);
var M = E.m, root, tap, menu, setExpr = E.setExpr, dizzy = E.dizzy, sched = E.sched, fit = E.fit, covers = E.covers, holdExpr = E.holdExpr, pulse = E.pulse, hush = E.hush;
var dg, dgx = 0, dgy = 0, rot = 0, ret, af = 0, fk = 0, SA = [0, 0, 0, 0], fan, fanOpen = 0, orbs = [];
function later(f, ms) { return setTimeout(f, ms); }
function sync() { var c = E.ctx(); root = c.root; tap = c.tap; menu = c.menu; }
M.down = function (e) {
sync(); clearTimeout(ret); stopAnim(); closeFan();
dg = { id: e.pointerId, x: e.clientX, y: e.clientY, sx: dgx, sy: dgy, lx: e.clientX, lt: Date.now(), on: 0, dir: 0, rv: [] };
try { tap.setPointerCapture(e.pointerId); } catch (x) {}
};
M.up = function (n) {
sync();
if (dg && n === 'pointerleave') return true;
if (dg && endDrag()) return true;
dg = null;
if (root.classList.contains('is-away')) { clearTimeout(ret); ret = later(goHome, 1500); }
return false;
};
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function insets() {
var p = el('div'), c;
p.style.cssText = 'position:fixed;visibility:hidden;pointer-events:none;padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px)';
D.body.appendChild(p); c = getComputedStyle(p);
SA = [parseFloat(c.paddingTop) || 0, parseFloat(c.paddingRight) || 0, parseFloat(c.paddingBottom) || 0, parseFloat(c.paddingLeft) || 0];
p.remove();
}
M.move = function (e) {
if (!dg || e.pointerId !== dg.id) return;
var mx = e.clientX - dg.x, my = e.clientY - dg.y, now = Date.now(), r, st0, d, vx;
if (!dg.on) {
if (mx * mx + my * my < 64) return;
dg.on = 1;
clearTimeout(ret);
E.dragBegin(); root.classList.add('is-drag', 'is-away');
hush(); closeFan(); insets(); setExpr('cheer');
}
r = root.getBoundingClientRect();
dgx = clamp(dg.sx + mx, SA[3] + 4 - r.left, innerWidth - SA[1] - 4 - (r.left + 64));
dgy = clamp(dg.sy + my, SA[0] + 4 - r.top, innerHeight - SA[2] - 4 - (r.top + 64));
d = e.clientX - dg.lx; vx = d / Math.max(1, now - dg.lt);
if (!rm()) rot = rot * .7 + clamp(vx * 22, -18, 18) * .3;
if (Math.abs(d) > 6) {
st0 = d > 0 ? 1 : -1;
if (dg.dir && st0 !== dg.dir) dg.rv.push(now);
dg.dir = st0; dg.rv = dg.rv.filter(function (t) { return now - t < 700; });
if (dg.rv.length >= 4 && !dizzy()) {
dg.rv = []; setExpr('dizzy'); root.classList.add('is-dizzy');
later(function () { root.classList.remove('is-dizzy'); setExpr(dg && dg.on ? 'cheer' : 'happy'); }, 1800);
}
}
dg.lx = e.clientX; dg.lt = now;
root.style.setProperty('--dx', dgx + 'px'); root.style.setProperty('--dy', dgy + 'px'); root.style.setProperty('--rot', rot.toFixed(1) + 'deg');
};
function endDrag() {
var was = dg.on;
dg = null;
if (!was) return false;
rot = 0; root.style.setProperty('--rot', '0deg');
root.classList.remove('is-drag', 'is-press');
if (!E.ctx().kbd && D.activeElement === tap) tap.blur();
root.classList.toggle('is-ghost', covers(tap.getBoundingClientRect()));
if (!dizzy()) holdExpr('happy', 2400);
pulse('is-boing');
clearTimeout(ret); ret = later(goHome, 2500);
return true;
}
function place(x, y, r) { dgx = x; dgy = y; rot = r; root.style.setProperty('--dx', x.toFixed(1) + 'px'); root.style.setProperty('--dy', y.toFixed(1) + 'px'); root.style.setProperty('--rot', r.toFixed(1) + 'deg'); }
function killAnim() { if (af) cancelAnimationFrame(af); af = 0; }
function stopAnim() { fk++; killAnim(); root.classList.remove('is-fly', 'is-hop', 'is-squash'); }
function anim(ms, f, done) {
var t0 = performance.now();
killAnim(); root.classList.add('is-fly');
(function step(now) {
var t = Math.min(1, (now - t0) / ms);
f(t);
if (t < 1) af = requestAnimationFrame(step); else { af = 0; root.classList.remove('is-fly'); if (done) done(); }
})(t0);
}
function landed() { place(0, 0, 0); root.classList.remove('is-away', 'is-ghost'); pulse('is-boing'); holdExpr('happy', 900); sched(); }
function flyHome() {
var k = ++fk, n = Math.hypot(dgx, dgy) > 150 ? 3 : 2, i = 0;
if (rm()) return landed();
setExpr('happy'); root.classList.add('is-hop');
(function hop() {
var x0 = dgx, y0 = dgy, len = Math.hypot(x0, y0) || 1, f = Math.min(.2, 44 / len), dir = x0 > 0 ? -1 : 1;
if (fk !== k) return;
if (i++ >= n || len < 40) { root.classList.remove('is-hop'); return glide(); }
anim(130 + Math.random() * 30, function (t) { place(x0 - x0 * f * t, y0 - y0 * f * t * .6 - 16 * Math.sin(Math.PI * t), dir * 10 * Math.sin(Math.PI * t)); },
function () { root.classList.add('is-squash'); later(function () { if (fk !== k) return; root.classList.remove('is-squash'); hop(); }, 80); });
})();
}
function glide() {
var x0 = dgx, y0 = dgy, lift = Math.min(100, 46 + Math.hypot(x0, y0) * .18), x1 = x0 * .62, y1 = Math.min(y0, 0) - lift, x2 = x0 * .08, y2 = -Math.max(40, lift * .55);
function B(u, k) {
var v = 1 - u;
return v * v * v * k[0] + 3 * v * v * u * k[1] + 3 * v * u * u * k[2] + u * u * u * k[3];
}
var X = [x0, x1, x2, 0], Y = [y0, y1, y2, 0];
setExpr('cheer');
anim(850, function (t) {
var u = t * t * (3 - 2 * t), u2 = Math.min(1, u + .03), x = B(u, X), y = B(u, Y), dx = B(u2, X) - x, dy = B(u2, Y) - y,
a = Math.atan2(dy, Math.abs(dx)) * 180 / Math.PI * (dx < 0 ? -1 : 1);
place(x, y + (t > .86 ? 5 * Math.sin(Math.PI * (t - .86) / .14) : 0), clamp(a, -38, 38) * Math.min(1, (1 - t) * 4));
}, landed);
}
M.side = function () {
sync();
var d = 24 + Math.random() * 16;
if (rm() || dg || af || root.classList.contains('is-away')) return;
closeFan(); root.classList.add('is-away');
anim(340, function (t) { var e = 1 - Math.pow(1 - t, 3); place(-d * e, -16 * Math.sin(Math.PI * t), -14 * Math.sin(Math.PI * t)); },
function () { place(-d, 0, 0); clearTimeout(ret); ret = later(goHome, 1500); });
};
function shuffleBack() {
var x0 = dgx;
anim(520, function (t) { var e = t * t * (3 - 2 * t); place(x0 * (1 - e), -7 * Math.abs(Math.sin(2 * Math.PI * t)), 8 * Math.sin(4 * Math.PI * t) * (1 - t)); },
function () { place(0, 0, 0); root.classList.remove('is-away', 'is-ghost'); sched(); });
}
function goHome() { if (dg) return; if (Math.abs(dgx) < 60 && Math.abs(dgy) < 24) shuffleBack(); else flyHome(); }
var OBST = '.edux-menu__btn,edux-text-size.is-floating,.slide-toggle.is-floating,.cm-teamdock__btn,.edux-report-btn,.edux-offline-pill';
function buildFan() {
var items = [['🎮', 'play', function () { E.ask(); }], ['🐾', 'friends', function () { pick(); }], ['👋', 'bye', function () { E.turnOff(); }]];
if (fan) fan.remove();
orbs = [];
fan = el('div', 'edux-buddy__fan'); fan.hidden = true;
fan.chat = E.canChat();
if (fan.chat) items.unshift(['💬', 'talk', function () { E.chat(); }]);
items.forEach(function (o, i) {
var b = btn('edux-buddy__orb');
b.innerHTML = '<span class="o" aria-hidden="true">' + o[0] + '</span><small>' + L(o[1]) + (o[1] === 'talk' ? ' ' + E.tagAI() : '') + '</small>';
b.setAttribute('aria-label', L(o[1])); b.style.setProperty('--i', i);
b.onclick = function () { closeFan(); o[2](); };
orbs.push(b); fan.appendChild(b);
});
root.insertBefore(fan, menu);
}
function layoutFan() {
var r = root.getBoundingClientRect(), all = D.querySelectorAll(OBST), x0 = r.left - 150, x1 = r.left + 70, top = innerHeight, i, b, side = 0, R = 108, ymax, sn, th, th1 = 95, th2;
for (i = 0; i < all.length; i++) {
b = all[i].getBoundingClientRect();
if (b.width > 1 && b.right > x0 && b.left < x1 && b.top > r.top + 40 && b.top < top) top = b.top;
}
function maxTheta(below) {
ymax = top - r.top - 6;
sn = ((below ? 80 : 58) - ymax) / R;
return Math.min(190, sn >= 0 ? 180 - Math.asin(Math.min(1, sn)) * 180 / Math.PI : 180 + Math.asin(Math.min(1, -sn)) * 180 / Math.PI);
}
th2 = maxTheta(1);
if (th2 < 150) { side = 1; th2 = Math.max(maxTheta(0), 135); }
orbs.forEach(function (b, i) {
th = (th1 + (th2 - th1) * i / Math.max(1, orbs.length - 1)) * Math.PI / 180;
var cx = 32 + R * Math.cos(th), cy = 32 - R * Math.sin(th);
b.classList.toggle('is-side', !!side);
b.style.left = (cx - 30).toFixed(0) + 'px'; b.style.top = (cy - 24).toFixed(0) + 'px';
b.style.setProperty('--fx', (32 - cx).toFixed(0) + 'px'); b.style.setProperty('--fy', (32 - cy).toFixed(0) + 'px');
});
}
function fanKey(e) { if (e.key === 'Escape') { e.stopPropagation(); e.preventDefault(); closeFan(1); } }
function fanOut(e) { if (!root.contains(e.target)) closeFan(); }
function openFan(byKey) {
sync(); if (!fan || fan.chat !== E.canChat()) buildFan();
hush(); layoutFan(); fan.hidden = false; fan.classList.remove('is-closing'); fanOpen = 1;
root.classList.add('is-menu'); menu.setAttribute('aria-expanded', 'true'); fit();
D.addEventListener('keydown', fanKey, true); D.addEventListener('pointerdown', fanOut, true);
if (byKey) orbs[0].focus();
}
function closeFan(refocus) {
if (!fanOpen) return;
sync();
fanOpen = 0; fan.classList.add('is-closing'); root.classList.remove('is-menu'); menu.setAttribute('aria-expanded', 'false');
D.removeEventListener('keydown', fanKey, true); D.removeEventListener('pointerdown', fanOut, true);
later(function () { if (!fanOpen) fan.hidden = true; }, 220);
if (refocus) menu.focus();
sched();
}
M.open = openFan; M.close = closeFan;
function modal(box, close) {
function key(e) {
if (e.key === 'Escape') { e.stopPropagation(); e.preventDefault(); close(); return; }
if (e.key !== 'Tab') return;
var f = box.querySelectorAll('button:not([disabled])'), a = f[0], z = f[f.length - 1];
if (e.shiftKey && D.activeElement === a) { e.preventDefault(); z.focus(); }
else if (!e.shiftKey && D.activeElement === z) { e.preventDefault(); a.focus(); }
}
D.addEventListener('keydown', key, true);
return function () { D.removeEventListener('keydown', key, true); };
}
function pick() {
var c = E.ctx(), st = c.st,
ov = el('div', 'edux-bpick'), card = el('div', 'edux-bpick__card'), h = el('h2', 'edux-bpick__h', L('title')),
opts = el('div', 'edux-bpick__opts'), foot = el('div', 'edux-bpick__foot'), first, unbind;
card.setAttribute('role', 'dialog'); card.setAttribute('aria-modal', 'true'); card.setAttribute('aria-labelledby', 'edux-bpick-h');
h.id = 'edux-bpick-h';
function close() { unbind(); ov.remove(); (st.off ? c.back : c.tap).focus(); }
IDS.forEach(function (id) {
var b = btn('edux-bpick__opt', svg(id, 'happy') + '<b>' + B[id].name + '</b><small>' + B[id].line + '</small>');
b.setAttribute('aria-pressed', id === st.id ? 'true' : 'false');
b.onclick = function () { st.id = id; st.auto = false; st.off = 0; E.save(); close(); E.render(); E.holdExpr('cheer'); };
if (id === st.id || !first) first = id === st.id ? b : first || b;
opts.appendChild(b);
});
var off = btn('edux-buddy__act'), cl = btn('edux-buddy__act');
off.textContent = L('off'); cl.textContent = L('close');
off.onclick = function () { close(); E.turnOff(); };
cl.onclick = close;
foot.append(off, cl);
card.append(h, opts, foot);
ov.appendChild(card);
ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
D.body.appendChild(ov);
unbind = modal(card, close);
first.focus();
}
function hero(G, e) { var h = el('div', 'edux-bplay__hero'); h.innerHTML = svg(E.ctx().st.id, e); G.area.appendChild(h); return h; }
var STAR = '<svg viewBox="-8 -8 16 16" aria-hidden="true"><path d="M0-6Q.9-.9 6 0Q.9 .9 0 6Q-.9 .9-6 0Q-.9-.9 0-6Z" fill="#FFC53D"/></svg>';
var PLAY = {
stars: function (G) {
var h = hero(G, 'happy'), A = G.area, Wd = A.clientWidth || 300, Ht = A.clientHeight || 400, hx = Wd / 2, hy = Ht - 70, S = [];
h.className += ' is-sm'; h.style.cssText = 'left:0;top:0;bottom:auto;transform:translate(' + (hx - 42) + 'px,' + (hy - 42) + 'px)';
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function put() { h.style.transform = 'translate(' + (hx - 42) + 'px,' + (hy - 42) + 'px)'; }
function put1(o) { o.b.style.transform = 'translate(' + (o.x - 28) + 'px,' + (o.y - 28) + 'px)'; }
function got(o) {
if (o.g) return;
o.g = 1; G.add(); o.b.disabled = true; o.b.classList.add('is-got');
G.t(function () { o.b.remove(); }, 300);
}
function hit() { S.forEach(function (o) { if (!o.g && Math.abs(o.x - hx) < 48 && Math.abs(o.y - hy) < 48) got(o); }); }
function mv(e) {
var r = A.getBoundingClientRect();
hx = clamp(e.clientX - r.left, 30, Wd - 30);
hy = clamp(e.clientY - r.top - (e.pointerType === 'mouse' ? 0 : 46), 40, Ht - 30);
put(); hit();
}
A.addEventListener('pointerdown', function (e) { try { A.setPointerCapture(e.pointerId); } catch (x) {} mv(e); });
A.addEventListener('pointermove', mv);
A.tabIndex = -1; A.focus({ preventScroll: true });
A.addEventListener('keydown', function (e) {
var d = { ArrowLeft: [-40, 0], ArrowRight: [40, 0], ArrowUp: [0, -40], ArrowDown: [0, 40] }[e.key];
if (!d) return;
e.preventDefault(); hx = clamp(hx + d[0], 30, Wd - 30); hy = clamp(hy + d[1], 40, Ht - 30); put(); hit();
});
G.t(function () {
var b = btn('edux-bplay__star', STAR), o = { b: b, x: 28 + Math.random() * (Wd - 56), y: rm() ? 40 + Math.random() * (Ht * .6) : -30, v: Ht / (3.6 + Math.random() * 1.8) };
b.setAttribute('aria-label', L('star'));
b.onclick = function () { got(o); };
put1(o); A.appendChild(b); S.push(o);
if (rm()) G.t(function () { o.g = 1; b.remove(); }, 2600);
}, rm() ? 1200 : 700, 1);
if (!rm()) G.t(function () {
S = S.filter(function (o) { return o.b.isConnected; });
S.forEach(function (o) { o.y += o.v * .03; put1(o); if (o.y > Ht + 40) { o.g = 1; o.b.remove(); } });
hit();
}, 30, 1);
},
bounce: function (G) {
var h = hero(G, 'happy'), y = 0, v = 0, pad = btn('edux-bplay__pad');
pad.setAttribute('aria-label', L('g_bounce'));
G.area.insertBefore(pad, h);
function hop(e) { if (e) e.preventDefault(); if (y > 2) G.add(); v = 640; }
pad.addEventListener('pointerdown', hop);
pad.addEventListener('keydown', function (e) { if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowUp') hop(e); });
G.t(function () {
var top = Math.max(60, G.area.clientHeight * .9 - 130);
v -= 45; y = Math.min(top, Math.max(0, y + v * .03));
if (y >= top) v = Math.min(v, 0);
if (!y && v < 0) v = 0;
h.style.transform = 'translate(-50%,' + (-y) + 'px)';
}, 30, 1);
pad.focus();
},
peek: function (G) {
var holes = [], up = -1, grid = el('div', 'edux-bplay__holes'), me = E.ctx().st.id;
IDS.concat('eddy').forEach(function (id, i) {
var b = btn('edux-bplay__hole', svg(me, 'happy'));
b.setAttribute('aria-label', L('hole', { n: i + 1 }));
b.onclick = function () {
if (i !== up) return;
G.add(); up = -1; b.classList.remove('is-up'); b.classList.add('is-hit');
G.t(function () { b.classList.remove('is-hit'); }, 300);
};
holes.push(b); grid.appendChild(b);
});
G.area.appendChild(grid);
G.t(function () {
if (up >= 0) holes[up].classList.remove('is-up');
var n;
do n = Math.floor(Math.random() * holes.length); while (n === up);
up = n; holes[n].classList.add('is-up');
}, 900, 1);
holes[0].focus();
},
pattern: function (G) {
var pads = [], seq = [Math.floor(Math.random() * 4)], at = 0, busy = 1, grid = el('div', 'edux-bplay__pads');
['hoot', 'nabi', 'bobo', 'pingo'].forEach(function (id, i) {
var b = btn('edux-bplay__pad4', svg(id, 'idle'));
b.style.background = B[id].c[0];
b.setAttribute('aria-label', B[id].name);
b.onclick = function () { press(i); };
pads.push(b); grid.appendChild(b);
});
G.area.appendChild(grid);
function lit(i, ms) { pads[i].classList.add('is-lit'); G.t(function () { pads[i].classList.remove('is-lit'); }, ms); }
function show() {
busy = 1; at = 0; G.msg(L('watch'));
seq.forEach(function (n, k) { G.t(function () { lit(n, 420); }, 600 * k + 500); });
G.t(function () { busy = 0; G.msg(L('you')); }, 600 * seq.length + 500);
}
function press(i) {
if (busy) return;
lit(i, 200);
if (i !== seq[at]) { busy = 1; G.msg(L('again')); G.t(show, 900); return; }
if (++at === seq.length) { G.add(); busy = 1; seq.push(Math.floor(Math.random() * 4)); G.t(show, 700); }
}
show();
pads[0].focus();
}
};
function play() {
var c = E.ctx(), st = c.st, gN = st.gN = st.gN || {}, ks = Object.keys(gN),
list = rm() ? ['stars', 'peek', 'pattern'] : ['stars', 'bounce', 'peek', 'pattern'],
kind = list[(st.gi || 0) % list.length];
st.gi = (st.gi || 0) + 1; st.gA = Date.now(); gN[c.path] = (gN[c.path] || 0) + 1;
if (ks.length > 40) delete gN[ks[0]];
E.save(); E.hush();
var ov = el('div', 'edux-bplay'), top = el('div', 'edux-bplay__top'), area = el('div', 'edux-bplay__area'),
sc = el('b', 'edux-bplay__score', '★ 0'), bar = el('span', 'edux-bplay__bar'), fill = el('i'),
x = btn('edux-bplay__x'), msg = el('p', 'edux-bplay__msg', L('g_' + kind)),
T = [], score = 0, t0 = Date.now(), dur = kind === 'pattern' ? 3e4 : 2e4, over, unbind;
ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', L('g_' + kind));
ov.setAttribute('data-game', kind);
x.textContent = '✕'; x.setAttribute('aria-label', L('close'));
msg.setAttribute('aria-live', 'polite');
bar.appendChild(fill); top.append(sc, bar, x); ov.append(top, msg, area);
ov.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });
ov.addEventListener('gesturestart', function (e) { e.preventDefault(); });
D.body.appendChild(ov);
var G = {
area: area,
add: function () { score++; sc.textContent = '★ ' + score; },
msg: function (s) { msg.textContent = s; },
t: function (f, ms, rep) { T.push((rep ? setInterval : setTimeout)(function () { if (!over) f(); }, ms)); }
};
function end() {
if (over) return;
over = 1; T.forEach(clearTimeout); unbind(); ov.remove(); c.tap.focus();
E.pulse('is-cheer');
E.talk(score ? L('won', { s: score }) : L('fun'), 'cheer');
}
G.t(function () { var f = Math.max(0, 1 - (Date.now() - t0) / dur); fill.style.transform = 'scaleX(' + f + ')'; if (!f) end(); }, 100, 1);
x.onclick = end;
unbind = modal(ov, end);
PLAY[kind](G);
}
var talkLog = [];
function chat() {
var c = E.ctx(), st = c.st, C = W.EDUXCenter,
ov = el('div', 'edux-bpick'), card = el('div', 'edux-bpick__card edux-bchat__card'), head = el('div', 'edux-bchat__head'),
txt = el('div'), note = el('small'), x = btn('edux-buddy__act', '✕'), log = el('div', 'edux-bchat__log'),
form = el('form', 'edux-bchat__form'), ta = el('textarea'), send = btn('edux-buddy__act is-main'), busy = 0, voice = 0, unbind, rec;
card.setAttribute('role', 'dialog'); card.setAttribute('aria-modal', 'true'); card.setAttribute('aria-label', L('c_title'));
head.innerHTML = svg(st.id, 'happy');
var tt = el('b', '', L('c_title') + ' '); tt.insertAdjacentHTML('beforeend', E.tagAI());
txt.appendChild(tt); txt.appendChild(note); head.append(txt, x);
x.setAttribute('aria-label', L('close'));
log.setAttribute('aria-live', 'polite');
ta.rows = 1; ta.maxLength = 300; ta.placeholder = L('c_hint'); ta.setAttribute('aria-label', L('c_hint'));
send.type = 'submit'; send.textContent = L('c_send');
function say(t, who) { var m = el('div', 'edux-bchat__m is-' + who, t); log.appendChild(m); log.scrollTop = log.scrollHeight; return m; }
function count(r) { note.textContent = r && r.limit ? L('c_left', { n: r.used, m: r.limit }) : L('c_note', { m: 20 }); }
function close() { if (rec) try { rec.abort(); } catch (e) {} if (W.speechSynthesis) speechSynthesis.cancel(); unbind(); ov.remove(); c.tap.focus(); }
function speak(t, v) {
if (!v || !W.speechSynthesis || !W.SpeechSynthesisUtterance) return;
var u = new SpeechSynthesisUtterance(t); u.lang = 'en-US'; u.rate = .95; speechSynthesis.cancel(); speechSynthesis.speak(u);
}
form.onsubmit = function (e) {
e.preventDefault();
var q = ta.value.trim();
if (!q || busy) return;
ta.value = ''; say(q, 'me'); talkLog.push({ role: 'user', content: q });
var v = voice; voice = 0;
busy = 1; send.disabled = true;
var wait = say(L('c_wait'), 'note');
C.ask('chat', E.lesson(), talkLog.slice(-12)).then(function (r) {
wait.remove(); busy = 0; send.disabled = false;
if (r.reply) { say(r.reply, 'bot'); talkLog.push({ role: 'assistant', content: r.reply }); count(r); speak(r.reply, v); E.holdExpr('happy'); return; }
talkLog.pop();
if (r.error === 'limit') { say(r.reason === 'month' ? L('c_month') : L('c_day'), 'note'); count(r); ta.disabled = send.disabled = true; return; }
if (r.error === 'not_logged_in' || r.error === 'not_verified') { say(L('c_login'), 'note'); return; }
say(L('c_err'), 'note');
});
};
ta.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); form.requestSubmit ? form.requestSubmit() : form.onsubmit(e); } });
var SR = W.SpeechRecognition || W.webkitSpeechRecognition;
if (SR) {
var mic = btn('edux-buddy__act edux-bchat__mic', '🎤');
mic.setAttribute('aria-label', L('c_mic'));
mic.onclick = function () {
if (rec) { try { rec.stop(); } catch (e) {} return; }
rec = new SR(); rec.lang = 'en-US'; rec.interimResults = false; rec.maxAlternatives = 1;
mic.classList.add('is-on'); ta.placeholder = L('c_listen');
rec.onresult = function (e) { var t = e.results[0] && e.results[0][0] ? e.results[0][0].transcript : ''; if (t) { ta.value = (ta.value ? ta.value + ' ' : '') + t; voice = 1; } };
rec.onend = rec.onerror = function () { rec = null; mic.classList.remove('is-on'); ta.placeholder = L('c_hint'); ta.focus(); };
try { rec.start(); } catch (e) { rec.onend(); }
};
form.append(ta, mic, send);
} else form.append(ta, send);
card.append(head, log, form); ov.appendChild(card);
ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
x.onclick = close;
D.body.appendChild(ov);
count(null);
if (!talkLog.length) say(L('c_hello'), 'bot');
else talkLog.forEach(function (t) { say(t.content, t.role === 'user' ? 'me' : 'bot'); });
unbind = modal(ov, close);
ta.focus();
}
E.x = { pick: pick, play: play, chat: chat };
})();
