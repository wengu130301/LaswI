---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: 036678f504ff50ab1d8d56fc51fc50d4_c4dc11e7d6d711f1a216525400248c00
    ReservedCode1: Vs/VcVXN1J21Bjz4/ZrRmWJjaQTaTHO+6YILqQmN+U5MjxfSyNd/KYThqOjYrkVjzTD0SHydTqKaB1/ngiJ9AmluZZlxNmw2ZRIcM0W9Nn6xQl6bDN0kTEti0L8wp1Pv28Zq2ohDyzddAEVM68SjLxDlyWfojvCsUF376C8zq1RBpp4gBYvuq5O64wM=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: 036678f504ff50ab1d8d56fc51fc50d4_c4dc11e7d6d711f1a216525400248c00
    ReservedCode2: Vs/VcVXN1J21Bjz4/ZrRmWJjaQTaTHO+6YILqQmN+U5MjxfSyNd/KYThqOjYrkVjzTD0SHydTqKaB1/ngiJ9AmluZZlxNmw2ZRIcM0W9Nn6xQl6bDN0kTEti0L8wp1Pv28Zq2ohDyzddAEVM68SjLxDlyWfojvCsUF376C8zq1RBpp4gBYvuq5O64wM=
---





# LaswI Studio 官網

純 HTML + CSS + 原生 JavaScript，無框架、無外部 UI 庫（僅 Google Fonts + Material Symbols）。

## 檔案結構

```
laswi-studio/
├── index.html      結構與語意（文字皆掛 data-i18n）
├── style.css       MD3 色板 / 圓角 / 陰影 / 動效，含 3 檔響應式
├── script.js       三語 i18n、產品與夥伴資料渲染、磁貼翻轉、視差、Observer
├── media/          上線用影片與海報（勿直接引用 17MB 原始檔）
│   ├── promo-1080.mp4  首屏 + 彈層桌面源（4.83MB）
│   ├── promo-720.mp4   行動源（2.26MB）
│   └── promo-poster.jpg 首屏海報 / 影片 poster（74KB）
├── video-shots/    本輪影片接入實測截圖
├── gu.png          首屏大圖（可選：有了影片後僅作兜底）
├── logo.png        站點 Logo（需自行放入）
└── assets/
    ├── st-studio-logo.JPG
    ├── xmzf-logo.png
    ├── xqn.png
    └── wbdog-logo.png
```

## 使用方式

把 `gu.png`、`logo.png` 與 `assets/` 四個夥伴 Logo 放進對應位置，直接雙擊 `index.html` 即可在瀏覽器打開（file:// 亦可正常運行；Google Fonts 需聯網，離線時回退系統字體）。

**圖片缺失不會破版**：`script.js` 的 `bindImageFallbacks()` 會監聽 `error` 事件，把載入失敗的圖片隱藏，並由容器顯示同尺寸 Material 色塊佔位（夥伴 Logo 會補上首字母）。

## 已實作要點

| 需求 | 實作位置 |
| --- | --- |
| 語言切換（簡中／繁中／英，全站文案） | `script.js` → `I18N` 字典 + `setLang()` + `renderAll()` |
| 巨型鏤空字（LaswI / PRODUCTS / LET'S TALK） | `style.css` → `.hollow`（background-clip: text） |
| 圖形鏤空色帶 | `index.html` → `.cutout` 內 SVG，`mask` + `clipPath` 圓孔與圓角矩形 |
| 首屏邊緣漸進模糊 | `.hero__img--edge` + `mask-image: radial-gradient(...)` |
| 磁貼 3D 自動翻轉（4–6 秒隨機） | `.tile__inner`（preserve-3d）+ `initTiles()` timed flip |
| 懸停打斷自動翻轉、離開後續翻 | `mouseenter/mouseleave` → `paused` |
| 滾動揭示（不用 scroll 事件） | `IntersectionObserver` in `initReveal()` |
| 鼠標視差 | `--mx / --my` 於 `[data-parallax]`，幅度由 `--d` 控制 |
| reduced-motion | `style.css` 11 節 + JS `prefersReduced` 判斷（停自動翻轉、停視差） |

## v2 版面調整（針對「開頭雜亂 / 後面單調」）

**首屏收斂為三個區塊**
- 只留「導航 / 中央字鎖 / 底部資訊列」；原散落於四角的 logo、Studio、tagline、scroll 全部歸位。
- `Studio` 與 `LaswI` 併成一個字鎖，兩側細線夾住，字距 `.44em`。
- 底部一條基線：左「向下探索」膠囊、右「7 個產品 · 4 位夥伴」，取代原本多點散佈。
- 進場動畫改用 `translate` 獨立屬性，避免與視差 `transform` 互相覆蓋。

**中後段增加三種節奏**
- 滾動字帶 `.marquee`：斜置 −1.6°、深藍紫漸層、雙組無縫滾動 34s，懸停暫停，`reduced-motion` 下停止。
- 陳述色帶 `.statement`：只留巨型鏤空字「SELF BUILT」，坐在 tertiary-container 淺色塊上，內圈細裝飾框 + 加厚留白。
- 夥伴區改非對稱 6 欄（4+2 / 2+4 交錯），三張淺色調卡 + 一張深色卡（`tone: 'slate'`），卡片角標序號移除以免壓字。
- 產品段標題改左右分欄（巨型標題 + 右側說明），與夥伴段的居中標題交替，避免一路左對齊下滑。
- 頁腳改兩欄：左巨型 LET'S TALK、右三條郵件列（懸停下劃線 + 外跳箭頭）。

**細節修正**
- `html/body` 加 `overflow-x: clip`，消除手機端 27px 橫向溢出（來源為旋轉卡面與導航位移）。
- 手機首屏字級由 `21vw` 收到 `18.4vw`，tagline 限 `24ch`，避免文字過大壓縮。
- `hero__bar` 左右隨 `--gutter` 對齊，手機上僅顯示箭頭膠囊。

## v3 版面調整（解決整頁偏白、段落單調）

**底色與色塊分區**
- `body` 改為柔和多色徑向漸層：頂部偏藍（primary）、右上偏橙（secondary）、底部偏綠（tertiary）、右下補一道 accent，透明度 0.08–0.12，`background-attachment: fixed`，滾動時色溫緩慢轉移而非死白。
- `.section--products` 坐上圓角淺色底板（`surface-container` + 雙向柔光暈 + `elev-1`），與白色頁面形成色塊分區。

**新增「自研棧 STACK」區塊（id=`stack`）**
- 位置：`.marquee` 之後、`#partners` 之前；全寬深海軍藍漸變圓角卡（`#1b2650 → #141c3c → #0e142c`），邊角帶藍 / 紫光暈，比頁腳更深以便兩片深色區隔。
- 三行分層 Kernel → System → Products：左層號 `01/02/03`（accent / secondary / tertiary 提亮版）、中間名稱 + 一句描述、右側 mono 標籤；行間 hairline，hover 整行右移 4px 並提亮。
- 底部一行四項數據：`2025 起於 / 07 產品 / 04 夥伴 / 03 自研層`，數字走大字號 display 字體。
- 每行獨立 `reveal` 入場，`--d` 逐行錯峰 90ms；動畫走 `translate`，hover 走 `transform`，互不干擾。

**導航與編號**
- 導航新增「自研棧 / Stack / 自研栈」指向 `#stack`；`partners.kicker 02 → 03`、`footer.kicker 03 → 04`，三語同步。

**陳述色帶收斂**
- 移除副句 `.statement__line`（含 HTML、i18n 的 `statement.line` 鍵、CSS 規則與 i18n 淡出引用），只留鏤空 SELF BUILT；以加厚內距 + 內圈裝飾細框補足視覺重量。

**驗證**
- 375px（iframe 模擬）與 1440px 下 `scrollWidth === clientWidth`，無橫向溢出。
- 三語切換後 `[data-i18n]` 全數命中字典，淡入淡出正常；磁貼翻轉與 reveal 不受影響。

## v4 移動端完善（≤860 / ≤600 與橫屏 812×375）

**導航抽屜**
- `≤860px` 五個連結收進下拉浮層：絕對定位、`max-height: calc(100dvh - 140px)` 可滾動、`opacity/transform/visibility` 300ms 過渡；觸發鈕與選單項 44×44 起（連結 `min-height: 48px`），`.nav__link` 加 `white-space: nowrap` 防斷點擠壓換行。
- 新增 `.nav-scrim` 全屏遮罩（`z-index: 90`、模糊 + 淡入）：點遮罩、按 Esc、點任一連結、放大到 `>860px` 皆自動關閉；開啟時 `body.is-nav-open` 鎖背景滾動。
- 狀態集中在 `setDrawer(open)`：同步 `aria-expanded`、菜單圖標（menu / close）與 `pointer-events`，避免多處各自改 class。

**首屏**
- 字級改 `clamp()` 逐級收斂（375 下 title / studio / tagline / eyebrow），`line-height` 放寬避免爆行。
- 底部資訊列 `flex-direction: column`：探索提示在上、產品數字在下，兩行堆疊不重疊；`bottom`／`padding` 全走 `env(safe-area-inset-*)`；`.hero__media` 裁切放大的背景圖，不撐出視口。

**自研棧**
- `≤600px` 改縱向堆疊：第一行「層號 + 標籤」（`1fr auto`）、第二行名稱（`grid-column: 1 / -1`）、第三行描述；底部四項數據 `repeat(2, 1fr)` 成 2×2。
- 觸屏（`hover: none`）取消行位移，改 `:active` 提亮。

**產品磁貼 / 夥伴 / 頁腳**
- `≤600px` 單列；`.tile` 改 `display: grid` 讓正反兩面共格、高度由內容決定（`min-height: 176px`）；`hover:none` 下禁翻轉與 `translateY`，只留 `:active` 微縮，點擊直接跳轉。
- 單列必須重置跨欄：`.tile--lg / .tile--wide { grid-column: auto; grid-row: auto }`；夥伴 `nth-child(1..4) { grid-column: span N }` 要用 `:nth-child(n)` 等特異度覆蓋，否則單列中會生成隱式列把版面拆壞（本次已修，桌面不受影響）。
- 夥伴卡片、陳述色帶 SELF BUILT、頁腳兩欄一律單列；`.mail` 整行可點（`min-height: 56px`）、長信箱 `overflow-wrap: anywhere`；`.partner__head` 允許換行並 `min-width: 0`。

**全局**
- `≤860px` 起可點元素最小 44×44（含 `.skip-link`、`.seg__btn`、`.partner__go`、`.mail`、`.nav__toggle`），可點文字 ≥14px；標題全部 `clamp()`；`html/body` `overflow-x: hidden` + 媒體 `max-width: 100%`。
- 橫屏（`orientation: landscape and max-height: 520px`）壓縮首屏垂直節奏、底部列回到單行，無橫向滾動；桌面（>860px）排版完全保留。

**實測（Edge headless + iframe 四視口）**
- 375×812 / 390×844 / 430×932 / 812×375：`documentElement.scrollWidth === clientWidth`、無元素越界（含 rect 級檢測）、無 <44px 觸控目標、無 <14px 可點文字。
- 抽屜：class / aria / 圖標 / 遮罩 / 鎖滾動狀態全對；headless 不推進過渡時間軸，故另以 `transition: none` 驗證開啟態為 `opacity: 1 / visible`。
- 三語：简 / 繁 / EN 切換後 `data-lang` 與 `nav.stack` 文案正確。
- 桌面回歸 1440px：磁貼 4 欄 196px 列高、夥伴 6 欄 span 4/2/2/4、頁腳雙欄、導航橫排（toggle `display: none`）與改動前一致。

## v5 移動端逐屏修復（375×812 / 390×844）

以 Edge headless（`--blink-settings primaryPointerType=2`）在 375×812 與 390×844 兩檔視口，按「首屏 / 導航抽屜 / 產品磁貼 / 自研棧 / 夥伴 / 陳述色帶 / 頁腳」十個取景逐屏截圖＋DOM 幾何審計（rect、scrollWidth、重疊、`elementFromPoint` 可點性），修復以下 6 項實測偏差：

| # | 實測到的問題 | 量測依據 | 修法（`style.css` 第 07 節） |
|---|---|---|---|
| ① | 觸屏抽屜的可點性依賴過渡時序：`.nav__links` 的 `visibility` 參與 300ms 過渡，過渡未走完時為 `hidden`，點擊穿透到首屏（headless 凍結時間軸時 t0/t60/t150/t400 四點 `elementFromPoint` 全部命中 `DIV.hero__content`，5/5 連結不可點） | 同上；`getComputedStyle` 回 `visibility: hidden / opacity: 0 / z-index: auto` | 觸屏（`hover: none`）把 `visibility` 移出過渡清單（只過渡 `opacity/transform`），並給 `.nav__links.is-open` 補 `z-index: 2` 明確浮層層級；改後同四點命中 `A.nav__link`（5/5） |
| ② | 產品磁貼單列高度不齊（首張 196px、其餘 176px），且背面雖不可翻轉仍參與佈局，iOS 上 `backface-visibility` 失效時會與正面鏡像文字重疊 | `tileH = [196,176,176,…]`；兩面 `grid-area` 同格 | `≤600px`：`.tile__face--back { display: none }`、`.tile__inner { transform: none }`、`.tile, .tile--lg { min-height: 196px }`，7 張卡統一 196px |
| ③ | 跑馬燈／陳述色帶左右被硬切：`.marquee__band` 為 104% 寬 + `margin-inline: -2%` + `rotate`，375 下實際 390px，超出部分被 `overflow: hidden` 裁掉 7.5px/邊，圓角消失 | `.marquee__band` rect `l=0 r=390`（視口 375） | `≤600px`：寬度 100%、`margin-inline: 0`、傾角收至 `-1.2deg`，兩端圓角完整 |
| ④ | 首屏邊緣羽化層越界：`.hero__img--edge`（`scale(1.14)`）rect 為 `-23…398`，超出視口 23px 並被容器裁出直邊 | 審計 `overVp: img.hero__img--edge l=-23 r=398` | `≤600px` 不呈現該裝飾層（`display: none`），首屏只保留清晰層 |
| ⑤ | 首屏主視覺缺圖時整屏留白：`gu.png` 尚未置入，`.hero__img.is-missing { opacity: 0 }` 後首屏只剩底色 | 兩張 `hero__img` 均帶 `is-missing` | `≤600px` 給 `.hero__media` 加同色系漸層網格兜底；補圖後圖片覆蓋，兜底自動不可見 |
| ⑥ | 自研棧窄屏兩欄與頁腳郵件在極窄／長字串下可被擠壓 | 層號 `r=133`、標籤 `l=145`（EN 為 `r=123 / l=135`）；`mail` 高 59px | `.stack__num { white-space: nowrap }`、`.stack__tag { min-width: 0; max-width: 100% }`；`.mail, .mail__text { max-width: 100%; overflow-wrap: anywhere }` |

**修復後實測**
- 375 / 390 兩檔：`scrollWidth === clientWidth`，`overlaps = 0`，`overVp = []`；磁貼 7 張均 196px、背面 `h=0`；自研棧四數據 2×2（`36–181 / 195–339`，兩行基線 3538 / 3612）；`footer 12–363`、`mail 20–331` 不越界。
- 抽屜（`transition: none` 之後）：5 個連結 `min-height 49px`、`elementFromPoint` 全部命中 `a.nav__link`，`aria-expanded="true"`、遮罩與鎖滾動正常。
- 桌面 1440 回歸：`scrollWidth = 1440`、`overlaps = 0`、磁貼 4 欄 412/196px、雙面仍可翻轉，v5 規則只在 `≤600px` 與 `hover: none` 生效。
- 前後對照截圖：`mobile-shots/before/`（20 張）與 `mobile-shots/after/`（20 張），檔名 `{視口寬}-{序號}-{區塊}.png`。

## v7 宣傳片改為獨立區塊（已撤回首屏影片背景）

需求校正：宣傳片不再當首屏背景，改為頁面內一個**專門的 16:9 影片區塊**，進視口自動播放。

### 撤回首屏影片（v6 內容全部移除）

| 移除項 | 說明 |
| --- | --- |
| DOM | `hero` 內 `.hero__poster`、`.hero__video`（`#heroVideo`）、`#heroSound`、`#watchFilm` 及底部影片列全部刪除 |
| CSS | 第 12 節 hero 影片層 / 海報層 / 音控 / `.hero.is-video-ready` 加深遮罩全部刪除，`prefers-reduced-motion` 的 `video{display:none}` 規則改掛到 `.promo` |
| JS | 舊 08b「首屏影片」模組整段替換為 `#film` 區塊邏輯；`hero.*` 相關 i18n 鍵移除 |
| 保留 | `≤600px` 的 `.hero__media` 漸變網格兜底（`gu.png` 缺失時仍不開天窗）、字鎖、ticker、底部資訊列 |

實測 `document.querySelectorAll('.hero video, .hero__poster, .hero__sound, #watchFilm').length === 0`，首屏回到純視覺狀態。

### 新增 `#film` 區塊

位置：`marquee` 字帶之後、自研棧之前，DOM 順序實測為 `home → products → marquee → film → stack → partners → statement → contact`。

- 導航新增「宣傳片 / Film」入口（`href="#film"`），滾動監聽（Scroll Spy）同步高亮。
- 標題沿用既有 `sec-head` 體系：`kicker` 數字編號 + 鏤空大標 `FILM` + 中文副標「宣傳片」+ 一句 lead。
- 內側為 `#promo`（`.promo`）16:9 大圓角卡片（MD3 超大圓角 `28px`，無毛玻璃），窄屏維持 16:9 不裁切。
- 卡片內疊一層輕薄漸變（左下 + 底部），左下放「片名 / LaswI Studio 2025 / 02:00」，右下放 44×44 音量鍵，中央為 64×64 播放鍵。

### 編號順延（三語同步）

| 區塊 | 舊 | 新 |
| --- | --- | --- |
| products | 01 | 01 — SEVEN THINGS WE BUILD |
| **film** | — | **02 — BRAND FILM** |
| stack | 02 | 03 — THE STACK |
| partners | 03 | 04 — PARTNERS |
| contact | 04 | 05 — CONTACT |

彈層 kicker 同步為 `BRAND FILM · 02:00`。

### 影片物料（沿用，未重新編碼）

| 產物 | 規格 | 大小 | 用途 |
| --- | --- | --- | --- |
| `media/promo-1080.mp4` | H.264 High@4.0，CRF 27 / maxrate 340k，AAC 64k 立體聲，`+faststart` | 4.83MB | ≥861px 區塊與彈層 |
| `media/promo-720.mp4` | H.264 Main@3.1，1280×720，CRF 29 / maxrate 125k，AAC 40k 單聲道，`+faststart` | 2.26MB | ≤860px 區塊 |
| `media/promo-poster.jpg` | 1600px 寬，取自 62s 中段畫面，q=4 | 74KB | `poster` 屬性 / reduced-motion 唯一畫面 |

### 交互與降級

| 行為 | 實作 |
| --- | --- |
| 自動播放 | `autoplay muted loop playsinline preload="metadata" poster="media/promo-poster.jpg"`；源由 `pickSrc()` 依 860px 斷點寫入（`data-src720 / data-src1080`） |
| 音量開關 | `#promoSound` 44×44，`volume_off ↔ volume_up`，`aria-pressed` + 三語 `aria-label`（`data-i18n-aria`：開啟聲音 / 开启声音 / Unmute）；首點解除靜音並續播，再點靜音 |
| 完整宣傳片 | `#promoPlay` 中央播放鍵開啟原生 `<dialog id="filmDialog">`，內嵌 `controls` 同源影片並 `currentTime = 0` 從頭播放，背景影片暫停 |
| 彈層關閉 | Esc 走 `cancel` → `closeFilm()` 統一暫停；點遮罩按 `getBoundingClientRect` 判定落在框外；`close` 再暫停一次、解鎖滾動、背景影片續播 |
| 進出視口 | `IntersectionObserver(threshold: .25)` 進視口才寫 `src` 並播放，離開視口 `pause()` |
| 分頁隱藏 | `visibilitychange` 隱藏時 `pause()` |
| reduced-motion / 省流 | 不寫 `src`、不自動播放，只顯示 poster；用戶主動點音控或播放鍵時 `loadPromo(true)` 強制載入 |
| 三語 | `film.kicker / sub / lead / name / meta / duration / play / sound` 全量補齊 zh-TW / zh-CN / en |

### v7 實測（Playwright + Edge，本地 HTTP 服務，375 / 390 / 1440）

| 檢查項 | 375×812 | 390×844 | 1440×900 |
| --- | --- | --- | --- |
| 首屏影片殘留節點 | 0 | 0 | 0 |
| 區塊源 | `promo-720.mp4` | `promo-720.mp4` | `promo-1080.mp4` |
| 自動播放 | `paused=false / muted=true / loop / playsInline`，`readyState=4`，1.8s 後 `currentTime≈1.08` | ≈1.27 | ≈1.31 |
| 卡片尺寸 | 339×191（16:9） | 354×199 | 1216×684 |
| 音量鍵位置 | 右 299 / 下 412，寬卡內（`soundInCard=true`） | 314 / 397 | 1258 / 911 |
| 解除靜音 | `muted=false`、圖示 `volume_up`、`aria-label=靜音` | 同上 | 同上 |
| 彈層 | 開啟即播放 720p、背景暫停、`body.is-film-open` 鎖滾、框 339×268 完整不出屏 | 354×276 | 1080p、1040×674 |
| Esc 關閉 | `open=false`、彈層影片 `paused=true`、背景續播、解鎖滾動 | 同上 | 同上 |
| 離開區塊 | `paused=true` | 同上 | 同上 |
| 橫向溢出 | 首屏 / 區塊 / 全頁 `scrollWidth-clientWidth = 0` | 0 | 0 |
| 三語 | 導航 `首頁\|產品\|宣傳片\|自研棧\|合作夥伴\|聯繫`、`THE FILM / 宣傳片`、`播放完整宣傳片`、`開啟聲音` | 簡體同步、`02:00` | `Home\|Products\|Film\|Stack\|Partners\|Contact`、`Unmute`、`Play the full film` |
| reduced-motion | 不寫 `src`、`paused=true`、poster 生效；點音控後 `promo-1080.mp4` 載入並 `muted=false` 播放 | — | 同左 |

截圖目錄：`video-shots-v7/`（`{375,390,1440}-hero.png`、`{視口}-film.png`、`{視口}-film-unmuted.png`、`{視口}-dialog.png`、`1440-film-reduced.png`）。

> 站上仍有 `logo.png`、`gu.png` 兩張既有素材未置入（既有 404，不影響影片與版面），補上即可覆蓋對應兜底。

## 建議圖片規格

- `gu.png`：橫向 2400×1350 以上，主體居中（四周會被羽化模糊，主體勿貼邊）。
- `logo.png`：正方形 512×512，透明背景，深淺色底皆可辨識（用於導航與 Hero）。
- 夥伴 Logo：長邊 400px 以上，透明背景 PNG 最佳。
*（内容由AI生成，仅供参考）*
*（内容由AI生成，仅供参考）*
*（内容由AI生成，仅供参考）*
