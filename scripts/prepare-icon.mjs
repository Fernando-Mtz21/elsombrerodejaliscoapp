// Builds the source images @capacitor/assets needs from the restaurant logo.
// Usage: npm run assets:generate
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const LOGO = 'src/assets/img/logo.png';
const OUT = 'assets';
const BACKGROUND = '#FFFFFF';
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

async function compose(file, size, logoRatio, background) {
  const layers = [];

  if (logoRatio > 0) {
    const box = Math.round(size * logoRatio);
    const logo = await sharp(LOGO).resize({ width: box, height: box, fit: 'inside' }).toBuffer();
    layers.push({ input: logo, gravity: 'center' });
  }

  await sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite(layers)
    .png()
    .toFile(`${OUT}/${file}`);
}

await mkdir(OUT, { recursive: true });

// Legacy / iOS icon: iOS does not allow transparency.
await compose('icon-only.png', 1024, 0.8, BACKGROUND);
// Android adaptive icon: capacitor-assets already insets this 16.7% per side
// to keep it inside the launcher's safe zone, so the logo can fill the canvas.
await compose('icon-foreground.png', 1024, 0.9, TRANSPARENT);
await compose('icon-background.png', 1024, 0, BACKGROUND);
await compose('splash.png', 2732, 0.4, BACKGROUND);
await compose('splash-dark.png', 2732, 0.4, BACKGROUND);
