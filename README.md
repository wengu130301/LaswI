---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: 036678f504ff50ab1d8d56fc51fc50d4_0c45dcb9d69c11f1b2d8525400393706
    ReservedCode1: LbEyZvOoaefZ5Y2/dvOigI3DJoqXw2qXsDcrSjgR04EyyelNIYkRAYdIP/1ClvtulQ8+uXgMEh8530e0yYWoyET92XRaEClGWy0EmULXJTURP4WrpRRTI/mfAkfhQI8w+vDJAYxmSXzONo09aBJOo/gtUcOBpbcqXGd2yR5AuZd8z9kBjlFe+0pHUxA=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: 036678f504ff50ab1d8d56fc51fc50d4_0c45dcb9d69c11f1b2d8525400393706
    ReservedCode2: LbEyZvOoaefZ5Y2/dvOigI3DJoqXw2qXsDcrSjgR04EyyelNIYkRAYdIP/1ClvtulQ8+uXgMEh8530e0yYWoyET92XRaEClGWy0EmULXJTURP4WrpRRTI/mfAkfhQI8w+vDJAYxmSXzONo09aBJOo/gtUcOBpbcqXGd2yR5AuZd8z9kBjlFe+0pHUxA=
---

# LaswI Studio 官網

純 HTML + CSS + 原生 JavaScript，無框架、無外部 UI 庫（僅 Google Fonts + Material Symbols）。

## 檔案結構

```
laswi-studio/
├── index.html      結構與語意（文字皆掛 data-i18n）
├── style.css       MD3 色板 / 圓角 / 陰影 / 動效，含 3 檔響應式
├── script.js       三語 i18n、產品與夥伴資料渲染、磁貼翻轉、視差、Observer
├── gu.png          首屏大圖（需自行放入）
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

## 建議圖片規格

- `gu.png`：橫向 2400×1350 以上，主體居中（四周會被羽化模糊，主體勿貼邊）。
- `logo.png`：正方形 512×512，透明背景，深淺色底皆可辨識（用於導航與 Hero）。
- 夥伴 Logo：長邊 400px 以上，透明背景 PNG 最佳。
*（内容由AI生成，仅供参考）*
