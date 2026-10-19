module.exports = [
  {
    id: 'MA-71', level: 'B', title: '行列式的概念与性质',
    intuition: '行列式是方阵的一个「数」，几何意义是线性变换的<strong>体积伸缩因子</strong>（二维是面积、三维是体积）。核心性质：转置不变 |Aᵀ|=|A|；两行互换变号；某行乘 k 则行列式乘 k；两行成比例则行列式为 0；某行加上另一行的 k 倍，行列式不变（初等行变换不改变行列式值）。',
    derivation: [
      '|A^{T}|=|A|; \\quad \\text{两行互换}: |A|\\to-|A|',
      '\\text{某行乘 } k: |A|\\to k|A|; \\quad \\text{两行成比例}: |A|=0',
      '\\text{某行加另一行的 } k \\text{ 倍}: |A| \\text{ 不变}',
      '|AB|=|A||B|; \\quad |kA|=k^{n}|A| \\; (n\\ \\text{阶})'
    ],
    exam_text: '<b>【2018 真题改编】</b>已知 3 阶行列式 |A|=2，求 |2A| 与 |A²|。',
    exam_answer: '答案：|2A| = 2³|A| = <b>16</b>（n 阶矩阵乘 k，行列式乘 kⁿ，不是乘 k）；|A²| = |A|² = <b>4</b>。这两个公式是高频考点：|kA|=kⁿ|A|，|AB|=|A||B|。',
    pitfalls: [
      '|kA| = kⁿ|A|，n 是阶数——最易错写成 k|A|。',
      '两行互换要变号，做初等变换时别忘了记录符号变化。',
      '|A+B| ≠ |A|+|B|，行列式对加法不线性。'
    ],
    quiz: [
      { question: '3 阶矩阵 |A|=2，则 |2A| 等于？', options: ['4', '8', '16'], correct: 2 },
      { question: '两行互换后行列式？', options: ['不变', '变号', '变 0'], correct: 1 },
      { question: '某行加上另一行的 k 倍，行列式？', options: ['不变', '乘 k', '变 0'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '行列式：方阵对应的一个数（面积/体积伸缩）' },
      { focus: 1, desc: '基本性质：转置、换行、提公因子' },
      { focus: 2, desc: '初等行变换不改变行列式值' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['几何意义', '基本性质', '初等变换'][f]);
      if (f === 0) {
        g.append('path').attr('d', 'M 220 300 L 420 300 L 500 180 L 300 180 Z').attr('fill', 'var(--primary)').attr('fill-opacity', 0.18).attr('stroke', 'var(--primary)').attr('stroke-width', 2);
        arw(g, 120, 300, 420, 300, 'var(--success)');
        arw(g, 120, 300, 300, 180, 'var(--highlight)');
        txt(g, 300, 324, 'a', 'var(--success)', 12, 'middle', '700');
        txt(g, 288, 226, 'b', 'var(--highlight)', 12, 'middle', '700');
        txt(g, 640, 230, '|A| = 平行四边形面积', 'var(--primary-strong)', 14, 'middle', '700');
        txt(g, 640, 262, '= 变换的「面积伸缩因子」', 'var(--text-muted)', 11.5);
        txt(g, 450, 355, '行列式为 0 表示变换把平面「压扁」了（降维）', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        const rows = [['|Aᵀ| = |A|', '转置不变'], ['两行互换 → −|A|', '换行变号'], ['某行乘 k → k|A|', '提公因子'], ['两行成比例 → 0', '线性相关'], ['|AB| = |A||B|', '乘法可拆']];
        rows.forEach(function (r, i) {
          const y = 60 + i * 56;
          box(g, 110, y, 680, 44, ['var(--primary)', 'var(--success)', 'var(--highlight)', 'var(--danger)', 'var(--swap)'][i], 0.08);
          txt(g, 140, y + 28, r[0], 'var(--text)', 12.5, 'start');
          txt(g, 740, y + 28, r[1], 'var(--text-muted)', 11, 'end');
        });
      }
      if (f === 2) {
        box(g, 120, 80, 660, 80, 'var(--primary)', 0.08);
        txt(g, 450, 112, 'r₂ + k·r₁：行列式不变', 'var(--primary-strong)', 15, 'middle', '700');
        txt(g, 450, 138, '这是化三角行列式的主要手段', 'var(--text-muted)', 11.5);
        txt(g, 450, 210, '目标：化成上三角，对角线相乘即得行列式', 'var(--text)', 13);
        txt(g, 450, 250, '例：|1 2; 3 4| = 1×4 − 2×3 = −2', 'var(--primary-strong)', 12.5);
        txt(g, 450, 300, '注意：换行要变号，提公因子要乘回去', 'var(--danger)', 12, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-72', level: 'B', title: '行列式按行（列）展开',
    intuition: '行列式可以按任意一行（列）展开：<strong>|A| = Σ aᵢⱼAᵢⱼ</strong>，其中 Aᵢⱼ = (−1)^(i+j) Mᵢⱼ 是<strong>代数余子式</strong>，Mᵢⱼ 是划去第 i 行第 j 列后的<strong>余子式</strong>。技巧：选「零最多」的行/列展开；用行变换制造零再展开。重要结论：某行元素与另一行代数余子式的乘积和为 0。',
    derivation: [
      '|A| = \\sum_{j=1}^{n} a_{ij}A_{ij} \\quad (\\text{按第 } i \\text{ 行展开})',
      'A_{ij} = (-1)^{i+j}M_{ij}',
      '\\sum_{j}a_{ij}A_{kj}=0 \\; (i\\neq k): \\; \\text{异行代数余子式乘和为 }0',
      '\\text{三阶}: |A| = a_{11}A_{11}+a_{12}A_{12}+a_{13}A_{13}'
    ],
    exam_text: '<b>【2019 真题改编】</b>行列式 |2 1; 3 4| 按第一行展开的结果是？',
    exam_answer: '答案：|A| = 2×A₁₁ + 1×A₁₂，其中 A₁₁=(−1)^(1+1)×4=4，A₁₂=(−1)^(1+2)×3=−3。故 |A| = 2×4 + 1×(−3) = <b>5</b>。直接计算 2×4−1×3=5，一致。展开法的优势在「某行有很多 0」时——只需算少数项。',
    pitfalls: [
      '代数余子式带符号 (−1)^(i+j)，余子式不带——两者别混。',
      '按行展开时，元素与「对应位置」的代数余子式相乘，不能错位。',
      '异行展开乘和为 0（不是等于 |A|），这是构造题的常用性质。'
    ],
    quiz: [
      { question: '代数余子式 Aᵢⱼ 与余子式 Mᵢⱼ 的关系是？', options: ['相等', 'Aᵢⱼ=(−1)^(i+j)Mᵢⱼ', 'Aᵢⱼ=−Mᵢⱼ'], correct: 1 },
      { question: '按行展开时优先选？', options: ['第一行', '零最多的行', '最后一行'], correct: 1 },
      { question: '某行元素乘另一行代数余子式之和等于？', options: ['|A|', '0', '−|A|'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '余子式：划去所在行列后剩下的行列式' },
      { focus: 1, desc: '代数余子式：余子式乘 (−1)^(i+j)' },
      { focus: 2, desc: '按行展开：元素 × 代数余子式求和' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['余子式', '代数余子式', '按行展开'][f]);
      const m = [['a₁₁', 'a₁₂', 'a₁₃'], ['a₂₁', 'a₂₂', 'a₂₃'], ['a₃₁', 'a₃₂', 'a₃₃']];
      m.forEach(function (row, i) {
        row.forEach(function (s, j) {
          const x = 280 + j * 110, y = 110 + i * 66;
          const on = (f === 0 && i === 0 && j === 0) || (f === 1 && i === 0 && j === 0) || f === 2 && i === 0;
          box(g, x, y, 96, 56, on ? 'var(--highlight)' : 'var(--primary)', on ? 0.2 : 0.08);
          txt(g, x + 48, y + 35, s, on ? 'var(--highlight)' : 'var(--text)', 13);
        });
      });
      if (f === 0) {
        txt(g, 700, 150, 'M₁₁ = 划去第1行第1列', 'var(--text)', 12, 'start');
        txt(g, 700, 176, '剩下的 2 阶行列式', 'var(--text-muted)', 11, 'start');
        txt(g, 450, 340, '余子式 Mᵢⱼ：划去第 i 行、第 j 列后的行列式', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 200, 300, 500, 56, 'var(--success)', 0.1);
        txt(g, 450, 335, 'A₁₁ = (−1)^(1+1) M₁₁ = M₁₁', 'var(--success)', 14, 'middle', '700');
        txt(g, 700, 150, '符号棋盘：+ − +', 'var(--text)', 11.5, 'start');
        txt(g, 700, 174, '− + − / + − +', 'var(--text-muted)', 11, 'start');
      }
      if (f === 2) {
        box(g, 150, 300, 600, 60, 'var(--highlight)', 0.1);
        txt(g, 450, 336, '|A| = a₁₁A₁₁ + a₁₂A₁₂ + a₁₃A₁₃', 'var(--highlight)', 15, 'middle', '700');
        txt(g, 450, 385, '选零最多的行展开，能少算很多项', 'var(--text-muted)', 11.5);
      }
    }
  },
  {
    id: 'MA-73', level: 'B', title: '克拉默法则',
    intuition: 'n 个方程 n 个未知数的线性方程组 Ax=b，若系数行列式 <strong>|A|≠0</strong>，则方程组有唯一解：<strong>xᵢ = |Aᵢ| / |A|</strong>，其中 Aᵢ 是把 A 的第 i 列换成 b 后的矩阵。适用条件严格：方程个数 = 未知数个数，且 |A|≠0。优点是公式直接、适合理论推导；缺点是计算量大（要算 n+1 个行列式）。',
    derivation: [
      'A\\mathbf{x}=\\mathbf{b}, \\; |A|\\neq0 \\Rightarrow x_i=\\frac{|A_i|}{|A|}',
      'A_i: \\; \\text{把 } A \\text{ 的第 } i \\text{ 列换成 } \\mathbf{b}',
      '|A|\\neq0 \\Leftrightarrow \\text{方程组有唯一解}',
      '|A|=0 \\Rightarrow \\text{无解或无穷多解}'
    ],
    exam_text: '<b>【2017 真题改编】</b>用克拉默法则解 x+y=3, 2x−y=0。',
    exam_answer: '答案：|A| = |1 1; 2 −1| = −1−2 = −3 ≠ 0。|A₁| = |3 1; 0 −1| = −3，|A₂| = |1 3; 2 0| = −6。故 x = |A₁|/|A| = 1，y = |A₂|/|A| = 2。<b>解为 (1,2)</b>，代回验证：1+2=3 ✓，2−0=2 ✓。',
    pitfalls: [
      '克拉默法则要求「方程数 = 未知数个数」且 |A|≠0，否则不能用。',
      '|Aᵢ| 是替换第 i 列，不是第 i 行——别换错方向。',
      '|A|=0 时不能下结论「无解」，要分「无解」和「无穷多解」讨论。'
    ],
    quiz: [
      { question: '克拉默法则的适用条件是？', options: ['|A|≠0', '|A|=0', '任意方程组'], correct: 0 },
      { question: 'xᵢ 等于？', options: ['|A|/|Aᵢ|', '|Aᵢ|/|A|', '|Aᵢ|'], correct: 1 },
      { question: '|A|=0 时方程组？', options: ['唯一解', '无解或无穷多解', '一定有解'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '条件：n 个方程 n 个未知数且 |A|≠0' },
      { focus: 1, desc: '构造 Aᵢ：第 i 列换成常数项' },
      { focus: 2, desc: 'xᵢ = |Aᵢ|/|A|，逐个求出' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['适用条件', '构造 Aᵢ', '求解公式'][f]);
      if (f === 0) {
        box(g, 110, 80, 680, 70, 'var(--primary)', 0.08);
        txt(g, 450, 112, 'n 个方程、n 个未知数、|A| ≠ 0', 'var(--primary-strong)', 14, 'middle', '700');
        txt(g, 450, 140, '三个条件缺一不可', 'var(--text-muted)', 11.5);
        txt(g, 450, 210, '满足 → 唯一解；|A|=0 → 无解或无穷多解', 'var(--text)', 13);
        txt(g, 450, 260, '计算量：要算 n+1 个行列式，适合 n 小的题', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        txt(g, 250, 90, '系数矩阵 A', 'var(--text-muted)', 11.5);
        [['a₁₁', 'a₁₂'], ['a₂₁', 'a₂₂']].forEach(function (row, i) {
          row.forEach(function (s, j) {
            box(g, 200 + j * 90, 105 + i * 62, 80, 52, 'var(--primary)', 0.08);
            txt(g, 240 + j * 90, 138 + i * 62, s, 'var(--text)', 13);
          });
        });
        txt(g, 460, 90, 'A₁（第一列换成 b）', 'var(--highlight)', 11.5);
        [['b₁', 'a₁₂'], ['b₂', 'a₂₂']].forEach(function (row, i) {
          row.forEach(function (s, j) {
            box(g, 420 + j * 90, 105 + i * 62, 80, 52, j === 0 ? 'var(--highlight)' : 'var(--primary)', j === 0 ? 0.18 : 0.08);
            txt(g, 460 + j * 90, 138 + i * 62, s, j === 0 ? 'var(--highlight)' : 'var(--text)', 13);
          });
        });
        txt(g, 450, 300, 'Aᵢ 就是把第 i 列「换成」常数项 b', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 130, 80, 640, 80, 'var(--success)', 0.1);
        txt(g, 450, 122, 'xᵢ = |Aᵢ| / |A|', 'var(--success)', 20, 'middle', '700');
        txt(g, 450, 215, '例：x+y=3, 2x−y=0', 'var(--text)', 12.5);
        txt(g, 450, 248, '|A|=−3, |A₁|=−3, |A₂|=−6', 'var(--text-muted)', 12);
        txt(g, 450, 282, 'x = 1, y = 2', 'var(--primary-strong)', 14, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-74', level: 'B', title: '矩阵的概念与运算（加法、数乘、乘法、转置）',
    intuition: '矩阵运算要点：加法/数乘<strong>逐元素</strong>进行；<strong>乘法不满足交换律</strong>（AB≠BA），且要求「左列数 = 右行数」；乘法满足结合律 (AB)C=A(BC) 和分配律。转置性质：(AB)ᵀ = BᵀAᵀ（顺序反）。单位阵 E 满足 EA=AE=A。注意：AB=0 不能推出 A=0 或 B=0。',
    derivation: [
      '(AB)_{ij} = \\sum_{k}a_{ik}b_{kj}',
      '(AB)^{T}=B^{T}A^{T}; \\quad (A+B)^{T}=A^{T}+B^{T}',
      'AB\\neq BA \\; (\\text{一般}); \\quad AB=0 \\nRightarrow A=0 \\text{ 或 } B=0',
      'A^{k}A^{l}=A^{k+l}; \\quad (A^{k})^{l}=A^{kl}'
    ],
    exam_text: '<b>【2018 真题改编】</b>两个 2 阶矩阵 A、B，满足 AB=0，能否推出 A=0 或 B=0？',
    exam_answer: '答案：<b>不能</b>。例：A=[[1,0],[0,0]]，B=[[0,0],[1,0]]，AB=0 但 A、B 都非零。这与数的乘法不同——矩阵乘法存在「零因子」。但若 A 可逆，则 AB=0 可推出 B=0（两边左乘 A⁻¹）。',
    pitfalls: [
      'AB≠BA——矩阵乘法一般不交换，写「AB」和「BA」是两回事。',
      'AB=0 推不出 A=0 或 B=0（零因子），这是与数的运算最大差别。',
      '(AB)ᵀ=BᵀAᵀ，转置要「反序」，别写成 AᵀBᵀ。'
    ],
    quiz: [
      { question: '矩阵乘法满足？', options: ['交换律', '结合律', '消去律'], correct: 1 },
      { question: '(AB)ᵀ 等于？', options: ['AᵀBᵀ', 'BᵀAᵀ', 'AB'], correct: 1 },
      { question: 'AB=0 说明？', options: ['A=0 或 B=0', '不能推出 A 或 B 为零', 'A、B 都可逆'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '加法与数乘：逐元素运算' },
      { focus: 1, desc: '乘法：左列数 = 右行数，行乘列求和' },
      { focus: 2, desc: '转置与乘法性质：反序、不交换' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['加法与数乘', '矩阵乘法', '转置与性质'][f]);
      if (f === 0) {
        [['1 2', '3 4'], ['5 6', '7 8']].forEach(function (m, k) {
          m.forEach(function (row, i) {
            row.split(' ').forEach(function (s, j) {
              box(g, 180 + k * 260 + j * 80, 120 + i * 64, 72, 54, k ? 'var(--success)' : 'var(--primary)', 0.1);
              txt(g, 216 + k * 260 + j * 80, 153 + i * 64, s, 'var(--text)', 13);
            });
          });
        });
        txt(g, 390, 200, '+', 'var(--text)', 22, 'middle', '700');
        txt(g, 450, 330, '对应位置相加：Cᵢⱼ = Aᵢⱼ + Bᵢⱼ', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 110, 80, 300, 120, 'var(--primary)', 0.08);
        txt(g, 260, 130, 'A（m×n）', 'var(--primary-strong)', 13, 'middle', '700');
        txt(g, 260, 158, '左矩阵', 'var(--text-muted)', 11);
        txt(g, 450, 140, '×', 'var(--text)', 20, 'middle', '700');
        box(g, 490, 80, 300, 120, 'var(--success)', 0.08);
        txt(g, 640, 130, 'B（n×p）', 'var(--success)', 13, 'middle', '700');
        txt(g, 640, 158, '右矩阵', 'var(--text-muted)', 11);
        txt(g, 450, 250, 'n = n 才能相乘（左列数 = 右行数）', 'var(--highlight)', 13, 'middle', '700');
        txt(g, 450, 285, '结果 C 是 m×p，cᵢⱼ = 第 i 行 · 第 j 列', 'var(--text)', 12.5);
        txt(g, 450, 320, 'AB 一般 ≠ BA（甚至 BA 可能无意义）', 'var(--danger)', 12, 'middle', '700');
      }
      if (f === 2) {
        const rows = [['(AB)ᵀ = BᵀAᵀ', '转置反序', 'var(--primary)'], ['(A+B)ᵀ = Aᵀ+Bᵀ', '加法可拆', 'var(--success)'], ['AB ≠ BA', '不交换', 'var(--danger)'], ['AB=0 ⇏ A=0 或 B=0', '零因子', 'var(--swap)']];
        rows.forEach(function (r, i) {
          const y = 60 + i * 66;
          box(g, 110, y, 680, 54, r[2], 0.08);
          txt(g, 140, y + 34, r[0], 'var(--text)', 12.5, 'start', '700');
          txt(g, 740, y + 34, r[1], 'var(--text-muted)', 11, 'end');
        });
      }
    }
  },
  {
    id: 'MA-75', level: 'B', title: '逆矩阵（定义、性质、求法）',
    intuition: '逆矩阵是「矩阵的倒数」：AB=BA=E 则 B=A⁻¹。存在条件：<strong>A 是方阵且 |A|≠0</strong>（满秩）。求法两种：<strong>伴随矩阵法</strong> A⁻¹ = A*/|A|（适合 2、3 阶）；<strong>初等行变换法</strong> [A|E] → [E|A⁻¹]（适合高阶）。性质：(A⁻¹)⁻¹=A，(AB)⁻¹=B⁻¹A⁻¹（反序），(Aᵀ)⁻¹=(A⁻¹)ᵀ。',
    derivation: [
      'AB=BA=E \\Rightarrow B=A^{-1}',
      'A^{-1}=\\frac{A^{*}}{|A|}, \\quad |A|\\neq0',
      '[A\\,|\\,E] \\xrightarrow{\\text{行变换}} [E\\,|\\,A^{-1}]',
      '(AB)^{-1}=B^{-1}A^{-1}; \\quad |A^{-1}|=\\frac{1}{|A|}'
    ],
    exam_text: '<b>【2017 真题改编】</b>求 A=[[1,2],[3,4]] 的逆矩阵。',
    exam_answer: '答案：|A| = 4−6 = −2 ≠ 0，可逆。A* = [[4,−2],[−3,1]]（主对角互换、副对角变号）。A⁻¹ = A*/|A| = <b>[[−2,1],[3/2,−1/2]]</b>。验证：AA⁻¹ = E ✓。二阶求逆口诀：「主对角互换、副对角变号、除以行列式」。',
    pitfalls: [
      '只有方阵才谈逆矩阵，且必须 |A|≠0（非奇异）。',
      '(AB)⁻¹ = B⁻¹A⁻¹，顺序要反过来。',
      '二阶伴随矩阵是「主对角互换、副对角变号」，不是直接转置。'
    ],
    quiz: [
      { question: '矩阵可逆的条件是？', options: ['|A|≠0', '|A|=0', 'A 是对称阵'], correct: 0 },
      { question: '(AB)⁻¹ 等于？', options: ['A⁻¹B⁻¹', 'B⁻¹A⁻¹', 'AB'], correct: 1 },
      { question: 'A⁻¹ 等于？', options: ['A*/|A|', '|A|/A*', 'A*·|A|'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '定义：AB=BA=E，B 是 A 的逆' },
      { focus: 1, desc: '伴随矩阵法：A⁻¹ = A*/|A|' },
      { focus: 2, desc: '初等行变换：[A|E] → [E|A⁻¹]' },
      { focus: 3, desc: '性质：(AB)⁻¹ = B⁻¹A⁻¹' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['逆矩阵定义', '伴随矩阵法', '初等行变换', '逆矩阵性质'][f]);
      if (f === 0) {
        box(g, 120, 100, 240, 90, 'var(--primary)', 0.1);
        txt(g, 240, 150, 'A', 'var(--primary-strong)', 22, 'middle', '700');
        txt(g, 450, 150, '×', 'var(--text)', 20, 'middle', '700');
        box(g, 540, 100, 240, 90, 'var(--success)', 0.1);
        txt(g, 660, 150, 'A⁻¹', 'var(--success)', 22, 'middle', '700');
        txt(g, 450, 230, '=', 'var(--text)', 20, 'middle', '700');
        box(g, 330, 250, 240, 70, 'var(--highlight)', 0.1);
        txt(g, 450, 292, 'E（单位阵）', 'var(--highlight)', 16, 'middle', '700');
        txt(g, 450, 355, 'A 必须可逆（|A|≠0），逆矩阵唯一', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 130, 80, 640, 70, 'var(--primary)', 0.08);
        txt(g, 450, 118, 'A⁻¹ = A* / |A|', 'var(--primary-strong)', 18, 'middle', '700');
        txt(g, 450, 175, 'A* 是伴随矩阵：元素为代数余子式，再转置', 'var(--text)', 12.5);
        txt(g, 450, 210, '二阶口诀：主对角互换、副对角变号', 'var(--highlight)', 12.5);
        txt(g, 450, 250, 'A=[[a,b],[c,d]] ⟹ A* = [[d,−b],[−c,a]]', 'var(--text)', 12);
        txt(g, 450, 290, 'A⁻¹ = 1/(ad−bc) · [[d,−b],[−c,a]]', 'var(--success)', 13, 'middle', '700');
      }
      if (f === 2) {
        box(g, 150, 100, 600, 70, 'var(--success)', 0.08);
        txt(g, 450, 142, '[ A | E ]  ⟶  [ E | A⁻¹ ]', 'var(--success)', 16, 'middle', '700');
        txt(g, 450, 200, '只用「初等行变换」，不能列变换', 'var(--text)', 12.5);
        txt(g, 450, 235, '适合 3 阶以上：比伴随矩阵法快得多', 'var(--text-muted)', 12);
        txt(g, 450, 280, '若左边化不出 E，说明 |A|=0，不可逆', 'var(--danger)', 12, 'middle', '700');
      }
      if (f === 3) {
        const rows = [['(A⁻¹)⁻¹ = A', 'var(--primary)'], ['(AB)⁻¹ = B⁻¹A⁻¹', 'var(--success)'], ['(Aᵀ)⁻¹ = (A⁻¹)ᵀ', 'var(--highlight)'], ['|A⁻¹| = 1/|A|', 'var(--swap)']];
        rows.forEach(function (r, i) {
          const y = 70 + i * 66;
          box(g, 140, y, 620, 54, r[1], 0.08);
          txt(g, 450, y + 34, r[0], 'var(--text)', 13, 'middle', '700');
        });
      }
    }
  },
  {
    id: 'MA-76', level: 'B', title: '伴随矩阵',
    intuition: '伴随矩阵 A* 的元素是 A 的<strong>代数余子式</strong>，并且要<strong>转置</strong>排列：A*ᵢⱼ = Aⱼᵢ（注意下标是反的）。核心公式：<strong>AA* = A*A = |A|E</strong>，由此得 A⁻¹ = A*/|A|。秩的关系：|A|≠0 时 r(A*)=n；r(A)=n−1 时 r(A*)=1；r(A)<n−1 时 r(A*)=0。',
    derivation: [
      'A^{*}_{ij}=A_{ji} \\; (\\text{代数余子式转置排列})',
      'AA^{*}=A^{*}A=|A|E',
      'A^{-1}=\\frac{A^{*}}{|A|} \\; (|A|\\neq0)',
      'r(A^{*}) = n \\; (r(A)=n); \\; =1 \\; (r(A)=n-1); \\; =0 \\; (r(A)<n-1)'
    ],
    exam_text: '<b>【2019 真题改编】</b>已知 3 阶矩阵 A 满足 |A|=3，求 |A*|。',
    exam_answer: '答案：由 AA*=|A|E 两边取行列式：|A||A*| = |A|³（3 阶），故 |A*| = |A|³/|A| = |A|² = <b>9</b>。一般结论：n 阶矩阵 |A*| = |A|^(n−1)。这个公式常与 |kA| = kⁿ|A| 一起考。',
    pitfalls: [
      'A* 的元素排列是「转置」的：A*ᵢⱼ = Aⱼᵢ，别按原位置填。',
      '|A*| = |A|^(n−1)（n 为阶数），不是 |A|。',
      'A* 的秩有三种情况，与 A 的秩挂钩，选择题常考。'
    ],
    quiz: [
      { question: 'AA* 等于？', options: ['E', '|A|E', 'A'], correct: 1 },
      { question: '3 阶矩阵 |A|=3，|A*| 等于？', options: ['3', '9', '27'], correct: 1 },
      { question: 'r(A)=n−1 时 r(A*) 等于？', options: ['0', '1', 'n'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '伴随矩阵：代数余子式转置排列' },
      { focus: 1, desc: '核心公式：AA* = |A|E' },
      { focus: 2, desc: '伴随的秩与 |A*| 公式' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['伴随矩阵', '核心公式', '秩与行列式'][f]);
      if (f === 0) {
        const m = [['A₁₁', 'A₂₁', 'A₃₁'], ['A₁₂', 'A₂₂', 'A₃₂'], ['A₁₃', 'A₂₃', 'A₃₃']];
        m.forEach(function (row, i) {
          row.forEach(function (s, j) {
            const x = 280 + j * 110, y = 100 + i * 62;
            box(g, x, y, 96, 52, 'var(--primary)', 0.08);
            txt(g, x + 48, y + 33, s, 'var(--text)', 12);
          });
        });
        txt(g, 700, 150, '行是原矩阵的列', 'var(--highlight)', 11, 'start');
        txt(g, 700, 174, '（转置排列）', 'var(--text-muted)', 10.5, 'start');
        txt(g, 450, 340, 'A*ᵢⱼ = Aⱼᵢ：第 i 行是原矩阵第 i 列的代数余子式', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 120, 80, 660, 80, 'var(--success)', 0.1);
        txt(g, 450, 118, 'A A* = A* A = |A| E', 'var(--success)', 20, 'middle', '700');
        txt(g, 450, 148, '这是伴随矩阵最重要的恒等式', 'var(--text-muted)', 11.5);
        txt(g, 450, 215, '由此得：A⁻¹ = A*/|A|', 'var(--primary-strong)', 14, 'middle', '700');
        txt(g, 450, 255, '两边取行列式：|A||A*| = |A|ⁿ ⟹ |A*| = |A|^(n−1)', 'var(--text)', 12.5);
      }
      if (f === 2) {
        const rows = [['r(A) = n', 'r(A*) = n', '|A*| = |A|^(n−1)', 'var(--success)'], ['r(A) = n−1', 'r(A*) = 1', '|A*| = 0', 'var(--highlight)'], ['r(A) < n−1', 'r(A*) = 0', '|A*| = 0', 'var(--danger)']];
        rows.forEach(function (r, i) {
          const y = 70 + i * 82;
          box(g, 90, y, 720, 68, r[3], 0.08);
          txt(g, 130, y + 42, r[0], 'var(--text)', 12.5, 'start', '700');
          txt(g, 360, y + 42, r[1], r[3], 12.5, 'start', '700');
          txt(g, 580, y + 42, r[2], 'var(--text-muted)', 11.5, 'start');
        });
        txt(g, 450, 350, '秩的三种情况是选择题高频考点', 'var(--text-muted)', 12);
      }
    }
  },
  {
    id: 'MA-77', level: 'B', title: '初等变换与初等矩阵',
    intuition: '三种初等行变换：<strong>换行</strong>（rᵢ↔rⱼ）、<strong>乘数</strong>（rᵢ×k, k≠0）、<strong>倍加</strong>（rᵢ+k·rⱼ）。对应三种初等矩阵：E(i,j)、E(i(k))、E(i,j(k))。关键结论：<strong>左乘初等矩阵 = 做对应行变换，右乘 = 做对应列变换</strong>。初等矩阵都可逆，逆矩阵仍是同类型初等矩阵。求逆、求秩、解方程组都靠初等变换。',
    derivation: [
      '\\text{三种行变换}: \\; r_i\\leftrightarrow r_j; \\; r_i\\times k; \\; r_i+k r_j',
      '\\text{左乘 } P \\Rightarrow \\text{行变换}; \\; \\text{右乘 } P \\Rightarrow \\text{列变换}',
      'P^{-1} \\text{ 仍是同类型初等矩阵}',
      'A \\xrightarrow{\\text{初等变换}} \\text{行阶梯形（求秩）}'
    ],
    exam_text: '<b>【2018 真题改编】</b>对矩阵 A 左乘一个「交换第 1、2 行」的初等矩阵，效果是什么？',
    exam_answer: '答案：左乘初等矩阵 P 等价于对 A 做<b>同样的行变换</b>——即交换 A 的第 1、2 行。记忆：<b>左行右列</b>（左乘管行，右乘管列）。初等矩阵都可逆，且逆矩阵是同类初等矩阵（如交换矩阵的逆是它自己）。',
    pitfalls: [
      '左乘 = 行变换，右乘 = 列变换——「左行右列」，别记反。',
      '倍加变换 rᵢ+k·rⱼ 是「把第 j 行的 k 倍加到第 i 行」，方向别搞错。',
      '初等变换不改变矩阵的秩，但换行会改变行列式符号（求行列式时要记账）。'
    ],
    quiz: [
      { question: '左乘初等矩阵对应？', options: ['行变换', '列变换', '都不对'], correct: 0 },
      { question: '交换两行的初等矩阵，其逆矩阵是？', options: ['它自己', '单位阵', '不存在'], correct: 0 },
      { question: '初等变换对矩阵的秩？', options: ['不改变', '必增大', '必减小'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '三种初等行变换与对应矩阵' },
      { focus: 1, desc: '左行右列：乘法的几何含义' },
      { focus: 2, desc: '初等变换求秩、求逆的应用' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['三种行变换', '左行右列', '应用：求秩/求逆'][f]);
      if (f === 0) {
        const rows = [['换行 rᵢ ↔ rⱼ', 'E(i,j)', 'var(--primary)'], ['乘数 rᵢ × k', 'E(i(k))', 'var(--success)'], ['倍加 rᵢ + k·rⱼ', 'E(i,j(k))', 'var(--highlight)']];
        rows.forEach(function (r, i) {
          const y = 70 + i * 78;
          box(g, 100, y, 360, 62, r[2], 0.1);
          txt(g, 130, y + 38, r[0], 'var(--text)', 13, 'start', '700');
          box(g, 500, y, 300, 62, r[2], 0.08);
          txt(g, 650, y + 38, r[1], r[2], 13, 'middle', '700');
        });
      }
      if (f === 1) {
        box(g, 100, 80, 280, 110, 'var(--primary)', 0.1);
        txt(g, 240, 125, 'P × A', 'var(--primary-strong)', 18, 'middle', '700');
        txt(g, 240, 155, '左乘', 'var(--text-muted)', 11);
        txt(g, 450, 135, '→', 'var(--text)', 22, 'middle', '700');
        box(g, 520, 80, 280, 110, 'var(--success)', 0.1);
        txt(g, 660, 125, '行变换', 'var(--success)', 16, 'middle', '700');
        txt(g, 660, 155, '动的是「行」', 'var(--text-muted)', 11);
        box(g, 100, 220, 280, 110, 'var(--highlight)', 0.1);
        txt(g, 240, 265, 'A × P', 'var(--highlight)', 18, 'middle', '700');
        txt(g, 240, 295, '右乘', 'var(--text-muted)', 11);
        txt(g, 450, 275, '→', 'var(--text)', 22, 'middle', '700');
        box(g, 520, 220, 280, 110, 'var(--swap)', 0.1);
        txt(g, 660, 265, '列变换', 'var(--swap)', 16, 'middle', '700');
        txt(g, 660, 295, '动的是「列」', 'var(--text-muted)', 11);
      }
      if (f === 2) {
        box(g, 110, 70, 680, 80, 'var(--primary)', 0.08);
        txt(g, 450, 105, 'A → 行阶梯形：非零行数 = 秩', 'var(--primary-strong)', 14, 'middle', '700');
        txt(g, 450, 132, '初等变换不改变秩', 'var(--text-muted)', 11);
        box(g, 110, 180, 680, 80, 'var(--success)', 0.08);
        txt(g, 450, 215, '[A | E] → [E | A⁻¹]', 'var(--success)', 15, 'middle', '700');
        txt(g, 450, 242, '求逆：只用行变换', 'var(--text-muted)', 11);
        txt(g, 450, 310, '解方程组：增广矩阵做行变换化行最简形', 'var(--text)', 12.5);
      }
    }
  },
  {
    id: 'MA-78', level: 'B', title: '矩阵的秩',
    intuition: '矩阵的秩 = 行阶梯形中<strong>非零行的行数</strong> = 最高阶非零子式的阶数 = 行向量组的秩 = 列向量组的秩。关键性质：r(A)=r(Aᵀ)；初等变换不改变秩；r(AB) ≤ min(r(A),r(B))；r(A+B) ≤ r(A)+r(B)；A 可逆 ⟺ r(A)=n（满秩）。',
    derivation: [
      'r(A) = \\text{行阶梯形非零行数} = \\text{最高阶非零子式阶数}',
      'r(A)=r(A^{T}); \\quad \\text{初等变换不改秩}',
      'r(AB)\\le\\min\\{r(A),r(B)\\}',
      'r(A+B)\\le r(A)+r(B)'
    ],
    exam_text: '<b>【2019 真题改编】</b>矩阵 A=[[1,2,3],[2,4,6]] 的秩是多少？',
    exam_answer: '答案：第 2 行是第 1 行的 2 倍，行变换后第 2 行全零，非零行只有 1 行，故 <b>r(A)=1</b>。也可看子式：二阶子式 |1 2; 2 4|=0，一阶子式非零，故秩为 1。秩的本质是「有效独立信息的条数」。',
    pitfalls: [
      '秩不是「非零元素的个数」，而是「线性无关的行（列）数」。',
      'r(AB) 一般小于 min(r(A),r(B))，不能取等号。',
      '满秩（r=n）是方阵可逆的充要条件。'
    ],
    quiz: [
      { question: 'r(A) 等于？', options: ['非零元素个数', '行阶梯形非零行数', '矩阵阶数'], correct: 1 },
      { question: '初等变换对秩的影响是？', options: ['不改变', '必增大', '必减小'], correct: 0 },
      { question: 'n 阶方阵可逆的充要条件是？', options: ['r(A)=n', 'r(A)<n', '|A|=0'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '秩 = 行阶梯形非零行数' },
      { focus: 1, desc: '秩 = 最高阶非零子式阶数' },
      { focus: 2, desc: '秩的运算性质与可逆判定' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['行阶梯形', '子式定义', '秩的性质'][f]);
      if (f === 0) {
        const m = [['1', '2', '3'], ['0', '1', '2'], ['0', '0', '0']];
        m.forEach(function (row, i) {
          row.forEach(function (s, j) {
            const x = 300 + j * 100, y = 100 + i * 64;
            const zero = s === '0' && i === 2;
            box(g, x, y, 86, 54, zero ? 'var(--text-muted)' : 'var(--primary)', zero ? 0.04 : 0.1);
            txt(g, x + 43, y + 34, s, zero ? 'var(--text-muted)' : 'var(--text)', 13);
          });
        });
        txt(g, 660, 130, '非零行：2 行', 'var(--highlight)', 12, 'start', '700');
        txt(g, 660, 156, '故 r(A) = 2', 'var(--success)', 13, 'start', '700');
        txt(g, 450, 340, '行阶梯形：每行首个非零元在上一行右侧，零行在底部', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 120, 80, 660, 80, 'var(--success)', 0.08);
        txt(g, 450, 118, 'r(A) = 最高阶非零子式的阶数', 'var(--success)', 15, 'middle', '700');
        txt(g, 450, 148, '子式 = 任取 k 行 k 列组成的行列式', 'var(--text-muted)', 11.5);
        txt(g, 450, 215, '若所有 k+1 阶子式都为 0，而存在 k 阶非零子式', 'var(--text)', 12.5);
        txt(g, 450, 248, '则 r(A) = k', 'var(--primary-strong)', 14, 'middle', '700');
        txt(g, 450, 300, '例：[[1,2],[2,4]]：二阶子式=0，一阶非零 → 秩 1', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        const rows = [['r(A) = r(Aᵀ)', '转置不变'], ['r(AB) ≤ min(r(A),r(B))', '乘积不增秩'], ['r(A+B) ≤ r(A)+r(B)', '和也不增太多'], ['r(A)=n ⟺ A 可逆', '满秩判定']];
        rows.forEach(function (r, i) {
          const y = 60 + i * 66;
          box(g, 100, y, 700, 54, ['var(--primary)', 'var(--success)', 'var(--highlight)', 'var(--swap)'][i], 0.08);
          txt(g, 130, y + 34, r[0], 'var(--text)', 12.5, 'start', '700');
          txt(g, 750, y + 34, r[1], 'var(--text-muted)', 11, 'end');
        });
      }
    }
  },
  {
    id: 'MA-79', level: 'B', title: '向量组的线性表示与线性组合',
    intuition: '向量 β 能由向量组 α₁,…,αₙ <strong>线性表示</strong> ⟺ 存在 k₁,…,kₙ 使 β = k₁α₁+…+kₙαₙ ⟺ 方程组 Ax=β 有解 ⟺ <strong>r(α₁,…,αₙ) = r(α₁,…,αₙ,β)</strong>。向量组之间可互相表示则称<strong>等价</strong>，等价的向量组秩相等。',
    derivation: [
      '\\beta = k_1\\alpha_1+\\cdots+k_n\\alpha_n \\; (\\text{线性表示})',
      '\\beta \\text{ 可由 } A \\text{ 表示} \\Leftrightarrow r(A)=r(A,\\beta)',
      '\\text{两向量组等价} \\Leftrightarrow \\text{可互相表示}',
      '\\text{等价向量组秩相等（反之不成立）}'
    ],
    exam_text: '<b>【2018 真题改编】</b>β=(1,2,3) 能否由 α₁=(1,0,0)、α₂=(0,1,0)、α₃=(0,0,1) 线性表示？',
    exam_answer: '答案：能。β = 1·α₁ + 2·α₂ + 3·α₃。从秩看：r(α₁,α₂,α₃)=3，r(α₁,α₂,α₃,β)=3（加入 β 不增秩），故可表示。若 β 是 (1,2,3) 而 α 只有两个线性无关向量，则 r(A)=2<3=r(A,β)，不可表示。',
    pitfalls: [
      '「可表示」的判定是 r(A)=r(A,β)，不是看向量个数。',
      '等价向量组秩相等，但秩相等的向量组不一定等价（需互相可表示）。',
      '零向量可由任何向量组表示（系数全取 0）。'
    ],
    quiz: [
      { question: 'β 可由 A 线性表示的充要条件是？', options: ['r(A)=r(A,β)', 'r(A)<r(A,β)', '|A|=0'], correct: 0 },
      { question: '等价向量组的秩？', options: ['相等', '必不相等', '无法判断'], correct: 0 },
      { question: '零向量能否被任意向量组表示？', options: ['能（系数全0）', '不能', '仅当组非空'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '线性表示：β 是 α 的线性组合' },
      { focus: 1, desc: '判定：r(A) = r(A,β)' },
      { focus: 2, desc: '向量组等价与秩的关系' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['线性组合', '秩判定', '向量组等价'][f]);
      if (f === 0) {
        arw(g, 160, 280, 340, 280, 'var(--primary)');
        arw(g, 160, 280, 260, 160, 'var(--success)');
        arw(g, 160, 280, 460, 210, 'var(--danger)');
        txt(g, 342, 296, 'α₁', 'var(--primary)', 13, 'start', '700');
        txt(g, 250, 152, 'α₂', 'var(--success)', 13, 'start', '700');
        txt(g, 466, 200, 'β', 'var(--danger)', 13, 'start', '700');
        txt(g, 450, 340, 'β = k₁α₁ + k₂α₂：β 落在 α 张成的平面内', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 120, 80, 660, 80, 'var(--primary)', 0.08);
        txt(g, 450, 118, 'r(α₁,…,αₙ) = r(α₁,…,αₙ,β)', 'var(--primary-strong)', 16, 'middle', '700');
        txt(g, 450, 148, '加入 β 后秩不变 ⟺ β 没有带来「新方向」', 'var(--text-muted)', 11.5);
        txt(g, 450, 215, '若 r(A) < r(A,β)：β 带来新方向 → 不可表示', 'var(--text)', 12.5);
        txt(g, 450, 255, '本质：解方程组 Ax=β 是否有解', 'var(--highlight)', 12.5, 'middle', '700');
      }
      if (f === 2) {
        box(g, 120, 80, 300, 90, 'var(--primary)', 0.1);
        txt(g, 270, 118, '向量组 A', 'var(--primary-strong)', 14, 'middle', '700');
        txt(g, 270, 145, '秩 r₁', 'var(--text-muted)', 11.5);
        box(g, 480, 80, 300, 90, 'var(--success)', 0.1);
        txt(g, 630, 118, '向量组 B', 'var(--success)', 14, 'middle', '700');
        txt(g, 630, 145, '秩 r₂', 'var(--text-muted)', 11.5);
        arw(g, 424, 110, 476, 110, 'var(--text-muted)');
        arw(g, 476, 145, 424, 145, 'var(--text-muted)');
        txt(g, 450, 220, '可互相表示 ⟺ 等价 ⟹ r₁ = r₂', 'var(--primary-strong)', 13.5, 'middle', '700');
        txt(g, 450, 260, '注意：秩相等不一定等价（方向可能不同）', 'var(--danger)', 12, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-80', level: 'B', title: '向量组的线性相关与线性无关',
    intuition: '向量组 α₁,…,αₙ <strong>线性相关</strong> ⟺ 存在<strong>不全为零</strong>的系数使 k₁α₁+…+kₙαₙ=0 ⟺ 齐次方程组 Ax=0 有非零解 ⟺ r(A)<n。若只有全零系数才成立，则<strong>线性无关</strong> ⟺ r(A)=n。几何直觉：相关 = 有「多余」向量（能被其余表示），无关 = 每个向量都带来新方向。',
    derivation: [
      '\\text{线性相关}: \\; \\exists k_i \\text{ 不全为 } 0, \\; \\sum k_i\\alpha_i=0',
      '\\text{相关} \\Leftrightarrow Ax=0 \\text{ 有非零解} \\Leftrightarrow r(A)<n',
      '\\text{无关} \\Leftrightarrow r(A)=n \\; (n \\text{ 为向量个数})',
      'n+1 \\text{ 个 } n \\text{ 维向量必线性相关}'
    ],
    exam_text: '<b>【2017 真题改编】</b>判断 α₁=(1,0,0)、α₂=(0,1,0)、α₃=(1,1,0) 的线性相关性。',
    exam_answer: '答案：α₃ = α₁ + α₂，存在不全为零的系数（1,1,−1）使 α₁+α₂−α₃=0，故<b>线性相关</b>。从秩看：矩阵 [[1,0,1],[0,1,1],[0,0,0]] 的秩为 2 < 3（向量个数），故相关。三个向量都在 xOy 平面内，无法张成三维空间。',
    pitfalls: [
      '「相关」的定义要求系数不全为零，全零系数永远满足等式，不能算相关。',
      '判断相关看 r(A) 与「向量个数 n」的大小，不是与维数比。',
      '含零向量的向量组一定线性相关（零向量可由其他向量「免费」表示）。'
    ],
    quiz: [
      { question: '向量组线性相关的充要条件是？', options: ['r(A)<n', 'r(A)=n', 'r(A)=0'], correct: 0 },
      { question: '含零向量的向量组？', options: ['一定线性相关', '一定线性无关', '无法判断'], correct: 0 },
      { question: 'n+1 个 n 维向量？', options: ['必线性相关', '必线性无关', '不确定'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '定义：存在不全为零的系数使组合为零' },
      { focus: 1, desc: '秩判定：r(A) < n 则相关' },
      { focus: 2, desc: '几何直观：多余向量与张成空间' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['定义', '秩判定', '几何直观'][f]);
      if (f === 0) {
        box(g, 120, 80, 660, 80, 'var(--primary)', 0.08);
        txt(g, 450, 118, 'k₁α₁ + k₂α₂ + … + kₙαₙ = 0', 'var(--primary-strong)', 15, 'middle', '700');
        txt(g, 450, 148, '存在「不全为零」的 kᵢ → 线性相关', 'var(--text-muted)', 11.5);
        txt(g, 450, 215, '只有全零解 → 线性无关', 'var(--success)', 13, 'middle', '700');
        txt(g, 450, 260, '关键：不全为零 ≠ 全不为零', 'var(--danger)', 12, 'middle', '700');
      }
      if (f === 1) {
        box(g, 120, 80, 660, 70, 'var(--success)', 0.08);
        txt(g, 450, 120, 'A = (α₁,…,αₙ)，解 Ax = 0', 'var(--success)', 14, 'middle', '700');
        txt(g, 450, 190, 'r(A) < n → 有非零解 → 线性相关', 'var(--danger)', 13, 'middle', '700');
        txt(g, 450, 230, 'r(A) = n → 只有零解 → 线性无关', 'var(--success)', 13, 'middle', '700');
        txt(g, 450, 285, 'n 为向量个数（也是未知数个数）', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        g.append('path').attr('d', 'M 150 280 L 480 280 L 620 170 L 290 170 Z').attr('fill', 'var(--primary)').attr('fill-opacity', 0.1).attr('stroke', 'var(--primary)').attr('stroke-width', 1.6);
        arw(g, 200, 300, 440, 300, 'var(--primary)');
        arw(g, 200, 300, 380, 210, 'var(--success)');
        arw(g, 200, 300, 500, 250, 'var(--danger)');
        txt(g, 440, 318, 'α₁', 'var(--primary)', 12, 'start', '700');
        txt(g, 386, 204, 'α₂', 'var(--success)', 12, 'start', '700');
        txt(g, 508, 242, 'α₃', 'var(--danger)', 12, 'start', '700');
        txt(g, 450, 350, 'α₃ 在 α₁、α₂ 张成的平面内 → 相关（不多给方向）', 'var(--text-muted)', 12);
      }
    }
  },
  {
    id: 'MA-81', level: 'B', title: '向量组的秩与极大线性无关组',
    intuition: '<strong>极大线性无关组</strong>：从向量组中挑出的「线性无关且数量最多」的一组。它的向量个数 = 向量组的<strong>秩</strong>，且原向量组中每个向量都能由它线性表示。极大无关组不唯一，但<strong>秩唯一</strong>。求法：把向量组作为列拼成矩阵，行变换化行最简形，主元所在列对应原向量即构成极大无关组。',
    derivation: [
      '\\text{秩} = \\text{极大线性无关组中向量个数}',
      '\\text{极大无关组不唯一，但秩唯一}',
      '\\text{求法}: \\; A=(\\alpha_1,\\dots,\\alpha_n) \\xrightarrow{\\text{行变换}} \\text{行最简形}',
      '\\text{主元列} \\Rightarrow \\text{对应原向量构成极大无关组}'
    ],
    exam_text: '<b>【2019 真题改编】</b>向量组 α₁=(1,0)、α₂=(0,1)、α₃=(1,1) 的秩是多少？极大无关组是？',
    exam_answer: '答案：α₃=α₁+α₂，故 α₁、α₂ 线性无关且能表示全部向量，<b>秩 = 2</b>，{α₁,α₂} 是一个极大无关组。{α₁,α₃} 也是极大无关组（同样线性无关且能表示 α₂）。极大无关组不唯一，但秩唯一——这是关键结论。',
    pitfalls: [
      '极大无关组不唯一，但秩唯一，不要把「组」和「秩」混为一谈。',
      '求极大无关组要用「列向量拼矩阵」，主元列对应原向量。',
      '极大无关组必须能表示原组中「所有」向量，不只是线性无关。'
    ],
    quiz: [
      { question: '极大无关组的向量个数等于？', options: ['矩阵阶数', '向量组的秩', '向量总数'], correct: 1 },
      { question: '极大无关组是否唯一？', options: ['唯一', '不唯一', '不存在'], correct: 1 },
      { question: '求极大无关组时矩阵怎么拼？', options: ['向量作列', '向量作行', '任意'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '定义：线性无关且能表示全部向量' },
      { focus: 1, desc: '秩唯一、组不唯一' },
      { focus: 2, desc: '求法：行最简形的主元列' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['极大无关组', '秩唯一', '主元列求法'][f]);
      if (f === 0) {
        ['α₁', 'α₂', 'α₃', 'α₄'].forEach(function (s, i) {
          const on = i < 2;
          box(g, 130 + i * 150, 110, 120, 90, on ? 'var(--success)' : 'var(--text-muted)', on ? 0.15 : 0.05);
          txt(g, 190 + i * 150, 162, s, on ? 'var(--success)' : 'var(--text-muted)', 16, 'middle', '700');
        });
        box(g, 100, 230, 660, 56, 'var(--primary)', 0.08);
        txt(g, 430, 265, '绿色两个线性无关、且能表示全部 → 极大无关组', 'var(--text)', 12);
      }
      if (f === 1) {
        box(g, 110, 80, 320, 100, 'var(--success)', 0.08);
        txt(g, 270, 120, '极大无关组', 'var(--success)', 15, 'middle', '700');
        txt(g, 270, 148, '可以有多个', 'var(--text-muted)', 11.5);
        box(g, 470, 80, 320, 100, 'var(--highlight)', 0.08);
        txt(g, 630, 120, '秩', 'var(--highlight)', 15, 'middle', '700');
        txt(g, 630, 148, '只有一个数', 'var(--text-muted)', 11.5);
        txt(g, 450, 230, '不同极大无关组之间「等价」，故秩相同', 'var(--text)', 12.5);
        txt(g, 450, 270, '做题时回答「秩 = k」比列出某组更稳', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        const m = [['1', '0', '1'], ['0', '1', '1'], ['0', '0', '0']];
        m.forEach(function (row, i) {
          row.forEach(function (s, j) {
            const x = 300 + j * 100, y = 100 + i * 62;
            const pivot = (i === j && s === '1');
            box(g, x, y, 86, 52, pivot ? 'var(--success)' : 'var(--text-muted)', pivot ? 0.15 : 0.05);
            txt(g, x + 43, y + 33, s, pivot ? 'var(--success)' : 'var(--text-muted)', 13);
          });
        });
        txt(g, 640, 130, '主元列：1、2 列', 'var(--highlight)', 11.5, 'start', '700');
        txt(g, 640, 155, '→ α₁、α₂ 是极大无关组', 'var(--success)', 11, 'start');
        txt(g, 450, 330, '第 3 列可由前两列表示 → α₃ 不是「必需的」', 'var(--text-muted)', 12);
      }
    }
  },
  {
    id: 'MA-82', level: 'B', title: '向量空间（数一独有）',
    intuition: '向量空间（线性空间）是对「加法 + 数乘」封闭的向量集合。几个核心概念：<strong>基</strong>——线性无关且能张成整个空间的向量组；<strong>维数</strong>——基中向量个数；<strong>坐标</strong>——向量在基下的表示系数；<strong>过渡矩阵</strong>——两组基之间的变换矩阵，坐标变换公式 x = Py（P 为过渡矩阵）。',
    derivation: [
      '\\text{基}: \\; \\alpha_1,\\dots,\\alpha_r \\text{ 线性无关且张成 } V',
      '\\dim V = \\text{基中向量个数} = \\text{向量组的秩}',
      '\\beta = x_1\\alpha_1+\\cdots+x_r\\alpha_r \\Rightarrow (x_1,\\dots,x_r) \\text{ 为坐标}',
      '\\text{过渡}: (\\beta_1,\\dots,\\beta_r)=(\\alpha_1,\\dots,\\alpha_r)P'
    ],
    exam_text: '<b>【2018 真题改编】</b>R³ 中，α₁=(1,0,0)、α₂=(0,1,0) 张成的子空间维数是？',
    exam_answer: '答案：α₁、α₂ 线性无关，张成的是 xOy 平面，<b>维数 = 2</b>。它的一组基就是 {α₁,α₂}。R³ 本身维数是 3（基如 e₁,e₂,e₃）。判断维数 = 极大无关组的向量个数。',
    pitfalls: [
      '「张成空间的维数」= 向量组的秩，不是向量个数。',
      '基必须同时满足「线性无关」和「能张成空间」两个条件。',
      '过渡矩阵 P 的列是「新基在旧基下的坐标」，坐标变换是 x=Py。'
    ],
    quiz: [
      { question: '向量空间的维数等于？', options: ['向量个数', '基中向量个数', '坐标个数'], correct: 1 },
      { question: 'α₁=(1,0,0),α₂=(0,1,0) 张成的子空间维数是？', options: ['1', '2', '3'], correct: 1 },
      { question: '基必须满足？', options: ['线性无关', '线性相关', '个数最多'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '向量空间：对加法与数乘封闭' },
      { focus: 1, desc: '基与维数' },
      { focus: 2, desc: '坐标与过渡矩阵' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['向量空间', '基与维数', '坐标与过渡'][f]);
      if (f === 0) {
        g.append('path').attr('d', 'M 180 300 L 620 300 L 740 180 L 300 180 Z').attr('fill', 'var(--primary)').attr('fill-opacity', 0.12).attr('stroke', 'var(--primary)').attr('stroke-width', 1.8);
        arw(g, 220, 280, 520, 280, 'var(--success)');
        arw(g, 220, 280, 380, 190, 'var(--highlight)');
        txt(g, 450, 340, '平面（R³ 的子空间）：对加法、数乘封闭', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 110, 80, 320, 100, 'var(--success)', 0.08);
        txt(g, 270, 118, '基', 'var(--success)', 16, 'middle', '700');
        txt(g, 270, 148, '线性无关 + 张成空间', 'var(--text-muted)', 11);
        box(g, 470, 80, 320, 100, 'var(--highlight)', 0.08);
        txt(g, 630, 118, '维数', 'var(--highlight)', 16, 'middle', '700');
        txt(g, 630, 148, '基中向量个数 = 秩', 'var(--text-muted)', 11);
        txt(g, 450, 230, 'R² 的基：(1,0),(0,1)，维数 2', 'var(--text)', 12.5);
        txt(g, 450, 265, 'R³ 的基：e₁,e₂,e₃，维数 3', 'var(--text)', 12.5);
        txt(g, 450, 305, '同一空间的不同基，向量个数相同', 'var(--primary-strong)', 12, 'middle', '700');
      }
      if (f === 2) {
        box(g, 110, 80, 680, 70, 'var(--primary)', 0.08);
        txt(g, 450, 118, '(β₁,…,βᵣ) = (α₁,…,αᵣ)P', 'var(--primary-strong)', 15, 'middle', '700');
        txt(g, 450, 145, 'P 为过渡矩阵（列是新基在旧基下的坐标）', 'var(--text-muted)', 11);
        box(g, 110, 180, 680, 70, 'var(--success)', 0.08);
        txt(g, 450, 218, '坐标变换：x = P y', 'var(--success)', 15, 'middle', '700');
        txt(g, 450, 245, 'x 是旧坐标，y 是新坐标', 'var(--text-muted)', 11);
        txt(g, 450, 300, 'P 可逆（两组基等价）', 'var(--highlight)', 12, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-83', level: 'B', title: '线性方程组的解的结构（基础解系）',
    intuition: '齐次方程组 Ax=0 的解集构成一个<strong>向量空间</strong>（解空间），其维数 = n − r(A)（n 为未知数个数）。这个空间的任意一组基叫<strong>基础解系</strong>，通解 = 基础解系的线性组合。非齐次 Ax=b 的通解 = 特解 + 齐次通解。核心：<strong>基础解系含 n−r 个向量</strong>。',
    derivation: [
      '\\text{齐次}: \\; \\dim\\{\\text{解空间}\\} = n - r(A)',
      '\\text{基础解系含 } n-r \\text{ 个线性无关解}',
      '\\text{齐次通解}: \\; x=k_1\\xi_1+\\cdots+k_{n-r}\\xi_{n-r}',
      '\\text{非齐次通解}: \\; x=\\eta^{*}+\\text{齐次通解}'
    ],
    exam_text: '<b>【2017 真题改编】</b>3 元齐次方程组 Ax=0，若 r(A)=2，基础解系含几个向量？',
    exam_answer: '答案：n−r = 3−2 = <b>1 个</b>。解空间是一条过原点的直线（一维）。若 r(A)=1，则基础解系含 2 个向量（解空间是平面）；若 r(A)=3（满秩），只有零解，基础解系为空。',
    pitfalls: [
      '基础解系向量个数是 n−r（未知数个数减秩），不是 r。',
      '基础解系的向量必须线性无关，且能表示所有解。',
      '非齐次通解不能写成「特解的倍数」，必须是「特解 + 齐次通解」。'
    ],
    quiz: [
      { question: '基础解系含几个向量？', options: ['r(A) 个', 'n−r(A) 个', 'n 个'], correct: 1 },
      { question: '齐次方程组的解集构成？', options: ['向量空间', '仿射空间', '空集'], correct: 0 },
      { question: '非齐次通解等于？', options: ['特解+齐次通解', '特解×k', '齐次通解'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '解空间：齐次方程组的解构成向量空间' },
      { focus: 1, desc: '基础解系：解空间的基，含 n−r 个向量' },
      { focus: 2, desc: '非齐次通解 = 特解 + 齐次通解' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['解空间', '基础解系', '非齐次通解'][f]);
      if (f === 0) {
        ln(g, 180, 280, 720, 280, 'var(--border)', 1.4);
        ln(g, 450, 320, 450, 120, 'var(--border)', 1.4);
        ln(g, 240, 320, 660, 120, 'var(--primary)', 2.4);
        txt(g, 680, 130, '解空间', 'var(--primary)', 12, 'start', '700');
        txt(g, 450, 350, 'Ax=0 的解对加法、数乘封闭 → 构成子空间', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 120, 80, 660, 70, 'var(--success)', 0.08);
        txt(g, 450, 118, '基础解系向量个数 = n − r(A)', 'var(--success)', 16, 'middle', '700');
        txt(g, 450, 145, 'n = 未知数个数，r(A) = 系数矩阵的秩', 'var(--text-muted)', 11.5);
        const rows = [['r(A)=3（满秩）', '0 个（只有零解）'], ['r(A)=2', '1 个（解是直线）'], ['r(A)=1', '2 个（解是平面）']];
        rows.forEach(function (r, i) {
          const y = 190 + i * 56;
          box(g, 160, y, 580, 44, 'var(--primary)', 0.06);
          txt(g, 190, y + 28, r[0], 'var(--text)', 12, 'start', '700');
          txt(g, 460, y + 28, r[1], 'var(--text-muted)', 11.5, 'start');
        });
      }
      if (f === 2) {
        box(g, 110, 70, 680, 60, 'var(--primary)', 0.08);
        txt(g, 450, 108, 'x = η* + k₁ξ₁ + … + k_{n−r}ξ_{n−r}', 'var(--primary-strong)', 14, 'middle', '700');
        txt(g, 450, 165, 'η*：非齐次的一个特解', 'var(--highlight)', 12.5);
        txt(g, 450, 200, 'ξ：齐次的基础解系', 'var(--success)', 12.5);
        txt(g, 450, 250, '几何：解集是不过原点的直线/平面', 'var(--text)', 12.5);
        txt(g, 450, 290, '特解负责「平移」，齐次解负责「方向」', 'var(--text-muted)', 12);
      }
    }
  },
  {
    id: 'MA-84', level: 'B', title: '齐次线性方程组有非零解的条件',
    intuition: 'n 元齐次方程组 Ax=0：<strong>r(A)=n ⟺ 只有零解</strong>；<strong>r(A)<n ⟺ 有非零解</strong>（无穷多解）。当 A 是方阵时，等价于 <strong>|A|=0 ⟺ 有非零解</strong>。这是「行列式为 0」最常考的几何解释：方程组有非平凡解。',
    derivation: [
      'Ax=0: \\; r(A)=n \\Leftrightarrow \\text{只有零解}',
      'r(A)<n \\Leftrightarrow \\text{有非零解} \\Leftrightarrow \\text{无穷多解}',
      'A \\text{ 为方阵}: \\; |A|=0 \\Leftrightarrow \\text{有非零解}',
      '\\text{基础解系向量数} = n - r(A)'
    ],
    exam_text: '<b>【2019 真题改编】</b>3 元齐次方程组 Ax=0 有非零解的条件是？',
    exam_answer: '答案：<b>r(A) < 3</b>（或 A 为 3 阶方阵时 |A|=0）。此时基础解系含 3−r(A) 个向量，通解为它们的线性组合，有无穷多解。若 r(A)=3（满秩），则只有零解。',
    pitfalls: [
      '「有非零解」等价于「有无穷多解」，齐次方程不会只有唯一非零解。',
      '方阵才能用 |A|=0 判断，非方阵只能用秩。',
      '零解永远存在，讨论的是「除零解外还有没有」。'
    ],
    quiz: [
      { question: 'n 元齐次方程组有非零解的条件是？', options: ['r(A)=n', 'r(A)<n', 'r(A)=0'], correct: 1 },
      { question: '方阵 A 有非零解等价于？', options: ['|A|≠0', '|A|=0', 'A 可逆'], correct: 1 },
      { question: '有非零解时解的情况是？', options: ['唯一解', '无穷多解', '无解'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '零解永远存在，关注「非零解」' },
      { focus: 1, desc: '判定：r(A) < n ⟺ 有非零解' },
      { focus: 2, desc: '方阵特例：|A| = 0' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['零解与非零解', '秩判定', '方阵行列式'][f]);
      if (f === 0) {
        box(g, 120, 80, 660, 80, 'var(--primary)', 0.08);
        txt(g, 450, 118, 'Ax = 0 永远有零解 x = 0', 'var(--primary-strong)', 15, 'middle', '700');
        txt(g, 450, 148, '问题：除了零解，还有没有别的解？', 'var(--text-muted)', 11.5);
        txt(g, 450, 215, '有非零解 → 无穷多解（解的线性组合仍是解）', 'var(--highlight)', 12.5);
      }
      if (f === 1) {
        box(g, 120, 80, 660, 70, 'var(--success)', 0.08);
        txt(g, 450, 118, 'r(A) < n ⟺ 有非零解', 'var(--success)', 16, 'middle', '700');
        box(g, 120, 175, 660, 70, 'var(--danger)', 0.08);
        txt(g, 450, 213, 'r(A) = n ⟺ 只有零解', 'var(--danger)', 16, 'middle', '700');
        txt(g, 450, 285, 'n 是未知数个数（列数）', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 120, 80, 660, 70, 'var(--highlight)', 0.08);
        txt(g, 450, 118, 'A 为 n 阶方阵：|A| = 0 ⟺ 有非零解', 'var(--highlight)', 15, 'middle', '700');
        txt(g, 450, 180, '|A|=0：矩阵「压扁」了空间 → 有方向被映射到 0', 'var(--text)', 12.5);
        txt(g, 450, 215, '|A|≠0：可逆 → 只有零解', 'var(--success)', 12.5);
        txt(g, 450, 260, '这是行列式与方程组「联姻」的核心考点', 'var(--primary-strong)', 12.5, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-85', level: 'B', title: '非齐次线性方程组有解的条件',
    intuition: 'Ax=b 有解 ⟺ <strong>r(A) = r(A,b)</strong>（系数矩阵的秩 = 增广矩阵的秩）。进一步：等于 n 时<strong>唯一解</strong>；小于 n 时<strong>无穷多解</strong>；r(A)≠r(A,b) 时<strong>无解</strong>。几何：b 落在 A 的列空间内则有解。',
    derivation: [
      'Ax=b \\text{ 有解} \\Leftrightarrow r(A)=r(A,b)',
      'r(A)=r(A,b)=n \\Rightarrow \\text{唯一解}',
      'r(A)=r(A,b)<n \\Rightarrow \\text{无穷多解}',
      'r(A)\\neq r(A,b) \\Rightarrow \\text{无解}'
    ],
    exam_text: '<b>【2018 真题改编】</b>非齐次方程组 Ax=b 有解的充要条件是？',
    exam_answer: '答案：<b>r(A) = r(A,b)</b>。进一步判断解的个数：若该公共秩 = n（未知数个数），唯一解；若 < n，无穷多解。若 r(A) < r(A,b)，则无解（b 带来了系数矩阵没有的新方向）。',
    pitfalls: [
      '「有解」只看秩是否相等，不看行列式（非方阵没有行列式）。',
      'r(A)=r(A,b)<n 时是无穷多解，不是唯一解。',
      '无解的几何解释：b 不在 A 的列空间内。'
    ],
    quiz: [
      { question: 'Ax=b 有解的充要条件是？', options: ['r(A)=r(A,b)', 'r(A)<r(A,b)', '|A|=0'], correct: 0 },
      { question: 'r(A)=r(A,b)<n 时？', options: ['唯一解', '无穷多解', '无解'], correct: 1 },
      { question: 'r(A)<r(A,b) 时？', options: ['唯一解', '无穷多解', '无解'], correct: 2 }
    ],
    steps: [
      { focus: 0, desc: '有解判定：r(A) = r(A,b)' },
      { focus: 1, desc: '解的个数：比较公共秩与 n' },
      { focus: 2, desc: '三种情况的几何解释' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['有解判定', '解的个数', '几何解释'][f]);
      if (f === 0) {
        box(g, 110, 80, 680, 80, 'var(--primary)', 0.08);
        txt(g, 450, 118, 'r(A) = r(A, b)', 'var(--primary-strong)', 18, 'middle', '700');
        txt(g, 450, 148, '增广矩阵的秩不变 ⟺ b 没带来新方向', 'var(--text-muted)', 11.5);
        txt(g, 450, 215, '若 r(A) < r(A,b)：无解', 'var(--danger)', 13, 'middle', '700');
      }
      if (f === 1) {
        const rows = [['r(A) = r(A,b) = n', '唯一解', 'var(--success)'], ['r(A) = r(A,b) < n', '无穷多解', 'var(--highlight)'], ['r(A) < r(A,b)', '无解', 'var(--danger)']];
        rows.forEach(function (r, i) {
          const y = 70 + i * 82;
          box(g, 100, y, 700, 66, r[2], 0.1);
          txt(g, 130, y + 41, r[0], 'var(--text)', 13, 'start', '700');
          txt(g, 640, y + 41, r[1], r[2], 14, 'start', '700');
        });
        txt(g, 450, 340, 'n = 未知数个数；公共秩与 n 比大小', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        ln(g, 160, 300, 740, 300, 'var(--border)', 1.4);
        ln(g, 160, 300, 160, 100, 'var(--border)', 1.4);
        arw(g, 200, 280, 500, 180, 'var(--primary)');
        arw(g, 200, 280, 380, 260, 'var(--success)');
        circ(g, 560, 200, 6, 'var(--danger)');
        txt(g, 570, 194, 'b（有解：在张成空间内）', 'var(--danger)', 11, 'start', '700');
        circ(g, 660, 120, 6, 'var(--text-muted)');
        txt(g, 670, 114, 'b′（无解：跑出去了）', 'var(--text-muted)', 11, 'start');
        txt(g, 450, 350, 'b 能否由 A 的列向量线性表示 = 有无解', 'var(--text-muted)', 12);
      }
    }
  },
  {
    id: 'MA-86', level: 'B', title: '线性方程组的通解',
    intuition: '通解 = <strong>特解 + 齐次通解</strong>。求法固定：写出增广矩阵 (A|b)，初等行变换化<strong>行最简形</strong>；主元列对应「基本未知数」，其余为「自由未知数」；令自由未知数取单位向量（依次取 1，其余取 0），解出基本未知数，得到基础解系；再令自由未知数全取 0，解出一个特解。',
    derivation: [
      '\\mathbf{x}=\\eta^{*}+k_1\\xi_1+\\cdots+k_{n-r}\\xi_{n-r}',
      '\\text{步骤}: \\; (A|b) \\to \\text{行最简形}',
      '\\text{自由未知数}: \\; \\text{非主元列对应的变量}',
      '\\text{基础解系}: \\; \\text{自由变量取单位向量依次求解}'
    ],
    exam_text: '<b>【2019 真题改编】</b>解方程组 x₁+x₂+x₃=3, 2x₁+2x₂+2x₃=6。',
    exam_answer: '答案：两个方程成比例，r(A)=r(A,b)=1，n=3，故有无穷多解，基础解系含 2 个向量。通解：x₁ = 3 − x₂ − x₃（x₂、x₃ 自由）。即 <b>x = (3,0,0)ᵀ + k₁(−1,1,0)ᵀ + k₂(−1,0,1)ᵀ</b>。特解 (3,0,0)、基础解系两个向量。',
    pitfalls: [
      '自由未知数的个数 = n − r，不是 r。',
      '求基础解系时自由变量要「依次取 1」，不能全取 1。',
      '特解是让自由变量全为 0 得到的解，与基础解系要分开算。'
    ],
    quiz: [
      { question: '通解的组成是？', options: ['特解+齐次通解', '只有特解', '只有齐次解'], correct: 0 },
      { question: '自由未知数个数等于？', options: ['r', 'n−r', 'n'], correct: 1 },
      { question: '求基础解系时自由变量取？', options: ['全 1', '依次取单位向量', '全 0'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '增广矩阵化行最简形' },
      { focus: 1, desc: '区分主元变量与自由变量' },
      { focus: 2, desc: '基础解系 + 特解 → 通解' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['化行最简形', '主元与自由变量', '写出通解'][f]);
      if (f === 0) {
        box(g, 140, 80, 620, 70, 'var(--primary)', 0.08);
        txt(g, 450, 118, '(A | b)  ⟶  行最简形', 'var(--primary-strong)', 15, 'middle', '700');
        txt(g, 450, 145, '只用初等行变换，目标：主元为 1、上下为 0', 'var(--text-muted)', 11);
        const m = [['1', '0', '−1', '2'], ['0', '1', '2', '1'], ['0', '0', '0', '0']];
        m.forEach(function (row, i) {
          row.forEach(function (s, j) {
            const x = 250 + j * 90, y = 190 + i * 52;
            const pivot = (i === j && (s === '1'));
            box(g, x, y, 76, 44, pivot ? 'var(--success)' : 'var(--text-muted)', pivot ? 0.16 : 0.05);
            txt(g, x + 38, y + 28, s, pivot ? 'var(--success)' : 'var(--text-muted)', 12);
          });
        });
      }
      if (f === 1) {
        box(g, 90, 80, 720, 60, 'var(--success)', 0.08);
        txt(g, 450, 118, '主元列 → 基本未知数；其余列 → 自由未知数', 'var(--success)', 13, 'middle', '700');
        box(g, 90, 165, 340, 90, 'var(--primary)', 0.08);
        txt(g, 260, 200, '基本未知数', 'var(--primary-strong)', 13, 'middle', '700');
        txt(g, 260, 228, '由主元解出（用自由变量表示）', 'var(--text-muted)', 10.5);
        box(g, 470, 165, 340, 90, 'var(--highlight)', 0.08);
        txt(g, 640, 200, '自由未知数', 'var(--highlight)', 13, 'middle', '700');
        txt(g, 640, 228, '个数 = n − r，可任意取值', 'var(--text-muted)', 10.5);
        txt(g, 450, 300, '自由变量每取一组值，就得到一个解', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 100, 70, 700, 60, 'var(--highlight)', 0.1);
        txt(g, 450, 108, 'x = η* + k₁ξ₁ + … + k_{n−r}ξ_{n−r}', 'var(--highlight)', 14, 'middle', '700');
        txt(g, 450, 160, 'η*：自由变量全取 0 求出的特解', 'var(--success)', 12);
        txt(g, 450, 192, 'ξᵢ：自由变量依次取单位向量求出的基础解系', 'var(--primary)', 12);
        txt(g, 450, 232, 'kᵢ：任意常数', 'var(--text-muted)', 11.5);
        txt(g, 450, 280, '例：x=(3,0,0)+k₁(−1,1,0)+k₂(−1,0,1)', 'var(--primary-strong)', 12);
      }
    }
  },
  {
    id: 'MA-88', level: 'B', title: '相似矩阵',
    intuition: 'A 与 B <strong>相似</strong>（A~B）若存在可逆矩阵 P 使 <strong>P⁻¹AP = B</strong>。相似矩阵有相同的「相似不变量」：特征值、行列式、迹、秩、特征多项式。几何意义：A 和 B 是<strong>同一个线性变换在不同基下的矩阵</strong>。若 A 能相似对角化，则 A ~ Λ（对角阵）。',
    derivation: [
      'A\\sim B \\Leftrightarrow P^{-1}AP=B \\; (P \\text{ 可逆})',
      '\\text{相似不变量}: \\; |A|,\\; \\text{tr}(A),\\; r(A),\\; \\text{特征值}',
      'A \\text{ 可对角化} \\Leftrightarrow \\text{有 } n \\text{ 个线性无关特征向量}',
      'P^{-1}AP=\\Lambda \\Leftrightarrow A=P\\Lambda P^{-1}'
    ],
    exam_text: '<b>【2018 真题改编】</b>若 A 相似于 diag(1,2,3)，求 |A| 与 tr(A)。',
    exam_answer: '答案：相似矩阵有相同的行列式和迹。|A| = 1×2×3 = <b>6</b>；tr(A) = 1+2+3 = <b>6</b>。同时 A 的特征值就是 1、2、3。这三个不变量（行列式、迹、特征值）是判断相似的必要条件——若它们不同，一定不相似。',
    pitfalls: [
      '相似的必要条件（行列式/迹/秩/特征值相同）不等于充分条件——都相同也可能不相似。',
      'P⁻¹AP = B 中 P 必须可逆，且 P 的顺序是「左逆右正」。',
      '相似与合同是两个不同概念：合同是 PᵀAP，相似是 P⁻¹AP。'
    ],
    quiz: [
      { question: 'A~B 的定义是？', options: ['P⁻¹AP=B', 'PᵀAP=B', 'PA=B'], correct: 0 },
      { question: '相似矩阵一定相同的是？', options: ['元素', '特征值', '阶数以外都不同'], correct: 1 },
      { question: 'A 可对角化的条件是？', options: ['有 n 个线性无关特征向量', '|A|≠0', 'A 对称'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '相似的定义：P⁻¹AP = B' },
      { focus: 1, desc: '相似不变量：行列式、迹、特征值' },
      { focus: 2, desc: '可对角化条件' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['相似定义', '相似不变量', '可对角化'][f]);
      if (f === 0) {
        box(g, 120, 100, 200, 90, 'var(--primary)', 0.1);
        txt(g, 220, 152, 'A', 'var(--primary-strong)', 22, 'middle', '700');
        txt(g, 450, 150, 'P⁻¹AP', 'var(--highlight)', 15, 'middle', '700');
        txt(g, 450, 180, '=', 'var(--text)', 16, 'middle', '700');
        box(g, 580, 100, 200, 90, 'var(--success)', 0.1);
        txt(g, 680, 152, 'B', 'var(--success)', 22, 'middle', '700');
        txt(g, 450, 250, '同一个线性变换，在不同基下的矩阵', 'var(--text)', 12.5);
        txt(g, 450, 290, 'P 就是两组基之间的过渡矩阵', 'var(--text-muted)', 11.5);
      }
      if (f === 1) {
        const rows = [['特征值相同', 'var(--primary)'], ['|A| = |B|', 'var(--success)'], ['tr(A) = tr(B)', 'var(--highlight)'], ['r(A) = r(B)', 'var(--swap)']];
        rows.forEach(function (r, i) {
          const y = 65 + i * 62;
          box(g, 160, y, 580, 50, r[1], 0.08);
          txt(g, 450, y + 32, r[0], 'var(--text)', 13, 'middle', '700');
        });
        txt(g, 450, 330, '这些是「必要条件」——都相同也不一定相似', 'var(--danger)', 12, 'middle', '700');
      }
      if (f === 2) {
        box(g, 110, 75, 680, 70, 'var(--success)', 0.08);
        txt(g, 450, 112, 'A ~ Λ = diag(λ₁,…,λₙ)', 'var(--success)', 15, 'middle', '700');
        txt(g, 450, 138, 'Λ 是对角阵，对角元就是特征值', 'var(--text-muted)', 11);
        txt(g, 450, 200, '条件：A 有 n 个线性无关的特征向量', 'var(--primary-strong)', 13, 'middle', '700');
        txt(g, 450, 240, 'P 的列 = 这些特征向量', 'var(--text)', 12);
        txt(g, 450, 280, '实对称矩阵一定可对角化（且可正交对角化）', 'var(--highlight)', 12);
      }
    }
  }
];
