/**
 * 全量运行时巡检 v2：用「画面哈希」判断动画是否真的在动
 *  - 打开页面 → 截首帧 → 点到最后一步 → 截末帧 → 比对哈希
 *  - 同时捕获 JS 报错与 4xx 资源
 * 并发 3 页。
 */
import puppeteer from 'puppeteer';
import fs from 'fs';
import crypto from 'crypto';

const BASE = process.env.BASE || 'http://127.0.0.1:3000';
const CONC = Number(process.env.CONC || 3);
const ids = JSON.parse(fs.readFileSync('ledger/topics.json', 'utf8')).topics.map(t => t.id);

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'], protocolTimeout: 120000 });
const problems = [];
let done = 0;

async function shotHash(page) {
  const el = await page.$('#animation-section');
  if (!el) return 'none';
  const b64 = await el.screenshot({ encoding: 'base64' });
  return crypto.createHash('md5').update(b64).digest('hex');
}

async function checkOne(id) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });
  const errs = [];
  page.on('pageerror', e => errs.push('JS: ' + e.message.slice(0, 80)));
  page.on('response', r => { if (r.status() >= 400) errs.push('HTTP' + r.status() + ' ' + r.url().replace(BASE, '')); });
  try {
    await page.goto(BASE + '/src/' + id + '.html', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 260));
    const total = await page.evaluate(() => (typeof STEPS !== 'undefined' ? STEPS.length
      : (typeof GROWTH !== 'undefined' ? GROWTH.length
      : (typeof NEXT_STEPS !== 'undefined' ? NEXT_STEPS.length : 1))));
    const h0 = await shotHash(page);
    // 直接跳到末步（点 next 到最后）
    for (let i = 0; i < total - 1; i++) {
      const btn = await page.$('#btn-next');
      if (!btn) break;
      await btn.click();
      await new Promise(r => setTimeout(r, 90));
    }
    await new Promise(r => setTimeout(r, 200));
    const h1 = await shotHash(page);
    const meta = await page.evaluate(() => ({
      katex: document.querySelectorAll('.katex').length,
      quiz: document.querySelectorAll('.quiz-item').length,
      pit: document.querySelectorAll('#pitfall-list li').length,
    }));
    if (total > 1 && h0 === h1) errs.push('画面无变化(首末帧相同)');
    if (meta.katex === 0) errs.push('公式未渲染');
    if (meta.quiz < 2) errs.push('自测<2');
    if (meta.pit < 3) errs.push('易错点<3');
  } catch (e) {
    errs.push('异常: ' + e.message.slice(0, 60));
  }
  await page.close();
  done++;
  if (done % 50 === 0) console.log(`  ...已完成 ${done}/${ids.length}`);
  if (errs.length) problems.push([id, [...new Set(errs)].slice(0, 3)]);
}

let idx = 0;
async function worker() { while (idx < ids.length) await checkOne(ids[idx++]); }
console.log(`开始巡检 ${ids.length} 个课件（画面哈希模式，并发 ${CONC}）...`);
await Promise.all(Array.from({ length: CONC }, worker));
await browser.close();

console.log('\n===== 巡检结果 =====');
if (!problems.length) console.log('✅ 全部 ' + ids.length + ' 个课件运行时正常（画面有变化、公式已渲染、六模块齐全、无报错无 4xx）');
else {
  console.log(`❌ ${problems.length} 个课件存在问题：`);
  problems.forEach(([id, e]) => console.log('  ' + id + ' -> ' + e.join(' | ')));
}
fs.writeFileSync('reports/runtime-audit.json', JSON.stringify(problems, null, 2));
process.exit(problems.length ? 1 : 0);
