/**
 * 纯静态站构建脚本
 * 把项目静态资源复制到 dist/ 目录，供 EdgeOne Pages 部署
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

// 需要复制到 dist 的文件与目录（白名单）
const INCLUDE = [
  'index.html',
  'styles.css',
  'app.js',
  'assets',
];

// 递归复制
function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyRecursive(path.join(src, name), path.join(dest, name));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// 清空 dist 目录
function rimraf(p) {
  if (!fs.existsSync(p)) return;
  for (const name of fs.readdirSync(p)) {
    const full = path.join(p, name);
    if (fs.statSync(full).isDirectory()) {
      rimraf(full);
    } else {
      fs.unlinkSync(full);
    }
  }
  fs.rmdirSync(p);
}

console.log('🔨 Building static site...');
rimraf(DIST);
fs.mkdirSync(DIST, { recursive: true });

for (const item of INCLUDE) {
  const src = path.join(ROOT, item);
  const dest = path.join(DIST, item);
  if (fs.existsSync(src)) {
    copyRecursive(src, dest);
    console.log(`  ✓ ${item}`);
  } else {
    console.log(`  ⚠ ${item} (not found, skipped)`);
  }
}

console.log('✅ Build finished → dist/');
