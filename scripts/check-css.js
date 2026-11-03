// ============================================================
//  CEK SINKRONISASI CSS
//  Mengompilasi SCSS ke memori lalu membandingkannya dengan
//  css/style.css yang ada di repo. Kalau berbeda (lupa
//  kompilasi / edit langsung di CSS), proses exit dengan kode 1.
//  Dipakai oleh `npm run check` dan GitHub Actions.
// ============================================================
const fs = require('node:fs');
const path = require('node:path');
const sass = require('sass');

const root = path.join(__dirname, '..');
const sourcePath = path.join(root, 'scss', 'style.scss');
const compiledPath = path.join(root, 'css', 'style.css');

const compiled = sass.compile(sourcePath, { style: 'expanded' }).css;
const onDisk = fs.readFileSync(compiledPath, 'utf8');

// Normalisasi perbedaan akhir baris CRLF/LF saja.
const normalize = (text) => text.replace(/\r\n/g, '\n').trimEnd();

if (normalize(compiled) !== normalize(onDisk)) {
  console.error(
    'css/style.css tidak sinkron dengan scss/.\n' +
      'Jalankan: npm run build  lalu commit hasilnya.'
  );
  process.exit(1);
}

console.log('css/style.css sinkron dengan scss/.');
