/* ══════════════════════════════════════════════════════════════
   LaswI Studio — script.js
   01 i18n 字典（繁 / 簡 / EN，全站覆蓋）
   02 站點資料（產品、合作夥伴）
   03 渲染：產品磁貼 / 合作夥伴卡片
   04 語言切換（Segmented Button + 淡入過場）
   05 導航：滾動收斂、Scroll Spy、行動版選單
   06 磁貼自動翻轉（可被 hover / 離屏 / reduced-motion 暫停）
   07 Hero 視差
   08 進場動畫（IntersectionObserver）
   08b 宣傳片區塊（視口內自動播放 / 音量 / 彈層）
   09 圖片缺失兜底
   ══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isTouch = window.matchMedia('(hover: none)').matches;

  /* ── 01 i18n 字典 ───────────────────────────────────────── */
  const I18N = {
    'zh-TW': {
      htmlLang: 'zh-Hant',
      strings: {
        'nav.home': '首頁',
        'nav.products': '產品',
        'nav.web': 'LaswI Web',
        'nav.film': '宣傳片',
        'nav.stack': '自研棧',
        'nav.partners': '合作夥伴',
        'nav.timeline': '時間軸',
        'nav.contact': '聯繫',
        'hero.eyebrow': '獨立工作室 · EST. 2025',
        'hero.tagline': '以系統、產品與音樂，拆解日常的無趣。',
        'hero.scroll': '向下探索',
        'hero.meta': '9 個產品 · 4 位夥伴',
        'film.kicker': '03 — BRAND FILM',
        'film.sub': '宣傳片',
        'film.lead': '兩分鐘，一條線：從內核到系統再到產品，全部自己造。',
        'film.name': 'LASWI STUDIO — BRAND FILM',
        'film.duration': '02:00',
        'film.play': '播放完整宣傳片',
        'film.soundOn': '開啟聲音',
        'film.soundOff': '靜音',
        'video.kicker': 'BRAND FILM · 02:00',
        'video.title': 'LaswI Studio 宣傳片',
        'video.close': '關閉',
        'products.kicker': '01 — NINE THINGS WE BUILD',
        'products.sub': '產品',
        'products.lead': '從內核到音樂，九個產品，一條自研路線。滑過磁貼可暫停翻轉，點擊直接前往。',
        'web.kicker': '02 — FIRST PRODUCT FOR EVERYONE',
        'web.sub': '第一款面向大眾的產品',
        'web.lead': '以前那些東西，是做給自己和少數人的。這次換個做法：打開瀏覽器就能用，不下載，不安裝。',
        'web.f1': '開頁即用',
        'web.f2': '瀏覽器直開',
        'web.f3': '線上更新',
        'web.cta': '立即打開',
        'web.badge': 'LIVE',
        'stack.kicker': '04 — THE STACK',
        'stack.sub': '自研棧',
        'stack.lead': '三層，一條線：從內核到系統，再到產品。每一層都由我們自己寫。',
        'stack.k1.desc': '排程、記憶體、驅動，全部手寫，不借用任何現成內核。',
        'stack.k1.tag': 'KERNEL · FROM ZERO',
        'stack.k2.desc': '跑在自研內核上的整機體驗，從開機第一幀到桌面。',
        'stack.k2.tag': 'SYSTEM · FULL STACK',
        'stack.k3.desc': '九個產品共用同一套底座，改一處，全線受益。',
        'stack.k3.tag': 'PRODUCTS · 09 SHIPPED',
        'stack.stat.est': '起於',
        'stack.stat.products': '產品',
        'stack.stat.partners': '夥伴',
        'stack.stat.layers': '自研層',
        'partners.kicker': '05 — PARTNERS',
        'partners.sub': '合作夥伴',
        'partners.lead': '與同樣相信「動手造」的團隊並肩。',
        'tline.kicker': '06 — TIMELINE',
        'tline.sub': '時間軸',
        'tline.lead': '從一個名字，到一間工作室。八個節點排在時間軸頁裡，這裡先放最近的幾格。',
        'tline.cta': '看完整時間軸',
        'tline.n1': 'Laswi 這個名字被創造',
        'tline.n2': '正式改名 LaswI',
        'tline.n3': 'LaswI Studio 正式成立',
        'tline.n4': 'HayMusic《彩虹為序》上架騰訊音樂',
        'tline.n5': '還在往前走',
        'archive.tag': 'ARCHIVE · 第 001 號官網',
        'archive.title': 'LaswI Studio 的第一個官網',
        'archive.desc': '2025 年的第一版，原樣封存，連同那些沒修完的 bug。點進去還能開。',
        'archive.cta': '進入舊站',
        'footer.kicker': '07 — CONTACT',
        'footer.sub': '合作聯繫',
        'footer.lead': '有想法、有專案，或只是想聊聊，郵件都歡迎。',
        'footer.built': '自研 · 自造 · 自娛',
        'common.visit': '前往',
        'common.site': '官方網站'
      }
    },
    'zh-CN': {
      htmlLang: 'zh-Hans',
      strings: {
        'nav.home': '首页',
        'nav.products': '产品',
        'nav.web': 'LaswI Web',
        'nav.film': '宣传片',
        'nav.stack': '自研栈',
        'nav.partners': '合作伙伴',
        'nav.timeline': '时间轴',
        'nav.contact': '联系',
        'hero.eyebrow': '独立工作室 · EST. 2025',
        'hero.tagline': '以系统、产品与音乐，拆解日常的无趣。',
        'hero.scroll': '向下探索',
        'hero.meta': '9 个产品 · 4 位伙伴',
        'film.kicker': '03 — BRAND FILM',
        'film.sub': '宣传片',
        'film.lead': '两分钟，一条线：从内核到系统再到产品，全部自己造。',
        'film.name': 'LASWI STUDIO — BRAND FILM',
        'film.duration': '02:00',
        'film.play': '播放完整宣传片',
        'film.soundOn': '开启声音',
        'film.soundOff': '静音',
        'video.kicker': 'BRAND FILM · 02:00',
        'video.title': 'LaswI Studio 宣传片',
        'video.close': '关闭',
        'products.kicker': '01 — NINE THINGS WE BUILD',
        'products.sub': '产品',
        'products.lead': '从内核到音乐，九个产品，一条自研路线。滑过磁贴可暂停翻转，点击直接前往。',
        'web.kicker': '02 — FIRST PRODUCT FOR EVERYONE',
        'web.sub': '第一款面向大众的产品',
        'web.lead': '以前那些东西，是做给自己和少数人的。这次换个做法：打开浏览器就能用，不下载，不安装。',
        'web.f1': '开页即用',
        'web.f2': '浏览器直开',
        'web.f3': '线上更新',
        'web.cta': '立即打开',
        'web.badge': 'LIVE',
        'stack.kicker': '04 — THE STACK',
        'stack.sub': '自研栈',
        'stack.lead': '三层，一条线：从内核到系统，再到产品。每一层都由我们自己写。',
        'stack.k1.desc': '调度、内存、驱动，全部手写，不借用任何现成内核。',
        'stack.k1.tag': 'KERNEL · FROM ZERO',
        'stack.k2.desc': '跑在自研内核上的整机体验，从开机第一帧到桌面。',
        'stack.k2.tag': 'SYSTEM · FULL STACK',
        'stack.k3.desc': '九个产品共用同一套底座，改一处，全线受益。',
        'stack.k3.tag': 'PRODUCTS · 09 SHIPPED',
        'stack.stat.est': '始于',
        'stack.stat.products': '产品',
        'stack.stat.partners': '伙伴',
        'stack.stat.layers': '自研层',
        'partners.kicker': '05 — PARTNERS',
        'partners.sub': '合作伙伴',
        'partners.lead': '与同样相信「动手造」的团队并肩。',
        'tline.kicker': '06 — TIMELINE',
        'tline.sub': '时间轴',
        'tline.lead': '从一个名字，到一间工作室。八个节点排在时间轴页里，这里先放最近的几格。',
        'tline.cta': '看完整时间轴',
        'tline.n1': 'Laswi 这个名字被创造',
        'tline.n2': '正式改名 LaswI',
        'tline.n3': 'LaswI Studio 正式成立',
        'tline.n4': 'HayMusic《彩虹为序》上架腾讯音乐',
        'tline.n5': '还在往前走',
        'archive.tag': 'ARCHIVE · 第 001 号官网',
        'archive.title': 'LaswI Studio 的第一个官网',
        'archive.desc': '2025 年的第一版，原样封存，连同那些没修完的 bug。点进去还能开。',
        'archive.cta': '进入旧站',
        'footer.kicker': '07 — CONTACT',
        'footer.sub': '合作联系',
        'footer.lead': '有想法、有项目，或只是想聊聊，邮件都欢迎。',
        'footer.built': '自研 · 自造 · 自娱',
        'common.visit': '前往',
        'common.site': '官方网站'
      }
    },
    en: {
      htmlLang: 'en',
      strings: {
        'nav.home': 'Home',
        'nav.products': 'Products',
        'nav.web': 'LaswI Web',
        'nav.film': 'Film',
        'nav.stack': 'Stack',
        'nav.partners': 'Partners',
        'nav.timeline': 'Timeline',
        'nav.contact': 'Contact',
        'hero.eyebrow': 'INDEPENDENT STUDIO · EST. 2025',
        'hero.tagline': 'Systems, products and music — a way to take the dull out of the everyday.',
        'hero.scroll': 'SCROLL',
        'hero.meta': '7 PRODUCTS · 4 PARTNERS',
        'film.kicker': '03 — BRAND FILM',
        'film.sub': 'THE FILM',
        'film.lead': 'Two minutes, one line: kernel, system, products — all built by us.',
        'film.name': 'LASWI STUDIO — BRAND FILM',
        'film.duration': '02:00',
        'film.play': 'Play the full film',
        'film.soundOn': 'Unmute',
        'film.soundOff': 'Mute',
        'video.kicker': 'BRAND FILM · 02:00',
        'video.title': 'LaswI Studio — Brand Film',
        'video.close': 'Close',
        'products.kicker': '01 — NINE THINGS WE BUILD',
        'products.sub': 'PRODUCTS',
        'products.lead': 'From kernel to music: nine products on one self-built road. Hover to pause a tile, click to open it.',
        'web.kicker': '02 — FIRST PRODUCT FOR EVERYONE',
        'web.sub': 'THE FIRST PRODUCT FOR EVERYONE',
        'web.lead': 'Everything before this was built for ourselves and a few people nearby. This one is different: open a tab, and it runs — no download, no install.',
        'web.f1': 'Open and run',
        'web.f2': 'Runs in browser',
        'web.f3': 'Updated online',
        'web.cta': 'Open LaswI Web',
        'web.badge': 'LIVE',
        'stack.kicker': '04 — THE STACK',
        'stack.sub': 'THE STACK',
        'stack.lead': 'Three layers, one line: kernel, system, products. Every layer written by us.',
        'stack.k1.desc': 'Scheduler, memory, drivers — all hand-written, no borrowed kernel.',
        'stack.k1.tag': 'KERNEL · FROM ZERO',
        'stack.k2.desc': 'A whole-machine experience on our own kernel, from the first frame to the desktop.',
        'stack.k2.tag': 'SYSTEM · FULL STACK',
        'stack.k3.desc': 'Nine products on one base — fix it once, every product benefits.',
        'stack.k3.tag': 'PRODUCTS · 09 SHIPPED',
        'stack.stat.est': 'SINCE',
        'stack.stat.products': 'PRODUCTS',
        'stack.stat.partners': 'PARTNERS',
        'stack.stat.layers': 'LAYERS',
        'partners.kicker': '05 — PARTNERS',
        'partners.sub': 'PARTNERS',
        'partners.lead': 'Standing beside teams who also believe in building things by hand.',
        'tline.kicker': '06 — TIMELINE',
        'tline.sub': 'TIMELINE',
        'tline.lead': 'From a name to a studio. Eight entries live on the timeline page — here are the latest few.',
        'tline.cta': 'Open the full timeline',
        'tline.n1': 'The name Laswi is created',
        'tline.n2': 'Renamed to LaswI',
        'tline.n3': 'LaswI Studio is founded',
        'tline.n4': 'HayMusic track on Tencent Music',
        'tline.n5': 'Still walking forward',
        'archive.tag': 'ARCHIVE · SITE NO.001',
        'archive.title': 'LaswI Studio\u2019s first website',
        'archive.desc': 'The 2025 build, sealed as it shipped \u2014 unfinished bugs included. It still opens.',
        'archive.cta': 'Open the old site',
        'footer.kicker': '07 — CONTACT',
        'footer.sub': 'LET’S TALK',
        'footer.lead': 'An idea, a project, or just a chat — email is always open.',
        'footer.built': 'BUILT · MADE · PLAYED',
        'common.visit': 'Visit',
        'common.site': 'Official site'
      }
    }
  };

  const LANGS = Object.keys(I18N);

  /* ── 02 站點資料 ────────────────────────────────────────── */
  const PRODUCTS = [
    {
      id: 'guui', size: 'lg', tone: 'blue', icon: 'smartphone', url: 'guui.com.cn',
      'zh-TW': { name: 'GUUI', desc: '以藍色虎皮鸚鵡為主要設計語言的安卓類原生純淨系統。' },
      'zh-CN': { name: 'GUUI', desc: '以蓝色虎皮鹦鹉为主要设计语言的安卓类原生纯净系统。' },
      en:      { name: 'GUUI', desc: 'A clean, near-AOSP Android build whose entire design language is a blue budgerigar.' }
    },
    {
      id: 'gdpet', size: 'lg', tone: 'mint', icon: 'pets', url: 'gdpet.laswi.com.cn',
      'zh-TW': { name: '咕咚桌寵 GuDongPet', desc: '桌面上會呼吸的小寵物：餵食、陪玩、陪你一起熬夜。' },
      'zh-CN': { name: '咕咚桌宠 GuDongPet', desc: '桌面上会呼吸的小宠物：喂食、陪玩、陪你一起熬夜。' },
      en:      { name: 'GuDong Pet', desc: 'A small creature that lives on your desktop — feed it, play with it, and let it stay up late with you.' }
    },
    {
      id: 'aloe', size: 'lg', tone: 'leaf', icon: 'auto_stories', url: 'aloe.laswi.com.cn',
      'zh-TW': { name: '蘆薈 Aloe', desc: '踏入 AI 世界的入門百科全書：從概念到實作，一頁一頁講清楚。' },
      'zh-CN': { name: '芦荟 Aloe', desc: '踏入 AI 世界的入门百科全书：从概念到实践，一页一页讲清楚。' },
      en:      { name: 'Aloe', desc: 'A beginner\u2019s encyclopedia for stepping into AI — from first concepts to hands-on practice, one page at a time.' }
    },
    {
      id: 'vaylo', size: 'wide', tone: 'orange', icon: 'memory', url: 'vaylo.nex.laswi.com.cn',
      'zh-TW': { name: 'VayloOS', desc: '純自研內核操作系統，從零寫起的整機體驗。' },
      'zh-CN': { name: 'VayloOS', desc: '纯自研内核操作系统，从零写起的整机体验。' },
      en:      { name: 'VayloOS', desc: 'An operating system on our own kernel — written from zero, all the way up.' }
    },
    {
      id: 'nex', size: 'sm', tone: 'slate', icon: 'terminal', url: 'nex.laswi.com.cn',
      'zh-TW': { name: 'Nex Kernel', desc: '純自研內核：排程、記憶體與驅動。' },
      'zh-CN': { name: 'Nex Kernel', desc: '纯自研内核：调度、内存与驱动。' },
      en:      { name: 'Nex Kernel', desc: 'A hand-written kernel: scheduler, memory, drivers.' }
    },
    {
      id: 'howgo', size: 'sm', tone: 'green', icon: 'shield', url: 'howgo.laswi.com.cn',
      'zh-TW': { name: 'HowGo', desc: '安全聊天網站，隱私是預設值。' },
      'zh-CN': { name: 'HowGo', desc: '安全聊天网站，隐私是默认值。' },
      en:      { name: 'HowGo', desc: 'A chat site where privacy is the default.' }
    },
    {
      id: 'gutake', size: 'wide', tone: 'purple', icon: 'forum', url: 'gutake.laswi.com.cn',
      'zh-TW': { name: '汩談 GuTake', desc: '社交論壇，給長一點的對話留位置。' },
      'zh-CN': { name: '汩谈 GuTake', desc: '社交论坛，给长一点的对话留位置。' },
      en:      { name: 'GuTake', desc: 'A social forum that leaves room for longer conversations.' }
    },
    {
      id: 'game', size: 'sm', tone: 'rose', icon: 'sports_esports', url: 'game.laswi.com.cn',
      'zh-TW': { name: 'LaswI Game', desc: '遊戲：網頁端與安卓小遊戲。' },
      'zh-CN': { name: 'LaswI Game', desc: '游戏：网页端与安卓小游戏。' },
      en:      { name: 'LaswI Game', desc: 'Games for the browser and for Android.' }
    },
    {
      id: 'music', size: 'sm', tone: 'cream', icon: 'graphic_eq', url: 'music.laswi.com.cn',
      'zh-TW': { name: 'HayMusic', desc: '音樂：私有版權曲庫。' },
      'zh-CN': { name: 'HayMusic', desc: '音乐：私有版权曲库。' },
      en:      { name: 'HayMusic', desc: 'Music: a privately licensed catalogue.' }
    }
  ];

  const PARTNERS = [
    {
      id: 'rt', tone: 'orange', logo: 'assets/st-studio-logo.JPG', url: 'rtstu.com',
      'zh-TW': {
        name: '熱土工作室 RTStudio',
        desc: '熱土工作室，一支由初中生組建的 IT 科技團隊。「熱土」象徵腳下堅實的根基與心中不滅的創造熱忱。雖年紀尚輕，卻懷揣以科技解決實際問題、回饋社會的理想，在這裡學習探索、動手創造，以程式碼構築未來，期盼創新的種子於這片熱土生根發芽。'
      },
      'zh-CN': {
        name: '热土工作室 RTStudio',
        desc: '热土工作室，一支由初中生组建的 IT 科技团队。「热土」象征脚下坚实的根基与心中不灭的创造热忱。虽年纪尚轻，却怀揣以科技解决实际问题、回馈社会的理想，在这里学习探索、动手创造，以代码构筑未来，期盼创新的种子于这片热土生根发芽。'
      },
      en: {
        name: 'RTStudio',
        desc: 'RTStudio is an IT team founded by middle-school students. “Hot soil” stands for solid ground underfoot and a creative fire that never goes out. Young as they are, they want to solve real problems with technology and give something back — learning, building, writing code toward a future they hope will take root in this soil.'
      }
    },
    {
      id: 'xmzf', tone: 'slate', logo: 'assets/xmzf-logo.png', url: 'xmzf.space',
      'zh-TW': {
        name: '小明之父工作室 XMZF sTudio',
        desc: 'XMZF sTudio 是一個追求簡潔與創造力的工作室。我們相信「Code × Art = ∞」，在極簡與美學之間尋找平衡。'
      },
      'zh-CN': {
        name: '小明之父工作室 XMZF sTudio',
        desc: 'XMZF sTudio 是一个追求简洁与创造力的工作室。我们相信「Code × Art = ∞」，在极简与美学之间寻找平衡。'
      },
      en: {
        name: 'XMZF sTudio',
        desc: 'XMZF sTudio chases simplicity and creativity. We believe Code × Art = ∞, and we look for the balance between minimalism and aesthetics.'
      }
    },
    {
      id: 'nes', tone: 'green', logo: 'assets/xqn.png', url: 'www.newera2625.top',
      'zh-TW': {
        name: '新啟年工作室 NES',
        desc: '專注系統軟體開發、網站定製開發，致力於為客戶提供穩定、高效、可落地的數位化解決方案，務實交付每一個專案。'
      },
      'zh-CN': {
        name: '新启年工作室 NES',
        desc: '专注系统软件开发、网站定制开发，致力于为客户提供稳定、高效、可落地的数字化解决方案，务实交付每一个项目。'
      },
      en: {
        name: 'NewEra Studio (NES)',
        desc: 'Focused on system software and bespoke websites: stable, efficient, shippable digital solutions — every project delivered with both feet on the ground.'
      }
    },
    {
      id: 'wbdog', tone: 'purple', logo: 'assets/wbdog-logo.png', url: 'wbdog.com.cn',
      'zh-TW': {
        name: '白熊犬工作室 WBDog',
        desc: '白熊犬智能終端 · 專注網頁製作。'
      },
      'zh-CN': {
        name: '白熊犬工作室 WBDog',
        desc: '白熊犬智能终端 · 专注网页制作。'
      },
      en: {
        name: 'WBDog Studio',
        desc: 'Smart terminals by WBDog — focused on building web pages.'
      }
    }
  ];

  /* ── 03 渲染 ────────────────────────────────────────────── */
  const tilesEl = $('#tiles');
  const partnersEl = $('#partnersGrid');

  const pad2 = (n) => String(n).padStart(2, '0');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function tileHTML(p, i, lang, t) {
    const d = p[lang];
    return `
      <a class="tile tile--${p.size} tone-${p.tone}" href="https://${p.url}"
         target="_blank" rel="noopener noreferrer"
         aria-label="${esc(d.name)} — ${esc(t['common.visit'])} ${esc(p.url)}"
         style="--d:${i}">
        <span class="tile__inner">
          <span class="tile__face tile__face--front">
            <span class="tile__top">
              <span class="tile__idx">${pad2(i + 1)} / ${pad2(PRODUCTS.length)}</span>
              <span class="material-symbols-rounded tile__icon" aria-hidden="true">${p.icon}</span>
            </span>
            <span class="tile__body">
              <span class="tile__name">${esc(d.name)}</span>
              <span class="tile__desc">${esc(d.desc)}</span>
            </span>
          </span>
          <span class="tile__face tile__face--back">
            <span class="tile__back-top">${esc(t['common.site'])}</span>
            <span class="tile__url">${esc(p.url)}</span>
            <span class="tile__cta">${esc(t['common.visit'])}
              <span class="material-symbols-rounded" aria-hidden="true">north_east</span>
            </span>
          </span>
        </span>
      </a>`;
  }

  function partnerHTML(p, i, lang, t) {
    const d = p[lang];
    return `
      <article class="partner partner--${p.tone}" data-idx="${pad2(i + 1)}" style="--d:${i}">
        <div class="partner__head">
          <span class="partner__logo" data-logo data-fallback="${esc(d.name.slice(0, 1))}">
            <img src="${p.logo}" alt="${esc(d.name)} 標誌" loading="lazy" data-fallback="${esc(d.name.slice(0, 1))}">
          </span>
          <div>
            <h3 class="partner__name">${esc(d.name)}</h3>
            <span class="partner__url">${esc(p.url)}</span>
          </div>
        </div>
        <p class="partner__desc">${esc(d.desc)}</p>
        <div class="partner__foot">
          <a class="partner__go" href="https://${p.url}" target="_blank" rel="noopener noreferrer">
            ${esc(t['common.visit'])}
            <span class="material-symbols-rounded" aria-hidden="true">north_east</span>
          </a>
          <span class="partner__idx">/ ${pad2(i + 1)}</span>
        </div>
      </article>`;
  }

  function renderAll(lang) {
    const t = I18N[lang].strings;
    clearFlipTimers();
    tilesEl.innerHTML = PRODUCTS.map((p, i) => tileHTML(p, i, lang, t)).join('');
    partnersEl.innerHTML = PARTNERS.map((p, i) => partnerHTML(p, i, lang, t)).join('');

    bindImageFallbacks(tilesEl);
    bindImageFallbacks(partnersEl);
    initTiles();
    observeReveals(tilesEl);
    observeReveals(partnersEl);
  }

  /* ── 04 語言切換 ────────────────────────────────────────── */
  const seg = $('#langSeg');
  const segButtons = $$('.seg__btn', seg);
  const segThumb = $('.seg__thumb', seg);
  let currentLang = 'zh-TW';

  function moveThumb() {
    const active = segButtons.find((b) => b.classList.contains('is-active')) || segButtons[0];
    if (!active) return;
    segThumb.style.width = `${active.offsetWidth}px`;
    segThumb.style.transform = `translateX(${active.offsetLeft}px)`;
  }

  function applyStrings(lang) {
    const dict = I18N[lang];
    document.documentElement.lang = dict.htmlLang;
    document.documentElement.dataset.lang = lang;
    $$('[data-i18n]').forEach((el) => {
      const val = dict.strings[el.dataset.i18n];
      if (typeof val === 'string') el.textContent = val;
    });
    // aria-label 同樣走字典（音控、關閉鈕等純圖示控件）
    $$('[data-i18n-aria]').forEach((el) => {
      const val = dict.strings[el.dataset.i18nAria];
      if (typeof val === 'string') el.setAttribute('aria-label', val);
    });
  }

  function setLang(lang, { animate = true } = {}) {
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
      renderAll(lang);
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

  /* ── 05 導航 ────────────────────────────────────────────── */
  const nav = $('#nav');
  const navToggle = $('#navToggle');
  const navLinks = $('#navLinks');
  const navScrim = $('#navScrim');
  let navTicking = false;

  /* 手機抽屜：統一由 setDrawer 控制選單、遮罩、圖標、aria 與背景滾動鎖 */
  function setDrawer(open) {
    navLinks.classList.toggle('is-open', open);
    nav.classList.toggle('is-open', open);
    if (navScrim) navScrim.classList.toggle('is-open', open);
    document.body.classList.toggle('is-nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    const icon = navToggle.querySelector('.material-symbols-rounded');
    if (icon) icon.textContent = open ? 'close' : 'menu';
  }

  function onScroll() {
    if (navTicking) return;
    navTicking = true;
    requestAnimationFrame(() => {
      nav.classList.toggle('is-floating', window.scrollY > 24);
      navTicking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  navToggle.addEventListener('click', () => {
    setDrawer(!navLinks.classList.contains('is-open'));
  });

  $$('.nav__link').forEach((link) => {
    link.addEventListener('click', () => setDrawer(false));
  });

  // 遮罩點擊 / Esc 收起；回到桌面斷點時自動復位，避免殘留鎖滾動
  if (navScrim) navScrim.addEventListener('click', () => setDrawer(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('is-open')) setDrawer(false);
  });
  const wideQuery = window.matchMedia('(min-width: 861px)');
  const onWide = (e) => { if (e.matches) setDrawer(false); };
  if (wideQuery.addEventListener) wideQuery.addEventListener('change', onWide);
  else wideQuery.addListener(onWide);

  /* Scroll Spy：以觀察區塊決定當前導航項 */
  const sections = ['home', 'products', 'web', 'film', 'stack', 'partners', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        $$('.nav__link').forEach((l) => {
          l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((s) => spy.observe(s));

  /* ── 06 磁貼自動翻轉 ────────────────────────────────────── */
  let productsVisible = false;
  new IntersectionObserver(
    (entries) => entries.forEach((e) => { productsVisible = e.isIntersecting; }),
    { threshold: 0.05 }
  ).observe($('#products'));

  const flipTimers = new Set();

  function clearFlipTimers() {
    flipTimers.forEach((id) => clearTimeout(id));
    flipTimers.clear();
  }

  function initTiles() {
    $$('.tile', tilesEl).forEach((tile) => {
      if (prefersReduced.matches || isTouch) return;

      let paused = false;

      const tick = () => {
        if (!tile.isConnected) return; // 語系重繪後停止舊節點的循環
        const id = window.setTimeout(() => {
          flipTimers.delete(id);
          if (!paused && productsVisible && !document.hidden) {
            tile.classList.toggle('is-flipped');
          }
          tick();
        }, 4200 + Math.random() * 1800); // 4–6 秒隨機，避免整排同步
        flipTimers.add(id);
      };

      // 懸停：暫停自動翻轉（同時 CSS 觸發上浮 / 放大）
      tile.addEventListener('mouseenter', () => { paused = true; });
      tile.addEventListener('mouseleave', () => { paused = false; });
      tile.addEventListener('focus', () => { paused = true; });
      tile.addEventListener('blur', () => { paused = false; });

      tick();
    });
  }

  /* ── 07 Hero 視差 ───────────────────────────────────────── */
  const hero = $('.hero');
  if (hero && !prefersReduced.matches && !isTouch) {
    let heroRaf = null;
    hero.addEventListener('mousemove', (e) => {
      if (heroRaf) return;
      heroRaf = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const mx = (e.clientX - rect.left) / rect.width - 0.5;
        const my = (e.clientY - rect.top) / rect.height - 0.5;
        hero.style.setProperty('--mx', mx.toFixed(3));
        hero.style.setProperty('--my', my.toFixed(3));
        heroRaf = null;
      });
    });
    hero.addEventListener('mouseleave', () => {
      hero.style.setProperty('--mx', 0);
      hero.style.setProperty('--my', 0);
    });
  }

  /* ── 08 進場動畫 ────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  function observeReveals(root = document) {
    $$('.reveal', root).forEach((el) => revealObserver.observe(el));
    if (root.classList && root.classList.contains('reveal')) revealObserver.observe(root);
  }

  /* ── 08b 宣傳片區塊：視口內自動播放 / 音量 / 彈層 ─────────── */
  const promo = $('#promo');
  const promoVideo = $('#promoVideo');
  const promoSound = $('#promoSound');
  const promoPlay = $('#promoPlay');
  const filmDialog = $('#filmDialog');
  const filmVideo = $('#filmVideo');
  const filmClose = $('#filmClose');

  const isNarrow = () => window.matchMedia('(max-width: 860px)').matches;
  const pickSrc = (el) => (isNarrow() ? el.dataset.src720 : el.dataset.src1080);
  const saveData = () => !!(navigator.connection && navigator.connection.saveData);
  const cinematicOff = () => prefersReduced.matches || saveData(); // 減弱動效 / 省流：只留 poster

  let promoInView = false;

  /* 進入視口才拉檔案；源由腳本挑選（桌面 1080p / 行動 720p） */
  function loadPromo(force) {
    if (!promoVideo || promoVideo.dataset.loaded) return;
    if (!force && cinematicOff()) return; // 減弱動效 / 省流：進視口也不主動載入
    promoVideo.dataset.loaded = '1';
    promoVideo.addEventListener('loadeddata', () => {
      if (promoInView) promoVideo.play().catch(() => {});
    }, { once: true });
    promoVideo.src = pickSrc(promoVideo);
    promoVideo.muted = true;
    promoVideo.play().catch(() => {});
  }

  function setPromoMuted(muted) {
    if (!promoVideo || !promoSound) return;
    promoVideo.muted = muted;
    const key = muted ? 'film.soundOn' : 'film.soundOff';
    const icon = $('.material-symbols-rounded', promoSound);
    promoSound.classList.toggle('is-on', !muted);
    promoSound.setAttribute('aria-pressed', String(!muted));
    promoSound.setAttribute('aria-label', I18N[currentLang].strings[key]);
    promoSound.dataset.i18nAria = key;
    if (icon) icon.textContent = muted ? 'volume_off' : 'volume_up';
  }

  if (promoVideo) {
    if (promoSound) {
      promoSound.addEventListener('click', () => {
        if (!promoVideo.dataset.loaded) loadPromo(true); // 用戶主動點擊：即使 reduced-motion 也載入並出聲
        setPromoMuted(!promoVideo.muted);
        promoVideo.play().catch(() => {});
      });
    }

    /* 進入視口才播放、離開即暫停（省電、省解碼） */
    if (promo && 'IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          promoInView = entry.isIntersecting;
          if (!entry.isIntersecting) {
            promoVideo.pause();
            return;
          }
          loadPromo();
          if (promoVideo.dataset.loaded && !cinematicOff()) promoVideo.play().catch(() => {});
        });
      }, { threshold: 0.25 }).observe(promo);
    } else {
      promoInView = true;
    }

    /* 分頁切到背景時暫停 */
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        promoVideo.pause();
      } else if (promoInView && promoVideo.dataset.loaded) {
        promoVideo.play().catch(() => {});
      }
    });

    /* 使用者中途開啟「減少動效」：立刻暫停並退回 poster */
    const onReduced = (e) => {
      if (!e.matches) return;
      promoVideo.pause();
      promoVideo.removeAttribute('src');
      delete promoVideo.dataset.loaded;
      promoVideo.load();
      setPromoMuted(true);
    };
    if (prefersReduced.addEventListener) prefersReduced.addEventListener('change', onReduced);
  }

  /* 宣傳片彈層：首次開啟才載入源，從頭播放；關閉（含 Esc / 遮罩）即暫停 */
  if (filmDialog && filmVideo && promoPlay) {
    const openFilm = () => {
      if (!filmVideo.dataset.loaded) {
        filmVideo.dataset.loaded = '1';
        filmVideo.src = pickSrc(filmVideo);
      }
      promoVideo && promoVideo.pause(); // 避免兩路音軌同時出聲
      document.body.classList.add('is-film-open');
      if (typeof filmDialog.showModal === 'function') filmDialog.showModal();
      else filmDialog.setAttribute('open', '');
      filmVideo.currentTime = 0;
      filmVideo.play().catch(() => {});
    };

    const closeFilm = () => {
      filmVideo.pause();
      document.body.classList.remove('is-film-open');
      if (typeof filmDialog.close === 'function') filmDialog.close();
      else filmDialog.removeAttribute('open');
      if (promoInView && promoVideo && promoVideo.dataset.loaded) promoVideo.play().catch(() => {});
    };

    promoPlay.addEventListener('click', openFilm);
    if (filmClose) filmClose.addEventListener('click', closeFilm);

    // Esc：攔下原生 cancel，統一走 closeFilm（確保暫停）
    filmDialog.addEventListener('cancel', (e) => { e.preventDefault(); closeFilm(); });
    filmDialog.addEventListener('close', () => {
      filmVideo.pause();
      document.body.classList.remove('is-film-open');
    });

    // 點遮罩關閉（點擊落在對話框邊界外）
    filmDialog.addEventListener('click', (e) => {
      const r = filmDialog.getBoundingClientRect();
      const outside = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      if (outside) closeFilm();
    });
  }

  /* ── 09 圖片缺失兜底 ────────────────────────────────────── */
  function bindImageFallbacks(root = document) {
    $$('img[data-fallback]', root).forEach((img) => {
      const markMissing = () => {
        img.classList.add('is-missing');
        const holder = img.closest('[data-logo]');
        if (holder) holder.classList.add('has-missing');
      };
      if (img.complete && img.naturalWidth === 0) markMissing();
      img.addEventListener('error', markMissing, { once: true });
    });
  }

  /* ── 啟動 ───────────────────────────────────────────────── */
  function init() {
    let saved = null;
    try { saved = localStorage.getItem('laswi.lang'); } catch (e) { /* ignore */ }

    const guess = (navigator.language || '').toLowerCase();
    const auto = guess.startsWith('zh-cn') || guess.startsWith('zh-hans') ? 'zh-CN'
      : guess.startsWith('zh') ? 'zh-TW'
      : 'en';

    const lang = LANGS.includes(saved) ? saved : auto;

    applyStrings(lang);
    renderAll(lang);
    currentLang = lang;
    segButtons.forEach((b) => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    moveThumb();

    // 首屏大圖缺失時隱藏，露出 .hero 的漸層佔位
    $$('.hero__img').forEach((img) => {
      const hide = () => img.classList.add('is-missing');
      if (img.complete && img.naturalWidth === 0) hide();
      img.addEventListener('error', hide, { once: true });
    });

    bindImageFallbacks(document);
    observeReveals(document);

    window.addEventListener('resize', moveThumb);
    window.addEventListener('load', moveThumb);

    $('#year').textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
