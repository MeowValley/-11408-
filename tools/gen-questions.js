#!/usr/bin/env node
/**
 * gen-questions.js —— 粗糙题库文本自动整理工具
 *
 * 输入：一个文本文件，每道题按固定分隔格式书写（见下方示例）。
 * 输出：data/questions.json（标准题库结构）。
 *
 * 文本格式（每道题之间用空行分隔）：
 * ```
 * [408|数据结构|单选]
 * 题干内容...
 * A. 选项A
 * B. 选项B
 * C. 选项C
 * D. 选项D
 * 答案: 0
 * 解析: 详细解析...
 * 动画: DS-50          (可选)
 * ```
 *
 * 用法：node tools/gen-questions.js <输入文本文件> [输出json路径]
 * 示例：node tools/gen-questions.js my-questions.txt
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const inputPath = process.argv[2];
if (!inputPath) {
  console.error('用法：node tools/gen-questions.js <输入文本文件> [输出json路径]');
  console.error('示例：node tools/gen-questions.js my-questions.txt');
  process.exit(1);
}
if (!existsSync(inputPath)) {
  console.error(`❌ 文件不存在：${inputPath}`);
  process.exit(1);
}

const outPath = process.argv[3] || join(ROOT, 'data', 'questions.json');
const text = readFileSync(inputPath, 'utf8');

// 按「[科目|章节|题型]」分段
const blocks = text.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);

const questions = [];
let seq = 0;

for (const block of blocks) {
  const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
  // 头部 [科目|章节|题型]
  const headMatch = lines[0].match(/^\[(.+?)\|(.+?)\|(.+?)\]$/);
  if (!headMatch) {
    console.warn(`⚠️ 跳过无法识别头部的块：${lines[0]}`);
    continue;
  }
  const [, subject, chapter, type] = headMatch;
  const q = { subject, chapter, type, question: '', options: [], answer: 0, explanation: '', animation_id: null };

  let i = 1;
  // 题干（直到遇到选项行）
  while (i < lines.length && !/^[A-D][.、]\s*/.test(lines[i]) && !lines[i].startsWith('答案')) {
    q.question += lines[i];
    i++;
  }
  // 选项
  while (i < lines.length && /^[A-D][.、]\s*/.test(lines[i])) {
    q.options.push(lines[i].replace(/^[A-D][.、]\s*/, '').trim());
    i++;
  }
  // 答案/解析/动画
  while (i < lines.length) {
    const l = lines[i];
    if (l.startsWith('答案')) q.answer = parseInt(l.replace(/答案[:：]\s*/, '').trim());
    else if (l.startsWith('解析')) q.explanation = l.replace(/解析[:：]\s*/, '').trim();
    else if (l.startsWith('动画')) q.animation_id = l.replace(/动画[:：]\s*/, '').trim() || null;
    i++;
  }

  if (!q.question || !q.options.length) {
    console.warn(`⚠️ 跳过空题干/选项的块：${lines[0]}`);
    continue;
  }
  seq++;
  q.id = 'Q' + String(seq).padStart(3, '0');
  questions.push(q);
}

writeFileSync(outPath, JSON.stringify(questions, null, 2), 'utf8');
console.log(`✅ 已整理 ${questions.length} 道题 → ${outPath}`);
console.log(`   可用 node tools/migrate.js 重新导入数据库，或通过管理员后台上传。`);
