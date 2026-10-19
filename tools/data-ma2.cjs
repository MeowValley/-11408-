module.exports = [
  {
    id: 'MA-29', level: 'B', title: '向量的概念、线性运算、数量积、向量积、混合积',
    intuition: '向量是「有方向的量」。三种乘积是空间解析几何的核心工具：<strong>数量积</strong> a·b = |a||b|cosθ（结果标量，可判垂直、求夹角、求投影）；<strong>向量积</strong> a×b（结果向量，方向右手定则，模长 = 平行四边形面积，可判平行、求法向量）；<strong>混合积</strong> [abc] = (a×b)·c（结果标量，绝对值 = 平行六面体体积，=0 表示三向量共面）。',
    derivation: [
      '\\mathbf{a}\\cdot\\mathbf{b}=|\\mathbf{a}||\\mathbf{b}|\\cos\\theta = a_xb_x+a_yb_y+a_zb_z',
      '\\mathbf{a}\\times\\mathbf{b}=\\begin{vmatrix}\\mathbf{i}&\\mathbf{j}&\\mathbf{k}\\\\a_x&a_y&a_z\\\\b_x&b_y&b_z\\end{vmatrix}',
      '|\\mathbf{a}\\times\\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|\\sin\\theta = S_{\\text{平行四边形}}',
      '[\\mathbf{a}\\mathbf{b}\\mathbf{c}]=(\\mathbf{a}\\times\\mathbf{b})\\cdot\\mathbf{c} = V_{\\text{平行六面体}}'
    ],
    exam_text: '<b>【2017 真题改编】</b>已知 a=(1,2,3)，b=(2,−1,0)，求 a·b 与 a×b。',
    exam_answer: '答案：a·b = 1×2 + 2×(−1) + 3×0 = <b>0</b>，说明 a⊥b。a×b = |i j k; 1 2 3; 2 −1 0| = i(2×0−3×(−1)) − j(1×0−3×2) + k(1×(−1)−2×2) = <b>(3, 6, −5)</b>。验证：a·(a×b)=3+12−15=0 ✓（叉积结果垂直于 a）。',
    pitfalls: [
      '数量积结果是数，向量积结果是向量——不要混淆两者的类型。',
      'a×b = −b×a（反交换律），方向相反，不要写反。',
      '混合积为 0 表示三向量共面，而不是「三个向量都为零向量」。'
    ],
    quiz: [
      { question: 'a·b = 0 说明？', options: ['a、b 平行', 'a、b 垂直', 'a 或 b 为零'], correct: 1 },
      { question: '|a×b| 的几何意义是？', options: ['平行四边形面积', '三角形周长', '向量长度'], correct: 0 },
      { question: '混合积 [abc] = 0 说明？', options: ['三向量共面', '三向量两两垂直', '三向量同向'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '数量积：投影相乘，结果标量，判断垂直' },
      { focus: 1, desc: '向量积：右手定则，模长是平行四边形面积' },
      { focus: 2, desc: '混合积：平行六面体体积，判断共面' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['数量积', '向量积', '混合积'][f]);
      if (f === 0) {
        const ox = 250, oy = 270;
        arw(g, ox, oy, ox + 320, oy - 60, 'var(--primary)');
        arw(g, ox, oy, ox + 180, oy - 170, 'var(--success)');
        txt(g, ox + 330, oy - 66, 'a', 'var(--primary)', 14, 'start', '700');
        txt(g, ox + 186, oy - 182, 'b', 'var(--success)', 14, 'start', '700');
        ln(g, ox + 180, oy - 170, ox + 180, oy, 'var(--highlight)', 1.4, '5,4');
        txt(g, ox + 186, oy - 18, '投影', 'var(--highlight)', 10.5, 'start');
        box(g, 560, 80, 320, 90, 'var(--primary)', 0.08);
        txt(g, 720, 112, 'a·b = |a||b|cosθ', 'var(--primary-strong)', 14, 'middle', '700');
        txt(g, 720, 140, '= 投影 × |b|', 'var(--text-muted)', 11.5);
        txt(g, 450, 340, 'a·b = 0 ⟺ a⊥b；a·a = |a|²', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        const ox = 230, oy = 280;
        arw(g, ox, oy, ox + 300, oy, 'var(--primary)');
        arw(g, ox, oy, ox + 60, oy - 160, 'var(--success)');
        g.append('path').attr('d', 'M 530 280 L 290 120 L 350 120 L 590 280 Z').attr('fill', 'var(--highlight)').attr('fill-opacity', 0.14).attr('stroke', 'var(--highlight)').attr('stroke-width', 1.6);
        txt(g, ox + 310, oy + 6, 'a', 'var(--primary)', 14, 'start', '700');
        txt(g, ox + 40, oy - 170, 'b', 'var(--success)', 14, 'start', '700');
        arw(g, ox + 120, oy - 90, ox + 120, oy - 210, 'var(--danger)');
        txt(g, ox + 130, oy - 210, 'a×b（右手定则）', 'var(--danger)', 11, 'start', '700');
        txt(g, 450, 350, '模长 = 平行四边形面积 = |a||b|sinθ', 'var(--highlight)', 12.5, 'middle', '700');
      }
      if (f === 2) {
        const ox = 210, oy = 300;
        arw(g, ox, oy, ox + 260, oy, 'var(--primary)');
        arw(g, ox, oy, ox + 90, oy - 130, 'var(--success)');
        arw(g, ox, oy, ox - 60, oy - 70, 'var(--swap)');
        g.append('path').attr('d', 'M 470 300 L 560 170 L 500 120 L 300 170 L 290 300 Z').attr('fill', 'var(--highlight)').attr('fill-opacity', 0.1);
        txt(g, ox + 270, oy + 6, 'a', 'var(--primary)', 13, 'start', '700');
        txt(g, ox + 96, oy - 140, 'b', 'var(--success)', 13, 'start', '700');
        txt(g, ox - 74, oy - 80, 'c', 'var(--swap)', 13, 'start', '700');
        txt(g, 450, 350, '[abc] 绝对值 = 平行六面体体积；=0 时三向量共面', 'var(--highlight)', 12.5, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-30', level: 'B', title: '平面方程（点法式、一般式）',
    intuition: '确定一个平面只需「一个点 + 一个法向量」。<strong>点法式</strong>：A(x−x₀)+B(y−y₀)+C(z−z₀)=0，法向量 n=(A,B,C)。<strong>一般式</strong>：Ax+By+Cz+D=0，法向量直接读系数。特殊位置看缺项：D=0 过原点；缺 z 项则平行于 z 轴。求平面方程的套路：找一点、找两个方向向量（或一个法向量），叉乘得法向量，套点法式。',
    derivation: [
      '\\text{点法式}: \\; A(x-x_0)+B(y-y_0)+C(z-z_0)=0',
      '\\text{一般式}: \\; Ax+By+Cz+D=0, \\; \\mathbf{n}=(A,B,C)',
      '\\text{三点确定平面}: \\; \\mathbf{n}=\\overrightarrow{M_1M_2}\\times\\overrightarrow{M_1M_3}',
      '\\text{截距式}: \\; \\frac{x}{a}+\\frac{y}{b}+\\frac{z}{c}=1'
    ],
    exam_text: '<b>【2019 真题改编】</b>求过点 (1,2,3) 且垂直于向量 n=(2,−1,4) 的平面方程。',
    exam_answer: '答案：直接套点法式：2(x−1) − (y−2) + 4(z−3) = 0，展开得 <b>2x − y + 4z − 12 = 0</b>。验证：点 (1,2,3) 代入得 2−2+12−12=0 ✓。若题目给三个点，先用两点差求两个方向向量、叉乘得法向量，再用点法式。',
    pitfalls: [
      '法向量垂直的是「平面」，不是「平面上的直线」——别把方向向量误当法向量。',
      '一般式中法向量直接是 (A,B,C)，不用再算。',
      '平面过原点 ⟺ D=0；平面平行于 z 轴 ⟺ z 的系数 C=0。'
    ],
    quiz: [
      { question: '平面 2x−y+4z−12=0 的法向量是？', options: ['(2,−1,4)', '(1,2,3)', '(2,1,4)'], correct: 0 },
      { question: '平面过原点的条件是？', options: ['A=0', 'D=0', 'C=0'], correct: 1 },
      { question: '确定平面需要的条件是？', options: ['一个点+一个法向量', '两个点', '一个方向向量'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '点法式：点 + 法向量唯一确定平面' },
      { focus: 1, desc: '一般式与法向量的直接读取' },
      { focus: 2, desc: '三点求平面：两方向向量叉乘得法向量' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['点法式', '一般式', '三点求平面'][f]);
      const ox = 200, oy = 280;
      g.append('path').attr('d', 'M 120 250 L 420 150 L 700 210 L 400 320 Z').attr('fill', 'var(--primary)').attr('fill-opacity', 0.12).attr('stroke', 'var(--primary)').attr('stroke-width', 2);
      circ(g, 400, 240, 6, 'var(--highlight)');
      arw(g, 400, 240, 400, 100, 'var(--danger)');
      txt(g, 410, 96, 'n = (A,B,C)', 'var(--danger)', 12, 'start', '700');
      txt(g, 400, 268, 'P₀(x₀,y₀,z₀)', 'var(--highlight)', 11.5);
      if (f === 0) {
        box(g, 100, 60, 380, 60, 'var(--primary)', 0.1);
        txt(g, 290, 96, 'A(x−x₀)+B(y−y₀)+C(z−z₀)=0', 'var(--primary-strong)', 13, 'middle', '700');
        txt(g, 620, 330, '例：2(x−1)−(y−2)+4(z−3)=0', 'var(--text)', 12);
        txt(g, 620, 358, '⟹ 2x−y+4z−12=0', 'var(--success)', 12.5, 'middle', '700');
      }
      if (f === 1) {
        box(g, 100, 60, 360, 60, 'var(--success)', 0.1);
        txt(g, 280, 96, 'Ax+By+Cz+D=0', 'var(--success)', 15, 'middle', '700');
        [['D=0', '过原点'], ['C=0', '平行 z 轴'], ['A=B=0', '平行 z 轴（仅 Cz+D=0）']].forEach(function (r, i) {
          txt(g, 560, 200 + i * 34, r[0], 'var(--highlight)', 12, 'start', '700');
          txt(g, 650, 200 + i * 34, r[1], 'var(--text)', 12, 'start');
        });
      }
      if (f === 2) {
        circ(g, 200, 200, 5, 'var(--highlight)');
        circ(g, 520, 140, 5, 'var(--highlight)');
        circ(g, 640, 280, 5, 'var(--highlight)');
        txt(g, 190, 184, 'M₁', 'var(--text-muted)', 11);
        txt(g, 524, 126, 'M₂', 'var(--text-muted)', 11);
        txt(g, 648, 296, 'M₃', 'var(--text-muted)', 11);
        arw(g, 200, 200, 520, 140, 'var(--primary)');
        arw(g, 200, 200, 640, 280, 'var(--success)');
        txt(g, 450, 350, 'n = M₁M₂ × M₁M₃，再套点法式', 'var(--highlight)', 12.5, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-31', level: 'C', title: '直线方程（点向式、参数式、一般式）',
    intuition: '空间直线 = 「一个点 + 一个方向向量」。<strong>点向式（对称式）</strong>：(x−x₀)/m = (y−y₀)/n = (z−z₀)/p，方向向量 s=(m,n,p)。<strong>参数式</strong>：x=x₀+mt, y=y₀+nt, z=z₀+pt，t 为参数。<strong>一般式</strong>：两个平面方程联立（两平面交线）。三种形式可互化，求直线方程的核心是找点和方向向量。',
    derivation: [
      '\\text{点向式}: \\; \\frac{x-x_0}{m}=\\frac{y-y_0}{n}=\\frac{z-z_0}{p}',
      '\\text{参数式}: \\; x=x_0+mt,\\; y=y_0+nt,\\; z=z_0+pt',
      '\\text{一般式}: \\; \\begin{cases}A_1x+B_1y+C_1z+D_1=0\\\\A_2x+B_2y+C_2z+D_2=0\\end{cases}',
      '\\text{方向向量}: \\; \\mathbf{s}=\\mathbf{n}_1\\times\\mathbf{n}_2'
    ],
    exam_text: '<b>【2018 真题改编】</b>求过点 (1,−2,3) 且方向向量为 s=(2,1,−1) 的直线方程（点向式与参数式）。',
    exam_answer: '答案：点向式：(x−1)/2 = (y+2)/1 = (z−3)/(−1)。参数式：x=1+2t，y=−2+t，z=3−t。两种形式等价——令比值等于 t 即得参数式。若给的是两平面交线，方向向量 = 两法向量叉乘 n₁×n₂。',
    pitfalls: [
      '点向式中分母是方向向量的分量，可以为 0（此时写成分子=0 的形式），但不能直接写 0 做分母。',
      '一般式的两个平面法向量叉乘才是直线方向，不是直接相加。',
      '参数式中的 t 与点向式的比值是同一个 t，注意符号一致。'
    ],
    quiz: [
      { question: '点向式 (x−1)/2=(y+2)/1=(z−3)/(−1) 的方向向量是？', options: ['(1,−2,3)', '(2,1,−1)', '(−1,2,−3)'], correct: 1 },
      { question: '两平面交线的方向向量等于？', options: ['n₁+n₂', 'n₁×n₂', 'n₁−n₂'], correct: 1 },
      { question: '参数式 x=1+2t 中 t 的系数 2 表示？', options: ['x 轴截距', '方向向量的 x 分量', '平面法向量'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '点向式：点 + 方向向量' },
      { focus: 1, desc: '参数式：用一个参数 t 表示三个坐标' },
      { focus: 2, desc: '一般式：两平面交线，方向 = n₁×n₂' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['点向式', '参数式', '一般式（交线）'][f]);
      if (f === 0) {
        ln(g, 120, 300, 760, 120, 'var(--primary)', 2.6);
        circ(g, 380, 219, 6, 'var(--highlight)');
        txt(g, 380, 200, 'P₀', 'var(--highlight)', 12, 'middle', '700');
        arw(g, 430, 208, 610, 163, 'var(--danger)');
        txt(g, 620, 152, 's=(m,n,p)', 'var(--danger)', 12, 'start', '700');
        box(g, 100, 60, 700, 56, 'var(--primary)', 0.1);
        txt(g, 450, 95, '(x−x₀)/m = (y−y₀)/n = (z−z₀)/p', 'var(--primary-strong)', 15, 'middle', '700');
      }
      if (f === 1) {
        ln(g, 120, 300, 760, 120, 'var(--success)', 2.6);
        [0.2, 0.4, 0.6, 0.8].forEach(function (t) {
          circ(g, 120 + 640 * t, 300 - 180 * t, 4.5, 'var(--highlight)');
        });
        box(g, 100, 60, 700, 70, 'var(--success)', 0.1);
        txt(g, 450, 92, 'x = x₀ + mt,  y = y₀ + nt,  z = z₀ + pt', 'var(--success)', 14, 'middle', '700');
        txt(g, 450, 118, 't 每增加一点，点沿直线前进一段', 'var(--text-muted)', 11);
        txt(g, 450, 350, '参数 t 可以理解为「走了多远」', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        g.append('path').attr('d', 'M 140 250 L 430 140 L 720 200 L 430 320 Z').attr('fill', 'var(--primary)').attr('fill-opacity', 0.1).attr('stroke', 'var(--primary)').attr('stroke-width', 1.6);
        g.append('path').attr('d', 'M 180 180 L 480 300 L 760 240 L 460 120 Z').attr('fill', 'var(--success)').attr('fill-opacity', 0.1).attr('stroke', 'var(--success)').attr('stroke-width', 1.6);
        ln(g, 300, 128, 640, 292, 'var(--danger)', 2.6);
        txt(g, 650, 300, '交线', 'var(--danger)', 12, 'start', '700');
        txt(g, 450, 355, '方向向量 s = n₁ × n₂', 'var(--highlight)', 12.5, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-32', level: 'C', title: '直线与平面的关系（夹角、位置关系）',
    intuition: '判定两条直线/一条直线与一个平面的位置关系，本质是看<strong>方向向量与法向量</strong>的关系：直线与平面<strong>平行</strong> ⟺ s·n=0；<strong>垂直</strong> ⟺ s∥n（叉乘为 0）；<strong>夹角</strong> sinθ = |s·n| / (|s||n|)——注意是 sin 不是 cos。两条直线：平行 ⟺ s₁×s₂=0；垂直 ⟺ s₁·s₂=0；夹角 cosθ = |s₁·s₂|/(|s₁||s₂|)。',
    derivation: [
      '\\text{线面平行}: \\; \\mathbf{s}\\cdot\\mathbf{n}=0; \\quad \\text{线面垂直}: \\; \\mathbf{s}\\parallel\\mathbf{n}',
      '\\text{线面夹角}: \\; \\sin\\theta=\\frac{|\\mathbf{s}\\cdot\\mathbf{n}|}{|\\mathbf{s}||\\mathbf{n}|}',
      '\\text{线线夹角}: \\; \\cos\\theta=\\frac{|\\mathbf{s}_1\\cdot\\mathbf{s}_2|}{|\\mathbf{s}_1||\\mathbf{s}_2|}',
      '\\text{面面夹角}: \\; \\cos\\theta=\\frac{|\\mathbf{n}_1\\cdot\\mathbf{n}_2|}{|\\mathbf{n}_1||\\mathbf{n}_2|}'
    ],
    exam_text: '<b>【2020 真题改编】</b>直线 (x−1)/2=(y+1)/(−1)=z/3 与平面 2x−y+3z−5=0 的位置关系是？',
    exam_answer: '答案：直线方向向量 s=(2,−1,3)，平面法向量 n=(2,−1,3)。<b>s = n</b>，故直线与平面<b>垂直</b>。若 s·n=0 则平行（或直线在平面内，需再验证直线上一点是否满足平面方程）；夹角用 sinθ = |s·n|/(|s||n|)。',
    pitfalls: [
      '线面夹角用 sin 不是 cos——因为夹角定义的是直线与「它在平面上的投影」的角。',
      's·n=0 只说明平行，还需验证直线上的点是否在平面内，才能区分「平行」与「在平面内」。',
      '线线夹角取锐角，所以公式中要加绝对值。'
    ],
    quiz: [
      { question: '直线与平面垂直的条件是？', options: ['s·n=0', 's∥n', 's⊥n'], correct: 1 },
      { question: '直线与平面夹角公式用？', options: ['cos', 'sin', 'tan'], correct: 1 },
      { question: 's·n=0 说明直线与平面？', options: ['一定平行', '可能平行或在面内', '一定垂直'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '线面平行与垂直：看法向量与方向向量' },
      { focus: 1, desc: '线面夹角：sinθ = |s·n|/(|s||n|)' },
      { focus: 2, desc: '线线、面面夹角公式对比' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['平行与垂直', '线面夹角', '各类夹角公式'][f]);
      g.append('path').attr('d', 'M 100 260 L 420 160 L 760 230 L 440 330 Z').attr('fill', 'var(--primary)').attr('fill-opacity', 0.1).attr('stroke', 'var(--primary)').attr('stroke-width', 1.6);
      if (f === 0) {
        ln(g, 160, 260, 560, 200, 'var(--success)', 2.6);
        txt(g, 150, 276, '平行：s·n=0', 'var(--success)', 12, 'start', '700');
        ln(g, 430, 245, 430, 80, 'var(--danger)', 2.6);
        txt(g, 440, 76, '垂直：s∥n', 'var(--danger)', 12, 'start', '700');
        arw(g, 620, 220, 620, 150, 'var(--highlight)');
        txt(g, 630, 146, 'n', 'var(--highlight)', 12, 'start', '700');
      }
      if (f === 1) {
        ln(g, 160, 300, 700, 180, 'var(--success)', 2.6);
        ln(g, 160, 300, 700, 300, 'var(--text-muted)', 1.4, '5,4');
        g.append('path').attr('d', 'M 430 240 A 90 90 0 0 0 470 246').attr('fill', 'none').attr('stroke', 'var(--highlight)').attr('stroke-width', 1.6);
        txt(g, 486, 240, 'θ', 'var(--highlight)', 13, 'start', '700');
        box(g, 480, 60, 400, 70, 'var(--success)', 0.08);
        txt(g, 680, 88, 'sinθ = |s·n| / (|s||n|)', 'var(--success)', 14, 'middle', '700');
        txt(g, 680, 114, '注意是 sin，不是 cos', 'var(--danger)', 11.5);
      }
      if (f === 2) {
        const rows = [['线线', 'cosθ = |s₁·s₂|/(|s₁||s₂|)', 'var(--primary)'], ['线面', 'sinθ = |s·n|/(|s||n|)', 'var(--success)'], ['面面', 'cosθ = |n₁·n₂|/(|n₁||n₂|)', 'var(--highlight)']];
        rows.forEach(function (r, i) {
          const y = 80 + i * 80;
          box(g, 100, y, 700, 64, r[2], 0.1);
          txt(g, 130, y + 40, r[0], r[2], 14, 'start', '700');
          txt(g, 300, y + 40, r[1], 'var(--text)', 13, 'start');
        });
        txt(g, 450, 350, '记忆：只有线面是 sin，其余都是 cos', 'var(--primary-strong)', 12.5, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-33', level: 'B', title: '曲面方程（旋转曲面、柱面、二次曲面）',
    intuition: '三类常见曲面：<strong>旋转曲面</strong>——曲线绕轴旋转，方程替换法（绕 z 轴转：把 x 换成 ±√(x²+y²)）；<strong>柱面</strong>——缺一个变量的方程（如 x²+y²=R² 缺 z，是圆柱面，母线平行 z 轴）；<strong>二次曲面</strong>——椭球面、抛物面、双曲面、锥面，用「截痕法」判断形状。',
    derivation: [
      '\\text{旋转曲面（绕 z 轴）}: \\; f\\left(\\pm\\sqrt{x^{2}+y^{2}}, z\\right)=0',
      '\\text{柱面}: \\; F(x,y)=0 \\; (\\text{母线平行 } z \\text{ 轴})',
      '\\text{椭球面}: \\; \\frac{x^{2}}{a^{2}}+\\frac{y^{2}}{b^{2}}+\\frac{z^{2}}{c^{2}}=1',
      '\\text{抛物面}: \\; z=\\frac{x^{2}}{a^{2}}+\\frac{y^{2}}{b^{2}} \\; (\\text{椭圆抛物面})'
    ],
    exam_text: '<b>【2017 真题改编】</b>yOz 平面上的曲线 y²=2z 绕 z 轴旋转一周所得曲面方程是？',
    exam_answer: '答案：绕 z 轴旋转时，z 不变，把 y 换成 ±√(x²+y²)：即 (√(x²+y²))² = 2z，得 <b>x² + y² = 2z</b>。这是一个旋转抛物面（开口向上的碗形）。规律：绕哪个轴转，就保留哪个变量，另一个变量替换成「另两个变量的平方和开根号」。',
    pitfalls: [
      '旋转轴不同，替换的变量不同：绕 z 轴把 x、y 合并，绕 x 轴把 y、z 合并。',
      '柱面方程缺一个变量，母线平行于缺失的变量对应的轴。',
      '「旋转曲面」与「柱面」外形可能相似，但方程结构不同（一个含平方和，一个缺变量）。'
    ],
    quiz: [
      { question: 'x²+y²=4 表示什么曲面？', options: ['球面', '圆柱面', '圆锥面'], correct: 1 },
      { question: 'y²=2z 绕 z 轴旋转后方程是？', options: ['x²+y²=2z', 'y²+z²=2x', 'x²+z²=2y'], correct: 0 },
      { question: '判断二次曲面形状常用什么方法？', options: ['截痕法', '求导法', '积分法'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '旋转曲面：曲线绕轴转，变量替换' },
      { focus: 1, desc: '柱面：缺一个变量，母线平行对应轴' },
      { focus: 2, desc: '二次曲面：椭球、抛物面、双曲面、锥面' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['旋转曲面', '柱面', '二次曲面'][f]);
      if (f === 0) {
        g.append('path').attr('d', 'M 250 300 Q 300 120 450 120 Q 600 120 650 300').attr('fill', 'var(--primary)').attr('fill-opacity', 0.14).attr('stroke', 'var(--primary)').attr('stroke-width', 2);
        for (let i = 0; i < 4; i++) {
          g.append('ellipse').attr('cx', 450).attr('cy', 160 + i * 40).attr('rx', 60 + i * 28).attr('ry', 12 + i * 3).attr('fill', 'none').attr('stroke', 'var(--success)').attr('stroke-width', 1.2).attr('stroke-dasharray', '4,4');
        }
        ln(g, 450, 90, 450, 320, 'var(--highlight)', 1.4, '6,4');
        txt(g, 460, 96, '旋转轴 z', 'var(--highlight)', 11, 'start', '700');
        txt(g, 450, 355, '曲线绕轴旋转 → 曲面；绕 z 轴：x、y 合并为 √(x²+y²)', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        g.append('ellipse').attr('cx', 450).attr('cy', 130).attr('rx', 150).attr('ry', 34).attr('fill', 'var(--success)').attr('fill-opacity', 0.12).attr('stroke', 'var(--success)').attr('stroke-width', 2);
        g.append('ellipse').attr('cx', 450).attr('cy', 290).attr('rx', 150).attr('ry', 34).attr('fill', 'var(--success)').attr('fill-opacity', 0.12).attr('stroke', 'var(--success)').attr('stroke-width', 2);
        ln(g, 300, 130, 300, 290, 'var(--success)', 1.6);
        ln(g, 600, 130, 600, 290, 'var(--success)', 1.6);
        box(g, 120, 60, 300, 56, 'var(--success)', 0.1);
        txt(g, 270, 95, 'x²+y²=R²（缺 z）', 'var(--success)', 14, 'middle', '700');
        txt(g, 450, 355, '缺哪个变量，母线就平行哪个轴', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        const names = [['椭球面', 'x²/a²+y²/b²+z²/c²=1', 'var(--primary)'], ['椭圆抛物面', 'z=x²/a²+y²/b²', 'var(--success)'], ['单叶双曲面', 'x²/a²+y²/b²−z²/c²=1', 'var(--highlight)'], ['圆锥面', 'z²=x²+y²', 'var(--swap)']];
        names.forEach(function (n, i) {
          const y = 60 + i * 74;
          box(g, 90, y, 720, 60, n[2], 0.1);
          txt(g, 120, y + 38, n[0], n[2], 14, 'start', '700');
          txt(g, 380, y + 38, n[1], 'var(--text)', 13, 'start');
        });
      }
    }
  },
  {
    id: 'MA-34', level: 'B', title: '空间曲线及其方程',
    intuition: '空间曲线有两种表示：<strong>参数方程</strong> x=x(t), y=y(t), z=z(t)——最通用；<strong>一般方程</strong>——两个曲面方程联立（曲线 = 两曲面交线）。常见曲线：螺旋线（x=a cos t, y=a sin t, z=bt）、圆周（球面与平面交线）。曲线在坐标面上的<strong>投影</strong>：消去一个变量得到投影柱面，再联立投影平面。',
    derivation: [
      '\\text{参数方程}: \\; x=x(t),\\; y=y(t),\\; z=z(t)',
      '\\text{一般方程}: \\; \\begin{cases}F(x,y,z)=0\\\\G(x,y,z)=0\\end{cases}',
      '\\text{螺旋线}: \\; x=a\\cos t,\\; y=a\\sin t,\\; z=bt',
      '\\text{投影}: \\; \\text{消去 } z \\Rightarrow \\text{投影柱面，再与 } z=0 \\text{ 联立}'
    ],
    exam_text: '<b>【2018 真题改编】</b>曲线 x²+y²=1, z=2 是什么图形？',
    exam_answer: '答案：x²+y²=1 是圆柱面，z=2 是水平平面，两者交线是<b>平面 z=2 上半径为 1 的圆周</b>。空间曲线用「两曲面联立」表示时，要能想象出两个曲面的交线形状——这是空间想象力的基本功。',
    pitfalls: [
      '两曲面联立不一定只表示一条曲线——可能表示多条（如双曲面与平面的交线）。',
      '参数方程的参数范围要写清（如 t∈[0,2π]），否则可能是整条曲线的一部分。',
      '求投影时是「消去某变量得柱面」，再与投影平面联立，不是直接令变量=0。'
    ],
    quiz: [
      { question: '螺旋线的参数方程是？', options: ['x=a cos t, y=a sin t, z=bt', 'x=t, y=t², z=t³', 'x=cos t, y=sin t'], correct: 0 },
      { question: '空间曲线的一般方程由什么给出？', options: ['一个曲面方程', '两个曲面方程联立', '一个参数方程'], correct: 1 },
      { question: '求曲线在 xOy 面投影的步骤是？', options: ['令 z=0 直接代入', '消去 z 得柱面再联立 z=0', '对 z 求导'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '参数方程：用 t 描述三个坐标' },
      { focus: 1, desc: '一般方程：两曲面交线' },
      { focus: 2, desc: '投影：消元得投影柱面' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['参数方程', '两曲面交线', '曲线投影'][f]);
      if (f === 0) {
        let d = '';
        for (let i = 0; i <= 120; i++) {
          const t = i / 120 * Math.PI * 4;
          const x = 450 + 130 * Math.cos(t), y = 220 + 40 * Math.sin(t) - (t / (Math.PI * 4)) * 120 + 60;
          d += (i ? ' L ' : 'M ') + x.toFixed(1) + ' ' + y.toFixed(1);
        }
        g.append('path').attr('d', d).attr('fill', 'none').attr('stroke', 'var(--primary)').attr('stroke-width', 2.4);
        txt(g, 600, 120, 'x=a cos t', 'var(--text-muted)', 11.5, 'start');
        txt(g, 600, 142, 'y=a sin t', 'var(--text-muted)', 11.5, 'start');
        txt(g, 600, 164, 'z=bt', 'var(--primary-strong)', 11.5, 'start', '700');
        txt(g, 450, 350, '螺旋线：投影到 xOy 面是圆，z 匀速上升', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        g.append('ellipse').attr('cx', 450).attr('cy', 210).attr('rx', 180).attr('ry', 130).attr('fill', 'none').attr('stroke', 'var(--success)').attr('stroke-width', 2);
        g.append('path').attr('d', 'M 180 210 L 720 210').attr('stroke', 'var(--highlight)').attr('stroke-width', 2);
        txt(g, 730, 214, '平面', 'var(--highlight)', 11, 'start');
        circ(g, 330, 210, 5, 'var(--danger)');
        circ(g, 570, 210, 5, 'var(--danger)');
        txt(g, 450, 350, '球面与平面相交 → 空间圆', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        let d = '';
        for (let i = 0; i <= 100; i++) {
          const t = i / 100 * Math.PI * 2;
          const x = 450 + 170 * Math.cos(t), y = 210 + 60 * Math.sin(t);
          d += (i ? ' L ' : 'M ') + x.toFixed(1) + ' ' + y.toFixed(1);
        }
        g.append('path').attr('d', d).attr('fill', 'var(--primary)').attr('fill-opacity', 0.12).attr('stroke', 'var(--primary)').attr('stroke-width', 2);
        ln(g, 260, 210, 640, 210, 'var(--text-muted)', 1.4, '5,4');
        txt(g, 450, 350, '空间曲线 → 投影柱面 → 投影曲线（令 z=0）', 'var(--text-muted)', 12);
      }
    }
  },
  {
    id: 'MA-35', level: 'B', title: '点到平面、点到直线的距离',
    intuition: '两个必背公式：<strong>点到平面</strong> Ax+By+Cz+D=0 的距离 d = |Ax₀+By₀+Cz₀+D| / √(A²+B²+C²)——把点代入平面方程取绝对值，除以法向量模长；<strong>点到直线</strong>（过点 P₁、方向 s）的距离 d = |P₀P₁ × s| / |s|——叉积模长（平行四边形面积）除以底边。两平行平面间距离用「一个平面上取点、套公式」。',
    derivation: [
      'd = \\frac{|Ax_0+By_0+Cz_0+D|}{\\sqrt{A^{2}+B^{2}+C^{2}}}',
      'd = \\frac{\\left|\\overrightarrow{P_0P_1}\\times\\mathbf{s}\\right|}{|\\mathbf{s}|}',
      '\\text{两平行平面}: \\; d=\\frac{|D_1-D_2|}{\\sqrt{A^{2}+B^{2}+C^{2}}}',
      '\\text{两异面直线距离}: \\; d=\\frac{\\left|\\overrightarrow{M_1M_2}\\cdot(\\mathbf{s}_1\\times\\mathbf{s}_2)\\right|}{|\\mathbf{s}_1\\times\\mathbf{s}_2|}'
    ],
    exam_text: '<b>【2016 真题改编】</b>求点 (1,2,3) 到平面 2x−y+2z−6=0 的距离。',
    exam_answer: '答案：代入公式：d = |2×1 − 2 + 2×3 − 6| / √(4+1+4) = |2−2+6−6|/3 = <b>0</b>。距离为 0 说明该点<b>在平面上</b>（代入方程满足）。若换一个点如 (0,0,0)：d = 6/3 = 2。公式记忆：分子是「代入取绝对值」，分母是「法向量长度」。',
    pitfalls: [
      '分子必须取绝对值，否则距离可能为负。',
      '分母是法向量的模长 √(A²+B²+C²)，不是 A+B+C。',
      '点到直线用叉积、点到平面用点积代入——两个公式不要混。'
    ],
    quiz: [
      { question: '点到平面距离公式的分母是？', options: ['A+B+C', '√(A²+B²+C²)', '|n|²'], correct: 1 },
      { question: '点到直线距离用？', options: ['点积', '叉积模长', '混合积'], correct: 1 },
      { question: '点代入平面方程得到 0，说明？', options: ['点在平面上', '点距离为1', '点无法计算'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '点到平面：代入取绝对值、除以法向量模长' },
      { focus: 1, desc: '点到直线：叉积模长 ÷ 方向向量模长' },
      { focus: 2, desc: '平行平面与异面直线的距离' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['点到平面', '点到直线', '扩展公式'][f]);
      if (f === 0) {
        g.append('path').attr('d', 'M 110 280 L 430 170 L 770 240 L 450 350 Z').attr('fill', 'var(--primary)').attr('fill-opacity', 0.1).attr('stroke', 'var(--primary)').attr('stroke-width', 1.6);
        circ(g, 300, 120, 6, 'var(--highlight)');
        txt(g, 300, 104, 'P₀', 'var(--highlight)', 12, 'middle', '700');
        ln(g, 300, 120, 300, 222, 'var(--danger)', 2, '5,4');
        txt(g, 310, 176, 'd', 'var(--danger)', 12, 'start', '700');
        box(g, 500, 70, 380, 70, 'var(--primary)', 0.08);
        txt(g, 690, 100, 'd = |Ax₀+By₀+Cz₀+D| / √(A²+B²+C²)', 'var(--primary-strong)', 12, 'middle', '700');
      }
      if (f === 1) {
        ln(g, 140, 320, 720, 100, 'var(--success)', 2.4);
        circ(g, 330, 120, 6, 'var(--highlight)');
        txt(g, 330, 104, 'P₀', 'var(--highlight)', 12, 'middle', '700');
        ln(g, 330, 120, 420, 250, 'var(--danger)', 2, '5,4');
        arw(g, 420, 250, 520, 210, 'var(--primary)');
        txt(g, 520, 200, 's', 'var(--primary)', 12, 'start', '700');
        box(g, 480, 60, 400, 56, 'var(--success)', 0.08);
        txt(g, 680, 94, 'd = |P₀P₁ × s| / |s|', 'var(--success)', 14, 'middle', '700');
        txt(g, 450, 355, '叉积模长 = 平行四边形面积 ÷ 底边长 = 高（距离）', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        const rows = [['两平行平面', 'd = |D₁−D₂|/√(A²+B²+C²)', 'var(--primary)'], ['异面直线', 'd = |M₁M₂·(s₁×s₂)|/|s₁×s₂|', 'var(--success)']];
        rows.forEach(function (r, i) {
          const y = 90 + i * 100;
          box(g, 100, y, 700, 80, r[2], 0.1);
          txt(g, 130, y + 48, r[0], r[2], 14, 'start', '700');
          txt(g, 340, y + 48, r[1], 'var(--text)', 12.5, 'start');
        });
        txt(g, 450, 330, '本质都是「投影」：把距离投影到法向/公垂线方向', 'var(--text-muted)', 12);
      }
    }
  },
  {
    id: 'MA-38', level: 'B', title: '全微分的概念与计算',
    intuition: '一元函数可微 ⟺ 可导；<strong>多元函数可微则要求更高</strong>：Δz = AΔx + BΔy + o(ρ)，其中 A=∂z/∂x、B=∂z/∂y。可微 ⟹ 偏导数存在、连续；但偏导数存在<strong>不一定</strong>可微（经典反例 f=xy/(x²+y²)）。实用判别：偏导数连续 ⟹ 可微。全微分 dz = (∂z/∂x)dx + (∂z/∂y)dy 可用于近似计算。',
    derivation: [
      '\\Delta z = A\\Delta x + B\\Delta y + o(\\rho), \\; \\rho=\\sqrt{\\Delta x^{2}+\\Delta y^{2}}',
      'dz = \\frac{\\partial z}{\\partial x}dx + \\frac{\\partial z}{\\partial y}dy',
      '\\text{可微} \\Rightarrow \\text{偏导存在且连续}; \\; \\text{反之不成立}',
      '\\text{判别}: \\; \\text{偏导数连续} \\Rightarrow \\text{可微}'
    ],
    exam_text: '<b>【2019 真题改编】</b>求 z = x²y + e^(xy) 的全微分 dz。',
    exam_answer: '答案：∂z/∂x = 2xy + y e^(xy)，∂z/∂y = x² + x e^(xy)。故 dz = <b>(2xy + y e^(xy))dx + (x² + x e^(xy))dy</b>。全微分就是把两个偏导数分别乘以 dx、dy 再相加——形式与一元函数的 dy=f′(x)dx 一致。',
    pitfalls: [
      '偏导数存在 ≠ 可微——多元函数没有「可导 ⟺ 可微」的便利。',
      '求 ∂z/∂x 时把 y 当常数，求 ∂z/∂y 时把 x 当常数，别互相干扰。',
      '全微分公式中 dx、dy 是自变量的微分，不是 Δx、Δy 的近似（虽然近似计算中可替换）。'
    ],
    quiz: [
      { question: '多元函数可微的充分条件是？', options: ['偏导数存在', '偏导数连续', '函数连续'], correct: 1 },
      { question: 'dz 等于？', options: ['z′dx', 'z_x dx + z_y dy', 'z_x + z_y'], correct: 1 },
      { question: '偏导数存在与可微的关系是？', options: ['等价', '偏导存在不一定可微', '可微不一定偏导存在'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '全微分的定义：线性主部 + 高阶无穷小' },
      { focus: 1, desc: '计算公式：dz = z_x dx + z_y dy' },
      { focus: 2, desc: '可微、偏导、连续三者的关系链' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['全微分定义', '计算公式', '三者关系'][f]);
      if (f === 0) {
        g.append('path').attr('d', 'M 120 300 L 430 180 L 760 250 L 450 360 Z').attr('fill', 'var(--primary)').attr('fill-opacity', 0.12).attr('stroke', 'var(--primary)').attr('stroke-width', 2);
        arw(g, 450, 260, 560, 225, 'var(--success)');
        arw(g, 450, 260, 390, 310, 'var(--highlight)');
        txt(g, 566, 218, 'Δx', 'var(--success)', 11.5, 'start', '700');
        txt(g, 380, 322, 'Δy', 'var(--highlight)', 11.5, 'end', '700');
        circ(g, 450, 260, 5, 'var(--danger)');
        txt(g, 450, 244, '切平面', 'var(--danger)', 11, 'middle', '700');
        txt(g, 450, 355, 'Δz ≈ z_x Δx + z_y Δy（切平面近似曲面）', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 110, 80, 680, 90, 'var(--primary)', 0.08);
        txt(g, 450, 118, 'dz = (∂z/∂x)dx + (∂z/∂y)dy', 'var(--primary-strong)', 18, 'middle', '700');
        txt(g, 450, 148, '两个偏导数分别乘对应微分', 'var(--text-muted)', 11.5);
        txt(g, 450, 215, '例：z = x²y + e^(xy)', 'var(--text)', 13);
        txt(g, 450, 248, 'z_x = 2xy + y e^(xy)', 'var(--success)', 12.5);
        txt(g, 450, 278, 'z_y = x² + x e^(xy)', 'var(--success)', 12.5);
      }
      if (f === 2) {
        [['偏导数连续', 'var(--success)'], ['可微', 'var(--primary)'], ['偏导存在', 'var(--highlight)'], ['连续', 'var(--swap)']].forEach(function (n, i) {
          chip(g, 120 + (i % 2) * 340, 110 + Math.floor(i / 2) * 110, 240, 64, n[0], n[1]);
        });
        arw(g, 240, 174, 240, 220, 'var(--text-muted)');
        arw(g, 360, 142, 460, 142, 'var(--text-muted)');
        arw(g, 460, 174, 390, 220, 'var(--text-muted)');
        txt(g, 450, 350, '偏导连续 ⟹ 可微 ⟹ 偏导存在、连续；反向均不成立', 'var(--primary-strong)', 12, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-39', level: 'B', title: '多元复合函数求导（链式法则）',
    intuition: '多元复合函数的链式法则是一张「路径图」：z=f(u,v)，u=u(x,y)，v=v(x,y)，则 ∂z/∂x = (∂z/∂u)(∂u/∂x) + (∂z/∂v)(∂v/∂x)。规则：<strong>有几条路径到 x，就有几项相加；每条路径上各段偏导相乘</strong>。画树状图是防止漏项的最好方法。',
    derivation: [
      '\\frac{\\partial z}{\\partial x}=\\frac{\\partial z}{\\partial u}\\frac{\\partial u}{\\partial x}+\\frac{\\partial z}{\\partial v}\\frac{\\partial v}{\\partial x}',
      '\\text{全导数}: \\; \\frac{dz}{dt}=\\frac{\\partial z}{\\partial u}\\frac{du}{dt}+\\frac{\\partial z}{\\partial v}\\frac{dv}{dt}',
      '\\text{规则}: \\; \\text{路径相乘、分支相加}',
      'z=f(u,v),\\; u=u(x),\\; v=v(x) \\Rightarrow \\frac{dz}{dx}=f_u u\'+f_v v\''
    ],
    exam_text: '<b>【2018 真题改编】</b>设 z = u² + v²，u = x + y，v = x − y，求 ∂z/∂x。',
    exam_answer: '答案：∂z/∂u = 2u，∂u/∂x = 1；∂z/∂v = 2v，∂v/∂x = 1。故 ∂z/∂x = 2u·1 + 2v·1 = 2(u+v) = <b>4x</b>。也可先代入：z = (x+y)²+(x−y)² = 2x²+2y²，直接对 x 求导得 4x ✓。链式法则的「分支相加」在此体现为两项。',
    pitfalls: [
      '漏项是最高频错误——每个中间变量都要走一遍，几路就几项。',
      'z 对 u 求偏导时把 v 当常数，不要因为 u、v 都含 x 就混乱。',
      '抽象函数（只给 f 符号）求导时，要用 f₁′、f₂′ 记号，不能写成具体表达式。'
    ],
    quiz: [
      { question: '链式法则中「分支」对应？', options: ['相乘', '相加', '相减'], correct: 1 },
      { question: 'z=u²+v², u=x+y, v=x−y 时 ∂z/∂x 等于？', options: ['2x', '4x', '2u'], correct: 1 },
      { question: '抽象函数 f(u,v) 对 x 求导应写成？', options: ['f′', 'f₁′u_x + f₂′v_x', 'f_x'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '树状图：z 经 u、v 两条路径到 x' },
      { focus: 1, desc: '链式法则：路径相乘、分支相加' },
      { focus: 2, desc: '全导数与抽象函数记法' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['路径图', '链式法则', '全导数'][f]);
      circ(g, 450, 80, 26, 'var(--bg-panel)', 'var(--primary)', 2);
      txt(g, 450, 86, 'z', 'var(--primary-strong)', 15, 'middle', '700');
      circ(g, 300, 180, 24, 'var(--bg-panel)', 'var(--success)', 2);
      txt(g, 300, 186, 'u', 'var(--success)', 13, 'middle', '700');
      circ(g, 600, 180, 24, 'var(--bg-panel)', 'var(--highlight)', 2);
      txt(g, 600, 186, 'v', 'var(--highlight)', 13, 'middle', '700');
      circ(g, 300, 300, 24, 'var(--bg-panel)', 'var(--swap)', 2);
      txt(g, 300, 306, 'x', 'var(--swap)', 13, 'middle', '700');
      circ(g, 600, 300, 24, 'var(--bg-panel)', 'var(--swap)', 2);
      txt(g, 600, 306, 'x', 'var(--swap)', 13, 'middle', '700');
      arw(g, 432, 100, 316, 160, 'var(--text-muted)');
      arw(g, 468, 100, 584, 160, 'var(--text-muted)');
      arw(g, 300, 204, 300, 276, 'var(--text-muted)');
      arw(g, 600, 204, 600, 276, 'var(--text-muted)');
      txt(g, 260, 140, '∂z/∂u', 'var(--text-muted)', 10.5, 'end');
      txt(g, 640, 140, '∂z/∂v', 'var(--text-muted)', 10.5, 'start');
      if (f >= 1) {
        box(g, 110, 335, 680, 46, 'var(--primary)', 0.08);
        txt(g, 450, 364, '∂z/∂x = z_u·u_x + z_v·v_x', 'var(--primary-strong)', 14, 'middle', '700');
      }
      if (f === 2) {
        txt(g, 450, 320, '若 u=u(t), v=v(t)：dz/dt = z_u u′ + z_v v′', 'var(--success)', 12);
      }
    }
  },
  {
    id: 'MA-40', level: 'B', title: '隐函数求导',
    intuition: '方程 F(x,y)=0 确定的隐函数 y=y(x)，不用解出 y 也能求导：<strong>dy/dx = −F_x / F_y</strong>。二元隐函数 F(x,y,z)=0 确定 z=z(x,y)：<strong>∂z/∂x = −F_x/F_z，∂z/∂y = −F_y/F_z</strong>。做法有两种：公式法（记公式）或两边直接求导（把 y 看成 y(x)）。公式法的关键是「负号」和「分母是目标变量的偏导」。',
    derivation: [
      'F(x,y)=0 \\Rightarrow \\frac{dy}{dx}=-\\frac{F_x}{F_y}',
      'F(x,y,z)=0 \\Rightarrow \\frac{\\partial z}{\\partial x}=-\\frac{F_x}{F_z},\\; \\frac{\\partial z}{\\partial y}=-\\frac{F_y}{F_z}',
      '\\text{记忆}: \\; \\text{负号} + \\text{交叉求偏导}',
      '\\text{验证}: \\; F_x + F_y y\' = 0 \\Rightarrow y\'=-F_x/F_y'
    ],
    exam_text: '<b>【2017 真题改编】</b>设 x² + y² = 1 确定 y=y(x)，求 dy/dx。',
    exam_answer: '答案：令 F(x,y)=x²+y²−1，F_x=2x，F_y=2y，故 dy/dx = <b>−2x/2y = −x/y</b>。也可两边对 x 求导：2x + 2y·y′ = 0 ⟹ y′ = −x/y ✓。注意 y=0 时公式失效（F_y=0），此时切线垂直。',
    pitfalls: [
      '公式中的负号不能漏——这是隐函数求导最常见的失分点。',
      '分母是「对目标变量」的偏导（求 z 对 x 的偏导，分母是 F_z）。',
      'F_y=0 时公式失效，需单独讨论（曲线可能有垂直切线）。'
    ],
    quiz: [
      { question: 'F(x,y)=0 时 dy/dx 等于？', options: ['F_x/F_y', '−F_x/F_y', '−F_y/F_x'], correct: 1 },
      { question: 'F(x,y,z)=0 时 ∂z/∂x 等于？', options: ['−F_x/F_z', '−F_z/F_x', 'F_x/F_z'], correct: 0 },
      { question: '隐函数求导的负号来自？', options: ['习惯写法', '移项产生的负号', '绝对值'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '一元隐函数：两边对 x 求导，y 视为 y(x)' },
      { focus: 1, desc: '公式法：dy/dx = −F_x/F_y' },
      { focus: 2, desc: '多元隐函数：∂z/∂x = −F_x/F_z' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['两边求导', '一元公式', '多元公式'][f]);
      if (f === 0) {
        for (let k = 0; k < 3; k++) {
          g.append('ellipse').attr('cx', 450).attr('cy', 220).attr('rx', 90 + k * 50).attr('ry', 60 + k * 34).attr('fill', 'none').attr('stroke', 'var(--border)').attr('stroke-width', 1.4);
        }
        txt(g, 700, 120, 'F(x,y)=0', 'var(--primary-strong)', 14, 'start', '700');
        txt(g, 700, 148, '曲线无法显式解出 y', 'var(--text-muted)', 10.5, 'start');
        txt(g, 450, 350, '把 y 看作 y(x)，方程两边对 x 求导', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 110, 80, 680, 80, 'var(--primary)', 0.08);
        txt(g, 450, 122, 'dy/dx = − F_x / F_y', 'var(--primary-strong)', 20, 'middle', '700');
        txt(g, 450, 152, '负号 + 交叉偏导', 'var(--text-muted)', 11.5);
        txt(g, 450, 215, '例：x²+y²=1，F_x=2x，F_y=2y', 'var(--text)', 12.5);
        txt(g, 450, 248, 'dy/dx = −x/y', 'var(--success)', 14, 'middle', '700');
      }
      if (f === 2) {
        box(g, 90, 70, 720, 90, 'var(--success)', 0.08);
        txt(g, 450, 105, 'F(x,y,z)=0', 'var(--success)', 15, 'middle', '700');
        txt(g, 450, 138, '∂z/∂x = −F_x/F_z,  ∂z/∂y = −F_y/F_z', 'var(--highlight)', 14, 'middle', '700');
        txt(g, 450, 205, '求谁的偏导，分母就是 F 对谁的偏导', 'var(--text)', 12.5);
        txt(g, 450, 240, '分子是 F 对「另一个自变量」的偏导', 'var(--text-muted)', 12);
        txt(g, 450, 285, '前提：F_z ≠ 0', 'var(--danger)', 12, 'middle', '700');
      }
    }
  }
];
