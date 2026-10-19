#!/usr/bin/env node
/**
 * screenshot.js —— 课件自动截图脚本
 * 用途：用 puppeteer 打开课件，按需截取全页图，供人工/自动质检。
 * 用法：node tools/screenshot.js <html文件> [输出目录]
 */
import puppeteer from 'puppeteer';
import { resolve, join, basename, extname } from 'node:path';
import { mkdirSync } from 'node:fs';

const [, , fileArg, outArg] = process.argv;
if (!fileArg) {
  console.error('用法：node tools/screenshot.js <html文件> [输出目录]');
  process.exit(1);
}

const file = resolve(fileArg);
const outDir = resolve(outArg || join(import.meta.dirname, '..', 'reports', 'screenshots'));

async function main() {
  mkdirSync(outDir, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('file://' + file.replace(/\\/g, '/'), { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r => setTimeout(r, 1000)); // 等动画就位
  const out = join(outDir, basename(file, extname(file)) + '.png');
  await page.screenshot({ path: out, fullPage: true });
  console.log(`📸 已截图：${out}`);
  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
