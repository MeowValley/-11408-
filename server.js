#!/usr/bin/env node
/**
 * server.js —— 考研 11408 在线刷题与动画学习系统后端
 *
 * Copyright (C) 2026 喵谷（喵酱）
 * 代码授权：PolyForm Noncommercial 1.0.0（禁止商业使用）
 * 全文见 LICENSE-CODE；内容部分见 LICENSE-CONTENT（CC BY-NC-SA 4.0）
 *
 * 功能：
 *  1. 静态托管 dist/、src/、data/
 *  2. 题库 API：GET /api/questions（从 SQLite 读取）
 *  3. 纠错 API：POST /api/report（写入 reports 表）
 *  4. 管理员 API：
 *     - POST /api/admin/login         登录（默认密码 admin123，可用 ADMIN_PASSWORD 环境变量覆盖）
 *     - GET  /api/admin/reports       纠错列表
 *     - POST /api/admin/reports/:id/resolve  标记已解决
 *     - GET  /api/admin/questions     题库列表
 *     - POST /api/admin/questions     批量导入（JSON 数组）
 *
 * 用法：node server.js  （监听 3000 端口，可用 PORT 环境变量覆盖）
 */
import http from 'node:http';
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync, readdirSync } from 'node:fs';
import { join, dirname, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes, scryptSync } from 'node:crypto';
import db from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

const DIST_DIR = join(ROOT, 'dist');
const SRC_DIR = join(ROOT, 'src');
const DATA_DIR = join(ROOT, 'data');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

// 简易 Token 管理（内存态，重启失效）
const tokens = new Set();               // 管理员 token
const userTokens = new Map();           // 用户 token -> userId

function issueToken() {
  const t = randomBytes(24).toString('hex');
  tokens.add(t);
  return t;
}
function checkToken(req) {
  const auth = req.headers.authorization || '';
  const t = auth.replace('Bearer ', '').trim();
  return t && tokens.has(t);
}

function issueUserToken(userId) {
  const t = randomBytes(24).toString('hex');
  userTokens.set(t, userId);
  return t;
}
// 从请求中解析当前登录用户 id（返回 0 表示未登录）
function getUserId(req) {
  const auth = req.headers.authorization || '';
  const t = auth.replace('Bearer ', '').trim();
  return userTokens.get(t) || 0;
}

// 密码哈希（scrypt，Node 内置，无需额外依赖）
function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 32).toString('hex');
  return `${salt}:${hash}`;
}
function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(':');
  const test = scryptSync(password, salt, 32).toString('hex');
  return test === hash;
}

/* ---------- 工具函数 ---------- */
function sendJSON(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', c => { body += c; if (body.length > 5e6) { reject(new Error('body too large')); req.destroy(); } });
    req.on('end', () => { try { resolve(body ? JSON.parse(body) : {}); } catch (e) { reject(new Error('invalid JSON')); } });
    req.on('error', reject);
  });
}

/* ---------- 静态托管 ---------- */
/**
 * 解析静态文件请求。
 * 关键兼容：导航页在 dist/ 下用 ../src/ID.html 指向课件，浏览器会把 URL 规整成 /src/ID.html；
 * 课件内部又用 libs/xxx.js 这类相对路径，于是会变成 /src/libs/xxx.js。
 * 因此这里必须把开头的 /src、/dist、/data 当作「目录别名」剥掉，再回对应目录找文件，
 * 否则会出现 /src/src/... 的双层路径导致 404。
 */
function resolveUnder(baseDir, relPath) {
  const clean = relPath.replace(/^[/\\]+/, '');
  const target = normalize(join(baseDir, clean));
  if (target !== baseDir && !target.startsWith(baseDir + (process.platform === 'win32' ? '\\' : '/'))) return null;
  return target;
}

function serveStatic(req, res, pathname) {
  const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  const ALIAS = { src: SRC_DIR, dist: DIST_DIR, data: DATA_DIR };
  let candidates = [];

  if (safePath === '/' || safePath === '' || safePath === '.') {
    candidates = [join(DIST_DIR, 'index.html')];
  } else {
    const m = safePath.match(/^[/\\](src|dist|data)[/\\](.+)$/);
    if (m) {
      // 显式目录别名：/src/a.html -> src/a.html
      const p = resolveUnder(ALIAS[m[1]], m[2]);
      if (p) candidates = [p];
    } else {
      const p = safePath.replace(/^[/\\]+/, '');
      candidates = [
        resolveUnder(DIST_DIR, p),
        resolveUnder(SRC_DIR, p),
        resolveUnder(DATA_DIR, p),
      ].filter(Boolean);
    }
  }

  for (const file of candidates) {
    if (existsSync(file)) {
      let target = file;
      if (statSync(target).isDirectory()) target = join(target, 'index.html');
      if (existsSync(target) && statSync(target).isFile()) {
        const ext = extname(target).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
        res.end(readFileSync(target));
        return true;
      }
    }
  }
  return false;
}

/* ---------- 题库 / 纠错 API ---------- */
function getQuestions() {
  return db.prepare('SELECT * FROM questions ORDER BY id').all().map(q => ({
    ...q,
    options: JSON.parse(q.options),
    answer: JSON.parse(q.answer),
    is_real_exam: q.is_real_exam || 0,
  }));
}

async function handleApi(req, res, pathname) {
  // 公开接口
  if (pathname === '/api/questions' && req.method === 'GET') {
    sendJSON(res, 200, getQuestions());
    return;
  }
  if (pathname === '/api/report' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const id = 'ERR-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
      db.prepare(`INSERT INTO reports (id, question_id, error_type, detail, user_contact, status) VALUES (?, ?, ?, ?, ?, 'pending')`)
        .run(id, body.question_id || '', body.error_type || '其他', body.detail || '', body.user_contact || '');
      const rec = db.prepare('SELECT * FROM reports WHERE id = ?').get(id);
      sendJSON(res, 200, { ok: true, record: rec });
    } catch (e) {
      sendJSON(res, 400, { ok: false, error: e.message });
    }
    return;
  }
  // 做题技巧：公开读取
  if (pathname === '/api/skills' && req.method === 'GET') {
    sendJSON(res, 200, db.prepare('SELECT * FROM skills ORDER BY topic_id').all());
    return;
  }
  if (pathname.startsWith('/api/skills/') && req.method === 'GET') {
    const id = pathname.split('/')[3];
    const skill = db.prepare('SELECT * FROM skills WHERE topic_id = ?').get(id);
    // 未录入技巧时也返回 200 + 空内容：课件页据此隐藏「做题技巧」区块。
    // 若返回 404，436 个课件每打开一个都会在控制台刷一条红色 404。
    if (!skill) {
      sendJSON(res, 200, { topic_id: id, skill_text: '', found: false });
      return;
    }
    sendJSON(res, 200, Object.assign({}, skill, { found: true }));
    return;
  }

  // ============ 用户系统 ============
  // 注册
  if (pathname === '/api/register' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const username = (body.username || '').trim();
      const password = body.password || '';
      if (!username || !password) { sendJSON(res, 400, { ok: false, error: '用户名和密码不能为空' }); return; }
      if (username.length < 2 || username.length > 20) { sendJSON(res, 400, { ok: false, error: '用户名长度 2-20 位' }); return; }
      if (password.length < 4) { sendJSON(res, 400, { ok: false, error: '密码至少 4 位' }); return; }
      const exists = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
      if (exists) { sendJSON(res, 400, { ok: false, error: '用户名已存在' }); return; }
      const result = db.prepare('INSERT INTO users (username, password_hash, created_at) VALUES (?, ?, ?)')
        .run(username, hashPassword(password), new Date().toISOString());
      const userId = result.lastInsertRowid;
      sendJSON(res, 200, { ok: true, token: issueUserToken(userId), user: { id: userId, username } });
    } catch (e) { sendJSON(res, 500, { ok: false, error: e.message }); }
    return;
  }
  // 登录
  if (pathname === '/api/login' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const user = db.prepare('SELECT * FROM users WHERE username = ?').get((body.username || '').trim());
      if (!user || !verifyPassword(body.password || '', user.password_hash)) {
        sendJSON(res, 401, { ok: false, error: '用户名或密码错误' });
        return;
      }
      sendJSON(res, 200, { ok: true, token: issueUserToken(user.id), user: { id: user.id, username: user.username } });
    } catch (e) { sendJSON(res, 500, { ok: false, error: e.message }); }
    return;
  }
  // 获取当前用户信息
  if (pathname === '/api/me' && req.method === 'GET') {
    const uid = getUserId(req);
    if (!uid) { sendJSON(res, 401, { ok: false, error: '未登录' }); return; }
    const user = db.prepare('SELECT id, username, created_at FROM users WHERE id = ?').get(uid);
    sendJSON(res, 200, { user });
    return;
  }
  // 保存个人数据（错题本/收藏/统计/打卡，按 key 存 JSON）
  if (pathname === '/api/userdata' && req.method === 'POST') {
    const uid = getUserId(req);
    if (!uid) { sendJSON(res, 401, { ok: false, error: '未登录' }); return; }
    const body = await readBody(req);
    if (!body.key) { sendJSON(res, 400, { ok: false, error: '缺少 key' }); return; }
    db.prepare('INSERT OR REPLACE INTO user_data (user_id, data_key, data_value) VALUES (?, ?, ?)')
      .run(uid, body.key, JSON.stringify(body.value));
    sendJSON(res, 200, { ok: true });
    return;
  }
  // 读取个人数据
  if (pathname === '/api/userdata' && req.method === 'GET') {
    const uid = getUserId(req);
    if (!uid) { sendJSON(res, 401, { ok: false, error: '未登录' }); return; }
    const rows = db.prepare('SELECT data_key, data_value FROM user_data WHERE user_id = ?').all(uid);
    const data = {};
    rows.forEach(r => { try { data[r.data_key] = JSON.parse(r.data_value); } catch(e) { data[r.data_key] = r.data_value; } });
    sendJSON(res, 200, data);
    return;
  }

  // 排行榜：统计所有用户的做题量和正确率
  if (pathname === '/api/leaderboard' && req.method === 'GET') {
    const rows = db.prepare("SELECT user_id, data_value FROM user_data WHERE data_key = 'quizState'").all();
    const users = db.prepare('SELECT id, username FROM users').all();
    const userMap = {};
    users.forEach(u => userMap[u.id] = u.username);
    const board = rows.map(r => {
      let state = {};
      try { state = JSON.parse(r.data_value); } catch(e) {}
      const total = (state.history && state.history.total) || 0;
      const correct = (state.history && state.history.correct) || 0;
      const rate = total ? Math.round(correct / total * 100) : 0;
      return { user_id: r.user_id, username: userMap[r.user_id] || ('用户' + r.user_id), total, correct, rate };
    }).sort((a, b) => b.total - a.total);
    sendJSON(res, 200, board);
    return;
  }

  // ============ 管理员接口 ============
  if (pathname.startsWith('/api/admin/')) {
    // 登录
    if (pathname === '/api/admin/login' && req.method === 'POST') {
      const body = await readBody(req);
      if (body.password === ADMIN_PASSWORD) {
        sendJSON(res, 200, { ok: true, token: issueToken() });
      } else {
        sendJSON(res, 401, { ok: false, error: '密码错误' });
      }
      return;
    }

    // 以下接口需要 token
    if (!checkToken(req)) {
      sendJSON(res, 401, { ok: false, error: '未授权，请先登录' });
      return;
    }

    // 纠错列表
    if (pathname === '/api/admin/reports' && req.method === 'GET') {
      const reports = db.prepare('SELECT * FROM reports ORDER BY created_at DESC').all();
      sendJSON(res, 200, reports);
      return;
    }
    // 标记已解决
    if (pathname.startsWith('/api/admin/reports/') && pathname.endsWith('/resolve') && req.method === 'POST') {
      const id = pathname.split('/')[4];
      db.prepare(`UPDATE reports SET status = 'resolved' WHERE id = ?`).run(id);
      sendJSON(res, 200, { ok: true });
      return;
    }
    // 题库列表
    if (pathname === '/api/admin/questions' && req.method === 'GET') {
      sendJSON(res, 200, getQuestions());
      return;
    }

    // 删除单道题目
    if (pathname.startsWith('/api/admin/questions/') && req.method === 'DELETE') {
      const id = pathname.split('/')[4];
      const result = db.prepare('DELETE FROM questions WHERE id = ?').run(id);
      sendJSON(res, 200, { ok: true, deleted: result.changes });
      return;
    }

    // 批量标记纠错已解决
    if (pathname === '/api/admin/reports/resolve-batch' && req.method === 'POST') {
      const body = await readBody(req);
      const ids = body.ids || [];
      if (!ids.length) { sendJSON(res, 400, { ok: false, error: '未提供 ids' }); return; }
      const stmt = db.prepare("UPDATE reports SET status = 'resolved' WHERE id = ?");
      const tx = db.transaction(() => ids.forEach(id => stmt.run(id)));
      tx();
      sendJSON(res, 200, { ok: true, resolved: ids.length });
      return;
    }

    // 保存/编辑做题技巧
    if (pathname === '/api/admin/skills' && req.method === 'POST') {
      const body = await readBody(req);
      if (!body.topic_id || !body.skill_text) { sendJSON(res, 400, { ok: false, error: '缺少 topic_id 或 skill_text' }); return; }
      db.prepare(`INSERT OR REPLACE INTO skills (topic_id, topic_name, skill_text, updated_at) VALUES (?, ?, ?, ?)`)
        .run(body.topic_id, body.topic_name || '', body.skill_text, new Date().toISOString());
      sendJSON(res, 200, { ok: true });
      return;
    }

    // 用户列表
    if (pathname === '/api/admin/users' && req.method === 'GET') {
      const users = db.prepare('SELECT id, username, created_at FROM users ORDER BY id').all();
      sendJSON(res, 200, users);
      return;
    }
    // 删除用户
    if (pathname.startsWith('/api/admin/users/') && req.method === 'DELETE') {
      const id = pathname.split('/')[4];
      db.prepare('DELETE FROM user_data WHERE user_id = ?').run(id);
      const result = db.prepare('DELETE FROM users WHERE id = ?').run(id);
      sendJSON(res, 200, { ok: true, deleted: result.changes });
      return;
    }

    // 课件列表（扫描 src/ 下的 HTML，排除 _ 开头的模板）
    if (pathname === '/api/admin/courseware' && req.method === 'GET') {
      const files = readdirSync(SRC_DIR).filter(f => f.endsWith('.html') && !f.startsWith('_')).sort();
      // 读台账获取知识点元数据
      let topics = [];
      try { topics = JSON.parse(readFileSync(join(ROOT, 'ledger', 'topics.json'), 'utf8')).topics; } catch(e) {}
      const list = files.map(f => {
        const id = f.replace('.html', '');
        const topic = topics.find(t => t.id === id);
        return {
          id,
          file: f,
          has_courseware: true,
          name: topic ? topic.name : id,
          subject: topic ? topic.subject : '',
          chapter: topic ? topic.chapter : '',
          frequency: topic ? topic.frequency : '',
          anim_level: topic ? topic.anim_level : '',
        };
      });
      // 统计未生成的知识点
      const generatedIds = new Set(files.map(f => f.replace('.html', '')));
      const missing = topics.filter(t => !generatedIds.has(t.id)).length;
      sendJSON(res, 200, { total_topics: topics.length, generated: list.length, missing, list });
      return;
    }

    // 获取单个课件内联数据
    if (pathname.startsWith('/api/admin/courseware/') && req.method === 'GET') {
      const id = pathname.split('/')[4];
      const file = join(SRC_DIR, `${id}.html`);
      if (!existsSync(file)) { sendJSON(res, 404, { error: '课件不存在' }); return; }
      const html = readFileSync(file, 'utf8');
      // 提取 window.COURSEWARE_DATA
      const m = html.match(/window\.COURSEWARE_DATA\s*=\s*({[\s\S]*?});\s*<\/script>/);
      let data = null;
      if (m) { try { data = JSON.parse(m[1]); } catch(e) { data = { _error: '数据解析失败（可能含非标准 JSON）' }; } }
      sendJSON(res, 200, { id, has_data: !!data, data });
      return;
    }

    // 批量导入题目
    if (pathname === '/api/admin/questions' && req.method === 'POST') {
      try {
        const body = await readBody(req);
        const list = Array.isArray(body) ? body : (body.questions || []);
        const insert = db.prepare(`INSERT OR REPLACE INTO questions (id, subject, chapter, type, question, options, answer, explanation, animation_id) VALUES (@id, @subject, @chapter, @type, @question, @options, @answer, @explanation, @animation_id)`);
        const tx = db.transaction((qs) => {
          for (const q of qs) {
            if (!q.id || !q.question) continue;
            insert.run({
              id: String(q.id),
              subject: q.subject || '未分类',
              chapter: q.chapter || '',
              type: q.type || '单选',
              question: q.question,
              options: JSON.stringify(q.options || []),
              answer: JSON.stringify(q.answer),
              explanation: q.explanation || '',
              animation_id: q.animation_id || null,
            });
          }
        });
        tx(list);
        sendJSON(res, 200, { ok: true, imported: list.length });
      } catch (e) {
        sendJSON(res, 400, { ok: false, error: e.message });
      }
      return;
    }
  }

  sendJSON(res, 404, { error: 'API not found' });
}

/* ---------- 主服务器 ---------- */
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);
  if (pathname.startsWith('/api/')) { await handleApi(req, res, pathname); return; }
  // 站点图标：浏览器默认会请求 /favicon.ico，直接给一个内联 SVG，避免控制台 404
  if (pathname === '/favicon.ico' || pathname === '/favicon.svg') {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
      + '<rect width="64" height="64" rx="14" fill="#4f8cff"/>'
      + '<text x="32" y="43" font-family="Arial,Helvetica,sans-serif" font-size="25" font-weight="700" fill="#ffffff" text-anchor="middle">11408</text>'
      + '</svg>';
    res.writeHead(200, { 'Content-Type': 'image/svg+xml; charset=utf-8', 'Cache-Control': 'public, max-age=86400' });
    res.end(svg);
    return;
  }
  if (serveStatic(req, res, pathname)) return;
  // 友好的 404：给出返回入口，便于用户从死链里走出来
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>404 · 页面不存在</title>
<style>
  :root{--bg:#0f1420;--panel:#161d2e;--line:#2a3550;--text:#e6ebf5;--muted:#8b96ad;--primary:#4f8cff}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:"PingFang SC","Microsoft YaHei",system-ui,sans-serif;background:var(--bg);color:var(--text);
       min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
  .box{max-width:620px;width:100%;background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:40px 32px;text-align:center}
  h1{font-size:56px;color:var(--primary);letter-spacing:2px;margin-bottom:8px}
  p{color:var(--muted);line-height:1.8;margin-bottom:8px}
  code{background:#0b1020;border:1px solid var(--line);border-radius:6px;padding:2px 8px;color:#ffb020;font-size:13px;word-break:break-all}
  .btns{display:flex;gap:12px;justify-content:center;margin-top:24px;flex-wrap:wrap}
  a{display:inline-block;text-decoration:none;padding:11px 22px;border-radius:10px;font-weight:600;font-size:14px;
    border:1px solid var(--line);color:var(--text);transition:.15s}
  a.primary{background:var(--primary);border-color:var(--primary);color:#fff}
  a:hover{transform:translateY(-1px);border-color:var(--primary)}
</style></head>
<body><div class="box">
  <h1>404</h1>
  <p>这个地址没有对应的页面：</p>
  <p><code>${pathname.replace(/[<>&"]/g, '')}</code></p>
  <p style="margin-top:14px">如果你是从导航页点进来的，请确认服务已更新到最新版本（<code>node server.js</code> 后访问 <code>http://localhost:${currentPort}</code>）。</p>
  <div class="btns">
    <a class="primary" href="/">返回导航页</a>
    <a href="/quiz.html">去刷题</a>
  </div>
</div></body></html>`);
});

function printBanner(port) {
  console.log('════════════════════════════════════════════');
  console.log('  考研 11408 在线刷题与动画学习系统');
  console.log(`  ✅ 服务已启动：http://localhost:${port}`);
  console.log(`  📚 导航页：http://localhost:${port}/`);
  console.log(`  📝 刷题页：http://localhost:${port}/quiz.html`);
  console.log(`  🔐 管理后台：http://localhost:${port}/admin.html`);
  console.log(`  🗄️ 数据库：data/database.sqlite`);
  console.log('════════════════════════════════════════════');
}

/* 端口占用自动切换：从 PORT 开始，依次尝试 +1，最多尝试 100 个端口 */
const BASE_PORT = Number(PORT) || 3000;
let currentPort = BASE_PORT;

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    // 端口被占用，尝试下一个端口
    currentPort++;
    if (currentPort - BASE_PORT > 100) {
      console.error(`❌ 从 ${BASE_PORT} 到 ${currentPort - 1} 的端口全部被占用，无法启动。`);
      process.exit(1);
    }
    console.warn(`⚠️  端口 ${currentPort - 1} 已被占用，自动切换到端口 ${currentPort} ...`);
    server.listen(currentPort);
  } else {
    console.error('❌ 服务器启动失败：', err);
    process.exit(1);
  }
});

// 监听成功时，打印实际使用的端口
server.on('listening', () => {
  printBanner(server.address().port);
});

server.listen(BASE_PORT);


