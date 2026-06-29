/**
 * RBAC case study V3 — Project context (6796:40715), Tech research (6779:38596).
 * Loaded after case-openshift-rbac-v2.js.
 */
(function () {
  "use strict";

  const IMG = "assets/cases/openshift-ai/rbac/project-context-v2/";
  const RESEARCH_V3 = "assets/cases/openshift-ai/rbac/research-v3/";
  const ICON = "assets/cases/openshift-ai/icons/";

  const DATA = {
    business: {
      title: { en: "Business context", zh: "业务背景" },
      bodyHtml: {
        en: "Red Hat OpenShift AI is an enterprise cloud-native AI/ML platform for data science and AI/ML engineering. With increasing adoption in enterprises, <strong>demand for fine-grained access control has grown.</strong>",
        zh: "Red Hat OpenShift AI 是企业级云原生 AI/ML 平台，面向数据科学家与 AI/ML 工程师。随着企业采用率提升，<strong>对细粒度访问控制的需求日益增长。</strong>",
      },
      cards: [
        {
          image: IMG + "virus-threat.png",
          textHtml: {
            en: 'The platform only provides two project roles (Admin/Contributor) previously, <strong>lacking granular permission management.</strong>',
            zh: "平台此前仅提供 Admin/Contributor 两种项目角色，<strong>缺少细粒度权限管理。</strong>",
          },
        },
        {
          image: IMG + "development-bugs.png",
          textHtml: {
            en: 'Organizations struggle with managing complex structures. <strong>The existing system lacked clarity</strong>, making it difficult to operate.',
            zh: "组织难以管理复杂的权限结构。<strong>现有系统信息不够清晰</strong>，日常管理工作也因此受阻。",
          },
        },
      ],
    },
    keyIssues: {
      title: { en: "Key issues", zh: "关键问题" },
      items: [
        {
          icon: "co-present.svg",
          title: { en: "Coarse permission granularity", zh: "权限粒度过粗" },
          text: {
            en: "Existing roles (Admin/Contributor) are too broad, violating the principle of least privilege and creating security risks.",
            zh: "现有角色（Admin/Contributor）范围过宽，违反最小权限原则并带来安全风险。",
          },
        },
        {
          icon: "select-all.svg",
          title: { en: "Poor resource isolation", zh: "资源隔离不足" },
          text: {
            en: "No effective isolation of resource access between users/groups in the same project.",
            zh: "同一项目内用户/组之间缺乏有效的资源访问隔离。",
          },
        },
        {
          icon: "visibility-off.svg",
          title: { en: "Opaque role definitions", zh: "角色定义不透明" },
          text: {
            en: "Roles are defined via complex Kubernetes APIs, lacking visualization and making audits difficult.",
            zh: "角色通过复杂的 Kubernetes API 定义，缺少可视化，审计困难。",
          },
        },
        {
          icon: "edit-off.svg",
          title: { en: "Fragmented management experience", zh: "管理体验割裂" },
          text: {
            en: "Advanced permission tasks require switching to OpenShift, raising costs and breaking UX consistency.",
            zh: "高级权限任务需切换至 OpenShift 控制台，增加操作成本，并影响体验一致性。",
          },
        },
      ],
    },
  };

  function esc(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function t(obj, lang) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] || obj.en || "";
  }

  function htmlField(obj, lang) {
    if (obj?.html?.[lang] || obj?.html?.en) return obj.html[lang] || obj.html.en;
    if (typeof obj === "object" && (obj[lang] || obj.en)) return t(obj, lang);
    return "";
  }

  window.renderRbacProjectContextV3 = function (_block, lang) {
    const d = DATA;
    const cards = d.business.cards
      .map((card) => {
        const text = card.textHtml?.[lang] || card.textHtml?.en || "";
        return `
        <article class="fc-rbac-pc-v2__challenge fc-rbac-pc-v3__card">
          <figure class="fc-rbac-pc-v2__challenge-art">
            <img src="${esc(card.image)}" alt="" loading="lazy" width="240" height="240">
          </figure>
          <p class="fc-rbac-pc-v2__challenge-text">${text}</p>
        </article>`;
      })
      .join("");

    const issues = d.keyIssues.items
      .map(
        (item) => `
        <div class="fc-card-grid__cell">
          <img class="fc-card-grid__icon" src="${ICON}${esc(item.icon)}" alt="" aria-hidden="true" width="48" height="48">
          <div>
            <p class="fc-card-grid__title">${esc(t(item.title, lang))}</p>
            <p class="fc-card-grid__text">${esc(t(item.text, lang))}</p>
          </div>
        </div>`
      )
      .join("");

    return `
      <div class="fc-rbac-pc-v3">
        <section class="fc-rbac-pc-v3__business">
          <h3 class="fc-rbac-pc-v3__subtitle">${esc(t(d.business.title, lang))}</h3>
          <p class="fc-rbac-pc-v3__intro">${htmlField(d.business.bodyHtml, lang)}</p>
          <div class="fc-rbac-pc-v3__cards">${cards}</div>
        </section>
        <section class="fc-rbac-pc-v3__issues">
          <h3 class="fc-rbac-pc-v3__subtitle">${esc(t(d.keyIssues.title, lang))}</h3>
          <div class="fc-card-grid fc-card-grid--4 fc-card-grid--pain fc-rbac-pc-v3__issues-grid">${issues}</div>
        </section>
      </div>`;
  };

  const TECH_RESEARCH = {
    intro: {
      en: "Mapped platform permission actions to native Kubernetes RBAC verbs and simplified complex tech into user flows.",
      zh: "将平台权限操作映射到原生 Kubernetes RBAC 动词，并将复杂技术概念转化为清晰的用户操作流程。",
    },
    flow: {
      from: { en: "Complex technical language", zh: "复杂技术表述" },
      bridge: { en: "Deconstruct and translate", zh: "拆解与翻译" },
      to: { en: "User-friendly UI language", zh: "易懂的界面语言" },
    },
    diagram: {
      artImg: RESEARCH_V3 + "tech-research-diagram.svg",
      width: 1920,
      height: 739,
      alt: {
        en: "Mapping from Kubernetes verbs to permissions, predefined roles, resource binding, and role assignment",
        zh: "从 Kubernetes 动词到权限、预定义角色、资源绑定与角色分配的映射图",
      },
    },
  };

  function renderTrDiagram(lang) {
    const d = TECH_RESEARCH.diagram;

    return `
      <div class="fc-rbac-tr-v3__diagram-band">
        <figure class="fc-rbac-tr-v3__diagram-figure">
          <img
            class="fc-rbac-tr-v3__diagram-art"
            src="${esc(d.artImg)}"
            alt="${esc(t(d.alt, lang))}"
            width="${d.width}"
            height="${d.height}"
            decoding="async"
          >
        </figure>
      </div>`;
  }

  window.renderRbacTechResearchV3 = function (_block, lang) {
    const d = TECH_RESEARCH;

    return `
      <div class="fc-rbac-tr-v3">
        <p class="fc-rbac-tr-v3__intro">${esc(t(d.intro, lang))}</p>
        <div class="fc-rbac-tr-v3__flow" aria-label="${esc(t({ en: "Translation flow", zh: "翻译流程" }, lang))}">
          <div class="fc-rbac-tr-v3__flow-node">${esc(t(d.flow.from, lang))}</div>
          <div class="fc-rbac-tr-v3__flow-bridge" aria-hidden="true">
            <span class="fc-rbac-tr-v3__flow-track">
              <span class="fc-rbac-tr-v3__flow-pill">${esc(t(d.flow.bridge, lang))}</span>
            </span>
          </div>
          <div class="fc-rbac-tr-v3__flow-node fc-rbac-tr-v3__flow-node--pill">${esc(t(d.flow.to, lang))}</div>
        </div>
        ${renderTrDiagram(lang)}
      </div>`;
  };

  const USER_RESEARCH = {
    stats: {
      en: "4 Companies  |   9 Users   |   100+ Feedbacks",
      zh: "4 家企业  |   9 位用户  |   100+ 条反馈",
    },
    intro: {
      en: "Before designing a new permission system, we needed to understand how enterprise teams currently manage access and governance.",
      zh: "在设计新权限体系之前，我们需要了解企业团队目前如何管理访问与治理。",
    },
    insightCards: [
      {
        tone: "feature",
        shape: RESEARCH_V3 + "card-intersect-red.svg",
        icon: RESEARCH_V3 + "thumb-down.svg",
        title: { en: "Feature gaps", zh: "功能缺口" },
        items: [
          { en: "Lack of granular access control", zh: "缺少细粒度访问控制" },
          { en: "Missing read-only and audit roles", zh: "缺少只读与审计角色" },
          { en: "No scalable governance framework", zh: "缺少可扩展的治理框架" },
        ],
      },
      {
        tone: "ux",
        shape: RESEARCH_V3 + "card-intersect-blue.svg",
        icon: RESEARCH_V3 + "thumb-down.svg",
        title: { en: "UX limitations", zh: "体验局限" },
        items: [
          { en: "Poor permission transparency", zh: "权限透明度不足" },
          { en: "High cognitive load during permission assignment", zh: "分配权限时认知负担高" },
          { en: "Limited feedbacks and auditability", zh: "操作反馈不足，审计能力有限" },
        ],
      },
    ],
    bridge: {
      left: { en: "Key insights", zh: "关键洞察" },
      right: { en: "Customer feedbacks", zh: "客户反馈" },
    },
    quoteRows: [
      [
        {
          tone: "blue",
          width: 643,
          text: {
            en: "Without RBAC, we can't confidently onboard additional teams.",
            zh: "没有 RBAC，我们无法放心接入更多团队。",
          },
        },
        {
          tone: "red",
          width: 619,
          text: {
            en: "The current roles are too broad for regulated environments.",
            zh: "现有角色范围过宽，不适合受监管环境。",
          },
        },
      ],
      [
        {
          tone: "red",
          width: 790,
          text: {
            en: "Read-only access is one of the most requested permissions in our organization.",
            zh: "只读访问是我们组织最常申请的权限之一。",
          },
        },
        {
          tone: "purple",
          width: 729,
          text: {
            en: "It's hard to know which permissions I actually need to complete my work.",
            zh: "很难判断完成工作实际需要哪些权限。",
          },
        },
      ],
      [
        {
          tone: "blue",
          width: 750,
          text: {
            en: "During audits, we need a clear view of who can access sensitive resources.",
            zh: "审计时，我们需要清楚掌握谁可以访问敏感资源。",
          },
        },
        {
          tone: "red",
          width: 754,
          text: {
            en: "I only need access to deploy models. I don't need administrator privileges.",
            zh: "我只需要部署模型的权限，不需要管理员权限。",
          },
        },
      ],
      [
        {
          tone: "blue",
          width: 709,
          text: {
            en: "I spend more time reviewing permissions than actually assigning them.",
            zh: "花在审查权限上的时间比实际分配还多。",
          },
        },
        {
          tone: "blue",
          width: 858,
          text: {
            en: "I need confidence that access is granted correctly without checking multiple systems.",
            zh: "我希望确信权限已正确授予，而不必反复检查多个系统。",
          },
        },
      ],
      [
        {
          tone: "purple",
          width: 811,
          text: {
            en: "The biggest risk isn't assigning permissions. It's assigning the wrong permissions.",
            zh: "最大的风险不是分配权限，而是分配错了权限。",
          },
        },
      ],
    ],
  };

  function quoteText(obj, lang) {
    if (window.caseQuoteT) return window.caseQuoteT(obj, lang);
    return t(obj, lang);
  }

  function renderUrInsightCard(card, lang) {
    const items = card.items
      .map((item) => `<li>${esc(t(item, lang))}</li>`)
      .join("");

    return `
      <article class="fc-rbac-ur-v3__card fc-rbac-ur-v3__card--${esc(card.tone)}">
        <img class="fc-rbac-ur-v3__card-shape" src="${esc(card.shape)}" alt="" aria-hidden="true" width="137" height="137" loading="lazy">
        <img class="fc-rbac-ur-v3__card-icon" src="${esc(card.icon)}" alt="" aria-hidden="true" width="64" height="64" loading="lazy">
        <div class="fc-rbac-ur-v3__card-body">
          <h4 class="fc-rbac-ur-v3__card-title">${esc(t(card.title, lang))}</h4>
          <ul class="fc-rbac-ur-v3__card-list">${items}</ul>
        </div>
      </article>`;
  }

  function formatUrQuote(text) {
    const trimmed = String(text ?? "").trim();
    if (!trimmed) return '""';
    if (/^[“"„«].*[”"„»]$/.test(trimmed)) return trimmed;
    return `"${trimmed}"`;
  }

  function renderUrQuotes(rows, lang) {
    return rows
      .map((row) => {
        const quotes = row
          .map(
            (quote) => `
        <blockquote
          class="fc-rbac-ur-v3__quote fc-rbac-ur-v3__quote--${esc(quote.tone)}"
          style="--fc-rbac-ur-v3-quote-w: ${quote.width}"
        >
          <p>${esc(formatUrQuote(quoteText(quote.text, lang)))}</p>
        </blockquote>`
          )
          .join("");

        return `<div class="fc-rbac-ur-v3__quote-row">${quotes}</div>`;
      })
      .join("");
  }

  window.renderRbacUserResearchV3 = function (_block, lang) {
    const d = USER_RESEARCH;
    const cards = d.insightCards.map((card) => renderUrInsightCard(card, lang)).join("");

    return `
      <div class="fc-rbac-ur-v3">
        <p class="fc-rbac-ur-v3__stats">${esc(t(d.stats, lang))}</p>
        <p class="fc-rbac-ur-v3__intro">${esc(t(d.intro, lang))}</p>
        <div class="fc-rbac-ur-v3__cards">${cards}</div>
        <div class="fc-rbac-ur-v3__bridge" aria-hidden="true">
          <span class="fc-rbac-ur-v3__bridge-label fc-rbac-ur-v3__bridge-label--left">${esc(t(d.bridge.left, lang))}</span>
          <span class="fc-rbac-ur-v3__bridge-icon">
            <img src="${RESEARCH_V3}swap-circle.svg" alt="" width="32" height="32" loading="lazy">
            <img src="${RESEARCH_V3}swap-vert.svg" alt="" width="20" height="20" loading="lazy">
          </span>
          <span class="fc-rbac-ur-v3__bridge-label fc-rbac-ur-v3__bridge-label--right">${esc(t(d.bridge.right, lang))}</span>
        </div>
        <div class="fc-rbac-ur-v3__quotes">${renderUrQuotes(d.quoteRows, lang)}</div>
      </div>`;
  };

  function applyRbacV3UserResearch() {
    const cs = window.CASE_OPENSHIFT_DATA?.["rbac-v3"];
    if (!cs?.blocks) return;
    const idx = cs.blocks.findIndex(
      (b) => b.type === "section" && b.title?.en === "User research"
    );
    if (idx < 0) return;
    cs.blocks[idx] = {
      type: "section",
      title: { en: "User research", zh: "用户研究" },
      blocks: [{ type: "rbacUserResearchV3" }],
    };
  }

  function applyRbacV3ProjectContext() {
    const cs = window.CASE_OPENSHIFT_DATA?.["rbac-v3"];
    if (!cs?.blocks) return;
    const idx = cs.blocks.findIndex(
      (b) => b.type === "section" && b.title?.en === "Project context"
    );
    if (idx < 0) return;
    cs.blocks[idx] = {
      type: "section",
      title: { en: "Project context", zh: "项目背景" },
      blocks: [{ type: "rbacProjectContextV3" }],
    };
  }

  function applyRbacV3TechResearch() {
    const cs = window.CASE_OPENSHIFT_DATA?.["rbac-v3"];
    if (!cs?.blocks) return;
    const idx = cs.blocks.findIndex(
      (b) => b.type === "section" && b.title?.en === "Tech research"
    );
    if (idx < 0) return;
    cs.blocks[idx] = {
      type: "section",
      title: { en: "Tech research", zh: "技术调研" },
      blocks: [{ type: "rbacTechResearchV3" }],
    };
  }

  function applyRbacV3CompetitorIntro() {
    const cs = window.CASE_OPENSHIFT_DATA?.["rbac-v3"];
    if (!cs?.blocks) return;
    const section = cs.blocks.find(
      (b) => b.type === "section" && b.title?.en === "Competitor research"
    );
    if (!section?.blocks) return;
    const intro = section.blocks.find((b) => b.type === "content" && b.body && !b.title);
    if (!intro?.body) return;
    intro.body.en =
      "Thoroughly studied RBAC implementations on leading enterprise platforms, adopted best practices, and leveraged native Kubernetes capabilities.";
    intro.body.zh =
      "深入研究领先企业平台的 RBAC 实现，采纳最佳实践并充分利用 Kubernetes 原生能力。";
  }

  const INSPIRATION_V3_IMG = "assets/cases/openshift-ai/rbac/inspiration-v2/";

  const INSPIRATION_V3 = {
    intro: {
      en: "Research insights, enterprise feedback and internal discussions inform the prioritization of urgent and critical user needs for the MVP phase.",
      zh: "结合研究洞察、企业反馈与内部讨论，我们明确了 MVP 阶段最紧迫、最关键的用户需求优先级。",
    },
    mvp: {
      labelHtml: {
        en: 'Key focus in the <span class="fc-rbac-insp-v2__phase">MVP phase</span>',
        zh: '<span class="fc-rbac-insp-v2__phase">MVP 阶段</span>的重点',
      },
      items: [
        {
          icon: "mvp-01.png",
          text: {
            en: "Build AI scenario-based role mapping on top of K8S RBAC",
            zh: "在 Kubernetes RBAC 之上构建 AI 场景角色映射",
          },
        },
        {
          icon: "mvp-02.png",
          text: {
            en: "Offer out-of-the-box AI-exclusive roles for OpenShift AI console",
            zh: "为 OpenShift AI 控制台提供开箱即用的 AI 预置角色",
          },
        },
        {
          icon: "mvp-03.png",
          text: {
            en: "Provide fine-grained permissions at the resource level",
            zh: "提供资源级细粒度权限",
          },
        },
        {
          icon: "mvp-04.png",
          text: {
            en: "Visualize permission rules within the OpenShift AI console",
            zh: "在 OpenShift AI 控制台内可视化权限规则",
          },
        },
      ],
    },
    post: {
      labelHtml: {
        en: 'For the <span class="fc-rbac-insp-v2__phase">Post-MVP phase</span>, extending and enriching the relevant functionalities.',
        zh: '在 <span class="fc-rbac-insp-v2__phase">Post-MVP 阶段</span>，将按以下方向扩展并完善相关功能。',
      },
      items: [
        {
          num: "01",
          text: {
            en: "Enable project admins to customize roles based on their needs",
            zh: "允许项目管理员按需自定义角色",
          },
        },
        {
          num: "02",
          text: {
            en: "Allow project admins to grant permissions to specific resource instances",
            zh: "允许为特定资源实例授权",
          },
        },
        {
          num: "03",
          text: {
            en: "Support role copy and quick configuration to improve admin efficiency",
            zh: "支持角色复制与快速配置",
          },
        },
        {
          num: "04",
          text: {
            en: "Allow end-users to view their roles and apply for new permissions",
            zh: "允许最终用户查看角色并申请新权限",
          },
        },
        {
          num: "05",
          text: {
            en: "Notify the end-users when permissions are changed",
            zh: "权限变更时通知最终用户",
          },
        },
      ],
    },
  };

  const INSPIRATION_SECTION_TITLE = {
    en: "Design strategy and prioritization",
    zh: "设计策略与优先级",
  };

  function isInspirationSection(block) {
    return (
      block?.type === "section" &&
      (block.title?.en === INSPIRATION_SECTION_TITLE.en ||
        block.title?.en === "Inspiration from competitor analysis")
    );
  }

  function isInspirationBlock(block) {
    if (!block) return false;
    if (block.type === "rbacInspirationV2" || block.type === "rbacInspirationV3") return true;
    if (block.type === "metrics") return true;
    if (block.type === "content" && block.title?.en === "Inspiration from competitor analysis") return true;
    return false;
  }

  window.renderRbacInspirationV3 = function (_block, lang) {
    const d = INSPIRATION_V3;
    const mvpLabel = d.mvp.labelHtml[lang] || d.mvp.labelHtml.en;
    const postLabel = d.post.labelHtml[lang] || d.post.labelHtml.en;

    const mvpIcons = d.mvp.items
      .map(
        (item) => `
        <div class="fc-rbac-insp-v2__mvp-icon-slot">
          <div class="fc-rbac-insp-v2__mvp-icon-shell">
            <img class="fc-rbac-insp-v2__mvp-icon-bg" src="${INSPIRATION_V3_IMG}icon-circle.svg" alt="" aria-hidden="true" width="200" height="200">
            <img class="fc-rbac-insp-v2__mvp-icon-img" src="${INSPIRATION_V3_IMG}${esc(item.icon)}" alt="" loading="lazy" width="120" height="120">
          </div>
        </div>`
      )
      .join("");

    const mvpTexts = d.mvp.items
      .map((item) => `<p class="fc-rbac-insp-v2__mvp-text">${esc(t(item.text, lang))}</p>`)
      .join("");

    const postItems = d.post.items
      .map(
        (item) => `
        <div class="fc-rbac-insp-v2__post-item">
          <p class="fc-rbac-insp-v2__post-num">${esc(item.num)}</p>
          <p class="fc-rbac-insp-v2__post-text">${esc(t(item.text, lang))}</p>
        </div>`
      )
      .join("");

    return `
      <div class="fc-rbac-insp-v3">
        <p class="fc-rbac-insp-v3__intro">${esc(t(d.intro, lang))}</p>
        <section class="fc-rbac-insp-v2__mvp" aria-labelledby="fc-rbac-insp-v3-mvp-label">
          <p class="fc-rbac-insp-v2__label" id="fc-rbac-insp-v3-mvp-label">${mvpLabel}</p>
          <div class="fc-rbac-insp-v2__mvp-stage">
            <div class="fc-rbac-insp-v2__mvp-panel" aria-hidden="true"></div>
            <div class="fc-rbac-insp-v2__mvp-layout">
              <div class="fc-rbac-insp-v2__mvp-icon-row">${mvpIcons}</div>
              <div class="fc-rbac-insp-v2__mvp-text-row">${mvpTexts}</div>
            </div>
          </div>
        </section>
        <section class="fc-rbac-insp-v2__post" aria-labelledby="fc-rbac-insp-v3-post-label">
          <p class="fc-rbac-insp-v2__label" id="fc-rbac-insp-v3-post-label">${postLabel}</p>
          <div class="fc-rbac-insp-v2__post-panel">${postItems}</div>
        </section>
      </div>`;
  };

  const OBJECTIVES_FOUNDATIONS = [
    {
      title: { en: "Technology research", zh: "技术调研" },
      text: {
        en: "Convert complex technical language into intuitive UI language",
        zh: "将复杂的技术语言转化为直观的界面语言",
      },
    },
    {
      title: { en: "User research", zh: "用户调研" },
      text: {
        en: "Identify users' underlying needs and real-world scenarios",
        zh: "识别用户深层需求与真实使用场景",
      },
    },
    {
      title: { en: "Competitor research", zh: "竞品调研" },
      text: {
        en: "Analyze the key functionalities available across the market",
        zh: "分析市场上可用的关键功能",
      },
    },
  ];

  window.renderRbacObjectivesV3 = function (block, lang) {
    const base = window.renderRbacObjectivesV2?.(block, lang) || "";
    if (!base) return "";

    const items = OBJECTIVES_FOUNDATIONS.map(
      (item) => `
        <article class="fc-rbac-obj-v3__foundations-item">
          <p class="fc-rbac-obj-v3__foundations-title">${esc(t(item.title, lang))}</p>
          <p class="fc-rbac-obj-v3__foundations-text">${esc(t(item.text, lang))}</p>
        </article>`
    ).join("");

    const foundations = `
        <div class="fc-rbac-obj-v3__foundations">
          <div class="fc-rbac-obj-v3__foundations-arrow" aria-hidden="true"></div>
          <div class="fc-rbac-obj-v3__foundations-panel">
            <div class="fc-rbac-obj-v3__foundations-notch" aria-hidden="true"></div>
            <div class="fc-rbac-obj-v3__foundations-grid">${items}</div>
          </div>
        </div>`;

    return base
      .replace(
        'class="fc-section fc-section--objectives fc-rbac-obj-v2"',
        'class="fc-section fc-section--objectives fc-rbac-obj-v2 fc-rbac-obj-v3"'
      )
      .replace("</section>", `${foundations}\n      </section>`);
  };

  function applyRbacV3Objectives() {
    const cs = window.CASE_OPENSHIFT_DATA?.["rbac-v3"];
    if (!cs?.blocks) return;
    const idx = cs.blocks.findIndex(
      (b) => b.type === "objectives" || b.type === "rbacObjectivesV2"
    );
    if (idx < 0) return;
    cs.blocks[idx] = { type: "rbacObjectivesV3" };
  }

  function applyRbacV3Inspiration() {
    const cs = window.CASE_OPENSHIFT_DATA?.["rbac-v3"];
    if (!cs?.blocks) return;

    const compIdx = cs.blocks.findIndex(
      (b) => b.type === "section" && b.title?.en === "Competitor research"
    );
    if (compIdx < 0) return;

    const competitor = cs.blocks[compIdx];
    if (competitor?.blocks) {
      competitor.blocks = competitor.blocks.filter((b) => !isInspirationBlock(b));
    }

    const inspirationSection = {
      type: "section",
      title: INSPIRATION_SECTION_TITLE,
      blocks: [{ type: "rbacInspirationV3" }],
    };

    const inspIdx = cs.blocks.findIndex(isInspirationSection);
    if (inspIdx >= 0) {
      cs.blocks.splice(inspIdx, 1);
    }

    const insertAt = cs.blocks.findIndex(
      (b) => b.type === "section" && b.title?.en === "Competitor research"
    );
    if (insertAt < 0) return;
    cs.blocks.splice(insertAt + 1, 0, inspirationSection);
  }

  function applyRbacV3SectionOrder() {
    const cs = window.CASE_OPENSHIFT_DATA?.["rbac-v3"];
    if (!cs?.blocks) return;

    const objIdx = cs.blocks.findIndex(
      (b) =>
        b.type === "objectives" ||
        b.type === "rbacObjectivesV2" ||
        b.type === "rbacObjectivesV3"
    );
    const inspIdx = cs.blocks.findIndex(isInspirationSection);
    if (objIdx < 0 || inspIdx < 0) return;

    // Already directly before Design strategy section
    if (objIdx === inspIdx - 1) return;

    const [objectives] = cs.blocks.splice(objIdx, 1);
    const inspIdxNext = cs.blocks.findIndex(isInspirationSection);
    if (inspIdxNext < 0) return;
    cs.blocks.splice(inspIdxNext, 0, objectives);
  }

  const ROLES_MAPPING_V3_IMG = "assets/cases/openshift-ai/rbac/roles-mapping-v3/";

  const ROLES_MAPPING_V3 = {
    title: { en: "Define new roles and mapping", zh: "定义新角色与映射" },
    introHtml: {
      en: 'Decided to launch three core roles first, namely <strong>resource maintainer</strong>, <strong>resource updater</strong> and <strong>resource reader</strong>. The table below shows some examples of workbench new roles.',
      zh: "我们决定先上线三个核心角色：<strong>resource maintainer</strong>、<strong>resource updater</strong> 与 <strong>resource reader</strong>。下图展示部分 Workbench 新角色示例。",
    },
    principles: [
      { en: "Principle of least privilege", zh: "最小权限原则" },
      { en: "Separation of duties", zh: "职责分离" },
      { en: "Simplicity & usability", zh: "简洁与易用" },
    ],
    diagram: {
      src: ROLES_MAPPING_V3_IMG + "roles-mapping-diagram@2x.png",
      width: 1534,
      height: 689,
      alt: {
        en: "Mapping from Kubernetes verbs to Create, Delete, Update, and Read actions, predefined Workbench maintainer, updater, and reader roles, and user capability descriptions",
        zh: "从 Kubernetes 动词映射到 Create、Delete、Update、Read 操作，以及预定义的 Workbench maintainer、updater、reader 角色与用户能力说明",
      },
    },
  };

  window.renderRbacRolesMappingV3 = function (_block, lang) {
    const d = ROLES_MAPPING_V3;
    const intro = d.introHtml?.[lang] || d.introHtml?.en || "";
    const pills = d.principles
      .map((item) => `<span class="fc-rbac-rm-v3__pill">${esc(t(item, lang))}</span>`)
      .join("");

    return `
      <div class="fc-rbac-rm-v3">
        ${window.renderFcDbStepTitle("01", d.title, lang)}
        <p class="fc-rbac-rm-v3__intro">${intro}</p>
        <div class="fc-rbac-rm-v3__principles" aria-label="${esc(t({ en: "Design principles", zh: "设计原则" }, lang))}">${pills}</div>
        <figure class="fc-rbac-rm-v3__diagram">
          <img
            class="fc-rbac-rm-v3__diagram-art"
            src="${esc(d.diagram.src)}"
            alt="${esc(t(d.diagram.alt, lang))}"
            width="${d.diagram.width}"
            height="${d.diagram.height}"
            loading="lazy"
            decoding="async"
          >
        </figure>
      </div>`;
  };

  function applyRbacV3RolesMapping() {
    const cs = window.CASE_OPENSHIFT_DATA?.["rbac-v3"];
    if (!cs?.blocks) return;
    const section = cs.blocks.find(
      (b) => b.type === "section" && b.title?.en === "Design breakdown"
    );
    if (!section?.blocks) return;
    const idx = section.blocks.findIndex(
      (b) => b == null || b?.type === "rolesMapping" || b?.type === "rbacRolesMappingV3"
    );
    if (idx < 0) return;
    section.blocks[idx] = { type: "rbacRolesMappingV3" };
  }

  function applyRbacV3RoleAssignment() {
    const cs = window.CASE_OPENSHIFT_DATA?.["rbac-v3"];
    if (!cs?.blocks) return;
    const section = cs.blocks.find(
      (b) => b.type === "section" && b.title?.en === "Design breakdown"
    );
    if (!section?.blocks) return;
    const block = section.blocks.find((b) => b?.type === "roleAssignment");
    if (!block) return;

    block.layout = "v3-panel";

    const c0 = block.challenges?.[0];
    const c3 = block.challenges?.[3];
    if (c0) {
      delete c0.painHtml;
      delete c0.painBody;
      delete c0.solutionBody;
      delete c0.solutionHtml;
    }
    if (c3) {
      delete c3.solutionHtml;
      delete c3.solutionBody;
    }
  }

  const EVENT_TRACKING_V3_IMG = "assets/cases/openshift-ai/rbac/event-tracking-v3/";

  const EVENT_TRACKING_V3 = {
    title: { en: "Event tracking behind UX", zh: "体验背后的埋点" },
    heartTitle: { en: "Event tracking definition process", zh: "埋点定义流程" },
    heartBodyHtml: {
      en: 'To support continuous design improvement, user behavior tracking was implemented using the HEART (Happiness, Engagement, Adoption, Retention, Task Success) framework.<br><br>The data validated key design decisions around permission visibility, workflow simplification, and resource-based role assignment.',
      zh: "为支撑设计的持续改进，我们采用 HEART（Happiness、Engagement、Adoption、Retention、Task Success）框架实现用户行为追踪。<br><br>相关数据验证了权限可见性、流程简化与基于资源的角色分配等关键设计决策。",
    },
    process: [
      { icon: "event-tracking/insights.svg", text: { en: "Map out core user journeys", zh: "梳理核心用户旅程" } },
      { icon: "event-tracking/sticky-note-2.svg", text: { en: "Define interactive events for tracking", zh: "定义可追踪的交互事件" } },
      { icon: "event-tracking/inventory.svg", text: { en: "Deliver official event tracking documentation", zh: "交付官方埋点文档" } },
      { icon: "event-tracking/connect-without-contact.svg", text: { en: "Align requirements with research team", zh: "与研究团队对齐需求" } },
      { icon: "event-tracking/content-paste-search.svg", text: { en: "Validate design decisions with behavioral data", zh: "用行为数据验证设计决策" } },
      { icon: "event-tracking/published-with-changes.svg", text: { en: "Drive iterative optimization if needed", zh: "按需驱动迭代优化" } },
    ],
    resultsTitle: {
      en: "Positive results observed from data tracking",
      zh: "数据追踪显示的正向成效",
    },
    metrics: [
      {
        variant: "tickets",
        circle: "metric-circle-secondary.svg",
        valueHtml: {
          en: '<p class="fc-event-v3__metric-line"><span class="fc-event-v3__metric-num">2.3</span><span class="fc-event-v3__metric-unit">/Month</span></p><p class="fc-event-v3__metric-arrow" aria-hidden="true">↓</p><p class="fc-event-v3__metric-line"><span class="fc-event-v3__metric-num">0.5</span><span class="fc-event-v3__metric-unit">/Month</span></p>',
          zh: '<p class="fc-event-v3__metric-line"><span class="fc-event-v3__metric-num">2.3</span><span class="fc-event-v3__metric-unit">/Month</span></p><p class="fc-event-v3__metric-arrow" aria-hidden="true">↓</p><p class="fc-event-v3__metric-line"><span class="fc-event-v3__metric-num">0.5</span><span class="fc-event-v3__metric-unit">/Month</span></p>',
        },
        label: { en: "Customer-reported issues", zh: "客户反馈问题" },
        caption: {
          en: "Significant decrease in permission configuration-related tickets from customers.",
          zh: "客户侧与权限配置相关的工单显著减少。",
        },
      },
      {
        variant: "adoption",
        circle: "metric-circle-primary.svg",
        valueHtml: {
          en: '<p class="fc-event-v3__metric-line fc-event-v3__metric-line--lg"><span class="fc-event-v3__metric-num fc-event-v3__metric-num--lg">83%</span></p>',
          zh: '<p class="fc-event-v3__metric-line fc-event-v3__metric-line--lg"><span class="fc-event-v3__metric-num fc-event-v3__metric-num--lg">83%</span></p>',
        },
        label: {
          en: "Adoption rate of newly defined roles (March 2026)",
          zh: "新角色的使用率（2026 年 3 月）",
        },
        caption: {
          en: "The newly defined roles show high adoption, indicating they meet the needs of most users.",
          zh: "新角色使用率较高，说明其满足了大多数用户的使用需求。",
        },
      },
      {
        variant: "frequency",
        circle: "metric-circle-secondary.svg",
        valueHtml: {
          en: '<p class="fc-event-v3__metric-line"><span class="fc-event-v3__metric-num">↓ 12.7%</span></p>',
          zh: '<p class="fc-event-v3__metric-line"><span class="fc-event-v3__metric-num">↓ 12.7%</span></p>',
        },
        label: {
          en: "Frequency of AI role assignments in the cluster platform",
          zh: "集群平台中分配 AI 角色的频率",
        },
        caption: {
          en: "Cross-platform permission assignment frequency has significantly decreased, greatly reducing user effort and time.",
          zh: "跨平台分配权限的次数明显减少，显著降低了管理员的操作负担。",
        },
      },
    ],
  };

  window.renderEventTrackingV3 = function (_block, lang) {
    const d = EVENT_TRACKING_V3;
    const heartBody = d.heartBodyHtml?.[lang] || d.heartBodyHtml?.en || "";

    const processItems = d.process
      .map(
        (item) => `
        <li class="fc-event-v3__process-item">
          <img src="${ICON}${esc(item.icon)}" alt="" width="32" height="32" loading="lazy" aria-hidden="true">
          <span>${esc(t(item.text, lang))}</span>
        </li>`
      )
      .join("");

    const metrics = d.metrics
      .map((metric) => {
        const valueHtml = metric.valueHtml?.[lang] || metric.valueHtml?.en || "";
        return `
        <article class="fc-event-v3__metric fc-event-v3__metric--${esc(metric.variant)}">
          <div class="fc-event-v3__metric-circle">
            <img class="fc-event-v3__metric-circle-art" src="${EVENT_TRACKING_V3_IMG}${esc(metric.circle)}" alt="" aria-hidden="true" width="260" height="260" loading="lazy">
            <div class="fc-event-v3__metric-inner">
              <div class="fc-event-v3__metric-value">${valueHtml}</div>
              <p class="fc-event-v3__metric-label">${esc(t(metric.label, lang))}</p>
            </div>
          </div>
          <p class="fc-event-v3__metric-caption">${esc(t(metric.caption, lang))}</p>
        </article>`;
      })
      .join("");

    return `
      <section class="fc-section fc-event-v3">
        <h2 class="fc-event-v3__title">${esc(t(d.title, lang))}</h2>
        <div class="fc-event-v3__intro">
          <div class="fc-event-v3__intro-left">
            <h3 class="fc-event-v3__subtitle">${esc(t(d.heartTitle, lang))}</h3>
            <p class="fc-event-v3__body">${heartBody}</p>
          </div>
          <div class="fc-event-v3__intro-right">
            <div class="fc-event-v3__process">
              <ul class="fc-event-v3__process-list">${processItems}</ul>
            </div>
          </div>
        </div>
        <h3 class="fc-event-v3__results-title">${esc(t(d.resultsTitle, lang))}</h3>
        <div class="fc-event-v3__metrics">${metrics}</div>
      </section>`;
  };

  function applyRbacV3EventTracking() {
    const cs = window.CASE_OPENSHIFT_DATA?.["rbac-v3"];
    if (!cs?.blocks) return;
    const idx = cs.blocks.findIndex((b) => b?.type === "eventTracking");
    if (idx < 0) return;
    cs.blocks[idx] = { type: "eventTrackingV3" };
  }

  const USABILITY_V3_IMG = "assets/cases/openshift-ai/rbac/usability-v3/";

  const USABILITY_V3 = {
    title: { en: "Usability testing", zh: "可用性测试" },
    subtitle: { en: "Evaluating the RBAC experience", zh: "评估 RBAC 体验" },
    intro: {
      en: "Partnering with the User Research team, this study explored how enterprise users interacted with the RBAC workflow. The effort included defining test objectives, designing task scenarios, synthesizing feedback, and translating insights into design decisions.",
      zh: "与用户研究团队协作，本研究探索了企业用户如何使用 RBAC 工作流，涵盖测试目标设定、任务场景设计、反馈汇总，以及从洞察到设计决策的转化。",
    },
    stats: [
      { value: "100%", label: { en: "Task completion rate", zh: "任务完成率" } },
      { value: "6", label: { en: "Enterprise users", zh: "企业用户" } },
      { value: "5", label: { en: "Core tasks", zh: "核心任务" } },
      { value: "60 m", label: { en: "Session length", zh: "单次测试时长" } },
    ],
    findingsTitle: { en: "Key findings", zh: "关键发现" },
    findings: [
      {
        tone: "positive",
        icon: "finding-check-circle.svg",
        title: { en: "New permission model matched expectations", zh: "新权限模型符合预期" },
        body: {
          en: "All participants successfully completed role assignment tasks without assistance. They were able to understand role definition and new assignment flow.",
          zh: "所有参与者均独立完成角色分配任务，并能理解角色定义与新分配流程。",
        },
      },
      {
        tone: "issue",
        icon: "finding-shape-line.svg",
        title: { en: "Users expected resource-instance-level access control", zh: "用户期望资源实例级访问控制" },
        body: {
          en: "Participants wanted to grant access to a specific resource instance (e.g. a specific workbench, a specific model deployment) rather than all resources of the same type.",
          zh: "参与者希望授予特定资源实例（如某个 workbench、某个 model deployment）的访问权限，而非同类型全部资源。",
        },
      },
      {
        tone: "issue",
        icon: "finding-format-shapes.svg",
        title: { en: "Some content/term designs created ambiguity", zh: "部分文案/术语设计造成歧义" },
        body: {
          en: 'Several participants interpreted "Manage Permissions" as modifying permission rules rather than assigning access.',
          zh: "多位参与者将「Manage Permissions」理解为修改权限规则，而非分配访问权限。",
        },
      },
    ],
    decisionsTitle: {
      en: "Turning findings into design decisions",
      zh: "将发现转化为设计决策",
    },
    decisionsIntro: {
      en: "Each usability finding (issues) led to a deliberate design decision aimed at reducing uncertainty and improving governance workflows.",
      zh: "每项可用性发现都对应一条设计决策，用于减少不确定性、优化管理流程。",
    },
    decisions: [
      {
        key: "3",
        title: { en: "Some content designs created ambiguity", zh: "部分文案设计造成歧义" },
        body: {
          en: "Reintroduced a UX writer to review all microcopy and refine key terminology based on usability testing results.",
          zh: "重新引入 UX writer 审阅全部微文案，并基于可用性测试结果优化关键术语。",
        },
        connector: "connector-upper.svg",
      },
      {
        key: "2",
        title: { en: "Users expected resource-instance-level access control", zh: "用户期望资源实例级访问控制" },
        body: {
          en: "Reassess the business need and technical feasibility, and align stakeholders on the requirements and proposed design solution.",
          zh: "重新评估业务需求与技术可行性，并与相关方对齐需求与设计方案。",
        },
        connector: "connector-lower.svg",
      },
    ],
  };

  window.renderUsabilityTestingV3 = function (_block, lang) {
    const d = USABILITY_V3;

    const stats = d.stats
      .map(
        (stat) => `
        <article class="fc-usability-v3__stat">
          <p class="fc-usability-v3__stat-value">${esc(stat.value)}</p>
          <p class="fc-usability-v3__stat-label">${esc(t(stat.label, lang))}</p>
        </article>`
      )
      .join("");

    const findings = d.findings
      .map(
        (item) => `
        <article class="fc-usability-v3__finding fc-usability-v3__finding--${esc(item.tone)}">
          <div class="fc-usability-v3__finding-header">
            <img class="fc-usability-v3__finding-icon" src="${USABILITY_V3_IMG}${esc(item.icon)}" alt="" width="32" height="32" aria-hidden="true" loading="lazy">
            <h4 class="fc-usability-v3__finding-title">${esc(t(item.title, lang))}</h4>
          </div>
          <p class="fc-usability-v3__finding-body">${esc(t(item.body, lang))}</p>
        </article>`
      )
      .join("");

    const decisions = d.decisions
      .map(
        (item) => `
        <div class="fc-usability-v3__decision-row fc-usability-v3__decision-row--${esc(item.key)}">
          <img class="fc-usability-v3__connector fc-usability-v3__connector--${esc(item.key)}" src="${USABILITY_V3_IMG}${esc(item.connector)}" alt="" aria-hidden="true" loading="lazy">
          <div class="fc-usability-v3__decision-copy">
            <h4 class="fc-usability-v3__decision-title">${esc(t(item.title, lang))}</h4>
            <p class="fc-usability-v3__decision-body">${esc(t(item.body, lang))}</p>
          </div>
        </div>`
      )
      .join("");

    const pyramidTop = `
      <div class="fc-usability-v3__pyramid-tier fc-usability-v3__pyramid-tier--top">
        <img src="${USABILITY_V3_IMG}pyramid-top.svg" alt="" width="180" height="143" loading="lazy">
        <p class="fc-usability-v3__pyramid-label">
          <span>${esc(t({ en: "Key finding", zh: "关键发现" }, lang))}</span>
          <span>${esc(d.decisions[0].key)}</span>
        </p>
      </div>`;

    const pyramidBottom = `
      <div class="fc-usability-v3__pyramid-tier fc-usability-v3__pyramid-tier--bottom">
        <img src="${USABILITY_V3_IMG}pyramid-bottom.svg" alt="" width="358" height="143" loading="lazy">
        <p class="fc-usability-v3__pyramid-label fc-usability-v3__pyramid-label--lg">
          <span>${esc(t({ en: "Key finding", zh: "关键发现" }, lang))}</span>
          <span>${esc(d.decisions[1].key)}</span>
        </p>
      </div>`;

    return `
      <section class="fc-section fc-usability-v3">
        <h2 class="fc-usability-v3__title">${esc(t(d.subtitle, lang))}</h2>
        <div class="fc-usability-v3__hero">
          <p class="fc-usability-v3__intro">${esc(t(d.intro, lang))}</p>
          <div class="fc-usability-v3__stats">${stats}</div>
        </div>
        <div class="fc-usability-v3__findings">
          <h3 class="fc-usability-v3__section-title">${esc(t(d.findingsTitle, lang))}</h3>
          <div class="fc-usability-v3__finding-cards">${findings}</div>
        </div>
        <div class="fc-usability-v3__decisions">
          <h3 class="fc-usability-v3__section-title">${esc(t(d.decisionsTitle, lang))}</h3>
          <p class="fc-usability-v3__decisions-intro">${esc(t(d.decisionsIntro, lang))}</p>
          <div class="fc-usability-v3__decisions-diagram">
            <div class="fc-usability-v3__decisions-viz">
              ${pyramidBottom}
              ${pyramidTop}
              ${decisions}
            </div>
          </div>
        </div>
      </section>`;
  };

  function applyRbacV3UsabilityTesting() {
    // V3 layout is selected at render time in case-openshift.js (body[data-case-id="rbac-v3"]).
  }

  applyRbacV3ProjectContext();
  applyRbacV3TechResearch();
  applyRbacV3UserResearch();
  applyRbacV3CompetitorIntro();
  applyRbacV3Objectives();
  applyRbacV3Inspiration();
  applyRbacV3SectionOrder();
  applyRbacV3RolesMapping();
  applyRbacV3RoleAssignment();
  applyRbacV3EventTracking();
  applyRbacV3UsabilityTesting();
})();
