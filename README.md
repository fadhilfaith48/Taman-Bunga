# Taman Bunga

Taman bunga malam interaktif yang dibuat dengan HTML, CSS (SCSS), dan sedikit
JavaScript. Bunga glowing cyan, teal, pink, ungu, dan putih mekar perlahan,
dilengkapi kupu-kupu 3D, capung, kepik, siput, lapisan dedaunan, dan parallax
kamera yang mengikuti pointer — semuanya tanpa gambar, SVG eksternal, atau
library pihak ketiga.

## Fitur

- **Bunga sebagai subjek utama** — 14 bunga, 4 lapis kedalaman, kelopak dengan
  urat dan embun, napas & goyang berlapis.
- **Makhluk CSS** — 5 kupu-kupu (kepakan `rotateY` 3D), 2 capung bersayap
  berurat, 3 kepik, 3 siput spiral. Tanpa elemen gambar.
- **Taman berlapis** — siluet pohon, sulur, glow bulan, spora, firefly, dan
  dedaunan framing.
- **Kamera 3D** — `perspective` + `translateZ` per lapisan (`$scene-layers`)
  dengan skala kompensasi otomatis, drift halus, dan parallax mengikuti pointer
  lewat JS minimal (`js/scene.js`, opsional).
- **Aksesibilitas** — semua gerakan berhenti pada `prefers-reduced-motion`,
  elemen dekoratif `aria-hidden`, heading tersembunyi tetap ada.
- **Responsif** — tanpa scroll horizontal di 360–1920 px, ukuran memakai
  `clamp()`/`vmin`/`svh`.

## Struktur Proyek

```
Taman Bunga Prroyek/
├── flower.html              # Halaman utama
├── css/
│   └── style.css            # Hasil kompilasi SCSS (dipakai flower.html)
├── js/
│   └── scene.js             # Parallax pointer (opsional, progresif)
├── scss/
│   ├── _variables.scss      # Data: posisi bunga, palet, makhluk, scene 3D
│   ├── _flowers.scss        # Komponen bunga + kemiringan 3D mahkota
│   ├── _creatures.scss      # Kupu-kupu, capung, kepik, siput
│   └── style.scss           # Entry point: panggung, latar, lapisan 3D
├── scripts/
│   └── check-css.js         # Cek css/style.css masih sinkron dengan scss/
├── .github/workflows/ci.yml # CI: build & cek sinkron CSS
└── package.json             # Script build/check + versi sass terkunci
```

## Cara Menjalankan

Buka `flower.html` langsung di browser, atau jalankan static server:

```bash
npx serve .
```

## Build SCSS

`css/style.css` adalah hasil kompilasi folder `scss/`. Instalasi awal + build:

```bash
npm install     # sekali saja, mengunci versi sass
npm run build   # kompilasi scss/style.scss -> css/style.css
npm run watch   # kompilasi ulang otomatis saat file SCSS disimpan
npm run check   # pastikan css/style.css sinkron dengan scss/
```

Tanpa npm pun masih bisa: `npx sass scss/style.scss css/style.css --no-source-map`.

> Setiap perubahan SCSS wajib diikuti `npm run build` lalu commit bersama
> perubahannya. GitHub Actions menjalankan `npm run check` di setiap push.

## Kredit

Dibuat oleh [fadhilfaith48](https://github.com/fadhilfaith48).
