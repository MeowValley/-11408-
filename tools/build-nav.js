#!/usr/bin/env node
/**
 * build-nav.js —— 生成静态导航页 dist/index.html
 *
 * 遍历 ledger/topics.json，按「科目 → 章节」折叠展示所有知识点。
 * 每个知识点显示考频状态（高/中/低/冷门），若有对应 HTML 则加链接，否则灰色。
 * 顶部显示全站总进度（已生成 / 总数）。
 *
 * 用法：node tools/build-nav.js
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const TOPICS_PATH = join(ROOT, 'ledger', 'topics.json');
const SRC_DIR = join(ROOT, 'src');
const DIST_DIR = join(ROOT, 'dist');
const OUT_PATH = join(DIST_DIR, 'index.html');

// 考频对应的颜色与标签
const FREQ_META = {
  '高':   { color: '#ff5c7a', label: '高', cls: 'freq-high' },
  '中':   { color: '#ffb020', label: '中', cls: 'freq-mid' },
  '低':   { color: '#4f8cff', label: '低', cls: 'freq-low' },
  '冷门': { color: '#8b96ad', label: '冷', cls: 'freq-cold' },
};

// 科目对应的图标/颜色
const SUBJECT_META = {
  '数学一': { color: '#4f8cff' },
  '408':    { color: '#2dd4a7' },
  '英语一': { color: '#ff9f43' },
  '政治':   { color: '#c792ea' },
};

function htmlEscape(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

// 判断某知识点是否已有 HTML 课件（在 src/ 下找同名 html，或 id 命名）
function hasHtml(id, name) {
  // 优先按 id 找：src/<id>.html
  const candidates = [
    join(SRC_DIR, `${id}.html`),
    join(SRC_DIR, `${name}.html`),
  ];
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  return null;
}

function main() {
  const data = JSON.parse(readFileSync(TOPICS_PATH, 'utf8'));
  const topics = data.topics;
  const total = topics.length;

  // 统计各科目
  const subjectGroups = {};
  for (const t of topics) {
    if (!subjectGroups[t.subject]) subjectGroups[t.subject] = [];
    subjectGroups[t.subject].push(t);
  }

  // 每个科目内按 chapter 分组
  const subjectOrder = Object.keys(subjectGroups);

  // 统计已生成课件数
  let generated = 0;
  for (const t of topics) {
    if (hasHtml(t.id, t.name)) generated++;
  }

  // 生成 HTML
  let html = `<!DOCTYPE html>
<!--
  考研 11408 动画课件 + 在线刷题系统
  Copyright (C) 2026 喵谷（喵酱）
  代码授权：PolyForm Noncommercial 1.0.0 ｜ 内容授权：CC BY-NC-SA 4.0
  两者均禁止商业使用；商业授权请联系作者。详见 LICENSE / LICENSE-CODE / LICENSE-CONTENT
-->
<html lang="zh-CN" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>考研11408 动画课件导航</title>
<style>
:root {
  --bg: #0f1420; --bg-panel: #161d2e; --bg-elevated: #1d263b;
  --border: #2a3550; --text: #e6ebf5; --text-muted: #8b96ad;
  --primary: #4f8cff; --highlight: #ffb020; --success: #2dd4a7;
  --radius: 12px;
  --font: "PingFang SC", "Microsoft YaHei", -apple-system, sans-serif;
}
[data-theme="light"] {
  --bg:#f5f7fa; --bg-panel:#ffffff; --bg-elevated:#f0f3f8; --border:#dde3ec;
  --text:#1a2333; --text-muted:#6b7688; --primary:#3b82f6; --highlight:#f59e0b; --success:#10b981;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--font); background: var(--bg); color: var(--text); line-height: 1.6; -webkit-font-smoothing: antialiased; }
.wrap { max-width: 1100px; margin: 0 auto; padding: 32px 20px 80px; }

/* 顶栏主题切换 */
.top-nav { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:16px; flex-wrap:wrap; }
.top-nav .theme-btn { font-size:20px; background:var(--bg-panel); border:1px solid var(--border); border-radius:8px; padding:4px 12px; cursor:pointer; }
.top-nav .quiz-link { font-size:14px; color:var(--primary-strong); text-decoration:none; padding:8px 16px; border:1px solid var(--primary); border-radius:8px; font-weight:600; }
.top-nav .quiz-link:hover { background:var(--primary); color:#fff; }

/* 巨大的刷题入口按钮 */
.big-quiz-btn {
  display:block; text-align:center; padding:18px 24px; margin-bottom:16px;
  background:linear-gradient(135deg, var(--primary), var(--success));
  color:#fff; text-decoration:none; font-size:20px; font-weight:800;
  border-radius:var(--radius); letter-spacing:2px; transition:all .2s ease;
  box-shadow:0 6px 20px rgba(79,140,255,0.35);
}
.big-quiz-btn:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(79,140,255,0.5); filter:brightness(1.05); }

/* 顶部进度条 */
.header { background: var(--bg-panel); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px 28px; margin-bottom: 24px; }
.header h1 { font-size: 22px; margin-bottom: 8px; }
.header .sub { color: var(--text-muted); font-size: 14px; margin-bottom: 16px; }
.progress-row { display: flex; align-items: center; gap: 12px; }
.progress-bar { flex: 1; height: 10px; background: var(--bg-elevated); border-radius: 999px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, var(--primary), var(--success)); border-radius: 999px; transition: width .3s; }
.progress-num { font-size: 14px; font-weight: 700; color: var(--success); white-space: nowrap; }
.legend { display: flex; gap: 16px; margin-top: 12px; flex-wrap: wrap; font-size: 12px; color: var(--text-muted); }
.legend .dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 4px; vertical-align: middle; }

/* 科目折叠 */
.subject { background: var(--bg-panel); border: 1px solid var(--border); border-radius: var(--radius); margin-bottom: 16px; overflow: hidden; }
.subject-head { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; cursor: pointer; user-select: none; }
.subject-head:hover { background: var(--bg-elevated); }
.subject-head .left { display: flex; align-items: center; gap: 12px; }
.subject-dot { width: 12px; height: 12px; border-radius: 4px; }
.subject-name { font-size: 17px; font-weight: 700; }
.subject-count { font-size: 13px; color: var(--text-muted); }
.subject-toggle { font-size: 14px; color: var(--text-muted); transition: transform .2s; }
.subject.open .subject-toggle { transform: rotate(90deg); }
.subject-body { display: none; padding: 0 20px 16px; }
.subject.open .subject-body { display: block; }

/* 章节 */
.chapter { margin-top: 14px; }
.chapter-title { font-size: 14px; font-weight: 600; color: var(--highlight); margin-bottom: 8px; padding-left: 4px; border-left: 3px solid var(--highlight); }
.topic-row { display: flex; align-items: center; gap: 10px; padding: 7px 8px; border-radius: 8px; transition: background .15s; }
.topic-row:hover { background: var(--bg-elevated); }
.topic-id { font-family: "JetBrains Mono", monospace; font-size: 11px; color: var(--text-muted); min-width: 64px; }
.topic-name { flex: 1; font-size: 14px; }
.topic-name a { color: var(--primary); text-decoration: none; }
.topic-name a:hover { text-decoration: underline; }
.topic-name .pending { color: var(--text-muted); }
.freq-badge { font-size: 11px; padding: 1px 8px; border-radius: 999px; font-weight: 700; white-space: nowrap; }
.freq-high { background: rgba(255,92,122,0.15); color: #ff5c7a; border: 1px solid #ff5c7a; }
.freq-mid  { background: rgba(255,176,32,0.15); color: #ffb020; border: 1px solid #ffb020; }
.freq-low  { background: rgba(79,140,255,0.15); color: #6ea8ff; border: 1px solid #4f8cff; }
.freq-cold { background: rgba(139,150,173,0.12); color: #8b96ad; border: 1px solid #8b96ad; }
.footer { text-align: center; color: var(--text-muted); font-size: 12px; margin-top: 24px; }

/* 搜索与筛选 */
.search-bar { display: flex; gap: 12px; align-items: center; margin-top: 16px; flex-wrap: wrap; }
.search-input {
  flex: 1; min-width: 240px; padding: 10px 14px;
  background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 8px;
  color: var(--text); font-size: 14px; font-family: var(--font); outline: none;
  transition: border-color .15s;
}
.search-input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(79,140,255,0.15); }
.search-input::placeholder { color: var(--text-muted); }
.filter-check { display: flex; align-items: center; gap: 6px; font-size: 14px; color: var(--text); cursor: pointer; user-select: none; }
.filter-check input { width: 16px; height: 16px; accent-color: var(--primary); cursor: pointer; }
.no-result { text-align: center; color: var(--text-muted); padding: 32px; font-size: 14px; }
.topic-row.hidden { display: none; }

/* 响应式 */
@media (max-width:768px) {
  .wrap { padding: 16px 12px 60px; }
  .subject-head { padding: 12px 14px; }
  .topic-id { min-width: 50px; font-size: 10px; }
  .topic-name { font-size: 13px; }
}
@media (max-width:375px) {
  .header h1 { font-size: 18px; }
  .subject-name { font-size: 15px; }
  .subject-count { display: none; }
  .search-input { min-width: 100%; }
}
</style>
</head>
<body>
<div class="wrap">
  <div class="top-nav">
    <h1 style="font-size:20px;">考研 11408 动画课件导航</h1>
    <div style="display:flex;gap:8px;align-items:center;">
      <a class="quiz-link" href="quiz.html">📝 在线刷题</a>
      <button class="theme-btn" id="theme-btn" title="切换主题">🌙</button>
    </div>
  </div>
  <div class="header">
    <a class="big-quiz-btn" href="quiz.html">📝 进入刷题模式</a>
    <div class="sub">数学一 · 408 · 英语一 · 政治 —— 全知识点动画课件索引</div>
    <div class="progress-row">
      <div class="progress-bar"><div class="progress-fill" style="width:${(generated / total * 100).toFixed(1)}%"></div></div>
      <div class="progress-num">${generated} / ${total}</div>
    </div>
    <div class="legend">
      <span><span class="dot" style="background:#ff5c7a"></span>高频</span>
      <span><span class="dot" style="background:#ffb020"></span>中频</span>
      <span><span class="dot" style="background:#4f8cff"></span>低频</span>
      <span><span class="dot" style="background:#8b96ad"></span>冷门</span>
      <span><span class="dot" style="background:transparent;border:1px solid #8b96ad"></span>灰色=未生成</span>
    </div>
    <div class="search-bar">
      <input class="search-input" id="search-box" type="text" placeholder="🔍 搜索知识点（按 ID 或名称，如：TCP / 二重积分 / DS-07）">
      <label class="filter-check"><input type="checkbox" id="filter-pending"> 只看未生成</label>
    </div>
  </div>
`;

  // 渲染各科目
  for (const subject of subjectOrder) {
    const list = subjectGroups[subject];
    const meta = SUBJECT_META[subject] || { color: '#4f8cff' };
    // 按 chapter 分组
    const chapters = {};
    for (const t of list) {
      if (!chapters[t.chapter]) chapters[t.chapter] = [];
      chapters[t.chapter].push(t);
    }
    const chapterOrder = Object.keys(chapters);

    html += `
  <div class="subject open">
    <div class="subject-head" onclick="this.parentElement.classList.toggle('open')">
      <div class="left">
        <span class="subject-dot" style="background:${meta.color}"></span>
        <span class="subject-name">${htmlEscape(subject)}</span>
      </div>
      <span class="subject-count">${list.length} 个知识点 · ${chapterOrder.length} 章</span>
      <span class="subject-toggle">▶</span>
    </div>
    <div class="subject-body">
`;

    for (const ch of chapterOrder) {
      html += `      <div class="chapter">
        <div class="chapter-title">${htmlEscape(ch)}</div>
`;
      for (const t of chapters[ch]) {
        const freq = FREQ_META[t.frequency] || FREQ_META['中'];
        const htmlFile = hasHtml(t.id, t.name);
        const nameHtml = htmlFile
          ? `<a href="../src/${htmlEscape(t.id)}.html" target="_blank">${htmlEscape(t.name)}</a>`
          : `<span class="pending">${htmlEscape(t.name)}</span>`;
        html += `        <div class="topic-row" data-id="${htmlEscape(t.id)}" data-name="${htmlEscape(t.name)}" data-done="${htmlFile ? '1' : '0'}">
          <span class="topic-id">${htmlEscape(t.id)}</span>
          <span class="topic-name">${nameHtml}</span>
          <span class="freq-badge ${freq.cls}">${freq.label}</span>
        </div>
`;
      }
      html += `      </div>\n`;
    }

    html += `    </div>
  </div>
`;
  }

  html += `  <div class="footer">生成于 ${new Date().toLocaleString('zh-CN')} · 数据源 ledger/topics.json</div>
</div>

<script>
/* ============ 搜索 + 筛选（纯原生 JS） ============ */
(function () {
  const searchBox = document.getElementById('search-box');
  const filterPending = document.getElementById('filter-pending');

  function applyFilter() {
    const kw = searchBox.value.trim().toLowerCase();
    const onlyPending = filterPending.checked;
    const rows = document.querySelectorAll('.topic-row');
    let visibleCount = 0;

    rows.forEach(row => {
      const id = (row.dataset.id || '').toLowerCase();
      const name = (row.dataset.name || '').toLowerCase();
      const done = row.dataset.done === '1';

      // 关键词匹配：按 id 或 name
      const kwHit = !kw || id.includes(kw) || name.includes(kw);
      // 未生成筛选
      const pendingHit = !onlyPending || !done;

      const show = kwHit && pendingHit;
      row.classList.toggle('hidden', !show);
      if (show) visibleCount++;
    });

    // 折叠无匹配章节、无匹配科目
    document.querySelectorAll('.chapter').forEach(ch => {
      const hasVisible = ch.querySelectorAll('.topic-row:not(.hidden)').length > 0;
      ch.style.display = hasVisible ? '' : 'none';
    });
    document.querySelectorAll('.subject').forEach(sub => {
      const hasVisible = sub.querySelectorAll('.topic-row:not(.hidden)').length > 0;
      // 有匹配则强制展开，无匹配则折叠
      if (hasVisible) sub.classList.add('open');
      else sub.classList.remove('open');
    });
  }

  searchBox.addEventListener('input', applyFilter);
  filterPending.addEventListener('change', applyFilter);
})();

/* ============ 主题切换（localStorage 持久化） ============ */
(function () {
  const btn = document.getElementById('theme-btn');
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  function update() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    btn.textContent = isDark ? '🌙' : '☀️';
  }
  update();
  btn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    update();
  });
})();
</script>
</body>
</html>`;

  mkdirSync(DIST_DIR, { recursive: true });
  writeFileSync(OUT_PATH, html, 'utf8');

  console.log(`✅ 导航页已生成：${OUT_PATH}`);
  console.log(`   知识点总数：${total}`);
  console.log(`   已生成课件：${generated}`);
  console.log(`   完成进度：${(generated / total * 100).toFixed(1)}%`);
  console.log(`   各科分布：`);
  for (const s of subjectOrder) {
    console.log(`     ${s}: ${subjectGroups[s].length}`);
  }
}

main();
