/**
 * RBAC case study V2 — Project context (4648:31043), Tech research (4665:35372),
 * Competitor research (4678:35992), Inspiration (5123:41903), Design objectives (5429:15509),
 * Role reveal (5467:24996).
 * Loaded only on cases/rbac-v2.html.
 */
(function () {
  "use strict";

  const IMG = "assets/cases/openshift-ai/rbac/project-context-v2/";
  const ICON = "assets/cases/openshift-ai/icons/";
  const RESEARCH_IMG = "assets/cases/openshift-ai/rbac/research/";
  const RESEARCH_ICON = "assets/cases/openshift-ai/rbac/research-v2/";
  const COMPETITOR_IMG = "assets/cases/openshift-ai/rbac/competitor-v2/";
  const OBJECTIVES_IMG = "assets/cases/openshift-ai/rbac/objectives-v2/";
  const INSPIRATION_IMG = "assets/cases/openshift-ai/rbac/inspiration-v2/";
  const REVEAL_IMG = "assets/cases/openshift-ai/rbac/reveal-v2/";
  const REVEAL_ICON = "assets/cases/openshift-ai/rbac/reveal/";
  const ASSIGN_V2 = "assets/cases/openshift-ai/rbac/assignment-v2/";

  const DATA = {
    background: {
      title: { en: "Background", zh: "背景" },
      body: {
        en: "Red Hat OpenShift AI is an enterprise cloud-native AI/ML platform for data science and AI/ML engineering. With increasing adoption in enterprises and education, demand for fine-grained access control has grown.",
        zh: "Red Hat OpenShift AI 是企业级云原生 AI/ML 平台，面向数据科学家与 AI/ML 工程师。随着企业与教育场景采用率提升，对细粒度访问控制的需求日益增长。",
      },
    },
    challenges: [
      {
        image: IMG + "virus-threat.png",
        textHtml: {
          en: 'The platform only provides two project roles (Admin/Contributor) previously, <strong>lacking granular permission management</strong>.',
          zh: "平台此前仅提供 Admin/Contributor 两种项目角色，<strong>缺少细粒度权限管理</strong>。",
        },
      },
      {
        image: IMG + "development-bugs.png",
        textHtml: {
          en: 'Organizations struggle with managing complex structures. <strong>The existing system lacked clarity</strong>, making it difficult to operate.',
          zh: "组织难以管理复杂结构。<strong>现有系统信息不清晰</strong>，管理员难以判断权限归属。",
        },
      },
    ],
    insights: {
      title: { en: "Key customer insights", zh: "关键客户洞察" },
      body: {
        en: "This case originated from requirements raised by two key enterprise customers.",
        zh: "本案例源于两家关键企业客户提出的需求。",
      },
      quotes: [
        {
          text: {
            en: "Fine-grained permissions for data science teams: users can only run pre-created resources, with no access to edit configurations or sensitive data.",
            zh: "数据科学团队需要细粒度权限：用户只能运行预创建资源，无法编辑配置或访问敏感数据。",
          },
          author: { en: "Tur** *****", zh: "Tur** *****" },
          company: { en: "An airline company", zh: "某航空公司" },
        },
        {
          text: {
            en: "Separate configuration and usage permissions to meet compliance requirements, including read-only access for auditors.",
            zh: "分离配置与使用权限以满足合规要求，包括为审计员提供只读访问。",
          },
          author: { en: "Wel** *****", zh: "Wel** *****" },
          company: { en: "A tech company", zh: "某科技公司" },
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

  function quoteT(obj, lang) {
    return (window.caseQuoteT || t)(obj, lang);
  }

  window.renderRbacProjectContextV2 = function (_block, lang) {
    const d = DATA;
    const challenges = d.challenges
      .map((card) => {
        const text =
          card.textHtml?.[lang] || card.textHtml?.en || esc(t(card.text, lang));
        return `
        <article class="fc-rbac-pc-v2__challenge">
          <figure class="fc-rbac-pc-v2__challenge-art">
            <img src="${esc(card.image)}" alt="" loading="lazy" width="240" height="240">
          </figure>
          <p class="fc-rbac-pc-v2__challenge-text">${text}</p>
        </article>`;
      })
      .join("");

    const quotes = d.insights.quotes
      .map(
        (q) => `
        <blockquote class="fc-rbac-pc-v2__quote">
          <img class="fc-rbac-pc-v2__quote-icon" src="${ICON}quote.svg" alt="" aria-hidden="true" width="16" height="15">
          <p class="fc-rbac-pc-v2__quote-text">${esc(quoteT(q.text, lang))}</p>
          <footer class="fc-rbac-pc-v2__quote-foot">
            <p class="fc-rbac-pc-v2__quote-author">${esc(t(q.author, lang))}</p>
            <p class="fc-rbac-pc-v2__quote-role">${esc(t(q.company, lang))}</p>
          </footer>
        </blockquote>`
      )
      .join("");

    return `
      <div class="fc-rbac-pc-v2">
        <div class="fc-rbac-pc-v2__background">
          <h3 class="fc-rbac-pc-v2__subtitle">${esc(t(d.background.title, lang))}</h3>
          <p class="fc-rbac-pc-v2__intro">${esc(t(d.background.body, lang))}</p>
        </div>
        <div class="fc-rbac-pc-v2__insights">
          <div class="fc-rbac-pc-v2__insights-copy">
            <h3 class="fc-rbac-pc-v2__subtitle">${esc(t(d.insights.title, lang))}</h3>
            <p class="fc-rbac-pc-v2__insights-body">${esc(t(d.insights.body, lang))}</p>
          </div>
          <div class="fc-rbac-pc-v2__quotes">${quotes}</div>
        </div>
        <div class="fc-rbac-pc-v2__challenges-band">
          <div class="fc-rbac-pc-v2__challenges">${challenges}</div>
        </div>
      </div>`;
  };

  function applyRbacV2SectionOrder() {
    const cs = window.CASE_OPENSHIFT_DATA?.["rbac-v2"];
    if (!cs?.blocks) return;
    const objectivesIdx = cs.blocks.findIndex(
      (b) => b.type === "objectives" || b.type === "rbacObjectivesV2"
    );
    const techIdx = cs.blocks.findIndex(
      (b) => b.type === "section" && b.title?.en === "Tech research"
    );
    if (objectivesIdx < 0 || techIdx < 0 || objectivesIdx < techIdx) return;
    const [objectives] = cs.blocks.splice(objectivesIdx, 1);
    const insertAt = cs.blocks.findIndex(
      (b) => b.type === "section" && b.title?.en === "Tech research"
    );
    if (insertAt < 0) return;
    cs.blocks.splice(insertAt, 0, objectives);
  }

  function applyRbacV2ProjectContext() {
    const cs = window.CASE_OPENSHIFT_DATA?.["rbac-v2"];
    if (!cs?.blocks) return;
    const idx = cs.blocks.findIndex(
      (b) => b.type === "section" && b.title?.en === "Project context"
    );
    if (idx < 0) return;
    cs.blocks[idx] = {
      type: "section",
      title: { en: "Project context", zh: "项目背景" },
      blocks: [{ type: "rbacProjectContextV2" }],
    };
  }

  const OBJECTIVES_V2 = {
    title: { en: "Design objectives", zh: "设计目标" },
    body: {
      en: "Through discussions with PM, customer support and engineering teams, we have agreed to iterate and upgrade features in line with these established design goals.",
      zh: "通过与 PM、客户支持团队及工程团队讨论，我们已就围绕既定设计目标迭代功能达成一致。",
    },
    cards: [
      {
        frame: "card-frame-1.svg",
        icon: "icon-granular-control.svg",
        title: { en: "Granular control", zh: "细粒度控制" },
        text: {
          en: "Enable fine-grained permission management for resources, allowing admins to precisely control user permissions for view, edit, use, or delete actions.",
          zh: "为资源启用细粒度权限管理，使管理员能精确控制用户的查看、编辑、使用或删除权限。",
        },
      },
      {
        frame: "card-frame-2.svg",
        icon: "icon-streamlined-management.svg",
        title: { en: "Streamlined management", zh: "精简管理" },
        text: {
          en: "Streamlined role assignment processes, enabling the project admins to efficiently manage team permissions at scale.",
          zh: "精简角色分配流程，使项目管理员能高效管理大规模团队的权限。",
        },
      },
      {
        frame: "card-frame-2.svg",
        icon: "icon-enterprise-security.svg",
        title: { en: "Enterprise-grade security", zh: "企业级安全" },
        text: {
          en: "Built on Kubernetes native RBAC, ensuring secure, auditable, and extensible access control across namespaces.",
          zh: "基于 Kubernetes 原生 RBAC，确保跨命名空间的安全、可审计且可扩展的访问控制。",
        },
      },
    ],
  };

  window.renderRbacObjectivesV2 = function (_block, lang) {
    const d = OBJECTIVES_V2;
    const cards = d.cards
      .map(
        (card) => `
        <article class="fc-rbac-obj-v2__card">
          <div class="fc-rbac-obj-v2__stage">
            <img class="fc-rbac-obj-v2__frame" src="${OBJECTIVES_IMG}${esc(card.frame)}" alt="" loading="lazy" width="512" height="231">
            <div class="fc-rbac-obj-v2__badge">
              <div class="fc-rbac-obj-v2__badge-ring" aria-hidden="true"></div>
              <img class="fc-rbac-obj-v2__badge-icon" src="${OBJECTIVES_IMG}${esc(card.icon)}" alt="" loading="lazy" width="64" height="64">
            </div>
            <div class="fc-rbac-obj-v2__copy">
              <p class="fc-rbac-obj-v2__card-title">${esc(t(card.title, lang))}</p>
              <p class="fc-rbac-obj-v2__card-text">${esc(t(card.text, lang))}</p>
            </div>
          </div>
        </article>`
      )
      .join("");

    return `
      <section class="fc-section fc-section--objectives fc-rbac-obj-v2">
        <h2 class="fc-section__title">${esc(t(d.title, lang))}</h2>
        <p class="fc-section__body fc-rbac-obj-v2__intro">${esc(t(d.body, lang))}</p>
        <div class="fc-rbac-obj-v2__grid">${cards}</div>
      </section>`;
  };

  function applyRbacV2Objectives() {
    const cs = window.CASE_OPENSHIFT_DATA?.["rbac-v2"];
    if (!cs?.blocks) return;
    const idx = cs.blocks.findIndex((b) => b.type === "objectives");
    if (idx < 0) return;
    cs.blocks[idx] = { type: "rbacObjectivesV2" };
  }

  function stripParenthetical(text) {
    return String(text)
      .replace(/\s*\([^)]*\)/g, "")
      .replace(/\s*（[^）]*）/g, "")
      .trim();
  }

  const TECH_RESEARCH = {
    intro: {
      en: "OpenShift AI permissions build on Kubernetes RBAC, so I researched the native model and how other platforms expose it before designing workflows that stay compliant and understandable.",
      zh: "OpenShift AI 的权限基于 Kubernetes RBAC。因此在设计流程前，我先调研原生模型与同类产品的做法，确保方案既合规又便于理解。",
    },
    rolesVerbs: {
      title: { en: "Roles and verbs", zh: "角色与操作动词" },
      body: {
        en: "Mapped platform permission actions to native Kubernetes RBAC verbs.",
        zh: "将平台权限操作映射到 Kubernetes 原生 RBAC 动词。",
      },
      image: RESEARCH_IMG + "roles-verbs-table.png",
      imageAlt: { en: "Roles and verbs mapping table", zh: "角色与操作动词映射表" },
    },
    roleBinding: {
      title: { en: "Role and role binding", zh: "Role 与 RoleBinding" },
      body: {
        en: "A RoleBinding typically includes three core components: the role to be assigned, the subject (user/group/service account) receiving the role, and the specific resources the role applies to. The image shows an example of a role binding in K8S.",
        zh: "RoleBinding 通常包含三个核心组件：要分配的角色、被授权对象（用户/组/服务账户），以及角色适用的具体资源。图示为 Kubernetes 中的 RoleBinding 示例。",
      },
      image: RESEARCH_IMG + "role-binding.png",
      imageAlt: { en: "Kubernetes RoleBinding example", zh: "Kubernetes RoleBinding 示例" },
    },
    insights: {
      title: { en: "Insights from tech research", zh: "技术调研洞察" },
      items: [
        {
          icon: "gpp-good.svg",
          text: {
            en: "Aligns with K8s-native RBAC, ensuring compatibility and future scalability.",
            zh: "对齐 K8s 原生 RBAC，确保兼容性与未来可扩展性。",
          },
        },
        {
          icon: "security.svg",
          text: {
            en: "Builds a secure, compliant foundation that meets enterprise requirements.",
            zh: "构建满足企业要求的安全合规基础。",
          },
        },
        {
          icon: "group-add.svg",
          text: {
            en: "Establishes feasibility analysis for future new role definitions and introductions.",
            zh: "为未来新增角色提供可行性依据。",
          },
        },
        {
          icon: "nat.svg",
          text: {
            en: "Simplifies complexity by translating technical verbs into intuitive actions.",
            zh: "将技术动词转化为直观操作，简化复杂度。",
          },
        },
      ],
    },
  };

  window.renderRbacTechResearchV2 = function (_block, lang) {
    const d = TECH_RESEARCH;
    const insightCells = d.insights.items
      .map(
        (item) => `
        <div class="fc-rbac-tr-v2__insight-cell">
          <img class="fc-rbac-tr-v2__insight-icon" src="${RESEARCH_ICON}${esc(item.icon)}" alt="" aria-hidden="true" width="48" height="48">
          <p class="fc-rbac-tr-v2__insight-text">${esc(t(item.text, lang))}</p>
        </div>`
      )
      .join("");

    return `
      <div class="fc-rbac-tr-v2">
        <p class="fc-rbac-tr-v2__intro">${esc(t(d.intro, lang))}</p>
        <div class="fc-rbac-tr-v2__panels">
          <article class="fc-rbac-tr-v2__panel">
            <h3 class="fc-rbac-tr-v2__subtitle">${esc(t(d.rolesVerbs.title, lang))}</h3>
            <p class="fc-rbac-tr-v2__body">${esc(t(d.rolesVerbs.body, lang))}</p>
            <figure class="fc-rbac-tr-v2__figure fc-rbac-tr-v2__figure--verbs">
              <img src="${esc(d.rolesVerbs.image)}" alt="${esc(t(d.rolesVerbs.imageAlt, lang))}" loading="lazy" width="856" height="362">
            </figure>
          </article>
          <article class="fc-rbac-tr-v2__panel">
            <h3 class="fc-rbac-tr-v2__subtitle">${esc(t(d.roleBinding.title, lang))}</h3>
            <p class="fc-rbac-tr-v2__body">${esc(t(d.roleBinding.body, lang))}</p>
            <figure class="fc-rbac-tr-v2__figure fc-rbac-tr-v2__figure--binding">
              <img src="${esc(d.roleBinding.image)}" alt="${esc(t(d.roleBinding.imageAlt, lang))}" loading="lazy" width="691" height="485">
            </figure>
          </article>
        </div>
        <div class="fc-rbac-tr-v2__insights">
          <h3 class="fc-rbac-tr-v2__subtitle">${esc(t(d.insights.title, lang))}</h3>
          <div class="fc-rbac-tr-v2__insight-grid">${insightCells}</div>
        </div>
      </div>`;
  };

  const COMPETITOR_LOGOS = [
      { src: COMPETITOR_IMG + "logo-azure.png", alt: { en: "Microsoft Azure", zh: "Microsoft Azure" }, className: "azure" },
      { src: COMPETITOR_IMG + "logo-gcp.png", alt: { en: "Google Cloud", zh: "Google Cloud" }, className: "gcp" },
      { src: COMPETITOR_IMG + "logo-databricks.png", alt: { en: "Databricks", zh: "Databricks" }, className: "databricks" },
      { src: COMPETITOR_IMG + "logo-aws.png", alt: { en: "AWS", zh: "AWS" }, className: "aws" },
      { src: COMPETITOR_IMG + "logo-redhat.png", alt: { en: "Red Hat", zh: "Red Hat" }, className: "redhat" },
  ];

  const COMPETITOR_LABELS = {
    competitorsLabel: { en: "Competitors", zh: "竞品" },
  };

  function renderCompetitorPainLabel(title, lang) {
    if (lang === "en" && title?.en === "Common pain points") {
      return "Common<br>pain points";
    }
    return esc(t(title, lang));
  }

  function renderCompetitorPatternCard(item, lang) {
    return `<div class="fc-rbac-cr-v2__card fc-rbac-cr-v2__card--pattern">
      <div class="fc-rbac-cr-v2__card-text">
        <p class="fc-rbac-cr-v2__card-label">${esc(t(item.label, lang))}</p>
        <p class="fc-rbac-cr-v2__card-spacer" aria-hidden="true">&nbsp;</p>
        <p class="fc-rbac-cr-v2__card-body">${esc(t(item.text, lang))}</p>
      </div>
    </div>`;
  }

  window.renderRbacCompetitorResearchV2 = function (block, lang) {
    const painTitle = block.painTitle || { en: "Common pain points", zh: "常见痛点" };
    const patternsTitle = block.patternsTitle || { en: "Common role management patterns", zh: "常见角色管理模式" };
    const painPoints = block.painPoints || [];
    const patterns = block.patterns || [];
    const logos = COMPETITOR_LOGOS.map(
      (logo) =>
        `<div class="fc-rbac-cr-v2__logo-slot">
          <img class="fc-rbac-cr-v2__logo fc-rbac-cr-v2__logo--${logo.className}" src="${esc(logo.src)}" alt="${esc(t(logo.alt, lang))}" loading="lazy">
        </div>`
    ).join("");
    const painCards = painPoints
      .map(
        (item) =>
          `<div class="fc-rbac-cr-v2__card fc-rbac-cr-v2__card--pain"><p class="fc-rbac-cr-v2__card-text">${esc(t(item, lang))}</p></div>`
      )
      .join("");
    const patternCards = patterns.map((item) => renderCompetitorPatternCard(item, lang)).join("");

    return `
      <div class="fc-rbac-cr-v2">
        <div class="fc-rbac-cr-v2__stage">
          <img class="fc-rbac-cr-v2__bg" src="${COMPETITOR_IMG}background.png" alt="" loading="lazy" width="1356" height="1181">
          <div class="fc-rbac-cr-v2__overlay" aria-hidden="true"></div>
          <div class="fc-rbac-cr-v2__content">
            <div class="fc-rbac-cr-v2__row fc-rbac-cr-v2__row--competitors">
              <p class="fc-rbac-cr-v2__label">${esc(t(COMPETITOR_LABELS.competitorsLabel, lang))}</p>
              <div class="fc-rbac-cr-v2__panel">
                <div class="fc-rbac-cr-v2__logos">${logos}</div>
              </div>
            </div>
            <div class="fc-rbac-cr-v2__row fc-rbac-cr-v2__row--pain">
              <p class="fc-rbac-cr-v2__label fc-rbac-cr-v2__label--pain">${renderCompetitorPainLabel(painTitle, lang)}</p>
              <div class="fc-rbac-cr-v2__panel">
                <div class="fc-rbac-cr-v2__cards">${painCards}</div>
              </div>
            </div>
            <div class="fc-rbac-cr-v2__row fc-rbac-cr-v2__row--patterns">
              <p class="fc-rbac-cr-v2__label">${esc(t(patternsTitle, lang))}</p>
              <div class="fc-rbac-cr-v2__panel">
                <div class="fc-rbac-cr-v2__cards">${patternCards}</div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  };

  const INSPIRATION_V2 = {
    title: { en: "Inspiration from competitor analysis", zh: "竞品分析启发" },
    intro: {
      en: "During discussions with the product and business team, we agreed to split collected inspirations and required features into two phases: MVP phase and Post-MVP phase.",
      zh: "与产品、业务团队讨论后，我们将收集的灵感与需求功能拆分为 MVP 与 Post-MVP 两阶段。",
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
        zh: '在 <span class="fc-rbac-insp-v2__phase">Post-MVP 阶段</span>，扩展并丰富相关功能。',
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

  window.renderRbacInspirationV2 = function (block, lang) {
    const d = INSPIRATION_V2;
    const gapClass = block.spacingTop ? ` fc-rbac-insp-v2--gap-${block.spacingTop}` : "";
    const mvpLabel = d.mvp.labelHtml[lang] || d.mvp.labelHtml.en;
    const postLabel = d.post.labelHtml[lang] || d.post.labelHtml.en;

    const mvpIcons = d.mvp.items
      .map(
        (item) => `
        <div class="fc-rbac-insp-v2__mvp-icon-slot">
          <div class="fc-rbac-insp-v2__mvp-icon-shell">
            <img class="fc-rbac-insp-v2__mvp-icon-bg" src="${INSPIRATION_IMG}icon-circle.svg" alt="" aria-hidden="true" width="200" height="200">
            <img class="fc-rbac-insp-v2__mvp-icon-img" src="${INSPIRATION_IMG}${esc(item.icon)}" alt="" loading="lazy" width="120" height="120">
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
      <div class="fc-rbac-insp-v2${gapClass}">
        <header class="fc-rbac-insp-v2__header">
          <h3 class="fc-rbac-insp-v2__title">${esc(t(d.title, lang))}</h3>
          <p class="fc-rbac-insp-v2__intro">${esc(t(d.intro, lang))}</p>
        </header>
        <section class="fc-rbac-insp-v2__mvp" aria-labelledby="fc-rbac-insp-v2-mvp-label">
          <p class="fc-rbac-insp-v2__label" id="fc-rbac-insp-v2-mvp-label">${mvpLabel}</p>
          <div class="fc-rbac-insp-v2__mvp-stage">
            <div class="fc-rbac-insp-v2__mvp-panel" aria-hidden="true"></div>
            <div class="fc-rbac-insp-v2__mvp-layout">
              <div class="fc-rbac-insp-v2__mvp-icon-row">${mvpIcons}</div>
              <div class="fc-rbac-insp-v2__mvp-text-row">${mvpTexts}</div>
            </div>
          </div>
        </section>
        <section class="fc-rbac-insp-v2__post" aria-labelledby="fc-rbac-insp-v2-post-label">
          <p class="fc-rbac-insp-v2__label" id="fc-rbac-insp-v2-post-label">${postLabel}</p>
          <div class="fc-rbac-insp-v2__post-panel">${postItems}</div>
        </section>
      </div>`;
  };

  function applyRbacV2Inspiration() {
    const cs = window.CASE_OPENSHIFT_DATA?.["rbac-v2"];
    if (!cs?.blocks) return;
    const section = cs.blocks.find(
      (b) => b.type === "section" && b.title?.en === "Competitor research"
    );
    if (!section?.blocks) return;

    const start = section.blocks.findIndex(
      (b) =>
        b.type === "content" && b.title?.en === "Inspiration from competitor analysis"
    );
    if (start < 0) return;

    let end = start + 1;
    while (end < section.blocks.length && section.blocks[end].type === "metrics") {
      end += 1;
    }

    section.blocks.splice(start, end - start, { type: "rbacInspirationV2", spacingTop: 48 });
  }

  function applyRbacV2CompetitorResearch() {
    const cs = window.CASE_OPENSHIFT_DATA?.["rbac-v2"];
    if (!cs?.blocks) return;
    const section = cs.blocks.find(
      (b) => b.type === "section" && b.title?.en === "Competitor research"
    );
    if (!section?.blocks) return;
    const intro = section.blocks.find((b) => b.type === "content" && b.body && !b.title);
    const columnsBlock = section.blocks.find((b) => b.type === "columns");
    const painCol = columnsBlock?.columns?.[0];
    const patternCol = columnsBlock?.columns?.[1];
    const tail = section.blocks.filter(
      (b) => b.type !== "competitorPanels" && b.type !== "columns" && b !== intro
    );
    section.blocks = [
      ...(intro ? [intro] : []),
      {
        type: "rbacCompetitorResearchV2",
        painTitle: painCol?.title,
        painPoints: (painCol?.bullets || []).filter(
          (b) =>
            b.en !==
            "No permission simulation tools to test configurations (except limited support in AWS)."
        ),
        patternsTitle: patternCol?.title,
        patterns: patternCol?.bullets,
      },
      ...tail,
    ];
  }

  function applyRbacV2TechResearch() {
    const cs = window.CASE_OPENSHIFT_DATA?.["rbac-v2"];
    if (!cs?.blocks) return;
    const idx = cs.blocks.findIndex(
      (b) => b.type === "section" && b.title?.en === "Tech research"
    );
    if (idx < 0) return;
    cs.blocks[idx] = {
      type: "section",
      title: { en: "Tech research", zh: "技术调研" },
      blocks: [{ type: "rbacTechResearchV2" }],
    };
  }

  function renderRoleRevealProsCons(items, lang) {
    if (!items?.length) return "";
    return `<ul class="fc-rbac-rr-v2__list">${items
      .map((item) => `<li>${esc(t(item, lang))}</li>`)
      .join("")}</ul>`;
  }

  function renderRbacRoleRevealConceptV2(concept, lang) {
    const prosLabel = lang === "zh" ? "优点：" : "Pros: ";
    const consLabel = lang === "zh" ? "缺点：" : "Cons:";
    return `
      <article class="fc-rbac-rr-v2__concept">
        <figure class="fc-rbac-rr-v2__concept-media">
          <img src="${esc(concept.image)}" alt="${esc(t(concept.imageAlt, lang))}" loading="lazy" width="784" height="373">
        </figure>
        <div class="fc-rbac-rr-v2__concept-panel">
          <div class="fc-rbac-rr-v2__concept-head">
            <h4 class="fc-rbac-rr-v2__concept-title">${esc(t(concept.title, lang))}</h4>
            <p class="fc-rbac-rr-v2__concept-desc">${esc(t(concept.description, lang))}</p>
          </div>
          <div class="fc-rbac-rr-v2__proscons">
            <p class="fc-rbac-rr-v2__proscons-label">${esc(prosLabel)}</p>
            ${renderRoleRevealProsCons(concept.pros, lang)}
            <p class="fc-rbac-rr-v2__proscons-label">${esc(consLabel)}</p>
            ${renderRoleRevealProsCons(concept.cons, lang)}
          </div>
        </div>
      </article>`;
  }

  window.renderRbacRoleRevealV2 = function (block, lang) {
    const gapClass = block.spacingTop ? ` fc-role-reveal--gap-${block.spacingTop}` : "";
    const fd = block.finalDecision || {};
    const checkIcon = REVEAL_ICON + "icon-check.svg";
    const concepts = (block.concepts || [])
      .map((c) => renderRbacRoleRevealConceptV2(c, lang))
      .join("");
    const reasonCols = (fd.reasons || [])
      .map(
        (reason, index) => `
        <div class="fc-rbac-rr-v2__decision-reason${index > 0 ? " fc-rbac-rr-v2__decision-reason--divided" : ""}">
          <span class="fc-rbac-rr-v2__decision-icon" aria-hidden="true">
            <img src="${esc(checkIcon)}" alt="" width="18" height="18">
          </span>
          <p class="fc-rbac-rr-v2__decision-text">${esc(t(reason, lang))}</p>
        </div>`
      )
      .join("");
    const leadHtml = fd.leadHtml?.[lang] || fd.leadHtml?.en || "";
    const hifi = block.hifi || {};

    return `
      <div class="fc-role-reveal fc-rbac-rr-v2${gapClass}">
        <header class="fc-role-reveal__explore">
          <div class="fc-role-reveal__intro">
            ${window.renderFcDbStepTitleOr?.(
              "02",
              block.title,
              lang,
              `<h3 class="fc-section__subtitle">${esc(t(block.title, lang))}</h3>`
            ) ?? `<h3 class="fc-section__subtitle">${esc(t(block.title, lang))}</h3>`}
            <p class="fc-section__body">${esc(t(block.intro, lang))}</p>
          </div>
          <div class="fc-rbac-rr-v2__concepts">${concepts}</div>
        </header>
        <section class="fc-rbac-rr-v2__decision" aria-labelledby="fc-rbac-rr-v2-decision">
          <h4 class="fc-rbac-rr-v2__decision-title" id="fc-rbac-rr-v2-decision">${esc(t(fd.title, lang))}</h4>
          <p class="fc-rbac-rr-v2__decision-lead">${leadHtml}</p>
          <div class="fc-rbac-rr-v2__decision-visual">
            <img class="fc-rbac-rr-v2__decision-image" src="${esc(hifi.image)}" alt="${esc(t(hifi.imageAlt, lang))}" loading="lazy" width="1600" height="709">
            <div class="fc-rbac-rr-v2__decision-card">
              <div class="fc-rbac-rr-v2__decision-card-glass" aria-hidden="true"></div>
              <div class="fc-rbac-rr-v2__decision-bar">${reasonCols}</div>
            </div>
          </div>
        </section>
      </div>`;
  };

  const ROLE_REVEAL_V2 = {
    type: "rbacRoleRevealV2",
    spacingTop: 72,
    title: { en: "Reveal role details and assignees", zh: "展示角色详情与已分配对象" },
    intro: {
      en: "To determine the optimal pattern for displaying role details, I explored and iterated on multiple interaction approaches. From multiple design explorations, I selected two representative solutions for detailed comparison as shown below.",
      zh: "为确定展示角色详情的最优模式，我探索并迭代了多种交互方案。经过多轮方案探索，我选取以下两种代表性方案进行详细对比。",
    },
    concepts: [
      {
        title: { en: "Conceptual design #01", zh: "概念设计 #01" },
        description: {
          en: "Clicking the role name will trigger a right-side drawer.",
          zh: "点击角色名称将触发右侧抽屉。",
        },
        pros: [
          { en: "Showing details and list at the same time", zh: "可同时查看详情与列表" },
          { en: "Not break users' workflow", zh: "不打断用户当前操作流程" },
        ],
        cons: [
          {
            en: "It occupies large screen space and compresses the main list",
            zh: "占用大量屏幕空间并压缩主列表",
          },
          { en: "Hierarchy is not clear enough", zh: "信息层级不够清晰" },
          { en: "Reusability is poor", zh: "可复用性较差" },
        ],
        image: REVEAL_IMG + "concept-01.png",
        imageAlt: { en: "Drawer pattern for role details", zh: "角色详情抽屉方案" },
      },
      {
        title: { en: "Conceptual design #02", zh: "概念设计 #02" },
        description: {
          en: "A floating modal popup that appears on user trigger.",
          zh: "由用户操作触发的浮动弹窗。",
        },
        pros: [
          { en: "Showing clear information hierarchy", zh: "信息层级清晰" },
          { en: "Providing a reusable component across scenarios", zh: "跨场景可复用的组件" },
          { en: "Easy to maintain the user's attention", zh: "易于保持用户注意力" },
        ],
        cons: [
          { en: "Slightly higher cost for cross-role comparisons", zh: "跨角色对比的操作成本略高" },
        ],
        image: REVEAL_IMG + "concept-02.png",
        imageAlt: { en: "Modal pattern for role details", zh: "角色详情弹窗方案" },
      },
    ],
    finalDecision: {
      title: { en: "Final decision", zh: "最终决策" },
      leadHtml: {
        en: 'After discussion with stakeholders, we agreed that selecting <strong>the modal approach</strong> to prioritize core UX and scalability.',
        zh: "与各团队讨论后，我们同意选择<strong>弹窗方案</strong>以优先保障核心体验与可扩展性。",
      },
      reasons: [
        {
          en: "It keeps the main permission list fully visible, ensuring the primary task is unobstructed.",
          zh: "主权限列表保持完全可见，确保核心任务不受阻碍。",
        },
        {
          en: "The modal provides a clean, layered experience, showing details only when needed.",
          zh: "弹窗提供清晰的分层体验，仅在需要时展示详情。",
        },
        {
          en: "It is a reusable component, supporting future use cases with consistent patterns.",
          zh: "作为可复用组件，以一致的交互模式支持后续场景。",
        },
      ],
    },
    hifi: {
      title: { en: "Final hi-fi design", zh: "最终高保真设计" },
      image: REVEAL_IMG + "hifi-final.png",
      imageAlt: {
        en: "Role details and assignees modal views",
        zh: "角色详情与已分配对象弹窗视图",
      },
    },
  };

  function applyRbacV2RoleReveal() {
    const cs = window.CASE_OPENSHIFT_DATA?.["rbac-v2"];
    if (!cs?.blocks) return;
    const section = cs.blocks.find(
      (b) => b.type === "section" && b.title?.en === "Design breakdown"
    );
    if (!section?.blocks) return;
    const idx = section.blocks.findIndex((b) => b?.type === "roleReveal");
    if (idx < 0) return;
    section.blocks[idx] = ROLE_REVEAL_V2;
  }

  function applyRbacV2RolesMappingSummaries() {
    const cs = window.CASE_OPENSHIFT_DATA?.["rbac-v2"];
    if (!cs?.blocks) return;
    const section = cs.blocks.find(
      (b) => b.type === "section" && b.title?.en === "Design breakdown"
    );
    const mapping = section?.blocks?.find((b) => b?.type === "rolesMapping");
    if (!mapping?.groups) return;
    delete mapping.footer;
    for (const group of mapping.groups) {
      const summary = group.role?.summary;
      if (!summary) continue;
      if (summary.en) summary.en = stripParenthetical(summary.en);
      if (summary.zh) summary.zh = stripParenthetical(summary.zh);
    }
  }

  function applyRbacV2RoleAssignment() {
    const cs = window.CASE_OPENSHIFT_DATA?.["rbac-v2"];
    if (!cs?.blocks) return;
    const section = cs.blocks.find(
      (b) => b.type === "section" && b.title?.en === "Design breakdown"
    );
    if (!section?.blocks) return;
    const block = section.blocks.find((b) => b?.type === "roleAssignment");
    const c0 = block?.challenges?.[0];
    const c1 = block?.challenges?.[1];
    if (!c0) return;

    c0.visual = "typeaheadV2";
    c0.painHtml = {
      en: "OpenShift is <strong>unable to obtain the full user/group list</strong>, so project admins have to input user or group names manually. For existing granted users/groups, forced manual name entry raises extra administrative costs.",
      zh: "OpenShift <strong>无法获取完整用户/组列表</strong>，项目管理员只能手动输入用户或组名。对已授权用户/组仍需重复手动输入，增加了管理成本。",
    };
    c0.solutionBody = {
      en: "Admins can either select pre-authorized users from suggestions or manually enter new user/group names as needed.",
      zh: "管理员可从建议中选择已授权用户，或按需手动输入新用户/组。",
    };
    delete c0.annotations;
    delete c0.solutionDescNarrow;

    if (c1) {
      c1.visual = "roleTableV2";
      delete c1.painBody;
      delete c1.solutionHtml;
    }

    const c2 = block?.challenges?.[2];
    const c3 = block?.challenges?.[3];
    if (c2) {
      c2.visual = "assignmentStatusV2";
      delete c2.painBody;
      delete c2.solutionHtml;
      delete c2.solutionDescNarrow;
    }
    if (c3) {
      c3.visual = "saveConfirmV2";
      delete c3.painBody;
    }

    block.assets = {
      ...block.assets,
      typeaheadV2Default: ASSIGN_V2 + "typeahead-default.png",
      typeaheadV2Active: ASSIGN_V2 + "typeahead-active.png",
      explorationsV2Bg: ASSIGN_V2 + "explorations-bg.png",
      explorationsV2Card: ASSIGN_V2 + "explorations-card.png",
      roleTableV2Mock: ASSIGN_V2 + "role-table.png",
      assignmentStatusV2Ui: ASSIGN_V2 + "assignment-status-ui.png",
      saveDialogV2Bg: ASSIGN_V2 + "save-dialog-bg.png",
      saveDialogV2Modal: ASSIGN_V2 + "save-dialog-modal.png",
      saveDialogV2Arrow: ASSIGN_V2 + "save-dialog-arrow.png",
    };
  }

  function applyRbacV2Usability() {
    if (window.USABILITY_TESTING_DATA) {
      delete window.USABILITY_TESTING_DATA.executive;
    }
  }

  applyRbacV2ProjectContext();
  applyRbacV2SectionOrder();
  applyRbacV2Objectives();
  applyRbacV2TechResearch();
  applyRbacV2CompetitorResearch();
  applyRbacV2Inspiration();
  applyRbacV2RoleReveal();
  applyRbacV2RolesMappingSummaries();
  applyRbacV2RoleAssignment();
  applyRbacV2Usability();

  (function syncRbacV3FromV2() {
    const src = window.CASE_OPENSHIFT_DATA?.["rbac-v2"];
    if (!src) return;
    window.CASE_OPENSHIFT_DATA["rbac-v3"] = JSON.parse(JSON.stringify(src));
    const target = window.CASE_OPENSHIFT_DATA["rbac-v3"];
    target.id = "rbac-v3";
    target.version = 3;
    target.codeName = {
      en: "RBAC Design in AI Project V3",
      zh: "AI 项目中的 RBAC 权限设计 V3",
    };
  })();
})();
