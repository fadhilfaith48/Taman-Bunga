# Changelog

Semua perubahan penting pada proyek ini dicatat di sini.
Format mengikuti [Keep a Changelog](https://keepachangelog.com/id/1.1.0/).

## [Unreleased]

## [1.1.0] - 2026-11-10

### Ditambahkan

- `favicon.ico` (16/32/48 PNG di dalam ICO) untuk browser/bot yang masih
  meminta `/favicon.ico`; SVG data URI tetap dipakai untuk layar retina.
- Dimensi & alt gambar sosial: `og:image:width/height/type/alt` dan
  `twitter:image:alt` (juga di halaman pengalih `flower.html`).
- `site.webmanifest` + ikon PWA 192/512 (regular & maskable) untuk
  Add to Home Screen di Android/Chromium, plus `apple-mobile-web-app-title`.

### Diubah

- Struktur README memuat `favicon.ico` dan berkas PWA.
- `sitemap.xml` diperbarui `lastmod`-nya.

## [1.0.0] - 2026-11-05

Rilis pertama: taman bunga malam interaktif yang seluruh visualnya dibuat
dari HTML + SCSS/CSS (tanpa gambar, SVG eksternal, atau library).

### Ditambahkan

- 14 bunga glowing dengan 4 lapis kedalaman, kelopak berurat & embun,
  kemiringan 3D halus pada mahkota, serta napas/goyang berlapis.
- Makhluk CSS: 5 kupu-kupu (kepakan `rotateY` 3D), 2 capung, 3 kepik,
  3 siput — tanpa elemen gambar.
- Latar berlapis: siluet pohon, sulur, glow bulan, spora, kunang-kunang,
  kelopak jatuh, dan dedaunan framing (sebagian besar dari `@for`/`@each`).
- Kamera 3D: `perspective` + `translateZ` per lapisan dengan skala
  kompensasi (`$scene-layers`, `@function depth-scale`), drift halus,
  dan parallax mengikuti pointer/jari lewat `js/scene.js` (opsional).
- Favicon SVG inline di data URI, meta OG/Twitter, `apple-touch-icon`,
  dan halaman pengalih `flower.html` agar link lama tetap hidup.
- GitHub Pages (`https://fadhilfaith48.github.io/Taman-Bunga/`), LICENSE MIT,
  `robots.txt`/`sitemap.xml`, dan JSON-LD.
- Build reproducible: `npm run build`/`watch`/`check` dengan versi sass
  terkunci; `npm test` (QA 6 viewport, reduced-motion, FPS, parallax).
- GitHub Actions: cek sinkron `css/style.css` + QA visual di setiap push.

### Diubah

- `flower.html` → `index.html` sebagai halaman utama (syarat GitHub Pages).
- `og:image` dikompres menjadi JPEG 48 KB (sebelumnya PNG 660 KB).
- Tuning layar kecil/`pointer: coarse`: partikel berkurang dan blur lebih
  tipis agar FPS stabil; `will-change` diaudit dari 18 menjadi 10.
- Parallax aktif juga di layar sentuh (sebelumnya dikecualikan).

### Diperbaiki

- Posisi kunang-kunang: 4 dari 5 tidak pernah kena selector `nth-child`
  sehingga menumpuk di pojok kiri atas.

### Keamanan/aksesibilitas

- Seluruh animasi berhenti pada `prefers-reduced-motion`.
- Tanpa JavaScript pun halaman tampil penuh (JS hanya menambah parallax).

[Unreleased]: https://github.com/fadhilfaith48/Taman-Bunga/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/fadhilfaith48/Taman-Bunga/releases/tag/v1.1.0
[1.0.0]: https://github.com/fadhilfaith48/Taman-Bunga/releases/tag/v1.0.0
