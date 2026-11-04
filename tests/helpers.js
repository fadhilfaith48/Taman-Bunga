// ============================================================
//  PEMBANTU TES — browser, URL, dan utilitas bersama
//  Semua tes bisa jalan tanpa server: default memakai file://
//  index.html. Set SITE_URL untuk menguji server lokal/hosting.
// ============================================================
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright-core');

const ROOT = path.join(__dirname, '..');

// Cari Chrome/Chromium di platform yang umum; CHROME_PATH menimpa.
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

function chromePath() {
  const found = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
  if (!found) {
    console.error(
      'Chrome tidak ditemukan. Set CHROME_PATH ke lokasi binary browser.'
    );
    process.exit(2);
  }
  return found;
}

function siteUrl() {
  return process.env.SITE_URL || pathToFileURL(path.join(ROOT, 'index.html')).href;
}

async function launch() {
  return chromium.launch({ executablePath: chromePath(), headless: true });
}

module.exports = { launch, siteUrl, ROOT };
