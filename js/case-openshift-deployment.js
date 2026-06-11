/**
 * AI Model Deployment Tracking — case data (Figma 3714:25917)
 */
(function () {
  "use strict";

  const IMG = "assets/cases/openshift-ai/deployment/";
  const ICON = IMG + "icons/";
  const JOURNEY = IMG + "research/journey/";

  window.DEPLOYMENT_DATA = {
    research: {
      projectContext: {
        title: { en: "Project context", zh: "项目背景" },
        cards: [
          {
            title: { en: "What is AI model deployment?", zh: "什么是 AI 模型部署？" },
            body: {
              en: "AI model deployment is a core workflow on AI/ML platforms. Data scientists submit models for online release, while application developers integrate and invoke models after deployment.",
              zh: "AI 模型部署是 AI/ML 平台的核心工作流。数据科学家提交模型上线，应用开发者在部署完成后集成并调用模型。",
            },
          },
          {
            title: { en: "What are the existing problems?", zh: "现有问题是什么？" },
            body: {
              en: "The original design relies only on vague icons, lacks workflow clues and effective error feedback. Users cannot perceive progress, identify failed steps, or troubleshoot issues quickly.",
              zh: "旧版设计仅依赖语义模糊的图标，缺少流程线索与有效错误反馈。用户无法感知进度、识别失败步骤或快速排查问题。",
            },
          },
        ],
      },
      userResearch: {
        title: { en: "User research", zh: "用户研究" },
        persona: {
          title: { en: "Persona", zh: "人物角色" },
          intro: {
            en: "Since model deployment is not a commonly used feature for all users, I centered my design on the two most relevant target user personas.",
            zh: "由于模型部署并非所有用户的常用功能，设计聚焦两类最相关的目标用户。",
          },
          cards: [
            {
              avatar: IMG + "research/persona-deployer.png",
              name: { en: "Data scientist", zh: "数据科学家" },
              role: { en: "Model deployer", zh: "模型部署者" },
              body: {
                en: "Responsible for AI model training, experimentation and deployment release. Needs to track real-time deployment progress, identify stalled steps, and troubleshoot failures quickly.",
                zh: "负责 AI 模型训练、实验与部署发布。需要追踪实时部署进度、识别卡住的步骤并快速定位故障。",
              },
            },
            {
              avatar: IMG + "research/persona-consumer.png",
              name: { en: "Application developer", zh: "应用开发者" },
              role: { en: "Model consumer", zh: "模型使用者" },
              body: {
                en: "Responsible for application development and system integration. Mainly uses and invokes AI models. Needs to know clearly when a model is successfully deployed, online, and ready for integration.",
                zh: "负责应用开发与系统集成，主要使用并调用 AI 模型。需要清楚了解模型何时成功部署、上线并可供集成。",
              },
            },
          ],
        },
        customerInsight: {
          title: { en: "Customer insight", zh: "客户洞察" },
          intro: {
            en: "I work closely with the customer support team. They provide real user feedback, which we use to continuously improve the product experience.",
            zh: "我与客户支持团队紧密协作，他们提供真实用户反馈，用于持续改进产品体验。",
          },
          board: IMG + "research/customer-insight-board.png",
          boardWidth: 434.768,
          boardHeight: 552,
          frameWidth: 455,
          frameHeight: 565,
        },
        userStory: {
          title: { en: "User story", zh: "用户故事" },
          intro: {
            en: "After aligning with the PM, we distilled four representative user stories from customer insights to prioritize and address the most critical user needs.",
            zh: "与 PM 对齐后，我们从客户洞察中提炼四条代表性用户故事，优先解决最关键需求。",
          },
          stories: [
            {
              en: "I want to see a clear, real-time deployment status with stage information, so that I know the deployment is progressing and not stuck.",
              zh: "我希望看到清晰的实时部署状态与阶段信息，以便确认部署在推进且未卡住。",
            },
            {
              en: "I want clear and actionable failure messaging, so that I can quickly recover and redeploy successfully.",
              zh: "我希望获得清晰且可操作的失败信息，以便快速恢复并成功重新部署。",
            },
            {
              en: "I want statuses to be consistent and understandable, so that I can quickly interpret model readiness.",
              zh: "我希望状态一致且易于理解，以便快速判断模型就绪情况。",
            },
            {
              en: "I want clearer status icons and labels in the list view, so that I can identify which models need attention without opening each one.",
              zh: "我希望列表视图中的状态图标与标签更清晰，无需逐个打开即可识别需关注的模型。",
            },
          ],
        },
        journey: {
          title: { en: "User journey", zh: "用户旅程" },
          width: 1600,
          height: 778,
          workflow: { src: JOURNEY + "workflow-flow.svg", x: 166, y: 82, width: 1410, height: 184 },
          rowLabels: [
            { text: { en: "Steps", zh: "步骤" }, x: 24, y: 45 },
            { text: { en: "Workflow", zh: "工作流" }, x: 24, y: 174 },
            { text: { en: "Painpoints", zh: "痛点" }, x: 24, y: 371 },
            { text: { en: "Touch points", zh: "触点" }, x: 24, y: 526 },
            { text: { en: "Opportunities", zh: "机会点" }, x: 24, y: 666 },
          ],
          stages: [
            {
              text: { en: "Initiate deployment", zh: "发起部署" },
              x: 166, y: 24, width: 277, height: 42, bg: "#eeeeee",
            },
            {
              text: { en: "Track and monitor deployment", zh: "跟踪与监控部署" },
              x: 443, y: 24, width: 961, height: 42, bg: "#ffebc7",
            },
            {
              text: { en: "Apply model", zh: "应用模型" },
              x: 1404, y: 24, width: 172, height: 42, bg: "#eeeeee",
            },
          ],
          zones: [
            { x: 166, y: 276, width: 1410, height: 190, bg: "#f4f4f4" },
            { x: 163, y: 586, width: 1413, height: 160, bg: "#f4f4f4" },
          ],
          painpoints: [
            { text: { en: "Unclear deploy state", zh: "部署状态不清晰" }, x: 420, y: 292, width: 167, height: 32 },
            { text: { en: "No clear deployment process", zh: "部署流程不清晰" }, x: 555, y: 338, width: 235, height: 32 },
            { text: { en: "No deployment logs for debug", zh: "缺少部署日志，难以排查问题" }, x: 552, y: 378, width: 241, height: 32 },
            { text: { en: "No clear duration expectation", zh: "缺少明确的耗时预期" }, x: 555, y: 418, width: 235, height: 32 },
            { text: { en: "Insufficient error details", zh: "错误信息不足" }, x: 924, y: 292, width: 194, height: 32 },
            { text: { en: "Hard to realize the error in the table", zh: "难以在列表中识别异常状态" }, x: 840, y: 332, width: 278, height: 32 },
            { text: { en: "Hard to read activity from table view", zh: "表格视图难以阅读活动状态" }, x: 1162, y: 329, width: 293, height: 32 },
            { text: { en: "No detailed help text for the status", zh: "状态缺少详细帮助文本" }, x: 1174, y: 369, width: 270, height: 32 },
            { text: { en: "No guidelines to fix issues", zh: "缺少修复问题的指引" }, x: 1052, y: 418, width: 207, height: 32 },
          ],
          touchpoints: [
            { text: { en: "Model catalog", zh: "模型目录" }, x: 176, y: 490, width: 115, height: 32 },
            { text: { en: "Model deployment", zh: "模型部署" }, x: 312, y: 490, width: 147, height: 32 },
            { text: { en: "Deployment monitor UI", zh: "部署监控界面" }, x: 481, y: 490, width: 182, height: 32 },
            { text: { en: "Deployment logs", zh: "部署日志" }, x: 986, y: 490, width: 134, height: 32 },
            { text: { en: "Model deployment table", zh: "模型部署表格" }, x: 1309, y: 490, width: 186, height: 32 },
            { text: { en: "Model registry", zh: "模型注册表" }, x: 176, y: 530, width: 115, height: 32 },
          ],
          opportunities: [
            { text: { en: "Clearly show deployment progress and stage status", zh: "清晰展示部署进度与阶段状态" }, x: 420, y: 602, width: 240, height: 59 },
            { text: { en: "Locate abnormal steps and understand failure causes", zh: "定位异常步骤并理解失败原因" }, x: 800, y: 602, width: 240, height: 59 },
            { text: { en: "Show clear status info once deployment completes", zh: "部署完成后展示清晰状态信息" }, x: 1054, y: 602, width: 240, height: 59 },
            { text: { en: "Provide an estimate of the time for deployment", zh: "提供部署耗时预估" }, x: 545, y: 669, width: 240, height: 59 },
            { text: { en: "Access readable error hints and running logs", zh: "获取可读错误提示与运行日志" }, x: 800, y: 669, width: 240, height: 59 },
            { text: { en: "Provide extra help text to explain the status", zh: "提供额外帮助文本解释状态" }, x: 1188, y: 669, width: 240, height: 59 },
          ],
          lines: [
            { src: JOURNEY + "line-52.svg", x: 504, y: 188, length: 104 },
            { src: JOURNEY + "line-49.svg", x: 673, y: 188, length: 150 },
            { src: JOURNEY + "line-50.svg", x: 1026, y: 223, length: 69 },
            { src: JOURNEY + "line-53.svg", x: 1156, y: 223, length: 195 },
            { src: JOURNEY + "line-51.svg", x: 1309, y: 155, length: 174 },
          ],
        },
        objectives: {
          title: { en: "Design objectives", zh: "设计目标" },
          cards: [
            {
              icon: ICON + "objective-1.svg",
              text: {
                en: "Help users quickly understand deployment status",
                zh: "帮助用户快速理解部署状态",
              },
            },
            {
              icon: ICON + "objective-2.svg",
              text: {
                en: "Improve efficiency of process tracking and model status checking",
                zh: "提升流程追踪与模型状态检查效率",
              },
            },
            {
              icon: ICON + "objective-3.svg",
              text: {
                en: "Provide clear visibility of workflow stages and exceptions",
                zh: "清晰展示工作流阶段与异常",
              },
            },
            {
              icon: ICON + "objective-4.svg",
              text: {
                en: "Reduce repetitive manual confirmation and operation cost",
                zh: "减少重复的人工确认与操作成本",
              },
            },
          ],
        },
      },
    },
    evaluation: {
      title: { en: "Evaluation of the original design", zh: "旧版设计评估" },
      screenshot: IMG + "evaluation/original-design.png",
      body: {
        en: "The original design lacks progress feedback. Users cannot confidently determine what stage is running, whether deployment is stuck, or what actions to take when failures occur.",
        zh: "旧版设计缺少进度反馈。用户无法判断当前阶段、部署是否卡住，或在失败时该采取什么行动。",
      },
      issues: [
        {
          title: { en: "Key issue 1", zh: "关键问题 1" },
          text: {
            en: "Relying solely on ambiguous icons fails to help users quickly understand their intended meanings.",
            zh: "仅依赖语义模糊的图标，难以帮助用户快速理解含义。",
          },
        },
        {
          title: { en: "Key issue 2", zh: "关键问题 2" },
          text: {
            en: "It lacks additional information to display the deployment workflow and current progress step with status.",
            zh: "缺少展示部署流程与当前进度步骤的状态信息。",
          },
        },
        {
          title: { en: "Key issue 3", zh: "关键问题 3" },
          text: {
            en: "Error presentation is overly simplistic, making it hard to identify and locate issues promptly.",
            zh: "错误信息过于简化，难以及时识别与定位问题。",
          },
        },
      ],
    },
    solutions: {
      title: { en: "Design solutions", zh: "设计方案" },
      bands: [
        {
          tone: "blue",
          variant: "status-labels",
          title: {
            en: "Use label plus text to clarify status semantics",
            zh: "使用标签 + 文本明确状态语义",
          },
          body: {
            en: "Replace ambiguous standalone icons with labels (icon + descriptive text pairs) for core statuses. Add extra help text under the label to ensure instant understanding for all users.",
            zh: "用标签（图标 + 描述性文字）取代仅图标的模糊状态，并在标签下增加辅助说明，确保所有用户即时理解。",
          },
          visual: {
            before: IMG + "solutions/status-before.svg",
            after: IMG + "solutions/status-after.svg",
            arrow: IMG + "solutions/status-arrow.svg",
            beforeWidth: 85,
            beforeHeight: 342,
            afterWidth: 197,
            afterHeight: 342,
            arrowWidth: 103,
            arrowHeight: 35,
          },
        },
        {
          tone: "pink",
          variant: "timeline-visual",
          title: {
            en: "Adopt timeline-style process visualization",
            zh: "采用时间线进行流程可视化",
          },
          body: {
            en: "Implement a stage-based timeline with clear dividers and highlighted current progress based on the deployment logs. Enables users to grasp the full deployment journey at a glance.",
            zh: "基于部署日志实现分阶段时间线，清晰分隔并高亮当前进度，让用户一眼掌握完整部署旅程。",
          },
          visual: {
            logs: IMG + "solutions/timeline-logs.svg",
            stepper: IMG + "solutions/timeline-stepper.svg",
            arrow: IMG + "solutions/timeline-arrow.svg",
            logsWidth: 809,
            logsHeight: 427,
            stepperWidth: 222,
            stepperHeight: 418,
            arrowWidth: 82,
            arrowHeight: 35,
          },
        },
        {
          tone: "green",
          title: {
            en: "Integrate real-time logs into process tracking",
            zh: "将实时日志集成到流程追踪",
          },
          body: {
            en: "Introduce the log panel. Users access real-time logs via one-click, eliminating cross-page navigation for troubleshooting.",
            zh: "引入日志面板，用户一键访问实时日志，无需跨页排查问题。",
          },
          visual: {
            main: IMG + "solutions/event-log.svg",
            mainWidth: 625,
            mainHeight: 460,
          },
        },
      ],
    },
    breakdown: {
      title: { en: "Design breakdown", zh: "设计拆解" },
      labelsDefinition: {
        title: { en: "Refined definition of status labels", zh: "状态标签的精确定义" },
        subtitle: {
          en: "Clicking the status label or help text triggers the status modal.",
          zh: "点击状态标签或帮助文本会触发状态弹窗。",
        },
        cards: [
          {
            tone: "progress",
            label: { en: "In progress", zh: "进行中" },
            help: {
              parts: [
                { en: "Creating ", zh: "正在创建 " },
                { en: "revision", zh: "revision" },
              ],
            },
            body: {
              en: "The help text displays the currently ongoing step. Text is phrased in the present continuous tense to clearly indicate that the action is still running.",
              zh: "帮助文本展示当前进行中的步骤，使用现在进行时表述，明确表示操作仍在运行。",
            },
            icon: IMG + "breakdown/icons/label-in-progress.svg",
          },
          {
            tone: "failed",
            label: { en: "Failed", zh: "失败" },
            help: {
              text: { en: "Failed to create revision", zh: "Failed to create revision" },
            },
            body: {
              en: "The help text shows the specific step where the error occurred. The format follows: Failed to + [specific step name]",
              zh: "帮助文本展示发生错误的具体步骤，格式为：Failed to + [具体步骤名称]",
            },
            icon: IMG + "breakdown/icons/label-failed.svg",
          },
          {
            tone: "available",
            label: { en: "Available", zh: "可用" },
            body: {
              en: "This status means that the model has been successfully deployed with no issues, and is now ready for application integration.",
              zh: "该状态表示模型已成功部署且无问题，现已可供应用集成。",
            },
            icon: IMG + "breakdown/icons/label-available.svg",
          },
          {
            tone: "unknown",
            label: { en: "Unknown", zh: "未知" },
            body: {
              en: "Helper information depends on the underlying issue. The backend determines the specific cause and exposes it in the UI accordingly.",
              zh: "帮助信息取决于后端问题的判断，后端确定具体原因后会在界面中做出相应提示。",
            },
            icon: IMG + "breakdown/icons/label-unknown.svg",
          },
        ],
      },
      statusModal: {
        title: { en: "Status modal", zh: "状态弹窗" },
        walkthrough: {
          visual: {
            src: IMG + "breakdown/status-modal-visual.svg",
            width: 558,
            height: 573,
          },
          notes: [
            {
              n: 1,
              en: "The overall process status label aligns with the status column in the deployment table view.",
              zh: "整体流程状态标签与部署表格视图中的状态列保持一致。",
            },
            {
              n: 2,
              en: "The modal displays the currently running step.",
              zh: "弹窗展示当前正在运行的步骤。",
            },
            {
              n: 3,
              html: {
                en: 'The modal is divided into two tabs: <strong>Progress</strong> and <strong>Events log</strong>.',
                zh: '弹窗分为两个标签页：<strong>Progress</strong> 与 <strong>Events log</strong>。',
              },
            },
            {
              n: 4,
              en: "An alert reminds users that the workflow may vary depending on the scenario. And the order of steps is not fixed.",
              zh: "提示信息提醒用户工作流可能因场景而异，且步骤顺序并非固定。",
            },
            {
              n: 5,
              html: {
                en: 'All steps follow the naming convention: <strong>Verb + noun</strong>. Each step will go through 3 phases, namely pending, in progress, and successful or failed. As shown below, it shows an example of the phases.',
                zh: '所有步骤遵循命名规范：<strong>Verb + noun</strong>。每个步骤经历 3 个阶段：pending、in progress，以及 successful 或 failed。如下图所示。',
              },
            },
          ],
          phases: {
            src: IMG + "breakdown/phase-diagram.svg",
            width: 644,
            height: 117,
          },
        },
        intro: {
          en: "Modals for other statuses are shown below. While the specific content of each modal varies slightly, they all follow the same core information architecture.",
          zh: "下方展示其他状态的弹窗。尽管各弹窗具体内容略有差异，但均遵循相同的核心信息架构。",
        },
        variants: {
          src: IMG + "breakdown/status-modal-variants.svg",
          width: 1920,
          height: 655,
        },
      },
      eventsLog: {
        title: { en: "Events log presentation", zh: "事件日志展示" },
        paragraphs: [
          {
            en: "Events log occupies a separate tab in the ‘Model deployment status’ modal.",
            zh: "事件日志在「Model deployment status」弹窗中占据独立标签页。",
          },
          {
            en: "The events log reuses logs from OpenShift. On one hand, this ensures the event log remains concise and easy to read. On the other hand, it allows users to leverage their existing familiarity with OpenShift logs, creating a consistent experience. The most recent logs are displayed at the top.",
            zh: "事件日志复用了 OpenShift 的日志。一方面，这确保事件日志保持简洁易读，另一方面，用户可以利用对 OpenShift 日志的现有熟悉度，获得一致的体验。最新的日志显示在顶部。",
          },
        ],
        visual: {
          src: IMG + "breakdown/events-log-modal.svg",
          width: 664,
          height: 689,
        },
      },
      uiPresentation: {
        title: { en: "UI Presentation", zh: "UI 展示" },
        src: IMG + "breakdown/ui-presentation.svg",
        width: 1920,
        height: 1080,
      },
    },
    tradeoffs: {
      title: { en: "Trade-offs in design iteration", zh: "设计迭代中的权衡" },
      items: [
        {
          variant: "panel",
          title: { en: "Why no estimated time is shown", zh: "为何不展示预计时间" },
          intro: {
            en: "User research revealed a need for estimated deployment times. But we didn't launch this feature in this version.",
            zh: "用户研究显示需要预计部署时间，但本版本未上线该功能。",
          },
          image: IMG + "tradeoffs/estimated-time-visual.svg",
          imageWidth: 748,
          imageHeight: 637,
          imageSide: "left",
          rows: [
            {
              kind: "pros",
              label: { en: "Pros", zh: "优势" },
              text: {
                en: "Sets clear expectations of deployment duration and reduces user waiting anxiety and uncertainty.",
                zh: "明确部署时长预期，减少用户等待焦虑与不确定性。",
              },
            },
            {
              kind: "constraints",
              label: { en: "Constraints", zh: "约束" },
              text: {
                en: "Reliable time estimation is unachievable now, due to technical complexity, inconsistent deployment frameworks and unstable cloud clusters.",
                zh: "因技术复杂度、部署框架不一致与集群不稳定，目前无法可靠估算时间。",
              },
            },
            {
              kind: "decision",
              label: { en: "Decision", zh: "决策" },
              text: {
                en: "To avoid misleading users with inaccurate references, we deprioritized this feature and leave it for future iterations.",
                zh: "为避免不准确预期误导用户，该功能优先级下调并留待后续迭代。",
              },
            },
          ],
        },
        {
          variant: "panel",
          title: {
            en: "Why not combine progress and event log into a single view",
            zh: "为何不将进度与事件日志合并为单一视图",
          },
          intro: {
            en: "During design exploration, I explored integrating progress steps with the event log.",
            zh: "设计探索阶段，我尝试过将进度步骤与事件日志整合。",
          },
          image: IMG + "tradeoffs/combined-view-visual.svg",
          imageWidth: 748,
          imageHeight: 637,
          imageSide: "right",
          rows: [
            {
              kind: "pros",
              label: { en: "Pros", zh: "优势" },
              text: {
                en: "Users can instantly locate error logs under the failed step for faster troubleshooting.",
                zh: "用户可在失败步骤下即时定位错误日志，加快排查。",
              },
            },
            {
              kind: "constraints",
              label: { en: "Constraints", zh: "约束" },
              text: {
                en: "Splitting and mapping raw logs to individual steps involves high technical complexity, and adds heavy backend workload for data parsing and classification.",
                zh: "将原始日志拆分并映射到各步骤技术复杂度高，且增加后端解析与分类负担。",
              },
            },
            {
              kind: "decision",
              label: { en: "Decision", zh: "决策" },
              text: {
                en: "The integrated layout is deferred for now. It is marked as a nice-to-have feature, to be implemented in future iterations when technical support becomes available.",
                zh: "整合布局暂缓，标记为增强型（nice-to-have）功能，待技术支撑成熟后再实现。",
              },
            },
          ],
        },
        {
          variant: "panel",
          title: { en: "Why Stop / Restart actions are not provided", zh: "为何不提供停止/重启操作" },
          intro: null,
          image: IMG + "tradeoffs/stop-restart-visual.svg",
          imageWidth: 748,
          imageHeight: 637,
          imageSide: "left",
          rows: [
            {
              kind: "constraints",
              label: { en: "Constraints", zh: "约束" },
              html: {
                en: "<p>The backend cannot support one-click restart for model deployment, as it requires invoking massive resources on OpenShift.</p><ul><li>For the <strong>Restart / Redeploy</strong> action, technical limitations make full automatic redeployment unachievable.</li><li>For the <strong>Stop</strong> action, without a reliable one-click redeploy fallback, stopping deployment is a high-risk, destructive operation.</li></ul>",
                zh: "<p>后端无法支持模型部署的一键重启，因其需在 OpenShift 上调用大量资源。</p><ul><li>对于<strong>重启/重新部署</strong>，技术限制使全自动重新部署无法实现。</li><li>对于<strong>停止</strong>，若无可靠的一键重新部署兜底，停止部署是高风险、不可逆操作。</li></ul>",
              },
            },
            {
              kind: "decision",
              label: { en: "Decision", zh: "决策" },
              html: {
                en: "<p>After aligning with product and engineering teams, the <strong>Redeploy model</strong> action was removed.</p><p>To avoid risky irreversible operations, we adopted a conservative and safe approach by omitting the <strong>Stop deployment</strong> option. This decision was approved by stakeholders.</p>",
                zh: "<p>与产品与开发团队对齐后，移除了<strong>重新部署模型</strong>操作。</p><p>为避免高风险不可逆操作，我们采取保守安全策略，省略<strong>停止部署</strong>选项，该决策已获利益相关方批准。</p>",
              },
            },
          ],
        },
      ],
    },
    ux: {
      evaluation: {
        title: { en: "UX evaluation", zh: "体验评估" },
        subtitle: {
          en: "Feedback shared by customers and stakeholders",
          zh: "客户与利益相关方反馈",
        },
        intro: {
          html: {
            en: 'After the feature launch, I collaborated with the customer support team to collect user feedback on the new functionality. Although a few details still require further iteration and optimization, the current release has already resolved most of users\' major pain points. <strong>Users regarded this update as a huge improvement.</strong>',
            zh: "功能上线后，我与客户支持团队协作收集用户反馈。尽管部分细节仍需迭代优化，但是当前版本已解决用户大部分核心痛点。<strong>用户认为此次更新是重大改进。</strong>",
          },
        },
        testimonials: [
          {
            text: {
              en: "We used to get so many questions from users who didn't understand the deployment process. Now with the progress and status modals, those questions have dropped significantly.",
              zh: "过去常有用户因不理解部署流程而提问。有了进度与状态弹窗后，这类问题显著减少。",
            },
            author: { en: "Erw**", zh: "Erw**" },
            role: { en: "Red Hat Customer Support Team", zh: "Red Hat 客户支持团队" },
          },
          {
            text: {
              en: "The status modal makes it so much easier to see where the deployment failed. I used to spend ages digging through logs, now I can spot the issue in seconds.",
              zh: "状态弹窗让我更容易看到部署失败位置。过去要花很久翻日志，现在几秒就能定位问题。",
            },
            author: { en: "ML Engineer", zh: "ML 工程师" },
            role: { en: "A user from a bank", zh: "某银行用户" },
          },
          {
            text: {
              en: "The helper text like ‘Failed to create Pod’ is a game-changer. It tells me exactly what went wrong without having to interpret vague error messages.",
              zh: "像「Failed to create Pod」这样的辅助文案非常关键，无需解读模糊错误信息就能知道哪里出错。",
            },
            author: { en: "Data Scientist", zh: "数据科学家" },
            role: { en: "A user from a bank", zh: "某银行用户" },
          },
          {
            text: {
              en: "Keeping the OpenShift-style event logs was a great call. I have already known how to read them, so there was zero learning curve for this feature.",
              zh: "保留 OpenShift 风格的事件日志非常正确。我已熟悉这类日志的阅读方式，因此该功能几乎零学习成本。",
            },
            author: { en: "Data Scientist", zh: "数据科学家" },
            role: { en: "A user from an airline company", zh: "某航空公司用户" },
          },
        ],
      },
      extension: {
        title: { en: "Reusable extension of design components", zh: "设计组件的可复用扩展" },
        intro: {
          html: {
            en: '<p>Upon design completion, I presented the solution to the RHOAI UXD team. We identified that besides <strong>Model deployment</strong>, other resource types also demand similar workflow and status tracking capabilities. To preserve visual consistency across pages and deliver a coherent user experience, we decided to generalize and apply this design pattern to process tracking for other resources.</p><p>The core structure of the pattern remains intact, while internal content and details can be adjusted flexibly to fit diverse business needs.</p>',
            zh: "<p>设计完成后，我向 RHOAI UXD 团队展示方案。我们发现除<strong>模型部署</strong>外，其他资源类型也需要类似的工作流与状态追踪能力。为保持页面视觉一致并交付连贯体验，我们决定将该设计模式泛化并应用于其他资源的流程追踪。</p><p>模式的核心结构保持不变，内部内容与细节可灵活调整以适应不同业务需求。</p>",
          },
        },
        examples: [
          {
            layout: "visual-left",
            heading: {
              en: "Adoption of the pattern in ‘Starting pipeline server’",
              zh: "组件在「Starting pipeline server」中的应用",
            },
            body: {
              text: {
                en: "This modal reuses the unified status tracking pattern. While keeping the core modal architecture (header, tabs, progress steps, and error alerts) unchanged, we adapt the content, step names, and primary actions to fit each scenario.",
                zh: "该弹窗复用了统一的状态追踪模式。在保持核心弹窗架构（标题区、标签页、进度步骤与错误提示）不变的同时，我们调整内容、步骤名称与主要操作以适配不同场景。",
              },
            },
            visual: {
              src: IMG + "ux/extension-pipeline-modal.svg",
              width: 588,
              height: 674,
            },
            steps: [
              {
                num: "01",
                text: {
                  en: "Reused the core status modal architecture",
                  zh: "复用状态追踪的弹出框组件和架构",
                },
              },
              {
                num: "02",
                text: {
                  en: "Adapted content for pipeline server",
                  zh: "为 pipeline server 适配内容",
                },
              },
              {
                num: "03",
                text: {
                  en: "Delivers consistent UX with zero learning curve",
                  zh: "保证一致的用户体验，降低学习成本",
                },
              },
            ],
          },
          {
            layout: "visual-right",
            heading: {
              en: "Application of pattern variants in ‘Workbench status’ modal",
              zh: "组件变体在「Workbench status」弹窗中的应用",
            },
            body: {
              html: {
                en: '<p>To handle complex multi-stage workflows, the core status tracking pattern includes expandable steps.</p><p>For example, the <em>Assign pod</em> step in the <strong>Workbench</strong> workflow is collapsible by default, keeping the high-level progress view clean. When expanded, it reveals nested subtasks. This balances clarity for casual users and deep visibility for advanced users, while maintaining the same consistent interaction pattern across different product areas.</p>',
                zh: "<p>为处理复杂的多阶段工作流，主要步骤中包含可展开步骤。</p><p>例如，<strong>Workbench</strong> 工作流中的 <em>Assign pod</em> 步骤默认可折叠，保持高层进度视图简洁，展开后显示嵌套子任务。这兼顾了普通用户的清晰度与高级用户的深度可见性，并在不同产品区域保持一致交互模式。</p>",
              },
            },
            inlineVisual: {
              src: IMG + "ux/extension-workbench-inline.svg",
              width: 603,
              height: 142,
            },
            visual: {
              src: IMG + "ux/extension-workbench-modal.svg",
              width: 588,
              height: 604,
            },
          },
        ],
      },
    },
  };
})();

(function () {
  "use strict";

  const IMG = "assets/cases/openshift-ai/deployment/";
  const ICON = IMG + "icons/";

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

  function field(obj, lang) {
    if (obj?.html?.[lang] || obj?.html?.en) return obj.html[lang] || obj.html.en;
    if (obj?.text) return esc(t(obj.text, lang));
    return esc(t(obj, lang));
  }

  function tradeoffIcon(kind) {
    if (kind === "pros") return ICON + "tradeoff-star.svg";
    if (kind === "constraints") return ICON + "tradeoff-warning.svg";
    return ICON + "tradeoff-decision.svg";
  }

  window.renderDeploymentUserResearch = function (lang) {
    const ur = window.DEPLOYMENT_DATA?.research?.userResearch;
    if (!ur) return "";

    const personaCards = (ur.persona.cards || [])
      .map(
        (p) => `
        <article class="fc-deploy-ur-persona-card">
          <div class="fc-deploy-ur-persona-card__head">
            <img src="${esc(p.avatar)}" alt="" width="40" height="40" loading="lazy">
            <p class="fc-deploy-ur-persona-card__name">${esc(t(p.name, lang))}</p>
          </div>
          <div class="fc-deploy-ur-persona-card__body">
            <p class="fc-deploy-ur-persona-card__role">${esc(t(p.role, lang))}</p>
            <p class="fc-deploy-ur-persona-card__desc">${esc(t(p.body, lang))}</p>
          </div>
        </article>`
      )
      .join("");

    const stories = (ur.userStory.stories || [])
      .map((story) => `<li>${esc(t(story, lang))}</li>`)
      .join("");

    const ci = ur.customerInsight;

    return `
      <div class="fc-deploy-ur">
        <h2 class="fc-section__title">${esc(t(ur.title, lang))}</h2>
        <div class="fc-deploy-ur-grid">
          <div class="fc-deploy-ur-col fc-deploy-ur-col--persona">
            <h3 class="fc-deploy-ur-col__label">${esc(t(ur.persona.title, lang))}</h3>
            <p class="fc-deploy-ur-col__intro">${esc(t(ur.persona.intro, lang))}</p>
            <div class="fc-deploy-ur-persona-stack">${personaCards}</div>
          </div>
          <div class="fc-deploy-ur-col fc-deploy-ur-col--insight">
            <h3 class="fc-deploy-ur-col__label">${esc(t(ci.title, lang))}</h3>
            <p class="fc-deploy-ur-col__intro">${esc(t(ci.intro, lang))}</p>
            <figure class="fc-deploy-ur-insight">
              <div class="fc-deploy-ur-insight__frame" aria-hidden="true"></div>
              <img
                class="fc-deploy-ur-insight__board"
                src="${esc(ci.board)}"
                alt=""
                loading="lazy"
                width="${ci.boardWidth || 435}"
                height="${ci.boardHeight || 552}">
            </figure>
          </div>
          <div class="fc-deploy-ur-col fc-deploy-ur-col--story">
            <h3 class="fc-deploy-ur-col__label">${esc(t(ur.userStory.title, lang))}</h3>
            <p class="fc-deploy-ur-col__intro">${esc(t(ur.userStory.intro, lang))}</p>
            <ul class="fc-deploy-ur-stories">${stories}</ul>
          </div>
        </div>
      </div>`;
  };

  window.renderDeploymentUserJourney = function (lang) {
    const j = window.DEPLOYMENT_DATA?.research?.userResearch?.journey;
    if (!j) return "";

    const u = (n) => `calc(${n} * var(--u))`;

    const rowLabels = (j.rowLabels || [])
      .map(
        (row) =>
          `<p class="fc-deploy-uj__row-label" style="left:${u(row.x)};top:${u(row.y)}">${esc(t(row.text, lang))}</p>`
      )
      .join("");

    const stages = (j.stages || [])
      .map(
        (stage) => `
        <div class="fc-deploy-uj__stage" style="left:${u(stage.x)};top:${u(stage.y)};width:${u(stage.width)};height:${u(stage.height)};background:${stage.bg}">
          <span>${esc(t(stage.text, lang))}</span>
        </div>`
      )
      .join("");

    const zones = (j.zones || [])
      .map(
        (zone) =>
          `<div class="fc-deploy-uj__zone" style="left:${u(zone.x)};top:${u(zone.y)};width:${u(zone.width)};height:${u(zone.height)};background:${zone.bg}"></div>`
      )
      .join("");

    const wf = j.workflow;
    const workflow = wf
      ? `<img class="fc-deploy-uj__workflow" src="${esc(wf.src)}" alt="${esc(t({ en: "Deployment workflow", zh: "部署工作流" }, lang))}" width="${wf.width}" height="${wf.height}" style="left:${u(wf.x)};top:${u(wf.y)};width:${u(wf.width)};height:${u(wf.height)}">`
      : "";

    const lines = (j.lines || [])
      .map(
        (line) =>
          `<img class="fc-deploy-uj__line" src="${esc(line.src)}" alt="" aria-hidden="true" style="left:${u(line.x)};top:${u(line.y)};width:${u(line.length)}">`
      )
      .join("");

    const painpoints = (j.painpoints || [])
      .map(
        (note) => `
        <div class="fc-deploy-uj__note fc-deploy-uj__note--pain" style="left:${u(note.x)};top:${u(note.y)};width:${u(note.width)};height:${u(note.height)}">
          <span>${esc(t(note.text, lang))}</span>
        </div>`
      )
      .join("");

    const touchpoints = (j.touchpoints || [])
      .map(
        (pill) => `
        <div class="fc-deploy-uj__pill" style="left:${u(pill.x)};top:${u(pill.y)};width:${u(pill.width)};height:${u(pill.height)}">
          <span>${esc(t(pill.text, lang))}</span>
        </div>`
      )
      .join("");

    const opportunities = (j.opportunities || [])
      .map(
        (note) => `
        <div class="fc-deploy-uj__note fc-deploy-uj__note--opp" style="left:${u(note.x)};top:${u(note.y)};width:${u(note.width)};height:${u(note.height)}">
          <span>${esc(t(note.text, lang))}</span>
        </div>`
      )
      .join("");

    return `
      <div class="fc-deploy-uj">
        <img class="fc-deploy-arrow" src="${IMG}research/arrow-down.svg" alt="" aria-hidden="true">
        <h3 class="fc-deploy-uj__title">${esc(t(j.title, lang))}</h3>
        <figure class="fc-deploy-uj__fig">
          <div class="fc-deploy-uj__board" style="width:${u(j.width)};height:${u(j.height)}">
            <div class="fc-deploy-uj__frame" aria-hidden="true"></div>
            <div class="fc-deploy-uj__timeline" aria-label="Journey rows">${rowLabels}${stages}</div>
            ${zones}
            ${workflow}
            ${lines}
            ${painpoints}
            ${touchpoints}
            ${opportunities}
          </div>
        </figure>
      </div>`;
  };

  window.renderDeploymentResearch = function (lang) {
    const d = window.DEPLOYMENT_DATA?.research;
    if (!d) return "";
    const pc = d.projectContext;
    const ur = d.userResearch;

    const contextCards = (pc.cards || [])
      .map(
        (card) => `
        <article class="fc-deploy-context-card">
          <h3>${esc(t(card.title, lang))}</h3>
          <p>${esc(t(card.body, lang))}</p>
        </article>`
      )
      .join("");

    const objectives = (ur.objectives.cards || [])
      .map(
        (card) => `
        <article class="fc-deploy-objective-card">
          <img src="${esc(card.icon)}" alt="" width="48" height="48" aria-hidden="true">
          <p>${esc(t(card.text, lang))}</p>
        </article>`
      )
      .join("");

    return `
      <section class="fc-section fc-deploy-research">
        <h2 class="fc-section__title">${esc(t(pc.title, lang))}</h2>
        <div class="fc-deploy-context">${contextCards}</div>

        ${window.renderDeploymentUserResearch?.(lang) || ""}

        ${window.renderDeploymentUserJourney?.(lang) || ""}

        <div class="fc-deploy-objectives-wrap">
          <img class="fc-deploy-arrow" src="${IMG}research/arrow-down.svg" alt="" aria-hidden="true">
          <h3 class="fc-deploy-objectives-title">${esc(t(ur.objectives.title, lang))}</h3>
          <div class="fc-deploy-objectives">${objectives}</div>
        </div>
      </section>`;
  };

  window.renderDeploymentEvaluation = function (lang) {
    const d = window.DEPLOYMENT_DATA?.evaluation;
    if (!d) return "";
    const issues = (d.issues || [])
      .map(
        (item, i) => `
        ${i > 0 ? '<div class="fc-deploy-eval__divider" aria-hidden="true"></div>' : ""}
        <article class="fc-deploy-eval__issue">
          <h4>${esc(t(item.title, lang))}</h4>
          <p>${esc(t(item.text, lang))}</p>
        </article>`
      )
      .join("");

    return `
      <section class="fc-section fc-deploy-eval">
        <h2 class="fc-section__title">${esc(t(d.title, lang))}</h2>
        <figure class="fc-deploy-eval__shot">
          <img src="${esc(d.screenshot)}" alt="" loading="lazy" width="1600" height="570">
        </figure>
        <div class="fc-deploy-eval__foot">
          <p class="fc-deploy-eval__intro">${esc(t(d.body, lang))}</p>
          <div class="fc-deploy-eval__issues">${issues}</div>
        </div>
      </section>`;
  };

  window.renderDeploymentSolutions = function (lang) {
    const d = window.DEPLOYMENT_DATA?.solutions;
    if (!d) return "";
    const bands = (d.bands || [])
      .map((band) => {
        if (band.variant === "status-labels" && band.visual?.before && band.visual?.after) {
          const v = band.visual;
          return `
          <article class="fc-deploy-solution fc-deploy-solution--blue fc-deploy-solution--status-labels">
            <div class="fc-deploy-solution__status-inner">
              <div class="fc-deploy-solution__copy">
                <h3>${esc(t(band.title, lang))}</h3>
                <p>${esc(t(band.body, lang))}</p>
              </div>
              <div class="fc-deploy-solution__visual fc-deploy-solution__visual--compare">
                <div class="fc-deploy-solution__compare">
                  <img class="fc-deploy-solution__before" src="${esc(v.before)}" alt="${esc(t({ en: "Status icons before", zh: "改进前状态图标" }, lang))}" width="${v.beforeWidth}" height="${v.beforeHeight}" loading="lazy">
                  <img class="fc-deploy-solution__arrow-h" src="${esc(v.arrow)}" alt="" aria-hidden="true" width="${v.arrowWidth}" height="${v.arrowHeight}">
                  <img class="fc-deploy-solution__after" src="${esc(v.after)}" alt="${esc(t({ en: "Status labels after", zh: "改进后状态标签" }, lang))}" width="${v.afterWidth}" height="${v.afterHeight}" loading="lazy">
                </div>
              </div>
            </div>
          </article>`;
        }

        if (band.variant === "timeline-visual" && band.visual?.logs && band.visual?.stepper) {
          const v = band.visual;
          return `
          <article class="fc-deploy-solution fc-deploy-solution--pink fc-deploy-solution--timeline-visual">
            <div class="fc-deploy-solution__timeline-inner">
              <div class="fc-deploy-solution__timeline-stage">
                <img class="fc-deploy-solution__timeline-logs" src="${esc(v.logs)}" alt="${esc(t({ en: "Deployment logs", zh: "部署日志" }, lang))}" width="${v.logsWidth}" height="${v.logsHeight}" loading="lazy">
                <img class="fc-deploy-solution__timeline-arrow" src="${esc(v.arrow)}" alt="" aria-hidden="true" width="${v.arrowWidth}" height="${v.arrowHeight}">
                <div class="fc-deploy-solution__timeline-stepper-panel">
                  <img class="fc-deploy-solution__timeline-stepper" src="${esc(v.stepper)}" alt="${esc(t({ en: "Progress stepper", zh: "进度步骤条" }, lang))}" width="${v.stepperWidth}" height="${v.stepperHeight}" loading="lazy">
                </div>
              </div>
              <div class="fc-deploy-solution__copy">
                <h3>${esc(t(band.title, lang))}</h3>
                <p>${esc(t(band.body, lang))}</p>
              </div>
            </div>
          </article>`;
        }

        let visual = "";
        if (band.visual?.before && band.visual?.after) {
          visual = `
            <div class="fc-deploy-solution__visual fc-deploy-solution__visual--compare">
              <img class="fc-deploy-solution__before" src="${esc(band.visual.before)}" alt="" loading="lazy">
              <img class="fc-deploy-solution__arrow-h" src="${esc(band.visual.arrow)}" alt="" aria-hidden="true">
              <img class="fc-deploy-solution__after" src="${esc(band.visual.after)}" alt="" loading="lazy">
            </div>`;
        } else if (band.visual?.main) {
          const arrow = band.visual.arrow
            ? `<img class="fc-deploy-solution__arrow-v" src="${esc(band.visual.arrow)}" alt="" aria-hidden="true">`
            : "";
          const mainSize = band.visual.mainWidth && band.visual.mainHeight
            ? ` width="${band.visual.mainWidth}" height="${band.visual.mainHeight}"`
            : "";
          visual = `
            <div class="fc-deploy-solution__visual">
              ${arrow}
              <img src="${esc(band.visual.main)}" alt="" loading="lazy"${mainSize}>
            </div>`;
        }
        const textFirst = band.tone === "pink";
        return `
          <article class="fc-deploy-solution fc-deploy-solution--${band.tone}">
            <div class="fc-deploy-solution__inner${textFirst ? " fc-deploy-solution__inner--reverse" : ""}">
              ${textFirst ? visual : ""}
              <div class="fc-deploy-solution__copy">
                <h3>${esc(t(band.title, lang))}</h3>
                <p>${esc(t(band.body, lang))}</p>
              </div>
              ${textFirst ? "" : visual}
            </div>
          </article>`;
      })
      .join("");

    return `
      <section class="fc-section fc-deploy-solutions">
        <h2 class="fc-section__title">${esc(t(d.title, lang))}</h2>
        <div class="fc-deploy-solutions__bands">${bands}</div>
      </section>`;
  };

  window.renderDeploymentBreakdown = function (lang) {
    const d = window.DEPLOYMENT_DATA?.breakdown;
    if (!d) return "";

    const renderLabelPill = (card) =>
      `<span class="fc-deploy-bd-labels__pill fc-deploy-bd-labels__pill--${card.tone}">
        <img class="fc-deploy-bd-labels__pill-icon" src="${esc(card.icon)}" alt="" aria-hidden="true" width="22" height="22">
        <span class="fc-deploy-bd-labels__pill-text">${esc(t(card.label, "en"))}</span>
      </span>`;

    const renderLabelsDefinition = () => {
      const ld = d.labelsDefinition;
      if (!ld) return "";
      const cards = (ld.cards || [])
        .map((card) => {
          let help = "";
          if (card.help?.parts) {
            help = `<p class="fc-deploy-bd-labels__help">${card.help.parts
              .map((part) => `<span class="fc-deploy-bd-labels__help-part">${esc(t(part, "en"))}</span>`)
              .join("")}</p>`;
          } else if (card.help?.text) {
            help = `<p class="fc-deploy-bd-labels__help fc-deploy-bd-labels__help--failed">${esc(t(card.help.text, "en"))}</p>`;
          }
          const headerInner = card.help
            ? `<div class="fc-deploy-bd-labels__label-group">${renderLabelPill(card)}${help}</div>`
            : renderLabelPill(card);
          const headerClass = card.help
            ? "fc-deploy-bd-labels__header"
            : "fc-deploy-bd-labels__header fc-deploy-bd-labels__header--solo";
          return `
          <article class="fc-deploy-bd-labels__card fc-deploy-bd-labels__card--${card.tone}">
            <div class="fc-deploy-bd-labels__card-inner">
              <div class="${headerClass}">${headerInner}</div>
              <p class="fc-deploy-bd-labels__body">${esc(t(card.body, lang))}</p>
            </div>
          </article>`;
        })
        .join("");

      return `
        <div class="fc-deploy-bd-labels">
          <h3 class="fc-deploy-bd-labels__title">${esc(t(ld.title, lang))}</h3>
          <p class="fc-deploy-bd-labels__subtitle">${esc(t(ld.subtitle, lang))}</p>
          <div class="fc-deploy-bd-labels__row">${cards}</div>
        </div>`;
    };

    const renderStatusModal = () => {
      const sm = d.statusModal;
      if (!sm) return "";

      const renderWalkthrough = () => {
        const wt = sm.walkthrough;
        if (!wt) return "";
        const notes = (wt.notes || [])
          .map((note) => `
            <li class="fc-deploy-bd-modal__note">
              <span class="fc-deploy-bd-modal__note-num" aria-hidden="true">${note.n}</span>
              <p class="fc-deploy-bd-modal__note-text">${field(note, lang)}</p>
            </li>`)
          .join("");
        const visual = wt.visual
          ? `<figure class="fc-deploy-bd-modal__visual">
              <img src="${esc(wt.visual.src)}" alt="${esc(t({ en: "Model deployment status modal", zh: "模型部署状态弹窗" }, lang))}" loading="lazy" width="${wt.visual.width}" height="${wt.visual.height}">
            </figure>`
          : "";
        const phases = wt.phases
          ? `<figure class="fc-deploy-bd-modal__phases">
              <img src="${esc(wt.phases.src)}" alt="${esc(t({ en: "Step phases diagram", zh: "步骤阶段示意图" }, lang))}" loading="lazy" width="${wt.phases.width}" height="${wt.phases.height}">
            </figure>`
          : "";
        return `
          <div class="fc-deploy-bd-modal__walkthrough">
            ${visual}
            <div class="fc-deploy-bd-modal__notes">
              <ol class="fc-deploy-bd-modal__note-list">${notes}</ol>
              ${phases}
            </div>
          </div>`;
      };

      const variants = sm.variants
        ? `<figure class="fc-figma-slice fc-deploy-bd-modal__variants" style="--slice-aspect: ${sm.variants.width} / ${sm.variants.height}">
            <img src="${esc(sm.variants.src)}" alt="${esc(t({ en: "Available, failed, and unknown status modals", zh: "可用、失败与未知状态弹窗" }, lang))}" loading="lazy" width="${sm.variants.width}" height="${sm.variants.height}">
          </figure>`
        : "";
      return `
        <div class="fc-deploy-bd-modal">
          <h3 class="fc-deploy-bd-modal__title">${esc(t(sm.title, lang))}</h3>
          ${renderWalkthrough()}
          <p class="fc-deploy-bd-modal__intro">${esc(t(sm.intro, lang))}</p>
        </div>
        ${variants}`;
    };

    const renderEventsLog = () => {
      const el = d.eventsLog;
      if (!el) return "";
      const paragraphs = (el.paragraphs || [])
        .map((p) => `<p>${esc(t(p, lang))}</p>`)
        .join("");
      const visual = el.visual
        ? `<figure class="fc-deploy-bd-events__visual">
            <img src="${esc(el.visual.src)}" alt="${esc(t({ en: "Model deployment status modal with event log", zh: "含事件日志的模型部署状态弹窗" }, lang))}" loading="lazy" width="${el.visual.width}" height="${el.visual.height}">
          </figure>`
        : "";
      return `
        <div class="fc-deploy-bd-events">
          <div class="fc-deploy-bd-events__copy">
            <h3 class="fc-deploy-bd-events__title">${esc(t(el.title, lang))}</h3>
            <div class="fc-deploy-bd-events__body">${paragraphs}</div>
          </div>
          ${visual}
        </div>`;
    };

    const renderUiPresentation = () => {
      const ui = d.uiPresentation;
      if (!ui) return "";
      return `
        <div class="fc-deploy-bd-ui">
          <h3 class="fc-deploy-bd-ui__title">${esc(t(ui.title, lang))}</h3>
          <figure class="fc-figma-slice fc-deploy-bd-ui-presentation" style="--slice-aspect: ${ui.width} / ${ui.height}">
            <img src="${esc(ui.src)}" alt="${esc(t({ en: "UI presentation of deployment status modals", zh: "部署状态弹窗 UI 展示" }, lang))}" loading="lazy" width="${ui.width}" height="${ui.height}">
          </figure>
        </div>`;
    };

    return `
      <section class="fc-section fc-deploy-breakdown">
        <h2 class="fc-section__title">${esc(t(d.title, lang))}</h2>
        ${renderLabelsDefinition()}
        ${renderStatusModal()}
        ${renderEventsLog()}
        ${renderUiPresentation()}
      </section>`;
  };

  window.renderDeploymentTradeoffs = function (lang) {
    const d = window.DEPLOYMENT_DATA?.tradeoffs;
    if (!d) return "";
    const items = (d.items || [])
      .map((item) => {
        const rows = (item.rows || [])
          .map(
            (row) => `
            <div class="fc-deploy-tradeoff__row fc-deploy-tradeoff__row--${row.kind}">
              <img class="fc-deploy-tradeoff__row-icon" src="${esc(tradeoffIcon(row.kind))}" alt="" width="24" height="24" aria-hidden="true">
              <p class="fc-deploy-tradeoff__row-label">${esc(t(row.label, lang))}</p>
              <div class="fc-deploy-tradeoff__row-body">${field(row, lang)}</div>
            </div>`
          )
          .join("");
        const reverse = item.imageSide === "right";
        const panel = item.variant === "panel";
        const figDims =
          item.imageWidth && item.imageHeight
            ? ` width="${item.imageWidth}" height="${item.imageHeight}"`
            : "";
        return `
          <article class="fc-deploy-tradeoff${panel ? " fc-deploy-tradeoff--panel" : ""}">
            <div class="fc-deploy-tradeoff__inner${reverse ? " fc-deploy-tradeoff__inner--reverse" : ""}${panel ? " fc-deploy-tradeoff__inner--panel" : ""}">
              <figure class="fc-deploy-tradeoff__fig${panel ? " fc-deploy-tradeoff__fig--panel" : ""}">
                <img src="${esc(item.image)}" alt="" loading="lazy"${figDims}>
              </figure>
              <div class="fc-deploy-tradeoff__copy${panel ? " fc-deploy-tradeoff__copy--panel" : ""}${!item.intro ? " fc-deploy-tradeoff__copy--no-intro" : ""}">
                <h3>${esc(t(item.title, lang))}</h3>
                ${item.intro ? `<p class="fc-deploy-tradeoff__intro">${esc(t(item.intro, lang))}</p>` : ""}
                <div class="fc-deploy-tradeoff__rows">${rows}</div>
              </div>
            </div>
          </article>`;
      })
      .join("");

    return `
      <section class="fc-section fc-deploy-tradeoffs">
        <h2 class="fc-section__title">${esc(t(d.title, lang))}</h2>
        <div class="fc-deploy-tradeoffs__list">${items}</div>
      </section>`;
  };

  window.renderDeploymentUx = function (lang) {
    const d = window.DEPLOYMENT_DATA?.ux;
    if (!d) return "";
    const ev = d.evaluation;
    const ext = d.extension;

    const testimonials = (ev.testimonials || [])
      .map(
        (card) => `
        <blockquote class="fc-deploy-testimonial">
          <img class="fc-deploy-testimonial__quote" src="${ICON}quote.svg" alt="" width="32" height="31" aria-hidden="true">
          <p class="fc-deploy-testimonial__text">${esc(quoteT(card.text, lang))}</p>
          <footer>
            <p class="fc-deploy-testimonial__author">${esc(t(card.author, lang))}</p>
            <p class="fc-deploy-testimonial__role">${esc(t(card.role, lang))}</p>
          </footer>
        </blockquote>`
      )
      .join("");

    const renderExtensionExamples = () =>
      (ext.examples || [])
        .map((ex) => {
          const reverse = ex.layout === "visual-right";
          const steps = (ex.steps || [])
            .map(
              (step) => `
              <div class="fc-deploy-extension__step">
                <span class="fc-deploy-extension__step-num">${esc(step.num)}</span>
                <p class="fc-deploy-extension__step-text">${esc(t(step.text, lang))}</p>
              </div>`
            )
            .join("");
          const visual = ex.visual
            ? `<figure class="fc-deploy-extension__fig">
                <img src="${esc(ex.visual.src)}" alt="" loading="lazy" width="${ex.visual.width}" height="${ex.visual.height}">
              </figure>`
            : "";
          const inlineVisual = ex.inlineVisual
            ? `<figure class="fc-deploy-extension__inline">
                <img src="${esc(ex.inlineVisual.src)}" alt="" loading="lazy" width="${ex.inlineVisual.width}" height="${ex.inlineVisual.height}">
              </figure>`
            : "";
          return `
            <article class="fc-deploy-extension__card${reverse ? " fc-deploy-extension__card--reverse" : ""}">
              ${reverse ? "" : visual}
              <div class="fc-deploy-extension__copy">
                <h3 class="fc-deploy-extension__heading">${esc(t(ex.heading, lang))}</h3>
                <div class="fc-deploy-extension__body">${field(ex.body, lang)}</div>
                ${steps ? `<div class="fc-deploy-extension__steps">${steps}</div>` : ""}
                ${inlineVisual}
              </div>
              ${reverse ? visual : ""}
            </article>`;
        })
        .join("");

    return `
      <section class="fc-section fc-deploy-ux">
        <h2 class="fc-section__title">${esc(t(ev.title, lang))}</h2>
        <h3 class="fc-deploy-ux__subtitle">${esc(t(ev.subtitle, lang))}</h3>
        <p class="fc-deploy-ux__intro">${field(ev.intro, lang)}</p>
        <div class="fc-deploy-testimonials">${testimonials}</div>

        <h2 class="fc-section__title fc-deploy-ux__gap">${esc(t(ext.title, lang))}</h2>
        <div class="fc-deploy-extension-intro">${field(ext.intro, lang)}</div>
        <div class="fc-deploy-extension__examples">${renderExtensionExamples()}</div>
      </section>`;
  };
})();
