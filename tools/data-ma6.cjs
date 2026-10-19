module.exports = [
  {
    id: 'MA-117', level: 'B', title: '总体、样本、统计量',
    intuition: '研究对象的全体叫<strong>总体</strong>（用随机变量 X 表示其分布）；从中抽取的 n 个个体 X₁,…,Xₙ 叫<strong>样本</strong>（独立同分布，与 X 同分布）；不含任何未知参数的样本函数叫<strong>统计量</strong>。常用统计量：样本均值 X̄、样本方差 S²、样本标准差 S、样本 k 阶矩。',
    derivation: [
      'X_1,\\dots,X_n \\; \\text{i.i.d.} \\sim X \\; (\\text{简单随机样本})',
      '\\bar{X}=\\frac{1}{n}\\sum X_i; \\quad S^{2}=\\frac{1}{n-1}\\sum(X_i-\\bar{X})^{2}',
      'E(\\bar{X})=\\mu; \\quad E(S^{2})=\\sigma^{2} \\; (\\text{无偏性})',
      '\\text{统计量}: \\; \\text{不含未知参数的样本函数}'
    ],
    exam_text: '<b>【2018 真题改编】</b>样本方差 S² 的分母为什么是 n−1 而不是 n？',
    exam_answer: '答案：因为用样本均值 X̄ 代替总体均值 μ 会「消耗」一个自由度（Σ(Xᵢ−X̄)=0 是一个约束）。分母用 <b>n−1</b> 才能保证 <b>E(S²)=σ²</b>（无偏估计）；若用 n，则 E=σ²(n−1)/n < σ²，会系统性低估总体方差。',
    pitfalls: [
      '样本方差分母是 n−1（无偏），不是 n（有偏）。',
      '统计量不能含未知参数——含 μ 或 σ 的表达式不是统计量。',
      '样本要「独立同分布」，否则很多结论（如卡方分布）不成立。'
    ],
    quiz: [
      { question: '样本方差分母是？', options: ['n', 'n−1', 'n+1'], correct: 1 },
      { question: '统计量必须？', options: ['含未知参数', '不含未知参数', '等于期望'], correct: 1 },
      { question: 'E(S²) 等于？', options: ['σ', 'σ²', 'σ²/n'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '总体与样本：i.i.d. 的随机变量' },
      { focus: 1, desc: '常用统计量：均值、方差' },
      { focus: 2, desc: '为什么样本方差除以 n−1' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['总体与样本', '常用统计量', 'n−1 的由来'][f]);
      if (f === 0) {
        g.append('circle').attr('cx', 300).attr('cy', 190).attr('r', 110).attr('fill', 'var(--primary)').attr('fill-opacity', 0.1).attr('stroke', 'var(--primary)').attr('stroke-width', 2);
        txt(g, 300, 90, '总体 X', 'var(--primary-strong)', 14, 'middle', '700');
        for (let i = 0; i < 10; i++) circ(g, 240 + (i % 5) * 28, 140 + Math.floor(i / 5) * 40, 6, 'var(--primary)');
        [0.2, 0.4, 0.6].forEach(function (t, i) {
          circ(g, 480 + i * 70, 160 + i * 30, 7, 'var(--highlight)');
        });
        arw(g, 420, 190, 470, 190, 'var(--text-muted)');
        txt(g, 620, 170, '样本 X₁,…,Xₙ', 'var(--highlight)', 13, 'start', '700');
        txt(g, 450, 340, '样本是「从总体中独立抽取」的 n 个个体', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        const rows = [['样本均值 X̄ = (1/n)ΣXᵢ', 'var(--primary)'], ['样本方差 S² = Σ(Xᵢ−X̄)²/(n−1)', 'var(--success)'], ['样本标准差 S = √S²', 'var(--highlight)'], ['样本 k 阶矩 (1/n)ΣXᵢᵏ', 'var(--swap)']];
        rows.forEach(function (r, i) {
          const y = 65 + i * 66;
          box(g, 110, y, 680, 54, r[1], 0.08);
          txt(g, 450, y + 34, r[0], 'var(--text)', 12.5, 'middle', '700');
        });
      }
      if (f === 2) {
        box(g, 110, 75, 680, 70, 'var(--success)', 0.08);
        txt(g, 450, 112, 'E(S²) = σ²（无偏）', 'var(--success)', 15, 'middle', '700');
        txt(g, 450, 140, '分母取 n−1 才能刚好抵消偏差', 'var(--text-muted)', 11);
        box(g, 110, 170, 680, 70, 'var(--danger)', 0.08);
        txt(g, 450, 207, '若分母取 n：E = σ²(n−1)/n < σ²', 'var(--danger)', 13, 'middle', '700');
        txt(g, 450, 235, '会系统性低估总体方差', 'var(--text-muted)', 11);
        txt(g, 450, 300, '「自由度」：Σ(Xᵢ−X̄)=0 占掉一个自由度', 'var(--text)', 12);
      }
    }
  },
  {
    id: 'MA-121', level: 'C', title: '估计量的评选标准（无偏性、有效性、相合性）',
    intuition: '好估计量三条标准：<strong>无偏性</strong> E(θ̂)=θ（没有系统偏差）；<strong>有效性</strong> 方差更小（更集中，更可靠）；<strong>相合性（一致性）</strong> n→∞ 时 θ̂ 依概率收敛到 θ（样本越多越准）。无偏是「准」，有效是「稳」，相合是「大样本靠谱」。',
    derivation: [
      '\\text{无偏}: \\; E(\\hat{\\theta})=\\theta',
      '\\text{有效}: \\; D(\\hat{\\theta}_1)<D(\\hat{\\theta}_2) \\Rightarrow \\hat{\\theta}_1 \\text{ 更有效}',
      '\\text{相合}: \\; \\hat{\\theta} \\xrightarrow{P} \\theta \\; (n\\to\\infty)',
      '\\bar{X} \\text{ 与 } S^{2} \\text{ 分别是 } \\mu, \\sigma^{2} \\text{ 的无偏估计}'
    ],
    exam_text: '<b>【2019 真题改编】</b>X̄ 与 S² 分别是 μ 与 σ² 的什么估计？',
    exam_answer: '答案：E(X̄)=μ，故 X̄ 是 μ 的<b>无偏估计</b>；E(S²)=σ²，故 S² 是 σ² 的无偏估计。此外二者都是<b>相合估计</b>（n→∞ 时依概率收敛）。在无偏估计中，方差越小越「有效」——如用 X̄ 估计 μ 比用单个 X₁ 更有效（D(X̄)=σ²/n < σ²）。',
    pitfalls: [
      '无偏 ≠ 每个样本值都准，而是「平均而言」没有系统偏差。',
      '有效性的比较前提是「都无偏」，否则先比无偏。',
      '相合性是大样本性质，与无偏性互相独立（可以无偏不相合，也可以相合有偏）。'
    ],
    quiz: [
      { question: '无偏性的定义是？', options: ['E(θ̂)=θ', 'D(θ̂)=0', 'θ̂=θ'], correct: 0 },
      { question: 'S² 是 σ² 的？', options: ['有偏估计', '无偏估计', '相合但有偏'], correct: 1 },
      { question: '有效性的比较前提是？', options: ['都无偏', '都相合', '样本相同'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '无偏性：期望等于真值' },
      { focus: 1, desc: '有效性：方差更小' },
      { focus: 2, desc: '相合性：大样本收敛' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['无偏性', '有效性', '相合性'][f]);
      if (f === 0) {
        ln(g, 200, 260, 700, 260, 'var(--border)', 1.6);
        ln(g, 450, 280, 450, 90, 'var(--highlight)', 2, '5,4');
        txt(g, 450, 80, '真值 θ', 'var(--highlight)', 12, 'middle', '700');
        [380, 420, 460, 500, 540].forEach(function (x) {
          circ(g, x, 200, 5, 'var(--primary)');
        });
        txt(g, 450, 320, '估计值在真值附近均匀分布 → 平均等于真值', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        ln(g, 200, 260, 700, 260, 'var(--border)', 1.6);
        ln(g, 450, 280, 450, 90, 'var(--highlight)', 2, '5,4');
        [430, 440, 450, 460, 470].forEach(function (x) { circ(g, x, 180, 5, 'var(--success)'); });
        [320, 380, 520, 580].forEach(function (x) { circ(g, x, 210, 5, 'var(--danger)'); });
        txt(g, 450, 320, '绿色方差小 → 更有效；红色方差大 → 较无效', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        const x0 = 120, y0 = 280, w = 660, h = 170;
        ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
        ln(g, x0, y0, x0, y0 - h, 'var(--border)', 1.4);
        plot(g, function (t) { return 0.85 - 0.7 * Math.exp(-3 * t); }, x0, y0, w, h, 'var(--primary)', 2.4);
        ln(g, x0, y0 - h * 0.85, x0 + w, y0 - h * 0.85, 'var(--highlight)', 1.4, '5,4');
        txt(g, x0 + w - 10, y0 - h * 0.85 - 8, 'θ', 'var(--highlight)', 12, 'end', '700');
        txt(g, 450, 340, 'n 越大，估计值越接近真值（依概率收敛）', 'var(--text-muted)', 12);
      }
    }
  },
  {
    id: 'MA-123', level: 'B', title: '假设检验的基本概念',
    intuition: '假设检验的逻辑是「反证法 + 小概率原理」：先设<strong>原假设 H₀</strong>（通常是要拒绝的），构造<strong>检验统计量</strong>，根据<strong>显著性水平 α</strong> 划定<strong>拒绝域</strong>；若统计量落入拒绝域（小概率事件发生），则拒绝 H₀。两类错误：<strong>第一类错误</strong>（H₀ 真却拒绝，概率 = α）、<strong>第二类错误</strong>（H₀ 假却接受，概率 = β）。',
    derivation: [
      'H_0 \\text{（原假设）} \\; vs \\; H_1 \\text{（备择假设）}',
      'P(\\text{拒绝 } H_0 \\mid H_0 \\text{ 真}) = \\alpha \\; (\\text{第一类错误})',
      'P(\\text{接受 } H_0 \\mid H_0 \\text{ 假}) = \\beta \\; (\\text{第二类错误})',
      '\\text{拒绝域}: \\; |Z|>z_{\\alpha/2} \\; (\\text{双侧})'
    ],
    exam_text: '<b>【2017 真题改编】</b>假设检验中，显著性水平 α=0.05 表示什么？',
    exam_answer: '答案：α=0.05 表示「当 H₀ 为真时，错误拒绝 H₀ 的概率」不超过 5%——即<b>第一类错误的概率上限</b>。它不是「H₀ 为真的概率」，也不是「接受 H₀ 的把握」。样本量固定时，α 越小，β 越大（两类错误此消彼长）。',
    pitfalls: [
      'α 是「H₀ 真时拒绝 H₀」的概率，不是「H₀ 为真」的概率。',
      '「接受 H₀」不等于「证明 H₀ 为真」——只是「没有足够证据拒绝」。',
      'α 减小会使 β 增大（样本量不变时），想要同时减小只能增大样本量。'
    ],
    quiz: [
      { question: '第一类错误的概率是？', options: ['α', 'β', '1−α'], correct: 0 },
      { question: 'α=0.05 表示？', options: ['H₀ 为真的概率 5%', 'H₀ 真时错误拒绝的概率 ≤5%', 'H₁ 为真的概率 95%'], correct: 1 },
      { question: '样本量固定时，α 减小则 β？', options: ['减小', '增大', '不变'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '原假设与备择假设' },
      { focus: 1, desc: '显著性水平与拒绝域' },
      { focus: 2, desc: '两类错误：α 与 β' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['两个假设', '拒绝域', '两类错误'][f]);
      const x0 = 100, y0 = 280, w = 700, h = 170;
      ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
      const norm = function (t) { return 0.9 * Math.exp(-14 * (t - 0.5) * (t - 0.5)); };
      if (f === 0) {
        plot(g, norm, x0, y0, w, h, 'var(--primary)', 2.4);
        box(g, 120, 70, 320, 70, 'var(--primary)', 0.08);
        txt(g, 280, 105, 'H₀：待检验的假设', 'var(--primary-strong)', 13, 'middle', '700');
        box(g, 470, 70, 320, 70, 'var(--success)', 0.08);
        txt(g, 630, 105, 'H₁：备择假设', 'var(--success)', 13, 'middle', '700');
        txt(g, 450, 340, '检验的目标：判断是否有足够证据拒绝 H₀', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        plot(g, norm, x0, y0, w, h, 'var(--primary)', 2.2);
        g.append('rect').attr('x', x0).attr('y', y0 - h).attr('width', w * 0.1).attr('height', h).attr('fill', 'var(--danger)').attr('fill-opacity', 0.2);
        g.append('rect').attr('x', x0 + w * 0.9).attr('y', y0 - h).attr('width', w * 0.1).attr('height', h).attr('fill', 'var(--danger)').attr('fill-opacity', 0.2);
        txt(g, x0 + w * 0.05, y0 - h - 10, 'α/2', 'var(--danger)', 12, 'middle', '700');
        txt(g, x0 + w * 0.95, y0 - h - 10, 'α/2', 'var(--danger)', 12, 'middle', '700');
        txt(g, 450, 340, '统计量落入两侧尾部（小概率区）→ 拒绝 H₀', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 70, 70, 370, 230, 'var(--danger)', 0.08);
        txt(g, 255, 105, '第一类错误', 'var(--danger)', 16, 'middle', '700');
        txt(g, 255, 145, 'H₀ 真却拒绝', 'var(--text)', 13);
        txt(g, 255, 180, '概率 = α', 'var(--danger)', 14, 'middle', '700');
        txt(g, 255, 215, '「弃真」', 'var(--text-muted)', 11);
        box(g, 460, 70, 370, 230, 'var(--swap)', 0.08);
        txt(g, 645, 105, '第二类错误', 'var(--swap)', 16, 'middle', '700');
        txt(g, 645, 145, 'H₀ 假却接受', 'var(--text)', 13);
        txt(g, 645, 180, '概率 = β', 'var(--swap)', 14, 'middle', '700');
        txt(g, 645, 215, '「取伪」', 'var(--text-muted)', 11);
        txt(g, 450, 330, '样本量固定时，α↓ 则 β↑（此消彼长）', 'var(--primary-strong)', 12, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-126', level: 'B', title: '空间解析几何与向量代数综合',
    intuition: '空间解析几何的「工具箱」：向量运算（点积判垂直、叉积求法向量）、平面方程（点法式）、直线方程（点向式）、距离公式（点到面/线）、曲面方程。综合题的套路：把几何条件翻译成向量关系 → 列方程 → 求解。核心是「用代数算几何」。',
    derivation: [
      '\\mathbf{a}\\cdot\\mathbf{b}=0 \\Leftrightarrow \\text{垂直}; \\quad \\mathbf{a}\\times\\mathbf{b} \\Rightarrow \\text{法向量}',
      '\\text{平面}: \\; A(x-x_0)+B(y-y_0)+C(z-z_0)=0',
      '\\text{直线}: \\; \\frac{x-x_0}{m}=\\frac{y-y_0}{n}=\\frac{z-z_0}{p}',
      'd=\\frac{|Ax_0+By_0+Cz_0+D|}{\\sqrt{A^{2}+B^{2}+C^{2}}}'
    ],
    exam_text: '<b>【2016 真题改编】</b>求过点 A(1,0,0)、B(0,1,0)、C(0,0,1) 的平面方程。',
    exam_answer: '答案：AB=(−1,1,0)，AC=(−1,0,1)，法向量 n=AB×AC=(1,1,1)。过 A 点：1(x−1)+1(y−0)+1(z−0)=0，即 <b>x+y+z=1</b>。验证：三个点代入都成立 ✓。这是「三点求平面」的标准流程。',
    pitfalls: [
      '求法向量要用「两个方向向量叉乘」，顺序反了方向相反但不影响平面方程（可整体变号）。',
      '点法式中点是已知点，法向量要垂直于平面。',
      '综合题先画图、再翻译条件、最后计算——不要一上来就硬算。'
    ],
    quiz: [
      { question: '求平面法向量的常用方法是？', options: ['两方向向量叉乘', '两点相减', '求模长'], correct: 0 },
      { question: '过 (1,0,0),(0,1,0),(0,0,1) 的平面是？', options: ['x+y+z=1', 'x+y+z=0', 'xyz=1'], correct: 0 },
      { question: '点积为 0 说明两向量？', options: ['平行', '垂直', '相等'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '向量工具：点积、叉积' },
      { focus: 1, desc: '平面与直线的方程' },
      { focus: 2, desc: '距离公式与综合应用' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['向量工具', '平面与直线', '距离公式'][f]);
      if (f === 0) {
        arw(g, 240, 260, 460, 260, 'var(--primary)');
        arw(g, 240, 260, 340, 130, 'var(--success)');
        arw(g, 340, 130, 340, 260, 'var(--highlight)', '4,3');
        txt(g, 462, 250, 'a', 'var(--primary)', 13, 'start', '700');
        txt(g, 346, 122, 'b', 'var(--success)', 13, 'start', '700');
        txt(g, 350, 210, '投影', 'var(--highlight)', 11, 'start');
        txt(g, 450, 340, 'a·b 判垂直、求投影；a×b 求法向量与面积', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        g.append('path').attr('d', 'M 140 270 L 420 170 L 720 230 L 440 330 Z').attr('fill', 'var(--primary)').attr('fill-opacity', 0.12).attr('stroke', 'var(--primary)').attr('stroke-width', 2);
        arw(g, 430, 240, 430, 100, 'var(--danger)');
        txt(g, 440, 96, 'n=(A,B,C)', 'var(--danger)', 11.5, 'start', '700');
        ln(g, 180, 300, 700, 140, 'var(--success)', 2.4);
        txt(g, 700, 132, '直线 s', 'var(--success)', 11.5, 'start', '700');
        txt(g, 450, 355, '平面靠「点+法向量」，直线靠「点+方向向量」', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 110, 70, 680, 70, 'var(--primary)', 0.08);
        txt(g, 450, 108, 'd = |Ax₀+By₀+Cz₀+D| / √(A²+B²+C²)', 'var(--primary-strong)', 13, 'middle', '700');
        box(g, 110, 165, 680, 70, 'var(--success)', 0.08);
        txt(g, 450, 203, 'd = |P₀P₁ × s| / |s|', 'var(--success)', 13, 'middle', '700');
        txt(g, 450, 275, '综合题：几何条件 → 向量关系 → 方程 → 求解', 'var(--text-muted)', 12);
      }
    }
  },
  {
    id: 'MA-131', level: 'B', title: '向量空间（深化）',
    intuition: '向量空间 V 的子集 W 若对加法、数乘封闭，则 W 是<strong>子空间</strong>。子空间的判定：非空 + 对加法封闭 + 对数乘封闭。由向量组 α₁,…,αₙ 张成的子空间记 L(α₁,…,αₙ)，其维数 = 向量组的秩。<strong>基变换</strong>与<strong>坐标变换</strong>是核心计算：x = Py（P 为过渡矩阵）。',
    derivation: [
      'W \\le V \\Leftrightarrow W\\neq\\varnothing, \\; \\alpha,\\beta\\in W \\Rightarrow \\alpha+\\beta\\in W, \\; k\\alpha\\in W',
      '\\dim L(\\alpha_1,\\dots,\\alpha_n) = r(\\alpha_1,\\dots,\\alpha_n)',
      '\\text{基变换}: (\\beta_1,\\dots,\\beta_n)=(\\alpha_1,\\dots,\\alpha_n)P',
      '\\text{坐标变换}: x = Py'
    ],
    exam_text: '<b>【2018 真题改编】</b>判断 W={(x,y,0) | x,y∈R} 是否为 R³ 的子空间。',
    exam_answer: '答案：是。(x₁,y₁,0)+(x₂,y₂,0)=(x₁+x₂,y₁+y₂,0)∈W，k(x,y,0)=(kx,ky,0)∈W，且含零向量，故 <b>W 是子空间</b>（即 xOy 平面）。其维数为 2，基可取 (1,0,0),(0,1,0)。',
    pitfalls: [
      '子空间必须含零向量（非空 + 封闭自动推出）。',
      '「对加法、数乘封闭」两条都要验证，缺一不可。',
      '过渡矩阵 P 的列是「新基在旧基下的坐标」，坐标变换是 x=Py（不是 y=Px）。'
    ],
    quiz: [
      { question: '子空间必须包含？', options: ['零向量', '单位向量', '任意向量'], correct: 0 },
      { question: 'L(α₁,…,αₙ) 的维数等于？', options: ['n', '向量组的秩', '1'], correct: 1 },
      { question: '坐标变换公式是？', options: ['x = Py', 'y = Px', 'x = P⁻¹y'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '子空间判定：非空 + 两封闭' },
      { focus: 1, desc: '张成子空间的维数' },
      { focus: 2, desc: '基变换与坐标变换' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['子空间判定', '张成空间', '坐标变换'][f]);
      if (f === 0) {
        g.append('path').attr('d', 'M 180 290 L 620 290 L 720 180 L 280 180 Z').attr('fill', 'var(--primary)').attr('fill-opacity', 0.15).attr('stroke', 'var(--primary)').attr('stroke-width', 2);
        arw(g, 260, 270, 480, 270, 'var(--success)');
        arw(g, 260, 270, 380, 210, 'var(--highlight)');
        circ(g, 260, 270, 5, 'var(--danger)');
        txt(g, 250, 292, '0', 'var(--danger)', 12, 'end', '700');
        txt(g, 450, 340, '过原点、对加法与数乘封闭 → 子空间', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 110, 80, 680, 70, 'var(--success)', 0.08);
        txt(g, 450, 118, 'dim L(α₁,…,αₙ) = r(α₁,…,αₙ)', 'var(--success)', 16, 'middle', '700');
        txt(g, 450, 145, '张成空间的维数 = 向量组的秩', 'var(--text-muted)', 11.5);
        txt(g, 450, 210, '例：(1,0,0),(0,1,0) 张成 xOy 平面，维数 2', 'var(--text)', 12.5);
        txt(g, 450, 250, '若再加 (0,0,1)，张成整个 R³，维数 3', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 110, 70, 680, 70, 'var(--primary)', 0.08);
        txt(g, 450, 108, '(β₁,…,βₙ) = (α₁,…,αₙ)P', 'var(--primary-strong)', 15, 'middle', '700');
        box(g, 110, 165, 680, 70, 'var(--highlight)', 0.08);
        txt(g, 450, 203, '坐标：x = P y', 'var(--highlight)', 15, 'middle', '700');
        txt(g, 450, 275, 'P 可逆；P 的列 = 新基在旧基下的坐标', 'var(--text-muted)', 12);
        txt(g, 450, 310, '「基变坐标反着变」——用 P 而不是 P⁻¹', 'var(--primary-strong)', 12, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-132', level: 'B', title: '假设检验（正态总体）',
    intuition: '正态总体的假设检验分三种情形：<strong>σ² 已知</strong>检验 μ → 用 <strong>U 检验</strong>（标准正态）；<strong>σ² 未知</strong>检验 μ → 用 <strong>t 检验</strong>；检验 σ² → 用 <strong>χ² 检验</strong>。步骤固定：提出 H₀/H₁ → 选统计量 → 按 α 定拒绝域 → 计算并判断。',
    derivation: [
      '\\sigma^{2} \\text{ 已知}: \\; U=\\frac{\\bar{X}-\\mu_0}{\\sigma/\\sqrt{n}} \\sim N(0,1)',
      '\\sigma^{2} \\text{ 未知}: \\; t=\\frac{\\bar{X}-\\mu_0}{S/\\sqrt{n}} \\sim t(n-1)',
      '\\text{检验 } \\sigma^{2}: \\; \\chi^{2}=\\frac{(n-1)S^{2}}{\\sigma_0^{2}} \\sim \\chi^{2}(n-1)',
      '\\text{拒绝域}: \\; |U|>u_{\\alpha/2} \\; (\\text{双侧})'
    ],
    exam_text: '<b>【2019 真题改编】</b>总体方差未知时，检验均值 μ 应使用什么统计量？',
    exam_answer: '答案：用 <b>t 统计量</b> t=(X̄−μ₀)/(S/√n)，服从 t(n−1)。因为 σ 未知，用样本标准差 S 代替后，正态变量除以「样本标准差相关量」服从 t 分布而非正态。若 σ² 已知则用 U 统计量（标准正态）。',
    pitfalls: [
      'σ 已知用 U（正态），σ 未知用 t——这是最容易混的选择。',
      't 分布自由度是 n−1（不是 n）。',
      '双侧检验的临界值用 α/2，单侧用 α。'
    ],
    quiz: [
      { question: 'σ 未知检验均值用？', options: ['U 统计量', 't 统计量', 'χ² 统计量'], correct: 1 },
      { question: 't 统计量的自由度是？', options: ['n', 'n−1', 'n+1'], correct: 1 },
      { question: '检验方差用？', options: ['χ² 统计量', 't 统计量', 'U 统计量'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: 'σ 已知：U 检验' },
      { focus: 1, desc: 'σ 未知：t 检验' },
      { focus: 2, desc: '检验方差：χ² 检验' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['U 检验', 't 检验', 'χ² 检验'][f]);
      const x0 = 100, y0 = 280, w = 700, h = 170;
      ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
      const norm = function (t) { return 0.9 * Math.exp(-14 * (t - 0.5) * (t - 0.5)); };
      if (f === 0) {
        plot(g, norm, x0, y0, w, h, 'var(--primary)', 2.2);
        g.append('rect').attr('x', x0).attr('y', y0 - h).attr('width', w * 0.08).attr('height', h).attr('fill', 'var(--danger)').attr('fill-opacity', 0.22);
        g.append('rect').attr('x', x0 + w * 0.92).attr('y', y0 - h).attr('width', w * 0.08).attr('height', h).attr('fill', 'var(--danger)').attr('fill-opacity', 0.22);
        box(g, 140, 65, 620, 60, 'var(--primary)', 0.08);
        txt(g, 450, 102, 'U = (X̄−μ₀)/(σ/√n) ~ N(0,1)', 'var(--primary-strong)', 13, 'middle', '700');
        txt(g, 450, 340, 'σ² 已知时使用；双侧拒绝域 |U| > u(α/2)', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        plot(g, function (t) { return 0.82 * Math.exp(-9 * (t - 0.5) * (t - 0.5)); }, x0, y0, w, h, 'var(--success)', 2.2);
        g.append('rect').attr('x', x0).attr('y', y0 - h).attr('width', w * 0.1).attr('height', h).attr('fill', 'var(--danger)').attr('fill-opacity', 0.2);
        g.append('rect').attr('x', x0 + w * 0.9).attr('y', y0 - h).attr('width', w * 0.1).attr('height', h).attr('fill', 'var(--danger)').attr('fill-opacity', 0.2);
        box(g, 140, 65, 620, 60, 'var(--success)', 0.08);
        txt(g, 450, 102, 't = (X̄−μ₀)/(S/√n) ~ t(n−1)', 'var(--success)', 13, 'middle', '700');
        txt(g, 450, 340, 't 分布比正态「尾巴厚」，小样本时更保守', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 130, 75, 640, 70, 'var(--highlight)', 0.08);
        txt(g, 450, 112, 'χ² = (n−1)S²/σ₀² ~ χ²(n−1)', 'var(--highlight)', 14, 'middle', '700');
        txt(g, 450, 140, '只用于检验方差，不检验均值', 'var(--text-muted)', 11);
        txt(g, 450, 210, 'χ² 分布不对称，拒绝域在两侧（或单侧）', 'var(--text)', 12.5);
        txt(g, 450, 250, '自由度 n−1', 'var(--text-muted)', 12);
        txt(g, 450, 295, '记忆：U 正态、t 均值未知方差、χ² 方差', 'var(--primary-strong)', 12, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-133', level: 'B', title: '区间估计（置信区间）',
    intuition: '区间估计给出「参数落在某区间的可信程度」：<strong>P(θ̂₁<θ<θ̂₂)=1−α</strong>，[θ̂₁,θ̂₂] 叫置信区间，1−α 叫置信度（如 95%）。构造方法：从点估计出发，找枢轴量（分布已知），解不等式得区间。置信度越高，区间越宽（越保守）。',
    derivation: [
      'P(\\hat{\\theta}_1<\\theta<\\hat{\\theta}_2)=1-\\alpha',
      '\\mu \\text{ 的 } 1-\\alpha \\text{ 区间（} \\sigma \\text{ 已知）}: \\; \\bar{X}\\pm u_{\\alpha/2}\\frac{\\sigma}{\\sqrt{n}}',
      '\\mu \\text{ 的区间（} \\sigma \\text{ 未知）}: \\; \\bar{X}\\pm t_{\\alpha/2}(n-1)\\frac{S}{\\sqrt{n}}',
      '\\sigma^{2} \\text{ 的区间}: \\; \\left[\\frac{(n-1)S^{2}}{\\chi^{2}_{\\alpha/2}},\\; \\frac{(n-1)S^{2}}{\\chi^{2}_{1-\\alpha/2}}\\right]'
    ],
    exam_text: '<b>【2018 真题改编】</b>置信度 95% 的置信区间如何理解？',
    exam_answer: '答案：若重复抽样很多次，每次构造一个置信区间，则约有 <b>95% 的区间会包含真值 μ</b>。注意不能说「μ 落在该区间的概率是 95%」——μ 是常数（不是随机变量），区间才是随机的。置信度越高，区间越宽。',
    pitfalls: [
      '置信度是对「构造方法」的概率描述，不是对某个具体区间的概率描述。',
      'σ 已知用 u 分位数，σ 未知用 t 分位数——与假设检验对应。',
      '置信度↑ → 区间变宽；样本量↑ → 区间变窄。'
    ],
    quiz: [
      { question: '置信度 1−α 越高，区间？', options: ['越窄', '越宽', '不变'], correct: 1 },
      { question: 'σ 未知时构造 μ 的区间用？', options: ['u 分位数', 't 分位数', 'χ² 分位数'], correct: 1 },
      { question: '样本量增大，置信区间？', options: ['变宽', '变窄', '不变'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '置信区间的含义' },
      { focus: 1, desc: 'μ 的区间：σ 已知/未知' },
      { focus: 2, desc: '区间宽度与置信度、样本量的关系' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['置信区间含义', 'μ 的区间公式', '宽度的影响因素'][f]);
      if (f === 0) {
        for (let i = 0; i < 8; i++) {
          const y = 90 + i * 30;
          ln(g, 180, y, 700, y, 'var(--text-muted)', 1.2);
          const cx = 300 + i * 48;
          g.append('rect').attr('x', cx - 60).attr('y', y - 5).attr('width', 120).attr('height', 10).attr('rx', 3).attr('fill', i < 6 ? 'var(--success)' : 'var(--danger)').attr('fill-opacity', 0.5);
        }
        ln(g, 450, 80, 450, 340, 'var(--highlight)', 2, '5,4');
        txt(g, 460, 76, '真值 μ', 'var(--highlight)', 11.5, 'start', '700');
        txt(g, 450, 365, '95% 的区间包含 μ，5% 没包含（红色）', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 100, 70, 700, 70, 'var(--primary)', 0.08);
        txt(g, 450, 105, 'σ 已知：X̄ ± u(α/2)·σ/√n', 'var(--primary-strong)', 14, 'middle', '700');
        box(g, 100, 160, 700, 70, 'var(--success)', 0.08);
        txt(g, 450, 195, 'σ 未知：X̄ ± t(α/2, n−1)·S/√n', 'var(--success)', 14, 'middle', '700');
        txt(g, 450, 270, '结构统一：点估计 ± 分位数 × 标准误', 'var(--text)', 12.5);
        txt(g, 450, 305, '标准误 = 统计量的标准差', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        const rows = [['置信度 ↑（如 90%→99%）', '区间变宽', 'var(--danger)'], ['样本量 n ↑', '区间变窄', 'var(--success)'], ['总体方差 σ² ↑', '区间变宽', 'var(--swap)']];
        rows.forEach(function (r, i) {
          const y = 75 + i * 78;
          box(g, 100, y, 700, 62, r[2], 0.08);
          txt(g, 140, y + 28, r[0], 'var(--text)', 12.5, 'start', '700');
          txt(g, 700, y + 28, r[1], r[2], 12.5, 'end', '700');
        });
        txt(g, 450, 320, '想要「又窄又可信」→ 只能增大样本量', 'var(--primary-strong)', 12, 'middle', '700');
      }
    }
  }
];
