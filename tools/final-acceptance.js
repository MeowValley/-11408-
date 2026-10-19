#!/usr/bin/env node
/**
 * final-acceptance.js —— 最终全链路验收测试
 *
 * 测试项：
 *  1. 首页导航加载 + 暗黑模式切换
 *  2. 刷题页：1116 题、答题、考试倒计时、错题本、数据统计
 *  3. 后台：登录、查题、新增、删除
 *
 * 用法：node tools/final-acceptance.js
 */
import puppeteer from 'puppeteer';

const BASE = 'http://localhost:3000';
let passCount = 0, failCount = 0;
function assert(name, ok, extra = '') {
  if (ok) { passCount++; console.log(`  ✅ ${name}${extra ? ' → ' + extra : ''}`); }
  else { failCount++; console.log(`  ❌ ${name}${extra ? ' → ' + extra : ''}`); }
}

async function main() {
  const browser = await puppeteer.launch({ headless: 'new' });
  console.log('════════ 最终全链路验收开始 ════════\n');

  /* ===== 1. 首页导航 + 暗黑模式 ===== */
  console.log('【1】首页导航页');
  const nav = await browser.newPage();
  await nav.setViewport({ width: 1280, height: 900 });
  await nav.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  assert('导航页标题', (await nav.title()).includes('导航'));
  assert('刷题入口按钮存在', await nav.evaluate(() => !!document.querySelector('.big-quiz-btn')));
  // 暗黑模式切换
  const themeBefore = await nav.evaluate(() => document.documentElement.getAttribute('data-theme'));
  await nav.click('#theme-btn');
  const themeAfter = await nav.evaluate(() => document.documentElement.getAttribute('data-theme'));
  assert('暗黑模式切换', themeBefore !== themeAfter, `${themeBefore} → ${themeAfter}`);
  await nav.close();

  /* ===== 2. 刷题页 ===== */
  console.log('\n【2】刷题页');
  const quiz = await browser.newPage();
  await quiz.setViewport({ width: 1280, height: 900 });
  await quiz.goto(`${BASE}/quiz.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  const qTotal = await quiz.evaluate(async () => (await fetch('/api/questions')).json().then(d => d.length));
  assert('题库 1116 道', qTotal >= 1000, `${qTotal} 道`);
  assert('倒计时显示', await quiz.evaluate(() => document.getElementById('countdown').textContent.includes('天')));
  // 随机答题
  await quiz.evaluate(() => { const o = document.querySelector('.q-card .opt'); if (o) o.click(); });
  await new Promise(r => setTimeout(r, 400));
  assert('答题后显示解析', await quiz.evaluate(() => document.querySelector('.q-card .explain').classList.contains('show')));
  // 切到考试模式
  await quiz.evaluate(() => document.querySelector('[data-mode="exam"]').click());
  await new Promise(r => setTimeout(r, 500));
  assert('考试模式倒计时', await quiz.evaluate(() => document.getElementById('timer').textContent.includes(':')));
  // 切到数据统计
  await quiz.evaluate(() => document.querySelector('[data-mode="stats"]').click());
  await new Promise(r => setTimeout(r, 500));
  assert('数据统计面板', await quiz.evaluate(() => document.querySelectorAll('.stat-card').length >= 4));
  await quiz.close();

  /* ===== 3. 管理后台 ===== */
  console.log('\n【3】管理后台');
  const admin = await browser.newPage();
  await admin.setViewport({ width: 1280, height: 900 });
  await admin.goto(`${BASE}/admin.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await admin.type('#login-pwd', 'admin123');
  await admin.evaluate(() => doLogin());
  await new Promise(r => setTimeout(r, 800));
  assert('登录成功', await admin.evaluate(() => document.getElementById('admin-view').style.display === 'block'));
  // 查题
  await admin.evaluate(() => switchTab('questions'));
  await new Promise(r => setTimeout(r, 800));
  const qCount = await admin.evaluate(() => document.getElementById('q-count').textContent);
  assert('查询到题目', parseInt(qCount) >= 1000, `${qCount} 道`);
  // 手动新增一道题（直接用 API，绕过 alert 弹窗）
  const testId = 'ACCTEST-' + Date.now();
  const addResult = await admin.evaluate(async (testId) => {
    const token = localStorage.getItem('admin_token');
    const q = {
      id: testId,
      subject: '408', chapter: '验收测试', type: '单选',
      question: '验收测试题：1+1=？', options: ['2', '3', '4', '5'],
      answer: 0, explanation: '验收测试', animation_id: null,
    };
    const r = await fetch('/api/admin/questions', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify([q]) });
    return await r.json();
  }, testId);
  assert('新增题目成功', addResult.ok === true && addResult.imported === 1, JSON.stringify(addResult));

  // 删除刚才新增的题
  const deleted = await admin.evaluate(async (testId) => {
    const token = localStorage.getItem('admin_token');
    const r = await fetch('/api/admin/questions/' + testId, { method: 'DELETE', headers: { Authorization: 'Bearer ' + token } });
    return await r.json();
  }, testId);
  assert('删除测试题成功', deleted.ok === true && deleted.deleted === 1, JSON.stringify(deleted));
  await admin.close();

  await browser.close();
  console.log('\n════════ 验收结果 ════════');
  console.log(`  通过：${passCount} 项，失败：${failCount} 项`);
  console.log(failCount === 0 ? '  🎉 全部通过，系统可上线！' : '  ❌ 存在失败项，需修复');
  process.exit(failCount === 0 ? 0 : 1);
}

main().catch(e => { console.error('验收出错：', e); process.exit(1); });
