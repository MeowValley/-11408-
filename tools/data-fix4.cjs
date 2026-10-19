/** 升级批次 4：MA-128 两类曲线积分 / 两类曲面积分（原页面动画过薄，重写） */
const R = require('./recovered.json');

const items = [{
  id: 'MA-128',
  steps: [
    { focus: 0, desc: '先看舞台：平面曲线 L —— 曲线积分就是「沿着这条线累加」' },
    { focus: 1, desc: '第一类（对弧长）：把曲线切成小弧段 ds，累加 f·ds，与方向无关' },
    { focus: 2, desc: '第二类（对坐标）：ds 投影成 dx 与 dy，带方向，累加 P·dx + Q·dy' },
    { focus: 3, desc: '把路径反向：dx、dy 全部变号 → 第二类积分整体变号，第一类不变' },
    { focus: 4, desc: '升一维：曲面 Σ 上的第一类曲面积分 ∬f dS，dS 是「面积元」，无方向' },
    { focus: 5, desc: '第二类曲面积分：曲面有正反两侧，dS 变成有向面积元，投影出 dxdy' },
    { focus: 6, desc: '一张图记住四大公式：格林（平面）、高斯（闭曲面）、斯托克斯（空间曲线）' }
  ],
  draw: function (g, W, H, f) {
    const C = ['var(--primary)', 'var(--success)', 'var(--highlight)', 'var(--danger)'];
    const head = ['平面曲线 L：积分的舞台', '第一类：对弧长 ds（无方向）', '第二类：对坐标 dx、dy（有方向）', '路径反向 → 符号变号', '第一类曲面积分：dS 无方向', '第二类曲面积分：有向面积元', '四大公式的关系'];
    title(g, head[f]);

    function PX(x) { return 450 + x * 155; }
    function PY(y) { return 300 - y * 78; }
    function curveY(x) { return 0.5 * x * x - 0.35; }
    function pathOn(color, w, dash) {
      let d = '';
      for (let i = 0; i <= 120; i++) {
        const x = -1.9 + 3.8 * i / 120;
        d += (i ? ' L ' : 'M ') + PX(x).toFixed(1) + ' ' + PY(curveY(x)).toFixed(1);
      }
      g.append('path').attr('d', d).attr('fill', 'none').attr('stroke', color).attr('stroke-width', w || 3).attr('stroke-dasharray', dash || '');
    }
    function arrowAt(x, color, dir) {
      const y = curveY(x);
      const slope = x; // dy/dx = x
      const len = 0.34 * (dir || 1);
      const ex = x + len, ey = y + slope * len;
      g.append('line').attr('x1', PX(x)).attr('y1', PY(y)).attr('x2', PX(ex)).attr('y2', PY(ey))
        .attr('stroke', color).attr('stroke-width', 3).attr('marker-end', 'url(#arwGen)');
    }

    if (f <= 3) {
      // 坐标轴
      arw(g, 120, PY(0), 810, PY(0), 'var(--text-muted)');
      arw(g, PX(0), 350, PX(0), 70, 'var(--text-muted)');
      txt(g, 820, PY(0) + 4, 'x', 'var(--text-muted)', 12, 'start');
      txt(g, PX(0) + 6, 66, 'y', 'var(--text-muted)', 12, 'start');
      pathOn('var(--primary)', 3.2);
      txt(g, PX(1.62), PY(curveY(1.62)) - 14, 'L', 'var(--primary)', 15, 'middle', '700');
      txt(g, 640, 96, '曲线 L：y = x²/2 − 0.35', 'var(--text-muted)', 12, 'start');
    }

    if (f === 0) {
      // 沿曲线的采样点
      for (let i = 0; i <= 10; i++) {
        const x = -1.9 + 3.8 * i / 10;
        circ(g, PX(x), PY(curveY(x)), 4, 'var(--highlight)');
      }
      txt(g, 460, 356, '把 L 切成很多小段，每段贡献一点 → 求和取极限 = 曲线积分', 'var(--text-muted)', 12, 'middle');
    }

    if (f === 1) {
      // 小弧段 ds（用弦近似），画垂直方向的 f 条
      for (let i = 0; i < 10; i++) {
        const x1 = -1.9 + 3.8 * i / 10, x2 = -1.9 + 3.8 * (i + 1) / 10;
        g.append('line').attr('x1', PX(x1)).attr('y1', PY(curveY(x1))).attr('x2', PX(x2)).attr('y2', PY(curveY(x2)))
          .attr('stroke', 'var(--success)').attr('stroke-width', 5).attr('opacity', 0.55);
        if (i % 2 === 0) txt(g, PX((x1 + x2) / 2), PY(curveY((x1 + x2) / 2)) - 12, 'ds', 'var(--success)', 11, 'middle', '700');
      }
      txt(g, 700, 150, '∫_L f(x,y) ds', 'var(--success)', 17, 'start', '700');
      txt(g, 700, 178, 'ds = √(1+y′²) dx', 'var(--text-muted)', 12, 'start');
      txt(g, 700, 204, '只跟曲线形状有关', 'var(--text-muted)', 12, 'start');
      txt(g, 700, 230, '把 L 翻个方向，值不变', 'var(--success)', 12, 'start', '600');
      txt(g, 460, 356, '第一类 = 「称重」：沿曲线称一遍重量，跟走的方向无关', 'var(--success)', 12, 'middle', '600');
    }

    if (f === 2) {
      for (let i = 0; i < 6; i++) arrowAt(-1.75 + i * 0.62, 'var(--swap)', 1);
      // dx / dy 分解三角形
      const x0 = 0.9, y0 = curveY(x0);
      const dx = 0.55, dy = (curveY(x0 + dx) - y0);
      ln(g, PX(x0), PY(y0), PX(x0 + dx), PY(y0), 'var(--primary)', 2.4);
      ln(g, PX(x0 + dx), PY(y0), PX(x0 + dx), PY(y0 + dy), 'var(--danger)', 2.4);
      txt(g, PX(x0 + dx / 2), PY(y0) + 16, 'dx', 'var(--primary)', 12, 'middle', '700');
      txt(g, PX(x0 + dx) + 12, PY(y0 + dy / 2), 'dy', 'var(--danger)', 12, 'start', '700');
      txt(g, 700, 150, '∫_L P dx + Q dy', 'var(--swap)', 16, 'start', '700');
      txt(g, 700, 178, 'dx、dy 带正负号', 'var(--text-muted)', 12, 'start');
      txt(g, 700, 204, '箭头方向 = 积分方向', 'var(--text-muted)', 12, 'start');
      txt(g, 700, 230, '= ∫(P cosα + Q cosβ) ds', 'var(--primary)', 11.5, 'start', '600');
      txt(g, 460, 356, '第二类 = 「做功」：力沿路径做的功，方向和力都影响正负', 'var(--swap)', 12, 'middle', '600');
    }

    if (f === 3) {
      for (let i = 0; i < 6; i++) arrowAt(1.75 - i * 0.62, 'var(--danger)', -1);
      txt(g, 700, 150, '∫_{−L} P dx + Q dy', 'var(--danger)', 15, 'start', '700');
      txt(g, 700, 178, '= − ∫_L P dx + Q dy', 'var(--danger)', 15, 'start', '700');
      txt(g, 700, 212, '第一类：∫_{−L} f ds = ∫_L f ds', 'var(--success)', 12, 'start', '600');
      txt(g, 700, 238, '（ds 恒为正，与方向无关）', 'var(--text-muted)', 11, 'start');
      txt(g, 460, 356, '同一段曲线，走反方向：第二类变号，第一类不变 —— 这就是「有无方向性」', 'var(--highlight)', 12, 'middle', '600');
    }

    if (f === 4 || f === 5) {
      // 3D 曲面片
      const S = function (u, v) { return [452 + (u - v) * 112, 198 + (u + v) * 44 - Math.sin(u * 1.6) * 24]; };
      const N = 6;
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          const a = S(i / N - 0.5, j / N - 0.5), b = S((i + 1) / N - 0.5, j / N - 0.5);
          const c = S((i + 1) / N - 0.5, (j + 1) / N - 0.5), d = S(i / N - 0.5, (j + 1) / N - 0.5);
          g.append('path').attr('d', 'M ' + a[0] + ' ' + a[1] + ' L ' + b[0] + ' ' + b[1] + ' L ' + c[0] + ' ' + c[1] + ' L ' + d[0] + ' ' + d[1] + ' Z')
            .attr('fill', 'var(--primary)').attr('fill-opacity', 0.09).attr('stroke', 'var(--primary)').attr('stroke-width', 0.9).attr('stroke-opacity', 0.7);
        }
      }
      txt(g, 452, 300, '曲面 Σ', 'var(--primary)', 13, 'middle', '700');

      if (f === 4) {
        // 面积元 dS
        const a = S(0.06, 0.06), b = S(0.28, 0.06), c = S(0.28, 0.28), d = S(0.06, 0.28);
        g.append('path').attr('d', 'M ' + a[0] + ' ' + a[1] + ' L ' + b[0] + ' ' + b[1] + ' L ' + c[0] + ' ' + c[1] + ' L ' + d[0] + ' ' + d[1] + ' Z')
          .attr('fill', 'var(--success)').attr('fill-opacity', 0.55).attr('stroke', 'var(--success)').attr('stroke-width', 2);
        txt(g, (a[0] + c[0]) / 2, (a[1] + c[1]) / 2 + 4, 'dS', 'var(--bg)', 12, 'middle', '700');
        txt(g, 690, 140, '∬_Σ f(x,y,z) dS', 'var(--success)', 16, 'start', '700');
        txt(g, 690, 168, 'dS：面积元，恒为正', 'var(--text-muted)', 12, 'start');
        txt(g, 690, 194, '曲面取哪一侧都相同', 'var(--text-muted)', 12, 'start');
        txt(g, 690, 220, 'dS = √(1+z_x²+z_y²) dxdy', 'var(--primary)', 11.5, 'start', '600');
        txt(g, 460, 356, '第一类曲面积分 = 「给曲面刷漆」：只关心刷多少，不管朝哪面', 'var(--success)', 12, 'middle', '600');
      }

      if (f === 5) {
        // 法向量 & 投影
        const p0 = S(0.17, 0.17);
        arw(g, p0[0], p0[1], p0[0] + 52, p0[1] - 62, 'var(--danger)');
        txt(g, p0[0] + 58, p0[1] - 68, 'n（取正侧）', 'var(--danger)', 11.5, 'start', '700');
        // 投影到 xOy：用一块示意菱形表示投影区域，虚线连到曲面上的面积元
        const q1 = S(0.06, 0.06), q4 = S(0.06, 0.30), q3 = S(0.30, 0.30);
        const dC = [196, 318], rx = 86, ry = 34;
        g.append('path').attr('d', 'M ' + (dC[0] - rx) + ' ' + dC[1] + ' L ' + dC[0] + ' ' + (dC[1] - ry) + ' L ' + (dC[0] + rx) + ' ' + dC[1] + ' L ' + dC[0] + ' ' + (dC[1] + ry) + ' Z')
          .attr('fill', 'var(--highlight)').attr('fill-opacity', 0.26).attr('stroke', 'var(--highlight)').attr('stroke-width', 1.8).attr('stroke-dasharray', '6,4');
        txt(g, dC[0], dC[1] + 6, 'dxdy', 'var(--highlight)', 12, 'middle', '700');
        txt(g, dC[0], dC[1] - ry - 10, '投影区域（xOy 面）', 'var(--highlight)', 11, 'middle', '600');
        ln(g, q1[0], q1[1], dC[0] + rx, dC[1] - 6, 'var(--highlight)', 1.1, '3,4');
        ln(g, q3[0], q3[1], dC[0] + rx, dC[1] + 6, 'var(--highlight)', 1.1, '3,4');
        ln(g, q4[0], q4[1], dC[0] + rx - 30, dC[1] + 20, 'var(--highlight)', 1.1, '3,4');
        txt(g, 596, 138, '∬_Σ P dydz + Q dzdx + R dxdy', 'var(--danger)', 12.5, 'start', '700');
        txt(g, 596, 164, '有向面积元 = n dS', 'var(--text-muted)', 12, 'start');
        txt(g, 596, 190, '换一侧 → 整体变号', 'var(--danger)', 12, 'start', '600');
        txt(g, 596, 216, '本质是「通量」：穿过去多少', 'var(--text-muted)', 11.5, 'start');
        txt(g, 460, 356, '第二类曲面积分 = 「数流量」：从指定一侧穿过的量，方向决定正负', 'var(--danger)', 12, 'middle', '600');
      }


    }
    if (f === 6) {
        const boxes = [
          ['格林公式', '∮_L Pdx+Qdy = ∬_D (Q_x−P_y) dxdy', '平面闭曲线 ↔ 平面区域', 'var(--success)', 76],
          ['高斯公式', '∬_Σ P dydz+… = ∭_Ω (P_x+Q_y+R_z) dV', '闭曲面 ↔ 空间区域', 'var(--highlight)', 168],
          ['斯托克斯', '∮_Γ Pdx+Qdy+Rdz = ∬_Σ (∇×F)·n dS', '空间闭曲线 ↔ 曲面', 'var(--primary)', 260]
        ];
        boxes.forEach(function (b, i) {
          const y = b[4];
          g.append('rect').attr('x', 120).attr('y', y).attr('width', 660).attr('height', 82).attr('rx', 10)
            .attr('fill', b[3]).attr('fill-opacity', 0.12).attr('stroke', b[3]).attr('stroke-width', 1.8);
          txt(g, 140, y + 30, b[0], b[3], 14, 'start', '700');
          txt(g, 140, y + 56, b[1], 'var(--text)', 12, 'start');
          txt(g, 140, y + 74, b[2], 'var(--text-muted)', 11, 'start');
        });
        txt(g, 460, 358, '口诀：曲线看「旋」，曲面看「散」，维数升一级，边界变成区域', 'var(--text-muted)', 11.5, 'middle');
    }
  }
}];

module.exports = items.map(function (m) {
  const d = R[m.id];
  return {
    id: m.id, level: d.level || 'B', title: d.title,
    intuition: d.intuition_text || "曲线积分分两类：第一类（对弧长，无方向）和第二类（对坐标，有方向）；曲面积分同样分两类：对面积（无方向）与对坐标（有方向）。它们通过<strong>格林、高斯、斯托克斯公式</strong>互相联系——本质都是「边界上的积分」等于「内部区域的积分」。下面用 7 步动画把这几件事串起来。",
    derivation: d.derivation,
    exam_text: d.exam_text,
    exam_answer: d.exam_answer,
    pitfalls: d.pitfall_list,
    quiz: d.quiz_list,
    steps: m.steps,
    draw: m.draw
  };
});
