# Taman Bunga

Taman bunga malam interaktif yang dibuat dengan HTML dan CSS (SCSS). Bunga-bunga
berwarna cyan, teal, pink, ungu, dan putih mekar perlahan dengan efek glowing.

## Struktur Proyek

```
Taman Bunga Prroyek/
├── flower.html          # Halaman utama
├── css/
│   └── style.css        # CSS hasil kompilasi (dipakai flower.html)
└── scss/
    ├── _variables.scss  # Variabel warna, posisi, dan delay bunga
    ├── _flowers.scss    # Komponen bunga dan taman
    └── style.scss       # Entry point SCSS
```

## Cara Menjalankan

Buka `flower.html` langsung di browser, atau jalankan static server:

```bash
npx serve .
```

## Kredit

Dibuat oleh [fadhilfaith48](https://github.com/fadhilfaith48).
