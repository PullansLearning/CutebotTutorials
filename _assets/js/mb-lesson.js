/* mb-lesson.js — micro:bit STEM 챕터 페이지의 상호작용 층.
 *
 * 계약: 여기서 쓰는 클래스·data 속성의 짝은 `_schema/tools/extract.py` 다.
 *       한쪽만 고치면 조용히 죽는다 — 같은 커밋에서 고친다.
 *
 * 원칙 셋:
 *   ① **의존성 0.** CDN 도 프레임워크도 없다. 이 코스는 인터넷이 끊기는 교실에서
 *      설치형 PWA 로 열린다.
 *   ② **없어도 읽힌다.** JS 가 죽어도 Predict 는 보기 목록, Build 는 번호 매긴
 *      단계로 남는다. 내용이 JS 뒤에 숨지 않는다.
 *   ③ **한 위젯의 고장이 페이지를 끊지 않는다** (boot 위 주석 참조).
 *
 * 다루는 것: 엔진 위젯을 붙이는 일뿐이다 — Build 체크리스트(`EDUXBuild`) ·
 *            Fix It 퍼즐(`EDUXPuzzle`). Predict·낱말 발음도 엔진에 있다.
 *            탭 전환은 템플릿의 인라인 스크립트가 계속 맡는다.
 */
(function () {
  'use strict';

  function on(el, ev, fn) { el.addEventListener(ev, fn); }

  /* ⚠️ LED 재생기(initPlayer)는 걷어냈다 (2026-08-18).
   * 형제 앱 microbit-stem 에서 딸려온 코드인데, 그 앱은 `mb_sim.py` 가 빌드 때
   * 프레임을 구워 `.mb-play[data-sim]` 에 실어 준다. **이 앱에는 그 생성기가 없다** —
   * `[LEDS]` 는 정지 화면 `.mb-screen` 하나를 낸다. 그래서 이 함수는 존재하지 않는
   * 클래스를 기다리며 한 번도 돈 적이 없다. 없는 것을 기다리는 코드는 지운다.
   */

  /* ── ③ Build 체크리스트 → **엔진 위젯**으로 갔다 (2026-09-27) ─────────────
   * engine/runtime/js/edux-build.js (`EDUXBuild.mount`). 여기 있던 판은 기기 하나에
   * 키 하나(`mbSTEM.build.<id>`)라 교실 컴퓨터를 돌려 쓰는 학생들이 서로의 체크를
   * 덮어썼다. 엔진은 계정별로 저장한다. 옛 키는 처음 열 때 한 번 읽어 옮긴다. */
  function legacyBuildKey(c) {
    return ['mbSTEM.build.' + (c.box.getAttribute('data-build') || c.stem)];
  }

  /* ── ③b Fix It 언스크램블 퍼즐 → **엔진 위젯**으로 갔다 ─────────────────
   * engine/runtime/js/edux-puzzle.js (`EDUXPuzzle.mount`). 여기 있던 110줄은
   * DOM 만 아는 코드였고 — 카드 안에 무엇이 그려지는지 한 번도 보지 않는다 —
   * microbit-stem 이 같은 위젯을 필요로 하면서 사본 셋이 될 참이었다
   * (2026-08-29 승격). 마크업 계약(`.ds-*` · `data-order`)은 그대로다. */

  /* ④ Predict — **엔진으로 옮겼다** (2026-09-06). 고르기·정오 표시·까닭 열기는
   * 이제 `<edux-predict>` 한 곳에 산다 (design_system §3.20). 여기 있던 판은
   * 정답을 `data-correct` 로 **지면에서** 읽었다 — 그 한 줄이 "고른 뒤에 보인다"는
   * 약속을 소스 보기 한 번에 무너뜨렸다. 이제 정답은 `_data/<cid>.predict.json`
   * 에 있고 학생이 고른 뒤에 온다. 형제 앱과 같은 규율(확인지 키)이다. */

  /* ⑤ 낱말 발음 — **엔진으로 옮겼다** (2026-09-05). 소리를 내는 것은 이제 `.vocab-say`
   * 버튼이 아니라 **카드 전체**이고(탭하면 뜻이 펴지면서 낱말을 읽는다), 그 동작은
   * edux-chrome.js §어휘 카드 한 곳에 산다 — 여섯 앱이 같은 카드를 쓴다.
   * "음성이 없으면 죽은 버튼을 안 보인다"는 규율은 문구로 남았다: 엔진이
   * `<html data-nospeech>` 를 달면 힌트가 "tap to see" 로 바뀐다. */

  /* 위젯 하나가 죽어도 나머지는 산다.
   * 실측(2026-08-18): initBuild 가 `.bd-step` 를 찾다 null 을 만나 던졌고 —
   * 실제 클래스는 `.build-step` 이었다 — 그 한 줄이 boot 을 통째로 끊어서
   * **Predict 와 낱말 발음까지 전 페이지에서 죽어 있었다.** 콘솔을 안 봤으면
   * 영영 몰랐다. 그 가두기(예전 `safely`)는 이제 엔진 위젯이 스스로 한다 —
   * `EDUXBuild.mount` 는 체크리스트 하나가 던져도 삼키고 다음으로 간다. */

  function boot() {
    if (window.EDUXBuild) EDUXBuild.mount({ legacy: legacyBuildKey });   // 엔진 위젯 (edux-build.js)
    if (window.EDUXPuzzle) EDUXPuzzle.mount();       // 엔진 위젯 (edux-puzzle.js)
  }

  if (document.readyState === 'loading') {
    on(document, 'DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
