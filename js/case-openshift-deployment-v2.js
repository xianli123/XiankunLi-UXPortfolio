/**
 * Deployment Tracking case study V2 — Project context (5143:35709), User research (5101:39574), Evaluation (5101:37887).
 * Loaded only on cases/deployment-tracking-v2.html.
 */
(function () {
  "use strict";

  const IMG = "assets/cases/openshift-ai/deployment/";
  const V2 = IMG + "research-v2/";

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

  const CONTEXT_V2 = {
    title: { en: "What is AI model deployment?", zh: "什么是 AI 模型部署？" },
    body: {
      en: "AI model deployment is a core workflow on AI/ML platforms. Data scientists submit models for online release, while application developers integrate and invoke models after deployment.",
      zh: "AI 模型部署是 AI/ML 平台的核心工作流。数据科学家提交模型上线，应用开发者在部署完成后集成并调用模型。",
    },
    illustration: IMG + "project-context-v2/deployment-illustration.png",
  };

  function renderDeploymentContextV2(lang) {
    return `
      <div class="fc-deploy-context-v2">
        <h3 class="fc-deploy-context-v2__title">${esc(t(CONTEXT_V2.title, lang))}</h3>
        <article class="fc-deploy-context-v2__card">
          <figure class="fc-deploy-context-v2__art">
            <img src="${esc(CONTEXT_V2.illustration)}" alt="" width="150" height="137" loading="lazy">
          </figure>
          <p class="fc-deploy-context-v2__body">${esc(t(CONTEXT_V2.body, lang))}</p>
        </article>
      </div>`;
  }

  const PERSONA_V2 = {
    title: { en: "Persona", zh: "人物角色" },
    intro: {
      en: "This feature is for two most relevant target user personas.",
      zh: "本功能面向两类核心目标用户。",
    },
    cards: [
      {
        avatar: IMG + "research/persona-deployer.png",
        title: { en: "Data scientist (Model deployer)", zh: "数据科学家（模型部署者）" },
        subtitle: { en: "AI model lifecycle", zh: "AI 模型生命周期" },
        body: {
          en: "Responsible for AI model training, experimentation and deployment release. Needs to track real-time deployment progress, identify stalled steps, and troubleshoot failures quickly.",
          zh: "负责 AI 模型训练、实验与部署发布。需要追踪实时部署进度、识别卡住的步骤并快速定位故障。",
        },
      },
      {
        avatar: IMG + "research/persona-consumer.png",
        title: { en: "Application developer (Model consumer)", zh: "应用开发者（模型使用者）" },
        subtitle: { en: "Model consumer", zh: "模型使用者" },
        body: {
          en: "Responsible for application development and system integration. Mainly uses and invokes AI models. Needs to know clearly when a model is successfully deployed, online, and ready for integration.",
          zh: "负责应用开发与系统集成，主要使用并调用 AI 模型。需要清楚了解模型何时成功部署、上线并可供集成。",
        },
      },
    ],
  };

  const CUSTOMER_INSIGHT_V2 = {
    title: { en: "Customer insight", zh: "客户洞察" },
    intro: {
      en: "Real customers provide real user feedback, which we use to continuously improve the product experience.",
      zh: "来自真实客户的反馈，帮助我们持续改进产品体验。",
    },
    board: V2 + "customer-insight-board.png",
    boardWidth: 982,
    boardHeight: 888,
    frameWidth: 1020,
    frameHeight: 925,
  };

  const OBJECTIVES_V2 = {
    title: { en: "Design objectives", zh: "设计目标" },
    narrativeLabel: { en: "User narrative", zh: "用户叙事" },
    cards: [
      {
        icon: V2 + "objective-status.svg",
        title: {
          en: "Help users quickly understand deployment status",
          zh: "帮助用户快速理解部署状态",
        },
        narrative: {
          en: "I want clearer status icons and labels in the list view, so that I can identify which models need attention without opening each one.",
          zh: "我希望列表视图中的状态图标与标签更清晰，无需逐个打开即可识别需关注的模型。",
        },
      },
      {
        icon: V2 + "objective-efficiency.svg",
        title: {
          en: "Improve efficiency of process tracking and model status checking",
          zh: "提升流程追踪与模型状态检查效率",
        },
        narrative: {
          en: "I want statuses to be consistent and understandable, so that I can quickly interpret model readiness.",
          zh: "我希望状态一致且易于理解，以便快速判断模型就绪情况。",
        },
      },
      {
        icon: V2 + "objective-visibility.svg",
        title: {
          en: "Provide clear visibility of workflow stages and exceptions",
          zh: "清晰展示工作流阶段与异常",
        },
        narrative: {
          en: "I want to see a clear, real-time deployment status with stage information, so that I know the deployment is progressing and not stuck.",
          zh: "我希望看到清晰的实时部署状态与阶段信息，以便确认部署在推进且未卡住。",
        },
      },
      {
        icon: V2 + "objective-manual.svg",
        title: {
          en: "Reduce repetitive manual confirmation and operation cost",
          zh: "减少重复的人工确认与操作成本",
        },
        narrative: {
          en: "I want clear and actionable failure messaging, so that I can quickly recover and redeploy successfully.",
          zh: "我希望获得清晰且可操作的失败信息，以便快速恢复并成功重新部署。",
        },
      },
    ],
  };

  function renderPersonaCards(lang) {
    return PERSONA_V2.cards
      .map(
        (p) => `
        <article class="fc-deploy-ur-v2__persona-card">
          <div class="fc-deploy-ur-v2__persona-head">
            <img src="${esc(p.avatar)}" alt="" width="40" height="40" loading="lazy">
            <div class="fc-deploy-ur-v2__persona-meta">
              <p class="fc-deploy-ur-v2__persona-title">${esc(t(p.title, lang))}</p>
              <p class="fc-deploy-ur-v2__persona-subtitle">${esc(t(p.subtitle, lang))}</p>
            </div>
          </div>
          <p class="fc-deploy-ur-v2__persona-body">${esc(t(p.body, lang))}</p>
        </article>`
      )
      .join("");
  }

  function renderObjectiveCards(lang) {
    const label = esc(t(OBJECTIVES_V2.narrativeLabel, lang));
    return OBJECTIVES_V2.cards
      .map(
        (card) => `
        <article class="fc-deploy-ur-v2__objective-card">
          <img class="fc-deploy-ur-v2__objective-art" src="${esc(card.icon)}" alt="" width="180" height="174" loading="lazy">
          <div class="fc-deploy-ur-v2__objective-copy">
            <p class="fc-deploy-ur-v2__objective-title">${esc(t(card.title, lang))}</p>
            <div class="fc-deploy-ur-v2__objective-narrative">
              <p class="fc-deploy-ur-v2__objective-label">${label}</p>
              <p class="fc-deploy-ur-v2__objective-text">${esc(t(card.narrative, lang))}</p>
            </div>
          </div>
        </article>`
      )
      .join("");
  }

  window.renderDeploymentUserResearchV2 = function (lang) {
    const ur = window.DEPLOYMENT_DATA?.research?.userResearch;
    if (!ur) return "";
    const ci = CUSTOMER_INSIGHT_V2;

    const journey = window.renderDeploymentUserJourney?.(lang) || "";
    const journeyHtml = journey.replace(
      "class=\"fc-deploy-uj\"",
      "class=\"fc-deploy-uj fc-deploy-uj--v2\""
    );

    return `
      <div class="fc-deploy-ur-v2">
        <h2 class="fc-section__title fc-deploy-ur-v2__heading">${esc(t(ur.title, lang))}</h2>

        <section class="fc-deploy-ur-v2__persona" aria-labelledby="fc-deploy-persona-v2">
          <h3 id="fc-deploy-persona-v2" class="fc-deploy-ur-v2__subheading">${esc(t(PERSONA_V2.title, lang))}</h3>
          <p class="fc-deploy-ur-v2__intro">${esc(t(PERSONA_V2.intro, lang))}</p>
          <div class="fc-deploy-ur-v2__persona-grid">${renderPersonaCards(lang)}</div>
        </section>

        ${journeyHtml}

        <section class="fc-deploy-ur-v2__insight" aria-labelledby="fc-deploy-insight-v2">
          <div class="fc-deploy-ur-v2__insight-copy">
            <h3 id="fc-deploy-insight-v2" class="fc-deploy-ur-v2__subheading">${esc(t(ci.title, lang))}</h3>
            <p class="fc-deploy-ur-v2__insight-intro">${esc(t(ci.intro, lang))}</p>
          </div>
          <figure class="fc-deploy-ur-v2__insight-fig">
            <div class="fc-deploy-ur-v2__insight-frame" aria-hidden="true"></div>
            <img
              class="fc-deploy-ur-v2__insight-board"
              src="${esc(ci.board)}"
              alt=""
              loading="lazy"
              width="${ci.boardWidth}"
              height="${ci.boardHeight}">
          </figure>
        </section>

        <section class="fc-deploy-ur-v2__objectives" aria-labelledby="fc-deploy-objectives-v2">
          <div class="fc-deploy-ur-v2__objectives-band" aria-hidden="true"></div>
          <div class="fc-deploy-ur-v2__objectives-inner">
            <h3 id="fc-deploy-objectives-v2" class="fc-deploy-ur-v2__subheading">${esc(t(OBJECTIVES_V2.title, lang))}</h3>
            <div class="fc-deploy-ur-v2__objectives-grid">${renderObjectiveCards(lang)}</div>
          </div>
        </section>
      </div>`;
  };

  function renderDeploymentEvaluationV2Section(lang) {
    const d = window.DEPLOYMENT_DATA?.evaluation;
    if (!d) return "";

    const problemsTitle =
      window.DEPLOYMENT_DATA?.research?.projectContext?.cards?.[1]?.title ||
      { en: "What are the existing problems?", zh: "存在哪些问题？" };

    const issues = (d.issues || [])
      .map(
        (item) => `
        <article class="fc-deploy-eval-v2__issue">
          <h4>${esc(t(item.title, lang))}</h4>
          <p>${esc(t(item.text, lang))}</p>
        </article>`
      )
      .join("");

    return `
      <div class="fc-deploy-eval-v2">
        <div class="fc-deploy-eval-v2__stage">
          <h3 class="fc-deploy-eval-v2__subheading">${esc(t(problemsTitle, lang))}</h3>
          <div class="fc-deploy-eval-v2__issues">${issues}</div>
          <figure class="fc-deploy-eval-v2__shot">
            <img src="${esc(d.screenshot)}" alt="" loading="lazy" width="1600" height="568">
          </figure>
        </div>
      </div>`;
  }

  window.renderDeploymentResearch = function (lang) {
    const d = window.DEPLOYMENT_DATA?.research;
    if (!d) return "";

    const pc = d.projectContext;

    return `
      <section class="fc-section fc-deploy-research">
        <h2 class="fc-section__title">${esc(t(pc.title, lang))}</h2>
        ${renderDeploymentContextV2(lang)}
        ${renderDeploymentEvaluationV2Section(lang)}
        ${window.renderDeploymentUserResearchV2?.(lang) || ""}
      </section>`;
  };

  window.renderDeploymentEvaluation = function () {
    return "";
  };

  const EXTENSION_V2_TEXT = {
    intro: {
      html: { en: "", zh: "" },
    },
    examples: [
      {
        body: {
          text: {
            en: "This modal reuses the unified status tracking pattern.",
            zh: "该弹窗复用了统一的状态追踪模式。",
          },
        },
      },
      {
        body: {
          html: {
            en:
              "<p>To handle complex multi-stage workflows, the core status tracking pattern includes expandable steps.</p><p>For example, the <strong><em>Assign pod</em></strong> step in the Workbench workflow is collapsible by default, keeping the high-level progress view clean. When expanded, it reveals nested subtasks.</p>",
            zh:
              "<p>为处理复杂的多阶段工作流，主要步骤中包含可展开步骤。</p><p>例如，Workbench 工作流中的 <strong><em>Assign pod</em></strong> 步骤默认可折叠，保持高层进度视图简洁，展开后显示嵌套子任务。</p>",
          },
        },
      },
    ],
  };

  (function applyExtensionV2Text() {
    const ext = window.DEPLOYMENT_DATA?.ux?.extension;
    if (!ext?.examples) return;
    ext.intro = EXTENSION_V2_TEXT.intro;
    EXTENSION_V2_TEXT.examples.forEach((patch, i) => {
      if (ext.examples[i]) ext.examples[i].body = patch.body;
    });
  })();

  (function syncDeploymentTrackingV3FromV2() {
    const src = window.CASE_OPENSHIFT_DATA?.["deployment-tracking-v2"];
    if (!src) return;
    window.CASE_OPENSHIFT_DATA["deployment-tracking-v3"] = JSON.parse(JSON.stringify(src));
    const target = window.CASE_OPENSHIFT_DATA["deployment-tracking-v3"];
    target.id = "deployment-tracking-v3";
    target.version = 3;
    target.codeName = {
      en: "AI Model Deployment Tracking V3",
      zh: "AI 模型部署状态追踪 V3",
    };
  })();
})();
