/** 浏览器端体检：控制台报错 / 网络 404 / 移动端横向滚动 */
import puppeteer from 'puppeteer';

const BASE = process.env.BASE || 'http://127.0.0.1:3000';
const ids = ['DS-01', 'DS-18', 'CO-70', 'CO-86', 'OS-137', 'CN-160', 'CN-158', 'CN-167', 'MA-05', 'MA-37', 'MA-61', 'EN-04', 'POL-08', 'POL-44'];

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
let problems = 0;

async function checkPage(url, label, viewport) {
  const page = await browser.newPage();
  await page.setViewport(viewport || { width: 1400, height: 1000 });
  const errs = [];
  page.on('pageerror', e => errs.push('JS错误: ' + e.message.slice(0, 90)));
  page.on('requestfailed', r => errs.push('请求失败: ' + r.url().replace(BASE, '')));
  page.on('response', r => { if (r.status() >= 400) errs.push(`HTTP ${r.status()}: ` + r.url().replace(BASE, '')); });
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
  } catch (e) {
    errs.push('打开失败: ' + e.message.slice(0, 60));
  }
  await new Promise(r => setTimeout(r, 700));
  const hScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  const info = await page.evaluate(() => ({
    katex: document.querySelectorAll('.katex').length,
    skill: (function () { const s = document.getElementById('skill-section'); return s ? getComputedStyle(s).display : '无'; })(),
    quiz: document.querySelectorAll('.quiz-item').length,
  }));
  const bad = errs.length > 0 || hScroll;
  if (bad) problems++;
  console.log(`${label.padEnd(22)} katex=${String(info.katex).padEnd(3)} 自测=${info.quiz} 技巧区=${info.skill} 横滚=${hScroll ? '有⚠' : '无'} ${bad ? '❌ ' + errs.slice(0, 3).join(' | ') : '✅'}`);
  await page.close();
}

console.log('===== 桌面端 =====');
await checkPage(BASE + '/', '导航页');
await checkPage(BASE + '/quiz.html', '刷题页');
await checkPage(BASE + '/admin.html', '管理后台');
for (const id of ids) await checkPage(BASE + '/src/' + id + '.html', id);

console.log('\n===== 移动端 375px =====');
await checkPage(BASE + '/', '导航页', { width: 375, height: 812, isMobile: true });
await checkPage(BASE + '/quiz.html', '刷题页', { width: 375, height: 812, isMobile: true });
for (const id of ['CN-160', 'MA-37', 'DS-20']) await checkPage(BASE + '/src/' + id + '.html', id, { width: 375, height: 812, isMobile: true });

await browser.close();
console.log(problems === 0 ? '\n✅ 浏览器端未发现问题' : `\n❌ ${problems} 个页面存在问题`);
process.exit(problems ? 1 : 0);
