#!/usr/bin/env node
/**
 * gen-ledger.js —— 生成全量知识点台账 ledger/topics.json
 *
 * 数据源：
 *   - spec/outline/{math1,cs408,english1,politics}.md   （大纲三级条目，知识点主数据）
 *   - spec/exams/{math1,cs408,english1,politics}_exams.json （真题考频，用于 frequency + exam_refs）
 *
 * 输出：ledger/topics.json
 *   每个知识点：{ id, subject, chapter, name, frequency, exam_refs, status }
 *
 * 用法：node tools/gen-ledger.js
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// 科目配置：outline 文件名 → { subject 标识, subject 中文名, 科目前缀(用于 id) }
const SUBJECTS = {
  'math1':    { subject: '数学一', prefix: 'MA',    exams: 'math1_exams.json' },
  'cs408':    { subject: '408',    prefix: 'DS',    exams: 'cs408_exams.json' },
  'english1': { subject: '英语一', prefix: 'EN',    exams: 'english1_exams.json' },
  'politics': { subject: '政治',   prefix: 'POL',   exams: 'politics_exams.json' },
};

// 408 的四门子科目（用于 id 前缀区分，基于二级标题 part 判断）
const CS408_SUBJECT_MAP = [
  { match: /数据结构/, prefix: 'DS' },
  { match: /计算机组成原理/, prefix: 'CO' },
  { match: /操作系统/, prefix: 'OS' },
  { match: /计算机网络/, prefix: 'CN' },
];

function parseOutline(mdText) {
  /**
   * 解析 markdown 大纲，返回 [{ chapter, part, name }]
   * 支持任意层级缩进的列表项（- / 嵌套空格缩进的子项），精确到最小考点。
   * 自动跳过 YAML frontmatter（--- 包裹的部分）。
   * chapter = 三级标题（节）；part = 二级标题（大章）。
   */
  const lines = mdText.split('\n');
  const topics = [];
  let currentH2 = '';   // 二级（大章）
  let currentH3 = '';   // 三级（节）
  let inFrontmatter = false;
  let frontmatterDelim = 0;

  for (const line of lines) {
    // 跳过 YAML frontmatter（--- 起始与结束）
    if (line.trim() === '---') {
      frontmatterDelim++;
      inFrontmatter = (frontmatterDelim % 2 === 1);
      continue;
    }
    if (inFrontmatter) continue;

    if (line.startsWith('### ')) {
      currentH3 = line.replace('### ', '').trim();
      continue;
    }
    if (line.startsWith('## ')) {
      currentH2 = line.replace('## ', '').trim();
      currentH3 = '';
      continue;
    }
    // 匹配列表项：可选缩进 + "- " 或 "* "
    const m = line.match(/^\s*[-*]\s+(.+)$/);
    if (m) {
      let name = m[1].trim();
      if (!name || name.startsWith('>')) continue;
      // 清理 markdown 加粗/行内代码等符号
      name = name.replace(/\*\*/g, '').replace(/`/g, '').trim();
      const chapter = currentH3 || currentH2;
      topics.push({ chapter, part: currentH2, name });
    }
  }
  return topics;
}

function loadExams(subjectKey) {
  const cfg = SUBJECTS[subjectKey];
  const p = join(ROOT, 'spec', 'exams', cfg.exams);
  try {
    const raw = JSON.parse(readFileSync(p, 'utf8'));
    return raw;
  } catch {
    return null;
  }
}

function resolveSubjectForChapter(subjectKey, part) {
  // 408 需要按子科目细分 id 前缀（基于二级标题 part）
  if (subjectKey === 'cs408') {
    for (const m of CS408_SUBJECT_MAP) {
      if (m.match.test(part)) return m.prefix;
    }
  }
  return SUBJECTS[subjectKey].prefix;
}

// 归一化考点名称用于匹配（去除括号注释、空格、标点）
function normalize(s) {
  return s
    .replace(/（[^）]*）/g, '')   // 去中文括号
    .replace(/\([^)]*\)/g, '')     // 去英文括号
    .replace(/[、，。：；\s*＊]/g, '')
    .trim();
}

// 检查两个考点名称是否匹配（双向包含 + 归一化相等）
function nameMatch(a, b) {
  if (!a || !b) return false;
  const na = normalize(a);
  const nb = normalize(b);
  if (!na || !nb) return false;
  // 完全相等
  if (na === nb) return true;
  // 双向包含（长度 >= 4 的短串包含才算，避免"图"这种过短误匹配）
  const shorter = na.length < nb.length ? na : nb;
  if (shorter.length < 4) return false;
  return na.includes(nb) || nb.includes(na);
}

// 根据考频统计表计算某个知识点的 frequency（高/中/低/冷门）
function calcFrequency(name, exams) {
  if (!exams || !exams['考点考频统计']) return '中'; // 无数据默认中
  const stats = exams['考点考频统计'];
  let found = null;

  // 遍历所有科目下的考频表，找同名考点（用归一化匹配）
  for (const [sub, table] of Object.entries(stats)) {
    for (const [k, v] of Object.entries(table)) {
      if (nameMatch(name, k)) {
        // 保留最佳匹配（优先完全相等）
        if (!found || normalize(name) === normalize(k)) {
          found = { k, v };
        }
        if (normalize(name) === normalize(k)) break;
      }
    }
    if (found) break;
  }

  if (!found) {
    // 检查零考察清单
    if (exams['大纲零考察知识点']?.some(z => nameMatch(z.topic_name, name))) {
      return '冷门';
    }
    return '中';
  }

  const freq = found.v.考频 || found.v.年均分值 || 0;
  const pct = found.v.占比 ? parseFloat(found.v.占比) : 0;

  // 判定规则
  if (typeof freq === 'number' && freq > 0) {
    if (freq >= 20) return '高';
    if (freq >= 8) return '中';
    if (freq >= 1) return '低';
    return '冷门';
  }
  if (pct > 0) {
    if (pct >= 30) return '高';
    if (pct >= 10) return '中';
    return '低';
  }
  return '中';
}

function findExamRefs(name, exams) {
  // 关联真题 id：在 questions 数组里找 topic_name 匹配的
  if (!exams || !exams.questions) return [];
  return exams.questions
    .filter(q => nameMatch(q.topic_name, name))
    .map(q => q.id);
}

function main() {
  const allTopics = [];
  const subjectDist = {};

  for (const [key, cfg] of Object.entries(SUBJECTS)) {
    const outlinePath = join(ROOT, 'spec', 'outline', `${key}.md`);
    const mdText = readFileSync(outlinePath, 'utf8');
    const parsed = parseOutline(mdText);
    const exams = loadExams(key);

    const subjectTopics = [];
    let seq = 0;

    for (const t of parsed) {
      seq++;
      const subjectPrefix = resolveSubjectForChapter(key, t.part);
      const id = `${subjectPrefix}-${String(seq).padStart(2, '0')}`;
      const frequency = calcFrequency(t.name, exams);
      const exam_refs = findExamRefs(t.name, exams);

      subjectTopics.push({
        id,
        subject: cfg.subject,
        chapter: t.chapter,
        name: t.name,
        frequency,
        exam_refs,
        status: 'pending',
      });
    }

    subjectDist[cfg.subject] = subjectTopics.length;
    allTopics.push(...subjectTopics);
  }

  const result = {
    meta: {
      generated_at: new Date().toISOString(),
      total_topics: allTopics.length,
      description: '考研11408全量知识点台账，课件批量生成的唯一数据源',
      source: ['spec/outline/*.md', 'spec/exams/*_exams.json'],
    },
    subject_distribution: subjectDist,
    topics: allTopics,
  };

  mkdirSync(join(ROOT, 'ledger'), { recursive: true });
  const outPath = join(ROOT, 'ledger', 'topics.json');
  writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');

  // 打印统计
  console.log(`✅ 台账已生成：${outPath}`);
  console.log(`   知识点总数：${allTopics.length}`);
  console.log('   各科分布：');
  for (const [s, n] of Object.entries(subjectDist)) {
    console.log(`     ${s}: ${n}`);
  }
  // 频次分布
  const freqDist = { 高: 0, 中: 0, 低: 0, 冷门: 0 };
  for (const t of allTopics) freqDist[t.frequency] = (freqDist[t.frequency] || 0) + 1;
  console.log('   考频分布：', JSON.stringify(freqDist));
  // 有关联真题的知识点数
  const withRefs = allTopics.filter(t => t.exam_refs.length > 0).length;
  console.log(`   已关联真题的知识点：${withRefs}/${allTopics.length}`);
}

main();
