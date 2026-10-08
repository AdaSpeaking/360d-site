/* 360d 官網設計稿示意版 —— 想改設定，改下面這一段就好 */
var CONFIG = {
  // 各類按鈕要連去哪。留空 = 按了沒反應；填網址就整類一起生效
  consultUrl: 'https://www.360d.com.tw/consulting',        // 諮詢／預約類（需要顧問諮詢、申請諮詢、免費諮詢…）
  trialUrl: 'https://www.360d.com.tw/psyc-form',           // 測評試用類（測評免費試用、申請試用…）
  caseUrl: 'https://www.360d.com.tw/article-detail/469',   // 瞭解更多成功案例
  moreUrl: '',       // 進一步瞭解／瞭解○○費用、流程…（還沒接）
  downloadUrl: '',   // 下載方案簡介（還沒接）
  badge: true       // 右下角「設計稿示意版」標示，不要就改成 false
};

(function () {
  var root = document.documentElement;
  if (/[?&]debug=1/.test(location.search)) root.classList.add('debug');

  var map = { consult: CONFIG.consultUrl, trial: CONFIG.trialUrl, 'case': CONFIG.caseUrl, more: CONFIG.moreUrl, download: CONFIG.downloadUrl };
  document.querySelectorAll('.hs.cta').forEach(function (a) {
    var url = map[a.getAttribute('data-kind')];
    a.setAttribute('aria-hidden', url ? 'false' : 'true');
    if (!url) return;
    a.setAttribute('href', url);
    a.setAttribute('aria-label', a.getAttribute('data-label'));
    if (/^https?:/.test(url)) { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); }
  });

  if (CONFIG.badge) {
    var b = document.createElement('div');
    b.className = 'badge';
    b.textContent = '設計稿示意版';
    document.body.appendChild(b);
  }

  var img = document.querySelector('.shot');
  if (img) {
    var fail = function () {
      var box = document.createElement('div');
      box.className = 'imgerr';
      box.textContent = '這一頁的圖片沒有載入：請確認 ' + img.getAttribute('src') + ' 有一起上傳。';
      document.querySelector('.page').appendChild(box);
    };
    if (img.complete && img.naturalWidth === 0) fail(); else img.addEventListener('error', fail);
  }
})();
