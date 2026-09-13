const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

async function updateImages() {
  const rootDir = path.resolve(__dirname, '..');
  const sourceDir = path.join(rootDir, 'StarX images');
  const targetDir = path.join(rootDir, 'public', 'images', 'starx');

  console.log('Source directory:', sourceDir);
  console.log('Target directory:', targetDir);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // 1. Process Logo
  const transparentLogoFiles = [
    path.join(sourceDir, 'logo no bg.png'),
    path.join(sourceDir, 'Logo no BG.png'),
    path.join(targetDir, 'Logo no BG.png'),
    path.join(targetDir, 'logo-no-bg.png'),
  ];
  let transparentLogoPath = transparentLogoFiles.find((f) => fs.existsSync(f));

  if (transparentLogoPath) {
    console.log('Processing official transparent logo from:', transparentLogoPath);
    const logoMeta = await sharp(transparentLogoPath).metadata();
    console.log(`Logo metadata: ${logoMeta.width}x${logoMeta.height}, hasAlpha: ${logoMeta.hasAlpha}`);

    const logoDestNoBg = path.join(targetDir, 'logo-no-bg.png');
    const logoDestTransparent = path.join(targetDir, 'starx-logo-transparent.png');
    const logoDestPng = path.join(targetDir, 'starx-logo.png');

    fs.copyFileSync(transparentLogoPath, logoDestNoBg);
    fs.copyFileSync(transparentLogoPath, logoDestTransparent);
    fs.copyFileSync(transparentLogoPath, logoDestPng);
    console.log('✓ Created transparent logos:', logoDestNoBg, logoDestTransparent, logoDestPng);
  } else {
    const logoSourcePath = path.join(sourceDir, 'StarX Logo.png');
    console.log('Processing logo from:', logoSourcePath);
    const logoMeta = await sharp(logoSourcePath).metadata();
    console.log(`Logo metadata: ${logoMeta.width}x${logoMeta.height}`);

    const cx = logoMeta.width / 2;
    const cy = logoMeta.height / 2;
    const radius = cx - 3;

    const circleSvg = Buffer.from(
      `<svg width="${logoMeta.width}" height="${logoMeta.height}">
        <circle cx="${cx}" cy="${cy}" r="${radius}" fill="white" />
      </svg>`
    );

    const logoDestPng = path.join(targetDir, 'starx-logo.png');
    const logoDestNoBg = path.join(targetDir, 'logo-no-bg.png');
    const logoDestTransparent = path.join(targetDir, 'starx-logo-transparent.png');

    await sharp(logoSourcePath)
      .composite([{ input: circleSvg, blend: 'dest-in' }])
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(logoDestPng);
    fs.copyFileSync(logoDestPng, logoDestNoBg);
    fs.copyFileSync(logoDestPng, logoDestTransparent);
    console.log('✓ Created:', logoDestPng);
  }

  // 2. Process Mobile View Background
  const mobileSourcePath = path.join(sourceDir, 'mobile view.png');
  console.log('Processing mobile view from:', mobileSourcePath);

  // Mobile WebP (high performance)
  const mobileDestWebp = path.join(targetDir, 'starx-background.webp');
  await sharp(mobileSourcePath)
    .webp({ quality: 90 })
    .toFile(mobileDestWebp);
  console.log('✓ Created:', mobileDestWebp);

  // Mobile PNGs
  const mobileDestPng = path.join(targetDir, 'starx-background.png');
  const mobileDestPngFallback = path.join(targetDir, 'background.png');
  fs.copyFileSync(mobileSourcePath, mobileDestPng);
  fs.copyFileSync(mobileSourcePath, mobileDestPngFallback);
  console.log('✓ Created:', mobileDestPng, 'and', mobileDestPngFallback);

  // 3. Process PC View Background
  const pcSourcePath = path.join(sourceDir, 'pc view.png');
  console.log('Processing PC view from:', pcSourcePath);

  // PC WebP (high performance)
  const pcDestWebp = path.join(targetDir, 'starx-pc-background.webp');
  await sharp(pcSourcePath)
    .webp({ quality: 90 })
    .toFile(pcDestWebp);
  console.log('✓ Created:', pcDestWebp);

  // PC PNG
  const pcDestPng = path.join(targetDir, 'starx-pc-background.png');
  fs.copyFileSync(pcSourcePath, pcDestPng);
  console.log('✓ Created:', pcDestPng);

  console.log('\nAll images successfully processed and updated!');
}

updateImages().catch((err) => {
  console.error('Error updating images:', err);
  process.exit(1);
});
