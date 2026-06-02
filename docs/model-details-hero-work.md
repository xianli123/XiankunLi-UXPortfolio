# Validated Model's Details — Hero 区域工作记录

> **主记录：** [CHANGELOG.md §17](../CHANGELOG.md#17-validated-models-details--hero-开头区域2026-06-02)（含工作总结、迭代时间线、Figma 对照、代码摘录）  
> 本文档为同次工作的附录，保留更细的迭代叙述。

本文档总结在 **Validated Model's Details** 案例页（`cases/model-details.html`）顶部 Hero / 开头区域的迭代工作。设计参考：[Figma — Resume / Portfolio `3714:15254`](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=3714-15254)，右侧插图节点：[`3742:26288`](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=3742-26288)。

**说明：** 页面下方 Research、IA、Design breakdown、Compression、Benchmark、Performance、Event tracking 等区块**未在本轮修改**。

---

## 1. 目标

- 按 Figma 复刻案例页开头布局：黑色舞台 + 文案 + 右侧插图 + 白色 Meta / Design process 信息带。
- 插图去除四角纯黑背景，与黑色 Hero 舞台自然融合。
- 文字与插图位置、尺寸与画板一致；插图**不被压扁**。

---

## 2. 涉及文件

| 文件 | 变更类型 |
|------|----------|
| `css/case-openshift.css` | Model Hero 布局与插图显示（`.fc-hero--model`） |
| `assets/cases/openshift-ai/model-details/hero-illustration.png` | 替换 / 抠除透明背景 |
| `js/case-openshift-data.js` | 曾短暂改为 SVG 路径，**已回退**为 PNG |
| `js/case-openshift.js` | 曾增加 `renderHeroTagline` / SVG 渲染，**已回退**为简单 `<img>` |

可选目录（曾创建，当前页面**不引用**）：

- `assets/cases/openshift-ai/model-details/hero/`（含历史 SVG / PNG 副本）

---

## 3. 迭代过程（按时间）

### 3.1 按 Figma `3714:15254` 重写开头（后部分回退）

曾计划完整对齐 Figma 开头，包括：

- 副标题 `validated model` 加粗（`tagline.parts` + `renderHeroTagline`）
- `PROCESS_MODEL` 固定 8 项顺序与双行 Design process 标签
- 插图改为 `hero/hero-illustration.svg` + PNG 回退

**用户要求「退回到上一版」后**，上述 JS / 数据层改动已撤销，恢复为：

- 普通中英文 `tagline` 字符串
- `PROCESS_MODEL = PROCESS_RBAC.filter(...)`（去掉 Usability testing）
- 简单 `renderHero` + `<img src="hero-illustration.png">`

### 3.2 插图替换与 SVG 尝试

- 从 Figma MCP 导出多版资源（2896×1448 位图、759×514 截图、用户粘贴的 1024×693 PNG）。
- 尝试 `hero-illustration.svg`（内嵌 PNG + 110.49% 裁切）→ 用户反馈不对后**回退**。
- 最终插图资源：**`hero-illustration.png`（759×514，RGBA）**，由 `hero-ui.png` 备份恢复并处理。

### 3.3 去除插图黑色背景

对 `hero-illustration.png` 使用**从四边开始的 flood-fill**：将与边缘连通的近黑像素（RGB ≤ 28）设为透明，约 112k 像素。

- 保留插图内部的黑色（椅子、头发、笔记本等）。
- 透明区域与 Hero 舞台 `#000` 融合，消除四角黑块。

### 3.4 布局与 Figma 对齐（仅 CSS）

按 `3714:15254` 调整 Model Hero 定位与尺寸（仅 `case-openshift.css`）：

| 元素 | Figma | 实现 |
|------|-------|------|
| 黑色舞台高度 | 587px | `.fc-hero--model .fc-hero__stage` `min-height: 587` |
| 产品标签 | (160, 72), 459×56 | `.fc-hero__badge`（全局，已对齐） |
| 标题 | (160, 160), 宽 1068 | `top: 160`, `max-width: 1068` |
| 副标题 | (160, 372), 宽 1023 | `top: 372`, `max-width: 1023` |
| 插图画框 | (1161, 73), 931×514 | `.fc-hero__visual` 绝对定位 + `overflow: hidden` |
| 白色信息带 | 高 392，顶 587 | `.fc-hero__foot` `min-height: 392`, `padding-top: 64` |
| 模糊光晕 | 仅 2 个 | `.fc-hero--model .fc-hero__blob--3 { display: none }` |

### 3.5 修复插图被压扁

- **原因：** 曾使用 `object-fit: fill`，在 `110.49% × 514` 画框内强行拉伸，破坏宽高比。
- **修复：** 插图 `height: 100%`、`width: auto`，左对齐，画框裁切；**不再使用 `fill`**。

---

## 4. 当前实现（终态）

### 4.1 数据（`js/case-openshift-data.js`）

```javascript
{
  type: "hero",
  variant: "model",
  image: "assets/cases/openshift-ai/model-details/hero-illustration.png",
  illustrationWidth: 931,
  illustrationHeight: 514,
  // product, title, tagline, meta, process — 与回退前一致
}
```

### 4.2 渲染（`js/case-openshift.js`）

- 标准 `renderHero()`：三个 blob、`<figure class="fc-hero__visual"><img …></figure>`，无 SVG / 无分段 tagline。

### 4.3 样式要点（`css/case-openshift.css`）

```css
/* 插图画框 — Figma 3742:26288 */
.fc-hero--model .fc-hero__visual {
  left: calc(1161 * var(--u));
  top: calc(73 * var(--u));
  width: calc(931 * var(--u));
  height: calc(514 * var(--u));
  overflow: hidden;
}

.fc-hero--model .fc-hero__visual img {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: auto;
  object-position: left top;
}
```

缩放体系：`--u: calc(100cqw / 1920)`，与全站 OpenShift 案例 1920 画板一致。

---

## 5. 未采纳 / 已回退方案

| 方案 | 结果 |
|------|------|
| Figma 2896×1448 原始导出 + 110.49% 裁切 | 易错位、曾含水印/错误文案，已弃用 |
| 仅 759×514 Figma 截图替换 | 与用户预期插图不一致，已弃用 |
| 用户粘贴 1024×693 PNG → SVG | 短暂启用后随「上一版」回退 |
| `object-fit: fill` | 导致压扁，已改为等高比缩放 |
| 完整 Figma 开头（分段 tagline、双行 process） | JS/数据已回退，仅保留部分 CSS 布局 |

---

## 6. 验证方式

```bash
cd "Portfolio web"
python3 -m http.server 8765
```

打开：<http://127.0.0.1:8765/cases/model-details.html>，**硬刷新**（Cmd+Shift+R）后检查：

1. 标题 / 副标题左缘与 Figma 160px 对齐，换行宽度合理。  
2. 右侧插图比例正常、无压扁。  
3. 插图四角无多余黑块，与黑色背景融合。  
4. 白色 Meta / Design process 区域高度与间距正常。

---

## 7. 后续可选优化

- 若需与 Figma 完全一致的字重（如副标题中 **validated model** Medium），可在数据层加 `tagline.parts`，**仅改文案样式**，不动插图逻辑。  
- 若插图需更大或更贴右缘，可在保持 `width: auto` 前提下用**等比** `transform: scale()` 或更换更高分辨率、宽高比更接近设计稿的源图（设计稿内图宽约 `931 × 1.1049 ≈ 1029px`）。  
- Design process 双行 8 标签的精确像素排版需改 `renderProcess` + 专用 CSS（本轮未做）。

---

*文档生成：2026-06-02 · 对应当前仓库 `case-openshift.css` 与 `hero-illustration.png` 状态。*
