/**
 * Model details case study V3 — Project context (6979:30511), User research (6991:30816).
 * Loaded only on cases/model-details-v3.html.
 */
(function () {
  "use strict";

  const IMG = "assets/cases/openshift-ai/model-details/project-context-v3/";
  const PERSONA_IMG = "assets/cases/openshift-ai/model-details/research/persona-alex.png";

  const STORY_META = [
    {
      tone: "blue",
      title: {
        en: "View model performance benchmarks",
        zh: "查看模型性能 benchmark",
      },
    },
    {
      tone: "cyan",
      title: {
        en: "Identify the optimal hardware configuration",
        zh: "识别最优硬件配置",
      },
    },
    {
      tone: "purple",
      title: {
        en: "Compare accuracy and inference metrics",
        zh: "对比精度与推理指标",
      },
    },
    {
      tone: "coral",
      title: {
        en: "Deploy/register validated models",
        zh: "部署/注册 Validated Models",
      },
    },
  ];

  const PROJECT_CONTEXT_V3 = {
    introHtml: {
      en: "<strong>Model as a Service (MaaS)</strong> provides cloud-based access to pre-trained AI/ML models. To ensure security and balance performance, OpenShift AI evaluates models across various hardware and compression profiles to generate benchmark data. This empowers users to make informed choices.",
      zh: "<strong>Model as a Service (MaaS)</strong> 提供基于云平台的预训练 AI/ML 模型访问服务。为保障安全并平衡性能，OpenShift AI 会在不同硬件与压缩配置下评估模型并生成 benchmark 数据，帮助用户做出更明智的选择。",
    },
    diagram: {
      src: IMG + "workflow-diagram.svg",
      width: 1398,
      height: 291,
      alt: {
        en: "MaaS workflow from model information and performance insights to compliance audit, metrics comparison, and model deployment",
        zh: "从模型信息与性能洞察，到合规审计、指标对比与模型部署的 MaaS 工作流",
      },
    },
    outroHtml: {
      en: "Models that complete this rigorous testing with full performance records are classified as <strong>Validated Models</strong>. Performance benchmark data will help users clearly understand model capabilities, and supports efficient model comparison, selection and subsequent application.",
      zh: "完成严格测试且具备完整性能记录的模型被归类为 <strong>Validated Models</strong>。性能 benchmark 数据将帮助用户清晰理解模型能力，并支持高效的模型对比、选择与落地使用。",
    },
    challengesTitle: { en: "Challenges", zh: "挑战" },
    goalsTitle: { en: "Goals", zh: "目标" },
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

  window.renderModelProjectContextV3 = function (pc, lang) {
    const d = PROJECT_CONTEXT_V3;
    const diagram = d.diagram;

    const challengeList = (pc.challenges || [])
      .map((item) => `<li>${esc(t(item, lang))}</li>`)
      .join("");
    const goalList = (pc.goals || [])
      .map((item) => `<li>${esc(t(item, lang))}</li>`)
      .join("");

    return `
      <div class="fc-model-pc-v3">
        <section class="fc-model-pc-v3__business">
          <p class="fc-model-pc-v3__intro">${htmlField(d.introHtml, lang)}</p>
          <figure class="fc-model-pc-v3__diagram">
            <img
              class="fc-model-pc-v3__diagram-art"
              src="${esc(diagram.src)}"
              alt="${esc(t(diagram.alt, lang))}"
              loading="lazy"
              decoding="async"
            >
          </figure>
          <p class="fc-model-pc-v3__outro">${htmlField(d.outroHtml, lang)}</p>
        </section>
        <div class="fc-model-context__cards fc-model-pc-v3__cards">
          <article class="fc-model-context__card fc-model-context__card--challenge fc-model-pc-v3__card">
            <h3>${esc(t(d.challengesTitle, lang))}</h3>
            <ul>${challengeList}</ul>
          </article>
          <article class="fc-model-context__card fc-model-context__card--goals fc-model-pc-v3__card">
            <h3>${esc(t(d.goalsTitle, lang))}</h3>
            <ul>${goalList}</ul>
          </article>
        </div>
      </div>`;
  };

  window.renderModelUserResearchV3 = function (ur, lang) {
    const keywords = (ur.persona.keywords || [])
      .map((k) => `<span class="fc-model-ur-v3__kw-pill">${esc(t(k, lang))}</span>`)
      .join("");

    const stories = (ur.stories || [])
      .map((story, i) => {
        const meta = STORY_META[i] || STORY_META[0];
        const body = story.html?.[lang] || story.html?.en || "";
        return `
        <article class="fc-model-ur-v3__story fc-model-ur-v3__story--${meta.tone}">
          <img class="fc-model-ur-v3__story-icon" src="${esc(story.icon)}" alt="" width="48" height="48" loading="lazy">
          <h4 class="fc-model-ur-v3__story-title">${esc(t(meta.title, lang))}</h4>
          <p class="fc-model-ur-v3__story-body">${body}</p>
        </article>`;
      })
      .join("");

    return `
      <div class="fc-model-ur-v3">
        <div class="fc-model-ur-v3__top">
          <div class="fc-model-ur-v3__persona">
            <div class="fc-model-ur-v3__identity">
              <div class="fc-model-ur-v3__avatar" aria-hidden="true">
                <span class="fc-model-ur-v3__avatar-ring"></span>
                <img src="${esc(ur.persona.photo || PERSONA_IMG)}" alt="" width="70" height="70" loading="lazy">
              </div>
              <div class="fc-model-ur-v3__meta">
                <p class="fc-model-ur-v3__name">${esc(t(ur.persona.name, lang))}</p>
                <p class="fc-model-ur-v3__role">${esc(t(ur.persona.role, lang))}</p>
              </div>
            </div>
            <div class="fc-model-ur-v3__kw">${keywords}</div>
            <p class="fc-model-ur-v3__body">${esc(t(ur.persona.body, lang))}</p>
          </div>
          <div class="fc-model-ur-v3__stories">${stories}</div>
        </div>
      </div>`;
  };

  const ICON = "assets/cases/openshift-ai/icons/";
  const EVENT_TRACKING_V3_IMG = "assets/cases/openshift-ai/rbac/event-tracking-v3/";

  const MODEL_EVENT_TRACKING_V3 = {
    title: { en: "Event tracking behind UX", zh: "体验背后的埋点" },
    heartTitle: { en: "Event tracking definition process", zh: "埋点定义流程" },
    heartBodyHtml: {
      en: "To support continuous design improvement, user behavior tracking was implemented using the HEART (Happiness, Engagement, Adoption, Retention, Task Success) framework.<br><br>The data validated key design decisions around IA map, deployment planning workflows, and hardware and compression comparison experiences.",
      zh: "为支撑设计的持续改进，我们采用 HEART（Happiness、Engagement、Adoption、Retention、Task Success）框架实现用户行为追踪。<br><br>相关数据验证了信息架构、部署规划流程，以及硬件与压缩对比体验等关键设计决策。",
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
        circle: "metric-circle-secondary.svg",
        labelHtml: {
          en: "Cross-page/tab<br>navigation",
          zh: "跨页面/标签页<br>导航",
        },
        valueHtml: {
          en: '<p class="fc-event-v3__metric-line"><span class="fc-event-v3__metric-num">↓ 17%</span></p>',
          zh: '<p class="fc-event-v3__metric-line"><span class="fc-event-v3__metric-num">↓ 17%</span></p>',
        },
        heading: { en: "Reduced context switching", zh: "减少上下文切换" },
        caption: {
          en: "Users relied less on external documentation and supporting resources during model evaluation.",
          zh: "用户在模型评估过程中更少依赖外部文档与支持资源。",
        },
      },
      {
        circle: "metric-circle-secondary.svg",
        labelHtml: {
          en: "Time to initiate<br>deployment",
          zh: "发起部署<br>所需时间",
        },
        valueHtml: {
          en: '<p class="fc-event-v3__metric-line"><span class="fc-event-v3__metric-num">↓ 45%</span></p>',
          zh: '<p class="fc-event-v3__metric-line"><span class="fc-event-v3__metric-num">↓ 45%</span></p>',
        },
        heading: { en: "Faster deployment decisions", zh: "更快的部署决策" },
        caption: {
          en: "Users were able to evaluate deployment requirements and initiate deployment more efficiently.",
          zh: "用户能够更高效地评估部署需求并发起部署。",
        },
      },
      {
        circle: "metric-circle-secondary.svg",
        labelHtml: {
          en: "Recommendation adoption rate",
          zh: "推荐配置<br>采用率",
        },
        valueHtml: {
          en: '<p class="fc-event-v3__metric-line"><span class="fc-event-v3__metric-num">32%</span></p>',
          zh: '<p class="fc-event-v3__metric-line"><span class="fc-event-v3__metric-num">32%</span></p>',
        },
        heading: { en: "High adoption of recommended configs", zh: "推荐配置的高采用率" },
        caption: {
          en: "More users selected recommended hardware and compression options when planning deployments.",
          zh: "更多用户在规划部署时选择了推荐的硬件与压缩配置。",
        },
      },
      {
        circle: "metric-circle-secondary.svg",
        labelHtml: {
          en: "Deployment<br>conversion rate",
          zh: "部署<br>转化率",
        },
        valueHtml: {
          en: '<p class="fc-event-v3__metric-line"><span class="fc-event-v3__metric-num">↑ 28%</span></p>',
          zh: '<p class="fc-event-v3__metric-line"><span class="fc-event-v3__metric-num">↑ 28%</span></p>',
        },
        heading: { en: "Higher deployment conversion", zh: "更高的部署转化" },
        caption: {
          en: "More users successfully progressed from model evaluation to deployment.",
          zh: "更多用户成功从模型评估阶段推进到部署。",
        },
      },
    ],
  };

  window.renderModelEventTrackingV3 = function (_block, lang) {
    const d = MODEL_EVENT_TRACKING_V3;
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
        const labelHtml = metric.labelHtml?.[lang] || metric.labelHtml?.en || "";
        const valueHtml = metric.valueHtml?.[lang] || metric.valueHtml?.en || "";
        return `
        <article class="fc-event-v3__metric">
          <div class="fc-event-v3__metric-circle">
            <img class="fc-event-v3__metric-circle-art" src="${EVENT_TRACKING_V3_IMG}${esc(metric.circle)}" alt="" aria-hidden="true" width="260" height="260" loading="lazy">
            <div class="fc-event-v3__metric-inner">
              <p class="fc-event-v3__metric-label">${labelHtml}</p>
              <div class="fc-event-v3__metric-value">${valueHtml}</div>
            </div>
          </div>
          <h4 class="fc-event-v3__metric-heading">${esc(t(metric.heading, lang))}</h4>
          <p class="fc-event-v3__metric-caption">${esc(t(metric.caption, lang))}</p>
        </article>`;
      })
      .join("");

    return `
      <section class="fc-section fc-event-v3 fc-event-v3--model">
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

  function applyModelDetailsV3EventTracking() {
    const cs = window.CASE_OPENSHIFT_DATA?.["model-details-v3"];
    if (!cs?.blocks) return;
    const idx = cs.blocks.findIndex((b) => b?.type === "eventTracking");
    if (idx < 0) return;
    cs.blocks[idx] = { type: "eventTrackingModelV3" };
  }

  applyModelDetailsV3EventTracking();
})();
