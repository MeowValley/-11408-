#!/usr/bin/env node
/**
 * classify-anim.js —— 为台账知识点标注动画类型分级（A/B/C）
 *
 * A级（强交互/强定制）：需 D3/GSAP 专属渲染 —— 排序、树遍历、图算法、TCP状态机、
 *   银行家算法、极坐标、特征值几何、Cache映射、调度算法、PV操作等。
 * B级（通用算法/计算型）：标准数组/坐标/表格动画 —— 矩阵运算、求导、概率分布、流水线等。
 * C级（概念/结构/记忆型）：渐进式图文结构 —— 概念定义、体系分层、史纲时间轴、原理记忆等。
 *
 * 用法：node tools/classify-anim.js
 * 输出：更新 ledger/topics.json，为每个 topic 增加 anim_level 字段，并打印统计。
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TOPICS_PATH = join(ROOT, 'ledger', 'topics.json');

// A 级关键词：需要专属动画渲染的强交互/动态过程
const A_KEYWORDS = [
  // 数据结构
  '排序', '遍历', '最短路径', '拓扑', '生成树', '关键路径', '查找', 'B树', 'B+树',
  '散列', '哈希', '堆', '快速', '归并', '插入', '冒泡', '选择', '折半', '二分',
  '二叉树', '哈夫曼', '线索', '并查集', '图', '深度优先', '广度优先', 'KMP', '串',
  // 计组
  'Cache', '流水线', '数据通路', '指令执行', '中断', 'DMA', '寻址', '浮点', '定点',
  '虚拟存储', '页表', '地址转换', '缺页', '置换', '总线',
  // 操作系统
  '调度', '死锁', '银行家', 'PV', '信号量', '同步', '互斥', '页面置换', '缺页',
  '地址转换', '分页', '分段', '磁盘调度', '生产者', '消费者', '读者', '哲学家',
  // 网络
  'TCP', '三次握手', '四次挥手', '拥塞', '子网', '路由', '分组', '滑动窗口', '后退N', '选择重传',
  // 数学
  '极坐标', '二重积分', '三重积分', '曲线积分', '曲面积分', '格林', '高斯', '斯托克斯',
  '特征值', '特征向量', '对角化', '二次型', '级数', '傅里叶', '泰勒', '中值定理',
  '极限', '导数', '切线', '单调', '极值', '凹凸', '渐近线', '旋转体', '方向导数', '梯度',
  // 概率
  '分布', '正态', '中心极限', '大数', '条件概率', '贝叶斯', '全概率',
];

// B 级关键词：通用计算/数组/坐标/表格型
const B_KEYWORDS = [
  '矩阵', '行列式', '向量', '线性方程', '秩', '逆', '初等变换', '克拉默',
  '积分', '微分', '求导', '偏导', '全微分', '不定积分', '定积分', '反常积分',
  '期望', '方差', '协方差', '相关系数', '矩估计', '似然', '区间估计', '假设检验',
  '运算', '编码', '补码', '原码', '反码', '移位', '数制', '进制',
];

// C 级关键词：概念/结构/记忆型
const C_KEYWORDS = [
  '概念', '定义', '性质', '特征', '分类', '组成', '功能', '概述', '发展', '历史',
  '体系', '分层', '模型', '结构', '原理', '作用', '意义', '地位', '关系', '内容',
  '观点', '思想', '理论', '规律', '本质', '特征', '目标', '特点', '应用', '原则',
  '方法', '标准', '指标', '参数', '环境', '接口', '服务', '协议', '层次',
];

function classify(name, subject, chapter) {
  const n = name;
  // 优先级：A > B > C（A 关键词命中优先）
  if (A_KEYWORDS.some(k => n.includes(k))) return 'A';
  if (B_KEYWORDS.some(k => n.includes(k))) return 'B';
  if (C_KEYWORDS.some(k => n.includes(k))) return 'C';

  // 按学科兜底
  if (subject === '英语一') return 'C';   // 英语题型/词汇/语法多为概念记忆型
  if (subject === '政治') return 'C';      // 政治多为原理记忆型
  // 408/数学兜底
  return 'B';
}

function main() {
  const data = JSON.parse(readFileSync(TOPICS_PATH, 'utf8'));
  const dist = { A: 0, B: 0, C: 0 };

  for (const t of data.topics) {
    t.anim_level = classify(t.name, t.subject, t.chapter);
    dist[t.anim_level]++;
  }

  data.meta.anim_level_distribution = dist;
  writeFileSync(TOPICS_PATH, JSON.stringify(data, null, 2), 'utf8');

  console.log('✅ anim_level 分级完成，统计：');
  console.log(`   A级（强交互定制）：${dist.A} 个`);
  console.log(`   B级（通用算法计算）：${dist.B} 个`);
  console.log(`   C级（概念图文结构）：${dist.C} 个`);
  console.log(`   合计：${data.topics.length}`);

  // 按科目打印分布
  const bySubject = {};
  for (const t of data.topics) {
    if (!bySubject[t.subject]) bySubject[t.subject] = { A:0, B:0, C:0 };
    bySubject[t.subject][t.anim_level]++;
  }
  console.log('   各科分布：');
  for (const [s, d] of Object.entries(bySubject)) {
    console.log(`     ${s}: A=${d.A} B=${d.B} C=${d.C}`);
  }
}

main();
