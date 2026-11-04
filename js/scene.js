// ============================================================
//  KAMERA TAMAN — parallax mengikuti pointer (progressive)
//  JS ini hanya menulis dua custom property (--cam-rx, --cam-ry)
//  pada .garden__camera; CSS (keyframes camera-idle) yang
//  menggabungkannya dengan drift kamera.
//
//  Aman tanpa JS: halaman tetap jalan dengan drift CSS.
//  Aman saat prefers-reduced-motion: tidak ada listener yang
//  dipasang. Di layar sentuh, parallax mengikuti jari saat digeser.
// ============================================================
(() => {
  const stage = document.querySelector('.garden__camera');
  if (!stage) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Layar sentuh tetap dilayani: pointermove juga dipicu saat jari
  // menyentuh layar, jadi parallax aktif selama digeser (di desktop
  // aktif selama kursor bergerak).

  const MAX_TILT_X = 2.2; // rotateX, derajat
  const MAX_TILT_Y = 3.2; // rotateY, derajat
  const EASE = 0.06;
  const SETTLE = 0.004;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let frame = 0;

  function tick() {
    currentX += (targetX - currentX) * EASE;
    currentY += (targetY - currentY) * EASE;
    stage.style.setProperty('--cam-rx', currentX.toFixed(3) + 'deg');
    stage.style.setProperty('--cam-ry', currentY.toFixed(3) + 'deg');
    frame =
      Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > SETTLE
        ? requestAnimationFrame(tick)
        : 0;
  }

  addEventListener(
    'pointermove',
    (event) => {
      const nx = (event.clientX / innerWidth) * 2 - 1;
      const ny = (event.clientY / innerHeight) * 2 - 1;
      targetX = -ny * MAX_TILT_X;
      targetY = nx * MAX_TILT_Y;
      if (!frame) frame = requestAnimationFrame(tick);
    },
    { passive: true }
  );

  // Hentikan rAF saat tab tersembunyi supaya tidak boros baterai.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  });
})();
