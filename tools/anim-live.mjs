/** 检验「参数驱动型」动画是否真的会动：点播放前后动画区 SVG 内容哈希是否变化 */
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ids = process.argv.slice(2);

const SIG = () => {
  const sec = document.getElementById('animation-section');
  if (!sec) return 'NOSEC';
  const svgs = sec.querySelectorAll('svg');
  let s = '';
  svgs.forEach(v => { s += v.innerHTML; });
  if (!svgs.length) s = sec.innerHTML;
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) | 0; }
  return svgs.length + ':' + s.length + ':' + h;
};

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
let bad = 0;
for (const id of ids) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1000 });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto('file:///' + path.join(ROOT, 'src', id + '.html').replace(/\\/g, '/'), { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 500));
  const before = await page.evaluate(SIG);
  const hasSlider = await page.evaluate(() => !!document.querySelector('input[type=range]'));
  const hasPlay = await page.evaluate(() => !!document.getElementById('btn-play'));
  if (hasPlay) await page.click('#btn-play');
  await new Promise(r => setTimeout(r, 2300));
  const after = await page.evaluate(SIG);
  const moved = before !== after;
  const ok = moved && errs.length === 0;
  if (!ok) bad++;
  console.log(`${id} 滑块=${hasSlider ? '有' : '无'} 视图=${String(before).split(':')[0]} 画面变化=${moved ? '是' : '否'} ${ok ? '✅' : '❌ ' + errs.slice(0, 2).join(' | ')}`);
  await page.close();
}
await browser.close();
console.log(bad === 0 ? '全部在动' : `${bad} 个页面没有动`);
process.exit(bad === 0 ? 0 : 1);
