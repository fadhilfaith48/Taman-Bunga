// ============================================================
//  QA TAMPILAN — viewport, scroll, offscreen, error, reduced-motion
//  Jalankan: npm run test  (atau SITE_URL=... node tests/qa.js)
// ============================================================
const { launch, siteUrl } = require('./helpers');

const VIEWPORTS = [
  { name: 'small-360', width: 360, height: 740 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1024', width: 1024, height: 768 },
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'wide-1920', width: 1920, height: 1080 },
];

(async () => {
  const url = siteUrl();
  const b = await launch();
  let fail = 0;

  for (const vp of VIEWPORTS) {
    const p = await b.newPage({ viewport: { width: vp.width, height: vp.height } });
    const errs = [];
    const notFound = [];
    p.on('pageerror', (e) => errs.push(e.message));
    p.on('console', (m) => {
      if (m.type() === 'error') errs.push(m.text());
    });
    p.on('response', (r) => {
      if (r.status() >= 400) notFound.push(`${r.status()} ${r.url()}`);
    });
    await p.goto(url);
    await p.waitForTimeout(3500);

    const d = await p.evaluate(() => {
      const q = (s) => [...document.querySelectorAll(s)];
      // .firefly/.spore/.falling-petal sengaja dipotong overflow:hidden
      // .garden__ambient, jadi tidak ikut pengecekan offscreen.
      const off = q('.flower, .butterfly, .dragonfly, .ladybug, .snail, .garden__moon')
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && (r.right < -60 || r.left > innerWidth + 60);
        })
        .map((el) => el.className.split(' ')[0]);
      return {
        dom: document.querySelectorAll('body *').length,
        scrollX: document.documentElement.scrollWidth > window.innerWidth,
        scrollY: document.documentElement.scrollHeight > window.innerHeight,
        off,
        flowers: q('.flower').length,
        creatures: q('.butterfly, .dragonfly, .ladybug, .snail').length,
        animations: document.getAnimations().length,
      };
    });

    const ok =
      !d.scrollX && !d.scrollY && d.off.length === 0 &&
      errs.length === 0 && notFound.length === 0 && d.dom <= 215;
    if (!ok) fail++;
    console.log(
      `${ok ? 'OK  ' : 'FAIL'} ${vp.name}: dom=${d.dom} scrollX=${d.scrollX} ` +
        `scrollY=${d.scrollY} off=[${d.off}] anim=${d.animations} ` +
        `err=${errs.length} notFound=${notFound.length}`
    );
    if (errs.length) console.log('     errors:', errs);
    if (notFound.length) console.log('     404:', notFound);
    await p.close();
  }

  // --- reduced motion: semua animasi berhenti ---
  const rm = await b.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  await rm.goto(url);
  await rm.waitForTimeout(800);
  const rmd = await rm.evaluate(() => ({
    running: document.getAnimations().filter((a) => a.playState === 'running').length,
    butterfly: getComputedStyle(document.querySelector('.butterfly')).animationName,
    camera: getComputedStyle(document.querySelector('.garden__camera')).animationName,
    ambient:
      getComputedStyle(document.querySelector('.garden__ambient')).display,
  }));
  const rmOk =
    rmd.running === 0 && rmd.butterfly === 'none' &&
    rmd.camera === 'none' && rmd.ambient === 'none';
  if (!rmOk) fail++;
  console.log(`${rmOk ? 'OK  ' : 'FAIL'} reduced-motion:`, JSON.stringify(rmd));
  await rm.close();

  // --- performa kasar (headless; angka mutlak bervariasi) ---
  const perf = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await perf.goto(url);
  await perf.waitForTimeout(2500);
  const fps = await perf.evaluate(
    () =>
      new Promise((resolve) => {
        let frames = 0;
        const start = performance.now();
        const tick = () => {
          frames++;
          if (performance.now() - start < 2000) requestAnimationFrame(tick);
          else resolve(Math.round((frames / (performance.now() - start)) * 1000));
        };
        requestAnimationFrame(tick);
      })
  );
  const fpsOk = fps >= 30;
  if (!fpsOk) fail++;
  console.log(`${fpsOk ? 'OK  ' : 'FAIL'} fps≈${fps} (ambang 30)`);
  await perf.close();

  await b.close();
  console.log(fail === 0 ? 'QA SEMUA LULUS' : `QA GAGAL: ${fail}`);
  process.exit(fail === 0 ? 0 : 1);
})();
