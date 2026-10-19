module.exports = [
  {
    id: 'CN-182', level: 'C', title: '网络应用模型（C/S、P2P）',
    intuition: '两大应用模型：<strong>C/S（客户/服务器）</strong>——服务器集中提供服务、客户机主动请求，如 Web、邮件；优点是管理集中、安全可控，缺点是服务器易成瓶颈、单点故障。<strong>P2P（对等）</strong>——每个结点既是客户又是服务器，如 BitTorrent、区块链；优点是去中心化、可扩展性强，缺点是管理困难、安全性差。混合模型（如 Napster）结合两者。',
    derivation: [
      '\\text{C/S}: \\; \\text{客户主动请求} \\to \\text{服务器响应}',
      '\\text{P2P}: \\; \\text{每个结点} = \\text{客户} + \\text{服务器}',
      '\\text{C/S 瓶颈}: \\; \\text{服务器带宽/处理能力}',
      '\\text{P2P 优势}: \\; \\text{结点越多，总容量越大}'
    ],
    exam_text: '<b>【2018 真题改编】</b>C/S 模型与 P2P 模型的根本区别是什么？',
    exam_answer: '答案：C/S 模型中角色<b>固定</b>——服务器只提供服务、客户机只请求服务，服务能力受服务器性能限制；P2P 模型中角色<b>对等</b>——每个结点既请求也提供，网络总服务能力随结点数增加而增长（可扩展性强）。代价是 P2P 难以管理、版权与安全问题突出。',
    pitfalls: [
      'P2P 中「对等」指角色对等，不表示所有结点性能相同。',
      'C/S 的瓶颈在服务器（带宽、并发），P2P 的瓶颈在结点上行带宽与查找效率。',
      '混合模型（集中索引 + P2P 传输）兼顾两者，Napster/BitTorrent 都用。'
    ],
    quiz: [
      { question: 'C/S 模型的主要缺点是？', options: ['服务器易成瓶颈', '无法集中管理', '安全性差'], correct: 0 },
      { question: 'P2P 模型中每个结点？', options: ['只是客户', '只是服务器', '既是客户又是服务器'], correct: 2 },
      { question: '下列属于 P2P 应用的是？', options: ['BitTorrent', 'HTTP 网站', 'SMTP 邮件'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: 'C/S：客户请求，服务器响应' },
      { focus: 1, desc: 'P2P：结点对等，互相提供服务' },
      { focus: 2, desc: '混合模型与选型' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['C/S 模型', 'P2P 模型', '混合模型'][f]);
      if (f === 0) {
        box(g, 360, 70, 180, 70, 'var(--primary)', 0.14);
        txt(g, 450, 112, '服务器', 'var(--primary-strong)', 15, 'middle', '700');
        [[200, 220], [450, 240], [700, 220]].forEach(function (p, i) {
          box(g, p[0] - 60, p[1] - 30, 120, 60, 'var(--success)', 0.1);
          txt(g, p[0], p[1] + 5, '客户 ' + (i + 1), 'var(--success)', 12, 'middle', '700');
          arw(g, p[0], p[1] - 34, 450, 144, 'var(--success)', '4,3');
        });
        txt(g, 450, 340, '客户主动请求；服务器被动响应，是性能瓶颈', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        const pts = [[220, 130], [450, 100], [680, 130], [300, 260], [600, 260]];
        pts.forEach(function (p, i) {
          circ(g, p[0], p[1], 26, 'var(--bg-panel)', 'var(--highlight)', 2.4);
          txt(g, p[0], p[1] + 5, 'N' + (i + 1), 'var(--highlight)', 12, 'middle', '700');
        });
        [[0, 1], [1, 2], [0, 3], [3, 1], [1, 4], [4, 2], [3, 4]].forEach(function (e) {
          ln(g, pts[e[0]][0], pts[e[0]][1], pts[e[1]][0], pts[e[1]][1], 'var(--border)', 1.6);
        });
        txt(g, 450, 340, '每个结点既可请求也可提供，全互联对等', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 340, 70, 220, 60, 'var(--primary)', 0.12);
        txt(g, 450, 106, '中心索引服务器', 'var(--primary-strong)', 13, 'middle', '700');
        [[220, 220], [450, 240], [680, 220]].forEach(function (p, i) {
          box(g, p[0] - 55, p[1] - 26, 110, 52, 'var(--success)', 0.1);
          txt(g, p[0], p[1] + 4, '结点 ' + (i + 1), 'var(--success)', 11.5, 'middle', '700');
          ln(g, p[0], p[1] - 28, 450, 132, 'var(--primary)', 1.2, '4,3');
        });
        ln(g, 220, 220, 680, 220, 'var(--highlight)', 2, '5,3');
        ln(g, 220, 220, 450, 240, 'var(--highlight)', 2, '5,3');
        txt(g, 450, 330, '中心只做索引，文件传输走 P2P', 'var(--text-muted)', 12);
      }
    }
  },
  {
    id: 'CN-183', level: 'B', title: 'DNS 域名系统',
    intuition: 'DNS 把域名翻译成 IP：<strong>分布式、层次型</strong>数据库。层次：根域名服务器（13 组）→ 顶级域 TLD（.com/.cn）→ 权威域名服务器。查询方式两种：<strong>递归查询</strong>（我只问一次，你负责问到底）、<strong>迭代查询</strong>（你告诉我下一步问谁）。DNS 用 UDP 53 端口，靠高速缓存减少查询。',
    derivation: [
      '\\text{层次}: \\; \\text{根} \\to \\text{顶级域 TLD} \\to \\text{权威服务器}',
      '\\text{递归}: \\; \\text{本机DNS代劳到底}',
      '\\text{迭代}: \\; \\text{返回下一跳地址，由查询者继续}',
      '\\text{端口}: \\; \\text{UDP 53} \\; (\\text{区域传送用 TCP 53})'
    ],
    exam_text: '<b>【2019 真题改编】</b>DNS 递归查询与迭代查询的区别是什么？',
    exam_answer: '答案：<b>递归查询</b>：查询者只发一次请求，被查询的 DNS 服务器负责一路问到最终答案再返回（「你帮我问到底」）；<b>迭代查询</b>：服务器只返回「下一步该问谁」的地址，查询者自己继续问。实际中：主机→本地 DNS 通常用递归，本地 DNS→根/TLD 用迭代。',
    pitfalls: [
      'DNS 默认用 UDP 53（快、无连接），区域传送等大响应才用 TCP 53。',
      '根域名服务器不是「一台」，而是 13 组集群（逻辑 13 个地址）。',
      '高速缓存会遵守 TTL，过期后重新查询——所以 DNS 修改不是立即全网生效。'
    ],
    quiz: [
      { question: 'DNS 默认使用的传输协议与端口是？', options: ['TCP 53', 'UDP 53', 'UDP 80'], correct: 1 },
      { question: '「你帮我问到底」属于？', options: ['递归查询', '迭代查询', '反向查询'], correct: 0 },
      { question: 'DNS 服务器的层次不包括？', options: ['根服务器', '顶级域服务器', '交换机'], correct: 2 }
    ],
    steps: [
      { focus: 0, desc: 'DNS 的作用：域名 → IP 地址' },
      { focus: 1, desc: '层次结构：根 → TLD → 权威服务器' },
      { focus: 2, desc: '递归 vs 迭代查询' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['域名解析', '层次结构', '递归与迭代'][f]);
      if (f === 0) {
        box(g, 120, 150, 220, 70, 'var(--primary)', 0.12);
        txt(g, 230, 192, 'www.example.com', 'var(--primary-strong)', 13, 'middle', '700');
        arw(g, 344, 185, 476, 185, 'var(--highlight)');
        txt(g, 410, 172, 'DNS 查询', 'var(--highlight)', 10.5, 'middle', '700');
        box(g, 480, 150, 280, 70, 'var(--success)', 0.12);
        txt(g, 620, 192, '93.184.216.34', 'var(--success)', 15, 'middle', '700');
        txt(g, 450, 300, 'DNS 是「互联网的电话簿」：名字 → 地址', 'var(--text-muted)', 12);
      }
      if (f === 1) {
        circ(g, 450, 80, 30, 'var(--bg-panel)', 'var(--primary)', 2.4);
        txt(g, 450, 86, '根', 'var(--primary-strong)', 13, 'middle', '700');
        [[280, 180, '.com'], [450, 180, '.cn'], [620, 180, '.org']].forEach(function (p) {
          circ(g, p[0], p[1], 28, 'var(--bg-panel)', 'var(--success)', 2.2);
          txt(g, p[0], p[1] + 5, p[2], 'var(--success)', 12, 'middle', '700');
          ln(g, 450, 110, p[0], p[1] - 28, 'var(--border)', 1.6);
        });
        [[190, 280, 'example.com'], [370, 280, 'baidu.cn'], [560, 280, 'wikipedia.org']].forEach(function (p) {
          box(g, p[0] - 80, p[1] - 24, 160, 48, 'var(--highlight)', 0.1);
          txt(g, p[0], p[1] + 4, p[2], 'var(--highlight)', 11, 'middle', '700');
        });
        ln(g, 280, 208, 190, 256, 'var(--border)', 1.4);
        ln(g, 450, 208, 370, 256, 'var(--border)', 1.4);
        ln(g, 620, 208, 560, 256, 'var(--border)', 1.4);
        txt(g, 450, 340, '根 → 顶级域 → 权威服务器，逐级委托', 'var(--text-muted)', 12);
      }
      if (f === 2) {
        box(g, 80, 70, 740, 90, 'var(--primary)', 0.08);
        txt(g, 450, 100, '递归：主机 → 本地DNS，本地DNS 负责问到底', 'var(--primary-strong)', 13, 'middle', '700');
        txt(g, 450, 128, '（主机只发一次请求）', 'var(--text-muted)', 10.5);
        box(g, 80, 175, 740, 90, 'var(--success)', 0.08);
        txt(g, 450, 205, '迭代：本地DNS → 根，根只回「去问 .com」', 'var(--success)', 13, 'middle', '700');
        txt(g, 450, 233, '（由本地DNS 自己继续追问）', 'var(--text-muted)', 10.5);
        txt(g, 450, 305, '实际组合：主机→本地DNS 递归；本地DNS→根/TLD 迭代', 'var(--highlight)', 12, 'middle', '700');
      }
    }
  },
  {
    id: 'CN-184', level: 'C', title: 'FTP 文件传输协议',
    intuition: 'FTP 用<strong>两条 TCP 连接</strong>：<strong>控制连接</strong>（21 端口，整个会话保持，传命令）与<strong>数据连接</strong>（20 端口或临时端口，每次传文件新建、传完即关）。两种模式：<strong>主动模式 PORT</strong>（服务器主动连客户端，易被防火墙拦）、<strong>被动模式 PASV</strong>（服务器开临时端口等客户端连，穿墙友好）。',
    derivation: [
      '\\text{控制连接}: \\; \\text{TCP 21, 持久, 传命令}',
      '\\text{数据连接}: \\; \\text{TCP 20/临时端口, 每文件一次}',
      '\\text{主动 PORT}: \\; \\text{服务器} \\to \\text{客户端（可能被防火墙挡）}',
      '\\text{被动 PASV}: \\; \\text{客户端} \\to \\text{服务器临时端口}'
    ],
    exam_text: '<b>【2016 真题改编】</b>FTP 为什么需要两条连接？控制连接传数据吗？',
    exam_answer: '答案：FTP 把「命令」与「数据」分离：控制连接在整个会话期间保持（传 USER/PASS/RETR/STOR 等命令与响应），数据连接仅为每次文件传输临时建立、传完关闭。这样设计的好处是控制信息不被大文件传输阻塞。<b>控制连接不传文件数据</b>，只传命令与应答（7 位 ASCII）。',
    pitfalls: [
      'FTP 的控制连接是「持久的」，数据连接是「一次一建」的——这是最常考的区别。',
      '主动模式下是服务器主动连客户端，容易客户端防火墙拦截；被动模式反之。',
      'FTP 明文传输账号密码，不安全；现在多用 SFTP/FTPS。'
    ],
    quiz: [
      { question: 'FTP 控制连接使用哪个端口？', options: ['20', '21', '80'], correct: 1 },
      { question: 'FTP 数据连接的特点是？', options: ['整个会话保持', '每次传输临时建立', '不存在'], correct: 1 },
      { question: '被动模式（PASV）由谁发起数据连接？', options: ['服务器', '客户端', '第三方'], correct: 1 }
    ],
    steps: [
      { focus: 0, desc: '双连接结构：控制 + 数据' },
      { focus: 1, desc: '端口：21 控制 / 20 数据' },
      { focus: 2, desc: '主动与被动模式' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['双连接', '端口分配', '主动与被动'][f]);
      box(g, 110, 130, 160, 100, 'var(--primary)', 0.1);
      txt(g, 190, 172, 'FTP 客户端', 'var(--primary-strong)', 13, 'middle', '700');
      txt(g, 190, 196, '用户界面', 'var(--text-muted)', 10.5);
      box(g, 630, 130, 160, 100, 'var(--success)', 0.1);
      txt(g, 710, 172, 'FTP 服务器', 'var(--success)', 13, 'middle', '700');
      txt(g, 710, 196, '文件系统', 'var(--text-muted)', 10.5);
      if (f >= 0) {
        ln(g, 270, 165, 630, 165, 'var(--highlight)', 2.4);
        txt(g, 450, 155, '控制连接 TCP 21（持久）', 'var(--highlight)', 11, 'middle', '700');
      }
      if (f >= 1) {
        ln(g, 270, 205, 630, 205, 'var(--swap)', 2.4, '6,4');
        txt(g, 450, 228, '数据连接 TCP 20 / 临时端口（每次传输）', 'var(--swap)', 11, 'middle', '700');
      }
      if (f === 2) {
        box(g, 80, 290, 360, 60, 'var(--primary)', 0.08);
        txt(g, 260, 315, '主动 PORT：服务器 → 客户端', 'var(--primary)', 11.5, 'middle', '700');
        txt(g, 260, 338, '可能被客户端防火墙拦截', 'var(--text-muted)', 10);
        box(g, 470, 290, 360, 60, 'var(--success)', 0.08);
        txt(g, 650, 315, '被动 PASV：客户端 → 服务器', 'var(--success)', 11.5, 'middle', '700');
        txt(g, 650, 338, '穿 NAT/防火墙更友好', 'var(--text-muted)', 10);
      }
    }
  },
  {
    id: 'CN-185', level: 'B', title: '电子邮件（SMTP、POP3、IMAP）',
    intuition: '电子邮件系统三部分：<strong>用户代理 UA</strong>（Outlook/网页邮箱）、<strong>邮件服务器</strong>（发送与接收队列）、<strong>协议</strong>：<strong>SMTP</strong>（发送/推送，TCP 25，只能传 ASCII）、<strong>POP3</strong>（收件，TCP 110，下载后通常删除服务器副本）、<strong>IMAP</strong>（收件，TCP 143，服务器端管理、多设备同步）。MIME 扩展让邮件能带图片/附件/非 ASCII 字符。',
    derivation: [
      '\\text{SMTP}: \\; \\text{推送（发送）}, \\; \\text{TCP 25}',
      '\\text{POP3}: \\; \\text{拉取（收件）}, \\; \\text{TCP 110}',
      '\\text{IMAP}: \\; \\text{拉取 + 同步}, \\; \\text{TCP 143}',
      '\\text{MIME}: \\; \\text{扩展 SMTP，支持附件/多字符集}'
    ],
    exam_text: '<b>【2018 真题改编】</b>SMTP 与 POP3 的区别是什么？IMAP 又有什么不同？',
    exam_answer: '答案：<b>SMTP</b> 用于「发送/推送」邮件到服务器（或服务器间转发），TCP 25；<b>POP3</b> 用于「拉取」邮件到本地，TCP 110，默认下载后删除服务器副本、单设备使用；<b>IMAP</b> 也是拉取，但邮件保留在服务器、支持文件夹管理与多设备同步，TCP 143。SMTP 只能传 ASCII，附件靠 MIME 编码。',
    pitfalls: [
      'SMTP 是「推」，POP3/IMAP 是「拉」——方向别搞反。',
      'POP3 默认删除服务器副本（可配置保留），IMAP 默认保留并同步状态。',
      '邮件里附件/中文靠 MIME 编码（Base64/Quoted-Printable），SMTP 本身只支持 7 位 ASCII。'
    ],
    quiz: [
      { question: '发送邮件使用的协议是？', options: ['SMTP', 'POP3', 'IMAP'], correct: 0 },
      { question: '支持多设备同步的收件协议是？', options: ['POP3', 'IMAP', 'SMTP'], correct: 1 },
      { question: '让邮件支持附件与中文的扩展是？', options: ['MIME', 'SSL', 'FTP'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: '邮件系统三部分：UA、服务器、协议' },
      { focus: 1, desc: 'SMTP 推送发送' },
      { focus: 2, desc: 'POP3 与 IMAP 拉取收件' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['系统组成', 'SMTP 发送', 'POP3 / IMAP 收件'][f]);
      box(g, 80, 140, 170, 80, 'var(--primary)', 0.1);
      txt(g, 165, 176, '发送方 UA', 'var(--primary-strong)', 12.5, 'middle', '700');
      txt(g, 165, 198, '写邮件', 'var(--text-muted)', 10);
      box(g, 380, 130, 180, 100, 'var(--success)', 0.1);
      txt(g, 470, 165, '发送方邮件服务器', 'var(--success)', 11.5, 'middle', '700');
      txt(g, 470, 188, 'SMTP 队列', 'var(--text-muted)', 10);
      box(g, 650, 130, 180, 100, 'var(--highlight)', 0.1);
      txt(g, 740, 165, '接收方邮件服务器', 'var(--highlight)', 11.5, 'middle', '700');
      txt(g, 740, 188, '用户邮箱', 'var(--text-muted)', 10);
      box(g, 650, 280, 180, 70, 'var(--swap)', 0.1);
      txt(g, 740, 310, '接收方 UA', 'var(--swap)', 12, 'middle', '700');
      txt(g, 740, 332, '读邮件', 'var(--text-muted)', 10);
      if (f >= 1) {
        arw(g, 254, 178, 376, 178, 'var(--success)');
        txt(g, 315, 168, 'SMTP 25', 'var(--success)', 10, 'middle', '700');
        arw(g, 564, 178, 646, 178, 'var(--success)');
        txt(g, 605, 168, 'SMTP 25', 'var(--success)', 10, 'middle', '700');
      }
      if (f >= 2) {
        arw(g, 740, 234, 740, 276, 'var(--swap)');
        txt(g, 760, 258, 'POP3 110 / IMAP 143', 'var(--swap)', 10, 'start', '700');
      }
      if (f === 0) {
        txt(g, 450, 350, '用户代理（UA）+ 邮件服务器 + 协议（SMTP/POP3/IMAP）', 'var(--text-muted)', 11.5);
      }
    }
  },
  {
    id: 'CN-186', level: 'B', title: '万维网（WWW、HTTP、HTTPS）',
    intuition: 'WWW 三要素：<strong>URL</strong>（统一资源定位符）、<strong>HTTP</strong>（超文本传输协议）、<strong>HTML</strong>（超文本标记语言）。HTTP 特点：<strong>无状态</strong>（每次请求独立，靠 Cookie/Session 维持状态）、请求-响应模式、默认 TCP 80。方法：GET/POST/PUT/DELETE。HTTPS = HTTP + TLS，端口 443，加密传输。HTTP/1.1 持久连接、HTTP/2 多路复用、HTTP/3 基于 QUIC(UDP)。',
    derivation: [
      '\\text{URL}: \\; \\text{协议}://\\text{主机}:\\text{端口}/\\text{路径}?\\text{查询}',
      '\\text{HTTP}: \\; \\text{无状态、请求-响应、TCP 80}',
      '\\text{HTTPS}: \\; \\text{HTTP} + \\text{TLS}, \\; \\text{TCP 443}',
      '\\text{状态保持}: \\; \\text{Cookie（客户端）} + \\text{Session（服务端）}'
    ],
    exam_text: '<b>【2019 真题改编】</b>HTTP 是无状态协议，服务器如何识别同一用户的连续请求？',
    exam_answer: '答案：靠 <b>Cookie</b> 与 <b>Session</b>。服务器首次响应时下发 Set-Cookie（含 Session ID），浏览器后续请求自动携带该 Cookie；服务器凭 Session ID 找到对应的会话数据，从而「记住」用户。Cookie 存在客户端，Session 数据存在服务端——HTTP 协议本身仍然是无状态的。',
    pitfalls: [
      'HTTP 无状态 ≠ 无法保持登录——Cookie/Session 是在应用层弥补。',
      'HTTPS 不是新协议，而是 HTTP over TLS，默认端口 443（HTTP 是 80）。',
      'GET 参数在 URL 中（有长度限制、可被日志记录），POST 在请求体中（更适合敏感/大数据）。'
    ],
    quiz: [
      { question: 'HTTP 默认端口是？', options: ['80', '443', '21'], correct: 0 },
      { question: 'HTTPS 相比 HTTP 多了什么？', options: ['TLS 加密', '压缩', '缓存'], correct: 0 },
      { question: '服务器识别用户连续请求依靠？', options: ['Cookie/Session', 'IP 地址', 'MAC 地址'], correct: 0 }
    ],
    steps: [
      { focus: 0, desc: 'WWW 三要素：URL、HTTP、HTML' },
      { focus: 1, desc: 'HTTP 无状态与 Cookie/Session' },
      { focus: 2, desc: 'HTTPS 与协议演进' }
    ],
    draw: function (g, W, H, f) {
      title(g, ['WWW 三要素', '无状态与 Cookie', 'HTTPS'][f]);
      if (f === 0) {
        box(g, 70, 80, 240, 90, 'var(--primary)', 0.1);
        txt(g, 190, 118, 'URL', 'var(--primary-strong)', 15, 'middle', '700');
        txt(g, 190, 144, '定位资源', 'var(--text-muted)', 10.5);
        box(g, 330, 80, 240, 90, 'var(--success)', 0.1);
        txt(g, 450, 118, 'HTTP', 'var(--success)', 15, 'middle', '700');
        txt(g, 450, 144, '传输超文本', 'var(--text-muted)', 10.5);
        box(g, 590, 80, 240, 90, 'var(--highlight)', 0.1);
        txt(g, 710, 118, 'HTML', 'var(--highlight)', 15, 'middle', '700');
        txt(g, 710, 144, '描述页面', 'var(--text-muted)', 10.5);
        box(g, 150, 220, 600, 60, 'var(--swap)', 0.08);
        txt(g, 450, 257, 'https://www.example.com:443/index.html?id=1', 'var(--text)', 12, 'middle', '700');
        txt(g, 450, 330, 'URL = 协议 + 主机 + 端口 + 路径 + 查询参数', 'var(--text-muted)', 11.5);
      }
      if (f === 1) {
        box(g, 100, 70, 700, 70, 'var(--danger)', 0.08);
        txt(g, 450, 108, 'HTTP 是无状态协议', 'var(--danger)', 15, 'middle', '700');
        txt(g, 450, 134, '每次请求独立，服务器不记得上次是谁', 'var(--text-muted)', 10.5);
        box(g, 110, 160, 330, 100, 'var(--primary)', 0.08);
        txt(g, 275, 196, 'Cookie', 'var(--primary-strong)', 14, 'middle', '700');
        txt(g, 275, 222, '存在客户端，随请求自动携带', 'var(--text-muted)', 10);
        box(g, 470, 160, 330, 100, 'var(--success)', 0.08);
        txt(g, 635, 196, 'Session', 'var(--success)', 14, 'middle', '700');
        txt(g, 635, 222, '存在服务端，凭 SessionID 查找', 'var(--text-muted)', 10);
        txt(g, 450, 300, '登录状态 = Session ID 保存在 Cookie 中', 'var(--primary-strong)', 12, 'middle', '700');
      }
      if (f === 2) {
        box(g, 90, 70, 330, 100, 'var(--primary)', 0.08);
        txt(g, 255, 106, 'HTTP', 'var(--primary-strong)', 15, 'middle', '700');
        txt(g, 255, 132, 'TCP 80 · 明文', 'var(--text-muted)', 11);
        box(g, 480, 70, 330, 100, 'var(--success)', 0.08);
        txt(g, 645, 106, 'HTTPS', 'var(--success)', 15, 'middle', '700');
        txt(g, 645, 132, 'TCP 443 · TLS 加密', 'var(--text-muted)', 11);
        box(g, 90, 195, 720, 70, 'var(--highlight)', 0.08);
        txt(g, 450, 225, 'HTTP/1.1 持久连接 → HTTP/2 多路复用 → HTTP/3 (QUIC/UDP)', 'var(--highlight)', 12, 'middle', '700');
        txt(g, 450, 250, '演进方向：更快、更安全、更少队头阻塞', 'var(--text-muted)', 10.5);
      }
    }
  }
];
