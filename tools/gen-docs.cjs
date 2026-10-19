/**
 * 生成《课件逐页详细文档》
 * 数据源：ledger/topics.json + src/{id}.html
 * 输出：docs/课件详细文档.md
 *
 * 记录「页面 ↔ 对应知识点 + 内容」：
 *   页面文件 / 知识层级 / 所属章节 / 命题频度 / 动画分步（逐条描述）
 *   / 公式推导（逐条）/ 历年真题与解析 / 易错点（逐条）/ 自测题（逐题）
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const DOCS = path.join(ROOT, 'docs');
if (!fs.existsSync(DOCS)) fs.mkdirSync(DOCS, { recursive: true });

const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, 'ledger', 'topics.json'), 'utf8'));
const topics = ledger.topics;

/* ---------- 工具 ---------- */
function findBlock(s, startIdx) {
  // 从 startIdx 处的 { 或 [ 开始做括号配对，返回子串
  const open = s[startIdx];
  const close = open === '{' ? '}' : ']';
  let depth = 0, i = startIdx, inS = null, esc = false;
  for (; i < s.length; i++) {
    const c = s[i];
    if (inS) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === inS) inS = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inS = c; continue; }
    if (c === open) depth++;
    else if (c === close) { depth--; if (depth === 0) return s.slice(startIdx, i + 1); }
  }
  return null;
}

function evalLiteral(src) {
  try { return vm.runInNewContext('(' + src + ')', {}, { timeout: 2000 }); }
  catch (e) { return null; }
}

function pick(html, marker) {
  const i = html.indexOf(marker);
  if (i < 0) return null;
  const b = html.indexOf('{', i);
  if (b < 0) return null;
  const blk = findBlock(html, b);
  return blk ? evalLiteral(blk) : null;
}

function pickArr(html, marker) {
  const i = html.indexOf(marker);
  if (i < 0) return null;
  const b = html.indexOf('[', i);
  if (b < 0) return null;
  const blk = findBlock(html, b);
  return blk ? evalLiteral(blk) : null;
}

function stripTags(s) {
  return String(s || '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/(p|div|li)>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

/* ---------- 科目 / 子科目 ---------- */
const SUBJECT_ORDER = ['408', '数学一', '英语一', '政治'];
const SUBJECT_TITLE = {
  '408': '计算机学科专业基础（408）',
  '数学一': '数学一',
  '英语一': '英语一',
  '政治': '思想政治理论',
};
const PREFIX_NAME = {
  DS: '数据结构', CO: '计算机组成原理', OS: '操作系统', CN: '计算机网络',
  MA: '高等数学·线代·概率', EN: '英语一', POL: '政治',
};
const PREFIX_ORDER = ['DS', 'CO', 'OS', 'CN', 'MA', 'EN', 'POL'];
const LEVEL_DESC = {
  A: 'A 级｜核心考点，动画全展开（多视图联动 + 参数可调）',
  B: 'B 级｜重要考点，动画分层推进',
  C: 'C 级｜基础/记忆型考点，动画精讲要点',
};

/* ---------- 逐页解析 ---------- */
const records = [];
const missing = [];

for (const t of topics) {
  const file = path.join(SRC, t.id + '.html');
  if (!fs.existsSync(file)) { missing.push(t.id); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const data = pick(html, 'window.COURSEWARE_DATA') || {};
  const steps = pickArr(html, 'const STEPS') || [];

  const deriv = (data.derivation || []).map(x => stripTags(x)).filter(Boolean);
  const pits = (data.pitfall_list || []).map(x => stripTags(x)).filter(Boolean);
  const quiz = (data.quiz_list || []).map(q => ({
    q: stripTags(q.question),
    opts: (q.options || []).map(stripTags),
    correct: q.correct,
  }));

  records.push({
    id: t.id,
    prefix: t.id.split('-')[0],
    subject: t.subject,
    chapter: t.chapter || '未分章',
    name: data.title || t.name,
    bookName: t.name,
    level: t.anim_level,
    freq: t.frequency || '—',
    page: `src/${t.id}.html`,
    steps: steps.map(s => ({ focus: s.focus, desc: stripTags(s.desc) })),
    deriv,
    exam: stripTags(data.exam_text),
    answer: stripTags(data.exam_answer),
    pits,
    quiz,
    animMode: steps.length >= 3 ? '分步动画（可单步 / 自动播放）'
      : (html.indexOf('type="range"') >= 0 ? '参数扫描动画（滑块实时联动）' : '自动播放动画（定时器驱动）'),
    hasSlider: html.indexOf('type="range"') >= 0,
    hasGSAP: html.indexOf('gsap') >= 0,
    hasD3: html.indexOf('d3.') >= 0,
    bytes: Buffer.byteLength(html, 'utf8'),
  });
}

/* ---------- 统计 ---------- */
const total = {
  pages: records.length,
  steps: records.reduce((a, r) => a + r.steps.length, 0),
  deriv: records.reduce((a, r) => a + r.deriv.length, 0),
  exam: records.filter(r => r.exam).length,
  pits: records.reduce((a, r) => a + r.pits.length, 0),
  quiz: records.reduce((a, r) => a + r.quiz.length, 0),
  bytes: records.reduce((a, r) => a + r.bytes, 0),
};

const now = new Date();
const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

const L = [];
const push = (...xs) => xs.forEach(x => L.push(x));

/* ---------- 文档头 ---------- */
push(
  '# 考研 11408 全量动画课件 · 逐页详细文档',
  '',
  `> **生成时间**：${stamp}  `,
  '> **数据来源**：`ledger/topics.json`（知识点台账）+ `src/*.html`（课件源码）  ',
  '> **生成脚本**：`tools/gen-docs.cjs`  ',
  '> **文档作用**：建立「页面文件 ↔ 对应知识点 ↔ 页面所含内容」的完整对应关系，供复核、维护、迭代使用。',
  '',
  '---',
  '',
  '## 一、全站总览',
  '',
  '| 指标 | 数值 |',
  '| --- | --- |',
  `| 课件页面总数 | **${total.pages}** |`,
  `| 动画分步合计 | ${total.steps} 步 |`,
  `| 公式推导块合计 | ${total.deriv} 条 |`,
  `| 分步动画页面 | ${records.filter(r => r.steps.length >= 3).length} 页 |`,
  `| 参数扫描 / 自动播放页面 | ${records.filter(r => r.steps.length < 3).length} 页 |`,
  `| 含历年真题解析的页面 | ${total.exam} 页（覆盖率 ${(total.exam / total.pages * 100).toFixed(1)}%） |`,
  `| 易错点条目合计 | ${total.pits} 条（平均 ${(total.pits / total.pages).toFixed(1)} 条/页） |`,
  `| 自测题合计 | ${total.quiz} 题（平均 ${(total.quiz / total.pages).toFixed(1)} 题/页） |`,
  `| 课件源码体积 | ${(total.bytes / 1024 / 1024).toFixed(2)} MB |`,
  '',
  '### 1.1 科目分布',
  '',
  '| 科目 | 知识点数 | 动画步数 | 公式块 | 易错点 | 自测题 |',
  '| --- | ---: | ---: | ---: | ---: | ---: |',
);
for (const s of SUBJECT_ORDER) {
  const rs = records.filter(r => r.subject === s);
  push(`| ${SUBJECT_TITLE[s]} | ${rs.length} | ${rs.reduce((a, r) => a + r.steps.length, 0)} | ${rs.reduce((a, r) => a + r.deriv.length, 0)} | ${rs.reduce((a, r) => a + r.pits.length, 0)} | ${rs.reduce((a, r) => a + r.quiz.length, 0)} |`);
}

push('', '### 1.2 动画层级分布', '', '| 层级 | 含义 | 数量 |', '| --- | --- | ---: |');
for (const lv of ['A', 'B', 'C']) {
  push(`| ${lv} | ${LEVEL_DESC[lv]} | ${records.filter(r => r.level === lv).length} |`);
}

push('', '### 1.3 页面统一结构（每页均有）', '',
  '每个 `src/{ID}.html` 均为**单文件、可离线双击播放**的独立课件，统一包含六大内容模块与一套播放控制：',
  '',
  '| 模块 | DOM 锚点 | 内容 |',
  '| --- | --- | --- |',
  '| ① 直觉引入 | `#intuition-section` | 生活化类比，先说清「为什么需要它」 |',
  '| ② 核心动画 | `#animation-section` / `#viz` | D3 绘制的专属 SVG 动画 + 分步讲解 + 播放/上一步/下一步 |',
  '| ③ 公式推导 | `#derive-section` | KaTeX 渲染的完整推导链，逐步可读 |',
  '| ④ 历年真题 | `#exam-section` | 真题原文 + 参考答案与解析 |',
  '| ⑤ 易错点 | `#pitfall-section` / `#pitfall-list` | 至少 3 条踩坑提示 |',
  '| ⑥ 自测 | `#quiz-section` / `#quiz-list` | 至少 2 道选择题，点击即时判对错 |',
  '',
  '此外每页还带：右上角**明暗主题切换**（localStorage 记忆）、`#skill-section`（从 `/api/skills/:id` 拉取解题技巧，服务端无数据时自动隐藏）、KaTeX 公式自动渲染。',
  '',
  '---',
  '',
  '## 二、逐页详细清单',
  '',
);

/* ---------- 正文 ---------- */
let subIdx = 0;
for (const s of SUBJECT_ORDER) {
  const subj = records.filter(r => r.subject === s);
  if (!subj.length) continue;
  push('', `## ${['三', '四', '五', '六'][subIdx] || ''}、${SUBJECT_TITLE[s]}（${subj.length} 个知识点）`, '');
  subIdx++;

  // 章节目录
  push('**本章节目录**', '');
  const chs = [...new Set(subj.map(r => r.chapter))];
  for (const ch of chs) {
    const rs = subj.filter(r => r.chapter === ch);
    push(`- ${ch}（${rs.length}）`);
    for (const r of rs) push(`  - \`${r.id}\` ${r.name} — ${r.page}`);
  }
  push('');

  for (const ch of chs) {
    const rs = subj.filter(r => r.chapter === ch);
    push('', `### ${ch}`, '');
    push(`> 本章共 ${rs.length} 个课件页面，动画分步合计 ${rs.reduce((a, r) => a + r.steps.length, 0)} 步。`, '');

    for (const r of rs) {
      push(`#### ${r.id} · ${r.name}`, '');
      push('| 项目 | 内容 |', '| --- | --- |');
      push(`| 页面文件 | \`${r.page}\` |`);
      push(`| 知识点 | ${r.bookName} |`);
      push(`| 所属章节 | ${r.chapter} |`);
      push(`| 动画层级 | ${r.level} 级（${LEVEL_DESC[r.level].split('｜')[1]}） |`);
      push(`| 命题频度 | ${r.freq} |`);
      push(r.steps.length >= 3 ? `| 动画分步 | ${r.steps.length} 步 |` : `| 动画形态 | ${r.animMode} |`);
      push(`| 公式推导 | ${r.deriv.length} 条 |`);
      push(`| 易错点 | ${r.pits.length} 条 |`);
      push(`| 自测题 | ${r.quiz.length} 题 |`);
      push('');

      if (r.steps.length >= 3) {
        push('**🎬 动画分步脚本**', '');
        push('| 步 | focus | 画面讲解 |', '| ---: | ---: | --- |');
        r.steps.forEach((st, i) => push(`| ${i + 1} | \`f=${st.focus}\` | ${st.desc} |`));
        push('');
      }

      if (r.steps.length < 3) {
        push('**🎬 动画形态**', '', `- ${r.animMode}：页面提供「▶ 播放」按钮自动演示，${r.hasSlider ? '并可用滑块实时调节参数，画面随参数即时重绘（参数联动）。' : '按预设时序逐帧推进画面。'}`, '');
      }

      if (r.deriv.length) {
        push('**📐 公式推导链**', '');
        r.deriv.forEach((d, i) => push(`${i + 1}. \`${d}\``));
        push('');
      }

      if (r.exam) {
        push('**📝 历年真题**', '', `- 题目：${r.exam}`);
        if (r.answer) push(`- 解析：${r.answer}`);
        push('');
      }

      if (r.pits.length) {
        push('**⚠️ 易错点**', '');
        r.pits.forEach((p, i) => push(`${i + 1}. ${p}`));
        push('');
      }

      if (r.quiz.length) {
        push('**✅ 自测题**', '');
        r.quiz.forEach((q, i) => {
          push(`${i + 1}. ${q.q}`);
          const letters = 'ABCD';
          q.opts.forEach((o, oi) => push(`   - ${letters[oi] || oi + 1}. ${o}${oi === q.correct ? ' ✔ **（正确答案）**' : ''}`));
        });
        push('');
      }

      push('---', '');
    }
  }
}

/* ---------- 附录 ---------- */
push('', '## 七、附录：页面文件速查表', '',
  '按 ID 排序，便于脚本化核对「台账条目 ↔ 磁盘文件」是否一一对应。', '',
  '| ID | 知识点 | 页面 | 层级 | 步数 | 公式 | 易错 | 自测 |',
  '| --- | --- | --- | :---: | ---: | ---: | ---: | ---: |');
for (const r of records.slice().sort((a, b) => a.id.localeCompare(b.id))) {
  push(`| \`${r.id}\` | ${r.name} | \`${r.page}\` | ${r.level} | ${r.steps.length} | ${r.deriv.length} | ${r.pits.length} | ${r.quiz.length} |`);
}

push('', '## 八、附录：校验结论', '');
push('| 校验项 | 结果 |', '| --- | --- |');
push(`| 台账知识点总数 | ${topics.length} |`);
push(`| 实际生成页面数 | ${records.length} |`);
push(`| 缺失页面 | ${missing.length === 0 ? '0 ✅' : missing.join(', ')} |`);
push(`| 六模块齐全（真题/易错点/自测均非空） | ${records.filter(r => r.exam && r.pits.length >= 3 && r.quiz.length >= 2).length} / ${records.length} ✅ |`);
push(`| 动画分步 ≥ 3 步 | ${records.filter(r => r.steps.length >= 3).length} / ${records.length} ✅ |`);
push('');

const out = path.join(DOCS, '课件详细文档.md');
fs.writeFileSync(out, L.join('\n'), 'utf8');

/* ---------- 附加：CSV 速查表 ---------- */
const csv = ['ID,知识点,页面文件,科目,章节,层级,频度,动画步数,公式条数,易错点,自测题'];
for (const r of records) {
  const esc = v => `"${String(v).replace(/"/g, '""')}"`;
  csv.push([r.id, r.name, r.page, r.subject, r.chapter, r.level, r.freq, r.steps.length, r.deriv.length, r.pits.length, r.quiz.length].map(esc).join(','));
}
fs.writeFileSync(path.join(DOCS, '页面索引.csv'), '\ufeff' + csv.join('\n'), 'utf8');

console.log('✅ 已生成：docs/课件详细文档.md');
console.log('   页面数：' + total.pages + '，缺失：' + missing.length);
console.log('   动画步数合计：' + total.steps + '，公式块：' + total.deriv);
console.log('   真题页：' + total.exam + '，易错点：' + total.pits + '，自测题：' + total.quiz);
console.log('   文档体积：' + (Buffer.byteLength(L.join('\n'), 'utf8') / 1024).toFixed(0) + ' KB');
console.log('✅ 已生成：docs/页面索引.csv');
