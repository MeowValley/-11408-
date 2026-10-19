module.exports = [
  {
    id: 'CN-174', level: 'C', title: '传输层提供的服务',
    intuition: '网络层把分组送到「主机」，但主机上同时跑着浏览器、微信、下载器——<strong>传输层负责把数据交给正确的进程</strong>，提供「端到端（进程到进程）」的逻辑通信。它的四大功能：<strong>复用与分用</strong>（用 16 位端口号区分应用）、<strong>差错控制</strong>（校验和）、<strong>流量控制</strong>（别淹死接收方）、<strong>连接管理</strong>（TCP 三次握手/四次挥手）。两种服务形态：TCP（面向连接、可靠、字节流）和 UDP（无连接、不可靠、报文）。端口号 16 位：0~1023 熟知端口（HTTP 80、DNS 53）、1024~49151 登记端口、49152~65535 客户端临时端口。',
    derivation: [
      '\\text{传输层} = \\text{端到端（进程到进程）}; \\quad \\text{网络层} = \\text{点到点（主机到主机）}',
      '\\text{端口号}: \\; 16\\ \\text{bit}, \\; 0 \\sim 65535',
      '\\text{复用}: \\; \\text{多个应用进程共用传输层} \\;|\\; \\text{分用}: \\; \\text{按端口交付给进程}',
      '\\text{TCP}: \\; \\text{面向连接} + \\text{可靠} + \\text{字节流} + \\text{全双工}',
      '\\text{UDP}: \\; \\text{无连接} + \\text{不可靠} + \\text{面向报文}'
    ],
    exam_text: '<b>【2017 真题改编】</b>传输层与网络层的根本区别是什么？端口号的作用是什么？',
    exam_answer: '答案：网络层提供<strong>主机到主机</strong>（点到点）的通信，只负责把分组送到目的主机；传输层提供<strong>进程到进程</strong>（端到端）的通信，用<strong>端口号</strong>区分同一主机上的不同应用进程。端口号是 16 位整数：0~1023 为熟知端口（如 HTTP=80、DNS=53、FTP=21），1024~49151 为登记端口，49152~65535 为客户端临时端口。',
    pitfalls: [
      '端口号标识的是「进程/应用」，不是主机——IP 定位主机，端口定位进程，二者合起来才唯一确定一个通信端点。',
      'TCP 是「面向字节流」：把数据看成无结构的字节序列，不保留发送方 write 的边界；UDP 是「面向报文」，一次发一个报文，接收方一次收一个。',
      '「复用」是发送方多个进程共用传输层，「分用」是接收方按端口把数据分给不同进程——同一件事的两个方向，别写反。'
    ],
    quiz: [
      { question: '传输层提供的是哪种通信？', options: ['主机到主机', '进程到进程', '网络到网络'], correct: 1 },
      { question: 'HTTP 使用的熟知端口号是？', options: ['21', '53', '80'], correct: 2 },
      { question: 'TCP 与 UDP 的本质区别之一是？', options: ['TCP 面向字节流，UDP 面向报文', 'TCP 无连接，UDP 面向连接', 'TCP 不可靠，UDP 可靠'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '网络层只把数据送到主机，传输层才把数据交给具体进程（端到端）' },
      { focus: 1, desc: '端口号 16 位：熟知端口 0~1023、登记端口 1024~49151、临时端口 49152~65535' },
      { focus: 2, desc: '复用：发送方多个应用进程共用同一个传输层，各自带源端口' },
      { focus: 3, desc: '分用：接收方按目的端口把数据交付给对应进程' },
      { focus: 4, desc: 'TCP 与 UDP：一个可靠有连接，一个轻量无连接，按应用需求选择' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['端到端通信', '端口号', '复用', '分用', 'TCP vs UDP'][f]);
      if (f === 0) {
        chip(g, 80, 120, 160, 60, '主机 A', 'var(--primary)', 'IP: 10.0.0.1');
        chip(g, 660, 120, 160, 60, '主机 B', 'var(--success)', 'IP: 10.0.0.2');
        ln(g, 240, 150, 660, 150, 'var(--border)', 2);
        txt(g, 450, 120, '网络层：IP 分组 → 只认主机地址', 'var(--text-muted)', 12);
        box(g, 260, 230, 160, 50, 'var(--primary)', 0.12);
        txt(g, 340, 260, '进程 A1（浏览器）', 'var(--text)', 12);
        box(g, 480, 230, 160, 50, 'var(--success)', 0.12);
        txt(g, 560, 260, '进程 B1（Web 服务）', 'var(--text)', 12);
        arw(g, 340, 280, 480, 280, 'var(--highlight)');
        txt(g, 410, 305, '传输层：端口 50001 → 80', 'var(--highlight)', 12, 'middle', '700');
        txt(g, 450, 350, '网络层管「到哪台机器」，传输层管「交给哪个程序」', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        const rows = [
          ['0 ~ 1023', '熟知端口', 'HTTP 80 / DNS 53 / FTP 21 / SMTP 25', 'var(--danger)'],
          ['1024 ~ 49151', '登记端口', '需向 IANA 登记，如 3306 MySQL', 'var(--highlight)'],
          ['49152 ~ 65535', '客户端临时端口', '操作系统动态分配，连接结束即释放', 'var(--success)']
        ];
        rows.forEach(function (r, i) {
          const y = 70 + i * 90;
          box(g, 80, y, 740, 76, r[3], 0.08);
          txt(g, 105, y + 32, r[0], r[3], 15, 'start', '700');
          txt(g, 320, y + 32, r[1], 'var(--text)', 14, 'start', '700');
          txt(g, 105, y + 58, r[2], 'var(--text-muted)', 12, 'start');
        });
        txt(g, 450, 360, '端口号 16 位 → 一台主机最多 65536 个通信端点', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        ['浏览器', '微信', '下载器'].forEach(function (n, i) {
          box(g, 100, 70 + i * 80, 150, 54, 'var(--primary)', 0.12);
          txt(g, 175, 103 + i * 80, n, 'var(--text)', 12);
          arw(g, 250, 97 + i * 80, 360, 190, 'var(--primary)', '4,3');
        });
        box(g, 360, 160, 180, 70, 'var(--highlight)', 0.15);
        txt(g, 450, 190, '传输层', 'var(--highlight)', 15, 'middle', '700');
        txt(g, 450, 214, '加源端口号', 'var(--text-muted)', 11);
        arw(g, 540, 195, 660, 195, 'var(--highlight)');
        box(g, 660, 160, 170, 70, 'var(--success)', 0.12);
        txt(g, 745, 190, 'IP 层', 'var(--success)', 14, 'middle', '700');
        txt(g, 745, 214, '统一封装发送', 'var(--text-muted)', 11);
        txt(g, 450, 300, '发送方：多路应用 → 一个传输层 → 一个网络层', 'var(--text-muted)', 12);
        txt(g, 450, 330, '靠「源端口号」区分是谁发的', 'var(--primary-strong)', 13, 'middle', '700');
      }
      if (f === 3) {
        box(g, 80, 150, 200, 80, 'var(--success)', 0.12);
        txt(g, 180, 183, '接收方传输层', 'var(--success)', 14, 'middle', '700');
        txt(g, 180, 208, '按目的端口分用', 'var(--text-muted)', 11);
        const apps = [[':80 Web 服务', 640, 60, 'var(--primary)'], [':53 DNS 服务', 640, 150, 'var(--highlight)'], [':3306 数据库', 640, 240, 'var(--swap)']];
        apps.forEach(function (a) {
          box(g, a[1], a[2], 200, 56, a[3], 0.12);
          txt(g, a[1] + 100, a[2] + 33, a[0], 'var(--text)', 12);
          arw(g, 280, 190, a[1], a[2] + 28, a[3], '5,3');
        });
        txt(g, 450, 340, '目的端口 = 80 → 交 Web；= 53 → 交 DNS；= 3306 → 交数据库', 'var(--text-muted)', 12);
      }
      if (f === 4) {
        box(g, 70, 60, 360, 250, 'var(--primary)', 0.08);
        txt(g, 250, 95, 'TCP', 'var(--primary-strong)', 17, 'middle', '700');
        ['面向连接（三次握手）', '可靠（确认+重传）', '字节流、无边界', '流量/拥塞控制', '全双工'].forEach(function (s, i) {
          txt(g, 100, 135 + i * 32, '· ' + s, 'var(--text)', 12, 'start');
        });
        box(g, 470, 60, 360, 250, 'var(--success)', 0.08);
        txt(g, 650, 95, 'UDP', 'var(--success)', 17, 'middle', '700');
        ['无连接', '不可靠（尽最大努力）', '面向报文、保留边界', '无流量/拥塞控制', '支持广播/组播'].forEach(function (s, i) {
          txt(g, 500, 135 + i * 32, '· ' + s, 'var(--text)', 12, 'start');
        });
        txt(g, 450, 345, '选择依据：要可靠选 TCP，要快/实时选 UDP', 'var(--highlight)', 12.5, 'middle', '700');
      }
    }
  },
  {
    id: 'CN-175', level: 'C', title: 'UDP 协议',
    intuition: 'UDP 是传输层最「轻」的协议：<strong>首部只有 8 字节</strong>（源端口 2B + 目的端口 2B + 长度 2B + 校验和 2B），无连接、不可靠、面向报文。它不握手、不确认、不重传、不拥塞控制，把「可靠性」全部推给应用层。换来的是：开销极小、延迟极低、支持一对一/一对多/多对一/多对多。所以 DNS（一次请求一个响应）、DHCP、SNMP、RIP、实时音视频（丢几帧没关系，别卡）都用它。',
    derivation: [
      '\\text{UDP 首部} = \\underbrace{2B}_{\\text{源端口}} + \\underbrace{2B}_{\\text{目的端口}} + \\underbrace{2B}_{\\text{长度}} + \\underbrace{2B}_{\\text{校验和}} = 8B',
      '\\text{长度字段} = \\text{首部} + \\text{数据}, \\; \\text{最小} = 8',
      '\\text{伪首部}: \\; \\text{源IP}(4) + \\text{目的IP}(4) + \\text{保留}(1) + \\text{协议}(1) + \\text{UDP长度}(2) = 12B',
      '\\text{校验和}: \\; \\text{首部} + \\text{数据} + \\text{伪首部} \\; (\\text{仅用于计算，不传输})'
    ],
    exam_text: '<b>【2019 真题改编】</b>UDP 首部长度是多少？「长度」字段的最小值是多少？校验和计算为什么要加伪首部？',
    exam_answer: '答案：UDP 首部固定 <b>8 字节</b>（源端口 2 + 目的端口 2 + 长度 2 + 校验和 2）。长度字段 = 首部 + 数据，最小值 <b>8</b>（数据为 0 时）。计算校验和时加 12 字节<b>伪首部</b>：包含源/目的 IP、协议号、UDP 长度，目的是让 UDP 能校验「这个报文是不是真的发给了正确的主机和协议」——伪首部只参与计算，不随报文传输。',
    pitfalls: [
      '长度字段包含首部（8 字节），不是只算数据长度——计算时要减 8 才是数据长度。',
      '伪首部只用于校验和计算，不会真的出现在 UDP 报文里，抓包看不到它。',
      'UDP 校验和是可选的（IPv4 中可置 0 表示不校验），但 IPv6 中必须计算。'
    ],
    quiz: [
      { question: 'UDP 首部长度是？', options: ['8 字节', '20 字节', '可变'], correct: 0 },
      { question: 'UDP 长度字段的最小值是？', options: ['0', '8', '20'], correct: 1 },
      { question: 'UDP 校验和计算时加入伪首部的目的是？', options: ['增加可靠性重传', '校验目的主机和协议正确性', '加密数据'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: 'UDP 首部 8 字节：源端口 + 目的端口 + 长度 + 校验和' },
      { focus: 1, desc: '无连接：不握手、不确认，直接发——开销最小的传输方式' },
      { focus: 2, desc: '面向报文：应用给一个报文就发一个，不合并不拆分' },
      { focus: 3, desc: '校验和与伪首部：覆盖 IP 地址，防止「送错门」' },
      { focus: 4, desc: '典型应用：DNS / DHCP / SNMP / RIP / 实时音视频' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['UDP 首部', '无连接', '面向报文', '校验和', '典型应用'][f]);
      if (f === 0) {
        const parts = [
          ['源端口', '2 B', 80, 150, 'var(--primary)'],
          ['目的端口', '2 B', 230, 150, 'var(--success)'],
          ['长度', '2 B', 380, 100, 'var(--highlight)'],
          ['校验和', '2 B', 480, 120, 'var(--swap)'],
          ['数据', '应用报文', 600, 220, 'var(--text-muted)']
        ];
        parts.forEach(function (p) {
          box(g, p[2], 140, p[3], 80, p[4], 0.1);
          txt(g, p[2] + p[3] / 2, 172, p[0], p[4], 13, 'middle', '700');
          txt(g, p[2] + p[3] / 2, 198, p[1], 'var(--text-muted)', 11);
        });
        txt(g, 450, 90, '固定 8 字节首部（对比 TCP 最少 20 字节）', 'var(--text)', 13);
        txt(g, 450, 280, '长度 = 首部 + 数据，最小 8（数据为 0）', 'var(--text-muted)', 12);
        txt(g, 450, 315, '首部开销仅 8 字节——UDP 的全部「管理成本」', 'var(--highlight)', 12.5, 'middle', '700');
      }
      if (f === 1) {
        chip(g, 100, 150, 200, 70, '应用层', 'var(--primary)', '直接交 UDP');
        chip(g, 600, 150, 200, 70, '网络层', 'var(--success)', '直接发出去');
        arw(g, 300, 185, 600, 185, 'var(--highlight)');
        txt(g, 450, 170, '无握手 · 无确认 · 无重传', 'var(--highlight)', 12, 'middle', '700');
        ['① 不建立连接', '② 不保证到达', '③ 不保证顺序', '④ 不做拥塞控制'].forEach(function (s, i) {
          txt(g, 90 + (i % 2) * 400, 280 + Math.floor(i / 2) * 40, s, 'var(--text)', 12.5, 'start');
        });
        txt(g, 450, 370, '好处：延迟低、开销小；坏处：可靠性要靠应用自己保证', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        txt(g, 450, 70, '应用层给几个报文，UDP 就发几个——边界完整保留', 'var(--text)', 13);
        ['报文1 100B', '报文2 200B', '报文3 50B'].forEach(function (n, i) {
          box(g, 80 + i * 250, 110, 220, 56, 'var(--primary)', 0.12);
          txt(g, 190 + i * 250, 143, n, 'var(--text)', 12);
        });
        ['UDP 报文1', 'UDP 报文2', 'UDP 报文3'].forEach(function (n, i) {
          box(g, 80 + i * 250, 220, 220, 56, 'var(--success)', 0.12);
          txt(g, 190 + i * 250, 253, n, 'var(--text)', 12);
          arw(g, 190 + i * 250, 166, 190 + i * 250, 220, 'var(--success)');
        });
        txt(g, 450, 320, '接收方一次 recvfrom 收到一个完整报文，不会「粘包」也不会被拆开', 'var(--text-muted)', 12);
        txt(g, 450, 352, '对比 TCP：字节流没有边界，应用要自己定协议分包', 'var(--highlight)', 12, 'middle', '700');
      }
      if (f === 3) {
        box(g, 60, 60, 780, 90, 'var(--highlight)', 0.08, 8);
        txt(g, 450, 88, '伪首部（12 B，仅参与校验和计算，不传输）', 'var(--highlight)', 13, 'middle', '700');
        ['源 IP 4B', '目的 IP 4B', '保留 1B', '协议 1B', 'UDP长度 2B'].forEach(function (n, i) {
          box(g, 80 + i * 150, 105, 140, 34, 'var(--highlight)', 0.15, 6);
          txt(g, 150 + i * 150, 127, n, 'var(--text)', 10.5);
        });
        box(g, 200, 200, 500, 70, 'var(--primary)', 0.1);
        txt(g, 450, 228, 'UDP 首部 + 数据', 'var(--primary-strong)', 13, 'middle', '700');
        txt(g, 450, 252, '（真实传输的部分）', 'var(--text-muted)', 11);
        arw(g, 450, 150, 450, 200, 'var(--highlight)');
        txt(g, 520, 178, '拼接后一起算反码和', 'var(--text-muted)', 11, 'start');
        txt(g, 450, 310, '作用：验证「报文确实发给了该 IP 上的 UDP」', 'var(--text-muted)', 12);
        txt(g, 450, 340, 'IP 层只校验首部，数据部分的错误靠 UDP/TCP 校验和发现', 'var(--highlight)', 12, 'middle', '700');
      }
      if (f === 4) {
        const apps = [
          ['DNS', '域名解析：一问一答，量小', 'var(--primary)'],
          ['DHCP', '自动分配 IP，广播交互', 'var(--success)'],
          ['SNMP', '网络管理轮询', 'var(--highlight)'],
          ['RIP', '路由信息广播（每30秒）', 'var(--swap)'],
          ['实时音视频', '丢帧可容忍，延迟不能忍', 'var(--danger)']
        ];
        apps.forEach(function (a, i) {
          const y = 60 + i * 58;
          box(g, 90, y, 720, 46, a[2], 0.1);
          txt(g, 110, y + 29, a[0], a[2], 13, 'start', '700');
          txt(g, 260, y + 29, a[1], 'var(--text)', 12, 'start');
        });
        txt(g, 450, 370, '规律：短报文、可容忍丢包、需要广播/组播 → 用 UDP', 'var(--text-muted)', 12);
      }
    }
  }
];
