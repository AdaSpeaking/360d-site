/* 首頁「專屬需求提問」三層互動。內容都寫死在這裡，要改文字或連結改這一段就好 */
(function () {
  // 第三層：五種推薦服務（標題 → 說明、連結）
  var SERVICES = {
    '人事外包': { url: 'http://360d.com.tw/event/hr-outsourcing',
      text: '提供企業完整的HR業務外包彈性選項，從人才招募/甄選、人事行政作業、薪資/獎金計算、勞法體制設計、員工心靈健康等；讓企業擺脫繁瑣的非核心業務困擾，專注在核心業務的發展上。' },
    '心理測評': { url: 'http://360d.com.tw/help',
      text: '透過科學化心理測評工具的運用，深入且完整地掌握人才的可發展性，並有效規避人為誤判；同時可在多角度的人才報告中衍生具價值的職能效標、人才盤點、人才輔導、潛能開發等主題應用，是企業人才決策與人才價值創造不可或缺的利器。' },
    '人才培育': { url: 'http://360d.com.tw/vca_service_actionlearning',
      text: '在鏈結「人才優勢特質發揮與職務專業職能需求」下，為企業規畫執行各主題培訓課程─工作課題實作─問題/解方探索─目標/成效探討之系統化育才服務，並依此行動學習模式持續循環精進，以優化/深化/內化人才在實戰經驗下的專業職能養成。' },
    '顧問諮詢': { url: 'http://360d.com.tw/consulting-services',
      text: '在運用「人才測評工具與組織健診工具」下，提供企業人才意願驅動─職能展現─價值創造之客製化深度應用解方，並依此為根基，協助企業循序完善組織發展模式─提升組織營運能力，從而實踐「人才價值創造─組織價值創造─企業價值創造」三層次的ESG永續發展策略與目標。' },
    '獵才代招': { url: 'http://360d.com.tw/agent-r',
      text: '提供企業顧問式獵才及客製化人才/團隊招募服務，並由資深的人資團隊服務/執案；且在結合測評工具運用下，精準地匹配職務性格與人才優勢，以達成「適才適位」精準人才推薦的目標。' }
  };
  // 第二層：十個問題，依畫面排列順序。[問題文字, 按鈕寬度(12 欄裡佔幾欄), [推薦服務1, 推薦服務2]]
  var PROBLEMS = [
    ['找不到適合的人才，履歷很多但不合適', 7, ['獵才代招', '心理測評']],
    ['人事行政太雜、HR太忙', 5, ['獵才代招', '人事外包']],
    ['想瞭解員工潛力、評估適任性', 5, ['心理測評', '顧問諮詢']],
    ['想建立一套人才發展或教育訓練體系', 7, ['人才培育', '顧問諮詢']],
    ['需要提升主管管理能力或團隊溝通協作', 6, ['心理測評', '人才培育']],
    ['需要短期專案或臨時人力支援', 6, ['獵才代招', '人事外包']],
    ['希望整合人力資源與經營策略', 5, ['心理測評', '顧問諮詢']],
    ['正在組織轉型、想提升營運效率或落實ESG', 7, ['人才培育', '顧問諮詢']],
    ['想用科學方法評估人員特質、降低用人風險', 6, ['心理測評', '人才培育']],
    ['想盤點組織人才、建立接班梯隊', 6, ['人才培育', '顧問諮詢']]
  ];

  var quiz = document.getElementById('quiz');
  if (!quiz) return;
  var page = document.querySelector('.page');
  var lower = document.querySelector('.lower');
  var base = quiz.querySelector('.q1');
  var panel = quiz.querySelector('.qpanel');
  var state = { industry: '', problem: null };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function title() { return el('h2', 'qt', '專屬需求提問'); }

  // 面板比原本區塊高多少，下半段畫面就往下推多少
  function layout() {
    var extra = panel.hidden ? 0 : Math.max(0, Math.round(panel.offsetHeight - base.offsetHeight));
    lower.style.transform = extra ? 'translateY(' + extra + 'px)' : '';
    page.style.paddingBottom = extra ? extra + 'px' : '';
  }
  function open(nodes) {
    panel.innerHTML = '';
    nodes.forEach(function (n) { panel.appendChild(n); });
    panel.hidden = false;
    layout();
    panel.focus({ preventScroll: true });
  }

  function showProblems() {
    var grid = el('div', 'qgrid');
    PROBLEMS.forEach(function (p) {
      var b = el('button', 'qp', p[0]);
      b.type = 'button';
      b.style.gridColumn = 'span ' + p[1];
      b.addEventListener('click', function () { state.problem = p; showResult(); });
      grid.appendChild(b);
    });
    open([title(), el('p', 'qn', '問題2'), el('h3', 'qh', '是否遇到以下問題？'), grid]);
  }

  function showResult() {
    var r1 = el('p', 'qr1'); r1.appendChild(document.createTextNode('您是')); r1.appendChild(el('b', '', state.industry));
    var r2 = el('p', 'qr2');
    r2.appendChild(document.createTextNode('且您遇到了')); r2.appendChild(el('b', '', state.problem[0])); r2.appendChild(document.createTextNode('的挑戰'));
    var bar = el('div', 'qbar');
    var reset = el('button', 'qreset', '重新選擇'); reset.type = 'button';
    reset.addEventListener('click', function () { state.industry = ''; state.problem = null; panel.hidden = true; panel.innerHTML = ''; layout(); });
    bar.appendChild(reset);
    var cards = el('div', 'qcards');
    state.problem[2].forEach(function (name) {
      var s = SERVICES[name];
      var a = el('a', 'qcard'); a.href = s.url; a.target = '_blank'; a.rel = 'noopener';
      a.appendChild(el('h4', '', name)); a.appendChild(el('p', '', s.text)); a.appendChild(el('span', 'qmore', '瞭解更多 ▸'));
      cards.appendChild(a);
    });
    open([title(), r1, r2, el('p', 'qr3', '推薦給您'), bar, cards]);
  }

  base.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.qi') : null;
    if (!b) return;
    state.industry = b.getAttribute('data-v');
    showProblems();
  });
  window.addEventListener('resize', layout);
})();
