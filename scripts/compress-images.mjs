/**
 * 图片批量压缩脚本
 * 使用已安装的 sharp 库压缩 public/image 下所有图片
 * 
 * 策略：
 * - PNG 大于 500KB → 转 WebP 或压缩 PNG
 * - JPG 大于 500KB → 重新压缩
 * - 证件照限 400px 宽
 * - Hero 背景限 1920px 宽
 * - 其他图限 1200px 宽
 * - 保留原文件名（同格式压缩，不改扩展名以免修改代码引用）
 */

import sharp from 'sharp';
import { readdir, stat, copyFile, writeFile, unlink, rename } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';

const IMAGE_DIR = join(process.cwd(), 'public', 'image');
const BACKUP_SUFFIX = '.backup';

// 特殊文件的最大宽度配置
const MAX_WIDTH_MAP = {
  '证件照.png': 400,
  'hero-bg-new.png': 1920,
  'hero-bg.jpg': 1920,
  '主页头像.png': 400,
};
const DEFAULT_MAX_WIDTH = 1200;

async function getAllImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllImages(fullPath));
    } else if (/\.(png|jpg|jpeg)$/i.test(entry.name) && !entry.name.endsWith(BACKUP_SUFFIX)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function compressImage(filePath) {
  const fileName = basename(filePath);
  const ext = extname(filePath).toLowerCase();
  const fileInfo = await stat(filePath);
  const sizeMB = fileInfo.size / 1024 / 1024;

  // 跳过已经很小的文件（< 200KB）
  if (fileInfo.size < 200 * 1024) {
    console.log(`  ⏭️  ${fileName} (${(sizeMB).toFixed(2)} MB) — 已经足够小，跳过`);
    return { skipped: true, name: fileName };
  }

  // 确定最大宽度
  const maxWidth = MAX_WIDTH_MAP[fileName] || DEFAULT_MAX_WIDTH;

  try {
    // 备份原文件（如果还没备份）
    const backupPath = filePath + BACKUP_SUFFIX;
    try {
      await stat(backupPath);
    } catch {
      await copyFile(filePath, backupPath);
    }

    let pipeline = sharp(filePath);
    const metadata = await pipeline.metadata();

    // 如果宽度超过限制，进行缩放
    if (metadata.width && metadata.width > maxWidth) {
      pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
    }

    let outputBuffer;
    if (ext === '.png') {
      outputBuffer = await pipeline.png({ quality: 80, compressionLevel: 9 }).toBuffer();
    } else {
      // jpg/jpeg
      outputBuffer = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    }

    const newSizeMB = outputBuffer.length / 1024 / 1024;
    const savings = ((1 - outputBuffer.length / fileInfo.size) * 100).toFixed(1);

    // 只有确实变小了才覆盖
    if (outputBuffer.length < fileInfo.size) {
      // 使用 writeFile 直接写 buffer，避免 sharp.toFile 对中文路径的兼容问题
      const tempPath = join(dirname(filePath), `_temp_compress_${Date.now()}${ext}`);
      await writeFile(tempPath, outputBuffer);
      await unlink(filePath);
      await rename(tempPath, filePath);
      console.log(`  ✅ ${fileName}: ${sizeMB.toFixed(2)} MB → ${newSizeMB.toFixed(2)} MB (节省 ${savings}%)`);
      return { compressed: true, name: fileName, before: sizeMB, after: newSizeMB };
    } else {
      console.log(`  ⏭️  ${fileName} (${sizeMB.toFixed(2)} MB) — 压缩后更大，跳过`);
      return { skipped: true, name: fileName };
    }
  } catch (err) {
    console.error(`  ❌ ${fileName}: ${err.message}`);
    return { error: true, name: fileName, message: err.message };
  }
}

async function main() {
  console.log('🔍 扫描图片目录...');
  const images = await getAllImages(IMAGE_DIR);
  console.log(`📦 找到 ${images.length} 张图片\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  let compressed = 0;

  for (const img of images) {
    const result = await compressImage(img);
    if (result.compressed) {
      totalBefore += result.before;
      totalAfter += result.after;
      compressed++;
    }
  }

  console.log(`\n✨ 压缩完成！`);
  console.log(`   压缩了 ${compressed} 张图片`);
  if (compressed > 0) {
    console.log(`   总计: ${totalBefore.toFixed(2)} MB → ${totalAfter.toFixed(2)} MB (节省 ${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`);
  }
}

main().catch(console.error);
