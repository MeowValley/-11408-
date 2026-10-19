/**
 * 升级批次 1：为 4 个原本「静态切图」的课件补上分步动画
 * CN-160 信道划分 / CN-158 选择重传 / CN-167 路由算法 / OS-137 磁盘调度
 * 每个知识点的 draw 均为独立手写编排，互不共用。
 */
const R = require('./recovered.json');

const items = [];

/* ==================== CN-160 信道划分 ==================== */
items.push({
  id: 'CN-160',
  steps: [
    { focus: 0, desc: '一条链路要同时承载 4 路信号——必须「划分资源」，否则互相淹没' },
    { focus: 1, desc: 'FDM 频分：把频带切成 4 段，各用户独占一段频率，全程可用' },
    { focus: 2, desc: 'TDM 时分：把时间切成时隙，4 路轮流占用，每路只用自己的那几格' },
    { focus: 3, desc: 'WDM 波分：光纤里按波长（颜色）划分，本质是「光的频分」' },
    { focus: 4, desc: 'CDMA 码分：同一时刻同频率，靠正交码片区分用户，抗干扰最强' },
    { focus: 5, desc: '对比：FDM/TDM 静态划分会浪费，CDMA 动态共享、容量最大' }
  ],
  draw: function (g, W, H, f) {
    const C = ['var(--primary)', 'var(--success)', 'var(--highlight)', 'var(--danger)'];
    const U = ['A', 'B', 'C', 'D'];
    const head = ['一条链路，四路信号', 'FDM 频分：切频率', 'TDM 时分：切时间', 'WDM 波分：切波长', 'CDMA 码分：切编码', '四种复用方式对比'];
    title(g, head[f]);

    if (f === 0) {
      for (let i = 0; i < 4; i++) {
        const y = 100 + i * 68;
        circ(g, 80, y, 24, C[i]);
        txt(g, 80, y + 6, U[i], '#fff', 16, 'middle', '700');
        ln(g, 108, y, 180, y, C[i], 2, '4,4');
        txt(g, 144, y - 8, '信号 ' + U[i], C[i], 11, 'middle');
      }
      box(g, 186, 68, 510, 252, 'var(--border)', 0.05);
      txt(g, 441, 92, '共享信道（1 条物理链路）', 'var(--text-muted)', 13, 'middle', '600');
      for (let i = 0; i < 4; i++) ln(g, 206, 126 + i * 46, 676, 126 + i * 46, C[i], 2, '3,5');
      txt(g, 441, 302, '4 路叠加在一起 → 接收端无法区分', 'var(--danger)', 12, 'middle', '600');
      arw(g, 702, 194, 752, 194, 'var(--primary)');
      box(g, 757, 164, 100, 60, 'var(--success)', 0.14);
      txt(g, 807, 199, '接收端', 'var(--success)', 13, 'middle', '700');
      txt(g, 807, 240, '？', 'var(--danger)', 18, 'middle', '700');
    }

    if (f === 1) {
      arw(g, 118, 340, 118, 82, 'var(--text-muted)');
      txt(g, 108, 78, '频率 f', 'var(--text-muted)', 12, 'end');
      for (let i = 0; i < 4; i++) {
        const y = 92 + i * 60;
        g.append('rect').attr('x', 140).attr('y', y).attr('width', 690).attr('height', 44).attr('rx', 7)
          .attr('fill', C[i]).attr('fill-opacity', 0.28).attr('stroke', C[i]).attr('stroke-width', 2);
        txt(g, 152, y + 28, '用户 ' + U[i] + ' 独占频段 f' + (i + 1), C[i], 13, 'start', '600');
        txt(g, 818, y + 28, '频带 ' + (i + 1), 'var(--text-muted)', 11, 'end');
      }
      txt(g, 485, 358, '每路「全程在线」，但只分到一小段带宽 —— 静态划分', 'var(--highlight)', 12, 'middle', '600');
      box(g, 140, 332, 690, 4, 'var(--border)', 0.3, 2);
    }

    if (f === 2) {
      arw(g, 130, 330, 850, 330, 'var(--text-muted)');
      txt(g, 856, 335, '时间 t', 'var(--text-muted)', 12, 'start');
      for (let i = 0; i < 8; i++) {
        const x = 146 + i * 87;
        g.append('rect').attr('x', x).attr('y', 128).attr('width', 80).attr('height', 150).attr('rx', 7)
          .attr('fill', C[i % 4]).attr('fill-opacity', 0.3).attr('stroke', C[i % 4]).attr('stroke-width', 2);
        txt(g, x + 40, 210, U[i % 4], C[i % 4], 20, 'middle', '700');
        txt(g, x + 40, 300, 'T' + (i + 1), 'var(--text-muted)', 11, 'middle');
      }
      txt(g, 485, 108, '时隙 1~8 轮流分配给 A→B→C→D，周而复始', 'var(--text-muted)', 12, 'middle', '600');
      txt(g, 485, 350, '每路只在「自己的时隙」发送，其余时间空等 —— 会浪费时隙', 'var(--highlight)', 12, 'middle', '600');
    }

    if (f === 3) {
      g.append('rect').attr('x', 120).attr('y', 90).attr('width', 730).attr('height', 232).attr('rx', 24)
        .attr('fill', 'var(--primary)').attr('fill-opacity', 0.06).attr('stroke', 'var(--primary)').attr('stroke-width', 2)
        .attr('stroke-dasharray', '8,6');
      txt(g, 136, 116, '同一根光纤', 'var(--primary)', 12, 'start', '600');
      const lam = ['λ1 = 850nm', 'λ2 = 1310nm', 'λ3 = 1490nm', 'λ4 = 1550nm'];
      for (let i = 0; i < 4; i++) {
        const y0 = 148 + i * 44;
        let d = '';
        for (let j = 0; j <= 200; j++) {
          const x = 160 + j * 3.3;
          const y = y0 - Math.sin(j / 8) * 13;
          d += (j ? ' L ' : 'M ') + x.toFixed(1) + ' ' + y.toFixed(1);
        }
        g.append('path').attr('d', d).attr('fill', 'none').attr('stroke', C[i]).attr('stroke-width', 3);
        txt(g, 830, y0 + 4, lam[i], C[i], 11, 'start');
      }
      txt(g, 470, 350, '不同波长互不干扰 → 一根光纤当 4 根用（WDM = 光的 FDM）', 'var(--highlight)', 12, 'middle', '600');
    }

    if (f === 4) {
      const codes = [
        [1, 1, 1, 1, -1, -1, -1, -1],
        [1, 1, -1, -1, 1, 1, -1, -1],
        [1, -1, 1, -1, 1, -1, 1, -1],
        [1, -1, -1, 1, 1, -1, -1, 1]
      ];
      for (let i = 0; i < 4; i++) {
        const y = 86 + i * 56;
        txt(g, 96, y + 30, 'S' + (i + 1), C[i], 13, 'end', '700');
        const bits = codes[i].map(function (v) { return (v > 0 ? '1' : '0'); }).join(' ');
        for (let j = 0; j < 8; j++) {
          const x = 112 + j * 54;
          const v = codes[i][j];
          g.append('rect').attr('x', x).attr('y', y).attr('width', 46).attr('height', 44).attr('rx', 6)
            .attr('fill', v > 0 ? 'var(--success)' : 'var(--danger)').attr('fill-opacity', 0.32)
            .attr('stroke', v > 0 ? 'var(--success)' : 'var(--danger)').attr('stroke-width', 1.6);
          txt(g, x + 23, y + 28, v > 0 ? '+1' : '−1', v > 0 ? 'var(--success)' : 'var(--danger)', 12, 'middle', '700');
        }
        txt(g, 566, y + 28, '码片 ' + bits, 'var(--text-muted)', 11, 'start');
      }
      txt(g, 112, 320, '任意两行内积 = 0（正交）→ 接收端用同一码片做内积即可分离出自己那一路', 'var(--highlight)', 12, 'start', '600');
      txt(g, 112, 348, '同一时刻、同一频率、多用户并发 —— 容量最大，但需要严格同步与功率控制', 'var(--text-muted)', 12, 'start');
    }

    if (f === 5) {
      const rows = [
        ['FDM 频分', '频率（频带）', '模拟载波、广播、ADSL', '频带固定，空闲也占用'],
        ['TDM 时分', '时间（时隙）', '数字电话、SDH、E1', '时隙固定，空闲浪费'],
        ['WDM 波分', '波长（颜色）', '光纤骨干网', '本质是光的频分'],
        ['CDMA 码分', '编码（码片）', '3G、卫星、军用', '同频同时，抗干扰强']
      ];
      const x0 = 86, cw = [150, 150, 250, 220];
      let x = x0;
      for (let i = 0; i < 4; i++) x += cw[i];
      txt(g, x0 + 8, 84, '复用方式', 'var(--primary-strong)', 13, 'start', '700');
      txt(g, 240, 84, '划分维度', 'var(--primary-strong)', 13, 'start', '700');
      txt(g, 400, 84, '典型场景', 'var(--primary-strong)', 13, 'start', '700');
      txt(g, 660, 84, '主要代价', 'var(--primary-strong)', 13, 'start', '700');
      for (let r = 0; r < 4; r++) {
        const y = 96 + r * 62;
        g.append('rect').attr('x', x0).attr('y', y).attr('width', 750).attr('height', 54).attr('rx', 8)
          .attr('fill', C[r]).attr('fill-opacity', 0.13).attr('stroke', C[r]).attr('stroke-width', 1.6);
        txt(g, x0 + 12, y + 32, rows[r][0], C[r], 13, 'start', '700');
        txt(g, 240, y + 32, rows[r][1], 'var(--text)', 12.5, 'start');
        txt(g, 400, y + 32, rows[r][2], 'var(--text)', 12.5, 'start');
        txt(g, 660, y + 32, rows[r][3], 'var(--text-muted)', 12, 'start');
      }
      txt(g, 460, 372, '考点：WDM 用于光纤；CDMA 用正交码片，可以「同时同频」通信', 'var(--highlight)', 12, 'middle', '600');
    }
  }
});

/* ==================== CN-158 选择重传 SR ==================== */
items.push({
  id: 'CN-158',
  steps: [
    { focus: 0, desc: '发送窗口与接收窗口各 4 帧：窗口内的帧可以连续发出，不必等确认' },
    { focus: 1, desc: '第 2 帧在传输中丢失 —— 后续 3、4、5 帧却成功到达接收方' },
    { focus: 2, desc: 'GBN 的做法：丢弃 3、4、5，从第 2 帧起全部重传（后退 N 帧）' },
    { focus: 3, desc: 'SR 的做法：接收方先缓存 3、4、5，只要求重传第 2 帧' },
    { focus: 4, desc: '第 2 帧补到后，接收窗口一次性交付 2~5，窗口滑到 6~9' },
    { focus: 5, desc: '对比：SR 重传最少、效率最高，代价是要缓存乱序帧 + 逐帧确认' }
  ],
  draw: function (g, W, H, f) {
    const C = ['var(--primary)', 'var(--success)', 'var(--highlight)', 'var(--danger)'];
    const head = ['滑动窗口：可以连发 4 帧', '第 2 帧丢失', 'GBN：后退 N 帧，全部重传', 'SR：只重传丢失的那一帧', '补到第 2 帧后窗口滑动', 'GBN vs SR 对比'];
    title(g, head[f]);

    const fx = function (i) { return 96 + i * 95; };
    const FW = 78, FH = 52;
    const yS = 92, yR = 252;

    function lane(label, y, color) {
      txt(g, 60, y + 32, label, color, 14, 'end', '700');
      ln(g, 70, y + FH + 8, 862, y + FH + 8, 'var(--border)', 1.4, '4,4');
    }
    function frame(i, y, opts) {
      opts = opts || {};
      const x = fx(i);
      const lost = opts.lost, cached = opts.cached, resent = opts.resent;
      const stroke = lost ? 'var(--danger)' : (resent ? 'var(--swap)' : (cached ? 'var(--primary)' : 'var(--border)'));
      const fill = lost ? 'var(--danger)' : (resent ? 'var(--swap)' : (cached ? 'var(--primary)' : 'var(--text-muted)'));
      g.append('rect').attr('x', x).attr('y', y).attr('width', FW).attr('height', FH).attr('rx', 8)
        .attr('fill', fill).attr('fill-opacity', lost || resent || cached ? 0.24 : 0.08)
        .attr('stroke', stroke).attr('stroke-width', 2)
        .attr('stroke-dasharray', cached ? '6,4' : '');
      txt(g, x + FW / 2, y + 32, '帧 ' + i, stroke === 'var(--border)' ? 'var(--text)' : stroke, 13, 'middle', '700');
      if (lost) {
        ln(g, x + 12, y + 10, x + FW - 12, y + FH - 10, 'var(--danger)', 2.6);
        ln(g, x + FW - 12, y + 10, x + 12, y + FH - 10, 'var(--danger)', 2.6);
      }
      if (cached) txt(g, x + FW / 2, y - 8, '已缓存', 'var(--primary)', 11, 'middle', '600');
      if (resent) txt(g, x + FW / 2, y - 8, '重传', 'var(--swap)', 11, 'middle', '600');
    }
    function winBar(x1, x2, y, color, label) {
      g.append('rect').attr('x', x1).attr('y', y).attr('width', x2 - x1).attr('height', 8).attr('rx', 4)
        .attr('fill', color).attr('fill-opacity', 0.55);
      txt(g, (x1 + x2) / 2, y - 6, label, color, 11.5, 'middle', '600');
    }

    lane('发送方', yS, 'var(--primary)');
    lane('接收方', yR, 'var(--success)');

    for (let i = 0; i < 8; i++) {
      frame(i, yS, { resent: (f === 2 && i >= 2 && i <= 5) });
      frame(i, yR, {
        lost: (f >= 1 && i === 2),
        cached: ((f === 3 || f === 4) && (i === 3 || i === 4 || i === 5))
      });
    }

    if (f === 0) {
      winBar(fx(0) - 4, fx(3) + FW + 4, yS - 22, 'var(--primary)', '发送窗口 0~3');
      winBar(fx(0) - 4, fx(3) + FW + 4, yR + FH + 22, 'var(--success)', '接收窗口 0~3');
      txt(g, 470, 200, '窗口大小 = 4，最多允许 4 个未确认帧同时在途', 'var(--text-muted)', 13, 'middle', '600');
      txt(g, 470, 224, '序号在 0~7 之间循环复用（模 8）', 'var(--text-muted)', 12, 'middle');
    }

    if (f === 1) {
      txt(g, fx(2) + FW / 2, yS + FH + 24, '✖ 丢失', 'var(--danger)', 12, 'middle', '700');
      txt(g, fx(4) + FW / 2, 200, '3、4、5 帧正常到达，但序号不连续', 'var(--highlight)', 12.5, 'middle', '600');
      winBar(fx(4) - 4, fx(7) + FW + 4, yR + FH + 22, 'var(--success)', '接收窗口仍停在 4');
    }

    if (f === 2) {
      txt(g, 470, 196, '接收方丢弃 3、4、5（乱序帧），回送 ACK2（期望 2）', 'var(--danger)', 12.5, 'middle', '600');
      arw(g, fx(5) + FW / 2, yS + FH + 14, fx(2) + FW / 2, yS + FH + 14, 'var(--swap)');
      txt(g, (fx(5) + fx(2)) / 2 + FW / 2, yS + FH + 34, '超时 → 从 2 起全部重发（2,3,4,5）', 'var(--swap)', 12, 'middle', '600');
      txt(g, 470, 330, '重传 4 帧，其中 3 帧是白干的 —— 窗口越大浪费越严重', 'var(--danger)', 12.5, 'middle');
    }

    if (f === 3) {
      txt(g, 470, 196, '接收方缓存 3、4、5，只回送 NAK2 / ACK1（请求重发 2）', 'var(--primary)', 12.5, 'middle', '600');
      arw(g, fx(3) + FW / 2, yS + FH + 14, fx(2) + FW / 2, yS + FH + 14, 'var(--swap)');
      txt(g, fx(3) + FW / 2, yS + FH + 34, '只重发 2', 'var(--swap)', 12, 'middle', '600');
      txt(g, 470, 330, '重传 1 帧 → 效率最高；代价是接收方必须有缓存 + 发送方逐帧计时', 'var(--success)', 12.5, 'middle', '600');
    }

    if (f === 4) {
      winBar(fx(4) - 4, fx(7) + FW + 4, yR + FH + 22, 'var(--success)', '接收窗口滑到 4~7');
      winBar(fx(4) - 4, fx(7) + FW + 4, yS - 22, 'var(--primary)', '发送窗口滑到 4~7');
      arw(g, fx(2) + FW / 2, yR - 18, fx(5) + FW / 2, yR - 18, 'var(--success)');
      txt(g, 470, 200, '收到 2 之后，2~5 已连续 → 一次性按序交付上层，窗口整体前移', 'var(--success)', 12.5, 'middle', '600');
      txt(g, 470, 336, '关键：SR 的接收窗口 > 1，才可能缓存乱序帧', 'var(--highlight)', 12.5, 'middle', '600');
    }

    if (f === 5) {
      const rows = [
        ['重传范围', '出错帧及其后全部', '仅出错的那一帧'],
        ['接收缓存', '不需要（直接丢弃）', '必须缓存乱序帧'],
        ['确认方式', '累积确认', '逐帧确认（NAK/ACK）'],
        ['信道利用率', '差（大量重复）', '好（只补缺失）'],
        ['实现复杂度', '简单', '复杂（计时器 + 缓存）']
      ];
      txt(g, 120, 84, '对比项', 'var(--primary-strong)', 13, 'start', '700');
      txt(g, 330, 84, 'GBN 后退 N 帧', 'var(--danger)', 13, 'start', '700');
      txt(g, 620, 84, 'SR 选择重传', 'var(--success)', 13, 'start', '700');
      for (let i = 0; i < 5; i++) {
        const y = 96 + i * 54;
        g.append('rect').attr('x', 110).attr('y', y).attr('width', 700).attr('height', 46).attr('rx', 8)
          .attr('fill', i % 2 ? 'var(--bg-elevated)' : 'var(--border)').attr('fill-opacity', 0.35)
          .attr('stroke', 'var(--border)').attr('stroke-width', 1);
        txt(g, 124, y + 29, rows[i][0], 'var(--text)', 12.5, 'start', '600');
        txt(g, 330, y + 29, rows[i][1], 'var(--text-muted)', 12.5, 'start');
        txt(g, 620, y + 29, rows[i][2], 'var(--text)', 12.5, 'start');
      }
    }
  }
});

/* ==================== CN-167 路由算法 ==================== */
items.push({
  id: 'CN-167',
  steps: [
    { focus: 0, desc: '先看拓扑：6 个路由器、9 条链路，链路上的数字是「代价」' },
    { focus: 1, desc: '静态路由：路由表由管理员手工写死，拓扑一变就失效' },
    { focus: 2, desc: '距离向量（RIP）：只和邻居交换「我到各点的距离」，反复迭代收敛' },
    { focus: 3, desc: '链路状态（OSPF）：把本链路状态泛洪到全网，人人拥有完整拓扑图' },
    { focus: 4, desc: '拿到全网拓扑后跑 Dijkstra：逐轮把最近的结点并入集合 S' },
    { focus: 5, desc: '对比：RIP 简单但收敛慢（跳数≤15），OSPF 收敛快、支持大型网络' }
  ],
  draw: function (g, W, H, f) {
    const C = ['var(--primary)', 'var(--success)', 'var(--highlight)', 'var(--danger)'];
    const head = ['网络拓扑与链路代价', '静态路由：手工配置', '距离向量：邻居间迭代', '链路状态：泛洪 LSP', 'Dijkstra 逐轮扩展', 'RIP vs OSPF'];
    title(g, head[f]);

    const N = {
      A: [96, 300], B: [96, 140], C: [280, 220],
      D: [450, 140], E: [450, 300], F: [640, 220]
    };
    const E = [['A', 'B', 5], ['A', 'C', 2], ['B', 'C', 3], ['B', 'D', 4], ['C', 'D', 6], ['C', 'E', 7], ['D', 'E', 2], ['D', 'F', 5], ['E', 'F', 3]];
    const active = { A: 0, B: 5, C: 2, D: 8, E: 9, F: 12 };

    // 拓扑（所有步都画，作为背景）
    E.forEach(function (e) {
      const p = N[e[0]], q = N[e[1]];
      const hot = (f === 2 || f === 4);
      ln(g, p[0], p[1], q[0], q[1], hot ? 'var(--primary)' : 'var(--border)', hot ? 2.6 : 2);
      txt(g, (p[0] + q[0]) / 2 + 6, (p[1] + q[1]) / 2 - 6, e[2], 'var(--highlight)', 12, 'middle', '700');
    });
    Object.keys(N).forEach(function (k) {
      const p = N[k];
      const isS = (f === 4) && active[k] !== undefined;
      circ(g, p[0], p[1], 21, isS ? 'var(--primary)' : 'var(--bg-elevated)', isS ? 'var(--primary)' : 'var(--border)', 2.4);
      txt(g, p[0], p[1] + 5, k, isS ? '#fff' : 'var(--text)', 13, 'middle', '700');
      if (f === 4) txt(g, p[0], p[1] - 28, active[k], 'var(--highlight)', 11.5, 'middle', '700');
    });
    txt(g, 368, 372, 'Dijkstra 中：结点上方数字 = 当前最短距离', 'var(--text-muted)', 11, 'middle');

    if (f <= 1) {
      // 右侧：A 的路由表
      const tx = 700;
      txt(g, tx, 84, 'A 的路由表', 'var(--primary-strong)', 13, 'middle', '700');
      const rw = [['目的', '下一跳', '代价'], ['B', 'B', '5'], ['C', 'C', '2'], ['D', 'B', '9'], ['E', 'C', '9'], ['F', 'B', '14']];
      rw.forEach(function (r, i) {
        const y = 96 + i * 40;
        g.append('rect').attr('x', tx - 78).attr('y', y).attr('width', 156).attr('height', 34).attr('rx', 6)
          .attr('fill', i ? 'var(--bg-elevated)' : 'var(--primary)').attr('fill-opacity', i ? 0.5 : 0.85)
          .attr('stroke', 'var(--border)').attr('stroke-width', 1);
        r.forEach(function (t, j) {
          txt(g, tx - 60 + j * 58, y + 23, t, i ? 'var(--text)' : '#fff', 12, 'start', '600');
        });
      });
      if (f === 1) txt(g, tx, 372, '拓扑一变，表就作废', 'var(--danger)', 11.5, 'middle', '600');
    }

    if (f === 2) {
      const tx = 700;
      txt(g, tx, 84, 'A 的距离向量（到各点）', 'var(--primary-strong)', 12.5, 'middle', '700');
      const cols = ['', 'B', 'C', 'D', 'E', 'F'];
      const rows = [['A', 5, 2, 8, 9, 12], ['B', 0, 3, 4, 7, 9], ['C', 3, 0, 6, 7, 10]];
      cols.forEach(function (c, j) { txt(g, tx - 96 + j * 38, 104, c, 'var(--text-muted)', 11.5, 'middle', '700'); });
      rows.forEach(function (r, i) {
        const y = 112 + i * 34;
        r.forEach(function (v, j) {
          const isA = i === 0 && j > 0;
          txt(g, tx - 96 + j * 38, y + 18, v, isA ? 'var(--highlight)' : 'var(--text)', 12, 'middle', isA ? '700' : '400');
        });
      });
      txt(g, tx - 30, 244, 'D_A(y) = min { c(A,v) + D_v(y) }', 'var(--success)', 12, 'middle', '600');
      const steps3 = ['第1轮：A 抄邻居 B、C 的表', '第2轮：发现 A→E 可走 C：2+7=9', '第3轮：数值不再变化 → 收敛'];
      txt(g, tx - 10, 282, steps3[0], 'var(--text-muted)', 11.5, 'middle');
      txt(g, tx - 10, 304, steps3[1], 'var(--text-muted)', 11.5, 'middle');
      txt(g, tx - 10, 326, steps3[2], 'var(--success)', 11.5, 'middle', '600');
      txt(g, tx - 10, 356, '只跟邻居说话 → 收敛慢，坏消息传得慢', 'var(--danger)', 11, 'middle');
    }

    if (f === 3) {
      for (let i = 0; i < 4; i++) {
        const p = N[['A', 'B', 'C', 'D'][i]];
        for (let k = 0; k < 3; k++) {
          circ(g, p[0] + 26 + k * 9, p[1] - 26, 5, 'var(--highlight)');
        }
      }
      const tx = 700;
      txt(g, tx, 84, '泛洪后的链路状态数据库', 'var(--primary-strong)', 12.5, 'middle', '700');
      const ls = ['A: B(5), C(2)', 'B: A(5), C(3), D(4)', 'C: A(2), B(3), D(6), E(7)', 'D: B(4), C(6), E(2), F(5)', 'E: C(7), D(2), F(3)', 'F: D(5), E(3)'];
      ls.forEach(function (t, i) {
        g.append('rect').attr('x', tx - 100).attr('y', 96 + i * 36).attr('width', 200).attr('height', 30).attr('rx', 6)
          .attr('fill', 'var(--bg-elevated)').attr('fill-opacity', 0.55).attr('stroke', 'var(--border)').attr('stroke-width', 1);
        txt(g, tx - 90, 96 + i * 36 + 20, t, 'var(--text)', 11.5, 'start');
      });
      txt(g, tx, 336, '每个结点都拿到「同一张全网地图」', 'var(--success)', 11.5, 'middle', '600');
      txt(g, tx, 360, '泛洪量大，但只在拓扑变化时才发', 'var(--text-muted)', 11, 'middle');
    }

    if (f === 4) {
      const tx = 690;
      txt(g, tx + 40, 84, 'Dijkstra 扩展顺序（源 A）', 'var(--primary-strong)', 13, 'middle', '700');
      const seq = [['A', 0], ['C', 2], ['B', 5], ['D', 8], ['E', 9], ['F', 12]];
      seq.forEach(function (s, i) {
        const y = 100 + i * 44;
        g.append('rect').attr('x', tx - 40).attr('y', y).attr('width', 150).attr('height', 36).attr('rx', 7)
          .attr('fill', 'var(--primary)').attr('fill-opacity', 0.14 + i * 0.05).attr('stroke', 'var(--primary)').attr('stroke-width', 1.4);
        txt(g, tx - 20, y + 24, 'S' + (i + 1) + '：并入 ' + s[0], 'var(--text)', 12, 'start', '600');
        txt(g, tx + 96, y + 24, 'd=' + s[1], 'var(--highlight)', 12, 'end', '700');
      });
      txt(g, tx + 40, 372, '每次挑「未访问中 d 最小」的点 → 贪心即最优', 'var(--success)', 11.5, 'middle', '600');
    }

    if (f === 5) {
      const rows = [
        ['算法类型', '距离向量（DV）', '链路状态（LS）'],
        ['代表协议', 'RIP', 'OSPF / IS-IS'],
        ['交换内容', '我到所有点的距离', '我的直连链路状态'],
        ['交换范围', '仅邻居', '泛洪全网'],
        ['收敛速度', '慢（坏消息传得慢）', '快（立刻重算 SPF）'],
        ['规模', '小网（跳数 ≤ 15）', '大型网络 / 分区域']
      ];
      txt(g, 120, 84, '对比项', 'var(--primary-strong)', 13, 'start', '700');
      txt(g, 340, 84, 'RIP（DV）', 'var(--highlight)', 13, 'start', '700');
      txt(g, 600, 84, 'OSPF（LS）', 'var(--success)', 13, 'start', '700');
      for (let i = 0; i < 6; i++) {
        const y = 96 + i * 44;
        txt(g, 120, y + 26, rows[i][0], 'var(--text-muted)', 12, 'start', '600');
        txt(g, 340, y + 26, rows[i][1], 'var(--text)', 12, 'start');
        txt(g, 600, y + 26, rows[i][2], 'var(--text)', 12, 'start');
      }
      g.append('line').attr('x1', 110).attr('y1', 88).attr('x2', 840).attr('y2', 88).attr('stroke', 'var(--border)').attr('stroke-width', 1.5);
    }
  }
});

/* ==================== OS-137 磁盘调度 ==================== */
items.push({
  id: 'OS-137',
  steps: [
    { focus: 0, desc: '磁头当前在 53 号磁道，请求队列：98,183,37,122,14,124,65,67 —— 怎么排顺序？' },
    { focus: 1, desc: 'FCFS 先来先服务：按到达顺序走，公平但磁头来回跳（共 640 磁道）' },
    { focus: 2, desc: 'SSTF 最短寻道优先：每次挑最近的，236 磁道，但可能「饿死」远端请求' },
    { focus: 3, desc: 'SCAN 电梯算法：一路扫到头再折返，331 磁道，兼顾效率与公平' },
    { focus: 4, desc: 'C-SCAN 循环扫描：只单向服务，回程直接跳回 0，382 磁道但等待更均匀' },
    { focus: 5, desc: '四种算法总寻道长度对比 + SSD 时代：没有机械臂，FCFS 反而最合适' }
  ],
  draw: function (g, W, H, f) {
    const C = ['var(--primary)', 'var(--success)', 'var(--highlight)', 'var(--danger)'];
    const head = ['请求队列与初始磁头位置', 'FCFS 先来先服务（640）', 'SSTF 最短寻道优先（236）', 'SCAN 电梯算法（331）', 'C-SCAN 循环扫描（382）', '四种算法寻道量对比'];
    title(g, head[f]);

    const X = function (t) { return 66 + t / 200 * 800; };
    const axisY = 74;
    arw(g, 60, axisY, 872, axisY, 'var(--text-muted)');
    [0, 50, 100, 150, 199].forEach(function (t) {
      ln(g, X(t), axisY - 6, X(t), axisY + 6, 'var(--text-muted)', 1.4);
      txt(g, X(t), axisY - 12, t, 'var(--text-muted)', 10.5, 'middle');
    });
    txt(g, 878, axisY + 4, '磁道', 'var(--text-muted)', 11, 'start');

    const req = [98, 183, 37, 122, 14, 124, 65, 67];

    function dots(list, color) {
      list.forEach(function (t) {
        circ(g, X(t), axisY + 22, 5, color);
      });
    }

    function path(seq, color) {
      let d = '';
      seq.forEach(function (t, i) {
        const x = X(t), y = 110 + i * 30;
        d += (i ? ' L ' : 'M ') + x.toFixed(1) + ' ' + y.toFixed(1);
      });
      g.append('path').attr('d', d).attr('fill', 'none').attr('stroke', color).attr('stroke-width', 2.4).attr('opacity', 0.9);
      seq.forEach(function (t, i) {
        const x = X(t), y = 110 + i * 30;
        circ(g, x, y, 4, color);
        txt(g, x + (i % 2 ? 10 : -10), y + 4, t, color, 10.5, i % 2 ? 'start' : 'end');
      });
    }

    if (f === 0) {
      dots(req, 'var(--highlight)');
      req.forEach(function (t, i) {
        txt(g, X(t), 62 + (i % 2) * 14, t, 'var(--highlight)', 10.5, 'middle');
      });
      g.append('path').attr('d', 'M ' + X(53) + ' 96 l -9 16 l 18 0 z').attr('fill', 'var(--danger)');
      txt(g, X(53), 128, '磁头 53', 'var(--danger)', 12, 'middle', '700');
      txt(g, 460, 300, '目标：让磁头移动的总磁道数最小 → 减少寻道时间', 'var(--primary-strong)', 13, 'middle', '600');
      txt(g, 460, 330, '磁盘访问时间 = 寻道时间 + 旋转延迟 + 传输时间，寻道是最大头', 'var(--text-muted)', 12, 'middle');
    }

    if (f === 1) {
      const seq = [53, 98, 183, 37, 122, 14, 124, 65, 67];
      dots(req, 'var(--border)');
      path(seq, 'var(--danger)');
      txt(g, 460, 366, '来回横跳：53→98→183→37→…→67，总寻道 640 磁道', 'var(--danger)', 12.5, 'middle', '600');
    }

    if (f === 2) {
      const seq = [53, 65, 67, 37, 14, 98, 122, 124, 183];
      dots(req, 'var(--border)');
      path(seq, 'var(--success)');
      txt(g, 460, 366, '每次就近：53→65→67→37→14→98→122→124→183，总寻道 236 磁道', 'var(--success)', 12.5, 'middle', '600');
    }

    if (f === 3) {
      const seq = [53, 65, 67, 98, 122, 124, 183, 199, 37, 14];
      dots(req, 'var(--border)');
      path(seq, 'var(--highlight)');
      ln(g, X(199), 96, X(199), 380, 'var(--highlight)', 1.2, '5,5');
      txt(g, X(199) - 6, 96, '到端才折返', 'var(--highlight)', 10.5, 'end');
      txt(g, 460, 392, '单向扫到 199 再反向：总寻道 146 + 185 = 331 磁道', 'var(--highlight)', 12.5, 'middle', '600');
    }

    if (f === 4) {
      const seq = [53, 65, 67, 98, 122, 124, 183, 199, 0, 14, 37];
      dots(req, 'var(--border)');
      path(seq, 'var(--primary)');
      ln(g, X(0), 96, X(0), 392, 'var(--primary)', 1.2, '5,5');
      txt(g, X(0) + 6, 100, '直接跳回 0', 'var(--primary)', 10.5, 'start');
      txt(g, 460, 392, '只单向服务，回程空跑：146 + 199 + 37 = 382 磁道，但等待更均匀', 'var(--primary)', 12.5, 'middle', '600');
    }

    if (f === 5) {
      const data = [['FCFS', 640, 'var(--danger)'], ['SSTF', 236, 'var(--success)'], ['SCAN', 331, 'var(--highlight)'], ['C-SCAN', 382, 'var(--primary)']];
      const max = 700;
      data.forEach(function (d, i) {
        const y = 110 + i * 58;
        txt(g, 120, y + 16, d[0], d[2], 13, 'end', '700');
        g.append('rect').attr('x', 132).attr('y', y).attr('width', d[1] / max * 560).attr('height', 30).attr('rx', 6)
          .attr('fill', d[2]).attr('fill-opacity', 0.35).attr('stroke', d[2]).attr('stroke-width', 1.6);
        txt(g, 140 + d[1] / max * 560, y + 21, d[1] + ' 磁道', d[2], 12, 'start', '700');
      });
      txt(g, 132, 366, 'SSD 无机械臂：寻道时间≈0，调度算法几乎无意义，FCFS 足够', 'var(--success)', 12.5, 'start', '600');
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
