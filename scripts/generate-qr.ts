/**
 * ──────────────────────────────────────────────
 *  🌹  Custom Romantic QR Code Generator
 * ──────────────────────────────────────────────
 *
 *  Generates a beautiful SVG QR code styled in
 *  the site's romantic palette.
 *
 *  Usage:
 *    npx tsx scripts/generate-qr.ts
 *    npx tsx scripts/generate-qr.ts https://your-custom-url.com
 *
 *  Output:  public/qr-code.svg  (print-ready)
 *           public/qr-code.html (preview with frame)
 * ──────────────────────────────────────────────
 */

import QRCode from "qrcode";
import { writeFileSync } from "fs";
import { resolve } from "path";

// ─── Configuration ────────────────────────────
const DEFAULT_URL = "https://USERNAME.github.io/Sweetie/";

// Romantic colour palette (matches the website)
const DARK_COLOR = "#7A2E3A";   // burgundy modules
const LIGHT_COLOR = "#FDF6EE";  // cream background
const ACCENT = "#D4848A";       // rose accent

// ─── Parse URL from CLI args ──────────────────
const url = process.argv[2] || DEFAULT_URL;
console.log(`\n🌹 Generating QR code for: ${url}\n`);

/** Extract the module grid size from the generated SVG (viewBox or path bounds). */
function extractModuleSize(svg: string): number {
  // The qrcode lib outputs an SVG with viewBox="0 0 N N" where N is the module count + margin
  const match = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
  if (match) return parseInt(match[1], 10);
  // Fallback: QR v5 with 2-module margin = 41
  return 41;
}

async function generate() {
  // 1) Generate raw SVG QR code
  const rawSvg = await QRCode.toString(url, {
    type: "svg",
    color: {
      dark: DARK_COLOR,
      light: LIGHT_COLOR,
    },
    errorCorrectionLevel: "H", // High error correction (allows centre logo)
    margin: 2,
    width: 400,
  });

  // 2) Wrap it in a styled SVG with romantic frame
  const styledSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-60 -80 520 560" width="520" height="560">
  <defs>
    <!-- Soft shadow -->
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="${DARK_COLOR}" flood-opacity="0.15"/>
    </filter>
    <!-- Paper texture -->
    <pattern id="paper" patternUnits="userSpaceOnUse" width="4" height="4">
      <rect width="4" height="4" fill="${LIGHT_COLOR}"/>
      <rect width="1" height="1" x="1" y="1" fill="${ACCENT}" opacity="0.03"/>
      <rect width="1" height="1" x="3" y="3" fill="${ACCENT}" opacity="0.02"/>
    </pattern>
  </defs>

  <!-- Card background -->
  <rect x="-50" y="-70" width="500" height="540" rx="24" ry="24"
        fill="url(#paper)" stroke="${ACCENT}" stroke-width="1.5"
        filter="url(#shadow)" opacity="0.97"/>

  <!-- Decorative top border -->
  <line x1="-20" y1="-35" x2="420" y2="-35"
        stroke="${ACCENT}" stroke-width="0.5" opacity="0.3"/>

  <!-- Title -->
  <text x="200" y="-42" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="16" fill="${DARK_COLOR}" font-weight="600"
        letter-spacing="0.08em">
    SCAN FOR A LITTLE SURPRISE
  </text>

  <!-- QR Code (injected) -->
  <g transform="scale(${400 / extractModuleSize(rawSvg)})">
    ${rawSvg.replace(/<\?xml[^?]*\?>/, "").replace(/<svg[^>]*>/, "").replace("</svg>", "")}
  </g>

  <!-- Heart centre overlay -->
  <circle cx="200" cy="200" r="28" fill="${LIGHT_COLOR}" stroke="${ACCENT}" stroke-width="1.5"/>
  <text x="200" y="210" text-anchor="middle" font-size="26">💕</text>

  <!-- Bottom text -->
  <text x="200" y="438" text-anchor="middle"
        font-family="'Brush Script MT', 'Dancing Script', cursive"
        font-size="20" fill="${ACCENT}" opacity="0.8">
    made with love
  </text>

  <!-- Small decorative hearts -->
  <text x="-20" y="455" font-size="12" fill="${ACCENT}" opacity="0.3">♥</text>
  <text x="410" y="455" font-size="12" fill="${ACCENT}" opacity="0.3">♥</text>
</svg>`;

  // 3) Save SVG
  const svgPath = resolve(process.cwd(), "public/qr-code.svg");
  writeFileSync(svgPath, styledSvg, "utf-8");
  console.log(`  ✅ SVG saved to:  ${svgPath}`);

  // 4) Create a nice preview HTML
  const previewHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QR Code — For You 💕</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Dancing+Script:wght@500&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(160deg, #FDF6EE 0%, #F9EDDE 40%, #FAE8E4 100%);
      font-family: 'Playfair Display', Georgia, serif;
      color: #7A2E3A;
      padding: 2rem;
    }

    h1 {
      font-size: clamp(1.4rem, 4vw, 2rem);
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-family: 'Dancing Script', cursive;
      font-size: 1.1rem;
      color: #D4848A;
      margin-bottom: 2rem;
    }

    .qr-container {
      background: white;
      padding: 1.5rem;
      border-radius: 20px;
      box-shadow:
        0 8px 30px rgba(122, 46, 58, 0.12),
        0 2px 8px rgba(0,0,0,0.04);
      max-width: 400px;
      width: 100%;
    }

    .qr-container img {
      width: 100%;
      height: auto;
      display: block;
    }

    .url {
      margin-top: 1.5rem;
      font-size: 0.8rem;
      color: #8B7070;
      word-break: break-all;
      text-align: center;
    }

    .instructions {
      margin-top: 2rem;
      font-size: 0.85rem;
      color: #8B7070;
      text-align: center;
      line-height: 1.6;
      max-width: 400px;
    }

    .instructions code {
      background: rgba(212, 132, 138, 0.1);
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      font-size: 0.8rem;
    }
  </style>
</head>
<body>
  <h1>Your QR Code 💕</h1>
  <p class="subtitle">Print it, text it, or tuck it in a card</p>

  <div class="qr-container">
    <img src="qr-code.svg" alt="QR code linking to your love story website" />
  </div>

  <p class="url">${url}</p>

  <div class="instructions">
    <p>This QR code links to your website.</p>
    <p>To update the URL, run:</p>
    <p><code>npx tsx scripts/generate-qr.ts https://your-url.com</code></p>
  </div>
</body>
</html>`;

  const htmlPath = resolve(process.cwd(), "public/qr-code.html");
  writeFileSync(htmlPath, previewHtml, "utf-8");
  console.log(`  ✅ Preview saved: ${htmlPath}`);

  console.log(`\n  Open public/qr-code.html in a browser to preview.`);
  console.log(`  Print public/qr-code.svg for a physical card.\n`);
  console.log(`  To change the URL, run:`);
  console.log(`    npx tsx scripts/generate-qr.ts https://your-actual-url.com\n`);
}

generate().catch((err) => {
  console.error("Error generating QR code:", err);
  process.exit(1);
});
