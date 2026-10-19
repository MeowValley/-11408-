#!/usr/bin/env node
/**
 * gen-batch.js —— 批量生成 A 级课件
 *
 * 从 batch-data*.js 读取所有 A 级考点数据，基于 _template_alg.html 骨架，
 * 把数据内联注入（window.COURSEWARE_DATA），生成 src/<id>.html。
 *
 * 用法：node tools/gen-batch.js
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BATCH } from './batch-data.js';
import { BATCH2 } from './batch-data-2.js';
import { BATCH3 } from './batch-data-3.js';
import { BATCH4 } from './batch-data-4.js';
import { BATCH5 } from './batch-data-5.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TEMPLATE_PATH = join(ROOT, 'src', '_template_alg.html');
const SRC_DIR = join(ROOT, 'src');

const template = readFileSync(TEMPLATE_PATH, 'utf8');

function injectData(html, data) {
  const json = JSON.stringify(data);
  const script = `\n<script>\n/* ===== 内联课件数据（生成脚本注入） ===== */\nwindow.COURSEWARE_DATA = ${json};\n</script>\n</body>`;
  return html.replace('</body>', script);
}

const ALL = [...BATCH, ...BATCH2, ...BATCH3, ...BATCH4, ...BATCH5];

// 去重（按 id），避免重复生成
const seen = new Set();
const unique = ALL.filter(x => {
  if (seen.has(x.id)) return false;
  seen.add(x.id);
  return true;
});

let count = 0;
for (const item of unique) {
  const outPath = join(SRC_DIR, `${item.id}.html`);
  const html = injectData(template, item);
  writeFileSync(outPath, html, 'utf8');
  count++;
  console.log(`✅ 生成 ${item.id}.html —— ${item.title}`);
}
console.log(`\n共生成 ${count} 个 A 级课件到 src/（含已有，覆盖更新）`);
