import puppeteer from 'puppeteer';
import { resolve } from 'node:path';
const files = ['OS-126','OS-131','CN-141','MA-05','MA-71','POL-06','POL-44','EN-04'];
const base = 'D:/HuaweiMoveData/Users/packa/Desktop/11408动画演示/src/';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
let pass = 0;
for (const f of files) {
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  try {
    await page.goto('file:///' + base + f + '.html', { waitUntil: 'load', timeout: 20000 });
    await new Promise(r => setTimeout(r, 1200));
    const r = await page.evaluate(() => ({
      katex: typeof window.katex !== 'undefined',
      gsap: typeof window.gsap !== 'undefined',
      katexNodes: document.querySelectorAll('.katex').length,
      svg: !!document.querySelector('#viz'),
      quiz: document.querySelectorAll('.quiz-item').length,
      pitfall: document.querySelectorAll('#pitfall-list li').length,
      exam: !!document.getElementById('exam-section'),
      steps: (window.STEPS || []).length
    }));
    const ok = r.katex && r.gsap && r.katexNodes > 0 && r.svg && r.quiz >= 2 && r.pitfall >= 3 && r.exam && errs.length === 0;
    console.log(f, ok ? '✅' : '❌', JSON.stringify(r), errs.slice(0,2).join('|'));
    if (ok) pass++;
  } catch (e) {
    console.log(f, '❌ 加载失败', e.message.slice(0,80));
  }
  await page.close();
}
await browser.close();
console.log('抽样运行时:', pass + '/' + files.length);
