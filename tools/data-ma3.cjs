module.exports = [
  {
    id: 'MA-58', level: 'B', title: '绝对收敛与条件收敛',
    intuition: '对任意项级数 ∑uₙ，先看「加绝对值」后的 ∑|uₙ|：若它收敛，称原级数<strong>绝对收敛</strong>（最强，任意重排都不变）；若 ∑|uₙ| 发散但 ∑uₙ 收敛，称<strong>条件收敛</strong>（如交错调和级数 ∑(−1)ⁿ⁻¹/n）。判别顺序：先判绝对值（正项级数判别法），绝对收敛则原级数必收敛；否则再用莱布尼茨等判原级数。',
    derivation: [
      '\\sum|u_n| \\text{ 收敛} \\Rightarrow \\sum u_n \\text{ 绝对收敛} \\Rightarrow \\sum u_n \\text{ 收敛}',
      '\\sum|u_n| \\text{ 发散但} \\sum u_n \\text{ 收敛} \\Rightarrow \\text{条件收敛}',
      '\\sum\\frac{(-1)^{n-1}}{n} \\text{ 条件收敛}; \\quad \\sum\\frac{(-1)^{n-1}}{n^{2}} \\text{ 绝对收敛}',
      '\\text{绝对收敛级数可任意重排，和不变}'
    ],
    exam_text: '<b>【2018 真题改编】</b>判断 ∑(−1)ⁿ⁻¹/n 的敛散性，是绝对收敛还是条件收敛？',
    exam_answer: '答案：原级数是交错调和级数，由莱布尼茨判别法（uₙ=1/n 单调减且趋于 0）<b>收敛</b>。但加绝对值后 ∑1/n 是调和级数，<b>发散</b>。故原级数<b>条件收敛</b>。对比：∑(−1)ⁿ⁻¹/n² 加绝对值后 ∑1/n² 收敛（p=2>1），是绝对收敛。',
    pitfalls: [
      '「收敛」不等于「绝对收敛」——条件收敛的级数加绝对值后是发散的。',
      '绝对收敛是比收敛更强的性质，不能用「收敛」推出「绝对收敛」。',
      '判定顺序不能反：先看绝对值，再考虑条件收敛。'
    ],
    quiz: [
      { question: '∑(−1)ⁿ⁻¹/n 属于？', options: ['绝对收敛', '条件收敛', '发散'], correct: 1 },
      { question: '绝对收敛与收敛的关系是？', options: ['等价', '绝对收敛更强', '收敛更强'], correct: 1 },
      { question: '∑(−1)ⁿ⁻¹/n² 属于？', options: ['条件收敛', '绝对收敛', '发散'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '先加绝对值：判断 ∑|uₙ| 是否收敛' },
      { focus: 1, desc: '绝对收敛：加绝对值后仍收敛（最强）' },
      { focus: 2, desc: '条件收敛：加绝对值发散，但原级数收敛' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['先加绝对值', '绝对收敛', '条件收敛'][f]);
      const x0 = 100, y0 = 300, w = 680, h = 200;
      ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
      ln(g, x0, y0, x0, y0 - h, 'var(--border)', 1.4);
      if (f === 0) {
        txt(g, 450, 70, '任意项级数 ∑uₙ → 考察 ∑|uₙ|', 'var(--text)', 14, 'middle', '700');
        arw(g, 450, 90, 450, 140, 'var(--primary)');
        chip(g, 350, 150, 200, 62, '∑|uₙ|', 'var(--highlight)', '正项级数判别');
        arw(g, 350, 212, 250, 262, 'var(--success)');
        arw(g, 550, 212, 650, 262, 'var(--danger)');
        chip(g, 150, 265, 200, 56, '收敛 → 绝对收敛', 'var(--success)');
        chip(g, 550, 265, 200, 56, '发散 → 再看原级数', 'var(--danger)');
      }
      if (f === 1) {
        for (let i = 0; i < 30; i++) {
          const x = x0 + i * 20, hh = Math.min(0.9, 0.9 / ((i + 1) * (i + 1) * 0.12 + 1));
          g.append('rect').attr('x', x).attr('y', y0 - h * hh).attr('width', 16).attr('height', h * hh).attr('fill', 'var(--success)').attr('fill-opacity', 0.4);
        }
        txt(g, 450, 350, '∑1/n² 收敛 → ∑(−1)ⁿ⁻¹/n² 绝对收敛（加绝对值仍收敛）', 'var(--success)', 12.5, 'middle', '700');
      }
      if (f === 2) {
        for (let i = 0; i < 24; i++) {
          const x = x0 + i * 26, hh = 0.5 / (i + 1) * 3;
          g.append('rect').attr('x', x).attr('y', y0 - h * Math.min(0.8, hh)).attr('width', 18).attr('height', h * Math.min(0.8, hh)).attr('fill', 'var(--compare)').attr('fill-opacity', 0.45);
        }
        txt(g, 450, 350, '∑1/n 发散，但 ∑(−1)ⁿ⁻¹/n 收敛 → 条件收敛', 'var(--compare)', 12.5, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-63', level: 'B', title: '微分方程的基本概念',
    intuition: '微分方程 = 含未知函数及其导数的方程。几个核心概念：<strong>阶</strong>（最高阶导数的阶数）、<strong>通解</strong>（含独立任意常数、个数 = 阶数）、<strong>特解</strong>（确定常数后的解）、<strong>初始条件</strong>（定常数的条件）、<strong>线性/非线性</strong>（未知函数及各阶导数都是一次的为线性）。解微分方程的本质是「积分还原」。',
    derivation: [
      '\\text{阶}: \\; \\text{方程中未知函数导数的最高阶数}',
      '\\text{通解}: \\; n \\text{ 阶方程的通解含 } n \\text{ 个独立任意常数}',
      '\\text{特解}: \\; \\text{由初始条件确定常数后的解}',
      '\\text{线性方程}: \\; y\' + P(x)y = Q(x) \\; (\\text{关于 } y, y\' \\text{ 线性})'
    ],
    exam_text: '<b>【2017 真题改编】</b>y″ + 3y′ + 2y = 0 是几阶微分方程？通解含几个任意常数？',
    exam_answer: '答案：最高阶导数是 y″（二阶），故为<b>二阶</b>微分方程；通解含 <b>2 个</b>独立任意常数，形如 y = C₁e^(−x) + C₂e^(−2x)。若再给初始条件 y(0)=1, y′(0)=0，代入可解出 C₁、C₂ 得特解。',
    pitfalls: [
      '「阶」看最高阶导数，不看方程中出现的所有导数个数。',
      '通解中任意常数的个数必须等于阶数，且要「独立」（不能合并）。',
      '非线性方程（如 y′ = y²）没有「通解含 n 个常数」的通用保证。'
    ],
    quiz: [
      { question: 'y′ + 2y = x 是几阶？', options: ['一阶', '二阶', '零阶'], correct: 0 },
      { question: '二阶方程通解含几个独立常数？', options: ['1 个', '2 个', '3 个'], correct: 1 },
      { question: '确定特解需要什么？', options: ['通解即可', '初始条件', '任意常数'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '微分方程：含未知函数与导数的方程' },
      { focus: 1, desc: '阶与通解：n 阶方程含 n 个独立常数' },
      { focus: 2, desc: '初始条件 → 特解' },
      { focus: 3, desc: '线性与非线性方程的区分' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['方程与阶', '通解', '初值定特解', '线性 vs 非线性'][f]);
      if (f === 0) {
        ['y′ + 3y = 0', 'y″ + y = 0', 'y‴ − y = 0'].forEach(function (s, i) {
          box(g, 120, 80 + i * 80, 300, 60, ['var(--primary)', 'var(--success)', 'var(--highlight)'][i], 0.1);
          txt(g, 270, 118 + i * 80, s, 'var(--text)', 15, 'middle', '700');
          txt(g, 500, 118 + i * 80, ['一阶', '二阶', '三阶'][i], 'var(--text-muted)', 13, 'start', '700');
        });
        txt(g, 450, 350, '阶数 = 最高阶导数的阶数', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 100, 70, 700, 70, 'var(--primary)', 0.08);
        txt(g, 450, 105, 'n 阶方程的通解含 n 个独立任意常数', 'var(--primary-strong)', 15, 'middle', '700');
        txt(g, 450, 128, '例：y″ + 3y′ + 2y = 0 的通解', 'var(--text-muted)', 11);
        box(g, 160, 170, 580, 70, 'var(--success)', 0.1);
        txt(g, 450, 212, 'y = C₁e^(−x) + C₂e^(−2x)', 'var(--success)', 16, 'middle', '700');
        txt(g, 450, 285, '两个常数 C₁、C₂ 不能合并成一个', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 90, 70, 720, 90, 'var(--highlight)', 0.08);
        txt(g, 450, 105, '初始条件：y(x₀)=y₀, y′(x₀)=y₀′ …', 'var(--highlight)', 14, 'middle', '700');
        txt(g, 450, 138, '代入通解，解出所有任意常数', 'var(--text-muted)', 11.5);
        txt(g, 450, 210, 'y(0)=1, y′(0)=0 代入 y = C₁e⁻ˣ + C₂e⁻²ˣ', 'var(--text)', 12.5);
        txt(g, 450, 245, 'C₁ + C₂ = 1；−C₁ − 2C₂ = 0 ⟹ C₁=2, C₂=−1', 'var(--primary-strong)', 13);
        txt(g, 450, 285, '特解：y = 2e⁻ˣ − e⁻²ˣ', 'var(--success)', 14, 'middle', '700');
      }
      if (f === 3) {
        box(g, 70, 70, 360, 220, 'var(--primary)', 0.08);
        txt(g, 250, 105, '线性', 'var(--primary-strong)', 16, 'middle', '700');
        txt(g, 250, 145, 'y′ + P(x)y = Q(x)', 'var(--text)', 12.5);
        txt(g, 250, 175, 'y、y′ 都是一次', 'var(--text-muted)', 11.5);
        box(g, 470, 70, 360, 220, 'var(--danger)', 0.08);
        txt(g, 650, 105, '非线性', 'var(--danger)', 16, 'middle', '700');
        txt(g, 650, 145, 'y′ = y²，y·y″ = 1', 'var(--text)', 12.5);
        txt(g, 650, 175, '出现 y²、y·y′ 等', 'var(--text-muted)', 11.5);
        txt(g, 450, 340, '判断标准：关于 y 和它的各阶导数是否为一次式', 'var(--text-muted)', 12);
      }
    }
  },
  {
    id: 'MA-64', level: 'B', title: '一阶微分方程（可分离变量、齐次、一阶线性、伯努利）',
    intuition: '四类一阶方程的「识别 + 解法」：<strong>可分离变量</strong>（能写成 f(x)dx = g(y)dy，两边积分）；<strong>齐次方程</strong>（y′=φ(y/x)，令 u=y/x）；<strong>一阶线性</strong>（y′+P(x)y=Q(x)，套通解公式或积分因子 e^∫P dx）；<strong>伯努利</strong>（y′+P y=Q y^n，令 z=y^(1−n) 化为线性）。识别类型是第一步，方法选对就成功一半。',
    derivation: [
      '\\text{可分离}: \\; \\frac{dy}{dx}=f(x)g(y) \\Rightarrow \\int\\frac{dy}{g(y)}=\\int f(x)dx',
      '\\text{齐次}: \\; \\frac{dy}{dx}=\\varphi\\left(\\frac{y}{x}\\right), \\; u=\\frac{y}{x}',
      '\\text{一阶线性}: \\; y\'+P(x)y=Q(x) \\Rightarrow y=e^{-\\int P dx}\\left(\\int Q e^{\\int P dx}dx+C\\right)',
      '\\text{伯努利}: \\; y\'+Py=Qy^{n} \\Rightarrow z=y^{1-n}'
    ],
    exam_text: '<b>【2019 真题改编】</b>求解 dy/dx = 2xy。',
    exam_answer: '答案：可分离变量：dy/y = 2x dx，两边积分 ln|y| = x² + C₁，故 <b>y = C e^(x²)</b>（C 为任意常数）。验证：y′ = C·2x·e^(x²) = 2xy ✓。注意分离时除以 y 要假设 y≠0；y=0 也是解（C=0 时包含）。',
    pitfalls: [
      '分离变量时除以含 y 的因子，可能丢掉 y=0 这样的特解。',
      '一阶线性公式中的 e^∫P dx 别漏负号：通解是 e^(−∫P)（∫Q e^∫P + C）。',
      '齐次方程令 u=y/x 后，要把 y′=u+xu′ 代入，别只替换 y。'
    ],
    quiz: [
      { question: 'dy/dx = 2xy 的通解是？', options: ['y = Ce^(x²)', 'y = Cx²', 'y = e^(2x)+C'], correct: 0 },
      { question: '一阶线性方程的标准形式是？', options: ['y′+P(x)y=Q(x)', 'y′=P(x)Q(y)', 'y′=y/x'], correct: 0 },
      { question: '伯努利方程通过什么代换化为线性？', options: ['u=y/x', 'z=y^(1−n)', 'z=lny'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '可分离变量：变量分两边，各自积分' },
      { focus: 1, desc: '齐次方程：令 u=y/x 化为可分离' },
      { focus: 2, desc: '一阶线性：通解公式 / 积分因子' },
      { focus: 3, desc: '伯努利：z=y^(1−n) 化为线性' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['可分离变量', '齐次方程', '一阶线性', '伯努利'][f]);
      if (f === 0) {
        box(g, 100, 80, 320, 70, 'var(--primary)', 0.1);
        txt(g, 260, 122, 'dy/dx = f(x)g(y)', 'var(--primary-strong)', 14, 'middle', '700');
        arw(g, 430, 115, 500, 115, 'var(--text-muted)');
        box(g, 510, 80, 300, 70, 'var(--success)', 0.1);
        txt(g, 660, 122, 'dy/g(y) = f(x)dx', 'var(--success)', 14, 'middle', '700');
        txt(g, 450, 200, '两边分别积分：∫dy/g(y) = ∫f(x)dx', 'var(--text)', 13);
        txt(g, 450, 240, '例：dy/dx=2xy ⟹ ln|y| = x² + C ⟹ y = Ce^(x²)', 'var(--primary-strong)', 12.5);
        txt(g, 450, 290, '注意：除以 g(y) 时可能丢失 g(y)=0 的解', 'var(--danger)', 12, 'middle', '700');
      }
      if (f === 1) {
        box(g, 100, 80, 700, 60, 'var(--success)', 0.08);
        txt(g, 450, 118, 'y′ = φ(y/x)', 'var(--success)', 15, 'middle', '700');
        txt(g, 450, 170, '令 u = y/x ⟹ y = ux ⟹ y′ = u + x·u′', 'var(--text)', 13);
        box(g, 160, 200, 580, 60, 'var(--highlight)', 0.1);
        txt(g, 450, 238, 'u + xu′ = φ(u) ⟹ xu′ = φ(u) − u', 'var(--highlight)', 14, 'middle', '700');
        txt(g, 450, 295, '化为可分离变量，解出 u 后回代 u=y/x', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 90, 70, 720, 80, 'var(--primary)', 0.08);
        txt(g, 450, 105, 'y′ + P(x)y = Q(x)', 'var(--primary-strong)', 16, 'middle', '700');
        box(g, 60, 175, 780, 80, 'var(--highlight)', 0.1);
        txt(g, 450, 208, 'y = e^(−∫P dx) [ ∫ Q·e^(∫P dx) dx + C ]', 'var(--highlight)', 14, 'middle', '700');
        txt(g, 450, 240, '积分因子 μ = e^(∫P dx)', 'var(--text-muted)', 11.5);
        txt(g, 450, 300, '记忆：先求 ∫P，再取 e 的幂，最后套括号', 'var(--text-muted)', 12);
      }
      if (f === 3) {
        box(g, 100, 80, 700, 60, 'var(--swap)', 0.08);
        txt(g, 450, 118, 'y′ + P(x)y = Q(x)yⁿ  (n≠0,1)', 'var(--swap)', 15, 'middle', '700');
        arw(g, 450, 145, 450, 185, 'var(--text-muted)');
        box(g, 200, 190, 500, 60, 'var(--success)', 0.1);
        txt(g, 450, 228, '令 z = y^(1−n) ⟹ 化为线性方程', 'var(--success)', 14, 'middle', '700');
        txt(g, 450, 285, '解出 z 后再回代 z = y^(1−n)', 'var(--text-muted)', 12);
        txt(g, 450, 320, '例：y′ + y = y²，令 z=1/y 得 z′ − z = −1', 'var(--primary-strong)', 12);
      }
    }
  },
  {
    id: 'MA-65', level: 'B', title: '可降阶的高阶微分方程',
    intuition: '三类可降阶方程：<strong>y⁽ⁿ⁾=f(x)</strong>——连续积分 n 次；<strong>y″=f(x,y′)</strong>（不显含 y）——令 p=y′，则 y″=p′，方程降为一阶；<strong>y″=f(y,y′)</strong>（不显含 x）——令 p=y′，则 y″=p·dp/dy（把 y 当自变量），降为一阶。口诀：缺谁换谁。',
    derivation: [
      'y^{(n)}=f(x) \\Rightarrow y = \\underbrace{\\int\\cdots\\int}_{n\\ \\text{次}} f(x)dx\\cdots dx',
      'y\'\'=f(x,y\') \\Rightarrow p=y\',\\; p\'=f(x,p)',
      'y\'\'=f(y,y\') \\Rightarrow p=y\',\\; y\'\'=p\\frac{dp}{dy}',
      '\\text{口诀}: \\; \\text{缺 } y \\text{ 换 } p(x); \\; \\text{缺 } x \\text{ 换 } p(y)'
    ],
    exam_text: '<b>【2016 真题改编】</b>求 y″ = x 的通解。',
    exam_answer: '答案：连续积分两次：y′ = x²/2 + C₁，y = <b>x³/6 + C₁x + C₂</b>。二阶方程通解含两个常数。若方程是 y″=f(y′)，则令 p=y′ 先解一阶方程；若是 y″=f(y,y′)，令 p=y′ 且 y″=p dp/dy。',
    pitfalls: [
      '缺 y 与缺 x 的代换不同：缺 y 时 p=p(x)，缺 x 时 p=p(y) 且 y″=p·dp/dy。',
      '每次积分都要加一个常数，n 阶方程最后要有 n 个常数。',
      '回代 p=y′ 后还要再积分一次才得到 y。'
    ],
    quiz: [
      { question: 'y″=f(x,y′) 应令？', options: ['p=y′', 'p=y', 'p=x'], correct: 0 },
      { question: 'y″=f(y,y′) 时 y″ 等于？', options: ['p′', 'p·dp/dy', 'dp/dy'], correct: 1 },
      { question: 'y″=x 的通解是？', options: ['x³/6+C₁x+C₂', 'x²/2+C', 'x³/6+C'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: 'y⁽ⁿ⁾=f(x)：连续积分 n 次' },
      { focus: 1, desc: '缺 y：令 p=y′，降为一阶' },
      { focus: 2, desc: '缺 x：令 p=y′，y″=p·dp/dy' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['连续积分', '缺 y 型', '缺 x 型'][f]);
      if (f === 0) {
        ['y⁽ⁿ⁾ = f(x)', '↓ 积分', 'y⁽ⁿ⁻¹⁾ = ∫f dx + C₁', '↓ 再积分', '… 共 n 次 …', 'y = ∫…∫f + C₁xⁿ⁻¹/(n−1)! + … + Cₙ'].forEach(function (s, i) {
          txt(g, 450, 70 + i * 44, s, i % 2 ? 'var(--text-muted)' : 'var(--primary-strong)', i === 5 ? 12.5 : 13.5, 'middle', i === 5 ? '700' : '400');
        });
      }
      if (f === 1) {
        box(g, 100, 75, 700, 70, 'var(--primary)', 0.08);
        txt(g, 450, 105, 'y″ = f(x, y′)', 'var(--primary-strong)', 15, 'middle', '700');
        txt(g, 450, 130, '不显含 y', 'var(--text-muted)', 11);
        arw(g, 450, 145, 450, 185, 'var(--text-muted)');
        box(g, 200, 190, 500, 70, 'var(--success)', 0.1);
        txt(g, 450, 222, '令 p = y′，则 y″ = p′', 'var(--success)', 14, 'middle', '700');
        txt(g, 450, 246, 'p′ = f(x, p) 一阶方程', 'var(--text-muted)', 11.5);
        txt(g, 450, 300, '解出 p 后再积分得 y（记得再加常数）', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 100, 75, 700, 70, 'var(--swap)', 0.08);
        txt(g, 450, 105, 'y″ = f(y, y′)', 'var(--swap)', 15, 'middle', '700');
        txt(g, 450, 130, '不显含 x', 'var(--text-muted)', 11);
        arw(g, 450, 145, 450, 185, 'var(--text-muted)');
        box(g, 160, 190, 580, 80, 'var(--highlight)', 0.1);
        txt(g, 450, 220, '令 p = y′，则 y″ = p·dp/dy', 'var(--highlight)', 14, 'middle', '700');
        txt(g, 450, 246, 'p·dp/dy = f(y, p)：以 y 为自变量', 'var(--text-muted)', 11.5);
        txt(g, 450, 305, '关键：y″ 不是 p′，而是 p·dp/dy', 'var(--danger)', 12, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-66', level: 'B', title: '高阶线性微分方程解的结构',
    intuition: '线性方程的解有「叠加原理」：齐次方程 y″+Py′+Qy=0 的任意两个解线性组合仍是解，且<strong>通解 = C₁y₁ + C₂y₂</strong>（y₁、y₂ 线性无关，即朗斯基行列式≠0）。非齐次方程 y″+Py′+Qy=f(x) 的<strong>通解 = 齐次通解 + 非齐次一个特解</strong>。若 f=f₁+f₂，可分别求特解再相加（叠加原理）。',
    derivation: [
      '\\text{齐次通解}: \\; y = C_1y_1 + C_2y_2, \\; W(y_1,y_2)\\neq 0',
      '\\text{非齐次通解}: \\; y = C_1y_1 + C_2y_2 + y^{*}',
      '\\text{叠加原理}: \\; f=f_1+f_2 \\Rightarrow y^{*}=y_1^{*}+y_2^{*}',
      'W = \\begin{vmatrix}y_1&y_2\\\\y_1\'&y_2\'\\end{vmatrix} \\neq 0 \\Leftrightarrow \\text{线性无关}'
    ],
    exam_text: '<b>【2018 真题改编】</b>已知 y₁=e^x、y₂=e^(2x) 是 y″−3y′+2y=0 的两个解，写出通解。',
    exam_answer: '答案：y₁、y₂ 线性无关（W= e^x·2e^(2x) − e^(2x)·e^x = e^(3x) ≠ 0），故通解为 <b>y = C₁e^x + C₂e^(2x)</b>。若方程右端是非零 f(x)，则通解 = 该齐次通解 + 非齐次的一个特解。',
    pitfalls: [
      '「两个解」不代表「通解」——必须线性无关（W≠0）才能组成通解。',
      '非齐次通解 = 齐次通解 + 一个特解，不是「两个特解相加」。',
      '叠加原理只对线性方程成立，非线性方程不能这样拆。'
    ],
    quiz: [
      { question: '二阶齐次方程通解需要几个线性无关解？', options: ['1 个', '2 个', '3 个'], correct: 1 },
      { question: '非齐次通解等于？', options: ['齐次通解+特解', '特解+特解', '齐次通解'], correct: 0 },
      { question: '两解线性无关的判别是？', options: ['W=0', 'W≠0', '两解相等'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '齐次方程：解的线性组合仍是解' },
      { focus: 1, desc: '通解结构：C₁y₁ + C₂y₂（需线性无关）' },
      { focus: 2, desc: '非齐次：齐次通解 + 一个特解' },
      { focus: 3, desc: '叠加原理：右端可拆则特解可拆' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['叠加原理', '通解结构', '非齐次结构', '叠加拆项'][f]);
      if (f === 0) {
        box(g, 110, 80, 680, 70, 'var(--primary)', 0.08);
        txt(g, 450, 112, 'y″ + Py′ + Qy = 0', 'var(--primary-strong)', 15, 'middle', '700');
        txt(g, 450, 136, '若 y₁、y₂ 是解，则 C₁y₁+C₂y₂ 也是解', 'var(--text-muted)', 11.5);
        txt(g, 450, 200, '线性方程的核心性质：解可以叠加', 'var(--text)', 13);
        txt(g, 450, 240, '非线性方程（如 y′=y²）不满足', 'var(--danger)', 12, 'middle', '700');
      }
      if (f === 1) {
        box(g, 130, 75, 640, 80, 'var(--success)', 0.1);
        txt(g, 450, 112, 'y = C₁y₁ + C₂y₂', 'var(--success)', 18, 'middle', '700');
        txt(g, 450, 140, '前提：y₁、y₂ 线性无关（W≠0）', 'var(--text-muted)', 11.5);
        txt(g, 450, 210, 'W = |y₁ y₂; y₁′ y₂′| ≠ 0', 'var(--text)', 13);
        txt(g, 450, 250, '例：e^x 与 e^(2x) 的 W = e^(3x) ≠ 0', 'var(--primary-strong)', 12.5);
        txt(g, 450, 290, '故 y = C₁e^x + C₂e^(2x) 是通解', 'var(--success)', 13, 'middle', '700');
      }
      if (f === 2) {
        box(g, 100, 75, 700, 70, 'var(--primary)', 0.08);
        txt(g, 450, 110, 'y″ + Py′ + Qy = f(x)', 'var(--primary-strong)', 15, 'middle', '700');
        txt(g, 450, 135, '非齐次方程', 'var(--text-muted)', 11);
        box(g, 80, 175, 340, 80, 'var(--success)', 0.1);
        txt(g, 250, 207, '齐次通解', 'var(--success)', 14, 'middle', '700');
        txt(g, 250, 232, 'C₁y₁ + C₂y₂', 'var(--text)', 12.5);
        txt(g, 450, 218, '+', 'var(--text)', 20, 'middle', '700');
        box(g, 480, 175, 340, 80, 'var(--highlight)', 0.1);
        txt(g, 650, 207, '非齐次特解', 'var(--highlight)', 14, 'middle', '700');
        txt(g, 650, 232, 'y*（任找一个）', 'var(--text)', 12.5);
        txt(g, 450, 300, '两者相加 = 非齐次方程通解', 'var(--primary-strong)', 13, 'middle', '700');
      }
      if (f === 3) {
        box(g, 90, 70, 720, 70, 'var(--swap)', 0.08);
        txt(g, 450, 105, 'f(x) = f₁(x) + f₂(x)', 'var(--swap)', 15, 'middle', '700');
        arw(g, 450, 140, 300, 185, 'var(--text-muted)');
        arw(g, 450, 140, 600, 185, 'var(--text-muted)');
        box(g, 150, 190, 300, 70, 'var(--success)', 0.1);
        txt(g, 300, 220, '求 y₁* 满足 f₁', 'var(--success)', 12.5, 'middle', '700');
        box(g, 450, 190, 300, 70, 'var(--highlight)', 0.1);
        txt(g, 600, 220, '求 y₂* 满足 f₂', 'var(--highlight)', 12.5, 'middle', '700');
        txt(g, 450, 300, '则 y* = y₁* + y₂* 是原方程的特解', 'var(--primary-strong)', 13, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-67', level: 'B', title: '二阶常系数齐次线性微分方程',
    intuition: 'y″ + py′ + qy = 0 的解法：写<strong>特征方程</strong> r² + pr + q = 0，按判别式分三种情况：<strong>两个不同实根</strong> r₁≠r₂ → y = C₁e^(r₁x) + C₂e^(r₂x)；<strong>二重实根</strong> r₁=r₂=r → y = (C₁+C₂x)e^(rx)；<strong>共轭复根</strong> α±βi → y = e^(αx)(C₁cos βx + C₂sin βx)。',
    derivation: [
      '\\text{特征方程}: \\; r^{2}+pr+q=0',
      '\\Delta>0: \\; y=C_1e^{r_1x}+C_2e^{r_2x}',
      '\\Delta=0: \\; y=(C_1+C_2x)e^{rx}',
      '\\Delta<0: \\; y=e^{\\alpha x}(C_1\\cos\\beta x+C_2\\sin\\beta x)'
    ],
    exam_text: '<b>【2017 真题改编】</b>求 y″ − 2y′ + 5y = 0 的通解。',
    exam_answer: '答案：特征方程 r²−2r+5=0，判别式 Δ=4−20=−16<0，根 r=1±2i（α=1，β=2）。故通解 <b>y = e^x(C₁cos 2x + C₂sin 2x)</b>。三种情况对应「不同实根 → 指数」「重根 → 指数乘一次多项式」「复根 → 指数乘三角」，这是固定套路。',
    pitfalls: [
      '特征方程是 r² + pr + q = 0，系数直接抄方程，别把 y 的系数放到 r² 上。',
      '重根时要乘 x：y=(C₁+C₂x)e^(rx)，漏乘 x 是高频错误。',
      '复根 α±βi 时，解中的指数是 e^(αx)，三角是 cos βx、sin βx——α、β 别用反。'
    ],
    quiz: [
      { question: 'y″−3y′+2y=0 的特征根是？', options: ['1, 2', '−1, −2', '1, −2'], correct: 0 },
      { question: '重根时通解形式是？', options: ['(C₁+C₂x)e^(rx)', 'C₁e^(rx)', 'C₁cos rx'], correct: 0 },
      { question: 'r=1±2i 时通解含？', options: ['e^x(C₁cos2x+C₂sin2x)', 'e^(2x)(C₁cos x+C₂sin x)', 'C₁e^x+C₂e^(2x)'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '写特征方程 r²+pr+q=0' },
      { focus: 1, desc: '两个不同实根：两个指数解相加' },
      { focus: 2, desc: '二重实根：指数解乘 (C₁+C₂x)' },
      { focus: 3, desc: '共轭复根：指数 × 三角函数' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['特征方程', '不同实根', '二重根', '共轭复根'][f]);
      box(g, 100, 70, 700, 60, 'var(--primary)', 0.08);
      txt(g, 450, 108, 'y″ + py′ + qy = 0  ⟹  r² + pr + q = 0', 'var(--primary-strong)', 15, 'middle', '700');
      if (f === 1) {
        box(g, 110, 160, 680, 80, 'var(--success)', 0.1);
        txt(g, 450, 192, 'Δ > 0：r₁ ≠ r₂（实根）', 'var(--success)', 14, 'middle', '700');
        txt(g, 450, 222, 'y = C₁e^(r₁x) + C₂e^(r₂x)', 'var(--text)', 14, 'middle', '700');
        txt(g, 450, 290, '例：r²−3r+2=0 → r=1,2 → y=C₁e^x+C₂e^(2x)', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 110, 160, 680, 80, 'var(--highlight)', 0.1);
        txt(g, 450, 192, 'Δ = 0：r₁ = r₂ = r', 'var(--highlight)', 14, 'middle', '700');
        txt(g, 450, 222, 'y = (C₁ + C₂x)e^(rx)', 'var(--text)', 14, 'middle', '700');
        txt(g, 450, 290, '重根要乘 x：两个解是 e^(rx) 与 x·e^(rx)', 'var(--text-muted)', 12);
      }
      if (f === 3) {
        box(g, 110, 160, 680, 80, 'var(--swap)', 0.1);
        txt(g, 450, 192, 'Δ < 0：r = α ± βi', 'var(--swap)', 14, 'middle', '700');
        txt(g, 450, 222, 'y = e^(αx)(C₁cos βx + C₂sin βx)', 'var(--text)', 14, 'middle', '700');
        txt(g, 450, 290, '例：r²−2r+5=0 → 1±2i → y=e^x(C₁cos2x+C₂sin2x)', 'var(--text-muted)', 12);
      }
    }
  },
  {
    id: 'MA-68', level: 'B', title: '二阶常系数非齐次线性微分方程',
    intuition: '求 y″+py′+qy=f(x) 的通解 = 齐次通解 + 一个特解。特解用<strong>待定系数法</strong>：① f=Pₘ(x)e^(λx) 时设 y*=x^k Qₘ(x)e^(λx)，k 为 λ 是特征根的重数（0/1/2）；② f=e^(αx)[P cos βx + Q sin βx] 时设 y*=x^k e^(αx)[R cos βx + S sin βx]，k 看 α±βi 是否为特征根。',
    derivation: [
      'y = \\underbrace{C_1y_1+C_2y_2}_{\\text{齐次通解}} + \\underbrace{y^{*}}_{\\text{一个特解}}',
      'f=P_m(x)e^{\\lambda x}: \\; y^{*}=x^{k}Q_m(x)e^{\\lambda x}',
      'k = \\lambda \\text{ 作为特征根的重数（0,1,2）}',
      'f=e^{\\alpha x}[P\\cos\\beta x+Q\\sin\\beta x]: \\; y^{*}=x^{k}e^{\\alpha x}[R\\cos\\beta x+S\\sin\\beta x]'
    ],
    exam_text: '<b>【2019 真题改编】</b>求 y″ − 2y′ + y = e^x 的一个特解。',
    exam_answer: '答案：特征方程 r²−2r+1=0，r=1 是<b>二重根</b>。f=e^x 中 λ=1 是二重特征根，故 k=2，设 y*=Ax²e^x。代入方程：求得 A=1/2，故 <b>y* = (1/2)x²e^x</b>。这里 k=2 是本例的关键——λ 恰为二重根时必须乘 x²。',
    pitfalls: [
      'k 的取值看「λ 是否为特征根、是几重根」：不是根 k=0，单根 k=1，重根 k=2。',
      '设特解时多项式 Qₘ 的次数要与 Pₘ 相同，不能漏项或少次。',
      '求出的特解只是一个，通解还要加齐次通解。'
    ],
    quiz: [
      { question: 'f=e^x 且 1 是单特征根时，k 取？', options: ['0', '1', '2'], correct: 1 },
      { question: '非齐次通解等于？', options: ['特解', '齐次通解+特解', '齐次通解'], correct: 1 },
      { question: '设特解时多项式的次数应？', options: ['与 f 中多项式相同', '总是 0', '比 f 高一次'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '通解结构：齐次通解 + 一个特解' },
      { focus: 1, desc: 'f=Pₘe^(λx)：设 y*=x^k Qₘe^(λx)' },
      { focus: 2, desc: 'k 由 λ 与特征根的关系决定' },
      { focus: 3, desc: '三角型 f：设 x^k e^(αx)(R cos+S sin)' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['通解结构', '指数型特解', 'k 的判定', '三角型特解'][f]);
      if (f === 0) {
        box(g, 100, 75, 700, 60, 'var(--primary)', 0.08);
        txt(g, 450, 112, 'y = (C₁y₁+C₂y₂) + y*', 'var(--primary-strong)', 16, 'middle', '700');
        txt(g, 450, 175, '前半：齐次方程的通解（含两个常数）', 'var(--success)', 13);
        txt(g, 450, 210, '后半：非齐次方程的一个特解（待定系数求）', 'var(--highlight)', 13);
        txt(g, 450, 260, '两者相加 = 非齐次方程全部解', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 90, 70, 720, 60, 'var(--success)', 0.08);
        txt(g, 450, 106, 'f(x) = Pₘ(x)e^(λx)', 'var(--success)', 15, 'middle', '700');
        arw(g, 450, 135, 450, 175, 'var(--text-muted)');
        box(g, 110, 180, 680, 70, 'var(--highlight)', 0.1);
        txt(g, 450, 212, 'y* = x^k · Qₘ(x) · e^(λx)', 'var(--highlight)', 16, 'middle', '700');
        txt(g, 450, 236, 'Qₘ 与 Pₘ 同次，系数待定', 'var(--text-muted)', 11.5);
        txt(g, 450, 295, '代入原方程，比较系数解出待定系数', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        const rows = [['λ 不是特征根', 'k = 0', 'var(--primary)'], ['λ 是单特征根', 'k = 1', 'var(--highlight)'], ['λ 是二重特征根', 'k = 2', 'var(--danger)']];
        rows.forEach(function (r, i) {
          const y = 80 + i * 80;
          box(g, 110, y, 680, 64, r[2], 0.1);
          txt(g, 160, y + 40, r[0], 'var(--text)', 13, 'start', '700');
          txt(g, 620, y + 40, r[1], r[2], 14, 'start', '700');
        });
        txt(g, 450, 340, 'k 就是「λ 是几重特征根」，最多 2（二阶方程）', 'var(--text-muted)', 12);
      }
      if (f === 3) {
        box(g, 80, 70, 740, 70, 'var(--swap)', 0.08);
        txt(g, 450, 100, 'f = e^(αx)[P cos βx + Q sin βx]', 'var(--swap)', 14, 'middle', '700');
        txt(g, 450, 124, 'α±βi 是否为特征根决定 k', 'var(--text-muted)', 11);
        box(g, 90, 180, 720, 70, 'var(--highlight)', 0.1);
        txt(g, 450, 212, 'y* = x^k e^(αx)[R cos βx + S sin βx]', 'var(--highlight)', 14, 'middle', '700');
        txt(g, 450, 236, 'k=0 或 1（α±βi 是特征根则 k=1）', 'var(--text-muted)', 11);
        txt(g, 450, 295, '同样用待定系数法：代入、比较 cos/sin 系数', 'var(--text-muted)', 12);
      }
    }
  },
  {
    id: 'MA-69', level: 'B', title: '欧拉方程（数一）',
    intuition: '欧拉方程形如 x²y″ + pxy′ + qy = f(x)（各项「x 的幂次 = 导数的阶数」）。解法固定：作<strong>变量代换 x=e^t</strong>（或 t=ln x），则 xy′=dy/dt，x²y″=d²y/dt²−dy/dt，方程化为<strong>常系数线性方程</strong>，解出后再回代 t=ln x。',
    derivation: [
      'x^{2}y\'\'+pxy\'+qy=f(x) \\quad (\\text{欧拉方程})',
      'x=e^{t}: \\; xy\'=\\frac{dy}{dt}, \\; x^{2}y\'\'=\\frac{d^{2}y}{dt^{2}}-\\frac{dy}{dt}',
      '\\text{化为}: \\; \\frac{d^{2}y}{dt^{2}}+(p-1)\\frac{dy}{dt}+qy=f(e^{t})',
      '\\text{解出 } y(t) \\text{ 后回代 } t=\\ln x'
    ],
    exam_text: '<b>【2018 真题改编】</b>求解 x²y″ − 2xy′ + 2y = 0（x>0）。',
    exam_answer: '答案：令 x=e^t，则 x²y″=ÿ−ẏ，xy′=ẏ，代入得 ÿ − 3ẏ + 2y = 0。特征方程 r²−3r+2=0，r=1,2，故 y=C₁e^t+C₂e^(2t)。回代 t=ln x：<b>y = C₁x + C₂x²</b>。欧拉方程的特征方程也可直接由「试解 y=x^r」得到：r(r−1)−2r+2=0。',
    pitfalls: [
      '代换后 x²y″ 要变成 ÿ−ẏ（不是 ÿ），漏减 ẏ 是高频错误。',
      '回代时 e^t = x，e^(2t) = x²，别写成 ln x。',
      '欧拉方程要求 x>0（否则 ln x 无定义），x<0 时用 |x|。'
    ],
    quiz: [
      { question: '欧拉方程的标准代换是？', options: ['x=e^t', 'y=e^t', 't=x²'], correct: 0 },
      { question: 'x²y″ 代换后等于？', options: ['ÿ', 'ÿ−ẏ', 'ÿ+ẏ'], correct: 1 },
      { question: 'x²y″−2xy′+2y=0 的通解是？', options: ['C₁x+C₂x²', 'C₁e^x+C₂e^(2x)', 'C₁lnx+C₂x'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '识别欧拉方程：x 的幂次 = 导数阶数' },
      { focus: 1, desc: '代换 x=e^t：化为常系数方程' },
      { focus: 2, desc: '解常系数方程后回代 t=ln x' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['方程形式', '变量代换', '回代'][f]);
      if (f === 0) {
        box(g, 110, 80, 680, 70, 'var(--primary)', 0.1);
        txt(g, 450, 118, 'x²y″ + pxy′ + qy = f(x)', 'var(--primary-strong)', 16, 'middle', '700');
        txt(g, 450, 145, 'x 的次数 = 导数的阶数（2、1、0）', 'var(--text-muted)', 11.5);
        txt(g, 450, 210, '例：x²y″ − 2xy′ + 2y = 0', 'var(--text)', 13);
        txt(g, 450, 245, '对比常系数：y″ − 2y′ + 2y = 0（少了 x 的幂）', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 90, 70, 720, 60, 'var(--success)', 0.08);
        txt(g, 450, 106, '令 x = e^t（即 t = ln x）', 'var(--success)', 15, 'middle', '700');
        ['xy′ = ẏ', 'x²y″ = ÿ − ẏ', 'x³y‴ = y⃛ − 3ÿ + 2ẏ'].forEach(function (s, i) {
          box(g, 160, 160 + i * 62, 580, 50, 'var(--highlight)', 0.1);
          txt(g, 450, 192 + i * 62, s, 'var(--text)', 13, 'middle', '700');
        });
        txt(g, 450, 355, '代入后得到关于 t 的常系数线性方程', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        const rows = [['原方程', 'x²y″−2xy′+2y=0'], ['代换后', 'ÿ − 3ẏ + 2y = 0'], ['特征根', 'r = 1, 2'], ['y(t)', 'C₁e^t + C₂e^(2t)'], ['回代', 'y = C₁x + C₂x²']];
        rows.forEach(function (r, i) {
          const y = 60 + i * 58;
          box(g, 120, y, 660, 46, i === 4 ? 'var(--success)' : 'var(--primary)', 0.1);
          txt(g, 150, y + 29, r[0], 'var(--text-muted)', 11.5, 'start', '700');
          txt(g, 320, y + 29, r[1], i === 4 ? 'var(--success)' : 'var(--text)', 13, 'start', '700');
        });
      }
    }
  },
  {
    id: 'MA-70', level: 'B', title: '微分方程的应用',
    intuition: '微分方程建模四步：<strong>① 设变量</strong>（明确自变量/未知函数）、<strong>② 找关系</strong>（用变化率、几何关系、物理定律列方程）、<strong>③ 解方程</strong>（识别类型、套解法）、<strong>④ 定常数</strong>（用初始条件）。常见模型：变化率与当前量成正比（人口/放射性衰变）、切线/法线几何条件、牛顿冷却定律、混合问题。',
    derivation: [
      '\\text{变化率模型}: \\; \\frac{dy}{dt}=ky \\Rightarrow y=Ce^{kt}',
      '\\text{冷却定律}: \\; \\frac{dT}{dt}=k(T-T_0)',
      '\\text{几何条件}: \\; \\text{切线斜率} = y\', \\; \\text{法线斜率} = -1/y\'',
      '\\text{混合问题}: \\; \\frac{dy}{dt}=\\text{流入速率}-\\text{流出速率}'
    ],
    exam_text: '<b>【2017 真题改编】</b>某放射性物质衰变速率与当前质量成正比，初始质量 100g，2 小时后剩 80g。求质量随时间变化的函数。',
    exam_answer: '答案：设 m(t)，则 dm/dt = −km（k>0）。解得 m = Ce^(−kt)。由 m(0)=100 得 C=100；由 m(2)=80 得 e^(−2k)=0.8，k = −ln0.8/2 ≈ 0.1116。故 <b>m(t) = 100e^(−0.1116t)</b>。这类「速率 ∝ 当前量」的题，通解都是指数函数。',
    pitfalls: [
      '「成正比」要带比例系数 k（可正可负），并根据物理意义确定符号。',
      '初始条件用来定常数 C，别忘记代入。',
      '几何题中「切线斜率」是 y′，「法线斜率」是 −1/y′，注意区分。'
    ],
    quiz: [
      { question: 'dy/dt = ky 的通解是？', options: ['y=Ce^(kt)', 'y=Ct', 'y=C+k t'], correct: 0 },
      { question: '法线斜率等于？', options: ['y′', '−1/y′', '1/y′'], correct: 1 },
      { question: '建模第一步通常是？', options: ['解方程', '设变量并列关系', '定常数'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '建模四步：设变量 → 列方程 → 求解 → 定常数' },
      { focus: 1, desc: '变化率 ∝ 当前量：指数模型' },
      { focus: 2, desc: '几何应用：切线、法线条件' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['建模四步', '指数模型', '几何应用'][f]);
      if (f === 0) {
        ['① 设变量', '② 找关系列方程', '③ 识别类型求解', '④ 初始条件定常数'].forEach(function (s, i) {
          box(g, 120, 60 + i * 74, 660, 58, ['var(--primary)', 'var(--success)', 'var(--highlight)', 'var(--swap)'][i], 0.1);
          txt(g, 450, 96 + i * 74, s, 'var(--text)', 14, 'middle', '700');
          if (i < 3) arw(g, 450, 118 + i * 74, 450, 134 + i * 74, 'var(--text-muted)');
        });
      }
      if (f === 1) {
        const x0 = 110, y0 = 290, w = 640, h = 190;
        ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
        ln(g, x0, y0, x0, y0 - h, 'var(--border)', 1.4);
        plot(g, function (t) { return 0.9 * Math.exp(-2.2 * t); }, x0, y0, w, h, 'var(--primary)', 2.4);
        box(g, 480, 70, 360, 76, 'var(--primary)', 0.08);
        txt(g, 660, 100, 'dm/dt = −km', 'var(--primary-strong)', 14, 'middle', '700');
        txt(g, 660, 126, 'm = Ce^(−kt)', 'var(--text)', 13);
        txt(g, 450, 350, '「速率与当前量成正比」→ 指数衰减/增长', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        const x0 = 120, y0 = 300, w = 620, h = 190;
        ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
        plot(g, function (t) { return 0.3 + t * t; }, x0, y0, w * 0.8, h, 'var(--primary)', 2.2);
        const px = x0 + w * 0.4, py = y0 - h * (0.3 + 0.16);
        ln(g, px - 80, py + 80, px + 80, py - 80, 'var(--highlight)', 2);
        ln(g, px - 50, py - 50, px + 50, py + 50, 'var(--danger)', 2, '5,4');
        txt(g, px + 90, py - 86, '切线 k=y′', 'var(--highlight)', 11, 'start', '700');
        txt(g, px + 58, py + 58, '法线 −1/y′', 'var(--danger)', 11, 'start', '700');
        txt(g, 450, 350, '几何条件题：把「切线/法线/面积」翻译成微分方程', 'var(--text-muted)', 12);
      }
    }
  }
];
