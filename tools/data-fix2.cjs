/**
 * 升级批次 2：CO-70 寻址方式 / CO-81 总线仲裁 / CO-86 I/O 控制 / MA-118 抽样分布
 * 每个知识点的 draw 均为独立手写编排，互不共用渲染器。
 */
const R = require('./recovered.json');

const items = [];

/* ==================== CO-70 指令的寻址方式 ==================== */
items.push({
  id: 'CO-70',
  steps: [
    { focus: 0, desc: '指令格式：操作码 + 寻址特征 + 形式地址 A；寻址方式决定「A 怎么变成 EA」' },
    { focus: 1, desc: '立即寻址：#A —— 形式地址本身就是操作数，不访问主存，最快' },
    { focus: 2, desc: '直接寻址：EA = A —— 按 A 取一次主存，就拿到操作数' },
    { focus: 3, desc: '间接寻址：EA = (A) —— 主存里存的是「地址的地址」，要访存两次' },
    { focus: 4, desc: '寄存器寻址（0 次访存）与寄存器间接寻址（1 次访存）' },
    { focus: 5, desc: '变址 EA = A + (IX)、相对 EA = A + PC —— 支持数组与程序浮动' },
    { focus: 6, desc: '对比：访存次数越多越慢；立即/寄存器最快，间接最灵活也最慢' }
  ],
  draw: function (g, W, H, f) {
    const C = ['var(--primary)', 'var(--success)', 'var(--highlight)', 'var(--danger)'];
    const head = ['指令格式：A 只是「形式地址」', '立即寻址 #A（0 次访存）', '直接寻址 EA=A（1 次访存）', '间接寻址 EA=(A)（2 次访存）', '寄存器 / 寄存器间接', '变址与相对寻址', '七种寻址方式对比'];
    title(g, head[f]);

    function nb(x, y, w, h, label, sub, color) {
      g.append('rect').attr('x', x).attr('y', y).attr('width', w).attr('height', h).attr('rx', 10)
        .attr('fill', color).attr('fill-opacity', 0.16).attr('stroke', color).attr('stroke-width', 2);
      txt(g, x + w / 2, y + (sub ? h / 2 - 4 : h / 2 + 5), label, color, 13, 'middle', '700');
      if (sub) txt(g, x + w / 2, y + h / 2 + 16, sub, 'var(--text-muted)', 10.5);
    }
    function badge(x, y, s, color) {
      g.append('rect').attr('x', x).attr('y', y).attr('width', 152).attr('height', 30).attr('rx', 15)
        .attr('fill', color).attr('fill-opacity', 0.18).attr('stroke', color).attr('stroke-width', 1.4);
      txt(g, x + 76, y + 21, s, color, 12.5, 'middle', '700');
    }
    function chain(list, y) {
      const w = 132, gap = 28, x0 = 62;
      list.forEach(function (it, i) {
        nb(x0 + i * (w + gap), y, w, 56, it[0], it[1], it[2]);
        if (i < list.length - 1) arw(g, x0 + i * (w + gap) + w + 2, y + 28, x0 + (i + 1) * (w + gap) - 4, y + 28, 'var(--primary-strong)');
      });
      return x0 + list.length * (w + gap) - gap;
    }

    if (f === 0) {
      nb(90, 92, 210, 60, '操作码 OP', '做什么运算', 'var(--primary)');
      nb(312, 92, 170, 60, '寻址特征 M', '用哪种寻址方式', 'var(--highlight)');
      nb(494, 92, 300, 60, '形式地址 A', '不是最终地址，只是「线索」', 'var(--success)');
      arw(g, 452, 190, 452, 246, 'var(--highlight)');
      nb(300, 250, 300, 56, '有效地址 EA', '真正要去访问的地址', 'var(--success)');
      txt(g, 460, 342, '同一段机器码，M 不同 → 算出的 EA 不同 → 取到的操作数不同', 'var(--text-muted)', 12.5, 'middle');
      txt(g, 460, 368, '考点：先看 M 字段，再套对应公式算 EA', 'var(--primary-strong)', 12.5, 'middle', '600');
    }

    if (f === 1) {
      const end = chain([
        ['指令 A 字段', 'A = 5', 'var(--primary)'],
        ['操作数 = 5', '形式地址即操作数', 'var(--success)'],
        ['参与运算', 'ADD R1, #5', 'var(--highlight)']
      ], 150);
      badge(62, 246, '访存次数：0 次（最快）', 'var(--success)');
      txt(g, 460, 320, '优点：不用访存，速度最快；缺点：只能表示常量，范围受字段长度限制', 'var(--text-muted)', 12.5, 'middle');
      txt(g, 460, 350, '典型：循环计数、常量赋值、与立即数比较', 'var(--primary-strong)', 12, 'middle');
    }

    if (f === 2) {
      chain([
        ['指令 A = 104', '形式地址 A', 'var(--primary)'],
        ['EA = 104', '直接拿来当地址', 'var(--highlight)'],
        ['主存[104] = 7', '访存 ①：取出操作数', 'var(--success)'],
        ['操作数 7', '参与运算', 'var(--success)']
      ], 150);
      badge(62, 246, '访存次数：1 次', 'var(--highlight)');
      txt(g, 460, 320, '优点：简单、只需一次访存；缺点：寻址范围受地址字段位数限制，程序无法浮动', 'var(--text-muted)', 12.5, 'middle');
      txt(g, 460, 350, 'EA = A，是「最直白」的寻址', 'var(--primary-strong)', 12, 'middle');
    }

    if (f === 3) {
      chain([
        ['指令 A = 104', '形式地址', 'var(--primary)'],
        ['主存[104] = 120', '访存 ①：拿到「真地址」', 'var(--highlight)'],
        ['EA = 120', '再按 120 去访问', 'var(--highlight)'],
        ['主存[120] = 7', '访存 ②：取出操作数', 'var(--success)']
      ], 150);
      badge(62, 246, '访存次数：2 次（最慢）', 'var(--danger)');
      txt(g, 460, 320, '优点：EA 存在主存里可随时改 → 实现指针、函数指针、动态重定位', 'var(--text-muted)', 12.5, 'middle');
      txt(g, 460, 350, '缺点：多一次访存；若再间接一层（多重间接）还会更慢', 'var(--danger)', 12, 'middle');
    }

    if (f === 4) {
      g.append('rect').attr('x', 80).attr('y', 96).attr('width', 360).attr('height', 236).attr('rx', 12)
        .attr('fill', 'var(--primary)').attr('fill-opacity', 0.07).attr('stroke', 'var(--primary)').attr('stroke-width', 1.6);
      txt(g, 260, 122, '寄存器寻址：操作数就在寄存器里', 'var(--primary)', 12.5, 'middle', '700');
      nb(110, 140, 140, 52, '指令 R1', '寻址特征=寄存器', 'var(--primary)');
      arw(g, 254, 166, 288, 166, 'var(--primary-strong)');
      nb(292, 140, 130, 52, 'R1 = 7', '寄存器内容即操作数', 'var(--success)');
      txt(g, 260, 224, '0 次访存 —— 与立即寻址并列最快', 'var(--success)', 12, 'middle', '600');
      txt(g, 260, 252, '指令字短（只需 3~5 位寄存器号）', 'var(--text-muted)', 11.5, 'middle');
      txt(g, 260, 278, '常用于算术运算的操作数', 'var(--text-muted)', 11.5, 'middle');

      g.append('rect').attr('x', 470).attr('y', 96).attr('width', 360).attr('height', 236).attr('rx', 12)
        .attr('fill', 'var(--swap)').attr('fill-opacity', 0.07).attr('stroke', 'var(--swap)').attr('stroke-width', 1.6);
      txt(g, 650, 122, '寄存器间接：寄存器里存的是「地址」', 'var(--swap)', 12.5, 'middle', '700');
      nb(500, 140, 130, 52, '指令 R1', 'R1 内容是地址', 'var(--swap)');
      arw(g, 634, 166, 668, 166, 'var(--swap)');
      nb(672, 140, 130, 52, 'R1 = 120', '指向主存 120', 'var(--highlight)');
      arw(g, 737, 196, 737, 230, 'var(--swap)');
      nb(672, 232, 130, 52, '主存[120] = 7', '访存 1 次', 'var(--success)');
      txt(g, 650, 306, '1 次访存，比间接寻址少一次（地址在寄存器里）', 'var(--text-muted)', 12, 'middle');
    }

    if (f === 5) {
      g.append('rect').attr('x', 70).attr('y', 84).attr('width', 760).attr('height', 118).attr('rx', 12)
        .attr('fill', 'var(--primary)').attr('fill-opacity', 0.06).attr('stroke', 'var(--primary)').attr('stroke-width', 1.4);
      txt(g, 92, 108, '变址寻址：EA = A + (IX)', 'var(--primary)', 13, 'start', '700');
      nb(120, 124, 120, 50, 'A = 1000', '数组首地址', 'var(--primary)');
      txt(g, 258, 154, '+', 'var(--text)', 20, 'middle', '700');
      nb(276, 124, 120, 50, 'IX = 4', '变址寄存器（可改）', 'var(--highlight)');
      txt(g, 414, 154, '=', 'var(--text)', 20, 'middle', '700');
      nb(432, 124, 130, 50, 'EA = 1004', '第 2 个元素', 'var(--success)');
      txt(g, 586, 146, 'A 不变、IX 变 →', 'var(--text-muted)', 11.5, 'start');
      txt(g, 586, 166, '天然适合遍历数组', 'var(--success)', 11.5, 'start', '600');

      g.append('rect').attr('x', 70).attr('y', 218).attr('width', 760).attr('height', 118).attr('rx', 12)
        .attr('fill', 'var(--swap)').attr('fill-opacity', 0.06).attr('stroke', 'var(--swap)').attr('stroke-width', 1.4);
      txt(g, 92, 242, '相对寻址：EA = A + (PC)', 'var(--swap)', 13, 'start', '700');
      nb(120, 258, 120, 50, 'A = +8', '带符号位移量', 'var(--swap)');
      txt(g, 258, 288, '+', 'var(--text)', 20, 'middle', '700');
      nb(276, 258, 120, 50, 'PC = 2000', '当前指令地址', 'var(--highlight)');
      txt(g, 414, 288, '=', 'var(--text)', 20, 'middle', '700');
      nb(432, 258, 130, 50, 'EA = 2008', '跳转目标', 'var(--success)');
      txt(g, 586, 280, '位移量与位置无关 →', 'var(--text-muted)', 11.5, 'start');
      txt(g, 586, 300, '程序整体搬家仍能跳对（浮动）', 'var(--swap)', 11.5, 'start', '600');
      txt(g, 460, 366, '考点：变址面向「数组/循环」，相对面向「转移指令/程序浮动」', 'var(--primary-strong)', 12, 'middle', '600');
    }

    if (f === 6) {
      const rows = [
        ['立即寻址', 'A 就是操作数', '0', '常量、计数'],
        ['寄存器寻址', 'R 的内容', '0', '算术运算操作数'],
        ['直接寻址', 'EA = A', '1', '简单变量'],
        ['寄存器间接', 'EA = (R)', '1', '指针（地址在寄存器）'],
        ['间接寻址', 'EA = (A)', '2', '指针、动态重定位'],
        ['变址寻址', 'EA = A + (IX)', '1~2', '数组、循环遍历'],
        ['相对寻址', 'EA = A + (PC)', '1', '转移指令、程序浮动']
      ];
      txt(g, 86, 84, '寻址方式', 'var(--primary-strong)', 12.5, 'start', '700');
      txt(g, 250, 84, '有效地址 EA', 'var(--primary-strong)', 12.5, 'start', '700');
      txt(g, 470, 84, '访存次数', 'var(--primary-strong)', 12.5, 'start', '700');
      txt(g, 620, 84, '典型用途', 'var(--primary-strong)', 12.5, 'start', '700');
      for (let i = 0; i < 7; i++) {
        const y = 94 + i * 40;
        const col = i < 2 ? 'var(--success)' : (i === 4 ? 'var(--danger)' : 'var(--primary)');
        g.append('rect').attr('x', 76).attr('y', y).attr('width', 748).attr('height', 34).attr('rx', 6)
          .attr('fill', col).attr('fill-opacity', 0.1).attr('stroke', 'var(--border)').attr('stroke-width', 1);
        txt(g, 86, y + 22, rows[i][0], col, 12, 'start', '700');
        txt(g, 250, y + 22, rows[i][1], 'var(--text)', 12, 'start');
        txt(g, 480, y + 22, rows[i][2], col, 12, 'middle', '700');
        txt(g, 620, y + 22, rows[i][3], 'var(--text-muted)', 12, 'start');
      }
    }
  }
});

/* ==================== CO-81 总线仲裁与控制 ==================== */
items.push({
  id: 'CO-81',
  steps: [
    { focus: 0, desc: '多台主设备共享一组总线 —— 同一时刻只能有一个主设备控制总线' },
    { focus: 1, desc: '链式查询：BG 线串行穿过各设备，离仲裁器越近优先级越高，线少但可靠性差' },
    { focus: 2, desc: '计数器定时查询：仲裁器按计数值轮询设备号，优先级可编程、较公平' },
    { focus: 3, desc: '独立请求：每台设备一对 BR/BG 线，响应最快，但线数随设备数线性增长' },
    { focus: 4, desc: '三种仲裁方式对比：线数 / 速度 / 灵活性 / 可靠性' },
    { focus: 5, desc: '总线通信控制：同步（统一时钟）vs 异步（握手），决定传输的可靠性与速度' }
  ],
  draw: function (g, W, H, f) {
    const C = ['var(--primary)', 'var(--success)', 'var(--highlight)', 'var(--danger)'];
    const head = ['多主设备共享总线', '链式查询（菊花链）', '计数器定时查询', '独立请求', '三种仲裁方式对比', '同步通信 vs 异步通信'];
    title(g, head[f]);

    const devY = [92, 158, 224, 290];
    const devName = ['设备 0', '设备 1', '设备 2', '设备 3'];

    function devices(active) {
      devName.forEach(function (n, i) {
        const y = devY[i];
        const on = active === i;
        g.append('rect').attr('x', 60).attr('y', y).attr('width', 118).attr('height', 48).attr('rx', 8)
          .attr('fill', on ? 'var(--highlight)' : 'var(--primary)').attr('fill-opacity', on ? 0.35 : 0.12)
          .attr('stroke', on ? 'var(--highlight)' : 'var(--primary)').attr('stroke-width', 2);
        txt(g, 119, y + 30, n, on ? 'var(--highlight)' : 'var(--text)', 12.5, 'middle', '700');
        ln(g, 178, y + 24, 236, y + 24, 'var(--border)', 2);
      });
    }
    function arbiter(x, y, label) {
      g.append('rect').attr('x', x).attr('y', y).attr('width', 150).attr('height', 70).attr('rx', 10)
        .attr('fill', 'var(--highlight)').attr('fill-opacity', 0.16).attr('stroke', 'var(--highlight)').attr('stroke-width', 2);
      txt(g, x + 75, y + 34, '总线仲裁器', 'var(--highlight)', 13, 'middle', '700');
      txt(g, x + 75, y + 54, label || 'BR / BG', 'var(--text-muted)', 11, 'middle');
    }
    function busLine(x) {
      ln(g, x, 70, x, 350, 'var(--success)', 5);
      txt(g, x, 60, '总线', 'var(--success)', 11, 'middle', '600');
    }

    if (f === 0) {
      devices(-1);
      busLine(250);
      arbiter(90, 350 - 40 - 300, '决定「谁用总线」');
      // 覆盖：仲裁器放到上方
      g.append('rect').attr('x', 90).attr('y', 8).attr('width', 0).attr('height', 0);
      txt(g, 250, 378, '同一时刻只允许一个主设备驱动总线，否则数据冲突', 'var(--danger)', 12, 'middle', '600');
      txt(g, 640, 120, '共享资源 → 必须仲裁', 'var(--primary-strong)', 14, 'middle', '700');
      txt(g, 640, 152, '仲裁要解决：', 'var(--text-muted)', 12, 'middle');
      txt(g, 640, 178, '① 谁先获得使用权（优先级）', 'var(--text)', 12, 'middle');
      txt(g, 640, 204, '② 怎么通知它「总线上你了」', 'var(--text)', 12, 'middle');
      txt(g, 640, 230, '③ 用完怎么释放', 'var(--text)', 12, 'middle');
    }

    if (f === 1) {
      devices(1);
      busLine(250);
      arbiter(560, 60, '链式查询');
      // BR：各设备到仲裁器的请求线（共用一根）
      ln(g, 236, devY[0] + 24, 236, devY[3] + 24, 'var(--danger)', 2);
      ln(g, 236, devY[1] + 24, 300, devY[1] + 24, 'var(--danger)', 2, '4,4');
      arw(g, 300, devY[1] + 24, 556, 96, 'var(--danger)', '4,4');
      txt(g, 430, 132, 'BR（共用请求线）', 'var(--danger)', 11, 'middle');
      // BG 菊花链
      let py = devY[0] + 12;
      let d = 'M 560 84 L 520 84';
      py = devY[0] + 12;
      d += ' L 520 ' + py + ' L 196 ' + py;
      for (let i = 1; i < 4; i++) d += ' L 196 ' + (devY[i] + 12) + ' L 520 ' + (devY[i] + 12);
      g.append('path').attr('d', d).attr('fill', 'none').attr('stroke', 'var(--success)').attr('stroke-width', 2);
      txt(g, 430, 76, 'BG（串行传递）', 'var(--success)', 11, 'middle', '600');
      txt(g, 640, 250, '离仲裁器越近优先级越高', 'var(--highlight)', 12.5, 'middle', '700');
      txt(g, 640, 276, '线数最少（2 根），但一处断线后面全废', 'var(--text-muted)', 11.5, 'middle');
      txt(g, 640, 302, '增删设备会影响优先级', 'var(--text-muted)', 11.5, 'middle');
    }

    if (f === 2) {
      devices(2);
      busLine(250);
      arbiter(560, 60, '计数器定时查询');
      ln(g, 236, 96, 236, 314, 'var(--highlight)', 2);
      arw(g, 236, 200, 556, 100, 'var(--highlight)', '4,4');
      txt(g, 420, 140, '设备地址线（共用）', 'var(--highlight)', 11, 'middle');
      txt(g, 640, 220, '仲裁器计数器从 0 开始 +1', 'var(--primary-strong)', 12.5, 'middle', '700');
      txt(g, 640, 248, '计数值送到所有设备比对', 'var(--text)', 11.5, 'middle');
      txt(g, 640, 274, '命中者置忙碌 → 获得总线', 'var(--success)', 11.5, 'middle');
      txt(g, 640, 302, '优先级可由计数初值改变（较灵活）', 'var(--text-muted)', 11.5, 'middle');
      txt(g, 640, 328, '线数 ≈ log₂n + 2，比独立请求省', 'var(--text-muted)', 11.5, 'middle');
    }

    if (f === 3) {
      devices(0);
      busLine(250);
      arbiter(560, 60, '独立请求');
      for (let i = 0; i < 4; i++) {
        const y = devY[i] + 24;
        g.append('path').attr('d', 'M 236 ' + y + ' L 520 ' + y + ' L 520 ' + (96 + i * 8) + ' L 556 ' + (96 + i * 8))
          .attr('fill', 'none').attr('stroke', C[i]).attr('stroke-width', 1.8).attr('opacity', 0.85);
        txt(g, 300, y - 6, 'BR' + i + ' / BG' + i, C[i], 10, 'start');
      }
      txt(g, 640, 250, '每台设备一对独立请求/授权线', 'var(--primary-strong)', 12.5, 'middle', '700');
      txt(g, 640, 276, '响应最快，优先级可灵活设置', 'var(--success)', 11.5, 'middle');
      txt(g, 640, 302, '线数 = 2n，设备多时布线爆炸', 'var(--danger)', 11.5, 'middle');
      txt(g, 640, 328, '可靠性最高：一根线坏不影响别人', 'var(--text-muted)', 11.5, 'middle');
    }

    if (f === 4) {
      const rows = [
        ['链式查询', '2 根（BR+BG）', '慢（逐级传播）', '差（固定优先级）', '差（断线即瘫痪）'],
        ['计数器定时', '≈ log₂n + 2', '中', '较好（可编程）', '较好'],
        ['独立请求', '2n 根', '快（并行）', '好（可编程）', '好']
      ];
      txt(g, 80, 92, '方式', 'var(--primary-strong)', 12.5, 'start', '700');
      txt(g, 220, 92, '线数', 'var(--primary-strong)', 12.5, 'start', '700');
      txt(g, 400, 92, '速度', 'var(--primary-strong)', 12.5, 'start', '700');
      txt(g, 560, 92, '灵活性', 'var(--primary-strong)', 12.5, 'start', '700');
      txt(g, 720, 92, '可靠性', 'var(--primary-strong)', 12.5, 'start', '700');
      for (let i = 0; i < 3; i++) {
        const y = 108 + i * 74;
        g.append('rect').attr('x', 70).attr('y', y).attr('width', 760).attr('height', 62).attr('rx', 8)
          .attr('fill', C[i]).attr('fill-opacity', 0.12).attr('stroke', C[i]).attr('stroke-width', 1.6);
        for (let j = 0; j < 5; j++) {
          txt(g, [80, 220, 400, 560, 720][j], y + 38, rows[i][j], j === 0 ? C[i] : 'var(--text)', 12, 'start', j === 0 ? '700' : '400');
        }
      }
      txt(g, 450, 356, '记忆：链式线最少、独立请求最快、计数器居中', 'var(--highlight)', 12, 'middle', '600');
    }

    if (f === 5) {
      // 同步时序
      txt(g, 90, 88, '同步通信：统一时钟，按时钟节拍传', 'var(--primary)', 12.5, 'start', '700');
      let d = '';
      for (let i = 0; i < 10; i++) {
        const x = 90 + i * 62;
        d += 'M ' + x + ' 106 L ' + x + ' 106 L ' + x + ' 106 ';
      }
      // 时钟波形
      let clk = 'M 90 150';
      for (let i = 0; i < 5; i++) {
        const x = 90 + i * 120;
        clk += ' L ' + x + ' 150 L ' + x + ' 124 L ' + (x + 60) + ' 124 L ' + (x + 60) + ' 150';
      }
      g.append('path').attr('d', clk).attr('fill', 'none').attr('stroke', 'var(--highlight)').attr('stroke-width', 2);
      txt(g, 72, 156, 'CLK', 'var(--highlight)', 11, 'end');
      // 数据
      g.append('rect').attr('x', 90).attr('y', 176).attr('width', 160).attr('height', 30).attr('rx', 4)
        .attr('fill', 'var(--primary)').attr('fill-opacity', 0.3).attr('stroke', 'var(--primary)').attr('stroke-width', 1.6);
      txt(g, 170, 196, '地址', 'var(--primary)', 11.5, 'middle', '600');
      g.append('rect').attr('x', 270).attr('y', 176).attr('width', 200).attr('height', 30).attr('rx', 4)
        .attr('fill', 'var(--success)').attr('fill-opacity', 0.3).attr('stroke', 'var(--success)').attr('stroke-width', 1.6);
      txt(g, 370, 196, '数据', 'var(--success)', 11.5, 'middle', '600');
      txt(g, 90, 232, '优点：协议简单、速度快；缺点：必须按最慢设备定节拍，长线时钟偏斜', 'var(--text-muted)', 11.5, 'start');

      // 异步时序
      txt(g, 90, 282, '异步通信：不靠时钟，靠「请求-回答」握手', 'var(--swap)', 12.5, 'start', '700');
      arw(g, 90, 314, 250, 314, 'var(--danger)');
      txt(g, 170, 306, '请求 REQ', 'var(--danger)', 11, 'middle', '600');
      arw(g, 260, 330, 420, 330, 'var(--success)');
      txt(g, 340, 322, '回答 ACK', 'var(--success)', 11, 'middle', '600');
      arw(g, 430, 314, 590, 314, 'var(--danger)');
      txt(g, 510, 306, '撤销 REQ', 'var(--danger)', 11, 'middle', '600');
      arw(g, 600, 330, 760, 330, 'var(--success)');
      txt(g, 680, 322, '撤销 ACK', 'var(--success)', 11, 'middle', '600');
      txt(g, 90, 366, '不依赖时钟 → 可兼容快慢设备，但握手有额外延迟（三次/两次握手）', 'var(--text-muted)', 11.5, 'start');
    }
  }
});

/* ==================== CO-86 I/O 控制方式 ==================== */
items.push({
  id: 'CO-86',
  steps: [
    { focus: 0, desc: 'I/O 通路的四层结构：CPU ↔ 内存 ↔ I/O 接口 ↔ 外设，全部挂在系统总线上' },
    { focus: 1, desc: '程序查询：CPU 死循环读状态寄存器，「设备没好我就一直问」——CPU 利用率极低' },
    { focus: 2, desc: '程序中断：设备就绪后主动发中断，CPU 停下手中活去服务——CPU 不再空转' },
    { focus: 3, desc: 'DMA：DMA 控制器接管总线，内存与设备直接成块搬运，CPU 只在首尾介入' },
    { focus: 4, desc: 'CPU 开销对比：查询 ≈ 100%、中断 ≈ 30%、DMA ≈ 5%（数据量越大差距越明显）' }
  ],
  draw: function (g, W, H, f) {
    const C = ['var(--primary)', 'var(--success)', 'var(--highlight)', 'var(--danger)'];
    const head = ['I/O 系统的四层结构', '程序查询方式：CPU 忙等', '程序中断方式：设备主动找 CPU', 'DMA 方式：控制器直接搬块', '三种方式 CPU 开销对比'];
    title(g, head[f]);

    function blk(x, y, w, h, label, sub, color, on) {
      g.append('rect').attr('x', x).attr('y', y).attr('width', w).attr('height', h).attr('rx', 10)
        .attr('fill', color).attr('fill-opacity', on ? 0.3 : 0.12).attr('stroke', color).attr('stroke-width', on ? 2.6 : 1.8);
      txt(g, x + w / 2, y + (sub ? h / 2 - 2 : h / 2 + 6), label, color, 13, 'middle', '700');
      if (sub) txt(g, x + w / 2, y + h / 2 + 18, sub, 'var(--text-muted)', 10.5);
    }

    const CPU = [60, 120, 170, 84], MEM = [290, 120, 170, 84], IOI = [520, 120, 170, 84], DEV = [740, 120, 120, 84];

    if (f === 0) {
      blk(CPU[0], CPU[1], CPU[2], CPU[3], 'CPU', '执行程序', 'var(--primary)', true);
      blk(MEM[0], MEM[1], MEM[2], MEM[3], '主存', '数据缓冲区', 'var(--success)', false);
      blk(IOI[0], IOI[1], IOI[2], IOI[3], 'I/O 接口', '数据/状态/控制寄存器', 'var(--highlight)', false);
      blk(DEV[0], DEV[1], DEV[2], DEV[3], '外设', '磁盘/键盘/网卡', 'var(--danger)', false);
      ln(g, 230, 162, 288, 162, 'var(--text-muted)', 2.4);
      ln(g, 460, 162, 518, 162, 'var(--text-muted)', 2.4);
      ln(g, 690, 162, 738, 162, 'var(--text-muted)', 2.4);
      // 系统总线
      ln(g, 80, 280, 830, 280, 'var(--primary-strong)', 5);
      txt(g, 455, 268, '系统总线（数据 / 地址 / 控制）', 'var(--primary-strong)', 12, 'middle', '600');
      [145, 375, 605].forEach(function (x) { ln(g, x, 204, x, 280, 'var(--primary-strong)', 2); });
      ln(g, 780, 204, 780, 280, 'var(--danger)', 2, '4,4');
      txt(g, 455, 330, 'I/O 控制的本质：谁来做「数据搬运」这件事 —— CPU 还是专门硬件？', 'var(--text-muted)', 12.5, 'middle');
      txt(g, 455, 358, '三种方式 = 搬运工作的三种分工方案', 'var(--highlight)', 12.5, 'middle', '600');
    }

    if (f === 1) {
      blk(CPU[0], CPU[1], CPU[2], CPU[3], 'CPU', '不停读状态', 'var(--primary)', true);
      blk(IOI[0], IOI[1], IOI[2], IOI[3], '状态寄存器', 'READY = 0/1', 'var(--highlight)', true);
      blk(DEV[0], DEV[1], DEV[2], DEV[3], '外设', '慢速设备', 'var(--danger)', false);
      arw(g, 232, 148, 516, 148, 'var(--highlight)');
      txt(g, 374, 138, '① 读状态（轮询）', 'var(--highlight)', 11.5, 'middle', '600');
      arw(g, 518, 176, 234, 176, 'var(--danger)');
      txt(g, 374, 196, '② 未就绪 → 继续问（死循环）', 'var(--danger)', 11.5, 'middle');
      arw(g, 690, 162, 738, 162, 'var(--text-muted)');
      txt(g, 714, 152, '数据', 'var(--text-muted)', 10.5, 'middle');
      // 循环箭头
      g.append('path').attr('d', 'M 145 208 C 60 250, 60 120, 143 122').attr('fill', 'none')
        .attr('stroke', 'var(--danger)').attr('stroke-width', 2).attr('stroke-dasharray', '6,4');
      txt(g, 62, 340, 'while (READY == 0);  // CPU 空转', 'var(--danger)', 12, 'start', '600');
      txt(g, 62, 366, 'CPU 与设备「串行」工作，设备慢 → CPU 被拖住，利用率可低至百分之几', 'var(--text-muted)', 11.5, 'start');
    }

    if (f === 2) {
      blk(CPU[0], CPU[1], CPU[2], CPU[3], 'CPU', '正常执行程序', 'var(--primary)', true);
      blk(IOI[0], IOI[1], IOI[2], IOI[3], 'I/O 接口', '就绪 → 发中断请求', 'var(--highlight)', true);
      blk(DEV[0], DEV[1], DEV[2], DEV[3], '外设', '准备好数据', 'var(--danger)', false);
      arw(g, 690, 162, 738, 162, 'var(--text-muted)');
      arw(g, 518, 132, 232, 132, 'var(--danger)');
      txt(g, 374, 122, '① 中断请求 IRQ', 'var(--danger)', 11.5, 'middle', '600');
      arw(g, 232, 192, 516, 192, 'var(--success)');
      txt(g, 374, 212, '② 中断响应 → 转入中断服务程序取数据', 'var(--success)', 11.5, 'middle', '600');
      txt(g, 62, 300, '设备工作期间 CPU 可以去干别的活 → 并行', 'var(--primary-strong)', 12, 'start', '600');
      txt(g, 62, 328, '代价：每次传送都要「保存现场 / 恢复现场」，适合小批量、随机请求', 'var(--text-muted)', 11.5, 'start');
      txt(g, 62, 356, '关键：中断隐指令保存 PC 与 PSW，中断向量表找到服务程序入口', 'var(--text-muted)', 11.5, 'start');
    }

    if (f === 3) {
      blk(CPU[0], 100, 150, 80, 'CPU', '只做初始化', 'var(--primary)', false);
      blk(280, 100, 150, 80, '主存', '缓冲区', 'var(--success)', true);
      blk(490, 100, 170, 80, 'DMA 控制器', '接管总线搬块', 'var(--highlight)', true);
      blk(710, 100, 140, 80, '外设', '磁盘等块设备', 'var(--danger)', false);
      ln(g, 430, 140, 488, 140, 'var(--highlight)', 4);
      ln(g, 660, 140, 708, 140, 'var(--highlight)', 4);
      txt(g, 459, 130, '直接', 'var(--highlight)', 10.5, 'middle');
      txt(g, 684, 130, '直接', 'var(--highlight)', 10.5, 'middle');
      // 总线请求
      arw(g, 490, 196, 232, 196, 'var(--danger)');
      txt(g, 360, 216, 'HOLD 请求总线 / HLDA 让出总线', 'var(--danger)', 11.5, 'middle', '600');
      txt(g, 62, 268, '① CPU 初始化 DMA（源、目的、长度），然后放手', 'var(--text)', 12, 'start');
      txt(g, 62, 294, '② DMA 控制器申请总线，获得后成块搬运，不经过 CPU 寄存器', 'var(--text)', 12, 'start');
      txt(g, 62, 320, '③ 搬完发中断通知 CPU —— 一次中断处理一整块', 'var(--text)', 12, 'start');
      txt(g, 62, 352, '适合磁盘、网卡等「高速块设备」；周期挪用/停止 CPU 访存是两种典型时序', 'var(--text-muted)', 11.5, 'start');
      txt(g, 62, 378, '注意：DMA 传送仍要占用总线（周期挪用），不是「完全不占 CPU 时间」', 'var(--highlight)', 11.5, 'start', '600');
    }

    if (f === 4) {
      const data = [['程序查询', 100, 'var(--danger)'], ['程序中断', 30, 'var(--highlight)'], ['DMA', 5, 'var(--success)']];
      data.forEach(function (d, i) {
        const y = 110 + i * 76;
        txt(g, 150, y + 22, d[0], d[2], 13, 'end', '700');
        g.append('rect').attr('x', 164).attr('y', y).attr('width', d[1] / 100 * 520).attr('height', 40).attr('rx', 6)
          .attr('fill', d[2]).attr('fill-opacity', 0.32).attr('stroke', d[2]).attr('stroke-width', 1.8);
        txt(g, 174 + d[1] / 100 * 520, y + 27, d[1] + '%', d[2], 13, 'start', '700');
      });
      ln(g, 164, 356, 684, 356, 'var(--border)', 1.6);
      txt(g, 164, 380, 'CPU 用于 I/O 的时间占比（示意，随设备速度与数据量变化）', 'var(--text-muted)', 11.5, 'start');
      txt(g, 720, 140, '结论：', 'var(--primary-strong)', 12.5, 'middle', '700');
      txt(g, 720, 168, '数据量大 → DMA', 'var(--success)', 11.5, 'middle');
      txt(g, 720, 192, '随机小量 → 中断', 'var(--highlight)', 11.5, 'middle');
      txt(g, 720, 216, '简单低速 → 查询', 'var(--danger)', 11.5, 'middle');
    }
  }
});

/* ==================== MA-118 抽样分布 ==================== */
items.push({
  id: 'MA-118',
  steps: [
    { focus: 0, desc: '从正态总体 N(μ,σ²) 中抽样本，构造统计量 —— 统计量的分布叫「抽样分布」' },
    { focus: 1, desc: 'χ² 分布：n 个标准正态的平方和，自由度 n；右偏，n 越大越对称' },
    { focus: 2, desc: 't 分布：Z 除以 √(χ²/n)，比正态「尾巴更厚」，n→∞ 才趋于正态' },
    { focus: 3, desc: 'F 分布：两个 χ² 各自除自由度再相除，右偏，用于比较两个方差' },
    { focus: 4, desc: '三个分布的用途：χ² 估方差、t 检验均值、F 检验方差比' }
  ],
  draw: function (g, W, H, f) {
    const C = ['var(--primary)', 'var(--success)', 'var(--highlight)', 'var(--danger)'];
    const head = ['总体 → 样本 → 统计量', 'χ² 分布（卡方）', 't 分布（学生氏）', 'F 分布', '三大抽样分布的分工'];
    title(g, head[f]);

    function lgamma(z) {
      const c = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
      let x = z, y = z, t = x + 5.5;
      t -= (x + 0.5) * Math.log(t);
      let s = 1.000000000190015;
      for (let j = 0; j < 6; j++) { y += 1; s += c[j] / y; }
      return -t + Math.log(2.5066282746310005 * s / x);
    }
    function nrm(x) { return Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI); }
    function chi(x, k) {
      if (x <= 0) return 0;
      return Math.exp((k / 2 - 1) * Math.log(x) - x / 2 - (k / 2) * Math.LN2 - lgamma(k / 2));
    }
    function tpdf(x, v) {
      return Math.exp(lgamma((v + 1) / 2) - lgamma(v / 2)) / Math.sqrt(v * Math.PI) * Math.pow(1 + x * x / v, -(v + 1) / 2);
    }
    function fpdf(x, d1, d2) {
      if (x <= 0) return 0;
      return Math.exp(lgamma((d1 + d2) / 2) - lgamma(d1 / 2) - lgamma(d2 / 2)
        + (d1 / 2) * Math.log(d1 / d2) + (d1 / 2 - 1) * Math.log(x)
        - ((d1 + d2) / 2) * Math.log(1 + d1 * x / d2));
    }
    function axes(x0, y0, w, h, xlab) {
      ln(g, x0, y0, x0 + w + 12, y0, 'var(--text-muted)', 1.6);
      arw(g, x0 + w + 12, y0, x0 + w + 26, y0, 'var(--text-muted)');
      ln(g, x0, y0, x0, y0 - h - 10, 'var(--text-muted)', 1.6);
      arw(g, x0, y0 - h - 10, x0, y0 - h - 24, 'var(--text-muted)');
      txt(g, x0 + w + 30, y0 + 5, xlab, 'var(--text-muted)', 11, 'start');
    }

    if (f === 0) {
      // 总体曲线
      axes(70, 260, 300, 150, 'x');
      g.append('path').attr('d', (function () {
        let d = '';
        for (let i = 0; i <= 120; i++) {
          const t = i / 120, x = 70 + t * 300;
          const v = nrm((t - 0.5) * 8);
          const y = 260 - v / 0.4 * 150;
          d += (i ? ' L ' : 'M ') + x.toFixed(1) + ' ' + y.toFixed(1);
        }
        return d;
      })()).attr('fill', 'var(--primary)').attr('fill-opacity', 0.18).attr('stroke', 'var(--primary)').attr('stroke-width', 2.4);
      txt(g, 220, 292, '总体 X ~ N(μ, σ²)', 'var(--primary)', 12.5, 'middle', '600');
      txt(g, 220, 96, '已知 μ、σ²（或未知）', 'var(--text-muted)', 11.5, 'middle');

      // 抽样箭头
      arw(g, 392, 180, 452, 180, 'var(--highlight)');
      txt(g, 422, 168, '抽样', 'var(--highlight)', 11.5, 'middle', '600');

      // 样本
      box(g, 466, 96, 178, 168, 'var(--success)', 0.09);
      txt(g, 555, 122, '样本 X₁…Xₙ', 'var(--success)', 12.5, 'middle', '700');
      for (let i = 0; i < 5; i++) {
        circ(g, 500 + i * 30, 160 + (i % 2) * 22, 8, 'var(--success)');
      }
      txt(g, 555, 226, 'n 个独立同分布', 'var(--text-muted)', 11, 'middle');
      txt(g, 555, 248, '与总体同分布', 'var(--text-muted)', 11, 'middle');

      arw(g, 654, 180, 700, 180, 'var(--highlight)');
      txt(g, 677, 168, '构造', 'var(--highlight)', 11.5, 'middle', '600');

      box(g, 712, 96, 160, 168, 'var(--highlight)', 0.12);
      txt(g, 792, 122, '统计量', 'var(--highlight)', 12.5, 'middle', '700');
      txt(g, 792, 152, 'X̄ = ΣXi / n', 'var(--text)', 12, 'middle');
      txt(g, 792, 178, 'S² = Σ(Xi−X̄)²/(n−1)', 'var(--text)', 11.5, 'middle');
      txt(g, 792, 204, '(n−1)S²/σ²', 'var(--text)', 11.5, 'middle');
      txt(g, 792, 240, '统计量的分布', 'var(--highlight)', 11, 'middle');
      txt(g, 792, 260, '= 抽样分布', 'var(--highlight)', 11, 'middle');
      txt(g, 450, 356, '关键：统计量是随机变量 —— 每抽一次样就变一次，所以它有自己的分布', 'var(--text-muted)', 12, 'middle');
    }

    if (f === 1) {
      axes(80, 300, 470, 200, 'x');
      const ks = [[2, 'var(--primary)'], [4, 'var(--success)'], [6, 'var(--highlight)']];
      ks.forEach(function (kk) {
        let d = '';
        for (let i = 1; i <= 160; i++) {
          const xv = i / 160 * 14;
          const v = chi(xv, kk[0]) / 0.5;
          const x = 80 + i / 160 * 470, y = 300 - v * 200;
          d += (i === 1 ? 'M ' : ' L ') + x.toFixed(1) + ' ' + Math.min(y, 296).toFixed(1);
        }
        g.append('path').attr('d', d).attr('fill', 'none').attr('stroke', kk[1]).attr('stroke-width', 2.4);
        txt(g, 560, 110 + ks.indexOf(kk) * 26, 'χ²(' + kk[0] + ')', kk[1], 12, 'start', '700');
      });
      txt(g, 315, 328, '自由度 n 越大，峰值右移、曲线越对称（n>30 近似正态）', 'var(--text-muted)', 11.5, 'middle');
      txt(g, 660, 200, '构造：', 'var(--primary-strong)', 12.5, 'start', '700');
      txt(g, 660, 228, 'χ² = Σ (Xi−μ)²/σ² ~ χ²(n)', 'var(--text)', 11.5, 'start');
      txt(g, 660, 254, 'μ 未知时用 X̄ 代替：', 'var(--text-muted)', 11, 'start');
      txt(g, 660, 280, '(n−1)S²/σ² ~ χ²(n−1)', 'var(--success)', 11.5, 'start', '600');
      txt(g, 660, 320, '丢一个自由度，因为 S² 用掉了 X̄', 'var(--highlight)', 11, 'start');
      txt(g, 660, 348, '用途：方差 σ² 的区间估计与检验', 'var(--text-muted)', 11, 'start');
    }

    if (f === 2) {
      axes(80, 300, 470, 200, 'x');
      // 正态基准
      let dn = '';
      for (let i = 0; i <= 160; i++) {
        const xv = (i / 160 - 0.5) * 8;
        const x = 80 + i / 160 * 470, y = 300 - nrm(xv) / 0.42 * 200;
        dn += (i ? ' L ' : 'M ') + x.toFixed(1) + ' ' + y.toFixed(1);
      }
      g.append('path').attr('d', dn).attr('fill', 'none').attr('stroke', 'var(--text-muted)').attr('stroke-width', 1.8).attr('stroke-dasharray', '7,5');
      const vs = [[1, 'var(--danger)'], [5, 'var(--success)']];
      vs.forEach(function (vv) {
        let d = '';
        for (let i = 0; i <= 160; i++) {
          const xv = (i / 160 - 0.5) * 8;
          const x = 80 + i / 160 * 470, y = 300 - tpdf(xv, vv[0]) / 0.42 * 200;
          d += (i ? ' L ' : 'M ') + x.toFixed(1) + ' ' + Math.min(y, 296).toFixed(1);
        }
        g.append('path').attr('d', d).attr('fill', 'none').attr('stroke', vv[1]).attr('stroke-width', 2.4);
      });
      txt(g, 560, 110, '— — N(0,1)', 'var(--text-muted)', 11.5, 'start', '700');
      txt(g, 560, 136, '—— t(5)', 'var(--success)', 11.5, 'start', '700');
      txt(g, 560, 162, '—— t(1) 柯西分布', 'var(--danger)', 11.5, 'start', '700');
      txt(g, 315, 328, '自由度越小尾巴越厚 → 同样置信度下临界值更大', 'var(--text-muted)', 11.5, 'middle');
      txt(g, 660, 200, '构造：', 'var(--primary-strong)', 12.5, 'start', '700');
      txt(g, 660, 228, 't = Z / √(χ²(n)/n) ~ t(n)', 'var(--text)', 11.5, 'start');
      txt(g, 660, 254, '实用形式：', 'var(--text-muted)', 11, 'start');
      txt(g, 660, 280, '(X̄−μ)/(S/√n) ~ t(n−1)', 'var(--success)', 11.5, 'start', '600');
      txt(g, 660, 320, 'σ 未知、n 又小 → 必须用 t，不能硬套正态', 'var(--highlight)', 11, 'start');
      txt(g, 660, 348, 'n → ∞ 时 t(n) → N(0,1)', 'var(--text-muted)', 11, 'start');
    }

    if (f === 3) {
      axes(80, 300, 470, 200, 'x');
      const fs = [[5, 10, 'var(--primary)'], [10, 20, 'var(--success)'], [3, 30, 'var(--danger)']];
      fs.forEach(function (ff) {
        let d = '';
        for (let i = 1; i <= 200; i++) {
          const xv = i / 200 * 5;
          const v = fpdf(xv, ff[0], ff[1]) / 0.75;
          const x = 80 + i / 200 * 470, y = 300 - v * 200;
          d += (i === 1 ? 'M ' : ' L ') + x.toFixed(1) + ' ' + Math.max(Math.min(y, 296), 40).toFixed(1);
        }
        g.append('path').attr('d', d).attr('fill', 'none').attr('stroke', ff[2]).attr('stroke-width', 2.4);
        txt(g, 560, 110 + fs.indexOf(ff) * 26, 'F(' + ff[0] + ',' + ff[1] + ')', ff[2], 12, 'start', '700');
      });
      txt(g, 315, 328, '两个自由度共同决定形状；恒为右偏（取值 ≥ 0）', 'var(--text-muted)', 11.5, 'middle');
      txt(g, 660, 200, '构造：', 'var(--primary-strong)', 12.5, 'start', '700');
      txt(g, 660, 228, 'F = (χ²₁/n₁)/(χ²₂/n₂)', 'var(--text)', 11.5, 'start');
      txt(g, 660, 254, '实用形式：', 'var(--text-muted)', 11, 'start');
      txt(g, 660, 280, 'F = S₁²/S₂² ~ F(n₁−1, n₂−1)', 'var(--success)', 11.5, 'start', '600');
      txt(g, 660, 316, '重要性质：1/F ~ F(n₂−1, n₁−1)', 'var(--highlight)', 11, 'start');
      txt(g, 660, 344, '用途：两总体方差是否相等的检验', 'var(--text-muted)', 11, 'start');
    }

    if (f === 4) {
      const cards = [
        ['χ² 分布', 'Σ(Zi)²', '(n−1)S²/σ² ~ χ²(n−1)', '估方差 / 方差检验', 'var(--primary)'],
        ['t 分布', 'Z / √(χ²/n)', '(X̄−μ)/(S/√n) ~ t(n−1)', 'σ 未知时检验均值', 'var(--success)'],
        ['F 分布', '(χ²₁/n₁)/(χ²₂/n₂)', 'S₁²/S₂² ~ F(n₁−1,n₂−1)', '两个方差之比', 'var(--highlight)']
      ];
      cards.forEach(function (c, i) {
        const y = 84 + i * 96;
        g.append('rect').attr('x', 70).attr('y', y).attr('width', 760).attr('height', 82).attr('rx', 10)
          .attr('fill', c[4]).attr('fill-opacity', 0.1).attr('stroke', c[4]).attr('stroke-width', 1.8);
        txt(g, 92, y + 30, c[0], c[4], 14, 'start', '700');
        txt(g, 92, y + 56, '构造：' + c[1], 'var(--text-muted)', 11.5, 'start');
        txt(g, 330, y + 30, c[2], 'var(--text)', 12, 'start');
        txt(g, 330, y + 56, '用途：' + c[3], 'var(--text-muted)', 11.5, 'start');
        txt(g, 780, y + 48, '#' + (i + 1), c[4], 16, 'end', '700');
      });
      txt(g, 450, 372, '一根主线：正态 → 平方和得 χ² → 标准化相除得 t → 两个 χ² 相除得 F', 'var(--primary-strong)', 12, 'middle', '600');
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
