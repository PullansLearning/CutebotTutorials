// ════════════════════════════════════════════════════════════════════
// Cutebot STEM — 확인지 스킨 (채점의 **앱 몫**)
//
// 여기 있는 것은 셋뿐이다:
//   ① 이 코스의 문항 마크업에서 "영역별로 몇 개 맞았나"를 걷는 코드
//   ② 영역 이름·아이콘 (course.config 의 tracking.areas 와 같은 key)
//   ③ 영역 × 수준별 조언 문구
//
// 여기 있으면 안 되는 것 (전부 엔진 EDUXAssess 소유 — 가드가 막는다):
//   · 영역 밴드 임계를 퍼센트로 직접 비교하기   → EDUXAssess.levelOf(pct).tier
//   · 등급·총평 문구를 앱이 다시 선언하기      → EDUXAssess.grade() 결과에 실려 온다
//   · 레이더 SVG                             → EDUXAssess.radarSvg()
//   · 인쇄 리포트 HTML                       → EDUXAssess.printReport()
//   · 결과 전송 fetch·payload 조립           → EDUXAssess.send(scores, opts)
//
// ⚠ 위 금지 항목을 **코드 리터럴로 예시하지 말 것** — check_tracking 의 중복-구현 패턴이
//    주석까지 훑으므로, 예시가 곧 위반으로 잡힌다(이 파일이 실제로 그랬다).
//
// **정답은 이 페이지에 없다 (C91).** 제출을 누른 뒤에야 `_data/{stem}.key.json` 을
// 가져와 채점한다. 설정은 페이지가 심는 `window.ASSESS_CFG` 하나다 — 그것이 없거나
// `#qz-submit` 이 없으면 이 파일은 아무 일도 하지 않는다.
//
// 계약: engine/docs/account_model.md §8 · 가드: engine/tools/check_tracking.py
//
// ⛔ 공통 배선은 **엔진이 한다** (2026-09-16 승격) — `EDUXAssessSkin.mount()`.
//    보기 배타선택 · 진행 카운터 · 정답 파일 주소 · 제출 훅은 세 앱에서 동일하거나
//    ≥0.95 였고, 그 사본 다섯 벌 때문에 `cleanUrls` 버그 **하나를 다섯 곳**에서
//    고쳤다(증상도 서로 달랐다). 여기 남는 것은 **이 코스만의 것 셋**뿐이다:
//    ① `AREAS` ② `ADVICE` ③ `collect()` — 이 코스의 마크업에서 정답 수를 걷는 함수.
// ════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  // ② 영역 — key 는 course.config 의 tracking.areas 와 반드시 같다.
  //    sel 이 있으면 객관식(맞은 개수), rubric 이 있으면 자기평가(체크한 개수).
  var AREAS = [
    { key: 'concept',    label: 'Concept',  icon: '🧠', sel: '.qz-set--concept .qz' },
    { key: 'reading',    label: 'Reading',  icon: '👀', sel: '.qz-set--reading .qz' },
    { key: 'debug',      label: 'Debug',    icon: '🐞', sel: '.qz-set--debug .qz' },
    { key: 'building',   label: 'Building', icon: '🧱', sel: '.qz-set--building .qz' },
    { key: 'communicat', label: 'Talk',     icon: '💬', rubric: 'communicat' },
  ];

  // ③ 조언 — 키는 엔진 tier(high/mid/low). 밴드를 옮겨도 여기는 그대로다.
  //    이 코스를 가르칠 교사가 코딩을 몰라도 그대로 읽어 줄 수 있는 문장으로 쓴다.
  var ADVICE = {
    concept: {
      high: 'Strong on today’s blocks. Say what each one asks the car to do before you drag it.',
      mid:  'Some blocks are still new. Open the chapter and read the word cards again.',
      low:  'Today’s blocks have not settled yet. Go back to the chapter and name each block out loud.',
    },
    reading: {
      high: 'Sharp reader. Next chapter, say what the car will do before you download.',
      mid:  'Read the blocks in order and say what the wheels do after each one.',
      low:  'Download the programs from these questions and watch the car on the floor.',
    },
    debug: {
      high: 'Good eye. Try changing one number on purpose and predicting how the car changes.',
      mid:  'Compare the broken program with a working one from the chapter — what is different?',
      low:  'Check the batteries first, then look for the block that does not match the plan.',
    },
    building: {
      high: 'Strong ordering. Try an Extend project from the end of the chapter.',
      mid:  'Draw the path on paper first, then put the blocks in that order.',
      low:  'Build the chapter’s program again with your teacher, saying each block as you drag it.',
    },
    communicat: {
      high: 'Excellent explaining. Teach it to a classmate who missed the lesson.',
      mid:  'Point at the car while you explain — it makes the words easier to find.',
      low:  'Practise one sentence: what the car does, and which block makes it happen.',
    },
  };

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  // ① 답 걷기 — 이 코스의 마크업에 맞춰 여기만 고친다.
  function collect(key, picks) {
    return AREAS.map(function (a) {
      if (a.rubric) {
        // 서술 영역은 기계가 못 채점한다. 비워 두면 레이더의 그 축이 언제나 0 이
        // 되어 "말하기를 못한다"고 거짓말하므로, 학생이 스스로 체크한 수를 쓴다.
        var list = $('.qz-rub[data-rubric="' + a.rubric + '"]');
        var boxes = list ? $$('.qz-rub__c', list) : [];
        return {
          key: a.key, label: a.label, icon: a.icon,
          correct: boxes.filter(function (b) { return b.checked; }).length,
          total: boxes.length || 1,
        };
      }
      var qs = $$(a.sel), correct = 0;
      qs.forEach(function (q) {
        var n = q.getAttribute('data-q');
        var want = (key[a.key] || {})[n];
        var got = $('.qz-opt.is-picked', q);
        var mine = got ? got.getAttribute('data-letter') : '';
        if (!want) return;
        if (mine === want) correct++;
        if (picks) picks.push({ q: n, picked: mine, want: want });
      });
      return { key: a.key, label: a.label, icon: a.icon, correct: correct, total: qs.length || 1 };
    });
  }

  EDUXAssessSkin.mount({
    areas: AREAS, advice: ADVICE, collect: collect,
    scrollToReview: true,
  });
})();
