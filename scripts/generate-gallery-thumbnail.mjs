// Gallery 원본 이미지에서 목록용 썸네일(JPEG, 최대 800px, 품질 75)을 생성한다.
// 사용법: node scripts/generate-gallery-thumbnail.mjs <원본경로> <출력경로(.jpg)>
import sharp from 'sharp';

const [, , input, output] = process.argv;

if (!input || !output) {
  console.error('사용법: node scripts/generate-gallery-thumbnail.mjs <원본경로> <출력경로(.jpg)>');
  process.exit(1);
}

await sharp(input)
  .rotate()
  .resize({ width: 800, height: 800, fit: 'inside', withoutEnlargement: true })
  .jpeg({ quality: 75 })
  .toFile(output);

console.log(`썸네일 생성 완료: ${output}`);
