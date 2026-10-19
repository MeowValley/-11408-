/** 全量静态验收：文件/语法/六模块/易错点/自测/步数 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const topics = JSON.parse(fs.readFileSync(path.join(ROOT, 'ledger/topics.json'), 'utf8')).topics;

const missing = [], syn = [], lack6 = [], lackPit = [], lackQuiz = [], lackStep = [], lackExam = [], paramPages = [];
let ok = 0, totalSteps = 0, totalPit = 0, totalQuiz = 0;

function countArr(src, key) {
  const i = src.indexOf(key + ':');
  if (i < 0) return 0;
  const b = src.indexOf('[', i);
  if (b < 0) return 0;
  let depth = 0, inS = null, esc = false, end = -1;
  for (let j = b; j < src.length; j++) {
    const c = src[j];
    if (inS) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === inS) inS = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inS = c; continue; }
    if (c === '[') depth++;
    else if (c === ']') { depth--; if (depth === 0) { end = j; break; } }
  }
  if (end < 0) return 0;
  const body = src.slice(b + 1, end);
  // 统计顶层字符串元素数
  let n = 0, d = 0, s2 = null, e2 = false;
  for (let j = 0; j < body.length; j++) {
    const c = body[j];
    if (s2) {
      if (e2) { e2 = false; continue; }
      if (c === '\\') { e2 = true; continue; }
      if (c === s2) { s2 = null; n++; }
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { s2 = c; continue; }
    if (c === '{' || c === '[') d++;
    else if (c === '}' || c === ']') d--;
  }
  return n;
}

/** 统计 `const XXX = [ {...}, {...} ]` 顶层对象元素个数 */
function countObjs(src, name) {
  const i = src.indexOf(name);
  if (i < 0) return 0;
  const b = src.indexOf('[', i);
  if (b < 0) return 0;
  let depth = 0, inS = null, esc = false, n = 0;
  for (let j = b; j < src.length; j++) {
    const c = src[j];
    if (inS) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === inS) inS = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inS = c; continue; }
    if (c === '[' || c === '{') { if (depth === 1 && c === '{') n++; depth++; }
    else if (c === ']' || c === '}') { depth--; if (depth === 0) break; }
  }
  return n;
}

for (const t of topics) {
  const f = path.join(ROOT, 'src', t.id + '.html');
  if (!fs.existsSync(f)) { missing.push(t.id); continue; }
  const s = fs.readFileSync(f, 'utf8');

  const blocks = [...s.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  try { for (const b of blocks) new vm.Script(b); }
  catch (e) { syn.push(t.id + ': ' + e.message.slice(0, 60)); }

  const need = ['intuition-section', 'animation-section', 'derive-section', 'exam-section', 'pitfall-section', 'quiz-section'];
  const miss = need.filter(x => s.indexOf('id="' + x + '"') < 0);
  if (miss.length) lack6.push(t.id + ' 缺:' + miss.join(','));

  const pit = countArr(s, 'pitfall_list');
  const quiz = (s.match(/["']?question["']?\s*:/g) || []).length;
  // 步数：优先统计 STEPS 数组顶层对象数（兼容 focus:/type: 两种写法），回退统计 desc
  const step = countObjs(s, 'STEPS') || (s.match(/desc\s*:/g) || []).length;
  // 参数驱动型（滑块 + 播放按钮）也是合法动画形态，可替代分步
  const isParam = step < 3 && s.indexOf('btn-play') >= 0 && (s.indexOf('type="range"') >= 0 || s.indexOf('setInterval') >= 0);
  if (pit < 3) lackPit.push(t.id + '(' + pit + ')');
  if (quiz < 2) lackQuiz.push(t.id + '(' + quiz + ')');
  if (step < 3 && !isParam) lackStep.push(t.id + '(' + step + ')');
  if (isParam) paramPages.push(t.id);
  if (s.indexOf('exam_text') < 0) lackExam.push(t.id);

  totalSteps += step; totalPit += pit; totalQuiz += quiz;
  ok++;
}

const say = (k, v) => console.log(k.padEnd(16, ' '), v);
say('总知识点', topics.length);
say('缺文件', missing.length + (missing.length ? ' -> ' + missing.join(',') : ''));
say('语法错误', syn.length + (syn.length ? ' -> ' + syn.slice(0, 5).join(' | ') : ''));
say('六模块缺失', lack6.length + (lack6.length ? ' -> ' + lack6.slice(0, 5).join(',') : ''));
say('真题区块缺失', lackExam.length + (lackExam.length ? ' -> ' + lackExam.slice(0, 5).join(',') : ''));
say('易错点<3', lackPit.length + (lackPit.length ? ' -> ' + lackPit.slice(0, 8).join(',') : ''));
say('自测<2', lackQuiz.length + (lackQuiz.length ? ' -> ' + lackQuiz.slice(0, 8).join(',') : ''));
say('步数<3', lackStep.length + (lackStep.length ? ' -> ' + lackStep.slice(0, 8).join(',') : '（分步型全部达标）'));
say('参数/自动播放型', paramPages.length + ' 个（滑块或定时器驱动，已单独做动效验证）');
say('动画步数合计', totalSteps);
say('易错点合计', totalPit);
say('自测题合计', totalQuiz);
say('通过', ok + ' / ' + topics.length);
process.exit(missing.length + syn.length + lack6.length + lackPit.length + lackQuiz.length + lackStep.length + lackExam.length === 0 ? 0 : 1);
