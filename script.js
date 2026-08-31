  // 申し込みフォーム：入力内容からメール作成画面を開く（サーバー不要・0円）
  function hanasoSubmit(e) {
    e.preventDefault();
    var el = e.target.elements;
    var name = el['name'].value.trim();
    var contact = el['contact'].value.trim();
    var plan = el['plan'].value;
    var time = el['time'].value.trim();
    var msg = el['message'].value.trim();
    var subject = 'hanaso 申し込み・お問い合わせ（' + (name || 'お名前未記入') + ' 様）';
    var body =
      'hanaso お申し込み・お問い合わせ\n' +
      '--------------------------------\n' +
      'お名前：' + name + '\n' +
      'ご連絡先：' + contact + '\n' +
      '気になっているプラン：' + plan + '\n' +
      'ご希望の曜日・時間帯：' + time + '\n' +
      'ご質問・伝えておきたいこと：\n' + (msg || '（なし）') + '\n';
    window.location.href =
      'mailto:hanaso0623include@gmail.com?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
    return false;
  }

  // 「先頭へ戻る」ボタン：少しスクロールしたら表示
  (function () {
    var toTop = document.getElementById('toTop');
    if (!toTop) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) { toTop.classList.add('show'); }
      else { toTop.classList.remove('show'); }
    });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();

  // 各セクションをスクロールに合わせてふわっと表示（progressive enhancement）
  // ・JSが動かない環境では何も足さない＝中身は普通に表示される
  // ・「動きを控える」設定の端末では無効化してそのまま表示
  (function () {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var secs = [].slice.call(document.querySelectorAll('main > section'));
    secs.forEach(function (s) { s.classList.add('reveal'); });
    var show = function (s) { s.classList.add('in'); };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });
    secs.forEach(function (s) { io.observe(s); });
    // 安全網：万一 IntersectionObserver が発火しなくても、必ず表示する（真っ白防止）
    setTimeout(function () { secs.forEach(show); }, 1500);
  })();
