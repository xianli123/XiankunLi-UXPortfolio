/**
 * Model details case study V2 — copy overrides & section renderers.
 * Loaded only on cases/model-details-v2.html.
 */
(function () {
  "use strict";

  const IA_V2 = "assets/cases/openshift-ai/model-details/ia-v2/";
  const OBJECTIVES_IMG = "assets/cases/openshift-ai/model-details/objectives-v2/";
  const OBJECTIVES_ICON = "assets/cases/openshift-ai/icons/model-details/";
  const PURPOSE_IMG = "assets/cases/openshift-ai/model-details/purpose-v2/data-analysis.png";

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

  const IA_MAP_V2 = {
    title: { en: "IA map design", zh: "信息架构设计" },
    bodyHtml: {
      en: 'Designed the model details <strong>Information Architecture</strong> based on user research and task analysis. The structure balances business and user needs, transforming complex model management into an intuitive workflow that minimizes cognitive load.',
      zh: "基于用户研究与任务分析，设计了模型详情的 <strong>Information Architecture</strong>（信息架构）。该结构在平衡业务与用户需求的同时，将复杂的模型管理转化为直观工作流，降低认知负荷。",
    },
    goalsTitle: { en: "Goals", zh: "目标" },
    goals: [
      {
        icon: IA_V2 + "icon-preview.svg",
        text: { en: "Quickly locate key information", zh: "快速定位关键信息" },
      },
      {
        icon: IA_V2 + "icon-rocket.svg",
        text: { en: "Efficiently complete core tasks", zh: "高效完成核心任务" },
      },
      {
        icon: IA_V2 + "icon-quickreply.svg",
        text: { en: "Reducing cognitive load and operational costs", zh: "降低认知负荷与操作成本" },
      },
    ],
    diagram: {
      src: IA_V2 + "ia-map-diagram.png",
      width: 1050,
      height: 834,
      alt: "Validated model details page information architecture map",
    },
  };

  window.renderModelIaMapV2 = function (_block, lang) {
    const d = IA_MAP_V2;
    const goals = d.goals
      .map(
        (goal) => `
        <article class="fc-model-ia-v2__goal">
          <img class="fc-model-ia-v2__goal-icon" src="${esc(goal.icon)}" alt="" width="32" height="32" loading="lazy">
          <p class="fc-model-ia-v2__goal-text">${esc(t(goal.text, lang))}</p>
        </article>`
      )
      .join("");
    const diagram = d.diagram;
    const diagramSrc2x = diagram.src.replace(/\.png$/i, "@2x.png");

    return `
      <section class="fc-section fc-model-ia fc-model-ia--v2">
        <div class="fc-model-ia__grid">
          <div class="fc-model-ia__copy">
            <h2 class="fc-section__title">${esc(t(d.title, lang))}</h2>
            <p class="fc-model-ia-v2__body">${t(d.bodyHtml, lang)}</p>
            <h3 class="fc-model-ia-v2__goals-title">${esc(t(d.goalsTitle, lang))}</h3>
            <div class="fc-model-ia-v2__goals">${goals}</div>
          </div>
          <figure class="fc-model-ia__diagram fc-model-ia-v2__diagram">
            <img src="${esc(diagram.src)}" srcset="${esc(diagram.src)} 1x, ${esc(diagramSrc2x)} 2x" alt="${esc(diagram.alt)}" width="${diagram.width}" height="${diagram.height}" loading="lazy">
          </figure>
        </div>
      </section>`;
  };

  const OBJECTIVES_V2 = {
    title: { en: "Design objectives", zh: "设计目标" },
    cards: [
      {
        frame: "card-frame.svg",
        icon: OBJECTIVES_ICON + "view-in-ar.svg",
        text: {
          en: "Display intuitive and comprehensive performance benchmark data",
          zh: "展示直观且全面的性能 benchmark 数据",
        },
      },
      {
        frame: "card-frame.svg",
        icon: OBJECTIVES_ICON + "theaters.svg",
        text: {
          en: "Enable users to clearly compare and select the most matched hardware",
          zh: "帮助用户清晰对比并选择最合适的硬件",
        },
      },
      {
        frame: "card-frame.svg",
        icon: OBJECTIVES_ICON + "balance.svg",
        text: {
          en: "Facilitate easy comparison among different validated models",
          zh: "便于在不同 Validated Models 间对比",
        },
      },
      {
        frame: "card-frame.svg",
        icon: OBJECTIVES_ICON + "integration-instructions.svg",
        text: {
          en: "Improve the efficiency of model selection, registration and deployment",
          zh: "提升模型选择、注册与部署效率",
        },
      },
    ],
  };

  window.renderModelPurposeV2 = function (purpose, lang) {
    if (!purpose) return "";
    return `
      <div class="fc-model-purpose-v2">
        <img class="fc-model-purpose-v2__illus" src="${esc(PURPOSE_IMG)}" alt="" loading="lazy" width="180" height="180">
        <div class="fc-model-purpose-v2__copy">
          <h3 class="fc-model-purpose-v2__title">${esc(t(purpose.title, lang))}</h3>
          <p class="fc-model-purpose-v2__body">${esc(t(purpose.body, lang))}</p>
        </div>
      </div>`;
  };

  window.renderModelObjectivesV2 = function (_obj, lang) {
    const d = OBJECTIVES_V2;
    const cards = d.cards
      .map(
        (card) => `
        <article class="fc-model-obj-v2__card">
          <div class="fc-model-obj-v2__stage">
            <img class="fc-model-obj-v2__frame" src="${OBJECTIVES_IMG}${esc(card.frame)}" alt="" loading="lazy" width="368" height="164">
            <div class="fc-model-obj-v2__badge">
              <div class="fc-model-obj-v2__badge-ring" aria-hidden="true"></div>
              <img class="fc-model-obj-v2__badge-icon" src="${esc(card.icon)}" alt="" loading="lazy" width="48" height="48">
            </div>
            <div class="fc-model-obj-v2__copy">
              <p class="fc-model-obj-v2__card-text">${esc(t(card.text, lang))}</p>
            </div>
          </div>
        </article>`
      )
      .join("");

    return `
      <div class="fc-model-obj-v2">
        <h2 class="fc-section__title fc-model-research__gap--objectives">${esc(t(d.title, lang))}</h2>
        <div class="fc-model-obj-v2__grid">${cards}</div>
      </div>`;
  };

  function applyModelDetailsV2Overview() {
    const overview = window.MODEL_DETAILS_DATA?.design?.overview;
    if (!overview) return;

    overview.intro.html = {
      en: 'This "decision-priority" <strong>Overview</strong> tab layout aligns information hierarchy with user intent.',
      zh: "根据用户决策的优先级，<strong>Overview</strong> 标签布局将信息层级与用户意图对齐。",
    };

    const central = overview.items?.[1];
    if (central?.html) {
      central.html.en =
        'Dominates the visual hierarchy, addressing "<span class="fc-model-design__accent">Is this model suitable for my use case?</span>" by presenting core attributes and visual previews to support fast judgments.';
      central.html.zh =
        "占据视觉层级中心，通过核心属性与预览回答「<span class=\"fc-model-design__accent\">是否适合我的用例？</span>」，支持快速判断。";
    }

    const sidebar = overview.items?.[2];
    if (sidebar?.html) {
      sidebar.html.en =
        'Groups secondary yet critical details by relevance. It clarifies "<span class="fc-model-design__accent fc-model-design__accent--violet">Where does it come from, and what is its background?</span>" and provides the model\u2019s background info.';
      sidebar.html.zh =
        "按相关性归组次要但关键的信息，说明「<span class=\"fc-model-design__accent fc-model-design__accent--violet\">来源与背景？</span>」并提供模型背景信息。";
    }
  }

  function applyModelDetailsV2ChallengePanel0() {
    const panel = window.MODEL_DETAILS_DATA?.design?.challengeSolution?.panels?.[0];
    if (!panel) return;

    panel.challenge = {
      en: "How to organize the large amount of information on the right side?",
      zh: "如何组织并呈现右侧信息过载区域？",
    };
    panel.solution.html = {
      en: "<p>Guided by card-sorting insights, I organized the information into four user-centric categories, which are presented across three distinct UI cards.</p>",
      zh: "<p>基于卡片分类洞察，我将信息整理为四个以用户为中心的类别，并呈现在三个独立的 UI 卡片中。</p>",
    };
  }

  function applyModelDetailsV2ChallengePanel1() {
    const panel = window.MODEL_DETAILS_DATA?.design?.challengeSolution?.panels?.[1];
    if (!panel) return;

    panel.solution.html = {
      en: "<p>Sidebar card ordering stems from user research (card sorting). This alignment mirrors natural prioritization, reducing decision friction and cognitive load.</p><ul><li>Model details</li><li>Recommended hardware configuration</li><li>Model tree</li></ul>",
      zh: "<p>侧栏卡片顺序源于用户研究（card sorting），更贴近用户的自然优先级，降低决策摩擦与认知负荷。</p><ul><li>Model details</li><li>Recommended hardware configuration</li><li>Model tree</li></ul>",
    };
  }

  function applyModelDetailsV2Performance() {
    const performance = window.MODEL_DETAILS_DATA?.design?.performance;
    if (!performance) return;

    performance.intro = [
      {
        en: "Empowers developers with data-driven evidence to select the optimal hardware and model compression.",
        zh: "为开发者提供数据驱动依据，以选择最优硬件与压缩模式。",
      },
      {
        en: "Utilizes progressive disclosure—via summary cards and collapsible sections—for an intuitive, high-level to deep-dive experience.",
        zh: "通过摘要卡片与可折叠区块实现渐进式披露，支持从高层概览到深度查看的直观体验。",
      },
    ];

    const [hardware, compression, advanced] = performance.items || [];
    if (hardware?.body) {
      hardware.body.en =
        "AI deployment is a balancing act between cost and performance. This table centralizes complex multi-dimensional data into a single scannable view.";
      hardware.body.zh = "AI 部署需在成本与性能间权衡。该表将复杂多维数据集中为可扫描视图。";
    }
    if (compression?.body) {
      compression.body.en =
        "To visualize the trade-offs between compression level and performance/accuracy. The side-by-side card provides an immediate comparison.";
      compression.body.zh = "可视化压缩级别与性能/精度之间的权衡，并排卡片便于即时对比。";
    }
    if (advanced?.body) {
      advanced.body.en =
        'Providing deep-dive technical transparency through visualization. Keeps the initial page load clean while allowing power users to dig deeper into "Performance insights".';
      advanced.body.zh =
        "通过可视化提供深度技术透明度，保持首屏简洁，同时让高级用户深入 Performance insights。";
    }
  }

  function applyModelDetailsV2BenchmarkCognitiveLoad() {
    const cs = window.MODEL_DETAILS_DATA?.design?.benchmark?.challengeSolution;
    if (!cs) return;

    cs.challenge.html = {
      en: '<p><strong>Too many metrics, too many hardware choices</strong></p><p>AI engineers are stuck in &quot;analysis paralysis&quot; trying to find the best deployment path within an unorganized, 27-column benchmark dataset.</p>',
      zh: "<p><strong>指标过多、硬件选项过多</strong></p><p>AI 工程师在缺乏组织的 27 列 benchmark 数据集中寻找最佳部署路径时，容易陷入「分析瘫痪」。</p>",
    };

    const [columns, filters, recommended] = cs.solutions || [];
    if (columns?.body?.html) {
      columns.body.html = {
        en: "<p>The default view highlights essential parameters for quick comparison. Users can customize the column layouts, navigate four collapsible categories, or easily reset the view using the 'Restore defaults' button.</p>",
        zh: "<p>默认视图突出关键参数以便快速对比。用户可以自定义展示哪些列。四个可折叠的分类便于区分不同参数类型。通过「Restore defaults」按钮可以重置视图。</p>",
      };
    }
    if (filters?.body) {
      filters.body.en =
        "To simplify vast configuration options into key constraints, helping users narrow down candidates based on specific hardware type, latency, RPS, and workload requirements.";
      filters.body.zh =
        "将海量配置选项简化为关键约束，帮助用户依据具体的硬件类型、延迟（latency）、RPS 与工作负载需求缩小候选范围。";
    }
    if (recommended?.body) {
      recommended.body.en =
        "A default recommendation is provided. Instead of enforcing a single optimal result, we offer users a clear starting point that is more actionable.";
      recommended.body.zh =
        "提供默认推荐。我们不强制单一最优结果，而是为用户提供更清晰、更可执行的起点。";
    }
  }

  function applyModelDetailsV2HeaderIa() {
    const goals = window.MODEL_DETAILS_DATA?.design?.headerIa?.userGoals;
    if (!goals?.[0]) return;

    delete goals[0].html;
    goals[0].body = {
      en: "It\u2019s structured by user tasks, the tabs let users switch quickly between high-level summaries and in-depth performance analysis.",
      zh: "按用户任务组织：标签页可在高层摘要与深度性能分析间快速切换。",
    };

    goals[1].body = {
      en: "A \u201cValidated\u201d label beside the model name uses magenta as a consistent signal of verification status across the platform.",
      zh: "模型名称旁的「Validated」标签以品红（magenta）作为全平台一致的验证状态信号。",
    };

    delete goals[2].html;
    goals[2].body = {
      en: "User research shows 83.3% of users prioritize model deployment vs. only 8.3% for registration.",
      zh: "用户研究显示 83.3% 的用户最终目的是部署模型，仅 8.3% 的用户目的是注册模型。",
    };
  }

  function applyModelDetailsV2Compression() {
    const notes = window.MODEL_DETAILS_DATA?.design?.compression?.notes;
    if (!notes?.[0]) return;

    notes[0].body = {
      en: "A dedicated section compares compression levels with accuracy implications.",
      zh: "专设区域对比各压缩级别及精度影响。",
    };
    notes[1].body = {
      en: "Advanced info are collapsed by default to reduce visual noise. Users can expand them to view details and compare data, keeping the main workflow clean.",
      zh: "高级信息默认折叠以降低视觉干扰，用户可展开查看详情并对比数据，保持主流程简洁。",
    };
    notes[2].body = {
      en: "Interactive line charts visualize latency vs. requested RPS, with clear markers for recommended operating points.",
      zh: "交互式折线图展示延迟与请求 RPS 的关系，并以清晰标记标出推荐运行点。",
    };
    notes[3].body = {
      en: "Bar charts consolidate accuracy metrics across benchmarks in a scannable view.",
      zh: "柱状图将各 benchmark 的精度指标整合为便于快速浏览的视图。",
    };
    notes[4].body = {
      en: "Clicking the legend toggles the performance data of the corresponding compression level on and off.",
      zh: "点击图例可开关对应压缩级别的性能数据。",
    };
  }

  function applyModelDetailsV2BenchmarkIntro() {
    const intro = window.MODEL_DETAILS_DATA?.design?.benchmark?.intro;
    if (!intro) return;
    intro.zh =
      "高密度表格便于横向扫读对比，堆叠列将可复现性信息与性能指标并列展示。";
  }

  applyModelDetailsV2Overview();
  applyModelDetailsV2HeaderIa();
  applyModelDetailsV2ChallengePanel0();
  applyModelDetailsV2ChallengePanel1();
  applyModelDetailsV2Performance();
  applyModelDetailsV2Compression();
  applyModelDetailsV2BenchmarkIntro();
  applyModelDetailsV2BenchmarkCognitiveLoad();

  (function syncModelDetailsV3FromV2() {
    const src = window.CASE_OPENSHIFT_DATA?.["model-details-v2"];
    if (!src) return;
    window.CASE_OPENSHIFT_DATA["model-details-v3"] = JSON.parse(JSON.stringify(src));
    const target = window.CASE_OPENSHIFT_DATA["model-details-v3"];
    target.id = "model-details-v3";
    target.version = 3;
    target.codeName = {
      en: "Validated Model's Details Design V3",
      zh: "Validated Models 详情页设计 V3",
    };
  })();
})();
