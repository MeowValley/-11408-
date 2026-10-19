#!/usr/bin/env node
/**
 * inject-skill.js —— 批量给课件注入「做题技巧」展示区
 *
 * 在课件的「公式推导」区块后插入一个「做题技巧」section，
 * 页面加载时从 /api/skills/:id 拉取该知识点的做题技巧并展示。
 *
 * 用法：node tools/inject-skill.js
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(__dirname, '..', 'src');

function listHtml(dir) {
  const out = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) out.push(...listHtml(p));
    else if (extname(f).toLowerCase() === '.html' && !f.startsWith('_')) out.push(p);
  }
  return out;
}

// 做题技巧 section（插入到「公式推导」section 之后、易错点之前）
const SKILL_SECTION = `
  <section class="section" id="skill-section" style="display:none;">
    <h2><span class="num">💡</span>做题技巧</h2>
    <div id="skill-content" style="line-height:1.9;"></div>
  </section>
`;

// 拉取技巧的 JS（追加到 init 前）
const SKILL_JS = `
async function loadSkill() {
  const id = (window.COURSEWARE_DATA && window.COURSEWARE_DATA.id) || '';
  if (!id) return;
  try {
    const r = await fetch('/api/skills/' + id);
    if (!r.ok) return;
    const s = await r.json();
    if (s && s.skill_text) {
      document.getElementById('skill-section').style.display = 'block';
      document.getElementById('skill-content').innerHTML = s.skill_text
        .split('\\n').filter(x => x.trim())
        .map(x => '<div style="margin:6px 0;">🎯 ' + x + '</div>').join('');
    }
  } catch(e) {}
}
`;

function inject(html, id) {
  if (html.includes('id="skill-section"')) return html; // 已注入
  // 1. 注入 section（在 pitfall-section 之前）
  if (html.includes('id="pitfall-section"')) {
    html = html.replace('id="pitfall-section"', SKILL_SECTION.trim() + '\n  <section class="section" id="pitfall-section"');
  } else if (html.includes('id="exam-section"')) {
    html = html.replace('id="exam-section"', SKILL_SECTION.trim() + '\n  <section class="section" id="exam-section"');
  }
  // 2. 注入 JS（在 init 调用前，或 </script> 前）
  if (html.includes('function init()')) {
    html = html.replace('function init()', SKILL_JS + '\nfunction init()');
  } else {
    html = html.replace('</script>', SKILL_JS + '</script>');
  }
  // 3. 在 init 里调用 loadSkill
  if (html.includes('renderContent();') && !html.includes('loadSkill();')) {
    html = html.replace('renderContent();', 'renderContent();\n  loadSkill();');
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
      console.log('✅ 注入做题技巧：' + f.replace(/\\/g,'/').split('/').pop());
    } else {
      console.log('⏭ 跳过（已有或结构不符）：' + f.replace(/\\/g,'/').split('/').pop());
    }
  }
  console.log(`\n共处理 ${count} 个课件`);
}

main();
