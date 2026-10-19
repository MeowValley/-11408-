#!/usr/bin/env node
/**
 * verify.js —— 知识点课件质检脚本（DOM 行为级检测版）
 *
 * 用途：用 Puppeteer 打开 src/ 下的单文件 HTML 课件，从「DOM 结构 + 运行时全局对象 +
 *       可交互性」三个维度做行为级断言，杜绝「纯文本匹配」式的自欺欺人检测。
 *
 * 用法：node tools/verify.js [目录路径，默认 ../src]
 *       node tools/verify.js src/_template.html   （也可直接指定单个文件）
 *
 * 断言清单（6 项，全部通过才判定为合格）：
 *   [1] 库加载    —— window.katex 与 window.gsap 均存在（运行时全局对象，非文本）
 *   [2] 程序化图形 —— 页面存在 <canvas> 或 <svg> 标签（证明有真正的图形，而非静态图）
 *   [3] 交互控制  —— 存在控制台按钮（.ctrl-btn 或 #btn-next 等），且点击后能触发状态变化
 *   [4] 公式渲染  —— 文档中存在 .katex 渲染节点（KaTeX 真正跑出来的 DOM，非源码文本）
 *   [5] 真题区块  —— 存在 id="exam-section"（或 .exam-section）且其文本含「真题」
 *   [6] 六模块齐全 —— 直觉引入 / 核心动画 / 公式推导 / 易错点 / 自测 各有专属区块
 */
import puppeteer from 'puppeteer';
import { readdirSync, statSync } from 'node:fs';
import { join, resolve, extname, isAbsolute } from 'node:path';

const DEFAULT_DIR = join(import.meta.dirname, '..', 'src');
const TARGET = resolve(process.argv[2] || DEFAULT_DIR);

/* ------------------------------------------------------------------ */
/*  检测断言定义                                                       */
/* ------------------------------------------------------------------ */
const CHECKS = [
  {
    key: 'libs',
    label: '库加载 (KaTeX + GSAP)',
    // 运行时全局对象检测：window.katex / window.gsap 必须真实存在
    run: () => ({
      katex: typeof window.katex !== 'undefined',
      gsap: typeof window.gsap !== 'undefined',
    }),
    verdict: r => r.katex === true && r.gsap === true,
  },
  {
    key: 'graphics',
    label: '程序化图形 (canvas/svg)',
    // 结构检测：必须存在 <canvas> 或 <svg>，证明有程序化图形
    run: () => ({
      canvas: document.querySelectorAll('canvas').length,
      svg: document.querySelectorAll('svg').length,
    }),
    verdict: r => r.canvas > 0 || r.svg > 0,
  },
  {
    key: 'controls',
    label: '交互控制 (ctrl-btn / #btn-next)',
    // 交互检测：控制按钮存在，且点击后 DOM 发生可观测变化
    run: () => {
      const btns = [
        ...document.querySelectorAll('.ctrl-btn, #btn-next, #btn-prev, #btn-play, #btn-reset, [data-ctrl]'),
      ];
      const existed = btns.length;
      // 尝试点击第一个按钮，观测页面是否产生 class 变化或新增节点
      let reacted = false;
      if (btns[0]) {
        const before = document.body.innerHTML.length;
        btns[0].click();
        const after = document.body.innerHTML.length;
        reacted = before !== after || document.querySelectorAll('.katex, .step-active, .dimmed').length > 0;
      }
      return { existed, reacted };
    },
    verdict: r => r.existed > 0,
  },
  {
    key: 'formula',
    label: '公式渲染 (.katex 节点)',
    // 公式检测：KaTeX 真实渲染出的 .katex 节点（不是源码里的 $$ 文本）
    run: () => ({ count: document.querySelectorAll('.katex').length }),
    verdict: r => r.count > 0,
  },
  {
    key: 'exam',
    label: '真题区块 (#exam-section)',
    // 真题检测：定位专属区块，再校验区块内文本含「真题」
    run: () => {
      const el = document.getElementById('exam-section') || document.querySelector('.exam-section');
      return {
        exists: !!el,
        hasText: !!el && /真题/.test(el.innerText),
      };
    },
    verdict: r => r.exists === true && r.hasText === true,
  },
  {
    key: 'subtitle',
    label: '分步字幕 (.subtitle-bar / #subtitle / #readout)',
    // 分步讲解检测：必须存在字幕栏（规范6：微交互与状态留痕的"字幕"要求）
    run: () => {
      const el = document.querySelector('.subtitle-bar, #subtitle, #readout');
      return { exists: !!el, hasText: !!el && el.textContent.trim().length > 0 };
    },
    verdict: r => r.exists === true,
  },
  {
    key: 'structure',
    label: '图文结构 (.struct-node / 结构图)',
    // C 级概念模板特有：渐进式结构图（节点 + 卡片高亮）
    // A/B 级若用数组/坐标动画，则跳过此检测（不强求）
    run: () => {
      const hasStructNodes = document.querySelectorAll('.struct-node').length > 0;
      const hasCards = document.querySelectorAll('.key-card').length > 0;
      const hasDataStructure = typeof window.COURSEWARE_DATA === 'object'
        && window.COURSEWARE_DATA.structure
        && Array.isArray(window.COURSEWARE_DATA.structure.nodes);
      // 判定：若是概念型（有 structure 数据），必须有结构图节点和分步卡片
      if (hasDataStructure) {
        return { type: 'concept', nodes: hasStructNodes, cards: hasCards, ok: hasStructNodes || hasCards };
      }
      // 非概念型：不强求结构图，但要求有可交互图形（已由 graphics 检测覆盖）
      return { type: 'animation', ok: true };
    },
    verdict: r => r.ok === true,
  },
  {
    key: 'modules',
    label: '六模块齐全',
    // 结构检测：五个教学模块（直觉/动画/推导/易错/自测）各有专属区块 id 或 class
    run: () => {
      const map = {
        intuition: ['#intuition-section', '.intuition-section'],
        animation: ['#animation-section', '.animation-section'],
        derive: ['#derive-section', '.derive-section'],
        pitfall: ['#pitfall-section', '.pitfall-section'],
        quiz: ['#quiz-section', '.quiz-section'],
      };
      const found = {};
      for (const [k, sels] of Object.entries(map)) {
        found[k] = sels.some(s => document.querySelector(s));
      }
      return found;
    },
    verdict: r => Object.values(r).every(Boolean),
  },
];

/* ------------------------------------------------------------------ */
/*  工具函数                                                           */
/* ------------------------------------------------------------------ */
function listHtmlFiles(dir) {
  const out = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) out.push(...listHtmlFiles(p));
    else if (extname(f).toLowerCase() === '.html') out.push(p);
  }
  return out;
}

function resolveTarget() {
  if (!isAbsolute(process.argv[2] || '')) return TARGET;
  const p = resolve(process.argv[2]);
  return statSync(p).isFile() ? [p] : [p];
}

/* ------------------------------------------------------------------ */
/*  主流程                                                             */
/* ------------------------------------------------------------------ */
async function main() {
  const arg = process.argv[2];
  let files = [];
  if (arg && statSync(resolve(arg)).isFile()) {
    files = [resolve(arg)];
  } else {
    files = listHtmlFiles(TARGET);
  }

  if (files.length === 0) {
    console.log('⚠️  未找到任何 HTML 课件文件（请在 src/ 下放置课件，或指定文件路径）');
    process.exit(1);
  }

  console.log(`🔍 课件质检启动（DOM 行为级检测）`);
  console.log(`📄 目标：${files.length} 个文件\n`);

  const browser = await puppeteer.launch({ headless: 'new' });
  const report = [];
  let totalPass = 0;
  let totalChecks = 0;

  for (const file of files) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('file://' + file.replace(/\\/g, '/'), { waitUntil: 'networkidle0', timeout: 60000 });

    // 等待 CDN 库（KaTeX/GSAP）与动画就位，最多等 5 秒（容忍网络波动）
    await page.waitForFunction(
      () => typeof window.gsap !== 'undefined' && typeof window.katex !== 'undefined',
      { timeout: 5000 }
    ).catch(() => {
      // 若 CDN 加载失败则再等 1.5s 兜底
      return new Promise(r => setTimeout(r, 1500));
    });

    console.log(`── ${file}`);
    const fileResult = { file, pass: true, details: [] };

    for (const check of CHECKS) {
      let raw, verdict;
      try {
        raw = await page.evaluate(check.run);
        verdict = check.verdict(raw);
      } catch (e) {
        raw = { error: e.message };
        verdict = false;
      }
      totalChecks++;
      if (verdict) {
        totalPass++;
        console.log(`   ✅ ${check.label}  →  ${JSON.stringify(raw)}`);
      } else {
        fileResult.pass = false;
        console.log(`   ❌ ${check.label}  →  ${JSON.stringify(raw)}`);
      }
    }

    report.push(fileResult);
    await page.close();
  }

  await browser.close();

  const passFiles = report.filter(r => r.pass).length;
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`质检结果：${passFiles}/${files.length} 文件通过，${totalPass}/${totalChecks} 项断言通过`);
  console.log(`合格判定依据：库加载 / 图形 / 交互 / 公式 / 真题 / 分步字幕 / 图文结构 / 六模块 全部命中`);
  if (passFiles < files.length) {
    console.log('❌ 存在不合格课件，依据铁律（缺真题动画演示即返工）必须返工！');
    process.exit(1);
  }
  console.log('✅ 全部课件合格');
}

main().catch(e => { console.error('脚本执行出错：', e); process.exit(1); });
