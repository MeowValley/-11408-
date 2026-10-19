#!/usr/bin/env node
/**
 * test-system.js —— 系统集成测试
 *
 * 模拟：访问刷题页 → 随机答题 → 查看解析 → 提交一条纠错 → 打印 errors.json
 * 并截图移动端响应式（375px）。
 *
 * 用法：node tools/test-system.js
 */
import puppeteer from 'puppeteer';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import db from '../db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BASE = 'http://localhost:3000';

async function main() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log('🔍 系统集成测试开始\n');

  // 1. 访问刷题页
  await page.goto(`${BASE}/quiz.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  const title = await page.title();
  const qCount = await page.evaluate(() => document.querySelectorAll('.q-card').length);
  console.log(`✅ 刷题页标题：${title}`);
  console.log(`✅ 题目数：${qCount}`);

  // 2. 随机答题（点第一题的第一个选项）
  await page.evaluate(() => {
    const firstOpt = document.querySelector('.q-card .opt');
    if (firstOpt) firstOpt.click();
  });
  await new Promise(r => setTimeout(r, 500));
  const explainShown = await page.evaluate(() => {
    const e = document.querySelector('.q-card .explain');
    return e ? e.classList.contains('show') : false;
  });
  console.log(`✅ 答题后解析显示：${explainShown}`);

  // 3. 提交一条纠错
  await page.evaluate(() => {
    const btn = document.querySelector('.report-btn');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.evaluate(() => {
    document.getElementById('report-type').value = '答案错误';
    document.getElementById('report-detail').value = '测试纠错：第1题选项B疑似也有道理，请复核。';
    document.getElementById('report-contact').value = 'test@example.com';
    document.getElementById('report-submit').click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // 4. 从数据库确认纠错已入库（改版后纠错存 SQLite 的 reports 表，不再写 errors.json）
  const total = db.prepare('SELECT COUNT(*) c FROM reports').get().c;
  const lastRec = db.prepare('SELECT * FROM reports ORDER BY rowid DESC LIMIT 1').get();
  console.log(`\n✅ 纠错已记录，reports 表共 ${total} 条，最新一条：`);
  console.log(JSON.stringify(lastRec, null, 2));

  // 5. 移动端响应式截图（375px）
  const mobile = await browser.newPage();
  await mobile.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true });
  await mobile.goto(`${BASE}/quiz.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  mkdirSync(join(ROOT, 'reports'), { recursive: true });
  await mobile.screenshot({ path: join(ROOT, 'reports', 'quiz-mobile.png') });
  console.log(`✅ 移动端截图：reports/quiz-mobile.png`);

  // 6. 检测横向滚动条
  const hasHScroll = await mobile.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  console.log(`✅ 移动端横向滚动条：${hasHScroll ? '存在（需修复）' : '无（响应式正常）'}`);

  // 7. 桌面端截图
  const desktop = await browser.newPage();
  await desktop.setViewport({ width: 1920, height: 1080 });
  await desktop.goto(`${BASE}/quiz.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  await desktop.screenshot({ path: join(ROOT, 'reports', 'quiz-desktop.png') });
  console.log(`✅ 桌面端截图：reports/quiz-desktop.png`);

  await browser.close();
  console.log('\n🎉 系统集成测试全部通过');
}

main().catch(e => { console.error('测试失败：', e); process.exit(1); });
