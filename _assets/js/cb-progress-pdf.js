/* Save / import student progress as a PDF.
 *
 * "Save progress" (top corner of every page) downloads a PDF report of the
 * logged-in student's progress. The same PDF carries the raw progress data as
 * an attached file, cutebot-progress.json, so "Import progress" on the
 * progress page can restore it on another computer.
 *
 * Progress lives in localStorage as <prefix><studentId>:<thing>, e.g.
 * cb:ada:seen, cb:ada:assess:level1_ch1. The student list is <prefix>users and
 * the logged-in student is <prefix>currentUser.
 */
(function () {
'use strict';

var FORMAT = 'cutebot-progress', VERSION = 1, ATTACH = 'cutebot-progress.json';
var SKIP_SUFFIX = { sess: 1 }; // the live session timer; restarting it on import would be wrong
var ROOT = (function () {
  var s = document.currentScript && document.currentScript.src;
  var m = s && /^(.*\/)_assets\/js\/[^\/]*$/.exec(s.split('?')[0]);
  return m ? m[1] : new URL('./', location.href).href;
})();
var PREFIX = document.documentElement.getAttribute('data-edux-account') || 'cb:';

// ── storage ────────────────────────────────────────────────────────────────
function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
function parse(raw, fb) { try { var v = JSON.parse(raw); return v == null ? fb : v; } catch (e) { return fb; } }
function users() { var u = parse(lsGet(PREFIX + 'users'), []); return Array.isArray(u) ? u : []; }
function currentStudent() {
  var id = lsGet(PREFIX + 'currentUser');
  if (!id) return null;
  var u = users().filter(function (x) { return x && x.id === id; })[0];
  return { id: id, name: (u && u.name) || id };
}
function collect(id) {
  var base = PREFIX + id + ':', data = {};
  try {
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (k && k.indexOf(base) === 0) {
        var suffix = k.slice(base.length);
        if (!SKIP_SUFFIX[suffix]) data[suffix] = localStorage.getItem(k);
      }
    }
  } catch (e) {}
  return data;
}

// ── merge (import never throws away work done on this computer) ────────────
function union(a, b) {
  var seen = {}, out = [];
  (a || []).concat(b || []).forEach(function (x) { if (!seen[x]) { seen[x] = 1; out.push(x); } });
  return out.sort(function (x, y) { return x - y; });
}
function mergeSeen(l, r) {
  var out = {}, k;
  for (k in l) out[k] = l[k];
  for (k in r) {
    var a = out[k], b = r[k];
    if (!a) { out[k] = b; continue; }
    var base = (b.t || 0) > (a.t || 0) ? b : a, m = {};
    for (var p in base) m[p] = base[p];
    m.v = union(a.v, b.v);
    m.of = Math.max(a.of || 0, b.of || 0) || base.of;
    if (a.done || b.done) m.done = 1;
    out[k] = m;
  }
  return out;
}
function mergeSessions(l, r) {
  var byDate = {};
  l.concat(r).forEach(function (s) {
    if (!s || !s.date) return;
    var cur = byDate[s.date];
    if (!cur || (s.minutes || 0) > (cur.minutes || 0)) byDate[s.date] = s;
  });
  return Object.keys(byDate).sort().map(function (d) { return byDate[d]; });
}
function mergePractice(l, r) {
  var out = parse(JSON.stringify(l), {});
  Object.keys(r).forEach(function (kind) {
    out[kind] = out[kind] || {};
    Object.keys(r[kind] || {}).forEach(function (ch) {
      var a = out[kind][ch], b = r[kind][ch];
      if (!a) { out[kind][ch] = b; return; }
      out[kind][ch] = {
        tries: Math.max(a.tries || 0, b.tries || 0),
        last: String(a.last || '') > String(b.last || '') ? a.last : b.last
      };
    });
  });
  return out;
}
function mergeValue(suffix, localRaw, inRaw) {
  if (localRaw == null) return inRaw;
  if (inRaw == null) return localRaw;
  try {
    if (suffix === 'seen') return JSON.stringify(mergeSeen(JSON.parse(localRaw) || {}, JSON.parse(inRaw) || {}));
    if (suffix === 'sessions') return JSON.stringify(mergeSessions(JSON.parse(localRaw) || [], JSON.parse(inRaw) || []));
    if (suffix === 'practice') return JSON.stringify(mergePractice(JSON.parse(localRaw) || {}, JSON.parse(inRaw) || {}));
    if (suffix === 'last_active') return String(Math.max(+localRaw || 0, +inRaw || 0));
    if (suffix.indexOf('completed:') === 0) return localRaw < inRaw ? localRaw : inRaw; // first completion
    if (suffix.indexOf('assess:') === 0) { // newer check-up wins; same day -> higher score
      var a = JSON.parse(localRaw) || {}, b = JSON.parse(inRaw) || {};
      var ad = String(a.completedAt || ''), bd = String(b.completedAt || '');
      if (bd > ad || (bd === ad && (b.total || 0) > (a.total || 0))) return inRaw;
      return localRaw;
    }
  } catch (e) {}
  return localRaw; // anything else: keep what this computer has
}
function restore(payload) {
  var st = payload.student || {}, id = String(st.id || ''), name = String(st.name || id);
  if (!id || /[:\s]/.test(id)) throw new Error('This file has no student in it.');
  var base = PREFIX + id + ':', data = payload.data || {}, n = 0;
  Object.keys(data).forEach(function (suffix) {
    if (SKIP_SUFFIX[suffix] || typeof data[suffix] !== 'string') return;
    var merged = mergeValue(suffix, lsGet(base + suffix), data[suffix]);
    if (merged != null && lsSet(base + suffix, merged)) n++;
  });
  var list = users();
  if (!list.some(function (u) { return u && u.id === id; })) {
    list.push({ id: id, name: name, lastSeen: new Date().toISOString() });
    lsSet(PREFIX + 'users', JSON.stringify(list));
  }
  lsSet(PREFIX + 'currentUser', id);
  return { name: name, keys: n };
}

// ── chapter list (single source: the data block on progress.html) ──────────
function loadLevels() {
  return fetch(ROOT + 'progress.html').then(function (r) { return r.text(); }).then(function (html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var el = doc.getElementById('prog-data');
    return el ? JSON.parse(el.textContent) : [];
  }).catch(function () { return []; });
}
function chapterId(href) { var m = /(level\d+_ch\d+)/.exec(href || ''); return m ? m[1] : ''; }
function lessonSeen(seen, href) {
  var want = '/' + String(href).replace(/\.html$/, '');
  for (var k in seen) { if (k.replace(/\.html$/, '').slice(-want.length) === want) return seen[k]; }
  return null;
}

// ── report model ───────────────────────────────────────────────────────────
function buildReport(student, data, levels) {
  var seen = parse(data.seen, {}), sessions = parse(data.sessions, []);
  var minutes = 0; (Array.isArray(sessions) ? sessions : []).forEach(function (s) { minutes += s.minutes || 0; });
  var total = 0, done = 0, taken = 0, pctSum = 0;
  var rows = levels.map(function (lv) {
    return {
      level: lv.level, color: lv.color, deep: lv.colorDeep, soft: lv.colorSoft,
      chapters: (lv.chapters || []).map(function (c) {
        var id = chapterId(c.href), s = lessonSeen(seen, c.href);
        var a = parse(data['assess:' + id], null), comp = data['completed:' + id] || null;
        total++; if (comp) done++;
        if (a && a.max) { taken++; pctSum += a.pct || 0; }
        return {
          title: 'Chapter ' + c.num + ' — ' + c.title,
          lesson: s ? (s.done ? 'All ' + (s.of || '') + ' sections' : ((s.v || []).length + ' of ' + (s.of || '?') + ' sections')) : 'Not started',
          check: a && a.max ? a.total + ' / ' + a.max + '  (' + Math.round(a.pct || 0) + '%)' : '—',
          date: (a && a.completedAt) || comp || '',
          complete: !!comp
        };
      })
    };
  });
  return {
    name: student.name, rows: rows, total: total, done: done, taken: taken,
    avg: taken ? Math.round(pctSum / taken) : null, minutes: minutes
  };
}

// ── minimal PDF writer (Helvetica, WinAnsi text, one attached file) ────────
var HELV = [278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,
  278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,
  667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,
  333,500,278,556,500,722,500,500,500,334,260,334,584];
var WIN = { 8211: 150, 8212: 151, 8216: 145, 8217: 146, 8220: 147, 8221: 148, 8226: 149, 8230: 133, 8364: 128, 8482: 153 };
function winAnsi(str) { // -> array of byte values; characters Helvetica cannot draw are dropped
  var out = [];
  String(str).replace(/[ ‑]/g, ' ').replace(/⁠/g, '').split('').forEach(function (ch) {
    var c = ch.charCodeAt(0);
    if (c >= 32 && c < 127) out.push(c);
    else if (c >= 160 && c < 256) out.push(c);
    else if (WIN[c]) out.push(WIN[c]);
  });
  return out;
}
function textWidth(str, size, bold) {
  var w = 0;
  winAnsi(str).forEach(function (b) { w += (b >= 32 && b < 127) ? HELV[b - 32] : (b === 151 ? 1000 : 556); });
  return w / 1000 * size * (bold ? 1.08 : 1);
}
function fit(str, size, bold, max) {
  if (textWidth(str, size, bold) <= max) return str;
  while (str.length > 1 && textWidth(str + '…', size, bold) > max) str = str.slice(0, -1);
  return str + '…';
}
function pdfStr(str) {
  return '(' + winAnsi(str).map(function (b) {
    var ch = String.fromCharCode(b);
    return ch === '(' || ch === ')' || ch === '\\' ? '\\' + ch : ch;
  }).join('') + ')';
}
function utf16Hex(str) {
  var h = 'FEFF';
  for (var i = 0; i < str.length; i++) h += ('000' + str.charCodeAt(i).toString(16).toUpperCase()).slice(-4);
  return '<' + h + '>';
}
function rgb(hex, fb) {
  var m = /^#?([0-9a-f]{6})$/i.exec(hex || '') || /^#?([0-9a-f]{6})$/i.exec(fb);
  var n = parseInt(m[1], 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255].map(function (v) { return v.toFixed(3); }).join(' ');
}
function bytesOf(latin1) { var u = new Uint8Array(latin1.length); for (var i = 0; i < latin1.length; i++) u[i] = latin1.charCodeAt(i) & 255; return u; }
function pdfDate(d) {
  function p(n) { return (n < 10 ? '0' : '') + n; }
  return 'D:' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + p(d.getHours()) + p(d.getMinutes()) + p(d.getSeconds());
}

function makePdf(report, payloadJson, when) {
  var W = 612, H = 792, M = 50, pages = [], ops = null, y = 0;
  var INK = '0.12 0.16 0.27', MUTED = '0.40 0.43 0.55';
  function newPage() { ops = []; pages.push(ops); y = H - M; }
  function text(x, yy, str, size, bold, color) {
    ops.push('BT /' + (bold ? 'F2' : 'F1') + ' ' + size + ' Tf ' + (color || INK) + ' rg ' + x.toFixed(1) + ' ' + yy.toFixed(1) + ' Td ' + pdfStr(str) + ' Tj ET');
  }
  function rect(x, yy, w, h, color) { ops.push(color + ' rg ' + x + ' ' + yy.toFixed(1) + ' ' + w + ' ' + h + ' re f'); }
  function line(x1, yy, x2, color) { ops.push(color + ' RG 0.6 w ' + x1 + ' ' + yy.toFixed(1) + ' m ' + x2 + ' ' + yy.toFixed(1) + ' l S'); }
  function need(h) { if (y - h < M + 40) { newPage(); } }

  newPage();
  text(M, y - 20, 'Micro:bit with Cutebot — Progress report', 20, true);
  y -= 48;
  text(M, y, 'Student: ' + report.name, 13, true);
  text(M + 260, y, 'Saved: ' + when.toLocaleString(), 11, false, MUTED);
  y -= 30;
  rect(M, y - 34, W - 2 * M, 44, '0.93 0.96 0.93');
  var cells = [
    ['Chapters complete', report.done + ' of ' + report.total],
    ['Check-ups taken', String(report.taken)],
    ['Average check-up score', report.avg == null ? '—' : report.avg + '%'],
    ['Time on task (recent)', report.minutes + ' min']
  ];
  var cw = (W - 2 * M) / cells.length;
  cells.forEach(function (c, i) {
    text(M + 10 + i * cw, y - 6, c[0], 8, false, MUTED);
    text(M + 10 + i * cw, y - 24, c[1], 14, true);
  });
  y -= 62;

  var COL = [M, M + 280, M + 372, M + 457]; // chapter | lesson | check-up | date
  report.rows.forEach(function (lv) {
    need(26 + 18 * Math.min(2, lv.chapters.length));
    rect(M, y - 6, W - 2 * M, 22, rgb(lv.soft, '#eeeeee'));
    text(M + 8, y + 1, fit(lv.level, 11, true, W - 2 * M - 16), 11, true, rgb(lv.deep, '#333333'));
    y -= 24;
    text(COL[0], y, 'Chapter', 8, true, MUTED); text(COL[1], y, 'Lesson', 8, true, MUTED);
    text(COL[2], y, 'Check-up score', 8, true, MUTED); text(COL[3], y, 'Date', 8, true, MUTED);
    y -= 16;
    lv.chapters.forEach(function (c) {
      need(18);
      text(COL[0], y, fit((c.complete ? '[x] ' : '[  ] ') + c.title, 10, c.complete, COL[1] - COL[0] - 8), 10, c.complete);
      text(COL[1], y, fit(c.lesson, 10, false, COL[2] - COL[1] - 8), 10);
      text(COL[2], y, c.check, 10);
      text(COL[3], y, c.date, 10, false, MUTED);
      line(M, y - 6, W - M, '0.88 0.89 0.93');
      y -= 18;
    });
    y -= 12;
  });
  if (!report.rows.length) text(M, y, 'Chapter list unavailable — the progress data is still saved in this file.', 10);

  pages.forEach(function (p, i) {
    p.push('BT /F1 8 Tf ' + MUTED + ' rg ' + M + ' 30 Td ' +
      pdfStr('To restore: open My Progress on the class website, press "Import progress" and choose this PDF. Please do not edit it.') + ' Tj ET');
    p.push('BT /F1 8 Tf ' + MUTED + ' rg ' + (W - M - 40) + ' 18 Td ' + pdfStr('Page ' + (i + 1) + ' of ' + pages.length) + ' Tj ET');
  });

  // objects: 1 catalog, 2 pages, 3 F1, 4 F2, 5 filespec, 6 attached JSON, 7 info, 8.. page + content pairs
  var json = new TextEncoder().encode(payloadJson);
  var objs = [];
  var kids = pages.map(function (_, i) { return (8 + i * 2) + ' 0 R'; }).join(' ');
  objs[1] = '<< /Type /Catalog /Pages 2 0 R /Names << /EmbeddedFiles << /Names [(' + ATTACH + ') 5 0 R] >> >> >>';
  objs[2] = '<< /Type /Pages /Kids [' + kids + '] /Count ' + pages.length + ' >>';
  objs[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
  objs[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';
  objs[5] = '<< /Type /Filespec /F (' + ATTACH + ') /UF (' + ATTACH + ') /EF << /F 6 0 R >> /Desc (Progress data for the Cutebot class website) >>';
  objs[6] = { dict: '/Type /EmbeddedFile /Subtype /application#2Fjson /Params << /Size ' + json.length + ' >>', data: json };
  objs[7] = '<< /Title ' + utf16Hex('Cutebot progress — ' + report.name) + ' /Author ' + utf16Hex(report.name) +
    ' /Creator (Micro:bit with Cutebot) /CreationDate (' + pdfDate(when) + ') >>';
  pages.forEach(function (p, i) {
    objs[8 + i * 2] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + W + ' ' + H + '] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ' + (9 + i * 2) + ' 0 R >>';
    objs[9 + i * 2] = { dict: '', data: bytesOf(p.join('\n')) };
  });

  var chunks = [], offsets = [], len = 0;
  function add(u8) { chunks.push(u8); len += u8.length; }
  add(bytesOf('%PDF-1.7\n%\xE2\xE3\xCF\xD3\n'));
  for (var n = 1; n < objs.length; n++) {
    offsets[n] = len;
    var o = objs[n];
    if (typeof o === 'string') add(bytesOf(n + ' 0 obj\n' + o + '\nendobj\n'));
    else {
      add(bytesOf(n + ' 0 obj\n<< ' + o.dict + ' /Length ' + o.data.length + ' >>\nstream\n'));
      add(o.data);
      add(bytesOf('\nendstream\nendobj\n'));
    }
  }
  var xref = 'xref\n0 ' + objs.length + '\n0000000000 65535 f \n';
  for (n = 1; n < objs.length; n++) xref += ('000000000' + offsets[n]).slice(-10) + ' 00000 n \n';
  add(bytesOf(xref + 'trailer\n<< /Size ' + objs.length + ' /Root 1 0 R /Info 7 0 R >>\nstartxref\n' + len + '\n%%EOF\n'));
  return new Blob(chunks, { type: 'application/pdf' });
}

// ── reading the data back out of a PDF ─────────────────────────────────────
function latin1(u8) { var s = ''; for (var i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return s; }
function inflate(u8) {
  if (typeof DecompressionStream !== 'function') return Promise.reject(new Error('no inflate'));
  return new Response(new Blob([u8]).stream().pipeThrough(new DecompressionStream('deflate'))).arrayBuffer()
    .then(function (b) { return new Uint8Array(b); });
}
function asPayload(u8) {
  var t = new TextDecoder().decode(u8).trim();
  if (t.charAt(0) !== '{' || t.indexOf(FORMAT) === -1) return null;
  var p = parse(t, null);
  return p && p.format === FORMAT ? p : null;
}
function extractPayload(buf) {
  // Try every stream: ours is written plainly, but a PDF re-saved by a viewer may compress it.
  var u8 = new Uint8Array(buf), s = latin1(u8), re = /stream\r?\n/g, m, tries = [];
  while ((m = re.exec(s))) {
    if (s.slice(m.index - 3, m.index) === 'end') continue; // "endstream", not a stream start
    var start = m.index + m[0].length, objStart = s.lastIndexOf(' obj', m.index);
    var dict = objStart === -1 ? '' : s.slice(objStart, m.index);
    var lm = /\/Length\s+(\d+)(?!\s+\d+\s+R)/.exec(dict), end;
    if (lm && start + +lm[1] <= u8.length) end = start + +lm[1];
    else { end = s.indexOf('endstream', start); if (end === -1) break; }
    var body = u8.subarray(start, end);
    if (/FlateDecode/.test(dict)) tries.push(function (b) { return function () { return inflate(b).then(asPayload); }; }(body));
    else { var p = asPayload(body); if (p) return Promise.resolve(p); }
    re.lastIndex = end;
  }
  return tries.reduce(function (chain, next) {
    return chain.then(function (found) { return found || next().catch(function () { return null; }); });
  }, Promise.resolve(null));
}

// ── UI ─────────────────────────────────────────────────────────────────────
var CSS = '' +
  '.cb-save{display:inline-flex;align-items:center;gap:.35em;font:700 13px/1 var(--font-body,system-ui,sans-serif);' +
  'color:#1f2a44;background:#fff;border:1.5px solid rgba(15,23,42,.14);border-radius:999px;padding:9px 14px;cursor:pointer;' +
  'box-shadow:0 2px 8px rgba(15,23,42,.12);white-space:nowrap}' +
  '.cb-save:hover{background:#f3f6ff}.cb-save:focus-visible{outline:3px solid #2563eb;outline-offset:2px}' +
  '.cb-save[disabled]{opacity:.6;cursor:progress}' +
  '.edux-badge .cb-save{margin-right:8px}' +
  '.cb-save--float{position:fixed;right:12px;top:12px;z-index:950;display:none}' +
  '.cb-save--float.is-on{display:inline-flex}' +
  '@media (max-width:640px){.cb-save .cb-save__t{display:none}.cb-save{padding:9px 11px}}' +
  '.cb-import-row{margin:14px 0 0;padding-top:14px;border-top:1px dashed rgba(15,23,42,.15);text-align:center}' +
  '.prog-dash>.cb-import-row{margin:0 0 16px;padding:12px 16px;border:1.5px dashed rgba(15,23,42,.18);border-radius:16px;' +
  'display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;text-align:left}' +
  '.cb-import-row p{margin:0 0 8px;font-size:.9rem;color:var(--color-muted,#5b607a)}' +
  '.prog-dash>.cb-import-row p{margin:0}' +
  '.cb-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:1000;max-width:min(92vw,440px);' +
  'background:#1f2a44;color:#fff;padding:12px 16px;border-radius:12px;font:600 14px/1.4 system-ui,sans-serif;' +
  'box-shadow:0 8px 24px rgba(0,0,0,.25)}.cb-toast a{color:#fde68a}';

function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
var toastTimer;
function toast(html, ms) {
  var t = document.querySelector('.cb-toast') || document.body.appendChild(el('div', 'cb-toast'));
  t.setAttribute('role', 'status'); t.innerHTML = html;
  clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.remove(); }, ms || 5000);
}
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function saveButton(extra) {
  var b = el('button', 'cb-save' + (extra ? ' ' + extra : ''), '<span aria-hidden="true">💾</span><span class="cb-save__t">Save progress</span>');
  b.type = 'button'; b.title = 'Save progress as a PDF'; b.setAttribute('aria-label', 'Save progress as a PDF');
  b.addEventListener('click', onSave);
  return b;
}

function onSave(ev) {
  var btn = ev && ev.currentTarget, student = currentStudent();
  if (!student) {
    toast('Type your name on <a href="' + esc(ROOT + 'progress.html') + '">My Progress</a> first, so the file has your name on it.', 7000);
    return;
  }
  if (btn) btn.disabled = true;
  var when = new Date(), data = collect(student.id);
  var payload = { format: FORMAT, version: VERSION, savedAt: when.toISOString(), site: ROOT, account: PREFIX, student: student, data: data };
  loadLevels().then(function (levels) {
    var blob = makePdf(buildReport(student, data, levels), JSON.stringify(payload, null, 1), when);
    var day = when.getFullYear() + '-' + ('0' + (when.getMonth() + 1)).slice(-2) + '-' + ('0' + when.getDate()).slice(-2);
    var a = el('a'); a.href = URL.createObjectURL(blob);
    a.download = 'cutebot-progress-' + (student.name.replace(/[^A-Za-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '') || 'student') + '-' + day + '.pdf';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 10000);
    toast('Saved! Keep this PDF and import it next class.');
  }).catch(function () { toast('Sorry — the PDF could not be made. Please try again.'); })
    .then(function () { if (btn) btn.disabled = false; });
}

var picker;
function onImport() {
  if (!picker) {
    picker = el('input'); picker.type = 'file'; picker.accept = 'application/pdf,.pdf'; picker.hidden = true;
    document.body.appendChild(picker);
    picker.addEventListener('change', function () {
      var f = picker.files && picker.files[0]; picker.value = '';
      if (!f) return;
      f.arrayBuffer().then(extractPayload).then(function (p) {
        if (!p) { toast('That PDF has no Cutebot progress in it. Choose the file made by "Save progress".', 7000); return; }
        var r = restore(p);
        toast('Welcome back, ' + esc(r.name) + '! Your progress is restored.');
        setTimeout(function () { location.reload(); }, 1200);
      }).catch(function (e) { toast(esc((e && e.message) || 'Could not read that file.'), 7000); });
    });
  }
  picker.click();
}
function importButton() {
  var b = el('button', 'btn btn--ghost cb-import', '📂 Import progress');
  b.type = 'button'; b.addEventListener('click', onImport);
  return b;
}

var headerBtn, floatBtn, badgeSeen;
function ensureUI() {
  var badge = document.querySelector('.edux-badge');
  if (badge && !badge.querySelector('.cb-save')) { headerBtn = saveButton(); badge.insertBefore(headerBtn, badge.firstChild); }
  if (badge && badge !== badgeSeen && io) { if (badgeSeen) io.unobserve(badgeSeen); io.observe(badge); badgeSeen = badge; }
  if (!badge && floatBtn) floatBtn.classList.add('is-on'); // no header chip on this page: always float

  var dash = document.querySelector('.prog-dash');
  if (dash) {
    var card = dash.querySelector('.login-card');
    if (card && !card.querySelector('.cb-import')) {
      var row = el('div', 'cb-import-row', '<p>Coming back from another computer?</p>');
      row.appendChild(importButton());
      card.appendChild(row);
    }
    var tabs = dash.querySelector('.dash-tabs');
    if (tabs && !dash.querySelector(':scope > .cb-import-row')) {
      var bar = el('div', 'cb-import-row', '<p>End of class? Press <b>💾 Save progress</b> (top corner) and keep the PDF. Next time, import it here.</p>');
      bar.appendChild(importButton());
      tabs.parentNode.insertBefore(bar, tabs.nextSibling);
    }
  }
}
function placeFloat() {
  if (!floatBtn) return;
  var nav = document.querySelector('nav.progress-bar'), top = 12;
  if (nav) { var r = nav.getBoundingClientRect(); if (r.top <= 1 && r.bottom > 0) top = r.bottom + 8; }
  floatBtn.style.top = top + 'px';
}
var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
  es.forEach(function (e) { floatBtn.classList.toggle('is-on', !e.isIntersecting); placeFloat(); });
}) : null;

function start() {
  var st = el('style'); st.setAttribute('data-cb-progress', ''); st.textContent = CSS; document.head.appendChild(st);
  floatBtn = saveButton('cb-save--float'); document.body.appendChild(floatBtn);
  if (!io) floatBtn.classList.add('is-on');
  ensureUI();
  var pending = false;
  new MutationObserver(function () {
    if (pending) return; pending = true;
    requestAnimationFrame(function () { pending = false; ensureUI(); });
  }).observe(document.body, { childList: true, subtree: true });
  var ticking = false;
  addEventListener('scroll', function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { ticking = false; placeFloat(); });
  }, { passive: true });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

window.CBProgress = { save: onSave, import: onImport, extract: extractPayload, restore: restore, merge: mergeValue };
})();
