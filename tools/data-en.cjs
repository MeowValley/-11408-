module.exports = [
  { id:'EN-01', level:'C', title:'完形填空：20 题，每题 0.5 分',
    intuition:'完形填空是英语一的第一个题型：一篇 240~280 词的短文，挖 20 个空，每空四个选项，<strong>每题 0.5 分，共 10 分</strong>。它同时考词汇、语法和语篇逻辑——不是「选最像的词」，而是「选最符合上下文的词」。做题顺序建议：先通读抓主旨，再逐空作答，最后回读检查。',
    derivation:['\\text{总分} = 20 \\times 0.5 = 10 \\text{ 分}','\\text{短文长度} = 240\\sim280 \\text{ 词}','\\text{建议用时} = 15\\sim18 \\text{ 分钟}','\\text{考点} = \\text{词汇} + \\text{语法} + \\text{语篇逻辑}'],
    exam_text:'<b>【真题规律】</b>完形填空的 20 个空通常如何分布？',
    exam_answer:'答案：约 <b>10~12 个词汇辨析题</b>（形近词、近义词、固定搭配）、<b>4~6 个语法结构题</b>（时态、非谓语、从句）、<b>2~4 个语篇逻辑题</b>（转折、因果、递进连词）。做题时先看「逻辑词」所在的空——这类题最容易通过上下文判断。',
    pitfalls:['不要逐词翻译：完形考的是「篇章理解」，抓着句子结构比抠词义更有效。','四个选项都认识时，回到空格前后一句找线索（同义复现、反义对照）。','最后一定要回读：把所选词代入通读，语感会暴露明显错误。'],
    quiz:[{question:'完形填空共多少分？',options:['10 分','20 分','15 分'],correct:0},{question:'完形的短文长度约为？',options:['240~280 词','400~500 词','500~600 词'],correct:0},{question:'完形最有效的做题顺序是？',options:['逐词翻译','先通读抓主旨再逐空','先做最后一句'],correct:1}],
    steps:[{focus:0,desc:'题型结构：20 空 × 0.5 分 = 10 分'},{focus:1,desc:'考点分布：词汇、语法、语篇逻辑'},{focus:2,desc:'三步做题法：通读 → 作答 → 回读'}],
    draw:function(g,W,H,f){
      title(g,['题型结构','考点分布','三步法'][f]);
      if(f===0){
        box(g,90,70,720,90,'var(--primary)',0.08);
        txt(g,450,105,'20 题 × 0.5 分 = 10 分', 'var(--primary-strong)',17,'middle','700');
        txt(g,450,135,'短文 240~280 词，四选一', 'var(--text-muted)',11.5);
        box(g,120,190,660,80,'var(--success)',0.08);
        txt(g,450,225,'建议用时 15~18 分钟', 'var(--success)',14,'middle','700');
        txt(g,450,250,'先通读 1 分钟抓主旨，再逐空作答', 'var(--text-muted)',11);
        txt(g,450,320,'完形是「性价比」题型：单题分值低但数量多', 'var(--text-muted)',11.5);
      }
      if(f===1){
        const rows=[['词汇辨析 10~12 空','形近/近义/固定搭配','var(--primary)'],['语法结构 4~6 空','时态/非谓语/从句','var(--success)'],['语篇逻辑 2~4 空','转折/因果/递进','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=70+i*80;
          box(g,110,y,680,64,r[2],0.08);
          txt(g,140,y+26,r[0],'var(--text)',12.5,'start','700');
          txt(g,140,y+50,r[1],'var(--text-muted)',10.5,'start');
        });
      }
      if(f===2){
        ['① 通读全文：抓主旨、看首句','② 逐空作答：先易后难、标记不确定','③ 回读检查：代入通读、修正逻辑'].forEach(function(s,i){
          box(g,120,70+i*80,660,60,['var(--primary)','var(--success)','var(--highlight)'][i],0.08);
          txt(g,150,106+i*80,s,'var(--text)',13,'start','700');
        });
        txt(g,450,325,'逻辑词所在的空优先做——上下文线索最明显','var(--primary-strong)',11.5,'middle','700');
      }
    }
  },
  { id:'EN-02', level:'C', title:'完形填空：240-280 词短文，20 个空白，四选一',
    intuition:'完形短文通常是一篇<strong>说明文或议论文</strong>，首句不挖空（定基调），结构多为「提出观点—举例论证—总结」。20 个空按位置分：句内空（看搭配）、句间空（看逻辑）、段间空（看主旨）。选项设置常见「三同一异」：三个近义词 + 一个异类，或形近词干扰。',
    derivation:['\\text{首句不设空} \\Rightarrow \\text{主旨线索}','\\text{句内空}: \\; \\text{搭配/语法}','\\text{句间空}: \\; \\text{逻辑关系}','\\text{段间空}: \\; \\text{段落主旨}'],
    exam_text:'<b>【解题示范】</b>空格前后出现 however、although 时，应如何选择？',
    exam_answer:'答案：这类<b>转折连词</b>提示前后语义相反：先判断空格所在句与上句是「相反」关系，再选带转折意味的词（however/nevertheless/whereas）。同理：because/thus 提示因果，moreover/furthermore 提示递进，for example 提示例证。逻辑词是完形最可靠的「路标」。',
    pitfalls:['首句是主旨句，务必读懂——后面所有空都围绕它展开。','不要只看空格所在句：至少读前后各一句。','固定搭配要按「动词+介词」「形容词+介词」整体记。'],
    quiz:[{question:'完形短文首句通常？',options:['不设空','设第一个空','设两个空'],correct:0},{question:'however 提示什么关系？',options:['因果','转折','递进'],correct:1},{question:'段间空主要看？',options:['词组搭配','段落主旨','语法时态'],correct:1}],
    steps:[{focus:0,desc:'短文结构：首句定调、总分总'},{focus:1,desc:'三类空格：句内、句间、段间'},{focus:2,desc:'逻辑词是最可靠的路标'}],
    draw:function(g,W,H,f){
      title(g,['短文结构','三类空格','逻辑路标'][f]);
      if(f===0){
        ['首句（不设空）→ 主旨','中间段 → 举例/论证','尾句 → 总结/升华'].forEach(function(s,i){
          box(g,120,70+i*80,660,58,['var(--primary)','var(--success)','var(--highlight)'][i],0.08);
          txt(g,450,106+i*80,s,['var(--primary-strong)','var(--success)','var(--highlight)'][i],13,'middle','700');
        });
        txt(g,450,320,'读懂首句 = 拿到全文的「主题词」','var(--text-muted)',11.5);
      }
      if(f===1){
        const rows=[['句内空','看搭配、语法、词义','var(--primary)'],['句间空','看转折/因果/递进','var(--success)'],['段间空','看段落主旨呼应','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=70+i*80;
          box(g,110,y,680,64,r[2],0.08);
          txt(g,140,y+26,r[0],'var(--text)',13,'start','700');
          txt(g,140,y+50,r[1],'var(--text-muted)',10.5,'start');
        });
      }
      if(f===2){
        const rows=[['however / although','转折','var(--danger)'],['because / thus','因果','var(--primary)'],['moreover / furthermore','递进','var(--success)'],['for example / such as','例证','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=60+i*64;
          box(g,110,y,680,52,r[2],0.08);
          txt(g,140,y+33,r[0],r[2],12.5,'start','700');
          txt(g,600,y+33,r[1],'var(--text)',12,'middle','700');
        });
      }
    }
  },
  { id:'EN-03', level:'C', title:'完形考查重点：词汇辨析、固定搭配、语法结构、上下文逻辑',
    intuition:'完形的四大考点可以对应四种解题动作：<strong>词汇辨析</strong>——比词义细微差别（如 affect/effect、adapt/adopt）；<strong>固定搭配</strong>——动介搭配、形容词搭配（如 be subject to）；<strong>语法结构</strong>——时态一致、非谓语、从句引导词；<strong>上下文逻辑</strong>——转折、因果、让步、并列。',
    derivation:['\\text{词汇}: \\; \\text{词义辨析} + \\text{词性}','\\text{搭配}: \\; \\text{动词}+\\text{介词},\\; \\text{形容词}+\\text{介词}','\\text{语法}: \\; \\text{时态} + \\text{非谓语} + \\text{从句}','\\text{逻辑}: \\; \\text{转折} + \\text{因果} + \\text{让步} + \\text{并列}'],
    exam_text:'<b>【易混词】</b>affect 与 effect、adapt 与 adopt 的区别是？',
    exam_answer:'答案：<b>affect</b> 是动词「影响」（affect the result），<b>effect</b> 多为名词「效果/影响」（have an effect on）；<b>adapt</b> 是「适应/改编」（adapt to），<b>adopt</b> 是「采纳/收养」（adopt a plan）。完形最爱考这类形近、音近、义近的「三胞胎」词。',
    pitfalls:['形近词要按「词性 + 搭配 + 例句」三位一体记，不要只记中文意思。','固定搭配要整句背：be subject to / be attributed to / in terms of。','语法题先确定「句子缺什么成分」，再排除。'],
    quiz:[{question:'affect 的词性是？',options:['动词','名词','形容词'],correct:0},{question:'adopt 的意思是？',options:['适应','采纳','影响'],correct:1},{question:'be subject to 属于？',options:['固定搭配','从句','时态'],correct:0}],
    steps:[{focus:0,desc:'四大考点的解题动作'},{focus:1,desc:'形近词辨析'},{focus:2,desc:'固定搭配与语法结构'}],
    draw:function(g,W,H,f){
      title(g,['四大考点','形近词','搭配与语法'][f]);
      if(f===0){
        const rows=[['词汇辨析','比词义细微差别','var(--primary)'],['固定搭配','动介/形介搭配','var(--success)'],['语法结构','时态/非谓语/从句','var(--highlight)'],['上下文逻辑','转折/因果/让步','var(--swap)']];
        rows.forEach(function(r,i){
          const y=50+i*62;
          box(g,110,y,680,50,r[2],0.08);
          txt(g,140,y+32,r[0],'var(--text)',12.5,'start','700');
          txt(g,420,y+32,r[1],'var(--text-muted)',11,'start');
        });
      }
      if(f===1){
        const rows=[['affect（v. 影响）','effect（n. 效果）','var(--primary)'],['adapt（v. 适应）','adopt（v. 采纳）','var(--success)'],['principal（adj. 主要）','principle（n. 原则）','var(--highlight)'],['economic（adj. 经济）','economical（adj. 节约）','var(--swap)']];
        rows.forEach(function(r,i){
          const y=65+i*66;
          box(g,110,y,680,54,r[2],0.08);
          txt(g,140,y+34,r[0],'var(--text)',12,'start','700');
          txt(g,470,y+34,r[1],'var(--text)',12,'start');
        });
      }
      if(f===2){
        box(g,110,70,680,80,'var(--success)',0.08);
        txt(g,450,102,'be subject to / be attributed to', 'var(--success)',12.5,'middle','700');
        txt(g,450,126,'be aware of / be capable of', 'var(--text)',11.5);
        box(g,110,170,680,80,'var(--highlight)',0.08);
        txt(g,450,202,'时态一致：主句与从句的时间关系', 'var(--highlight)',12.5,'middle','700');
        txt(g,450,226,'非谓语：doing / done / to do 的选择', 'var(--text)',11.5);
        txt(g,450,300,'口诀：先看缺什么成分，再看固定搭配', 'var(--primary-strong)',11.5,'middle','700');
      }
    }
  },
  { id:'EN-04', level:'C', title:'阅读理解 Part A：4 篇 × 5 题 × 2 分',
    intuition:'阅读理解 Part A 是英语一的「半壁江山」：4 篇文章、每篇 5 题、每题 2 分，<strong>共 40 分</strong>。文章约 400 词，题目按「细节—推理—态度—主旨—词义」五类分布。核心原则：<strong>答案一定在文中</strong>，不要凭常识或印象作答；定位句通常在题干关键词附近。',
    derivation:['\\text{总分} = 4 \\times 5 \\times 2 = 40 \\text{ 分}','\\text{单篇} \\approx 400 \\text{ 词},\\; \\text{5 题}','\\text{建议单篇} = 15\\sim18 \\text{ 分钟}','\\text{顺序}: \\; \\text{读题干} \\to \\text{定位} \\to \\text{比对选项}'],
    exam_text:'<b>【做题原则】</b>阅读理解「答案一定在文中」具体怎么操作？',
    exam_answer:'答案：① 先读题干，划出<b>关键词</b>（人名、数字、专有名词、核心动词）；② 回原文<b>定位</b>到 1~2 个句子；③ 把定位句与选项<b>逐词比对</b>——正确选项是原文的同义改写（paraphrase），错误选项常有「偷换概念、以偏概全、无中生有、正反混淆」四类陷阱。',
    pitfalls:['不要先通读全文再做题（时间不够），应先看题干再定位。','选项中出现「绝对化词」（all/never/only）通常是干扰项。','主旨题要选「覆盖全文」的选项，不能只概括某一段。'],
    quiz:[{question:'阅读 Part A 总分是？',options:['20 分','40 分','10 分'],correct:1},{question:'正确选项的典型特征是？',options:['原文原词照抄','同义改写','含 all/never'],correct:1},{question:'做题的正确顺序是？',options:['先通读全文','先读题干再定位','先看选项猜答案'],correct:1}],
    steps:[{focus:0,desc:'题型结构：4 篇 × 5 题 × 2 分 = 40 分'},{focus:1,desc:'读题干 → 定位 → 比对'},{focus:2,desc:'四类干扰项陷阱'}],
    draw:function(g,W,H,f){
      title(g,['题型结构','做题三步','干扰项陷阱'][f]);
      if(f===0){
        box(g,90,70,720,80,'var(--primary)',0.08);
        txt(g,450,105,'4 篇 × 5 题 × 2 分 = 40 分', 'var(--primary-strong)',17,'middle','700');
        txt(g,450,132,'占英语一总分的 40%','var(--text-muted)',11.5);
        [0,1,2,3].forEach(function(i){
          box(g,120+i*170,190,150,90,'var(--success)',0.08);
          txt(g,195+i*170,225,'Passage '+(i+1),'var(--success)',12,'middle','700');
          txt(g,195+i*170,250,'约 400 词 / 5 题','var(--text-muted)',10);
        });
        txt(g,450,325,'单篇建议 15~18 分钟','var(--text-muted)',11.5);
      }
      if(f===1){
        ['① 读题干：划关键词','② 回原文：定位 1~2 句','③ 比对：同义改写着为答案'].forEach(function(s,i){
          box(g,120,70+i*80,660,60,['var(--primary)','var(--success)','var(--highlight)'][i],0.08);
          txt(g,150,106+i*80,s,'var(--text)',13,'start','700');
        });
        txt(g,450,320,'答案一定在文中——不要凭常识答题','var(--primary-strong)',11.5,'middle','700');
      }
      if(f===2){
        const rows=[['偷换概念','把 A 说成 B','var(--danger)'],['以偏概全','用某段代替全文','var(--swap)'],['无中生有','文中根本没提','var(--compare)'],['正反混淆','与原文态度相反','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=55+i*64;
          box(g,110,y,680,52,r[2],0.08);
          txt(g,140,y+33,r[0],r[2],12.5,'start','700');
          txt(g,420,y+33,r[1],'var(--text)',11.5,'start');
        });
      }
    }
  },
  { id:'EN-05', level:'C', title:'阅读文章：每篇约 400-500 词，总约 1600 词',
    intuition:'四篇文章总长约 1600 词，题材以<strong>社会科学、经济、科技、文化</strong>为主，来源多为英美主流刊物。文章结构常见三种：<strong>总分总</strong>（观点—论证—结论）、<strong>问题—解决</strong>、<strong>现象—解释</strong>。抓住「首段 + 各段首句」就能拿到 80% 的框架信息。',
    derivation:['\\text{总阅读量} \\approx 1600 \\text{ 词}','\\text{题材}: \\; \\text{社科} + \\text{经济} + \\text{科技} + \\text{文化}','\\text{结构}: \\; \\text{总分总} / \\text{问题-解决} / \\text{现象-解释}','\\text{框架}: \\; \\text{首段} + \\text{各段首句}'],
    exam_text:'<b>【略读技巧】</b>3 分钟内如何把握一篇 400 词文章的主旨？',
    exam_answer:'答案：读三处即可：<b>① 首段</b>（提出话题与观点）、<b>② 各段首句</b>（每段论点）、<b>③ 末段</b>（结论/态度）。跳过例子、数据、引用——这些是「论据」，做题时再回看。这样 2~3 分钟能建立全文框架，做题时定位更快。',
    pitfalls:['不要逐句精读：时间不够，且细节题只需定位句。','转折词（but/however/yet）后面往往是作者真实观点。','例子本身不是观点，观点在例子前后的评论句。'],
    quiz:[{question:'四篇阅读总词数约为？',options:['800 词','1600 词','2500 词'],correct:1},{question:'快速抓主旨应读？',options:['所有细节','首段+各段首句+末段','只读题目'],correct:1},{question:'作者真实观点常在？',options:['转折词后','例子中','数据里'],correct:0}],
    steps:[{focus:0,desc:'总阅读量约 1600 词'},{focus:1,desc:'三种常见文章结构'},{focus:2,desc:'3 分钟略读法'}],
    draw:function(g,W,H,f){
      title(g,['阅读量','文章结构','略读法'][f]);
      if(f===0){
        [0,1,2,3].forEach(function(i){
          const hh=80+i*20;
          g.append('rect').attr('x',160+i*140).attr('y',300-hh).attr('width',100).attr('height',hh).attr('rx',6).attr('fill','var(--primary)').attr('fill-opacity',0.3).attr('stroke','var(--primary)').attr('stroke-width',1.6);
          txt(g,210+i*140,320,'Passage '+(i+1),'var(--text-muted)',10);
          txt(g,210+i*140,300-hh-8,'400~500 词','var(--text-muted)',9.5);
        });
        ln(g,140,300,720,300,'var(--border)',1.4);
        txt(g,450,350,'四篇合计约 1600 词','var(--primary-strong)',12,'middle','700');
      }
      if(f===1){
        const rows=[['总分总','观点 → 论证 → 结论','var(--primary)'],['问题—解决','提出问题 → 分析 → 方案','var(--success)'],['现象—解释','描述现象 → 给出原因','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=75+i*80;
          box(g,110,y,680,64,r[2],0.08);
          txt(g,140,y+26,r[0],'var(--text)',13,'start','700');
          txt(g,140,y+50,r[1],'var(--text-muted)',10.5,'start');
        });
      }
      if(f===2){
        ['① 首段：话题 + 观点','② 各段首句：分论点','③ 末段：结论/态度'].forEach(function(s,i){
          box(g,120,60+i*70,660,54,['var(--primary)','var(--success)','var(--highlight)'][i],0.08);
          txt(g,150,94+i*70,s,'var(--text)',12.5,'start','700');
        });
        txt(g,450,300,'跳过例子与数据，只抓「骨架句」','var(--primary-strong)',11.5,'middle','700');
        txt(g,450,330,'转折词后的句子往往才是作者真意','var(--text-muted)',11);
      }
    }
  },
  { id:'EN-06', level:'C', title:'阅读选材：学术期刊与专业评论',
    intuition:'英语一阅读选材集中在 <strong>The Economist、The Guardian、Nature、Scientific American</strong> 等英美主流刊物——特点是<strong>长难句多、抽象名词多、观点隐晦</strong>。备考建议：平时精读这类文章，积累「学术腔」表达（如 argue that、it is widely assumed that、the conventional wisdom is）。',
    derivation:['\\text{常见来源}: \\; \\text{Economist} / \\text{Guardian} / \\text{Nature}','\\text{语言特点}: \\; \\text{长难句} + \\text{抽象名词} + \\text{委婉观点}','\\text{高频表达}: \\; \\text{argue that} / \\text{suggest that}','\\text{态度词}: \\; \\text{skeptical} / \\text{ambiguous} / \\text{qualified}'],
    exam_text:'<b>【语言特点】</b>学术评论类文章常见的「委婉观点」表达有哪些？',
    exam_answer:'答案：<b>it is widely assumed that…</b>（人们普遍认为——作者常随后反驳）、<b>the conventional wisdom is…</b>（传统观点是）、<b>there is growing evidence that…</b>（越来越多证据表明）、<b>arguably…</b>（可以说）。这类表达后的「转折」往往才是作者立场，态度题就考这个。',
    pitfalls:['「引用他人观点」不等于「作者观点」，注意引号与转折。','学术文章态度往往「温和」，极端选项（strongly support/utterly reject）多半错。','专业术语不必全懂，抓住「态度+逻辑」即可。'],
    quiz:[{question:'英语一阅读常见来源是？',options:['The Economist','初中教材','小说'],correct:0},{question:'it is widely assumed that 后的转折常常？',options:['是作者观点','是废话','无关紧要'],correct:0},{question:'学术文章的态度通常？',options:['极端鲜明','温和有保留','完全中立'],correct:1}],
    steps:[{focus:0,desc:'常见选材来源'},{focus:1,desc:'语言特点与高频表达'},{focus:2,desc:'委婉观点与作者立场'}],
    draw:function(g,W,H,f){
      title(g,['选材来源','语言特点','委婉观点'][f]);
      if(f===0){
        ['The Economist','The Guardian','Nature / Science','Scientific American'].forEach(function(s,i){
          box(g,120,60+i*62,660,50,'var(--primary)',0.08);
          txt(g,450,92+i*62,s,'var(--text)',12.5,'middle','700');
        });
      }
      if(f===1){
        box(g,110,70,680,70,'var(--success)',0.08);
        txt(g,450,105,'长难句 + 抽象名词 + 隐含逻辑','var(--success)',13,'middle','700');
        box(g,110,165,680,70,'var(--highlight)',0.08);
        txt(g,450,200,'argue that / suggest that / imply that','var(--highlight)',12.5,'middle','700');
        txt(g,450,275,'读不懂术语时，抓「谁对谁做了什么」','var(--primary-strong)',11.5,'middle','700');
      }
      if(f===2){
        const rows=[['it is widely assumed that…','常被作者反驳','var(--danger)'],['the conventional wisdom is…','传统观点，常被质疑','var(--swap)'],['there is growing evidence that…','作者倾向支持','var(--success)']];
        rows.forEach(function(r,i){
          const y=75+i*80;
          box(g,100,y,700,64,r[2],0.08);
          txt(g,130,y+26,r[0],'var(--text)',12,'start','700');
          txt(g,130,y+50,r[1],'var(--text-muted)',10.5,'start');
        });
      }
    }
  },
  { id:'EN-07', level:'C', title:'阅读 Part A 考查重点总览',
    intuition:'阅读 Part A 五类题型的「题量—解法」：<strong>细节题</strong>（定位比对）、<strong>推理题</strong>（定位 + 合理推断）、<strong>态度题</strong>（找态度词）、<strong>主旨题</strong>（覆盖全文）、<strong>词义猜测题</strong>（上下文线索）。解题总原则：<strong>题干关键词定位 → 定位句精读 → 选项同义比对</strong>。',
    derivation:['\\text{细节} 40\\% + \\text{推理} 20\\% + \\text{态度} 15\\%','\\text{主旨} 15\\% + \\text{词义} 10\\%','\\text{总原则}: \\; \\text{定位} \\to \\text{精读} \\to \\text{比对}','\\text{正确项} = \\text{同义改写}; \\; \\text{干扰项} = \\text{偷换/绝对/无中生有}'],
    exam_text:'<b>【题型识别】</b>如何通过题干快速判断题型？',
    exam_answer:'答案：看题干「疑问词 + 动词」：<b>According to…/ mentions…</b> → 细节题；<b>infer / imply / suggest</b> → 推理题；<b>attitude / tone</b> → 态度题；<b>mainly about / best title</b> → 主旨题；<b>the word X probably means</b> → 词义题。识别题型后，解法就固定了。',
    pitfalls:['推理题不能「过度推理」——答案仍需文中依据。','态度题要区分「作者态度」与「文中人物态度」。','主旨题选项若只覆盖一段，通常是干扰项。'],
    quiz:[{question:'infer 属于哪类题？',options:['细节题','推理题','主旨题'],correct:1},{question:'细节题占比约？',options:['40%','20%','10%'],correct:0},{question:'主旨题正确选项应？',options:['覆盖全文','只覆盖一段','含绝对词'],correct:0}],
    steps:[{focus:0,desc:'五类题型的题量分布'},{focus:1,desc:'题干关键词识别题型'},{focus:2,desc:'统一的三步解法'}],
    draw:function(g,W,H,f){
      title(g,['题型分布','识别题型','三步解法'][f]);
      if(f===0){
        const rows=[['细节题','40%','var(--primary)'],['推理题','20%','var(--success)'],['态度题','15%','var(--highlight)'],['主旨题','15%','var(--swap)'],['词义题','10%','var(--danger)']];
        rows.forEach(function(r,i){
          const y=45+i*54;
          box(g,110,y,300,44,r[2],0.1);
          txt(g,160,y+28,r[0],'var(--text)',12,'start','700');
          g.append('rect').attr('x',430).attr('y',y+8).attr('width',parseInt(r[1])*6).attr('height',28).attr('rx',4).attr('fill',r[2]).attr('fill-opacity',0.35);
          txt(g,450+parseInt(r[1])*6,y+28,r[1],r[2],11,'start','700');
        });
      }
      if(f===1){
        const rows=[['According to…','细节题'],['infer / imply / suggest','推理题'],['attitude / tone','态度题'],['mainly about / title','主旨题']];
        rows.forEach(function(r,i){
          const y=65+i*66;
          box(g,110,y,680,54,'var(--primary)',0.06);
          txt(g,140,y+34,r[0],'var(--text)',12,'start','700');
          txt(g,560,y+34,r[1],'var(--highlight)',12,'start','700');
        });
      }
      if(f===2){
        ['① 题干关键词定位','② 定位句精读（含上下句）','③ 选项同义比对'].forEach(function(s,i){
          box(g,120,70+i*80,660,60,['var(--primary)','var(--success)','var(--highlight)'][i],0.08);
          txt(g,150,106+i*80,s,'var(--text)',13,'start','700');
        });
      }
    }
  },
  { id:'EN-08', level:'C', title:'细节题（约 40%）',
    intuition:'细节题是阅读的「主力题型」，解题只有一个字：<strong>找</strong>。步骤：题干关键词 → 原文定位 → 定位句与选项逐词比对。正确选项 = 定位句的<strong>同义改写</strong>（换词、换句式、换语态）；干扰项 = 偷换概念、扩大/缩小范围、正反混淆、无中生有。',
    derivation:['\\text{题干关键词} \\to \\text{定位句}','\\text{正确项} = \\text{同义改写（paraphrase）}','\\text{干扰项}: \\; \\text{偷换} / \\text{扩大} / \\text{正反} / \\text{无中生有}','\\text{警惕}: \\; \\text{原词照抄往往是陷阱}'],
    exam_text:'<b>【解题示范】</b>原文说 "The policy reduced costs by 20%"，选项说 "The policy cut expenses by one fifth"，是否正确？',
    exam_answer:'答案：<b>正确</b>。reduced costs = cut expenses（同义改写），20% = one fifth（数字改写）——这是典型的「同义改写型」正确项。反之，若选项说 "The policy eliminated all costs"（eliminated all 扩大了范围）则是偷换概念的干扰项。',
    pitfalls:['「原词照抄」的选项要警惕：出题人常把原文词拼成错误逻辑。','数字、时间、因果词是细节题的高危点，比对时要精确。','定位不到时，用「同义替换」再搜一次（如 reduce → cut → lower）。'],
    quiz:[{question:'细节题的正确选项通常是？',options:['原词照抄','同义改写','与原文相反'],correct:1},{question:'reduced costs 可改写为？',options:['cut expenses','raised prices','ignored costs'],correct:0},{question:'细节题第一步是？',options:['通读全文','题干关键词定位','猜答案'],correct:1}],
    steps:[{focus:0,desc:'细节题占比约 40%'},{focus:1,desc:'定位 + 同义比对'},{focus:2,desc:'四类干扰项'}],
    draw:function(g,W,H,f){
      title(g,['主力题型','定位比对','干扰项'][f]);
      if(f===0){
        box(g,110,80,680,80,'var(--primary)',0.08);
        txt(g,450,118,'细节题约占 40%','var(--primary-strong)',16,'middle','700');
        txt(g,450,146,'5 题中约 2 题是细节题','var(--text-muted)',11.5);
        txt(g,450,220,'解法只有一个字：找','var(--text)',13);
        txt(g,450,260,'题干关键词 → 原文定位 → 逐词比对','var(--text-muted)',11.5);
      }
      if(f===1){
        box(g,110,70,680,70,'var(--success)',0.08);
        txt(g,450,105,'原文：reduced costs by 20%','var(--text)',12,'middle','700');
        arw(g,450,145,450,185,'var(--highlight)');
        box(g,110,190,680,70,'var(--highlight)',0.1);
        txt(g,450,225,'选项：cut expenses by one fifth ✔','var(--success)',13,'middle','700');
        txt(g,450,250,'同义改写：reduce=cut，20%=one fifth','var(--text-muted)',10.5);
        txt(g,450,305,'原词照抄 ≠ 正确，改写才是答案','var(--primary-strong)',11.5,'middle','700');
      }
      if(f===2){
        const rows=[['偷换概念','主语/对象被替换','var(--danger)'],['扩大缩小','all/some/only 的陷阱','var(--swap)'],['正反混淆','与原文态度相反','var(--compare)'],['无中生有','文中未提及','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=55+i*64;
          box(g,110,y,680,52,r[2],0.08);
          txt(g,140,y+33,r[0],r[2],12.5,'start','700');
          txt(g,420,y+33,r[1],'var(--text)',11.5,'start');
        });
      }
    }
  },
  { id:'EN-09', level:'C', title:'推理题（约 20%）',
    intuition:'推理题标志词：<strong>infer / imply / suggest / learn from</strong>。原则：推理必须以原文为依据，<strong>「一步推理」</strong>即可，不能连环推断；答案往往是原文的「言外之意」，但仍在文中能找到支撑句。常见推理方向：因果推断、态度推断、段落目的推断。',
    derivation:['\\text{标志}: \\; \\text{infer} / \\text{imply} / \\text{suggest}','\\text{原则}: \\; \\text{一步推理，不过度}','\\text{支撑}: \\; \\text{答案能在文中找到依据}','\\text{方向}: \\; \\text{因果} / \\text{态度} / \\text{目的}'],
    exam_text:'<b>【常见错误】</b>推理题为什么容易「想太多」？如何避免？',
    exam_answer:'答案：因为考生常把「常识」或「进一步推论」当成答案。正确做法：<b>每个选项都要能回到原文某句</b>——找到支撑句的选项才选；找不到支撑的，即使「听起来很对」也不选。推理题的正确答案往往是「原文的保守改写」，而不是「大胆结论」。',
    pitfalls:['过度推理是推理题第一大坑：只走一步，不走两步。','含 must/always/never 的选项通常是过度推断。','「与原文一致但没回答问题」的选项也是错的。'],
    quiz:[{question:'推理题的标志词是？',options:['infer','according to','mainly about'],correct:0},{question:'推理题应走几步？',options:['一步','三步','越多越好'],correct:0},{question:'过度推理的典型词是？',options:['may','must','some'],correct:1}],
    steps:[{focus:0,desc:'标志词与推理方向'},{focus:1,desc:'一步推理原则'},{focus:2,desc:'保守改写才是答案'}],
    draw:function(g,W,H,f){
      title(g,['推理题标志','一步原则','保守改写'][f]);
      if(f===0){
        ['infer','imply','suggest','learn from'].forEach(function(s,i){
          box(g,130,60+i*62,620,50,'var(--primary)',0.08);
          txt(g,435,92+i*62,s,'var(--text)',13,'middle','700');
        });
        txt(g,450,325,'题干出现这些词 → 用「推理」思路','var(--text-muted)',11.5);
      }
      if(f===1){
        box(g,110,80,250,90,'var(--success)',0.1);
        txt(g,235,120,'原文句','var(--success)',13,'middle','700');
        txt(g,235,146,'（依据）','var(--text-muted)',10);
        arw(g,364,125,436,125,'var(--highlight)');
        txt(g,400,112,'一步','var(--highlight)',10.5,'middle','700');
        box(g,440,80,250,90,'var(--primary)',0.1);
        txt(g,565,120,'答案','var(--primary-strong)',13,'middle','700');
        txt(g,565,146,'（可回到原文）','var(--text-muted)',10);
        box(g,470,210,340,70,'var(--danger)',0.08);
        txt(g,640,240,'✘ 不要走第二步','var(--danger)',12,'middle','700');
        txt(g,640,262,'（常识/大胆结论）','var(--text-muted)',10);
        txt(g,450,325,'每个选项都要能找到支撑句','var(--text-muted)',11.5);
      }
      if(f===2){
        box(g,110,70,680,70,'var(--success)',0.08);
        txt(g,450,105,'正确答案：may / tend to / it is likely','var(--success)',12.5,'middle','700');
        box(g,110,165,680,70,'var(--danger)',0.08);
        txt(g,450,200,'干扰答案：must / always / never / all','var(--danger)',12.5,'middle','700');
        txt(g,450,275,'越「保守」的表述越可能是答案','var(--primary-strong)',11.5,'middle','700');
      }
    }
  },
  { id:'EN-10', level:'C', title:'态度题（约 15%）',
    intuition:'态度题问「作者对某事的看法」：<strong>attitude / tone / view</strong>。解题靠<strong>态度词</strong>：正面（supportive/approving/favorable）、负面（critical/skeptical/disapproving）、中性（objective/neutral/indifferent）。注意：<strong>indifferent（漠不关心）几乎不可能是答案</strong>——作者写文章必然有态度。',
    derivation:['\\text{标志}: \\; \\text{attitude} / \\text{tone} / \\text{view}','\\text{正面}: \\; \\text{supportive} / \\text{approving}','\\text{负面}: \\; \\text{critical} / \\text{skeptical}','\\text{中性}: \\; \\text{objective} / \\text{neutral}'],
    exam_text:'<b>【排除法】</b>态度题中 indifferent、puzzled、biased 为什么常是干扰项？',
    exam_answer:'答案：<b>indifferent（漠不关心）</b>：作者既然写文章讨论，就必然有态度，不可能漠不关心；<b>puzzled（困惑）</b>：学术文章作者通常立场清晰；<b>biased（有偏见）</b>：这是贬义评价，作者不会自认偏见。这三个词在态度题中几乎总是错的。',
    pitfalls:['indifferent 是态度题的「万年干扰项」，见到就排除。','区分「作者态度」与「文中人物态度」——题目问作者。','态度题要回到「评价性形容词/副词」所在的句子。'],
    quiz:[{question:'态度题中几乎必错的选项是？',options:['objective','indifferent','critical'],correct:1},{question:'critical 表示？',options:['支持','批评','中立'],correct:1},{question:'态度题问的是？',options:['文中人物态度','作者态度','读者态度'],correct:1}],
    steps:[{focus:0,desc:'三类态度词'},{focus:1,desc:'indifferent 为什么必错'},{focus:2,desc:'定位评价性词句'}],
    draw:function(g,W,H,f){
      title(g,['三类态度','必错选项','定位评价句'][f]);
      if(f===0){
        const rows=[['正面','supportive / approving / favorable','var(--success)'],['负面','critical / skeptical / disapproving','var(--danger)'],['中性','objective / neutral / detached','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=70+i*80;
          box(g,100,y,700,64,r[2],0.08);
          txt(g,130,y+26,r[0],r[2],13,'start','700');
          txt(g,260,y+26,r[1],'var(--text)',11.5,'start');
        });
      }
      if(f===1){
        ['indifferent（漠不关心）','puzzled（困惑）','biased（有偏见）'].forEach(function(s,i){
          box(g,110,65+i*66,680,54,'var(--danger)',0.08);
          txt(g,140,99+i*66,'✘ '+s,'var(--danger)',12.5,'start','700');
        });
        txt(g,450,300,'作者写文章必有态度 → indifferent 必错','var(--primary-strong)',11.5,'middle','700');
      }
      if(f===2){
        box(g,110,70,680,70,'var(--primary)',0.08);
        txt(g,450,105,'找评价性形容词/副词','var(--primary-strong)',13,'middle','700');
        txt(g,450,130,'（如 regrettably, fortunately, flawed）','var(--text-muted)',10.5);
        box(g,110,170,680,70,'var(--success)',0.08);
        txt(g,450,205,'注意转折词后的态度','var(--success)',13,'middle','700');
        txt(g,450,230,'（but / however 后才是真立场）','var(--text-muted)',10.5);
        txt(g,450,300,'态度题 = 找词 + 辨转折','var(--primary-strong)',11.5,'middle','700');
      }
    }
  },
  { id:'EN-11', level:'C', title:'主旨题（约 15%）',
    intuition:'主旨题问「文章主要讲什么」：<strong>mainly about / best title / main idea / purpose</strong>。解法：<strong>首段 + 各段首句 + 末段</strong>归纳；正确选项必须<strong>覆盖全文</strong>，不能只概括某段。错误选项特征：以偏概全（只覆盖一段）、范围过大（超出文章）、范围过小（漏掉核心）。',
    derivation:['\\text{标志}: \\; \\text{mainly about} / \\text{best title}','\\text{解法}: \\; \\text{首段} + \\text{各段首句} + \\text{末段}','\\text{正确}: \\; \\text{覆盖全文}','\\text{干扰}: \\; \\text{以偏概全} / \\text{范围失当}'],
    exam_text:'<b>【判断标准】</b>主旨题选项「覆盖全文」怎么判断？',
    exam_answer:'答案：用<b>「反向检验法」</b>——把选项当成标题，问自己「如果只写这个标题，文章会写成这样吗？」。若选项只对应某一段的内容，说明它是「以偏概全」；若选项比文章范围更大（如文章只讲某国，选项说全球），则是「范围过大」。真正的答案能概括每一段的核心。',
    pitfalls:['主旨题不要选「细节最吸引人」的选项——那往往是某段的例子。','首段若提出问题，主旨往往在末段的「解决方案」里。','「best title」要兼顾「准确 + 简洁 + 有吸引力」。'],
    quiz:[{question:'主旨题的正确选项应？',options:['覆盖全文','只覆盖首段','含绝对词'],correct:0},{question:'只覆盖一段的选项属于？',options:['正确答案','以偏概全','无中生有'],correct:1},{question:'主旨题标志词是？',options:['infer','mainly about','attitude'],correct:1}],
    steps:[{focus:0,desc:'主旨题的标志与解法'},{focus:1,desc:'反向检验法'},{focus:2,desc:'三类干扰项'}],
    draw:function(g,W,H,f){
      title(g,['标志与解法','反向检验','干扰项类型'][f]);
      if(f===0){
        box(g,110,70,680,60,'var(--primary)',0.08);
        txt(g,450,106,'mainly about / best title / main idea','var(--primary-strong)',12.5,'middle','700');
        ['首段：话题','各段首句：分论点','末段：结论'].forEach(function(s,i){
          box(g,150+i*200,160,180,70,'var(--success)',0.08);
          txt(g,240+i*200,200,s,'var(--text)',11.5,'middle','700');
        });
        txt(g,450,290,'三处合起来 = 全文主旨','var(--text-muted)',11.5);
      }
      if(f===1){
        box(g,110,70,680,70,'var(--highlight)',0.08);
        txt(g,450,105,'反向检验：把选项当标题','var(--highlight)',13,'middle','700');
        txt(g,450,130,'「文章会写成这样吗？」','var(--text-muted)',10.5);
        box(g,110,165,680,70,'var(--success)',0.08);
        txt(g,450,200,'能概括每一段 → 正确答案','var(--success)',12.5,'middle','700');
        box(g,110,255,680,70,'var(--danger)',0.08);
        txt(g,450,290,'只对应某段 → 以偏概全','var(--danger)',12.5,'middle','700');
      }
      if(f===2){
        const rows=[['以偏概全','只覆盖一段/一个例子','var(--danger)'],['范围过大','超出文章讨论范围','var(--swap)'],['范围过小','漏掉核心论点','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=75+i*78;
          box(g,100,y,700,62,r[2],0.08);
          txt(g,130,y+28,r[0],'var(--text)',12.5,'start','700');
          txt(g,130,y+50,r[1],'var(--text-muted)',10.5,'start');
        });
      }
    }
  },
  { id:'EN-12', level:'C', title:'词义猜测题（约 10%）',
    intuition:'词义题问「某个生词/短语在文中什么意思」：<strong>the word X probably means</strong>。解法全靠<strong>上下文线索</strong>：① 定义线索（that is, in other words）；② 举例线索（such as, for example）；③ 对比线索（but, unlike, rather than）；④ 因果线索（because, therefore）；⑤ 构词法（前缀/后缀/词根）。',
    derivation:['\\text{定义}: \\; \\text{that is} / \\text{in other words}','\\text{举例}: \\; \\text{such as} / \\text{for example}','\\text{对比}: \\; \\text{but} / \\text{unlike} / \\text{rather than}','\\text{因果}: \\; \\text{because} / \\text{therefore}'],
    exam_text:'<b>【解题示范】</b>原文："The plan was <u>thwarted</u> by the committee, which rejected every proposal." 推测 thwarted 的含义。',
    exam_answer:'答案：后半句「rejected every proposal（否决了每个提案）」是<b>解释性同位语</b>——说明计划被「阻止/挫败」。故 thwarted ≈ <b>prevented / blocked</b>。技巧：逗号后的定语从句/同位语常是对生词的解释。',
    pitfalls:['不要凭「词形像什么」猜——要靠上下文。','生词所在句读不懂时，读前后各一句。','选项若与「上下文逻辑方向」相反，直接排除。'],
    quiz:[{question:'词义题的主要线索是？',options:['上下文','词的长度','发音'],correct:0},{question:'such as 提供什么线索？',options:['定义','举例','转折'],correct:1},{question:'but 提供什么线索？',options:['对比','举例','因果'],correct:0}],
    steps:[{focus:0,desc:'五类上下文线索'},{focus:1,desc:'同位语与定义句'},{focus:2,desc:'排除逻辑相反的选项'}],
    draw:function(g,W,H,f){
      title(g,['五类线索','同位语解释','逻辑排除'][f]);
      if(f===0){
        const rows=[['定义','that is / in other words','var(--primary)'],['举例','such as / for example','var(--success)'],['对比','but / unlike / rather than','var(--danger)'],['因果','because / therefore','var(--highlight)'],['构词','前缀/后缀/词根','var(--swap)']];
        rows.forEach(function(r,i){
          const y=45+i*56;
          box(g,110,y,680,46,r[2],0.08);
          txt(g,140,y+29,r[0],r[2],12,'start','700');
          txt(g,300,y+29,r[1],'var(--text)',11.5,'start');
        });
      }
      if(f===1){
        box(g,90,70,720,90,'var(--primary)',0.08);
        txt(g,450,102,'The plan was thwarted by the committee,','var(--text)',11.5,'middle');
        txt(g,450,126,'which rejected every proposal.','var(--text)',11.5,'middle');
        arw(g,450,165,450,205,'var(--highlight)');
        box(g,150,215,600,70,'var(--success)',0.1);
        txt(g,450,250,'thwarted ≈ prevented / blocked','var(--success)',13,'middle','700');
        txt(g,450,272,'（由 rejected every proposal 推出）','var(--text-muted)',10.5);
        txt(g,450,320,'逗号后的从句/同位语 = 免费的解释','var(--primary-strong)',11.5,'middle','700');
      }
      if(f===2){
        box(g,110,80,680,70,'var(--danger)',0.08);
        txt(g,450,115,'选项若与上下文逻辑相反 → 直接排除','var(--danger)',12.5,'middle','700');
        box(g,110,175,680,70,'var(--success)',0.08);
        txt(g,450,210,'选项若过于绝对（all/never） → 警惕','var(--success)',12.5,'middle','700');
        txt(g,450,285,'猜测 = 上下文证据 + 构词法辅助','var(--primary-strong)',11.5,'middle','700');
      }
    }
  },
  { id:'EN-13', level:'C', title:'新题型：5 题，每题 2 分',
    intuition:'新题型（Part B）共 5 题、每题 2 分、<strong>共 10 分</strong>，文章 500~600 词。三种备选题型：<strong>七选五</strong>（选句填空）、<strong>排序题</strong>（段落排序）、<strong>小标题匹配</strong>（给段落选标题）。核心能力是<strong>语篇衔接</strong>：代词指代、逻辑连接词、重复关键词。',
    derivation:['\\text{总分} = 5 \\times 2 = 10 \\text{ 分}','\\text{文章} \\approx 500\\sim600 \\text{ 词}','\\text{三种题型}: \\; \\text{七选五} / \\text{排序} / \\text{标题匹配}','\\text{核心}: \\; \\text{代词} + \\text{连接词} + \\text{关键词复现}'],
    exam_text:'<b>【通用方法】</b>新题型「语篇衔接」具体看什么？',
    exam_answer:'答案：三看：<b>① 代词</b>（this/these/it/they 必须能指代前文内容）；<b>② 逻辑连接词</b>（however/therefore/moreover 决定段落关系）；<b>③ 关键词复现</b>（同词/同义/上下义词在相邻段落出现）。这三条能解决 80% 的新题型空格。',
    pitfalls:['七选五选项中若出现「指代不明的 this」，多半不填在段首。','排序题先找「首段」（通常无指代、引出话题）与「尾段」（总结）。','小标题匹配要选「概括该段」的，不是「文中出现的词」。'],
    quiz:[{question:'新题型共多少分？',options:['5 分','10 分','20 分'],correct:1},{question:'新题型的核心能力是？',options:['语篇衔接','单词拼写','语法分析'],correct:0},{question:'this/these 属于哪类线索？',options:['代词指代','逻辑连接','关键词复现'],correct:0}],
    steps:[{focus:0,desc:'题型与分值：5 题 × 2 分'},{focus:1,desc:'三种备选题型'},{focus:2,desc:'三大衔接线索'}],
    draw:function(g,W,H,f){
      title(g,['题型与分值','三种题型','衔接线索'][f]);
      if(f===0){
        box(g,110,70,680,80,'var(--primary)',0.08);
        txt(g,450,105,'5 题 × 2 分 = 10 分','var(--primary-strong)',17,'middle','700');
        txt(g,450,132,'文章 500~600 词','var(--text-muted)',11.5);
        txt(g,450,220,'位置：阅读 Part A 之后的 Part B','var(--text)',12.5);
        txt(g,450,260,'建议用时：15~18 分钟','var(--text-muted)',11.5);
      }
      if(f===1){
        const rows=[['七选五','从 7 个句子选 5 个填空','var(--primary)'],['排序题','给打乱的段落排序','var(--success)'],['小标题匹配','给段落选标题','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=75+i*80;
          box(g,100,y,700,64,r[2],0.08);
          txt(g,130,y+26,r[0],r[2],13,'start','700');
          txt(g,130,y+50,r[1],'var(--text-muted)',10.5,'start');
        });
      }
      if(f===2){
        const rows=[['代词指代','this / these / it / they','var(--primary)'],['逻辑连接','however / therefore / moreover','var(--success)'],['关键词复现','同词/同义/上下义','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=70+i*76;
          box(g,100,y,700,60,r[2],0.08);
          txt(g,130,y+26,r[0],r[2],12.5,'start','700');
          txt(g,130,y+48,r[1],'var(--text-muted)',10.5,'start');
        });
        txt(g,450,315,'三条线索能解决 80% 的空格','var(--primary-strong)',11.5,'middle','700');
      }
    }
  },
  { id:'EN-14', level:'C', title:'新题型文章：500-600 词',
    intuition:'新题型文章比 Part A 更长（500~600 词），但<strong>逻辑结构更清晰</strong>——常是「总—分」结构，每段一个论点。这反而利于「抓段落主旨」。做题时先读<strong>已知段落</strong>（七选五中未挖空的段落），据此推断空格段的内容与位置。',
    derivation:['\\text{长度} = 500\\sim600 \\text{ 词}','\\text{结构}: \\; \\text{总分} / \\text{并列} / \\text{递进}','\\text{策略}: \\; \\text{先读已知段} \\to \\text{推空格内容}','\\text{每段} = \\text{一个论点} + \\text{支撑}'],
    exam_text:'<b>【策略】</b>七选五中，如何利用「已知段落」推断空格内容？',
    exam_answer:'答案：① 读空格前一段的<b>末句</b>与后一段的<b>首句</b>，确定空格段应承担的「过渡功能」；② 看已知段落的<b>主题词</b>，空格段大概率围绕同一主题展开；③ 若空格在段首，它通常是该段的<b>主题句</b>；在段尾则是<b>总结句</b>。',
    pitfalls:['不要只看空格所在句——七选五考的是「段际逻辑」。','空格在段首时，选项不能以 this/these 开头（指代无处可指）。','文章长短不影响方法：抓段落主旨 + 衔接词即可。'],
    quiz:[{question:'新题型文章长度约为？',options:['400 词','500~600 词','800 词'],correct:1},{question:'空格在段首通常是？',options:['主题句','总结句','例子'],correct:0},{question:'七选五应重点读？',options:['已知段落','选项本身','题目要求'],correct:0}],
    steps:[{focus:0,desc:'文章结构与长度'},{focus:1,desc:'已知段落推断法'},{focus:2,desc:'段首/段尾的填空规律'}],
    draw:function(g,W,H,f){
      title(g,['文章结构','已知段推断','填空位置规律'][f]);
      if(f===0){
        [['第1段','总论点','var(--primary)'],['第2段','分论点1','var(--success)'],['第3段','分论点2','var(--highlight)'],['第4段','总结','var(--swap)']].forEach(function(r,i){
          box(g,120,55+i*62,660,50,r[2],0.08);
          txt(g,170,87+i*62,r[0],r[2],12,'start','700');
          txt(g,320,87+i*62,r[1],'var(--text)',11.5,'start');
        });
        txt(g,450,320,'总分结构：每段一个论点','var(--text-muted)',11.5);
      }
      if(f===1){
        box(g,110,70,680,60,'var(--primary)',0.08);
        txt(g,450,106,'读前段末句 + 后段首句','var(--primary-strong)',12.5,'middle','700');
        box(g,110,155,680,60,'var(--success)',0.08);
        txt(g,450,191,'看主题词是否复现','var(--success)',12.5,'middle','700');
        box(g,110,240,680,60,'var(--highlight)',0.08);
        txt(g,450,276,'判断空格的「过渡功能」','var(--highlight)',12.5,'middle','700');
      }
      if(f===2){
        box(g,110,70,320,90,'var(--success)',0.08);
        txt(g,270,105,'段首空','var(--success)',13,'middle','700');
        txt(g,270,132,'→ 主题句','var(--text-muted)',10.5);
        box(g,470,70,320,90,'var(--highlight)',0.08);
        txt(g,630,105,'段尾空','var(--highlight)',13,'middle','700');
        txt(g,630,132,'→ 总结句','var(--text-muted)',10.5);
        txt(g,450,230,'段首空不能以 this/these 开头','var(--danger)',12,'middle','700');
        txt(g,450,270,'（指代无处可指）','var(--text-muted)',10.5);
      }
    }
  },
  { id:'EN-15', level:'C', title:'新题型三种备选题型',
    intuition:'三种题型每年考一种：<strong>七选五</strong>（最常考）——7 个句子选 5 个填回原文；<strong>排序题</strong>——把打乱的段落（A~G）排出正确顺序；<strong>小标题匹配</strong>——给若干段落选标题。三种题型的共同基础都是「段落主旨 + 衔接词」。',
    derivation:['\\text{七选五}: \\; \\text{7 选 5，考衔接}','\\text{排序}: \\; \\text{段落顺序，考逻辑}','\\text{标题匹配}: \\; \\text{段落主旨，考概括}','\\text{共同基础}: \\; \\text{主旨} + \\text{衔接}'],
    exam_text:'<b>【题型差异】</b>三种新题型分别最该关注什么？',
    exam_answer:'答案：<b>七选五</b>看「空格前后句的衔接」（代词、连接词）；<b>排序题</b>看「时间顺序、因果链、指代关系」（首段无指代、后有明确线索）；<b>小标题匹配</b>看「段落主旨」——标题必须是该段的概括，而不是某个细节。',
    pitfalls:['三种题型不要混用方法：七选五重衔接，排序重逻辑链。','排序题先定「首段」与「尾段」，中间用指代关系串。','标题匹配的标题通常简短（名词短语），不是完整句子。'],
    quiz:[{question:'最常考的新题型是？',options:['七选五','排序','标题匹配'],correct:0},{question:'排序题最该关注？',options:['逻辑链','词汇量','语法'],correct:0},{question:'标题匹配的标题通常是？',options:['完整句子','简短名词短语','段落原文'],correct:1}],
    steps:[{focus:0,desc:'三种题型概览'},{focus:1,desc:'各自的核心方法'},{focus:2,desc:'通用基础：主旨 + 衔接'}],
    draw:function(g,W,H,f){
      title(g,['三种题型','核心方法','通用基础'][f]);
      if(f===0){
        const rows=[['七选五','7 个句子选 5 个','var(--primary)'],['排序题','段落排顺序','var(--success)'],['小标题匹配','给段落选标题','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=70+i*80;
          box(g,100,y,700,64,r[2],0.08);
          txt(g,130,y+26,r[0],r[2],13,'start','700');
          txt(g,130,y+50,r[1],'var(--text-muted)',10.5,'start');
        });
      }
      if(f===1){
        box(g,90,60,330,90,'var(--primary)',0.08);
        txt(g,255,94,'七选五','var(--primary-strong)',13,'middle','700');
        txt(g,255,120,'看前后句衔接','var(--text-muted)',10.5);
        box(g,480,60,330,90,'var(--success)',0.08);
        txt(g,645,94,'排序','var(--success)',13,'middle','700');
        txt(g,645,120,'看因果/时间链','var(--text-muted)',10.5);
        box(g,90,180,720,90,'var(--highlight)',0.08);
        txt(g,450,214,'标题匹配：标题 = 该段概括','var(--highlight)',12.5,'middle','700');
        txt(g,450,240,'（不是某个细节词）','var(--text-muted)',10.5);
        txt(g,450,310,'先定首尾段，中间用指代串联','var(--primary-strong)',11.5,'middle','700');
      }
      if(f===2){
        box(g,110,80,680,70,'var(--success)',0.08);
        txt(g,450,115,'段落主旨 + 衔接手段','var(--success)',13,'middle','700');
        txt(g,450,140,'（代词、连接词、关键词复现）','var(--text-muted)',10.5);
        box(g,110,180,680,70,'var(--primary)',0.08);
        txt(g,450,215,'三种题型共享同一套底层能力','var(--primary-strong)',12.5,'middle','700');
        txt(g,450,285,'练熟一套，三种题型都能应付','var(--text-muted)',11.5);
      }
    }
  },
  { id:'EN-16', level:'C', title:'新题型考查重点：语篇衔接与逻辑梳理',
    intuition:'新题型的本质是「补全语篇」：<strong>指代</strong>（this/that/it/they 指什么）、<strong>转折</strong>（but/however 前后相反）、<strong>因果</strong>（therefore/as a result）、<strong>递进</strong>（moreover/furthermore）、<strong>例证</strong>（for instance）。空格处的句子必须与前后文在「话题 + 逻辑 + 语法」三方面都匹配。',
    derivation:['\\text{指代}: \\; \\text{this} / \\text{these} / \\text{it} \\text{ 必须有先行词}','\\text{转折}: \\; \\text{前后语义相反}','\\text{因果}: \\; \\text{前因后果 或 前果后因}','\\text{例证}: \\; \\text{观点} \\to \\text{例子}'],
    exam_text:'<b>【实战】</b>空格前一句是「However, this approach has a fatal flaw.」，空格应填什么？',
    exam_answer:'答案：应填<b>解释这个 flaw 的句子</b>（具体说明缺陷是什么）。线索：① this approach 指代前文的某种方法；② fatal flaw 是「总起」，空格是其「展开」；③ 后面若还有「for example」，则空格可能是概括性描述。逻辑链：方法 → 缺陷 → 例证。',
    pitfalls:['空格句若出现新话题，通常不选——语篇要求话题一致。','however 后的句子必须与「前一句」形成对比。','注意时态一致：空格句的时态要与上下文协调。'],
    quiz:[{question:'this/these 必须有什么？',options:['先行词','大写','引号'],correct:0},{question:'however 前后语义？',options:['一致','相反','无关'],correct:1},{question:'空格句的话题必须？',options:['与前文一致','完全无关','引入新话题'],correct:0}],
    steps:[{focus:0,desc:'五类衔接手段'},{focus:1,desc:'话题、逻辑、语法三重匹配'},{focus:2,desc:'实战推理链'}],
    draw:function(g,W,H,f){
      title(g,['五类衔接','三重匹配','推理链'][f]);
      if(f===0){
        const rows=[['指代','this/these/it 有先行词','var(--primary)'],['转折','but/however 前后相反','var(--danger)'],['因果','therefore/as a result','var(--success)'],['递进','moreover/furthermore','var(--highlight)'],['例证','for instance/such as','var(--swap)']];
        rows.forEach(function(r,i){
          const y=45+i*56;
          box(g,110,y,680,46,r[2],0.08);
          txt(g,140,y+29,r[0],r[2],12,'start','700');
          txt(g,300,y+29,r[1],'var(--text)',11.5,'start');
        });
      }
      if(f===1){
        const rows=[['话题一致','空格句不能引入新主题','var(--primary)'],['逻辑匹配','连接词决定关系','var(--success)'],['语法协调','时态/人称/单复数','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=75+i*76;
          box(g,100,y,700,60,r[2],0.08);
          txt(g,130,y+26,r[0],r[2],12.5,'start','700');
          txt(g,130,y+48,r[1],'var(--text-muted)',10.5,'start');
        });
      }
      if(f===2){
        ['方法 → 缺陷','缺陷 → 例证','例证 → 结论'].forEach(function(s,i){
          box(g,150+i*200,90,170,70,'var(--primary)',0.08);
          txt(g,235+i*200,130,s,'var(--text)',12,'middle','700');
        });
        arw(g,320,125,350,125,'var(--highlight)');
        arw(g,520,125,550,125,'var(--highlight)');
        txt(g,450,240,'逻辑链一旦理清，空格句的内容就确定了','var(--primary-strong)',11.5,'middle','700');
      }
    }
  },
  { id:'EN-17', level:'C', title:'翻译：5 个长难句，每句 2 分',
    intuition:'英语一翻译（Part C）从一篇约 400 词的学术短文中选 <strong>5 个长难句</strong>，每句 2 分、<strong>共 10 分</strong>。评分按「分段给分」：句子被切成 3~4 个意群，每个意群译对得 0.5 分。核心能力：<strong>拆句</strong>（找主干、切从句）+ <strong>重组</strong>（按汉语习惯调整语序）。',
    derivation:['\\text{总分} = 5 \\times 2 = 10 \\text{ 分}','\\text{评分}: \\; \\text{按意群给分（每段 0.5）}','\\text{步骤}: \\; \\text{找主干} \\to \\text{切从句} \\to \\text{重组}','\\text{原则}: \\; \\text{忠实} > \\text{通顺}'],
    exam_text:'<b>【评分标准】</b>翻译为什么「译对一半也能得分」？',
    exam_answer:'答案：因为评分是<b>按意群</b>给分的：一个长句通常拆成 3~4 个意群，每个意群译对得 0.5 分，整句 2 分。所以即使句子没完全译顺，只要<b>关键词和结构</b>译对，仍能拿到部分分数——这要求我们「先保证每段意思对，再润色通顺」。',
    pitfalls:['不要漏译：每个词都要有交代，漏译扣分。','不要「过度意译」：改变原意的润色会丢分。','定语从句太长时，拆成独立句更符合汉语习惯。'],
    quiz:[{question:'翻译共多少分？',options:['5 分','10 分','15 分'],correct:1},{question:'评分方式是？',options:['整体印象','按意群给分','按字数'],correct:1},{question:'翻译第一步是？',options:['找主干','查词典','润色'],correct:0}],
    steps:[{focus:0,desc:'题型：5 句 × 2 分'},{focus:1,desc:'按意群给分'},{focus:2,desc:'拆句三步法'}],
    draw:function(g,W,H,f){
      title(g,['题型结构','意群给分','拆句三步'][f]);
      if(f===0){
        box(g,100,70,700,80,'var(--primary)',0.08);
        txt(g,450,105,'5 个长难句 × 2 分 = 10 分','var(--primary-strong)',16,'middle','700');
        txt(g,450,132,'从约 400 词短文中选取','var(--text-muted)',11.5);
        txt(g,450,215,'句子长度：通常 30~50 词，含 2~3 个从句','var(--text)',12.5);
        txt(g,450,255,'建议用时：20 分钟','var(--text-muted)',11.5);
      }
      if(f===1){
        box(g,100,70,700,60,'var(--success)',0.08);
        txt(g,450,106,'句子切成 3~4 个意群，每段 0.5 分','var(--success)',12.5,'middle','700');
        [0,1,2,3].forEach(function(i){
          box(g,140+i*160,160,140,60,'var(--primary)',0.08);
          txt(g,210+i*160,197,'意群 '+(i+1),'var(--text)',11.5,'middle','700');
        });
        txt(g,450,270,'译对意群即得分，不必整句完美','var(--primary-strong)',11.5,'middle','700');
      }
      if(f===2){
        ['① 找主干（主谓宾）','② 切从句（定语/状语/名词性）','③ 重组（按汉语语序）'].forEach(function(s,i){
          box(g,120,65+i*76,660,58,['var(--primary)','var(--success)','var(--highlight)'][i],0.08);
          txt(g,150,100+i*76,s,'var(--text)',12.5,'start','700');
        });
      }
    }
  },
  { id:'EN-18', level:'C', title:'翻译：英译汉',
    intuition:'英译汉的核心差异：英语<strong>重形合</strong>（靠连接词、从句搭骨架），汉语<strong>重意合</strong>（靠语序、短句）。所以翻译要做三件事：<strong>拆长句</strong>（从句独立成句）、<strong>调语序</strong>（定语前置/状语提前）、<strong>补省略</strong>（英语省略的主语/宾语汉语要补出）。',
    derivation:['\\text{英语}: \\; \\text{形合（连接词、从句）}','\\text{汉语}: \\; \\text{意合（短句、语序）}','\\text{拆}: \\; \\text{长句} \\to \\text{短句}','\\text{调}: \\; \\text{定语前置、状语提前}'],
    exam_text:'<b>【译法】</b>"The scientists who studied the data concluded that the theory was flawed." 怎么译？',
    exam_answer:'答案：主干：The scientists concluded that…（科学家们得出结论）；定语从句 who studied the data → 「研究这些数据的」；宾语从句 the theory was flawed → 「该理论有缺陷」。译为：<b>「研究这些数据的科学家们得出结论：该理论存在缺陷。」</b>——定语前置、宾语从句独立成句。',
    pitfalls:['英语长定语直接硬译会变「的的不休」，要拆句。','被动语态在汉语中常转主动（「被认为」→「人们认为」）。','代词 it/they 要还原为具体名词，避免「它它它」。'],
    quiz:[{question:'英语重什么？',options:['形合','意合','韵律'],correct:0},{question:'汉语重什么？',options:['形合','意合','格律'],correct:1},{question:'长定语从句常怎么处理？',options:['拆成短句','保留原序','删掉'],correct:0}],
    steps:[{focus:0,desc:'形合 vs 意合'},{focus:1,desc:'拆句、调序、补省略'},{focus:2,desc:'被动与代词的汉语化'}],
    draw:function(g,W,H,f){
      title(g,['形合 vs 意合','三种调整','汉语化处理'][f]);
      if(f===0){
        box(g,70,70,360,120,'var(--primary)',0.08);
        txt(g,250,105,'英语：形合','var(--primary-strong)',13,'middle','700');
        txt(g,250,135,'连接词 + 从句搭骨架','var(--text-muted)',10.5);
        txt(g,250,160,'句子可以很长','var(--text-muted)',10.5);
        box(g,470,70,360,120,'var(--success)',0.08);
        txt(g,650,105,'汉语：意合','var(--success)',13,'middle','700');
        txt(g,650,135,'靠语序与短句','var(--text-muted)',10.5);
        txt(g,650,160,'句子宜短','var(--text-muted)',10.5);
        txt(g,450,250,'翻译 = 把「形合」重构成「意合」','var(--primary-strong)',11.5,'middle','700');
      }
      if(f===1){
        const rows=[['拆','长句 → 短句','var(--primary)'],['调','定语前置、状语提前','var(--success)'],['补','补出省略的主语/宾语','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=75+i*76;
          box(g,100,y,700,60,r[2],0.08);
          txt(g,140,y+37,r[0],r[2],14,'start','700');
          txt(g,220,y+37,r[1],'var(--text)',11.5,'start');
        });
      }
      if(f===2){
        box(g,110,70,680,70,'var(--success)',0.08);
        txt(g,450,105,'被动 → 主动（「被认为」→「人们认为」）','var(--success)',12,'middle','700');
        box(g,110,165,680,70,'var(--highlight)',0.08);
        txt(g,450,200,'it/they → 还原为具体名词','var(--highlight)',12,'middle','700');
        txt(g,450,275,'目标：读起来像「中国人写的中文」','var(--primary-strong)',11.5,'middle','700');
      }
    }
  },
  { id:'EN-19', level:'C', title:'翻译考查重点：长难句拆解与语法分析',
    intuition:'长难句拆解四步：<strong>① 找主谓宾</strong>（跳过介词短语与从句）；<strong>② 识别从句类型</strong>（定语 which/that、状语 when/because、名词性 that/what）；<strong>③ 处理特殊结构</strong>（倒装、省略、插入语、比较结构）；<strong>④ 重组译文</strong>。语法分析是「拆」的依据。',
    derivation:['\\text{① 找主干}: \\; \\text{主} + \\text{谓} + \\text{宾}','\\text{② 识从句}: \\; \\text{定语} / \\text{状语} / \\text{名词性}','\\text{③ 特殊}: \\; \\text{倒装} / \\text{省略} / \\text{插入语}','\\text{④ 重组}: \\; \\text{按汉语语序}'],
    exam_text:'<b>【拆句示范】</b>分析 "What matters is not the data itself but how it is interpreted." 的结构。',
    exam_answer:'答案：主语是 <b>What matters</b>（主语从句）；谓语 is；表语是 <b>not the data itself but how it is interpreted</b>（not…but… 并列，后者是表语从句）。译为：<b>「重要的不是数据本身，而是如何解读它。」</b>——先抓「What matters is…」骨架，再处理并列。',
    pitfalls:['插入语（两个逗号之间）先跳过，读完再看。','it/that 可能引导强调句（It is … that …），别误判为代词。','比较结构（more…than）要把「比较对象」译清楚。'],
    quiz:[{question:'拆句第一步是？',options:['找主谓宾','查生词','润色'],correct:0},{question:'which 通常引导？',options:['定语从句','主语从句','感叹句'],correct:0},{question:'两个逗号之间通常是？',options:['插入语','主句','从句'],correct:0}],
    steps:[{focus:0,desc:'四步拆句法'},{focus:1,desc:'从句类型识别'},{focus:2,desc:'特殊结构处理'}],
    draw:function(g,W,H,f){
      title(g,['四步拆句','从句类型','特殊结构'][f]);
      if(f===0){
        ['① 找主干','② 识从句','③ 处理特殊结构','④ 重组译文'].forEach(function(s,i){
          box(g,120,55+i*62,660,50,['var(--primary)','var(--success)','var(--highlight)','var(--swap)'][i],0.08);
          txt(g,150,87+i*62,s,'var(--text)',12.5,'start','700');
        });
      }
      if(f===1){
        const rows=[['定语从句','which / that / who','var(--primary)'],['状语从句','when / because / although','var(--success)'],['名词性从句','that / what / whether','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=75+i*76;
          box(g,100,y,700,60,r[2],0.08);
          txt(g,130,y+26,r[0],r[2],12.5,'start','700');
          txt(g,130,y+48,r[1],'var(--text-muted)',10.5,'start');
        });
      }
      if(f===2){
        const rows=[['倒装','Only…did he…','var(--primary)'],['省略','than (it is) expected','var(--success)'],['插入语','两个逗号之间，先跳过','var(--highlight)'],['强调句','It is … that …','var(--swap)']];
        rows.forEach(function(r,i){
          const y=55+i*62;
          box(g,100,y,700,50,r[2],0.08);
          txt(g,130,y+32,r[0],r[2],12,'start','700');
          txt(g,300,y+32,r[1],'var(--text)',11,'start');
        });
      }
    }
  },
  { id:'EN-20', level:'C', title:'小作文 Part A：应用文写作约 100 词，10 分',
    intuition:'小作文（Part A）要求写<strong>约 100 词的应用文</strong>，10 分：书信（建议信/投诉信/感谢信/道歉信/邀请信）、通知、备忘录等。评分看三点：<strong>格式正确</strong>（称呼、正文、结尾、署名）、<strong>要点齐全</strong>（题干要求的信息全部覆盖）、<strong>语言得体</strong>（语气与对象匹配）。',
    derivation:['\\text{词数} \\approx 100 \\text{ 词},\\; \\text{10 分}','\\text{格式}: \\; \\text{Dear…} + \\text{正文} + \\text{Yours,}','\\text{要点}: \\; \\text{题干要求全覆盖}','\\text{语言}: \\; \\text{正式/半正式/非正式}'],
    exam_text:'<b>【写作结构】</b>100 词的应用文如何分配篇幅？',
    exam_answer:'答案：三段式：<b>① 开头（1~2 句）</b>——说明写信目的；<b>② 主体（4~6 句）</b>——覆盖题干所有要点（建议/理由/细节）；<b>③ 结尾（1~2 句）</b>——期待回复/表达感谢。总词数控制在 90~110 词，不要超太多（超字数不扣分但会挤占大作文时间）。',
    pitfalls:['格式错误直接扣分：称呼（Dear Mr. Wang,）、结尾（Yours sincerely,）、署名别漏。','题干要点必须逐条覆盖，漏一个就丢分。','语气要匹配：给教授写信不能太随意，给朋友可以轻松。'],
    quiz:[{question:'小作文的词数要求是？',options:['约 100 词','约 160 词','约 200 词'],correct:0},{question:'小作文满分是？',options:['10 分','15 分','20 分'],correct:0},{question:'应用文最重要的是？',options:['格式+要点','辞藻华丽','长度'],correct:0}],
    steps:[{focus:0,desc:'题型与评分三要素'},{focus:1,desc:'三段式结构'},{focus:2,desc:'格式与语气'}],
    draw:function(g,W,H,f){
      title(g,['题型与评分','三段式','格式与语气'][f]);
      if(f===0){
        box(g,100,65,700,70,'var(--primary)',0.08);
        txt(g,450,100,'约 100 词 · 10 分','var(--primary-strong)',16,'middle','700');
        const rows=[['格式','称呼/结尾/署名','var(--success)'],['要点','题干信息全覆盖','var(--highlight)'],['语言','得体、准确','var(--swap)']];
        rows.forEach(function(r,i){
          const y=160+i*56;
          box(g,110,y,680,46,r[2],0.08);
          txt(g,140,y+29,r[0],r[2],12,'start','700');
          txt(g,260,y+29,r[1],'var(--text)',11,'start');
        });
      }
      if(f===1){
        ['① 开头：写信目的（1~2 句）','② 主体：覆盖要点（4~6 句）','③ 结尾：期待/感谢（1~2 句）'].forEach(function(s,i){
          box(g,110,65+i*76,700,58,['var(--primary)','var(--success)','var(--highlight)'][i],0.08);
          txt(g,140,100+i*76,s,'var(--text)',12.5,'start','700');
        });
      }
      if(f===2){
        box(g,100,70,340,100,'var(--success)',0.08);
        txt(g,270,106,'正式','var(--success)',13,'middle','700');
        txt(g,270,132,'Dear Professor Li,','var(--text-muted)',10);
        txt(g,270,152,'Yours sincerely,','var(--text-muted)',10);
        box(g,460,70,340,100,'var(--highlight)',0.08);
        txt(g,630,106,'非正式','var(--highlight)',13,'middle','700');
        txt(g,630,132,'Dear Tom,','var(--text-muted)',10);
        txt(g,630,152,'Best wishes,','var(--text-muted)',10);
        txt(g,450,230,'语气 = 写信人与收信人的关系','var(--primary-strong)',11.5,'middle','700');
      }
    }
  },
  { id:'EN-22', level:'C', title:'大纲词汇 5529 个',
    intuition:'英语一大纲词汇约 <strong>5529 个</strong>（2026 年微调后），另有前缀、后缀、派生词。词汇是阅读、翻译、写作的共同底座。备考策略：<strong>高频词优先</strong>（真题反复出现的约 1500 词）、<strong>熟词僻义</strong>（如 address 除「地址」还有「处理/演讲」）、<strong>语境记忆</strong>（在句子中记，不背单词表）。',
    derivation:['\\text{大纲词汇} \\approx 5529 \\text{ 个}','\\text{高频核心} \\approx 1500 \\text{ 词}','\\text{熟词僻义}: \\; \\text{address: 处理/演讲}','\\text{记忆}: \\; \\text{语境} > \\text{词表}'],
    exam_text:'<b>【备考策略】</b>5500 词记不完怎么办？如何抓重点？',
    exam_answer:'答案：按「性价比」排序：<b>① 真题高频词</b>（近 15 年反复出现的约 1500 词，必须滚瓜烂熟）；<b>② 熟词僻义</b>（阅读最爱考，如 school 的「学派」、capital 的「资本」）；<b>③ 大纲新增词</b>（每年微调的部分）；<b>④ 低频词</b>（认识即可，不必会拼）。',
    pitfalls:['不要按字母表背：A 开头的词背三天就放弃——按高频/话题分类。','只记中文意思不够：要记搭配与例句。','熟词僻义是阅读失分重灾区，遇到「认识的词读不通」要警惕。'],
    quiz:[{question:'大纲词汇约多少个？',options:['3500','5529','8000'],correct:1},{question:'高频核心词约？',options:['500','1500','3000'],correct:1},{question:'address 的僻义是？',options:['地址','处理/演讲','添加'],correct:1}],
    steps:[{focus:0,desc:'词汇量与结构'},{focus:1,desc:'高频词优先'},{focus:2,desc:'熟词僻义与语境记忆'}],
    draw:function(g,W,H,f){
      title(g,['词汇结构','高频优先','熟词僻义'][f]);
      if(f===0){
        box(g,110,70,680,70,'var(--primary)',0.08);
        txt(g,450,105,'大纲词汇 ≈ 5529 个','var(--primary-strong)',15,'middle','700');
        box(g,110,165,680,70,'var(--success)',0.08);
        txt(g,450,200,'高频核心 ≈ 1500 个','var(--success)',14,'middle','700');
        box(g,110,260,680,70,'var(--highlight)',0.08);
        txt(g,450,295,'其余 ≈ 4000 个（认识即可）','var(--highlight)',13,'middle','700');
      }
      if(f===1){
        ['① 真题高频词（必须熟）','② 熟词僻义（阅读常考）','③ 大纲新增词（每年微调）','④ 低频词（认识即可）'].forEach(function(s,i){
          box(g,110,55+i*62,700,50,['var(--primary)','var(--danger)','var(--success)','var(--text-muted)'][i],0.08);
          txt(g,140,87+i*62,s,'var(--text)',12,'start','700');
        });
      }
      if(f===2){
        const rows=[['address','处理 / 演讲','var(--danger)'],['school','学派','var(--danger)'],['capital','资本','var(--danger)'],['novel','新颖的','var(--danger)']];
        rows.forEach(function(r,i){
          const y=60+i*60;
          box(g,110,y,680,48,'var(--primary)',0.06);
          txt(g,140,y+31,r[0],'var(--text)',12,'start','700');
          txt(g,340,y+31,r[1],'var(--danger)',12,'start','700');
        });
        txt(g,450,320,'「认识的词读不通」→ 查僻义','var(--primary-strong)',11.5,'middle','700');
      }
    }
  },
  { id:'EN-23', level:'C', title:'词汇考查：从单纯记忆转向语境理解',
    intuition:'近年英语一词汇题（完形、阅读）不再考「这个词什么意思」，而是考<strong>「在这个语境中哪个词最合适」</strong>。这意味着：背单词要背<strong>搭配 + 感情色彩 + 使用场景</strong>，而不是中文释义。例如「减少」有 reduce/decrease/diminish/decline，选哪个取决于主语与语体。',
    derivation:['\\text{旧}: \\; \\text{词义记忆}','\\text{新}: \\; \\text{语境选词（搭配/色彩/语体）}','\\text{例}: \\; \\text{reduce vs diminish}','\\text{策略}: \\; \\text{例句记忆} > \\text{词表记忆}'],
    exam_text:'<b>【语境选词】</b>"The company\'s profits _____ sharply." 选 declined 还是 reduced？',
    exam_answer:'答案：选 <b>declined</b>。decline 是「（数值/水平）下降」，主语常是 abstract 指标（profits/sales/rates）；reduce 是「（人为）减少」，需要宾语（reduce costs）。这里主语是 profits 且无宾语，用 declined 最自然。这就是「语境选词」——不只看中文意思。',
    pitfalls:['同义词要记「主语/宾语搭配」，不能只记中文。','感情色彩（褒/贬/中性）决定选词：如 slim（褒）vs skinny（贬）。','语体：书面 vs 口语，学术文章偏爱正式词。'],
    quiz:[{question:'近年词汇考查侧重？',options:['词义记忆','语境选词','拼写'],correct:1},{question:'profits 下降用哪个词？',options:['declined','reduced','diminished'],correct:0},{question:'背单词应重点记？',options:['中文释义','搭配与语境','字母顺序'],correct:1}],
    steps:[{focus:0,desc:'从记忆到语境'},{focus:1,desc:'同义词的搭配差异'},{focus:2,desc:'感情色彩与语体'}],
    draw:function(g,W,H,f){
      title(g,['考查转向','搭配差异','色彩与语体'][f]);
      if(f===0){
        box(g,90,70,340,110,'var(--text-muted)',0.08);
        txt(g,260,105,'旧：词义记忆','var(--text-muted)',13,'middle','700');
        txt(g,260,135,'「reduce = 减少」','var(--text-muted)',10.5);
        arw(g,440,125,476,125,'var(--highlight)');
        box(g,480,70,340,110,'var(--success)',0.08);
        txt(g,650,105,'新：语境选词','var(--success)',13,'middle','700');
        txt(g,650,135,'搭配 + 色彩 + 语体','var(--text-muted)',10.5);
        txt(g,450,240,'背单词 = 背「用法」而不是「释义」','var(--primary-strong)',11.5,'middle','700');
      }
      if(f===1){
        const rows=[['reduce','reduce costs（人为减少）','var(--primary)'],['decline','profits declined（自然下降）','var(--success)'],['diminish','diminish returns（逐渐减弱）','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=75+i*76;
          box(g,100,y,700,60,r[2],0.08);
          txt(g,130,y+37,r[0],r[2],13,'start','700');
          txt(g,280,y+37,r[1],'var(--text)',11.5,'start');
        });
      }
      if(f===2){
        box(g,100,70,700,70,'var(--success)',0.08);
        txt(g,450,105,'slim（褒） vs skinny（贬）','var(--success)',12.5,'middle','700');
        box(g,100,165,700,70,'var(--highlight)',0.08);
        txt(g,450,200,'学术：approximately；口语：about','var(--highlight)',12.5,'middle','700');
        txt(g,450,275,'选词 = 让句子「像母语者写的」','var(--primary-strong)',11.5,'middle','700');
      }
    }
  },
  { id:'EN-24', level:'C', title:'核心高频词汇、真题语境搭配、多义词用法',
    intuition:'高频词的三层信息：<strong>① 核心义</strong>（最常用）；<strong>② 真题搭配</strong>（如 account for、subject to）；<strong>③ 多义词</strong>（如 issue = 问题/发行/发布）。备考时建立「词—搭配—例句」三栏笔记，比单纯背词表有效 3 倍。',
    derivation:['\\text{三层}: \\; \\text{核心义} + \\text{搭配} + \\text{多义}','\\text{例}: \\; \\text{account for = 解释/占}','\\text{例}: \\; \\text{subject to = 受制于}','\\text{笔记}: \\; \\text{词} \\to \\text{搭配} \\to \\text{例句}'],
    exam_text:'<b>【高频搭配】</b>account for 的两个意思是？',
    exam_answer:'答案：① <b>解释、说明</b>（account for the discrepancy）；② <b>占比</b>（women account for 40% of the workforce）。同一个短语两个高频义项，阅读中遇到要按上下文判断。类似的高频搭配还有 subject to（受制于）、attribute to（归因于）、in terms of（就……而言）。',
    pitfalls:['多义词要按「话题」分组记：经济类、科技类、态度类。','搭配错误比单词不认识更隐蔽——写作中尤其致命。','真题语境搭配优先于词典例句：考什么就记什么。'],
    quiz:[{question:'account for 可表示？',options:['解释/占','计算','账户'],correct:0},{question:'subject to 的意思是？',options:['受制于','主题','主观'],correct:0},{question:'高效词汇笔记应包含？',options:['词+搭配+例句','只写中文','只写拼写'],correct:0}],
    steps:[{focus:0,desc:'高频词的三层信息'},{focus:1,desc:'account for 的双义'},{focus:2,desc:'三栏笔记法'}],
    draw:function(g,W,H,f){
      title(g,['三层信息','高频双义','三栏笔记'][f]);
      if(f===0){
        const rows=[['核心义','最常用、必须秒懂','var(--primary)'],['真题搭配','account for / subject to','var(--success)'],['多义词','issue / address / capital','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=70+i*80;
          box(g,100,y,700,64,r[2],0.08);
          txt(g,130,y+26,r[0],r[2],12.5,'start','700');
          txt(g,130,y+50,r[1],'var(--text-muted)',10.5,'start');
        });
      }
      if(f===1){
        box(g,100,70,700,70,'var(--primary)',0.08);
        txt(g,450,105,'account for the discrepancy','var(--primary-strong)',12,'middle','700');
        txt(g,450,130,'→ 解释、说明','var(--text-muted)',10.5);
        box(g,100,165,700,70,'var(--success)',0.08);
        txt(g,450,200,'women account for 40%','var(--success)',12,'middle','700');
        txt(g,450,225,'→ 占比','var(--text-muted)',10.5);
        txt(g,450,300,'同一短语，两个高频义项','var(--primary-strong)',11.5,'middle','700');
      }
      if(f===2){
        ['词（核心义）','搭配（真题）','例句（语境）'].forEach(function(s,i){
          box(g,150+i*200,100,180,80,['var(--primary)','var(--success)','var(--highlight)'][i],0.1);
          txt(g,240+i*200,146,s,'var(--text)',11.5,'middle','700');
        });
        txt(g,450,240,'三栏笔记 = 记得住 + 用得出','var(--primary-strong)',11.5,'middle','700');
      }
    }
  },
  { id:'EN-25', level:'C', title:'语法：名词、代词、形容词、副词、动词',
    intuition:'词法是语法的基础：<strong>名词</strong>（可数/不可数、单复数）、<strong>代词</strong>（指代一致、格）、<strong>形容词/副词</strong>（比较级、位置）、<strong>动词</strong>（时态、语态、情态、主谓一致）。英语一不直接考语法选择题，但完形、翻译、写作处处考语法。',
    derivation:['\\text{名词}: \\; \\text{可数性} + \\text{单复数}','\\text{代词}: \\; \\text{指代一致} + \\text{格}','\\text{形副}: \\; \\text{比较级} + \\text{位置}','\\text{动词}: \\; \\text{时态} + \\text{语态} + \\text{主谓一致}'],
    exam_text:'<b>【主谓一致】</b>"The number of students ___ increasing." 用 is 还是 are？',
    exam_answer:'答案：用 <b>is</b>。主语是 <b>the number</b>（单数），of students 只是修饰语；若主语是 <b>a number of students</b>（许多学生），则谓语用 are。类似：the percentage of… 用单数，a percentage of… 用复数。',
    pitfalls:['主谓一致看「中心词」，不看紧挨着的名词。','代词指代要「数、性、格」三一致。','形容词修饰名词放前，修饰不定代词放后（something new）。'],
    quiz:[{question:'The number of students 用？',options:['is','are','be'],correct:0},{question:'A number of students 用？',options:['is','are','be'],correct:1},{question:'修饰 something 的形容词放？',options:['前面','后面','任意'],correct:1}],
    steps:[{focus:0,desc:'词法四类'},{focus:1,desc:'主谓一致看中心词'},{focus:2,desc:'代词与语序'}],
    draw:function(g,W,H,f){
      title(g,['词法四类','主谓一致','代词与语序'][f]);
      if(f===0){
        const rows=[['名词','可数性/单复数','var(--primary)'],['代词','指代一致/格','var(--success)'],['形容词/副词','比较级/位置','var(--highlight)'],['动词','时态/语态/一致','var(--swap)']];
        rows.forEach(function(r,i){
          const y=55+i*62;
          box(g,110,y,680,50,r[2],0.08);
          txt(g,140,y+32,r[0],r[2],12.5,'start','700');
          txt(g,380,y+32,r[1],'var(--text)',11,'start');
        });
      }
      if(f===1){
        box(g,100,70,700,70,'var(--success)',0.08);
        txt(g,450,105,'The number of students is…','var(--success)',12.5,'middle','700');
        txt(g,450,130,'（中心词 number，单数）','var(--text-muted)',10.5);
        box(g,100,165,700,70,'var(--highlight)',0.08);
        txt(g,450,200,'A number of students are…','var(--highlight)',12.5,'middle','700');
        txt(g,450,225,'（a number of = 许多，复数）','var(--text-muted)',10.5);
      }
      if(f===2){
        box(g,110,75,680,70,'var(--primary)',0.08);
        txt(g,450,110,'代词：数、性、格三一致','var(--primary-strong)',12.5,'middle','700');
        box(g,110,170,680,70,'var(--success)',0.08);
        txt(g,450,205,'something new（形容词后置）','var(--success)',12.5,'middle','700');
        txt(g,450,275,'语法不是选择题，是「读懂 + 写对」的底层能力','var(--text-muted)',11.5);
      }
    }
  },
  { id:'EN-26', level:'C', title:'语法：非谓语动词',
    intuition:'非谓语动词三种：<strong>不定式 to do</strong>（目的/将来）、<strong>动名词 doing</strong>（习惯/抽象）、<strong>分词 doing/done</strong>（主动/被动、进行/完成）。核心判断：<strong>与逻辑主语的关系</strong>——主动用 doing，被动用 done；目的/将来用 to do。非谓语是长难句的「压缩包」，读懂它 = 读懂句子。',
    derivation:['\\text{to do}: \\; \\text{目的} / \\text{将来}','\\text{doing}: \\; \\text{主动} / \\text{进行} / \\text{习惯}','\\text{done}: \\; \\text{被动} / \\text{完成}','\\text{判断}: \\; \\text{与逻辑主语的关系}'],
    exam_text:'<b>【选非谓语】</b>"___ (face) with the crisis, the company cut costs." 填 Facing 还是 Faced？',
    exam_answer:'答案：填 <b>Faced</b>。固定搭配 be faced with（面临），company 是「被面对危机」，用过去分词表被动。若用 facing，则需是主动结构 facing the crisis（company faces the crisis）。判断依据：主语 company 与 face 是主动还是被动关系。',
    pitfalls:['doing 表主动/进行，done 表被动/完成——先判断主被动。','to do 常表目的：「为了……」；也可表将来。','独立主格（with + 名词 + 分词）是翻译高频结构。'],
    quiz:[{question:'表被动用？',options:['doing','done','to do'],correct:1},{question:'表目的用？',options:['to do','done','doing'],correct:0},{question:'be faced with 中 faced 表？',options:['主动','被动','将来'],correct:1}],
    steps:[{focus:0,desc:'三种非谓语的分工'},{focus:1,desc:'主动 vs 被动的判断'},{focus:2,desc:'独立主格结构'}],
    draw:function(g,W,H,f){
      title(g,['三种非谓语','主动与被动','独立主格'][f]);
      if(f===0){
        const rows=[['to do','目的 / 将来','var(--primary)'],['doing','主动 / 进行 / 习惯','var(--success)'],['done','被动 / 完成','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=75+i*78;
          box(g,100,y,700,62,r[2],0.08);
          txt(g,140,y+38,r[0],r[2],14,'start','700');
          txt(g,320,y+38,r[1],'var(--text)',11.5,'start');
        });
      }
      if(f===1){
        box(g,100,70,700,70,'var(--success)',0.08);
        txt(g,450,105,'The company faces the crisis.','var(--text)',12,'middle','700');
        txt(g,450,130,'→ Facing the crisis…（主动）','var(--success)',11.5,'middle','700');
        box(g,100,165,700,70,'var(--danger)',0.08);
        txt(g,450,200,'The company is faced with the crisis.','var(--text)',12,'middle','700');
        txt(g,450,225,'→ Faced with the crisis…（被动）','var(--danger)',11.5,'middle','700');
        txt(g,450,295,'先看主语与动词的关系','var(--primary-strong)',11.5,'middle','700');
      }
      if(f===2){
        box(g,110,80,680,70,'var(--highlight)',0.08);
        txt(g,450,115,'with + 名词 + doing/done','var(--highlight)',13,'middle','700');
        txt(g,450,140,'（独立主格：状语从句的压缩）','var(--text-muted)',10.5);
        txt(g,450,215,'例：With prices rising, consumers cut spending.','var(--text)',12);
        txt(g,450,255,'译：随着物价上涨，消费者削减开支','var(--text-muted)',11.5);
      }
    }
  },
  { id:'EN-27', level:'C', title:'语法：各类从句',
    intuition:'三大从句：<strong>定语从句</strong>（修饰名词，who/which/that/whose/where/when）、<strong>状语从句</strong>（时间/原因/条件/让步/结果/目的）、<strong>名词性从句</strong>（主语/宾语/表语/同位语，that/whether/what/who）。读长难句的关键是「找到从句的边界」——从引导词到从句结束。',
    derivation:['\\text{定语}: \\; \\text{who} / \\text{which} / \\text{that} / \\text{whose}','\\text{状语}: \\; \\text{when} / \\text{because} / \\text{if} / \\text{although}','\\text{名词性}: \\; \\text{that} / \\text{whether} / \\text{what}','\\text{边界}: \\; \\text{引导词} \\to \\text{从句结束}'],
    exam_text:'<b>【辨析】</b>that 引导的三种从句如何区分？',
    exam_answer:'答案：看 that 在从句中的<b>成分</b>与<b>位置</b>：① <b>定语从句</b>：that 前是名词，that 在从句中作主语/宾语（the book that I bought）；② <b>宾语从句</b>：that 前是动词，that 不作成分（I think that he is right）；③ <b>同位语从句</b>：that 前是 fact/idea/news 等抽象名词，that 后是完整句子（the fact that he lied）。',
    pitfalls:['定语从句的 that 在从句中必须作成分，否则可能是同位语从句。','状语从句的引导词有词义，名词性从句的 that 无词义。','非限制性定语从句用逗号隔开，不能用 that。'],
    quiz:[{question:'the book that I bought 中 that 引导？',options:['定语从句','宾语从句','同位语从句'],correct:0},{question:'the fact that he lied 中 that 引导？',options:['定语从句','同位语从句','状语从句'],correct:1},{question:'非限制性定语从句不能用？',options:['which','who','that'],correct:2}],
    steps:[{focus:0,desc:'三大从句与引导词'},{focus:1,desc:'that 的三种身份'},{focus:2,desc:'从句边界与逗号'}],
    draw:function(g,W,H,f){
      title(g,['三大从句','that 三身份','边界与逗号'][f]);
      if(f===0){
        const rows=[['定语从句','who/which/that/whose','var(--primary)'],['状语从句','when/because/if/although','var(--success)'],['名词性从句','that/whether/what','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=75+i*78;
          box(g,100,y,700,62,r[2],0.08);
          txt(g,130,y+26,r[0],r[2],12.5,'start','700');
          txt(g,130,y+50,r[1],'var(--text-muted)',10.5,'start');
        });
      }
      if(f===1){
        const rows=[['the book that I bought','定语（作宾语）','var(--primary)'],['I think that he is right','宾语从句','var(--success)'],['the fact that he lied','同位语从句','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=65+i*68;
          box(g,100,y,700,54,r[2],0.08);
          txt(g,130,y+34,r[0],'var(--text)',11.5,'start','700');
          txt(g,530,y+34,r[1],r[2],11,'start','700');
        });
      }
      if(f===2){
        box(g,110,80,680,70,'var(--danger)',0.08);
        txt(g,450,115,'非限制性定语从句：逗号隔开，不用 that','var(--danger)',12,'middle','700');
        box(g,110,175,680,70,'var(--success)',0.08);
        txt(g,450,210,'从句边界：从引导词到「从句谓语结束」','var(--success)',12,'middle','700');
        txt(g,450,285,'找到边界 = 拆开长难句的第一步','var(--primary-strong)',11.5,'middle','700');
      }
    }
  },
  { id:'EN-28', level:'C', title:'语法：倒装、省略、强调、虚拟语气',
    intuition:'四种「特殊句式」是长难句与翻译的难点：<strong>倒装</strong>（否定词提前、only 提前、so/neither 开头）、<strong>省略</strong>（并列句省略相同成分、状语从句省略 be）、<strong>强调</strong>（It is … that …）、<strong>虚拟</strong>（if 从句用过去式/were/had done，主句 would/could + do/have done）。',
    derivation:['\\text{倒装}: \\; \\text{否定词/only 提前} \\Rightarrow \\text{部分倒装}','\\text{省略}: \\; \\text{并列/状语从句中省略}','\\text{强调}: \\; \\text{It is} + \\text{被强调部分} + \\text{that}','\\text{虚拟}: \\; \\text{if } + \\text{过去式}, \\; \\text{would } + \\text{do}'],
    exam_text:'<b>【虚拟语气】</b>"If I ___ (be) you, I would accept the offer." 填什么？',
    exam_answer:'答案：填 <b>were</b>。虚拟语气中，与现在事实相反时，if 从句的 be 动词一律用 were（不管主语是 I/he/she）；主句用 would/could/might + 动词原形。与过去相反用 had done + would have done；与将来相反用 were to do/should do。',
    pitfalls:['虚拟语气中 be 动词统一用 were（正式文体）。','It is … that … 强调句去掉这两个词后句子仍完整——这是与主语从句的区别。','省略句在翻译时要「补回来」才能读懂。'],
    quiz:[{question:'If I ___ you, 填？',options:['am','was','were'],correct:2},{question:'It is … that … 是？',options:['强调句','定语从句','状语从句'],correct:0},{question:'与过去相反的虚拟主句用？',options:['would do','would have done','will do'],correct:1}],
    steps:[{focus:0,desc:'倒装与强调'},{focus:1,desc:'省略的还原'},{focus:2,desc:'虚拟语气的三种时间'}],
    draw:function(g,W,H,f){
      title(g,['倒装与强调','省略还原','虚拟语气'][f]);
      if(f===0){
        box(g,110,70,680,70,'var(--primary)',0.08);
        txt(g,450,105,'Never have I seen such a case.','var(--primary-strong)',12,'middle','700');
        txt(g,450,130,'（否定词提前 → 部分倒装）','var(--text-muted)',10.5);
        box(g,110,165,680,70,'var(--success)',0.08);
        txt(g,450,200,'It was in 2020 that he left.','var(--success)',12,'middle','700');
        txt(g,450,225,'（强调句：去掉 It was/that 仍完整）','var(--text-muted)',10.5);
      }
      if(f===1){
        box(g,110,80,680,70,'var(--highlight)',0.08);
        txt(g,450,115,'He is taller than I (am).','var(--highlight)',12,'middle','700');
        txt(g,450,140,'（than 从句省略 am）','var(--text-muted)',10.5);
        box(g,110,180,680,70,'var(--swap)',0.08);
        txt(g,450,215,'When (he was) young, he loved music.','var(--swap)',12,'middle','700');
        txt(g,450,240,'（状语从句省略 he was）','var(--text-muted)',10.5);
        txt(g,450,310,'翻译时补回省略成分，句子才通顺','var(--primary-strong)',11.5,'middle','700');
      }
      if(f===2){
        const rows=[['与现在相反','if + 过去式, would + do','var(--primary)'],['与过去相反','if + had done, would have done','var(--success)'],['与将来相反','if + were to do, would + do','var(--highlight)']];
        rows.forEach(function(r,i){
          const y=70+i*78;
          box(g,100,y,700,62,r[2],0.08);
          txt(g,130,y+26,r[0],r[2],12.5,'start','700');
          txt(g,130,y+50,r[1],'var(--text-muted)',10.5,'start');
        });
        txt(g,450,320,'if 从句 be 动词一律 were','var(--danger)',11.5,'middle','700');
      }
    }
  },
  { id:'EN-29', level:'C', title:'句子成分与句子结构分析（长难句拆解）',
    intuition:'长难句拆解五步：<strong>① 找谓语动词</strong>（一个句子有几个谓语就有几个分句）；<strong>② 定主句</strong>（去掉从句后剩下的）；<strong>③ 划从句边界</strong>；<strong>④ 识别修饰成分</strong>（定语/状语/插入语）；<strong>⑤ 按意群翻译</strong>。这是阅读、翻译、写作共同的核心能力。',
    derivation:['\\text{① 找谓语} \\Rightarrow \\text{分句数}','\\text{② 定主句（去从句后）}','\\text{③ 划从句边界}','\\text{④ 识别修饰} + \\text{⑤ 意群翻译}'],
    exam_text:'<b>【实战拆句】</b>分析 "The idea that machines could replace human judgment, which once seemed absurd, is now taken seriously by many."',
    exam_answer:'答案：① 谓语：could replace、seemed、is taken（三个分句）；② 主句：<b>The idea is now taken seriously by many</b>；③ that 从句（machines could replace human judgment）是 idea 的<b>同位语从句</b>；④ which 从句（once seemed absurd）是非限制性<b>定语从句</b>，修饰 idea；⑤ 译文：「机器能取代人类判断——这一曾被视为荒谬的想法，如今被许多人认真对待。」',
    pitfalls:['先数谓语再断句：谓语数量 = 分句数量。','插入语（两个逗号/破折号之间）先拿走，不影响主干。','翻译时按「意群」切分，不要按单词顺序硬译。'],
    quiz:[{question:'长难句拆解第一步是？',options:['找谓语动词','查生词','翻译'],correct:0},{question:'谓语数量等于？',options:['分句数量','单词数量','段落数量'],correct:0},{question:'两个逗号之间通常是？',options:['插入语','主句','谓语'],correct:0}],
    steps:[{focus:0,desc:'五步拆句法'},{focus:1,desc:'主句与从句的剥离'},{focus:2,desc:'意群翻译'}],
    draw:function(g,W,H,f){
      title(g,['五步拆句','主从句剥离','意群翻译'][f]);
      if(f===0){
        ['① 找谓语','② 定主句','③ 划从句边界','④ 识别修饰','⑤ 意群翻译'].forEach(function(s,i){
          box(g,120,45+i*56,660,46,['var(--primary)','var(--success)','var(--highlight)','var(--swap)','var(--danger)'][i],0.08);
          txt(g,150,74+i*56,s,'var(--text)',12,'start','700');
        });
      }
      if(f===1){
        box(g,90,70,720,70,'var(--primary)',0.08);
        txt(g,450,105,'The idea is now taken seriously.','var(--primary-strong)',12,'middle','700');
        txt(g,450,130,'（主句：去掉从句后的骨架）','var(--text-muted)',10.5);
        box(g,90,165,720,70,'var(--success)',0.08);
        txt(g,450,200,'that…（同位语） + which…（定语）','var(--success)',12,'middle','700');
        txt(g,450,225,'（从句：修饰成分，可先剥离）','var(--text-muted)',10.5);
        txt(g,450,295,'主句 = 骨架；从句 = 修饰','var(--primary-strong)',11.5,'middle','700');
      }
      if(f===2){
        ['意群1：The idea','意群2：that machines could replace…','意群3：is now taken seriously'].forEach(function(s,i){
          box(g,120,70+i*70,660,56,['var(--primary)','var(--success)','var(--highlight)'][i],0.08);
          txt(g,150,104+i*70,s,'var(--text)',12,'start','700');
        });
        txt(g,450,300,'按意群译，再拼接润色','var(--primary-strong)',11.5,'middle','700');
      }
    }
  }
];
