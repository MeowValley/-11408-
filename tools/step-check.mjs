/** 分步动画运行时校验：逐页点击「下一步」走完全部步骤，捕获 pageerror / 空 SVG */
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ids = process.argv.slice(2);
if (!ids.length) { console.error('用法: node tools/step-check.mjs ID1 ID2 ...'); process.exit(1); }

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
let bad = 0;
for (const id of ids) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1000 });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  page.on('console', m => { if (m.type() === 'error' && !/api\/skills|ERR_FAILED|Failed to load resource/.test(m.text())) errs.push('console: ' + m.text().slice(0, 80)); });
  await page.goto('file:///' + path.join(ROOT, 'src', id + '.html').replace(/\\/g, '/'), { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 600));
  const total = await page.evaluate(() => (typeof STEPS !== 'undefined' ? STEPS.length : 0));
  const marks = [];
  for (let i = 0; i < Math.max(total, 1); i++) {
    const info = await page.evaluate(() => {
      const svg = document.querySelector('#viz');
      const n = svg ? svg.querySelectorAll('*').length : 0;
      const sub = document.getElementById('subtitle')?.textContent || '';
      return { n, sub };
    });
    marks.push(info.n);
    if (info.n < 8) errs.push('step' + i + ' SVG 元素过少(' + info.n + ')');
    if (i < total - 1) await page.click('#btn-next');
    await new Promise(r => setTimeout(r, 120));
  }
  const katex = await page.evaluate(() => document.querySelectorAll('.katex').length);
  const quizzes = await page.evaluate(() => document.querySelectorAll('.quiz-item').length);
  const pits = await page.evaluate(() => document.querySelectorAll('#pitfall-list li').length);
  const ok = errs.length === 0 && katex > 0 && quizzes >= 2 && pits >= 3;
  if (!ok) bad++;
  console.log(`${id} 步数=${total} SVG元素=[${marks.join(',')}] katex=${katex} 自测=${quizzes} 易错=${pits} ${ok ? '✅' : '❌ ' + errs.slice(0, 3).join(' | ')}`);
  await page.close();
}
await browser.close();
console.log(bad === 0 ? '全部通过' : `${bad} 个页面异常`);
process.exit(bad === 0 ? 0 : 1);
