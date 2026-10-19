/** 从既有课件中回收 COURSEWARE_DATA，输出 tools/recovered.json，供升级为分步动画时复用原文案 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const ids = process.argv.slice(2);
const out = {};

function findBlock(s, i) {
  let depth = 0, inS = null, esc = false;
  for (let j = i; j < s.length; j++) {
    const c = s[j];
    if (inS) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === inS) inS = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inS = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return s.slice(i, j + 1); }
  }
  return null;
}

for (const id of ids) {
  const f = path.join(ROOT, 'src', id + '.html');
  const s = fs.readFileSync(f, 'utf8');
  const i = s.indexOf('window.COURSEWARE_DATA');
  const b = s.indexOf('{', i);
  const blk = findBlock(s, b);
  const d = vm.runInNewContext('(' + blk + ')', {});
  out[id] = d;
  const lv = (s.match(/([ABC])级 · /) || [])[1] || 'B';
  out[id].level = lv;
}
fs.writeFileSync(path.join(__dirname, 'recovered.json'), JSON.stringify(out, null, 2), 'utf8');
console.log('recovered:', Object.keys(out).join(', '));
for (const k of Object.keys(out)) console.log(' ', k, out[k].title, '| deriv', out[k].derivation.length, '| pit', out[k].pitfall_list.length, '| quiz', out[k].quiz_list.length);
