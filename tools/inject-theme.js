#!/usr/bin/env node
/**
 * inject-theme.js —— 批量给课件注入主题切换 + 响应式
 *
 * 为 src/ 下所有 HTML 课件（不含 _ 开头模板？不，模板也要）注入：
 *   1. 浅色主题 CSS 变量（[data-theme="light"] 覆盖）
 *   2. 右上角主题切换按钮（🌙/☀️，localStorage 持久化）
 *   3. 响应式 media query（768px/375px 断点，flex/grid 堆叠）
 *
 * 用法：node tools/inject-theme.js
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC_DIR = join(ROOT, 'src');

function listHtml(dir) {
  const out = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) out.push(...listHtml(p));
    else if (extname(f).toLowerCase() === '.html') out.push(p);
  }
  return out;
}

// 浅色主题变量（追加到 </style> 前，若已有 [data-theme=light] 则跳过）
const LIGHT_THEME_CSS = `
[data-theme="light"] {
  --bg:#f5f7fa; --bg-panel:#ffffff; --bg-elevated:#f0f3f8; --border:#dde3ec;
  --text:#1a2333; --text-muted:#6b7688; --primary:#3b82f6; --primary-strong:#2563eb;
  --highlight:#f59e0b; --success:#10b981; --compare:#ef4444; --swap:#f97316; --danger:#ef4444;
  --shadow:0 4px 16px rgba(0,0,0,0.08);
}
/* 响应式：平板/手机自适应堆叠 */
.theme-float { position:fixed; top:14px; right:14px; z-index:9999; font-size:20px; background:var(--bg-panel); border:1px solid var(--border); border-radius:10px; padding:6px 12px; cursor:pointer; box-shadow:var(--shadow); }
@media (max-width:768px) {
  .stage, .page-wrap { grid-template-columns:1fr !important; }
  .stage { display:block !important; }
  .stage > * { margin-bottom:16px; }
  .control-bar { position:static !important; }
}
@media (max-width:375px) {
  .course-header h1 { font-size:18px !important; }
  .section { padding:16px !important; }
}`;

// 主题切换按钮 + JS（追加到 </body> 前）
const THEME_JS = `
<button class="theme-float" id="theme-float-btn" title="切换主题">🌙</button>
<script>
(function(){
  var btn = document.getElementById('theme-float-btn');
  try { var s = localStorage.getItem('theme'); if(s) document.documentElement.setAttribute('data-theme', s); } catch(e){}
  function upd(){ var d = document.documentElement.getAttribute('data-theme')!=='light'; btn.textContent = d?'🌙':'☀️'; }
  upd();
  btn.addEventListener('click', function(){
    var c = document.documentElement.getAttribute('data-theme');
    var n = c==='light'?'dark':'light';
    document.documentElement.setAttribute('data-theme', n);
    try { localStorage.setItem('theme', n); } catch(e){}
    upd();
  });
})();
</script>`;

function inject(html) {
  // 1. 注入浅色主题 CSS（在 </style> 前）
  if (!html.includes('[data-theme="light"]')) {
    if (html.includes('</style>')) {
      html = html.replace('</style>', LIGHT_THEME_CSS + '\n</style>');
    }
  }
  // 2. 注入主题按钮 + JS（在 </body> 前）
  if (!html.includes('theme-float-btn')) {
    html = html.replace('</body>', THEME_JS + '\n</body>');
  }
  return html;
}

function main() {
  const files = listHtml(SRC_DIR);
  let count = 0;
  for (const f of files) {
    const html = readFileSync(f, 'utf8');
    const newHtml = inject(html);
    if (newHtml !== html) {
      writeFileSync(f, newHtml, 'utf8');
      count++;
      console.log(`✅ 注入主题切换：${f.replace(ROOT, '')}`);
    } else {
      console.log(`⏭ 已跳过（已有主题）：${f.replace(ROOT, '')}`);
    }
  }
  console.log(`\n共处理 ${count} 个文件`);
}

main();
