/* cb-lesson.js — 이 앱에만 있는 상호작용: **주행 실험대(Drive Lab)**.
 *
 * 공유 상호작용(재생기·퍼즐·체크리스트·Predict)은 mb-lesson.js 가 진다 —
 * 그 파일은 형제 앱 microbit-stem 과 byte-identical 로 유지하므로 여기에 섞지 않는다.
 *
 * 왜 필요한가: Extend 가 산문이면 학생이 할 수 있는 일이 "읽는다" 뿐이다.
 * 🟡 "1미터 앞 선에서 멈추는 값을 찾아라" 는 **찾는** 과제인데, 찾을 곳이 없으면
 * 그냥 문장이다. 실험대는 값을 바꾸면 경로가 즉시 다시 그려지므로 학생이
 * 페이지 위에서 가설을 세우고 확인한 뒤, 그 값을 들고 실물 로봇으로 간다.
 *
 * ⚠ 이 시뮬레이션은 cb_drive.py 와 **같은 모델**이다 (v=(vL+vR)/2 · ω=(vL-vR)/TRACK,
 *   SVG y 가 아래로 자라므로 ω>0 = 화면 시계방향 = 오른쪽으로 휜다).
 *   숫자가 갈리면 페이지 안에서 두 그림이 서로를 반박한다 — 상수를 고칠 때 둘 다 고친다.
 *   그리고 둘 다 근사치다: 실제 거리는 건전지와 바닥이 정한다(C35). 실험대는
 *   **어느 방향으로 얼마나** 를 주고, 정확한 값은 학생이 바닥에서 잰다.
 */
(function () {
  'use strict';

  var SPEED_MAX_CMS = 40.0;   // cb_drive.SPEED_MAX_CMS 와 같은 값
  var TRACK_CM = 9.0;         // cb_drive.TRACK_CM
  var PX_PER_CM = 2.4;

  function all(sel, root) {
    return [].slice.call((root || document).querySelectorAll(sel));
  }

  /* 좌우 바퀴 속도(%)와 시간(초) → 경로 점들. cb_drive.simulate 의 축약판. */
  function simulate(vl, vr, secs) {
    var x = 0, y = 0, th = -Math.PI / 2, dist = 0;
    var left = vl / 100 * SPEED_MAX_CMS, right = vr / 100 * SPEED_MAX_CMS;
    var v = (left + right) / 2, w = (left - right) / TRACK_CM;
    var steps = Math.max(2, Math.round(secs * 30)), dt = secs / steps;
    var pts = [[0, 0]];
    for (var i = 0; i < steps; i++) {
      th += w * dt;
      x += v * Math.cos(th) * dt;
      y += v * Math.sin(th) * dt;
      dist += Math.abs(v) * dt;
      pts.push([x, y]);
    }
    return { pts: pts, dist: dist };
  }

  // 놀이터 상자의 가로세로 비 — CSS 의 `.cbp__svg{aspect-ratio}` 와 **같은 값이어야
  // 한다.** 2.0 은 너무 납작했다: 세로로 달리는 경로를 가로 2배 상자에 넣으니 좌우가
  // 통째로 비고 차가 상자 폭의 3.6% 로 그려졌다(실측 2026-08-18).
  // 1.15 는 슬라이드 배치(바닥 왼쪽·조종간 오른쪽)에서 왼쪽 칸을 오른쪽 칸 높이에
  // 맞추는 값이다 — 둘의 아래끝이 맞아야 한 화면에 담긴다.
  var ASPECT_PLAY = 1.05;
  // 1cm 를 몇 user unit 으로 그릴지. **화면 축척일 뿐 거리 주장이 아니다** —
  // 그림 사이의 비율만 참이고, 실제 거리는 학생이 실물에서 자로 잰다.
  var PLAY_PX = 2.0;

  /* 내용 상자를 원하는 비율로 넓힌다 — 놀이터가 매 프레임 쓴다.
   * (랩을 걷어낼 때 이 함수까지 함께 지워 놀이터가 통째로 죽었다. 실측 2026-08-17) */
  function fitAspect(b, want) {
    var w = b.maxx - b.minx, h = b.maxy - b.miny;
    if (w / h < want) {                     // 너무 좁다 → 가로를 넓힌다
      var nw = h * want, pad = (nw - w) / 2;
      b.minx -= pad; b.maxx += pad;
    } else {                                // 너무 납작하다 → 세로를 넓힌다
      var nh = w / want, padv = (nh - h) / 2;
      b.miny -= padv; b.maxy += padv;
    }
    return b;
  }

  /* 머리 방향 광선이 **월드에 박힌 가로 벽**에 닿는 거리(cm). 안 닿으면 0 —
   * 상류 `ultrasonic()` 이 메아리 없을 때 주는 값이다. 가드 = check_playgrounds ⑥. */
  function wallGap(cx, cy, th, wallY, half) {
    var dy = Math.sin(th);
    if (Math.abs(dy) < 1e-3) return 0;                   // 벽과 나란하다
    var t = (wallY - cy) / dy;
    if (t <= 0) return 0;                                // 벽은 등 뒤다
    if (Math.abs(cx + Math.cos(th) * t) > half) return 0; // 벽을 비껴 본다
    return Math.min(50, t);
  }

  function stepPose(pose, l, r, secs, dt) {
    /* 한 프레임 전진. cb_drive.simulate 의 적분과 같은 식. */
    var left = l / 100 * SPEED_MAX_CMS, right = r / 100 * SPEED_MAX_CMS;
    var v = (left + right) / 2, w = (left - right) / TRACK_CM;
    var th = pose.th + w * dt;
    return { x: pose.x + v * Math.cos(th) * dt, y: pose.y + v * Math.sin(th) * dt, th: th };
  }

  /* 수(move) 목록 → 프레임들. 충돌하면 그 자리에서 끊는다. */
  function simMoves(moves, obs) {
    var pose = { x: 0, y: 0, th: -Math.PI / 2 };
    var frames = [{ x: pose.x, y: pose.y, th: pose.th, lamp: null }];
    var lamp = null, bumped = false;
    for (var m = 0; m < moves.length && !bumped; m++) {
      var mv = moves[m];
      if (mv.color !== undefined) lamp = mv.color === 'none' ? null : mv.color;
      var steps = Math.max(2, Math.round(mv.secs * 40)), dt = mv.secs / steps;
      for (var i = 0; i < steps; i++) {
        var nxt = stepPose(pose, mv.l, mv.r, mv.secs, dt);
        pose = nxt;
        frames.push({ x: pose.x, y: pose.y, th: pose.th, lamp: lamp });
      }
    }
    return { frames: frames, bumped: bumped };
  }

  function carSvg(f, scale) {
    /* 위에서 본 Cutebot — **cb_drive.py 의 _car() 와 같은 그림**이어야 한다.
     * 정지 그림과 놀이터의 차가 다르게 생기면 학생은 다른 로봇으로 읽는다.
     * 실물 특징 셋: 파란 PCB 차체 · 은색 초음파 눈 둘 · 은색 허브의 검은 구동륜.
     * (초록은 MakeCode 확장 아이콘 색이지 차 색이 아니다 — 2026-08-17 정정) */
    var lamp = f.lamp, s = scale || 1;
    var glow = lamp
      ? '<circle cx="-9.5" cy="-9.5" r="6" fill="' + lamp + '" opacity=".38"/>' +
        '<circle cx="9.5" cy="-9.5" r="6" fill="' + lamp + '" opacity=".38"/>' : '';
    var lampFill = lamp || '#c8cfda';
    var dots = '';
    // micro:bit 화면은 5×5 — cb_drive.py 의 _car() 와 같은 식이어야 한다.
    for (var r = 0; r < 5; r++) {
      for (var c = 0; c < 5; c++) {
        dots += '<circle cx="' + (-4 + c * 2) + '" cy="' + (0.6 + r * 1.8).toFixed(1) +
                '" r="0.6" fill="#ff4d4d" opacity=".85"/>';
      }
    }
    return '<g transform="translate(' + f.px.toFixed(1) + ',' + f.py.toFixed(1) +
      ') rotate(' + (f.th * 180 / Math.PI + 90).toFixed(1) + ') scale(' + s + ')">' + glow +
      // 구동륜 둘 — 검은 타이어 + 은색 허브
      '<rect x="-16.2" y="3.6" width="4.4" height="10" rx="1.8" fill="#23262c"/>' +
      '<rect x="-15.2" y="6.6" width="2.4" height="4" rx="1" fill="#aab2bd"/>' +
      '<rect x="11.8" y="3.6" width="4.4" height="10" rx="1.8" fill="#23262c"/>' +
      '<rect x="12.8" y="6.6" width="2.4" height="4" rx="1" fill="#aab2bd"/>' +
      // 차체 — 앞이 더 둥근 아치형 PCB
      '<path d="M -13,10.5 V -7.5 Q -13,-14.5 -6,-14.5 H 6 Q 13,-14.5 13,-7.5 ' +
      'V 10.5 Q 13,14.5 9,14.5 H -9 Q -13,14.5 -13,10.5 Z" ' +
      'fill="#2f5f9e" stroke="#1b3a63" stroke-width="1.3"/>' +
      // 전조등 둘
      '<circle cx="-9.5" cy="-9.5" r="2.5" fill="' + lampFill + '" stroke="#1b3a63" stroke-width=".8"/>' +
      '<circle cx="9.5" cy="-9.5" r="2.5" fill="' + lampFill + '" stroke="#1b3a63" stroke-width=".8"/>' +
      // 초음파 모듈 — 두 눈
      '<rect x="-8" y="-13.5" width="16" height="7.5" rx="2" fill="#d5dbe4" stroke="#7d8695" stroke-width=".8"/>' +
      '<circle cx="-4" cy="-9.7" r="2.9" fill="#f2f5f9" stroke="#6e7787" stroke-width=".8"/>' +
      '<circle cx="4" cy="-9.7" r="2.9" fill="#f2f5f9" stroke="#6e7787" stroke-width=".8"/>' +
      '<circle cx="-4" cy="-9.7" r="1.5" fill="#454d5b"/>' +
      '<circle cx="4" cy="-9.7" r="1.5" fill="#454d5b"/>' +
      // micro:bit — 5×5 화면 암시
      '<rect x="-7.5" y="-1.5" width="15" height="11" rx="1.6" fill="#20242b" stroke="#0f1216" stroke-width=".7"/>' +
      dots +
      '</g>';
  }

  function initPlay(box) {
    var svg = box.querySelector('.cbp__svg');
    var read = box.querySelector('.cbp__read');
    var seq = box.querySelector('.cbp__seq');
    var obs = [];        // 장애물은 Case 09(L4)의 내용이다 — L1 도구가 미리 까지 않는다
    var moves = [], raf = null, color = 'none';
    // 한 번이라도 달렸나 — 달렸으면 차가 출발선을 떠나 있고, Undo 가 **먼저**
    // 되돌릴 것은 그 주행이다(사장님 지시 2026-08-18: "undo를 했는데 제자리로 리셋").
    var ran = false;
    /* 아직 아무것도 만지지 않았나 — 그동안 바닥은 **비어 있다**(차만 출발선에).
     * 예전에는 기본 슬라이더 값(L100 R100 2.0s)의 미리보기가 처음부터 깔려 있어서, 그 값과
     * 같은 첫 프리셋(`Straight`)을 눌러도 화면이 **한 픽셀도 안 변했다** — 12개 놀이터의
     * 첫 칩이 그랬다(2026-10-28). 칩을 누르는 순간 무언가 생겨야 반응으로 읽힌다.
     * 슬라이더·색·칩·Add·Run 중 하나라도 건드리면 풀린다. */
    var untouched = true;

    function dials() {
      var v = {};
      all('input[type=range]', box).forEach(function (i) {
        v[i.getAttribute('data-k')] = parseFloat(i.value);
        var o = box.querySelector('[data-for="' + i.getAttribute('data-k') + '"]');
        if (o) o.textContent = i.getAttribute('data-k') === 'secs'
          ? (parseFloat(i.value) / 10).toFixed(1) + 's' : i.value;
      });
      return { l: v.left, r: v.right, secs: v.secs / 10 };
    }

    function draw(upto, carAt) {
      var all_ = simMoves(moves.length ? moves : [], obs);
      var preview = (moves.length || untouched) ? null : dials();
      var sim = preview
        ? simMoves([{ l: preview.l, r: preview.r, secs: preview.secs, color: color }], obs)
        : all_;
      var fr = sim.frames.slice(0, upto == null ? sim.frames.length : Math.max(1, upto));

      /* ── 카메라는 **경로 전체**로 한 번 정한다 (2026-08-18) ────────────────
       * 예전에는 `fr`(그린 데까지)로 매 프레임 상자를 다시 잡았다. 그러면 경로가
       * 길어질수록 세계가 같이 줄어들어서 **차가 화면 가운데에 붙박여 있다** —
       * 사장님이 "버튼이 작동을 하지도 않고"라고 한 것이 이것이다. 실제로는 돌고
       * 있었는데 카메라가 차를 따라다녀서 아무것도 안 움직이는 것처럼 보였다.
       * 전체 경로로 상자를 고정하면 세계가 서고 차가 그 위를 지나간다. */
      var full = sim.frames;
      var xs = full.map(function (f) { return f.x; }).concat(obs.map(function (o) { return o.x; }),
                                                            obs.map(function (o) { return o.x + o.w; }));
      var ys = full.map(function (f) { return f.y; }).concat(obs.map(function (o) { return o.y; }),
                                                            obs.map(function (o) { return o.y + o.h; }));
      /* 여백은 **차 자신을 포함해야 한다.** 상자를 경로 점으로만 잡으면 제자리
       * 회전(Spin: L60 R-60)처럼 이동이 0인 수에서 상자가 20cm 로 쪼그라들고,
       * 16cm 짜리 차가 바닥을 꽉 채워 확대된다(실측 2026-08-18 — 차가 화면 전체).
       * CAR_R = 차 반지름(그림 좌표 ±16.2 user unit ÷ PLAY_PX ≈ 8.1cm)의 대각선. */
      var CAR_R = 11, PAD = CAR_R + 6;
      var bb = { minx: Math.min.apply(null, xs) - PAD, maxx: Math.max.apply(null, xs) + PAD,
                 miny: Math.min.apply(null, ys) - PAD, maxy: Math.max.apply(null, ys) + PAD };
      /* 최소 바닥 크기 — 짧은 수 하나로 화면이 현미경이 되지 않게. 차(16cm)가
       * 바닥의 4분의 1을 넘지 않는 선이다. */
      var MIN_SPAN = 80;
      /* 세로 span 을 **20cm 눈금으로 올림**한다. 안 그러면 시간 슬라이더를 0.1초
       * 밀 때마다 상자가 다시 잡혀 바닥·격자·차가 통째로 커졌다 작아진다 —
       * 손가락 밑에서 화면이 숨쉬는 느낌이라 "버튼 반응이 너무 민감해" 로 읽힌다
       * (실측 2026-08-18: 슬라이더 11칸에 서로 다른 viewBox 11개).
       * 눈금을 두면 경계를 넘을 때만 한 칸 움직인다. */
      var QUANT = 20;
      var span = Math.max(MIN_SPAN, Math.ceil((bb.maxy - bb.miny) / QUANT) * QUANT);
      var cy = (bb.miny + bb.maxy) / 2;
      bb.miny = cy - span / 2; bb.maxy = cy + span / 2;
      bb = fitAspect(bb, ASPECT_PLAY);
      var minx = bb.minx, maxx = bb.maxx, miny = bb.miny, maxy = bb.maxy;
      var w = (maxx - minx) * PLAY_PX, h = (maxy - miny) * PLAY_PX;
      function X(c) { return (c - minx) * PLAY_PX; }
      function Y(c) { return (c - miny) * PLAY_PX; }
      fr.forEach(function (f) { f.px = X(f.x); f.py = Y(f.y); });

      var g = 20 * PLAY_PX;
      var boxes = obs.map(function (o) {
        return '<rect x="' + X(o.x).toFixed(1) + '" y="' + Y(o.y).toFixed(1) + '" width="' +
          (o.w * PLAY_PX).toFixed(1) + '" height="' + (o.h * PLAY_PX).toFixed(1) +
          '" rx="3" class="cbp__obs"/>';
      }).join('');
      var trail = fr.length > 1 ? '<path d="M ' + fr.map(function (f) {
        return f.px.toFixed(1) + ',' + f.py.toFixed(1);
      }).join(' L ') + '" fill="none" stroke="#0f7d25" stroke-width="3" ' +
        'stroke-linecap="round" opacity=".45"/>' : '';
      svg.setAttribute('viewBox', '0 0 ' + w.toFixed(0) + ' ' + h.toFixed(0));
      svg.innerHTML =
        '<defs><pattern id="cbpg" width="' + g + '" height="' + g + '" patternUnits="userSpaceOnUse">' +
        '<path d="M ' + g + ' 0 L 0 0 0 ' + g + '" fill="none" stroke="#d3dae6" stroke-width="1"/>' +
        '</pattern></defs>' +
        '<rect width="100%" height="100%" fill="#f7f9fc"/><rect width="100%" height="100%" fill="url(#cbpg)"/>' +
        boxes + trail + carSvg(fr[carAt == null ? fr.length - 1
                                       : Math.min(carAt, fr.length - 1)], 1);
      return sim;
    }

    function label(m) {
      var dot = m.color && m.color !== 'none'
        ? '<i class="cbp__dot" style="background:' + m.color + '"></i>' : '';
      return dot + 'L' + m.l + ' R' + m.r + ' · ' + m.secs.toFixed(1) + 's';
    }
    function syncUndo() {
      var u = box.querySelector('.cbp__undo');
      if (u) u.disabled = !(moves.length || ran);
    }

    var EMPTY_MSG = '<b>Empty floor</b> — tap a move below to put it on the floor.';

    function say() {
      read.innerHTML = moves.length
        ? moves.length + ' move' + (moves.length > 1 ? 's' : '') + ' — press Run it'
        : untouched ? EMPTY_MSG
        : '<b>Preview</b> — press Run it to watch, or tap a move to start a list.';
    }

    function paint() {
      seq.innerHTML = moves.map(function (m, i) {
        return '<li class="cbp__step"><span class="cbp__n">' + (i + 1) + '</span>' + label(m) + '</li>';
      }).join('');
      var sim = draw(null);
      ran = false;
      syncUndo();
      /* 목록이 비었을 때 바닥에 그려진 것은 **아직 목록에 없는 미리보기**다.
       * 그림만 보면 쌓인 수와 구별이 안 돼서, Undo 가 "지울 게 없다"고 답하면
       * 버튼이 고장 난 것처럼 읽혔다(사장님 실측 2026-08-18). 상태줄이 이름을 붙인다. */
      read.innerHTML = moves.length
        ? (sim.bumped ? '💥 <b>Bump!</b> Something is in the way.'
                      : moves.length + ' move' + (moves.length > 1 ? 's' : '') + ' — press Run it')
        : untouched ? EMPTY_MSG
        : '<b>Preview</b> — press Run it to watch, or tap a move to start a list.';
    }

    /* 재생은 **시간 기반**이다 — 프레임 개수가 아니라.
     * 예전 `i += 2` 는 화면 주사율에 묶여 있어서 120Hz 화면에서 두 배로 빨랐고,
     * RAF 가 멈추는 상황(탭 가림 등)에서는 그 자리에 굳은 채 상태줄만
     * "driving…" 으로 남았다(실측 2026-08-18).
     * 배속은 정지 주행 그림(cb_drive.PLAYBACK_SLOW/MIN)과 **같은 값**이다 —
     * 한 페이지의 두 그림이 다른 속도로 움직이면 학생이 견줄 수가 없다. */
    var PLAYBACK_SLOW = 2.2, PLAYBACK_MIN = 3.0;

    function run() {
      if (raf) cancelAnimationFrame(raf);
      /* **보이는 것을 돌린다.** 목록이 비어 있어도 바닥에는 슬라이더 값의 미리보기가
       * 그려져 있다 — 차도 있고 경로도 있다. 그런데 예전 run() 은 `moves` 만 봐서
       * 그 상태에서 누르면 **아무 일도 일어나지 않았다**(실측 2026-08-18: 상태줄도
       * 그대로). 학생 눈에는 버튼이 고장 난 것이다. 화면에 있는 것이 곧 돌릴 것이다. */
      untouched = false;
      var d = dials();
      var play = moves.length ? moves : [{ l: d.l, r: d.r, secs: d.secs, color: color }];
      var sim = simMoves(play, obs);
      if (sim.frames.length < 2) { paint(); return; }
      var real = play.reduce(function (a, m) { return a + m.secs; }, 0);
      var total = Math.max(PLAYBACK_MIN, real * PLAYBACK_SLOW) * 1000;
      var t0 = performance.now(), last = sim.frames.length - 1;
      ran = true; syncUndo();
      read.textContent = '▶ driving…';
      (function tick(now) {
        var k = Math.min(1, ((now || performance.now()) - t0) / total);
        draw(Math.max(1, Math.round(k * last) + 1));
        if (k < 1) { raf = requestAnimationFrame(tick); }
        else {
          raf = null;
          read.innerHTML = sim.bumped
            ? '💥 <b>Bump!</b> It hit something. Change the wheels and try again.'
            : moves.length ? 'Done. Change the wheels and run it again.'
                           : 'Done — that was one move. Tap a move to start a list.';
        }
      })();
    }

    all('input[type=range]', box).forEach(function (i) {
      i.addEventListener('input', function () {
        untouched = false;
        if (!moves.length) paint(); else dials();
      });
    });
    all('.cbp-sw', box).forEach(function (b) {
      b.addEventListener('click', function () {
        color = b.getAttribute('data-c');
        all('.cbp-sw', box).forEach(function (x) { x.classList.remove('is-on'); });
        b.classList.add('is-on');
        untouched = false;
        if (!moves.length) paint();
      });
    });
    /* 수 칩을 누르면 **그 자리에서 목록에 들어간다.**
     * 예전에는 칩이 슬라이더 값만 바꾸고, 학생이 그 다음 `＋ Add this move` 를
     * 찾아 눌러야 했다. 슬라이더는 칩 **위쪽**에 있어서 눈이 가 있지 않다 —
     * 그래서 "Straight" 를 눌러도 화면에서 아무 일도 안 일어난 것처럼 보였고,
     * 사장님이 "버튼이 전혀 작동하지 않고 Add this move 는 이해가 안 간다"고
     * 짚었다(2026-08-18). 고르기와 실행을 두 단계로 나눌 이유가 없다 —
     * 누른 것이 곧 쌓인다. 슬라이더는 **내 값으로 만드는** 자리로 남는다. */
    all('.cbp-chip', box).forEach(function (c) {
      c.addEventListener('click', function () {
        var set = { left: c.getAttribute('data-l'), right: c.getAttribute('data-r'),
                    secs: String(Math.round(parseFloat(c.getAttribute('data-s')) * 10)) };
        all('input[type=range]', box).forEach(function (i) {
          var k = i.getAttribute('data-k');
          if (set[k] != null) i.value = set[k];
        });
        untouched = false;
        var d = dials();
        moves.push({ l: d.l, r: d.r, secs: d.secs, color: color });
        paint();
        // 눌린 티를 잠깐 준다 — 목록이 길어지면 새 줄이 화면 밖일 수 있다.
        c.classList.add('is-added');
        setTimeout(function () { c.classList.remove('is-added'); }, 320);
      });
    });
    box.querySelector('.cbp__add').addEventListener('click', function () {
      untouched = false;
      var d = dials(); moves.push({ l: d.l, r: d.r, secs: d.secs, color: color }); paint();
    });
    var runBtn = box.querySelector('.cbp__run');
    runBtn.addEventListener('click', run);
    // ↺ Reset (2026-10-30 소유주) — 처음 그대로: 빈 바닥 · 목록 비움 · 슬라이더·색은 첫 값. Undo 는 한 걸음, 이것은 전부.
    var dial0 = all('input[type=range]', box).map(function (i) { return i.value; });
    var sw0 = all('.cbp-sw', box).map(function (x) { return x.classList.contains('is-on'); });
    var rs = document.createElement('button');
    rs.type = 'button';
    rs.className = 'edux-reset';
    rs.textContent = '\u21ba Reset';
    runBtn.parentNode.insertBefore(rs, runBtn.nextSibling);
    rs.addEventListener('click', function () {
      if (raf) { cancelAnimationFrame(raf); raf = null; }
      moves = []; ran = false; untouched = true; color = 'none';
      all('input[type=range]', box).forEach(function (i, k) { i.value = dial0[k]; });
      all('.cbp-sw', box).forEach(function (x, k) { x.classList.toggle('is-on', sw0[k]); });
      dials();
      paint();
    });
    /* 지우는 버튼은 하나(Undo)이고, **마지막에 한 일을 되돌린다** — 두 단계다:
     *   ① 방금 달렸다면 → 차를 **출발선으로** 되돌린다 (경로는 그대로 보인다).
     *   ② 아니면        → 목록의 마지막 수를 뺀다.
     * 이 순서인 이유: 달리고 나면 마지막에 한 일이 "달린 것"이다. 예전에는 주행을
     * 되돌릴 방법이 아예 없어서 차가 도착지에 선 채로 남았다(사장님 지적 2026-08-18).
     * 둘 다 할 게 없으면 **disabled** — 누를 수 있는데 아무 일도 안 하는 상태를 두지 않는다. */
    box.querySelector('.cbp__undo').addEventListener('click', function () {
      if (ran) {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
        ran = false;
        draw(null, 0);                       // 경로 전체 + 차는 출발선
        say();
        syncUndo();
        return;
      }
      if (!moves.length) return;
      moves.pop(); paint();
    });
    paint();
  }

  /* ── 지금 달리는 구간을 만든 블록 밝히기 ───────────────────────────────────
   * 차가 달리는 동안, 그 구간의 바퀴 속도를 정하고 있는 **블록**이 옆 블록 그림에서 켜진다
   * (엔진 `.edux-run-on` — design_system §3.16d). microbit-stem 의 mb-lesson.js `runLights` 와
   * 같은 규칙이고, 어느 블록인지는 빌드가 정했다(cb_runmap.py):
   *   `data-run-seg`     = 주행 그림의 구간 경계 [[끝 비율, 문장 번호]…] — 비율은 keyTimes 와 같은 시간축
   *   `data-run="rN"`    = 주행 그림 쪽 열쇠.   `data-run-code="rN"` = 코드 그림 쪽 열쇠(그림 여럿 ↔ 코드 하나)
   *   `data-run-map`     = 문장 번호 → «그림 안 몇 번째 문장 블록»
   *   `data-run-sig`     = 그 블록들의 클래스 열 해시 — 지금 DOM 이 빌드 때와 다르면 **끈다**.
   * 틀린 블록을 밝히느니 안 밝힌다: 열쇠·표·해시 중 하나라도 안 맞으면 조용히 아무것도 안 한다.
   *
   * ⚠ 빛은 블록의 `g` 가 아니라 **몸통 path** 에 단다. 다음 블록은 앞 블록 `g` 의 자식이라
   *    `g` 에 달면 뒤따르는 블록이 전부 같이 켜진다.
   * SMIL 에는 JS 시계가 없다 — beginElement 를 부른 때를 SMIL 의 시계(getCurrentTime)와 맞춰 두고
   * 50ms 마다 «지금 몇 %인가» 를 읽는다(rAF 에 기대지 않는다: 숨은 탭에서도 멈추지 않게). */
  function fnv(str) {                      // cb_runmap.sig_of 와 같은 FNV-1a 32
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return ('00000000' + h.toString(16)).slice(-8);
  }
  // 페이지 후처리가 같은 <svg> 를 심볼 하나로 모은다(dedupe_svg_images) — <use> 가 그리는 것은 shadow tree 라
  // 잡히지 않고, 심볼을 칠하면 같은 그림을 가리키는 모든 자리가 함께 칠해진다. 그래서 밝힐 그림은 제 사본을 갖는다.
  var symHome = null;
  function symbolHome() {
    if (!symHome) {
      symHome = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      symHome.setAttribute('width', '0');
      symHome.setAttribute('height', '0');
      symHome.setAttribute('aria-hidden', 'true');
      symHome.style.position = 'absolute';
      document.body.insertBefore(symHome, document.body.firstChild);
    }
    return symHome;
  }
  function materialize(box) {
    all('svg', box).forEach(function (svg) {
      var use = svg.querySelector(':scope > use');
      if (use) {
        var id = (use.getAttribute('xlink:href') || use.getAttribute('href') || '').slice(1);
        var sym = id && document.getElementById(id);
        if (sym) {
          var frag = document.createDocumentFragment();
          [].slice.call(sym.childNodes).forEach(function (n) { frag.appendChild(n.cloneNode(true)); });
          svg.replaceChild(frag, use);
        }
      }
      all('symbol', svg).forEach(function (sy) { symbolHome().appendChild(sy); });
      var defs = svg.querySelector(':scope > defs');
      if (defs && !defs.childNodes.length) defs.parentNode.removeChild(defs);
    });
  }
  // 코드 그림 하나(열쇠 rN)의 블록 몸통 path 들 — 한 번만 만든다. 안 맞으면 null.
  var codeCache = {};
  function codeTargets(key) {
    if (codeCache.hasOwnProperty(key)) return codeCache[key];
    var targets = null;
    try {
      var code = document.querySelector('[data-run-code="' + key + '"]');
      var map = JSON.parse(code.getAttribute('data-run-map'));
      materialize(code);
      var paths = [], names = [];
      all('svg.mb-blocks', code).forEach(function (svg) {
        all('g.blocklyBlock', svg).forEach(function (g) {
          var p = g.querySelector(':scope > path.blocklyPath');
          var role = p && p.getAttribute('aria-roledescription');
          if (role === 'statement' || role === 'container') {
            paths.push(p);
            names.push((g.getAttribute('class') || '').split(/\s+/)[0]);
          }
        });
      });
      if (fnv(names.join(',')) === code.getAttribute('data-run-sig')) {
        targets = map.map(function (i) { return i >= 0 && paths[i] ? paths[i] : null; });
      }
    } catch (e) { targets = null; }
    codeCache[key] = targets;
    return targets;
  }
  // 코드 그림마다 «줄(lane)별 지금 블록» — 주행 그림이 여럿이어도(Press A · Press B …) 서로 안 지운다.
  var litByKey = {};
  function setLit(key, lane, path) {
    var st = litByKey[key] || (litByKey[key] = { lanes: {}, lit: [] });
    if (path) st.lanes[lane] = path; else delete st.lanes[lane];
    var want = Object.keys(st.lanes).map(function (k) { return st.lanes[k]; });
    st.lit.forEach(function (p) { if (want.indexOf(p) < 0) p.classList.remove('edux-run-on'); });
    want.forEach(function (p) { p.classList.add('edux-run-on'); });
    st.lit = want;
  }
  var laneN = 0;
  function runLights(fig, svg, anim) {
    var key = fig.getAttribute('data-run');
    var seg = null;
    try { seg = JSON.parse(fig.getAttribute('data-run-seg')); } catch (e) { seg = null; }
    var lane = 'f' + (laneN++), timer = null;
    if (!key || !seg || !seg.length) return { start: function () {}, clear: function () {} };
    function clear() {
      if (timer) { clearInterval(timer); timer = null; }
      setLit(key, lane, null);
    }
    function start() {
      clear();
      var targets = codeTargets(key);
      if (!targets) return;
      var dur = parseFloat(anim.getAttribute('dur')) || 0;
      if (!(dur > 0)) return;
      // SMIL 의 시계와 맞춘다: 시작 시각을 읽을 수 있으면 그것으로, 아니면 지금을 0 초로 본다.
      var t0 = performance.now();
      try {
        var lag = svg.getCurrentTime() - anim.getStartTime();
        if (lag >= 0 && lag < 0.5) t0 -= lag * 1000;
      } catch (e) { /* 시작 전이거나 지원 안 함 — 지금이 0 초 */ }
      function tick() {
        var f = (performance.now() - t0) / 1000 / dur;
        if (f >= 1) { clear(); return; }
        var sid = -1;
        for (var i = 0; i < seg.length; i++) { if (f < seg[i][0]) { sid = seg[i][1]; break; } }
        if (sid < 0 && f >= seg[seg.length - 1][0]) sid = seg[seg.length - 1][1];
        setLit(key, lane, sid >= 0 && targets[sid] ? targets[sid] : null);
      }
      tick();
      timer = setInterval(tick, 50);
    }
    return { start: start, clear: clear };
  }

  /* 주행 그림은 **누를 때만** 움직인다.
   *
   * 처음에는 반복 재생이었는데 한 챕터에 그림이 8개라 페이지 전체가 늘 꿈틀거렸다 —
   * 읽는 데 방해가 되고, 무엇을 보라는 것인지도 흐려진다. 지금은 출발·도착 차만
   * 정지 그림으로 서 있고(경로는 점선), 누르면 그 위를 한 번 달린다. */
  function initDrive(fig) {
    // 같은 주행 그림이 한 페이지에 둘이면 후처리가 나중 것을 <use> 껍데기로 줄인다 — 껍데기에는 animateMotion 도
    // 차도 없어 «▶ Watch it drive» 가 숨겨졌다(L1_ch2 · L3_ch2 의 Fix It, 2026-10-28 실측). 제 사본을 갖는다.
    materialize(fig);
    var svg = fig.querySelector('.cb-drive__svg');
    var btn = fig.querySelector('.cb-drive__play');
    var car = fig.querySelector('.cb-drive__car');
    var anim = fig.querySelector('animateMotion');
    if (!btn || !car || !anim || !anim.beginElement) { if (btn) btn.hidden = true; return; }
    var lights = runLights(fig, svg, anim);
    var first = btn.textContent, hush = false;   // hush = ↺ Reset 이 멈춘 끝 — 「Watch it again」 이 아니라 처음 이름
    anim.addEventListener('endEvent', function () {
      car.setAttribute('opacity', '0');
      btn.textContent = hush ? first : '▶ Watch it again';
      hush = false;
      lights.clear();
    });
    btn.addEventListener('click', function () {
      hush = false;
      car.setAttribute('opacity', '1');
      btn.textContent = '· driving ·';
      try { anim.beginElement(); lights.start(); } catch (e) { car.setAttribute('opacity', '0'); lights.clear(); }
    });
    // ↺ Reset (2026-10-30 소유주 「다시 해 보게」) — 차를 걷고 켜진 블록을 끄고 단추를 처음 이름으로. 모양은 엔진 `.edux-reset`.
    var rs = document.createElement('button');
    rs.type = 'button';
    rs.className = 'edux-reset';
    rs.textContent = '\u21ba Reset';
    btn.parentNode.insertBefore(rs, btn.nextSibling);
    rs.addEventListener('click', function () {
      hush = btn.textContent === '· driving ·';
      try { anim.endElement(); } catch (e) { /* 아직 안 달렸다 */ }
      car.setAttribute('opacity', '0');
      lights.clear();
      btn.textContent = first;
    });
  }

  // ── 게이트용 출구 ────────────────────────────────────────────────────
  // check_drive.py 가 node 로 이 파일을 불러 **같은 입력에 같은 결과**가 나오는지
  // Python(cb_drive.py)과 대조한다. 브라우저에서는 이 분기가 없는 것과 같다.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SPEED_MAX_CMS: SPEED_MAX_CMS, TRACK_CM: TRACK_CM,
                       simulate: simulate, stepPose: stepPose, simMoves: simMoves,
                       wallGap: wallGap, matches: matches };
    return;
  }

  // ── 화면 놀이터 (L1_ch1) ─────────────────────────────────────────────
  // 그 챕터가 쓰는 블록이 `show icon` 하나뿐이라, 놀이터도 그것 하나다.
  // 아이콘을 누르면 25개 LED 가 바뀌고 블록 문장도 같이 바뀐다 — 학생이
  // Build 에서 `show icon` 을 만났을 때 "아까 그거"가 되게 하는 다리.
  function initScreen(root) {
    var chips = all('.sp-chip', root), faces = all('.sp-face', root);
    var name = root.querySelector('.sp__name');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var want = chip.getAttribute('data-icon');
        chips.forEach(function (c) { c.classList.toggle('is-on', c === chip); });
        faces.forEach(function (f) {
          f.classList.toggle('is-shown', f.getAttribute('data-icon') === want);
        });
        if (name) name.textContent = want;
      });
    });
  }

  // ── 센서 놀이터 ──────────────────────────────────────────────────────
  // 학생이 **세계**를 바꾸면 이 챕터의 조건문이 갈리고 차가 그 갈래대로 달린다.
  // 코드를 읽기 전에 "왜 이런 조건이 필요한가"를 손으로 먼저 안다.
  function matches(cond, value, pick) {
    cond = (cond || '').trim();
    if (cond === 'otherwise') return true;          // 마지막 갈래 — 항상 참
    if (pick !== null) return cond === pick;
    var m;
    if ((m = cond.match(/^<\s*(-?\d+(?:\.\d+)?)$/))) return value < parseFloat(m[1]);
    if ((m = cond.match(/^>\s*(-?\d+(?:\.\d+)?)$/))) return value > parseFloat(m[1]);
    // `a..b` 양끝 포함 · `a..<b` 위끝 미만. 프로그램은 `< b` 를 쓰는데 위젯이 늘
    // 포함으로 읽어 경계값에서 다른 갈래를 골랐다(2026-09-18 감사).
    if ((m = cond.match(/^(-?\d+(?:\.\d+)?)\.\.(<?)(-?\d+(?:\.\d+)?)$/))) {
      var lo = parseFloat(m[1]), hi = parseFloat(m[3]);
      return value >= lo && (m[2] === '<' ? value < hi : value <= hi);
    }
    return false;
  }

  function initSensor(box) {
    var svg = box.querySelector('.sn__svg');
    var branches = all('.sn-branch', box);
    var range = box.querySelector('.sn-range');
    var out = box.querySelector('.sn-dial__v');
    var unit = box.getAttribute('data-unit') || '';
    var sensor = box.getAttribute('data-sensor');
    var picks = all('.sn-pick', box);
    var gid = 'sng' + (box.getAttribute('data-sensor') || 'x') +
              Math.abs((box.textContent || '').length * 2654435761 % 100000);
    var pick = picks.length ? picks[0].getAttribute('data-pick') : null;
    // 차는 화면 한가운데를 지키고 **세계가 흐른다** — 갈래를 바꾸면 즉시 보이고,
    // 차가 화면 밖으로 나가 버리지 않는다(놀이터는 관찰하는 자리다).
    var pose = { x: 150, y: 96, th: -Math.PI / 2 }, raf = null, last = 0;
    // 바닥 무늬의 흐름. 차는 가운데 고정이라 **이것만이 전진을 보이게 한다.**
    // 없을 때 실측(2026-08-18 사용자 지적): L5_ch1 의 A+B(직진 100/100)를 눌러도
    // 화면이 그대로였다 — remote·tilt·light 는 `world()` 가 빈 문자열이라 그릴 세계가
    // 없고, 좌우 속도가 같으면 회전도 0 이라 아무것도 바뀌지 않는다. L5_ch3 은 더
    // 나빠서 Up(100,100)·Down(-100,-100)·OK(0,0) **셋이 똑같아 보였다.**
    var ground = { x: 0, y: 0 };
    var GRID = 22;

    // 초음파는 **닫힌 고리**다: 슬라이더가 손을 옮기면 간격이 바뀌고, 차가 달리면
    // 간격이 또 바뀐다. 그 되먹임이 이 챕터의 내용 자체라(간격을 지킨다) 슬라이더를
    // 읽기만 하면 학생은 "차가 스스로 맞춘다"를 못 본다 — 벽만 움직이고 차는 가만히.
    // ⚠️ 벽은 **세계에 박혀 있다** — 예전엔 간격만 줄여서 차가 돌아도 벽이 정면
    //    20cm 였고, "비켜라" 갈래의 차가 영원히 돌았다(2026-09-18 감사).
    var WALL_HALF = 70;                      // 벽 절반 길이 (cm)
    var car = { x: 0, y: 0 };                // 차의 월드 좌표 (cm, 화면 위 = -y)
    var gap0 = range ? parseFloat(range.value) : 20;
    var wallY = car.y - gap0;                // 벽은 처음엔 정면 gap0 cm
    var gap = gap0;

    function sonarGap() {
      return wallGap(car.x, car.y, pose.th, wallY, WALL_HALF);
    }

    function sense() {
      return sensor === 'sonar' ? gap : (range ? parseFloat(range.value) : 0);
    }

    function active() {
      var v = sense();
      for (var i = 0; i < branches.length; i++) {
        if (matches(branches[i].getAttribute('data-cond'), v, pick)) return branches[i];
      }
      return branches[branches.length - 1];
    }

    function world(b) {
      if (sensor === 'sonar') {
        // 화면은 차를 따라가되 **돌지 않는** 카메라다 — 벽의 화면 자리는 월드 거리로만
        // 정해지고, 머리가 벽을 비껴 가면 초음파는 0 을 읽는다.
        var wy = pose.y + (wallY - car.y) * 2.6;
        var wx = pose.x - car.x * 2.6;
        var ray = '';
        if (gap > 0) {                       // 메아리가 있을 때만 잰 선을 그린다
          var tipx = pose.x + Math.cos(pose.th) * gap * 2.6;
          var tipy = pose.y + Math.sin(pose.th) * gap * 2.6;
          ray = '<line x1="' + pose.x.toFixed(0) + '" y1="' + pose.y.toFixed(0) +
                '" x2="' + tipx.toFixed(0) + '" y2="' + tipy.toFixed(0) +
                '" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 4"/>';
        }
        return '<rect x="' + (wx - WALL_HALF * 2.6).toFixed(0) + '" y="' + wy.toFixed(0) +
               '" width="' + (WALL_HALF * 2 * 2.6).toFixed(0) +
               '" height="13" rx="4" fill="#8b5e3c"/>' + ray;
      }
      if (sensor === 'line') {
        var on = pick === 'both' || pick === 'left';
        var on2 = pick === 'both' || pick === 'right';
        return '<rect x="132" y="0" width="16" height="190" fill="' +
               (on ? '#23262c' : '#e9edf3') + '"/>' +
               '<rect x="152" y="0" width="16" height="190" fill="' +
               (on2 ? '#23262c' : '#e9edf3') + '"/>';
      }
      return '';
    }

    function paint(b) {
      var lamp = b.getAttribute('data-lamp') || null;
      var dark = sensor === 'light' && range && parseFloat(range.value) < 60;
      var ox = ((ground.x % GRID) + GRID) % GRID;
      var oy = ((ground.y % GRID) + GRID) % GRID;
      svg.innerHTML =
        '<rect width="100%" height="100%" fill="' + (dark ? '#20242e' : '#f7f9fc') + '"/>' +
        '<defs><pattern id="' + gid + '" width="' + GRID + '" height="' + GRID +
        '" patternUnits="userSpaceOnUse" patternTransform="translate(' +
        ox.toFixed(1) + ',' + oy.toFixed(1) + ')">' +
        '<circle cx="2" cy="2" r="1.6" fill="' + (dark ? '#39405233' : '#c9d3e0') + '"/>' +
        '</pattern></defs>' +
        '<rect width="100%" height="100%" fill="url(#' + gid + ')"/>' +
        world(b) +
        carSvg({ px: pose.x, py: pose.y, th: pose.th, lamp: lamp }, 1.15);
      branches.forEach(function (el) { el.classList.toggle('is-on', el === b); });
      if (out) out.textContent = (sensor === 'sonar'
        ? gap.toFixed(0) : range.value) + unit;
    }

    // `last` 로 적은 행은 **앞 갈래의 속도를 이어 간다** — "그대로 간다"를 0 0 으로
    // 적으면 차가 서 버려 거짓이 된다.
    var lastL = 0, lastR = 0;

    function wheels(b) {
      var rawL = b.getAttribute('data-l'), rawR = b.getAttribute('data-r');
      var l = (rawL === 'last') ? lastL : parseFloat(rawL);
      var r = (rawR === 'last') ? lastR : parseFloat(rawR);
      if (!isFinite(l)) l = 0;
      if (!isFinite(r)) r = 0;
      lastL = l; lastR = r;
      return [l, r];
    }

    function frame(t) {
      var b = active();
      var dt = last ? Math.min(0.05, (t - last) / 1000) : 0;
      last = t;
      var lr = wheels(b), l = lr[0], r = lr[1];
      var st = stepPose(pose, l, r, 0, dt);
      // 차가 앞으로 가면 바닥은 뒤로 흐른다. 이것이 "전진"의 유일한 신호다.
      var vfwd = (l + r) / 2 / 100 * SPEED_MAX_CMS;
      ground.x -= Math.cos(st.th) * vfwd * dt * PX_PER_CM;
      ground.y -= Math.sin(st.th) * vfwd * dt * PX_PER_CM;
      // 차는 화면 한가운데를 지킨다 — 대신 **세계가 움직인다**(벽이 다가오고,
      // 바닥이 흐른다). 놀이터는 관찰하는 자리라 차가 화면 밖으로 나가면 안 된다.
      pose.th = st.th;
      if (sensor === 'sonar') {
        // 차는 **월드에서** 움직인다(화면에서는 가운데 고정이고 세계가 흐른다).
        var vfw = (l + r) / 2 / 100 * SPEED_MAX_CMS;
        car.x += Math.cos(pose.th) * vfw * dt;
        car.y += Math.sin(pose.th) * vfw * dt;
        gap = sonarGap();
        if (range) range.value = gap.toFixed(0);
      }
      paint(b);
      raf = requestAnimationFrame(frame);
    }

    if (range) range.addEventListener('input', function () {
      // 손으로 벽을 옮긴다 — 지금 머리 방향으로 그만큼 앞에 놓는다.
      var want = parseFloat(range.value);
      if (sensor === 'sonar') {
        wallY = car.y + Math.sin(pose.th) * want;
        gap = sonarGap();
      }
      paint(active());
    });
    picks.forEach(function (btn) {
      btn.addEventListener('click', function () {
        pick = btn.getAttribute('data-pick');
        picks.forEach(function (b2) { b2.classList.toggle('is-on', b2 === btn); });
        paint(active());
      });
    });
    paint(active());
    raf = requestAnimationFrame(frame);
  }

  function boot() {
    all('.cbp').forEach(initPlay);
    all('.cb-drive').forEach(initDrive);
    all('.sp').forEach(initScreen);
    all('.sn').forEach(initSensor);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else { boot(); }
})();
