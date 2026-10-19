/**
 * 升级批次 3：补上 4 个「无播放按钮 / 纯静态」的数学课件
 * MA-37 偏导数 / MA-56 正项级数审敛法 / MA-59 收敛半径 / MA-61 泰勒展开
 */
const R = require('./recovered.json');
const items = [];

/* ==================== MA-37 偏导数 ==================== */
items.push({
  id: 'MA-37',
  steps: [
    { focus: 0, desc: '二元函数 z=f(x,y) 是一张曲面 —— 平面上有无数个方向，怎么定义「导数」？' },
    { focus: 1, desc: '先只沿 x 方向动：用平面 y=y₀ 把曲面切一刀，得到一条截线' },
    { focus: 2, desc: '问题降为一元：在这条截线上，z 只随 x 变化' },
    { focus: 3, desc: '截线在 x₀ 处的切线斜率，就是对 x 的偏导数 ∂f/∂x（把 y 视为常数）' },
    { focus: 4, desc: '换方向：用平面 x=x₀ 再切一刀，得到 ∂f/∂y（把 x 视为常数）' },
    { focus: 5, desc: '计算法则：求 fₓ 时把 y 当常数，求 f_y 时把 x 当常数，其余照常求导' }
  ],
  draw: function (g, W, H, f) {
    const C = ['var(--primary)', 'var(--success)', 'var(--highlight)', 'var(--danger)'];
    const head = ['曲面 z = f(x, y)', '用平面 y = y₀ 切一刀', '截线：z 只随 x 变化', '切线斜率 = ∂f/∂x', '另一方向：∂f/∂y', '计算：另一个变量当常数'];
    title(g, head[f]);

    function P(x, y, z) { return [330 + (x - y) * 86, 228 + (x + y) * 37 - z * 44]; }
    function fz(x, y) { return 0.8 * (x * x - y * y); }
    function seg(a, b, color, w, dash, op) {
      g.append('line').attr('x1', a[0]).attr('y1', a[1]).attr('x2', b[0]).attr('y2', b[1])
        .attr('stroke', color).attr('stroke-width', w || 1.2).attr('stroke-dasharray', dash || '').attr('opacity', op === undefined ? 1 : op);
    }
    function curve(pts, color, w, dash) {
      let d = '';
      pts.forEach(function (p, i) { d += (i ? ' L ' : 'M ') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); });
      g.append('path').attr('d', d).attr('fill', 'none').attr('stroke', color).attr('stroke-width', w || 2.2).attr('stroke-dasharray', dash || '');
    }

    // 曲面网格
    const N = 10;
    for (let i = 0; i <= N; i++) {
      const t = -1 + 2 * i / N;
      const pts1 = [], pts2 = [];
      for (let j = 0; j <= 16; j++) {
        const s = -1 + 2 * j / 16;
        pts1.push(P(t, s, fz(t, s)));
        pts2.push(P(s, t, fz(s, t)));
      }
      curve(pts1, 'var(--border)', 1, '');
      curve(pts2, 'var(--border)', 1, '');
    }
    // 坐标轴
    seg(P(-1.25, -1.25, fz(-1.25, -1.25)), P(1.35, -1.25, fz(-1.25, -1.25)), 'var(--text-muted)', 1.6);
    txt(g, ...P(1.5, -1.25, fz(-1.25, -1.25)).concat(['x']), 'var(--text-muted)', 13, 'middle', '700');
    seg(P(-1.25, -1.25, fz(-1.25, -1.25)), P(-1.25, 1.35, fz(-1.25, -1.25)), 'var(--text-muted)', 1.6);
    txt(g, ...P(-1.25, 1.5, fz(-1.25, -1.25)).concat(['y']), 'var(--text-muted)', 13, 'middle', '700');
    seg(P(-1.25, -1.25, fz(-1.25, -1.25)), P(-1.25, -1.25, 1.32), 'var(--text-muted)', 1.6);
    txt(g, ...P(-1.25, -1.25, 1.45).concat(['z']), 'var(--text-muted)', 13, 'middle', '700');

    const y0 = 0.35, x0 = 0.45;

    if (f === 0) {
      txt(g, 700, 120, '曲面上的每一点', 'var(--text-muted)', 12, 'middle');
      txt(g, 700, 146, '都有「两个方向」的斜率', 'var(--text-muted)', 12, 'middle');
      txt(g, 700, 186, '沿 x 方向 → ∂f/∂x', 'var(--primary)', 13, 'middle', '700');
      txt(g, 700, 212, '沿 y 方向 → ∂f/∂y', 'var(--success)', 13, 'middle', '700');
      txt(g, 700, 252, '偏 = 偏袒一个变量：', 'var(--highlight)', 11.5, 'middle');
      txt(g, 700, 274, '只让一个动，另一个按住不变', 'var(--highlight)', 11.5, 'middle');
      txt(g, 460, 372, 'z = f(x,y) 的图形是一张「曲面」，不是一条曲线', 'var(--text-muted)', 12, 'middle');
    }

    if (f === 1 || f === 2 || f === 3) {
      // y = y0 平面（半透明四边形）
      const a = P(-1.2, y0, -1.6), b = P(1.2, y0, -1.6), c = P(1.2, y0, 1.6), d2 = P(-1.2, y0, 1.6);
      g.append('path').attr('d', 'M ' + a[0] + ' ' + a[1] + ' L ' + b[0] + ' ' + b[1] + ' L ' + c[0] + ' ' + c[1] + ' L ' + d2[0] + ' ' + d2[1] + ' Z')
        .attr('fill', 'var(--highlight)').attr('fill-opacity', 0.05).attr('stroke', 'var(--highlight)').attr('stroke-width', 1.4).attr('stroke-dasharray', '6,4');
      txt(g, 700, 354, '黄色虚线：切平面 y = y₀', 'var(--highlight)', 11, 'middle', '600');

      const pts = [];
      for (let i = 0; i <= 24; i++) {
        const x = -1.2 + 2.4 * i / 24;
        pts.push(P(x, y0, fz(x, y0)));
      }
      curve(pts, 'var(--highlight)', 3);

      if (f === 2 || f === 3) {
        const p0 = P(x0, y0, fz(x0, y0));
        circ(g, p0[0], p0[1], 6, 'var(--danger)');
        txt(g, p0[0] + 12, p0[1] - 10, 'P(x₀, y₀)', 'var(--danger)', 11.5, 'start', '700');
      }

      if (f === 3) {
        // 切线（在截线平面内）：dz/dx = 1.1 x
        const k = 1.1 * x0;
        const t1 = P(x0 - 0.6, y0, fz(x0, y0) - k * 0.6);
        const t2 = P(x0 + 0.6, y0, fz(x0, y0) + k * 0.6);
        g.append('line').attr('x1', t1[0]).attr('y1', t1[1]).attr('x2', t2[0]).attr('y2', t2[1])
          .attr('stroke', 'var(--danger)').attr('stroke-width', 3);
        txt(g, t2[0] + 8, t2[1] - 6, '切线', 'var(--danger)', 11.5, 'start', '700');
        txt(g, 700, 300, '∂f/∂x |P = 切线斜率', 'var(--danger)', 13, 'middle', '700');
        txt(g, 700, 326, '= lim [f(x₀+Δx,y₀)−f(x₀,y₀)]/Δx', 'var(--text-muted)', 10.5, 'middle');
      } else {
        txt(g, 700, 300, '曲面被切成一条「曲线」', 'var(--highlight)', 12.5, 'middle', '600');
        txt(g, 700, 326, '在这条线上，y 恒等于 y₀', 'var(--text-muted)', 11.5, 'middle');
      }
    }

    if (f === 4) {
      const a = P(x0, -1.2, -1.6), b = P(x0, 1.2, -1.6), c = P(x0, 1.2, 1.6), d2 = P(x0, -1.2, 1.6);
      g.append('path').attr('d', 'M ' + a[0] + ' ' + a[1] + ' L ' + b[0] + ' ' + b[1] + ' L ' + c[0] + ' ' + c[1] + ' L ' + d2[0] + ' ' + d2[1] + ' Z')
        .attr('fill', 'var(--primary)').attr('fill-opacity', 0.05).attr('stroke', 'var(--primary)').attr('stroke-width', 1.4).attr('stroke-dasharray', '6,4');
      txt(g, 700, 354, '蓝色虚线：切平面 x = x₀', 'var(--primary)', 11, 'middle', '600');
      const pts = [];
      for (let i = 0; i <= 24; i++) {
        const y = -1.2 + 2.4 * i / 24;
        pts.push(P(x0, y, fz(x0, y)));
      }
      curve(pts, 'var(--primary)', 3);
      const p0 = P(x0, y0, fz(x0, y0));
      const k = -1.1 * y0;
      const t1 = P(x0, y0 - 0.6, fz(x0, y0) - k * 0.6);
      const t2 = P(x0, y0 + 0.6, fz(x0, y0) + k * 0.6);
      g.append('line').attr('x1', t1[0]).attr('y1', t1[1]).attr('x2', t2[0]).attr('y2', t2[1])
        .attr('stroke', 'var(--success)').attr('stroke-width', 3);
      circ(g, p0[0], p0[1], 6, 'var(--danger)');
      txt(g, 700, 120, '同一个点 P，换个方向切', 'var(--primary)', 12.5, 'middle', '700');
      txt(g, 700, 160, '∂f/∂y |P = 这条切线的斜率', 'var(--success)', 12.5, 'middle', '700');
      txt(g, 700, 190, '求 f_y：把 x 按住不动', 'var(--text-muted)', 11.5, 'middle');
      txt(g, 700, 230, '两个偏导数通常不相等', 'var(--highlight)', 11.5, 'middle');
      txt(g, 700, 254, '（它们对应两个不同方向的斜率）', 'var(--text-muted)', 11, 'middle');
    }

    if (f === 5) {
      const lines = [
        ['f(x,y) = x²y + 3xy²', 'var(--text)', 13, 'start', '700'],
        ['求 fₓ：把 y 看成常数（数字）', 'var(--primary)', 12.5, 'start', '600'],
        ['fₓ = 2xy + 3y²', 'var(--primary)', 13, 'start', '700'],
        ['求 f_y：把 x 看成常数（数字）', 'var(--success)', 12.5, 'start', '600'],
        ['f_y = x² + 6xy', 'var(--success)', 13, 'start', '700'],
        ['二阶偏导：fₓₓ = 2y，fₓ_y = 2x + 6y', 'var(--highlight)', 12.5, 'start', '600'],
        ['（fₓ_y 与 f_yₓ 连续时相等）', 'var(--text-muted)', 11, 'start', '400']
      ];
      lines.forEach(function (l, i) {
        txt(g, 110, 96 + i * 42, l[0], l[1], l[2], l[3], l[4]);
      });
      box(g, 90, 78, 720, 300, 'var(--border)', 0.04);
      txt(g, 760, 360, '口诀：求谁谁动，另一个当常数', 'var(--primary-strong)', 12, 'end', '600');
    }
  }
});

/* ==================== MA-56 正项级数审敛法 ==================== */
items.push({
  id: 'MA-56',
  steps: [
    { focus: 0, desc: '正项级数的部分和 Sₙ 单调递增 —— 所以「收敛」等价于「Sₙ 有上界」' },
    { focus: 1, desc: '对比：Σ1/n² 的部分和趋于有限值；Σ1/n 的部分和一直往上爬（发散）' },
    { focus: 2, desc: '比较判别法：小的收敛则大的收敛；大的发散则小的发散（同向传递）' },
    { focus: 3, desc: '比值判别法：ρ = lim aₙ₊₁/aₙ，ρ<1 收敛、ρ>1 发散、ρ=1 失效' },
    { focus: 4, desc: '根值判别法：ρ = lim ⁿ√aₙ，判据与比值法完全一致' },
    { focus: 5, desc: '选择流程：先看通项形态 → 阶乘/幂选比值，n 次方选根值，分式选比较' }
  ],
  draw: function (g, W, H, f) {
    const C = ['var(--primary)', 'var(--success)', 'var(--highlight)', 'var(--danger)'];
    const head = ['部分和 Sₙ 单调递增', '收敛 vs 发散', '比较判别法', '比值判别法（达朗贝尔）', '根值判别法（柯西）', '拿到级数怎么选方法'];
    title(g, head[f]);

    if (f === 0) {
      const x0 = 100, y0 = 330, w = 660, h = 240;
      ln(g, x0, y0, x0 + w, y0, 'var(--text-muted)', 1.6);
      ln(g, x0, y0, x0, y0 - h, 'var(--text-muted)', 1.6);
      txt(g, x0 + w + 8, y0 + 4, 'n', 'var(--text-muted)', 12, 'start');
      txt(g, x0 - 8, y0 - h - 6, 'Sₙ', 'var(--text-muted)', 12, 'end');
      // 阶梯柱
      let s = 0;
      for (let n = 1; n <= 20; n++) {
        s += 1 / (n * n);
        const x = x0 + n * 30;
        g.append('rect').attr('x', x - 12).attr('y', y0 - s / 1.7 * h).attr('width', 22)
          .attr('height', s / 1.7 * h).attr('fill', 'var(--primary)').attr('fill-opacity', 0.35);
        if (n % 4 === 0) txt(g, x, y0 + 18, n, 'var(--text-muted)', 10, 'middle');
      }
      ln(g, x0, y0 - 1.65 / 1.7 * h, x0 + w, y0 - 1.65 / 1.7 * h, 'var(--success)', 2, '7,5');
      txt(g, x0 + w - 4, y0 - 1.65 / 1.7 * h - 8, '上界（如 π²/6≈1.645）', 'var(--success)', 11.5, 'end', '600');
      txt(g, 460, 96, 'Sₙ 只增不减；只要它「顶不破某个天花板」就收敛', 'var(--primary-strong)', 12.5, 'middle', '600');
      txt(g, 460, 372, '单调有界准则：单调递增 + 有上界 ⟺ 收敛', 'var(--text-muted)', 12, 'middle');
    }

    if (f === 1) {
      const x0 = 90, y0 = 320, w = 700, h = 230;
      ln(g, x0, y0, x0 + w, y0, 'var(--text-muted)', 1.6);
      ln(g, x0, y0, x0, y0 - h, 'var(--text-muted)', 1.6);
      txt(g, x0 + w + 8, y0 + 4, 'n', 'var(--text-muted)', 12, 'start');
      let s1 = 0, s2 = 0;
      let d1 = '', d2 = '';
      const p1 = [], p2 = [];
      for (let i = 0; i <= 300; i++) {
        const n = 1 + i * 0.1;
        // 用积分近似：S_n^(2) ≈ π²/6 - 1/n；S_n^(1) ≈ ln n + γ
        const a = 1.6449 - 1 / n;
        const b = Math.log(n) + 0.5772;
        p1.push([x0 + i / 300 * w, y0 - a / 1.7 * h]);
        p2.push([x0 + i / 300 * w, y0 - Math.min(b, 1.7) / 1.7 * h]);
      }
      p1.forEach(function (p, i) { d1 += (i ? ' L ' : 'M ') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); });
      p2.forEach(function (p, i) { d2 += (i ? ' L ' : 'M ') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); });
      g.append('path').attr('d', d1).attr('fill', 'none').attr('stroke', 'var(--success)').attr('stroke-width', 2.6);
      g.append('path').attr('d', d2).attr('fill', 'none').attr('stroke', 'var(--danger)').attr('stroke-width', 2.6);
      txt(g, 540, 150, 'Σ1/n² 收敛（有界）', 'var(--success)', 12.5, 'start', '700');
      txt(g, 540, 120, 'Σ1/n 发散（无界）', 'var(--danger)', 12.5, 'start', '700');
      txt(g, 460, 366, '同为正项级数，一个「爬得越来越慢但仍封顶」，一个「永远在爬」', 'var(--text-muted)', 12, 'middle');
    }

    if (f === 2) {
      // 两个堆叠
      function stack(x, base, arr, color, label, sub) {
        let y = base;
        arr.forEach(function (v) {
          const hh = v * 46;
          g.append('rect').attr('x', x).attr('y', y - hh).attr('width', 150).attr('height', hh - 2).attr('rx', 3)
            .attr('fill', color).attr('fill-opacity', 0.3).attr('stroke', color).attr('stroke-width', 1.4);
          y -= hh;
        });
        txt(g, x + 75, base + 24, label, color, 13, 'middle', '700');
        txt(g, x + 75, base + 46, sub, 'var(--text-muted)', 11, 'middle');
      }
      stack(140, 320, [1, 0.7, 0.5, 0.36, 0.26, 0.18], 'var(--success)', 'Σ bₙ（已知收敛）', '如 Σ1/n²');
      stack(400, 320, [1.3, 0.95, 0.7, 0.5, 0.36, 0.26], 'var(--primary)', 'Σ aₙ（待判）', '且 aₙ ≤ bₙ');
      txt(g, 690, 140, 'aₙ ≤ bₙ 时：', 'var(--highlight)', 12.5, 'start', '700');
      txt(g, 690, 172, '大的收敛 → 小的必收敛', 'var(--success)', 12, 'start', '600');
      txt(g, 690, 204, '小的发散 → 大的必发散', 'var(--danger)', 12, 'start', '600');
      txt(g, 690, 244, '记忆：水桶理论', 'var(--text-muted)', 11.5, 'start');
      txt(g, 690, 270, '小桶装得下 → 大桶也装得下', 'var(--text-muted)', 11.5, 'start');
      txt(g, 460, 372, '比较对象：p 级数 Σ1/nᵖ、几何级数 Σqⁿ（|q|<1 收敛）', 'var(--text-muted)', 11.5, 'middle');
    }

    if (f === 3) {
      const y = 210;
      arw(g, 90, y, 830, y, 'var(--text-muted)');
      [['0', 120, 'var(--text-muted)'], ['1', 520, 'var(--highlight)'], ['ρ', 700, 'var(--text-muted)']].forEach(function (t) {
        txt(g, t[1], y + 26, t[0], t[2], 13, 'middle', '700');
      });
      g.append('rect').attr('x', 120).attr('y', y - 40).attr('width', 400).attr('height', 80).attr('rx', 8)
        .attr('fill', 'var(--success)').attr('fill-opacity', 0.16);
      txt(g, 320, y + 6, 'ρ < 1 → 收敛', 'var(--success)', 15, 'middle', '700');
      g.append('rect').attr('x', 520).attr('y', y - 40).attr('width', 180).attr('height', 80).attr('rx', 8)
        .attr('fill', 'var(--danger)').attr('fill-opacity', 0.16);
      txt(g, 610, y + 6, 'ρ > 1 → 发散', 'var(--danger)', 15, 'middle', '700');
      txt(g, 520, y - 62, 'ρ = 1：本方法失效，另想办法', 'var(--highlight)', 12, 'middle', '600');
      txt(g, 460, 100, 'ρ = lim (n→∞) aₙ₊₁ / aₙ', 'var(--primary-strong)', 15, 'middle', '700');
      txt(g, 460, 300, '比值法的本质：和几何级数比 —— 相邻项缩小得比 1 快就收敛', 'var(--text-muted)', 12, 'middle');
      txt(g, 460, 332, 'ρ=1 的典型：Σ1/n 与 Σ1/n² 都判不出来（一个散一个收）', 'var(--highlight)', 11.5, 'middle');
      txt(g, 460, 364, '含阶乘、n 次幂、连乘 → 优先用比值法（相邻相除会大量约掉）', 'var(--primary-strong)', 12, 'middle', '600');
    }

    if (f === 4) {
      txt(g, 460, 100, 'ρ = lim (n→∞) ⁿ√aₙ', 'var(--primary-strong)', 15, 'middle', '700');
      const cards = [
        ['ρ < 1', '收敛', 'var(--success)', '因为 aₙ 最终小于某个 qⁿ（q<1）'],
        ['ρ > 1', '发散', 'var(--danger)', 'aₙ 最终大于 1，通项不趋于 0'],
        ['ρ = 1', '失效', 'var(--highlight)', '需改用比较法或积分法']
      ];
      cards.forEach(function (c, i) {
        const y = 130 + i * 76;
        g.append('rect').attr('x', 150).attr('y', y).attr('width', 600).attr('height', 62).attr('rx', 10)
          .attr('fill', c[2]).attr('fill-opacity', 0.12).attr('stroke', c[2]).attr('stroke-width', 1.8);
        txt(g, 180, y + 38, c[0], c[2], 15, 'start', '700');
        txt(g, 300, y + 38, c[1], c[2], 15, 'start', '700');
        txt(g, 430, y + 38, c[3], 'var(--text-muted)', 11.5, 'start');
      });
      txt(g, 460, 378, '适用：通项是「n 次方」形态，如 (n/(2n+1))ⁿ、(1+1/n)ⁿ²', 'var(--text-muted)', 11.5, 'middle');
    }

    if (f === 5) {
      const rows = [
        ['含 n!、连乘、n 的 n 次方', '比值法：lim aₙ₊₁/aₙ', 'var(--primary)'],
        ['通项是「整体 n 次方」', '根值法：lim ⁿ√aₙ', 'var(--success)'],
        ['分式、根式、与 p 级数同阶', '比较法 / 极限比较法', 'var(--highlight)'],
        ['通项是单调递减函数 f(n)', '积分判别法 ∫f(x)dx', 'var(--swap)'],
        ['形如 Σ1/(n lnᵖn)', '积分判别法（p>1 收敛）', 'var(--danger)']
      ];
      txt(g, 90, 92, '看到什么形态', 'var(--primary-strong)', 12.5, 'start', '700');
      txt(g, 400, 92, '优先选什么方法', 'var(--primary-strong)', 12.5, 'start', '700');
      rows.forEach(function (r, i) {
        const y = 106 + i * 52;
        g.append('rect').attr('x', 80).attr('y', y).attr('width', 740).attr('height', 44).attr('rx', 7)
          .attr('fill', r[2]).attr('fill-opacity', 0.1).attr('stroke', 'var(--border)').attr('stroke-width', 1);
        txt(g, 94, y + 28, r[0], 'var(--text)', 12, 'start');
        txt(g, 400, y + 28, r[1], r[2], 12, 'start', '700');
      });
      txt(g, 450, 380, '记住 p 级数：p>1 收敛、p≤1 发散 —— 它是所有比较法的「标尺」', 'var(--highlight)', 12, 'middle', '600');
    }
  }
});

/* ==================== MA-59 幂级数收敛半径 ==================== */
items.push({
  id: 'MA-59',
  steps: [
    { focus: 0, desc: '幂级数 Σaₙxⁿ 把 x 当变量：x 取大了会发散，取小了才收敛' },
    { focus: 1, desc: '比值法：相邻项之比 → |x|·|aₙ₊₁/aₙ|，令其 < 1 解出 |x| < R' },
    { focus: 2, desc: '收敛半径 R：|x|<R 绝对收敛，|x|>R 发散，R 内部「绝对安全」' },
    { focus: 3, desc: '端点 x = ±R 必须单独判别（比值法在端点恒等于 1，判不出）' },
    { focus: 4, desc: '例：Σxⁿ/n，R=1；x=1 调和发散、x=−1 交错收敛 → 收敛域 [−1,1)' },
    { focus: 5, desc: '三种极端：R=∞（如 Σxⁿ/n!）、R=0（如 Σn!xⁿ）、R=1（如 Σxⁿ/n²）' }
  ],
  draw: function (g, W, H, f) {
    const C = ['var(--primary)', 'var(--success)', 'var(--highlight)', 'var(--danger)'];
    const head = ['幂级数：x 取什么值才收敛？', '比值法解出 R', '收敛半径 R 的含义', '端点必须单独判别', '例题：Σ xⁿ/n', '三种典型收敛半径'];
    title(g, head[f]);

    const midX = 450, half = 300;
    function axis(R, opts) {
      opts = opts || {};
      arw(g, 100, 240, 820, 240, 'var(--text-muted)');
      const L = midX - R / 1.2 * half, Rt = midX + R / 1.2 * half;
      txt(g, 830, 244, 'x', 'var(--text-muted)', 12, 'start');
      if (opts.showR !== false) {
        g.append('rect').attr('x', L).attr('y', 214).attr('width', Rt - L).attr('height', 52).attr('rx', 6)
          .attr('fill', 'var(--success)').attr('fill-opacity', 0.18).attr('stroke', 'var(--success)').attr('stroke-width', 1.6);
        txt(g, midX, 246, '绝对收敛', 'var(--success)', 12.5, 'middle', '700');
        ln(g, L, 200, L, 280, 'var(--success)', 2);
        ln(g, Rt, 200, Rt, 280, 'var(--success)', 2);
        txt(g, L, 292, '−R', 'var(--success)', 12, 'middle', '700');
        txt(g, Rt, 292, 'R', 'var(--success)', 12, 'middle', '700');
        txt(g, 0, 0, '', 'var(--text)');
        txt(g, 120, 246, '发散', 'var(--danger)', 11.5, 'start');
        txt(g, 800, 246, '发散', 'var(--danger)', 11.5, 'end');
      }
      return [L, Rt];
    }

    if (f === 0) {
      txt(g, 450, 110, 'Σ aₙxⁿ = a₀ + a₁x + a₂x² + a₃x³ + …', 'var(--primary-strong)', 16, 'middle', '700');
      txt(g, 450, 150, '固定 x = x₀，它就变成一个「数项级数」', 'var(--text-muted)', 12.5, 'middle');
      txt(g, 450, 178, 'x₀ 取得小 → 幂次把项压小 → 收敛；x₀ 取得大 → 项反而变大 → 发散', 'var(--text-muted)', 12, 'middle');
      axis(1, { showR: false });
      txt(g, midX, 340, '中间有一段「安全区」，边界在哪？ → 就是收敛半径 R', 'var(--highlight)', 12.5, 'middle', '600');
      txt(g, midX, 372, '注意：R 只由系数 aₙ 决定，与 x 无关', 'var(--primary-strong)', 12, 'middle');
    }

    if (f === 1) {
      txt(g, 450, 110, 'ρ = lim |aₙ₊₁xⁿ⁺¹ / (aₙxⁿ)| = |x| · lim |aₙ₊₁/aₙ|', 'var(--primary-strong)', 14.5, 'middle', '700');
      txt(g, 450, 146, '令 ρ < 1  ⇒  |x| < lim |aₙ/aₙ₊₁| = R', 'var(--success)', 14.5, 'middle', '700');
      box(g, 150, 176, 600, 70, 'var(--success)', 0.08);
      txt(g, 450, 206, 'R = lim (n→∞) | aₙ / aₙ₊₁ |', 'var(--success)', 17, 'middle', '700');
      txt(g, 450, 232, '这是最常用的公式（比值法求 R）', 'var(--text-muted)', 11.5, 'middle');
      txt(g, 450, 290, '若 lim |aₙ₊₁/aₙ| = 0 → R = +∞；若 = +∞ → R = 0', 'var(--text-muted)', 12, 'middle');
      txt(g, 450, 330, '等价写法：R = 1 / lim |aₙ₊₁/aₙ|', 'var(--primary-strong)', 12.5, 'middle');
      txt(g, 450, 366, '（根值法同理：R = 1 / lim ⁿ√|aₙ|）', 'var(--text-muted)', 11.5, 'middle');
    }

    if (f === 2) {
      const LR = axis(1);
      txt(g, 450, 110, 'R 是「绝对收敛」与「发散」的分界', 'var(--primary-strong)', 13, 'middle', '700');
      txt(g, 200, 330, '|x| < R：加绝对值后收敛 ⇒ 原级数绝对收敛（一定收敛）', 'var(--success)', 11.5, 'start');
      txt(g, 200, 356, '|x| > R：通项不趋于 0 ⇒ 发散', 'var(--danger)', 11.5, 'start');
      txt(g, 200, 382, '|x| = R：不确定 —— 必须代回原级数单独判别', 'var(--highlight)', 11.5, 'start', '600');
      txt(g, 450, 178, '收敛区间 = (−R, R)；收敛域 = 收敛区间 + 端点中收敛的那些', 'var(--text-muted)', 11.5, 'middle');
    }

    if (f === 3) {
      const LR = axis(1);
      circ(g, LR[0], 240, 9, 'var(--highlight)');
      circ(g, LR[1], 240, 9, 'var(--highlight)');
      txt(g, LR[0] - 12, 200, 'x = −R', 'var(--highlight)', 12, 'end', '700');
      txt(g, LR[1] + 12, 200, 'x = +R', 'var(--highlight)', 12, 'start', '700');
      txt(g, LR[0] - 6, 330, '代回：Σ aₙ(−R)ⁿ', 'var(--highlight)', 11.5, 'end');
      txt(g, LR[1] + 6, 330, '代回：Σ aₙRⁿ', 'var(--highlight)', 11.5, 'start');
      txt(g, 450, 110, '端点处 ρ 恒等于 1，比值法失效 —— 只能代回去当数项级数判', 'var(--danger)', 12.5, 'middle', '600');
      txt(g, 450, 372, '常见结局：两端都收敛 / 两端都发散 / 一端收敛一端发散（如 [−1,1)）', 'var(--text-muted)', 11.5, 'middle');
    }

    if (f === 4) {
      txt(g, 450, 96, 'Σ xⁿ/n = x + x²/2 + x³/3 + …', 'var(--primary-strong)', 15, 'middle', '700');
      txt(g, 450, 128, 'aₙ = 1/n ⇒ R = lim |aₙ/aₙ₊₁| = lim (n+1)/n = 1', 'var(--text)', 12.5, 'middle');
      const LR = axis(1);
      // 端点判定卡片
      g.append('rect').attr('x', 130).attr('y', 318).attr('width', 300).attr('height', 62).attr('rx', 8)
        .attr('fill', 'var(--danger)').attr('fill-opacity', 0.12).attr('stroke', 'var(--danger)').attr('stroke-width', 1.6);
      txt(g, 148, 342, 'x = 1：Σ 1/n（调和级数）', 'var(--danger)', 12, 'start', '700');
      txt(g, 148, 366, '→ 发散 ✗', 'var(--danger)', 12, 'start');
      g.append('rect').attr('x', 470).attr('y', 318).attr('width', 300).attr('height', 62).attr('rx', 8)
        .attr('fill', 'var(--success)').attr('fill-opacity', 0.12).attr('stroke', 'var(--success)').attr('stroke-width', 1.6);
      txt(g, 488, 342, 'x = −1：Σ (−1)ⁿ/n（交错）', 'var(--success)', 12, 'start', '700');
      txt(g, 488, 366, '→ 条件收敛 ✓（莱布尼茨）', 'var(--success)', 12, 'start');
      txt(g, 450, 300, '收敛域 = [−1, 1)', 'var(--highlight)', 14, 'middle', '700');
    }

    if (f === 5) {
      const cards = [
        ['Σ xⁿ / n!', 'R = +∞', '整个数轴收敛（eˣ 的展开）', 'var(--success)'],
        ['Σ n! xⁿ', 'R = 0', '只有 x = 0 收敛', 'var(--danger)'],
        ['Σ xⁿ / n²', 'R = 1', '端点都收敛 → [−1, 1]', 'var(--primary)'],
        ['Σ xⁿ / n', 'R = 1', '一端收敛 → [−1, 1)', 'var(--highlight)']
      ];
      cards.forEach(function (c, i) {
        const y = 84 + i * 76;
        g.append('rect').attr('x', 100).attr('y', y).attr('width', 700).attr('height', 64).attr('rx', 10)
          .attr('fill', c[3]).attr('fill-opacity', 0.1).attr('stroke', c[3]).attr('stroke-width', 1.7);
        txt(g, 122, y + 40, c[0], 'var(--text)', 14, 'start', '700');
        txt(g, 380, y + 40, c[1], c[3], 15, 'start', '700');
        txt(g, 500, y + 40, c[2], 'var(--text-muted)', 11.5, 'start');
      });
      txt(g, 450, 378, 'R 可以是 0、正常数、+∞ —— 求法都是同一个公式', 'var(--primary-strong)', 12, 'middle', '600');
    }
  }
});

/* ==================== MA-61 泰勒展开 ==================== */
items.push({
  id: 'MA-61',
  steps: [
    { focus: 0, desc: '目标：用「多项式」逼近一个复杂函数（多项式最好算：加、乘、求导都简单）' },
    { focus: 1, desc: '一阶：在 x₀ 处贴一条切线 —— 只保证「值和斜率」相同' },
    { focus: 2, desc: '三阶：加上 −x³/6 —— 弯曲方向也对上了，范围明显变宽' },
    { focus: 3, desc: '五阶：再加 +x⁵/120 —— 在 [−3,3] 上几乎贴合' },
    { focus: 4, desc: '七阶：加 −x⁷/5040 —— 肉眼已看不出差别' },
    { focus: 5, desc: '余项与常用展开：项数越多误差越小，但只在收敛域内成立' }
  ],
  draw: function (g, W, H, f) {
    const C = ['var(--primary)', 'var(--success)', 'var(--highlight)', 'var(--danger)'];
    const head = ['用多项式逼近 f(x)', '一阶：切线 x', '三阶：x − x³/6', '五阶：+ x⁵/120', '七阶：− x⁷/5040', '余项与常用展开式'];
    title(g, head[f]);

    const ox = 450, oy = 210, sx = 62, sy = 62;
    function PX(x) { return ox + x * sx; }
    function PY(y) { return oy - y * sy; }
    function drawFn(fn, color, w, from, to, clip, op) {
      from = from === undefined ? -7 : from; to = to === undefined ? 7 : to;
      clip = clip === undefined ? 2.7 : clip;
      let d = '', started = false;
      for (let i = 0; i <= 500; i++) {
        const x = from + (to - from) * i / 500;
        const y = fn(x);
        if (!isFinite(y) || Math.abs(y) > clip) { started = false; continue; }
        d += (started ? ' L ' : ' M ') + PX(x).toFixed(1) + ' ' + PY(y).toFixed(1);
        started = true;
      }
      g.append('path').attr('d', d).attr('fill', 'none').attr('stroke', color).attr('stroke-width', w || 2.6)
        .attr('opacity', op === undefined ? 1 : op);
    }
    // 坐标系
    ln(g, 60, oy, 850, oy, 'var(--text-muted)', 1.4);
    ln(g, ox, 60, ox, 370, 'var(--text-muted)', 1.4);
    txt(g, 856, oy + 4, 'x', 'var(--text-muted)', 11, 'start');
    txt(g, ox + 6, 66, 'y', 'var(--text-muted)', 11, 'start');
    [-6, -3, 3, 6].forEach(function (t) {
      ln(g, PX(t), oy - 4, PX(t), oy + 4, 'var(--text-muted)', 1.2);
      txt(g, PX(t), oy + 18, t, 'var(--text-muted)', 10, 'middle');
    });
    [-2, -1, 1, 2].forEach(function (t) {
      ln(g, ox - 4, PY(t), ox + 4, PY(t), 'var(--text-muted)', 1.2);
      txt(g, ox - 12, PY(t) + 4, t, 'var(--text-muted)', 10, 'end');
    });

    drawFn(Math.sin, 'var(--text-muted)', 3);

    const polys = [
      function (x) { return x; },
      function (x) { return x - Math.pow(x, 3) / 6; },
      function (x) { return x - Math.pow(x, 3) / 6 + Math.pow(x, 5) / 120; },
      function (x) { return x - Math.pow(x, 3) / 6 + Math.pow(x, 5) / 120 - Math.pow(x, 7) / 5040; }
    ];

    if (f === 0) {
      txt(g, 700, 100, 'sin x 是「超越函数」', 'var(--text)', 12.5, 'middle', '700');
      txt(g, 700, 126, '计算机只会加减乘除', 'var(--text-muted)', 11.5, 'middle');
      txt(g, 700, 160, '→ 用多项式去「模仿」它', 'var(--primary-strong)', 12.5, 'middle', '700');
      txt(g, 700, 200, '模仿的三个要求：', 'var(--highlight)', 11.5, 'middle');
      txt(g, 700, 226, '① 该点函数值相同', 'var(--text)', 11.5, 'middle');
      txt(g, 700, 250, '② 一阶导相同（斜率）', 'var(--text)', 11.5, 'middle');
      txt(g, 700, 274, '③ 二阶导相同（弯曲）', 'var(--text)', 11.5, 'middle');
      txt(g, 700, 300, '…… 直到 n 阶导全相同', 'var(--text)', 11.5, 'middle');
      txt(g, 450, 372, '展开点 x₀=0 时称为「麦克劳林级数」', 'var(--text-muted)', 12, 'middle');
    }

    if (f >= 1 && f <= 4) {
      for (let i = 0; i < f; i++) {
        const isCur = i === f - 1;
        const lim = isCur ? (0.6 * (i + 1) + 0.6) : (i + 1) + 0.6;
        drawFn(polys[i], isCur ? C[(f - 1) % 4] : 'var(--border)', isCur ? 3 : 1.6, -lim, lim, isCur ? 2.7 : 2.4, isCur ? 1 : 0.55);
      }
      const names = ['一阶：P₁(x) = x', '三阶：P₃(x) = x − x³/6', '五阶：P₅(x) = x − x³/6 + x⁵/120', '七阶：P₇(x) = P₅ − x⁷/5040'];
      const ranges = ['约 [−1, 1] 内贴近', '约 [−2, 2] 内贴近', '约 [−3, 3] 内贴合', '约 [−4, 4] 仍几乎重合'];
      txt(g, 96, 92, '粗灰线 = sin x', 'var(--text-muted)', 12, 'start', '600');
      txt(g, 844, 92, names[f - 1], C[(f - 1) % 4], 13, 'end', '700');
      txt(g, 844, 118, '有效范围：' + ranges[f - 1], 'var(--text-muted)', 11.5, 'end');
      txt(g, 96, 330, '阶数越高，展开点附近越贴合；出了有效范围仍会「炸掉」', 'var(--highlight)', 11.5, 'start', '600');
      txt(g, 96, 356, '曲线在有效范围外直接截断，就是为了让你看到「边界」', 'var(--text-muted)', 11.5, 'start');
    }

    if (f === 5) {
      const rows = [
        ['sin x', 'x − x³/6 + x⁵/120 − …', '(−∞, +∞)', '奇函数，只有奇次项'],
        ['cos x', '1 − x²/2 + x⁴/24 − …', '(−∞, +∞)', '偶函数，只有偶次项'],
        ['eˣ', '1 + x + x²/2! + x³/3! + …', '(−∞, +∞)', '收敛最快，最常用'],
        ['ln(1+x)', 'x − x²/2 + x³/3 − …', '(−1, 1]', '端点 x=1 条件收敛'],
        ['1/(1−x)', '1 + x + x² + x³ + …', '(−1, 1)', '几何级数，求和最直观']
      ];
      txt(g, 120, 92, '函数', 'var(--primary-strong)', 12, 'start', '700');
      txt(g, 240, 92, '麦克劳林展开', 'var(--primary-strong)', 12, 'start', '700');
      txt(g, 600, 92, '收敛域', 'var(--primary-strong)', 12, 'start', '700');
      txt(g, 720, 92, '备注', 'var(--primary-strong)', 12, 'start', '700');
      rows.forEach(function (r, i) {
        const y = 104 + i * 46;
        g.append('rect').attr('x', 110).attr('y', y).attr('width', 720).attr('height', 38).attr('rx', 6)
          .attr('fill', C[i % 4]).attr('fill-opacity', 0.09).attr('stroke', 'var(--border)').attr('stroke-width', 1);
        txt(g, 120, y + 24, r[0], C[i % 4], 12, 'start', '700');
        txt(g, 240, y + 24, r[1], 'var(--text)', 11.5, 'start');
        txt(g, 600, y + 24, r[2], 'var(--success)', 11, 'start');
        txt(g, 720, y + 24, r[3], 'var(--text-muted)', 10.5, 'start');
      });
      txt(g, 450, 356, '常用的必须背下来 —— 求极限、判敛、近似计算全靠它们', 'var(--highlight)', 12, 'middle', '600');
      txt(g, 450, 382, '余项 Rₙ(x) = f⁽ⁿ⁺¹⁾(ξ)/(n+1)! · xⁿ⁺¹ —— 误差的定量刻画', 'var(--text-muted)', 11.5, 'middle');
    }
  }
});

module.exports = items.map(function (m) {
  const d = R[m.id];
  return {
    id: m.id, level: d.level || 'B', title: d.title,
    intuition: d.intuition_text,
    derivation: d.derivation,
    exam_text: d.exam_text,
    exam_answer: d.exam_answer,
    pitfalls: d.pitfall_list,
    quiz: d.quiz_list,
    steps: m.steps,
    draw: m.draw
  };
});
