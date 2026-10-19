#!/usr/bin/env node
/**
 * db.js —— SQLite 数据库模块（better-sqlite3 同步 API）
 *
 * Copyright (C) 2026 喵谷（喵酱）
 * 代码授权：PolyForm Noncommercial 1.0.0（禁止商业使用）
 * 全文见 LICENSE-CODE；内容部分见 LICENSE-CONTENT（CC BY-NC-SA 4.0）
 *
 * 数据库文件：data/database.sqlite（单文件，备份只需拷贝它）
 * 两张表：
 *   - questions：题库
 *   - reports：纠错记录
 *
 * 用法：import db from './db.js';
 */
import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');
const DB_PATH = join(DATA_DIR, 'database.sqlite');

mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');   // 提升并发读写性能

// 建表
db.exec(`
CREATE TABLE IF NOT EXISTS questions (
  id            TEXT PRIMARY KEY,
  subject       TEXT NOT NULL,
  chapter       TEXT,
  type          TEXT DEFAULT '单选',
  question      TEXT NOT NULL,
  options       TEXT NOT NULL,          -- JSON 字符串数组
  answer        TEXT NOT NULL,          -- 单选存索引字符串，多选存 JSON 数组字符串
  explanation   TEXT,
  animation_id  TEXT
);

CREATE TABLE IF NOT EXISTS reports (
  id            TEXT PRIMARY KEY,
  question_id   TEXT,
  error_type    TEXT,
  detail        TEXT,
  user_contact  TEXT,
  status        TEXT DEFAULT 'pending',  -- pending / resolved
  created_at    TEXT DEFAULT (datetime('now', 'localtime'))
);
`);

export default db;
export { DB_PATH };
