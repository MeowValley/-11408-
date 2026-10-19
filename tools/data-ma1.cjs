module.exports = [
  {
    id: 'MA-05', level: 'B', title: '无穷小量与无穷大量的比较',
    intuition: '两个无穷小都趋于 0，但「趋近的速度」可能天差地别：x→0 时 x² 比 x 快得多。比较方法就是看比值 lim β/α：等于 0 则 β 是 α 的<strong>高阶</strong>无穷小（记 β=o(α)）；等于 ∞ 则<strong>低阶</strong>；等于非零常数 c 则<strong>同阶</strong>；c=1 则<strong>等价</strong>（α~β）。等价无穷小替换是极限计算的第一利器（如 sin x ~ x、1−cos x ~ x²/2）。',
    derivation: [
      '\\lim\\frac{\\beta}{\\alpha}=0 \\Rightarrow \\beta=o(\\alpha)\\ (\\text{高阶})',
      '\\lim\\frac{\\beta}{\\alpha}=\\infty \\Rightarrow \\beta \\text{ 是 } \\alpha \\text{ 的低阶}',
      '\\lim\\frac{\\beta}{\\alpha}=c\\neq 0 \\Rightarrow \\text{同阶}; \\; c=1 \\Rightarrow \\alpha \\sim \\beta',
      '\\text{常用等价}: \\; \\sin x\\sim x,\\; 1-\\cos x\\sim \\frac{x^2}{2},\\; \\ln(1+x)\\sim x,\\; e^x-1\\sim x'
    ],
    exam_text: '<b>【2018 真题改编】</b>x→0 时，下列与 x 等价的是？A. sin x　B. 1−cos x　C. x²　D. tan x − x',
    exam_answer: '答案：<b>A</b>。sin x ~ x（比值 sin x/x → 1）。1−cos x ~ x²/2 是 x 的二阶无穷小；x² 是 x 的高阶无穷小；tan x − x ~ x³/3 是三阶。等价无穷小只适用于「乘除」替换，加减法中替换需谨慎（可能改变阶数）。',
    pitfalls: [
      '等价无穷小替换只能在乘除因子中直接使用；加减法中替换可能丢失高阶项导致错误。',
      '「同阶」要求比值趋于非零常数，趋于 0 或 ∞ 都不是同阶。',
      '等价是「同阶」的特殊情形（c=1），不要把两者混为一谈。'
    ],
    quiz: [
      { question: 'x→0 时 1−cos x 与 x² 的关系是？', options: ['等价', '同阶但不等价', '高阶'], correct: 1 },
      { question: '若 lim β/α = 0，则 β 是 α 的？', options: ['高阶无穷小', '低阶无穷小', '等价无穷小'], correct: 0 },
      { question: '下列等价无穷小错误的是？', options: ['sin x ~ x', 'ln(1+x) ~ x', 'e^x−1 ~ x²'], correct: 2 }
    ],
    steps: [
      { focus: 0, desc: '两个无穷小趋于 0 的速度不同——用「比值」衡量快慢' },
      { focus: 1, desc: '比值趋于 0：β 比 α 快得多 → β 是 α 的高阶无穷小' },
      { focus: 2, desc: '比值趋于非零常数：同阶；等于 1：等价（可互相替换）' },
      { focus: 3, desc: '常用等价替换表：sin x ~ x、1−cos x ~ x²/2 等' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['快慢之比', '高阶无穷小', '同阶与等价', '常用等价表'][f]);
      const x0 = 110, y0 = 300, w = 620, h = 200;
      ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.6);
      ln(g, x0, y0, x0, y0 - h, 'var(--border)', 1.6);
      txt(g, x0 + w + 14, y0 + 4, 'x', 'var(--text-muted)', 12);
      txt(g, x0 - 12, y0 - h - 8, 'y', 'var(--text-muted)', 12, 'end');
      plot(g, function (t) { return t * 0.9; }, x0, y0, w * 0.6, h, 'var(--primary)', 2.4);
      plot(g, function (t) { return t * t * 0.9; }, x0, y0, w * 0.6, h, 'var(--success)', 2.4);
      txt(g, x0 + w * 0.62, y0 - 150, 'y = x', 'var(--primary)', 12, 'start', '700');
      txt(g, x0 + w * 0.62, y0 - 60, 'y = x²', 'var(--success)', 12, 'start', '700');
      if (f >= 1) {
        box(g, 660, 70, 210, 76, 'var(--highlight)', 0.1);
        txt(g, 765, 100, 'x² / x = x → 0', 'var(--highlight)', 13, 'middle', '700');
        txt(g, 765, 126, 'x² 是 x 的高阶无穷小', 'var(--text)', 11);
      }
      if (f >= 2) {
        box(g, 60, 70, 240, 76, 'var(--success)', 0.1);
        txt(g, 180, 100, 'sin x / x → 1', 'var(--success)', 13, 'middle', '700');
        txt(g, 180, 126, 'sin x 与 x 等价', 'var(--text)', 11);
      }
      if (f === 3) {
        g.selectAll('*').remove();
        title(g, '常用等价无穷小（x→0）');
        const rows = [['sin x ~ x', 'tan x ~ x', 'arcsin x ~ x', 'arctan x ~ x'], ['1−cos x ~ x²/2', 'ln(1+x) ~ x', 'eˣ−1 ~ x', '(1+x)^α−1 ~ αx']];
        rows.forEach(function (r, ri) {
          r.forEach(function (s, i) {
            box(g, 80 + i * 190, 100 + ri * 100, 170, 66, ri ? 'var(--success)' : 'var(--primary)', 0.12);
            txt(g, 165 + i * 190, 140 + ri * 100, s, 'var(--text)', 12.5);
          });
        });
        txt(g, 450, 320, '记忆要点：三角函数→x，对数/指数→x，1−cos→x²/2', 'var(--highlight)', 12.5, 'middle', '700');
        txt(g, 450, 350, '替换只在乘除中使用；加减法需先合并再判断阶数', 'var(--text-muted)', 11.5);
      }
    }
  },
  {
    id: 'MA-06', level: 'C', title: '函数的连续性（连续的定义、间断点的类型）',
    intuition: '连续 = 图形「一笔画不断」：f(x) 在 x₀ 连续要求 lim f(x) = f(x₀)，即「左极限 = 右极限 = 函数值」，三者缺一不可。间断点按「缺哪一个」分类：<strong>可去间断点</strong>（极限存在但函数值不等或缺失）、<strong>跳跃间断点</strong>（左右极限存在但不相等）——这两类合称第一类；<strong>无穷间断点</strong>、<strong>振荡间断点</strong>（极限不存在）称第二类。',
    derivation: [
      '\\text{连续}: \\; \\lim_{x\\to x_0} f(x) = f(x_0) \\;\\Leftrightarrow\\; f(x_0^-)=f(x_0^+)=f(x_0)',
      '\\text{第一类}: \\; \\text{左右极限都存在} \\;\\Rightarrow\\; \\text{可去 / 跳跃}',
      '\\text{第二类}: \\; \\text{至少一个单侧极限不存在} \\;\\Rightarrow\\; \\text{无穷 / 振荡}',
      '\\text{连续} \\Rightarrow \\text{极限存在}; \\; \\text{反之不成立}'
    ],
    exam_text: '<b>【2016 真题改编】</b>f(x)=sin x / x（x≠0）在 x=0 处是什么间断点？补定义 f(0)=1 后呢？',
    exam_answer: '答案：x→0 时 sin x/x → 1，极限存在但 f(0) 未定义，所以 x=0 是<b>可去间断点</b>（第一类）。补充定义 f(0)=1 后，函数在 x=0 处连续。可去间断点的本质是「缺一个点」，补上就连续；跳跃间断点是「左右接了但不重合」，无论怎么补都不连续。',
    pitfalls: [
      '「极限存在」不等于「连续」——还必须等于函数值。',
      '第一类与第二类的分界：左右极限是否都存在（不是是否相等）。',
      '可去间断点补定义即可连续；跳跃间断点无法通过补充定义消除。'
    ],
    quiz: [
      { question: '左右极限都存在但不相等，是第几类间断点？', options: ['第一类（跳跃）', '第二类（无穷）', '第二类（振荡）'], correct: 0 },
      { question: '函数在某点连续必须满足？', options: ['极限存在即可', '左极限=右极限=函数值', '函数有定义即可'], correct: 1 },
      { question: '下列哪类间断点可以通过补充定义变成连续？', options: ['跳跃间断点', '可去间断点', '无穷间断点'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '连续的定义：左极限 = 右极限 = 函数值，三者合一' },
      { focus: 1, desc: '可去间断点：极限存在，但函数值缺失或不等（补点即连续）' },
      { focus: 2, desc: '跳跃间断点：左右极限都存在但不相等（补不起来）' },
      { focus: 3, desc: '第二类：无穷间断点（如 1/x）与振荡间断点（如 sin(1/x)）' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['连续的定义', '可去间断点', '跳跃间断点', '第二类间断点'][f]);
      const x0 = 100, y0 = 300, w = 640, h = 200;
      ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
      ln(g, x0, y0, x0, y0 - h, 'var(--border)', 1.4);
      if (f === 0) {
        plot(g, function (t) { return 0.5 + 0.3 * Math.sin(3 * t); }, x0, y0, w, h, 'var(--success)', 2.4);
        circ(g, x0 + w * 0.5, y0 - h * (0.5 + 0.3 * Math.sin(1.5)), 5, 'var(--highlight)');
        txt(g, x0 + w * 0.5 + 12, y0 - h * (0.5 + 0.3 * Math.sin(1.5)) - 10, 'f(x₀)', 'var(--highlight)', 11, 'start', '700');
        txt(g, 450, 345, '曲线不断开：lim f(x) = f(x₀)', 'var(--success)', 13, 'middle', '700');
      }
      if (f === 1) {
        plot(g, function (t) { return 0.35 + 0.4 * t; }, x0, y0, w, h, 'var(--primary)', 2.4);
        circ(g, x0 + w * 0.5, y0 - h * 0.55, 5, 'var(--bg-elevated)', 'var(--danger)', 2);
        circ(g, x0 + w * 0.5, y0 - h * 0.25, 5, 'var(--danger)');
        txt(g, x0 + w * 0.5 + 12, y0 - h * 0.55, '空心：该点无定义', 'var(--danger)', 11, 'start');
        txt(g, 450, 345, '极限存在 → 补上这个点就连续（可去）', 'var(--primary-strong)', 13, 'middle', '700');
      }
      if (f === 2) {
        plot(g, function (t) { return 0.3 + 0.3 * t; }, x0, y0, w * 0.48, h, 'var(--primary)', 2.4);
        plot(g, function (t) { return 0.62 + 0.25 * t; }, x0 + w * 0.48, y0, w * 0.52, h, 'var(--swap)', 2.4);
        circ(g, x0 + w * 0.48, y0 - h * 0.44, 4.5, 'var(--primary)');
        circ(g, x0 + w * 0.48, y0 - h * 0.62, 4.5, 'var(--swap)');
        txt(g, x0 + w * 0.5, y0 - h * 0.72, '跳！', 'var(--danger)', 13, 'middle', '700');
        txt(g, 450, 345, '左极限 ≠ 右极限，两者都存在 → 跳跃（第一类）', 'var(--swap)', 13, 'middle', '700');
      }
      if (f === 3) {
        for (let k = 0; k < 2; k++) {
          const ox = x0 + k * w * 0.55;
          plot(g, function (t) { return t < 0.45 ? 0.4 + 0.5 / (0.5 - t) * 0.06 : 0.4; }, ox, y0, w * 0.4, h, k ? 'var(--highlight)' : 'var(--primary)', 2.2);
        }
        txt(g, 250, 120, '无穷间断：1/x 型', 'var(--primary)', 12, 'middle', '700');
        txt(g, 650, 120, '振荡：sin(1/x)', 'var(--highlight)', 12, 'middle', '700');
        for (let i = 0; i < 7; i++) {
          circ(g, 560 + i * 13, 200 + (i % 2 ? -14 : 14), 2.2, 'var(--highlight)');
        }
        txt(g, 450, 345, '至少一个单侧极限不存在 → 第二类间断点', 'var(--danger)', 13, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-07', level: 'C', title: '闭区间上连续函数的性质',
    intuition: '闭区间 [a,b] 上连续的函数是「最乖」的函数，有四大性质：<strong>有界性</strong>（函数值不会跑到无穷）、<strong>最值定理</strong>（一定能取到最大值和最小值）、<strong>介值定理</strong>（能取到最大最小值之间的任何值）、<strong>零点定理</strong>（f(a)·f(b)<0 则中间必有零点）。注意条件缺一不可：必须是「闭区间」且「连续」——开区间或含间断点都会失效。',
    derivation: [
      '\\text{有界性}: \\; \\exists M>0,\\; |f(x)|\\le M,\\; \\forall x\\in[a,b]',
      '\\text{最值定理}: \\; \\exists \\xi_1,\\xi_2 \\in [a,b],\\; f(\\xi_1)=\\min f,\\; f(\\xi_2)=\\max f',
      '\\text{介值定理}: \\; \\mu \\in [\\min f, \\max f] \\Rightarrow \\exists \\xi,\\, f(\\xi)=\\mu',
      '\\text{零点定理}: \\; f(a)f(b)<0 \\Rightarrow \\exists \\xi\\in(a,b),\\; f(\\xi)=0'
    ],
    exam_text: '<b>【2019 真题改编】</b>证明方程 x³ − 4x² + 1 = 0 在区间 (0,1) 内至少有一个根。',
    exam_answer: '答案：令 f(x)=x³−4x²+1，f 在 [0,1] 上连续。f(0)=1>0，f(1)=1−4+1=−2<0，由<b>零点定理</b>，存在 ξ∈(0,1) 使 f(ξ)=0，即方程在 (0,1) 内至少有一个根。这是零点定理的标准用法：构造函数 → 验证闭区间连续 → 端点异号 → 得结论。',
    pitfalls: [
      '零点定理只保证「存在」，不保证「唯一」；唯一性要再加单调性（导数不变号）。',
      '条件不能弱化：开区间上连续未必有最值（如 f(x)=x 在 (0,1)），有间断点也失效。',
      '介值定理的 μ 必须介于最大值与最小值之间，而不是任意实数。'
    ],
    quiz: [
      { question: '零点定理成立的条件是？', options: ['开区间连续且端点异号', '闭区间连续且端点异号', '闭区间可导'], correct: 1 },
      { question: '闭区间连续函数一定？', options: ['可导', '有界且有最值', '单调'], correct: 1 },
      { question: '介值定理中的 μ 应满足？', options: ['任意实数', '介于最小值与最大值之间', '等于端点值'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '有界性：闭区间连续函数的值域被「框住」' },
      { focus: 1, desc: '最值定理：一定能取到最高点和最低点' },
      { focus: 2, desc: '介值定理：最大最小值之间的每个高度都被曲线经过' },
      { focus: 3, desc: '零点定理：端点异号 → 曲线必穿过 x 轴' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['有界性', '最值定理', '介值定理', '零点定理'][f]);
      const x0 = 90, y0 = 320, w = 700, h = 230;
      ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
      ln(g, x0, y0, x0, y0 - h, 'var(--border)', 1.4);
      const curve = function (t) { return 0.45 + 0.35 * Math.sin(2.2 * t - 0.6); };
      if (f >= 0) plot(g, curve, x0, y0, w, h, 'var(--primary)', 2.4);
      if (f === 0) {
        ln(g, x0, y0 - h * 0.86, x0 + w, y0 - h * 0.86, 'var(--danger)', 1.6, '6,4');
        ln(g, x0, y0 - h * 0.08, x0 + w, y0 - h * 0.08, 'var(--danger)', 1.6, '6,4');
        txt(g, x0 + 12, y0 - h * 0.86 - 8, '上界 M', 'var(--danger)', 11, 'start');
        txt(g, x0 + 12, y0 - h * 0.08 - 8, '下界 −M', 'var(--danger)', 11, 'start');
        txt(g, 450, 350, '整条曲线被两条水平线夹住 → 有界', 'var(--primary-strong)', 13, 'middle', '700');
      }
      if (f === 1) {
        let mi = 0, ma = 0;
        for (let i = 0; i <= 100; i++) { const v = curve(i / 100); if (v < curve(mi / 100)) mi = i; if (v > curve(ma / 100)) ma = i; }
        circ(g, x0 + w * ma / 100, y0 - h * curve(ma / 100), 6, 'var(--highlight)');
        circ(g, x0 + w * mi / 100, y0 - h * curve(mi / 100), 6, 'var(--success)');
        txt(g, x0 + w * ma / 100, y0 - h * curve(ma / 100) - 14, '最大值', 'var(--highlight)', 11, 'middle', '700');
        txt(g, x0 + w * mi / 100, y0 - h * curve(mi / 100) + 22, '最小值', 'var(--success)', 11, 'middle', '700');
      }
      if (f === 2) {
        const mu = 0.5;
        ln(g, x0, y0 - h * mu, x0 + w, y0 - h * mu, 'var(--highlight)', 1.6, '6,4');
        let px = 0;
        for (let i = 0; i <= 100; i++) { if (Math.abs(curve(i / 100) - mu) < 0.01) { px = i; break; } }
        circ(g, x0 + w * px / 100, y0 - h * mu, 6, 'var(--highlight)');
        txt(g, x0 + w * px / 100 + 14, y0 - h * mu + 4, 'f(ξ)=μ', 'var(--highlight)', 11, 'start', '700');
        txt(g, 450, 350, '任给一个介于 min 与 max 之间的高度，都能找到对应的 ξ', 'var(--highlight)', 12.5, 'middle', '700');
      }
      if (f === 3) {
        ln(g, x0, y0 - h * 0.42, x0 + w, y0 - h * 0.42, 'var(--text-muted)', 1.4);
        circ(g, x0 + 4, y0 - h * 0.42, 4, 'var(--text-muted)');
        txt(g, x0 - 6, y0 - h * 0.42 + 4, 'a', 'var(--text-muted)', 12, 'end');
        txt(g, x0 + w + 6, y0 - h * 0.42 + 4, 'b', 'var(--text-muted)', 12, 'start');
        let roots = [];
        let prev = curve(0) - 0.42;
        for (let i = 1; i <= 100; i++) {
          const v = curve(i / 100) - 0.42;
          if (prev * v < 0) roots.push(i);
          prev = v;
        }
        roots.forEach(function (r) { circ(g, x0 + w * r / 100, y0 - h * 0.42, 6, 'var(--danger)'); });
        txt(g, 450, 350, 'f(a) 与 f(b) 异号 → 曲线至少穿过 x 轴一次（可能有多个根）', 'var(--danger)', 12.5, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-09', level: 'C', title: '可导与连续的关系',
    intuition: '一句话：<strong>可导一定连续，连续不一定可导</strong>。可导是「更强的要求」——不仅不能断，还必须「光滑」（左右导数相等，没有尖角）。经典反例：f(x)=|x| 在 x=0 连续但不可导（左导 −1，右导 +1，尖点处没有唯一切线）；f(x)=x^(1/3) 在 x=0 连续但导数无穷（垂直切线）。',
    derivation: [
      'f\'(x_0)=\\lim_{\\Delta x\\to0}\\frac{f(x_0+\\Delta x)-f(x_0)}{\\Delta x}',
      '\\text{可导} \\Rightarrow \\text{连续} \\; (\\text{必要条件：连续是可导的前提})',
      'f(x)=|x|: \\; f\'_-(0)=-1,\\; f\'_+(0)=1 \\Rightarrow \\text{不可导}',
      '\\text{连续} \\nRightarrow \\text{可导}: \\; \\text{尖点、垂直切线、振荡均导致不可导}'
    ],
    exam_text: '<b>【2017 真题改编】</b>f(x)=|x| 在 x=0 处连续吗？可导吗？为什么？',
    exam_answer: '答案：<b>连续但不可导</b>。连续：lim(x→0)|x|=0=|f(0)|。不可导：左导数 f′₋(0)=lim(h→0⁻)(|h|−0)/h=−1，右导数 f′₊(0)=+1，左右导数不相等，故 f′(0) 不存在。几何上表现为 x=0 处有一个「尖点」，无法作唯一一条切线。',
    pitfalls: [
      '「连续」是「可导」的必要条件，不是充分条件——不要把箭头方向搞反。',
      '分段函数在分界点的可导性必须分别算左右导数，相等才可导。',
      '导数无穷大（垂直切线）也属于「不可导」，不能说「导数为无穷所以可导」。'
    ],
    quiz: [
      { question: '可导与连续的关系是？', options: ['可导必连续', '连续必可导', '互不相关'], correct: 0 },
      { question: '|x| 在 x=0 处？', options: ['可导且导数为0', '连续但不可导', '不连续'], correct: 1 },
      { question: '下列哪种情况一定不可导？', options: ['左右导数相等', '左右导数不相等', '函数值为0'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '可导的定义：差商的极限存在（左右导数相等）' },
      { focus: 1, desc: '可导 ⇒ 连续：能作切线的地方，曲线必然连着' },
      { focus: 2, desc: '连续 ⇏ 可导：|x| 的尖点，左右导数 −1 与 +1' },
      { focus: 3, desc: '其他不可导情形：垂直切线、振荡（如 x·sin(1/x)）' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['导数的定义', '可导 ⇒ 连续', '尖点反例', '垂直切线与振荡'][f]);
      const x0 = 110, y0 = 290, w = 620, h = 200;
      ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
      ln(g, x0 + w / 2, y0 + 40, x0 + w / 2, y0 - h - 20, 'var(--border)', 1.2, '4,4');
      if (f === 0) {
        plot(g, function (t) { return 0.3 + 0.5 * t * t; }, x0, y0, w, h, 'var(--primary)', 2.2);
        const px = x0 + w * 0.5, py = y0 - h * (0.3 + 0.5 * 0.25);
        circ(g, px, py, 5.5, 'var(--highlight)');
        ln(g, px - 60, py + 48, px + 60, py - 48, 'var(--highlight)', 2);
        txt(g, px + 74, py - 54, '切线', 'var(--highlight)', 11, 'start', '700');
        txt(g, 450, 350, '差商 (f(x₀+Δx)−f(x₀))/Δx 的极限 = 切线斜率', 'var(--primary-strong)', 12.5, 'middle', '700');
      }
      if (f === 1) {
        plot(g, function (t) { return 0.25 + 0.55 * Math.sin(2.4 * t); }, x0, y0, w, h, 'var(--success)', 2.4);
        txt(g, 450, 350, '曲线光滑无断点 → 每点都有唯一切线 → 可导 ⇒ 连续', 'var(--success)', 12.5, 'middle', '700');
      }
      if (f === 2) {
        const cx = x0 + w / 2, cy = y0 - h * 0.35;
        ln(g, cx - 220, cy + 110, cx, cy, 'var(--danger)', 2.6);
        ln(g, cx, cy, cx + 220, cy + 110, 'var(--swap)', 2.6);
        circ(g, cx, cy, 6, 'var(--highlight)');
        txt(g, cx, cy - 16, '尖点', 'var(--highlight)', 12, 'middle', '700');
        txt(g, cx - 120, cy + 74, '左导 = −1', 'var(--danger)', 11.5, 'middle', '700');
        txt(g, cx + 120, cy + 74, '右导 = +1', 'var(--swap)', 11.5, 'middle', '700');
        txt(g, 450, 350, 'f(x)=|x|：连续但在 x=0 处左右导数不等 → 不可导', 'var(--danger)', 12.5, 'middle', '700');
      }
      if (f === 3) {
        g.selectAll('*').remove();
        title(g, '其他不可导情形');
        box(g, 70, 70, 360, 230, 'var(--primary)', 0.08);
        txt(g, 250, 105, '垂直切线', 'var(--primary-strong)', 15, 'middle', '700');
        g.append('path').attr('d', 'M 250 280 L 250 130').attr('stroke', 'var(--primary)').attr('stroke-width', 2.6);
        txt(g, 250, 130 - 10, 'x = 0 处导数无穷', 'var(--text-muted)', 11.5);
        box(g, 470, 70, 360, 230, 'var(--highlight)', 0.08);
        txt(g, 650, 105, '振荡（x·sin(1/x)）', 'var(--highlight)', 15, 'middle', '700');
        let d = 'M 490 200';
        for (let i = 0; i < 90; i++) {
          const t = i / 90, x = 490 + t * 320;
          const y = 200 + 50 * t * Math.sin(40 / (t + 0.06));
          d += ' L ' + x.toFixed(1) + ' ' + y.toFixed(1);
        }
        g.append('path').attr('d', d).attr('fill', 'none').attr('stroke', 'var(--highlight)').attr('stroke-width', 1.6);
        txt(g, 450, 340, '在 0 附近无限振荡 → 差商极限不存在 → 不可导', 'var(--text-muted)', 12);
      }
    }
  },
  {
    id: 'MA-10', level: 'B', title: '求导法则（四则运算、复合函数、隐函数、参数方程、反函数）',
    intuition: '求导的核心工具链：<strong>四则法则</strong>（和差直接拆、乘积 (uv)′=u′v+uv′、商法则）、<strong>复合函数链式法则</strong>（dy/dx = dy/du · du/dx，洋葱一层层剥）、<strong>隐函数求导</strong>（方程两边同时对 x 求导，把 y 当 y(x)）、<strong>参数方程求导</strong>（dy/dx = y′(t)/x′(t)）、<strong>反函数求导</strong>（dx/dy = 1/(dy/dx)）。',
    derivation: [
      "(uv)' = u'v + uv', \\qquad \\left(\\frac{u}{v}\\right)' = \\frac{u'v-uv'}{v^2}",
      "\\text{链式}: \\; \\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}",
      "\\text{参数方程}: \\; \\frac{dy}{dx} = \\frac{y'(t)}{x'(t)}",
      "\\text{反函数}: \\; \\frac{dx}{dy} = \\frac{1}{dy/dx}"
    ],
    exam_text: '<b>【2020 真题改编】</b>设 y = sin(x²)，求 y′；设 x = t − sin t, y = 1 − cos t，求 dy/dx。',
    exam_answer: '答案：① y=sin(x²) 是复合函数，外层 sin 导数为 cos(x²)，内层 x² 导数为 2x，故 <b>y′ = 2x·cos(x²)</b>。② 参数方程：x′(t)=1−cos t，y′(t)=sin t，故 <b>dy/dx = sin t / (1−cos t)</b>。链式法则的关键是「由外向内、逐层相乘」，不要漏掉内层导数。',
    pitfalls: [
      '乘积法则不是「各自求导再相乘」——必须用 (uv)′=u′v+uv′。',
      '链式法则极易漏乘内层导数（如 sin 2x 的导数应为 2cos 2x）。',
      '参数方程求导是 y′(t)/x′(t)，不是 x′(t)/y′(t)——分子分母别弄反。'
    ],
    quiz: [
      { question: '(uv)′ 等于？', options: ["u′v′", "u′v + uv′", "u′v − uv′"], correct: 1 },
      { question: 'y = e^(2x) 的导数是？', options: ['e^(2x)', '2e^(2x)', '2xe^(2x)'], correct: 1 },
      { question: '参数方程 dy/dx 等于？', options: ["x′(t)/y′(t)", "y′(t)/x′(t)", "y(t)/x(t)"], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '四则法则：和差、乘积、商各自的计算规则' },
      { focus: 1, desc: '复合函数链式法则：洋葱式逐层求导相乘' },
      { focus: 2, desc: '隐函数求导：方程两边对 x 求导，y 视为 y(x)' },
      { focus: 3, desc: '参数方程与反函数：dy/dx = y′/x′，dx/dy = 1/(dy/dx)' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['四则法则', '链式法则', '隐函数求导', '参数方程 / 反函数'][f]);
      if (f === 0) {
        const rows = [["(u ± v)′ = u′ ± v′", '和差：直接拆开'], ["(uv)′ = u′v + uv′", '乘积：轮流求导相加'], ["(u/v)′ = (u′v − uv′)/v²", '商：分子减、分母平方']];
        rows.forEach(function (r, i) {
          box(g, 80, 80 + i * 90, 740, 74, ['var(--primary)', 'var(--success)', 'var(--highlight)'][i], 0.1);
          txt(g, 110, 112 + i * 90, r[0], 'var(--text)', 14, 'start', '700');
          txt(g, 110, 138 + i * 90, r[1], 'var(--text-muted)', 11.5, 'start');
        });
        txt(g, 450, 370, '记忆：乘积「前导后不导 + 前不导后导」', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        [['y = sin(u)', 660, 90], ['u = x²', 660, 200]].forEach(function (n) {
          box(g, 470, n[2] - 40, 200, 66, 'var(--primary)', 0.1);
          txt(g, 570, n[2] + 2, n[0], 'var(--text)', 14);
        });
        box(g, 90, 140, 240, 70, 'var(--success)', 0.12);
        txt(g, 210, 172, 'dy/dx = ?', 'var(--success)', 15, 'middle', '700');
        arw(g, 330, 175, 470, 120, 'var(--highlight)');
        arw(g, 330, 175, 470, 205, 'var(--highlight)');
        txt(g, 700, 300, "dy/dx = dy/du · du/dx", 'var(--primary-strong)', 14, 'middle', '700');
        txt(g, 700, 330, '= cos(u) · 2x = 2x·cos(x²)', 'var(--text)', 13);
        txt(g, 450, 370, '由外向内，逐层求导、逐层相乘', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 80, 70, 740, 70, 'var(--highlight)', 0.08);
        txt(g, 450, 100, '方程 F(x,y)=0 两边同时对 x 求导', 'var(--highlight)', 14, 'middle', '700');
        txt(g, 450, 124, '把 y 看作 y(x)，遇到 y 就乘 y′', 'var(--text-muted)', 11.5);
        box(g, 180, 175, 540, 70, 'var(--primary)', 0.08);
        txt(g, 450, 205, '例：x² + y² = 1', 'var(--text)', 14, 'middle', '700');
        txt(g, 450, 230, '2x + 2y·y′ = 0  ⟹  y′ = −x/y', 'var(--primary-strong)', 13);
        txt(g, 450, 300, '关键：y² 求导得 2y·y′（链式法则的隐式应用）', 'var(--text-muted)', 12);
        txt(g, 450, 335, '别忘了 y′ 这一项！', 'var(--danger)', 12.5, 'middle', '700');
      }
      if (f === 3) {
        box(g, 70, 70, 360, 220, 'var(--primary)', 0.08);
        txt(g, 250, 105, '参数方程', 'var(--primary-strong)', 15, 'middle', '700');
        txt(g, 250, 145, 'x = x(t),  y = y(t)', 'var(--text)', 13);
        txt(g, 250, 190, 'dy/dx = y′(t) / x′(t)', 'var(--highlight)', 15, 'middle', '700');
        txt(g, 250, 230, '例：x=t−sin t, y=1−cos t', 'var(--text-muted)', 11.5);
        txt(g, 250, 255, 'dy/dx = sin t/(1−cos t)', 'var(--text)', 12);
        box(g, 470, 70, 360, 220, 'var(--success)', 0.08);
        txt(g, 650, 105, '反函数', 'var(--success)', 15, 'middle', '700');
        txt(g, 650, 145, 'y = f(x) 的反函数 x = f⁻¹(y)', 'var(--text)', 13);
        txt(g, 650, 190, 'dx/dy = 1 / (dy/dx)', 'var(--highlight)', 15, 'middle', '700');
        txt(g, 650, 230, '即反函数导数 = 原函数导数的倒数', 'var(--text-muted)', 11.5);
        txt(g, 650, 255, '例：(arcsin x)′ = 1/√(1−x²)', 'var(--text)', 12);
      }
    }
  },
  {
    id: 'MA-13', level: 'B', title: '洛必达法则',
    intuition: '遇到 0/0 或 ∞/∞ 型极限，直接代入会「卡住」时，可以对分子分母<strong>分别求导</strong>再算极限：lim f/g = lim f′/g′。三个前提必须同时满足：<strong>① 是 0/0 或 ∞/∞ 型</strong>；② 分子分母在去心邻域内可导且 g′≠0；③ 求导后的极限存在（或为 ∞）。其他类型（0·∞、∞−∞、1^∞ 等）要先化成这两种基本型。',
    derivation: [
      '\\lim\\frac{f(x)}{g(x)} = \\lim\\frac{f\'(x)}{g\'(x)} \\quad \\left(\\frac{0}{0}\\ \\text{或}\\ \\frac{\\infty}{\\infty}\\right)',
      '\\text{使用前提}: \\; \\text{未定式} + \\text{可导} + \\text{导数比极限存在}',
      '0\\cdot\\infty \\;\\Rightarrow\\; \\text{化为 } \\frac{0}{1/\\infty} \\;\\text{或}\\; \\frac{\\infty}{1/0}',
      '\\infty-\\infty \\;\\Rightarrow\\; \\text{通分}; \\quad 1^{\\infty},\\,0^0,\\,\\infty^0 \\;\\Rightarrow\\; \\text{取对数}'
    ],
    exam_text: '<b>【2017 真题改编】</b>求 lim(x→0) (e^x − 1 − x)/x²。',
    exam_answer: '答案：0/0 型，用洛必达：原式 = lim(e^x − 1)/(2x)，仍是 0/0，再次洛必达 = lim e^x/2 = <b>1/2</b>。也可以直接泰勒：e^x = 1 + x + x²/2 + o(x²)，代入得极限 1/2。洛必达适合「求导简单」的题，泰勒适合「展开已知」的题。',
    pitfalls: [
      '不是未定式（如 1/0、0/1）不能用洛必达，强行使用会得到错误答案。',
      '洛必达可以多次使用，但每一步都要重新验证是否仍是 0/0 或 ∞/∞。',
      '导数比的极限不存在时，洛必达失效（不能反推原极限不存在），需换方法。'
    ],
    quiz: [
      { question: '下列哪种类型可以直接用洛必达？', options: ['1/0', '0/0', '0·∞'], correct: 1 },
      { question: 'lim(x→0) sin x / x 用洛必达得？', options: ['0', '1', '∞'], correct: 1 },
      { question: '1^∞ 型应先如何处理？', options: ['直接洛必达', '取对数化为 0·∞', '代入计算'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '0/0 型：分子分母同时趋于 0，比值却可能有极限' },
      { focus: 1, desc: '洛必达：分子分母分别求导，再取极限' },
      { focus: 2, desc: '多次使用：每次求导后重新检查是否仍为未定式' },
      { focus: 3, desc: '其他未定式：0·∞、∞−∞、1^∞ 先转化再用' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['0/0 型', '洛必达', '多次使用', '其他未定式'][f]);
      const x0 = 110, y0 = 300, w = 620, h = 200;
      ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
      ln(g, x0 + 40, y0 + 30, x0 + 40, y0 - h - 10, 'var(--border)', 1.4);
      if (f === 0) {
        plot(g, function (t) { return 0.06 + 0.8 * t; }, x0 + 40, y0, w * 0.9, h, 'var(--primary)', 2.2);
        plot(g, function (t) { return 0.06 + 0.8 * t * t; }, x0 + 40, y0, w * 0.9, h, 'var(--success)', 2.2);
        txt(g, x0 + w * 0.62, y0 - h * 0.72, 'f(x)', 'var(--primary)', 12, 'start', '700');
        txt(g, x0 + w * 0.62, y0 - h * 0.35, 'g(x)', 'var(--success)', 12, 'start', '700');
        txt(g, 450, 350, '两者都 → 0，但比值 f/g 可能趋于非零常数', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 90, 80, 700, 80, 'var(--highlight)', 0.08);
        txt(g, 440, 112, 'lim f(x)/g(x) = lim f′(x)/g′(x)', 'var(--highlight)', 16, 'middle', '700');
        txt(g, 440, 140, '前提：0/0 或 ∞/∞ 型', 'var(--text-muted)', 11.5);
        txt(g, 450, 220, '例：lim(x→0) sin x / x', 'var(--text)', 13);
        txt(g, 450, 252, '= lim cos x / 1 = 1', 'var(--success)', 14, 'middle', '700');
        txt(g, 450, 300, '「分别求导」不是「商的求导法则」，别混淆！', 'var(--danger)', 12, 'middle', '700');
      }
      if (f === 2) {
        const rows = [['第 1 次', '(eˣ−1−x)/x²', '0/0', '→ (eˣ−1)/(2x)'], ['第 2 次', '(eˣ−1)/(2x)', '0/0', '→ eˣ/2'], ['结果', 'eˣ/2', 'x=0', '→ 1/2']];
        rows.forEach(function (r, i) {
          box(g, 90, 80 + i * 82, 720, 66, ['var(--primary)', 'var(--success)', 'var(--highlight)'][i], 0.1);
          txt(g, 115, 118 + i * 82, r[0], 'var(--text-muted)', 11.5, 'start', '700');
          txt(g, 200, 118 + i * 82, r[1], 'var(--text)', 13, 'start');
          txt(g, 430, 118 + i * 82, r[2], 'var(--danger)', 12, 'start');
          txt(g, 520, 118 + i * 82, r[3], 'var(--primary-strong)', 13, 'start');
        });
        txt(g, 450, 350, '每次求导后都要重新验证「是否仍是未定式」', 'var(--text-muted)', 12);
      }
      if (f === 3) {
        const rows = [['0·∞', '写成 0/(1/∞) 或 ∞/(1/0)', 'var(--compare)'], ['∞−∞', '通分或提取公因子', 'var(--swap)'], ['1^∞ / 0⁰ / ∞⁰', '取对数化为 0·∞', 'var(--highlight)']];
        rows.forEach(function (r, i) {
          box(g, 90, 80 + i * 90, 720, 74, r[2], 0.1);
          txt(g, 130, 124 + i * 90, r[0], r[2], 15, 'start', '700');
          txt(g, 380, 124 + i * 90, r[1], 'var(--text)', 13, 'start');
        });
        txt(g, 450, 360, '原则：一切未定式 → 化成 0/0 或 ∞/∞ → 洛必达', 'var(--primary-strong)', 12.5, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-16', level: 'B', title: '曲率与曲率半径（数一）',
    intuition: '曲率描述曲线「弯得有多厉害」：直线曲率为 0，半径越小弯得越急。<strong>曲率</strong> K = |y″| / (1+y′²)^(3/2)，<strong>曲率半径</strong> R = 1/K。曲率圆（密切圆）是与曲线在该点「最贴合」的圆，圆心在曲线凹向的法线上。工程上用曲率研究轨道设计、道路转弯半径等。',
    derivation: [
      'K = \\frac{|y\'\'|}{\\left(1+y\'^{2}\\right)^{3/2}}',
      'R = \\frac{1}{K} = \\frac{\\left(1+y\'^{2}\\right)^{3/2}}{|y\'\'|}',
      '\\text{参数方程}: \\; K = \\frac{|x\'y\'\' - y\'x\'\'|}{\\left(x\'^{2}+y\'^{2}\\right)^{3/2}}',
      '\\text{曲率中心}: \\; \\left(x - \\frac{y\'(1+y\'^{2})}{y\'\'},\\; y + \\frac{1+y\'^{2}}{y\'\'}\\right)'
    ],
    exam_text: '<b>【2018 真题改编】</b>求曲线 y = x² 在点 (1,1) 处的曲率与曲率半径。',
    exam_answer: '答案：y′=2x，y″=2，在 x=1 处 y′=2。K = |2| / (1+4)^(3/2) = 2 / 5√5 = <b>2√5/25</b>；R = 1/K = <b>5√5/2</b>。曲率越大（半径越小）说明该处弯得越急——抛物线顶点处最尖，向两侧逐渐变平。',
    pitfalls: [
      '公式分母是 (1+y′²)^(3/2)，指数是 3/2 不是 1/2，也不是 3。',
      '曲率恒非负（带绝对值），曲率半径也恒正。',
      '直线曲率为 0，曲率半径为无穷大（不是 0）。'
    ],
    quiz: [
      { question: '曲率 K 与曲率半径 R 的关系是？', options: ['R = K', 'R = 1/K', 'R = K²'], correct: 1 },
      { question: '直线的曲率是？', options: ['1', '0', '无穷'], correct: 1 },
      { question: 'y=x² 在 (1,1) 处曲率半径是？', options: ['5√5/2', '2√5/25', '√5'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '曲率：描述曲线弯曲程度，直线为 0' },
      { focus: 1, desc: '曲率公式：K = |y″|/(1+y′²)^(3/2)' },
      { focus: 2, desc: '曲率圆：与曲线最贴合的圆，半径 R = 1/K' },
      { focus: 3, desc: '曲率中心：凹向法线上距曲线 R 处' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['弯曲程度', '曲率公式', '曲率圆', '曲率中心'][f]);
      const x0 = 90, y0 = 320, w = 720, h = 260;
      ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
      ln(g, x0, y0, x0, y0 - h, 'var(--border)', 1.4);
      if (f === 0) {
        plot(g, function (t) { return 0.15 + 2.2 * t * t; }, x0, y0, w, h, 'var(--primary)', 2.4);
        txt(g, 220, 110, '弯得急 → K 大', 'var(--primary)', 12);
        txt(g, 640, 300, '接近平直 → K 小', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 120, 80, 660, 90, 'var(--highlight)', 0.08);
        txt(g, 450, 118, "K = |y″| / (1 + y′²)^(3/2)", 'var(--highlight)', 18, 'middle', '700');
        txt(g, 450, 148, '分子：二阶导数（弯曲的「加速度」）', 'var(--text-muted)', 11.5);
        txt(g, 450, 220, 'y = x² 在 (1,1)：y′=2, y″=2', 'var(--text)', 13);
        txt(g, 450, 255, 'K = 2/(1+4)^(3/2) = 2√5/25 ≈ 0.179', 'var(--primary-strong)', 14, 'middle', '700');
        txt(g, 450, 310, 'R = 1/K = 5√5/2 ≈ 5.59', 'var(--success)', 14, 'middle', '700');
      }
      if (f === 2) {
        plot(g, function (t) { return 0.2 + 1.6 * t * t; }, x0, y0, w, h, 'var(--primary)', 2.2);
        const px = x0 + w * 0.5, py = y0 - h * (0.2 + 1.6 * 0.25);
        circ(g, px, py, 6, 'var(--highlight)');
        const R = 90;
        g.append('circle').attr('cx', px).attr('cy', py - R).attr('r', R).attr('fill', 'none').attr('stroke', 'var(--success)').attr('stroke-width', 2).attr('stroke-dasharray', '5,4');
        ln(g, px, py, px, py - R, 'var(--success)', 1.6);
        txt(g, px + 8, py - R / 2, 'R', 'var(--success)', 12, 'start', '700');
        txt(g, 450, 350, '曲率圆（密切圆）：在该点与曲线相切且曲率相同', 'var(--success)', 12.5, 'middle', '700');
      }
      if (f === 3) {
        plot(g, function (t) { return 0.2 + 1.6 * t * t; }, x0, y0, w, h, 'var(--primary)', 2.2);
        const px = x0 + w * 0.5, py = y0 - h * (0.2 + 1.6 * 0.25);
        const R = 90, cy = py - R;
        circ(g, px, py, 6, 'var(--highlight)');
        circ(g, px, cy, 6, 'var(--danger)');
        ln(g, px, py, px, cy, 'var(--danger)', 1.8, '5,4');
        txt(g, px + 10, cy - 8, '曲率中心 (α, β)', 'var(--danger)', 11.5, 'start', '700');
        txt(g, 450, 350, '曲率中心在凹向一侧的法线上，距曲线 R', 'var(--danger)', 12.5, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-18', level: 'B', title: '弧微分',
    intuition: '弧微分 ds 是曲线上一小段弧长的「线性化」：ds ≈ √(dx² + dy²) = √(1+y′²) dx。它是曲线积分、弧长计算的基础——把曲线切成无数小段，每段近似为直线，累加即得弧长 s = ∫√(1+y′²) dx。参数方程下 ds = √(x′²+y′²) dt，极坐标下 ds = √(r²+r′²) dθ。',
    derivation: [
      'ds = \\sqrt{dx^{2}+dy^{2}} = \\sqrt{1+y\'^{2}}\\,dx',
      '\\text{参数方程}: \\; ds = \\sqrt{x\'(t)^{2}+y\'(t)^{2}}\\,dt',
      '\\text{极坐标}: \\; ds = \\sqrt{r^{2}+r\'^{2}}\\,d\\theta',
      's = \\int_{a}^{b}\\sqrt{1+y\'^{2}}\\,dx'
    ],
    exam_text: '<b>【2016 真题改编】</b>求曲线 y = (2/3)x^(3/2) 在 [0,1] 上的弧长。',
    exam_answer: '答案：y′ = x^(1/2)，√(1+y′²) = √(1+x)。弧长 s = ∫₀¹√(1+x) dx = (2/3)(1+x)^(3/2) |₀¹ = <b>(2/3)(2√2 − 1)</b>。弧微分公式的关键是「把 y′ 代进去、开根号、再积分」，注意积分限与被积变量一致。',
    pitfalls: [
      'ds = √(1+y′²)dx 中 y′ 是对 x 求导；参数方程要用 √(x′²+y′²)dt，别混用。',
      '弧长积分结果一定为正，若算出负数说明积分限或公式用反了。',
      '极坐标弧微分是 √(r²+r′²)，不是 √(1+r′²)——多一个 r² 项。'
    ],
    quiz: [
      { question: '直角坐标下弧微分 ds 等于？', options: ['√(1+y′)dx', '√(1+y′²)dx', '√(1+y″²)dx'], correct: 1 },
      { question: '参数方程的弧微分是？', options: ['√(x′²+y′²)dt', '√(1+y′²)dt', '√(x²+y²)dt'], correct: 0 },
      { question: '极坐标弧微分是？', options: ['√(1+r′²)dθ', '√(r²+r′²)dθ', '√(r²−r′²)dθ'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '把曲线切成无数小段，每段近似为直线段' },
      { focus: 1, desc: '勾股定理：ds = √(dx² + dy²)' },
      { focus: 2, desc: '提取 dx：ds = √(1+y′²) dx' },
      { focus: 3, desc: '积分求弧长：s = ∫√(1+y′²)dx' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['微元分割', '勾股关系', '弧微分公式', '积分求弧长'][f]);
      const x0 = 90, y0 = 320, w = 700, h = 240;
      ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
      ln(g, x0, y0, x0, y0 - h, 'var(--border)', 1.4);
      const curve = function (t) { return 0.15 + 1.5 * t * t; };
      plot(g, curve, x0, y0, w, h, 'var(--primary)', 2.4);
      if (f === 0) {
        for (let i = 0; i < 9; i++) {
          const t1 = i / 9, t2 = (i + 1) / 9;
          ln(g, x0 + w * t1, y0 - h * curve(t1), x0 + w * t2, y0 - h * curve(t2), 'var(--highlight)', 2.6);
        }
        txt(g, 450, 350, '曲线被切成小段，每段用直线近似', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        const t = 0.55, dx = 70, dy = 70 * (curve(t + 0.06) - curve(t)) / 0.06;
        const px = x0 + w * t, py = y0 - h * curve(t);
        ln(g, px, py, px + dx, py, 'var(--success)', 2.2);
        ln(g, px + dx, py, px + dx, py - dy, 'var(--swap)', 2.2);
        ln(g, px, py, px + dx, py - dy, 'var(--highlight)', 2.4);
        txt(g, px + dx / 2, py + 18, 'dx', 'var(--success)', 12, 'middle', '700');
        txt(g, px + dx + 12, py - dy / 2, 'dy', 'var(--swap)', 12, 'start', '700');
        txt(g, px + dx / 2 - 10, py - dy / 2 - 8, 'ds', 'var(--highlight)', 12, 'middle', '700');
        txt(g, 450, 350, 'ds² = dx² + dy²（勾股定理）', 'var(--highlight)', 12.5, 'middle', '700');
      }
      if (f === 2) {
        box(g, 120, 80, 660, 100, 'var(--highlight)', 0.08);
        txt(g, 450, 118, 'ds = √(dx² + dy²) = √(1 + (dy/dx)²) dx', 'var(--highlight)', 16, 'middle', '700');
        txt(g, 450, 150, '提取 dx 后，dy/dx 就是导数 y′', 'var(--text-muted)', 11.5);
        txt(g, 450, 220, '直角坐标：ds = √(1+y′²) dx', 'var(--primary-strong)', 14, 'middle', '700');
        txt(g, 450, 255, '参数方程：ds = √(x′²+y′²) dt', 'var(--success)', 13);
        txt(g, 450, 285, '极坐标：ds = √(r²+r′²) dθ', 'var(--swap)', 13);
      }
      if (f === 3) {
        box(g, 140, 80, 620, 80, 'var(--primary)', 0.08);
        txt(g, 450, 118, 's = ∫ₐᵇ √(1+y′²) dx', 'var(--primary-strong)', 17, 'middle', '700');
        txt(g, 450, 150, '把无数小段 ds 累加 = 曲线总长', 'var(--text-muted)', 11.5);
        txt(g, 450, 215, '例：y = (2/3)x^(3/2)，y′ = √x', 'var(--text)', 13);
        txt(g, 450, 248, 's = ∫₀¹√(1+x) dx = (2/3)(2√2 − 1)', 'var(--success)', 14, 'middle', '700');
        txt(g, 450, 300, '注意积分变量与积分限的对应', 'var(--text-muted)', 12);
      }
    }
  },
  {
    id: 'MA-19', level: 'B', title: '不定积分的概念与性质',
    intuition: '求导的逆运算就是积分：F′(x)=f(x) 则 F 是 f 的一个原函数。原函数不唯一——加任意常数 C 后仍是原函数，所以<strong>不定积分</strong>写作 ∫f(x)dx = F(x) + C，表示「全体原函数」的集合。基本性质：线性性（∫[af+bg] = a∫f + b∫g）、求导与积分互逆（(∫f dx)′ = f）。',
    derivation: [
      'F\'(x)=f(x) \\Rightarrow \\int f(x)\\,dx = F(x) + C',
      '\\left(\\int f(x)\\,dx\\right)\' = f(x), \\qquad \\int F\'(x)\\,dx = F(x)+C',
      '\\int [af(x)+bg(x)]dx = a\\int f\\,dx + b\\int g\\,dx',
      '\\int x^{n}dx = \\frac{x^{n+1}}{n+1}+C \\; (n\\neq -1)'
    ],
    exam_text: '<b>【2015 真题改编】</b>若 F(x) 是 f(x) 的一个原函数，则 ∫f(x)dx = ? 为什么必须加 C？',
    exam_answer: '答案：∫f(x)dx = <b>F(x) + C</b>。因为若 F′(x)=f(x)，则 (F(x)+C)′=f(x) 对任意常数 C 都成立——所有相差常数的函数都是同一个 f 的原函数。不定积分表示「全体原函数」的集合，C 不可省略；而在定积分中常数会被上下限消掉，所以定积分结果是确定的数。',
    pitfalls: [
      '不定积分结果必须加 C，漏写 C 是最高频失分点。',
      '∫xⁿdx = x^(n+1)/(n+1)+C 中 n≠−1；n=−1 时是 ln|x|+C。',
      '「原函数存在」与「可积」不同：连续函数一定有原函数，但有原函数不一定可积（黎曼意义）。'
    ],
    quiz: [
      { question: '∫f(x)dx 表示？', options: ['一个原函数', '全体原函数', 'f(x) 的导数'], correct: 1 },
      { question: '∫x²dx 等于？', options: ['x³/3 + C', '2x + C', 'x³ + C'], correct: 0 },
      { question: '为什么不定积分要加常数 C？', options: ['习惯写法', '原函数不唯一，相差常数', '防止符号错误'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '求导与积分互逆：F′ = f ⟺ F 是 f 的原函数' },
      { focus: 1, desc: '原函数不唯一：加任意常数 C 仍是原函数' },
      { focus: 2, desc: '不定积分 = 全体原函数，写作 F(x) + C' },
      { focus: 3, desc: '基本积分表：幂函数、指数、三角函数的原函数' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['互逆运算', '原函数族', '不定积分', '基本积分表'][f]);
      const x0 = 110, y0 = 300, w = 640, h = 210;
      ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
      ln(g, x0, y0, x0, y0 - h, 'var(--border)', 1.4);
      if (f === 0) {
        box(g, 140, 100, 240, 80, 'var(--primary)', 0.1);
        txt(g, 260, 145, 'F(x)', 'var(--primary-strong)', 20, 'middle', '700');
        box(g, 520, 100, 240, 80, 'var(--success)', 0.1);
        txt(g, 640, 145, 'f(x)', 'var(--success)', 20, 'middle', '700');
        arw(g, 390, 125, 510, 125, 'var(--highlight)');
        arw(g, 510, 158, 390, 158, 'var(--swap)');
        txt(g, 450, 116, '求导', 'var(--highlight)', 11, 'middle', '700');
        txt(g, 450, 182, '积分', 'var(--swap)', 11, 'middle', '700');
        txt(g, 450, 260, 'F′(x) = f(x)  ⟺  ∫f(x)dx = F(x) + C', 'var(--text)', 13);
      }
      if (f === 1) {
        for (let k = -2; k <= 3; k++) {
          plot(g, function (t) { return 0.25 + 0.5 * t * t + k * 0.06; }, x0, y0, w * 0.75, h, k === 0 ? 'var(--highlight)' : 'var(--border)', k === 0 ? 2.6 : 1.4);
        }
        txt(g, 700, 130, '同一族曲线', 'var(--highlight)', 12, 'start', '700');
        txt(g, 700, 154, '仅相差常数 C', 'var(--text-muted)', 11, 'start');
        txt(g, 450, 350, '每条曲线都是 f 的原函数，彼此平移', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 100, 80, 700, 90, 'var(--success)', 0.08);
        txt(g, 450, 122, '∫ f(x) dx = F(x) + C', 'var(--success)', 20, 'middle', '700');
        txt(g, 450, 152, 'C 为任意常数 → 表示全体原函数', 'var(--text-muted)', 11.5);
        txt(g, 450, 220, '(∫f dx)′ = f(x)', 'var(--primary-strong)', 14);
        txt(g, 450, 252, '∫F′(x)dx = F(x) + C', 'var(--primary-strong)', 14);
        txt(g, 450, 300, '先积后导 = 原函数；先导后积 = 原函数 + C', 'var(--text-muted)', 12);
      }
      if (f === 3) {
        const rows = [['∫xⁿdx', 'x^(n+1)/(n+1)+C (n≠−1)'], ['∫(1/x)dx', 'ln|x| + C'], ['∫eˣdx', 'eˣ + C'], ['∫sin x dx', '−cos x + C'], ['∫cos x dx', 'sin x + C'], ['∫1/(1+x²)dx', 'arctan x + C']];
        rows.forEach(function (r, i) {
          const y = 60 + i * 50;
          box(g, 110, y, 300, 40, 'var(--primary)', 0.08);
          txt(g, 130, y + 26, r[0], 'var(--text)', 12.5, 'start', '700');
          txt(g, 440, y + 26, r[1], 'var(--success)', 12.5, 'start');
        });
      }
    }
  },
  {
    id: 'MA-20', level: 'B', title: '换元积分法（第一类、第二类）',
    intuition: '换元积分是「反向链式法则」：<strong>第一类（凑微分）</strong>——∫f(φ(x))φ′(x)dx = ∫f(u)du，把 φ′(x)dx 凑成 du，适合「内层导数恰好出现」的题；<strong>第二类（变量代换）</strong>——令 x=ψ(t)，把根号、分母等难处理的结构换掉，dx=ψ′(t)dt。两类方向相反：第一类是「看出内层」，第二类是「主动换掉外层」。',
    derivation: [
      '\\text{第一类}: \\; \\int f(\\varphi(x))\\varphi\'(x)dx = \\int f(u)du \\; (u=\\varphi(x))',
      '\\text{第二类}: \\; \\int f(x)dx = \\int f(\\psi(t))\\psi\'(t)dt \\; (x=\\psi(t))',
      '\\text{三角代换}: \\; \\sqrt{a^{2}-x^{2}} \\to x=a\\sin t',
      '\\text{根式代换}: \\; \\sqrt[n]{ax+b} = t'
    ],
    exam_text: '<b>【2017 真题改编】</b>求 ∫2x·cos(x²)dx。',
    exam_answer: '答案：令 u = x²，则 du = 2x dx，原式 = ∫cos u du = <b>sin u + C = sin(x²) + C</b>。这是第一类换元（凑微分）：观察到 2x 正好是 x² 的导数，把 2x dx 整体凑成 du。凑微分的关键是「熟记常见导数形式」，如 x dx ↔ d(x²/2)、dx/x ↔ d(ln x)。',
    pitfalls: [
      '第一类换元后必须把 u 换回 x，不能留着 u 当答案。',
      '第二类换元（三角代换）最后要回代：由 x=a sin t 反解 t=arcsin(x/a)。',
      '定积分换元时积分限也要跟着换（或换回原变量后再代限），漏换限是最常见错误。'
    ],
    quiz: [
      { question: '∫2x·cos(x²)dx 的结果是？', options: ['sin(x²)+C', 'cos(x²)+C', '2sin(x²)+C'], correct: 0 },
      { question: '第一类换元法的本质是？', options: ['反向链式法则', '分部积分', '泰勒展开'], correct: 0 },
      { question: '遇到 √(a²−x²) 常用什么代换？', options: ['x = a sin t', 'x = a tan t', 'x = a sec t'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '第一类：把内层导数「凑」成 du' },
      { focus: 1, desc: '第一类示例：∫2x·cos(x²)dx = sin(x²)+C' },
      { focus: 2, desc: '第二类：主动令 x=ψ(t)，换掉难处理的结构' },
      { focus: 3, desc: '三角代换表：√(a²−x²)、√(a²+x²)、√(x²−a²) 各有对应' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['凑微分', '第一类示例', '第二类代换', '三角代换表'][f]);
      if (f === 0) {
        box(g, 100, 80, 700, 80, 'var(--primary)', 0.08);
        txt(g, 450, 115, '∫ f(φ(x)) · φ′(x) dx = ∫ f(u) du', 'var(--primary-strong)', 16, 'middle', '700');
        txt(g, 450, 145, '内层函数 φ(x) 的导数恰好也在被积式里', 'var(--text-muted)', 11.5);
        [['u = φ(x)', 210], ['du = φ′(x)dx', 450], ['换回 x', 690]].forEach(function (b, i) {
          chip(g, b[1] - 90, 210, 180, 56, b[0], ['var(--success)', 'var(--highlight)', 'var(--swap)'][i]);
        });
        arw(g, 300, 238, 360, 238, 'var(--text-muted)');
        arw(g, 540, 238, 600, 238, 'var(--text-muted)');
        txt(g, 450, 320, '口诀：看到「内层 × 内层导数」就想凑微分', 'var(--highlight)', 12.5, 'middle', '700');
      }
      if (f === 1) {
        const rows = [['原式', '∫2x·cos(x²)dx', 'var(--text)'], ['令 u = x²', 'du = 2x dx', 'var(--primary)'], ['换元', '∫cos u du', 'var(--success)'], ['积分', 'sin u + C', 'var(--highlight)'], ['回代', 'sin(x²) + C', 'var(--swap)']];
        rows.forEach(function (r, i) {
          const y = 55 + i * 58;
          box(g, 120, y, 660, 46, r[2], 0.1);
          txt(g, 145, y + 29, r[0], 'var(--text-muted)', 11.5, 'start', '700');
          txt(g, 300, y + 29, r[1], r[2], 13.5, 'start', '700');
        });
      }
      if (f === 2) {
        box(g, 100, 80, 700, 80, 'var(--primary)', 0.08);
        txt(g, 450, 115, '令 x = ψ(t)  ⟹  dx = ψ′(t) dt', 'var(--primary-strong)', 16, 'middle', '700');
        txt(g, 450, 145, '把「关于 x 的难积分」换成「关于 t 的好积分」', 'var(--text-muted)', 11.5);
        txt(g, 450, 210, '例：∫√(1−x²)dx，令 x=sin t', 'var(--text)', 13);
        txt(g, 450, 242, '= ∫cos²t dt = t/2 + sin2t/4 + C', 'var(--success)', 13);
        txt(g, 450, 274, '= (arcsin x)/2 + x√(1−x²)/2 + C', 'var(--highlight)', 13);
        txt(g, 450, 320, '回代：由 x = sin t 得 t = arcsin x', 'var(--text-muted)', 12);
      }
      if (f === 3) {
        const rows = [['√(a²−x²)', 'x = a sin t', '1−sin²t = cos²t', 'var(--primary)'], ['√(a²+x²)', 'x = a tan t', '1+tan²t = sec²t', 'var(--success)'], ['√(x²−a²)', 'x = a sec t', 'sec²t−1 = tan²t', 'var(--highlight)']];
        rows.forEach(function (r, i) {
          const y = 75 + i * 85;
          box(g, 80, y, 740, 70, r[3], 0.1);
          txt(g, 110, y + 42, r[0], r[3], 15, 'start', '700');
          txt(g, 320, y + 42, r[1], 'var(--text)', 13, 'start', '700');
          txt(g, 500, y + 42, r[2], 'var(--text-muted)', 11.5, 'start');
        });
        txt(g, 450, 350, '代换后记得用三角恒等式化简根号', 'var(--text-muted)', 12);
      }
    }
  },
  {
    id: 'MA-21', level: 'B', title: '分部积分法',
    intuition: '分部积分是「乘积求导法则的逆用」：∫u dv = uv − ∫v du。适用场景：被积函数是<strong>两类不同函数的乘积</strong>（如 x·eˣ、x·sin x、ln x、arctan x）。选择 u 的顺序遵循「<strong>反对幂指三</strong>」：反三角、对数、幂函数、指数、三角——排在前面的优先当 u，因为它求导后会变简单。',
    derivation: [
      '\\int u\\,dv = uv - \\int v\\,du',
      '\\text{选 u 顺序}: \\; \\text{反三角} > \\text{对数} > \\text{幂} > \\text{指数} > \\text{三角}',
      '\\int x e^{x}dx = xe^{x} - e^{x} + C',
      '\\int \\ln x\\,dx = x\\ln x - x + C'
    ],
    exam_text: '<b>【2018 真题改编】</b>求 ∫x·eˣ dx。',
    exam_answer: '答案：按「反对幂指三」，幂函数 x 排在指数 eˣ 前，取 u=x，dv=eˣdx，则 du=dx，v=eˣ。∫x eˣdx = x eˣ − ∫eˣdx = <b>x eˣ − eˣ + C</b>。检验：求导得 eˣ + x eˣ − eˣ = x eˣ ✓。分部积分可能需要用两次（如 ∫x²eˣdx）。',
    pitfalls: [
      'u 与 dv 选反了会越积越复杂（如 ∫x eˣ 取 u=eˣ 会陷入循环）。',
      '分部积分公式中是「减」号：uv − ∫v du，不是加。',
      '∫ln x dx 这类「只有一个函数」的题，要把 dv 看作 dx（即 v=x）。'
    ],
    quiz: [
      { question: '分部积分公式是？', options: ['∫u dv = uv + ∫v du', '∫u dv = uv − ∫v du', '∫u dv = u′v − uv′'], correct: 1 },
      { question: '∫x·eˣdx 中 u 应取？', options: ['x', 'eˣ', 'x·eˣ'], correct: 0 },
      { question: '「反对幂指三」中排最前的是？', options: ['幂函数', '反三角函数', '指数函数'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '公式来源：由 (uv)′ = u′v + uv′ 移项积分' },
      { focus: 1, desc: '选 u 的口诀：反对幂指三，前者优先当 u' },
      { focus: 2, desc: '典型例：∫x·eˣdx = x eˣ − eˣ + C' },
      { focus: 3, desc: '特殊情况：∫ln x dx（dv=dx）、循环积分（∫eˣsin x dx）' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['公式来源', '选 u 顺序', '典型例题', '特殊情况'][f]);
      if (f === 0) {
        box(g, 120, 80, 660, 76, 'var(--primary)', 0.08);
        txt(g, 450, 112, '(uv)′ = u′v + uv′', 'var(--primary-strong)', 15, 'middle', '700');
        txt(g, 450, 140, '两边积分并移项 →', 'var(--text-muted)', 11.5);
        box(g, 120, 180, 660, 76, 'var(--highlight)', 0.1);
        txt(g, 450, 216, '∫u dv = uv − ∫v du', 'var(--highlight)', 20, 'middle', '700');
        txt(g, 450, 280, '把「难积的 ∫u dv」转成「好积的 ∫v du」', 'var(--text)', 13);
        txt(g, 450, 315, '关键在于 u 求导变简单、dv 积分不复杂', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        ['反三角', '对数', '幂函数', '指数', '三角'].forEach(function (s, i) {
          box(g, 80 + i * 150, 140, 130, 70, ['var(--compare)', 'var(--swap)', 'var(--highlight)', 'var(--success)', 'var(--primary)'][i], 0.12);
          txt(g, 145 + i * 150, 182, s, 'var(--text)', 13, 'middle', '700');
          if (i < 4) arw(g, 210 + i * 150, 175, 230 + i * 150, 175, 'var(--text-muted)');
        });
        txt(g, 450, 100, 'u 的优先顺序（从左到右）', 'var(--text)', 13);
        txt(g, 450, 265, '越靠左，求导后越简单 → 优先当 u', 'var(--primary-strong)', 13, 'middle', '700');
        txt(g, 450, 310, '剩下那个当 dv，且它要容易积分', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        const rows = [['取 u = x', 'dv = eˣ dx'], ['du = dx', 'v = eˣ'], ['∫x eˣdx', '= x eˣ − ∫eˣdx'], ['结果', 'x eˣ − eˣ + C']];
        rows.forEach(function (r, i) {
          const y = 70 + i * 66;
          box(g, 120, y, 300, 52, 'var(--primary)', 0.08);
          txt(g, 270, y + 32, r[0], 'var(--text)', 12.5);
          box(g, 470, y, 320, 52, i > 1 ? 'var(--success)' : 'var(--highlight)', 0.08);
          txt(g, 630, y + 32, r[1], i > 1 ? 'var(--success)' : 'var(--highlight)', 13, 'middle', '700');
        });
        txt(g, 450, 355, '检验：对结果求导应还原被积函数', 'var(--text-muted)', 12);
      }
      if (f === 3) {
        box(g, 70, 70, 360, 220, 'var(--success)', 0.08);
        txt(g, 250, 105, '只有一个函数', 'var(--success)', 15, 'middle', '700');
        txt(g, 250, 145, '∫ln x dx：取 u=ln x, dv=dx', 'var(--text)', 12);
        txt(g, 250, 175, '= x ln x − ∫x·(1/x)dx', 'var(--text)', 12);
        txt(g, 250, 205, '= x ln x − x + C', 'var(--success)', 13, 'middle', '700');
        txt(g, 250, 250, '同理：∫arctan x dx', 'var(--text-muted)', 11.5);
        box(g, 470, 70, 360, 220, 'var(--highlight)', 0.08);
        txt(g, 650, 105, '循环积分', 'var(--highlight)', 15, 'middle', '700');
        txt(g, 650, 145, '∫eˣ sin x dx 两次分部后', 'var(--text)', 12);
        txt(g, 650, 175, '回到原积分，移项解出', 'var(--text)', 12);
        txt(g, 650, 205, '= eˣ(sin x − cos x)/2 + C', 'var(--highlight)', 13, 'middle', '700');
        txt(g, 650, 250, '关键：别把 u、dv 选反', 'var(--text-muted)', 11.5);
      }
    }
  },
  {
    id: 'MA-22', level: 'B', title: '有理函数、三角函数有理式、简单无理函数的积分',
    intuition: '三类「有套路」的积分：<strong>有理函数</strong> P(x)/Q(x) —— 先做多项式除法（假分式→真分式），再把分母因式分解，拆成<strong>部分分式</strong>逐项积分；<strong>三角函数有理式</strong> —— 用万能代换 t=tan(x/2) 化为有理函数，或凑微分；<strong>简单无理函数</strong> —— 令根号整体为 t（如 √(ax+b)=t）或三角代换去掉根号。核心思想：<strong>把不会积的化成会积的</strong>。',
    derivation: [
      '\\frac{P(x)}{Q(x)} = \\text{多项式} + \\sum\\frac{A}{(x-a)^{k}} + \\sum\\frac{Bx+C}{(x^{2}+px+q)^{k}}',
      '\\text{万能代换}: \\; t=\\tan\\frac{x}{2},\\; \\sin x=\\frac{2t}{1+t^{2}},\\; \\cos x=\\frac{1-t^{2}}{1+t^{2}}',
      '\\text{根式代换}: \\; \\sqrt{ax+b}=t \\Rightarrow x=\\frac{t^{2}-b}{a}',
      '\\int\\frac{dx}{x^{2}+a^{2}} = \\frac{1}{a}\\arctan\\frac{x}{a}+C'
    ],
    exam_text: '<b>【2019 真题改编】</b>求 ∫dx/(x²−1)。',
    exam_answer: '答案：分母分解 x²−1=(x−1)(x+1)，设 1/(x²−1)=A/(x−1)+B/(x+1)，解得 A=1/2，B=−1/2。故 ∫ = (1/2)ln|x−1| − (1/2)ln|x+1| + C = <b>(1/2)ln|(x−1)/(x+1)| + C</b>。这是部分分式法最基础的题型：一次因式对应 A/(x−a) 项。',
    pitfalls: [
      '假分式（分子次数 ≥ 分母）必须先做多项式除法，否则部分分式分解不成立。',
      '重因式 (x−a)² 要拆成 A/(x−a) + B/(x−a)²，不能只写一项。',
      '不可约二次因式 x²+px+q 对应 (Bx+C)/(x²+px+q)，分子是一次式不是常数。'
    ],
    quiz: [
      { question: '∫dx/(x²−1) 的结果是？', options: ['(1/2)ln|(x−1)/(x+1)|+C', 'ln|x²−1|+C', 'arctan x+C'], correct: 0 },
      { question: '有理函数积分第一步通常做什么？', options: ['直接积分', '假分式做除法、分母因式分解', '求导'], correct: 1 },
      { question: '万能代换 t 等于？', options: ['tan x', 'tan(x/2)', 'sin x'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '有理函数：假分式先做多项式除法' },
      { focus: 1, desc: '部分分式分解：按因式类型拆成简单项' },
      { focus: 2, desc: '三角函数有理式：万能代换或凑微分' },
      { focus: 3, desc: '简单无理函数：根式代换 / 三角代换去根号' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['有理函数', '部分分式', '三角有理式', '无理函数'][f]);
      if (f === 0) {
        chip(g, 120, 90, 220, 70, 'P(x)/Q(x)', 'var(--primary)', '有理函数');
        arw(g, 340, 125, 420, 125, 'var(--text-muted)');
        chip(g, 420, 90, 200, 70, '看次数', 'var(--highlight)', '分子 vs 分母');
        arw(g, 620, 125, 690, 125, 'var(--text-muted)');
        chip(g, 660, 190, 200, 70, '假分式→除法', 'var(--success)', '化为真分式');
        chip(g, 120, 250, 260, 70, '真分式→因式分解', 'var(--swap)', '部分分式');
        churn = 0;
        txt(g, 450, 350, '目标：拆成 1/(x−a)、1/(x²+a²) 等可直接积分的项', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        const rows = [['一次因式 (x−a)', 'A/(x−a)', 'var(--primary)'], ['重因式 (x−a)²', 'A/(x−a) + B/(x−a)²', 'var(--success)'], ['二次因式 x²+px+q', '(Bx+C)/(x²+px+q)', 'var(--highlight)']];
        rows.forEach(function (r, i) {
          const y = 70 + i * 85;
          box(g, 80, y, 740, 70, r[2], 0.1);
          txt(g, 110, y + 42, r[0], 'var(--text)', 13, 'start', '700');
          txt(g, 400, y + 42, r[1], r[2], 13, 'start', '700');
        });
        txt(g, 450, 330, '例：1/(x²−1) = (1/2)/(x−1) − (1/2)/(x+1)', 'var(--primary-strong)', 12.5, 'middle', '700');
        txt(g, 450, 360, '积出对数：∫ = (1/2)ln|(x−1)/(x+1)| + C', 'var(--success)', 12);
      }
      if (f === 2) {
        box(g, 100, 80, 700, 90, 'var(--primary)', 0.08);
        txt(g, 450, 116, 't = tan(x/2)', 'var(--primary-strong)', 18, 'middle', '700');
        txt(g, 450, 146, 'sin x = 2t/(1+t²)，cos x = (1−t²)/(1+t²)，dx = 2dt/(1+t²)', 'var(--text-muted)', 11.5);
        txt(g, 450, 210, '适用：sin x、cos x 的有理式（尤其含 tan(x/2) 结构）', 'var(--text)', 12.5);
        txt(g, 450, 245, '更常用：凑微分（∫sin³x dx 拆 sin²x·sin x）', 'var(--highlight)', 12.5);
        txt(g, 450, 280, '对称技巧：∫dx/(a sin x + b cos x) 用辅助角公式', 'var(--text-muted)', 12);
        txt(g, 450, 320, '万能代换虽万能，但计算量大——优先凑微分', 'var(--danger)', 12, 'middle', '700');
      }
      if (f === 3) {
        const rows = [['√(ax+b)', 't = √(ax+b)', '整根号代换', 'var(--primary)'], ['√(a²−x²)', 'x = a sin t', '三角代换', 'var(--success)'], ['√(x²+a²)', 'x = a tan t', '三角代换', 'var(--highlight)'], ['√(x²−a²)', 'x = a sec t', '三角代换', 'var(--swap)']];
        rows.forEach(function (r, i) {
          const y = 60 + i * 74;
          box(g, 90, y, 720, 60, r[3], 0.1);
          txt(g, 120, y + 37, r[0], r[3], 14, 'start', '700');
          txt(g, 340, y + 37, r[1], 'var(--text)', 12.5, 'start', '700');
          txt(g, 580, y + 37, r[2], 'var(--text-muted)', 11.5, 'start');
        });
        txt(g, 450, 365, '目标只有一个：把根号去掉，变成有理函数', 'var(--primary-strong)', 12.5, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-23', level: 'B', title: '定积分的概念与性质',
    intuition: '定积分是「曲边梯形面积」的精确化：把 [a,b] 分成 n 份，每份用矩形近似，令 n→∞ 取极限——<strong>黎曼和</strong>的极限。记作 ∫ₐᵇ f(x)dx。几何意义：f≥0 时是面积；f 变号时是「代数面积」（x 轴上方为正、下方为负）。性质：线性性、区间可加性（∫ₐᵇ = ∫ₐᶜ + ∫꜀ᵇ）、保号性、估值定理、绝对值不等式。',
    derivation: [
      '\\int_{a}^{b}f(x)dx = \\lim_{n\\to\\infty}\\sum_{i=1}^{n}f(\\xi_i)\\Delta x_i',
      '\\int_{a}^{b} = \\int_{a}^{c} + \\int_{c}^{b} \\quad (\\text{区间可加性})',
      'f(x)\\ge 0 \\Rightarrow \\int_{a}^{b}f\\,dx \\ge 0 \\quad (\\text{保号性})',
      '\\left|\\int_{a}^{b}f\\,dx\\right| \\le \\int_{a}^{b}|f|\\,dx'
    ],
    exam_text: '<b>【2016 真题改编】</b>定积分 ∫₀¹ x dx 的几何意义是什么？值为多少？',
    exam_answer: '答案：几何意义是直线 y=x 与 x 轴、x=0、x=1 围成的<b>三角形面积</b>，底 1 高 1，面积为 1/2。计算验证：∫₀¹x dx = x²/2 |₀¹ = <b>1/2</b>。若 f 在区间上变号（如 ∫₋₁¹ x dx = 0），定积分是「代数面积」——正负相消，不等于几何面积。',
    pitfalls: [
      '定积分是一个「数」，不定积分是「函数族」——两者概念不同，不要混淆。',
      'f 变号时定积分是代数面积，可能为 0 或负，不同于几何面积。',
      '区间可加性对 c 在 [a,b] 外也成立（规定 ∫ₐᵇ = −∫ᵦᵃ）。'
    ],
    quiz: [
      { question: '定积分的几何意义（f≥0）是？', options: ['曲线长度', '曲边梯形面积', '平均斜率'], correct: 1 },
      { question: '∫ₐᵇ f dx 与 ∫ᵦᵃ f dx 的关系是？', options: ['相等', '互为相反数', '两倍关系'], correct: 1 },
      { question: '定积分的结果是？', options: ['一个函数', '一个数', '一个集合'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '曲边梯形：用矩形近似，n 越大越精确' },
      { focus: 1, desc: '黎曼和取极限 → 定积分的定义' },
      { focus: 2, desc: '几何意义：代数面积（上正下负）' },
      { focus: 3, desc: '基本性质：线性、可加、保号、估值' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['矩形近似', '黎曼和', '代数面积', '基本性质'][f]);
      const x0 = 100, y0 = 300, w = 640, h = 210;
      ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
      ln(g, x0, y0, x0, y0 - h, 'var(--border)', 1.4);
      const curve = function (t) { return 0.15 + 0.8 * Math.sqrt(t); };
      if (f <= 1) {
        const n = f === 0 ? 6 : 14;
        for (let i = 0; i < n; i++) {
          const t1 = i / n, t2 = (i + 1) / n, hh = curve(t2);
          g.append('rect').attr('x', x0 + w * t1).attr('y', y0 - h * hh).attr('width', w / n - 1.5).attr('height', h * hh)
            .attr('fill', 'var(--primary)').attr('fill-opacity', 0.22).attr('stroke', 'var(--primary)').attr('stroke-width', 0.8);
        }
      }
      plot(g, curve, x0, y0, w, h, 'var(--success)', 2.4);
      if (f === 0) txt(g, 450, 350, '把曲边梯形切成 n 个矩形，宽度相同、高度取右端点', 'var(--text-muted)', 12);
      if (f === 1) txt(g, 450, 350, 'n → ∞ 时矩形和趋于定积分（黎曼和的极限）', 'var(--primary-strong)', 12.5, 'middle', '700');
      if (f === 2) {
        g.selectAll('*').remove();
        title(g, '代数面积：上正下负');
        ln(g, 100, 200, 800, 200, 'var(--text-muted)', 1.6);
        g.append('path').attr('d', 'M 140 160 C 260 80, 360 80, 450 200 C 540 320, 660 320, 760 240')
          .attr('fill', 'none').attr('stroke', 'var(--primary)').attr('stroke-width', 2.6);
        g.append('path').attr('d', 'M 140 160 C 260 80, 360 80, 450 200 L 140 200 Z').attr('fill', 'var(--success)').attr('fill-opacity', 0.22);
        g.append('path').attr('d', 'M 450 200 C 540 320, 660 320, 760 240 L 760 200 Z').attr('fill', 'var(--danger)').attr('fill-opacity', 0.22);
        txt(g, 280, 150, '正面积', 'var(--success)', 12, 'middle', '700');
        txt(g, 600, 265, '负面积', 'var(--danger)', 12, 'middle', '700');
        txt(g, 450, 340, '定积分 = 正面积 − 负面积（不是总面积）', 'var(--text-muted)', 12);
      }
      if (f === 3) {
        const rows = [['∫ₐᵇ(αf+βg) = α∫ₐᵇf + β∫ₐᵇg', '线性'], ['∫ₐᵇ = ∫ₐᶜ + ∫꜀ᵇ', '区间可加'], ['f ≥ 0 ⟹ ∫ₐᵇf ≥ 0', '保号性'], ['m(b−a) ≤ ∫ₐᵇf ≤ M(b−a)', '估值定理'], ['|∫ₐᵇf| ≤ ∫ₐᵇ|f|', '绝对值不等式']];
        rows.forEach(function (r, i) {
          const y = 60 + i * 56;
          box(g, 100, y, 700, 44, ['var(--primary)', 'var(--success)', 'var(--highlight)', 'var(--swap)', 'var(--danger)'][i], 0.08);
          txt(g, 130, y + 28, r[0], 'var(--text)', 12.5, 'start');
          txt(g, 760, y + 28, r[1], 'var(--text-muted)', 11, 'end');
        });
      }
    }
  },
  {
    id: 'MA-24', level: 'B', title: '微积分基本定理（牛顿-莱布尼茨公式）',
    intuition: '牛顿-莱布尼茨公式是整个微积分的「心脏」：<strong>∫ₐᵇ f(x)dx = F(b) − F(a)</strong>，其中 F 是 f 的任意一个原函数。它把「求面积」这个几何问题，变成了「找原函数、代端点、相减」三步代数运算——从此定积分不再需要每次求黎曼和的极限。它是连接微分与积分的桥梁，也是「微积分」名字的由来。',
    derivation: [
      '\\int_{a}^{b}f(x)dx = F(x)\\Big|_{a}^{b} = F(b)-F(a)',
      '\\text{其中 } F\'(x)=f(x),\\; f \\text{ 在 } [a,b] \\text{ 上连续}',
      '\\frac{d}{dx}\\int_{a}^{x}f(t)dt = f(x) \\quad (\\text{变上限积分求导})',
      '\\text{要求}: \\; f \\text{ 连续}; \\; F \\text{ 是 } f \\text{ 的任一原函数}'
    ],
    exam_text: '<b>【2018 真题改编】</b>用牛顿-莱布尼茨公式计算 ∫₁² (1/x) dx。',
    exam_answer: '答案：1/x 的原函数是 ln|x|，故 ∫₁² dx/x = ln|x| |₁² = ln2 − ln1 = <b>ln 2</b>。注意：① 原函数可以取任意一个（C 会被消掉）；② 被积函数在 [1,2] 上连续，满足公式条件；③ 若区间穿过 x=0（如 ∫₋₁¹ dx/x），被积函数不连续，不能用该公式（属于反常积分）。',
    pitfalls: [
      '公式要求 f 在 [a,b] 上连续——若中间有间断点（如 1/x 跨 0），不能直接用。',
      'F(b)−F(a) 的顺序不能反，反了会差一个负号。',
      'F 可以是任意一个原函数，不必加 C（加了也会消掉）。'
    ],
    quiz: [
      { question: '牛顿-莱布尼茨公式是？', options: ['∫ₐᵇf = F(b)−F(a)', '∫ₐᵇf = F(a)−F(b)', '∫ₐᵇf = f(b)−f(a)'], correct: 0 },
      { question: '使用公式的前提是？', options: ['f 可导', 'f 在 [a,b] 上连续', 'F 单调'], correct: 1 },
      { question: '∫₁² dx/x 等于？', options: ['1', 'ln 2', '2'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '变上限积分 Φ(x)=∫ₐˣf(t)dt 是 f 的一个原函数' },
      { focus: 1, desc: 'Φ′(x) = f(x)：对变上限积分求导还原被积函数' },
      { focus: 2, desc: '牛顿-莱布尼茨：∫ₐᵇf = F(b) − F(a)' },
      { focus: 3, desc: '应用三步：找原函数 → 代上下限 → 相减' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['变上限积分', '求导还原', '牛顿-莱布尼茨', '计算三步'][f]);
      const x0 = 100, y0 = 300, w = 640, h = 200;
      ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
      ln(g, x0, y0, x0, y0 - h, 'var(--border)', 1.4);
      const curve = function (t) { return 0.2 + 0.7 * Math.sin(2.6 * t + 0.3) * 0.6 + 0.35 * t; };
      if (f === 0) {
        for (let i = 0; i < 24; i++) {
          const t1 = i / 24, t2 = (i + 1) / 24, hh = Math.max(0, curve(t2));
          if (t2 > 0.62) break;
          g.append('rect').attr('x', x0 + w * t1).attr('y', y0 - h * hh).attr('width', w / 24 - 1).attr('height', h * hh)
            .attr('fill', 'var(--primary)').attr('fill-opacity', 0.2);
        }
        plot(g, curve, x0, y0, w, h, 'var(--success)', 2.4);
        ln(g, x0 + w * 0.62, y0, x0 + w * 0.62, y0 - h, 'var(--highlight)', 1.6, '5,4');
        txt(g, x0 + w * 0.62 + 8, y0 - h + 16, 'x', 'var(--highlight)', 12, 'start', '700');
        txt(g, 450, 350, 'Φ(x) = ∫ₐˣ f(t)dt：上限 x 变动，面积随之变动', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 130, 100, 640, 80, 'var(--highlight)', 0.1);
        txt(g, 450, 138, 'd/dx ∫ₐˣ f(t)dt = f(x)', 'var(--highlight)', 18, 'middle', '700');
        txt(g, 450, 168, '变上限积分对上限求导，还原为被积函数', 'var(--text-muted)', 11.5);
        txt(g, 450, 230, '推论：d/dx ∫_{u(x)}^{v(x)} f(t)dt = f(v)v′ − f(u)u′', 'var(--text)', 12.5);
        txt(g, 450, 280, '这条公式是考研「变限积分求导」题的命根子', 'var(--primary-strong)', 12, 'middle', '700');
      }
      if (f === 2) {
        box(g, 100, 80, 700, 100, 'var(--primary)', 0.1);
        txt(g, 450, 122, '∫ₐᵇ f(x)dx = F(b) − F(a)', 'var(--primary-strong)', 21, 'middle', '700');
        txt(g, 450, 156, 'F′(x) = f(x)', 'var(--text-muted)', 12);
        txt(g, 450, 220, '几何解释：曲线下的面积 = 原函数在两端点的「高度差」', 'var(--text)', 13);
        txt(g, 450, 255, '这是微积分最核心的定理——微分与积分的桥梁', 'var(--highlight)', 12.5, 'middle', '700');
        txt(g, 450, 300, '没有它，每次求面积都要回到「黎曼和取极限」', 'var(--text-muted)', 12);
      }
      if (f === 3) {
        const rows = [['① 找原函数', '1/x → ln|x|', 'var(--primary)'], ['② 代上限', 'ln 2', 'var(--success)'], ['③ 代下限', 'ln 1 = 0', 'var(--highlight)'], ['④ 相减', 'ln 2 − 0 = ln 2', 'var(--swap)']];
        rows.forEach(function (r, i) {
          const y = 65 + i * 72;
          box(g, 110, y, 680, 58, r[2], 0.1);
          txt(g, 140, y + 36, r[0], 'var(--text-muted)', 12.5, 'start', '700');
          txt(g, 360, y + 36, r[1], r[2], 14, 'start', '700');
        });
        txt(g, 450, 360, '三步走：原函数 → 代端点 → 相减', 'var(--primary-strong)', 12.5, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-25', level: 'B', title: '变限积分函数及其求导',
    intuition: '把定积分的上限换成变量 x，就得到<strong>变限积分函数</strong> Φ(x)=∫ₐˣ f(t)dt。它的导数是 Φ′(x)=f(x)——这是牛顿-莱布尼茨公式的基石。更一般地：若上下限都是函数，<strong>Φ(x)=∫_{u(x)}^{v(x)} f(t)dt，则 Φ′(x)=f(v(x))v′(x) − f(u(x))u′(x)</strong>。考研中常考「变限积分 + 洛必达」「变限积分 + 极值」。',
    derivation: [
      '\\Phi(x)=\\int_{a}^{x}f(t)dt \\Rightarrow \\Phi\'(x)=f(x)',
      '\\frac{d}{dx}\\int_{u(x)}^{v(x)}f(t)dt = f(v(x))v\'(x)-f(u(x))u\'(x)',
      '\\text{若被积函数含 } x: \\; \\int_{a}^{x} f(x,t)dt \\;\\Rightarrow\\; \\text{先换元把 } x \\text{ 提出}',
      '\\text{典型应用}: \\; \\lim_{x\\to0}\\frac{\\int_{0}^{x}f(t)dt}{x} = f(0)'
    ],
    exam_text: '<b>【2020 真题改编】</b>求 d/dx ∫₀^(x²) sin t dt。',
    exam_answer: '答案：上限是 x²，由链式法则：d/dx ∫₀^(x²) sin t dt = sin(x²)·(x²)′ = <b>2x·sin(x²)</b>。做法：把上限代入被积函数，再乘以上限的导数。若下限也是函数，还要减去「下限代入 × 下限导数」。这是「变限积分求导」的标准模板。',
    pitfalls: [
      '上下限是复合函数时，必须乘以上下限的导数（链式法则）。',
      '被积函数中若含 x（如 ∫₀ˣ x·f(t)dt），要先把 x 提到积分号外再求导。',
      '变限积分求导的结果是「函数」，不是数值——别代入端点后忘记乘导数。'
    ],
    quiz: [
      { question: 'd/dx ∫₀ˣ f(t)dt 等于？', options: ['f(x)', 'f′(x)', 'F(x)'], correct: 0 },
      { question: 'd/dx ∫₀^(x²) sin t dt 等于？', options: ['sin(x²)', '2x sin(x²)', '2x cos(x²)'], correct: 1 },
      { question: '上下限都是函数时，导数公式是？', options: ['f(v)−f(u)', 'f(v)v′−f(u)u′', 'f(v)v′+f(u)u′'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '变上限积分：上限是变量，积分值随 x 变化' },
      { focus: 1, desc: '基本公式：Φ′(x) = f(x)' },
      { focus: 2, desc: '复合上下限：f(v)v′ − f(u)u′' },
      { focus: 3, desc: '典型应用：变限积分 + 洛必达求极限' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['变上限积分', '基本公式', '复合上下限', '求极限应用'][f]);
      const x0 = 110, y0 = 300, w = 620, h = 200;
      ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
      ln(g, x0, y0, x0, y0 - h, 'var(--border)', 1.4);
      const curve = function (t) { return 0.25 + 0.6 * Math.exp(-2 * (t - 0.5) * (t - 0.5)); };
      if (f === 0 || f === 1) {
        for (let i = 0; i < 22; i++) {
          const t1 = i / 22, t2 = (i + 1) / 22;
          if (t2 > 0.6) break;
          const hh = curve(t2);
          g.append('rect').attr('x', x0 + w * t1).attr('y', y0 - h * hh).attr('width', w / 22 - 1).attr('height', h * hh)
            .attr('fill', 'var(--primary)').attr('fill-opacity', 0.18);
        }
        plot(g, curve, x0, y0, w, h, 'var(--success)', 2.4);
        ln(g, x0 + w * 0.6, y0, x0 + w * 0.6, y0 - h, 'var(--highlight)', 1.6, '5,4');
        txt(g, x0 + w * 0.6 + 8, y0 - h + 14, 'x', 'var(--highlight)', 12, 'start', '700');
      }
      if (f === 0) txt(g, 450, 350, 'Φ(x) = ∫ₐˣ f(t)dt —— 面积随上限增长', 'var(--text-muted)', 12);
      if (f === 1) {
        box(g, 130, 70, 640, 80, 'var(--highlight)', 0.1);
        txt(g, 450, 110, "Φ′(x) = f(x)", 'var(--highlight)', 20, 'middle', '700');
        txt(g, 450, 140, '面积的增长速率 = 当前边界处的高度', 'var(--text-muted)', 11.5);
        txt(g, 450, 350, '这就是「积分与微分互逆」的严格表述', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 90, 80, 720, 90, 'var(--primary)', 0.1);
        txt(g, 450, 118, 'Φ(x) = ∫_{u(x)}^{v(x)} f(t)dt', 'var(--primary-strong)', 17, 'middle', '700');
        txt(g, 450, 150, "Φ′(x) = f(v(x))·v′(x) − f(u(x))·u′(x)", 'var(--highlight)', 15, 'middle', '700');
        txt(g, 450, 215, '例：d/dx ∫₀^(x²) sin t dt', 'var(--text)', 13);
        txt(g, 450, 248, '= sin(x²) · 2x = 2x sin(x²)', 'var(--success)', 14, 'middle', '700');
        txt(g, 450, 300, '上限代入 → 乘以上限导数；下限项取负', 'var(--text-muted)', 12);
      }
      if (f === 3) {
        const rows = [['lim(x→0) ∫₀ˣ f(t)dt / x', '0/0 型，洛必达'], ['= lim f(x)/1', '变限积分求导'], ['= f(0)', '若 f 连续']];
        rows.forEach(function (r, i) {
          const y = 80 + i * 78;
          box(g, 130, y, 640, 60, ['var(--primary)', 'var(--success)', 'var(--highlight)'][i], 0.1);
          txt(g, 450, y + 37, r[0] + '   ' + r[1], 'var(--text)', 13);
        });
        txt(g, 450, 340, '套路：看到变限积分 + 0/0 → 洛必达 + 变限求导', 'var(--highlight)', 12.5, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-26', level: 'B', title: '定积分的计算（换元法、分部积分法）',
    intuition: '定积分的换元和分部与不定积分类似，但有两条「额外规则」：<strong>换元必须换积分限</strong>（x 的上下限换成 t 的上下限，换完不必回代）；<strong>分部积分带上下限</strong>：∫ₐᵇ u dv = [uv]ₐᵇ − ∫ₐᵇ v du。技巧：对称区间利用奇偶性（奇函数积分为 0，偶函数翻倍）、周期函数整周期积分相等——能大幅简化计算。',
    derivation: [
      '\\int_{a}^{b}f(x)dx = \\int_{\\alpha}^{\\beta}f(\\varphi(t))\\varphi\'(t)dt \\; (x=\\varphi(t))',
      '\\int_{a}^{b}u\\,dv = [uv]_{a}^{b} - \\int_{a}^{b}v\\,du',
      '\\int_{-a}^{a}f\\,dx = 2\\int_{0}^{a}f\\,dx \\; (f \\text{ 为偶函数}), \\; =0 \\; (f \\text{ 为奇函数})',
      '\\int_{a}^{a+T}f\\,dx = \\int_{0}^{T}f\\,dx \\quad (\\text{周期 } T)'
    ],
    exam_text: '<b>【2017 真题改编】</b>计算 ∫₋₁¹ (x³ + x²) dx。',
    exam_answer: '答案：拆成两项：∫₋₁¹x³dx + ∫₋₁¹x²dx。x³ 是奇函数，对称区间积分为 <b>0</b>；x² 是偶函数，∫₋₁¹x²dx = 2∫₀¹x²dx = 2/3。故原式 = <b>2/3</b>。对称区间先看奇偶性，能省掉一半计算——这是定积分计算的第一反射。',
    pitfalls: [
      '换元后忘记换积分限，或换完限又回代变量——二者只能做一件。',
      '定积分分部积分的 [uv]ₐᵇ 项不能漏，最后要代上下限。',
      '奇偶性只在「对称区间」成立；周期函数要在「完整周期」上才相等。'
    ],
    quiz: [
      { question: '定积分换元后必须做什么？', options: ['换积分限', '回代原变量', '两者都要'], correct: 0 },
      { question: '∫₋₁¹ x³ dx 等于？', options: ['0', '1/2', '2/3'], correct: 0 },
      { question: '偶函数在对称区间上的积分等于？', options: ['0', '2 倍半区间积分', '半区间积分'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '换元法：换变量同时换积分限' },
      { focus: 1, desc: '分部积分：[uv]ₐᵇ − ∫v du，注意代限' },
      { focus: 2, desc: '对称区间：奇函数为 0，偶函数翻倍' },
      { focus: 3, desc: '周期函数与常用技巧' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['换元换限', '分部带限', '奇偶性', '周期与技巧'][f]);
      if (f === 0) {
        box(g, 100, 80, 700, 80, 'var(--primary)', 0.08);
        txt(g, 450, 115, 'x = φ(t)  ⟹  dx = φ′(t)dt', 'var(--primary-strong)', 16, 'middle', '700');
        txt(g, 450, 145, '积分限：x=a → t=α；x=b → t=β', 'var(--highlight)', 12);
        txt(g, 450, 210, '∫₀¹ √(1−x²) dx，令 x=sin t', 'var(--text)', 13);
        txt(g, 450, 245, '限：x=0→t=0；x=1→t=π/2', 'var(--success)', 13);
        txt(g, 450, 280, '= ∫₀^(π/2) cos²t dt = π/4', 'var(--primary-strong)', 14, 'middle', '700');
        txt(g, 450, 325, '换限后不必再回代 x', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 100, 80, 700, 90, 'var(--success)', 0.08);
        txt(g, 450, 118, '∫ₐᵇ u dv = [uv]ₐᵇ − ∫ₐᵇ v du', 'var(--success)', 17, 'middle', '700');
        txt(g, 450, 150, '第一项要代上下限，第二项继续积分', 'var(--text-muted)', 11.5);
        txt(g, 450, 215, '例：∫₀¹ x eˣ dx', 'var(--text)', 13);
        txt(g, 450, 248, '= [x eˣ]₀¹ − ∫₀¹ eˣ dx = e − (e−1) = 1', 'var(--primary-strong)', 13.5, 'middle', '700');
        txt(g, 450, 300, '别忘了 [uv]ₐᵇ 要代入数字计算', 'var(--danger)', 12, 'middle', '700');
      }
      if (f === 2) {
        const x0 = 110, y0 = 280, w = 620, h = 170;
        ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
        ln(g, x0 + w / 2, y0, x0 + w / 2, y0 - h, 'var(--border)', 1.2, '4,4');
        plot(g, function (t) { const xx = (t - 0.5) * 4; return 0.35 + 0.5 * xx * xx * xx / 20; }, x0, y0, w, h, 'var(--swap)', 2.2);
        txt(g, x0 + w / 2, y0 - h - 8, 'O', 'var(--text-muted)', 11);
        txt(g, 250, 90, '奇函数：面积正负抵消 = 0', 'var(--swap)', 12);
        txt(g, 650, 90, '偶函数：左右对称 = 2×半区', 'var(--success)', 12);
        txt(g, 450, 340, '先看奇偶性，能省一半计算', 'var(--primary-strong)', 12.5, 'middle', '700');
      }
      if (f === 3) {
        const rows = [['∫ₐ^(a+T) f dx = ∫₀^T f dx', '周期为 T 的函数'], ['∫₀^(π/2) sinⁿx dx = ∫₀^(π/2) cosⁿx dx', '三角对称'], ['∫₀^π x f(sin x)dx = (π/2)∫₀^π f(sin x)dx', 'x 消去技巧'], ['∫₀^a f(x)dx = ∫₀^a f(a−x)dx', '区间再现']];
        rows.forEach(function (r, i) {
          const y = 65 + i * 72;
          box(g, 90, y, 720, 58, ['var(--primary)', 'var(--success)', 'var(--highlight)', 'var(--swap)'][i], 0.08);
          txt(g, 450, y + 36, r[0], 'var(--text)', 12.5);
          txt(g, 760, y + 36, r[1], 'var(--text-muted)', 10.5, 'end');
        });
      }
    }
  },
  {
    id: 'MA-27', level: 'B', title: '反常积分及其敛散性判别',
    intuition: '反常积分分两类：<strong>无穷区间</strong>（∫ₐ^∞）和<strong>无界函数</strong>（被积函数在端点趋于无穷，如 ∫₀¹ dx/√x）。定义方式都是「取极限」：∫ₐ^∞ = lim(b→∞)∫ₐᵇ。极限存在则<strong>收敛</strong>，否则<strong>发散</strong>。两个基准：∫₁^∞ dx/x^p 当 <strong>p>1 收敛</strong>；∫₀¹ dx/x^p 当 <strong>p<1 收敛</strong>——注意两个方向相反！',
    derivation: [
      '\\int_{a}^{+\\infty}f\\,dx = \\lim_{b\\to+\\infty}\\int_{a}^{b}f\\,dx',
      '\\int_{1}^{+\\infty}\\frac{dx}{x^{p}}: \\; p>1 \\text{ 收敛},\\; p\\le 1 \\text{ 发散}',
      '\\int_{0}^{1}\\frac{dx}{x^{p}}: \\; p<1 \\text{ 收敛},\\; p\\ge 1 \\text{ 发散}',
      '\\text{比较判别法}: \\; 0\\le f\\le g, \\; \\int g \\text{ 收敛} \\Rightarrow \\int f \\text{ 收敛}'
    ],
    exam_text: '<b>【2015 真题改编】</b>判断 ∫₁^∞ dx/x² 与 ∫₁^∞ dx/x 的敛散性。',
    exam_answer: '答案：∫₁^∞dx/x² = lim(b→∞)(−1/x)|₁ᵇ = lim(1 − 1/b) = <b>1，收敛</b>（p=2>1）。∫₁^∞dx/x = lim ln b = <b>+∞，发散</b>（p=1）。结论：p 级数在无穷区间上「p>1 才收敛」，p=1 是分界点（对数发散，最慢）。',
    pitfalls: [
      '无穷区间与无界函数两个方向的 p 判别条件相反：一个 p>1 收敛，一个 p<1 收敛。',
      '反常积分收敛的意思是「极限存在且有限」，算出 ∞ 就是发散。',
      '区间内部有瑕点（如 ∫₋₁¹ dx/x 在 0 处无界）要拆成两段分别判断，两段都收敛才收敛。'
    ],
    quiz: [
      { question: '∫₁^∞ dx/x^p 收敛的条件是？', options: ['p>1', 'p<1', 'p>0'], correct: 0 },
      { question: '∫₀¹ dx/x^p 收敛的条件是？', options: ['p>1', 'p<1', 'p≠1'], correct: 1 },
      { question: '∫₁^∞ dx/x 的敛散性是？', options: ['收敛于1', '发散', '收敛于0'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '无穷区间：上限趋于 ∞ 的极限' },
      { focus: 1, desc: 'p 积分判别：p>1 收敛（面积有限）' },
      { focus: 2, desc: 'p=1 临界：对数发散，最慢的发散' },
      { focus: 3, desc: '无界函数：瑕点处取极限，p<1 才收敛' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['无穷区间', 'p>1 收敛', 'p=1 发散', '无界函数'][f]);
      const x0 = 90, y0 = 300, w = 700, h = 210;
      ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
      ln(g, x0, y0, x0, y0 - h, 'var(--border)', 1.4);
      if (f === 0) {
        plot(g, function (t) { return 0.9 / (0.15 + t) / 6; }, x0, y0, w, h, 'var(--primary)', 2.4);
        txt(g, x0 + w - 10, y0 - 10, 'x → ∞', 'var(--text-muted)', 11, 'end');
        txt(g, 450, 350, '∫ₐ^∞ = lim(b→∞)∫ₐᵇ：看「无限延伸的面积」是否有限', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        for (let i = 0; i < 40; i++) {
          const t1 = 0.04 + i * 0.024, t2 = t1 + 0.024;
          const hh = 1 / (t1 * t1) / 900;
          g.append('rect').attr('x', x0 + w * t1).attr('y', y0 - h * Math.min(0.95, hh * 40)).attr('width', w * 0.024 - 1).attr('height', h * Math.min(0.95, hh * 40))
            .attr('fill', 'var(--success)').attr('fill-opacity', 0.2);
        }
        plot(g, function (t) { return Math.min(0.95, 1 / ((t + 0.04) * (t + 0.04)) / 20); }, x0, y0, w * 0.8, h, 'var(--success)', 2.2);
        txt(g, 450, 350, '∫₁^∞ dx/x² = 1：无限长的区域，面积竟然有限', 'var(--success)', 12.5, 'middle', '700');
      }
      if (f === 2) {
        plot(g, function (t) { return 1 / (t * 6 + 0.5) * 0.5; }, x0, y0, w, h, 'var(--danger)', 2.4);
        box(g, 560, 90, 260, 76, 'var(--danger)', 0.1);
        txt(g, 690, 120, '∫₁^∞ dx/x = ln b → ∞', 'var(--danger)', 12, 'middle', '700');
        txt(g, 690, 144, '发散（但是最慢的发散）', 'var(--text-muted)', 10.5);
        txt(g, 450, 350, 'p=1 是分界线：比 1/x 衰减慢的都发散', 'var(--danger)', 12.5, 'middle', '700');
      }
      if (f === 3) {
        plot(g, function (t) { return Math.min(0.95, 0.7 / Math.sqrt(t + 0.002)); }, x0, y0, w * 0.7, h, 'var(--highlight)', 2.4);
        ln(g, x0, y0, x0, y0 - h, 'var(--highlight)', 1.4, '5,4');
        txt(g, x0 + 8, y0 - h + 14, '瑕点 x=0', 'var(--highlight)', 11, 'start', '700');
        txt(g, 450, 350, '∫₀¹ dx/√x = 2√x |₀¹ = 2，收敛（p=1/2<1）', 'var(--highlight)', 12.5, 'middle', '700');
      }
    }
  }
];
