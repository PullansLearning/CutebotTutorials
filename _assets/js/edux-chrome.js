(function () {
'use strict';
function attr(el, name, dflt) { var v = el.getAttribute(name); return v == null ? (dflt || '') : v; }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function ready(f) {
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', f);
else f();
}
function tones(o, v) {
return o.color ? ' style="--' + v + ':' + esc(o.color) + ';--' + v + '-deep:' + esc(o.colorDeep || o.color) +
';--' + v + '-soft:' + esc(o.colorSoft || o.color) + '"' : '';
}
var I18N_EN = {
'term.level_n': 'Level {n}',
'term.chapter': 'Chapter',
'term.chapter_n': 'Chapter {n}',
'term.chapters': 'Chapters',
'term.all_chapters': 'All Chapters',
'term.checkup': 'Check-up',
'term.back_chapter': '← Back to the chapter',
'term.progress': 'My Progress',
'term.guide': 'Teacher Guide',
'term.admin': 'Admin',
'term.alignment': 'Curriculum alignment',
'nav.home': 'Home',
'header.progress': 'Lesson progress',
'badge.login': 'My name',
'badge.logout': 'Logout',
'skip.lesson': 'Skip to the lesson',
'skip.checkup': 'Skip to the check-up',
'footer.nav': 'Footer',
'textsize.label': 'Text size',
'textsize.glyph': 'Aa',
'textsize.pct': '{n} percent',
'slide.on': '⛶ Slide',
'slide.on_title': 'Full-screen view for the projector',
'slide.off': '✕ Exit',
'slide.off_title': 'Leave slide view (Esc)',
'chnav.label': 'Chapter navigation',
'chnav.prev': 'Previous',
'chnav.next': 'Next',
'chnav.back_to': 'Back to',
'chnav.prev_label': 'Chapter',
'chnav.next_label': 'Chapter',
'chnav.home_label': 'All Chapters',
'chnav.assess': '📋 Check-up',
'chnav.assess_note': 'Check what you learned',
'secnav.next': 'Next: {name}',
'fold.open': 'Open',
'fold.close': 'Close',
'fold.pos.step': 'Step {n} of {total}',
'fold.pos.try': 'Try {n} of {total}',
'fold.pos.puzzle': 'Puzzle {n} of {total}',
'fold.pos.project': 'Project {n} of {total}',
'fold.pos.tool': 'Tool {n} of {total}',
'fold.pos.example': 'Example {n} of {total}',
'assess.tabs': 'Check-up sections',
'assess.part': 'Part',
'assess.back': '← Back',
'assess.next': 'Next →',
'assess.left.one': '{n} question left. Press Next again to skip.',
'assess.left.other': '{n} questions left. Press Next again to skip.',
'assess.say.got': 'Got it',
'assess.say.almost': 'Almost',
'assess.say.again': 'Practice again',
'assess.not_a_grade': 'A quick check, not a grade.',
'assess.how': 'How it went',
'report.button': 'Report a problem on this page',
'report.title': 'Report a problem',
'report.kind.typo': 'Typo',
'report.kind.error': 'Content error',
'report.kind.level': 'Too hard / too easy',
'report.kind.other': 'Other',
'report.note': 'What did you see? (optional)',
'report.cancel': 'Cancel',
'report.send': 'Send',
'report.sent': 'Sent — thank you!',
'report.failed': 'Could not send ({status}) — try again later.',
'report.offline': 'Could not send — no connection.',
'login.title': 'Who is studying?',
'login.sub': 'This computer can hold many students. Pick your name so your progress is yours.',
'login.continue': 'Continue as',
'login.add': 'or add a new student',
'login.first': 'Type your name to start',
'login.placeholder': 'Your name',
'login.input': 'New student name',
'login.go': 'Go',
'login.pick': 'Pick your animal',
'login.pick_sub': 'Tap your animal, then Go. A grown-up can add your name.',
'login.pick_add': 'or pick a new animal',
'login.name_opt': 'Name (optional)',
'animal.cat': 'Cat',
'animal.dog': 'Dog',
'animal.lion': 'Lion',
'animal.tiger': 'Tiger',
'animal.rabbit': 'Rabbit',
'animal.bear': 'Bear',
'animal.monkey': 'Monkey',
'animal.elephant': 'Elephant',
'animal.frog': 'Frog',
'animal.turtle': 'Turtle',
'animal.fish': 'Fish',
'animal.butterfly': 'Butterfly',
'note.local': 'Saved in this browser only — nothing is sent anywhere.',
'progress.own': 'Your own progress on this computer.',
'progress.switch': 'Switch student',
'progress.finished': 'Finished',
'progress.started': 'Started',
'progress.clear': 'Clear my progress',
'progress.n_chapters': '{n} chapters',
'progress.report': 'Check-up Report',
'progress.saved_named': 'Saved in this browser under your name — nothing is sent anywhere.',
'lang.label': 'Language',
'lang.ask.title': 'Choose your language',
'lang.ask.sub': 'The whole course in English',
'lang.ask.foot': 'You can change it any time on the home page.',
'resume.label': 'Where you stopped',
'resume.continue': 'Continue',
'resume.at': 'You stopped at {sec}',
'resume.next': 'Up next',
'resume.pick': 'Pick your next chapter in {level}',
'resume.finished': 'You finished {ch}',
'resume.level_done': 'You finished every chapter in {level}',
'mark.done': 'Done',
'mark.started': 'Started',
'mark.all': 'All done',
'mark.n_of': '{n} of {total} done',
'mark.n': '{n} done',
'mark.here': 'You are here',
'mark.start': 'Start here',
'bench.pause': 'Pause the demo',
'bench.play': 'Play the demo',
'dash.not_started': 'Not started yet',
'dash.not_started_sub': 'Nothing here yet, {name}. Open any chapter below when you are ready.',
'dash.not_started_sub_noname': 'Nothing here yet. Open any chapter below when you are ready.',
'dash.n_chapters': '{n} chapters',
'admin.now_at': 'Now at {where}',
'report.chapters': 'Chapters',
'report.band': 'Band',
'report.level': 'Level',
'report.finished': 'Finished',
'report.started': 'Started',
'report.x_of_n': '{x} of {n}',
'dash.cheer.begin': 'Let\'s begin, {name}!',
'dash.cheer.done': 'You finished everything, {name}!',
'dash.cheer.almost': 'Almost there, {name}!',
'dash.cheer.keep': 'Keep going, {name}!',
'dash.cheer.begin_noname': 'Let\'s begin!',
'dash.cheer.done_noname': 'You finished everything!',
'dash.cheer.almost_noname': 'Almost there!',
'dash.cheer.keep_noname': 'Keep going!',
'dash.ring': '{pct}% complete',
'dash.lv_finished': '{x} / {n} chapters finished',
'dash.of_n_complete': '**{x}** of {n} chapters complete',
'dash.tab_progress': 'Progress',
'dash.print': 'Print / Save as PDF report',
'dash.print_sub': 'Saved in this browser only — nothing is sent anywhere.',
'att.title': 'Attendance',
'att.last_weeks': 'last {n} weeks',
'att.none': 'No sessions recorded yet. Sessions are tracked automatically while you study.',
'att.days': 'Days studied',
'att.mins': 'Total minutes',
'att.avg': 'Avg / day',
'att.calendar': 'Attendance calendar',
'score.none': 'No assessments yet',
'score.none_sub': 'Complete a chapter Check-up to see your scores here.',
'score.h': 'Assessments',
'score.completed': 'Completed',
'score.average': 'Average',
'score.trend': 'Trend',
'score.strongest': 'Strongest',
'score.weak': 'Needs work',
'score.chart_sub': 'Score % per assessment · green dashed = pass',
'report.student': 'Student',
'report.doc_title': 'Progress report — {name}',
'report.h': 'Progress report',
'report.print': 'Print',
'report.popup': 'Please allow pop-ups to print the report.',
'report.att_h': 'Attendance (last 28 days)',
'report.date': 'Date',
'report.time': 'Time',
'report.min': '{n} min',
'report.no_sessions': 'No sessions recorded yet.',
'report.area': 'Area',
'report.results': 'Chapter results',
'report.chapter': 'Chapter',
'report.score': 'Score',
'report.no_assess': 'No assessments yet.',
'admin.roster': 'Students on this computer',
'admin.name': 'Name',
'admin.last_seen': 'Last seen',
'admin.now': 'now',
'admin.delete': 'Delete',
'admin.nobody': 'Nobody has signed in on this device yet.',
'admin.saved': 'Saved data on this computer',
'admin.saved_sub': '{pages} saved page set(s) and {keys} stored item(s) ({kb} KB). Chapters are saved automatically so they open without internet — clearing them frees space and they come back next time the page is opened online.',
'admin.clear': 'Clear saved pages',
'admin.erase': 'Erase everything on this computer',
'admin.cleared': 'Cleared {n} saved page set(s).',
'admin.cleared_none': 'No saved pages to clear.',
'offline.saving': 'Saving for offline · {pct}%',
'offline.ready': 'Ready to use offline',
'sounds.get': 'Download all sounds for offline · ~{mb} MB',
'sounds.saving': 'Saving sounds · {pct}%',
'sounds.paused': 'Paused at {pct}% · tap to continue',
'sounds.done': 'All sounds saved ✓',
'sounds.failed': 'Couldn\'t save {n} of {total} sounds · tap to try again',
'sounds.full': 'This device is full · {pct}% of sounds saved',
'sounds.offline': 'Connect to the internet to download sounds',
'admin.erase_confirm': 'Erase everything this app saved on this computer?\n\n· every student name and their progress\n· scores, attendance and unfinished answers\n· saved pages\n\nThis cannot be undone.',
'admin.erased': 'Erased. This computer is back to a fresh install.',
'login.teacher': 'I\'m a teacher / admin',
'guard.gate_title': 'Teachers only',
'guard.gate_sub': 'This page manages the students on this device. Enter the teacher PIN to open it.',
'guard.pin': 'Teacher PIN',
'guard.new_pin': 'New PIN (4–8 digits)',
'guard.pin_again': 'Type the PIN again',
'guard.open': 'Open',
'guard.cancel': 'Cancel',
'guard.forgot': 'Forgot PIN?',
'guard.student_back': 'I\'m a student — go back',
'guard.wrong': 'That PIN is not right. Try again.',
'guard.wait': 'Too many wrong tries. Wait {s} seconds.',
'guard.setup_title': 'Set a teacher PIN',
'guard.setup_warn': 'Teachers only — this PIN guards deleting names on this device.',
'guard.setup_sub': 'Keep it secret from students. Whoever sets the PIN first becomes the admin of this device.',
'guard.setup_go': 'Save PIN',
'guard.pin_short': 'Use 4 digits.',
'guard.pin_mismatch': 'The two PINs are different. Type the second one again.',
'guard.no_save': 'This device could not save that. Its storage may be full or blocked.',
'guard.on': 'Admin is open in this tab. It locks after 30 minutes without use.',
'guard.lock': 'Lock now',
'guard.del_title': 'Delete "{name}"?',
'guard.del_sub': 'Enter the teacher PIN. The name goes to the trash on this device, and you can restore it for 7 days.',
'guard.del_go': 'Move to trash',
'guard.forgot_title': 'Forgot the PIN?',
'guard.forgot_sub': 'A PIN cannot be recovered on this device. There are two ways forward.',
'guard.reset_h': 'Reset this device',
'guard.reset_sub': 'This erases ALL student names and progress on this device, and the PIN. It cannot be undone.',
'guard.reset_type': 'Type {word} to confirm',
'guard.reset_go': 'Erase this device',
'guard.or': 'or',
'guard.es_signin': 'Sign in',
'promo.title': 'Run your class online',
'promo.p1': 'Teacher sign-in — students can\'t open admin or delete names',
'promo.p2': 'Every student\'s progress in one place, on any device',
'promo.p3': 'Lost your PIN? Sign in and fix it in seconds',
'promo.go': 'Open your center →',
'admin.del_trash': 'Deleting a name moves it to the trash on **this computer only**. It can be restored for 7 days, then it is gone.',
'admin.trash': 'Trash — restore within 7 days',
'admin.trash_none': 'The trash is empty.',
'admin.trash_until': 'Gone for good on {date}',
'admin.restore': 'Restore',
'admin.restored': 'Restored "{name}".',
'admin.trashed': 'Moved "{name}" to the trash.',
};
function I18N_ON() { var I = window.EDUXI18n; return !!(I && I.on); }
function T(k, v) {
var I = window.EDUXI18n, s = I && I.on ? I.str(k) : null;
if (s == null) s = Object.prototype.hasOwnProperty.call(I18N_EN, k) ? I18N_EN[k] : k;
return v ? s.replace(/\{(\w+)\}/g, function (m, n) { return n in v ? String(v[n]) : m; }) : s;
}
function TH(k, v) {
var s = esc(T(k, v));
if (!I18N_ON()) return s;
return '<span data-i18n="' + k + '"' + (v ? ' data-i18n-v="' + esc(JSON.stringify(v)) + '"' : '') + '>' + s + '</span>';
}
function richHTML(h, tag) { return h.replace(/\*\*(.+?)\*\*/g, '<' + tag + '>$1</' + tag + '>'); }
function THR(k, v, tag) {
var s = richHTML(esc(T(k, v)), tag);
if (!I18N_ON()) return s;
return '<span data-i18n="' + k + '" data-i18n-rich="' + tag + '"' +
(v ? ' data-i18n-v="' + esc(JSON.stringify(v)) + '"' : '') + '>' + s + '</span>';
}
function TQ(a, k, v) {
return ' ' + a + '="' + esc(T(k, v)) + '"' + (I18N_ON() && !v ? ' data-i18n-at-' + a + '="' + k + '"' : '');
}
function TN(k, n) {
var I = window.EDUXI18n, c = I && I.on ? I.plural(n) : (n === 1 ? 'one' : 'other');
var s = T(k + '.' + c, { n: n });
return s === k + '.' + c ? T(k + '.other', { n: n }) : s;
}
function TSet(el, k, a) {
if (a) el.setAttribute(a, T(k)); else el.textContent = T(k);
if (I18N_ON()) el.setAttribute(a ? 'data-i18n-at-' + a : 'data-i18n', k);
}
function tattr(el, name, k) { var v = el.getAttribute(name); return v == null ? TH(k) : esc(v); }
function qattr(el, name, a, k) { var v = el.getAttribute(name); return v == null ? TQ(a, k) : ' ' + a + '="' + esc(v) + '"'; }
function isLoggedIn() {
try {
var p = document.documentElement.getAttribute('data-edux-account')
|| (window.EDUX_TRACK && window.EDUX_TRACK.prefix) || '';
if (p) return !!localStorage.getItem(p + 'currentUser');
for (var i = 0; i < localStorage.length; i++) {
var k = localStorage.key(i);
if (k && /:currentUser$/.test(k) && localStorage.getItem(k)) return true;
}
} catch (e) {}
return false;
}
function applyAuthState() {
document.documentElement.setAttribute('data-auth', isLoggedIn() ? 'user' : 'guest');
}
applyAuthState();
function uniquifyName(name, users) {
name = String(name || '').trim();
var taken = {};
(users || []).forEach(function (u) { if (u && u.name) taken[u.name] = true; });
if (!name || !taken[name]) return name;
var now = new Date();
var d = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2);
var withDate = name + ' (' + d + ')';
if (!taken[withDate]) return withDate;
var t = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2);
return name + ' (' + d + ' ' + t + ')';
}
function badgeHtml(loginHref, userKey, usersKey) {
var uid = null, name = null, face = '👤';
if (/currentUser$/.test(userKey || '')) expireIdle(userKey.replace(/currentUser$/, ''));
try { uid = userKey ? localStorage.getItem(userKey) : null; } catch (e) {}
if (uid && usersKey) {
try {
var arr = JSON.parse(localStorage.getItem(usersKey) || '[]');
for (var i = 0; i < arr.length; i++) { if (arr[i].id === uid) { name = arr[i].name; face = faceOf(arr[i]); break; } }
} catch (e) {}
}
var scope = ' data-edux-scope="' + esc(userKey || '') + '" data-edux-users="' + esc(usersKey || '') +
'" data-edux-href="' + esc(loginHref) + '"';
if (uid) {
var who = name || uid;
var mid = 'edux-me-' + (++_meSeq);
var glyph = face !== '👤' ? face : esc((Array.from ? Array.from(String(who).trim())[0] || '' : String(who).charAt(0)).toUpperCase());
return '<div class="edux-badge"' + scope + '>' +
'<a class="edux-badge__pill" href="' + esc(loginHref) + '"' + TQ('title', 'term.progress') + '>' + face + ' ' + esc(who) + '</a>' +
'<button type="button" class="edux-badge__logout" data-edux-logout="' + esc(userKey) + '">' + TH('badge.logout') + '</button>' +
'<button type="button" class="edux-badge__pill edux-badge__me" aria-expanded="false" aria-controls="' + mid + '">' +
'<span class="edux-badge__glyph" aria-hidden="true">' + glyph + '</span>' +
'<span class="edux-sr">' + esc(who) + '</span></button>' +
'<div class="edux-badge__menu" id="' + mid + '">' +
'<a class="edux-badge__item" href="' + esc(loginHref) + '"' + TQ('title', 'term.progress') + '>' + face + ' ' + esc(who) + '</a>' +
'<button type="button" class="edux-badge__item" data-edux-logout="' + esc(userKey) + '">' + TH('badge.logout') + '</button>' +
'</div>' +
'</div>';
}
return '<div class="edux-badge"' + scope + '>' +
'<a class="edux-badge__pill edux-badge__login" href="' + esc(loginHref) + '">' + NAME_ICON +
'<span class="edux-badge__label">' + TH('badge.login') + '</span></a>' +
'</div>';
}
var _meSeq = 0;
function meClose(box, refocus) {
if (!box || !box.classList.contains('is-open')) return;
box.classList.remove('is-open');
var b = box.querySelector('.edux-badge__me');
if (b) { b.setAttribute('aria-expanded', 'false'); if (refocus) b.focus(); }
}
function meCloseAll(except) {
document.querySelectorAll('.edux-badge.is-open').forEach(function (x) { if (x !== except) meClose(x); });
}
function mePlace(box) {
var b = box.querySelector('.edux-badge__me'), m = box.querySelector('.edux-badge__menu');
if (!b || !m) return false;
var r = b.getBoundingClientRect();
if (r.bottom < 0 || r.top > innerHeight || !r.width) return false;
m.style.top = Math.round(r.bottom + 8) + 'px';
m.style.right = Math.max(8, Math.round(document.documentElement.clientWidth - r.right)) + 'px';
return true;
}
function meOpen(box) {
var b = box.querySelector('.edux-badge__me');
if (!b || !box.querySelector('.edux-badge__menu')) return;
meCloseAll(box);
mePlace(box);
box.classList.add('is-open');
b.setAttribute('aria-expanded', 'true');
}
function meFollow() {
document.querySelectorAll('.edux-badge.is-open').forEach(function (x) { if (!mePlace(x)) meClose(x); });
}
var _meWired = false;
function wireMe() {
if (_meWired) return; _meWired = true;
document.addEventListener('click', function (e) {
var b = e.target.closest && e.target.closest('.edux-badge__me');
if (b) {
var box = b.closest('.edux-badge');
if (box.classList.contains('is-open')) meClose(box); else meOpen(box);
return;
}
document.querySelectorAll('.edux-badge.is-open').forEach(function (x) { if (!x.contains(e.target)) meClose(x); });
});
document.addEventListener('keydown', function (e) {
if (e.key === 'Escape') { var o = document.querySelector('.edux-badge.is-open'); if (o) meClose(o, true); }
});
document.addEventListener('focusout', function (e) {
var box = e.target.closest && e.target.closest('.edux-badge.is-open');
if (box && e.relatedTarget && !box.contains(e.relatedTarget)) meClose(box);
});
window.addEventListener('scroll', meFollow, { passive: true });
window.addEventListener('resize', meFollow);
}
function logoutFrom(userKey) {
var pfx = String(userKey || '').replace(/currentUser$/, '');
if (pfx) { try { createTrack(pfx).end(); } catch (e) {} }
try { localStorage.removeItem(userKey); } catch (e) {}
reopen();
}
var _pinned = [], _leaving = false;
window.addEventListener('beforeunload', function () { _leaving = true; });
window.addEventListener('pagehide', function () { _leaving = true; });
window.addEventListener('pageshow', function () { _leaving = false; });
function reopen() { try { history.replaceState(null, ''); } catch (e) {} location.replace(location.href.split('#')[0]); }
function canReload() {
if (location.protocol === 'file:' || navigator.onLine !== false) return true;
return !!(navigator.serviceWorker && navigator.serviceWorker.controller);
}
function away(on) {
if (on && !_leaving && canReload()) try { reopen(); return true; } catch (e) {}
}
function expiredOnPage(pfx, id) {
if (away(_pinned.indexOf(pfx) !== -1)) return;
repaintBadges(pfx + 'currentUser');
try { document.dispatchEvent(new CustomEvent('edux:session-expired', { detail: { prefix: pfx, id: id } })); } catch (e) {}
}
function repaintBadges(userKey) {
applyAuthState();
try {
document.querySelectorAll('.edux-badge').forEach(function (box) {
var out = box.querySelector('[data-edux-logout]'), pill = box.querySelector('.edux-badge__pill');
var scope = box.getAttribute('data-edux-scope') || (out && out.getAttribute('data-edux-logout')) || '';
if (!pill || !scope || (userKey !== null && scope !== userKey)) return;
var href = box.getAttribute('data-edux-href') || pill.getAttribute('href');
var users = box.getAttribute('data-edux-users') || scope.replace(/currentUser$/, 'users');
var wrap = document.createElement('div');
wrap.innerHTML = badgeHtml(href, scope, users);
var fresh = wrap.firstChild;
box.parentNode.replaceChild(fresh, box);
bindLogout(fresh);
});
} catch (e) {}
refreshStudentViews();
}
var _viewsQueued = false;
function refreshStudentViews() {
if (_viewsQueued) return;
_viewsQueued = true;
setTimeout(function () {
_viewsQueued = false;
try { progressMarks(); } catch (e) {}
var views = { 'edux-dashboard': renderDashboard, 'edux-progress': renderProgress,
'edux-attendance': renderAttendance, 'edux-score-report': renderScoreReport };
Object.keys(views).forEach(function (tag) {
document.querySelectorAll(tag).forEach(function (el) {
if (tag !== 'edux-dashboard' && el.parentElement && el.parentElement.closest('edux-dashboard')) return;
try { views[tag](el); } catch (e) {}
});
});
}, 0);
}
window.addEventListener('storage', function (e) {
try { if (e.storageArea && e.storageArea !== window.localStorage) return; } catch (x) { return; }
if (e.key === null) {
if (!away(_pinned.length)) repaintBadges(null);
return;
}
var k = e.key || '', tail = 'currentUser';
if (e.oldValue === e.newValue || k.slice(-tail.length) !== tail) return;
var pfx = k.slice(0, -tail.length);
if (e.newValue === null) { expiredOnPage(pfx, e.oldValue); return; }
if (away(_pinned.indexOf(pfx) !== -1)) return;
repaintBadges(k);
try {
document.dispatchEvent(new CustomEvent('edux:user-changed',
{ detail: { prefix: pfx, id: e.newValue, previous: e.oldValue || null } }));
} catch (x) {}
});
var ME_HOSTS = '.app-header__lead, .app-header:not(.hero) .app-header__inner, .app-header.hero .brandbar, .assess-header-inner, [data-edux-badge-slot]';
function bindLogout(root) {
var boxes = root.classList && root.classList.contains('edux-badge') ? [root] : root.querySelectorAll('.edux-badge');
Array.prototype.forEach.call(boxes, function (box) {
var host = box.parentElement;
if (host && host.matches && host.matches(ME_HOSTS)) { box.classList.add('edux-badge--fold'); return; }
box.querySelectorAll('.edux-badge__me, .edux-badge__menu').forEach(function (n) { n.parentNode.removeChild(n); });
});
root.querySelectorAll('[data-edux-logout]').forEach(function (b) {
b.onclick = function () { logoutFrom(b.getAttribute('data-edux-logout')); };
});
if (root.querySelector('.edux-badge__me')) wireMe();
}
var NAME_ICON = '<svg class="edux-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
'<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.7"/>' +
'<path d="M4.5 20.5c.8-3.9 3.8-6 7.5-6s6.7 2.1 7.5 6" fill="none" stroke="currentColor"' +
' stroke-width="1.7" stroke-linecap="round"/></svg>';
var AVATARS = [['cat', '🐱', 'animal.cat'], ['dog', '🐶', 'animal.dog'], ['lion', '🦁', 'animal.lion'],
['tiger', '🐯', 'animal.tiger'], ['rabbit', '🐰', 'animal.rabbit'], ['bear', '🐻', 'animal.bear'],
['monkey', '🐵', 'animal.monkey'], ['elephant', '🐘', 'animal.elephant'], ['frog', '🐸', 'animal.frog'],
['turtle', '🐢', 'animal.turtle'], ['fish', '🐠', 'animal.fish'], ['butterfly', '🦋', 'animal.butterfly']];
function faceOf(u) {
for (var i = 0; u && u.avatar && i < AVATARS.length; i++) if (AVATARS[i][0] === u.avatar) return AVATARS[i][1];
return '👤';
}
function rankMedalHtml(name, tier) {
return '<div class="rank-medal" aria-label="Rank: ' + esc(name) + '">' +
'<div class="rank-medal-icon">' +
'<svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">' +
'<defs><linearGradient id="eduxMedalGrad" x1="0" y1="0" x2="0" y2="1">' +
'<stop offset="0" stop-color="#fff5b8"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs>' +
'<path d="M9 2 L13 2 L16 10 L13 10 Z" fill="#dc2626"/>' +
'<path d="M19 2 L23 2 L19 10 L16 10 Z" fill="#dc2626"/>' +
'<circle cx="16" cy="20" r="9" fill="url(#eduxMedalGrad)" stroke="#b45309" stroke-width="1.5"/>' +
'<circle cx="16" cy="20" r="6" fill="none" stroke="#b45309" stroke-width="1" opacity=".4"/>' +
'<text x="16" y="24" text-anchor="middle" font-size="9" font-weight="700" fill="#7c2d12">\u2605</text>' +
'</svg>' +
'</div>' +
'<div class="rank-medal-text">' +
(tier ? '<span class="rank-medal-tier">' + esc(tier) + '</span>' : '') +
'<span class="rank-medal-name">' + esc(name) + '</span>' +
'</div></div>';
}
function progressBarHtml(expr) {
if (expr === 'seen') {
return '<div class="app-header__progress" role="progressbar" data-edux-seen-bar aria-valuenow="0"' +
' aria-valuemin="0" aria-valuemax="100"' + TQ('aria-label', 'header.progress') + '>' +
'<div class="app-header__progress-fill"></div></div>';
}
var e = esc(expr);
return '<div class="app-header__progress" role="progressbar" :aria-valuenow="' + e + '"' +
' aria-valuemin="0" aria-valuemax="100"' + TQ('aria-label', 'header.progress') + '>' +
'<div class="app-header__progress-fill" :style="\'width:\' + ' + e + ' + \'%\'"></div></div>';
}
function renderHeader(el) {
var home = attr(el, 'home-href', '../index.html');
var logo = attr(el, 'logo');
var meta = attr(el, 'meta');
var title = attr(el, 'title');
var topic = attr(el, 'topic');
var obj = attr(el, 'object');
var loginHref = attr(el, 'login-href');
var homeLabel = qattr(el, 'home-label', 'aria-label', 'nav.home');
var homeTitle = attr(el, 'home-title');
var rank = attr(el, 'rank'), rankTier = attr(el, 'rank-tier');
var progress = attr(el, 'progress');
var pfx = document.documentElement.getAttribute('data-edux-account') || '';
var userKey = attr(el, 'user-key') || (pfx ? pfx + 'currentUser' : '');
var usersKey = attr(el, 'users-key') || (pfx ? pfx + 'users' : '');
var badge = loginHref ? badgeHtml(loginHref, userKey, usersKey) : '';
el.removeAttribute('title');
var html =
'<header class="app-header' + (rank ? ' app-header--ranked' : '') + '"' + (obj ? ' data-object="' + esc(obj) + '"' : '') + '>' +
'<span data-edux-slot="head"></span>' +
(el.hasAttribute('orb') && !obj ? '<div class="app-header__orb">' + orbHtml(true) + '</div>' : '') +
'<div class="app-header__inner">' +
(rank ? '<div class="app-header__lead">' : '') +
(el.hasAttribute('no-mascot') ? '' :
'<a href="' + esc(home) + '" class="mascot"' +
(homeTitle ? ' title="' + esc(homeTitle) + '"' : '') +
homeLabel + '>' +
(logo ? '<img src="' + esc(logo) + '" alt="">' : '') +
'</a>') +
(rank ? rankMedalHtml(rank, meta || rankTier) + badge + '</div>' : '') +
'<div class="app-header__text">' +
'<span data-edux-slot="top"></span>' +
(meta && !rank ? '<span class="app-header__meta">' + esc(meta) + '</span>' : '') +
(title ? '<h1 class="app-header__title">' + esc(title) + '</h1>' : '') +
(topic ? '<p class="app-header__topic">' + esc(topic) + '</p>' : '') +
'<span data-edux-slot="bottom"></span>' +
(progress ? progressBarHtml(progress) : '') +
'</div>' +
(rank ? '' : badge) +
'</div><span data-edux-slot="foot"></span></header>';
var kept = takeChildren(el);
var skip = skipLink(el, 'skip.lesson');
el.innerHTML = html;
el.insertBefore(kept, el.firstChild);
if (skip) el.insertAdjacentHTML('beforebegin', skip);
placeSlots(el, document.readyState !== 'loading');
wireOrbs(el);
bindLogout(el);
paintSeenBars();
}
function takeChildren(el) {
var frag = document.createDocumentFragment();
while (el.firstChild) frag.appendChild(el.firstChild);
return frag;
}
var HEADER_SLOTS = ['head', 'top', 'bottom', 'foot'];
function placeSlots(el, final) {
var marks = {};
HEADER_SLOTS.forEach(function (k) {
marks[k] = el.querySelector('[data-edux-slot="' + k + '"]');
});
if (!HEADER_SLOTS.some(function (k) { return marks[k]; })) return;
Array.prototype.slice.call(el.children).forEach(function (node) {
if (node.classList && node.classList.contains('app-header')) return;
var want = node.getAttribute && node.getAttribute('slot');
if (want === 'art') { mountArt(el, node); return; }
var where = HEADER_SLOTS.indexOf(want) >= 0 ? want : 'bottom';
var m = marks[where] || marks.bottom || marks.top;
if (m) m.parentNode.insertBefore(node, m);
});
if (final) {
HEADER_SLOTS.forEach(function (k) {
if (marks[k] && marks[k].parentNode) marks[k].parentNode.removeChild(marks[k]);
});
}
}
function mountArt(el, node) {
var head = el.querySelector('.app-header.hero');
if (!head) return;
var old = head.querySelectorAll('.hero-orb, .hero-art');
for (var i = 0; i < old.length; i++) old[i].parentNode.removeChild(old[i]);
var box = document.createElement('div');
box.className = 'hero-art hero-art--inline';
box.appendChild(node);
head.insertBefore(box, head.querySelector('.hero-inner'));
}
function finishHeaderSlots() {
Array.prototype.forEach.call(document.querySelectorAll('edux-header, edux-hero'), function (el) {
placeSlots(el, true);
});
}
ready(finishHeaderSlots);
function _offTimedFetch(url, ms) {
var ctl = ('AbortController' in window) ? new AbortController() : null;
var t = ctl ? setTimeout(function () { ctl.abort(); }, ms) : null;
return fetch(url, ctl ? { signal: ctl.signal } : undefined).then(
function (r) { if (t) clearTimeout(t); return r; },
function (e) { if (t) clearTimeout(t); throw e; }
);
}
function _offCollect() {
var urls = [], seen = Object.create(null);
function add(u) {
if (!u || typeof u !== 'string') return;
if (u.indexOf('data:') === 0 || u.indexOf('blob:') === 0) return;
try { u = new URL(u, location.href).href; } catch (e) { return; }
if (seen[u]) return; seen[u] = 1; urls.push(u);
}
add(location.href);
var imgs = document.images || [];
for (var i = 0; i < imgs.length; i++) add(imgs[i].currentSrc || imgs[i].getAttribute('src'));
if (document.querySelector('edux-predict,edux-numvary')) add(predictKeyUrl());
var hook;
try { hook = (typeof window.eduxOfflineAssets === 'function') ? window.eduxOfflineAssets() : null; } catch (e) { hook = null; }
return Promise.resolve(hook).then(function (extra) {
(extra || []).forEach(function (it) { add(typeof it === 'string' ? it : (it && it.url)); });
return urls;
}, function () { return urls; });
}
function swInfo() {
if (!('serviceWorker' in navigator) || typeof MessageChannel === 'undefined') return Promise.resolve(null);
return navigator.serviceWorker.getRegistration().then(function (reg) {
var sw = reg && reg.active;
if (!sw) return null;
return new Promise(function (done) {
var ch = new MessageChannel(), t = setTimeout(function () { done(null); }, 2000);
ch.port1.onmessage = function (ev) {
clearTimeout(t);
var d = ev.data || {};
done(typeof d.cache === 'string' && Array.isArray(d.own) ? d : null);
};
try { sw.postMessage({ type: 'edux:sw-info' }, [ch.port2]); } catch (e) { clearTimeout(t); done(null); }
});
}).catch(function () { return null; });
}
function _offKey() { return 'edux:offline:' + location.pathname; }
function _offSaved(ver) { try { return localStorage.getItem(_offKey()) === ver; } catch (e) { return false; } }
function _offMark(ver) { try { localStorage.setItem(_offKey(), ver); } catch (e) {} }
function _offRun(ver) {
if (!('caches' in window)) return;
_offCollect().then(function (urls) {
var total = urls.length, done = 0, idx = 0, CONC = 3;
if (!total) { _offMark(ver); return; }
function step() { if (++done >= total) { _offMark(ver); return; } pump(); }
function get(u) {
if (u.indexOf(location.origin + '/') === 0) return _offTimedFetch(u, 12000);
return caches.match(u).then(function (hit) { return hit || _offTimedFetch(u, 12000); });
}
function pump() {
if (idx >= total) return;
get(urls[idx++]).then(function () {}, function () {}).then(step);
}
for (var i = 0; i < Math.min(CONC, total); i++) pump();
});
}
function _offAuto() {
if (!('caches' in window)) return;
if (!('serviceWorker' in navigator)) return;
try {
var c = navigator.connection;
if (c && c.saveData) return;
} catch (e) {}
var go = function () {
navigator.serviceWorker.ready.then(function () {
if (!navigator.serviceWorker.controller) return;
return swInfo().then(function (info) {
var ver = info ? info.cache : '1';
if (_offSaved(ver)) return;
var run = function () { _offRun(ver); };
if (window.requestIdleCallback) requestIdleCallback(run, { timeout: 5000 });
else setTimeout(run, 1500);
});
}).catch(function () {});
};
if (document.readyState === 'complete') go();
else addEventListener('load', go, { once: true });
}
function offlineProgress() {
if (!('serviceWorker' in navigator) || !('caches' in window)) return;
var pill = null, shown = false, misses = 0, compact = false;
function paint(text, done, pct) {
if (!pill) {
pill = document.createElement('div');
pill.className = 'edux-offline-pill';
pill.setAttribute('role', 'status');
document.body.appendChild(pill);
setTimeout(function () { compact = true; if (pill && !pill.classList.contains('is-done')) pill.classList.add('is-compact'); }, 4000);
}
pill.classList.toggle('is-done', !!done);
pill.classList.toggle('is-compact', compact && !done);
pill.setAttribute('aria-label', (done ? '\u2713 ' : '') + text);
pill.textContent = compact && !done && pct != null ? '\u2B07 ' + pct + '%' : (done ? '\u2713 ' : '') + text;
}
function hide() { if (pill) { pill.remove(); pill = null; } }
function tick() {
swInfo().then(function (info) {
if (!info) { if (++misses < 10) setTimeout(tick, 3000); return; }
if (!info.total) return;
if (info.saved >= info.total || info.done) {
if (shown && info.saved >= info.total) { paint(T('offline.ready'), true); setTimeout(hide, 4000); }
else hide();
return;
}
if (navigator.onLine === false) hide();
else { var pct = Math.floor(info.saved * 100 / info.total); shown = true; paint(T('offline.saving', { pct: pct }), false, pct); }
setTimeout(tick, 2500);
});
}
tick();
}
ready(function () { setTimeout(offlineProgress, 1500); });
function soundsSlot(el, variant) {
var inner = el.querySelector('.footer-inner');
if (!inner || !('caches' in window) || !document.querySelector('meta[name="edux-media"]')) return;
if (variant !== 'home' && !document.querySelector('edux-dashboard')) return;
var man = document.querySelector('link[rel="manifest"]');
var root = new URL('.', man ? man.href : location.href).href;
var box = document.createElement('div');
box.className = 'edux-sounds';
inner.insertBefore(box, inner.querySelector('.footer-credit'));
var go = function () { if (window.EDUXTts && EDUXTts.sounds) EDUXTts.sounds(box, root, soundsWord); };
if (window.EDUXTts) return go();
var sc = document.createElement('script');
sc.src = root + '_assets/js/edux-tts.js';
sc.onload = go;
document.head.appendChild(sc);
}
function soundsWord(state, v, html) {
var k = { get: 'sounds.get', saving: 'sounds.saving', paused: 'sounds.paused', done: 'sounds.done',
failed: 'sounds.failed', full: 'sounds.full', offline: 'sounds.offline' }[state];
return html ? TH(k, v) : T(k, v);
}
function renderFooter(el) {
var variant = attr(el, 'variant', 'page');
var brand = attr(el, 'brand');
var sub = attr(el, 'sub');
var logo = attr(el, 'logo');
var home = attr(el, 'home-href');
var links = [];
try { links = JSON.parse(attr(el, 'links', '[]')); } catch (e) {}
var brandImg = logo
? (home ? '<a href="' + esc(home) + '"' + TQ('aria-label', 'nav.home') + ' class="footer-home">' : '') +
'<img src="' + esc(logo) + '" alt="" style="width:40px;height:40px">' +
(home ? '</a>' : '')
: '';
var wantOffline = el.hasAttribute('offline') && ('caches' in window);
var pills = links.length
? '<nav class="footer-cta"' + TQ('aria-label', 'footer.nav') + '>' + links.map(function (l) {
return '<a href="' + esc(l.href) + '" class="footer-pill">' + (l.label || '') + '</a>';
}).join('') + '</nav>'
: '';
el.innerHTML =
'<footer class="site-footer"><div class="footer-inner">' +
'<div class="footer-brand">' + brandImg +
'<div>' +
(brand ? '<div class="footer-brand-name">' + esc(brand) + '</div>' : '') +
(sub ? '<div class="footer-brand-sub">' + esc(sub) + '</div>' : '') +
'</div>' +
'</div>' +
pills +
'</div></footer>';
if (wantOffline) _offAuto();
ready(function () { soundsSlot(el, variant); });
}
function renderGrid(el) {
if (!el.id && !document.getElementById('main-content')) el.id = 'main-content';
var label = attr(el, 'label', T('term.all_chapters'));
var dataId = attr(el, 'data');
var items = [];
try {
var node = dataId && document.getElementById(dataId);
items = node ? JSON.parse(node.textContent) : [];
} catch (e) { items = []; }
var cards = items.map(function (c) {
var cls = 'lx-card' + (c.locked ? ' lx-card--locked' : '') + (c.taught ? ' lx-card--taught' : '') +
(c.kind === 'test' ? ' lx-card--test' : '');
var inner =
(c.num ? '<span class="lx-num">' + chNum(c.num) + '</span>' : '') +
(c.title ? '<span class="lx-title">' + esc(c.title) + '</span>' : '') +
(c.desc ? '<span class="lx-desc">' + esc(c.desc) + '</span>' : '') +
(c.badge ? '<span class="lx-badge"' + TQ('title', 'term.checkup') + '>' + esc(c.badge) + '</span>' : '');
return c.locked
? '<span class="' + cls + '" aria-disabled="true">' + inner +
'<span class="lx-lock">' + esc(c.lock || '\uD83D\uDD12') + '</span></span>'
: '<a href="' + esc(c.href) + '" class="' + cls + '">' + inner + '</a>';
}).join('');
var body =
(label ? '<p class="lx-label">' + esc(label) + '</p>' : '') +
'<div class="lx-grid" data-edux-marks>' + cards + '</div>';
var bare = attr(el, 'wrap') === 'none' || !!(el.closest && el.closest('main'));
el.innerHTML = bare ? body : '<main class="lx-main">' + body + '</main>';
markChapterLinks(el);
}
var ORB_N = 140, ORB_K = 3, ORB_RINGS = 3, ORB_PULSES = 7;
function orbGeom(n, k) {
var pts = [], gold = Math.PI * (3 - Math.sqrt(5)), i, j;
for (i = 0; i < n; i++) {
var y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(Math.max(0, 1 - y * y)), th = gold * i;
pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
}
var edges = [], seen = {};
for (i = 0; i < n; i++) {
var d = [];
for (j = 0; j < n; j++) {
if (i === j) continue;
var dx = pts[i][0] - pts[j][0], dy = pts[i][1] - pts[j][1], dz = pts[i][2] - pts[j][2];
d.push([dx * dx + dy * dy + dz * dz, j]);
}
d.sort(function (a, b) { return a[0] - b[0]; });
for (j = 0; j < k; j++) {
var a = Math.min(i, d[j][1]), b = Math.max(i, d[j][1]), key = a + ':' + b;
if (!seen[key]) { seen[key] = 1; edges.push([a, b]); }
}
}
var rings = [];
for (i = 0; i < ORB_RINGS; i++) {
var tilt = 0.5 + i * 0.7, spin = i * 1.1, ring = [];
for (j = 0; j <= 96; j++) {
var t = (j / 96) * Math.PI * 2, x = Math.cos(t) * 1.16, z = Math.sin(t) * 1.16;
var y2 = z * Math.sin(tilt), z2 = z * Math.cos(tilt);
ring.push([x * Math.cos(spin) - z2 * Math.sin(spin), y2, x * Math.sin(spin) + z2 * Math.cos(spin)]);
}
rings.push(ring);
}
return { pts: pts, edges: edges, rings: rings };
}
var ORB_BIG = null, ORB_SMALL = null;
function orbGeomCached(small) {
if (small) { ORB_SMALL = ORB_SMALL || orbGeom(46, 3); return ORB_SMALL; }
ORB_BIG = ORB_BIG || orbGeom(ORB_N, ORB_K); return ORB_BIG;
}
function orbRGB(el) {
var v = getComputedStyle(el).getPropertyValue('--_accent').trim() ||
getComputedStyle(el).getPropertyValue('--color-accent').trim() || '#4cc9f0';
var probe = document.createElement('span');
probe.style.color = v; probe.style.display = 'none';
document.body.appendChild(probe);
var m = getComputedStyle(probe).color.match(/\d+/g);
probe.remove();
return m ? [+m[0], +m[1], +m[2]] : [76, 201, 240];
}
function mountOrb(cv) {
var small = cv.classList.contains('orb-canvas--mark');
var g = orbGeomCached(small), ctx = cv.getContext('2d');
var light = !!cv.closest('.is-soft3d');
var rgb = orbRGB(cv), W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
var pulses = [], i;
for (i = 0; i < (small ? 0 : ORB_PULSES); i++) {
pulses.push({ e: (Math.random() * g.edges.length) | 0, t: Math.random(), v: 0.004 + Math.random() * 0.006 });
}
function rgba(a) { return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + a + ')'; }
function size() {
var r = cv.getBoundingClientRect();
W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
cv.width = W * dpr; cv.height = H * dpr;
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function draw(yaw) {
var cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.36, F = 3.2;
var cosY = Math.cos(yaw), sinY = Math.sin(yaw), tilt = -0.28;
var cosT = Math.cos(tilt), sinT = Math.sin(tilt);
function proj(p) {
var x = p[0] * cosY + p[2] * sinY, z0 = p[2] * cosY - p[0] * sinY;
var y = p[1] * cosT - z0 * sinT, z = p[1] * sinT + z0 * cosT;
var s = F / (F + z);
return [cx + x * R * s, cy + y * R * s, z, s];
}
ctx.clearRect(0, 0, W, H);
var P = [], k;
for (k = 0; k < g.pts.length; k++) P.push(proj(g.pts[k]));
ctx.lineWidth = light ? 1.2 : 1;
for (k = 0; k < g.rings.length; k++) {
var prev = null;
for (i = 0; i < g.rings[k].length; i++) {
var q = proj(g.rings[k][i]);
if (prev) {
var far = (q[2] + prev[2]) / 2;
ctx.strokeStyle = rgba((light ? 0.30 : 0.34) * (far < 0 ? 1 : 0.28));
ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(q[0], q[1]); ctx.stroke();
}
prev = q;
}
}
for (k = 0; k < g.edges.length; k++) {
var a = P[g.edges[k][0]], b = P[g.edges[k][1]], dep = (a[2] + b[2]) / 2;
var f = (1 - dep) / 2;
ctx.strokeStyle = rgba((light ? 0.30 : 0.42) * (0.12 + f * 0.88));
ctx.lineWidth = 0.5 + f * (light ? 1.1 : 0.7);
ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
}
if (!light) ctx.globalCompositeOperation = 'lighter';
for (k = 0; k < P.length; k++) {
var p = P[k], f2 = (1 - p[2]) / 2, rad = (small ? 1.0 : 1.5) + f2 * (small ? 1.4 : 2.4);
ctx.fillStyle = light ? rgba(0.35 + f2 * 0.55) : rgba(0.22 + f2 * 0.78);
ctx.beginPath(); ctx.arc(p[0], p[1], rad, 0, 6.2832); ctx.fill();
}
for (k = 0; k < pulses.length; k++) {
var pu = pulses[k], e = g.edges[pu.e], pa = P[e[0]], pb = P[e[1]];
var px = pa[0] + (pb[0] - pa[0]) * pu.t, py = pa[1] + (pb[1] - pa[1]) * pu.t;
var pf = (1 - (pa[2] + pb[2]) / 2) / 2;
ctx.fillStyle = light ? rgba(0.85) : 'rgba(255,255,255,' + (0.35 + pf * 0.6) + ')';
ctx.beginPath(); ctx.arc(px, py, 1.4 + pf * 1.8, 0, 6.2832); ctx.fill();
}
ctx.globalCompositeOperation = 'source-over';
}
var t0 = 0, raf = 0, live = false;
function frame(ts) { raf = 0; t0 = ts; step(ts); }
function step(ts) {
var yaw = (ts || 0) / (small ? 14000 : 22000) * Math.PI * 2;
for (var k = 0; k < pulses.length; k++) {
pulses[k].t += pulses[k].v;
if (pulses[k].t > 1) { pulses[k].t = 0; pulses[k].e = (Math.random() * g.edges.length) | 0; }
}
draw(yaw);
if (live && !still) raf = requestAnimationFrame(step);
}
function on() { if (!live && !still) { live = true; raf = requestAnimationFrame(step); } }
function off() { live = false; if (raf) cancelAnimationFrame(raf); raf = 0; }
size(); draw(0.6);
if (still) return;
var woke = W > 1 && H > 1;
if ('ResizeObserver' in window) new ResizeObserver(function () {
size();
if (!woke && W > 1 && H > 1) { woke = true; draw(0.6); on(); }
}).observe(cv);
if ('IntersectionObserver' in window) {
new IntersectionObserver(function (es) { es[0].isIntersecting ? on() : off(); },
{ threshold: 0.05 }).observe(cv);
} else { on(); }
document.addEventListener('visibilitychange', function () { document.hidden ? off() : on(); });
}
function orbHtml(mark, scene) {
return '<div class="orb' + (mark ? ' orb--mark' : '') + '" aria-hidden="true"' +
(scene ? ' data-scene="' + esc(scene) + '"' : '') + '>' +
'<div class="orb__halo"></div>' +
'<canvas class="orb-canvas' + (mark ? ' orb-canvas--mark' : '') + '"' +
(scene ? ' data-scene="' + esc(scene) + '"' : '') + '></canvas>' +
'</div>';
}
function wireOrbs(el) {
var list = el.querySelectorAll ? el.querySelectorAll('.orb-canvas') : [];
for (var i = 0; i < list.length; i++) if (!list[i].__orb) { list[i].__orb = 1; mountOrb(list[i]); }
}
function renderHero(el) {
var variant = attr(el, 'variant', 'gradient');
var soft = variant === 'soft3d';
var scene = attr(el, 'scene');
var object3d = attr(el, 'object');
var art = attr(el, 'art');
if (object3d || art) scene = 'none';
var deep = variant === 'deep3d' || soft;
var mascot = attr(el, 'mascot');
var kicker = attr(el, 'kicker'), title = attr(el, 'title'), word = attr(el, 'word'), sub = attr(el, 'sub');
var brand = attr(el, 'brand'), logo = attr(el, 'logo'), toplink = attr(el, 'toplink'), toplinkHref = attr(el, 'toplink-href');
var steps = [], ctas = [], chips = [];
try { steps = JSON.parse(attr(el, 'stepper', '[]')); } catch (e) {}
try { ctas = JSON.parse(attr(el, 'cta', '[]')); } catch (e) {}
try { chips = JSON.parse(attr(el, 'chips', '[]')); } catch (e) {}
el.removeAttribute('title');
var titleHtml = esc(title);
if (word) { var w = esc(word); titleHtml = titleHtml.replace(w, '<span class="word">' + w + '</span>'); }
var subWord = attr(el, 'sub-word');
var subHtml = esc(sub);
if (subWord) { var sw = esc(subWord); subHtml = subHtml.replace(sw, '<strong>' + sw + '</strong>'); }
var heroPfx = document.documentElement.getAttribute('data-edux-account') || '';
var heroLogin = attr(el, 'login-href');
var heroBadge = heroLogin
? badgeHtml(heroLogin, attr(el, 'user-key') || (heroPfx ? heroPfx + 'currentUser' : ''),
attr(el, 'users-key') || (heroPfx ? heroPfx + 'users' : ''))
: '';
var whoHref = el.hasAttribute('brand-href') ? attr(el, 'brand-href') : null;
if (whoHref === '') {
var centerMeta = document.querySelector('meta[name="edux-center"]');
whoHref = (centerMeta && centerMeta.getAttribute('content')) || null;
}
var whoInner = (logo ? '<img src="' + esc(logo) + '" alt="">' : '') + (brand ? '<span>' + esc(brand) + '</span>' : '');
var who = whoHref != null
? '<a class="who" href="' + esc(whoHref) + '" aria-label="Home">' + whoInner + '</a>'
: '<div class="who">' + whoInner + '</div>';
var badgeSlot = heroBadge && document.querySelector('[data-edux-badge-slot]');
var barBadge = badgeSlot ? '' : heroBadge;
var brandbar = (brand || toplink || barBadge)
? '<div class="brandbar">' + who +
(toplink ? '<a class="toplink" href="' + esc(toplinkHref) + '">' + esc(toplink) + '</a>' : '') + barBadge + '</div>'
: '';
if (badgeSlot && !badgeSlot.querySelector('.edux-badge')) {
badgeSlot.innerHTML = heroBadge;
bindLogout(badgeSlot);
}
var stepHtml = steps.length ? '<div class="stepper">' + steps.map(function (s, i) {
return '<div class="step hero-step"' + (s.tone ? ' style="--tone:' + esc(s.tone) + '"' : '') + '>' +
'<span class="step__lvl">' + esc(s.lvl || '') + '</span>' + (s.cap ? '<span class="step__cap">' + esc(s.cap) + '</span>' : '') + '</div>' +
(i < steps.length - 1 ? '<span class="step-arrow">→</span>' : '');
}).join('') + '</div>' : '';
var ctaHtml = ctas.length ? '<div class="hero-cta">' + ctas.map(function (c) {
return '<a class="btn' + (c.kind === 'ghost' ? ' btn--ghost' : '') + '" href="' + esc(c.href) + '">' + esc(c.label || '') + '</a>';
}).join('') + '</div>' : '';
var sceneHtml = deep
? '<div class="hero-scene" aria-hidden="true">' +
'<div class="hero-floor"></div><div class="hero-sky"></div><div class="hero-glow"></div>' +
(art ? '<div class="hero-art"><img src="' + esc(art) + '" alt="" decoding="async"></div>'
: scene === 'none' ? ''
: '<div class="hero-orb">' + orbHtml(false, scene) + '</div>') +
(chips.length ? '<div class="hero-chips">' + chips.map(function (c, i) {
return '<code class="hero-chip hero-chip--' + ((i % 6) + 1) + '">' + esc(c) + '</code>';
}).join('') + '</div>' : '') +
'</div>'
: '';
var keptHero = takeChildren(el);
el.innerHTML =
'<header class="app-header hero' + (variant === 'light' ? ' is-light' : '') +
(deep ? ' is-deep3d is-unified' : '') + (soft ? ' is-soft3d' : '') + '"' +
(object3d && !art ? ' data-object="' + esc(object3d) + '"' : '') + '>' + sceneHtml + brandbar +
'<div class="hero-inner">' +
(mascot ? '<div class="mascot"><img src="' + esc(mascot) + '" alt=""></div>' : '') +
(kicker ? '<span class="aux-badge">' + esc(kicker) + '</span>' : '') +
'<span data-edux-slot="top"></span>' +
(title ? '<h1>' + titleHtml + '</h1>' : '') +
(sub ? '<p class="sub">' + subHtml + '</p>' : '') +
'<span data-edux-slot="bottom"></span>' +
stepHtml + ctaHtml +
'</div>' +
'</header>';
el.insertBefore(keptHero, el.firstChild);
placeSlots(el, document.readyState !== 'loading');
wireOrbs(el);
bindLogout(el);
}
function renderLevelGrid(el) {
var eyebrow = attr(el, 'eyebrow'), title = attr(el, 'title'), sub = attr(el, 'sub'), dataId = attr(el, 'data');
var theme = attr(el, 'theme');
var rows = attr(el, 'variant') === 'rows';
var sections = [];
try { var n = dataId && document.getElementById(dataId); sections = n ? JSON.parse(n.textContent) : []; } catch (e) { sections = []; }
var head = (eyebrow || title || sub) ? '<div class="home-head">' +
(eyebrow ? '<div class="home-eyebrow">' + esc(eyebrow) + '</div>' : '') +
(title ? '<div class="home-title">' + esc(title) + '</div>' : '') +
(sub ? '<div class="home-sub">' + esc(sub) + '</div>' : '') + '</div>' : '';
var bands = sections.map(function (s) {
var cards = (s.cards || []).map(function (c) {
var tot = /\d+/.exec(String(c.count || ''));
if (rows) return rowHtml(c, tot);
var inner = (c.num ? '<span class="lx-num">' + esc(c.num) + '</span>' : '') +
(c.title ? '<span class="lx-title">' + esc(c.title) + '</span>' : '') +
(c.desc ? '<span class="lx-desc">' + esc(c.desc) + '</span>' : '') +
(c.count ? '<span class="lx-card__count">' + esc(c.count) + '</span>' : '') +
(c.badge ? '<span class="lx-badge">' + esc(c.badge) + '</span>' : '');
if (c.locked) return '<span class="lx-card lx-card--feature lx-card--locked"' + tones(c, '_accent') +
' aria-disabled="true">' + inner + '<span class="lx-lock">' + esc(c.lock || '\uD83D\uDD12') + '</span></span>';
return '<a class="lx-card lx-card--feature"' + tones(c, '_accent') + ' href="' + esc(c.href) + '"' +
' data-edux-level="' + esc(levelName(c)) + '"' + (tot ? ' data-edux-total="' + tot[0] + '"' : '') + '>' +
inner + '</a>';
}).join('');
if (rows) return '<section class="home-band home-band--rows"' + tones(s, 'tone') + '>' +
(s.title ? '<h3 class="lx-rows__group">' + esc(s.title) + '</h3>' : '') +
'<div class="lx-rows">' + cards + '</div></section>';
var hasBand = s.badge || s.title || s.sub || s.color;
if (!hasBand) return '<section class="home-band home-band--plain"><div class="lx-grid">' + cards + '</div></section>';
var tone = tones(s, 'tone');
var heading =
(s.badge ? '<span class="feature-badge">' + esc(s.badge) + '</span>' : '') +
(s.title ? '<h2 class="home-band__title">' + esc(s.title) + '</h2>' : '') +
(s.sub ? '<p class="home-band__sub">' + esc(s.sub) + '</p>' : '');
var bandCls = s.plain ? 'home-band home-band--headed' : 'feature-band home-band';
return '<section class="' + bandCls + '"' + tone + '>' + heading +
'<div class="lx-grid">' + cards + '</div>' +
'</section>';
}).join('');
var cls = 'home-curriculum' + (theme === 'deep' ? ' is-deep' : '');
var wrap = attr(el, 'wrap');
if (wrap === 'none' && theme !== 'deep') {
el.innerHTML = head + bands;
} else {
var tag = (wrap === 'none' || (el.closest && el.closest('main'))) ? 'div' : 'main';
el.innerHTML = '<' + tag + ' class="' + cls + '">' + head + bands + '</' + tag + '>';
}
progressMarks();
}
function rowHtml(c, tot) {
var n = c.n != null ? String(c.n) : '';
var art = /^<svg[\s>]/.test(String(c.art || '')) ? '<span class="lx-row__art" aria-hidden="true">' + c.art + '</span>' : '';
var inner = (n ? '<span class="lx-row__n" aria-hidden="true">' + esc(n) + '</span>' : '') +
'<span class="lx-row__body">' +
(c.title ? '<span class="lx-title">' + esc(c.title) + '</span>' : '') +
'<span class="lx-row__meta">' + (c.num ? '<span class="lx-num">' + esc(c.num) + '</span>' : '') +
(c.count ? '<span class="lx-card__count">' + esc(c.count) + '</span>' : '') + '</span>' +
(c.desc ? '<span class="lx-desc">' + esc(c.desc) + '</span>' : '') +
'</span>' + art;
if (c.locked) return '<span class="lx-card lx-row lx-card--locked"' + tones(c, '_accent') +
' aria-disabled="true">' + inner + '<span class="lx-lock">' + esc(c.lock || '\uD83D\uDD12') + '</span></span>';
return '<a class="lx-card lx-row"' + tones(c, '_accent') + ' href="' + esc(c.href) + '"' +
' data-edux-level="' + esc(levelName(c)) + '"' + (tot ? ' data-edux-total="' + tot[0] + '"' : '') + '>' + inner + '</a>';
}
function chNum(num) {
var s = String(num == null ? '' : num).trim();
return /^\d+$/.test(s) ? TH('term.chapter_n', { n: s }) : esc(s);
}
function levelName(c) {
var num = String(c.num || '').trim(), t = String(c.title || '').replace(/\s*[\u2192\u203a>]+\s*$/, '').trim();
if (!num) return t;
if (!t || t.indexOf(num) !== -1) return t || num;
return num + ' \u00b7 ' + t;
}
var TSCALE_KEY = 'edux:textScale';
var TMIN = 1, TMAX = 1.65;
function pctToScale(p) { return TMIN + (TMAX - TMIN) * (Math.max(0, Math.min(100, p)) / 100); }
function scaleToPct(v) { return Math.round((v - TMIN) / (TMAX - TMIN) * 100); }
function readScale() {
var v = NaN;
try {
v = parseFloat(localStorage.getItem(TSCALE_KEY));
if (isNaN(v)) v = parseFloat(localStorage.getItem('edux:fontScale'));
} catch (e) {}
if (isNaN(v)) return TMIN;
return Math.max(TMIN, Math.min(TMAX, v));
}
function applyScale(v) { document.documentElement.style.setProperty('--edux-tscale', String(v)); }
applyScale(readScale());
function renderTextSize(el) {
var cur = readScale();
el.innerHTML = '<div class="tsize" role="group"' + TQ('aria-label', 'textsize.label') + '>' +
'<button type="button" class="tsize__toggle" aria-expanded="false"' + TQ('aria-label', 'textsize.label') + '>' + TH('textsize.glyph') + '</button>' +
'<div class="tsize__steps">' +
'<span class="tsize__ico" aria-hidden="true">' + TH('textsize.glyph') + '</span>' +
'<input type="range" class="tsize__range" min="0" max="100" step="5"' +
' value="' + scaleToPct(cur) + '"' + TQ('aria-label', 'textsize.label') +
TQ('aria-valuetext', 'textsize.pct', { n: scaleToPct(cur) }) + '>' +
'<output class="tsize__pct">' + scaleToPct(cur) + '%</output>' +
'</div>' +
'</div>';
var box = el.querySelector('.tsize');
var toggle = el.querySelector('.tsize__toggle');
var range = el.querySelector('.tsize__range');
var out = el.querySelector('.tsize__pct');
function close() { box.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
toggle.onclick = function (e) {
e.stopPropagation();
var open = !box.classList.contains('is-open');
box.classList.toggle('is-open', open);
toggle.setAttribute('aria-expanded', String(open));
};
function commit(persist) {
var pct = parseInt(range.value, 10);
var v = pctToScale(pct);
applyScale(v);
out.textContent = pct + '%';
range.setAttribute('aria-valuetext', T('textsize.pct', { n: pct }));
if (persist) { try { localStorage.setItem(TSCALE_KEY, String(v)); } catch (e) {} }
}
range.addEventListener('input', function () { commit(false); });
range.addEventListener('change', function () { commit(true); });
document.addEventListener('click', function (e) { if (!el.contains(e.target)) close(); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
}
function mountTextSize() {
if (document.querySelector('edux-text-size')) return;
var bar = document.querySelector('[data-edux-fontbar]') || document.querySelector('.progress-bar');
if (!bar) return;
bar.appendChild(document.createElement('edux-text-size'));
}
ready(mountTextSize);
var SLIDE_KEY = 'edux:slideMode';
function slideOn() { return document.documentElement.hasAttribute('data-edux-slide'); }
function setSlide(on) {
var de = document.documentElement;
if (on) de.setAttribute('data-edux-slide', ''); else de.removeAttribute('data-edux-slide');
try { localStorage.setItem(SLIDE_KEY, on ? '1' : '0'); } catch (e) {}
var b = document.querySelector('.slide-toggle');
if (b) {
b.setAttribute('aria-pressed', String(!!on));
TSet(b, on ? 'slide.off' : 'slide.on');
TSet(b, on ? 'slide.off_title' : 'slide.on_title', 'title');
}
if (on) window.scrollTo(0, 0);
}
function mountSlideToggle() {
if (document.querySelector('.slide-toggle')) return;
if (!document.querySelector('edux-chapter-nav')) return;
var bar = document.querySelector('[data-edux-slidebar]') ||
document.querySelector('.progress-bar') ||
document.querySelector('body > nav');
if (!bar) return;
var b = document.createElement('button');
b.type = 'button';
b.className = 'slide-toggle';
b.setAttribute('aria-pressed', 'false');
TSet(b, 'slide.on');
TSet(b, 'slide.on_title', 'title');
b.addEventListener('click', function () { setSlide(!slideOn()); });
bar.appendChild(b);
var saved = null;
try { saved = localStorage.getItem(SLIDE_KEY); } catch (e) {}
if (saved === '1') setSlide(true);
}
ready(mountSlideToggle);
function placeFloatingControls() {
var bar = document.querySelector('.progress-bar') || document.querySelector('[data-edux-slidebar]');
if (!bar) return;
['edux-text-size', '.slide-toggle'].forEach(function (sel) {
var el = document.querySelector(sel);
if (!el) return;
if (el.parentElement !== document.body) document.body.appendChild(el);
el.classList.add('is-floating');
});
}
ready(placeFloatingControls);
var PHONE_MQ = '(max-width: 480px)';
var reportOpen = null;
function phoneMenu() {
var ts = document.querySelector('edux-text-size.is-floating');
if (!ts || !reportOpen || document.querySelector('.edux-menu') || !window.matchMedia) return;
var de = document.documentElement;
var wrap = document.createElement('div');
wrap.className = 'edux-menu';
wrap.innerHTML =
'<button type="button" class="edux-menu__btn" aria-expanded="false" aria-controls="edux-menu-panel">' +
'<span class="edux-menu__dots" aria-hidden="true">⋯</span>' +
'<span class="edux-menu__name">' + TH('textsize.label') + ' · ' + TH('report.title') + '</span>' +
'</button>' +
'<div class="edux-menu__panel" id="edux-menu-panel">' +
'<button type="button" class="edux-menu__report"><span aria-hidden="true">⚑</span> ' +
TH('report.title') + '</button>' +
'</div>';
document.body.appendChild(wrap);
var btn = wrap.querySelector('.edux-menu__btn'), panel = wrap.querySelector('.edux-menu__panel');
function setOpen(on, refocus) {
wrap.classList.toggle('is-open', on);
btn.setAttribute('aria-expanded', String(on));
if (!on && refocus) btn.focus();
}
btn.addEventListener('click', function () { setOpen(!wrap.classList.contains('is-open')); });
wrap.querySelector('.edux-menu__report').addEventListener('click', function () {
setOpen(false);
reportOpen(btn);
});
document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) setOpen(false); });
wrap.addEventListener('focusout', function (e) {
if (e.relatedTarget && !wrap.contains(e.relatedTarget)) setOpen(false);
});
document.addEventListener('keydown', function (e) {
if (e.key === 'Escape' && wrap.classList.contains('is-open')) setOpen(false, true);
});
var mq = matchMedia(PHONE_MQ);
function place() {
var tsBox = ts.querySelector('.tsize');
if (tsBox) tsBox.classList.remove('is-open');
if (mq.matches) {
if (ts.parentElement !== panel) panel.insertBefore(ts, panel.firstChild);
ts.classList.remove('is-floating');
de.setAttribute('data-edux-menu', '');
} else {
setOpen(false);
if (ts.parentElement === panel) document.body.insertBefore(ts, wrap);
ts.classList.add('is-floating');
de.removeAttribute('data-edux-menu');
}
schedDock();
}
place();
if (mq.addEventListener) mq.addEventListener('change', place);
else if (mq.addListener) mq.addListener(place);
}
var DOCK_SEL = '.edux-report-btn, edux-text-size.is-floating, .slide-toggle.is-floating, .edux-menu__btn, .edux-buddy, [data-edux-dock], [data-edux-chip]';
var dockQ = 0, dockRO = null;
function footerIsLast(foot) {
for (var n = foot; n && n !== document.body; n = n.parentElement) {
for (var sb = n.nextElementSibling; sb; sb = sb.nextElementSibling) {
if (!sb.getClientRects().length) continue;
var ps = getComputedStyle(sb).position;
if (ps !== 'fixed' && ps !== 'absolute') return false;
}
}
return true;
}
function dockTop(sel, h, floor) {
var top = h, els = document.querySelectorAll(sel);
for (var i = 0; i < els.length; i++) {
var el = els[i];
if (!el.getClientRects().length) continue;
var cs = getComputedStyle(el);
if (cs.position !== 'fixed' || cs.visibility === 'hidden' || +cs.opacity === 0) continue;
if (dockRO) dockRO.observe(el);
var r = el.getBoundingClientRect(), up = yieldPx && el.matches(YIELD_SEL) ? yieldPx : 0;
if (r.height < 1 || r.bottom + up < floor - 24) continue;
if (r.top + up < top) top = r.top + up;
}
return top;
}
function dockClear() {
var de = document.documentElement, h = window.innerHeight;
var lift = Math.max(0, Math.ceil(h - dockTop('[data-edux-dock]', h, h)));
if (de.style.getPropertyValue('--edux-dock-lift') !== lift + 'px') {
de.style.setProperty('--edux-dock-lift', lift + 'px');
}
var top = dockTop(DOCK_SEL, h, h - lift);
var clear = top < h ? Math.ceil(h - top) + 8 : 0, mode = '';
if (clear) {
var foots = document.querySelectorAll('.site-footer'), foot = null;
for (var j = 0; j < foots.length; j++) if (foots[j].getClientRects().length) foot = foots[j];
mode = foot && footerIsLast(foot) ? 'footer' : 'body';
}
if ((de.getAttribute('data-edux-dock-pad') || '') !== mode) {
if (mode) de.setAttribute('data-edux-dock-pad', mode); else de.removeAttribute('data-edux-dock-pad');
}
if (de.style.getPropertyValue('--edux-dock-clear') !== clear + 'px') {
de.style.setProperty('--edux-dock-clear', clear + 'px');
}
}
function schedDock() {
if (dockQ) return;
dockQ = requestAnimationFrame(function () { dockQ = 0; dockClear(); });
}
function startDock() {
if (window.ResizeObserver) { dockRO = new ResizeObserver(schedDock); dockRO.observe(document.body); }
schedDock();
}
ready(startDock);
addEventListener('load', schedDock);
addEventListener('resize', schedDock);
document.addEventListener('transitionend', function (e) { if (e.target && e.target.matches && e.target.matches(DOCK_SEL)) schedDock(); }, true);
var YIELD_SEL = 'edux-text-size.is-floating, .slide-toggle.is-floating, .edux-menu__btn, .edux-buddy, [data-edux-chip]', yieldPx = 0, yieldQ = 0;
function floatYield() {
yieldQ = 0;
var h = window.innerHeight, need = 0,
btns = document.querySelectorAll('.sec-next__btn'), fl = document.querySelectorAll(YIELD_SEL);
for (var i = 0; i < btns.length; i++) {
var r = btns[i].getBoundingClientRect();
if (!r.height || r.top >= h || r.bottom <= 0) continue;
for (var j = 0; j < fl.length; j++) {
if (!fl[j].getClientRects().length) continue;
var f = fl[j].getBoundingClientRect(), top = f.top + yieldPx, bot = f.bottom + yieldPx;
if (r.right > f.left && r.left < f.right && r.bottom > top && r.top < bot) need = Math.max(need, Math.ceil(bot - r.top) + 8);
}
}
if (need > h / 2) need = 0;
if (need !== yieldPx) { yieldPx = need; document.documentElement.style.setProperty('--edux-yield', need + 'px'); }
}
function schedYield() { if (!yieldQ) yieldQ = requestAnimationFrame(floatYield); }
addEventListener('scroll', schedYield, { passive: true });
addEventListener('resize', schedYield);
document.addEventListener('click', function () { setTimeout(schedYield, 60); }, true);
ready(function () { setTimeout(schedYield, 300); });
document.addEventListener('keydown', function (e) {
if (e.key !== 'Escape' || !slideOn()) return;
if (document.querySelector('.tsize.is-open, .edux-menu.is-open')) return;
setSlide(false);
});
function liveBarHeight() {
var bar = document.querySelector('.progress-bar');
var nav = bar || document.querySelector('[data-edux-slidebar]');
if (!nav) return;
var de = document.documentElement;
var apply = function () {
var h = Math.round(nav.getBoundingClientRect().height);
if (h > 0) {
if (bar) de.style.setProperty('--bar-h-live', h + 'px');
de.style.setProperty('--edux-nav-h', h + 'px');
}
};
apply();
if (window.ResizeObserver) new ResizeObserver(apply).observe(nav);
else window.addEventListener('resize', apply);
}
ready(liveBarHeight);
function acctPrefix() {
return document.documentElement.getAttribute('data-edux-account')
|| (window.EDUX_TRACK && window.EDUX_TRACK.prefix) || '';
}
function expireIdle(p) {
if (!p) return;
try { createTrack(p).expire(); } catch (e) {}
}
var _acct = null;
function acct() {
var p = acctPrefix();
if (!p) return null;
expireIdle(p);
if (!_acct) _acct = window.EDUXAuth.create({ prefix: p, idFallback: 'student-' });
return _acct;
}
function acctCurrent() { var a = acct(); return a ? a.getCurrentUser() : null; }
function acctUsers() { var a = acct(); return a ? a.getUsers() : []; }
function acctStore(opts) {
opts = opts || {};
var fixed = Object.prototype.hasOwnProperty.call(opts, 'uid');
function pfx() { return opts.prefix || acctPrefix(); }
if (fixed && pfx() && _pinned.indexOf(pfx()) === -1) _pinned.push(pfx());
function uid() {
if (fixed) return opts.uid || null;
var p = pfx(); if (!p) return null;
expireIdle(p);
try { return localStorage.getItem(p + 'currentUser') || null; } catch (e) { return null; }
}
function key(name) {
var p = pfx(); if (!p) return null;
var u = uid();
if (u) return p + u + ':' + name;
if (opts.guest === false) return null;
return (typeof opts.guest === 'string' ? opts.guest : p + 'guest:') + name;
}
function get(name, fb) {
var k = key(name); if (!k) return fb;
try {
var v = localStorage.getItem(k);
if (v === null) return fb;
v = JSON.parse(v);
return v == null ? fb : v;
} catch (e) { return fb; }
}
function set(name, val) {
var k = key(name); if (!k) return false;
try { localStorage.setItem(k, JSON.stringify(val)); return true; } catch (e) { return false; }
}
function remove(name) {
var k = key(name); if (!k) return;
try { localStorage.removeItem(k); } catch (e) {}
}
return { prefix: pfx, userId: uid, key: key, get: get, set: set, remove: remove };
}
function seenKey() {
var p = acctPrefix();
if (!p) return 'edux:seen';
var a = acct(), uid = a && a.getCurrentUserId();
return p + (uid || 'guest') + ':seen';
}
function seenAll() {
try { return JSON.parse(localStorage.getItem(seenKey()) || '{}') || {}; } catch (e) { return {}; }
}
function emitDoc(name, detail) {
try { document.dispatchEvent(new CustomEvent(name, { detail: detail })); } catch (e) {}
}
function levelEnd() {
var n = document.querySelector('edux-chapter-nav'), nx = n && n.getAttribute('next-href');
if (!n) return false;
if (!nx || nx === '#') return true;
return dirOf(pathOf(nx)) !== dirOf(location.pathname);
}
function seenMark(done, idx, total, sec) {
try {
var all = seenAll(), k = location.pathname, cur = all[k] || {},
was = !!cur.done, had = idx != null && Array.isArray(cur.v) && cur.v.indexOf(idx) !== -1;
cur.t = Date.now();
var ttl = String(document.title || '').replace(/\s+\|\s.*$/, '').trim();
if (ttl) cur.ttl = ttl;
if (sec) cur.sec = sec;
if (done) cur.done = 1;
if (total) cur.of = total;
if (idx != null) {
var v = Array.isArray(cur.v) ? cur.v : [];
if (v.indexOf(idx) === -1) v.push(idx);
cur.v = v;
}
all[k] = cur;
localStorage.setItem(seenKey(), JSON.stringify(all));
paintSeenBars();
if (idx != null && !had && document.documentElement.getAttribute('data-edux-progress') === 'work')
emitDoc('edux:section-done', { idx: idx, total: total || cur.of || 0, name: sec || '' });
if (done && !was && levelEnd()) emitDoc('edux:level-done', { path: k });
if ((done && !was) || (idx != null && !had)) emitDoc('edux:seen', { path: k, done: !!done && !was, idx: idx, sec: sec || '' });
} catch (e) {}
}
function seenCur(i) {
try {
var all = seenAll(), k = location.pathname, cur = all[k] || {};
if (i == null) return typeof cur.cur === 'number' ? cur.cur : null;
cur.cur = i; cur.t = Date.now(); all[k] = cur;
localStorage.setItem(seenKey(), JSON.stringify(all));
} catch (e) { if (i == null) return null; }
}
function seenFind(all, href) {
var path;
try { path = new URL(href, location.href).pathname; } catch (e) { path = String(href || ''); }
if (all[path]) return all[path];
var bare = path.replace(/\.html?$/, '');
return all[bare] || all[bare + '.html'] || all[bare + '.htm'] || null;
}
function paintSeenBars() {
var bars = document.querySelectorAll('[data-edux-seen-bar]');
if (!bars.length) return;
var pct = 0;
try { pct = seenPct(seenFind(seenAll(), location.href)); } catch (e) {}
[].forEach.call(bars, function (b) {
b.setAttribute('aria-valuenow', pct);
var f = b.firstElementChild;
if (f) f.style.width = pct + '%';
});
}
function seenPct(rec) {
if (!rec) return 0;
if (rec.done) return 100;
if (rec.of && Array.isArray(rec.v)) return Math.round((rec.v.length / rec.of) * 100);
return rec.t ? 5 : 0;
}
function seenWho() { var a = acct(); return a && a.getCurrentUserId() ? a : null; }
function pathOf(href) { try { return new URL(href, location.href).pathname; } catch (e) { return ''; } }
function dirOf(p) { return String(p || '').replace(/[^\/]*$/, ''); }
function seenUnder(all, dirs) {
var by = {};
Object.keys(all).forEach(function (k) {
var d = dirOf(k), r = all[k];
if (!r || dirs.indexOf(d) === -1 || k === d) return;
var id = k.replace(/\.html?$/, ''), cur = by[id];
if (!cur) { by[id] = { path: k, dir: d, rec: r }; return; }
var a = cur.rec, n = (r.t || 0) > (a.t || 0);
cur.rec = { t: Math.max(a.t || 0, r.t || 0), done: a.done || r.done,
ttl: (n ? r.ttl : a.ttl) || a.ttl || r.ttl, sec: (n ? r.sec : a.sec) || a.sec || r.sec };
if (n) cur.path = k;
});
return Object.keys(by).map(function (id) { return by[id]; });
}
function markHtml(st, label, pct) {
return '<span class="edux-mark edux-mark--' + st + '"' + (pct == null ? '' : ' style="--edux-done:' + pct + '%"') + '>' +
(st === 'done' ? '<span aria-hidden="true">✓ </span>' : '') + label + '</span>';
}
function clearMarks(root) {
root.querySelectorAll('.edux-mark').forEach(function (m) { m.remove(); });
root.querySelectorAll('[data-edux-mark]').forEach(function (a) { a.removeAttribute('data-edux-mark'); });
}
function markChapterLinks(root) {
clearMarks(root);
if (!seenWho()) return;
var all = seenAll();
root.querySelectorAll('a[href]').forEach(function (a) {
var rec = seenFind(all, a.getAttribute('href'));
if (!rec) return;
var st = rec.done ? 'done' : 'started';
a.setAttribute('data-edux-mark', st);
a.insertAdjacentHTML('beforeend', markHtml(st, TH(st === 'done' ? 'mark.done' : 'mark.started')));
});
}
function levelCards(grid) {
return [].map.call(grid.querySelectorAll('a.lx-card[data-edux-level]'), function (a) {
var p = pathOf(a.getAttribute('href')), tone = '';
try {
var cs = getComputedStyle(a);
tone = ['', '-deep', '-soft'].map(function (s) {
var v = cs.getPropertyValue('--_accent' + s).trim();
return v ? '--_accent' + s + ':' + v : '';
}).filter(Boolean).join(';');
} catch (e) {}
return { el: a, href: a.getAttribute('href'), dir: dirOf(p),
total: parseInt(a.getAttribute('data-edux-total'), 10) || 0,
name: a.getAttribute('data-edux-level'), tone: tone };
});
}
function markLevelCards(cards, list) {
cards.forEach(function (c) {
clearMarks(c.el);
if (!list) return;
var mine = list.filter(function (x) { return x.dir === c.dir; });
if (!mine.length) return;
var done = mine.filter(function (x) { return x.rec.done; }).length;
var all = c.total && done >= c.total;
var label = all ? TH('mark.all')
: done ? (c.total ? TH('mark.n_of', { n: done, total: c.total }) : TH('mark.n', { n: done }))
: TH('mark.started');
c.el.setAttribute('data-edux-mark', all ? 'done' : 'started');
c.el.insertAdjacentHTML('beforeend', markHtml(all ? 'done' : 'started', label,
c.total ? Math.min(100, Math.round(done / c.total * 100)) : null));
});
}
function lastSeen(list) {
var last = null;
(list || []).forEach(function (x) { if (!last || (x.rec.t || 0) > (last.rec.t || 0)) last = x; });
return last;
}
function markHere(grid, cards, list) {
if (!grid.querySelector('.lx-rows')) return;
cards.forEach(function (c) {
c.el.removeAttribute('data-edux-here');
var old = c.el.querySelector('.lx-row__tag'); if (old) old.remove();
});
if (!cards.length) return;
var last = lastSeen(list), at = cards[0], here = false, i;
if (last) for (i = 0; i < cards.length; i++) if (cards[i].dir === last.dir) { at = cards[i]; here = true; break; }
at.el.setAttribute('data-edux-here', here ? 'here' : 'start');
var t = at.el.querySelector('.lx-title');
if (t) t.insertAdjacentHTML('beforeend', ' <span class="lx-row__tag">' + TH(here ? 'mark.here' : 'mark.start') + '</span>');
}
function resumeHtml(cards, list, detail) {
var last = lastSeen(list);
if (!last) return '';
var lv = null, i;
for (i = 0; i < cards.length; i++) if (cards[i].dir === last.dir) { lv = cards[i]; break; }
if (!lv) return '';
var kick, title, meta, href, tone = lv.tone, next = null;
if (!last.rec.done) {
kick = TH('resume.continue');
title = esc(last.rec.ttl || lv.name);
meta = last.rec.sec ? TH('resume.at', { sec: last.rec.sec }) : '';
href = last.path;
} else {
var done = list.filter(function (x) { return x.dir === lv.dir && x.rec.done; }).length;
next = lv.total && done >= lv.total ? cards[i + 1] : null;
kick = TH('resume.next');
if (next) {
title = esc(next.name); href = next.href; tone = next.tone;
meta = TH('resume.level_done', { level: lv.name });
} else {
title = TH('resume.pick', { level: lv.name }); href = lv.href;
meta = last.rec.ttl ? TH('resume.finished', { ch: last.rec.ttl }) : '';
}
}
var bar = '';
if (detail) {
var at = /^(.+?)\s+\u2014\s+(.+)$/.exec(last.rec.ttl || '');
if (at && !last.rec.done) { kick += ' \u00b7 <span class="edux-resume__at">' + esc(at[1]) + '</span>'; title = esc(at[2]); }
var bl = next || lv, n = list.filter(function (x) { return x.dir === bl.dir && x.rec.done; }).length;
if (bl.total) bar = '<span class="edux-resume__p"><span class="edux-resume__bar" style="--edux-done:' +
Math.min(100, Math.round(n / bl.total * 100)) + '%"></span>' + TH('mark.n_of', { n: n, total: bl.total }) + '</span>';
}
return '<a class="edux-resume__card" href="' + esc(href) + '"' + (tone ? ' style="' + esc(tone) + '"' : '') + '>' +
'<span class="edux-resume__txt">' +
'<span class="edux-resume__k">' + kick + '</span>' +
'<span class="edux-resume__t">' + title + '</span>' +
bar +
(meta ? '<span class="edux-resume__m">' + meta + '</span>' : '') +
'</span>' +
'<span class="edux-resume__go" aria-hidden="true">→</span></a>';
}
function mountResume(grid, cards, list) {
var box = document.querySelector('.edux-resume');
var html = list ? resumeHtml(cards, list, !!(box && box.hasAttribute('data-edux-detail'))) : '';
if (!html) { if (box) box.remove(); return; }
if (!box) {
box = document.createElement('section');
box.className = 'edux-resume';
var hero = document.querySelector('edux-hero');
if (hero) hero.after(box); else grid.before(box);
}
box.setAttribute('aria-label', T('resume.label'));
box.innerHTML = html;
}
function levelState(cards, list) {
var last = lastSeen(list), here = null, i;
if (last) for (i = 0; i < cards.length; i++) if (cards[i].dir === last.dir) { here = cards[i]; break; }
return cards.map(function (c, k) {
var mine = list ? list.filter(function (x) { return x.dir === c.dir; }) : [];
var done = mine.filter(function (x) { return x.rec.done; }).length;
var all = !!(c.total && done >= c.total);
return { href: c.href, total: c.total, done: done,
mark: all ? 'done' : mine.length ? 'started' : '',
label: !mine.length ? '' : all ? T('mark.all')
: done ? (c.total ? T('mark.n_of', { n: done, total: c.total }) : T('mark.n', { n: done })) : T('mark.started'),
pct: c.total ? Math.min(100, Math.round(done / c.total * 100)) : null,
here: here ? (c === here ? 'here' : '') : (k === 0 ? 'start' : '') };
});
}
function progressMarks() {
document.querySelectorAll('[data-edux-marks]').forEach(markChapterLinks);
var grid = document.querySelector('edux-level-grid');
if (!grid) return;
var cards = levelCards(grid);
var list = seenWho() && cards.length
? seenUnder(seenAll(), cards.map(function (c) { return c.dir; })) : null;
markLevelCards(cards, list);
markHere(grid, cards, list);
mountResume(grid, cards, list);
window.EDUXLevelState = levelState(cards, list);
try { document.dispatchEvent(new CustomEvent('edux:levels', { detail: window.EDUXLevelState })); } catch (e) {}
}
ready(progressMarks);
window.addEventListener('pageshow', function (e) { if (e.persisted) try { progressMarks(); } catch (x) {} });
window.addEventListener('storage', function (e) {
if (/:seen$/.test(e.key || '')) try { progressMarks(); } catch (x) {}
});
window.EDUXBench = {
still: !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches),
run: function (fn) {
ready(function () {
document.querySelectorAll('[data-edux-bench]').forEach(function (root) {
if (root._eduxBench) return;
var b = root._eduxBench = { paused: EDUXBench.still, seen: true };
var btn = document.createElement('button');
btn.type = 'button'; btn.className = 'edux-bench__pause';
function paint() {
root.classList.toggle('is-paused', b.paused);
btn.setAttribute('aria-label', T(b.paused ? 'bench.play' : 'bench.pause'));
}
btn.addEventListener('click', function () { b.paused = !b.paused; paint(); });
root.appendChild(btn); paint();
if (window.IntersectionObserver) new IntersectionObserver(function (es) {
es.forEach(function (e) { b.seen = e.isIntersecting; });
}).observe(root);
fn(root, {
still: b.paused,
every: function (ms, f) {
setInterval(function () { if (!b.paused && b.seen && !document.hidden) f(); }, ms);
}
});
});
});
}
};
function mountBadge() {
applyAuthState();
var pfx = acctPrefix();
var href = document.documentElement.getAttribute('data-edux-login');
if (!pfx || !href || document.querySelector('.edux-badge')) return;
var host = document.querySelector('[data-edux-badge-slot]')
|| document.querySelector('.app-header__lead')
|| document.querySelector('.app-header__inner')
|| document.querySelector('.app-header .brandbar')
|| document.querySelector('.app-header')
|| document.querySelector('.assess-header-inner');
if (!host) return;
var wrap = document.createElement('div');
wrap.innerHTML = badgeHtml(href, pfx + 'currentUser', pfx + 'users');
var badge = wrap.firstChild;
host.appendChild(badge);
bindLogout(badge);
}
ready(mountBadge);
var G_KEY = 'edux:guard', G_TRASH = 'edux:guard:trash', G_OPEN = 'edux:guard:open';
var G_IDLE = 30 * 60000, G_TRIES = 5, G_WAIT = 60000, G_KEEP = 7 * 864e5, G_WORD = 'RESET';
var G_MASTER = '1004';
function gGet(k, fb) {
try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? fb : v; } catch (e) { return fb; }
}
function gPut(k, v) {
try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; }
}
function gHasPin() { var r = gGet(G_KEY, null); return !!(r && r.hash); }
function gOpen() {
var t = 0;
try { t = +sessionStorage.getItem(G_OPEN) || 0; } catch (e) {}
return !!t && Date.now() - t < G_IDLE && gHasPin();
}
var _gTick = 0;
function gFlag() {
var on = gOpen(), h = document.documentElement;
if (on) h.setAttribute('data-edux-admin-open', ''); else h.removeAttribute('data-edux-admin-open');
if (on && !_gTick) _gTick = setInterval(function () { if (!gFlag()) { clearInterval(_gTick); _gTick = 0; } }, 30000);
return on;
}
(function () {
var G_CSS = '.eg-dlg{margin:auto;border:0;padding:0;border-radius:20px;width:min(30rem,calc(100vw - 32px));max-height:calc(100dvh - 32px);background:#fff;color:var(--color-ink,#1f2937);box-shadow:0 18px 48px rgb(20 20 50 / .28);font-family:inherit}' +
'.eg-dlg::backdrop{background:rgb(15 15 35 / .55)}.eg-dlg__in{padding:22px 20px 20px;display:grid;gap:16px}' +
'.eg-form{display:grid;gap:8px}' +
'.eg-title{font-size:var(--text-lg,1.125rem);font-weight:var(--w-xbold,800);line-height:1.25;margin:0;color:var(--color-ink,#1f2937)}' +
'.eg-title:focus{outline:none}' +
'.eg-title:focus-visible{outline:3px solid var(--_accent,#6d28d9);outline-offset:3px;border-radius:4px}' +
'.eg-sub{font-size:var(--text-sm,.875rem);color:var(--color-muted,#5b6472);margin:0;line-height:1.5}' +
'.eg-pre{white-space:pre-line}' +
'.eg-warn{margin:2px 0;padding:10px 12px;border-radius:12px;font-size:var(--text-sm,.875rem);font-weight:var(--w-bold,700);line-height:1.45;color:#7c2d12;background:#fff7ed;border:1px solid #fdba74}' +
'.eg-field{font-size:var(--text-sm,.875rem);font-weight:var(--w-semi,600);margin-top:6px;color:var(--color-ink,#1f2937)}' +
'.eg-in{width:100%;min-height:44px;box-sizing:border-box;border:2px solid var(--color-hairline,#e5e7eb);border-radius:12px;padding:8px 12px;font-size:var(--text-lg,1.125rem);font-family:inherit;letter-spacing:.2em;background:#fff;color:var(--color-ink,#1f2937)}' +
'.eg-in[data-word]{letter-spacing:.08em;text-transform:uppercase}' +
'.eg-in:focus{border-color:var(--_accent,#6d28d9);outline:3px solid var(--_accent-deep,#4c1d95);outline-offset:2px}' +   /* solid ring — the 35% tint read 1.3:1 (check_keyboard) */
'.eg-msg{min-height:1.3em;margin:0;font-size:var(--text-sm,.875rem);font-weight:var(--w-semi,600);color:#b91c1c}' +
'.eg-acts{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:4px}' +
'.eg-btn2{min-height:44px;padding:8px 18px;border-radius:var(--radius-pill,999px);border:2px solid var(--color-hairline,#e5e7eb);background:#fff;color:var(--color-ink,#1f2937);font:inherit;font-size:var(--text-sm,.875rem);font-weight:var(--w-bold,700);cursor:pointer}' +
'.eg-btn2:hover{border-color:var(--color-muted,#5b6472)}.btn.eg-danger{background:#b91c1c}' +
'.btn.eg-danger:disabled,.eg-go:disabled{opacity:.45;cursor:not-allowed;transform:none;box-shadow:none}' +
'.eg-link{display:inline-flex;align-items:center;min-height:44px;padding:0 4px;border:0;background:none;font:inherit;font-size:var(--text-sm,.875rem);color:var(--_accent-ink,#4c1d95);text-decoration:underline;text-underline-offset:3px;cursor:pointer;justify-self:start}' +
'.eg-entry{text-align:center;margin:6px 0 0}' +
'.eg-entry .eg-link{font-size:var(--text-xs,.8125rem);color:var(--color-muted,#5b6472)}' +
'.eg-opt{display:grid;gap:8px;padding:14px;border:1px solid var(--color-hairline,#e5e7eb);border-radius:14px}' +
'.eg-opt__h{margin:0;font-size:var(--text-md,1rem);font-weight:var(--w-bold,700)}' +
'.eg-or{text-align:center;margin:0;font-size:var(--text-xs,.8125rem);text-transform:uppercase;letter-spacing:.1em;color:var(--color-muted,#5b6472)}' +
'.eg-gate{max-width:30rem}' +
'.eg-bar{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 12px;margin-bottom:12px;padding:8px 12px;border-radius:14px;background:var(--_accent-soft,#f3e8ff);font-size:var(--text-sm,.875rem)}' +
'.eg-bar p{margin:0;flex:1 1 14rem}' +
'.eg-promo{display:grid;gap:10px;padding:16px 18px;margin:0 0 16px;border-radius:16px;color:#0f172a;background:linear-gradient(135deg,#eef2ff,#f0fdfa);border:1px solid #c7d2fe}' +
'.eg-dlg .eg-promo,.eg-gate + .eg-promo{margin:0}.eg-gate + .eg-promo{margin-top:16px;max-width:30rem}' +
'.eg-promo__t{margin:0;font-size:var(--text-md,1rem);font-weight:var(--w-xbold,800)}' +
'.eg-promo__list{margin:0;padding:0;list-style:none;display:grid;gap:6px;font-size:var(--text-sm,.875rem);line-height:1.45}' +
'.eg-promo__list li{position:relative;padding-left:1.6em}' +
'.eg-promo__list li::before{content:\'\u2713\';position:absolute;left:0;top:0;font-weight:var(--w-black,900);color:#047857}' +
'.btn.eg-promo__go{justify-self:start;background:#3730a3;color:#fff;text-decoration:none}' +
'.eg-guide{margin:0 0 var(--space-section,32px)}';
var n = ':not([data-edux-admin-open]) ', st = document.createElement('style');
st.setAttribute('data-edux-guard', '');
st.textContent = ['a[href$="teacher.html"]', 'a[href$="/teacher"]', '[data-edux-admin-link]',
'li:has(>a[href$="teacher.html"]:only-child)'].map(function (x) { return 'html' + n + x; }).join(',') +
'{display:none!important}' + G_CSS;
(document.head || document.documentElement).appendChild(st);
})();
function gTouch() { try { sessionStorage.setItem(G_OPEN, String(Date.now())); } catch (e) {} gFlag(); }
function gLock() { try { sessionStorage.removeItem(G_OPEN); } catch (e) {} gFlag(); }
gFlag();
var _gSeen = 0;
['pointerdown', 'keydown'].forEach(function (ev) {
addEventListener(ev, function () { if (Date.now() - _gSeen > 20000 && gOpen()) { _gSeen = Date.now(); gTouch(); } }, true);
});
function gHex(a) {
return Array.prototype.map.call(a, function (x) { return (x < 16 ? '0' : '') + x.toString(16); }).join('');
}
function gSha(s) {
var c = window.crypto, b = unescape(encodeURIComponent(s));
if (c && c.subtle && window.TextEncoder) {
return c.subtle.digest('SHA-256', new TextEncoder().encode(s))
.then(function (d) { return gHex(new Uint8Array(d)); }, function () { return gShaJs(b); });
}
return Promise.resolve(gShaJs(b));
}
function gShaJs(m) {
function rr(v, n) { return (v >>> n) | (v << (32 - n)); }
var W = 4294967296, H = [], K = [], seen = {}, n = 0, i, j, w = [], len = m.length * 8;
for (var c = 2; n < 64; c++) {
if (seen[c]) continue;
for (i = 0; i < 313; i += c) seen[i] = c;
H[n] = (Math.pow(c, 0.5) * W) | 0; K[n++] = (Math.pow(c, 1 / 3) * W) | 0;
}
H = H.slice(0, 8);
m += '\x80';
while (m.length % 64 - 56) m += '\x00';
for (i = 0; i < m.length; i++) w[i >> 2] |= m.charCodeAt(i) << ((3 - i) % 4) * 8;
w.push((len / W) | 0, len);
for (j = 0; j < w.length;) {
var x = w.slice(j, j += 16), o = H;
H = H.slice(0, 8);
for (i = 0; i < 64; i++) {
var a15 = x[i - 15], a2 = x[i - 2], a = H[0], e = H[4];
var t1 = H[7] + (rr(e, 6) ^ rr(e, 11) ^ rr(e, 25)) + ((e & H[5]) ^ (~e & H[6])) + K[i] +
(x[i] = i < 16 ? x[i] : (x[i - 16] + (rr(a15, 7) ^ rr(a15, 18) ^ (a15 >>> 3)) + x[i - 7] +
(rr(a2, 17) ^ rr(a2, 19) ^ (a2 >>> 10))) | 0);
var t2 = (rr(a, 2) ^ rr(a, 13) ^ rr(a, 22)) + ((a & H[1]) ^ (a & H[2]) ^ (H[1] & H[2]));
H = [(t1 + t2) | 0].concat(H);
H[4] = (H[4] + t1) | 0;
}
for (i = 0; i < 8; i++) H[i] = (H[i] + o[i]) | 0;
}
var out = [];
for (i = 0; i < 8; i++) for (j = 3; j >= 0; j--) out.push((H[i] >> (j * 8)) & 255);
return gHex(out);
}
function gSetPin(pin) {
var s = new Uint8Array(16);
try { crypto.getRandomValues(s); } catch (e) { for (var i = 0; i < 16; i++) s[i] = Math.random() * 256; }
var salt = gHex(s);
return gSha(salt + ':' + pin).then(function (h) {
var ok = gPut(G_KEY, { v: 1, salt: salt, hash: h, at: new Date().toISOString(), fails: 0, until: 0 });
if (ok) gTouch();
return ok;
});
}
function gCheck(pin) {
var r = gGet(G_KEY, null);
if (!r || !r.hash) return Promise.resolve({ ok: false });
if (pin === G_MASTER) { r.fails = 0; r.until = 0; gPut(G_KEY, r); gTouch(); return Promise.resolve({ ok: true }); }
if (r.until > Date.now()) return Promise.resolve({ wait: Math.ceil((r.until - Date.now()) / 1000) });
return gSha(r.salt + ':' + pin).then(function (h) {
r = gGet(G_KEY, r);
if (h === r.hash) { r.fails = 0; r.until = 0; gPut(G_KEY, r); gTouch(); return { ok: true }; }
r.fails = (r.fails || 0) + 1;
if (r.fails >= G_TRIES) { r.fails = 0; r.until = Date.now() + G_WAIT; }
gPut(G_KEY, r);
return r.until > Date.now() ? { wait: G_WAIT / 1000 } : { ok: false };
});
}
var _gSeq = 0;
// The online class-center promo was removed; this site runs fully offline.
function promoHtml() { return ''; }
function gFormHtml(kind, o) {
var id = 'eg' + (++_gSeq), set = kind === 'set';
function pin(n, k) {
return '<label class="eg-field" for="' + id + n + '">' + TH(k) + '</label>' +
'<input class="eg-in" id="' + id + n + '" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="4"' +
' autocomplete="off" data-pin="' + n + '">';
}
return '<form class="eg-form" novalidate data-edux-guard>' +
'<h2 class="eg-title" id="' + id + 't" tabindex="-1">' +
(o.title ? esc(o.title) : TH(set ? 'guard.setup_title' : 'guard.gate_title')) + '</h2>' +
(set ? '<p class="eg-warn">' + TH('guard.setup_warn') + '</p>' : '') +
'<p class="eg-sub">' + (o.sub ? esc(o.sub) : TH(set ? 'guard.setup_sub' : 'guard.gate_sub')) + '</p>' +
pin('a', set ? 'guard.new_pin' : 'guard.pin') + (set ? pin('b', 'guard.pin_again') : '') +
'<p class="eg-msg" role="alert" data-eg-msg></p>' +
'<div class="eg-acts"><button type="submit" class="btn eg-go">' +
(o.go ? esc(o.go) : TH(set ? 'guard.setup_go' : 'guard.open')) + '</button>' +
(o.cancel ? '<button type="button" class="eg-btn2" data-cancel>' + TH('guard.cancel') + '</button>' : '') +
'</div>' +
(set ? '' : '<button type="button" class="eg-link" data-forgot>' + TH('guard.forgot') + '</button>' +
'<button type="button" class="eg-btn2" data-edux-es-signin disabled hidden>' + TH('guard.es_signin') + '</button>') +
'</form>';
}
function gWire(box, kind, done, forgot) {
var f = box.querySelector('.eg-form'), msg = f.querySelector('[data-eg-msg]'), go = f.querySelector('.eg-go');
var a = f.querySelector('[data-pin="a"]'), b = f.querySelector('[data-pin="b"]'), tick = 0;
function say(k, v) { msg.textContent = k ? T(k, v) : ''; }
function wait(s) {
go.disabled = true; clearInterval(tick); say('guard.wait', { s: s });
tick = setInterval(function () {
if (--s > 0 && f.isConnected) return say('guard.wait', { s: s });
clearInterval(tick); go.disabled = false; say('');
if (f.isConnected) a.focus();
}, 1000);
}
f.addEventListener('submit', function (e) {
e.preventDefault();
var p = a.value.trim();
if (kind === 'set') {
if (!/^\d{4}$/.test(p)) { say('guard.pin_short'); a.focus(); return; }
if (p !== b.value.trim()) { say('guard.pin_mismatch'); b.value = ''; b.focus(); return; }
go.disabled = true;
gSetPin(p).then(function (ok) { go.disabled = false; if (ok) done(true); else say('guard.no_save'); });
return;
}
if (!p) { a.focus(); return; }
go.disabled = true;
gCheck(p).then(function (r) {
go.disabled = false;
if (r.ok) return done(true);
a.value = '';
if (r.wait) return wait(r.wait);
say('guard.wrong'); a.focus();
});
});
var x = f.querySelector('[data-forgot]');
if (x) x.addEventListener('click', forgot || function () { gForgot(); });
x = f.querySelector('[data-cancel]');
if (x) x.addEventListener('click', function () { done(false); });
var r = kind === 'ask' && gGet(G_KEY, null);
if (r && r.until > Date.now()) wait(Math.ceil((r.until - Date.now()) / 1000));
}
function gModal(html, init, back) {
back = back || document.activeElement;
var d = document.createElement('dialog');
d.className = 'eg-dlg';
d.setAttribute('data-edux-guard', '');
d.innerHTML = '<div class="eg-dlg__in">' + html + '</div>';
document.body.appendChild(d);
var t = d.querySelector('.eg-title');
if (t) d.setAttribute('aria-labelledby', t.id);
d.addEventListener('close', function () {
if (d.parentNode) d.parentNode.removeChild(d);
if (back && back.isConnected && back.focus && !document.querySelector('dialog.eg-dlg[open]')) back.focus();
});
if (d.showModal) d.showModal(); else d.setAttribute('open', '');
init(d, function () { d.close(); });
(d.querySelector('[data-eg-first]') || d.querySelector('.eg-in') || d.querySelector('.eg-title') || d).focus();
return d;
}
function gDialog(html, wire, back) {
return new Promise(function (res) {
var done = false;
gModal(html, function (d, close) {
function end(ok) { if (done) return; done = true; close(); res(ok); }
d.addEventListener('close', function () { end(false); });
wire(d, end);
}, back);
});
}
function gAsk(o) {
o = o || {};
var back = document.activeElement;
return gDialog(gFormHtml('ask', { title: o.title, sub: o.sub, go: o.go, cancel: true }), function (d, end) {
gWire(d, 'ask', end, function () { end(false); gForgot(back); });
}, back);
}
function gSetup() {
return gDialog(gFormHtml('set', { cancel: true }) + promoHtml(), function (d, end) { gWire(d, 'set', end); });
}
function gConfirm(title, body, go) {
var id = 'eg' + (++_gSeq);
return gDialog('<div class="eg-form"><h2 class="eg-title" id="' + id + 't" tabindex="-1" data-eg-first>' + esc(title) + '</h2>' +
'<p class="eg-sub eg-pre">' + esc(body) + '</p><div class="eg-acts">' +
'<button type="button" class="btn eg-danger" data-ok>' + esc(go) + '</button>' +
'<button type="button" class="eg-btn2" data-cancel>' + TH('guard.cancel') + '</button></div></div>', function (d, end) {
d.querySelector('[data-ok]').addEventListener('click', function () { end(true); });
d.querySelector('[data-cancel]').addEventListener('click', function () { end(false); });
});
}
function gRequire() { return gOpen() ? Promise.resolve(true) : gHasPin() ? gAsk() : gSetup(); }
function gForgot(back) {
var id = 'eg' + (++_gSeq);
gDialog('<div class="eg-form">' +
'<h2 class="eg-title" id="' + id + 't" tabindex="-1" data-eg-first>' + TH('guard.forgot_title') + '</h2>' +
'<p class="eg-sub">' + TH('guard.forgot_sub') + '</p>' +
'<section class="eg-opt"><h3 class="eg-opt__h">' + TH('guard.reset_h') + '</h3>' +
'<p class="eg-warn">' + TH('guard.reset_sub') + '</p>' +
'<label class="eg-field" for="' + id + 'r">' + TH('guard.reset_type', { word: G_WORD }) + '</label>' +
'<input class="eg-in" id="' + id + 'r" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false" data-word>' +
'<div class="eg-acts"><button type="button" class="btn eg-danger" data-wipe disabled>' + TH('guard.reset_go') + '</button>' +
'<button type="button" class="eg-btn2" data-cancel>' + TH('guard.cancel') + '</button></div></section>' +
'</div>', function (d, end) {
var w = d.querySelector('[data-word]'), b = d.querySelector('[data-wipe]');
w.addEventListener('input', function () { b.disabled = w.value.trim().toUpperCase() !== G_WORD; });
b.addEventListener('click', function () {
if (b.disabled) return;
b.disabled = true;
gWipe().then(function () { location.reload(); });
});
d.querySelector('[data-cancel]').addEventListener('click', function () { end(false); });
}, back);
}
function gWipe() {
return clearPages(true).catch(function () {}).then(function () {
try { localStorage.clear(); } catch (e) {}
try { sessionStorage.clear(); } catch (e) {}
try {
if (window.indexedDB && indexedDB.databases) {
indexedDB.databases().then(function (dbs) {
(dbs || []).forEach(function (d) { if (d.name) indexedDB.deleteDatabase(d.name); });
});
}
} catch (e) {}
gFlag();
});
}
function clearPages(all) {
try {
Object.keys(localStorage).forEach(function (k) {
if (k.indexOf('edux:offline:') === 0) localStorage.removeItem(k);
});
} catch (e) {}
if (!('caches' in window)) return Promise.resolve(0);
return (all ? caches.keys() : shellCaches()).then(function (ks) {
return Promise.all(ks.map(function (k) { return caches.delete(k); }))
.then(function () { return ks.length; });
});
}
function gTrash() {
var all = gGet(G_TRASH, []), now = Date.now();
if (!Array.isArray(all)) all = [];
var keep = all.filter(function (x) { return x && x.user && now - x.at < G_KEEP; });
if (keep.length !== all.length) gTrashSave(keep);
return keep;
}
function gTrashSave(list) {
if (list.length) return gPut(G_TRASH, list);
try { localStorage.removeItem(G_TRASH); } catch (e) {}
return true;
}
try { if (localStorage.getItem(G_TRASH)) gTrash(); } catch (e) {}
function gToTrash(prefix, id) {
var a = window.EDUXAuth.create({ prefix: prefix, idFallback: 'student-' });
var u = a.getUsers().filter(function (x) { return x.id === id; })[0];
if (!u) return null;
var p = prefix + id + ':', data = {};
try {
if (localStorage.getItem(p + 'users') === null) {
for (var i = 0; i < localStorage.length; i++) {
var k = localStorage.key(i);
if (k && k.indexOf(p) === 0) data[k.slice(p.length)] = localStorage.getItem(k);
}
}
} catch (e) {}
var list = gTrash();
list.push({ prefix: prefix, user: u, data: data, at: Date.now() });
if (!gTrashSave(list)) return null;
a.removeUser(id, { purge: true });
return u;
}
function gRestore(at) {
var list = gTrash(), x = list[at];
if (!x) return null;
var a = window.EDUXAuth.create({ prefix: x.prefix, idFallback: 'student-' }), users = a.getUsers(), u = x.user;
if (users.some(function (v) { return v.id === u.id; })) u.id = a.uniqueId(u.name || u.id);
u.name = uniquifyName(u.name || u.id, users);
try {
Object.keys(x.data || {}).forEach(function (k) { localStorage.setItem(x.prefix + u.id + ':' + k, x.data[k]); });
} catch (e) { return null; }
users.push(u);
a.setUsers(users);
list.splice(at, 1);
gTrashSave(list);
return u;
}
function gAdminHref() {
var h = document.documentElement, x = h.getAttribute('data-edux-admin');
if (x) return x;
x = document.querySelector('a[href$="teacher.html"],[data-edux-admin-link][href]');
if (x) return x.getAttribute('href');
try { return new URL('teacher.html', new URL(h.getAttribute('data-edux-login') || location.href, location.href)).href; }
catch (e) { return 'teacher.html'; }
}
function adminRosters(only) {
var out = [];
try {
Object.keys(localStorage).forEach(function (k) {
if (k.slice(-6) !== ':users') return;
var list;
try { list = JSON.parse(localStorage.getItem(k)); } catch (e) { return; }
if (!Array.isArray(list)) return;
var pfx = k.slice(0, -5);
if (only && pfx !== only) return;
out.push({ prefix: pfx, auth: window.EDUXAuth.create({ prefix: pfx, idFallback: 'student-' }) });
});
} catch (e) {}
return out.sort(function (a, b) { return a.prefix < b.prefix ? -1 : 1; });
}
function adminScopeLabels(el) {
try {
var m = JSON.parse(el.getAttribute('scope-labels') || '{}');
return (m && typeof m === 'object') ? m : {};
} catch (e) { return {}; }
}
function adminWhere(json, prefix, id) {
var labels;
try { labels = JSON.parse(json || 'null'); } catch (e) { labels = null; }
if (!labels || typeof labels !== 'object') return '';
var seen;
try { seen = JSON.parse(localStorage.getItem(prefix + id + ':seen') || '{}') || {}; } catch (e) { return ''; }
var best = '', bt = -1;
Object.keys(seen).forEach(function (p) {
var t = (seen[p] && seen[p].t) || 0;
if (t > bt) { bt = t; best = p; }
});
if (!best) return '';
var segs = best.split('/'), lbl = '';
for (var i = 0; i < segs.length && !lbl; i++) if (typeof labels[segs[i]] === 'string') lbl = labels[segs[i]];
var m = /_ch(\d+)(_assessment)?(?:\.html)?$/.exec(best);
if (lbl) return lbl + (m ? ' ch' + m[1] + (m[2] ? ' check-up' : '') : '');
return String((seen[best] && seen[best].ttl) || '');
}
function adminStorage() {
var keys = 0, bytes = 0;
try {
Object.keys(localStorage).forEach(function (k) {
keys++; bytes += (localStorage.getItem(k) || '').length + k.length;
});
} catch (e) {}
return { keys: keys, kb: Math.max(1, Math.round(bytes / 1024)), pages: _admCacheCount };
}
var _admCacheCount = 0;
function renderAdmin(el) {
var _note = '';
var _open = false;
function paint() {
_open = gFlag();
if (!_open) return paintGate();
var rosters = adminRosters(attr(el, 'roster'));
var whereJson = attr(el, 'where-labels');
var many = rosters.length > 1;
var labels = adminScopeLabels(el);
var total = 0;
var rows = rosters.map(function (r) {
var cur = r.auth.getCurrentUserId();
var lbl = typeof labels[r.prefix] === 'string' ? labels[r.prefix] : '';
return r.auth.getUsers().slice().sort(function (x, y) {
return String(y.lastSeen || '').localeCompare(String(x.lastSeen || ''));
}).map(function (u) {
total++;
var seen = esc(dayOf(u.lastSeen) || '—');
var where = adminWhere(whereJson, r.prefix, u.id);
return '<tr' + (u.id === cur ? ' class="is-current"' : '') + '>' +
'<td class="adm__who"><span class="adm__name">' + esc(u.name || u.id) + '</span>' +
(u.id === cur ? ' <span class="adm__now">' + TH('admin.now') + '</span>' : '') +
'<span class="adm__meta">' +
(many ? (lbl ? '<span class="adm__where">' + esc(lbl) + '</span>'
: '<span class="adm__where adm__where--raw">' + esc(r.prefix) + '</span>') : '') +
(where ? '<span class="adm__where">' + TH('admin.now_at', { where: where }) + '</span>' : '') +
'<span class="adm__seen-sub">' + TH('admin.last_seen') + ' <span class="adm__date">' + seen + '</span></span>' +
'</span></td>' +
'<td class="adm__seen">' + seen + '</td>' +
'<td><button type="button" class="btn-outline adm__del" data-id="' + esc(u.id) +
'" data-pfx="' + esc(r.prefix) + '">' + TH('admin.delete') + '</button></td>' +
'</tr>';
}).join('');
}).join('');
var users = { length: total };
var trash = gTrash().map(function (x, i) { return { x: x, i: i }; }).reverse();
var trashRows = trash.map(function (t) {
var u = t.x.user;
return '<tr><td class="adm__who"><span class="adm__name">' + esc(u.name || u.id) + '</span>' +
'<span class="adm__meta"><span>' + TH('admin.trash_until', { date: dayOf(new Date(t.x.at + G_KEEP).toISOString()) }) +
'</span></span></td><td><button type="button" class="btn-outline adm__restore" data-at="' + t.i + '">' +
TH('admin.restore') + '</button></td></tr>';
}).join('');
var st = adminStorage();
var keep = admFocusKey();
el.innerHTML =
'<div class="prog-dash adm">' +
'<div class="eg-bar" data-edux-guard><p>' + TH('guard.on') + '</p>' +
'<button type="button" class="btn-outline" data-lock>' + TH('guard.lock') + '</button></div>' +
promoHtml() +
'<section class="card">' +
'<div class="sec-h" tabindex="-1" data-roster-h>' + TH('admin.roster') + '</div>' +
(users.length
? '<table class="adm__tbl"><thead><tr><th>' + TH('admin.name') + '</th><th class="adm__seen">' + TH('admin.last_seen') +
'</th><th></th></tr></thead>' +
'<tbody>' + rows + '</tbody></table>'
: '<p class="sec-sub">' + TH('admin.nobody') + '</p>') +
'<p class="sec-sub">' + THR('admin.del_trash', null, 'b') + '</p>' +
'</section>' +
'<section class="card">' +
'<div class="sec-h" tabindex="-1" data-trash-h>' + TH('admin.trash') + '</div>' +
(trashRows ? '<table class="adm__tbl adm__trash"><tbody>' + trashRows + '</tbody></table>'
: '<p class="sec-sub">' + TH('admin.trash_none') + '</p>') +
'</section>' +
'<section class="card">' +
'<div class="sec-h">' + TH('admin.saved') + '</div>' +
'<p class="sec-sub">' + TH('admin.saved_sub', { pages: st.pages, keys: st.keys, kb: st.kb }) + '</p>' +
'<div class="asub__acts">' +
'<button type="button" class="btn-outline" data-cache>' + TH('admin.clear') + '</button>' +
'<button type="button" class="btn-outline adm__danger" data-reset>' +
TH('admin.erase') + '</button>' +
'</div>' +
'<p class="adm__msg" data-msg>' + esc(_note) + '</p>' +
'</section>' +
'</div>';
wire();
admFocusRestore(keep);
}
function paintGate() {
var set = !gHasPin(), hh = document.querySelector('edux-header[home-href]');
el.innerHTML =
'<div class="prog-dash adm">' +
'<section class="card eg-gate">' + gFormHtml(set ? 'set' : 'ask', {}) +
(set ? '' : '<a class="eg-link" href="' + esc(hh ? hh.getAttribute('home-href') : './') + '">' + TH('guard.student_back') + '</a>') +
'<p class="adm__msg" data-msg>' + esc(_note) + '</p>' +
'</section>' +
promoHtml() +
'</div>';
gWire(el, set ? 'set' : 'ask', function (ok) {
if (!ok) return;
_note = '';
paint();
var h = el.querySelector('[data-roster-h]');
if (h) h.focus();
});
}
function admFocusKey() {
var a = document.activeElement;
if (!a || !el.contains(a)) return null;
return { i: [].indexOf.call(el.querySelectorAll('.adm__del'), a),
sel: a.hasAttribute('data-cache') ? '[data-cache]'
: a.hasAttribute('data-reset') ? '[data-reset]' : '[data-roster-h]' };
}
function admFocusRestore(k) {
if (!k) return;
var d = el.querySelectorAll('.adm__del');
(d[k.i] || d[k.i - 1] || el.querySelector(k.sel)).focus();
}
function wire() {
el.querySelectorAll('.adm__del').forEach(function (b, i) {
b.onclick = function () {
var pfx = b.getAttribute('data-pfx'), id = b.getAttribute('data-id');
var a = window.EDUXAuth.create({ prefix: pfx, idFallback: 'student-' });
var u = a.getUsers().filter(function (x) { return x.id === id; })[0], name = (u && u.name) || id;
gAsk({ title: T('guard.del_title', { name: name }), sub: T('guard.del_sub'), go: T('guard.del_go') }).then(function (ok) {
if (!ok) return;
var gone = gToTrash(pfx, id);
say(gone ? T('admin.trashed', { name: name }) : T('guard.no_save'));
var d = el.querySelectorAll('.adm__del');
(d[i] || d[i - 1] || el.querySelector('[data-roster-h]')).focus();
});
};
});
el.querySelectorAll('.adm__restore').forEach(function (b) {
b.onclick = function () {
var u = gRestore(+b.getAttribute('data-at'));
say(u ? T('admin.restored', { name: u.name || u.id }) : T('guard.no_save'));
var h = el.querySelector('.adm__restore') || el.querySelector('[data-trash-h]');
if (h) h.focus();
};
});
var lk = el.querySelector('[data-lock]');
if (lk) lk.onclick = function () { gLock(); _note = ''; paint(); };
function say(t) { _note = t; paint(); }
var c = el.querySelector('[data-cache]');
if (c) c.onclick = function () {
clearPages(false).then(function (n) {
_admCacheCount = 0;
say(n ? T('admin.cleared', { n: n }) : T('admin.cleared_none'));
});
};
var r = el.querySelector('[data-reset]');
if (r) r.onclick = function () {
gConfirm(T('admin.erase'), T('admin.erase_confirm'), T('admin.erase')).then(function (ok) {
if (!ok) return;
gWipe().then(function () {
_admCacheCount = 0;
say(T('admin.erased'));
});
});
};
}
paint();
if (!el._admRemoved) {
el._admRemoved = true;
document.addEventListener('edux:user-removed', function () { if (el.isConnected && _open) paint(); });
setInterval(function () { if (el.isConnected && _open && !gOpen()) paint(); }, 15000);
}
if ('caches' in window) {
shellCaches().then(function (ks) {
if (ks.length !== _admCacheCount) { _admCacheCount = ks.length; if (_open) paint(); }
}).catch(function () {});
}
}
function shellCaches() {
return swInfo().then(function (info) { return info ? info.own : []; });
}
function renderLogin(el) {
var a = acct();
if (!a) { el.innerHTML = ''; return; }
var dest = attr(el, 'redirect') || location.href;
var pick = attr(el, 'pick') === 'animals';
var users = a.getUsers().slice().sort(function (x, y) {
return String(y.lastSeen || '').localeCompare(String(x.lastSeen || ''));
});
var list = users.map(function (u) {
return '<button type="button" class="acct-btn" data-id="' + esc(u.id) + '">' +
'<span>' + faceOf(u) + ' ' + esc(u.name || u.id) + '</span>' +
'<span class="seen">' + esc(dayOf(u.lastSeen)) + '</span></button>';
}).join('');
var grid = pick ? '<div class="login-pick" role="group"' + TQ('aria-label', 'login.pick') + '>' +
AVATARS.map(function (v) {
return '<button type="button" class="login-pick__btn" aria-pressed="false" data-avatar="' + v[0] + '">' +
'<span class="login-pick__face" aria-hidden="true">' + v[1] + '</span>' +
'<span class="login-pick__word">' + TH(v[2]) + '</span></button>';
}).join('') + '</div>' : '';
el.innerHTML =
'<div class="prog-dash"><div class="login-screen"><div class="login-card">' +
'<p class="login-icon">👋</p>' +
'<p class="login-title">' + TH('login.title') + '</p>' +
'<p class="login-sub">' + TH(pick ? 'login.pick_sub' : 'login.sub') + '</p>' +
(users.length ? '<p class="acct-label">' + TH('login.continue') + '</p><div class="acct-list">' + list + '</div>' : '') +
'<div class="login-ext" data-edux-login-ext data-prefix="' + esc(acctPrefix()) + '" data-dest="' + esc(dest) + '" hidden></div>' +
'<p class="acct-label new">' + TH(pick ? (users.length ? 'login.pick_add' : 'login.pick')
: (users.length ? 'login.add' : 'login.first')) + '</p>' +
grid +
'<div class="login-row">' +
'<input class="input-field" type="text"' + TQ('placeholder', pick ? 'login.name_opt' : 'login.placeholder') +
TQ('aria-label', pick ? 'login.name_opt' : 'login.input') + '>' +
'<button type="button" class="btn" data-new>' + TH('login.go') + '</button>' +
'</div>' +
'<p class="login-note">' + TH('note.local') + '</p>' +
'<p class="eg-entry" data-edux-guard><button type="button" class="eg-link" data-edux-teacher>' +
TH('login.teacher') + '</button></p>' +
'</div></div></div>';
function go() { location.href = dest; }
el.querySelector('[data-edux-teacher]').addEventListener('click', function () {
gRequire().then(function (ok) { if (ok) location.href = gAdminHref(); });
});
el.querySelectorAll('.acct-btn').forEach(function (b) {
b.addEventListener('click', function () { a.loginById(b.getAttribute('data-id')); go(); });
});
var input = el.querySelector('.input-field'), chosen = '';
var picks = [].slice.call(el.querySelectorAll('.login-pick__btn'));
picks.forEach(function (b) {
b.addEventListener('click', function () {
chosen = b.getAttribute('data-avatar');
picks.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
});
});
function animalName(av) {
var base = av, n, k = 2;
for (var i = 0; i < AVATARS.length; i++) if (AVATARS[i][0] === av) base = T(AVATARS[i][2]);
n = base;
var taken = users.map(function (u) { return u.name; });
while (taken.indexOf(n) !== -1) n = base + ' ' + k++;
return n;
}
function add() {
var n = (input.value || '').trim();
if (!n && !chosen) { (picks[0] || input).focus(); return; }
var rec = a.registerDistinct(n || animalName(chosen));
if (chosen && rec) {
var all = a.getUsers();
for (var i = 0; i < all.length; i++) if (all[i].id === rec.id) { all[i].avatar = chosen; break; }
a.setUsers(all);
}
go();
}
el.querySelector('[data-new]').addEventListener('click', add);
input.addEventListener('keydown', function (e) { if (e.key === 'Enter') add(); });
}
function revealStep(s) {
for (var c = s && s.parentElement; c && c !== document.body; c = c.parentElement) {
var o = getComputedStyle(c), b = c.getBoundingClientRect(), r = s.getBoundingClientRect(),
x = c.scrollWidth > c.clientWidth && /auto|scroll/.test(o.overflowX),
y = c.scrollHeight > c.clientHeight && /auto|scroll/.test(o.overflowY);
if (x) c.scrollLeft += nudge(r.left, r.right, b.left, b.right, true,
c.parentElement && c.parentElement.hasAttribute('data-edux-tabs-over') ? 56 : 12);
if (y) c.scrollTop += nudge(r.top, r.bottom, b.top, b.bottom, true);
if (x || y) return;
}
}
function nudge(a, z, lo, hi, tight, pad) {
var m = pad || 12;
if (tight) while (m && z - a > hi - lo - 2 * m) m = m > 12 ? 12 : 0;
return z - a > hi - lo - 2 * m ? 0 : z > hi - m ? z - hi + m : a < lo + m ? a - lo - m : 0;
}
var scrollT = 0;
addEventListener('scroll', function () { scrollT = Date.now(); });
function holdClear(t) {
for (var a = t, c, box = 0; a; a = a.parentElement) {
if ((c = getComputedStyle(a)).position == 'fixed' || c.position == 'sticky' && parseFloat(c.top) < 2) return;
if (a != t && a.scrollHeight > a.clientHeight && /auto|scroll/.test(c.overflowY)) box = 1;
}
var r = t.getBoundingClientRect(), s = getComputedStyle(document.documentElement),
lo = parseFloat(s.scrollPaddingTop) || 0, hi = innerHeight - (parseFloat(s.scrollPaddingBottom) || 0);
if (r.height > hi - lo - 24)
box || t.matches(':read-write') ||
setTimeout(function () { scrollTo(scrollX, scrollY + t.getBoundingClientRect().top - lo - 12); });
else if (Date.now() - scrollT < 100 && r.bottom > 0 && r.top < innerHeight)
scrollTo(scrollX, scrollY + nudge(r.top, r.bottom, lo, hi));
}
document.addEventListener('focusin', function (e) {
try { if (e.target.matches(':focus-visible')) { revealStep(e.target); holdClear(e.target); } } catch (_) {}
});
function revealActiveStep() {
var a = document.querySelector('.prog-step.active');
if (a) revealStep(a);
}
function trackChapter() {
var bar = document.querySelector('[data-edux-fontbar]') || document.querySelector('.progress-bar');
if (!bar) return;
var steps = [].filter.call(document.querySelectorAll('.prog-step'), function (s) {
return !s.classList.contains('prog-step--go');
});
if (!steps.length) return;
var total = steps.length;
var own = document.documentElement.getAttribute('data-edux-progress') === 'work';
if (!own) seenMark(false, 0, total);
steps.forEach(function (s, i) {
s.addEventListener('click', function () {
if (own) seenMark(false, null, total, secName(s));
else seenMark(i === total - 1, i, total, secName(s));
revealStep(s);
});
});
revealActiveStep();
if (window.MutationObserver) {
var mo = new MutationObserver(function () { revealActiveStep(); });
mo.observe(bar, { subtree: true, attributes: true, attributeFilter: ['class'] });
setTimeout(function () { mo.disconnect(); }, 3000);
}
}
ready(trackChapter);
function tabOverflowCue() {
var bar = document.querySelector('.progress-bar'), sc = bar && bar.querySelector(':scope > .progress-inner');
if (!sc || bar.querySelector(':scope > .prog-pos')) return;
var pos = document.createElement('span'), q = 0, last = null, A = 'setAttribute';
pos.className = 'prog-pos';
pos[A]('aria-hidden', 'true');
sc.after(pos);
var arr = [-1, 1].map(function (d) {
var b = document.createElement('button');
b.type = 'button';
b.className = 'prog-more prog-more--' + (d < 0 ? 'prev' : 'next');
b.tabIndex = -1;
b[A]('aria-hidden', 'true');
b.textContent = d < 0 ? '\u2039' : '\u203a';
b.onclick = function () { sc.scrollBy({ left: d * Math.max(120, sc.clientWidth * 0.7), behavior: 'smooth' }); };
bar.appendChild(b);
return b;
});
function update() {
q = 0;
var on = bar.hasAttribute('data-edux-tabs-over'), x = sc.scrollLeft, w = sc.clientWidth,
over = sc.scrollWidth > w + (on ? pos.offsetWidth + 6 : 0) + 1, m = '';
if (over !== on) bar.toggleAttribute('data-edux-tabs-over', over);
if (over) {
m = (x > 2 ? 'start ' : '') + (x < sc.scrollWidth - w - 2 ? 'end' : '');
var list = [].filter.call(sc.querySelectorAll('.prog-step:not(.prog-step--go)'), Boolean),
a = sc.querySelector('.prog-step.active'), i = list.indexOf(a);
pos.textContent = (i < 0 ? '\u2013' : i + 1) + '/' + list.length;
var r = a && a.offsetWidth > w - 112 && a.getBoundingClientRect(), s = sc.getBoundingClientRect();
if (r && r.left > s.left - 2 && r.right < s.right + 2) {
if (r.left < s.left + 56) m = m.replace('start', '');
if (r.right > s.right - 56) m = m.replace('end', '');
}
arr.forEach(function (b, k) {
b.style.top = sc.offsetTop + (sc.offsetHeight - 44) / 2 + 'px';
b.style[k ? 'right' : 'left'] = (k ? bar.clientWidth - sc.offsetLeft - sc.offsetWidth : sc.offsetLeft) + 'px';
});
}
m = m.trim();
if ((bar.getAttribute('data-edux-tabs-more') || '') !== m) m ? bar[A]('data-edux-tabs-more', m) : bar.removeAttribute('data-edux-tabs-more');
}
function sched() { q = q || requestAnimationFrame(update); }
sc.addEventListener('scroll', sched, { passive: true });
new ResizeObserver(update).observe(sc);
new MutationObserver(function () {
var a = sc.querySelector('.prog-step.active');
if (a && a !== last) { last = a; update(); revealStep(a); }
sched();
}).observe(sc, { subtree: true, childList: true, attributeFilter: ['class'] });
update();
}
ready(tabOverflowCue);
function wireTabAria(tabs, secs) {
tabs.forEach(function (t, i) {
var s = secs[i];
if (!s) return;
if (!t.id) t.id = 'tab-' + s.id;
t.setAttribute('aria-controls', s.id);
if (!s.getAttribute('aria-label') && !s.getAttribute('aria-labelledby')) {
var lab = t.querySelector('.ptext');
if (lab && lab.textContent.trim()) s.setAttribute('aria-label', lab.textContent.trim());
}
});
}
function syncTabAria(tabs, i) {
tabs.forEach(function (t, n) {
t.setAttribute('aria-current', n === i ? 'true' : 'false');
t.setAttribute('aria-expanded', n === i ? 'true' : 'false');
});
}
var _tabsMounted = false;
function mountTabs() {
if (_tabsMounted) return;
var tabs = [].slice.call(document.querySelectorAll('.prog-step[data-goto]'));
if (!tabs.length) return;
_tabsMounted = true;
var secs = tabs.map(function (t) { return document.getElementById(t.getAttribute('data-goto')); });
wireTabAria(tabs, secs);
function show(i) {
secs.forEach(function (s, n) { if (s) s.hidden = n !== i; });
tabs.forEach(function (t, n) {
t.classList.toggle('active', n === i);
if (n === i) t.classList.add('seen');
});
syncTabAria(tabs, i);
seenCur(i);
}
tabs.forEach(function (t, i) { t.addEventListener('click', function () { show(i); }); });
var start = seenCur();
show(start != null && tabs[start] ? start : 0);
secNav(tabs, secs);
}
var _secLead = null;
try { _secLead = new RegExp('^[^\\p{L}\\p{N}]+', 'u'); } catch (e) {}
function secName(t) {
var p = t.querySelector('.ptext') || t;
var s = String(p.textContent || '').replace(/\s+/g, ' ').trim();
return _secLead ? s.replace(_secLead, '') : s;
}
function secOf(t) {
var id = t.getAttribute('data-goto') || t.getAttribute('aria-controls');
if (!id) { var m = /goToSection\('([^']+)'\)/.exec(t.getAttribute('@click') || ''); id = m && m[1]; }
return id ? document.getElementById(id) : null;
}
function secFocus(sec, name) {
if (!sec) return;
var vis = function (x) { return x.getClientRects().length; },
h = [].filter.call(sec.querySelectorAll('.section-title, h2, h3'), vis)[0],
f = [].filter.call(sec.querySelectorAll('a[href], button, input, select, textarea, summary, [tabindex]:not([tabindex="-1"])'), vis)[0];
if (!h || f && f.compareDocumentPosition(h) & 4) h = sec;
if (h === sec && name && !sec.getAttribute('aria-label') && !sec.getAttribute('aria-labelledby')) sec.setAttribute('aria-label', name);
if (!h.hasAttribute('tabindex')) h.setAttribute('tabindex', '-1');
try { h.focus({ preventScroll: true }); } catch (e) {}
}
function secGo(sec, name, tries) {
if (!sec.getClientRects().length && tries < 10) { setTimeout(function () { secGo(sec, name, tries + 1); }, 30); return; }
secFocus(sec, name);
var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
requestAnimationFrame(function () {
try { sec.scrollIntoView({ block: 'start', behavior: still ? 'instant' : 'smooth' }); } catch (e) { sec.scrollIntoView(true); }
});
}
function secNav(tabs, secs) {
if (!tabs) {
tabs = [].filter.call(document.querySelectorAll('.progress-bar .prog-step'), function (t) {
return !t.classList.contains('prog-step--go');
});
secs = tabs.map(secOf);
}
tabs = [].slice.call(tabs); secs = [].slice.call(secs || []);
var live = [];
tabs.forEach(function (t, i) {
if (t && secs[i] && !t.hidden && getComputedStyle(t).display !== 'none') live.push(i);
});
live.forEach(function (i, n) {
var j = live[n + 1], sec = secs[i];
if (j == null || sec.querySelector(':scope > .sec-next')) return;
var name = secName(tabs[j]);
if (!name) return;
var box = document.createElement('div');
box.className = 'sec-next';
var b = document.createElement('button');
b.type = 'button';
b.className = 'btn sec-next__btn';
b.setAttribute('data-edux-secnext', '');
b.innerHTML = TH('secnav.next', { name: name }) + '<span aria-hidden="true"> →</span>';
b.addEventListener('click', function () {
emitDoc('edux:section-done', { idx: i, total: live.length, name: secName(tabs[i]) });
tabs[j].click();
setTimeout(function () { secGo(secs[j], name, 0); }, 0);
});
box.appendChild(b);
sec.appendChild(box);
});
}
window.EDUXTabs = { mount: mountTabs, aria: wireTabAria, syncAria: syncTabAria,
secnav: secNav, focus: secFocus };
var FOLD_KINDS = [['.build-step', 'fold.pos.step'], ['.try-exp', 'fold.pos.try'], ['.asm', 'fold.pos.puzzle'],
['.extend-tier-item', 'fold.pos.project'], ['.try-tool', 'fold.pos.tool'],
['.quickref-pair', 'fold.pos.example']];
var FOLD_HEAD = '.build-step-head, .build-title, .build-step-text, .bd-prose, .try-exp__hd, .asm__title, ' +
'.extend-tier-brief, .extend-tier-text, .try-tool__h, .quickref-label';
var FOLD_AT = 2600, foldSeq = 0, foldLive = [];
function foldSet(it, b, open) {
it.setAttribute('data-edux-fold', open ? 'open' : 'shut');
b.setAttribute('aria-expanded', open ? 'true' : 'false');
b.innerHTML = TH(open ? 'fold.close' : 'fold.open') + '<span class="edux-fold__chev" aria-hidden="true"></span>';
}
function foldGroup(g) {
var shut = [];
g.items.forEach(function (it) {
var head = it.querySelector(FOLD_HEAD), body = [];
for (var n = head; n && n !== it; n = n.parentElement)
for (var s = n.nextElementSibling; s; s = s.nextElementSibling) body.push(s);
if (!body.length) return;
[].forEach.call(head.children, function (c) {
for (var q = c.previousSibling, lead = false; q && !lead; q = q.previousSibling)
lead = q.nodeType === 1 || (q.nodeType === 3 && /\S/.test(q.nodeValue));
if (lead && /^(block|flow-root|flex|grid|table|list-item)$/.test(getComputedStyle(c).display)) body.push(c);
});
body.forEach(function (x) { x.classList.add('edux-fold__body'); });
if (!head.id) head.id = 'edux-fh' + (++foldSeq);
var b = document.createElement('button');
b.type = 'button';
b.className = 'btn btn-ghost edux-fold__btn';
b.setAttribute('aria-describedby', head.id);
head.after(b);
b.addEventListener('click', function () {
var open = it.getAttribute('data-edux-fold') !== 'open';
foldSet(it, b, open);
if (open) try { window.dispatchEvent(new Event('resize')); } catch (e) {}
foldTick();
});
shut.push([it, b]);
});
if (!shut.length) return;
var first = shut.filter(function (x) { return !x[0].classList.contains('is-checked'); })[0] || shut[0];
shut.forEach(function (x) { foldSet(x[0], x[1], x === first); });
var host = document.createElement('div'), chip = document.createElement('span');
host.className = 'edux-foldpos';
host.setAttribute('aria-hidden', 'true');
chip.className = 'edux-foldpos__chip';
host.appendChild(chip);
g.box.parentElement.insertBefore(host, g.box);
foldLive.push({ items: g.items, box: g.box, kind: g.kind, host: host, chip: chip });
foldTick();
}
var foldQ = 0;
function foldTick() {
foldQ = 0;
foldLive.forEach(function (f) {
var r = f.box.getBoundingClientRect(), top = parseFloat(getComputedStyle(f.host).top) || 0,
line = top + (innerHeight - top) * 0.3, k = -1;
if (r.height && r.top <= line && r.bottom > top + 48)
f.items.forEach(function (it, i) { if (it.getBoundingClientRect().top <= line) k = i; });
if (k >= 0) {
var t = T(f.kind, { n: k + 1, total: f.items.length });
if (f.chip.textContent !== t) f.chip.textContent = t;
}
f.host.toggleAttribute('data-on', k >= 0);
});
}
function foldSched() { foldQ = foldQ || requestAnimationFrame(foldTick); }
function mountFolds() {
if (!document.querySelector('.progress-bar .prog-step')) return;
var groups = [];
FOLD_KINDS.forEach(function (k) {
[].forEach.call(document.querySelectorAll(k[0]), function (it) {
var p = it.parentElement, sec = p && p.closest('.section-card, section');
if (!sec || groups.some(function (g) { return g.box === p; })) return;
if (FOLD_KINDS.some(function (o) { return p.closest(o[0]); })) return;
var items = [].filter.call(p.children, function (c) { return c.matches(k[0]); });
if (items.length >= 2) groups.push({ box: p, sec: sec, items: items, kind: k[1] });
});
});
if (!groups.length || !window.ResizeObserver) return;
var ro = new ResizeObserver(function (es) {
es.forEach(function (e) {
var g = groups.filter(function (x) { return x.box === e.target; })[0];
if (!g || !e.contentRect.height) return;
var sr = g.sec.getBoundingClientRect(), gh = g.box.getBoundingClientRect().height;
if (g.seen && sr.top < -200) return;
g.seen = true;
if (sr.height > FOLD_AT && gh * 3 >= sr.height) { ro.unobserve(g.box); foldGroup(g); }
});
});
groups.forEach(function (g) { ro.observe(g.box); });
addEventListener('scroll', foldSched, { passive: true });
addEventListener('resize', foldSched);
}
ready(mountFolds);
var _subMounted = false;
function mountSubtabs() {
if (_subMounted) return;
var hosts = [].slice.call(document.querySelectorAll('[data-edux-subtabs]'));
if (!hosts.length) return;
_subMounted = true;
hosts.forEach(function (sec) {
var body = sec.querySelector('.section-body') || sec;
var kids = [].slice.call(body.children);
var labels = kids.filter(function (n) {
return n.classList && n.classList.contains('section-label');
});
if (labels.length < 2) return;
var panels = [], cur = null;
kids.forEach(function (n) {
if (n.classList && n.classList.contains('section-label')) {
cur = { label: n.textContent.trim(), nodes: [], skip: n.hasAttribute('hidden'), el: n };
panels.push(cur);
return;
}
if (cur) cur.nodes.push(n);
});
panels = panels.filter(function (pn) { return !pn.skip; });
if (panels.length < 2) return;
var bar = document.createElement('div');
bar.className = 'subtabs';
bar.setAttribute('role', 'tablist');
var wraps = panels.map(function (pn) {
var d = document.createElement('div');
d.className = 'subpanel';
pn.nodes.forEach(function (n) { d.appendChild(n); });
return d;
});
panels.forEach(function (pn) { pn.el.remove(); });
body.appendChild(bar);
wraps.forEach(function (w) { body.appendChild(w); });
function show(i) {
wraps.forEach(function (w, n) { w.hidden = n !== i; });
[].forEach.call(bar.children, function (b, n) {
b.classList.toggle('is-on', n === i);
b.setAttribute('aria-selected', n === i ? 'true' : 'false');
});
}
panels.forEach(function (pn, i) {
var b = document.createElement('button');
b.type = 'button';
b.className = 'subtab';
b.setAttribute('role', 'tab');
b.textContent = pn.label;
b.addEventListener('click', function () { show(i); });
bar.appendChild(b);
});
show(0);
});
}
window.EDUXSubtabs = { mount: mountSubtabs };
function renderProgress(el) {
var items = [];
try { items = JSON.parse((document.getElementById(attr(el, 'data')) || {}).textContent || '[]'); } catch (e) {}
if (acct() && !acct().getCurrentUserId()) {
var login = document.createElement('edux-login');
login.setAttribute('redirect', location.href);
if (attr(el, 'pick')) login.setAttribute('pick', attr(el, 'pick'));
el.innerHTML = '';
el.appendChild(login);
return;
}
var who = acctCurrent();
var all = seenAll();
function state(href) {
var rec = seenFind(all, href);
return rec ? (rec.done ? 'done' : 'studied') : 'new';
}
var done = 0, studied = 0, total = 0;
var levels = items.map(function (lv) {
var cells = (lv.chapters || []).map(function (c) {
var st = state(c.href);
total++; if (st === 'done') done++; else if (st === 'studied') studied++;
return '<a class="ch-cell ' + st + '" href="' + esc(c.href) + '">' +
'<span class="ch-num">' + chNum(c.num) + '</span>' +
'<span class="ch-ttl">' + esc(c.title || '') + '</span>' +
(st === 'done' ? '<span class="ch-check">✓</span>' : '') +
'</a>';
}).join('');
return '<section class="card"' + tones(lv, 'lc') + '>' +
'<div class="sec-h">' + esc(lv.level || '') + '</div>' +
'<p class="sec-sub">' + TH('progress.n_chapters', { n: (lv.chapters || []).length }) + '</p>' +
'<div class="ch-grid">' + cells + '</div>' +
'</section>';
}).join('');
var whoRow = who
? '<div class="sec-h">👤 ' + esc(who.name || who.id) + '</div>' +
'<p class="sec-sub">' + TH('progress.own') + ' ' +
'<button type="button" class="btn-outline" data-edux-switch>' + TH('progress.switch') + '</button></p>'
: '';
el.innerHTML = '<div class="prog-dash">' +
'<section class="card">' + whoRow + '<div class="prog-row">' +
'<div><div class="stat-n">' + done + '</div><div class="stat-l">' + TH('progress.finished') + '</div></div>' +
'<div><div class="stat-n">' + studied + '</div><div class="stat-l">' + TH('progress.started') + '</div></div>' +
'<div><div class="stat-n">' + total + '</div><div class="stat-l">' + TH('term.chapters') + '</div></div>' +
'<div style="margin-left:auto"><button type="button" class="btn-outline" data-edux-progress-reset>' + TH('progress.clear') + '</button></div>' +
'</div><p class="sec-sub" style="margin:.9rem 0 0">' +
TH(who ? 'progress.saved_named' : 'note.local') +
'</p></section>' + levels + '</div>';
var reset = el.querySelector('[data-edux-progress-reset]');
if (reset) reset.addEventListener('click', function () {
try { localStorage.removeItem(seenKey()); } catch (e) {}
renderProgress(el);
});
var sw = el.querySelector('[data-edux-switch]');
if (sw) sw.addEventListener('click', function () {
var a = acct(); if (a) a.clearCurrentUser();
renderProgress(el);
});
}
function skipLink(el, key) {
if (document.querySelector('.skip-link')) return '';
var href = attr(el, 'skip-href', '#main-content');
return '<a class="skip-link" href="' + esc(href) + '">' +
tattr(el, 'skip-label', key) + '</a>';
}
(function frameFocusRing() {
var kb = 0, cur;
function off() { if (cur) { cur.classList.remove('edux-frame-focus'); cur = null; } }
try {
document.addEventListener('keydown', function (e) { if (e.key === 'Tab') kb = Date.now(); }, true);
document.addEventListener('pointerdown', function () { kb = 0; }, true);
window.addEventListener('blur', function (e) {
if (e.target !== window) return;
var a = document.activeElement;
if (Date.now() - kb < 500 && a && a.tagName === 'IFRAME') { off(); cur = a; a.classList.add('edux-frame-focus'); holdClear(a); }
});
window.addEventListener('focus', off);
document.addEventListener('focusin', off);
} catch (e) {}
})();
(function tabEscape() {
var kb = false, armed = null, shown = null, n = 0, raf = 0, root = document.documentElement;
function boxOf(t) { return t && t.closest ? t.closest('[data-tab-escape]') : null; }
function hintFor(box) {
var h = box.__tabHint;
if (!h || !h.isConnected) {
h = box.__tabHint = document.createElement('div');
h.className = 'edux-tab-escape';
h.id = 'edux-tab-escape-' + (++n);
h.innerHTML = '<kbd>Esc</kbd> then <kbd>Tab</kbd> leaves the ' +
esc(box.getAttribute('data-tab-escape') || 'editor');
document.body.appendChild(h);
}
return h;
}
function leftOf(r, h) { return Math.max(6, Math.min(r.right, root.clientWidth - 6) - h.offsetWidth); }
function fixedAt(x, y, box) {
var e = document.elementFromPoint(x, y);
while (e && !(e instanceof HTMLElement)) e = e.parentElement;
while (e && e.offsetParent) e = e.offsetParent;
return e && e !== document.body && e !== root && !e.contains(box) &&
getComputedStyle(e).position === 'fixed' ? e : null;
}
function floorFor(box, left, w, hh) {
var floor = innerHeight - 6;
for (var pass = 0; pass < 4; pass++) {
var low = floor;
for (var x = left + 1; x < left + w; x += 16) {
for (var y = floor - hh + 1; y < floor; y += Math.max(1, hh / 2 - 1)) {
var f = fixedAt(Math.min(x, left + w - 1), y, box);
if (f) low = Math.min(low, f.getBoundingClientRect().top - 6);
}
}
if (low >= floor) break;
floor = low;
}
return Math.max(hh + 12, floor);
}
function place() {
raf = 0;
if (!shown) return;
var h = shown.__tabHint, r = shown.getBoundingClientRect(), hh = h.offsetHeight, vh = innerHeight;
var left = leftOf(r, h), floor = floorFor(shown, left, h.offsetWidth, hh);
h.style.left = left + 'px';
h.style.top = Math.max(6, Math.min(r.bottom + 6, floor - hh)) + 'px';
root.style.scrollPaddingBottom = r.bottom + hh + 6 > floor + 1 ? vh - floor + hh + 12 + 'px' : '';
}
function queue() { if (shown && !raf) raf = requestAnimationFrame(place); }
addEventListener('scroll', queue, true); addEventListener('resize', queue);
function show(box, arm) {
var h = hintFor(box);
if (shown !== box) {
hide(); shown = box; box.__tabMb = box.style.marginBottom; h.classList.add('is-on');
var r = box.getBoundingClientRect(), m = h.offsetHeight + 12,
d = r.bottom + m - 6 - floorFor(box, leftOf(r, h), h.offsetWidth, h.offsetHeight);
box.style.marginBottom = parseFloat(getComputedStyle(box).marginBottom) + m + 'px';
if (d > 0 && d <= r.top - 64) scrollBy(0, d);
}
armed = arm ? box : null;
h.classList.toggle('is-armed', !!arm);
place();
}
function clear(t) {
var h = shown && shown.__tabHint;
if (!h || !t.getBoundingClientRect) return;
var c = h.getBoundingClientRect(), e = t.getBoundingClientRect(), d = e.bottom - c.top + 6;
if (e.height > innerHeight * 0.8 || e.right <= c.left || e.left >= c.right ||
e.top >= c.bottom || d <= 0 || d > e.top - 64) return;
scrollBy({ top: d, behavior: 'instant' });
}
function hide() {
if (shown) {
shown.__tabHint.className = 'edux-tab-escape';
shown.style.marginBottom = shown.__tabMb;
root.style.scrollPaddingBottom = '';
}
shown = armed = null;
}
function leave(box, back) {
var all = [].filter.call(document.querySelectorAll(
'a[href],button,input,select,textarea,iframe,summary,[controls],[contenteditable],[tabindex]'), function (el) {
return !box.contains(el) && !el.contains(box) && !el.disabled && el.tabIndex >= 0 &&
el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden' && !el.closest('[inert]');
});
var side = all.filter(function (el) { return box.compareDocumentPosition(el) & (back ? 2 : 4); });
var pick = back ? (side.pop() || all.pop()) : (side[0] || all[0]);
if (pick) pick.focus(); else document.activeElement.blur();
}
document.addEventListener('pointerdown', function () { kb = false; hide(); }, true);
document.addEventListener('keydown', function (e) {
var box = boxOf(e.target), k = e.key;
if (k === 'Tab' || k === 'Escape') kb = true;
if (!box) return;
if (k === 'Tab' && armed === box && !e.altKey && !e.ctrlKey && !e.metaKey) {
e.preventDefault(); e.stopPropagation();
hide(); leave(box, e.shiftKey);
} else if (k === 'Escape' || k === 'Tab') show(box, k === 'Escape');
else if (armed && k !== 'Shift') show(box, false);
}, true);
document.addEventListener('focusin', function (e) {
var t = e.target, box = boxOf(t);
if (shown && shown !== box) hide();
if (!box) return;
var id = hintFor(box).id, d = t.getAttribute('aria-describedby') || '';
if ((' ' + d + ' ').indexOf(' ' + id + ' ') < 0) t.setAttribute('aria-describedby', (d + ' ' + id).trim());
if (kb) { show(box, armed === box); clear(t); }
});
document.addEventListener('focusout', function (e) {
var box = boxOf(e.target);
if (box && box === shown) setTimeout(function () {
if (shown === box && !box.contains(document.activeElement)) hide();
});
});
})();
document.addEventListener('keydown', function (e) {
var d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key], t = e.target,
b = d && !e.altKey && !e.ctrlKey && !e.metaKey && t.type === 'radio' && t.closest('[data-pick-once]');
if (!b) return;
var g = [].filter.call(b.querySelectorAll('input[type=radio]:enabled'), function (r) { return r.name === t.name; }),
i = g.indexOf(t);
if (i < 0) return;
e.preventDefault();
g[(i + d + g.length) % g.length].focus();
});
function renderAssessHeader(el) {
var kicker = attr(el, 'kicker');
var rank = attr(el, 'rank');
var title = attr(el, 'title');
var lessonHref = attr(el, 'lesson-href'), lessonLabel = tattr(el, 'lesson-label', 'term.back_chapter');
var homeHref = attr(el, 'home-href'), homeLabel = tattr(el, 'home-label', 'term.chapters');
el.removeAttribute('title');
var nav = [
lessonHref ? '<a href="' + esc(lessonHref) + '" class="assess-nav-btn">' + lessonLabel + '</a>' : '',
homeHref ? '<a href="' + esc(homeHref) + '" class="assess-nav-btn">' + homeLabel + '</a>' : '',
].join('');
var skip = skipLink(el, 'skip.checkup');
el.innerHTML =
'<header id="assess-header">' +
'<div class="assess-header-inner">' +
(kicker || rank
? '<div class="level-label">' +
(kicker ? '<span>' + esc(kicker) + '</span>' : '') +
(rank ? '<span class="rank-badge">' + esc(rank) + '</span>' : '') +
'</div>' : '') +
(title ? '<h1 class="assess-title">' + esc(title) + '</h1>' : '') +
(nav ? '<div class="assess-nav">' + nav + '</div>' : '') +
'</div>' +
'</header>';
if (skip) el.insertAdjacentHTML('beforebegin', skip);
}
function navSlot(cls, href, kicker, label, opts) {
var o = opts || {};
var dead = !href || href === '#';
return '<a class="' + cls + (dead ? ' is-empty' : '') + '" href="' + esc(dead ? '#' : href) + '"' +
(dead ? ' tabindex="-1" aria-hidden="true"' : '') + '>' +
(o.arrowFirst ? '<span class="nav-arrow" aria-hidden="true">' + o.arrow + '</span>' : '') +
'<span class="nav-text"' + (o.alignRight ? ' style="text-align:right"' : '') + '>' +
'<small>' + kicker + '</small><span>' + label + '</span></span>' +
(o.arrowFirst ? '' : '<span class="nav-arrow" aria-hidden="true">' + o.arrow + '</span>') +
'</a>';
}
function renderChapterNav(el) {
var assess = attr(el, 'assess-href');
var links =
navSlot('nav-prev', attr(el, 'prev-href'), TH('chnav.prev'), TH('chnav.prev_label'),
{ arrow: '←', arrowFirst: true }) +
navSlot('nav-home', attr(el, 'home-href'), TH('chnav.back_to'),
tattr(el, 'home-label', 'chnav.home_label'), { arrow: '⌂', arrowFirst: true }) +
(assess ? navSlot('nav-next nav-assess', assess,
tattr(el, 'assess-note', 'chnav.assess_note'),
tattr(el, 'assess-label', 'chnav.assess'), { arrow: '→', alignRight: true }) : '') +
navSlot('nav-next', attr(el, 'next-href'), TH('chnav.next'), TH('chnav.next_label'),
{ arrow: '→', alignRight: true });
el.innerHTML = '<nav class="chapter-nav' + (assess ? ' chapter-nav--4' : '') +
'"' + TQ('aria-label', 'chnav.label') + '>' + links + '</nav>';
fitChapterNav(el);
}
function fitChapterNav(el) {
function fit() {
var nav = el.querySelector('.chapter-nav');
if (!nav) return;
nav.classList.remove('is-tight');
if (nav.scrollWidth > nav.clientWidth) nav.classList.add('is-tight');
}
if (el._cnFit) { fit(); return; }
el._cnFit = true;
if (window.ResizeObserver) new ResizeObserver(fit).observe(el);
try { document.fonts.ready.then(fit); } catch (e) {}
}
var assessNavSeq = 0;
function renderAssessNav(el) {
if (document.readyState === 'loading' && !el._navDeferred) {
el._navDeferred = true;
document.addEventListener('DOMContentLoaded', function () { renderAssessNav(el); });
return;
}
if (el._navBuilt) return;
var sel = attr(el, 'pages', '.aux-section');
var pages = [].slice.call(document.querySelectorAll(sel));
if (pages.length < 2) return;
el._navBuilt = true;
var given = attr(el, 'labels');
var labels = given ? given.split(',').map(function (x) { return x.trim(); }) : pages.map(function (p) {
var h = p.querySelector('h2, h3, .aux-h2, .section-title');
var t = h ? (h.textContent || '') : '';
return t.replace(/^[\s\d.]*/, '').replace(/^[^\w가-힣]+/, '').trim() || T('assess.part');
});
var icons = pages.map(function (p) {
var d = p.getAttribute('data-tab-icon');
if (d) return d;
var i = p.querySelector('.section-icon, .aux-icon');
return i ? (i.textContent || '').trim() : '';
});
var gate = el.hasAttribute('gate');
var cur = 0;
var uid = el.id || ('edux-an' + (++assessNavSeq));
pages.forEach(function (p, i) {
p.classList.add('page');
if (!p.id) p.id = 'page-' + (i + 1);
if (!p.getAttribute('role')) p.setAttribute('role', 'tabpanel');
if (!p.getAttribute('aria-labelledby')) p.setAttribute('aria-labelledby', uid + '-t' + i);
if (!p.querySelector('.nav-buttons')) {
var nb = document.createElement('div');
nb.className = 'nav-buttons';
nb.innerHTML =
(i > 0 ? '<button type="button" class="btn btn-ghost" data-assess-prev>' + TH('assess.back') + '</button>' : '<span></span>') +
(i < pages.length - 1 ? '<button type="button" class="btn btn-primary" data-assess-next>' + TH('assess.next') + '</button>' : '<span></span>');
p.appendChild(nb);
}
var nx = gate && p.querySelector('[data-assess-next]');
if (nx && !p.querySelector('.assess-reason')) {
nx.insertAdjacentHTML('beforebegin', '<span class="assess-reason" id="' + uid + '-w' + i + '" aria-live="polite"></span>');
nx.setAttribute('aria-describedby', uid + '-w' + i);
}
});
var tabs = pages.map(function (p, i) {
return '<button type="button" class="prog-step" role="tab" id="' + esc(uid + '-t' + i) +
'" aria-selected="' + (i === 0) + '" tabindex="' + (i ? -1 : 0) +
'" aria-controls="' + esc(p.id) + '">' +
(icons[i] ? '<span class="pico" aria-hidden="true">' + esc(icons[i]) + '</span>' : '') +
'<span class="ptext">' + (labels[i] ? esc(labels[i]) : TH('assess.part')) + '</span></button>';
}).join('');
el.innerHTML = '<nav class="progress-bar"' + TQ('aria-label', 'assess.tabs') + '>' +
'<div class="progress-inner" role="tablist">' + tabs + '</div></nav>';
var steps = [].slice.call(el.querySelectorAll('.prog-step'));
function missing(i) {
var seen = {};
return [].filter.call(pages[i].querySelectorAll('input[type=radio][name], [data-assess-required]'), function (f) {
if (f.type !== 'radio') return !String(f.value || '').trim();
if (seen[f.name]) return false;
return (seen[f.name] = 1) && !pages[i].querySelector('input[name="' + f.name + '"]:checked');
});
}
var CTL = 'button, a[href], input, select, textarea, [tabindex]';
function focusPage(i) {
var t = pages[i].querySelector('h2, h3, .aux-h2, .section-title') || pages[i].querySelector(CTL);
if (!t) return;
if (!t.matches(CTL)) t.tabIndex = -1;
t.focus({ preventScroll: true });
}
function why(i) { return pages[i].querySelector('.assess-reason'); }
function say(i, gap) {
var r = why(i), n = gap ? gap.length : 0;
if (!r) return;
[].forEach.call(pages[i].querySelectorAll('[data-assess-missing]'), function (c) { c.removeAttribute('data-assess-missing'); });
(gap || []).forEach(function (f) {
var l = f.closest('label');
(f.closest('.q-card') || (l && f.type == 'radio' ? l.parentNode : l || f)).setAttribute('data-assess-missing', '');
});
r.textContent = n ? TN('assess.left', n) : '';
r.toggleAttribute('data-assess-nudged', !!n);
}
function show(i, moveFocus) {
if (i < 0 || i >= pages.length) return;
cur = i;
pages.forEach(function (p, n) { p.classList.toggle('active', n === i); });
steps.forEach(function (s, n) {
s.classList.toggle('active', n === i);
s.classList.toggle('done', n < i);
s.setAttribute('aria-selected', n === i);
s.tabIndex = n === i ? 0 : -1;
});
revealStep(steps[i]);
pages.forEach(function (p, n) { say(n); });
try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, 0); }
if (moveFocus) focusPage(i);
el.dispatchEvent(new CustomEvent('edux-assess-page', { bubbles: true, detail: { page: i + 1, total: pages.length } }));
}
function next() {
if (gate) {
var gap = missing(cur), r = why(cur);
if (gap.length && !(r && r.hasAttribute('data-assess-nudged'))) {
say(cur, gap);
gap[0].focus({ preventScroll: true });
(gap[0].closest('.q-card') || gap[0]).scrollIntoView({ block: 'center', behavior: 'smooth' });
return;
}
}
show(cur + 1, true);
}
steps.forEach(function (s, i) { s.addEventListener('click', function () { show(i, true); }); });
el.addEventListener('keydown', function (e) {
var i = steps.indexOf(document.activeElement), n = steps.length;
var to = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1 + n, ArrowUp: i - 1 + n, Home: 0, End: n - 1 }[e.key];
if (i < 0 || to == null) return;
to %= n;
e.preventDefault();
steps.forEach(function (s, k) { s.tabIndex = k === to ? 0 : -1; });
steps[to].focus();
});
document.addEventListener('click', function (e) {
var t = e.target && e.target.closest && e.target.closest('[data-assess-next],[data-assess-prev]');
if (!t || pages.indexOf(t.closest('.page')) < 0) return;
if (t.hasAttribute('data-assess-next')) next(); else show(cur - 1, true);
});
if (gate) document.addEventListener('input', function () {
var r = why(cur);
if (r && r.hasAttribute('data-assess-nudged')) say(cur, missing(cur));
});
el.show = show;
el.total = pages.length;
document.body.classList.add('is-assess-paged');
show(0);
}
function assessPlainText(scores, opts) {
opts = opts || {};
var L = [];
if (opts.brand) L.push('[' + opts.brand + ']');
var head = [];
if (opts.level) head.push(T('term.level_n', { n: opts.level }));
if (opts.ch) head.push(T('term.chapter_n', { n: opts.ch }));
if (opts.title) head.push(opts.title);
if (head.length) L.push(head.join(' · '));
L.push('');
if (opts.studentName) L.push('Student: ' + opts.studentName);
if (opts.date) L.push('Date: ' + opts.date);
L.push('');
L.push('Total: ' + scores.totalPoints + '/' + scores.maxPoints +
' (' + Math.round(scores.overall * 100) + '%) — ' + assessSay(scores.grade, scores.overall));
(scores.areas || []).forEach(function (a) {
L.push('  · ' + a.label + ' ' + a.correct + '/' + a.total + ' — ' + assessSay(a.level, a.pct));
});
L.push(T('assess.not_a_grade'));
var missed = (opts.review || []).filter(function (i) { return !i.open && !i.ok; });
if (missed.length) {
L.push('');
L.push('Missed (' + missed.length + '):');
missed.forEach(function (i) {
L.push('  ' + (i.label || i.q) + (i.area ? ' [' + i.area + ']' : '') +
' — chose ' + (i.mine ? i.mine + '. ' + i.mineText : 'no answer') +
' / answer ' + i.want + '. ' + i.wantText);
});
}
return L.join('\n');
}
var ASSESS_SUBMIT_LABEL = 'Check my answers';
var ASSESS_SUBMIT_NOTE = 'Your score is saved on this device under your name, so it shows up on My Progress.';
var AGAIN = 'Reload the page to start again.';
function renderAssessSubmit(el) {
var note = attr(el, 'note', ASSESS_SUBMIT_NOTE);
var label = attr(el, 'submit-label', ASSESS_SUBMIT_LABEL);
el.removeAttribute('title');
el.innerHTML =
'<div class="asub">' +
'<div class="asub__field"><label for="edux-as-name">Name <span aria-hidden="true">*</span></label>' +
'<input id="edux-as-name" type="text" maxlength="40" autocomplete="name" placeholder="Your name"></div>' +
'<p class="asub__note">' + esc(note) + '</p>' +
'<div class="asub__err" role="alert" hidden></div>' +
'<div class="asub__acts">' +
'<button type="button" class="btn asub__send">' + esc(label) + '</button>' +
'</div>' +
'</div>';
function who() { try { return acctCurrent() || {}; } catch (e) { return {}; } }
function fillName(replace) {
var n = el.querySelector('#edux-as-name');
if (n && (!n.value || replace)) n.value = who().name || '';
}
fillName(false);
function stamp(w) { try { history.replaceState(Object.assign({}, history.state, { eduxWho: w }), ''); } catch (e) {} }
function owner() {
var me = who().id || '', was = (history.state || {}).eduxWho;
if (was == null || was === me) stamp(el._own = me); else away(1);
}
owner();
function theirs() {
var me = who().id || '';
if (me === el._own) return;
if (![].some.call(document.querySelectorAll('.is-picked,input:checked,textarea'), function (n) {
return !el.contains(n) && (n.tagName != 'TEXTAREA' || n.value);
})) return stamp(el._own = me);
away(1) || fail('Another student started this check-up. ' + AGAIN);
return 1;
}
if (!el._eduxWho) {
window.addEventListener('pageshow', function (e) { if (e.persisted) owner(); });
window.addEventListener('hashchange', function () {
if (el._own != null && (history.state || {}).eduxWho == null) stamp(el._own);
});
el._eduxWho = function (e) {
var d = (e && e.detail) || {};
if (d.prefix && d.prefix !== acctPrefix()) return;
el._gone = 1;
fillName(true);
var r = document.getElementById(attr(el, 'result'));
if (r && !r.hidden) {
r.show = null;
r.innerHTML = '<div class="ares"><p class="ares__sent">This result is closed. ' + AGAIN + '</p></div>';
away(1);
} else if (!el._busy) theirs();
};
document.addEventListener('edux:session-expired', el._eduxWho);
document.addEventListener('edux:user-changed', el._eduxWho);
}
var err = el.querySelector('.asub__err');
function fail(msg) { err.textContent = msg; err.hidden = false; }
function val(id) {
var node = el.querySelector('#' + id);
return node && node.value ? String(node.value).trim() : '';
}
var _last = null;
async function run(how) {
el._busy = (el._busy | 0) + 1;
try { await _run(how); }
catch (e) {
try { console.error('[edux-assess] grade/send failed', e); } catch (_) {}
fail(e && e.stale
? 'This check-up was updated. Reload the page, then check your answers again.'
: 'Could not score this check-up. Please check your connection and try again.');
}
el._busy--;
if (el._gone) el._eduxWho();
}
async function _run(how) {
err.hidden = true;
expireIdle(acctPrefix()); el._gone = 0;
if (theirs()) return;
var name = val('edux-as-name');
if (!name) return fail('Please enter your name.');
var g = el.grade && await el.grade();
if (!g) return fail('Could not score this check-up. Try again.');
var info = { studentName: name };
_last = { g: g, info: info };
var meta = g.meta || {};
EDUXAssess.save(g.scores, { prefix: meta.prefix, chapterId: meta.chapterId,
title: meta.title, completedAt: meta.date });
var sent = 'skipped';
var text = assessPlainText(g.scores, {
brand: meta.brand, level: meta.level, ch: meta.ch, title: meta.title,
studentName: name, date: meta.date, review: g.review,
});
showResult(g, info, sent, text);
}
function showResult(g, info, sent, text) {
var target = document.getElementById(attr(el, 'result'));
if (target && target.show) target.show(g, { info: info, sent: sent, text: text });
el.dispatchEvent(new CustomEvent('edux-assess-done',
{ bubbles: true, detail: { scores: g.scores, info: info, sent: sent, text: text, review: g.review || [],
meta: g.meta || {} } }));
}
var send = el.querySelector('.asub__send');
if (send) send.addEventListener('click', function () { run('save'); });
}
function renderAssessResult(el) {
el.hidden = true;
el.show = function (g, o) {
o = o || {};
var s = g.scores, meta = g.meta || {};
var rows = (s.areas || []).map(function (a) {
return '<tr><td>' + (a.icon ? esc(a.icon) + ' ' : '') + esc(a.label) + '</td>' +
'<td>' + a.correct + '/' + a.total + '</td>' +
'<td class="' + esc(a.cls) + '">' + '⭐'.repeat(a.stars) + ' ' + esc(assessSay(a.level, a.pct)) + '</td></tr>';
}).join('');
var advice = (s.areas || []).map(function (a) {
var t = (g.notes || {})[a.key];
return t ? '<p><strong>' + (a.icon ? esc(a.icon) + ' ' : '') + esc(a.label) + ':</strong> ' + esc(t) + '</p>' : '';
}).join('');
var mail = o.sent === 'sent'   ? 'Sent — the result is on its way by email.'
: o.sent === 'failed' ? 'Could not send the email. Show this screen to your teacher.'
: 'Your result is ready. Show this screen to your teacher.';
el.innerHTML =
'<div class="ares">' +
'<div class="ares__score"><b>' + s.totalPoints + '</b> / ' + s.maxPoints +
'<span class="ares__grade">' + esc(assessSay(s.grade, s.overall)) + '</span></div>' +
'<p class="ares__note">' + TH('assess.not_a_grade') + '</p>' +
'<p class="ares__sent">' + esc(mail) + '</p>' +
'<div class="ares__radar">' + EDUXAssess.radarSvg(s) + '</div>' +
'<table class="ares__table"><thead><tr><th>Area</th><th>Score</th><th>' + TH('assess.how') + '</th></tr></thead>' +
'<tbody>' + rows + '</tbody></table>' +
(advice ? '<div class="ares__advice"><h3>What to practise next</h3>' + advice + '</div>' : '') +
'<edux-answer-review class="ares__review"></edux-answer-review>' +
'<div class="ares__acts"><button type="button" class="btn btn--ghost ares__pdf">' +
'Save as PDF / Print</button></div>' +
'</div>';
var rv = el.querySelector('edux-answer-review');
if (rv) rv.items = g.review || [];
var pdf = el.querySelector('.ares__pdf');
if (pdf) pdf.addEventListener('click', function () {
EDUXAssess.printReport(s, {
brand: meta.brand || '', label: T('progress.report'), title: meta.title || '',
headerLines: [T('term.level_n', { n: meta.level || '' }) + ' · ' + T('term.chapter_n', { n: meta.ch || '' }),
'Generated: ' + (meta.date || '')],
boxes: [{ title: 'Student', rows: [
{ label: 'Name', value: (o.info || {}).studentName || '—' },
{ label: 'Submitted', value: meta.date || '—' }] }],
notes: g.notes || {}, footer: meta.brand || '',
});
});
el.hidden = false;
focusResult(el);
};
}
var KEEP = 'edux-assess-header,edux-header,edux-footer,header,footer,.app-header,.site-footer';
function focusResult(el) {
var main = el.closest ? (el.closest('main') || document.body) : document.body;
for (var n = el; n && n !== main && n.parentElement; n = n.parentElement) {
var sibs = n.parentElement.children;
for (var i = 0; i < sibs.length; i++) {
var sib = sibs[i];
if (sib === n || sib.contains(el)) continue;
if (sib.matches && sib.matches(KEEP)) continue;
if (sib.querySelector && sib.querySelector(KEEP)) continue;
sib.setAttribute('data-assess-hidden', '');
}
}
[].forEach.call(document.querySelectorAll('edux-assess-nav'), function (n) {
if (!n.contains(el)) n.setAttribute('data-assess-hidden', '');
});
document.body.classList.add('is-assess-done');
try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, 0); }
}
function define(name, render) {
if (window.customElements && !customElements.get(name)) {
customElements.define(name, class extends HTMLElement {
connectedCallback() { render(this); }
});
}
}
define('edux-header', renderHeader);
define('edux-footer', renderFooter);
define('edux-chapter-grid', renderGrid);
define('edux-hero', renderHero);
define('edux-level-grid', renderLevelGrid);
define('edux-text-size', renderTextSize);
define('edux-assess-header', renderAssessHeader);
define('edux-assess-submit', renderAssessSubmit);
define('edux-assess-result', renderAssessResult);
define('edux-assess-nav', renderAssessNav);
define('edux-chapter-nav', renderChapterNav);
function dashLevels(el) {
try { return JSON.parse((document.getElementById(attr(el, 'data')) || {}).textContent || '[]'); }
catch (e) { return []; }
}
function ringSvg(pct) {
var R = 27, C = 2 * Math.PI * R, off = (C * (1 - pct / 100)).toFixed(1);
return '<svg width="66" height="66" viewBox="0 0 66 66" role="img"' + TQ('aria-label', 'dash.ring', { pct: pct }) + '>' +
'<circle cx="33" cy="33" r="' + R + '" fill="none" style="stroke:var(--color-accent-soft)" stroke-width="7"/>' +
'<circle cx="33" cy="33" r="' + R + '" fill="none" style="stroke:var(--color-accent)" stroke-width="7" stroke-linecap="round" ' +
'stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + off + '" transform="rotate(-90 33 33)"/>' +
'<text x="33" y="38" text-anchor="middle" font-size="15" font-weight="800" style="fill:var(--color-accent-deep)">' + pct + '%</text></svg>';
}
function cheerLine(done, total, name) {
var v = name ? { name: name } : null;
if (!done) return TH(v ? 'dash.cheer.begin' : 'dash.cheer.begin_noname', v) + ' 🚀';
if (total && done >= total) return TH(v ? 'dash.cheer.done' : 'dash.cheer.done_noname', v) + ' 🏆';
if (total && done >= total * 0.6) return TH(v ? 'dash.cheer.almost' : 'dash.cheer.almost_noname', v) + ' 🔥';
return TH(v ? 'dash.cheer.keep' : 'dash.cheer.keep_noname', v) + ' 💪';
}
function practiceCard() {
var s;
try { s = createTrack().practiceSummary('math'); } catch (e) { return ''; }
if (!s || !s.tries) return '';
return '<section class="card">' +
'<div class="sec-h">🧮 Math practice</div>' +
'<p class="sec-sub" style="margin:.2rem 0 .6rem">' +
'<strong>' + s.chapters + '</strong> chapter' + (s.chapters === 1 ? '' : 's') +
' tried · <strong>' + s.tries + '</strong> go' + (s.tries === 1 ? '' : 'es') +
(s.last ? ' · last on ' + esc(s.last) : '') +
'</p>' +
'<p class="sec-sub" style="margin:0">Practice only — this is not part of any score.</p>' +
'</section>';
}
function renderDashboard(el) {
if (!el.id && !document.getElementById('main-content')) el.id = 'main-content';
if (document.readyState === 'loading' && !el._dashDeferred) {
el._dashDeferred = 1;
document.addEventListener('DOMContentLoaded', function () { renderDashboard(el); });
}
var levels = dashLevels(el);
if (acct() && !acct().getCurrentUserId()) {
el.innerHTML = '';
var login = document.createElement('edux-login');
login.setAttribute('redirect', location.href);
if (attr(el, 'pick')) login.setAttribute('pick', attr(el, 'pick'));
el.appendChild(login);
return;
}
var all = seenAll(), who = acctCurrent();
var badgeFn = window[attr(el, 'badges')];
var passPct = parseInt(attr(el, 'pass-pct'), 10) || 70;
var tab = el.getAttribute('data-tab') || 'chapters';
var doneCh = 0, totalCh = 0, sumPct = 0, anyRec = false;
var calm = attr(el, 'not-started') === 'calm';
levels.forEach(function (lv) {
(lv.chapters || []).forEach(function (c) { if (seenFind(all, c.href)) anyRec = true; });
});
var fresh = calm && !anyRec;
var levelHtml = levels.map(function (lv) {
var lvDone = 0;
var cells = (lv.chapters || []).map(function (c) {
var rec = seenFind(all, c.href);
var pct = seenPct(rec);
totalCh++; sumPct += pct;
if (pct >= 100) { doneCh++; lvDone++; }
var badge = '';
if (typeof badgeFn === 'function') { try { badge = badgeFn(c.href) || ''; } catch (e) {} }
return '<a class="ch-cell ' + (pct >= 100 ? 'done' : pct > 5 ? 'studied' : 'new') + '" href="' + esc(c.href) + '">' +
'<span class="ch-num">' + chNum(c.num) + '</span>' +
'<span class="ch-ttl">' + esc(c.title || '') + '</span>' +
(badge ? '<span class="ch-badge">' + esc(badge) + '</span>' : '') +
'<span class="ch-bar"><i style="width:' + pct + '%"></i></span>' +
'</a>';
}).join('');
return '<section class="card"' + tones(lv, 'lc') + '><div class="sec-h">' + esc(lv.level || '') + '</div>' +
'<p class="sec-sub">' + (fresh ? TH('dash.n_chapters', { n: (lv.chapters || []).length })
: TH('dash.lv_finished', { x: lvDone, n: (lv.chapters || []).length })) + '</p>' +
'<div class="ch-grid">' + cells + '</div></section>';
}).join('');
var overall = totalCh ? Math.round(sumPct / totalCh) : 0;
var head = fresh
? '<section class="card"><div class="sec-h">🌱 ' + TH('dash.not_started') + '</div>' +
'<p class="sec-sub" style="margin:.2rem 0 0">' +
(who && (who.name || who.id) ? TH('dash.not_started_sub', { name: who.name || who.id })
: TH('dash.not_started_sub_noname')) + '</p></section>'
: '<section class="card"><div class="prog-row">' +
'<div style="flex:1"><div class="sec-h">' + cheerLine(doneCh, totalCh, who && (who.name || who.id)) + '</div>' +
'<p class="sec-sub" style="margin:.2rem 0 0">' + THR('dash.of_n_complete', { x: doneCh, n: totalCh }, 'strong') + '</p></div>' +
'<div>' + ringSvg(overall) + '</div></div></section>';
var switcher = '<div class="dash-tabs" role="tablist">' +
'<button type="button" role="tab" class="dash-tab' + (tab === 'chapters' ? ' active' : '') + '" data-dash-tab="chapters">📚 ' + TH('term.chapters') + '</button>' +
'<button type="button" role="tab" class="dash-tab' + (tab === 'progress' ? ' active' : '') + '" data-dash-tab="progress">📈 ' + TH('dash.tab_progress') + '</button>' +
'</div>';
var body = tab === 'chapters'
? head + levelHtml
: '<edux-attendance></edux-attendance>' + practiceCard() +
(attr(el, 'scores') === 'off' ? '' :
'<edux-score-report pass-pct="' + passPct + '"' +
'></edux-score-report>') +
(attr(el, 'print') !== 'off'
? '<section class="card" style="text-align:center"><button type="button" class="btn-outline" data-dash-print>🖨️ ' + TH('dash.print') + '</button>' +
'<p class="sec-sub" style="margin:.6rem 0 0">' + TH('dash.print_sub') + '</p></section>'
: '');
el.innerHTML = '<div class="prog-dash">' + switcher + body + '</div>';
el.querySelectorAll('[data-dash-tab]').forEach(function (b) {
b.addEventListener('click', function () {
el.setAttribute('data-tab', b.getAttribute('data-dash-tab'));
renderDashboard(el);
});
});
var pr = el.querySelector('[data-dash-print]');
var reportId = attr(el, 'report');
if (pr) pr.addEventListener('click', function () { dashPrint(levels, who, reportId); });
}
function dashReportRows(id) {
if (!id) return null;
var all = seenAll(), groups = [], by = {};
var levels;
try { levels = JSON.parse((document.getElementById(id) || {}).textContent || '[]'); } catch (e) { levels = []; }
levels.forEach(function (lv) {
var n = 0, done = 0, started = 0;
(lv.chapters || []).forEach(function (c) {
var rec = seenFind(all, c.href);
n++;
if (!rec) return;
if (seenPct(rec) >= 100) done++; else started++;
});
if (!done && !started) return;
var g = lv.group || '';
if (!by[g]) { by[g] = []; groups.push(g); }
by[g].push('<tr><td>' + esc(g) + '</td><td>' + esc(lv.level || '') + '</td><td>' + TH('report.x_of_n', { x: done, n: n }) +
'</td><td>' + started + '</td></tr>');
});
return groups.map(function (g) { return by[g].join(''); }).join('');
}
function dashPrint(levels, who, reportId) {
var t = createTrack(null), sc = createScore(null);
var chRows = dashReportRows(reportId);
var att = t.merged(), sum = t.summary(), s = sc.summary();
var name = (who && (who.name || who.id)) || T('report.student');
var rows = s.list.map(function (a) {
return '<tr><td>' + esc(a.title || a.chapterId) + '</td><td>' + a.total + '/' + a.max +
'</td><td>' + a.pct + '%</td><td>' + esc(a.completedAt || '—') + '</td></tr>';
}).join('');
var areas = s.byArea.map(function (a) {
return '<tr><td>' + esc(a.label) + '</td><td>' + a.avg.toFixed(1) + (a.max ? ' / ' + a.max : '') + '</td></tr>';
}).join('');
var attRows = att.slice(-28).map(function (d) {
return '<tr><td>' + d.date + '</td><td>' + esc(T('report.min', { n: d.minutes })) + '</td></tr>';
}).join('');
var w = window.open('', '_blank');
if (!w) { alert(T('report.popup')); return; }
w.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + esc(T('report.doc_title', { name: name })) + '</title>' +
'<style>body{font-family:system-ui,sans-serif;max-width:720px;margin:2rem auto;padding:0 1.5rem;color:#1e293b;font-size:14px}' +
'h1{font-size:1.3rem;border-bottom:2px solid #e2e8f0;padding-bottom:.5rem}' +
'h2{font-size:.9rem;text-transform:uppercase;letter-spacing:.05em;margin:1.4rem 0 .5rem;color:#475569}' +
'table{width:100%;border-collapse:collapse}th,td{border:1px solid #e2e8f0;padding:.35rem .5rem;font-size:.78rem;text-align:left}' +
'th{background:#f8fafc}.sum{display:flex;gap:2rem;margin:.75rem 0 1.5rem}.sn{font-size:1.5rem;font-weight:800}' +
'.sl{font-size:.7rem;color:#64748b}@media print{.pbtn{display:none}}</style></head><body>' +
'<button class="pbtn" style="float:right" onclick="window.print()">🖨️ ' + esc(T('report.print')) + '</button>' +
'<h1>' + esc(T('report.h')) + '</h1><p><strong>' + esc(name) + '</strong> · ' + today() + '</p>' +
'<h2>' + esc(T('report.att_h')) + '</h2><div class="sum">' +
'<div><div class="sn">' + sum.days + '</div><div class="sl">' + esc(T('att.days')) + '</div></div>' +
'<div><div class="sn">' + sum.totalMins + '</div><div class="sl">' + esc(T('att.mins')) + '</div></div>' +
'<div><div class="sn">' + sum.avgMins + '</div><div class="sl">' + esc(T('att.avg')) + '</div></div></div>' +
(attRows ? '<table><tr><th>' + esc(T('report.date')) + '</th><th>' + esc(T('report.time')) + '</th></tr>' + attRows + '</table>'
: '<p>' + esc(T('report.no_sessions')) + '</p>') +
(chRows ? '<h2>' + TH('report.chapters') + '</h2><table><tr><th>' + TH('report.band') + '</th><th>' +
TH('report.level') + '</th><th>' + TH('report.finished') + '</th><th>' + TH('report.started') + '</th></tr>' +
chRows + '</table>' : '') +
(s.count ? '<h2>' + esc(T('score.h')) + '</h2><div class="sum">' +
'<div><div class="sn">' + s.count + '</div><div class="sl">' + esc(T('score.completed')) + '</div></div>' +
'<div><div class="sn">' + s.avgPct + '%</div><div class="sl">' + esc(T('score.average')) + '</div></div>' +
'<div><div class="sn">' + s.trend + '</div><div class="sl">' + esc(T('score.trend')) + '</div></div></div>' +
(areas ? '<table><tr><th>' + esc(T('report.area')) + '</th><th>' + esc(T('score.average')) + '</th></tr>' + areas + '</table>' : '') +
'<h2>' + esc(T('report.results')) + '</h2><table><tr><th>' + esc(T('report.chapter')) + '</th><th>' + esc(T('report.score')) +
'</th><th>%</th><th>' + esc(T('report.date')) + '</th></tr>' + rows + '</table>'
: chRows !== null ? '' : '<h2>' + esc(T('score.h')) + '</h2><p>' + esc(T('report.no_assess')) + '</p>') +
'</body></html>');
w.document.close();
}
define('edux-progress', renderProgress);
define('edux-dashboard', renderDashboard);
define('edux-login', renderLogin);
define('edux-admin', renderAdmin);
define('edux-teacher-gate', renderAdmin);
window.EDUXChrome = {
t: T, tn: TN,
applyAuthState: applyAuthState, isLoggedIn: isLoggedIn, uniquifyName: uniquifyName,
textScale: { min: TMIN, max: TMAX, get: readScale, apply: applyScale,
pctToScale: pctToScale, scaleToPct: scaleToPct },
seen: { all: seenAll, mark: seenMark, key: seenKey, pct: seenPct, find: seenFind, cur: seenCur },
account: { prefix: acctPrefix, auth: acct, current: acctCurrent, users: acctUsers, store: acctStore,
repaint: repaintBadges },
guard: {
open: gOpen, require: gRequire, lock: gLock, promo: promoHtml, trash: gTrash, restore: gRestore,
until: function (x) { return dayOf(new Date(x.at + G_KEEP).toISOString()); },
remove: function (prefix, id) {
var u = window.EDUXAuth.create({ prefix: prefix }).getUsers().filter(function (x) { return x.id === id; })[0];
return gAsk({ title: T('guard.del_title', { name: (u && u.name) || id }), sub: T('guard.del_sub'), go: T('guard.del_go') })
.then(function (ok) { return ok ? gToTrash(prefix, id) : null; });
},
},
};
function createAuth(opts) {
opts = opts || {};
var keyFor = opts.keyFor || function (s) { return (opts.prefix || '') + s; };
var idFallback = opts.idFallback || 'user-';
function _ls(key, fb) { try { var v = localStorage.getItem(key); return v !== null ? (JSON.parse(v) || fb) : fb; } catch (e) { return fb; } }
function _lsSet(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }
function deriveId(name) {
var id = String(name).trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
return id || (idFallback + Date.now());
}
function getUsers() { return _ls(keyFor('users'), []); }
function setUsers(arr) { _lsSet(keyFor('users'), arr); }
function getCurrentUserId() { try { return localStorage.getItem(keyFor('currentUser')) || null; } catch (e) { return null; } }
function track() { var p = keyFor(''); return p ? createTrack(p) : null; }
function setCurrentUser(id) {
var prev = getCurrentUserId(), t = prev !== id ? track() : null;
if (t && prev) { try { t.end(); } catch (e) {} }
try { localStorage.setItem(keyFor('currentUser'), id); } catch (e) {}
if (t && id) { try { t.settle(id); } catch (e) {} }
}
function clearCurrentUser() {
var t = getCurrentUserId() ? track() : null;
if (t) { try { t.end(); } catch (e) {} }
try { localStorage.removeItem(keyFor('currentUser')); } catch (e) {}
}
function getCurrentUser() {
var uid = getCurrentUserId(); if (!uid) return null;
var u = getUsers(); for (var i = 0; i < u.length; i++) if (u[i].id === uid) return u[i];
return null;
}
function uniqueId(name) {
var base = deriveId(name), id = base, k = 2, ids = getUsers().map(function (u) { return u.id; });
ids.push('guest');
while (ids.indexOf(id) !== -1) { id = base + '-' + k; k++; }
return id;
}
function upsertUser(id, name) {
var now = new Date().toISOString(), users = getUsers(), found = false;
for (var i = 0; i < users.length; i++) { if (users[i].id === id) { users[i].lastSeen = now; if (name) users[i].name = name; found = true; break; } }
if (!found) users.push({ id: id, name: name || id, lastSeen: now });
setUsers(users); setCurrentUser(id);
return { id: id, name: name || id, lastSeen: now };
}
function registerDistinct(name) {
name = String(name).trim() || 'Student';
var id = uniqueId(name), now = new Date().toISOString(), users = getUsers();
users.push({ id: id, name: name, lastSeen: now }); setUsers(users); setCurrentUser(id);
return { id: id, name: name, lastSeen: now };
}
function loginById(id) {
var now = new Date().toISOString(), users = getUsers(), user = null;
for (var i = 0; i < users.length; i++) { if (users[i].id === id) { users[i].lastSeen = now; user = users[i]; break; } }
if (user) { setUsers(users); setCurrentUser(id); }
return user;
}
function removeUser(id, o) {
var purged = 0, purge = false;
if (o && o.purge && id) {
var p = keyFor(id + ':'), doomed = [];
try {
if (localStorage.getItem(p + 'users') === null) {
purge = true;
for (var i = 0; i < localStorage.length; i++) {
var k = localStorage.key(i);
if (k && k.indexOf(p) === 0) doomed.push(k);
}
}
doomed.forEach(function (k) { localStorage.removeItem(k); purged++; });
} catch (e) {}
}
setUsers(getUsers().filter(function (u) { return u.id !== id; }));
if (getCurrentUserId() === id) clearCurrentUser();
try {
document.dispatchEvent(new CustomEvent('edux:user-removed',
{ detail: { prefix: keyFor(''), id: id, purge: purge, purged: purged } }));
} catch (e) {}
}
return {
_ls: _ls, _lsSet: _lsSet, keyFor: keyFor, deriveId: deriveId,
getUsers: getUsers, setUsers: setUsers,
getCurrentUserId: getCurrentUserId, setCurrentUser: setCurrentUser, clearCurrentUser: clearCurrentUser,
getCurrentUser: getCurrentUser, uniqueId: uniqueId,
upsertUser: upsertUser, registerDistinct: registerDistinct, loginById: loginById, removeUser: removeUser,
};
}
window.EDUXAuth = { create: createAuth };
var _recAudioEl = null;
function recorderSupported() {
return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
}
function createRecorder(opts) {
opts = opts || {};
var mr = null, chunks = [], url = null, state = 'idle';
function set(s) { state = s; if (opts.onState) { try { opts.onState(s); } catch (e) {} } }
var api = {
supported: recorderSupported(),
get state() { return state; },
get url() { return url; },
async toggle() {
if (state === 'recording') { if (mr) mr.stop(); return; }
try {
var stream = await navigator.mediaDevices.getUserMedia({ audio: true });
if (url) { URL.revokeObjectURL(url); url = null; }
chunks = [];
mr = new MediaRecorder(stream);
mr.ondataavailable = function (e) { if (e.data && e.data.size > 0) chunks.push(e.data); };
mr.onstop = function () {
url = URL.createObjectURL(new Blob(chunks, { type: mr.mimeType || 'audio/webm' }));
stream.getTracks().forEach(function (t) { t.stop(); });
set('recorded');
};
mr.start();
set('recording');
} catch (e) {
set('denied');
}
},
play: function () {
if (!url) return;
if (_recAudioEl) { try { _recAudioEl.pause(); } catch (e) {} }
_recAudioEl = new Audio(url);
_recAudioEl.play().catch(function () {});
},
};
return api;
}
window.EDUXRecorder = { create: createRecorder, get supported() { return recorderSupported(); } };
var TRACK_DEFAULTS = {
sessionTimeoutMs: 8 * 3600 * 1000,
heartbeatMs: 60 * 1000,
dayCapMin: 720,
retainDays: 90,
summaryDays: 28,
idleMs: 5 * 60 * 1000,
frameGraceMs: 5 * 60 * 1000,
};
var _act = { at: 0, frameAt: 0, hiddenAt: 0, blurred: false };
var ACT_CARRY = 'edux:inputAt';
(function bindActivity() {
function note() { _act.at = Date.now(); }
try {
var c = parseInt(sessionStorage.getItem(ACT_CARRY), 10);
if (c > 0 && c <= Date.now()) _act.at = c;
} catch (e) {}
var o = { capture: true, passive: true };
['pointerdown', 'pointermove', 'keydown', 'input', 'touchstart', 'wheel'].forEach(function (t) {
try { window.addEventListener(t, note, o); } catch (e) {}
});
try {
window.addEventListener('pagehide', function () {
try { sessionStorage.setItem(ACT_CARRY, String(_act.at)); } catch (e) {}
}, o);
} catch (e) {}
try {
window.addEventListener('focus', function (e) {
if (e.target !== window) note();
else if (_act.blurred) { _act.blurred = false; note(); }
}, o);
window.addEventListener('blur', function (e) {
if (e.target !== window) return;
_act.blurred = true;
setTimeout(function () {
var a = document.activeElement;
if (a && a.tagName === 'IFRAME') { _act.frameAt = Date.now(); note(); }
}, 0);
}, o);
document.addEventListener('visibilitychange', function () {
if (document.visibilityState === 'hidden') _act.hiddenAt = Date.now();
else note();
}, true);
} catch (e) {}
})();
function mediaPlaying() {
try {
if (window.speechSynthesis && window.speechSynthesis.speaking) return true;
var m = document.querySelectorAll('audio, video');
for (var i = 0; i < m.length; i++) if (!m[i].paused && !m[i].ended && !m[i].muted) return true;
} catch (e) {}
return false;
}
function inUseUntil(now) {
var until = _act.at ? _act.at + tOpt('idleMs') : 0;
var hidden = document.visibilityState === 'hidden';
if (hidden) until = Math.min(until, _act.hiddenAt);
var a = document.activeElement;
if (!hidden && a && a.tagName === 'IFRAME' && _act.frameAt)
until = Math.max(until, Math.min(now, _act.frameAt + tOpt('frameGraceMs')) + tOpt('idleMs'));
if (mediaPlaying()) until = now;
return until;
}
var _beatAt = {};
function trackCfg() { return window.EDUX_TRACK || {}; }
function tOpt(name) { var c = trackCfg(); return c[name] != null ? c[name] : TRACK_DEFAULTS[name]; }
function localDate(d) {
var m = d.getMonth() + 1, day = d.getDate();
return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (day < 10 ? '0' : '') + day;
}
function today() { return localDate(new Date()); }
function daysAgo(n) { var d = new Date(); d.setDate(d.getDate() - n); return localDate(d); }
function dayOf(v) {
var s = String(v || '');
if (s.length > 10 && s.charAt(10) === 'T') { var d = new Date(s); if (!isNaN(d.getTime())) return localDate(d); }
return s.slice(0, 10);
}
function createTrack(prefix) {
function pfx() { return prefix || trackCfg().prefix || acctPrefix() || ''; }
function uid(u) {
if (u) return u;
var p = pfx(); if (!p) return null;
try { return localStorage.getItem(p + 'currentUser') || null; } catch (e) { return null; }
}
function K(u, suffix) { return pfx() + u + ':' + suffix; }
function rd(key, fb) { try { var v = localStorage.getItem(key); return v !== null ? (JSON.parse(v) || fb) : fb; } catch (e) { return fb; } }
function wr(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }
function raw(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
function del(key) { try { localStorage.removeItem(key); } catch (e) {} }
function commit(u, minutes, date) {
if (!u || !(minutes > 0)) return;
var key = K(u, 'sessions'), list = rd(key, []), cap = tOpt('dayCapMin'), hit = false;
for (var i = 0; i < list.length; i++) {
if (list[i].date === date) { list[i].minutes = Math.min(cap, (list[i].minutes || 0) + minutes); hit = true; break; }
}
if (!hit) list.push({ date: date, minutes: Math.min(cap, minutes) });
list.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
var cutoff = daysAgo(tOpt('retainDays'));
wr(key, list.filter(function (s) { return s.date >= cutoff; }));
}
function finalize(u) {
var sess = rd(K(u, 'sess'), null);
if (!sess || !sess.start) return;
var ms;
if (typeof sess.ms === 'number') ms = sess.ms;
else {
var la = parseInt(raw(K(u, 'last_active')), 10);
ms = ((la && la > 0) ? la : Date.now()) - new Date(sess.start).getTime();
}
commit(u, Math.round(ms / 60000), sess.date || today());
del(K(u, 'sess')); del(K(u, 'last_active'));
}
function openSess(u) { wr(K(u, 'sess'), { start: new Date().toISOString(), date: today(), ms: 0, upto: 0 }); }
function credit(u, now) {
var p = pfx(), from = _beatAt[p] || 0;
_beatAt[p] = now;
if (!u || !from) return;
var sess = rd(K(u, 'sess'), null);
if (!sess || typeof sess.ms !== 'number') return;
var lo = Math.max(from, sess.upto || 0), hi = Math.min(now, inUseUntil(now));
if (hi <= lo) return;
if (sess.date && sess.date !== today()) { finalize(u); openSess(u); sess = rd(K(u, 'sess'), null); }
sess.ms += Math.min(hi - lo, tOpt('heartbeatMs') * 1.5);
sess.upto = hi;
wr(K(u, 'sess'), sess);
}
var _timer = null, _bound = false;
function stale(u) {
var la = parseInt(raw(K(u, 'last_active')), 10);
return !!(la && (Date.now() - la) > tOpt('sessionTimeoutMs'));
}
function beat(u) {
u = uid(u); if (!u) return;
var now = Date.now();
if (stale(u)) {
_beatAt[pfx()] = now;
if (u === uid()) expire(); else { finalize(u); del(K(u, 'last_active')); }
return;
}
credit(u, now);
try { localStorage.setItem(K(u, 'last_active'), String(now)); } catch (e) {}
}
function expire() {
var u = uid(); if (!u || !stale(u)) return false;
finalize(u);
del(K(u, 'last_active'));
del(pfx() + 'currentUser');
expiredOnPage(pfx(), u);
return true;
}
function settle(u) {
if (!u) return;
finalize(u);
del(K(u, 'last_active'));
}
function start() {
if (expire()) return false;
var u = uid(); if (!u) return false;
var d = today(), sess = rd(K(u, 'sess'), null);
if (sess && sess.date && sess.date !== d) { finalize(u); sess = null; }
if (sess && typeof sess.ms !== 'number') { finalize(u); sess = null; }
if (!sess) openSess(u);
beat(u);
if (_timer) clearInterval(_timer);
_timer = setInterval(function () { beat(); }, tOpt('heartbeatMs'));
if (!_bound) {
_bound = true;
var leave = function () { beat(); };
window.addEventListener('beforeunload', leave);
window.addEventListener('pagehide', leave);
}
return true;
}
function end() {
if (_timer) { clearInterval(_timer); _timer = null; }
var u = uid(); if (u) { credit(u, Date.now()); finalize(u); }
}
function sessions(u) { u = uid(u); return u ? rd(K(u, 'sessions'), []) : []; }
function live(u) {
u = uid(u); if (!u) return null;
var sess = rd(K(u, 'sess'), null);
if (!sess || !sess.start) return null;
var d = today();
if (sess.date && sess.date !== d) return null;
var mins = Math.round((typeof sess.ms === 'number' ? sess.ms
: Date.now() - new Date(sess.start).getTime()) / 60000);
return mins > 0 ? { date: sess.date || d, minutes: Math.min(tOpt('dayCapMin'), mins) } : null;
}
function merged(u) {
var out = sessions(u).map(function (s) { return { date: s.date, minutes: s.minutes, live: false }; });
var lv = live(u);
if (lv) {
var hit = false;
for (var i = 0; i < out.length; i++) {
if (out[i].date === lv.date) { out[i].minutes = Math.min(tOpt('dayCapMin'), out[i].minutes + lv.minutes); out[i].live = true; hit = true; break; }
}
if (!hit) out.push({ date: lv.date, minutes: lv.minutes, live: true });
}
out.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
return out;
}
function summary(u, days) {
var cutoff = daysAgo(days || tOpt('summaryDays'));
var recent = merged(u).filter(function (s) { return s.date >= cutoff; });
var total = recent.reduce(function (n, s) { return n + (s.minutes || 0); }, 0);
return { days: recent.length, totalMins: total, avgMins: recent.length ? Math.round(total / recent.length) : 0 };
}
function clear(u) { u = uid(u); if (!u) return; del(K(u, 'sessions')); del(K(u, 'sess')); del(K(u, 'last_active')); }
function practice(kind, chapterId, u) {
u = uid(u); if (!u || !kind || !chapterId) return;
var key = K(u, 'practice'), all = rd(key, {});
var slot = all[kind] || (all[kind] = {});
var rec = slot[chapterId] || (slot[chapterId] = { tries: 0, last: '' });
rec.tries = (rec.tries || 0) + 1;
rec.last = today();
wr(key, all);
}
function practiceSummary(kind, u) {
u = uid(u); if (!u) return { chapters: 0, tries: 0, last: '' };
var slot = (rd(K(u, 'practice'), {}) || {})[kind] || {};
var ids = Object.keys(slot), tries = 0, last = '';
ids.forEach(function (id) {
tries += slot[id].tries || 0;
if ((slot[id].last || '') > last) last = slot[id].last || '';
});
return { chapters: ids.length, tries: tries, last: last };
}
return {
prefix: pfx, userId: uid, key: K, start: start, expire: expire, settle: settle, end: end, beat: beat, commit: commit,
sessions: sessions, live: live, merged: merged, summary: summary, clear: clear,
practice: practice, practiceSummary: practiceSummary,
_read: rd, _write: wr, _del: del,
};
}
function attendanceSvg(rows, opts) {
opts = opts || {};
var COLS = 7, ROWS = Math.ceil((opts.days || TRACK_DEFAULTS.summaryDays) / COLS);
var PL = 36, PT = 18, CW = 30, CH = 30, GAP = 7;
var W = PL + COLS * (CW + GAP) - GAP + 4, H = PT + ROWS * (CH + GAP) - GAP + 4;
var map = {}, liveDays = {};
(rows || []).forEach(function (s) {
map[s.date] = (map[s.date] || 0) + s.minutes;
if (s.live) liveDays[s.date] = true;
});
var t = new Date(); t.setHours(12, 0, 0, 0);
var todayStr = localDate(t);
var back = t.getDay() + (ROWS - 1) * COLS;
var days = [], peak = 10;
for (var i = 0; i < ROWS * COLS; i++) {
var c0 = new Date(t.getTime()); c0.setDate(t.getDate() - back + i);
var ds = localDate(c0);
days.push(ds); if ((map[ds] || 0) > peak) peak = map[ds];
}
var DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;max-width:19rem;display:block;margin:0 auto" role="img"' + TQ('aria-label', 'att.calendar') + '>';
for (var c = 0; c < COLS; c++) {
s += '<text x="' + (PL + c * (CW + GAP) + CW / 2).toFixed(0) + '" y="' + (PT - 5) + '" text-anchor="middle" font-size="9" font-weight="700" fill="#aab0cc">' + DOW[c] + '</text>';
}
for (var r = 0; r < ROWS; r++) {
var d0 = days[r * COLS];
s += '<text x="' + (PL - 7) + '" y="' + (PT + r * (CH + GAP) + CH / 2 + 4) + '" text-anchor="end" font-size="9" font-weight="700" fill="#aab0cc">' +
parseInt(d0.slice(5, 7), 10) + '/' + parseInt(d0.slice(8, 10), 10) + '</text>';
}
for (var k = 0; k < days.length; k++) {
var ri = Math.floor(k / COLS), ci = k % COLS, dt = days[k], mins = map[dt] || 0;
var x = PL + ci * (CW + GAP), y = PT + ri * (CH + GAP);
var future = dt > todayStr, live = !!liveDays[dt] && !future;
var st, op, tip, extra = '';
if (future) { st = 'fill:#f4f5fb'; op = '1'; tip = ''; extra = ' stroke="#edeef6" stroke-dasharray="2,2"'; }
else if (!mins) { st = 'fill:#e2e8f0'; op = '1'; tip = dt + ': no study'; }
else {
st = 'fill:var(--color-accent)';
op = Math.max(0.4, Math.min(1, mins / peak)).toFixed(2);
tip = dt + ': ' + mins + ' min' + (live ? ' (studying now)' : '');
}
if (live) { st += ';stroke:var(--color-accent-deep)'; extra = ' stroke-width="2"'; }
s += '<rect x="' + x + '" y="' + y + '" width="' + CW + '" height="' + CH + '" rx="7" style="' + st +
'" opacity="' + op + '"' + extra + '>' + (tip ? '<title>' + esc(tip) + '</title>' : '') + '</rect>';
}
return s + '</svg>';
}
function declaredAreas() { return trackCfg().areas || []; }
function normalizeScore(chapterId, rawRec) {
if (!rawRec || typeof rawRec !== 'object') return null;
var decl = declaredAreas(), areas = [], i;
function push(key, label, score, max) {
if (score == null) return;
areas.push({ key: key, label: label || key, score: Number(score) || 0, max: Number(max) || 0 });
}
function declOf(key) {
for (var j = 0; j < decl.length; j++) if (decl[j].key === key) return decl[j];
return null;
}
if (Array.isArray(rawRec.areas)) {
rawRec.areas.forEach(function (a) { push(a.key, a.label, a.score, a.max); });
} else if (rawRec.areas && typeof rawRec.areas === 'object') {
Object.keys(rawRec.areas).forEach(function (k) {
var raw = rawRec.areas[k], d = declOf(k);
var a = (raw && typeof raw === 'object') ? raw
: (typeof raw === 'number' ? { score: raw } : {});
push(k, a.label || (d && d.label), a.score != null ? a.score : a.correct,
a.max != null ? a.max : (a.total != null ? a.total : (d && d.max)));
});
} else {
for (i = 0; i < decl.length; i++) {
var d2 = decl[i], cell = rawRec[d2.key];
if (cell && typeof cell === 'object' && cell.score != null) push(d2.key, d2.label, cell.score, d2.max);
}
}
if (!areas.length && rawRec.total == null) return null;
var total = rawRec.total != null ? Number(rawRec.total)
: areas.reduce(function (n, a) { return n + a.score; }, 0);
var max = rawRec.max != null ? Number(rawRec.max)
: (areas.length ? areas.reduce(function (n, a) { return n + a.max; }, 0)
: Number(trackCfg().totalMax) || 0);
return {
v: 1, chapterId: chapterId, areas: areas, total: total, max: max,
pct: rawRec.pct != null ? Number(rawRec.pct) : (max ? Math.round((total / max) * 100) : 0),
title: rawRec.title || '', completedAt: rawRec.completedAt || rawRec.date || null,
};
}
function createScore(prefix) {
var tr = createTrack(prefix);
function save(chapterId, rec) {
try { tr.expire(); } catch (e) {}
var norm = chapterId ? normalizeScore(chapterId, rec) : null;
if (norm) emitDoc('edux:checkup-result', { chapterId: chapterId, pct: norm.pct, total: norm.total, max: norm.max });
var u = tr.userId(); if (!u || !norm) return null;
if (!norm.completedAt) norm.completedAt = today();
tr._write(tr.key(u, 'assess:' + chapterId), norm);
try { localStorage.setItem(tr.key(u, 'completed:' + chapterId), norm.completedAt); } catch (e) {}
return norm;
}
function all(u) {
u = tr.userId(u); if (!u) return [];
var head = tr.key(u, 'assess:'), out = [];
try {
for (var i = 0; i < localStorage.length; i++) {
var k = localStorage.key(i);
if (k && k.indexOf(head) === 0) {
var n = normalizeScore(k.slice(head.length), tr._read(k, null));
if (n) out.push(n);
}
}
} catch (e) {}
out.sort(function (a, b) { return a.chapterId < b.chapterId ? -1 : a.chapterId > b.chapterId ? 1 : 0; });
return out;
}
function summary(u) {
var list = all(u), n = list.length;
if (!n) return { count: 0, avg: 0, avgPct: 0, trend: '—', byArea: [], list: [] };
var sumTotal = list.reduce(function (s, a) { return s + a.total; }, 0);
var sumPct = list.reduce(function (s, a) { return s + a.pct; }, 0);
var acc = {}, order = [];
list.forEach(function (rec) {
rec.areas.forEach(function (a) {
if (!acc[a.key]) { acc[a.key] = { key: a.key, label: a.label, sum: 0, max: a.max, n: 0 }; order.push(a.key); }
acc[a.key].sum += a.score; acc[a.key].n++;
if (a.max > acc[a.key].max) acc[a.key].max = a.max;
});
});
var byArea = order.map(function (k) {
var a = acc[k];
return { key: k, label: a.label, avg: a.n ? a.sum / a.n : 0, max: a.max };
});
if (n >= 2 && byArea.length) {
var hi = Math.max.apply(null, byArea.map(function (a) { return a.avg; }));
var lo = Math.min.apply(null, byArea.map(function (a) { return a.avg; }));
byArea.forEach(function (a) { a.best = a.avg === hi; a.weak = a.avg === lo && lo < hi; });
}
var trend = n < 2 ? '—' : (list[n - 1].pct > list[0].pct ? '↑' : list[n - 1].pct < list[0].pct ? '↓' : '→');
return { count: n, avg: +(sumTotal / n).toFixed(1), avgPct: Math.round(sumPct / n), trend: trend, byArea: byArea, list: list };
}
function clear(u) {
u = tr.userId(u); if (!u) return;
var head = tr.key(u, 'assess:'), doomed = [];
try {
for (var i = 0; i < localStorage.length; i++) {
var k = localStorage.key(i);
if (k && (k.indexOf(head) === 0 || k.indexOf(tr.key(u, 'completed:')) === 0)) doomed.push(k);
}
} catch (e) {}
doomed.forEach(function (k) { tr._del(k); });
}
return { save: save, all: all, summary: summary, clear: clear, track: tr };
}
function scoreTrendSvg(list, opts) {
opts = opts || {};
if (!list || list.length < 2) return '';
var W = 380, H = 110, pX = 26, pY = 12;
var iW = W - 2 * pX, iH = H - 2 * pY, yB = pY + iH;
var pts = list.map(function (a, i) {
return [(pX + (i / (list.length - 1)) * iW).toFixed(1), (pY + (1 - Math.max(0, Math.min(100, a.pct)) / 100) * iH).toFixed(1), a];
});
var poly = pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' ');
var area = 'M' + pts[0][0] + ',' + pts[0][1];
for (var i = 1; i < pts.length; i++) area += 'L' + pts[i][0] + ',' + pts[i][1];
area += 'L' + pts[pts.length - 1][0] + ',' + yB + 'L' + pts[0][0] + ',' + yB + 'Z';
var pass = pY + (1 - (opts.passPct != null ? opts.passPct : 70) / 100) * iH;
var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;display:block;overflow:visible">';
s += '<line x1="' + pX + '" y1="' + yB + '" x2="' + (W - pX) + '" y2="' + yB + '" stroke="#e2e8f0"/>';
s += '<line x1="' + pX + '" y1="' + pass.toFixed(1) + '" x2="' + (W - pX) + '" y2="' + pass.toFixed(1) + '" stroke="#bbf7d0" stroke-width="1.5" stroke-dasharray="4,3"/>';
s += '<text x="' + (pX - 4) + '" y="' + (yB + 4) + '" text-anchor="end" font-size="9" fill="#94a3b8">0</text>';
s += '<text x="' + (pX - 4) + '" y="' + (pY + 9) + '" text-anchor="end" font-size="9" fill="#94a3b8">100</text>';
s += '<path d="' + area + '" style="fill:var(--color-accent)" opacity=".15"/>';
s += '<polyline points="' + poly + '" fill="none" style="stroke:var(--color-accent)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
for (var j = 0; j < pts.length; j++) {
var rec = pts[j][2];
s += '<circle cx="' + pts[j][0] + '" cy="' + pts[j][1] + '" r="4" style="fill:var(--color-accent)" stroke="#fff" stroke-width="2">' +
'<title>' + esc((rec.title || rec.chapterId) + ': ' + rec.pct + '%') + '</title></circle>';
s += '<text x="' + pts[j][0] + '" y="' + (H - 1) + '" text-anchor="middle" font-size="8" fill="#94a3b8">' + (j + 1) + '</text>';
}
return s + '</svg>';
}
function renderAttendance(el) {
var tr = createTrack(attr(el, 'prefix') || null);
if (!tr.prefix()) { el.innerHTML = ''; return; }
var days = parseInt(attr(el, 'days'), 10) || tOpt('summaryDays');
var rows = tr.merged(), sum = tr.summary(null, days);
var head = '<p class="sec-h">📅 ' + tattr(el, 'title', 'att.title') +
' <span class="sec-sub" style="display:inline">· ' + TH('att.last_weeks', { n: Math.round(days / 7) }) + '</span></p>';
var body;
if (!rows.length) {
body = '<p class="sec-sub">' + TH('att.none') + '</p>';
} else {
body = '<div class="prog-row" style="margin-bottom:1rem">' +
'<div><div class="stat-n">' + sum.days + '</div><div class="stat-l">' + TH('att.days') + '</div></div>' +
'<div><div class="stat-n">' + sum.totalMins + '</div><div class="stat-l">' + TH('att.mins') + '</div></div>' +
'<div><div class="stat-n">' + sum.avgMins + '</div><div class="stat-l">' + TH('att.avg') + '</div></div>' +
'</div>' + attendanceSvg(rows, { days: days });
}
el.innerHTML = '<div class="prog-dash"><section class="card">' + head + body + '</section></div>';
}
function renderScoreReport(el) {
var sc = createScore(attr(el, 'prefix') || null);
if (!sc.track.prefix()) { el.innerHTML = ''; return; }
var s = sc.summary();
if (!s.count) {
el.innerHTML = '<div class="prog-dash"><section class="card" style="text-align:center">' +
'<p class="sec-h">📋 ' + TH('score.none') + '</p>' +
'<p class="sec-sub">' + TH('score.none_sub') + '</p>' +
'</section></div>';
return;
}
var bars = s.byArea.map(function (a) {
var pct = a.max ? Math.round((a.avg / a.max) * 100) : 0;
var color = pct >= 80 ? '#16a34a' : pct >= 60 ? '#d97706' : '#dc2626';
var tag = a.best ? ' <span style="color:#16a34a;font-size:.75em">★ ' + TH('score.strongest') + '</span>'
: a.weak ? ' <span style="color:#dc2626;font-size:.75em">⚠ ' + TH('score.weak') + '</span>' : '';
return '<div style="margin-bottom:.65rem">' +
'<div style="display:flex;justify-content:space-between;margin-bottom:.22rem">' +
'<span style="font-size:.82rem;font-weight:600">' + esc(a.label) + tag + '</span>' +
'<span style="font-size:.82rem;font-weight:700;color:' + color + '">' + a.avg.toFixed(1) + (a.max ? '/' + a.max : '') + '</span>' +
'</div><div style="background:#e2e8f0;border-radius:999px;height:7px">' +
'<div style="width:' + pct + '%;height:100%;border-radius:999px;background:' + color + '"></div>' +
'</div></div>';
}).join('');
var chart = scoreTrendSvg(s.list, { passPct: parseInt(attr(el, 'pass-pct'), 10) || 70 });
el.innerHTML = '<div class="prog-dash"><section class="card">' +
'<p class="sec-h">📋 ' + TH('score.h') + '</p>' +
'<div class="prog-row" style="margin-bottom:1rem">' +
'<div><div class="stat-n">' + s.count + '</div><div class="stat-l">' + TH('score.completed') + '</div></div>' +
'<div><div class="stat-n">' + s.avgPct + '%</div><div class="stat-l">' + TH('score.average') + '</div></div>' +
'<div><div class="stat-n">' + s.trend + '</div><div class="stat-l">' + TH('score.trend') + '</div></div>' +
'</div>' + bars +
(chart ? '<p class="sec-sub" style="margin:1rem 0 .3rem">' + TH('score.chart_sub') + '</p>' + chart : '') +
'</section></div>';
}
define('edux-attendance', renderAttendance);
define('edux-score-report', renderScoreReport);
function autoStartTrack() {
if (trackCfg().autoStart === false) return;
if (!acctPrefix() && !trackCfg().prefix) return;
createTrack(null).start();
}
ready(autoStartTrack);
var ASSESS_AREA_LEVELS = [
{ min: 0.75, tier: 'high', label: 'Strong',      say: 'assess.say.got',    stars: 5, cls: 'level-strong',     ink: '#04785a', bar: '#06d6a0' },
{ min: 0.50, tier: 'mid',  label: 'Developing',  say: 'assess.say.almost', stars: 3, cls: 'level-developing', ink: '#a07000', bar: '#ffa726' },
{ min: 0,    tier: 'low',  label: 'Needs Focus', say: 'assess.say.again',  stars: 2, cls: 'level-needs',      ink: '#a02856', bar: '#ff5e7e' },
];
var ASSESS_GRADES = [
{ min: 0.85, label: 'Mastered',      say: 'assess.say.got',    ink: '#04785a' },
{ min: 0.70, label: 'Proficient',    say: 'assess.say.got',    ink: '#a07000' },
{ min: 0.55, label: 'Approaching',   say: 'assess.say.almost', ink: '#1a1a2e' },
{ min: 0,    label: 'Needs Support', say: 'assess.say.again',  ink: '#a02856' },
];
function pickBand(bands, v) {
for (var i = 0; i < bands.length; i++) if (v >= bands[i].min) return bands[i];
return bands[bands.length - 1];
}
function assessSay(label, pct) {
if (typeof pct === 'number' && isFinite(pct)) return T(pickBand(ASSESS_AREA_LEVELS, pct).say);
var all = ASSESS_GRADES.concat(ASSESS_AREA_LEVELS);
for (var i = 0; i < all.length; i++) if (all[i].label === label) return T(all[i].say);
return label || '';
}
function assessGrade(areaDefs) {
var areas = (areaDefs || []).map(function (a) {
var total = Number(a.total) || 0, correct = Number(a.correct) || 0;
var pct = total ? correct / total : 0;
var band = pickBand(ASSESS_AREA_LEVELS, pct);
return {
key: a.key, label: a.label || a.key, icon: a.icon || '',
correct: correct, total: total, pct: pct,
level: band.label, stars: band.stars, cls: band.cls,
};
});
var overall = areas.length
? areas.reduce(function (n, a) { return n + a.pct; }, 0) / areas.length : 0;
return {
areas: areas, overall: overall,
grade: pickBand(ASSESS_GRADES, overall).label,
totalPoints: areas.reduce(function (n, a) { return n + a.correct; }, 0),
maxPoints: areas.reduce(function (n, a) { return n + a.total; }, 0),
};
}
function assessReview(reviewMap, picks) {
var map = reviewMap || {};
return (picks || []).map(function (p) {
var meta = map[String(p.q)] || {};
var opts = meta.options || {};
var want = p.want || meta.correct || '';
if (!want) return null;
var mine = p.picked || '';
function text(letter) {
var o = opts[letter];
return o ? (o.text || '') : '';
}
var whyOpt = opts[mine] || {};
var wrong = !!mine && mine !== want;
return {
q: p.q, label: meta.label || p.q, area: meta.area || '', prompt: meta.prompt || '',
mine: mine, mineText: text(mine),
want: want, wantText: text(want),
trap: wrong ? (whyOpt.why || '') : '',
why: wrong ? (meta.why || '') : '',
ok: !!mine && mine === want,
};
}).filter(Boolean);
}
function reviewRow(kt, cls, label, letter, txt, note) {
return '<div class="ansrev__row ' + cls + '">' +
'<span class="ansrev__lbl">' + esc(label) + '</span>' +
'<span class="ansrev__val">' +
(letter ? '<b class="ansrev__ltr">' + esc(letter) + '</b>' : '') +
kt(txt || (letter ? '' : '—')) +
(note ? '<span class="ansrev__trap">' + kt(note) + '</span>' : '') +
'</span></div>';
}
function reviewCard(kt, it) {
var head = '<div class="ansrev__qh">' +
'<span class="ansrev__qn">' + esc(it.label || it.q) + '</span>' +
(it.area ? '<span class="ansrev__area">' + esc(it.area) + '</span>' : '') + '</div>' +
(it.prompt ? '<p class="ansrev__prompt">' + kt(it.prompt) + '</p>' : '');
if (it.open) {
return '<article class="ansrev__q ansrev__q--open">' + head +
(it.mineText ? reviewRow(esc, 'is-mine', 'You wrote', '', it.mineText) : '') +
reviewRow(esc, 'is-sample', 'Sample answer', '', it.sampleText || '') +
'</article>';
}
return '<article class="ansrev__q">' + head +
reviewRow(kt, 'is-mine', 'You chose', it.mine, it.mine ? it.mineText : 'No answer', it.trap) +
reviewRow(kt, 'is-want', 'Answer', it.want, it.wantText) +
(it.why ? '<p class="ansrev__why"><b>Why:</b> ' + kt(it.why) + '</p>' : '') +
'</article>';
}
function renderAnswerReview(el) {
var items = el._items || [];
if (!items.length) { el.innerHTML = ''; return; }
var graded = items.filter(function (i) { return !i.open; });
var wrong  = graded.filter(function (i) { return !i.ok; });
var open   = items.filter(function (i) { return i.open; });
var show   = wrong.concat(open);
if (!show.length) {
el.innerHTML = '<div class="ansrev ansrev--clean">🎉 <b>All ' + graded.length +
' correct.</b> Nothing to review this time.</div>';
return;
}
var tally = graded.length
? (wrong.length ? wrong.length + ' of ' + graded.length + ' to look at'
: 'All ' + graded.length + ' correct')
: '';
var texts = [];
function kt(t) { return '<span data-kt="' + (texts.push(t) - 1) + '"></span>'; }
el.innerHTML = '<details class="ansrev">' +
'<summary class="ansrev__sum">🔍 <b>See what you missed</b>' +
(tally ? '<span class="ansrev__tally">' + esc(tally) + '</span>' : '') + '</summary>' +
'<div class="ansrev__body">' + show.map(function (it) { return reviewCard(kt, it); }).join('') + '</div>' +
'</details>';
[].forEach.call(el.querySelectorAll('[data-kt]'), function (s) {
s.replaceWith(keyText(document.createDocumentFragment(), texts[s.dataset.kt]));
});
}
if (window.customElements && !customElements.get('edux-answer-review')) {
customElements.define('edux-answer-review', class extends HTMLElement {
connectedCallback() { renderAnswerReview(this); }
set items(v) { this._items = v || []; renderAnswerReview(this); }
get items() { return this._items || []; }
});
}
function assessRadarSvg(scores, opts) {
var areas = scores.areas || [];
var n = areas.length;
if (!n) return '';
var print = !!(opts && opts.mode === 'print');
var cx = 200, cy = 200, r = print ? 120 : 110, axes = [];
for (var i = 0; i < n; i++) {
var ang = -Math.PI / 2 + (i * 2 * Math.PI / n);
axes.push({ x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang) });
}
var svg = print
? '<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" width="320" height="320" ' +
'role="img" aria-label="Score by area" font-family="Georgia,serif">'
: '<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" ' +
'aria-label="Score by area" font-family="inherit">';
var RINGS = [0.25, 0.5, 0.75, 1];
RINGS.forEach(function (p) {
var outer = print && p === 1;
svg += '<polygon points="' + axes.map(function (a) {
return (cx + (a.x - cx) * p) + ',' + (cy + (a.y - cy) * p);
}).join(' ') + '" fill="none" stroke="' + (outer ? '#999' : print ? '#ddd' : '#dde2ee') +
'" stroke-width="' + (outer ? 1.5 : 1) + '"/>';
});
axes.forEach(function (a) {
svg += '<line x1="' + cx + '" y1="' + cy + '" x2="' + a.x + '" y2="' + a.y +
'" stroke="' + (print ? '#ccc' : '#dde2ee') + '" stroke-width="1"/>';
});
if (print) {
RINGS.forEach(function (p) {
var y = cy + (axes[0].y - cy) * p;
svg += '<text x="' + (cx + 4) + '" y="' + (y - 3) + '" font-size="8" fill="#aaa">' +
Math.round(p * 100) + '%</text>';
});
}
function at(a, i) { var v = Math.max(areas[i].pct, 0.02); return [cx + (a.x - cx) * v, cy + (a.y - cy) * v]; }
svg += '<polygon points="' + axes.map(function (a, i) { return at(a, i).join(','); }).join(' ') + '" ' +
(print ? 'fill="rgba(26,26,46,.12)" stroke="#1a1a2e" stroke-width="2"'
: 'style="fill:var(--color-accent);stroke:var(--color-accent)" fill-opacity=".22" stroke-width="2.5"') +
' stroke-linejoin="round"/>';
axes.forEach(function (a, i) {
var p = at(a, i);
svg += print
? '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4" fill="#1a1a2e"/>'
: '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="5" style="fill:var(--color-accent)" stroke="#fff" stroke-width="2"/>';
});
axes.forEach(function (a, i) {
var far = print ? 1.32 : 1.28;
var lx = cx + (a.x - cx) * far, ly = cy + (a.y - cy) * far;
var name = esc(areas[i].shortLabel || areas[i].label);
var tally = areas[i].correct + '/' + areas[i].total;
svg += print
? '<text x="' + lx + '" y="' + (ly - 3) + '" text-anchor="middle" font-size="11" font-weight="bold" fill="#1a1a2e">' + name + '</text>' +
'<text x="' + lx + '" y="' + (ly + 12) + '" text-anchor="middle" font-size="10" fill="#555">' +
tally + ' (' + Math.round(areas[i].pct * 100) + '%)</text>'
: '<text x="' + lx + '" y="' + (ly - 2) + '" text-anchor="middle" font-size="13" font-weight="600" style="fill:var(--color-accent-deep)">' + name + '</text>' +
'<text x="' + lx + '" y="' + (ly + 14) + '" text-anchor="middle" font-size="11" font-weight="500" fill="#6b7090">' + tally + '</text>';
});
return svg + '</svg>';
}
function assessSave(scores, opts) {
opts = opts || {};
if (!opts.chapterId) return null;
return createScore(opts.prefix || null).save(opts.chapterId, {
areas: scores.areas.map(function (a) {
return { key: a.key, label: a.label, score: a.correct, max: a.total };
}),
total: scores.totalPoints, max: scores.maxPoints,
pct: Math.round(scores.overall * 100),
grade: scores.grade, title: opts.title || '', completedAt: opts.completedAt,
});
}
function assessEndpoint() {
var meta = document.querySelector('meta[name="edux-assess-mail"]');
if (!meta || !meta.content) return null;
var url = meta.content.trim();
if (!url || url.indexOf('{{') === 0) return null;
var app = (meta.getAttribute('data-app') || '').trim();
if (!app) return null;
return { url: url, app: app };
}
function assessSend(scores, opts) {
var ep = assessEndpoint();
if (!ep) return Promise.resolve('skipped');
opts = opts || {};
var center = (opts.centerEmail || '').trim();
var parent = (opts.parentEmail || '').trim();
if (!center && !parent) return Promise.resolve('skipped');
var notes = opts.notes || {};
var body = {
app: ep.app,
chapterId: opts.chapterId || '', title: opts.title || '',
level: opts.level, ch: opts.ch,
studentName: (opts.studentName || '').trim(),
date: opts.date || today(),
centerEmail: center, parentEmail: parent,
total: scores.totalPoints, max: scores.maxPoints, grade: scores.grade,
areas: (scores.areas || []).map(function (a) {
return {
label: a.label, correct: a.correct, total: a.total,
level: a.level, note: notes[a.key] || '',
};
}),
};
return fetch(ep.url, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
}).then(function (res) {
return res && res.ok ? 'sent' : 'failed';
}).catch(function () { return 'failed'; });
}
function assessAccent(given) {
if (given && given.base) return given;
var cs = null;
try { cs = getComputedStyle(document.documentElement); } catch (e) {}
function tok(name, fb) {
var v = cs && cs.getPropertyValue(name);
v = (v || '').trim();
return v || fb;
}
return {
base: tok('--color-accent', '#1a1a2e'),
deep: tok('--color-accent-deep', '#1a1a2e'),
soft: tok('--color-accent-soft', '#f2f4f9'),
};
}
function assessReportHtml(scores, meta) {
meta = meta || {};
var ac = assessAccent(meta.accent);
var notes = meta.notes || {};
var gradeInk = pickBand(ASSESS_GRADES, scores.overall).ink;
var boxes = (meta.boxes || []).map(function (b) {
return '<div class="info-box"><div class="info-box-title">' + esc(b.title || '') + '</div>' +
(b.rows || []).map(function (r) {
return '<div class="info-row"><span class="info-label">' + esc(r.label) +
'</span><span class="info-val">' + esc(r.value == null ? '—' : String(r.value)) + '</span></div>';
}).join('') + '</div>';
}).join('');
var rows = (scores.areas || []).map(function (a) {
var lv = pickBand(ASSESS_AREA_LEVELS, a.pct);
return '<tr>' +
'<td class="area-col">' +
'<div class="area-name">' + esc(a.label) + '</div>' +
'<div class="area-score">' + a.correct + '<span class="area-max">/' + a.total + '</span></div>' +
'<div class="bar"><div class="bar-fill" style="width:' + Math.round(a.pct * 100) + '%;background:' + lv.bar + '"></div></div>' +
'<div class="area-level" style="color:' + lv.ink + '">' + TH(lv.say) + '</div>' +
'</td>' +
'<td class="note-col">' + esc(notes[a.key] || '') + '</td>' +
'</tr>';
}).join('');
return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">' +
'<title>' + esc((meta.label || T('progress.report')) + ' — ' + (meta.title || '')) + '</title><style>' +
'@page{margin:18mm 16mm}' +
'*{box-sizing:border-box;margin:0;padding:0}' +
'body{font-family:Georgia,"Times New Roman",serif;color:#1a1a2e;font-size:11pt;line-height:1.6;background:#fff;padding:8mm 4mm}' +
'.rp-head{border-bottom:2.5px solid ' + ac.deep + ';padding-bottom:12px;margin-bottom:18px;display:flex;justify-content:space-between;align-items:flex-end;gap:16px}' +
'.rp-label{font-size:8pt;text-transform:uppercase;letter-spacing:.12em;color:#777;margin-bottom:4px;font-family:Arial,sans-serif}' +
'.rp-title{font-size:16pt;font-weight:bold;color:' + ac.deep + '}' +
'.rp-head-right{font-size:8pt;color:#777;text-align:right;font-family:Arial,sans-serif;line-height:1.7}' +
'.info-section{display:flex;gap:24px;margin-bottom:18px}' +
'.info-box{flex:1;border:1px solid #ddd;border-radius:6px;padding:12px 14px;background:' + ac.soft + '}' +
'.info-box-title{font-size:7.5pt;font-weight:bold;text-transform:uppercase;letter-spacing:.1em;color:' + ac.deep + ';font-family:Arial,sans-serif;margin-bottom:7px}' +
'.info-row{display:flex;gap:8px;margin-bottom:3px;font-size:9.5pt}' +
'.info-label{color:#777;min-width:78px}.info-val{font-weight:bold}' +
'.score-radar{display:flex;gap:24px;align-items:center;margin-bottom:20px}' +
'.overall-box{flex:0 0 auto;border:1px solid #ddd;border-radius:6px;padding:16px 20px;text-align:center;min-width:160px}' +
'.overall-label{font-size:7.5pt;text-transform:uppercase;letter-spacing:.1em;color:#888;font-family:Arial,sans-serif;margin-bottom:8px}' +
'.overall-num{font-size:30pt;font-weight:bold;line-height:1;color:' + gradeInk + '}' +
'.overall-num span{font-size:16pt;color:#aaa}' +
'.overall-sub{font-size:9pt;color:#555;margin-top:4px}' +
'.overall-grade{font-size:11pt;font-weight:bold;margin-top:6px;color:' + gradeInk + '}' +
'.radar-box{flex:1;display:flex;justify-content:center}' +
'.sec-head{font-size:8pt;font-weight:bold;text-transform:uppercase;letter-spacing:.12em;color:#555;font-family:Arial,sans-serif;border-bottom:1px solid #ccc;padding-bottom:4px;margin-bottom:10px}' +
'table{width:100%;border-collapse:collapse}' +
'thead tr{background:' + ac.deep + ';color:#fff}' +
'thead td{padding:8px 14px;font-size:8pt;font-weight:bold;text-transform:uppercase;letter-spacing:.08em;font-family:Arial,sans-serif}' +
'.area-col{padding:12px 14px;border-bottom:1px solid #e8e8e8;vertical-align:top;width:24%}' +
'.note-col{padding:12px 14px;border-bottom:1px solid #e8e8e8;vertical-align:top;font-size:9.5pt;line-height:1.6;color:#333}' +
'.area-name{font-weight:bold;font-size:10pt;margin-bottom:3px}' +
'.area-score{font-size:13pt;font-weight:bold}.area-max{font-size:9pt;color:#888}' +
'.bar{margin:5px 0 3px;background:#e8e8e8;border-radius:4px;height:7px;overflow:hidden}' +
'.bar-fill{height:7px;border-radius:4px}' +
'.area-level{font-size:8.5pt;font-weight:bold}' +
'.rp-foot{margin-top:28px;border-top:1px solid #ccc;padding-top:8px;font-size:7.5pt;color:#aaa;font-family:Arial,sans-serif;text-align:center}' +
'@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact;padding:0}}' +
'</style></head><body>' +
'<div class="rp-head"><div><div class="rp-label">' + esc(meta.label || T('progress.report')) + '</div>' +
'<div class="rp-title">' + esc(meta.title || '') + '</div></div>' +
'<div class="rp-head-right">' + (meta.headerLines || []).map(esc).join('<br>') + '</div></div>' +
(boxes ? '<div class="info-section">' + boxes + '</div>' : '') +
'<div class="sec-head">Overall Performance</div>' +
'<div class="score-radar"><div class="overall-box">' +
'<div class="overall-label">Total Score</div>' +
'<div class="overall-num">' + scores.totalPoints + '<span>/' + scores.maxPoints + '</span></div>' +
'<div class="overall-sub">' + Math.round(scores.overall * 100) + '%</div>' +
'<div class="overall-grade">' + esc(assessSay(scores.grade, scores.overall)) + '</div>' +
'<div class="overall-sub">' + TH('assess.not_a_grade') + '</div></div>' +
'<div class="radar-box">' + assessRadarSvg(scores, { mode: 'print' }) + '</div></div>' +
'<div class="sec-head">Area Analysis</div>' +
'<table><thead><tr><td style="width:24%">Area &amp; Score</td><td>Note</td></tr></thead><tbody>' +
rows + '</tbody></table>' +
'<div class="rp-foot">' + esc(meta.footer || meta.brand || '') + '</div>' +
'</body></html>';
}
function assessPrintReport(scores, meta) {
var win = window.open('', '_blank');
if (!win) return false;
win.document.write(assessReportHtml(scores, meta));
win.document.close();
win.onload = function () { setTimeout(function () { win.print(); }, 300); };
return true;
}
function dataStamp(kind) {
var m = document.querySelector('meta[name="edux-data-v"]');
return (m && m.getAttribute('data-' + (kind || 'key'))) || '';
}
function hexOf(buf) {
var b = new Uint8Array(buf), s = '';
for (var i = 0; i < b.length; i++) s += (b[i] < 16 ? '0' : '') + b[i].toString(16);
return s;
}
function fetchDataKey(url, kind, init) {
kind = kind || 'key';
if (!url) return Promise.reject(new Error('no ' + kind + ' url'));
var file = String(url).split('?')[0].split('/').pop();
var v = file === pageStem() + '.' + kind + '.json' ? dataStamp(kind) : '';
return fetch(v ? url + '?v=' + v : url, init).then(function (r) {
if (!r.ok) throw new Error(kind + ' ' + r.status);
return r.arrayBuffer();
}).then(function (buf) {
var subtle = v && window.crypto && window.crypto.subtle;
var same = subtle ? subtle.digest('SHA-256', buf).then(function (h) {
return hexOf(h).slice(0, v.length) === v;
}) : Promise.resolve(true);
return same.then(function (ok) {
if (!ok) {
var e = new Error(kind + ' version differs from this page');
e.stale = true;
throw e;
}
return JSON.parse(new TextDecoder('utf-8').decode(buf));
});
});
}
window.EDUXAssess = {
grade: assessGrade, review: assessReview, radarSvg: assessRadarSvg,
fetchKey: fetchDataKey, dataStamp: dataStamp,
plainText: assessPlainText,
save: assessSave, send: assessSend,
reportHtml: assessReportHtml, printReport: assessPrintReport,
pageStem: pageStem,
levelOf: function (pct) { return pickBand(ASSESS_AREA_LEVELS, pct || 0); },
gradeOf: function (overall) { return pickBand(ASSESS_GRADES, overall || 0); },
areaLevels: ASSESS_AREA_LEVELS, grades: ASSESS_GRADES, say: assessSay,
};
function skinMount(opts) {
opts = opts || {};
var advice = opts.advice || {};
function qsa(sel, root) {
return Array.prototype.slice.call((root || document).querySelectorAll(sel));
}
function updateCount() {
var groups = [];
qsa('.qz-opt').forEach(function (o) {
if (groups.indexOf(o.parentNode) < 0) groups.push(o.parentNode);
});
var done = groups.filter(function (g) { return !!g.querySelector('.is-picked'); }).length;
var el = document.getElementById('qz-progress');
if (el) el.textContent = done + ' of ' + groups.length + ' answered';
}
function wireOptions() {
qsa('.qz-opt').forEach(function (o) {
o.parentNode.setAttribute('role', 'radiogroup');
o.setAttribute('role', 'radio');
o.setAttribute('aria-checked', 'false');
if (o.tagName !== 'BUTTON') o.setAttribute('tabindex', '0');
function pick() {
Array.prototype.forEach.call(o.parentNode.querySelectorAll('.qz-opt'), function (s2) {
s2.classList.remove('is-picked');
s2.setAttribute('aria-checked', 'false');
});
o.classList.add('is-picked');
o.setAttribute('aria-checked', 'true');
updateCount();
}
o.addEventListener('click', pick);
o.addEventListener('keydown', function (e) {
if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); pick(); }
});
});
qsa('.qz-rub__c').forEach(function (c) { c.addEventListener('change', updateCount); });
}
function keyUrl() {
var stem = pageStem();
return stem ? '../../_data/' + stem + '.key.json' : '';
}
var keyP = null;
function loadKey() {
if (!keyP) {
keyP = fetchDataKey(keyUrl(), 'key').catch(function (e) { keyP = null; throw e; });
}
return keyP;
}
function notes(scored) {
return scored.areas.reduce(function (o, a) {
o[a.key] = (advice[a.key] || {})[pickBand(ASSESS_AREA_LEVELS, a.pct || 0).tier] || '';
return o;
}, {});
}
function wireSubmit(cfg) {
var el = document.getElementById('qz-submit');
if (!el) return;
el.grade = function () {
return loadKey()
.then(function (key) {
var answers = key.answers || key;
var picks = [];
var scored = assessGrade(opts.collect(answers, picks));
if (typeof opts.onGraded === 'function') {
try { opts.onGraded(cfg, key.review, picks); } catch (e) {}
}
return {
scores: scored,
review: assessReview ? assessReview(key.review, picks) : [],
notes: notes(scored),
meta: {
prefix: cfg.prefix, chapterId: cfg.chapterId, title: cfg.title,
level: cfg.level, ch: cfg.ch, brand: cfg.brand,
date: today(),
},
};
});
};
el.addEventListener('edux-assess-done', function () {
var box = document.getElementById('qz-results');
if (!box) return;
box.hidden = false;
if (opts.scrollToReview) {
try { box.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) {}
}
});
}
function start() {
var cfg = window.ASSESS_CFG;
if (!cfg || !document.getElementById('qz-submit')) return;
wireOptions();
updateCount();
wireSubmit(cfg);
loadKey().catch(function () { /* 제출 때 다시 받는다 */ });
}
ready(start);
}
window.EDUXAssessSkin = { mount: skinMount };
window.EDUXTrack = {
scope: createTrack, defaults: TRACK_DEFAULTS, calendarSvg: attendanceSvg, today: today,
};
function chapterOfPage() {
var parts = location.pathname.split('/').filter(Boolean);
return (parts.pop() || '').replace(/\.html?$/, '');
}
document.addEventListener('edux-predict-done', function (e) {
try {
var ask = String(((e || {}).detail || {}).ask || '');
var kind = /^m/i.test(ask) ? 'math' : 'predict';
var ch = chapterOfPage();
if (ch) createTrack().practice(kind, ch);
} catch (err) { /* 기록은 있으면 좋은 것이지 문항을 막을 이유가 아니다 */ }
});
window.EDUXScore = {
scope: createScore, normalize: normalizeScore, trendSvg: scoreTrendSvg, areas: declaredAreas,
};
function reportInit() {
var meta = document.querySelector('meta[name="edux-report"]');
if (!meta || !meta.content) return;
var key = meta.getAttribute('data-key') || '';
if (!key) return;
var url = meta.content.replace(/\/+$/, '') + '/rest/v1/rpc/edux_report_submit';
var app = meta.getAttribute('data-app') || document.title || '';
var KINDS = ['Typo', 'Content error', 'Too hard / too easy', 'Other'];
var KIND_KEYS = ['report.kind.typo', 'report.kind.error', 'report.kind.level', 'report.kind.other'];
var st = document.createElement('style');
st.id = 'edux-report-style';
st.textContent =
'.edux-report-btn{position:fixed;left:12px;bottom:calc(12px + var(--edux-dock-lift,0px));z-index:900;width:44px;height:44px;' +
'border-radius:50%;border:1px solid rgba(0,0,0,.12);background:#fff;color:#64748b;' +
'font-size:17px;line-height:1;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.12)}' +
'.edux-report-btn:hover{color:#334155}' +
'.edux-report-panel{position:fixed;left:12px;bottom:calc(58px + var(--edux-dock-lift,0px));z-index:901;width:min(280px,86vw);' +
'background:#fff;border:1px solid rgba(0,0,0,.15);border-radius:12px;padding:12px;' +
'box-shadow:0 6px 24px rgba(0,0,0,.18);font-family:system-ui,sans-serif;font-size:13px;color:#1e293b}' +
'.edux-report-panel h3{margin:0 0 8px;font-size:13px}' +
'.edux-report-panel button.k{display:block;width:100%;margin:4px 0;padding:7px 9px;text-align:left;' +
'border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;cursor:pointer;font-size:13px}' +
'.edux-report-panel button.k:hover{background:#eef2ff}' +
'.edux-report-panel textarea{width:100%;box-sizing:border-box;margin:6px 0;padding:6px;' +
'border:1px solid #e2e8f0;border-radius:8px;font-size:13px;min-height:52px}' +
'.edux-report-row{display:flex;gap:6px;justify-content:flex-end}' +
'.edux-report-row button{padding:6px 12px;border-radius:8px;border:1px solid #e2e8f0;' +
'background:#fff;cursor:pointer;font-size:13px}' +
'.edux-report-row button.send{background:#4f46e5;border-color:#4f46e5;color:#fff}' +
'.edux-report-toast{position:fixed;left:12px;bottom:calc(58px + var(--edux-dock-lift,0px));z-index:901;background:#1e293b;color:#fff;' +
'padding:8px 14px;border-radius:10px;font-size:13px;font-family:system-ui,sans-serif}' +
'@media print{.edux-report-btn,.edux-report-panel,.edux-report-toast{display:none}}';
document.head.appendChild(st);
var btn = document.createElement('button');
btn.type = 'button';
btn.className = 'edux-report-btn';
TSet(btn, 'report.button', 'aria-label');
btn.textContent = '⚑';
document.body.appendChild(btn);
var panel = null, kind = null, back = null;
function close() {
if (!panel) return;
var had = panel.contains(document.activeElement);
panel.remove(); panel = null; kind = null;
if (back && had) back.focus();
back = null;
}
function toast(msg) {
var t = document.createElement('div');
t.className = 'edux-report-toast';
t.textContent = msg;
document.body.appendChild(t);
setTimeout(function () { t.remove(); }, 2600);
}
function send(note) {
var body = {
p_app: app, p_page: location.pathname, p_title: document.title,
p_kind: kind || 'Other', p_note: note || '', p_ts: new Date().toISOString(),
};
close();
try {
fetch(url, {
method: 'POST',
headers: { 'Content-Type': 'application/json', apikey: key, Authorization: 'Bearer ' + key },
body: JSON.stringify(body),
}).then(function (r) {
toast(r.ok ? T('report.sent') : T('report.failed', { status: r.status }));
}).catch(function () { toast(T('report.offline')); });
} catch (e) { toast(T('report.offline')); }
}
btn.onclick = function () {
if (panel) { close(); return; }
panel = document.createElement('div');
panel.className = 'edux-report-panel';
panel.innerHTML = '<h3>' + TH('report.title') + '</h3>' +
KIND_KEYS.map(function (k) { return '<button type="button" class="k">' + TH(k) + '</button>'; }).join('') +
'<textarea' + TQ('placeholder', 'report.note') + '></textarea>' +
'<div class="edux-report-row"><button type="button" class="cancel">' + TH('report.cancel') + '</button>' +
'<button type="button" class="send">' + TH('report.send') + '</button></div>';
document.body.appendChild(panel);
var ta = panel.querySelector('textarea');
panel.querySelectorAll('button.k').forEach(function (b, i) {
b.onclick = function () {
kind = KINDS[i];
panel.querySelectorAll('button.k').forEach(function (x) {
x.style.background = (x === b) ? '#eef2ff' : '#f8fafc';
});
};
});
panel.querySelector('.cancel').onclick = close;
panel.querySelector('.send').onclick = function () { send(ta.value.trim()); };
};
reportOpen = function (from) {
if (!panel) btn.onclick();
back = from || null;
var first = panel && panel.querySelector('button.k');
if (first) first.focus();
};
}
function bootOrbs() { wireOrbs(document); }
ready(bootOrbs);
function vocabSpeak(text) {
if (!text || !window.speechSynthesis) return;
try {
speechSynthesis.cancel();
var u = new SpeechSynthesisUtterance(text);
u.lang = 'en-US'; u.rate = 0.8; u.pitch = 1.05;
speechSynthesis.speak(u);
} catch (e) {}
}
function vocabToggle(card) {
var open = card.classList.toggle('open');
card.setAttribute('aria-expanded', open ? 'true' : 'false');
var term = card.querySelector('.vocab-term');
if (open && term) vocabSpeak((term.textContent || '').trim());
}
function vocabCardAt(node) {
if (!node || !node.closest) return null;
var card = node.closest('.vocab-grid--tap .vocab-card');
if (!card || card.hasAttribute('x-data')) return null;
return card;
}
document.addEventListener('click', function (e) {
var card = vocabCardAt(e.target);
if (card) vocabToggle(card);
});
document.addEventListener('keydown', function (e) {
if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
var card = vocabCardAt(e.target);
if (!card) return;
e.preventDefault();
vocabToggle(card);
});
if (!window.speechSynthesis) document.documentElement.setAttribute('data-nospeech', '');
window.EDUXVocab = { speak: vocabSpeak, toggle: vocabToggle };
var PREDICT_KEY = Object.create(null);
var PREDICT_N = 0;
function pageStem() {
var parts = location.pathname.split('/').filter(Boolean);
return (parts.pop() || '').replace(/\.html?$/, '');
}
function predictKeyUrl() {
var stem = pageStem();
return stem ? '../_data/' + stem + '.predict.json' : '';
}
function predictKey() {
var url = predictKeyUrl();
if (!url) return Promise.reject(new Error('no chapter'));
if (!PREDICT_KEY[url]) {
PREDICT_KEY[url] = fetchDataKey(url, 'predict')
.catch(function (e) { delete PREDICT_KEY[url]; throw e; });
}
return PREDICT_KEY[url];
}
function predictControl(node) {
if (node.tagName === 'BUTTON') { node.type = 'button'; return node; }
var b = document.createElement('button');
b.type = 'button';
for (var i = 0; i < node.attributes.length; i++) {
var a = node.attributes[i];
if (a.name === 'tabindex' || a.name === 'role' || a.name === 'for') continue;
b.setAttribute(a.name, a.value);
}
while (node.firstChild) b.appendChild(node.firstChild);
var ctrls = b.querySelectorAll('input,select,textarea,label');
for (var j = 0; j < ctrls.length; j++) {
var c = ctrls[j];
if (c.tagName === 'LABEL') { c.replaceWith.apply(c, Array.prototype.slice.call(c.childNodes)); continue; }
if (c.parentNode) c.parentNode.removeChild(c);
}
if (!b.classList.contains('predict-option')) b.classList.add('predict-option');
node.parentNode.replaceChild(b, node);
return b;
}
function predictSay(el, cls, text) {
var fb = el.querySelector('.predict-fb');
if (!fb) return;
fb.className = 'predict-fb' + (cls ? ' ' + cls : '');
fb.textContent = text;
}
function keyText(node, text) {
var parts = String(text == null ? '' : text).split(/\x60([^\x60]+)\x60/);
for (var i = 0; i < parts.length; i++) {
if (!parts[i]) continue;
if (i % 2) {
var c = document.createElement('code');
c.textContent = parts[i];
node.appendChild(c);
} else {
node.appendChild(document.createTextNode(parts[i]));
}
}
return node;
}
function predictAgain(el, opts) {
var old = el.querySelector('.predict-again');
if (old) old.remove();
var b = document.createElement('button');
b.type = 'button';
b.className = 'btn btn--ghost predict-again';
b.textContent = 'Try it again';
b.addEventListener('click', function () {
opts.forEach(function (o) {
o.classList.remove('is-locked', 'is-correct', 'is-picked', 'is-wrong');
o.removeAttribute('aria-disabled');
});
predictSay(el, '', '');
var why = el.querySelector('.predict-why');
if (why) { why.textContent = ''; why.hidden = true; }
el._pLocked = 0;
b.remove();
if (opts[0]) opts[0].focus();
});
el.appendChild(b);
}
function predictPick(el, opts, chosen) {
if (el._pLocked || el._pBusy) return;
el._pBusy = 1;
predictSay(el, 'is-busy', 'Checking…');
predictKey().then(function (key) {
var ent = ((key || {}).asks || {})[attr(el, 'ask', '1')];
if (!ent || !ent.correct) throw new Error('no entry');
var want = String(ent.correct), mine = chosen.getAttribute('data-opt');
var ok = mine === want;
var trapWhy = ((ent.options || {})[mine] || {}).why;
var again = el.hasAttribute('retry') && !ok && !!trapWhy;
el._pLocked = again ? 0 : 1;
opts.forEach(function (b) {
if (again) {
b.classList.remove('is-picked', 'is-wrong');
if (b === chosen) b.classList.add('is-picked', 'is-wrong');
return;
}
b.setAttribute('aria-disabled', 'true');
b.classList.add('is-locked');
if (b.getAttribute('data-opt') === want) b.classList.add('is-correct');
if (b === chosen) {
b.classList.add('is-picked');
if (!ok) b.classList.add('is-wrong');
}
});
predictSay(el, ok ? 'is-right' : 'is-wrong',
ok ? 'Right!'
: again ? 'Not that one. Have another look, then try again.'
: 'Not quite — the answer is ' + want + '.');
var why = el.querySelector('.predict-why');
var trap = trapWhy;
why.textContent = '';
if (trap && !ok) {
var t = document.createElement('p');
t.className = 'predict-why__trap';
keyText(t, trap);
why.appendChild(t);
}
if (ent.why && !again) {
var w = document.createElement('p');
keyText(w, ent.why);
why.appendChild(w);
}
why.hidden = !why.firstChild;
if (ok && el.hasAttribute('retry')) predictAgain(el, opts);
el.dispatchEvent(new CustomEvent('edux-predict-done',
{ bubbles: true, detail: { ask: attr(el, 'ask', '1'), picked: mine, want: want, ok: ok } }));
el._pBusy = 0;
}).catch(function (e) {
el._pLocked = 0;
el._pBusy = 0;
predictSay(el, 'is-error', e && e.stale
? 'This page was updated. Reload it to check your answer.'
: 'Could not check that yet. Tap again in a moment.');
});
}
function renderPredict(el) {
if (document.readyState === 'loading' && !el.querySelector('.predict-options')) {
if (!el._pDefer) {
el._pDefer = 1;
document.addEventListener('DOMContentLoaded', function () { renderPredict(el); });
}
return;
}
if (el._pDone) return;
var list = el.querySelector('.predict-options');
if (!list) return;
el._pDone = 1;
var raw = list.querySelectorAll('.predict-option'), opts = [], i;
for (i = 0; i < raw.length; i++) opts.push(predictControl(raw[i]));
list.setAttribute('role', 'group');
var q = el.querySelector('.predict-q');
if (q) {
if (!q.id) q.id = 'edux-pq-' + (++PREDICT_N);
list.setAttribute('aria-labelledby', q.id);
}
var old = el.querySelectorAll('.predict-fb,.predict-why,.predict-feedback');
for (i = 0; i < old.length; i++) old[i].parentNode.removeChild(old[i]);
var fb = document.createElement('p');
fb.className = 'predict-fb';
fb.setAttribute('role', 'status');
fb.setAttribute('aria-live', 'polite');
var why = document.createElement('div');
why.className = 'predict-why';
why.hidden = true;
el.appendChild(fb);
el.appendChild(why);
opts.forEach(function (b) {
b.addEventListener('click', function () { predictPick(el, opts, b); });
});
}
define('edux-predict', renderPredict);
var NUMVARY_N = 0;
function numvarySay(el, cls, text) { predictSay(el, cls, text); }
function numvaryDraw(el, ent, vals) {
var pic = el.querySelector('.numvary-pic');
if (!pic) return;
var text = String(ent.pic || '').replace(/\{(\w+)\}/g, function (m, k) {
return vals[k] == null ? m : String(vals[k]);
});
if (ent.pk === 'pycode') {
var pre = pic.querySelector('pre.pycode');
var code = pre && pre.querySelector('code');
if (!code) return;
if (!(typeof window.EDUXPyRedraw === 'function' && window.EDUXPyRedraw(pre, text))) {
code.textContent = text;
}
return;
}
var pre = pic.querySelector('pre.sb');
if (!pre || !window.scratchblocks) return;
if (!pre.id) pre.id = 'edux-nv-sb-' + (++NUMVARY_N);
pre.textContent = text;
var opts = window.EDUXSbOpts || { style: 'scratch3', scale: 0.8 };
try { window.scratchblocks.renderMatching('#' + pre.id, opts); } catch (e) {}
}
function numvaryFill(el, ent, vals) {
var sub = function (s) {
return String(s || '').replace(/\{(\w+)\}/g, function (m, k) {
return vals[k] == null ? m : String(vals[k]);
});
};
var q = el.querySelector('.numvary-q');
if (q) q.textContent = sub(ent.q);
var am = el.querySelector('.numvary-am');
if (am) {
var tail = am.lastChild;
if (tail && tail.nodeType === 3) tail.nodeValue = ' ' + sub(ent.am);
}
numvaryDraw(el, ent, vals);
}
function numvaryKey(el) {
return predictKey().then(function (key) {
var ent = ((key || {}).asks || {})[attr(el, 'ask', 'm2')];
if (!ent || ent.kind !== 'vary' || !(ent.draws || []).length) throw new Error('no entry');
return ent;
});
}
function numvaryCheck(el, input) {
if (el._nvBusy) return;
var raw = (input.value || '').replace(/,/g, '');
var m = raw.match(/-?\d+(?:\.\d+)?/);
if (!m) { numvarySay(el, 'is-wrong', 'Type a number first.'); input.focus(); return; }
el._nvBusy = 1;
numvarySay(el, 'is-busy', 'Checking…');
numvaryKey(el).then(function (ent) {
var draw = ent.draws[el._nvIdx % ent.draws.length];
var ok = Number(m[0]) === Number(draw.a);
var why = el.querySelector('.predict-why');
why.textContent = '';
if (ok) {
numvarySay(el, 'is-right', 'Right!');
} else {
el._nvTries = (el._nvTries || 0) + 1;
numvarySay(el, 'is-wrong', el._nvTries < 3
? 'Not yet — read the numbers in the picture again.'
: 'Here is how it works out. Try the next one.');
if (el._nvTries >= 3) {
var p = document.createElement('p');
var line = String(ent.am || '').replace(/\{(\w+)\}/g, function (s, k) {
return draw.v[k] == null ? s : String(draw.v[k]);
}).replace(/=\s*\?\s*$/, '').trim();
p.textContent = (line ? line + ' = ' : '') + draw.a + (ent.unit ? ' ' + ent.unit : '');
why.appendChild(p);
}
}
why.hidden = !why.firstChild;
if (!el._nvCounted) {
el._nvCounted = 1;
el.dispatchEvent(new CustomEvent('edux-predict-done',
{ bubbles: true, detail: { ask: attr(el, 'ask', 'm2'), picked: m[0], want: draw.a, ok: ok } }));
}
el._nvBusy = 0;
}).catch(function () {
el._nvBusy = 0;
numvarySay(el, 'is-error', 'Could not check that yet. Tap again in a moment.');
});
}
function numvaryNext(el, input) {
if (el._nvBusy) return;
el._nvBusy = 1;
numvaryKey(el).then(function (ent) {
var n = ent.draws.length, next = el._nvIdx;
if (n > 1) { while (next === el._nvIdx) next = Math.floor(Math.random() * n); }
el._nvIdx = next;
el._nvTries = 0;
el._nvCounted = 0;
numvaryFill(el, ent, ent.draws[next].v);
input.value = '';
numvarySay(el, '', '');
var why = el.querySelector('.predict-why');
why.textContent = '';
why.hidden = true;
input.focus();
el._nvBusy = 0;
}).catch(function () {
el._nvBusy = 0;
numvarySay(el, 'is-error', 'Could not load new numbers yet. Tap again in a moment.');
});
}
function renderNumvary(el) {
if (document.readyState === 'loading' && !el.querySelector('.numvary-q')) {
if (!el._nvDefer) {
el._nvDefer = 1;
document.addEventListener('DOMContentLoaded', function () { renderNumvary(el); });
}
return;
}
if (el._nvDone) return;
var q = el.querySelector('.numvary-q');
if (!q) return;
el._nvDone = 1;
el._nvIdx = 0;
if (!q.id) q.id = 'edux-nvq-' + (++NUMVARY_N);
var row = document.createElement('div');
row.className = 'numvary-row';
var input = document.createElement('input');
input.type = 'text';
input.inputMode = 'numeric';
input.className = 'numvary-input';
input.autocomplete = 'off';
input.setAttribute('aria-labelledby', q.id);
row.appendChild(input);
var unit = attr(el, 'unit', '');
if (unit) {
var u = document.createElement('span');
u.className = 'numvary-unit';
u.textContent = unit;
row.appendChild(u);
}
var check = document.createElement('button');
check.type = 'button';
check.className = 'btn numvary-check';
check.textContent = 'Check';
var next = document.createElement('button');
next.type = 'button';
next.className = 'btn btn--ghost numvary-new';
next.textContent = 'New numbers';
row.appendChild(check);
row.appendChild(next);
var fb = document.createElement('p');
fb.className = 'predict-fb';
fb.setAttribute('role', 'status');
fb.setAttribute('aria-live', 'polite');
var why = document.createElement('div');
why.className = 'predict-why';
why.hidden = true;
el.appendChild(row);
el.appendChild(fb);
el.appendChild(why);
check.addEventListener('click', function () { numvaryCheck(el, input); });
next.addEventListener('click', function () { numvaryNext(el, input); });
input.addEventListener('keydown', function (e) {
if (e.key === 'Enter') { e.preventDefault(); numvaryCheck(el, input); }
});
}
define('edux-numvary', renderNumvary);
function fixitFit(root) {
var solves = (root || document).querySelectorAll('.fixit-solve');
for (var i = 0; i < solves.length; i++) {
(function (S) {
var pz = S.querySelector('.fixit-solve__puzzle, .ds-puzzle');
if (!pz) return;
function overflow() {
var n = pz.querySelectorAll('.ds-source, .ds-container, .ds-targets, .ds-card, .sbu__card');
var over = 0, j;
for (j = 0; j < n.length; j++) over = Math.max(over, n[j].scrollWidth - n[j].clientWidth);
return over;
}
function fit() {
var w = pz.getBoundingClientRect().width;
if (!w) return;
var over = overflow();
if (over <= 1) return;
var want = Math.ceil(w + over) + 'px';
if (S.style.getPropertyValue('--fixit-puzzle-basis') !== want) {
S.style.setProperty('--fixit-puzzle-basis', want);
}
}
function remeasure() { S.style.removeProperty('--fixit-puzzle-basis'); fit(); }
fit();
if ('ResizeObserver' in window) new ResizeObserver(fit).observe(pz);
addEventListener('load', fit);
addEventListener('resize', remeasure);
setTimeout(fit, 1500);
})(solves[i]);
}
}
ready(function () { fixitFit(); });
ready(reportInit);
ready(phoneMenu);
function leaveNotice() {
var box = null, timer = 0;
function hide() { clearTimeout(timer); if (box) { box.remove(); box = null; } }
function show() {
if (box) return;
var km = (document.documentElement.lang || '').slice(0, 2) === 'km';
box = document.createElement('div');
box.className = 'edux-leaving';
box.setAttribute('role', 'status');
box.setAttribute('aria-live', 'polite');
box.style.cssText = 'position:fixed;left:50%;bottom:calc(24px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);' +
'z-index:2147483000;display:flex;align-items:center;gap:10px;padding:12px 18px;border-radius:999px;' +
'background:rgba(22,24,32,.92);color:#fff;font:600 15px/1.2 system-ui,-apple-system,sans-serif;' +
'box-shadow:0 8px 28px rgba(0,0,0,.28);pointer-events:none';
var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
box.innerHTML = '<span aria-hidden="true" style="width:16px;height:16px;border-radius:50%;border:2.5px solid rgba(255,255,255,.3);' +
'border-top-color:#fff;' + (still ? '' : 'animation:edux-leaving-spin .8s linear infinite') + '"></span>' +
'<span>' + (km ? 'កំពុងបើក… សូមរង់ចាំបន្តិច' : 'Loading… one moment') + '</span>';
if (!document.getElementById('edux-leaving-kf')) {
var st = document.createElement('style'); st.id = 'edux-leaving-kf';
st.textContent = '@keyframes edux-leaving-spin{to{transform:rotate(360deg)}}';
document.head.appendChild(st);
}
document.body.appendChild(box);
}
document.addEventListener('click', function (e) {
if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
var a = e.target && e.target.closest && e.target.closest('a[href]');
if (!a || a.target && a.target !== '_self' || a.hasAttribute('download')) return;
var u; try { u = new URL(a.href, location.href); } catch (er) { return; }
if (u.origin !== location.origin || !/^https?:$/.test(u.protocol)) return;
if (u.pathname === location.pathname && u.search === location.search) return;
hide(); timer = setTimeout(show, 350);
});
window.addEventListener('pageshow', hide);
}
ready(leaveNotice);
})();
