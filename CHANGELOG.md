# Portfolio 网站开发记录

本文档记录本项目从零搭建至今的主要改动，便于后续维护与迭代。

**项目路径：** `Portfolio web`  
**GitHub：** [xianli123/XiankunLi-UXPortfolio](https://github.com/xianli123/XiankunLi-UXPortfolio)  
**技术栈：** 静态 HTML / CSS / JavaScript（无构建工具）  
**设计参考：** [Figma — Resume / Portfolio](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=3796-25071)

### 最近工作速览（Agent 会话 · 2026-06-29）

| 章节 | 内容 |
|------|------|
| [§26](#26-案例页-v3-上线与默认路由2026-06-29) | 四案例 V3 详情页、RBAC / Model Details V3 新区块、V3 为默认入口并隐藏 V2 |
| [§25.11](#2511-案例详情页--仅展示-v22026-06-08) | （已被 §26 取代）详情页隐藏 V1、自动跳转 V2、移除顶栏版本切换 |
| [§25.10](#2510-首页-about--设计项目产品外链2026-06-08) | About「设计项目」产品名外链 + 悬停变蓝 |
| [§25.9](#259-rbac-v2--中文版排版与文案微调2026-06-08) | RBAC V2 中文版：设计目标卡高度、技术调研引言/间距、竞品调研卡片高度 |
| [§25](#25-案例页-v1v2-拆分与-openshift-ai-v2-页面2026-06-11) | 四案例 V1/V2 拆分、版本切换器、RBAC / Model Details / Deployment V2 实现 |
| §25.4 | RBAC V2 Role assignment 四挑战、图片裁剪、Hi-fi 间距与标题居中、Usability 精简 |
| [§17](#17-validated-models-details--hero-开头区域2026-06-02) | Model Details 案例页 Hero：Figma 布局、插图去黑底、防压扁 |
| [§24](#24-github-仓库初始化与推送2026-06-02) | 初始化 Git、首次提交并推送到 GitHub |

---


## 1. 项目初始搭建

### 1.1 页面结构

网站分为四个主要区块：

| 区块 | ID | 说明 |
|------|-----|------|
| Hero | — | 职位、姓名、联系方式、简介、CTA |
| About | `#about` | CV 式履历（经历、教育、技能、工具） |
| Case Studies | `#work` | 三个案例切换展示 |
| Contact | `#contact` | 联系方式卡片 |

### 1.2 核心文件

```
Portfolio web/
├── index.html          # 页面结构
├── css/styles.css      # 样式与 design tokens
├── js/
│   ├── i18n.js         # 中英文文案与 CV / 案例数据
│   └── app.js          # 语言切换、渲染、动画、案例切换
├── assets/icons/       # 联系图标 SVG
├── CHANGELOG.md        # 本文档
└── docs/               # 专题工作记录（如 model-details-hero-work.md）
```

### 1.3 主要功能

- **双语切换：** 默认中文（`zh`），支持 EN；偏好保存在 `localStorage`（key: `portfolio-lang`）
- **语言切换 UI：** Header 右侧 `中文 | toggle | EN` 开关
- **字体：** 英文 Red Hat Text，中文 Noto Sans SC
- **动画：** 滚动 reveal 动画；Hero 右侧 orbit 装饰
- **案例切换：** Tab + 左右箭头，支持 OpenShift AI、Keycloak、Infinispan

### 1.4 品牌色

```css
--color-brand: #0066cc;
--color-brand-hover: #0052a3;
--color-brand-soft: #f0f7ff;
```

案例 Tab 使用各产品品牌色（红 / 绿 / 蓝），与站点主色区分。

---

## 2. UI/UX Pro Max Skill

在 `.cursor/skills/ui-ux-pro-max/` 手动安装了 Cursor Skill，包含：

- `SKILL.md` — 设计决策与 UX 指南
- `data/` — 字体、颜色、图标等参考数据
- `scripts/` — 搜索与设计系统辅助脚本

用于辅助 portfolio 的视觉与交互设计决策。

---

## 3. CV 内容调整

### 3.1 About 区块结构

按 CV PDF 重新组织为双栏 + 底部双栏：

- **左栏：** 工作经历 + 设计项目
- **右栏：** 教育经历
- **底部：** 技能 | 工具

### 3.2 内容修复

- 恢复 **山东理工大学** 教育描述（此前误挂在 Infinispan 案例下）

---

## 4. 联系图标（Figma 对齐）

### 4.1 背景

早期曾添加 logo / icon 文件，后按需求 revert。之后重新为 Hero 与 Contact 区块添加联系方式图标。

### 4.2 Figma 来源

从 Figma 文件导出并本地化图标路径：

| 图标 | Figma 节点 | 样式 |
|------|-----------|------|
| 电话 | `3796:25076` | 黑色圆角底 + 白色听筒与声波 |
| 邮箱 | `3796:25087` | 黑色圆角底 + 白色信封 |
| LinkedIn | `4043:39240` | 黑色圆角底 + 白色 LinkedIn 标志（16×16 完整 logo） |

### 4.3 图标文件

**Contact 区块（黑色底）：**

- `assets/icons/phone.svg`
- `assets/icons/mail.svg`
- `assets/icons/linkedin.svg`

**Hero 区块（品牌蓝色底 `#0066cc`）：**

- `assets/icons/phone-blue.svg`
- `assets/icons/mail-blue.svg`
- `assets/icons/linkedin-blue.svg`

### 4.4 图标相关改动历程

1. **电话图标：** 替换错误的线框 SVG，改为 Figma 导出的听筒 + 声波样式
2. **尺寸统一：** 所有联系图标使用 `1em`，随文字大小缩放
3. **邮箱 / LinkedIn：** 从 Figma 导出并对齐设计
4. **LinkedIn 修复：**
   - 第一版误用 16×32 旧资源，且拆掉了外框 → 显示异常
   - 第二版仅保留字母路径 → 与 Figma 不符
   - 最终版使用 Figma 当前 16×16 完整白色 LinkedIn logo，居中于 24×24 黑色（或蓝色）底

### 4.5 CSS 类

```css
.contact-icon          /* 通用图标容器 */
.contact-icon--badge   /* 带底色的 badge 图标 */
```

Contact 区块图标尺寸：`1em`（随链接文字缩放）  
Hero 区块图标尺寸：`1.3em`

---

## 5. Hero 区块重设计

### 5.1 布局顺序（当前）

```
职位标题（hero-eyebrow）
    ↓
姓名（hero-title）
    ↓
联系方式行（hero-meta）← 从底部移至姓名下方
    ↓
简介（hero-tagline）
    ↓
「查看案例」按钮（hero-actions）
```

### 5.2 样式调整

| 元素 | 改动 |
|------|------|
| 职位标题 | `clamp(1.125rem → 1.5rem)`，字重 600，小于姓名 |
| 姓名 | 保持 `clamp(2.75rem → 4.5rem)` |
| 联系方式 | 字号 `clamp(1rem → 1.125rem)`，图标 1.3em，蓝色 badge |
| 按钮 | 新增 `btn-primary--wide`：min-width 11rem，padding 加宽 |

### 5.3 图标颜色

- **Hero：** 蓝色底（`#0066cc`）+ 白色符号
- **Contact：** 黑色底 + 白色符号（与 Figma 简历一致）

---

## 6. 联系信息

| 类型 | 内容 |
|------|------|
| 电话 | `15522107271` |
| 邮箱 | `xiankun_li1205@163.com` |
| LinkedIn | https://www.linkedin.com/in/xiankun-li-uxd |

---

## 7. 案例研究

三个企业级产品案例（内容在 `js/i18n.js`）：

1. **OpenShift AI** — 红色系
2. **Keycloak** — 绿色系
3. **Infinispan** — 蓝色系

---

## 8. 已知说明

- Figma MCP 导出的资源 URL 有效期约 7 天；图标已保存为本地 SVG，不依赖远程链接
- 项目当前为静态站点，直接打开 `index.html` 或通过本地 HTTP 服务访问即可
- Git 仓库已初始化并推送到 [GitHub](https://github.com/xianli123/XiankunLi-UXPortfolio)（见 §24）

---

## 9. Case Studies 四项目改版（2026-05-31）

### 来源

| # | 项目 | 来源 |
|---|------|------|
| 1 | RBAC Design in AI Project | [Figma 3691-38433](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=3691-38433) |
| 2 | Validated Model's Details Design | [Figma 3714-15250](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=3714-15250) |
| 3 | AI Model Deployment Tracking | [Figma 3714-25917](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=3714-25917) |
| 4 | Keycloak Composite Role UI | [Red Hat Blog](https://www.redhat.com/en/blog/keycloak-ui-architecture) + 本地图片 |

### 文件

- `js/i18n.js` / `js/case-openshift-data.js` 等 — 案例数据（已由独立详情页承接，见 §10–§14）
- `assets/cases/openshift-ai/` — OpenShift AI 案例资源
- `assets/cases/keycloak/` — Keycloak 博客配图

### UI

- Tab 切换 + 左右箭头 + 键盘方向键
- Figma 风格：产品 badge、Meta 信息、设计流程标签、分节内容、成果与外链
- 案例面板可滚动（max-height 75vh）

---

## 10. 案例详情页架构（补充）

首页案例 Tab 仍由 `js/i18n.js` + `js/app.js` 驱动；各案例另有独立详情页：

| 页面 | 路径（当前） | 说明 |
|------|------|------|
| RBAC | `cases/rbac-v1.html` / `cases/rbac-v2.html` | OpenShift AI — RBAC（V2 见 §25） |
| Model Details | `cases/model-details-v1.html` / `cases/model-details-v2.html` | Validated Model's Details（V2 见 §25） |
| Deployment Tracking | `cases/deployment-tracking-v1.html` / `cases/deployment-tracking-v2.html` | AI Model Deployment Tracking（V2 见 §25） |
| Keycloak | `cases/keycloak-v1.html` / `cases/keycloak-v2.html` | Composite Role — Red Hat 博客正文复现 |

> 2026-06-11 起案例页按 **V1 / V2** 拆分；首页工作卡片链至 V1。旧路径 `cases/rbac.html` 等已删除，详见 [§25](#25-案例页-v1v2-拆分与-openshift-ai-v2-页面2026-06-11)。

**渲染栈（OpenShift 系案例 · 以 V1 为例）：**

```
cases/rbac-v1.html
  → js/case-openshift-roles-mapping.js   # Define new roles 表格
  → js/case-openshift-role-reveal.js   # Role reveal（若页面引用）
  → js/case-openshift-role-assignment.js # Design the role assignment process（C1–C4）
  → js/case-openshift-usability.js     # Usability testing 全文数据
  → js/case-openshift-data.js
  → js/case-openshift-mockups.js
  → js/case-openshift.js
  → js/case-page.js
  → css/case-openshift.css

cases/model-details-v1.html
  → js/case-openshift-model-details.js  # Research / IA / Design 等区块数据
  → js/case-openshift-data.js + mockups + openshift.js + case-page.js

cases/model-details-v2.html
  → 同上 + case-openshift-model-details-v2.js + case-openshift-model-details-v2.css

cases/deployment-tracking-v1.html
  → js/case-openshift-deployment.js  # Design breakdown / Trade-offs / Extension 等
  → js/case-openshift-data.js + mockups + openshift.js + case-page.js

cases/deployment-tracking-v2.html
  → 同上 + case-openshift-deployment-v2.js + case-openshift-deployment-v2.css

cases/rbac-v2.html
  → 在 V1 栈基础上 + case-openshift-rbac-v2.js + case-openshift-rbac-v2.css
```

**Keycloak 详情页：**

```
cases/keycloak-v1.html
  → js/case-keycloak-article.js    # 博客全文（中英）
  → js/case-keycloak.js            # Red Hat Blog 版式渲染
  → css/case-keycloak.css
```

---

## 11. RBAC Research 区块复现（Figma 3875-29269）

**设计参考：** [Figma — Research](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=3875-29269)

在保持 **Design breakdown** 及之后章节不变的前提下，按设计稿重做了 **Project context → Design objectives** 整段 Research 内容（未改 Hero、未改后续 Hi-fi / Challenge 等）。

### 11.1 资源文件

| 文件 | 用途 |
|------|------|
| `assets/cases/openshift-ai/rbac/research/roles-verbs-table.png` | Tech research — Roles and verbs 表格图 |
| `assets/cases/openshift-ai/rbac/research/role-binding.png` | Role + RoleBinding YAML 示意 |
| `assets/cases/openshift-ai/rbac/research/competitor-01.png` … `competitor-05.png` | 竞品界面截图（5 张纵向排列） |

### 11.2 内容与区块顺序

1. **Project context** — Background / Challenges 双栏；Key customer insights 灰底 band + 双语录卡片  
2. **Tech research** — 引言；Roles and verbs（左文右图）；Role binding（左图右文）；Insights from tech research（5 列洞察卡）  
3. **User research** — User journey map（5 步 emoji + 渐变连线）；Painpoints（4 列橙框）  
4. **Competitor research** — 引言 → 截图墙 → 双栏 bullet（Common pain points / patterns）→ Inspiration → MVP / Post-MVP 指标卡  
5. **Design objectives** — 引言 + 3 列蓝框目标卡  

数据在 `js/case-openshift-data.js`（`rbac.blocks`）；竞品与表格图使用 Figma 导出 PNG，不再用 CSS 拼表格或 mockup 截图条。

### 11.3 样式与交互细节（迭代记录）

| 项目 | 实现 |
|------|------|
| Key customer insights | 卡片宽 `444px`、间距 `24px`、左侧文案与卡片间距 `48px` |
| Common pain points / patterns | 恢复 `list-style: disc`；右侧列 Role types 等加粗前缀 |
| Inspiration from competitor analysis | 与上方双栏区块增加 `spacingTop: 48` |
| Insights from tech research | 独立 `fc-insight-cols` → 后统一为 `fc-card-grid` flex；纵向分割线不贯穿整框、与上下边框留距（后改为贯通，见 §12） |
| 技术调研洞察（中文） | 五条中文去掉句末句号；英文保留句号 |
| Painpoints / Objectives / Stats 等 card 行 | 由 grid 改为 flex + `::after` 分割线；列内内容 **顶对齐**；分割线相对外框上下各留 `24px` padding 区域（后表格区改为贯通，见 §12） |

---

## 12. Define new roles and mapping 表格复现

**位置：** Design breakdown 第一节  

**设计参考：** 用户提供的 Figma / 截图（多行 rowspan、Actions 分层、High/Low 优先级、灰底子行）

### 12.1 实现方式

- 新增 `js/case-openshift-roles-mapping.js`：完整表格数据（`RBAC_ROLES_MAPPING_BLOCK`）  
- `js/case-openshift-data.js` 在 Design breakdown 中用占位 `null`，由 `applyRolesMappingBlock()` 在加载后注入（避免其他案例页未加载该脚本时报错）  
- `js/case-openshift.js`：`renderRolesMapping()` 专用 HTML 结构  
- `css/case-openshift.css`：`.fc-roles-map__*` 表格样式  

`cases/rbac.html` 脚本顺序：`case-openshift-roles-mapping.js` → `case-openshift-data.js` → …

### 12.2 表格结构

| 角色组 | 行数 | 说明 |
|--------|------|------|
| Workbench maintainer | 1 | Create / Read / Update / Delete 四层 Actions |
| Workbench updater | 2 | High 白底 + Low 灰底（`#f5f5f5`），角色列 `rowspan=2` |
| Workbench reader | 2 | 同上 |

- 表头 5 列，带副标题（Role、Actions、Resources 等）  
- **High**：红底圆角标签 `#fef2f2` / `#dc2626`  
- **Low**：灰底圆角标签 `#ebebeb` / `#525252`（与 High 同款 pill，非纯红字）  
- 表格外框圆角；列间纵向分割线 **贯通单元格上下**  
- 表内正文字号 **20px**（`calc(20 * var(--u))`，1920 宽时为 20px）  
- 段后结语：特定资源实例授权推迟至后续版本  

### 12.3 引言文案（英文要点）

- 先上线三个核心角色：**resource maintainer**、**resource updater**、**resource reader**  
- “The table below shows some examples of workbench new roles.”  

---

## 13. Keycloak Composite Role — Red Hat 博客复现

**设计 / 内容参考：** [How we redesigned the Keycloak UI to increase efficiency](https://www.redhat.com/en/blog/keycloak-ui-architecture)

将 `cases/keycloak.html` 从简略案例卡片改为 **Red Hat Blog 文章版式** 完整复现（非 portfolio 案例卡片布局）。

### 13.1 新增文件

| 文件 | 说明 |
|------|------|
| `js/case-keycloak-article.js` | 博客全文 blocks（引言、引用、配图、H2/H3、列表、作者） |
| `js/case-keycloak.js` | `.rh-blog` 渲染器 |
| `css/case-keycloak.css` | 博客标题、元信息、引用块、相关阅读、配图说明等 |
| `assets/cases/keycloak/*.png` / `*.gif` | 博客配图（Composite Role、旧 UI GIF、调研图等，自 Red Hat CDN 本地化） |

### 13.2 行为

- `CASE_STUDIES` 条目增加 `template: "keycloak-blog"`  
- `case-page.js` 调用 `renderKeycloakBlogCase()`；页面标题为博客 H1  
- 中英切换覆盖全文；页脚链回 Red Hat 原文  

---

## 14. 其他说明（历史轮次）

- **§11** 当时仅重做 Research，Design breakdown 其余章节尚未对齐  
- **§9** 中提到的 `js/cases.js` 已演进为 `case-openshift-data.js` + 分案例脚本，以 §10 为准  
- 图标与 mockup 仍遵循「RBAC 主体用 HTML/CSS + 设计导出图，不生成 AI 配图」的约定  

---

## 15. RBAC Design breakdown — Hi-fi / Challenges / Usability（Figma 4080 系列）

在 **§11–§12 之外**，按 [Figma Resume / Portfolio](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio) 对 RBAC 案例页 **Design breakdown** 中下列区块做了 **1:1 像素级** 还原（各区块独立实现，互不影响）。C1–C3 与 Hero、Research、Define new roles 等 **未在本节重复改动**。

### 15.1 Final hi-fi design of role assignment page

**设计节点：** [4080:40705](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=4080-40705)

| 项目 | 说明 |
|------|------|
| 数据 | `case-openshift-data.js` 中 `uiMockup` / `rbac-permissions` 改为 `type: "assignmentHifi"` |
| 渲染 | `renderAssignmentHifi()`（`js/case-openshift.js`） |
| 样式 | `.fc-assignment-hifi__*` — 深蓝底 `#000527`、光晕、标题 40px；分层虚化侧栏图 + 居中主界面 1020×768 |
| 资源 | `assets/cases/openshift-ai/rbac/hifi/`（`hifi-hero.png`、`hifi-back-*.png` 等，Figma 导出） |

标题「Final hi-fi design of role assignment page」置于画布内顶部，不再使用下方单独 caption。

### 15.2 Design the role assignment process — Challenge 4（Save 确认）

**设计节点：** [4080:41037](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=4080-41037)

| 项目 | 说明 |
|------|------|
| 数据 | `js/case-openshift-role-assignment.js` — 第四条 `visual: "saveConfirm"` |
| 渲染 | 独立 `renderRbacAssignChallenge()` 分支（与 C1 Typeahead、C2 Role table、C3 Assignment status 同模式） |
| 样式 | `.fc-rbac-assign__challenge--save`、`.fc-rbac-assign__c4-*` |
| 布局要点 | 左侧 Solution 文案区；右侧 888×627 合成图（背景 + 弹窗 + 箭头 `scaleY(-1)`）；灰底条 `top: 305px`、高 `354px` |
| 排版修正 | Solution 标题单行（copy 宽 671px、`white-space: nowrap`）；正文最大宽 **664px**（1600 − 888 − **48px** 与右图间距） |
| 资源 | `assets/cases/openshift-ai/rbac/assignment/save-dialog-*.png` |

`renderRbacAssignVisual("saveConfirm")` 返回空字符串，避免走旧通用 visual 布局。

### 15.3 Usability testing

**设计节点：** [4080:41258](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=4080-41258)

| 项目 | 说明 |
|------|------|
| 数据 | `js/case-openshift-usability.js` → `USABILITY_TESTING_DATA`（全文案中英，与稿一致） |
| 数据入口 | `case-openshift-data.js` 原 `section` 多 block（split / insightRow / statsTasks / feedback ×2 / content）合并为 `{ type: "usabilityTesting" }` |
| 渲染 | `renderUsabilityTesting()` |
| 样式 | `.fc-usability__*` — 区块间距 72px；双栏 Background / Goals（776+776）；5 列蓝框职责条；Executive summary 1087 + 任务列表 441；精选卡 1120×260；4+5 语录卡 |
| 资源 | `assets/cases/openshift-ai/rbac/usability/`（职责条 Material 图标、引号、featured 照片等） |

`cases/rbac.html` 增加脚本：`case-openshift-usability.js`（在 `case-openshift-data.js` 之前加载）。

### 15.4 Event tracking — 流程图标

**设计节点：** [4080:41612](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=4080-41612)

替换原误用图标（`hearing`、`select-all` 等），改为 Figma 稿中 6 个 Material 图标：

| 步骤 | 图标文件 |
|------|----------|
| Map out core user journeys | `event-tracking/insights.svg` |
| Define interactive events for tracking | `event-tracking/sticky-note-2.svg` |
| Deliver official event tracking documentation | `event-tracking/inventory.svg` |
| Align requirements with research team | `event-tracking/connect-without-contact.svg` |
| Validate design decisions with behavioral data | `event-tracking/content-paste-search.svg` |
| Drive iterative optimization if needed | `event-tracking/published-with-changes.svg` |

列表区图标显示尺寸 **32×32**，`#151515` 描边风格。

### 15.5 图标资源与 CSS 统一（OpenShift RBAC 相关）

**问题：** 部分 Figma 导出为 SVG 内容却使用 `.png` 扩展名，且根节点 `preserveAspectRatio="none"` + `width/height="100%"`，浏览器按 PNG 解析失败或显示过小/变形。

**处理：**

1. 批量规范化 `assets/cases/openshift-ai/icons/`、`rbac/assignment/`、`rbac/reveal/`、`rbac/usability/` 下 SVG（保留 `viewBox`，`xMidYMid meet`，实色 fill）  
2. 修正扩展名（如 `icon-quote.png` → `icon-quote.svg`）及 `case-openshift-usability.js` 路径  
3. 为各场景补充 `object-fit: contain` + 设计尺寸：`fc-process__tag`（24）、`fc-icon-list`（32）、`fc-card-grid__icon`（48）、`fc-event-process`（32）、`fc-rbac-assign__band-label`（16）等  

### 15.6 Usability — 精选引语引号位置

**设计节点：** [4080:41346](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=4080-41346) / Quote Icon `4080:41391`

| 迭代 | 说明 |
|------|------|
| 初版 | 引号 `position: absolute; left: 360px` 相对整卡，但父级 `.fc-usability__featured-quote` 有 `position: relative`，导致在右栏内水平居中错位 |
| 修正 | 引号改入文档流；右栏统一 `padding-left: 24px`（与稿 360−336 一致）；`align-items: flex-start`，引号与引用正文、署名 **左对齐** |

### 15.7 脚本与文件一览（本节新增/扩展）

```
cases/rbac.html
  → js/case-openshift-role-assignment.js   # C1–C4 文案与 assignment 资源路径
  → js/case-openshift-usability.js       # Usability testing 全文数据
  → js/case-openshift-data.js
  → …

assets/cases/openshift-ai/rbac/
  ├── assignment/          # Challenge 1–4 切图（含 save-dialog-*）
  ├── hifi/                # Final hi-fi 分层/合成图
  ├── usability/           # Usability 图标与 featured 图
  └── icons/event-tracking/  # Event tracking 六步图标
```

---

## 17. Validated Model's Details — Hero 开头区域（2026-06-02）

**页面：** `cases/model-details.html` · **数据：** `js/case-openshift-data.js` → `type: "hero"`, `variant: "model"`

**设计参考：**

- 整段开头：[Figma `3714:15254`](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=3714-15254)
- 右侧插图：[Figma `3742:26288`](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=3742-26288)

**范围：** 仅案例页顶部 Hero（黑底舞台 + 左栏文案 + 右侧插图 + 白色 Meta / Design process）。**未改** Research、IA、Design breakdown、Compression、Benchmark、Performance、Event tracking 等下文区块。

附录（同内容更细）：[docs/model-details-hero-work.md](docs/model-details-hero-work.md)

### 17.0 工作总结

| 交付项 | 说明 |
|--------|------|
| 布局对齐 Figma | 文案与插图画框按 1920 画板坐标缩放（`--u: calc(100cqw / 1920)`） |
| 插图资源 | `hero-illustration.png`（759×514 RGBA），由 `hero-ui.png` 恢复并处理 |
| 去黑底 | 四角与边缘连通纯黑改为透明，与 Hero `#000` 舞台融合 |
| 插图不变形 | 弃用 `object-fit: fill`；画框内 `height: 100%` + `width: auto` 等比缩放 |
| 回退保护 | 用户要求「上一版」后，JS 未保留分段 tagline / SVG / 双行 process 等试验性改动 |

### 17.1 按用户反馈的迭代顺序

| 次序 | 用户诉求 | 处理结果 |
|------|----------|----------|
| 1 | 按 Figma `3714:15254` 重写「开头」 | 曾改数据 + `renderHero` + 双行 process → **后整段回退**至原 Hero 数据与渲染 |
| 2 | 插图不对，按 `3742:26288` 重做 | 试过 Figma 导出 / 截图 / 用户 PNG / SVG → 多次回退 |
| 3 | 退回到上一版 | 恢复 PNG 路径、简单 `renderHero`、原 `tagline` 字符串 |
| 4 | 用用户粘贴 PNG，换成 SVG | 内嵌 PNG 的 SVG + 110.49% 裁切 → **再回退** PNG |
| 5 | 去掉插图背景黑色 | Python flood-fill（边缘连通、RGB≤28 → 透明） |
| 6 | 按设计调整文字与插图位置 | 标题/副标题 `max-width`、插图框 931×514、白底区高 392 等 |
| 7 | 右侧图被压扁 | 去掉 `object-fit: fill`，改为等高比缩放 |

### 17.2 涉及文件（终态）

| 文件 | 说明 |
|------|------|
| `css/case-openshift.css` | `.fc-hero--model` 舞台、文案、插图、光晕、白底区 |
| `assets/cases/openshift-ai/model-details/hero-illustration.png` | 当前页面使用的插图（透明背景） |
| `js/case-openshift-data.js` | `image: …/hero-illustration.png`，`illustrationWidth/Height: 931 / 514` |
| `js/case-openshift.js` | 通用 `renderHero()` + `<img>`，无 Model 专用分支 |

未引用：`assets/cases/openshift-ai/model-details/hero/` 下历史 SVG/PNG 副本。

### 17.3 Figma → CSS 对照（Model Hero）

| 元素 | Figma（px） | CSS 类 / 属性 |
|------|-------------|----------------|
| 黑色舞台 | 1920×587 | `.fc-hero--model .fc-hero__stage` `min-height: 587` |
| 产品标签 | (160, 72), 459×56 | `.fc-hero__badge` |
| 标题 | (160, 160), 宽 1068 | `.fc-hero--model .fc-hero__title` |
| 副标题 | (160, 372), 宽 1023 | `.fc-hero--model .fc-hero__tagline` |
| 插图画框 | (1161, 73), 931×514 | `.fc-hero--model .fc-hero__visual` |
| 画框内图片 | 高铺满、宽约 110.49% 裁切 | `img`: `height: 100%`, `width: auto`, 父级 `overflow: hidden` |
| 白色信息带 | y=587, h=392 | `.fc-hero--model .fc-hero__foot` `min-height: 392`, `padding-top: 64` |
| 模糊光晕 | 左 53.62/86.81、右 925/252；仅 2 个 | `.fc-hero__blob--1/2`；`.fc-hero__blob--3 { display: none }` |

### 17.4 插图去黑底（实现说明）

对 `hero-illustration.png` 从画布四边 flood-fill：与边界连通的近黑像素（RGB ≤ 28）设为 `alpha=0`（约 11 万像素），**不**影响椅子、头发、笔记本等不与外缘连通的黑色笔画。

### 17.5 终态代码摘录

**数据（`case-openshift-data.js`）：**

```javascript
{
  type: "hero",
  variant: "model",
  image: "assets/cases/openshift-ai/model-details/hero-illustration.png",
  illustrationWidth: 931,
  illustrationHeight: 514,
  // product, title, tagline, meta, process — 未改文案结构
}
```

**插图样式（`case-openshift.css`）：**

```css
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

### 17.6 已尝试但未保留

- `hero-illustration.svg`（内嵌 PNG + 画框裁切）
- Figma 2896×1448 原始位图 + `object-fit: fill`（易压扁、曾含水印）
- `tagline.parts`（**validated model** 加粗）、`PROCESS_MODEL` 固定 8 项、双行 Design process 标签

### 17.7 验证

```bash
cd "Portfolio web"
python3 -m http.server 8765
# http://127.0.0.1:8765/cases/model-details.html — 硬刷新 Cmd+Shift+R
```

检查：文案左缘 160px 对齐、插图比例正常、四角无黑块、白底 Meta 区高度正常。

### 17.8 后续可选（未做）

- 副标题 **validated model** Medium 字重（`tagline.parts`）
- Design process 双行 8 标签（与 Figma `3714:15291` 两行坐标一致）
- 插图等比放大至约 `931 × 1.1049` 显示宽度（需更高分辨率源图或 `transform: scale`）

---

## 18. RBAC 案例页 — Hero / Research / Design breakdown 排版微调（2026-06-02）

**页面：** `cases/rbac.html`  
**设计参考：** [Figma Resume / Portfolio](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio)（Hero `3691:38439`、Design process `3691:38474`、Role assignment `3875:28899` / `4080:40889` 系列）

**范围：** 本节为 **§15 实现完成后的视觉对齐迭代**，涉及 Hero、Research、Role reveal、Role assignment 等区块的间距与标签样式；C4 Save 区块结构、Usability、Define new roles 表格等 **未改结构**。

### 18.1 RBAC Hero 插图

**设计节点：** [3691:38443](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=3691-38443)

| 项目 | 说明 |
|------|------|
| 问题 | 原 CSS mockup 与 Figma 插图不一致；外链 PNG 在 `<img>` 加载的 SVG 内无法显示 |
| 数据 | `js/case-openshift-data.js` — 移除 `mockup: "rbac-hero"`，改为 `image` + `illustrationWidth/Height`（446×442） |
| 资源 | `assets/cases/openshift-ai/rbac/hero/hero-illustration.svg`（内嵌 base64 PNG）、`hero-illustration.png` |
| 样式 | `.fc-hero--rbac` — 插图 `object-fit: cover`；标题 / tagline `max-width: 1080px`；光晕与 visual 定位对齐稿 |

### 18.2 Design process 区块

**设计节点：** [3691:38474](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=3691-38474)

| 项目 | 说明 |
|------|------|
| 图标 | 修正标签 `height: 32px` + 四边 `padding` 导致图标被压扁；改为水平 `padding: 0 12px` + `.fc-process__tag-icon` 24×24 容器 |
| 布局 | 数据增加 `layout: "rbac-stagger"`；`renderProcess()` 输出三行错位（4 + 3+2） |
| 图标资源 | 9 个流程图标自 Figma 重新导出至 `assets/cases/openshift-ai/icons/`（替换误用的 Material 通用图标） |
| 间距 | 标题与标签 **32px**；标签间距 **16px**；行间距 **16px** |

### 18.3 Painpoints

| 项目 | 说明 |
|------|------|
| 样式 | `.fc-pain .fc-section__subtitle` 的 `margin-bottom`：**52px → 24px** |

### 18.4 MVP / Post-MVP metrics（Competitor research）

| 项目 | 说明 |
|------|------|
| Inspiration → MVP | `.fc-metrics { margin-top: 24px }`，并取消 intro 与 metrics 之间的重复间距 |
| MVP → Post-MVP | `.fc-metrics + .fc-metrics { margin-top: 24px }`（原 48px） |

### 18.5 Final decision / Final hi-fi design

| 项目 | 说明 |
|------|------|
| 字重 | `.fc-role-reveal__section-label`、`.fc-role-reveal__decision-title` → **font-weight: 600**（SemiBold） |

### 18.6 Challenge and solution 标签样式

统一 pill 标签尺寸（RBAC role assignment + Model Details 设计区块）：

| 选择器 | 高度 | 字号 |
|--------|------|------|
| `.fc-rbac-assign__band-label` | 40px | 20px |
| `.fc-rbac-assign__tag`（Challenge / Solution） | 40px | 20px |
| `.fc-model-challenge__badge` / `__badge-text` | 40px | 20px |
| `.fc-model-benchmark__tag` | 40px | 20px |

Challenge / Solution 小标签宽度约 **117px / 103px**（与稿比例一致）。

### 18.7 Design the role assignment process — 灰色条与 label 间距

**设计节点：** [3875:28899](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=3875-28899)

**需求：** 各组 **「Challenge and solution」** 标签与其上方 **全宽灰色条**（`#f8f9fb`，`.fc-rbac-assign__c*-grid::before` 或 C2 explorations 条）之间纵向 **48px**。

**问题：** 早期用 `article { margin-top: 48px }` 或 flex `gap` 时，C1/C3 的 grid 高度小于灰色 `::before` 底边（灰条溢出 stage），导致 **第 2、4 组** label 与灰条视觉间距不一致；第 2 组（Role table）、第 4 组（Save）尤为明显。

**最终方案（`css/case-openshift.css`）：**

| 规则 | 说明 |
|------|------|
| `.fc-rbac-assign__intro + … > .fc-rbac-assign__band-label` | 第一组：intro 与 label 之间 **margin-top: 48px** |
| `.fc-rbac-assign__c1-stage` / `c2-stage` / `c3-stage` | **margin-bottom: 48px**（灰条底到下一组 label） |
| `.fc-rbac-assign__challenge + .fc-rbac-assign__challenge` | **margin-top: 0**（避免与 stage 下边距叠加） |
| Grid 固定高度（与灰条底对齐） | C1 **870px**（236+634）、C2 **866px**（explorations 320+546）、C3 **773px**（235+538） |

**组间 Challenge 面板间距：** `.fc-rbac-assign__challenge + .fc-rbac-assign__challenge` 与 `.fc-model-challenge__panels` 组内 gap 均为 **48px**（与 §15.2 后迭代一致）。

### 18.8 涉及文件

```
css/case-openshift.css          # 本节主要样式改动
js/case-openshift-data.js       # RBAC Hero 图、process layout
js/case-openshift.js            # renderProcessTag / rbac-stagger 布局
assets/cases/openshift-ai/
  ├── rbac/hero/                # Hero 插图 SVG + PNG
  └── icons/                    # Design process 九枚图标（Figma 导出）
```

### 18.9 验证

```bash
cd "Portfolio web"
python3 -m http.server 8765
# http://127.0.0.1:8765/cases/rbac.html — 硬刷新 Cmd+Shift+R
# 重点检查：C1 灰条底 → C2 label、C3 灰条底 → C4 label 均为 48px
```

---

## 19. AI Model Deployment Tracking — Design breakdown / Trade-offs / Extension（2026-06-02）

**页面：** `cases/deployment-tracking.html`  
**设计参考：** [Figma 3714-25917](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=3714-25917) 及子节点 `3875:27xxx`  
**核心脚本：** `js/case-openshift-deployment.js` · **样式：** `css/case-openshift.css`（`.fc-deploy-bd-*` / `.fc-deploy-tradeoff*` / `.fc-deploy-extension*`）

按 Figma 逐段重做 **Design breakdown → Trade-offs → Reusable extension**；复杂 UI 以 **Figma 导出 + 2× 锐化 PNG 嵌入 SVG** 呈现（与 RBAC Hi-fi、Status modal variants 同策略），文案保留 HTML 以支持中英文。

### 19.1 涉及文件

| 类型 | 路径 |
|------|------|
| 数据与渲染 | `js/case-openshift-deployment.js` |
| 样式 | `css/case-openshift.css` |
| 资源目录 | `assets/cases/openshift-ai/deployment/breakdown/`、`tradeoffs/`、`ux/` |

### 19.2 Design breakdown

| 区块 | Figma 节点 | 实现要点 |
|------|------------|----------|
| **Refined definition of status labels** | `3875:27049` | HTML/CSS 四卡（376×279）；SVG 图标 `breakdown/icons/label-*.svg` |
| **Status modal** | `3875:27085` | 左 walkthrough SVG + 右 1–5 标注 + phase 图；底部 variants **全宽 1920** |
| Phase diagram | `3875:27166` | `breakdown/phase-diagram.svg`（644×117）；与 note #5 间距 **16px** |
| Status modal variants | `3875:27090` | `breakdown/status-modal-variants.svg`（1920×655）；负边距全 bleed |
| **Events log presentation** | `3875:27190` | 左文右图；`events-log-modal.svg` **保留阴影边框**（664×689） |
| **UI presentation** | `3875:27219` | 居中标题 **UI Presentation**（48px Bold）；`ui-presentation.svg` **全宽 1920×1080** |

**渲染函数：** `renderLabelsDefinition()`、`renderStatusModal()`、`renderEventsLog()`、`renderUiPresentation()`。

### 19.3 Trade-offs in design iteration

三节均采用 **panel 卡片**（1600×637、背景 `#F9F9FB`、圆角 16px、列间距 64px）；图片均为 SVG。

| 节 | Figma | 布局 | SVG 资源 |
|----|-------|------|----------|
| Why no estimated time is shown | `3875:27598` | 左图右文，`padding-right: 40px` | `tradeoffs/estimated-time-visual.svg`（748×637） |
| Why not combine progress and event log | `3875:27631` | 左文右图，`padding-left: 40px` | `tradeoffs/combined-view-visual.svg` |
| Why Stop / Restart actions are not provided | `3875:27666` | 左图右文；无 intro | `tradeoffs/stop-restart-visual.svg` |

**结构与修复：**

- 数据字段 `variant: "panel"`、`imageSide`、`imageWidth` / `imageHeight`
- CSS：`.fc-deploy-tradeoff__inner--panel`、`.fc-deploy-tradeoff__inner--reverse`
- Pros / Constraints / Decision：**CSS Grid** 对齐图标、标签与正文
- `field()` 增加对 `row.text` 的读取（修复 Trade-offs 正文空白）
- 移除旧 PNG slice（`estimated-time.png`、`extension.png` 等）

### 19.4 Reusable extension of design components

**设计参考：** [3875:27805](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=3875-27805)

替换原整页 `ux/extension.png`，改为 **导语 + 两张示例卡片**（卡片间距 **32px**）。

| 示例 | 内容 | SVG |
|------|------|-----|
| Starting pipeline server | 左弹窗 + 右说明 + 01/02/03 步骤卡 | `ux/extension-pipeline-modal.svg`（588×674） |
| Workbench status | 左说明 + 虚线框 inline 图 + 右弹窗 | `ux/extension-workbench-inline.svg`（603×142）、`ux/extension-workbench-modal.svg`（588×604） |

**渲染：** `extension.examples[]` + `renderExtensionExamples()`；第二段含 *Assign pod*（`<em>`）与 **Workbench**（`<strong>`）。

### 19.5 SVG 生成约定

- 自 Figma MCP `get_screenshot` 导出 PNG → Python 2× LANCZOS + UnsharpMask → base64 嵌入 SVG
- `viewBox` 与 Figma 节点一致；弹窗类资源保留 export 阴影 bleed，不裁剪
- 显示宽度通过 `calc(N * var(--u))` 缩放（`--u: calc(100cqw / 1920)`）

### 19.6 验证

```bash
cd "Portfolio web"
python3 -m http.server 8765
# http://127.0.0.1:8765/cases/deployment-tracking.html
# 切换中/英文，检查 Design breakdown、Trade-offs、Extension 三块
```

---

## 20. Hero 能力轨道、语言默认与切换器改版（2026-06-03）

本节汇总首页 Hero 右侧动效、语言策略与 Header 语言切换器的一轮迭代（Capabilities 列表样式**未改**，仍为 §3 的 `cv-list`）。

### 20.1 Hero 能力关键词轨道（`hero-orbit`）

**位置：** Hero 右侧原同心圆环装饰区（`#hero-orbit`），**非** About 区 Capabilities 列表。

| 项 | 说明 |
|----|------|
| 数据来源 | `PORTFOLIO_I18N[lang].skills`，由 `renderHeroOrbit()` 注入（`js/app.js`） |
| 不显示在轨道上 | `Visual design` / `视觉设计`；`UX design` / `交互设计`（后者放中心圆） |
| 中心圆 | `.orbit-core` + `.orbit-core__label`，显示 UX design / 交互设计；`inset: 38%` |
| 布局 | 外/中/内三层环半径（`--ring` × `--orbit-size`）；角度错落，避免挤在中心 |
| 文字朝向 | `.hero-orbit__item-pos` 使用 `rotate(-angle)`，配合 `orbit-spin-reverse`，标签始终正向 |
| 旋转速度 | 轨道 `200s` 一圈；背景三环 `54s / 40s / 27s`；Hover 暂停旋转 |
| 尺寸 | 容器约 `min(440px, 86vw)`；移动端 `min(340px, 92vw)` |

**圆球样式（三类）：**

| 类型 | 技能（EN / ZH） | CSS |
|------|-----------------|-----|
| 实心品牌蓝 | Competitor research、User research、Usability testing / 竞品分析、用户研究、可用性测试 | `.hero-orbit__bubble--accent` |
| 浅蓝底 | Technology analysis、Project management、Vibe coding / 技术分析、设计项目管理、Vibe coding | `.hero-orbit__bubble--soft`（已去掉毛玻璃，无 `backdrop-filter`） |
| 白底 | 其余（如 Collaboration、Continuous learning） | 默认 `.hero-orbit__bubble` |

**单独尺寸微调（`renderHeroOrbit`）：**

- Technology analysis / 技术分析：`layout.size - 20`
- Project management / 设计项目管理：`+10`
- Usability testing / 可用性测试：`+10`

**主要文件：** `index.html`（`#hero-orbit`）、`css/styles.css`（`.hero-orbit__*`）、`js/app.js`（`HERO_ORBIT_LAYOUT`、`HERO_ORBIT_SKIP`、`HERO_ORBIT_ACCENT_LABELS`、`HERO_ORBIT_SOFT_LABELS`）。

### 20.2 首页 Keycloak 案例卡片

- `js/case-index.js`：`keycloak-composite-role` 增加 `hidden: true`
- `js/app.js`：`renderWorkCards()` 过滤 `item.hidden`
- 卡片暂不在 `#work` 展示；`cases/keycloak.html` 仍可直接访问

（曾尝试外链 Red Hat 博客 CTA 与标题改为 UX Redesign，已按需求回退。）

### 20.3 默认语言改为英文

| 改动 | 文件 |
|------|------|
| 无 `localStorage` 时默认 `en` | `js/app.js`、`js/case-page.js` |
| 初始 `<html lang="en">` | `index.html`、各 `cases/*.html` |
| 切换器初始 `is-en`、`aria-checked="true"` | 同上 |

用户若本地仍缓存 `portfolio-lang: zh`，会保持中文；可清除该 key 后刷新以看到英文默认。

### 20.4 语言切换器 UI（胶囊一体按钮）

参考外部 Tailwind 胶囊开关，改为**单按钮**内嵌：`EN` · 滑轨 · `中文`（非左右分离的旧结构）。

| 特性 | 实现 |
|------|------|
| 容器 | `.lang-switch__control`：白底半透明、`backdrop-filter`、圆角、阴影 |
| 滑轨 | `2rem × 1rem` 灰底圆角条 |
| 滑块 | 蓝渐变（`#0080ff` → `--color-brand`），随语言左右滑动 |
| 当前语言高亮 | `--color-brand` 文字加粗 |
| 英文激活 | `.lang-switch.is-en`，滑块在左 |
| 中文激活 | 无 `is-en`，滑块 `translateX(1rem)` 在右 |
| 尺寸 | 标签 `0.875rem`，`padding: 0.5rem 1rem`，便于识别 |

**文件：** `css/styles.css`（`.lang-switch*`）、`index.html` 与全部案例页 header。

### 20.5 中文 Hero 联系方式单行

- `html:lang(zh) .hero-meta`：`flex-wrap: nowrap`、`white-space: nowrap`，略缩小字号与间距
- 避免电话 / 邮箱 / LinkedIn 在中文模式下折到第二行

### 20.6 验证建议

```bash
cd "Portfolio web"
python3 -m http.server 8765
# http://127.0.0.1:8765/
# 1. 默认英文内容与 EN 高亮切换器
# 2. Hero 右侧轨道圆球旋转、Hover 放大与暂停
# 3. 切中文：联系方式一行、中心「交互设计」、轨道中文标签
# 4. Work 区仅三张 OpenShift AI 卡片（Keycloak 隐藏）
```

---

## 21. Validated Model's Details — Research / Design / 文案与间距（2026-06-03）

**页面：** `cases/model-details.html`  
**设计参考：** Figma `3714:15289`（Design process）、`3714:15250`（Research）、Design / Challenge / Compression / Benchmark / Performance 等区块节点  

**范围：** 在 §17 Hero 之后，补齐 **Research → Event tracking** 段的布局、资源、中英文文案与区块间距；**未改** Deployment / RBAC 等其他案例页。

### 21.1 涉及文件

| 类型 | 路径 |
|------|------|
| 数据 | `js/case-openshift-model-details.js`、`js/case-openshift-data.js` |
| 渲染 | `js/case-openshift.js`（`renderModelResearch`、`renderProcess` model-stagger） |
| 样式 | `css/case-openshift.css` |
| 资源 | `assets/cases/openshift-ai/model-details/design/challenge-table-map.svg`、`challenge-card-sort-chart.svg` |

### 21.2 Hero — Design process

| 项 | 说明 |
|----|------|
| 布局 | `process.layout: "model-stagger"`：第一行 4 个标签、第二行 4 个标签内联排列 |
| Event tracking | 去掉误用的 `space-between`，避免第二行末项被推到最右侧 |
| 数据 | `js/case-openshift-data.js` Hero `process` 字段 |

### 21.3 Research 区块间距

| 标题 | 与上方内容间距 |
|------|----------------|
| **User research** | `.fc-model-research__gap` → `margin-top: calc(128 * var(--u))`（原 72px） |
| **Design objectives** | `.fc-model-research__gap--objectives` → 同上 128px |

### 21.4 样式微调

| 项 | 实现 |
|----|------|
| Design objectives 图标 | `.fc-model-objectives__card img` 由 48px 改为 **32px** |
| Challenge / Solution 标签 | `.fc-model-challenge__tag`、`.fc-model-benchmark__tag` 高度 **32px** |

### 21.5 Challenge 设计研究图

| 资源 | 来源 | 尺寸 |
|------|------|------|
| `challenge-table-map.svg` | 用户 `ModelDetailsTable.svg` | 994×464 |
| `challenge-card-sort-chart.svg` | 用户 `ResearchResults.svg` | 824×353 |

### 21.6 中英文文案（`case-openshift-model-details.js` / `case-openshift-data.js`）

**仅中文（`zh`），英文 `en` 未改：**

| 位置 | 调整 |
|------|------|
| IA 区块标题 | `页面头部与信息架构` → **页面顶部与信息架构** |
| Challenge badge | 中文与英文一致：**Challenge and solution**（不翻译） |
| Overview 最终设计 | `Overview 标签最终设计` → **Overview 页面最终设计** |
| Performance insights 最终设计 | `Performance insights 标签最终设计` → **Performance insights 页面最终设计** |
| 渐进式披露 | `按需下钻` → **按需查看数据** |
| Benchmark 弹窗说明 | `四类` → **四组**；补充「Restore default columns」**的功能以便重置视图** |
| Compression 截图标注 | 5 条说明全文翻译；紫色 callout **Advanced metrics across compressions** 保持英文 |
| Event tracking（Model Details） | HEART 框架补全 **(Happiness、Engagement、Adoption、Retention、Task Success)** |

**中英文同步：**

| 位置 | 调整 |
|------|------|
| Compression level comparison 卡片正文 | 去掉 **(FP8 vs. INT4)** / **（FP8 vs INT4）** |
| 同上（英文） | `cost savings` 句末补 **句号** |

### 21.7 Compression 标注中文摘要

专设区域对比、展开/折叠段落、折线图（延迟 vs RPS）、柱状图（benchmark 精度）、图例开关——见 `compression.notes[].zh`；UI callout 文案仍为英文。

### 21.8 验证

```bash
cd "Portfolio web"
python3 -m http.server 8765
# http://127.0.0.1:8765/cases/model-details.html
# 切换中/英文：Research 128px 间距、Design objectives 图标、Challenge SVG、Compression 标注与文案
```

---

## 22. RBAC 案例页 — Usability 排版与中文文案（2026-06-03）

**页面：** `cases/rbac.html`、首页 `#work` RBAC 卡片  
**范围：** §18 完成后的 **Usability testing 区块间距/卡片高度** 与 **RBAC 全文案中文迭代**（英文默认不变，除非注明）。

### 22.1 Usability — 标题与正文间距

| 区块 | 选择器 | 改动 |
|------|--------|------|
| 受试者建议 | `.fc-usability__recommend .fc-usability__h3` | `margin-bottom` **68px → 24px** |
| 下一步 | `.fc-usability__next .fc-usability__h3` | `margin-bottom` **54px → 24px** |

与 §18.3 Painpoints 等同为 **24px** 标题下间距。

### 22.2 Usability — 受试者建议卡片等高（中英文一致）

**问题：** `case-page.css` 中 `html:lang(zh)` 对 `.fc-usability__quote-grid` / `.fc-usability__quote-card` 使用 `align-items: flex-start`、`height: auto`、`flex: 0 1 auto`，中文卡片随文案收缩，与英文版同行等高布局不一致。

**方案（`css/case-openshift.css`）：**

| 规则 | 说明 |
|------|------|
| `.fc-usability__quote-grid--5` | `align-items: stretch` |
| `.fc-usability__quote-grid--5 .fc-usability__quote-card` | `min-height: calc(365 * var(--u))`（@1920 ≈ 365px） |
| `html:lang(zh) … .fc-usability__quote-grid--5` | 覆盖中文 shrink 规则，恢复 `stretch` + 引用区 `flex: 1`，作者信息贴底 |

5 列灰底语录卡在中英文切换时保持相同高度； Praise 区 4 列卡未改。

### 22.3 Usability — 职责条图标

| 选择器 | 改动 |
|--------|------|
| `.fc-usability__role-icon` | **48×48 → 32×32**（`calc(32 * var(--u))`） |

### 22.4 中文文案更新（RBAC 相关）

| 文件 | 改动摘要 |
|------|----------|
| `js/case-openshift-data.js` | Hero 标题 **「AI 项目中的 RBAC 权限设计」**；Tech research 引言缩短；Research 区 **「客服」→「客户支持团队」**、**「工程团队」→「开发团队」**；Event tracking 问题 **「分散变更」→「授权变更」** |
| `js/case-index.js` | 首页 RBAC 卡片标题同上 |
| `js/case-openshift-usability.js` | Background / Goals / My role 等中文润色；**「参与者建议」→「受试者建议」**；Next step 中文 **「开发团队」** |
| `js/case-openshift-role-assignment.js` | C1–C4 中文：**「先前规格」→「先前定义」**；Assignment status 相关表述；Unassigning 脚注等 |
| `js/case-openshift-roles-mapping.js` | Workbench 描述 **「项目中特定名称的Workbench」** |
| `js/case-openshift-role-reveal.js` | 抽屉方案中文表述调整 |
| `js/i18n.js` | CV 技能行 **「工程团队」→「开发团队」**（若适用） |

### 22.5 中文版保留英文 UI 文案

以下字段在 `lang=zh` 时仍显示英文（与稿 / 产品术语一致）：

| 位置 | 保留英文 |
|------|----------|
| Role assignment C3 | Unassigning 脚注：`Role can only be re-assigned in OpenShift` |
| Usability 精选引语 / 受试者建议 | 角色 `Provincial gov team lead` |
| Role assignment | 列名 / 标签 `Assignment status`、`Unassigning` 等 |

### 22.6 涉及文件

```
css/case-openshift.css              # §22.1–22.3 间距、卡片等高、职责条图标
css/case-page.css                   # （未改）中文 card shrink 基线规则；§22.2 在 openshift.css 局部覆盖
js/case-openshift-data.js           # Hero、Tech research、Research、Event tracking 文案
js/case-index.js                    # 首页 RBAC 标题
js/case-openshift-usability.js      # Usability 全文案 + 受试者建议标题
js/case-openshift-role-assignment.js
js/case-openshift-roles-mapping.js
js/case-openshift-role-reveal.js
js/i18n.js                          # 开发团队用词（若已改）
```

### 22.7 验证

```bash
cd "Portfolio web"
python3 -m http.server 8765
# http://127.0.0.1:8765/cases/rbac.html — 硬刷新 Cmd+Shift+R
# 1. Usability：受试者建议 / 下一步 标题下间距 24px
# 2. 切换中英文：5 张受试者建议卡等高、作者信息贴底
# 3. 职责条图标 32px；中文标题与 Research / Assignment 文案
# 4. 首页 #work RBAC 卡片中文标题
```

---

## 23. AI Model Deployment Tracking — Hero / Research 区段对齐与中文排版（2026-06-02）

**页面：** `cases/deployment-tracking.html`  
**设计参考：** Hero [Figma 4102-41759](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=4102-41759) · Design process [3714-25956](https://www.figma.com/design/AfUwiYGdcEeyKOVrOoQ31o/Resume---Portfolio?node-id=3714-25956) · Solutions / Status labels 等子节点 `3875:26xxx`

在 §19 基础上，继续对齐 **Hero、Design process、Project context、Design objectives、Design solutions、Status labels** 等区段；并针对中文文案长度做局部排版修正。

### 23.1 Hero 文案与布局

| 项 | 改动 |
|----|------|
| 结构 | Deployment 专用 `.fc-hero__copy` flex 列（badge + title + tagline），`left: 160`、`top: 72`、`width: 1026` |
| 标题 | 由 `titleLines` 改为单字符串 `"AI Model Deployment Tracking"`，自然换行、左对齐 |
| 渲染 | `js/case-openshift.js` — `renderHero()` 在 `variant === "deployment"` 时输出 copy 块 |
| 中文 tagline | `case-page.css`：`html:lang(zh) .fc-hero--deployment .fc-hero__tagline` 限宽 `780px`，避免长句盖住右侧插图（visual 自 `977px` 起，copy z-index 高于 visual） |

### 23.2 Design process — `deploy-stagger`

| 项 | 改动 |
|----|------|
| 布局 | `process.layout: "deploy-stagger"` — 第一行 3 tag，第二行 3+2 分组，组间距 **16px** |
| 脚本 | `js/case-openshift.js` — `renderProcess()` 新增 `fc-process__tags--deploy` 分支 |
| 样式 | `css/case-openshift.css` — `.fc-process__tags--deploy`、`.fc-process__row--split { gap: 16px }` |
| 图标 | 自 Figma 重导出并规范为 24×24 SVG（如 `content-paste-search.svg`、`content-paste-go.svg`、`dynamic-feed.svg` 等） |

### 23.3 Project context 与 Design objectives

| 区块 | 改动 |
|------|------|
| **Project context** | `.fc-deploy-context-card h3` 字号 **32px → 24px** |
| **Design objectives（zh）** | `case-page.css`：卡片 `stretch` 等高；缩小 padding / 图标（40px）/ 正文（22px）；移除固定 min-height |

### 23.4 Design solutions 插图

自 Figma 以 **2× LANCZOS + UnsharpMask** 重导出，嵌入 `assets/cases/openshift-ai/deployment/solutions/`：

| 资源 | 用途 |
|------|------|
| `status-before.svg` / `status-after.svg` / `status-arrow.svg` | 状态标签前后对比 |
| `timeline-logs.svg` / `timeline-stepper.svg` / `timeline-arrow.svg` | 时间线方案 |
| `event-log.svg` | 事件日志方案 |

### 23.5 Design breakdown — Status labels

| 项 | 改动 |
|----|------|
| 产品 UI 文案 | Pill 与 help 始终英文：`t(card.label, "en")`、`t(part, "en")`（如 *Creating revision*、*Failed to create revision*） |
| 垂直对齐 | 移除 progress 卡 `justify-content: center`；行 `align-items: flex-start` |
| Header 高度 | `.fc-deploy-bd-labels__header` 与 `__header--solo` 统一 `min-height: 79.61px`，正文起始线对齐 |
| 中文卡片 | `case-page.css`：`__card` / `__card-inner` 在 zh 下 `height: auto`，随中文正文伸缩 |

**Status modal 主视觉：** 替换 `breakdown/status-modal-visual.svg` 为用户提供的矢量稿 `StatusModal.svg`（558×573）。

### 23.6 涉及文件

```
css/case-openshift.css          # Hero copy、process deploy-stagger、context/objectives/labels
css/case-page.css               # zh：tagline 限宽、objectives 等高、labels 卡片高度
js/case-openshift.js            # renderHero(deployment)、renderProcess(deploy-stagger)
js/case-openshift-data.js       # Hero title 单字符串、process layout
js/case-openshift-deployment.js # labels 英文 pill/help、context / objectives 渲染
assets/cases/openshift-ai/deployment/
  ├── solutions/                # §23.4 五组方案 SVG
  ├── breakdown/status-modal-visual.svg
  └── icons/                    # Design process 步骤图标
```

### 23.7 验证

```bash
cd "Portfolio web"
python3 -m http.server 8765
# http://127.0.0.1:8765/cases/deployment-tracking.html
# 切换中/英文，重点检查：
#   Hero 标题左对齐、中文 tagline 不遮挡右侧插图
#   Design process 两行 stagger、Project context 标题 24px
#   Design objectives 中文等高、Solutions 插图清晰
#   Status labels 英文 pill、四卡正文顶对齐、Status modal 矢量图
```

---

## 24. GitHub 仓库初始化与推送（2026-06-02）

**远程仓库：** [https://github.com/xianli123/XiankunLi-UXPortfolio](https://github.com/xianli123/XiankunLi-UXPortfolio)

本地项目原先未纳入版本控制；按用户要求初始化 Git 并推送完整站点代码。

### 24.1 操作摘要

| 步骤 | 说明 |
|------|------|
| 新建 `.gitignore` | 忽略 `.DS_Store`、`.env*`、`.cursor/`、`.agent-transcripts/` |
| `git init` | 在 `Portfolio web/` 初始化仓库 |
| 首次提交 | `48d7186` — 364 个文件，约 126MB（含案例 PNG/SVG 资源） |
| 远程 | `origin` → `https://github.com/xianli123/XiankunLi-UXPortfolio.git` |
| 推送 | `main` 分支已跟踪 `origin/main`，与远程同步 |

### 24.2 提交说明

```
Initial commit: Xiankun Li UX portfolio site.

Static HTML/CSS/JS portfolio with OpenShift AI case studies (RBAC, Model Details,
Deployment Tracking), Keycloak article page, bilingual i18n, and Figma-aligned layouts.
```

### 24.3 仓库内容概览

```
index.html + cases/*-v1.html       # 首页与案例详情页（V1 入口；V2 见 §25）
css/                               # styles、case-openshift、case-page、*-v2.css 等
js/                                # i18n、case-openshift*、case-naming、case-page 等
assets/cases/                      # OpenShift / Keycloak 案例资源（含 *-v2/）
docs/model-details-hero-work.md    # §17 Hero 工作附录
CHANGELOG.md                       # 本文档
scripts/                           # Figma 导出辅助脚本
```

### 24.4 本地协作命令

```bash
cd "Portfolio web"
git status
git pull origin main
git push origin main
python3 -m http.server 8765   # 本地预览
```

若远程已有 README 等无关历史，可使用：

```bash
git pull origin main --rebase --allow-unrelated-histories
git push -u origin main
```

### 24.5 后续可选（未做）

- 开启 GitHub Pages（Settings → Pages → `main` / root）
- 添加 `README.md` 项目简介与预览链接
- 大体积 PNG 是否迁移 Git LFS（当前直接入库）

---

## 25. 案例页 V1/V2 拆分与 OpenShift AI V2 页面（2026-06-11）

在 §15–§23 各 V1 案例页稳定后，将四个 OpenShift / Keycloak 详情页拆为 **V1 / V2 双版本**，首页工作卡片仍链至 V1；详情页顶栏新增 **V1 | V2** 切换。V2 在克隆 V1 数据基础上，通过 `*-v2.js` 补丁与独立 CSS 增量实现新设计稿区块。

**页面入口（旧路径已移除）：**

| 案例 | V1 | V2 |
|------|----|----|
| RBAC | `cases/rbac-v1.html` | `cases/rbac-v2.html` |
| Model Details | `cases/model-details-v1.html` | `cases/model-details-v2.html` |
| Deployment Tracking | `cases/deployment-tracking-v1.html` | `cases/deployment-tracking-v2.html` |
| Keycloak | `cases/keycloak-v1.html` | `cases/keycloak-v2.html` |

已删除：`cases/rbac.html`、`cases/model-details.html`、`cases/deployment-tracking.html`、`cases/keycloak.html`。

### 25.1 版本命名与导航基础设施

| 文件 | 改动 |
|------|------|
| `js/case-naming.js`（新） | `CASE_DETAIL_NAMING`：`{slug}-v{N}` id、`cases/{slug}-v{N}.html` href、bilingual `codeName`；`getCaseDetailVersionPair()` 解析 V1/V2 对 |
| `js/case-openshift-data.js` | 数据键改为 `rbac-v1` 等；`cloneOpenShiftCaseVersion()` 深拷贝生成 V2 |
| `js/case-index.js` | 工作卡片 href 指向 V1；补充 `version` / `codeName` 字段 |
| `js/case-page.js` | `mountVersionSwitch()` — 粘性顶栏 V1/V2 药丸切换；prev/next 导航按 V1 id 计算邻接 |
| `css/case-page.css` | `.case-version-switch` 样式 |
| `js/i18n.js` | Keycloak：`keycloak-composite-role-v1` + 运行时克隆 `v2` |

### 25.2 RBAC V2 — Research / Design breakdown 新区块

**脚本：** `js/case-openshift-rbac-v2.js` · **样式：** `css/case-openshift-rbac-v2.css`  
**入口：** `cases/rbac-v2.html`（额外加载上述两文件）

| 区块 | 渲染器 / 补丁 | 资源目录（示例） |
|------|----------------|------------------|
| Project context | `renderRbacProjectContextV2` | `rbac/project-context-v2/` |
| Design objectives | `renderRbacObjectivesV2`（移至 Tech research **之前**） | `rbac/objectives-v2/` |
| Tech research | `renderRbacTechResearchV2` | `rbac/research-v2/` |
| Competitor research | `renderRbacCompetitorResearchV2` | `rbac/competitor-v2/` |
| Inspiration | `renderRbacInspirationV2`（替换 V1 metrics） | `rbac/inspiration-v2/` |
| Role reveal | `renderRbacRoleRevealV2` | `rbac/reveal-v2/` |
| Roles mapping | `applyRbacV2RolesMappingSummaries`（去括号摘要、去 footer） | — |
| Role assignment ×4 | `applyRbacV2RoleAssignment` + `case-openshift.js` 新 visual 分支 | `rbac/assignment-v2/` |
| Usability | `applyRbacV2Usability`（见 §25.4） | — |

**`js/case-openshift.js` 新增 block 类型：** `rbacProjectContextV2`、`rbacTechResearchV2`、`rbacCompetitorResearchV2`、`rbacObjectivesV2`、`rbacInspirationV2`、`rbacRoleRevealV2`。

**V2 仍沿用 V1：** Hero、User research、Event tracking、Final hi-fi assignment 合成图、tags。

### 25.3 Model Details V2 — IA / Objectives 与 Design 文案

**脚本：** `js/case-openshift-model-details-v2.js` · **样式：** `css/case-openshift-model-details-v2.css`  
**入口：** `cases/model-details-v2.html`

| 区块 | 实现 |
|------|------|
| IA map | `renderModelIaMapV2` — 目标三图标 + `@2x` 信息架构图（`model-details/ia-v2/`） |
| Design objectives | `renderModelObjectivesV2` — 四卡徽章布局（`model-details/objectives-v2/`） |
| Design breakdown 文案 | `applyModelDetailsV2Overview`、Header/IA、Challenge 0/1、Performance、Compression、Benchmark cognitive load 等补丁 |

**资源更新：** `goals-validated.png` / `@2x` / SVG、`goals-tabs.svg` 等 Design 区图标重导出。

**V2 仍沿用 V1：** Hero、User research（persona/journey）、Event tracking、Design breakdown 线框结构与主 CSS。

### 25.4 RBAC V2 — Role assignment 与 Usability 迭代

**设计参考：** Role assignment V2 系列（Figma `5334` / `5338` / `5343` / `5586`）；Hi-fi `4080:40705`

#### Role assignment 四挑战（仅 V2）

| 挑战 | visual | 要点 |
|------|--------|------|
| C1 Typeahead | `typeaheadV2` | 叠放双卡 mock；Figma 裁剪定位（`h:103.94%` / `120.16%`） |
| C2 Role table | `roleTableV2` | Explorations 层 + 表格 mock + 磨砂 annotation bar（Figma `5341:47268` 描边采样色） |
| C3 Assignment status | `assignmentStatusV2` | 左标题 + mock（紫框 `::after`）+ 右 legend；仅保留标题无正文 |
| C4 Save confirm | `saveConfirmV2` | 灰底 stage `#f8f9fb` + 左文案 + 右合成图（bg / modal / arrow） |

**图片资源：** `assets/cases/openshift-ai/rbac/assignment-v2/`（9 张 PNG）  
- 自 Figma MCP 原比例导出，**禁止非等比拉伸**  
- HTML 增加 `.fc-rbac-assign__crop` 容器，CSS 按 Figma `top/left/width/height` 百分比裁剪  
- 隔离 V1 泄漏：`.fc-rbac-assign__c3-mock-v2`、`.fc-rbac-assign__c4-composite-v2__*` 等独立类名

#### C4 与 Final hi-fi 间距

- **不改** C4 灰底卡片 padding / 背景  
- `body[data-case-id="rbac-v2"] .fc-rbac-assign + .fc-assignment-hifi { margin-top: 0 }` — 去掉 Hi-fi 区块默认 32px 上边距

#### Final hi-fi 标题居中

- `.fc-assignment-hifi__title`：`left: 50%` + `transform: translateX(-50%)`（桌面与 `@media`）  
- 修复中文版「角色分配页面最终高保真设计」因固定 `left: 592px` 偏左的问题；英文同步居中

#### Usability testing 精简（仅 V2）

- `applyRbacV2Usability()` 删除 `USABILITY_TESTING_DATA.executive`  
- `renderUsabilityTesting()` 仅在存在 `executive` 数据时输出 `.fc-usability__exec`  
- V2 移除 **Executive summary** 与 **Core prototype tasks**；V1 保留

### 25.5 Deployment Tracking V2 — Research 区段

**脚本：** `js/case-openshift-deployment-v2.js` · **样式：** `css/case-openshift-deployment-v2.css`  
**入口：** `cases/deployment-tracking-v2.html`

| 改动 | 说明 |
|------|------|
| Project context | `renderDeploymentContextV2` — 部署说明卡 + 插图（`deployment/project-context-v2/`） |
| User research | `renderDeploymentUserResearchV2` — persona、journey、客户洞察板、四目标卡 |
| Evaluation 并入 Research | `renderDeploymentEvaluationV2Section`；`renderDeploymentEvaluation` 在 V2 返回空 |
| UX extension 文案 | `applyExtensionV2Text` 更新 collapsible / modal 复用说明 |
| Breakdown V2 资源 | `deployment/breakdown-v2/`、`research-v2/` 已导出，**尚未接线**（V2 仍用 V1 breakdown / trade-offs） |

### 25.6 Keycloak V1/V2

- 仅路由与 `data-case-id` 拆分（`keycloak-composite-role-v1` / `v2`）  
- 脚本、样式、正文与 V1 **完全一致**；支持顶栏版本切换  
- 首页卡片仍为 V1 且 `hidden: true`

### 25.7 涉及文件一览

```
cases/*-v1.html, cases/*-v2.html     # 八个版本化入口
js/case-naming.js                    # 命名约定
js/case-openshift-rbac-v2.js
js/case-openshift-model-details-v2.js
js/case-openshift-deployment-v2.js
css/case-openshift-rbac-v2.css
css/case-openshift-model-details-v2.css
css/case-openshift-deployment-v2.css
js/case-openshift.js                 # V2 渲染分支、Role assignment crop 结构、Usability 条件渲染
css/case-openshift.css               # Hi-fi 标题居中
css/case-page.css                    # 版本切换器、zh 排版补充
assets/cases/openshift-ai/rbac/      # *-v2/、assignment-v2/
assets/cases/openshift-ai/model-details/  # ia-v2/、objectives-v2/、design goals 重导出
assets/cases/openshift-ai/deployment/     # project-context-v2/、research-v2/、breakdown-v2/（未接线）
```

### 25.9 RBAC V2 — 中文版排版与文案微调（2026-06-08）

针对 `cases/rbac-v2.html` 中文版的局部排版与标点，**仅 `html:lang(zh)` 或 zh 文案**，英文版与其他区块不变。

#### 设计目标（Design objectives）

| 改动 | 说明 |
|------|------|
| 卡片高度 | `.fc-rbac-obj-v2__stage` 高度 323→280 |
| 边框 SVG | `scaleY(188/231)` + `transform-origin: top center` 垂直压缩；**宽度与下边框不变**（避免 `object-fit: contain` 缩窄或 `overflow: hidden` 裁掉底边） |
| 标题间距 | `.fc-rbac-obj-v2__card-title` 下边距 18→12 |

#### 技术调研（Tech research）

| 改动 | 说明 |
|------|------|
| 引言标点 | 「OpenShift AI 的权限基于 Kubernetes RBAC，因此…」→「…RBAC。**因此**…」（逗号改句号，独立成句） |
| 引言下边距 | `.fc-rbac-tr-v2__intro` 的 `margin-bottom` 32→**48px**（引言与下方 Roles/verbs、Role binding 双栏间距） |

文案同步：`js/case-openshift-data.js`（V1 源数据）、`js/case-openshift-rbac-v2.js`（V2 `TECH_RESEARCH.intro`）。

#### 竞品调研（Competitor research）

| 区块 | 中文版行为 |
|------|------------|
| **常见痛点** | `.fc-rbac-cr-v2__card--pain` 取消 `min-height: 160`；`.fc-rbac-cr-v2__row--pain .fc-rbac-cr-v2__cards` 设为 `align-items: flex-start`，各卡随中文行数收缩 |
| **常见角色管理模式** | `.fc-rbac-cr-v2__card--pattern` 取消 `min-height: 212`；保留默认 `stretch`，三张卡**等高**（以内容最高者为准，整体低于英文固定高度） |

#### 涉及文件

```
css/case-openshift-rbac-v2.css    # 上述 zh 布局覆盖 + Tech research 引言间距
js/case-openshift-data.js         # Tech research 引言标点（rbac-v1 源）
js/case-openshift-rbac-v2.js      # Tech research 引言标点（V2 补丁）
```

### 25.10 首页 About — 设计项目产品外链（2026-06-08）

About 区块 **「设计项目 / Design projects」** 下三个产品名称可点击跳转官网，中英文均生效；默认样式与原先标题一致，悬停时变蓝。

| 产品 | 外链 |
|------|------|
| OpenShift AI | https://www.redhat.com/en/products/ai/openshift-ai |
| Keycloak | https://www.keycloak.org/ |
| Infinispan | https://infinispan.org/ |

| 改动 | 说明 |
|------|------|
| 数据 | `js/i18n.js` — `cv.projects[].url`（en / zh 各三条） |
| 渲染 | `js/app.js` — `renderCvEntry(..., "project")` 有 `url` 时输出 `<a target="_blank" rel="noopener noreferrer">` |
| 样式 | `css/styles.css` — `.cv-entry-title a` 继承标题色、无下划线；`:hover` 使用 `--color-brand`（`#0066cc`） |

### 25.11 案例详情页 — 仅展示 V2（2026-06-08）

详情页对外只展示 V2 内容；§25.1 顶栏 **V1 | V2** 药丸切换已停用（样式仍保留于 `css/case-page.css`，便于日后恢复）。

| 行为 | 实现 |
|------|------|
| V1 不可见 | 访问 `cases/*-v1.html` 时 `location.replace` 跳转到同 slug 的 V2 页面 |
| 取消切换器 | `mountVersionSwitch()` 不再渲染按钮，并移除已有 `#case-version-switch` |
| 未改项 | 首页工作卡片仍链至 V1 href（进入后自动进 V2）；`CASE_INDEX`、`*-v1.html` 文件与 V1 数据保留；prev/next 邻接导航逻辑不变 |

**涉及文件：** `js/case-page.js`（`redirectToV2IfNeeded()`、`mountVersionSwitch()`）

### 25.8 验证

```bash
cd "Portfolio web"
python3 -m http.server 8765
# RBAC V2:     http://127.0.0.1:8765/cases/rbac-v2.html
# 中文版：设计目标三卡高度、Tech research 引言 48px 间距、竞品调研痛点/模式卡片高度
# 首页 About：设计项目产品名外链与悬停变蓝
# 详情页：访问 *-v1.html 应自动进入 V2；顶栏无 V1/V2 切换
# Model V2:    http://127.0.0.1:8765/cases/model-details-v2.html
# Deployment V2: http://127.0.0.1:8765/cases/deployment-tracking-v2.html
# Role assignment 图片比例、Hi-fi 标题中英文居中、Usability 无 Executive 块
```

---

## 26. 案例页 V3 上线与默认路由（2026-06-29）

在 §25 V2 稳定后，新增四个案例的 **V3 详情页**，并将 V3 设为对外默认版本。V1 / V2 HTML 与数据均保留，但访问 V1 或 V2 时会自动 `location.replace` 到同 slug 的 V3；V2 在 `CASE_DETAIL_NAMING` 中标记 `hidden: true`。

**页面入口：**

| 案例 | V3（默认） | V2（隐藏，自动跳转 V3） |
|------|------------|-------------------------|
| RBAC | `cases/rbac-v3.html` | `cases/rbac-v2.html` |
| Model Details | `cases/model-details-v3.html` | `cases/model-details-v2.html` |
| Deployment Tracking | `cases/deployment-tracking-v3.html` | `cases/deployment-tracking-v2.html` |
| Keycloak | `cases/keycloak-v3.html` | `cases/keycloak-v2.html` |

### 26.1 版本路由与首页链接

| 文件 | 改动 |
|------|------|
| `js/case-index.js` | 工作卡片 `href` 由 `*-v1.html` 改为 `*-v3.html` |
| `js/case-naming.js` | 补充 `*-v3` 命名；V2 条目 `hidden: true`；新增 `getCaseDetailDefaultHref()` |
| `js/case-page.js` | `redirectToDefaultVersionIfNeeded()` — V1 / V2 访问时跳转 V3（取代 §25.11 的 `redirectToV2IfNeeded()`） |
| `js/case-openshift-data.js` | `cloneOpenShiftCaseVersion()` 由 V2 克隆生成 `rbac-v3`、`model-details-v3`、`deployment-tracking-v3` |
| `js/i18n.js` | Keycloak 运行时克隆 `keycloak-composite-role-v3` |

### 26.2 RBAC V3 — Research 与 Design 新区块

**脚本：** `js/case-openshift-rbac-v3.js`（在 `*-v2.js` 之后加载）· **样式：** `css/case-openshift-rbac-v2.css`（`body[data-case-id="rbac-v3"]` 作用域）  
**入口：** `cases/rbac-v3.html`

| 区块 | 渲染器 | 资源目录（示例） |
|------|--------|------------------|
| Project context | `renderRbacProjectContextV3` | `rbac/project-context-v2/`（图文卡复用） |
| Tech research | `renderRbacTechResearchV3` | `rbac/research-v3/` |
| User research | `renderRbacUserResearchV3` | persona / insight / quotes 新布局 |
| Design objectives | `renderRbacObjectivesV3` | `rbac/objectives-v3/` |
| Inspiration | `renderRbacInspirationV3` | V3 卡片与箭头装饰 |
| Roles mapping | `renderRbacRolesMappingV3` | `rbac/roles-mapping-v3/` |
| Event tracking | `renderEventTrackingV3` | `rbac/event-tracking-v3/` |
| Usability testing | `renderUsabilityTestingV3` | `rbac/usability-v3/` |

**`js/case-openshift.js`：** 在 `body[data-case-id="rbac-v3"]` 时按区块类型分发上述 V3 渲染器；V2 路径不变。

### 26.3 Model Details V3 — Project context 与 User research

**脚本：** `js/case-openshift-model-details-v3.js` · **样式：** `css/case-openshift-model-details-v2.css`（`body[data-case-id="model-details-v3"]`）  
**入口：** `cases/model-details-v3.html`

| 区块 | 实现 |
|------|------|
| Project context | `renderModelProjectContextV3`（Figma `6979:30511`）— MaaS 引言、工作流 SVG、`Validated Models` 结语、Challenges / Goals 双卡（白底黑边、红/绿 bullet） |
| 区块顺序 | V3 仅：`Design objectives` 置于 `User research` **之前**（`renderModelResearch` 分支） |
| User research | `renderModelUserResearchV3`（Figma `6991:30816`）— 左侧 persona（头像环、紫 pill 关键词）+ 右侧 2×2 用户故事卡（色条顶边、48px 图标） |
| Challenges / Goals 卡 | bullet 正文 **24px**；卡与上方内容间距 **24px**；双卡宽 **720px**、**页面居中** |

**资源：** `model-details/project-context-v3/workflow-diagram.svg`、`model-details/research/persona-alex.png`

**V3 仍沿用 V2：** Hero、IA map、Design breakdown、Event tracking 等（通过 `*-v2.js` 补丁数据克隆至 `model-details-v3`）。

### 26.4 Deployment Tracking V3 与 Keycloak V3

| 案例 | 说明 |
|------|------|
| Deployment Tracking | `cases/deployment-tracking-v3.html` — 数据自 V2 克隆；与 RBAC / Model Details 共用 Design breakdown 编号标题组件 |
| Keycloak | `cases/keycloak-v3.html` — 博客正文模板；V3 元信息区去掉 Platform 字段（`isCasePageV3()`） |

### 26.5 Design breakdown 编号标题（V3 共用）

| 文件 | 说明 |
|------|------|
| `js/case-db-step.js`（新） | `renderFcDbStepTitle()` — 圆形 step 徽章 + 标题；作用于 `rbac-v3`、`model-details-v3`、`deployment-tracking-v3` |
| `css/case-db-step.css`（新） | `.fc-db-step` 布局与徽章样式 |
| `assets/.../rbac/design-breakdown-v3/step-badge.svg` | 步骤编号底图 |

### 26.6 涉及文件一览

```
cases/rbac-v3.html
cases/model-details-v3.html
cases/deployment-tracking-v3.html
cases/keycloak-v3.html
js/case-openshift-rbac-v3.js
js/case-openshift-model-details-v3.js
js/case-db-step.js
css/case-db-step.css
css/case-openshift-rbac-v2.css      # 大量 rbac-v3 作用域样式
css/case-openshift-model-details-v2.css
js/case-openshift.js
js/case-index.js
js/case-naming.js
js/case-page.js
assets/cases/openshift-ai/rbac/research-v3/
assets/cases/openshift-ai/rbac/objectives-v3/
assets/cases/openshift-ai/rbac/roles-mapping-v3/
assets/cases/openshift-ai/rbac/event-tracking-v3/
assets/cases/openshift-ai/rbac/usability-v3/
assets/cases/openshift-ai/rbac/design-breakdown-v3/
assets/cases/openshift-ai/model-details/project-context-v3/
assets/cases/openshift-ai/model-details/user-research-v3/
```

### 26.7 验证

```bash
cd "Portfolio web"
python3 -m http.server 8765
# 首页工作卡片应直接进入 *-v3.html
# 访问 *-v1.html 或 *-v2.html 应自动跳转同案例 V3
# RBAC V3:          http://127.0.0.1:8765/cases/rbac-v3.html
# Model Details V3: http://127.0.0.1:8765/cases/model-details-v3.html
# Deployment V3:    http://127.0.0.1:8765/cases/deployment-tracking-v3.html
# Keycloak V3:      http://127.0.0.1:8765/cases/keycloak-v3.html
```

---

## 16. 后续可迭代方向（未做）

- 邮箱 / LinkedIn 在 Contact 区块也改为蓝色（若需与 Hero 完全统一）
- 添加 favicon
- 部署到 GitHub Pages / Vercel 等（仓库已就绪，见 §24.5）
- Deployment V2：接线 `breakdown-v2/` 资源，替换 V1 Design breakdown 区块（§25.5）
- Keycloak V2：若需独立内容或设计迭代（当前与 V1 相同，§25.6）
- Keycloak 页与 Red Hat 博客像素级 diff（字体、间距微调）
- 小屏下 Usability 语录卡、Hi-fi 合成图横向滚动或堆叠细节微调
- Model Details Hero：副标题字重、process 双行排版、插图缩放（见 §17.8）
- 恢复首页 Keycloak 卡片或改为外链 Red Hat 博客（§20.2 当前为隐藏）
- Hero 轨道：按文案长度自动缩放圆球、与内圈重叠检测

---

*最后更新：2026-06-08（§25.9–§25.11 RBAC V2 中文排版、首页外链、详情页 V2-only）· 2026-06-11（§25 案例 V1/V2 拆分与 OpenShift AI V2）· 2026-06-02（§24 GitHub）· 2026-06-03（§22–§20）· 2026-06-02（§23–§18、§17）· 2026-06-01（§15）*
