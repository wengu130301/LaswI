/* ══════════════════════════════════════════════════════════════
   LaswI Studio — timeline.js
   時間軸獨立頁：三語切換（繁 / 简 / EN）＋ 進場揭示
   與主站共用 localStorage key「laswi.lang」，在首頁切過的語言會帶過來
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── 01 i18n 字典 ───────────────────────────────────────── */
  const I18N = {
    'zh-TW': {
      htmlLang: 'zh-Hant',
      title: 'LaswI Studio — 時間軸 · Timeline',
      desc: 'LaswI Studio 時間軸：2025 年 7 月命名、2026 年成立與發布、10 月 17 日《彩虹為序》上架騰訊音樂，以及 001–004 四版標誌迭代。',
      strings: {
        'tl.back': '返回首頁',
        'tl.kicker': 'TIMELINE — 2025.07 →',
        'tl.sub': '時間軸',
        'tl.lead': '從一個名字，到一間工作室。中間那些節點，按時間排在同一條線上。',
        'tl.meta1': '節點',
        'tl.meta2': '版標誌',
        'tl.meta3': '未完',
        'tl.outro': '時間軸停在這裡，但工作室沒有。',
        'tl.cta': '回 LaswI Studio 首頁',

        't1.tag': '命名',
        't1.title': 'Laswi 這個名字被創造出來',
        't1.desc': '還沒有產品，也還沒有工作室，先有一個名字。',

        't2.tag': '改名',
        't2.title': '正式改名 LaswI',
        't2.desc': '大小寫定案：小寫 i 收成大寫 I，名字自此固定，沒再改過。',

        't3.tag': '第一款大眾產品',
        't3.title': 'LaswI Web 正式面向大眾',
        't3.desc': '不用下載，開一個分頁就能用——第一個交到所有人手上的東西。',

        't4.tag': '成立',
        't4.title': 'LaswI Studio 正式成立',
        't4.desc': '名字終於有了去處，作品開始以工作室的名義發布。',

        't5.tag': '發布',
        't5.title': 'LaswI App 正式發布',
        't5.desc': 'Web 之後，App 版本跟著上線。',

        't6.tag': '合作',
        't6.title': '迎來第一批合作夥伴',
        't6.desc': '第一批夥伴加入，四張卡片掛上了首頁。',

        't7.tag': '音樂',
        't7.title': 'HayMusic《彩虹為序》上架騰訊音樂平台',
        't7.desc': 'HayMusic 的第一款音樂，同步上線 QQ 音樂、酷狗音樂、酷我音樂。',

        't8.tag': '未完',
        't8.title': 'LaswI 還在往前走',
        't8.desc': '2026 之後繼續。這條時間軸還沒有結束的那一天。',

        'lg.kicker': 'LOGO ITERATION — 001 → 004',
        'lg.sub': '標誌迭代',
        'lg.lead': '四版標誌，按時間排列。每一版都留下來，不刪掉。',
        'lg.cap1': '第一版',
        'lg.cap2': '第二版',
        'lg.cap3': '第三版',
        'lg.cap4': '第四版 · 現行'
      }
    },

    'zh-CN': {
      htmlLang: 'zh-Hans',
      title: 'LaswI Studio — 时间轴 · Timeline',
      desc: 'LaswI Studio 时间轴：2025 年 7 月命名、2026 年成立与发布、10 月 17 日《彩虹为序》上架腾讯音乐，以及 001–004 四版标志迭代。',
      strings: {
        'tl.back': '返回首页',
        'tl.kicker': 'TIMELINE — 2025.07 →',
        'tl.sub': '时间轴',
        'tl.lead': '从一个名字，到一间工作室。中间那些节点，按时间排在同一条线上。',
        'tl.meta1': '节点',
        'tl.meta2': '版标志',
        'tl.meta3': '未完',
        'tl.outro': '时间轴停在这里，但工作室没有。',
        'tl.cta': '回 LaswI Studio 首页',

        't1.tag': '命名',
        't1.title': 'Laswi 这个名字被创造出来',
        't1.desc': '还没有产品，也还没有工作室，先有一个名字。',

        't2.tag': '改名',
        't2.title': '正式改名 LaswI',
        't2.desc': '大小写定案：小写 i 收成大写 I，名字自此固定，没再改过。',

        't3.tag': '第一款大众产品',
        't3.title': 'LaswI Web 正式面向大众',
        't3.desc': '不用下载，开一个标签页就能用——第一个交到所有人手上的东西。',

        't4.tag': '成立',
        't4.title': 'LaswI Studio 正式成立',
        't4.desc': '名字终于有了去处，作品开始以工作室的名义发布。',

        't5.tag': '发布',
        't5.title': 'LaswI App 正式发布',
        't5.desc': 'Web 之后，App 版本跟着上线。',

        't6.tag': '合作',
        't6.title': '迎来第一批合作伙伴',
        't6.desc': '第一批伙伴加入，四张卡片挂上了首页。',

        't7.tag': '音乐',
        't7.title': 'HayMusic《彩虹为序》上架腾讯音乐平台',
        't7.desc': 'HayMusic 的第一款音乐，同步上线 QQ 音乐、酷狗音乐、酷我音乐。',

        't8.tag': '未完',
        't8.title': 'LaswI 还在往前走',
        't8.desc': '2026 之后继续。这条时间轴还没有结束的那一天。',

        'lg.kicker': 'LOGO ITERATION — 001 → 004',
        'lg.sub': '标志迭代',
        'lg.lead': '四版标志，按时间排列。每一版都留下来，不删掉。',
        'lg.cap1': '第一版',
        'lg.cap2': '第二版',
        'lg.cap3': '第三版',
        'lg.cap4': '第四版 · 现行'
      }
    },

    'en': {
      htmlLang: 'en',
      title: 'LaswI Studio — Timeline',
      desc: 'The LaswI Studio timeline: the name in July 2025, the studio and its public releases in 2026, HayMusic’s first single on Tencent Music on 17 October, and four logo iterations 001–004.',
      strings: {
        'tl.back': 'Back to home',
        'tl.kicker': 'TIMELINE — 2025.07 →',
        'tl.sub': 'TIMELINE',
        'tl.lead': 'From a name to a studio. Every milestone, in order, on one line.',
        'tl.meta1': 'milestones',
        'tl.meta2': 'logo versions',
        'tl.meta3': 'and counting',
        'tl.outro': 'The timeline stops here. The studio does not.',
        'tl.cta': 'Back to LaswI Studio',

        't1.tag': 'NAMING',
        't1.title': 'The name Laswi is created',
        't1.desc': 'No product yet, no studio yet — just a name.',

        't2.tag': 'RENAMED',
        't2.title': 'Officially renamed LaswI',
        't2.desc': 'Case settled: the lowercase i became a capital I, and the name has not moved since.',

        't3.tag': 'FIRST PUBLIC PRODUCT',
        't3.title': 'LaswI Web goes public',
        't3.desc': 'No download — open a tab and it runs. The first thing handed to everyone.',

        't4.tag': 'FOUNDED',
        't4.title': 'LaswI Studio is founded',
        't4.desc': 'The name finally has a home; work ships under the studio’s name.',

        't5.tag': 'RELEASE',
        't5.title': 'LaswI App is released',
        't5.desc': 'After the web version, the app follows.',

        't6.tag': 'PARTNERS',
        't6.title': 'The first partners come aboard',
        't6.desc': 'The first partners join, and four cards go up on the front page.',

        't7.tag': 'MUSIC',
        't7.title': 'HayMusic《彩虹为序》lands on Tencent Music',
        't7.desc': 'HayMusic’s first single, live on QQ Music, Kugou Music and Kuwo Music at the same time.',

        't8.tag': 'ONGOING',
        't8.title': 'LaswI keeps walking',
        't8.desc': 'After 2026 the line continues — there is no closing date yet.',

        'lg.kicker': 'LOGO ITERATION — 001 → 004',
        'lg.sub': 'LOGO ITERATIONS',
        'lg.lead': 'Four versions, in order. None of them gets deleted.',
        'lg.cap1': 'Version one',
        'lg.cap2': 'Version two',
        'lg.cap3': 'Version three',
        'lg.cap4': 'Version four · current'
      }
    }
  };

  const LANGS = ['zh-TW', 'zh-CN', 'en'];

  /* ── 02 小工具 ──────────────────────────────────────────── */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── 03 語言切換 ────────────────────────────────────────── */
  const seg = $('#langSeg');
  const segButtons = seg ? $$('.seg__btn', seg) : [];
  const segThumb = seg ? $('.seg__thumb', seg) : null;
  let currentLang = 'zh-TW';

  function moveThumb() {
    if (!segThumb) return;
    const active = segButtons.find((b) => b.classList.contains('is-active')) || segButtons[0];
    if (!active) return;
    segThumb.style.width = active.offsetWidth + 'px';
    segThumb.style.transform = 'translateX(' + active.offsetLeft + 'px)';
  }

  function applyStrings(lang) {
    const dict = I18N[lang];
    document.documentElement.lang = dict.htmlLang;
    document.documentElement.dataset.lang = lang;

    document.title = dict.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', dict.desc);

    $$('[data-i18n]').forEach((el) => {
      const val = dict.strings[el.dataset.i18n];
      if (typeof val === 'string') el.textContent = val;
    });
  }

  function setLang(lang, opts) {
    const animate = !opts || opts.animate !== false;
    if (!I18N[lang]) return;
    currentLang = lang;

    segButtons.forEach((b) => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    moveThumb();

    const commit = () => {
      applyStrings(lang);
      requestAnimationFrame(() => document.body.classList.remove('is-i18n-fading'));
    };

    if (animate && !prefersReduced.matches) {
      document.body.classList.add('is-i18n-fading');
      window.setTimeout(commit, 170);
    } else {
      commit();
    }

    try { localStorage.setItem('laswi.lang', lang); } catch (e) { /* 私隱模式忽略 */ }
  }

  segButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.dataset.lang !== currentLang) setLang(btn.dataset.lang);
    });
  });

  /* ── 04 進場揭示 ────────────────────────────────────────── */
  function observeReveals(root) {
    const items = $$('.reveal', root || document);
    if (!items.length) return;

    if (!('IntersectionObserver' in window) || prefersReduced.matches) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    items.forEach((el) => io.observe(el));
  }

  /* ── 05 啟動 ────────────────────────────────────────────── */
  let saved = null;
  try { saved = localStorage.getItem('laswi.lang'); } catch (e) { /* ignore */ }
  const initial = LANGS.indexOf(saved) >= 0 ? saved : 'zh-TW';

  setLang(initial, { animate: false });
  observeReveals(document);

  window.addEventListener('resize', moveThumb);
  window.addEventListener('load', moveThumb);
})();
