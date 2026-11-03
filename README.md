# Micro:bit with Cutebot — class tutorials

A static tutorial site for programming the ELECFREAKS Cutebot with a micro:bit:
6 levels, 15 chapters, a check-up (assessment) per chapter, teacher answer keys,
a block reference, and a teacher guide.

Adapted from <https://cutebot.editstudy.com>.

## Hosting

The site is plain HTML/CSS/JS with no build step, served by GitHub Pages at
<https://pullanslearning.github.io/CutebotTutorials/>.

To turn it on: **Settings → Pages → Build and deployment → Deploy from a branch**,
then pick the branch and `/ (root)`.

- `.nojekyll` must stay: without it GitHub Pages hides the `_assets/` and `_data/` folders.
- `offline.html` and the canonical/social-share URLs hard-code the
  `/CutebotTutorials/` path. If the repo is renamed or a custom domain is used,
  search for `CutebotTutorials` and update them.

## No backend

Progress, check-up scores and names stay in each student's browser
(`localStorage`); nothing is sent anywhere. There is no login, error-report or
assessment e-mail service, and `_assets/js/edux-center.js` is only an offline stub.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | Home page |
| `levelN/levelN_chM.html` | Chapter lessons (Warm-Up → Predict → Try It → Plan → Build → Fix It → Extend) |
| `levelN/assessment/` | Chapter check-ups and teacher answer keys (`*_key.html`) |
| `blocks.html`, `alignment.html`, `teacher.html`, `teacher-guide.html`, `progress.html` | Reference and teacher pages |
| `_assets/` | Shared CSS, JS, fonts, icons, kit pictures, video clips |
| `_data/` | Predict answers and check-up answer keys (JSON) |
| `sw.js`, `manifest.json`, `offline.html` | Installable / offline support |
