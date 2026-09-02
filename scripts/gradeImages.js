import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagesDir = './public/images';
const backupDir = './public/images_raw';

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Configuration for each image to strip AI saturation and achieve authentic, grounded realism
const imageConfigs = {
  'colombo-lotus-hero.jpg': {
    saturation: 0.78,
    brightness: 0.96,
    gamma: 1.04,
    description: 'Tone down neon glow, natural twilight over Beira Lake, realistic architectural exposure'
  },
  'sl-minimal-living.jpg': {
    saturation: 0.90, // Already looks very natural
    brightness: 0.98,
    gamma: 1.02,
    description: 'Preserve natural raw cut-cement and temple tree foliage'
  },
  'villa-exterior.jpg': {
    saturation: 0.72, // Heavily saturated AI dusk -> muted natural coral stone and dusky sky
    brightness: 0.94,
    gamma: 1.06,
    description: 'Muted coral stone, desaturated sky, quiet coastal dusk in Talpe'
  },
  'dining-pavilion.jpg': {
    saturation: 0.75, // Lower brass and floor saturation to realistic honed Calacatta and teak
    brightness: 0.95,
    gamma: 1.03,
    description: 'Realistic matte Calacatta marble and natural teak wood tones'
  },
  'spa-bath.jpg': {
    saturation: 0.78, // Desaturate yellow cast into cool, neutral travertine and soft daylight
    brightness: 0.97,
    gamma: 1.04,
    description: 'Soft overcast zenithal light, natural matte Rapolano stone'
  },
  'master-sanctuary.jpg': {
    saturation: 0.74, // Lower intense amber wall glow to soft, organic mineral lime plaster
    brightness: 0.95,
    gamma: 1.05,
    description: 'Understated lime plaster and natural unbleached Belgian linen'
  },
  'after-luxury.jpg': {
    saturation: 0.76, // Lower orange wood stain to deep, natural matte Ceylon teak
    brightness: 0.95,
    gamma: 1.04,
    description: 'Natural matte wood grain, realistic city dusk through glass'
  },
  'before-concrete.jpg': {
    saturation: 0.82,
    brightness: 0.98,
    gamma: 1.02,
    description: 'Authentic dusty construction grey subfloor and raw concrete'
  }
};

async function processImages() {
  console.log('Starting architectural color grading to remove AI saturation...');

  for (const [filename, config] of Object.entries(imageConfigs)) {
    const inputPath = path.join(imagesDir, filename);
    const backupPath = path.join(backupDir, filename);

    if (!fs.existsSync(inputPath)) {
      console.warn(`File ${filename} not found, skipping.`);
      continue;
    }

    // Save backup of original if not backed up yet
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
    }

    const sourcePath = fs.existsSync(backupPath) ? backupPath : inputPath;

    console.log(`Processing ${filename}: ${config.description}`);

    try {
      await sharp(sourcePath)
        .modulate({
          saturation: config.saturation,
          brightness: config.brightness
        })
        .gamma(config.gamma)
        // Apply slight subtle filmic tone curve for true editorial print photography look
        .linear(0.96, -(128 * 0.96 - 128)) // subtle contrast softness to kill digital harshness
        .jpeg({ quality: 92, mozjpeg: true })
        .toFile(inputPath + '.tmp');

      fs.renameSync(inputPath + '.tmp', inputPath);
      console.log(`✓ Completed: ${filename}`);
    } catch (err) {
      console.error(`Error processing ${filename}:`, err);
    }
  }

  console.log('All images re-graded to authentic, minimalist, desaturated realism.');
}

processImages();

