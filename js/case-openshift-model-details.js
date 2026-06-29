/**
 * Validated Model's Details — case data & renderers (Figma 3714:15250)
 */
(function () {
  "use strict";

  const ICON = "assets/cases/openshift-ai/icons/model-details/";
  const IMG = "assets/cases/openshift-ai/model-details/";
  const DESIGN = IMG + "design/";
  const BENCHMARK = DESIGN + "benchmark/";
  const COMPRESSION = DESIGN + "compression/";
  const PERF_FINAL = DESIGN + "performance-final/";
  const HEADER = IMG + "header/";

  window.MODEL_DETAILS_DATA = {
    research: {
      projectContext: {
        title: { en: "Project context", zh: "项目背景" },
        body: {
          html: {
            en: "<strong>Model as a Service (MaaS)</strong> provides cloud-based access to pre-trained AI/ML models. To ensure security and balance performance, OpenShift AI evaluates models across various hardware and compression profiles to generate benchmark data. This empowers users to make informed choices. Models that complete this rigorous testing with full performance records are classified as <strong>Validated Models</strong>.",
            zh: "<strong>Model as a Service (MaaS)</strong> 提供基于云平台的预训练 AI/ML 模型访问服务。为保障安全并平衡性能，OpenShift AI 会在不同硬件与压缩配置下评估模型并生成 benchmark 数据，帮助用户做出更明智的选择。完成严格测试且具备完整性能记录的模型被归类为 <strong>Validated Models</strong>。",
          },
        },
        challenges: [
          { en: "High information density with unclear visual hierarchy", zh: "信息密度高但视觉层级不清晰" },
          { en: "Difficult hardware comparisons without a unified views", zh: "缺少统一视图，难以进行硬件对比" },
          { en: "Performance data scattered with no fast path to insight", zh: "性能数据分散，难以快速读懂关键信息" },
        ],
        goals: [
          { en: "Cut configuration decision time", zh: "缩短配置决策时间" },
          { en: "Increase adoption of hardware optimization workflows", zh: "提升硬件优化流程的使用率" },
          { en: "Establish an extensible design system", zh: "建立可扩展的设计体系" },
        ],
        purpose: {
          title: { en: "Purpose of the validated model details page", zh: "Validated Models 详情页的设计目标" },
          body: {
            en: "The detail page presents intuitive performance benchmark data of validated models. It helps users clearly understand model capabilities, and supports efficient model comparison, selection and subsequent application.",
            zh: "详情页以直观方式呈现 Validated Models 的性能 benchmark 数据，帮助用户清晰理解模型能力，并支持高效的模型对比、选择与落地使用。",
          },
        },
      },
      userResearch: {
        title: { en: "User research", zh: "用户研究" },
        personaTitle: { en: "Persona and user story", zh: "人物角色与用户故事" },
        persona: {
          name: { en: "Alex", zh: "Alex" },
          role: { en: "AI engineer", zh: "AI 工程师" },
          photo: IMG + "research/persona-alex.png",
          body: {
            en: "I wants to view and compare model performance & accuracy across different hardware profiles and compression levels, identify optimal configurations, and directly complete model registration and deployment on the page.",
            zh: "希望在不同硬件配置与压缩级别下查看并对比模型性能与精度，识别最优配置，并直接在页面上完成模型注册与部署。",
          },
          keywords: [
            { en: "Evaluation-focused", zh: "以评估为导向" },
            { en: "Ships models end-to-end", zh: "覆盖模型全流程上线" },
            { en: "Evidence-led", zh: "证据驱动" },
            { en: "Scenario-based choices", zh: "基于场景的选择" },
          ],
        },
        stories: [
          {
            icon: ICON + "view-in-ar.svg",
            html: {
              en: 'As an AI engineer, I want to <strong>view model performance benchmarks</strong> across different hardware types and compression levels, so that I can assess model behavior under diverse runtime scenarios.',
              zh: "作为 AI 工程师，我希望<strong>查看模型性能 benchmark</strong>（跨硬件类型与压缩级别），以便评估不同运行场景下的模型行为。",
            },
          },
          {
            icon: ICON + "theaters.svg",
            html: {
              en: 'As an AI engineer, I want to <strong>identify the optimal hardware configuration</strong> based on hardware type, RPS and SLO requirements, so that I can plan production deployments efficiently.',
              zh: "作为 AI 工程师，我希望<strong>识别最优硬件配置</strong>（基于硬件类型、RPS 与 SLO），以便高效规划生产部署。",
            },
          },
          {
            icon: ICON + "balance.svg",
            html: {
              en: 'As an AI engineer, I want to <strong>compare accuracy and inference metrics</strong> across compression levels (FP16, FP8, INT8, INT4), so that I can balance accuracy trade-offs and performance gains to select the best-fit model.',
              zh: "作为 AI 工程师，我希望<strong>对比不同压缩级别</strong>（FP16、FP8、INT8、INT4）的精度与推理指标，以平衡精度权衡与性能收益。",
            },
          },
          {
            icon: ICON + "integration-instructions.svg",
            html: {
              en: 'As an AI engineer, I want to <strong>directly register and deploy validated models</strong> on the page, so that I can seamlessly proceed to subsequent workflow steps after evaluation.',
              zh: "作为 AI 工程师，我希望<strong>在页面上直接注册并部署</strong> Validated model，以便评估后无缝进入后续流程。",
            },
          },
        ],
        journeyTitle: { en: "User Journey", zh: "用户旅程" },
        journeyIntro: {
          en: "Journey · Validated model & benchmarks",
          zh: "用户旅程 · Validated Models 与 benchmark",
        },
        phases: [
          {
            phase: { en: "Phase 1 · Discover", zh: "阶段 1 · 发现" },
            tone: "discover",
            objective: {
              en: "Land on a candidate validated model that fits the use case and constraints before deep benchmark reading.",
              zh: "在深入阅读 benchmark 前，先锁定符合用例与约束的候选 Validated Model。",
            },
            intent: {
              en: "Shortlist from the catalog using browse or filters (use case, hardware type, SLO hints). Compare cards and select one model to evaluate with benchmark evidence next.",
              zh: "通过浏览或筛选（用例、硬件类型、SLO 提示）在目录中圈定候选，对比卡片并选定一个模型，下一步用 benchmark 证据评估。",
            },
            risks: {
              en: "Easy to confuse validated vs experimental listings. And filter wording may not match how teams describe workloads, slowing consensus.",
              zh: "易混淆 validated 与 experimental 列表，筛选文案可能与团队描述工作负载的方式不一致，拖慢团队对齐。",
            },
          },
          {
            phase: { en: "Phase 2 · Evidence", zh: "阶段 2 · 证据" },
            tone: "evidence",
            objective: {
              en: "Trust benchmark numbers and understand what was measured so comparisons are fair.",
              zh: "理解 benchmark 数据及其测量方法，使对比公平可信。",
            },
            intent: {
              html: {
                en: 'Use <strong>Overview</strong> for specs and open <strong>Performance insights</strong> for benchmark-linked charts. Use validation script or CLI/config snippets when offered to align local checks with published runs.',
                zh: "用 <strong>Overview</strong> 查看规格，打开 <strong>Performance insights</strong> 查看 benchmark 图表；如有验证脚本或 CLI/配置片段，用于将本地检查结果与已发布运行结果对齐。",
              },
            },
            risks: {
              en: "Benchmark setup (hardware, batching, data slice) varies by model — hard to compare or reproduce on the stack without clear artifact links.",
              zh: "benchmark 设置（硬件、batch、数据切片）因模型而异——缺少清晰的 benchmark 记录/配置链接时，难以在相同环境中对比或复现。",
            },
          },
          {
            phase: { en: "Phase 3 · Configure", zh: "阶段 3 · 配置" },
            tone: "configure",
            objective: {
              en: "Choose hardware, compression, and SLO tradeoffs with transparent recommendation logic.",
              zh: "在透明推荐逻辑下选择硬件、压缩与 SLO 权衡。",
            },
            intent: {
              en: "Filter and compare configurations and accuracy vs compression. And inherit catalog filters where applicable or accept recommended strongest defaults.",
              zh: "筛选并对比配置及精度与压缩关系，在适用时继承目录筛选或采用系统推荐的最优默认配置。",
            },
            risks: {
              en: "High cognitive load across dimensions. Stakeholders ask why a configuration is recommended without plain-language rationale.",
              zh: "多维度认知负荷高，干系人常追问推荐配置原因而缺少通俗说明。",
            },
          },
          {
            phase: { en: "Phase 4 · HWP fit", zh: "阶段 4 · HWP 匹配" },
            tone: "hwp",
            objective: {
              en: "Match the chosen hardware definition to an approved hardware profile (HWP) or an explicit request path.",
              zh: "将所选硬件定义匹配到已批准的硬件配置（HWP）或明确的申请路径。",
            },
            intent: {
              en: "Check whether an available HWP matches the desired config. If not, export details and request HWP, otherwise select the HWP for deployment.",
              zh: "检查是否有可用 HWP 匹配目标配置，若无则导出详情并申请 HWP，否则选择 HWP 用于部署。",
            },
            risks: {
              en: "Deploy blocked when no HWP exists. Unclear SLA, ownership, or funding for new profiles creates stakeholder anxiety.",
              zh: "无 HWP 时部署受阻，新 profile 的 SLA、归属或预算不清晰会引发干系人焦虑。",
            },
          },
          {
            phase: { en: "Phase 5 · Deploy", zh: "阶段 5 · 部署" },
            tone: "deploy",
            objective: {
              en: "Run the model with chosen HWP and compression, grounded in benchmark assumptions for ongoing monitoring.",
              zh: "以所选 HWP 与压缩运行模型，并基于 benchmark 假设建立持续监控基线。",
            },
            intent: {
              en: "Launch deployment with HWP, compression, and environment settings. Connect ops monitoring to the same SLO language used in benchmarks where possible.",
              zh: "以 HWP、压缩与环境设置启动部署，尽可能让运维监控指标与 benchmark 中的 SLO 定义保持一致。",
            },
            risks: {
              en: "Runtime drift vs benchmark claims. Handoff between model owners and platform/Ops for profile lifecycle and re-validation.",
              zh: "实际运行表现与 benchmark 结论不一致；模型负责人与平台/Ops 在配置生命周期与再验证流程上的协作衔接不清。",
            },
          },
        ],
      },
      objectives: {
        title: { en: "Design objectives", zh: "设计目标" },
        cards: [
          { icon: ICON + "view-in-ar.svg", text: { en: "Display intuitive and comprehensive performance benchmark data", zh: "展示直观且全面的性能 benchmark 数据" } },
          { icon: ICON + "theaters.svg", text: { en: "Enable users to clearly compare and select the most matched hardware", zh: "帮助用户清晰对比并选择最合适的硬件" } },
          { icon: ICON + "balance.svg", text: { en: "Facilitate easy comparison among different validated models", zh: "便于在不同 Validated Models 间对比" } },
          { icon: ICON + "integration-instructions.svg", text: { en: "Improve the efficiency of model selection, registration and deployment", zh: "提升模型选择、注册与部署效率" } },
        ],
      },
    },
    iaMap: {
      title: { en: "IA map design", zh: "信息架构图" },
      body: {
        en: "The information architecture of the model details page was developed through user research and task analysis to ensure platform alignment.\n\nBy prioritizing user needs and business logic while maintaining clarity and consistency, this IA simplifies intricate model management into an intuitive workflow that minimizes cognitive effort.",
        zh: "基于用户研究与任务分析，模型详情页的信息架构在保持清晰一致的同时，将复杂的模型管理简化为直观工作流，降低认知负荷。",
      },
      goalsTitle: { en: "Goals", zh: "目标" },
      goals: [
        { en: "Quickly locate key information", zh: "快速定位关键信息" },
        { en: "Efficiently complete core tasks", zh: "高效完成核心任务" },
        { en: "Reducing cognitive load and operational costs", zh: "降低认知负荷与操作成本" },
      ],
      diagram: IMG + "ia/ia-map-diagram.png",
    },
    design: {
      figma: "3870:15487",
      title: { en: "Design breakdown", zh: "设计拆解" },
      headerIa: {
        figma: "4233:51055",
        title: { en: "Page header and IA structure", zh: "页面顶部与信息架构" },
        pageHeader: {
          figma: "40000505:368454",
          modelIcon: HEADER + "model-icon-validated.png",
          tagIcon: HEADER + "tag-icon.png",
          breadcrumbCatalog: { en: "Model catalog", zh: "Model catalog" },
          modelName: { en: "Qwen2.5-7B-Instruct-FP8-dynamic", zh: "Qwen2.5-7B-Instruct-FP8-dynamic" },
          version: "1.4.0",
          validatedLabel: { en: "Validated", zh: "Validated" },
          description: { en: "Description goes here.", zh: "Description goes here." },
          deployLabel: { en: "Deploy model", zh: "Deploy model" },
          registerLabel: { en: "Register model", zh: "Register model" },
          tabs: [
            { label: { en: "Overview", zh: "Overview" }, active: true },
            { label: { en: "Performance insights", zh: "Performance insights" }, active: false },
          ],
          markers: [
            { num: 1, left: 99, top: 120 },
            { num: 2, left: 572, top: 18 },
            { num: 3, right: 150, top: 17 },
          ],
        },
        userGoals: [
        {
          num: 1,
          html: {
            en: 'It\u2019s structured by user tasks, the tabs let users switch quickly between high-level summaries and in-depth performance analysis. <strong>Overview</strong> enables quick evaluation, while <strong>Performance insights</strong> supports detailed hardware and metric comparison for AI engineers.',
            zh: "按用户任务组织：标签页可在高层摘要与深度性能分析间快速切换。<strong>Overview</strong> 支持快速评估，<strong>Performance insights</strong> 支持 AI 工程师进行硬件与指标细粒度对比。",
          },
          mock: { src: DESIGN + "goals-tabs.svg", width: 493, height: 158, alt: "Overview and Performance insights tabs" },
        },
        {
          num: 2,
          body: {
            en: 'A "Validated" label beside the model name uses magenta as a consistent signal of verification status across the platform. Users can assess status without hunting\u2014faster, safer decisions with strong contrast against neutral UI.',
            zh: "模型名称旁的 “Validated” 标签以品红（magenta）作为全平台一致的验证状态信号，用户无需四处查找即可判断状态，在中性 UI 上形成强对比，决策更快、更安全。",
          },
          mock: { src: DESIGN + "goals-validated.png", width: 507, height: 215, alt: "Validated label and popover" },
        },
        {
          num: 3,
          html: {
            en: "User research shows 83.3% of users prioritize model deployment vs. only 8.3% for registration. Based on this insight, I made <strong>Deploy model</strong> the primary button.",
            zh: "用户研究显示 83.3% 的用户最终目的是部署模型，仅 8.3% 的用户目的是注册模型。基于此将 <strong>Deploy model</strong> 设为主按钮。",
          },
          mock: { src: DESIGN + "goals-chart.svg", width: 1002, height: 564, alt: "Users\u2019 end goal radial chart" },
        },
        ],
      },
      overview: {
        title: { en: "Overview of validated models", zh: "Validated models 概览" },
        intro: {
          html: {
            en: 'This "decision-priority" <strong>Overview</strong> tab layout aligns information hierarchy with user intent, putting high-impact details first to cut decision time and cognitive load.',
            zh: "这一以决策优先级为导向的 <strong>Overview</strong> 标签布局，将信息层级与用户意图对齐，把高影响信息前置，缩短决策时间并降低认知负荷。",
          },
        },
        items: [
          {
            icon: ICON + "reorder.svg",
            title: { en: "Top section (Model description)", zh: "顶部区域（Model description）" },
            html: {
              en: 'Immediately answers "<span class="fc-model-design__accent">What is this model?</span>", letting users quickly grasp the model\u2019s purpose and key characteristics without sifting through details.',
              zh: "直接回答「<span class=\"fc-model-design__accent\">这是什么模型？</span>」，让用户快速理解模型用途与关键特征。",
            },
          },
          {
            icon: ICON + "offline-pin.svg",
            title: { en: "Central section (Model card)", zh: "中央区域（Model card）" },
            html: {
              en: 'Dominates the visual hierarchy, addressing "<span class="fc-model-design__accent">Is this model suitable for my use case?</span>" by presenting core attributes and visual previews to support fast, high-confidence judgments.',
              zh: "占据视觉层级中心，通过核心属性与预览回答「<span class=\"fc-model-design__accent\">是否适合我的用例？</span>」。",
            },
          },
          {
            icon: ICON + "policy.svg",
            title: { en: "Right sidebar", zh: "右侧边栏" },
            html: {
              en: 'Groups secondary yet critical details by relevance. It clarifies "<span class="fc-model-design__accent fc-model-design__accent--violet">Where does it come from, and what is its background?</span>" and provides the model\u2019s background information.',
              zh: "按相关性归组次要但关键的信息，说明「<span class=\"fc-model-design__accent fc-model-design__accent--violet\">模型来源与背景？</span>」并提供模型背景信息。",
            },
          },
        ],
      },
      overviewFinal: {
        title: { en: "Final design of \u2018Overview\u2019 tab", zh: "Overview 页面最终设计" },
        image: { src: DESIGN + "overview-final.svg", width: 1600, height: 1442 },
      },
      challengeSolution: {
        figma: "3870:15855",
        badge: { en: "Challenge and solution", zh: "Challenge and solution" },
        badgeIcon: ICON + "challenge-solution.svg",
        panels: [
          {
            tableMap: {
              src: DESIGN + "challenge-table-map.svg",
              width: 994,
              height: 464,
              alt: "Card sorting consensus table with sidebar group mapping",
            },
            challenge: {
              en: "How to group the large amount of information on the right side?",
              zh: "如何对右侧大量信息进行分组？",
            },
            solution: {
              html: {
                en: "<p>To organize the sidebar\u2019s complex metadata, I categorized information into four user-centric groups based on consensus from card-sorting research, then grouped them into 3 cards:</p><ul><li>Recommended hardware configuration</li><li>Model details</li><li>Model tree</li></ul>",
                zh: "<p>为整理侧栏复杂元数据，我基于卡片分类研究的共识将信息分为四个以用户为中心的分组，再归纳为 3 张卡片：</p><ul><li>Recommended hardware configuration</li><li>Model details</li><li>Model tree</li></ul>",
              },
            },
            copyWidth: 446,
          },
          {
            reverse: true,
            copyWidth: 616,
            challenge: {
              en: "How to determine the order of these complex pieces of information?",
              zh: "如何确定这些复杂信息的顺序？",
            },
            solution: {
              html: {
                en: "<p>The sidebar card order is directly informed by user research <span class=\"fc-model-challenge__paren\">(</span>card sorting research<span class=\"fc-model-challenge__paren\">)</span> as shown in the chart. This order balances user needs, reducing decision friction and cognitive load by aligning with how users naturally prioritize information.</p><p class=\"fc-model-challenge__order-line\">Model details&nbsp;&nbsp;|&nbsp;&nbsp;Recommended hardware configs&nbsp;&nbsp;|&nbsp;&nbsp;Model tree</p>",
                zh: "<p>侧栏卡片顺序直接来自用户研究<span class=\"fc-model-challenge__paren\">（</span>card sorting research<span class=\"fc-model-challenge__paren\">）</span>，如图表所示。该顺序平衡用户需求，通过与用户自然的信息优先级对齐来降低决策摩擦与认知负荷。</p><p class=\"fc-model-challenge__order-line\">Model details&nbsp;&nbsp;|&nbsp;&nbsp;Recommended hardware configs&nbsp;&nbsp;|&nbsp;&nbsp;Model tree</p>",
              },
            },
            chart: {
              src: DESIGN + "challenge-card-sort-chart.svg",
              width: 824,
              height: 353,
              alt: "Card sorting research radial chart",
            },
          },
        ],
      },
      performance: {
        figma: "3870:15569",
        title: { en: "Performance insights page", zh: "Performance insights 页面" },
        intro: [
          {
            en: "Its primary goal is to provide data-driven evidence to help AI engineers and developers select the optimal hardware and model compression level for their specific production needs.",
            zh: "旨在提供数据驱动的证据，帮助 AI 工程师与开发者为其生产需求选择最优硬件与模型压缩级别。",
          },
          {
            en: "Implemented a progressive disclosure strategy with summary cards, collapsible sections, and customizable views. Users can start with high-level metrics and drill down as needed.",
            zh: "采用渐进式披露：摘要卡片、可折叠区块与可定制视图，用户可从高层指标按需查看数据。",
          },
        ],
        items: [
          {
            icon: ICON + "display-settings.svg",
            iconSlot: "display-settings",
            title: { en: "Hardware configuration", zh: "Hardware configuration" },
            body: {
              en: "AI deployment is a balancing act between cost and performance. This table centralizes complex multi-dimensional data (Latency, RPS, Versioning, etc.) into a single scannable view.",
              zh: "AI 部署需在成本与性能间权衡。该表将延迟、RPS、版本等多维数据整合为便于快速浏览的单一视图。",
            },
          },
          {
            icon: ICON + "compress.svg",
            iconSlot: "compress",
            title: { en: "Compression level comparison", zh: "Compression level comparison" },
            body: {
              en: "To visualize the trade-offs between model size and performance/accuracy. The side-by-side card layout provides an immediate comparison, helping users justify the use of quantized models for cost savings.",
              zh: "可视化模型规模与性能/精度权衡，并排卡片布局便于评估量化模型带来的成本收益。",
            },
          },
          {
            icon: ICON + "playlist-add-circle.svg",
            iconSlot: "playlist-add-circle",
            title: { en: "Advanced metrics across compressions", zh: "Advanced metrics across compressions" },
            body: {
              en: 'Providing deep-dive technical transparency through visualization (Line and Bar charts). Keeps the initial page load clean while allowing power users to dig deeper into "Performance insights".',
              zh: "通过折线图与柱状图呈现更深入的技术细节，保持首屏简洁，同时满足进阶用户在 Performance insights 中的深度分析需求。",
            },
          },
        ],
      },
      compression: {
        figma: "3870:15748",
        title: { en: "Compression level comparison", zh: "Compression level comparison" },
        screenshot: {
          src: COMPRESSION + "screenshot.png",
          width: 3188,
          height: 2894,
          alt: "Compression level comparison UI with summary, inference and accuracy charts",
        },
        arrows: {
          short: COMPRESSION + "arrow-h-short.png",
          long: COMPRESSION + "arrow-h-long.png",
          vertical: COMPRESSION + "arrow-v.png",
          curve: COMPRESSION + "arrow-curve.png",
        },
        callout: {
          top: 168,
          left: 36,
          width: 297,
          height: 52,
          src: COMPRESSION + "callout-advanced-metrics.svg",
          alt: "Advanced metrics across compressions expand control",
        },
        notes: [
          {
            top: 31,
            left: 32,
            width: 512,
            body: {
              en: "A dedicated section compares compression levels with accuracy implications and drill-down on model names.",
              zh: "专设区域对比各压缩级别及精度影响，并支持按模型名称下钻查看。",
            },
          },
          {
            top: 227,
            left: 36,
            width: 503,
            body: {
              en: "Expand/collapse controls are available. Advanced info are collapsed by default to reduce visual noise. Users can expand them to view details and compare data, keeping the main workflow clean while supporting in-depth usage needs.",
              zh: "提供展开/折叠控件。高级信息默认折叠以降低视觉干扰，用户可展开查看详情并对比数据，在保持主流程简洁的同时满足深度使用需求。",
            },
          },
          {
            top: 452,
            left: 36,
            width: 481,
            body: {
              en: "Interactive line charts visualize latency vs. requested RPS, with clear markers for recommended operating points.",
              zh: "交互式折线图展示延迟与请求 RPS 的关系，并以清晰标记标出推荐运行点。",
            },
          },
          {
            top: 607,
            left: 36,
            width: 481,
            body: {
              en: "Bar charts consolidate accuracy metrics across benchmarks in a single, scannable view.",
              zh: "柱状图将各 benchmark 的精度指标整合为单一、可快速扫读的视图。",
            },
          },
          {
            top: 746,
            left: 36,
            width: 481,
            body: {
              en: "Clicking the legend toggles the performance data of the corresponding compression level on and off. Users can keep only the compression types they care about for easier comparison and selection.",
              zh: "点击图例可开关对应压缩级别的性能数据，用户可仅保留关心的压缩类型，便于对比与选择。",
            },
          },
        ],
      },
      benchmark: {
        figma: "3870:15958",
        title: { en: "Hardware configuration", zh: "Hardware configuration" },
        intro: {
          en: "Tabular density supports side-by-side scanning. Stack columns reinforce reproducibility alongside performance.",
          zh: "表格密度支持并排扫描，堆叠列在性能旁强化可复现性。",
        },
        table: {
          src: BENCHMARK + "table-main.png",
          width: 1536,
          height: 597,
          alt: "Hardware configuration benchmark table with filters",
        },
        challengeSolution: {
          badge: { en: "Challenge and solution", zh: "Challenge and solution" },
          badgeIcon: ICON + "challenge-solution.svg",
          headline: {
            en: "High cognitive load in technical decision-making",
            zh: "技术决策中的高认知负荷",
          },
          challenge: {
            html: {
              en: '<p>AI Engineers face "analysis paralysis" when evaluating model-hardware combinations. There are dozens of metrics (TTFT, E2E Latency, RPS, etc.) and multiple hardware options, making it difficult to identify the "best" path for deployment.</p><p>Users will face a large dataset with <strong>27</strong> columns of benchmarks if the table is not organized.</p>',
              zh: "<p>AI 工程师在评估模型与硬件组合时容易陷入「分析瘫痪」：指标众多（TTFT、E2E Latency、RPS 等）且硬件选项多样，难以确定最佳部署路径。</p><p>若表格未经组织，用户将面对多达 <strong>27</strong> 列 benchmark 的大型数据集。</p>",
            },
            image: {
              src: BENCHMARK + "table-wide.png",
              width: 926,
              height: 307,
              alt: "Wide benchmark table showing many columns",
            },
          },
          solutions: [
            {
              title: {
                en: "Supporting both default and custom column configs",
                zh: "支持默认与自定义列配置",
              },
              body: {
                html: {
                  en: "<p>Based on user research, only the most commonly used parameters are shown by default. Users can also customize visible columns, and the system remembers their preferences for faster comparisons.</p><p>Columns in the modal are grouped into four categories with expand/collapse controls, and a “Restore default columns” button can reset the view.</p>",
                  zh: "<p>基于用户研究，默认仅展示最常用参数，用户可自定义可见列，系统会记住偏好以加快对比。</p><p>弹窗中的列分为四组，支持展开/折叠，并提供「Restore default columns」的功能以便重置视图。</p>",
                },
              },
              visual: "columns",
              images: {
                table: BENCHMARK + "table-main.png",
                modal: BENCHMARK + "columns-modal.png",
                pointer: BENCHMARK + "pointer-click.png",
                arrow: BENCHMARK + "arrow-h.png",
              },
            },
            {
              title: { en: "Adding powerful filters", zh: "增强筛选能力" },
              body: {
                en: "To translate an exponential configuration space into a small set of constraints, helping users narrow candidates under explicit latency/RPS and workload assumptions.",
                zh: "将指数级配置空间转化为少量约束，帮助用户在明确的延迟/RPS 与工作负载假设下缩小候选范围。",
              },
              visual: "filters",
              image: {
                src: BENCHMARK + "filters.png",
                width: 958,
                height: 272,
                alt: "Workload, latency, and hardware type filter controls",
              },
            },
            {
              title: {
                en: "Offering a recommended hardware config",
                zh: "提供推荐硬件配置",
              },
              body: {
                en: "I also provided a default recommendation while preserving human accountability. Instead of enforcing a single optimal result, we offer users a clear starting point that is more actionable. The salient, non-intrusive badge works alongside filters to maintain",
                zh: "在保留人工问责的同时提供默认推荐：不强制单一最优结果，而是给出更可执行的起点，醒目且不打扰的徽章与筛选器协同工作。",
              },
              visual: "recommended",
              images: {
                table: BENCHMARK + "table-main.png",
                badge: BENCHMARK + "recommended-badge.png",
                arrow: BENCHMARK + "arrow-v.png",
              },
            },
          ],
        },
      },
      performanceFinal: {
        figma: "3870:15765",
        title: { en: "Final design of \u2018Performance insights\u2019 tab", zh: "Performance insights 页面最终设计" },
        screenshot: {
          svg: PERF_FINAL + "perf-insights-hifi.svg",
          src: PERF_FINAL + "perf-insights-ui.png",
          width: 1536,
          height: 2054,
          alt: "Performance insights tab showing hardware configuration, compression comparison, and inference and accuracy charts",
        },
      },
    },
  };
})();
