/** 全项目体检：HTML 结构 / 重复 id / 缺失资源 / 外链 / 导航一致性 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const topics = JSON.parse(fs.readFileSync(path.join(ROOT, 'ledger/topics.json'), 'utf8')).topics;

const issues = [];
const push = (type, id, msg) => issues.push(`${type}\t${id}\t${msg}`);

const files = topics.map(t => t.id + '.html');
for (const f of files) {
  const p = path.join(ROOT, 'src', f);
  if (!fs.existsSync(p)) { push('缺文件', f, ''); continue; }
  const s = fs.readFileSync(p, 'utf8');
  const id = f.replace('.html', '');

  if (!/^<!DOCTYPE html>/i.test(s.trimStart())) push('缺DOCTYPE', id, '');
  if (!/<\/html>\s*$/i.test(s.trim())) push('缺</html>', id, '');
  if (!/<title>[^<]{2,}<\/title>/i.test(s)) push('标题为空', id, '');
  if (!/<meta charset="UTF-8">/i.test(s)) push('缺charset', id, '');
  if (!/lang="zh-CN"/i.test(s)) push('缺lang', id, '');

  // 重复 id
  const ids = [...s.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) push('重复id', id, [...new Set(dup)].join(','));

  // 本地资源是否存在
  for (const m of s.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const ref = m[1];
    if (/^(https?:|\/\/|data:|javascript:|#|mailto:)/.test(ref)) {
      if (/^https?:/.test(ref)) push('外部依赖', id, ref);
      continue;
    }
    if (!/\.(js|css|png|jpe?g|svg|woff2?|ttf)$/i.test(ref)) continue;
    const target = path.resolve(path.join(ROOT, 'src'), ref);
    if (!fs.existsSync(target)) push('资源缺失', id, ref);
  }

  // 必需 DOM
  const hasViz = s.indexOf('id="viz"') >= 0 || /id="(?:[a-z0-9]+-viz|viz-[a-z0-9]+)"/.test(s);
  if (!hasViz) push('缺DOM', id, 'viz');
  for (const need of ['subtitle', 'btn-play', 'theme-float-btn', 'exam-text', 'pitfall-list', 'quiz-list']) {
    if (s.indexOf('id="' + need + '"') < 0) push('缺DOM', id, need);
  }
}

// 导航页链接
const nav = fs.readFileSync(path.join(ROOT, 'dist/index.html'), 'utf8');
for (const m of nav.matchAll(/href="([^"#]+)"/g)) {
  const ref = m[1];
  if (/^(https?:|javascript:|mailto:)/.test(ref)) continue;
  const target = path.resolve(path.join(ROOT, 'dist'), ref);
  if (!fs.existsSync(target)) push('导航死链', 'index.html', ref);
}
// 导航覆盖度
for (const t of topics) {
  if (nav.indexOf(t.id + '.html') < 0) push('导航缺条目', t.id, '');
}

// quiz / admin 链接
for (const page of ['quiz.html', 'admin.html']) {
  const p = path.join(ROOT, 'dist', page);
  if (!fs.existsSync(p)) { push('缺页面', page, ''); continue; }
  const s = fs.readFileSync(p, 'utf8');
  for (const m of s.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const ref = m[1];
    if (/^(https?:|javascript:|mailto:|data:|\/api)/.test(ref)) continue;
    if (ref.indexOf('${') >= 0) continue; // 模板字符串，运行时才拼出真实路径
    const target = path.resolve(path.join(ROOT, 'dist'), ref.replace(/^\//, ''));
    if (!fs.existsSync(target)) push('页面死链', page, ref);
  }
}

const byType = {};
issues.forEach(x => { const k = x.split('\t')[0]; byType[k] = (byType[k] || 0) + 1; });
console.log('===== 体检结果 =====');
console.log('扫描课件：', files.length);
if (!issues.length) console.log('✅ 未发现问题');
else {
  Object.keys(byType).forEach(k => console.log(`  ${k}: ${byType[k]}`));
  console.log('\n明细（最多 40 条）：');
  issues.slice(0, 40).forEach(x => console.log('  ' + x.replace(/\t/g, ' | ')));
}
process.exit(issues.length ? 1 : 0);
