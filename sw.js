/* sw.js — engine/tools/gen_site_chrome.py 가 생성한다. 손대지 말 것.
 * 단일 입력 = course.config.yaml `site:` · 계약 = engine/docs/site_chrome.md
 */
var CACHE = 'cutebot-stem-2ec41d98';
var SHELL = [
  "./",
  "_assets/css/cb-home.css",
  "_assets/css/cutebot.css",
  "_assets/fonts/archivo.woff2",
  "_assets/fonts/atkinson-next.woff2",
  "_assets/fonts/baloo2.woff2",
  "_assets/fonts/fredoka.woff2",
  "_assets/js/assess-skin.js",
  "_assets/js/cb-home.js",
  "_assets/js/cb-lesson.js",
  "_assets/js/edux-buddy-extra.js",
  "_assets/js/edux-buddy-lines.js",
  "_assets/js/edux-buddy.js",
  "_assets/js/edux-build.js",
  "_assets/js/edux-center.js",
  "_assets/js/edux-chrome.js",
  "_assets/js/edux-puzzle.js",
  "_assets/js/hero-object.js",
  "_assets/js/mb-lesson.js",
  "_assets/icons/favicon.svg",
  "_assets/clips/case01.jpg",
  "_assets/clips/case01.mp4",
  "_assets/clips/case01.webm",
  "_assets/clips/case02.jpg",
  "_assets/clips/case02.mp4",
  "_assets/clips/case02.webm",
  "_assets/clips/case03.jpg",
  "_assets/clips/case03.mp4",
  "_assets/clips/case03.webm",
  "_assets/clips/case04.jpg",
  "_assets/clips/case04.mp4",
  "_assets/clips/case04.webm",
  "_assets/clips/case05.jpg",
  "_assets/clips/case05.mp4",
  "_assets/clips/case05.webm",
  "_assets/clips/case06.jpg",
  "_assets/clips/case06.mp4",
  "_assets/clips/case06.webm",
  "_assets/clips/case07.jpg",
  "_assets/clips/case07.mp4",
  "_assets/clips/case07.webm",
  "_assets/clips/case08.jpg",
  "_assets/clips/case08.mp4",
  "_assets/clips/case08.webm",
  "_assets/clips/case09.jpg",
  "_assets/clips/case09.mp4",
  "_assets/clips/case09.webm",
  "_assets/clips/case10.jpg",
  "_assets/clips/case10.mp4",
  "_assets/clips/case10.webm",
  "_assets/clips/case11.jpg",
  "_assets/clips/case11.mp4",
  "_assets/clips/case11.webm",
  "_assets/clips/case12.jpg",
  "_assets/clips/case12.mp4",
  "_assets/clips/case12.webm",
  "_assets/clips/case14.jpg",
  "_assets/clips/case14.mp4",
  "_assets/clips/case14.webm",
  "_assets/clips/case15.jpg",
  "_assets/clips/case15.mp4",
  "_assets/clips/case15.webm",
  "blocks.html",
  "progress.html",
  "level1/index.html",
  "level2/index.html",
  "level3/index.html",
  "level4/index.html",
  "level5/index.html",
  "level6/index.html",
  "./offline.html"
];
// 수업 전 미리 받기 — `site.offline_precache: true` 인 앱만 채워진다.
var PAGES = [
  "./alignment.html",
  "./blocks.html",
  "./index.html",
  "./level1/assessment/level1_ch1_assessment.html",
  "./level1/assessment/level1_ch1_assessment_key.html",
  "./level1/assessment/level1_ch2_assessment.html",
  "./level1/assessment/level1_ch2_assessment_key.html",
  "./level1/assessment/level1_ch3_assessment.html",
  "./level1/assessment/level1_ch3_assessment_key.html",
  "./level1/assessment/level1_ch4_assessment.html",
  "./level1/assessment/level1_ch4_assessment_key.html",
  "./level1/assessment/level1_ch5_assessment.html",
  "./level1/assessment/level1_ch5_assessment_key.html",
  "./level1/index.html",
  "./level1/level1_ch1.html",
  "./level1/level1_ch2.html",
  "./level1/level1_ch3.html",
  "./level1/level1_ch4.html",
  "./level1/level1_ch5.html",
  "./level2/assessment/level2_ch1_assessment.html",
  "./level2/assessment/level2_ch1_assessment_key.html",
  "./level2/assessment/level2_ch2_assessment.html",
  "./level2/assessment/level2_ch2_assessment_key.html",
  "./level2/index.html",
  "./level2/level2_ch1.html",
  "./level2/level2_ch2.html",
  "./level3/assessment/level3_ch1_assessment.html",
  "./level3/assessment/level3_ch1_assessment_key.html",
  "./level3/assessment/level3_ch2_assessment.html",
  "./level3/assessment/level3_ch2_assessment_key.html",
  "./level3/index.html",
  "./level3/level3_ch1.html",
  "./level3/level3_ch2.html",
  "./level4/assessment/level4_ch1_assessment.html",
  "./level4/assessment/level4_ch1_assessment_key.html",
  "./level4/assessment/level4_ch2_assessment.html",
  "./level4/assessment/level4_ch2_assessment_key.html",
  "./level4/index.html",
  "./level4/level4_ch1.html",
  "./level4/level4_ch2.html",
  "./level5/assessment/level5_ch1_assessment.html",
  "./level5/assessment/level5_ch1_assessment_key.html",
  "./level5/assessment/level5_ch2_assessment.html",
  "./level5/assessment/level5_ch2_assessment_key.html",
  "./level5/assessment/level5_ch3_assessment.html",
  "./level5/assessment/level5_ch3_assessment_key.html",
  "./level5/index.html",
  "./level5/level5_ch1.html",
  "./level5/level5_ch2.html",
  "./level5/level5_ch3.html",
  "./level6/assessment/level6_ch1_assessment.html",
  "./level6/assessment/level6_ch1_assessment_key.html",
  "./level6/index.html",
  "./level6/level6_ch1.html",
  "./progress.html",
  "./teacher-guide.html",
  "./teacher.html",
  "./_data/level1_ch1.predict.json",
  "./_data/level1_ch1_assessment.key.json",
  "./_data/level1_ch2.predict.json",
  "./_data/level1_ch2_assessment.key.json",
  "./_data/level1_ch3.predict.json",
  "./_data/level1_ch3_assessment.key.json",
  "./_data/level1_ch4.predict.json",
  "./_data/level1_ch4_assessment.key.json",
  "./_data/level1_ch5.predict.json",
  "./_data/level1_ch5_assessment.key.json",
  "./_data/level2_ch1.predict.json",
  "./_data/level2_ch1_assessment.key.json",
  "./_data/level2_ch2.predict.json",
  "./_data/level2_ch2_assessment.key.json",
  "./_data/level3_ch1.predict.json",
  "./_data/level3_ch1_assessment.key.json",
  "./_data/level3_ch2.predict.json",
  "./_data/level3_ch2_assessment.key.json",
  "./_data/level4_ch1.predict.json",
  "./_data/level4_ch1_assessment.key.json",
  "./_data/level4_ch2.predict.json",
  "./_data/level4_ch2_assessment.key.json",
  "./_data/level5_ch1.predict.json",
  "./_data/level5_ch1_assessment.key.json",
  "./_data/level5_ch2.predict.json",
  "./_data/level5_ch2_assessment.key.json",
  "./_data/level5_ch3.predict.json",
  "./_data/level5_ch3_assessment.key.json",
  "./_data/level6_ch1.predict.json",
  "./_data/level6_ch1_assessment.key.json",
  "./_assets/icons/apple-touch-icon.png",
  "./_assets/kit/aaa_batteries.svg",
  "./_assets/kit/cutebot.svg",
  "./_assets/kit/microbit.svg",
  "./_assets/kit/usb_cable.svg"
];

// ── 페이지 열쇠는 한 모양 (2026-09-28, N19) ─────────────────────────────────
// 배포본은 Vercel `cleanUrls` 다: `/level1/ch1.html` → 308 → `/level1/ch1`, `/level1/index.html`
// → `/level1`, `/level1/` → `/level1`. 한 페이지가 주소 셋을 갖는다. 페이지 안 링크는 `.html`
// 이고 주소창은 깨끗한 모양이라, 주소를 그대로 열쇠로 쓰면 **본 페이지인데 오프라인에서 못
// 연다**(열쇠가 다르다). 그래서 페이지는 `.html` · `/index` · 끝 빗금을 뗀 한 모양으로 넣고 찾는다.
function isPagePath(p) {
  var last = p.slice(p.lastIndexOf('/') + 1);
  return last === '' || /\.html$/.test(last) || last.indexOf('.') === -1;
}
function pageKey(u) {
  var url = new URL(u, self.location.href);
  var p = url.pathname.replace(/\.html$/, '').replace(/(^|\/)index$/, '$1');
  if (p.length > 1) p = p.replace(/\/$/, '');
  return url.origin + p;
}
function keyFor(u) {
  var url = new URL(u, self.location.href);
  return isPagePath(url.pathname) ? pageKey(url.href) : url.href;
}
var OFFLINE = pageKey('./offline.html');

// ── 리다이렉트를 거친 응답은 **그대로 저장하지 않는다** ────────────────────────
// `.html` 을 받으면 서버가 308 로 돌리고 fetch 가 따라간다 → 응답에 `redirected` 표시가
// 붙는다. 그 응답을 항해에 내주면 브라우저는 그것을 **또 한 번의 리다이렉트**로 다루거나
// 거절한다 — 받아 둔 페이지가 오프라인에서 오류 화면이 됐다(offline.html 폴백까지). 본문을
// 새 응답으로 다시 지어 넣는다. 항해의 수동 리다이렉트(opaqueredirect)는 넣지 않는다 —
// 브라우저가 그 다음 주소를 다시 요청하고, 그 200 이 같은 열쇠로 들어간다.
function storable(res) {
  return res && res.status === 200 && res.type === 'basic';
}
function rebuilt(res) {
  if (!res.redirected) return Promise.resolve(res);
  return res.blob().then(function (b) {
    return new Response(b, { status: res.status, statusText: res.statusText, headers: res.headers });
  });
}
function put(c, key, res) {
  return rebuilt(res).then(function (r) { return c.put(key, r); });
}
// 목록(셸·미리 받기)의 한 주소를 받아 제 열쇠로 넣는다. 실패는 삼킨다 — 하나 빠졌다고
// 나머지를 포기할 이유는 없다. cache:'reload' 로 브라우저 HTTP 캐시를 우회한다.
function fetchInto(c, u) {
  return fetch(new Request(u, { cache: 'reload' })).then(function (res) {
    if (storable(res)) return put(c, keyFor(u), res);
  }).catch(function () {});
}

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(SHELL.map(function (u) { return fetchInto(c, u); }));
  }).then(function () { return self.skipWaiting(); }));
});

// ── 지우는 것은 **이 앱 셸의 옛 판**뿐이다 (2026-09-29, N23) ────────────────────
// 전에는 이름이 다른 캐시를 **전부** 지웠다. 같은 출처의 캐시는 SW 것만이 아니다 —
// 발음 mp3 는 `EDUXTts` 가 제 캐시(`ohana-tts-v5` · `english-core-tts-v1`)에 넣는다. 그래서
// 배포(= 캐시 이름이 바뀜)마다 학생 기기의 받아 둔 소리가 통째로 지워졌고, 인터넷 없는
// 교실에서는 원음 대신 기기 음성이 나왔다. 셸 이름은 `<앱>-<8자 해시>` 한 모양이다
// (`dev` = 자산 없는 빌드 · `v<n>` = 해시 전 손번호 시절). 「앱 이름으로 시작」으로 넓히면
// `ohana-tts-v5` 가 다시 걸린다 — 모양 전체를 맞춘다.
// 줄기에는 앱이 `site.legacy_caches:` 로 선언한 **옛 셸 이름**도 든다(2026-09-29, N33) —
// 이름을 바꾸기 전의 셸은 지금 줄기와 달라 영영 안 지워졌다 — 옛 줄기는 앱이 안다(엔진은 모른다).
var OWN = /^(?:cutebot-stem)-(?:[0-9a-f]{8}|dev|v\d+)$/;

// ── 옛 셸에만 든 것은 지우기 전에 새 셸로 옮겨 담는다 (2026-10-01, N62) ────────────────────
// 배포 직후 학생이 연 챕터는 아직 **옛 SW** 가 받아 옛 셸에 넣는다(넘겨받기 몇 초 동안의 항해도).
// 새 SW 가 활성화되며 옛 셸을 통째로 지우면 그 챕터는 이 기기에서 한 번도 안 연 것이 된다 —
// 끊긴 교실에서 `offline.html` 안내가 떴다(미리 받기 안 하는 앱 다섯). 그래서 지우기 전에 옮긴다:
//   · 페이지 · `_data/` 키 — network-first 라 온라인이면 네트워크가 먼저 답한다. 옛 사본은 끊긴
//     동안의 마지막 수단일 뿐이다. 페이지 열쇠는 지금 모양(`pageKey`)으로 다시 짓고 리다이렉트
//     표시는 `marked` 가 새 응답으로 다시 지으며 벗긴다 — 옛 열쇠 규칙 시절의 셸에서 와도 항해에 쓸 수 있다.
//   · 그림·소리 같은 나머지 — cache-first 라 옮긴 채 두면 **바뀐 그림의 옛 바이트가 계속 나간다**.
//     그래서 표식(`MARK` 머리)을 달아 넣고, 아래 자산 길이 그 표식을 보면 **처음 쓸 때 한 번**
//     네트워크로 다시 받아 표식 없는 새 사본으로 바꾼다. 끊겨서 못 받으면 옮긴 사본을 낸다.
//     ⚠️ 활성화 안에서 한꺼번에 다시 받지 않는다 — 활성화가 끝날 때까지 **모든 항해가 멈춘다**
//     (SW 는 activating 동안 fetch 를 붙잡아 둔다). 처음 판은 그렇게 했고, 그림 40장 · 왕복 0.3초면
//     배포 직후 챕터 하나 여는 데 13.6초였다(N62 검수 실측, 수정 전 1.1초).
//   ⛔ 코드(`.css`·`.js`·`.mjs`)는 옮기지 않는다 — 셸 이름의 해시와 `?v=` 가 판을 정하는 자리다.
//      옮기는 순간 새 판이 옛 코드를 낸다(N56 이 막은 그것).
// 새 셸에 이미 있는 열쇠는 덮지 않는다(새 것이 이긴다). 옮긴 페이지·키에도 같은 표식을 단다 — 미리 받기가
// 그것을 보고 이번 판으로 다시 받는다. 표식은 캐시에 남으므로 SW 가 도중에 멈췄다 깨어나도 잊지 않는다
// (전에는 메모리 목록 `CARRIED` 였다 — 미리 받기가 활성화 밖으로 나간 뒤로는 그 사이 재시작에 사라진다, N64).
var MARK = 'x-edux-carried';
function marked(res) {
  return res.blob().then(function (b) {
    var h = new Headers(res.headers);
    h.set(MARK, '1');
    return new Response(b, { status: res.status, statusText: res.statusText, headers: h });
  });
}
// 옛 셸의 사본은 받은 그대로(`basic`)이거나 **우리가 다시 지은 것**(`default` — 표식 단 사본 · 리다이렉트를
// 벗긴 지면)이다. `storable` 은 네트워크 응답용이라 `basic` 만 받는데, 그것을 여기 쓰면 한 번 옮긴 사본이
// **다음 배포에서 버려진다** — 옛 SW 밑에서 연 챕터가 배포 두 번 뒤 끊긴 교실에서 `offline.html` 이 됐다
// (N64 검수 실측, python-stem: 지면도 표식 사본으로 옮기게 된 N64 에서 드러났다. 그림은 N62 부터 그랬다).
function carriable(res) {
  return res && res.status === 200 && (res.type === 'basic' || res.type === 'default');
}
function carryOld() {
  return caches.keys().then(function (ks) {
    // 새로 만든 것부터 — 같은 열쇠가 여러 옛 셸에 있으면 가장 최근 판을 옮긴다
    var old = ks.filter(function (k) { return k !== CACHE && OWN.test(k); }).reverse();
    if (!old.length) return;
    return caches.open(CACHE).then(function (c) {
      return old.reduce(function (chain, name) {
        return chain.then(function () {
          return caches.open(name).then(function (o) {
            return o.keys().then(function (reqs) {
              return Promise.all(reqs.map(function (req) {
                var url = new URL(req.url);
                if (url.origin !== self.location.origin || /\.(css|m?js)$/.test(url.pathname)) return;
                var page = isPagePath(url.pathname);
                var key = page ? pageKey(url.href) : req.url;
                return c.match(key).then(function (have) {
                  if (have) return;
                  return o.match(req).then(function (res) {
                    if (!carriable(res)) return;
                    return marked(res).then(function (r) { return c.put(key, r); });
                  });
                });
              }));
            });
          });
        });
      }, Promise.resolve());
    });
  }).catch(function () {});                 // 옮기기가 실패해도 활성화는 끝까지 간다
}

// ── 활성화는 옮기기 · 지우기 · 넘겨받기까지만 — 미리 받기는 **그 뒤에** 돈다 (2026-10-02, N64) ─────
// SW 는 activating 동안 들어온 fetch 를 활성화가 끝날 때까지 붙잡는다. 전에는 미리 받기가 활성화의
// waitUntil 안에 있어서, 첫 방문과 배포 직후마다 학생의 다음 항해가 **전 페이지를 다 받을 때까지**
// 멈췄다(web-studio · 페이지 164장 · 장당 0.25초 망에서 챕터 하나 여는 데 41초 — N64 실측).
var ACTIVATING = null;
self.addEventListener('activate', function (e) {
  ACTIVATING = carryOld().then(function () { return caches.keys(); }).then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE && OWN.test(k); })
                         .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); });
  e.waitUntil(ACTIVATING);
  ACTIVATING.then(precache, precache);
});

// 미리 받기는 이 SW 판에 한 번 — 여러 사건이 같은 약속을 나눠 쥔다. 활성화 밖에서 도는 일은 브라우저가
// 사건이 없는 SW 를 멈출 때(30초쯤) 같이 끊긴다. 그래서 들어오는 사건(항해·자산 fetch · 페이지의 메시지)이
// 끝나지 않은 미리 받기를 제 waitUntil 에 걸어 SW 를 살려 두고, 멈췄다 깨어난 SW 는 그 첫 사건에서
// 이어 받는다(이미 받은 것은 건너뛴다 — 아래 `prefetchPages`). 사건의 waitUntil 은 활성화와 달리
// 다른 fetch 를 붙잡지 않는다.
var PREFETCH = null, PREFETCHED = !PAGES.length;
function precache() {
  if (!PREFETCH) PREFETCH = Promise.resolve(ACTIVATING).catch(function () {})
    .then(prefetchPages).catch(function () {})
    .then(function () { PREFETCHED = true; });
  return PREFETCH;
}
function keepPrefetching(e) {
  if (!PREFETCHED && !superseded()) e.waitUntil(precache());
}
// ── 새 판이 설치 중이거나 기다리면 이 판의 미리 받기는 멈춘다 (2026-10-03, N67) ─────────────
// 크롬은 대기 중인 새 SW 를 **이 SW 의 사건이 다 끝날 때** 활성화한다(skipWaiting 이어도). 위처럼
// 사건마다 미리 받기를 waitUntil 에 걸어 두었으니, 배포가 미리 받기 도중에 나가면 새 판은 남은 지면을
// 다 받을 때까지 서지 못했다 — 그동안 학생은 옛 판을 받는다(web-studio · 남은 157장 · 장당 3초 망이면
// 8분). 어차피 활성화하는 새 SW 가 제 셸에 처음부터 다시 받는다(옮겨 온 지면은 표식으로 알아본다) —
// 옛 판이 마저 받을 까닭이 없다. 그래서 지면 한 장마다 묻고, 받던 한 장만 끝내고 멈춘다.
function superseded() {
  var r = self.registration;
  return !!(r && (r.installing || r.waiting));
}

// ── 페이지가 묻는다: 「지금 셸 캐시가 무엇이고, 이 앱 셸은 어느 것들인가」 (N33) ──────────
// 셸 이름(해시)과 `OWN` 규칙을 아는 것은 SW 뿐이다. 엔진(`edux-chrome.js`)이 이것으로
// ① 교사 패널 「Clear saved pages」가 **셸만** 지우고(발음 mp3 는 둔다)
// ② 챕터 자동 저장 표식을 **셸 판에 묶는다**(배포 뒤 새 셸에 다시 받는다).
// ③ 미리 받기 진행(`saved`/`total`)을 학생 화면의 작은 알약으로 보인다(2026-10-18) — 받는 동안
//    「오프라인용 저장 중 45%」, 다 받으면 「오프라인 준비 완료」. 수업 전 교사가 기기를 확인한다.
//    `total` 0 = 미리 받기 안 하는 앱(알약 없음). 옮겨 온 옛 판(`MARK`)은 받은 것으로 세지 않는다.
//    묻는 메시지 자체가 `keepPrefetching` 을 부르므로, 화면이 열려 있는 동안 SW 는 계속 받는다.
function savedCount() {
  if (!PAGES.length) return Promise.resolve(0);
  return caches.open(CACHE).then(function (c) {
    return Promise.all(PAGES.map(function (u) {
      return c.match(keyFor(u)).then(function (hit) { return hit && !hit.headers.get(MARK) ? 1 : 0; });
    }));
  }).then(function (a) { return a.reduce(function (s, x) { return s + x; }, 0); });
}
self.addEventListener('message', function (e) {
  keepPrefetching(e);
  var d = e.data || {};
  var port = e.ports && e.ports[0];
  if (d.type !== 'edux:sw-info' || !port) return;
  e.waitUntil(Promise.all([caches.keys(), savedCount()]).then(function (r) {
    port.postMessage({ cache: CACHE, own: r[0].filter(function (k) { return OWN.test(k); }),
                        saved: r[1], total: PAGES.length, done: PREFETCHED });
  }));
});

// 전 페이지 미리 받기 — **활성화가 끝난 뒤**(`precache`), 한 번에 하나씩.
// 설치(install)에 넣지 않는 이유: 셸은 즉시 필요하지만 이건 아니고, 수십 MB 를
// 설치에 묶으면 새 판이 그만큼 늦게 서고, 5분 안에 못 끝내면 설치가 통째로 실패한다.
// 활성화에 넣지 않는 이유는 위(N64) — 그동안 모든 항해가 멈춘다.
// 옛 셸에서 옮겨 온 페이지·키(표식 `MARK`)는 「있다」로 치지 않는다 — 옛 판이라 이번 판으로 다시 받는다.
// 끊겨서 못 받으면 옮긴 옛 판이 그대로 남는다(안내 페이지보다 낫다).
// 새 판이 설치 중이거나 기다리면 다음 장으로 가지 않는다(`superseded`, N67).
function prefetchPages() {
  if (!PAGES.length) return Promise.resolve();
  return caches.open(CACHE).then(function (c) {
    return PAGES.reduce(function (chain, u) {
      return chain.then(function () {
        if (superseded()) return;              // 새 판이 왔다 — 그것이 이어 받는다 (N67)
        return c.match(keyFor(u)).then(function (hit) {
          return hit && !hit.headers.get(MARK) ? null : fetchInto(c, u);
        });
      });
    }, Promise.resolve());
  });
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  var url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  keepPrefetching(e);
  // 페이지 = 항해 · HTML 을 원하는 요청 · **페이지 모양의 주소**(엔진 `_offAuto` 가
  // `fetch(location.href)` 로 챕터를 받아 둘 때 — 그것도 같은 열쇠로 들어가야 한다).
  var isPage = req.mode === 'navigate' ||
               (req.headers.get('accept') || '').indexOf('text/html') !== -1 ||
               isPagePath(url.pathname);
  if (isPage) {
    var key = pageKey(req.url);
    e.respondWith(fetch(req).then(function (res) {
      if (storable(res)) {
        var copy = res.clone();
        e.waitUntil(caches.open(CACHE).then(function (c) { return put(c, key, copy); }));
      }
      return res;
    }).catch(function () {
      // 캐시에 있으면 그것을, 없으면 **명시적 안내 페이지**를 준다.
      // 예전에는 여기서 홈('./')을 줬다 — 오프라인에서 안 받아둔 챕터를 누르면
      // 오류 없이 홈이 뜨고(HTTP 200), 게다가 홈 HTML 이 챕터 URL 에서 서빙되니
      // 상대 경로 자산이 어긋나 폰트까지 빠졌다(2026-08-24 실측, 3앱 동일 재현).
      // 학생이 무엇을 잘못했는지 알 방법이 없었다. 정직한 폴백이 조용한 오답보다 낫다.
      return caches.match(key).then(function (m) {
        return m || caches.match(OFFLINE);
      }).then(function (m) { return m || Response.error(); });
    }));
    return;
  }
  // 정답·예습 키(`_data/` 아래 전부)도 **network-first** — 페이지와 같은 길이어야 한다.
  // 확인지 HTML(보기 순서)은 network-first 인데 그 정답 키만 cache-first 였고, 캐시
  // 이름은 CSS·JS 해시라 키가 바뀌어도 안 바뀐다. 그래서 보기 순서를 돌린 배포 뒤
  // 돌아온 학생은 **새 보기 + 옛 키**를 받았다 — 맞는 보기가 빨갛게, 틀린 보기가
  // 초록으로 떴다(2026-09-27 실측, scratch-stem 확인지 회전 B2). 끊기면 받아 둔 키를 쓴다.
  if (url.pathname.indexOf('/_data/') !== -1) {
    e.respondWith(fetch(req).then(function (res) {
      if (res && res.status === 200 && res.type === 'basic') {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (m) {
        return m || caches.match(req, { ignoreSearch: true });
      });
    }));
    return;
  }
  // 자산은 cache-first — 단 **새 `?v=` 에 옛 바이트를 내주지 않는다** (2026-10-01, N56).
  // 셸은 `_assets/css/x.css`(쿼리 없음)로 들고 페이지는 `x.css?v=<내용 해시>` 를 청한다.
  // 전에는 정확 일치가 없으면 곧장 쿼리를 무시한 일치를 내줬다. 그런데 배포 뒤 첫 새로고침은
  // 새 지면(network-first)이 새 해시를 청하는데 그것을 받는 것은 **아직 옛 SW 와 옛 셸**이다 —
  // 학생은 배포마다 한 번 옛 화면을, JS 는 새 지면 위의 옛 코드를 받았다(N52 실측, web-studio).
  // 그래서 쿼리 없는 사본은 ① 그 바이트의 sha256 앞 8자가 `?v=` 와 같을 때(같은 판 — 빌드의
  // `asset_stamp` 와 같은 해시) 그대로 쓰고 ② 아니면 네트워크에서 받는다 ③ 끊겼을 때만 마지막
  // 수단으로 쓴다 — 오프라인에서 정확 일치만 보면 미리 받은 챕터가 **맨 글꼴로 뜬다**(2026-08-24
  // 실측: 제목은 맞는데 Times New Roman). ①이 있어야 셸에 이미 든 Skulpt 를 판마다 또 받지 않는다.
  e.respondWith(caches.match(req).then(function (m) {
    if (m && !m.headers.get(MARK)) return m;
    // 옛 셸에서 옮겨 온 사본(N62) — 이번 판을 한 번 받아 바꿔 넣는다. 기본 fetch 라 HTTP 캐시의
    // 재검증(안 바뀌었으면 304)을 탄다. 끊겼거나 없어졌으면 옮긴 사본을 낸다(영상의 범위 요청 206 은
    // 그대로 낸다 — 저장은 못 하니 표식이 남고, 끊긴 날 옮긴 사본이 답한다).
    if (m) return fetch(req).then(function (res) {
      if (!storable(res)) return res.ok ? res : m;
      var copy = res.clone();
      e.waitUntil(caches.open(CACHE).then(function (c) { return c.put(req, copy); }));
      return res;
    }).catch(function () { return m; });
    return caches.open(CACHE).then(function (c) {
      return c.match(req, { ignoreSearch: true }).then(function (bare) {
        return sameVersion(req, bare).then(function (same) {
          if (same) {
            var keep = bare.clone();
            e.waitUntil(c.put(req, keep));
            return bare;
          }
          return fetch(req).then(function (res) {
            if (res && res.status === 200 && res.type === 'basic') {
              var copy = res.clone();
              e.waitUntil(c.put(req, copy));
            }
            return res;
          }).catch(function () { return bare || Response.error(); });
        });
      });
    });
  }));
});

// 쿼리 없는 사본이 이 요청의 판인가 — `?v=` 가 8자 16진(빌드 `asset_stamp` 의 sha256 앞 8자)일 때만
// 견준다. 그 밖의 모양(손번호·없음)은 판을 모르므로 같다고 하지 않는다 → 온라인이면 네트워크가 답한다.
function sameVersion(req, res) {
  var v = new URL(req.url).searchParams.get('v');
  if (!res || !v || !/^[0-9a-f]{8}$/.test(v) || !(self.crypto && crypto.subtle)) return Promise.resolve(false);
  return res.clone().arrayBuffer().then(function (b) {
    return crypto.subtle.digest('SHA-256', b);
  }).then(function (h) {
    var s = '', a = new Uint8Array(h);
    for (var i = 0; i < 4; i++) s += ('0' + a[i].toString(16)).slice(-2);
    return s === v;
  }).catch(function () { return false; });
}
