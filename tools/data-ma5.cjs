module.exports = [
  {
    id: 'MA-93', level: 'B', title: '随机事件与样本空间',
    intuition: '随机试验的所有可能结果组成<strong>样本空间 Ω</strong>，每个结果叫<strong>样本点 ω</strong>。样本空间的子集叫<strong>随机事件</strong>。必然事件 = Ω，不可能事件 = ∅。事件的关系：包含、相等、互斥（不能同时发生）、对立（必有一个发生）。这是概率论的语言基础。',
    derivation: [
      '\\Omega = \\{\\omega_1,\\omega_2,\\dots\\}, \\quad A\\subseteq\\Omega',
      '\\text{必然事件}: \\Omega; \\quad \\text{不可能事件}: \\varnothing',
      '\\text{互斥}: A\\cap B=\\varnothing; \\quad \\text{对立}: A\\cup B=\\Omega, A\\cap B=\\varnothing',
      '\\bar{A} = \\Omega - A'
    ],
    exam_text: '<b>【2017 真题改编】</b>掷一颗骰子，样本空间是什么？事件「点数为偶数」如何表示？',
    exam_answer: '答案：样本空间 Ω={1,2,3,4,5,6}。「点数为偶数」= {2,4,6}，是一个随机事件（Ω 的子集）。它与「点数为奇数」{1,3,5} 互为<b>对立事件</b>；与「点数小于 3」{1,2} 是<b>互斥</b>但不对立（还有 3,4,5,6 既非偶也非小于3）。',
    pitfalls: [
      '互斥 ≠ 对立：互斥只要求不能同时发生，对立还要求必有一个发生。',
      '样本空间是「所有可能结果」的集合，不能漏也不能多。',
      '事件是集合，事件运算就是集合运算（并、交、差、补）。'
    ],
    quiz: [
      { question: '样本空间的子集称为？', options: ['样本点', '随机事件', '概率'], correct: 1 },
      { question: '互斥且必有一个发生的事件称？', options: ['独立事件', '对立事件', '相等事件'], correct: 1 },
      { question: '掷骰子样本空间包含几个样本点？', options: ['2', '6', '12'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '样本空间：所有可能结果的集合' },
      { focus: 1, desc: '随机事件：样本空间的子集' },
      { focus: 2, desc: '互斥与对立的区别' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['样本空间', '随机事件', '互斥与对立'][f]);
      g.append('rect').attr('x', 200).attr('y', 70).attr('width', 500).attr('height', 230).attr('rx', 14).attr('fill', 'var(--primary)').attr('fill-opacity', 0.08).attr('stroke', 'var(--primary)').attr('stroke-width', 2);
      txt(g, 230, 100, 'Ω', 'var(--primary-strong)', 18, 'start', '700');
      if (f === 0) {
        for (let i = 0; i < 6; i++) {
          circ(g, 300 + (i % 3) * 90, 150 + Math.floor(i / 3) * 70, 22, 'var(--bg-panel)', 'var(--primary)', 2);
          txt(g, 300 + (i % 3) * 90, 156 + Math.floor(i / 3) * 70, String(i + 1), 'var(--text)', 13, 'middle', '700');
        }
        txt(g, 450, 350, '每个样本点是一个可能结果（如掷骰子的点数）', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        g.append('ellipse').attr('cx', 380).attr('cy', 175).attr('rx', 120).attr('ry', 80).attr('fill', 'var(--success)').attr('fill-opacity', 0.2).attr('stroke', 'var(--success)').attr('stroke-width', 2);
        txt(g, 380, 180, 'A = {2,4,6}', 'var(--success)', 14, 'middle', '700');
        txt(g, 450, 340, '随机事件 = Ω 的子集', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        g.append('ellipse').attr('cx', 340).attr('cy', 180).attr('rx', 100).attr('ry', 75).attr('fill', 'var(--success)').attr('fill-opacity', 0.18).attr('stroke', 'var(--success)').attr('stroke-width', 2);
        g.append('ellipse').attr('cx', 560).attr('cy', 180).attr('rx', 100).attr('ry', 75).attr('fill', 'var(--danger)').attr('fill-opacity', 0.18).attr('stroke', 'var(--danger)').attr('stroke-width', 2);
        txt(g, 300, 186, 'A 偶', 'var(--success)', 13, 'middle', '700');
        txt(g, 600, 186, 'B 奇', 'var(--danger)', 13, 'middle', '700');
        txt(g, 450, 330, 'A 与 B 互斥且并集为 Ω → 对立事件', 'var(--text-muted)', 12);
      }
    }
  },
  {
    id: 'MA-94', level: 'B', title: '事件的关系与运算',
    intuition: '事件运算与集合运算一一对应：<strong>并</strong> A∪B（至少一个发生）、<strong>交</strong> A∩B（同时发生）、<strong>差</strong> A−B（A 发生 B 不发生）、<strong>补</strong> Ā（A 不发生）。核心公式：加法公式 P(A∪B)=P(A)+P(B)−P(AB)；德摩根律 (A∪B)̄=Ā∩B̄、(A∩B)̄=Ā∪B̄（「并的补等于补的交」）。',
    derivation: [
      'P(A\\cup B)=P(A)+P(B)-P(AB)',
      'A-B = A\\bar{B}; \\quad \\overline{A\\cup B}=\\bar{A}\\cap\\bar{B}',
      '\\overline{A\\cap B}=\\bar{A}\\cup\\bar{B}',
      'A\\cup B = A + B - AB \\; (\\text{容斥})'
    ],
    exam_text: '<b>【2018 真题改编】</b>已知 P(A)=0.4，P(B)=0.5，P(AB)=0.2，求 P(A∪B) 与 P(Ā∩B̄)。',
    exam_answer: '答案：P(A∪B) = 0.4+0.5−0.2 = <b>0.7</b>。P(Ā∩B̄) = P((A∪B)̄) = 1−P(A∪B) = <b>0.3</b>（德摩根律）。也可理解为「A、B 都不发生」的概率。',
    pitfalls: [
      '加法公式要减去 P(AB)，否则重复计算交集。',
      '德摩根律方向别搞反：并的补 = 补的交，交的补 = 补的并。',
      'P(A−B) = P(A) − P(AB)，不是 P(A)−P(B)。'
    ],
    quiz: [
      { question: 'P(A∪B) 等于？', options: ['P(A)+P(B)', 'P(A)+P(B)−P(AB)', 'P(A)P(B)'], correct: 1 },
      { question: '(A∪B)̄ 等于？', options: ['Ā∪B̄', 'Ā∩B̄', 'A∩B'], correct: 1 },
      { question: 'P(A−B) 等于？', options: ['P(A)−P(B)', 'P(A)−P(AB)', 'P(AB)'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '并、交、差、补：与集合运算对应' },
      { focus: 1, desc: '加法公式：容斥原理' },
      { focus: 2, desc: '德摩根律：并的补 = 补的交' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['四种运算', '加法公式', '德摩根律'][f]);
      const cx1 = 380, cx2 = 520, cy = 180;
      g.append('circle').attr('cx', cx1).attr('cy', cy).attr('r', 90).attr('fill', 'var(--primary)').attr('fill-opacity', f === 0 ? 0.2 : 0.14).attr('stroke', 'var(--primary)').attr('stroke-width', 2);
      g.append('circle').attr('cx', cx2).attr('cy', cy).attr('r', 90).attr('fill', 'var(--success)').attr('fill-opacity', f === 0 ? 0.2 : 0.14).attr('stroke', 'var(--success)').attr('stroke-width', 2);
      txt(g, cx1 - 50, cy + 6, 'A', 'var(--primary-strong)', 15, 'middle', '700');
      txt(g, cx2 + 50, cy + 6, 'B', 'var(--success)', 15, 'middle', '700');
      if (f === 0) {
        txt(g, 250, 110, 'A∪B：至少一个发生', 'var(--text-muted)', 11, 'start');
        txt(g, 600, 110, 'A∩B：同时发生', 'var(--text-muted)', 11, 'start');
        txt(g, 450, 320, 'A−B：A 发生且 B 不发生；Ā：A 不发生', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 130, 70, 640, 70, 'var(--primary)', 0.08);
        txt(g, 450, 108, 'P(A∪B) = P(A)+P(B) − P(AB)', 'var(--primary-strong)', 15, 'middle', '700');
        txt(g, 450, 135, '多算的交集要减掉', 'var(--text-muted)', 11);
        txt(g, 450, 320, '例：0.4+0.5−0.2 = 0.7', 'var(--success)', 12.5);
      }
      if (f === 2) {
        box(g, 130, 70, 640, 70, 'var(--highlight)', 0.08);
        txt(g, 450, 105, '(A∪B)̄ = Ā ∩ B̄', 'var(--highlight)', 15, 'middle', '700');
        txt(g, 450, 132, '(A∩B)̄ = Ā ∪ B̄', 'var(--highlight)', 15, 'middle', '700');
        txt(g, 450, 320, '口诀：横线断开，符号翻转', 'var(--primary-strong)', 12.5, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-95', level: 'C', title: '概率的定义与性质',
    intuition: '概率满足三条公理（柯尔莫哥洛夫）：<strong>非负性</strong> P(A)≥0；<strong>规范性</strong> P(Ω)=1；<strong>可列可加性</strong>（互斥事件并的概率 = 概率之和）。由此推出：P(∅)=0；P(Ā)=1−P(A)；P(A)≤1；P(A−B)=P(A)−P(AB)；加法公式。',
    derivation: [
      '\\text{公理}: P(A)\\ge0; \\; P(\\Omega)=1; \\; A_i\\cap A_j=\\varnothing \\Rightarrow P(\\cup A_i)=\\sum P(A_i)',
      'P(\\varnothing)=0; \\quad P(\\bar{A})=1-P(A)',
      'P(A-B)=P(A)-P(AB)',
      'P(A\\cup B)=P(A)+P(B)-P(AB)'
    ],
    exam_text: '<b>【2016 真题改编】</b>若 P(A)=0.6，求 P(Ā)。',
    exam_answer: '答案：P(Ā) = 1 − P(A) = <b>0.4</b>。这是「对立事件」的基本公式：A 与 Ā 互斥且并为 Ω，故概率之和为 1。这是概率计算中最常用的化简手段之一（正难则反）。',
    pitfalls: [
      'P(A)=0 不代表 A 是不可能事件（连续型随机变量取单点概率为 0 但可能发生）。',
      'P(Ā)=1−P(A) 的前提是 Ā 是 A 的对立事件，不是「A 不发生」的任意事件。',
      '互斥事件的加法公式不能用于非互斥事件。'
    ],
    quiz: [
      { question: 'P(Ā) 等于？', options: ['1−P(A)', 'P(A)', '0'], correct: 0 },
      { question: 'P(A)=0.6 时 P(Ā) 等于？', options: ['0.6', '0.4', '1'], correct: 1 },
      { question: 'P(A)=0 说明？', options: ['A 一定是空集', 'A 不一定是不可能事件', 'A 一定发生'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '三条公理：非负、规范、可列可加' },
      { focus: 1, desc: '基本性质：P(Ā)=1−P(A)' },
      { focus: 2, desc: '概率为 0 不等于不可能事件' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['三条公理', '对立事件', '零概率的陷阱'][f]);
      if (f === 0) {
        const rows = [['非负性 P(A) ≥ 0', 'var(--primary)'], ['规范性 P(Ω) = 1', 'var(--success)'], ['可列可加性（互斥时）', 'var(--highlight)']];
        rows.forEach(function (r, i) {
          const y = 70 + i * 80;
          box(g, 120, y, 660, 64, r[1], 0.1);
          txt(g, 450, y + 40, r[0], 'var(--text)', 14, 'middle', '700');
        });
        txt(g, 450, 340, '三条公理是概率论的全部逻辑起点', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        g.append('circle').attr('cx', 450).attr('cy', 190).attr('r', 100).attr('fill', 'var(--success)').attr('fill-opacity', 0.2).attr('stroke', 'var(--success)').attr('stroke-width', 2);
        txt(g, 450, 196, 'A（0.6）', 'var(--success)', 15, 'middle', '700');
        txt(g, 450, 320, 'Ā 是圆外的全部：P(Ā) = 1 − 0.6 = 0.4', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 120, 80, 660, 80, 'var(--danger)', 0.08);
        txt(g, 450, 118, 'P(A) = 0 ⇏ A = ∅', 'var(--danger)', 16, 'middle', '700');
        txt(g, 450, 148, '连续型随机变量：P(X = a) = 0，但 X=a 可能发生', 'var(--text-muted)', 11);
        txt(g, 450, 210, '同理 P(A)=1 也不代表 A=Ω', 'var(--text)', 13);
        txt(g, 450, 250, '概率是「测度」，不是「可能性」的直觉', 'var(--text-muted)', 12);
      }
    }
  },
  {
    id: 'MA-96', level: 'B', title: '古典概型、几何概型',
    intuition: '<strong>古典概型</strong>：样本点有限且等可能，P(A) = A 包含的样本点数 / 总样本点数（数数）。<strong>几何概型</strong>：样本空间是区域，等可能按「面积/长度/体积」度量，P(A) = A 的测度 / Ω 的测度（算面积）。两者本质相同：等可能 → 概率 = 有利测度 / 总测度。',
    derivation: [
      '\\text{古典}: \\; P(A)=\\frac{|A|}{|\\Omega|} = \\frac{\\text{有利结果数}}{\\text{总结果数}}',
      '\\text{几何}: \\; P(A)=\\frac{m(A)}{m(\\Omega)} \\; (\\text{长度/面积/体积})',
      '\\text{排列}: A_n^m = \\frac{n!}{(n-m)!}',
      '\\text{组合}: C_n^m = \\frac{n!}{m!(n-m)!}'
    ],
    exam_text: '<b>【2018 真题改编】</b>袋中 3 红 2 白，任取 2 球，求「恰有 1 红 1 白」的概率。',
    exam_answer: '答案：总取法 C(5,2)=10；有利取法 C(3,1)·C(2,1)=6。故 P = 6/10 = <b>3/5</b>。这类「不放回取球」是古典概型标准题：先算总样本点数（组合），再算有利数，相除。',
    pitfalls: [
      '古典概型要求「等可能」，不均匀的骰子不能直接用数数法。',
      '组合还是排列要看「顺序是否重要」——取球通常用组合。',
      '几何概型的关键是「测度对应正确」：一维用长度、二维用面积。'
    ],
    quiz: [
      { question: '古典概型的概率等于？', options: ['有利数/总数', '总数/有利数', '有利数×总数'], correct: 0 },
      { question: '5 球取 2 球的组合数是？', options: ['10', '20', '5'], correct: 0 },
      { question: '几何概型用什麼度量？', options: ['个数', '长度/面积/体积', '概率'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '古典概型：有限、等可能、数数' },
      { focus: 1, desc: '排列与组合：顺序是否重要' },
      { focus: 2, desc: '几何概型：按测度计算' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['古典概型', '排列组合', '几何概型'][f]);
      if (f === 0) {
        for (let i = 0; i < 6; i++) {
          circ(g, 280 + (i % 3) * 80, 140 + Math.floor(i / 3) * 80, 26, i < 2 ? 'var(--success)' : 'var(--bg-panel)', i < 2 ? 'var(--success)' : 'var(--border)', 2);
        }
        txt(g, 620, 170, 'P = 2/6 = 1/3', 'var(--primary-strong)', 16, 'start', '700');
        txt(g, 620, 200, '有利数 ÷ 总数', 'var(--text-muted)', 11, 'start');
        txt(g, 450, 340, '前提：每个样本点等可能', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 110, 70, 320, 90, 'var(--primary)', 0.08);
        txt(g, 270, 108, '排列 A(n,m)', 'var(--primary-strong)', 14, 'middle', '700');
        txt(g, 270, 136, '顺序重要', 'var(--text-muted)', 11);
        box(g, 470, 70, 320, 90, 'var(--success)', 0.08);
        txt(g, 630, 108, '组合 C(n,m)', 'var(--success)', 14, 'middle', '700');
        txt(g, 630, 136, '顺序不重要', 'var(--text-muted)', 11);
        txt(g, 450, 210, '例：3 红 2 白取 2 球（不放回）', 'var(--text)', 12.5);
        txt(g, 450, 245, '总数 C(5,2)=10；1红1白 C(3,1)C(2,1)=6', 'var(--text-muted)', 12);
        txt(g, 450, 280, 'P = 6/10 = 3/5', 'var(--primary-strong)', 14, 'middle', '700');
      }
      if (f === 2) {
        g.append('rect').attr('x', 200).attr('y', 100).attr('width', 500).attr('height', 180).attr('rx', 10).attr('fill', 'var(--primary)').attr('fill-opacity', 0.1).attr('stroke', 'var(--primary)').attr('stroke-width', 2);
        g.append('circle').attr('cx', 450).attr('cy', 190).attr('r', 60).attr('fill', 'var(--success)').attr('fill-opacity', 0.3).attr('stroke', 'var(--success)').attr('stroke-width', 2);
        txt(g, 450, 196, 'A', 'var(--success)', 15, 'middle', '700');
        txt(g, 450, 320, 'P(A) = A 的面积 ÷ Ω 的面积', 'var(--text-muted)', 12);
      }
    }
  },
  {
    id: 'MA-99', level: 'B', title: '事件的独立性',
    intuition: 'A、B <strong>独立</strong> ⟺ <strong>P(AB) = P(A)P(B)</strong>——一个发生不影响另一个的概率。注意：独立 ≠ 互斥（互斥是 P(AB)=0，独立是 P(AB)=P(A)P(B)，只有 P(A)P(B)=0 时才可能同时成立）。若 A、B 独立，则 A 与 B̄、Ā 与 B、Ā 与 B̄ 都独立。n 个事件两两独立 ≠ 相互独立（还需满足多项乘积条件）。',
    derivation: [
      'A,B \\text{ 独立} \\Leftrightarrow P(AB)=P(A)P(B)',
      '\\text{独立} \\Rightarrow A \\text{ 与 } \\bar{B},\\; \\bar{A} \\text{ 与 } \\bar{B} \\text{ 均独立}',
      '\\text{互斥}: P(AB)=0; \\; \\text{独立}: P(AB)=P(A)P(B)',
      '\\text{相互独立} \\Rightarrow \\text{两两独立（反之不成立）}'
    ],
    exam_text: '<b>【2019 真题改编】</b>已知 P(A)=0.4，P(B)=0.5，A、B 独立，求 P(A∪B)。',
    exam_answer: '答案：独立 ⟹ P(AB) = 0.4×0.5 = 0.2。故 P(A∪B) = 0.4+0.5−0.2 = <b>0.7</b>。验证另一种算法：P(A∪B) = 1−P(Ā)P(B̄) = 1−0.6×0.5 = 0.7 ✓（独立时「都不发生」概率可乘）。',
    pitfalls: [
      '独立 ≠ 互斥：互斥事件一般不独立（P(AB)=0 而 P(A)P(B)≠0）。',
      '「两两独立」推不出「相互独立」，需要额外的三三、四四乘积条件。',
      '判断独立要验证 P(AB)=P(A)P(B)，不能靠直觉。'
    ],
    quiz: [
      { question: 'A、B 独立的定义是？', options: ['P(AB)=0', 'P(AB)=P(A)P(B)', 'P(A∪B)=1'], correct: 1 },
      { question: '独立与互斥的关系是？', options: ['等价', '不同概念', '独立必互斥'], correct: 1 },
      { question: '两两独立能否推出相互独立？', options: ['能', '不能', '仅三个事件时能'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '独立的定义：P(AB)=P(A)P(B)' },
      { focus: 1, desc: '独立 vs 互斥：两个不同概念' },
      { focus: 2, desc: '独立事件的运算性质' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['独立定义', '独立 vs 互斥', '运算性质'][f]);
      if (f === 0) {
        box(g, 130, 80, 640, 70, 'var(--primary)', 0.08);
        txt(g, 450, 118, 'P(AB) = P(A)·P(B)', 'var(--primary-strong)', 18, 'middle', '700');
        txt(g, 450, 145, '一个发生不影响另一个的概率', 'var(--text-muted)', 11.5);
        txt(g, 450, 215, '例：0.4×0.5 = 0.2，故 P(A∪B)=0.7', 'var(--success)', 12.5);
      }
      if (f === 1) {
        box(g, 70, 70, 360, 230, 'var(--danger)', 0.08);
        txt(g, 250, 105, '互斥', 'var(--danger)', 16, 'middle', '700');
        txt(g, 250, 145, 'P(AB) = 0', 'var(--text)', 13);
        txt(g, 250, 180, '不能同时发生', 'var(--text-muted)', 11.5);
        txt(g, 250, 215, '若 P(A)P(B)≠0 则不独立', 'var(--text-muted)', 11);
        box(g, 470, 70, 360, 230, 'var(--success)', 0.08);
        txt(g, 650, 105, '独立', 'var(--success)', 16, 'middle', '700');
        txt(g, 650, 145, 'P(AB) = P(A)P(B)', 'var(--text)', 13);
        txt(g, 650, 180, '可以同时发生', 'var(--text-muted)', 11.5);
        txt(g, 650, 215, '一个不影响另一个', 'var(--text-muted)', 11);
      }
      if (f === 2) {
        const rows = [['A、B 独立 ⟹ A 与 B̄ 独立', 'var(--primary)'], ['Ā 与 B̄ 也独立', 'var(--success)'], ['P(A∪B) = 1 − P(Ā)P(B̄)', 'var(--highlight)'], ['相互独立 ⟹ 两两独立', 'var(--swap)']];
        rows.forEach(function (r, i) {
          const y = 65 + i * 62;
          box(g, 120, y, 660, 50, r[1], 0.08);
          txt(g, 450, y + 32, r[0], 'var(--text)', 12.5, 'middle', '700');
        });
      }
    }
  },
  {
    id: 'MA-102', level: 'B', title: '连续型随机变量及其概率密度',
    intuition: '连续型随机变量用<strong>概率密度函数 f(x)</strong> 描述：P(a<X<b) = ∫ₐᵇ f(x)dx（面积），而不是 f(x) 本身。性质：f(x)≥0；∫₋∞^∞ f(x)dx=1；<strong>P(X=a)=0</strong>（单点概率为 0）；P(a<X<b) = P(a≤X≤b)。分布函数 F(x) = ∫₋∞ˣ f(t)dt，且 F′(x)=f(x)（连续点处）。',
    derivation: [
      'P(a<X<b) = \\int_a^b f(x)dx \\ge 0, \\quad \\int_{-\\infty}^{+\\infty}f(x)dx=1',
      'F(x) = \\int_{-\\infty}^{x}f(t)dt, \\quad F\'(x)=f(x)',
      'P(X=a)=0 \\Rightarrow P(a<X<b)=P(a\\le X\\le b)',
      'f(x) \\text{ 可以大于 } 1 \\; (\\text{密度不是概率})'
    ],
    exam_text: '<b>【2018 真题改编】</b>设 X 的密度 f(x)=2x（0<x<1），求 P(0.2<X<0.5)。',
    exam_answer: '答案：P = ∫₀.₂⁰.⁵ 2x dx = x²|₀.₂⁰.⁵ = 0.25−0.04 = <b>0.21</b>。注意：这里求的是面积，不能代入 f(0.2) 或 f(0.5)。密度函数的值本身不是概率，只有当它被积分后才是。',
    pitfalls: [
      'f(x) 是密度不是概率，f(x) 可以大于 1（如均匀分布 U(0,0.5) 的密度为 2）。',
      'P(X=a)=0，所以「开区间」与「闭区间」的概率相同。',
      '求概率要积分，不能直接代入密度值。'
    ],
    quiz: [
      { question: '连续型随机变量 P(X=a) 等于？', options: ['f(a)', '0', '1'], correct: 1 },
      { question: '密度函数 f(x) 必须满足？', options: ['f(x)≤1', '∫f=1', 'f(x) 单调'], correct: 1 },
      { question: 'P(a<X<b) 等于？', options: ['f(b)−f(a)', '∫ₐᵇ f(x)dx', 'f(a)+f(b)'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '概率密度：面积才是概率' },
      { focus: 1, desc: '性质：非负、积分为 1、单点概率为 0' },
      { focus: 2, desc: '分布函数 F 与密度 f 的关系' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['密度与面积', '基本性质', 'F 与 f 的关系'][f]);
      const x0 = 100, y0 = 300, w = 680, h = 200;
      ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
      ln(g, x0, y0, x0, y0 - h, 'var(--border)', 1.4);
      const pdf = function (t) { return 0.9 * Math.exp(-6 * (t - 0.5) * (t - 0.5)); };
      if (f === 0) {
        for (let i = 0; i < 30; i++) {
          const t1 = 0.3 + i * 0.014, t2 = t1 + 0.014;
          g.append('rect').attr('x', x0 + w * t1).attr('y', y0 - h * pdf(t1)).attr('width', w * 0.014).attr('height', h * pdf(t1)).attr('fill', 'var(--primary)').attr('fill-opacity', 0.3);
        }
        plot(g, pdf, x0, y0, w, h, 'var(--success)', 2.4);
        txt(g, 450, 345, 'P(0.3<X<0.7) = 阴影面积（不是高度）', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 120, 70, 660, 70, 'var(--success)', 0.08);
        txt(g, 450, 106, 'f(x) ≥ 0，∫₋∞^∞ f(x)dx = 1', 'var(--success)', 14, 'middle', '700');
        box(g, 120, 160, 660, 70, 'var(--danger)', 0.08);
        txt(g, 450, 196, 'P(X = a) = 0', 'var(--danger)', 14, 'middle', '700');
        txt(g, 450, 260, '故 P(a<X<b) = P(a≤X≤b)', 'var(--text)', 12.5);
        txt(g, 450, 300, '密度值可以大于 1（如 U(0,0.5) 密度为 2）', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 120, 80, 660, 70, 'var(--primary)', 0.08);
        txt(g, 450, 118, 'F(x) = ∫₋∞ˣ f(t)dt', 'var(--primary-strong)', 15, 'middle', '700');
        txt(g, 450, 200, 'F′(x) = f(x)（连续点处）', 'var(--success)', 14, 'middle', '700');
        txt(g, 450, 240, 'F 单调不减、右连续、F(−∞)=0、F(+∞)=1', 'var(--text)', 12);
        txt(g, 450, 285, 'P(a<X<b) = F(b) − F(a)', 'var(--highlight)', 13, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-108', level: 'B', title: '随机变量的独立性',
    intuition: '两个随机变量 X、Y <strong>独立</strong> ⟺ 联合分布 = 边缘分布的乘积：连续型 <strong>f(x,y)=f_X(x)f_Y(y)</strong>；离散型 P(X=xᵢ,Y=yⱼ)=P(X=xᵢ)P(Y=yⱼ)。等价判定：F(x,y)=F_X(x)F_Y(y)。独立的直观含义：知道 X 的取值不改变 Y 的分布。注意：不相关（相关系数为 0）≠ 独立（独立更强）。',
    derivation: [
      'f(x,y)=f_X(x)f_Y(y) \\; (\\text{连续型独立})',
      'P(X=x_i,Y=y_j)=P(X=x_i)P(Y=y_j) \\; (\\text{离散型})',
      'F(x,y)=F_X(x)F_Y(y)',
      '\\text{独立} \\Rightarrow \\text{不相关}; \\; \\text{反之不成立}'
    ],
    exam_text: '<b>【2019 真题改编】</b>若 f(x,y)=4xy（0<x<1, 0<y<1），X 与 Y 是否独立？',
    exam_answer: '答案：f_X(x)=∫₀¹4xy dy = 2x，f_Y(y)=∫₀¹4xy dx = 2y。f_X(x)f_Y(y) = 4xy = f(x,y)，故 <b>X 与 Y 独立</b>。判定方法：把联合密度分解成「只含 x 的函数 × 只含 y 的函数」，且定义域是矩形。',
    pitfalls: [
      '独立要求联合密度能完全分解，且定义域为矩形（变量范围不互相牵制）。',
      '不相关只是「线性无关」，不能推出独立；独立一定不相关（当方差存在）。',
      '边缘分布相同不代表联合分布相同——独立性是联合层面的性质。'
    ],
    quiz: [
      { question: '连续型 X、Y 独立的充要条件是？', options: ['f(x,y)=f_X(x)f_Y(y)', 'f_X=f_Y', 'E(XY)=E(X)E(Y)'], correct: 0 },
      { question: '独立与不相关的关系是？', options: ['等价', '独立更强', '不相关更强'], correct: 1 },
      { question: 'f(x,y)=4xy (0<x,y<1) 时 X、Y？', options: ['独立', '不独立', '无法判断'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '独立的定义：联合 = 边缘之积' },
      { focus: 1, desc: '连续型的判定：分解密度' },
      { focus: 2, desc: '独立与不相关的区别' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['独立定义', '密度分解', '独立 vs 不相关'][f]);
      if (f === 0) {
        box(g, 110, 80, 680, 80, 'var(--primary)', 0.08);
        txt(g, 450, 118, 'f(x,y) = f_X(x) · f_Y(y)', 'var(--primary-strong)', 17, 'middle', '700');
        txt(g, 450, 148, '联合密度 = 两个边缘密度的乘积', 'var(--text-muted)', 11.5);
        txt(g, 450, 215, '直观：X 的取值不影响 Y 的分布', 'var(--text)', 13);
      }
      if (f === 1) {
        box(g, 100, 65, 700, 60, 'var(--success)', 0.08);
        txt(g, 450, 102, 'f(x,y) = 4xy = (2x)·(2y) = f_X·f_Y', 'var(--success)', 14, 'middle', '700');
        box(g, 100, 145, 340, 100, 'var(--primary)', 0.08);
        txt(g, 270, 180, 'f_X(x) = 2x', 'var(--primary-strong)', 14, 'middle', '700');
        txt(g, 270, 210, '对 y 积分', 'var(--text-muted)', 11);
        box(g, 460, 145, 340, 100, 'var(--highlight)', 0.08);
        txt(g, 630, 180, 'f_Y(y) = 2y', 'var(--highlight)', 14, 'middle', '700');
        txt(g, 630, 210, '对 x 积分', 'var(--text-muted)', 11);
        txt(g, 450, 290, '定义域是矩形（0<x<1, 0<y<1）也是独立的条件', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 90, 75, 720, 70, 'var(--danger)', 0.08);
        txt(g, 450, 112, '独立 ⟹ 不相关；不相关 ⇏ 独立', 'var(--danger)', 15, 'middle', '700');
        txt(g, 450, 140, '不相关只表示「无线性关系」', 'var(--text-muted)', 11);
        txt(g, 450, 205, '例：X~U(−1,1)，Y=X²：不相关（E(XY)=0）', 'var(--text)', 12);
        txt(g, 450, 240, '但 Y 完全由 X 决定 → 不独立', 'var(--text)', 12);
        txt(g, 450, 285, '反例提醒：不相关 ≠ 没有关系', 'var(--primary-strong)', 12, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-110', level: 'B', title: '数学期望',
    intuition: '数学期望是随机变量的「加权平均」：离散型 E(X)=Σxᵢpᵢ；连续型 E(X)=∫xf(x)dx。性质：<strong>线性性</strong> E(aX+bY)=aE(X)+bE(Y)（无需独立）；若独立，E(XY)=E(X)E(Y)。常见分布：E(二项)=np，E(泊松)=λ，E(均匀)=(a+b)/2，E(指数)=1/λ，E(正态)=μ。',
    derivation: [
      'E(X)=\\sum x_ip_i \\; (\\text{离散}); \\quad E(X)=\\int_{-\\infty}^{\\infty}xf(x)dx',
      'E(aX+bY)=aE(X)+bE(Y) \\; (\\text{线性性，无需独立})',
      'X,Y \\text{ 独立} \\Rightarrow E(XY)=E(X)E(Y)',
      'E(X^2) \\neq (E(X))^2 \\; (\\text{方差来源})'
    ],
    exam_text: '<b>【2017 真题改编】</b>X~B(10, 0.3)，求 E(X) 与 E(2X+1)。',
    exam_answer: '答案：二项分布 E(X)=np=10×0.3=<b>3</b>；由线性性 E(2X+1)=2E(X)+1=<b>7</b>。注意 E(X²) ≠ (E(X))²——E(X²) 需另算（如二项分布 E(X²)=np(1−p)+n²p²）。',
    pitfalls: [
      'E(XY)=E(X)E(Y) 只在独立时成立，线性性则永远成立。',
      'E(X²) ≠ [E(X)]²，两者之差正是方差。',
      'E(1/X) ≠ 1/E(X)——期望对非线性函数不保持。'
    ],
    quiz: [
      { question: 'E(aX+b) 等于？', options: ['aE(X)+b', 'aE(X)', 'E(X)+b'], correct: 0 },
      { question: 'X~B(10,0.3)，E(X) 等于？', options: ['3', '0.3', '10'], correct: 0 },
      { question: 'E(XY)=E(X)E(Y) 成立的条件是？', options: ['总成立', 'X、Y 独立', 'X、Y 不相关'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '期望：加权平均（离散求和/连续积分）' },
      { focus: 1, desc: '线性性：无需独立' },
      { focus: 2, desc: '独立时的乘法性质与常见分布' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['加权平均', '线性性', '常见分布期望'][f]);
      if (f === 0) {
        const bars = [[0.1, 1], [0.2, 2], [0.4, 3], [0.2, 4], [0.1, 5]];
        bars.forEach(function (b, i) {
          const x = 240 + i * 90, hh = b[0] * 400;
          g.append('rect').attr('x', x).attr('y', 300 - hh).attr('width', 70).attr('height', hh).attr('fill', 'var(--primary)').attr('fill-opacity', 0.3).attr('stroke', 'var(--primary)').attr('stroke-width', 1.6);
          txt(g, x + 35, 322, String(b[1]), 'var(--text-muted)', 12);
          txt(g, x + 35, 300 - hh - 8, b[0].toFixed(1), 'var(--text-muted)', 10.5);
        });
        ln(g, 240, 300, 700, 300, 'var(--border)', 1.4);
        txt(g, 450, 355, 'E(X) = Σ xᵢpᵢ = 1×0.1+2×0.2+3×0.4+4×0.2+5×0.1 = 3', 'var(--primary-strong)', 12);
      }
      if (f === 1) {
        box(g, 120, 80, 660, 80, 'var(--success)', 0.08);
        txt(g, 450, 120, 'E(aX + bY) = aE(X) + bE(Y)', 'var(--success)', 16, 'middle', '700');
        txt(g, 450, 150, '永远成立，不需要独立性', 'var(--text-muted)', 11.5);
        txt(g, 450, 220, '例：E(2X+1) = 2E(X)+1', 'var(--text)', 13);
        txt(g, 450, 255, '这条性质让期望计算极其方便', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        const rows = [['二项 B(n,p)', 'np', 'var(--primary)'], ['泊松 P(λ)', 'λ', 'var(--success)'], ['均匀 U(a,b)', '(a+b)/2', 'var(--highlight)'], ['指数 E(λ)', '1/λ', 'var(--swap)'], ['正态 N(μ,σ²)', 'μ', 'var(--danger)']];
        rows.forEach(function (r, i) {
          const y = 55 + i * 58;
          box(g, 120, y, 660, 46, r[2], 0.08);
          txt(g, 150, y + 30, r[0], 'var(--text)', 12.5, 'start', '700');
          txt(g, 700, y + 30, r[1], r[2], 13, 'end', '700');
        });
      }
    }
  },
  {
    id: 'MA-111', level: 'B', title: '方差',
    intuition: '方差衡量随机变量偏离期望的程度：<strong>D(X)=E[(X−E(X))²]=E(X²)−[E(X)]²</strong>（后者是计算公式）。性质：D(aX+b)=a²D(X)（常数不影响离散程度）；独立时 D(X±Y)=D(X)+D(Y)。常见分布：D(二项)=np(1−p)，D(泊松)=λ，D(均匀)=(b−a)²/12，D(指数)=1/λ²，D(正态)=σ²。',
    derivation: [
      'D(X)=E(X^2)-[E(X)]^2',
      'D(aX+b)=a^2D(X)',
      'X,Y \\text{ 独立}: D(X\\pm Y)=D(X)+D(Y)',
      '\\sigma(X)=\\sqrt{D(X)} \\; (\\text{标准差})'
    ],
    exam_text: '<b>【2018 真题改编】</b>X~B(10, 0.3)，求 D(X) 与 D(2X+1)。',
    exam_answer: '答案：二项分布 D(X)=np(1−p)=10×0.3×0.7=<b>2.1</b>。D(2X+1)=2²D(X)=4×2.1=<b>8.4</b>（常数 b 不改变方差，系数平方）。注意 D(2X+1) ≠ 2D(X)+1。',
    pitfalls: [
      'D(aX+b)=a²D(X)，b 对方差无影响（平移不改变离散程度）。',
      'D(X−Y)=D(X)+D(Y)（独立时），是加不是减。',
      'D(X) 与 [E(X)]² 是不同量，别在公式 E(X²)=D(X)+[E(X)]² 中混淆。'
    ],
    quiz: [
      { question: 'D(X) 等于？', options: ['E(X²)−[E(X)]²', 'E(X²)', '[E(X)]²'], correct: 0 },
      { question: 'D(2X+1) 等于？', options: ['2D(X)+1', '4D(X)', '2D(X)'], correct: 1 },
      { question: 'X、Y 独立时 D(X−Y) 等于？', options: ['D(X)−D(Y)', 'D(X)+D(Y)', '0'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '方差：偏离期望的平方的平均' },
      { focus: 1, desc: '计算公式：E(X²)−[E(X)]²' },
      { focus: 2, desc: '性质：系数平方、独立可加' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['方差的含义', '计算公式', '性质'][f]);
      if (f === 0) {
        const x0 = 110, y0 = 300, w = 660, h = 190;
        ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
        plot(g, function (t) { return 0.9 * Math.exp(-8 * (t - 0.5) * (t - 0.5)); }, x0, y0, w, h, 'var(--primary)', 2.2);
        plot(g, function (t) { return 0.55 * Math.exp(-22 * (t - 0.5) * (t - 0.5)); }, x0, y0, w, h, 'var(--success)', 2.2);
        ln(g, x0 + w * 0.5, y0, x0 + w * 0.5, y0 - h, 'var(--highlight)', 1.4, '5,4');
        txt(g, x0 + w * 0.5 + 10, y0 - h + 14, 'μ', 'var(--highlight)', 12, 'start', '700');
        txt(g, 620, 100, '窄：方差小', 'var(--success)', 11.5, 'start');
        txt(g, 620, 124, '宽：方差大', 'var(--primary)', 11.5, 'start');
        txt(g, 450, 350, '方差描述「分布的分散程度」', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        box(g, 120, 80, 660, 80, 'var(--primary)', 0.08);
        txt(g, 450, 118, 'D(X) = E(X²) − [E(X)]²', 'var(--primary-strong)', 18, 'middle', '700');
        txt(g, 450, 148, '先算 E(X²)，再减去期望的平方', 'var(--text-muted)', 11.5);
        txt(g, 450, 215, '等价定义：D(X) = E[(X−E(X))²]', 'var(--text)', 12.5);
        txt(g, 450, 255, '例：二项 B(10,0.3)：D = 10×0.3×0.7 = 2.1', 'var(--success)', 12.5);
      }
      if (f === 2) {
        const rows = [['D(aX+b) = a²D(X)', '平移不变、系数平方', 'var(--primary)'], ['D(X±Y) = D(X)+D(Y)', '独立时可加（都是加）', 'var(--success)'], ['D(X−Y) = D(X)+D(Y)', '不是相减！', 'var(--danger)']];
        rows.forEach(function (r, i) {
          const y = 70 + i * 78;
          box(g, 110, y, 680, 62, r[2], 0.08);
          txt(g, 140, y + 26, r[0], 'var(--text)', 12.5, 'start', '700');
          txt(g, 140, y + 48, r[1], 'var(--text-muted)', 10.5, 'start');
        });
        txt(g, 450, 320, '独立时方差「永远相加」，无论加减', 'var(--primary-strong)', 12, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-112', level: 'B', title: '协方差与相关系数',
    intuition: '协方差衡量两个变量的「协同变化」：<strong>Cov(X,Y)=E(XY)−E(X)E(Y)</strong>。相关系数 <strong>ρ = Cov(X,Y)/(σ_Xσ_Y)</strong>，取值 [−1,1]：|ρ|=1 表示完全线性相关，ρ=0 表示不相关。性质：Cov(X,X)=D(X)；D(X±Y)=D(X)+D(Y)±2Cov(X,Y)；独立 ⟹ Cov=0（反之不成立）。',
    derivation: [
      '\\text{Cov}(X,Y)=E(XY)-E(X)E(Y)',
      '\\rho_{XY}=\\frac{\\text{Cov}(X,Y)}{\\sqrt{D(X)D(Y)}} \\in[-1,1]',
      'D(X\\pm Y)=D(X)+D(Y)\\pm2\\text{Cov}(X,Y)',
      '\\text{独立} \\Rightarrow \\rho=0 \\; (\\text{反之不成立})'
    ],
    exam_text: '<b>【2019 真题改编】</b>已知 D(X)=4，D(Y)=9，ρ=0.5，求 Cov(X,Y) 与 D(X+Y)。',
    exam_answer: '答案：Cov = ρ·σ_X·σ_Y = 0.5×2×3 = <b>3</b>。D(X+Y) = D(X)+D(Y)+2Cov = 4+9+6 = <b>19</b>。若 ρ=0（不相关），则 D(X+Y)=13。注意 ρ 无量纲，Cov 有量纲。',
    pitfalls: [
      'Cov 与 ρ 都只反映「线性」关系，ρ=0 不代表独立。',
      'D(X+Y)=D(X)+D(Y)+2Cov，是加号；D(X−Y) 才是减。',
      'ρ 的取值范围是 [−1,1]，超出说明算错。'
    ],
    quiz: [
      { question: 'Cov(X,Y) 等于？', options: ['E(XY)−E(X)E(Y)', 'E(XY)', 'E(X)E(Y)'], correct: 0 },
      { question: 'ρ 的取值范围是？', options: ['[0,1]', '[−1,1]', '全体实数'], correct: 1 },
      { question: '独立时 Cov 等于？', options: ['1', '0', '不确定'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '协方差：协同变化的度量' },
      { focus: 1, desc: '相关系数：标准化的协方差' },
      { focus: 2, desc: '方差的和差公式' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['协方差', '相关系数', '方差和差公式'][f]);
      if (f === 0) {
        box(g, 120, 80, 660, 80, 'var(--primary)', 0.08);
        txt(g, 450, 118, 'Cov(X,Y) = E(XY) − E(X)E(Y)', 'var(--primary-strong)', 16, 'middle', '700');
        txt(g, 450, 148, '正值：同向变化；负值：反向变化', 'var(--text-muted)', 11.5);
        txt(g, 450, 215, 'Cov(X,X) = D(X)', 'var(--success)', 13, 'middle', '700');
      }
      if (f === 1) {
        box(g, 120, 75, 660, 80, 'var(--success)', 0.08);
        txt(g, 450, 115, 'ρ = Cov(X,Y) / (σ_X σ_Y)', 'var(--success)', 16, 'middle', '700');
        ln(g, 200, 220, 700, 220, 'var(--border)', 1.6);
        [-1, 0, 1].forEach(function (v) {
          const px = 200 + (v + 1) / 2 * 500;
          circ(g, px, 220, 5, 'var(--highlight)');
          txt(g, px, 246, String(v), 'var(--text-muted)', 11);
        });
        txt(g, 250, 200, '完全负相关', 'var(--danger)', 10.5);
        txt(g, 450, 200, '不相关', 'var(--text-muted)', 10.5);
        txt(g, 650, 200, '完全正相关', 'var(--success)', 10.5);
        txt(g, 450, 300, '|ρ|=1 ⟺ 存在线性关系 Y=aX+b', 'var(--text)', 12.5);
      }
      if (f === 2) {
        box(g, 110, 70, 680, 70, 'var(--primary)', 0.08);
        txt(g, 450, 108, 'D(X+Y) = D(X)+D(Y)+2Cov(X,Y)', 'var(--primary-strong)', 14, 'middle', '700');
        box(g, 110, 165, 680, 70, 'var(--highlight)', 0.08);
        txt(g, 450, 203, 'D(X−Y) = D(X)+D(Y)−2Cov(X,Y)', 'var(--highlight)', 14, 'middle', '700');
        txt(g, 450, 280, '独立时 Cov=0，两式都退化为相加', 'var(--text-muted)', 12);
        txt(g, 450, 315, '例：4+9+2×3 = 19', 'var(--success)', 12.5, 'middle', '700');
      }
    }
  },
  {
    id: 'MA-113', level: 'B', title: '矩、协方差矩阵',
    intuition: '<strong>k 阶原点矩</strong>：E(Xᵏ)；<strong>k 阶中心矩</strong>：E[(X−E(X))ᵏ]。一阶原点矩是期望，二阶中心矩是方差。<strong>协方差矩阵</strong> Σ 的元素 Σᵢⱼ=Cov(Xᵢ,Xⱼ)，对角元是方差，非对角元是协方差。协方差矩阵对称、半正定。独立时协方差矩阵是对角阵。',
    derivation: [
      '\\text{k 阶原点矩}: \\mu_k=E(X^k); \\quad \\text{k 阶中心矩}: \\nu_k=E[(X-E(X))^k]',
      '\\nu_1=0, \\; \\nu_2=D(X), \\; \\mu_1=E(X)',
      '\\Sigma = (\\text{Cov}(X_i,X_j))_{n\\times n}',
      '\\Sigma \\text{ 对称、半正定；独立时 } \\Sigma \\text{ 为对角阵}'
    ],
    exam_text: '<b>【2018 真题改编】</b>二维随机变量 (X,Y) 的协方差矩阵是什么形式？',
    exam_answer: '答案：Σ = [[D(X), Cov(X,Y)], [Cov(X,Y), D(Y)]]——对角元是各自方差，非对角元是协方差。<b>对称</b>（Cov(X,Y)=Cov(Y,X)）。若 X、Y 独立，Cov=0，Σ 变成对角阵 diag(D(X),D(Y))。',
    pitfalls: [
      '协方差矩阵对角元是方差（不是标准差）。',
      '协方差矩阵一定对称，非对角元成对相等。',
      '「独立」⟹ 协方差矩阵为对角阵；反之不成立（不相关不等于独立，正态分布除外）。'
    ],
    quiz: [
      { question: '二阶中心矩是？', options: ['期望', '方差', '协方差'], correct: 1 },
      { question: '协方差矩阵的对角元是？', options: ['协方差', '方差', '相关系数'], correct: 1 },
      { question: '独立时协方差矩阵是？', options: ['对角阵', '单位阵', '零矩阵'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '原点矩与中心矩' },
      { focus: 1, desc: '协方差矩阵的结构' },
      { focus: 2, desc: '协方差矩阵的性质' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['两类矩', '协方差矩阵', '矩阵性质'][f]);
      if (f === 0) {
        box(g, 90, 70, 340, 220, 'var(--primary)', 0.08);
        txt(g, 260, 105, '原点矩', 'var(--primary-strong)', 15, 'middle', '700');
        txt(g, 260, 145, 'μ₁ = E(X)', 'var(--text)', 12.5);
        txt(g, 260, 175, 'μ₂ = E(X²)', 'var(--text)', 12.5);
        txt(g, 260, 215, '以原点为中心', 'var(--text-muted)', 11);
        box(g, 470, 70, 340, 220, 'var(--success)', 0.08);
        txt(g, 640, 105, '中心矩', 'var(--success)', 15, 'middle', '700');
        txt(g, 640, 145, 'ν₁ = 0', 'var(--text)', 12.5);
        txt(g, 640, 175, 'ν₂ = D(X)', 'var(--text)', 12.5);
        txt(g, 640, 215, '以期望为中心', 'var(--text-muted)', 11);
        txt(g, 450, 330, '方差是二阶中心矩，期望是一阶原点矩', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        const m = [['D(X)', 'Cov(X,Y)'], ['Cov(X,Y)', 'D(Y)']];
        m.forEach(function (row, i) {
          row.forEach(function (s, j) {
            const x = 330 + j * 150, y = 110 + i * 80;
            box(g, x, y, 136, 66, i === j ? 'var(--primary)' : 'var(--highlight)', 0.12);
            txt(g, x + 68, y + 40, s, i === j ? 'var(--primary-strong)' : 'var(--highlight)', 13);
          });
        });
        txt(g, 450, 320, '对角元：方差；非对角元：协方差', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        const rows = [['对称：Σᵀ = Σ', 'var(--primary)'], ['半正定：任意向量 vᵀΣv ≥ 0', 'var(--success)'], ['独立 ⟹ Σ 为对角阵', 'var(--highlight)'], ['对角阵 ⟹ 不相关（不一定独立）', 'var(--swap)']];
        rows.forEach(function (r, i) {
          const y = 60 + i * 66;
          box(g, 110, y, 680, 54, r[1], 0.08);
          txt(g, 450, y + 34, r[0], 'var(--text)', 12.5, 'middle', '700');
        });
      }
    }
  },
  {
    id: 'MA-114', level: 'B', title: '切比雪夫不等式',
    intuition: '切比雪夫不等式：对任意 ε>0，<strong>P(|X−E(X)| ≥ ε) ≤ D(X)/ε²</strong>。它用期望和方差「粗略估计」偏离概率，不需要知道分布的具体形式——这是它的价值。等价形式：P(|X−μ|<ε) ≥ 1 − σ²/ε²。它是大数定律证明的基础。',
    derivation: [
      'P(|X-E(X)|\\ge\\varepsilon)\\le\\frac{D(X)}{\\varepsilon^{2}}',
      'P(|X-E(X)|<\\varepsilon)\\ge1-\\frac{D(X)}{\\varepsilon^{2}}',
      '\\text{不需要知道分布，只需 } E(X), D(X)',
      '\\text{取 } \\varepsilon=k\\sigma: P(|X-\\mu|\\ge k\\sigma)\\le\\frac{1}{k^{2}}'
    ],
    exam_text: '<b>【2017 真题改编】</b>X 的 E(X)=10，D(X)=4，用切比雪夫不等式估计 P(|X−10|<3)。',
    exam_answer: '答案：P(|X−10|<3) ≥ 1 − 4/3² = 1 − 4/9 = <b>5/9 ≈ 0.556</b>。这是「下界」——真实概率可能更大。切比雪夫给的是保守估计，优点是完全不依赖分布形态。',
    pitfalls: [
      '不等式给的是「界」，不是精确值——答案应写成「≥」或「≤」。',
      'ε 必须大于 0，且分母是 ε² 不是 ε。',
      '要求方差存在；方差不存在时不等式不适用。'
    ],
    quiz: [
      { question: 'P(|X−E(X)|≥ε) ≤ ?', options: ['D(X)/ε', 'D(X)/ε²', 'ε²/D(X)'], correct: 1 },
      { question: '切比雪夫不等式需要知道？', options: ['分布函数', '期望和方差', '密度函数'], correct: 1 },
      { question: 'E(X)=10,D(X)=4,ε=3 时上界是？', options: ['4/9', '4/3', '3/4'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '不等式形式：偏离概率被方差控制' },
      { focus: 1, desc: '等价形式与 kσ 估计' },
      { focus: 2, desc: '特点：不依赖分布形态' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['不等式', 'kσ 形式', '不依赖分布'][f]);
      if (f === 0) {
        const x0 = 110, y0 = 300, w = 660, h = 190;
        ln(g, x0, y0, x0 + w, y0, 'var(--border)', 1.4);
        plot(g, function (t) { return 0.9 * Math.exp(-10 * (t - 0.5) * (t - 0.5)); }, x0, y0, w, h, 'var(--primary)', 2.2);
        ln(g, x0 + w * 0.5, y0, x0 + w * 0.5, y0 - h, 'var(--highlight)', 1.4, '5,4');
        g.append('rect').attr('x', x0 + w * 0.2).attr('y', y0 - h).attr('width', w * 0.6).attr('height', h).attr('fill', 'var(--success)').attr('fill-opacity', 0.08);
        txt(g, x0 + w * 0.5, y0 - h - 10, '|X−μ| < ε 的区域', 'var(--success)', 11.5, 'middle', '700');
        txt(g, 450, 350, 'P(偏离 ≥ ε) ≤ D(X)/ε²', 'var(--primary-strong)', 12.5, 'middle', '700');
      }
      if (f === 1) {
        box(g, 120, 80, 660, 80, 'var(--success)', 0.08);
        txt(g, 450, 118, 'P(|X−μ| ≥ kσ) ≤ 1/k²', 'var(--success)', 16, 'middle', '700');
        const rows = [['k=2', '≤ 1/4 = 0.25'], ['k=3', '≤ 1/9 ≈ 0.111'], ['k=4', '≤ 1/16 = 0.0625']];
        rows.forEach(function (r, i) {
          txt(g, 260, 200 + i * 36, r[0], 'var(--text)', 12, 'start', '700');
          txt(g, 400, 200 + i * 36, r[1], 'var(--text-muted)', 12, 'start');
        });
        txt(g, 450, 330, 'k 越大，偏离概率上界越小', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 120, 80, 660, 70, 'var(--highlight)', 0.08);
        txt(g, 450, 118, '只需要 E(X) 和 D(X)', 'var(--highlight)', 15, 'middle', '700');
        txt(g, 450, 190, '不需要知道分布是正态、均匀还是别的', 'var(--text)', 12.5);
        txt(g, 450, 230, '代价：估计很「粗」，通常远宽于真实概率', 'var(--text-muted)', 12);
        txt(g, 450, 275, '用途：大数定律的证明、理论上界', 'var(--primary-strong)', 12.5, 'middle', '700');
      }
    }
  }
];
