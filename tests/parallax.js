// ============================================================
//  UJI PARALLAX — lapisan dekat harus bergeser lebih jauh
//  daripada lapisan jauh saat pointer berpindah sudut.
//  Jalankan: node tests/parallax.js
// ============================================================
const { launch, siteUrl } = require('./helpers');

(async () => {
  const b = await launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  p.on('console', (m) => {
    if (m.type() === 'error') errs.push(m.text());
  });
  await p.goto(siteUrl());
  await p.waitForTimeout(3000);

  const snap = () =>
    p.evaluate(() => {
      const r = (s) => {
        const box = document.querySelector(s).getBoundingClientRect();
        return [Math.round(box.left * 10) / 10, Math.round(box.top * 10) / 10];
      };
      return {
        moon: r('.garden__moon'),
        trees: r('.garden__trees'),
        front: r('.garden__foliage--front'),
        flowers: r('.garden__flowers'),
      };
    });

  const rest = await snap();
  await p.mouse.move(1400, 860);
  await p.waitForTimeout(1800);
  const right = await snap();
  await p.mouse.move(40, 40);
  await p.waitForTimeout(1800);
  const left = await snap();

  const delta = (a, c) => Math.abs(c[0] - a[0]) + Math.abs(c[1] - a[1]);
  const shift = {
    moon: Math.round(delta(right.moon, left.moon) * 10) / 10,
    trees: Math.round(delta(right.trees, left.trees) * 10) / 10,
    front: Math.round(delta(right.front, left.front) * 10) / 10,
    flowers: Math.round(delta(right.flowers, left.flowers) * 10) / 10,
  };

  // Diferensial minimal: dedaunan depan (z+) jauh lebih bergerak
  // daripada bulan (z-80).
  const ok = shift.front > 2 && shift.front > shift.moon * 2 && errs.length === 0;

  console.log('geser pointer ujung→ujung (px):', JSON.stringify(shift));
  if (errs.length) console.log('errors:', errs);
  console.log(ok ? 'PARALLAX OK' : 'PARALLAX GAGAL');
  await b.close();
  process.exit(ok ? 0 : 1);
})();
