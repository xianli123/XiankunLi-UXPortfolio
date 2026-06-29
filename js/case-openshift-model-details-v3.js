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
})();
