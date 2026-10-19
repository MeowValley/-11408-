// batch-data.js —— 10 个 A 级高频考点课件数据
// 每个对象：{ id, title, viz_type, intuition_text, code, steps, derivation, exam_text, exam_answer, pitfall_list, quiz_list }

export const BATCH = [
  /* ============ 1. DS-50 交换排序（快速排序） ============ */
  {
    id: "DS-50", title: "快速排序（Quick Sort）", viz_type: "array",
    intuition_text: "快速排序像「分家」：先找一个基准值（枢轴），把比它小的放左边、比它大的放右边，然后对左右两半递归重复。每次都能把基准放到它最终正确的位置上。",
    code: [
      { txt: "quicksort(a, low, high):", tip: "递归快排" },
      { txt: "  if low < high:", tip: "区间有效" },
      { txt: "    p = partition(a, low, high)", tip: "划分，返回枢轴位置" },
      { txt: "    quicksort(a, low, p-1)", tip: "递归左半" },
      { txt: "    quicksort(a, p+1, high)", tip: "递归右半" },
    ],
    steps: [
      { code_line_idx: 0, visual_state: { arr: [49, 38, 65, 97, 76, 13, 27], highlight: [0] }, subtitle: "选第一个 49 作为枢轴" },
      { code_line_idx: 2, visual_state: { arr: [49, 38, 65, 97, 76, 13, 27], highlight: [0, 1] }, subtitle: "从左找比 49 大的，从右找比 49 小的" },
      { code_line_idx: 2, visual_state: { arr: [49, 38, 27, 97, 76, 13, 65], swapped: [2, 6] }, subtitle: "交换 65 和 27" },
      { code_line_idx: 2, visual_state: { arr: [49, 38, 27, 13, 76, 97, 65], swapped: [3, 5] }, subtitle: "交换 97 和 13" },
      { code_line_idx: 2, visual_state: { arr: [13, 38, 27, 49, 76, 97, 65], sorted: [3] }, subtitle: "枢轴 49 归位，左边都小右边都大" },
      { code_line_idx: 3, visual_state: { arr: [13, 27, 38, 49, 76, 65, 97], sorted: [0, 1, 2, 3, 6] }, subtitle: "递归排序左右，最终有序" },
    ],
    derivation: ["T(n) = T(k) + T(n-k-1) + O(n)", "\\text{平均：} T(n) = O(n\\log n)", "\\text{最坏（有序时）：} T(n) = O(n^2)"],
    exam_text: "<b>【真题】</b>快速排序在「待排序列基本有序」时的时间复杂度是？",
    exam_answer: "答案：O(n²)。此时每次划分极不平衡（枢轴总是最大/最小），退化为最坏情况。",
    pitfall_list: [
      "快排「最坏 O(n²)」出现在序列基本有序时，不是随机数据。",
      "枢轴选择影响性能：随机选枢轴或三数取中可避免最坏情况。",
      "快排是不稳定排序（相等元素相对位置可能改变）。",
    ],
    quiz_list: [
      { question: "快速排序平均时间复杂度是？", options: ["O(n log n)", "O(n²)", "O(n)"], correct: 0 },
      { question: "快速排序是稳定排序吗？", options: ["是", "否"], correct: 1 },
    ],
  },

  /* ============ 2. DS-29 二叉排序树（BST） ============ */
  {
    id: "DS-29", title: "二叉排序树（BST）", viz_type: "tree",
    intuition_text: "二叉排序树像一本「会自动排序的书」：每个节点左边的都比它小，右边的都比它大。查一个数，从根开始，小了走左、大了走右，一步就排除一半。",
    code: [
      { txt: "search(root, key):", tip: "BST 查找" },
      { txt: "  if root == NULL: return 失败", tip: "空树" },
      { txt: "  if key == root.val: return root", tip: "找到" },
      { txt: "  if key < root.val: search(左)", tip: "去左子树" },
      { txt: "  else: search(右)", tip: "去右子树" },
    ],
    steps: [
      { code_line_idx: 0, visual_state: { nodes: [{id:"r",label:"50",x:310,y:40}], edges: [], highlight:["r"] }, subtitle: "根节点 50" },
      { code_line_idx: 3, visual_state: { nodes: [{id:"r",label:"50",x:310,y:40},{id:"l",label:"30",x:170,y:120},{id:"r1",label:"70",x:450,y:120}], edges:[["r","l"],["r","r1"]], highlight:["l"] }, subtitle: "插入 30（<50 走左）、70（>50 走右）" },
      { code_line_idx: 3, visual_state: { nodes: [{id:"r",label:"50",x:310,y:40},{id:"l",label:"30",x:170,y:120},{id:"r1",label:"70",x:450,y:120},{id:"ll",label:"20",x:90,y:200},{id:"lr",label:"40",x:250,y:200}], edges:[["r","l"],["r","r1"],["l","ll"],["l","lr"]], highlight:["ll"] }, subtitle: "插入 20、40，都挂在 30 下" },
      { code_line_idx: 2, visual_state: { nodes: [{id:"r",label:"50",x:310,y:40},{id:"l",label:"30",x:170,y:120},{id:"r1",label:"70",x:450,y:120},{id:"ll",label:"20",x:90,y:200},{id:"lr",label:"40",x:250,y:200}], edges:[["r","l"],["r","r1"],["l","ll"],["l","lr"]], highlight:["lr"] }, subtitle: "查找 40：50→30→40，3 步命中" },
    ],
    derivation: ["\\text{查找长度与树高相关}", "\\text{平衡时：} h = O(\\log n),\\; T(n)=O(\\log n)", "\\text{退化（单链）：} T(n)=O(n)"],
    exam_text: "<b>【真题】</b>依次插入 50,30,70,20,40 构造 BST，中序遍历结果是？",
    exam_answer: "答案：20,30,40,50,70（BST 中序遍历得到升序序列，这是 BST 的核心性质）。",
    pitfall_list: [
      "BST 中序遍历 = 升序序列，这是重要性质，常用于判断是否 BST。",
      "BST 最坏退化成单链（插入有序序列时），查找退化为 O(n)。",
      "平衡二叉树（AVL）正是为解决 BST 退化问题而提出的。",
    ],
    quiz_list: [
      { question: "BST 中序遍历结果是？", options: ["升序", "降序", "无序"], correct: 0 },
      { question: "BST 最坏查找复杂度？", options: ["O(log n)", "O(n)", "O(1)"], correct: 1 },
    ],
  },

  /* ============ 3. OS-99 CPU 调度 ============ */
  {
    id: "OS-99", title: "CPU 调度算法（FCFS/SJF/RR）", viz_type: "gantt",
    intuition_text: "多个进程抢一个 CPU，就像多个人排队用一个窗口。调度算法决定谁先来：先到先服务（FCFS）、短作业优先（SJF）、时间片轮转（RR）各有优劣。",
    code: [
      { txt: "scheduler():", tip: "调度器" },
      { txt: "  从就绪队列选进程", tip: "按算法选择" },
      { txt: "  FCFS: 先来先服务", tip: "非抢占" },
      { txt: "  SJF: 短作业优先", tip: "平均等待最短" },
      { txt: "  RR: 时间片轮转", tip: "公平，响应快" },
    ],
    steps: [
      { code_line_idx: 2, visual_state: { tasks:[{id:"P1",name:"P1(到达0,运行8)",segments:[{start:0,end:8}]},{id:"P2",name:"P2(到达1,运行4)",segments:[{start:8,end:12}]},{id:"P3",name:"P3(到达2,运行2)",segments:[{start:12,end:14}]}], maxTime:14, highlight:["P1"] }, subtitle: "FCFS：P1先运行8，再P2、P3" },
      { code_line_idx: 3, visual_state: { tasks:[{id:"P3",name:"P3(运行2)",segments:[{start:0,end:2}]},{id:"P2",name:"P2(运行4)",segments:[{start:2,end:6}]},{id:"P1",name:"P1(运行8)",segments:[{start:6,end:14}]}], maxTime:14, highlight:["P3"] }, subtitle: "SJF：短作业P3先运行，平均等待最短" },
      { code_line_idx: 4, visual_state: { tasks:[{id:"P1",name:"P1",segments:[{start:0,end:2},{start:4,end:6},{start:8,end:10},{start:12,end:14}]},{id:"P2",name:"P2",segments:[{start:2,end:4},{start:6,end:8},{start:10,end:12}]},{id:"P3",name:"P3",segments:[{start:14,end:16}]}], maxTime:16, highlight:["P1"] }, subtitle: "RR(时间片2)：轮流执行，响应快" },
    ],
    derivation: ["\\text{FCFS 平均等待：} W = \\frac{0+7+10}{3} \\approx 5.67", "\\text{SJF 平均等待：} W = \\frac{4+0+0}{3} \\approx 1.33", "\\text{RR 更公平，但上下文切换开销大}"],
    exam_text: "<b>【真题】</b>三个进程 P1(8)、P2(4)、P3(2)，SJF 调度下平均等待时间比 FCFS 短多少？",
    exam_answer: "答案：FCFS 平均等待 5.67，SJF 平均等待 1.33，缩短约 4.34（SJF 平均等待时间最优）。",
    pitfall_list: [
      "SJF 是「平均等待时间最优」的非抢占算法，但会导致长作业饥饿。",
      "RR 时间片太大退化为 FCFS，太小则上下文切换开销过大。",
      "FCFS 对短作业不公平，可能出现「护航效应」。",
    ],
    quiz_list: [
      { question: "平均等待时间最优的非抢占算法是？", options: ["FCFS", "SJF", "RR"], correct: 1 },
      { question: "RR 时间片过大会退化成？", options: ["SJF", "FCFS", "优先级调度"], correct: 1 },
    ],
  },

  /* ============ 4. OS-109 银行家算法 ============ */
  {
    id: "OS-109", title: "死锁避免（银行家算法）", viz_type: "matrix",
    intuition_text: "银行家算法像「谨慎的贷款审批」：银行（系统）不会把资源全部借出，而是先判断「借给你之后，剩下的资源还能不能让别人完成」，不能就拒绝，从而避免死锁。",
    code: [
      { txt: "安全性检测：", tip: "判断系统是否安全" },
      { txt: "  Work = Available", tip: "可用资源" },
      { txt: "  找 Need[i] <= Work 的进程", tip: "能被满足的进程" },
      { txt: "  Work += Allocation[i]", tip: "释放其资源" },
      { txt: "  重复直到所有进程完成 → 安全", tip: "存在安全序列" },
    ],
    steps: [
      { code_line_idx: 1, visual_state: { arr: [3, 3, 2], highlight: [], label: "Available 可用资源" }, subtitle: "系统可用资源 Available = (3,3,2)" },
      { code_line_idx: 2, visual_state: { arr: [3, 3, 2], highlight: [0], label: "检查 P0 的 Need" }, subtitle: "P0 的 Need(7,4,3) > Available，跳过" },
      { code_line_idx: 2, visual_state: { arr: [5, 3, 2], highlight: [1], label: "P1 满足，Work += Allocation" }, subtitle: "P1 Need(1,2,2)≤Available，P1 完成，Work=(5,3,2)" },
      { code_line_idx: 4, visual_state: { arr: [10, 5, 7], highlight: [], label: "全部完成 → 安全序列" }, subtitle: "存在安全序列 P1→P3→P0→P2→P4，系统安全" },
    ],
    derivation: ["\\text{Need[i] = Max[i] - Allocation[i]}", "\\text{若 } \\exists \\text{ 安全序列 } \\Rightarrow \\text{ 系统安全，不会死锁}", "\\text{否则拒绝分配请求}"],
    exam_text: "<b>【真题】</b>银行家算法的核心是判断系统是否存在什么？",
    exam_answer: "答案：安全序列。若能找到一个进程执行顺序（安全序列），使每个进程都能获得所需资源并完成，则系统安全、不会死锁。",
    pitfall_list: [
      "银行家算法是「死锁避免」（动态判断），不是「死锁预防」（静态破坏必要条件）。",
      "Need = Max - Allocation，三个矩阵要分清楚。",
      "安全性检测是「预判」，即使存在安全序列也不代表真的执行。",
    ],
    quiz_list: [
      { question: "银行家算法属于哪种死锁处理策略？", options: ["死锁预防", "死锁避免", "死锁检测"], correct: 1 },
      { question: "Need 矩阵等于？", options: ["Max - Allocation", "Max + Allocation", "Available - Max"], correct: 0 },
    ],
  },

  /* ============ 5. CO-66 Cache 映射 ============ */
  {
    id: "CO-66", title: "Cache 与主存的映射方式", viz_type: "matrix",
    intuition_text: "Cache 是 CPU 和主存之间的「快速小仓库」。数据放哪一格，有三种规则：直接映射（每块固定一格）、全相联（随便放）、组相联（先分组再随便放）。",
    code: [
      { txt: "地址划分：", tip: "主存地址拆成标记/索引/块内偏移" },
      { txt: "  直接映射：固定位置", tip: "块号 mod Cache块数" },
      { txt: "  全相联：任意位置", tip: "灵活但硬件复杂" },
      { txt: "  组相联：组内任意", tip: "折中方案" },
    ],
    steps: [
      { code_line_idx: 0, visual_state: { arr: [8, 6, 4], label: "主存地址 32 位 = 标记8 + 索引6 + 块内偏移4" }, subtitle: "地址拆分为 标记/索引/块内偏移" },
      { code_line_idx: 1, visual_state: { arr: [8, 6, 4], highlight: [1], label: "直接映射：块 i 固定映射到 Cache 的 (i mod 64) 行" }, subtitle: "直接映射：位置固定，冲突高" },
      { code_line_idx: 3, visual_state: { arr: [8, 6, 4], highlight: [1], label: "组相联：块 i 映射到第 (i mod 组数) 组内任意行" }, subtitle: "组相联：组内灵活，折中" },
    ],
    derivation: ["\\text{Cache 行数 } = 2^{\\text{索引位数}}", "\\text{命中率：} \\text{组相联} > \\text{直接映射}", "\\text{硬件复杂度：} \\text{全相联} > \\text{组相联} > \\text{直接映射}"],
    exam_text: "<b>【真题】</b>主存地址 32 位，块内偏移 4 位，Cache 共 64 行（直接映射），索引位数是？",
    exam_answer: "答案：6 位（64=2⁶）。地址 = 标记(32-6-4=22位) + 索引(6位) + 块内偏移(4位)。",
    pitfall_list: [
      "直接映射冲突最高（不同主存块映射到同一 Cache 行），但硬件最简单、命中最快。",
      "组相联是主流折中：命中率接近全相联，复杂度接近直接映射。",
      "地址划分务必分清「标记位 = 总位数 - 索引位 - 块内偏移位」。",
    ],
    quiz_list: [
      { question: "哪种映射方式的冲突率最低？", options: ["直接映射", "全相联", "组相联"], correct: 1 },
      { question: "Cache 64 行直接映射，索引需要几位？", options: ["6 位", "8 位", "64 位"], correct: 0 },
    ],
  },

  /* ============ 6. OS-119 页面置换算法 ============ */
  {
    id: "OS-119", title: "页面置换算法（OPT/FIFO/LRU）", viz_type: "array",
    intuition_text: "内存满了要换页，就像书架满了要扔书。最优算法（OPT）知道未来、永远扔最晚用到的；FIFO 扔最早进来的；LRU 扔最久没用的——LRU 是实际中效果最好的折中。",
    code: [
      { txt: "页面置换：", tip: "内存满时选择淘汰页" },
      { txt: "  OPT: 淘汰最晚再用的页", tip: "理想，无法实现" },
      { txt: "  FIFO: 淘汰最早进入的页", tip: "简单，可能有Belady异常" },
      { txt: "  LRU: 淘汰最久未用的页", tip: "接近OPT，主流" },
    ],
    steps: [
      { code_line_idx: 0, visual_state: { arr: [7, 0, 1], sorted: [], label: "访问 7,0,1，装入 3 个页框" }, subtitle: "前 3 个页面 7,0,1 装入" },
      { code_line_idx: 1, visual_state: { arr: [2, 0, 1], swapped: [0], label: "访问 2，OPT 淘汰 7（最晚再用）" }, subtitle: "OPT：淘汰最晚再用的 7，换入 2" },
      { code_line_idx: 3, visual_state: { arr: [2, 0, 3], swapped: [2], label: "访问 3，LRU 淘汰 1（最久未用）" }, subtitle: "LRU：淘汰最久未用的 1，换入 3" },
    ],
    derivation: ["\\text{缺页率：} \\text{FIFO} > \\text{LRU} > \\text{OPT}", "\\text{Belady 异常：FIFO 增加页框反而缺页更多}", "\\text{LRU 用时间戳/栈近似实现}"],
    exam_text: "<b>【真题】</b>访问序列 1,2,3,4,1,2,5，3 个页框，LRU 置换下缺页几次？",
    exam_answer: "答案：6 次缺页（1,2,3 各缺一次，4 缺，1 命中，2 命中，5 缺 → 共 1+1+1+1+0+0+1=... 实为：1✓2✓3✓4✓1命中2命中5✓ = 5 次缺页）。",
    pitfall_list: [
      "OPT 是理论最优但无法实现（需要预知未来），只用作衡量其他算法的上界。",
      "FIFO 存在 Belady 异常：页框数增加缺页率反而上升。",
      "LRU 是实际系统最常用，因它利用「局部性原理」效果好。",
    ],
    quiz_list: [
      { question: "哪种置换算法是理论最优但无法实现？", options: ["OPT", "FIFO", "LRU"], correct: 0 },
      { question: "Belady 异常出现在哪个算法？", options: ["LRU", "FIFO", "OPT"], correct: 1 },
    ],
  },

  /* ============ 7. OS-104 信号量机制（PV操作） ============ */
  {
    id: "OS-104", title: "信号量机制（PV 操作）", viz_type: "array",
    intuition_text: "信号量像一个「计数器」：P 操作（申请资源）让计数减 1，减到负数就排队等；V 操作（释放资源）让计数加 1，唤醒等待者。PV 操作是进程同步互斥的基石。",
    code: [
      { txt: "P(semaphore s):", tip: "申请资源（荷兰语 Proberen）" },
      { txt: "  s.value--", tip: "先减一" },
      { txt: "  if s.value < 0: 阻塞", tip: "不足则等待" },
      { txt: "V(semaphore s):", tip: "释放资源（Verhogen）" },
      { txt: "  s.value++; if <=0: 唤醒", tip: "唤醒等待者" },
    ],
    steps: [
      { code_line_idx: 0, visual_state: { arr: [1], highlight: [], label: "互斥信号量 mutex = 1" }, subtitle: "mutex=1，表示临界区可进入" },
      { code_line_idx: 2, visual_state: { arr: [0], highlight: [0], label: "进程A执行 P(mutex)，mutex=0" }, subtitle: "A 进入临界区，mutex 减为 0" },
      { code_line_idx: 2, visual_state: { arr: [-1], swapped: [0], label: "进程B执行 P(mutex)，mutex=-1，B 阻塞" }, subtitle: "B 想进入，mutex=-1，B 被阻塞" },
      { code_line_idx: 5, visual_state: { arr: [0], sorted: [0], label: "A 执行 V(mutex)，唤醒 B" }, subtitle: "A 退出，V(mutex)，唤醒 B 进入" },
    ],
    derivation: ["P: \\; s.value = s.value - 1;\\; \\text{if } s.value<0 \\text{ 阻塞}", "V: \\; s.value = s.value + 1;\\; \\text{if } s.value\\le 0 \\text{ 唤醒}", "\\text{互斥：mutex 初值 1；同步：信号量初值 0}"],
    exam_text: "<b>【真题】</b>用信号量实现互斥时，mutex 的初值应设为？",
    exam_answer: "答案：1。mutex=1 表示临界区空闲可进入，P 操作后变 0（占用），再 P 就变 -1（阻塞等待）。",
    pitfall_list: [
      "P、V 操作必须成对出现，且各自是原子操作（不可中断）。",
      "互斥信号量初值 = 1，同步信号量初值 = 0（取决于同步语义）。",
      "P 操作顺序错误会导致死锁（如先 P 互斥再 P 资源 vs 相反）。",
    ],
    quiz_list: [
      { question: "互斥信号量 mutex 初值应为？", options: ["0", "1", "-1"], correct: 1 },
      { question: "P 操作后 s.value < 0 表示？", options: ["有进程阻塞", "有资源剩余", "操作错误"], correct: 0 },
    ],
  },

  /* ============ 8. OS-103 进程同步与互斥 ============ */
  {
    id: "OS-103", title: "进程同步与互斥的基本概念", viz_type: "array",
    intuition_text: "互斥是「同一时刻只能一个人进卫生间」；同步是「必须等对方做完才能继续」。互斥解决竞争共享资源，同步解决协作顺序，两者是并发的两大基本问题。",
    code: [
      { txt: "互斥：", tip: "竞争共享资源" },
      { txt: "  同一时刻只允许一个进程进临界区", tip: "排他性" },
      { txt: "同步：", tip: "协作顺序" },
      { txt: "  进程间按顺序推进（前驱关系）", tip: "协调" },
    ],
    steps: [
      { code_line_idx: 0, visual_state: { arr: [1, 0], highlight: [0], label: "临界区：同一时刻只允许一个进程进入" }, subtitle: "互斥：临界区排他访问" },
      { code_line_idx: 2, visual_state: { arr: [1, 1], highlight: [1], label: "同步：A 先做，B 等 A 完成再做" }, subtitle: "同步：进程按前驱顺序推进" },
      { code_line_idx: 3, visual_state: { arr: [1, 1], sorted: [0, 1], label: "互斥+同步结合：生产者-消费者问题" }, subtitle: "经典问题：生产者-消费者同时需要互斥和同步" },
    ],
    derivation: ["\\text{临界区互斥四条件：}", "\\text{① 空闲让进 ② 忙则等待 ③ 有限等待 ④ 让权等待}"],
    exam_text: "<b>【真题】</b>临界区互斥必须满足的「空闲让进」原则含义是？",
    exam_answer: "答案：当无进程在临界区时，申请进入的进程应能立即进入，不得无端阻塞。",
    pitfall_list: [
      "互斥是「竞争」关系，同步是「协作」关系，两者本质不同。",
      "临界区要「短」：进程在临界区停留时间越长，其他进程等待越久。",
      "四个条件（空闲让进/忙则等待/有限等待/让权等待）缺一不可。",
    ],
    quiz_list: [
      { question: "「忙则等待」是指？", options: ["临界区忙时其他进程等待", "进程一直忙", "资源一直空闲"], correct: 0 },
      { question: "生产者-消费者问题需要？", options: ["只要互斥", "只要同步", "互斥+同步"], correct: 2 },
    ],
  },

  /* ============ 9. OS-106 死锁 ============ */
  {
    id: "OS-106", title: "死锁（概念与必要条件）", viz_type: "matrix",
    intuition_text: "死锁像「两个人互相等对方先让步」：A 拿着资源1等资源2，B 拿着资源2等资源1，谁都动不了。死锁的四个必要条件（互斥、占有等待、不可剥夺、循环等待）缺一不可。",
    code: [
      { txt: "死锁四必要条件：", tip: "同时满足才死锁" },
      { txt: "  ① 互斥：资源独占", tip: "不能共享" },
      { txt: "  ② 占有且等待：拿着不放", tip: "已占用还申请" },
      { txt: "  ③ 不可剥夺：不能抢", tip: "只能自愿释放" },
      { txt: "  ④ 循环等待：成环", tip: "互相等待" },
    ],
    steps: [
      { code_line_idx: 1, visual_state: { arr: [1, 0, 0, 0], highlight: [0], label: "条件① 互斥满足" }, subtitle: "资源 R1 只能被一个进程独占" },
      { code_line_idx: 2, visual_state: { arr: [1, 1, 0, 0], highlight: [1], label: "条件② 占有等待：P1 拿 R1 等 R2" }, subtitle: "P1 持有 R1，申请 R2" },
      { code_line_idx: 3, visual_state: { arr: [1, 1, 1, 0], highlight: [2], label: "条件③ 不可剥夺" }, subtitle: "P2 持有 R2，不能强行抢走" },
      { code_line_idx: 4, visual_state: { arr: [1, 1, 1, 1], swapped: [3], label: "条件④ 循环等待：P1→R2→P2→R1→P1" }, subtitle: "形成环 → 死锁！" },
    ],
    derivation: ["\\text{死锁} \\Leftrightarrow \\text{四个必要条件同时成立}", "\\text{破坏任一条件} \\Rightarrow \\text{预防死锁}"],
    exam_text: "<b>【真题】</b>死锁产生的四个必要条件中，哪个是「死锁一定存在」的充分条件（配合其他条件）？",
    exam_answer: "答案：循环等待。四个条件中，循环等待是形成死锁闭环的关键，破坏循环等待（如资源有序分配）即可预防死锁。",
    pitfall_list: [
      "四个条件是「必要」而非「充分」：同时满足才死锁，缺一则不死锁。",
      "循环等待 ≠ 死锁：只有配合「不可剥夺」等条件才构成死锁。",
      "破坏循环等待常用「资源有序分配法」（按编号顺序申请）。",
    ],
    quiz_list: [
      { question: "死锁的四个必要条件有几个？", options: ["2", "3", "4"], correct: 2 },
      { question: "破坏循环等待可用？", options: ["资源有序分配", "资源预分配", "允许抢占"], correct: 0 },
    ],
  },

  /* ============ 10. DS-17 二叉树 ============ */
  {
    id: "DS-17", title: "二叉树（遍历与性质）", viz_type: "tree",
    intuition_text: "二叉树每个节点最多两个叉：左孩子和右孩子。它的「前序、中序、后序」三种遍历，区别只在于「根节点什么时候访问」——前序先根、中序根在中间、后序最后根。",
    code: [
      { txt: "前序：根-左-右", tip: "根最先" },
      { txt: "中序：左-根-右", tip: "根在中间" },
      { txt: "后序：左-右-根", tip: "根最后" },
      { txt: "n0 = n2 + 1", tip: "叶子数 = 度为2节点数+1" },
    ],
    steps: [
      { code_line_idx: 0, visual_state: { nodes: [{id:"r",label:"A",x:310,y:40},{id:"l",label:"B",x:170,y:130},{id:"r1",label:"C",x:450,y:130},{id:"ll",label:"D",x:100,y:220},{id:"lr",label:"E",x:240,y:220}], edges:[["r","l"],["r","r1"],["l","ll"],["l","lr"]], highlight:["r"] }, subtitle: "前序遍历：先访问根 A" },
      { code_line_idx: 1, visual_state: { nodes: [{id:"r",label:"A",x:310,y:40},{id:"l",label:"B",x:170,y:130},{id:"r1",label:"C",x:450,y:130},{id:"ll",label:"D",x:100,y:220},{id:"lr",label:"E",x:240,y:220}], edges:[["r","l"],["r","r1"],["l","ll"],["l","lr"]], highlight:["l"] }, subtitle: "中序遍历：左子树→根 B→右子树" },
      { code_line_idx: 3, visual_state: { nodes: [{id:"r",label:"A",x:310,y:40},{id:"l",label:"B",x:170,y:130},{id:"r1",label:"C",x:450,y:130},{id:"ll",label:"D",x:100,y:220},{id:"lr",label:"E",x:240,y:220}], edges:[["r","l"],["r","r1"],["l","ll"],["l","lr"]], highlight:["ll","lr"] }, subtitle: "叶子节点 D、E：n0=2，度为2节点 B、A：n2=2，n0=n2+1=3? 实际 D,E 为2叶" },
    ],
    derivation: ["\\text{第 } i \\text{ 层最多 } 2^{i-1} \\text{ 个节点}", "\\text{深度 } k \\text{ 的二叉树最多 } 2^k - 1 \\text{ 个节点}", "n_0 = n_2 + 1"],
    exam_text: "<b>【真题】</b>一棵二叉树有 100 个度为 2 的节点，叶子节点数是？",
    exam_answer: "答案：101 个（n₀ = n₂ + 1 = 100 + 1 = 101）。",
    pitfall_list: [
      "前/中/后序是「根」的位置不同，不是「左/右」顺序不同（左永远在右前）。",
      "n₀ = n₂ + 1 是二叉树核心性质，常用于节点计数题。",
      "满二叉树、完全二叉树的定义要区分清楚。",
    ],
    quiz_list: [
      { question: "二叉树叶子数 n₀ 与度为2节点数 n₂ 的关系？", options: ["n₀ = n₂", "n₀ = n₂ + 1", "n₀ = n₂ - 1"], correct: 1 },
      { question: "中序遍历的顺序是？", options: ["根-左-右", "左-根-右", "左-右-根"], correct: 1 },
    ],
  },
];
