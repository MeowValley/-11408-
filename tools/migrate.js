#!/usr/bin/env node
/**
 * migrate.js —— 数据迁移脚本
 *
 * 将 data/questions.json（题库）和 reports/errors.json（纠错）一次性导入 SQLite。
 *
 * 用法：node tools/migrate.js
 */
import db from '../db.js';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

function migrateQuestions() {
  const path = join(ROOT, 'data', 'questions.json');
  if (!existsSync(path)) { console.log('⚠️  未找到 data/questions.json，跳过题库迁移'); return 0; }
  const questions = JSON.parse(readFileSync(path, 'utf8'));
  const insert = db.prepare(`
    INSERT OR REPLACE INTO questions (id, subject, chapter, type, question, options, answer, explanation, animation_id)
    VALUES (@id, @subject, @chapter, @type, @question, @options, @answer, @explanation, @animation_id)
  `);
  const tx = db.transaction((qs) => {
    for (const q of qs) {
      insert.run({
        id: q.id,
        subject: q.subject,
        chapter: q.chapter || '',
        type: q.type || '单选',
        question: q.question,
        options: JSON.stringify(q.options),
        answer: JSON.stringify(q.answer),
        explanation: q.explanation || '',
        animation_id: q.animation_id || null,
      });
    }
  });
  tx(questions);
  console.log(`✅ 题库迁移完成：${questions.length} 道题`);
  return questions.length;
}

function migrateReports() {
  const path = join(ROOT, 'reports', 'errors.json');
  if (!existsSync(path)) { console.log('⚠️  未找到 reports/errors.json，跳过纠错迁移'); return 0; }
  const reports = JSON.parse(readFileSync(path, 'utf8'));
  if (!Array.isArray(reports) || reports.length === 0) { console.log('⚠️  errors.json 为空，跳过'); return 0; }
  const insert = db.prepare(`
    INSERT OR REPLACE INTO reports (id, question_id, error_type, detail, user_contact, status, created_at)
    VALUES (@id, @question_id, @error_type, @detail, @user_contact, 'pending', @created_at)
  `);
  const tx = db.transaction((rs) => {
    for (const r of rs) {
      insert.run({
        id: r.id,
        question_id: r.question_id || '',
        error_type: r.error_type || '其他',
        detail: r.detail || '',
        user_contact: r.user_contact || '',
        created_at: r.time || new Date().toISOString(),
      });
    }
  });
  tx(reports);
  console.log(`✅ 纠错迁移完成：${reports.length} 条`);
  return reports.length;
}

function main() {
  console.log('🗄️  开始数据迁移到 SQLite...\n');
  const qCount = migrateQuestions();
  const rCount = migrateReports();
  console.log('\n📊 迁移结果：');
  console.log(`   题库：${qCount} 道`);
  console.log(`   纠错：${rCount} 条`);
  console.log(`   数据库文件：data/database.sqlite`);
}

main();
