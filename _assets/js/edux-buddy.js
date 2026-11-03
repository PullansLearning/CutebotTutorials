(function () {
'use strict';
if (window.EDUXBuddy) return;
var W = window, D = document, INK = '#2B2340';
function star(cx, cy, R, r) {
var P = [], i, o = '', f = function (n) { return n.toFixed(1); };
for (i = 0; i < 10; i++) {
var a = -Math.PI / 2 + i * Math.PI / 5, d = i % 2 ? r : R;
P.push([cx + d * Math.cos(a), cy + d * Math.sin(a)]);
}
for (i = 0; i < 10; i++) {
var c = P[i], pv = P[(i + 9) % 10], nx = P[(i + 1) % 10], t = i % 2 ? .16 : .3;
o += (i ? 'L' : 'M') + f(c[0] + (pv[0] - c[0]) * t) + ' ' + f(c[1] + (pv[1] - c[1]) * t) +
'Q' + f(c[0]) + ' ' + f(c[1]) + ' ' + f(c[0] + (nx[0] - c[0]) * t) + ' ' + f(c[1] + (nx[1] - c[1]) * t);
}
return o + 'Z';
}
function eddyBody(k) {
var R = 33, at = function (d) { var t = d * Math.PI / 180; return (60 + R * Math.sin(t)).toFixed(1) + ' ' + (62 - R * Math.cos(t)).toFixed(1); },
defs = '', arms = '';
[[20, '#5b8ae8', '#2f56b5'], [140, '#4fd2d6', '#22a3ae'], [260, '#f7a94a', '#e9701f']].forEach(function (a, i) {
defs += '<linearGradient id="' + k + 'a' + i + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + a[1] + '"/><stop offset="1" stop-color="' + a[2] + '"/></linearGradient>';
arms += '<path d="M' + at(a[0] - 54) + 'A' + R + ' ' + R + ' 0 0 1 ' + at(a[0] + 54) + '" stroke="url(#' + k + 'a' + i + ')" stroke-width="19" stroke-linecap="round" fill="none"/>';
});
return { defs: defs, body: '<circle cx="60" cy="62" r="33" fill="#fffdf7"/><circle cx="60" cy="8" r="4.2" fill="' + INK + '"/><g class="bdy-ring">' + arms + '</g>' };
}
var EI = '#2a2d4f', EW = function (w) { return 'fill="none" stroke="' + EI + '" stroke-width="' + w + '" stroke-linecap="round"'; };
var EDOT = function (x, rx, ry) { return '<ellipse cx="' + x + '" cy="0" rx="' + rx + '" ry="' + ry + '" fill="' + EI + '"/>'; };
var EARC = function (x) { return '<path d="M' + (x - 4.6) + ' 2Q' + x + ' -4.6 ' + (x + 4.6) + ' 2" ' + EW(2.8) + '/>'; };
var ELID = function (x) { return '<path d="M' + (x - 4.4) + ' 0Q' + x + ' 3 ' + (x + 4.4) + ' 0" ' + EW(2.6) + '/>'; };
var EDDY_FACES = {
idle: function () { return '<g class="bdy-eyes">' + EDOT(-8, 3.8, 5.6) + EDOT(8, 3.8, 5.6) + '</g>'; },
happy: function () { return '<g class="bdy-eyes">' + EARC(-8) + EARC(8) + '</g>'; },
wow: function () { return '<g class="bdy-eyes">' + EDOT(-8, 4.6, 7.2) + EDOT(8, 4.6, 7.2) + '</g>'; },
sleepy: function () { return '<g class="bdy-eyes">' + ELID(-8) + ELID(8) + '</g>'; },
wink: function () { return '<g class="bdy-eyes">' + EDOT(-8, 3.8, 5.6) + EARC(8) + '</g>'; },
dizzy: function () {
var sp = function (x) { return '<path transform="translate(' + x + ' 0) scale(1.1)" d="M0 0a1 1 0 0 1 2 0a2 2 0 0 1-4 0a3 3 0 0 1 6 0" ' + EW(1.6) + '/>'; };
return '<g class="bdy-eyes bdy-spin">' + sp(-8) + sp(8) + '</g>';
}
};
EDDY_FACES.cheer = EDDY_FACES.love = EDDY_FACES.happy; EDDY_FACES.yawn = EDDY_FACES.sleepy;
var B = {
eddy: { name: 'Eddy', c: ['#DCE6FF', '#5b8ae8', '#2f56b5'], t: ['#EEF3FF', '#B5C8F4', '#2F56B5'], line: 'Curious and shy.',
draw: eddyBody, faces: EDDY_FACES, zz: [100, 24], face: [60, 62, 1] },
hoot: { name: 'Hoot', c: ['#DAD3FF', '#A08EF3', '#715FD4'], t: ['#EEEBFF', '#B8AAF6', '#6A59C5'], line: 'Quiet and wise.',
d: 'M27 50C25 40 21 29 21 19C31 24 40 30 46 37C55 34 65 34 74 37C80 30 89 24 99 19C99 29 95 40 93 50C101 62 103 80 96 93C89 105 74 109 60 109C46 109 31 105 24 93C17 80 19 62 27 50Z',
extra: '<g fill="#F4F1FF"><circle cx="46" cy="62" r="12"/><circle cx="74" cy="62" r="12"/></g>' +
'<ellipse cx="60" cy="92" rx="18" ry="12" fill="#EEEBFF" opacity=".7"/>' +
'<g fill="none" stroke="#8E7BE8" stroke-width="1.8" stroke-linecap="round"><path d="M52 89q3 3 6 0"/><path d="M62 89q3 3 6 0"/><path d="M57 96q3 3 6 0"/></g>' +
'<g fill="none" stroke="#715FD4" stroke-width="5" stroke-linecap="round"><path d="M21 74C14 82 15 93 22 98"/><path d="M99 74C106 82 105 93 98 98"/></g>',
face: [60, 63, 1.06], hl: [40, 46] },
nabi: { name: 'Nabi', c: ['#FFD6E4', '#FF9EBF', '#E06A96'], t: ['#FFEEF4', '#FFB8CF', '#A8406B'], line: 'Shy and gentle.',
d: 'M20 82C19 64 26 53 33 48L30 27C29 22 33 20 37 23L51 37C57 36 63 36 69 37L83 23C87 20 91 22 90 27L87 48C94 53 101 64 100 82C99 100 84 108 60 108C36 108 21 100 20 82Z',
extra: '<path d="M34 30L44 39L36 43Z" fill="#FFC2D6" opacity=".9"/><path d="M86 30L76 39L84 43Z" fill="#FFC2D6" opacity=".9"/>' +
'<g stroke="#B24D78" stroke-width="1.5" stroke-linecap="round" opacity=".55"><path d="M17 76L29 78"/><path d="M17 84L29 83"/><path d="M103 76L91 78"/><path d="M103 84L91 83"/></g>' +
'<path d="M98 96C110 92 112 78 104 72" fill="none" stroke="#E06A96" stroke-width="6" stroke-linecap="round"/>',
face: [60, 76, 1.08], hl: [38, 60] },
bobo: { name: 'Bobo', c: ['#D9F7F2', '#6FD8C8', '#2BA898'], t: ['#E6F9F5', '#93DFD3', '#1F7A6E'], line: 'Floaty and kind.', back: 1,
d: 'M17 72C17 44 37 26 60 26C83 26 103 44 103 72Q96 79 89 72Q82 79 75 72Q68 79 60 72Q52 79 45 72Q38 79 31 72Q24 79 17 72Z',
extra: '<g class="bdy-legs" fill="none" stroke="#3BB9A8" stroke-width="4" stroke-linecap="round" opacity=".85">' +
'<path d="M32 76q-4 8 0 15t0 14"/><path d="M48 78q4 8 0 15t0 12"/><path d="M64 78q-4 8 0 15t0 13"/><path d="M80 77q4 8 0 15t0 13"/><path d="M94 75q-3 7 0 13"/></g>',
zz: [104, 30], face: [60, 54, 1.08], hl: [40, 40] },
pingo: { name: 'Pingo', c: ['#7C93D6', '#41559A', '#283463'], t: ['#ECF0FB', '#A9B8E6', '#33457F'], line: 'Brave and steady.',
d: 'M60 22C84 22 98 44 99 70C100 94 86 108 60 108C34 108 20 94 21 70C22 44 36 22 60 22Z',
extra: '<path d="M60 44C48 32 29 42 31 61C32 81 45 100 60 102C75 100 88 81 89 61C91 42 72 32 60 44Z" fill="#F7F9FF"/>' +
'<g fill="#283463"><path d="M22 66C12 74 11 86 16 92C22 88 25 78 24 70Z"/><path d="M98 66C108 74 109 86 104 92C98 88 95 78 96 70Z"/></g>' +
'<g fill="#FFA53D"><ellipse cx="47" cy="108" rx="8" ry="3.6"/><ellipse cx="73" cy="108" rx="8" ry="3.6"/></g>',
face: [60, 64, 1.04], hl: [40, 40] }
};
var IDS = Object.keys(B);
var EYE = function (x) {
return '<g class="bdy-eye"><ellipse cx="' + x + '" cy="0" rx="4.6" ry="6.2" fill="' + INK + '"/>' +
'<circle cx="' + (x + 1.6) + '" cy="-2.3" r="1.8" fill="#fff"/></g>';
};
var SW = function (w, c) { return 'fill="none" stroke="' + (c || INK) + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"'; };
var S = SW(2.6);
var CHEEK = '<g fill="#FF5C8A" opacity=".33"><ellipse cx="-21.5" cy="8.5" rx="5" ry="3"/><ellipse cx="21.5" cy="8.5" rx="5" ry="3"/></g>';
var OPEN = function (w, h) {
return '<path d="M' + -w + ' 5Q0 ' + (5 + h) + ' ' + w + ' 5Z" fill="' + INK + '" stroke="' + INK + '" stroke-width="1.6" stroke-linejoin="round"/>' +
'<path d="M' + (-w * .45) + ' ' + (5 + h * .42) + 'Q0 ' + (5 + h * .3) + ' ' + (w * .45) + ' ' + (5 + h * .42) + 'Q0 ' + (5 + h * .62) + ' ' + (-w * .45) + ' ' + (5 + h * .42) + 'Z" fill="#FF7A99"/>';
};
var SPIRAL = function (x) {
return '<path transform="translate(' + x + ' 0) scale(1.3)" d="M0 0a1 1 0 0 1 2 0a2 2 0 0 1-4 0a3 3 0 0 1 6 0a4 4 0 0 1-8 0" ' + SW(1.7) + '/>';
};
var FACES = {
idle: function () { return '<g class="bdy-eyes">' + EYE(-13) + EYE(13) + '</g>' + CHEEK + '<path d="M-4.5 6Q0 10 4.5 6" ' + S + '/>'; },
happy: function () {
return '<g class="bdy-eyes"><path d="M-17.5 1Q-13 -5.5 -8.5 1" ' + SW(2.9) + '/><path d="M8.5 1Q13 -5.5 17.5 1" ' + SW(2.9) + '/></g>' + CHEEK + OPEN(6, 9);
},
cheer: function () {
return '<g class="bdy-eyes"><path d="M-17 -4.5L-9.5 0L-17 4.5" ' + SW(2.9) + '/><path d="M17 -4.5L9.5 0L17 4.5" ' + SW(2.9) + '/></g>' + CHEEK + OPEN(8, 12.5);
},
sleepy: function () {
return '<g class="bdy-eyes"><path d="M-17.5 0Q-13 4 -8.5 0" ' + S + '/><path d="M8.5 0Q13 4 17.5 0" ' + S + '/></g>' + CHEEK +
'<ellipse cx="0" cy="9" rx="2.2" ry="2.6" fill="' + INK + '"/>';
},
wink: function () { return '<g class="bdy-eyes">' + EYE(-13) + '<path d="M8.5 1Q13 -5.5 17.5 1" ' + SW(2.9) + '/></g>' + CHEEK + OPEN(5, 7); },
wow: function () {
var E = function (x) { return '<g class="bdy-eye"><ellipse cx="' + x + '" cy="0" rx="5.4" ry="7.6" fill="' + INK + '"/><circle cx="' + (x + 1.8) + '" cy="-2.8" r="2.1" fill="#fff"/></g>'; };
return '<g class="bdy-eyes">' + E(-13) + E(13) + '</g>' + CHEEK + '<ellipse cx="0" cy="10" rx="3.4" ry="4.6" fill="' + INK + '"/>';
},
yawn: function () {
return '<g class="bdy-eyes"><path d="M-17.5 0Q-13 4 -8.5 0" ' + S + '/><path d="M8.5 0Q13 4 17.5 0" ' + S + '/></g>' + CHEEK + '<ellipse cx="0" cy="10" rx="4.6" ry="6" fill="' + INK + '"/>';
},
dizzy: function () { return '<g class="bdy-eyes bdy-spin">' + SPIRAL(-14) + SPIRAL(12) + '</g>' + CHEEK + '<path d="M-6 8q1.5-2.5 3 0t3 0t3 0t3 0" ' + SW(2.2) + '/>'; }
};
FACES.love = FACES.happy;
var SPARK = function (x, y, s, c) {
return '<path transform="translate(' + x + ' ' + y + ') scale(' + s + ')" d="M0-6Q.9-.9 6 0Q.9 .9 0 6Q-.9 .9-6 0Q-.9-.9 0-6Z" fill="' + c + '"/>';
};
var HEART = function (x, y, s, c) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M0 5C-9-1-6-8 0-4C6-8 9-1 0 5Z" fill="' + c + '"/></g>'; };
var DECO = {
love: function () { return '<g class="bdy-deco bdy-love">' + HEART(16, 30, 1, '#FF6F91') + HEART(104, 34, .8, '#FF8FAB') + HEART(60, 14, .7, '#FF6F91') + '</g>'; },
cheer: function () { return '<g class="bdy-deco">' + SPARK(12, 26, 1.1, '#FFB020') + SPARK(108, 22, .9, '#FF6F91') + SPARK(112, 46, .6, '#4FB6F0') + SPARK(8, 46, .55, '#52C98A') + '</g>'; },
sleepy: function (b) {
var q = b.zz || [98, 30], z = function (x, y, s) { return '<path transform="translate(' + x + ' ' + y + ') scale(' + s + ')" d="M-3-3H3L-3 3H3" ' + SW(2, '#8C86A8') + '/>'; };
return '<g class="bdy-deco bdy-zz">' + z(q[0], q[1], 1.1) + z(q[0] + 10, q[1] - 12, .8) + '</g>';
},
dizzy: function () { return '<g class="bdy-deco">' + SPARK(40, 18, .55, '#FFB020') + SPARK(80, 16, .45, '#FFB020') + SPARK(60, 12, .5, '#FF6F91') + '</g>'; }
};
function face(id, e) {
var b = B[id], f = b.face;
var F = b.faces || FACES;
return '<g transform="translate(' + f[0] + ' ' + f[1] + ') scale(' + f[2] + ')">' + (F[e] || F.idle)() + '</g>' + (DECO[e] ? DECO[e](b) : '');
}
var uid = 0;
function svg(id, e) {
var b = B[id], k = 'bdy' + (++uid);
if (b.draw) {
var m = b.draw(k);
return '<svg class="bdy" data-expr="' + (e || 'idle') + '" viewBox="0 0 120 120" aria-hidden="true"><defs>' + m.defs + '</defs>' +
'<ellipse class="bdy-shadow" cx="60" cy="112" rx="28" ry="3.4" fill="' + INK + '" opacity=".13"/>' +
'<g class="bdy-body">' + m.body + '<g class="bdy-facewrap">' + face(id, e) + '</g></g></svg>';
}
var h = b.hl, hw = h[2] || 9, hh = h[3] || 5,
body = '<path d="' + b.d + '" fill="url(#' + k + 'g)"/><path d="' + b.d + '" fill="url(#' + k + 's)"/>';
return '<svg class="bdy" data-expr="' + (e || 'idle') + '" viewBox="0 0 120 120" aria-hidden="true">' +
'<defs><radialGradient id="' + k + 'g" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="' + b.c[0] + '"/><stop offset=".45" stop-color="' + b.c[1] + '"/><stop offset="1" stop-color="' + b.c[2] + '"/></radialGradient>' +
'<linearGradient id="' + k + 's" x1="0" y1="0" x2="0" y2="1"><stop offset=".55" stop-color="' + b.c[2] + '" stop-opacity="0"/><stop offset="1" stop-color="' + b.c[2] + '" stop-opacity=".45"/></linearGradient>' +
'<radialGradient id="' + k + 'h"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>' +
'<ellipse class="bdy-shadow" cx="60" cy="112" rx="30" ry="3.6" fill="' + INK + '" opacity=".13"/>' +
'<g class="bdy-body">' + (b.back ? b.extra : '') + body + (!b.back && b.extra ? b.extra : '') +
'<ellipse cx="' + h[0] + '" cy="' + h[1] + '" rx="' + hw + '" ry="' + hh + '" transform="rotate(-24 ' + h[0] + ' ' + h[1] + ')" fill="url(#' + k + 'h)"/>' +
'<g class="bdy-facewrap">' + face(id, e) + '</g></g></svg>';
}
var EN = {
hey: 'Hi! 👋', hi: "Hi! I'm {b}", hi2: 'These are my friends. Tap one to swap!', notnow: 'Maybe later', nice: "Yay! I'm {b}. Let's learn together! ✨",
section: 'Nice work! 🎉|You did it! On to the next part.|Great job on that part! ⭐',
offer: 'Nice work! Quick game? 🎮', playGo: "Let's play!",
level: 'Level complete! You worked so hard. 🏆|You finished the level. Amazing! 🌟',
full: 'Full marks! You nailed it. 🌟',
good: 'Great check-up! You really know this.|Super work on the check-up! 🎉',
poor: "Try again — you're closer than before.|Mistakes help you learn. Try again! 💪",
back: 'Welcome back{n}! I saved your spot. 👋', rest: 'Take a short break? ☕',
tap: 'Hehe! That tickles.|Hi there!|Hee hee!', dizzy: 'Whoa… everything is spinning! 😵',
wait: "Let's finish this part first! 📚", load: 'One moment…', menu: 'What shall we do?', menuLabel: 'Buddy options', nox: "Can't open that right now. Try again later.",
play: 'Play', later: 'Later', friends: 'Friends', bye: 'Turn off', off: 'Bye for now', on: 'Bring back your buddy',
me: 'Your buddy {b}. Tap to say hi.',
streak: '{d} days in a row! Keep it going. 🔥|That is {d} days in a row. Nice habit! 🔥',
resume: "You're {p}% through this chapter. Pick up where you left off.|{p}% done here. Let's finish it today.",
lvl: '{n} chapters done in this level. Steady work! 📈|You have finished {n} chapters in this level.',
tip: 'Tip of the day: {t}',
cheer: 'Small steps every day add up. 💪|Take your time. Understanding beats rushing.|Mistakes are part of learning. Keep going!|You learn best by trying it yourself.',
aiBtn: 'Ask the AI helper', aiNote: 'AI hints · {m} a day', aiLeft: '{n} of {m} hints used today',
aiEmpty: 'Write a sentence first, then ask.', aiWait: 'Reading your writing…',
aiDay: "That's all the hints for today. Try again tomorrow!", aiMonth: 'The AI helper is resting until next month.',
aiErr: "The helper can't answer right now. Try again soon.", aiLogin: 'Log in to use the AI helper.'
};
function L(k, v) {
var I = W.EDUXI18n, s = null;
try { if (I && I.on && I.str) s = I.str('buddy.' + k); } catch (e) {}
s = String(s == null ? EN[k] : s).split('|');
s = s[Math.floor(Math.random() * s.length)];
return v ? s.replace(/\{(\w)\}/g, function (m, n) { return n in v ? v[n] : ''; }) : s;
}
var CSS = [
'.edux-buddy{position:fixed;right:var(--ebd-r,12px);bottom:calc(12px + var(--edux-dock-lift,0px) + var(--edux-yield,0px));z-index:899;width:64px;padding-bottom:var(--ebd-up,52px);box-sizing:content-box;pointer-events:none;transition:bottom .15s ease-out;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}',
'.edux-buddy>*{pointer-events:auto}',
'.edux-buddy [hidden]{display:none!important}',
'.edux-buddy__tap{display:block;width:64px;height:64px;padding:0;border:0;border-radius:50%;background:none;cursor:pointer;touch-action:none;transform:translate(var(--dx,0px),var(--dy,0px)) rotate(var(--rot,0deg));-webkit-user-select:none;-webkit-tap-highlight-color:transparent}',
'.edux-buddy .bdy,.edux-buddy__tap svg{display:block;width:64px;height:64px;overflow:visible}',
'.edux-buddy__back{display:grid;place-items:center;width:44px;height:44px;margin:20px 0 0 20px;padding:0;border:1px solid var(--color-hairline);border-radius:50%;background:var(--color-surface);box-shadow:0 4px 14px rgb(15 23 42/.18);opacity:.8;cursor:pointer}',
'.edux-buddy__back svg{width:32px;height:32px}',
'.edux-buddy button:focus-visible{outline:0;box-shadow:0 0 0 3px #fff,0 0 0 6px #2B2340}',   /* 두 톤 고리 — 흰 3px + 어두운 3px: 밝은 · 색 바탕 어디서나 3:1 이상. box-shadow 라 둥근 모양을 따라간다(outline 은 옛 사파리에서 네모) — 그리고 키보드(:focus-visible)에서만 */
'.edux-buddy__menu{border-radius:50%}',
'.edux-buddy__say{position:absolute;right:0;bottom:100%;margin-bottom:10px;width:max-content;max-width:min(240px,calc(100vw - 96px));box-sizing:border-box;padding:10px 12px;background:var(--ebd-bg,var(--color-surface));color:#2B2340;border:1px solid var(--ebd-bd,var(--color-hairline));border-radius:18px;box-shadow:0 6px 18px rgb(43 35 64/.16);font:var(--w-medium) var(--text-base)/1.3 var(--font-body);transform-origin:80% 100%}',
'.edux-buddy__say::after{content:"";position:absolute;right:26px;bottom:-7px;width:12px;height:12px;background:var(--ebd-bg,var(--color-surface));border:solid var(--ebd-bd,var(--color-hairline));border-width:0 1px 1px 0;border-radius:0 0 4px 0;transform:rotate(45deg)}',
'.edux-buddy__tap,.edux-buddy__back{transition:transform .2s ease-out,opacity .2s}',
'.edux-buddy.is-aside .edux-buddy__tap,.edux-buddy.is-aside .edux-buddy__back{transform:scale(.4);transform-origin:100% 100%;opacity:.6;pointer-events:none}',
'.edux-buddy__menu{position:absolute;left:-18px;top:-18px;box-sizing:border-box;width:44px;height:44px;padding:10px;border:0;background:none;cursor:pointer;opacity:0;transition:opacity .15s;touch-action:manipulation;-webkit-tap-highlight-color:transparent}',
'.edux-buddy__menu::before{content:"\\2726";display:grid;place-items:center;width:24px;height:24px;border:1px solid var(--color-hairline);border-radius:50%;background:var(--color-surface);color:var(--_accent-ink);font:var(--w-bold) 13px/1 var(--font-display);box-shadow:0 2px 8px rgb(15 23 42/.2)}',
'.edux-buddy:hover .edux-buddy__menu,.edux-buddy:focus-within .edux-buddy__menu,.edux-buddy.is-menu .edux-buddy__menu{opacity:1}@media (hover:none){.edux-buddy__menu{opacity:1}}',
'.edux-buddy.is-aside .edux-buddy__menu{opacity:0;pointer-events:none}',
'.edux-buddy__say.is-show{animation:ebd-say .26s cubic-bezier(.3,1.5,.5,1)}',
'.edux-buddy__line{margin:0}',
'.edux-buddy__acts{display:flex;flex-wrap:wrap;gap:2px 4px;margin:4px -4px -4px}',
'.edux-buddy__act{box-sizing:border-box;min-width:44px;min-height:44px;padding:0 14px;border:4px solid transparent;border-radius:var(--radius-pill);background:transparent padding-box;box-shadow:inset 0 0 0 1.5px var(--ebd-btn,var(--_accent-deep));color:var(--ebd-btn,var(--_accent-ink));font:var(--w-bold) var(--text-sm)/1 var(--font-display);cursor:pointer;touch-action:manipulation}',
'.edux-ai-tag{display:inline-block;vertical-align:1px;padding:1px 7px;border-radius:var(--radius-pill);background:linear-gradient(135deg,var(--color-grape),var(--color-sky));color:#fff;font:var(--w-bold) 11px/1.45 var(--font-display);letter-spacing:.05em}',
'.edux-aihint{margin:6px 0 12px}.edux-aihint[hidden]{display:none}',
'.edux-aibtn{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 14px 0 12px;border:1.5px solid var(--color-grape);border-radius:var(--radius-pill);background:var(--color-surface);color:var(--color-ink);font:var(--w-bold) 15px/1.2 var(--font-display);cursor:pointer}',
'.edux-aibtn:hover{background:var(--color-bg)}.edux-aibtn:disabled{opacity:.55;cursor:default}.edux-aibtn:focus-visible{outline:3px solid var(--color-grape);outline-offset:2px}',
'.edux-aihint__note{display:inline-block;margin-left:10px;color:var(--color-muted);font-size:12.5px}',
'.edux-aihint__out{margin:8px 0 0;padding:10px 12px;border-left:4px solid var(--color-grape);border-radius:10px;background:var(--color-bg);color:var(--color-ink);font-size:15.5px;line-height:1.5;white-space:pre-wrap}',
'.edux-buddy__act.is-main{background:var(--ebd-btn,var(--_accent-deep)) padding-box;box-shadow:none;color:#fff}',
'.bdy-body,.bdy-eyes,.bdy-legs,.bdy-shadow,.bdy-spin path,.bdy-deco path{transform-box:fill-box}',
'.bdy-body{transform-origin:50% 100%}.bdy-legs{transform-origin:50% 0}.bdy-eyes,.bdy-shadow,.bdy-spin path,.bdy-deco path{transform-origin:50% 50%}',
'.bdy-ring{transform-box:view-box;transform-origin:60px 62px}',
'.edux-buddy .bdy-body{animation:ebd-bob 2.6s ease-in-out infinite}',
'.edux-buddy .bdy-shadow{animation:ebd-shadow 2.6s ease-in-out infinite}',
'.edux-buddy .bdy-ring{animation:ebd-ring 40s linear infinite}.edux-buddy .bdy:is([data-expr=cheer],[data-expr=dizzy]) .bdy-ring{animation-duration:1.4s}',
'.edux-buddy .bdy-legs{animation:ebd-legs 3s ease-in-out infinite}',
'.edux-buddy__hi{display:block;margin-bottom:2px;font:var(--w-xbold,800) var(--text-lg)/1.2 var(--font-display)}',
'.edux-buddy__hi i{display:inline-block;font-style:normal;transform-origin:70% 80%;animation:ebd-wave 1.6s ease-in-out 2}',
'.edux-buddy__pals{display:flex;gap:2px;margin:8px -4px 0}',
'.edux-buddy__pal{display:grid;place-items:center;width:50px;height:50px;padding:0;border:0;border-radius:50%;background:none;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform .15s}',
'.edux-buddy__pal svg{width:44px;height:44px;overflow:visible;animation:ebd-pal 2.2s ease-in-out infinite}',
'.edux-buddy__pal:nth-child(2) svg{animation-delay:-.55s}.edux-buddy__pal:nth-child(3) svg{animation-delay:-1.1s}.edux-buddy__pal:nth-child(4) svg{animation-delay:-1.65s}',
'.edux-buddy__pal:hover{transform:scale(1.14)}.edux-buddy__pal:active{transform:scale(.92)}',
'.edux-buddy__act.is-soft{min-width:0;padding:0 8px;box-shadow:none;font-weight:var(--w-medium);text-decoration:underline;text-underline-offset:3px}',
'.edux-buddy .bdy[data-expr=idle] .bdy-eyes{animation:ebd-blink var(--bd-blink,4.6s) infinite var(--bd-blink-delay,0s)}',
'.bdy-spin path{animation:ebd-spin .8s linear infinite}.bdy-zz{animation:ebd-zz 2.4s ease-in-out infinite}',
'.bdy-deco path{animation:ebd-tw 1.2s ease-in-out infinite alternate}',
'.edux-buddy.is-press .bdy-body{animation:none;transform:scale(1.14,.8);transition:transform .08s ease-out}',
'.edux-buddy.is-boing .bdy-body{animation:ebd-boing .5s ease-out}',
'.edux-buddy[data-r=jump] .bdy-body{animation:ebd-hop .6s ease-out}.edux-buddy[data-r=spin] .bdy-body{animation:ebd-turn .8s ease-in-out;transform-origin:50% 50%}',
'.edux-buddy[data-r=wiggle] .bdy-body{animation:ebd-wig .7s ease-in-out}.edux-buddy[data-r=wink] .bdy-body{animation:ebd-tilt 1s ease-in-out}',
'.edux-buddy[data-r=heart] .bdy-body{animation:ebd-hop .5s ease-out}.edux-buddy[data-r=laugh] .bdy-body{animation:ebd-giggle .9s ease-in-out}',
'.edux-buddy[data-r=wow] .bdy-body{animation:ebd-wow .7s ease-out}.edux-buddy[data-r=stretch] .bdy-body{animation:ebd-str .9s ease-in-out}',
'.edux-buddy[data-r=yawn] .bdy-body{animation:ebd-str 1.2s ease-in-out}.edux-buddy[data-r=dance] .bdy-body{animation:ebd-dnc .6s ease-in-out 2}',
'.edux-buddy[data-r=roll] .bdy-body{animation:ebd-roll 1.1s ease-in-out;transform-origin:50% 50%}.edux-buddy[data-r=peek] .bdy-body{animation:ebd-pk 1.2s ease-in-out}',
'.edux-buddy.is-hold .bdy-body{animation:none;transform:scale(1.18,.72)}',
'.bdy-love path{animation:ebd-rise 1.1s ease-out forwards}',
'.edux-buddy.is-dizzy .bdy-body{animation:ebd-wobble 1s ease-in-out infinite}',
'.edux-buddy.is-cheer .bdy-body{animation:ebd-hop .5s ease-out 2}',
'.edux-buddy.is-enter .edux-buddy__tap{animation:ebd-pop .45s cubic-bezier(.3,1.6,.5,1)}',
'@keyframes ebd-bob{50%{transform:translateY(-3px)}}@keyframes ebd-shadow{50%{transform:scaleX(.88);opacity:.09}}',
'@keyframes ebd-ring{to{transform:rotate(360deg)}}@keyframes ebd-legs{50%{transform:scaleY(.9) skewX(4deg)}}@keyframes ebd-pal{50%{transform:translateY(-4px)}}@keyframes ebd-wave{25%,75%{transform:rotate(18deg)}50%{transform:rotate(-8deg)}}@keyframes ebd-blink{0%,94%,100%{transform:scaleY(1)}96.5%{transform:scaleY(.1)}}',
'@keyframes ebd-spin{to{transform:rotate(360deg)}}@keyframes ebd-zz{50%{transform:translate(2px,-3px);opacity:.6}}',
'@keyframes ebd-tw{to{transform:scale(.6);opacity:.6}}@keyframes ebd-rise{from{transform:translateY(8px) scale(.4);opacity:0}30%{opacity:1}to{transform:translateY(-14px) scale(1.1);opacity:0}}',
'@keyframes ebd-turn{to{transform:rotate(360deg)}}@keyframes ebd-wig{20%{transform:translateX(-5px) rotate(-7deg)}40%{transform:translateX(5px) rotate(7deg)}60%{transform:translateX(-4px) rotate(-5deg)}80%{transform:translateX(4px) rotate(4deg)}}',
'@keyframes ebd-tilt{35%,75%{transform:rotate(-9deg) translateY(-2px)}}@keyframes ebd-wow{30%{transform:scale(.9,1.16) translateY(-6px)}60%{transform:scale(1.06,.94)}}',
'@keyframes ebd-str{40%{transform:scale(.86,1.28)}70%{transform:scale(1.07,.93)}}@keyframes ebd-dnc{25%{transform:translateX(-7px) rotate(-10deg) translateY(-6px)}75%{transform:translateX(7px) rotate(10deg) translateY(-6px)}}',
'@keyframes ebd-roll{45%{transform:translateX(-32px) rotate(-360deg)}to{transform:rotate(-720deg)}}@keyframes ebd-pk{30%,55%{transform:scale(.05)}80%{transform:scale(1.16)}}',
'@keyframes ebd-giggle{20%{transform:rotate(-7deg)}40%{transform:rotate(6deg)}60%{transform:rotate(-4deg)}80%{transform:rotate(3deg)}}',
'@keyframes ebd-boing{0%{transform:scale(1.14,.8)}35%{transform:scale(.9,1.12)}65%{transform:scale(1.05,.96)}}',
'@keyframes ebd-wobble{25%{transform:rotate(-9deg)}75%{transform:rotate(9deg)}}',
'@keyframes ebd-hop{40%{transform:translateY(-12px) scale(.96,1.05)}80%{transform:translateY(0) scale(1.06,.94)}}',
'@keyframes ebd-pop{from{transform:scale(.3);opacity:0}}@keyframes ebd-say{from{opacity:0;transform:translateY(8px) scale(.9)}}',
'html[data-edux-slide] .edux-buddy{display:none}@media print{.edux-buddy{display:none}}',
'@media (prefers-reduced-motion:reduce){.edux-buddy,.edux-buddy *{animation:none!important;transition:none!important}}'
].join('');
var DEV = 'edux:buddy-off', LOC = 'edux:buddy', MIN10 = 6e5;
var st = {}, me = '', root, tap, back, say, line, acts, sayT, hold, expr = 'idle', ticket = 0, done = {}, lastSec = 0, taps = [], CH, PATH, menu, held = 0, lp, px = 0, py = 0, tapN = 0, dragged = 0, kbd = 0, sideN = 0, lastR = '', rt, wasIdle = 0, lastAct = Date.now();
var M = {};
var HOVER = W.matchMedia && W.matchMedia('(hover:hover)').matches;
var RM = W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)');
function rm() { return !!(RM && RM.matches); }
function later(f, ms) { return setTimeout(f, ms); }
function el(t, c, txt) { var e = D.createElement(t); if (c) e.className = c; if (txt != null) e.textContent = txt; return e; }
function btn(c, html) { var b = el('button', c); b.type = 'button'; if (html) b.innerHTML = html; return b; }
function ls(k, v) {
try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {}
return null;
}
function bin() {
try { var a = W.EDUXChrome.account, s = a.prefix() && a.current() ? a.store({ guest: false }) : null; return s && s.key('buddy') ? s : null; } catch (e) { return null; }
}
function who() { try { var u = W.EDUXChrome.account.current(); return u && u.name ? String(u.name) : ''; } catch (e) { return ''; } }
function load() {
var b = bin(), v = null;
if (b) v = b.get('buddy', null); else try { v = JSON.parse(ls(LOC) || 'null'); } catch (e) {}
return v && typeof v === 'object' ? v : {};
}
function save() { var b = bin(); if (!(b && b.set('buddy', st))) ls(LOC, JSON.stringify(st)); }
function auto() { return 'eddy'; }
function nm() { return B[st.id].name; }
function refresh() {
st = load(); me = who();
if (!B[st.id] || st.auto && st.id !== auto()) { st.id = auto(); st.auto = true; }
if (root) render();
}
function mount() {
if (root) return;
root = el('div', 'edux-buddy');
tap = btn('edux-buddy__tap');
back = btn('edux-buddy__back');
back.setAttribute('aria-label', L('on'));
say = el('div', 'edux-buddy__say');
line = el('p', 'edux-buddy__line');
line.setAttribute('aria-live', 'polite');
acts = el('div', 'edux-buddy__acts');
say.hidden = true;
say.append(line, acts);
menu = btn('edux-buddy__menu');
menu.setAttribute('aria-label', L('menuLabel'));
menu.setAttribute('aria-expanded', 'false');
menu.onclick = function (e) { if (root.classList.contains('is-menu')) return M.close(1); wk = e.detail === 0; useX('fan'); };
root.append(tap, menu, say, back);
D.body.appendChild(root);
tap.addEventListener('contextmenu', function (e) { e.preventDefault(); });
tap.addEventListener('pointerdown', function (e) {
if (e.button) return;
root.classList.add('is-press'); held = 0; dragged = 0; wasIdle = Date.now() - lastAct > 2e4;
px = e.clientX; py = e.clientY; clearTimeout(lp); loadX();
if (M.down) M.down(e); else try { tap.setPointerCapture(e.pointerId); } catch (x) {}
lp = later(function () { held = 1; root.classList.add('is-hold'); holdExpr('cheer', 6e4); }, 450);
});
tap.addEventListener('pointermove', function (e) { if (M.move) M.move(e); });
['pointerup', 'pointercancel', 'pointerleave'].forEach(function (n) {
tap.addEventListener(n, function (e) {
clearTimeout(lp);
if (M.up && M.up(n)) return;
if (!M.up && n === 'pointerup' && Math.hypot(e.clientX - px, e.clientY - py) >= 8) { var t0 = tapN; later(function () { if (tapN === t0) onTap(); }, 60); }
if (!kbd && D.activeElement === tap) tap.blur();
if (root.classList.contains('is-press')) {
root.classList.remove('is-press', 'is-hold');
if (held) { holdExpr('happy', 900); pulse('is-boing'); }
}
if (n === 'pointerleave' && e.pointerType === 'mouse' && !dizzy()) { clearTimeout(hold); setExpr('idle'); }
});
});
tap.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse' && !dizzy()) holdExpr('happy', 6e4); });
tap.addEventListener('click', onTap);
watchCover();
back.onclick = function () { st.off = 0; save(); render(); tap.focus(); idleX(); };
render();
idleX();
}
function render() {
if (!root) return;
var off = !!st.off;
tap.hidden = off; menu.hidden = off; back.hidden = !off;
if (off) { if (M.close) M.close(); hush(); back.innerHTML = svg(st.id, 'sleepy'); return; }
tap.innerHTML = svg(st.id, 'idle'); expr = 'idle';
tap.setAttribute('aria-label', L('me', { b: nm() }));
var t = B[st.id].t;
root.style.setProperty('--ebd-bg', t[0]); root.style.setProperty('--ebd-bd', t[1]); root.style.setProperty('--ebd-btn', t[2]);
var s = tap.firstChild;
s.style.setProperty('--bd-blink', (4 + Math.random() * 2.5).toFixed(2) + 's');
s.style.setProperty('--bd-blink-delay', (-Math.random() * 4).toFixed(2) + 's');
pulse('is-enter');
}
function dizzy() { return root.classList.contains('is-dizzy'); }
function setExpr(e) {
var s = tap && tap.firstChild;
if (e === expr || !s) return;
expr = e; s.setAttribute('data-expr', e);
s.querySelector('.bdy-facewrap').innerHTML = face(st.id, e);
}
function holdExpr(e, ms) { clearTimeout(hold); setExpr(e); hold = later(function () { if (!dizzy()) setExpr('idle'); }, ms || 2600); }
function pulse(c) { root.classList.remove(c); void root.offsetWidth; root.classList.add(c); later(function () { root.classList.remove(c); }, 1100); }
function greet() {
talk('', 'happy', 12000, [[L('notnow'), null, 2]]);
if (!root || st.off) return;
line.textContent = '';
var hi = el('b', 'edux-buddy__hi', L('hi', { b: nm() }) + ' '), pals = el('div', 'edux-buddy__pals');
hi.appendChild(el('i', '', '👋'));
line.append(hi, D.createTextNode(L('hi2')));
IDS.forEach(function (id) {
if (id === st.id) return;
var b = btn('edux-buddy__pal', svg(id, 'happy'));
b.setAttribute('aria-label', B[id].name); b.title = B[id].name;
b.onclick = function () {
hush(); st.id = id; st.auto = false; save(); render();
later(function () { talk(L('nice', { b: nm() }), 'cheer', 3600); }, 350);
};
pals.appendChild(b);
});
say.insertBefore(pals, acts);
}
function talk(text, e, ms, list) {
if (!root || st.off) return;
if (e) holdExpr(e);
clearTimeout(sayT);
line.textContent = text;
acts.innerHTML = '';
var pals = say.querySelector('.edux-buddy__pals'); if (pals) pals.remove();
(list || []).forEach(function (a) {
var b = btn('edux-buddy__act' + (a[2] === 2 ? ' is-soft' : a[2] ? ' is-main' : ''));
b.textContent = a[0];
b.onclick = function () { hush(); if (a[1]) a[1](); };
acts.appendChild(b);
});
acts.hidden = !list;
say.hidden = false; fit();
say.classList.remove('is-show'); void say.offsetWidth; say.classList.add('is-show');
sayT = later(function h() { if (say.contains(D.activeElement) || (HOVER && say.matches(':hover'))) sayT = later(h, 1500); else hush(); }, ms || 3600);
}
function dragBegin() {
dragged = 1; held = 0;
clearTimeout(lp); clearTimeout(hold); clearTimeout(rt); root.removeAttribute('data-r');
root.classList.remove('is-press', 'is-hold');
}
function hush() {
clearTimeout(sayT);
if (!say || say.hidden) return;
var f = say.contains(D.activeElement);
say.hidden = true; sched();
if (f) (st.off ? back : tap).focus();
}
var RX = { jump: ['cheer', 800], spin: ['happy', 900], wiggle: ['happy', 800], wink: ['wink', 1100], heart: ['love', 1200], laugh: ['happy', 1000],
wow: ['wow', 900], stretch: ['happy', 1000], yawn: ['yawn', 1250], dance: ['cheer', 1250], roll: ['happy', 1150], peek: ['wow', 1250] };
function react(n) {
var r = RX[n];
lastR = n; clearTimeout(rt);
root.removeAttribute('data-r'); void root.offsetWidth; root.setAttribute('data-r', n);
holdExpr(r[0], r[1]);
rt = later(function () { root.removeAttribute('data-r'); }, r[1] + 60);
if (n === 'laugh') talk(L('tap'), null, 1800);
}
function onTap() {
tapN++;
if (dizzy()) return;
if (dragged) { dragged = 0; return; }
if (held) { held = 0; return; }
if (st.intro) { st.intro = 0; save(); return greet(); }
var now = Date.now(), pool;
taps = taps.filter(function (t) { return now - t < 1800; });
taps.push(now);
if (taps.length >= 5) {
taps = []; clearTimeout(hold); clearTimeout(rt); root.removeAttribute('data-r'); setExpr('dizzy'); root.classList.add('is-dizzy');
talk(L('dizzy'), null, 2400);
later(function () { root.classList.remove('is-dizzy'); setExpr('idle'); }, 2600);
return;
}
if (taps.length === 3) return react('dance');
pool = Object.keys(RX).filter(function (n) { return n !== lastR && n !== 'dance' && (n !== 'yawn' || wasIdle); });
react(pool[Math.floor(Math.random() * pool.length)]);
if (M.side && ++sideN > 1 && Math.random() < .45) { sideN = 0; M.side(); }
}
function turnOff() { st.off = 1; save(); render(); back.focus(); }
function onSection(e) {
if (!CH || !root || st.off) return;
var d = e.detail || {}, k = d.idx != null ? d.idx : '?', now = Date.now();
if (done[k] || now - lastSec < 15000) return;
done[k] = 1; lastSec = now;
pulse('is-cheer');
if (canPlay()) { ticket = 1; loadX(); talk(L('offer'), 'cheer', 9000, [[L('playGo'), ask, 1], [L('later')]]); }
else talk(L('section'), 'cheer');
}
function onCheck(e) {
var p = +((e.detail || {}).pct) || 0;
if (!root) mount();
if (st.off) return;
later(function () {
pulse('is-cheer');
if (p >= 100) talk(L('full'), 'cheer'); else if (p >= 70) talk(L('good'), 'cheer'); else talk(L('poor'), 'happy', 4600);
}, 500);
}
function welcome() {
var now = Date.now(), last = st.last || 0, t = today(), d = streak(t);
st.last = now;
if (!st.off && !st.asked) {
st.asked = 1; st.intro = 1; st.told = t;
later(function () { talk(L('hey'), 'happy', 2600); }, 1500);
} else if (!st.off && last && now - last > 3 * 864e5) {
st.told = t;
later(function () { talk(L('back', { n: me ? ', ' + me : '' }), 'happy'); }, 1200);
} else if (!st.off) coach(t, d);
save();
}
function today() { return Math.floor((Date.now() - new Date().getTimezoneOffset() * 6e4) / 864e5); }
function streak(t) {
var d = Array.isArray(st.days) ? st.days : [], n = 1, i;
if (d[d.length - 1] !== t) d.push(t);
st.days = d = d.slice(-40);
for (i = d.length - 1; i > 0 && d[i - 1] === d[i] - 1; i--) n++;
return n;
}
function appLines(k) {
var I = W.EDUXI18n, a = (W.EDUXBuddyLines || {})[k];
try { if (I && I.on && I.lang && I.lang() !== 'en') return []; } catch (e) {}
return Array.isArray(a) ? a : [];
}
function here() {
try { var C = W.EDUXChrome.seen, r = C.find(C.all(), location.href); return r ? { p: C.pct(r), v: Array.isArray(r.v) ? r.v.length : 0 } : null; } catch (e) { return null; }
}
function levelDone() {
var all = {}, dir = location.pathname.replace(/[^\/]*$/, ''), got = {}, n = 0;
try { all = W.EDUXChrome.seen.all() || {}; } catch (e) {}
Object.keys(all).forEach(function (k) {
var id = k.replace(/\.html?$/, '');
if (k === dir || k.replace(/[^\/]*$/, '') !== dir || got[id] || !(all[k] && all[k].done)) return;
got[id] = 1; n++;
});
return n;
}
function coach(t, d) {
var first = st.told !== t;
st.told = t;
later(function () {
var tips = appLines('tips'), cheers = appLines('cheers'), h = here(), n, s;
if (first && [2, 3, 5, 7, 10, 14, 21, 30, 50, 100].indexOf(d) > -1) s = L('streak', { d: d });
else if (first && tips.length) s = L('tip', { t: tips[t % tips.length] });
else if (h && h.p > 0 && h.p < 100 && h.v > 1) s = L('resume', { p: h.p });
else if ((n = levelDone()) > 0 && Math.random() < .5) s = L('lvl', { n: n });
else s = cheers.length && Math.random() < .7 ? cheers[Math.floor(Math.random() * cheers.length)] : L('cheer');
talk(s, 'happy', 4600);
}, 1500);
}
function idleWatch() {
var t, said;
function arm() {
lastAct = Date.now(); clearTimeout(t);
if (!said) t = later(function () { if (D.hidden) return arm(); said = 1; talk(L('rest'), 'sleepy', 6000); }, 48e4);
}
['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (n) { addEventListener(n, arm, { passive: true }); });
arm();
}
function canPlay() { return Date.now() - (st.gA || 0) >= MIN10 && ((st.gN || {})[PATH] || 0) < 3; }
function ask() { if (ticket && canPlay()) { ticket = 0; useX('play'); } else talk(L('wait'), 'happy'); }
var xs = 0, want = '', wk = false, idleT = 0, cs = D.currentScript,
XU = cs && (cs.getAttribute('data-x') || cs.src.replace(/edux-buddy\.js/, 'edux-buddy-extra.js'));
var LU = cs && cs.getAttribute('data-l'), lq = 0;
var TU = !!(cs && cs.getAttribute('data-t'));
function canChat() {
var C = W.EDUXCenter;
try { return !!(TU && CH && C && C.ask && C.isOnline() && C.who()); } catch (e) { return false; }
}
function chat() { if (canChat()) useX('chat'); }
function lessonNow() {
var words = [], seen = {};
Array.prototype.forEach.call(D.querySelectorAll('[data-word]'), function (n) {
var w = (n.getAttribute('data-word') || '').trim();
if (w && !seen[w] && words.length < 30) { seen[w] = 1; words.push(w); }
});
var t = (D.title || '').split(/\s[|–—-]\s(?=[^|–—-]*$)/)[0].trim();
return { title: t.slice(0, 120), level: '', words: words, buddy: B[st.id] ? B[st.id].name : '' };
}
var WS = cs && cs.getAttribute('data-w');
function tagAI() { return '<span class="edux-ai-tag" aria-hidden="true">AI</span>'; }
function hintPads() {
if (!WS) return;
var on = canChat();
try {
Array.prototype.forEach.call(D.querySelectorAll(WS), function (ta) {
if (!ta.__eduxAi && on) ta.__eduxAi = hintPad(ta);
if (ta.__eduxAi) ta.__eduxAi.hidden = !on;
});
} catch (e) {}
}
function hintPad(ta) {
var box = el('div', 'edux-aihint'), b = btn('edux-aibtn', '<span aria-hidden="true">✨</span><span>' + L('aiBtn') + '</span>' + tagAI()),
note = el('small', 'edux-aihint__note', L('aiNote', { m: 10 })), out = el('p', 'edux-aihint__out'), busy = 0;
out.setAttribute('aria-live', 'polite'); out.hidden = true;
b.onclick = function () {
var q = String(ta.value || '').trim();
out.hidden = false;
if (q.split(/\s+/).length < 3) { out.textContent = L('aiEmpty'); return; }
if (busy) return;
busy = 1; b.disabled = true; out.textContent = L('aiWait');
W.EDUXCenter.ask('advice', lessonNow(), [{ role: 'user', content: q.slice(0, 1500) }]).then(function (r) {
busy = 0; b.disabled = false;
if (r.reply) { out.textContent = r.reply; note.textContent = L('aiLeft', { n: r.used, m: r.limit }); return; }
if (r.error === 'limit') {
out.textContent = r.reason === 'month' ? L('aiMonth') : L('aiDay'); b.disabled = true;
if (r.limit) note.textContent = L('aiLeft', { n: r.used, m: r.limit });
return;
}
out.textContent = r.error === 'not_logged_in' || r.error === 'not_verified' ? L('aiLogin') : L('aiErr');
});
};
box.append(b, note, out);
ta.insertAdjacentElement('afterend', box);
return box;
}
function loadLines() {
if (lq || W.EDUXBuddyLines || !LU) return;
lq = 1;
var s = el('script');
s.src = LU; s.async = true; s.onerror = function () { s.remove(); };
D.head.appendChild(s);
}
function loadX() {
if (xs || W.EDUXBuddy.x || !XU) return;
xs = 1;
var s = el('script');
s.src = XU; s.async = true;
s.onload = function () { xs = 0; run(); };
s.onerror = function () { xs = 0; s.remove(); if (want) { want = ''; talk(L('nox'), 'sleepy'); } };
D.head.appendChild(s);
}
function run() {
var x = W.EDUXBuddy.x, n = want;
want = '';
if (!n) return;
if (!x) { talk(L('nox'), 'sleepy'); return; }
go(n);
}
function go(n) { hush(); if (n === 'fan') M.open(wk); else W.EDUXBuddy.x[n](); }
function useX(n) {
if (W.EDUXBuddy.x) return go(n);
if (!XU) { talk(L('nox'), 'sleepy'); return; }
want = n; talk(L('load'), 'happy', 8000);
loadX();
}
function pick() { useX('pick'); }
function idleX() {
if (idleT || xs || !XU || W.EDUXBuddy.x) return;
idleT = 1;
function fire() {
idleT = 0;
if (!root || st.off || W.EDUXBuddy.x) return;
if (D.hidden) { D.addEventListener('visibilitychange', function v() { if (!D.hidden) { D.removeEventListener('visibilitychange', v); idleX(); } }); return; }
if (root.getBoundingClientRect().width > 0) loadX();
}
function arm() { if (W.requestIdleCallback) W.requestIdleCallback(fire, { timeout: 5000 }); else later(fire, 2500); }
if (D.readyState === 'complete') arm(); else addEventListener('load', arm, { once: true });
}
var IX = 'button,a[href],input,select,textarea,summary,[role=button],[tabindex]:not([tabindex="-1"])', fq = 0, foc = 0;
var SKIP = '.edux-buddy,.edux-menu,.edux-menu__btn,.edux-report-btn,.edux-report-panel,edux-text-size,.slide-toggle,.cm-teamdock,.cm-teams,.edux-bpick,.edux-bplay,edux-chapter-nav', fxl = [], fxt = 0;
function fixedList() {
var now = Date.now(), c, i, e, p;
if (now - fxt < 1500) return fxl;
fxt = now; fxl = [];
c = D.querySelectorAll('body>*,[role=status],[role=alert],[data-edux-dock]');
for (i = 0; i < c.length; i++) {
e = c[i];
if (e.closest(SKIP) || !(e.textContent || '').trim()) continue;
p = getComputedStyle(e).position;
if (p === 'fixed' || p === 'sticky') fxl.push(e);
}
return fxl;
}
function covers(rr) {
var r = rr || root.getBoundingClientRect(), x0 = r.left - 18, x1 = r.left + 68, y0 = r.top - 18, y1 = r.top + 68,
all = D.querySelectorAll(IX), i, e, b, cx, cy, hit, j, pill, fl;
if (r.width < 1) return false;
fl = fixedList();
for (i = 0; i < fl.length; i++) {
e = fl[i];
if (!e.isConnected) continue;
b = e.getBoundingClientRect();
if (b.width < 1 || b.height < 1 || b.right <= x0 || b.left >= x1 || b.bottom <= y0 || b.top >= y1) continue;
if (b.width > innerWidth * .8 && b.height > innerHeight * .8) continue;
pill = getComputedStyle(e);
if (pill.visibility !== 'hidden' && +pill.opacity > .05) return true;
}
for (i = 0; i < all.length; i++) {
e = all[i]; b = e.getBoundingClientRect();
if (b.width < 1 || b.height < 1 || b.right <= x0 || b.left >= x1 || b.bottom <= y0 || b.top >= y1 || root.contains(e)) continue;
cx = (Math.max(b.left, x0) + Math.min(b.right, x1)) / 2; cy = (Math.max(b.top, y0) + Math.min(b.bottom, y1)) / 2;
hit = D.elementsFromPoint(cx, cy);
for (j = 0; j < hit.length; j++) if (hit[j] === e || e.contains(hit[j])) return true;
}
return false;
}
var CHIPS = '.edux-menu__btn,edux-text-size.is-floating,.slide-toggle.is-floating,.cm-teamdock__btn', laneR = '';
function lane() {
var all = D.querySelectorAll(CHIPS), vw = D.documentElement.clientWidth, rb = root.getBoundingClientRect().bottom, best = null, i, b, k;
for (i = 0; i < all.length; i++) {
b = all[i].getBoundingClientRect();
if (b.width > 1 && b.left > vw / 2 && Math.abs(b.bottom - rb) < 50 && (!best || b.right > best.right + 1 || (Math.abs(b.right - best.right) <= 1 && b.height > best.height))) best = b;
}
k = best ? Math.round(vw - best.right) + 'px|' + Math.round(best.height + 8) + 'px' : 'calc(12px + env(safe-area-inset-right,0px))|env(safe-area-inset-bottom,0px)';
if (k !== laneR) { laneR = k; k = k.split('|'); root.style.setProperty('--ebd-r', k[0]); root.style.setProperty('--ebd-up', k[1]); }
}
function fit() {
fq = 0;
if (!root) return;
lane();
var a = !(foc || !say.hidden || root.classList.contains('is-menu') || root.classList.contains('is-away')) && covers();
if (a !== root.classList.contains('is-aside')) root.classList.toggle('is-aside', a);
}
function sched() { if (!fq) fq = requestAnimationFrame(fit); }
function watchCover() {
['scroll', 'resize', 'load'].forEach(function (n) { addEventListener(n, sched, { passive: true }); });
D.addEventListener('click', function () { later(sched, 80); }, true);
root.addEventListener('focusin', function () { foc = 1; fit(); });
root.addEventListener('focusout', function () { foc = 0; sched(); });
if (W.ResizeObserver) new ResizeObserver(sched).observe(D.body);
setInterval(function () { if (!D.hidden) sched(); }, 600);
sched();
}
function init() {
var q = /[?&]buddy=(off|on)\b/.exec(location.search);
if (q) ls(DEV, q[1] === 'off' ? '1' : null);
if (ls(DEV) === '1') return;
CH = !!D.querySelector('edux-chapter-nav');
PATH = location.pathname.replace(/\.html?$/, '');
var s = el('style'); s.id = 'edux-buddy-css'; s.textContent = CSS; D.head.appendChild(s);
refresh();
D.addEventListener('keydown', function () { kbd = 1; }, true); D.addEventListener('pointerdown', function () { kbd = 0; }, true);
D.addEventListener('edux:section-done', onSection);
D.addEventListener('edux:level-done', function () { if (CH && root && !st.off) { pulse('is-cheer'); talk(L('level'), 'cheer', 4600); } });
D.addEventListener('edux:checkup-result', onCheck);
D.addEventListener('edux:user-changed', refresh);
var had = !!bin();
addEventListener('load', function () { if (!had && bin()) refresh(); });
if (CH) { loadLines(); mount(); welcome(); idleWatch(); hintPads(); }
D.addEventListener('edux:user-changed', hintPads);
addEventListener('storage', hintPads);
addEventListener('load', hintPads);
}
var booted = 0;
function boot() { if (booted) return; booted = 1; try { init(); } catch (e) {} }
if (D.readyState === 'complete') boot(); else { D.addEventListener('DOMContentLoaded', boot); addEventListener('load', boot); }
W.EDUXBuddy = {
svg: svg, face: face, ids: IDS, lines: EN, state: function () { return st; },
B: B, el: el, btn: btn, L: L, rm: rm, save: save, render: render, hush: hush, talk: talk, holdExpr: holdExpr, pulse: pulse,
turnOff: turnOff, ctx: function () { return { st: st, tap: tap, back: back, path: PATH, root: root, menu: menu, kbd: kbd }; },
canChat: canChat, chat: chat, lesson: lessonNow, tagAI: tagAI,
m: M, setExpr: setExpr, dizzy: dizzy, sched: sched, fit: fit, covers: covers, ask: ask, dragBegin: dragBegin
};
})();
