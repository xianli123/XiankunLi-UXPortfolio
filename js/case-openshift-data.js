/**
 * OpenShift AI case study content — HTML/CSS blocks and CSS UI mockups (no raster images).
 */
(function () {
  "use strict";

  const VERB_ROWS = [
    [
      { en: "Create/Duplicate", zh: "创建/复制", rowspan: 1 },
      "Create",
      { en: "Create or duplicate a resource", zh: "创建或复制资源" },
    ],
    [
      { en: "Read/Preview", zh: "读取/预览", rowspan: 4 },
      "Get",
      { en: "Retrieve detailed information about a specific resource", zh: "获取特定资源的详细信息" },
    ],
    ["List", { en: "List all instances of a resource", zh: "列出资源的所有实例" }],
    ["Watch", { en: "Continuously monitor a resource for changes", zh: "持续监控资源变更" }],
    [
      { en: "Update", zh: "更新", rowspan: 2 },
      "Update",
      { en: "Modify multiple parts of an existing resource at one time", zh: "一次性修改现有资源的多个部分" },
    ],
    ["Patch", { en: "Partially update an existing resource's data", zh: "部分更新现有资源的数据" }],
    [
      "Delete",
      "Delete",
      { en: "Remove a resource", zh: "删除资源" },
    ],
  ];

  const PROCESS_RBAC = [
    { icon: "hearing.svg", label: "Customer insights sorting" },
    { icon: "queue-play-next.svg", label: "Tech research" },
    { icon: "contact-emergency.svg", label: "User research" },
    { icon: "equalizer.svg", label: "Competitor research" },
    { icon: "swap-calls.svg", label: "Conceptual design" },
    { icon: "app-registration.svg", label: "Hi-fi design" },
    { icon: "send-time-extension.svg", label: "Design hand-off" },
    { icon: "contact-phone.svg", label: "Usability testing" },
    { icon: "video-file.svg", label: "Event tracking design" },
  ];

  const PROCESS_RBAC_ZH = [
    { icon: "hearing.svg", label: "客户洞察梳理" },
    { icon: "queue-play-next.svg", label: "技术调研" },
    { icon: "contact-emergency.svg", label: "用户研究" },
    { icon: "equalizer.svg", label: "竞品调研" },
    { icon: "swap-calls.svg", label: "概念设计" },
    { icon: "app-registration.svg", label: "高保真设计" },
    { icon: "send-time-extension.svg", label: "设计交付" },
    { icon: "contact-phone.svg", label: "可用性测试" },
    { icon: "video-file.svg", label: "埋点设计" },
  ];

  const PROCESS_MODEL = PROCESS_RBAC.filter((s) => s.label !== "Usability testing");
  const PROCESS_MODEL_ZH = PROCESS_RBAC_ZH.filter((s) => s.label !== "可用性测试");

  const PROCESS_DEPLOY = [
    { icon: "hearing.svg", label: "Customer insights sorting" },
    { icon: "contact-emergency.svg", label: "User research" },
    { icon: "content-paste-search.svg", label: "Old design evaluation" },
    { icon: "swap-calls.svg", label: "Conceptual design" },
    { icon: "app-registration.svg", label: "Hi-fi design" },
    { icon: "send-time-extension.svg", label: "Design hand-off" },
    { icon: "content-paste-go.svg", label: "New design evaluation" },
    { icon: "dynamic-feed.svg", label: "Design extension" },
  ];

  const PROCESS_DEPLOY_ZH = [
    { icon: "hearing.svg", label: "客户洞察梳理" },
    { icon: "contact-emergency.svg", label: "用户研究" },
    { icon: "content-paste-search.svg", label: "旧版设计评估" },
    { icon: "swap-calls.svg", label: "概念设计" },
    { icon: "app-registration.svg", label: "高保真设计" },
    { icon: "send-time-extension.svg", label: "设计交付" },
    { icon: "content-paste-go.svg", label: "新版设计评估" },
    { icon: "dynamic-feed.svg", label: "设计延展" },
  ];

  window.CASE_OPENSHIFT_DATA = {
    "rbac-v1": {
      id: "rbac-v1",
      version: 1,
      codeName: {
        en: "RBAC Design in AI Project V1",
        zh: "AI 项目中的 RBAC 权限设计 V1",
      },
      template: "openshift",
      blocks: [
        {
          type: "hero",
          variant: "rbac",
          image: "assets/cases/openshift-ai/rbac/hero/hero-illustration.svg",
          illustrationWidth: 446,
          illustrationHeight: 442,
          product: { en: "Red Hat OpenShift AI 3.4", zh: "Red Hat OpenShift AI 3.4" },
          title: { en: "RBAC Design in AI Project", zh: "AI 项目中的 RBAC 权限设计" },
          tagline: {
            en: "Designing an intuitive role-based access control system that empowers teams to manage permissions efficiently while maintaining security and clarity in an AI project.",
            zh: "为 AI 项目设计直观的 RBAC 权限体系，帮助团队高效管理权限，同时保持安全边界与操作清晰度。",
          },
          meta: {
            role: { en: "End-to-end Designer", zh: "端到端设计师" },
            duration: { en: "12 Weeks", zh: "12 周" },
            platform: { en: "Web Application", zh: "Web 应用" },
            team: { en: "1 Designer, 3 Engineers, 2 PMs", zh: "1 设计师、3 工程师、2 PM" },
            productLabel: { en: "Red Hat OpenShift AI", zh: "Red Hat OpenShift AI" },
          },
          process: { en: PROCESS_RBAC, zh: PROCESS_RBAC_ZH, layout: "rbac-stagger" },
        },
        {
          type: "section",
          title: { en: "Project context", zh: "项目背景" },
          blocks: [
            {
              type: "split",
              left: {
                title: { en: "Background", zh: "背景" },
                body: {
                  en: "Red Hat OpenShift AI is an enterprise cloud-native AI/ML platform for data science and AI/ML engineering. With increasing adoption in enterprises and education, demand for fine-grained access control has grown.",
                  zh: "Red Hat OpenShift AI 是企业级云原生 AI/ML 平台，面向数据科学家与 AI/ML 工程师。随着企业与教育场景采用率提升，对细粒度访问控制的需求日益增长。",
                },
              },
              right: {
                title: { en: "Challenges", zh: "挑战" },
                items: [
                  {
                    icon: "person-add-disabled.svg",
                    text: {
                      en: "The platform only provides two project roles (Admin/Contributor) previously, lacking granular permission management. This creates security compliance and resource isolation risks.",
                      zh: "平台此前仅提供 Admin/Contributor 两种项目角色，缺少细粒度权限管理，带来安全合规与资源隔离风险。",
                    },
                  },
                  {
                    icon: "vpn-key-off.svg",
                    text: {
                      en: "Organizations struggle with managing complex permission structures. The existing system lacked clarity, making it difficult for admin to understand who has access to what, and why.",
                      zh: "组织难以管理复杂权限结构。现有系统信息不清晰，管理员难以判断权限归属及原因。",
                    },
                  },
                ],
              },
            },
            {
              type: "band",
              title: { en: "Key customer insights", zh: "关键客户洞察" },
              body: {
                en: "Our UXD team maintains close alignment with the customer support(CAI) team, and this design originated from requirements raised by two key enterprise customers.",
                zh: "UXD 团队与客户支持（CAI）团队保持紧密协作，本设计源于两家关键企业客户提出的需求。",
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
          ],
        },
        {
          type: "section",
          title: { en: "Tech research", zh: "技术调研" },
          blocks: [
            {
              type: "content",
              body: {
                en: "OpenShift AI permissions build on Kubernetes RBAC, so I researched the native model and how other platforms expose it before designing workflows that stay compliant and understandable.",
                zh: "OpenShift AI 的权限基于 Kubernetes RBAC。因此在设计流程前，我先调研原生模型与同类产品的做法，确保方案既合规又便于理解。",
              },
            },
            {
              type: "verbTable",
              title: { en: "Roles and verbs", zh: "角色与操作动词" },
              body: {
                en: "Mapped platform permission actions to native Kubernetes RBAC verbs, ensuring consistent, secure, and programmable access control.",
                zh: "将平台权限操作映射到 Kubernetes 原生 RBAC 动词，确保一致、安全且可编程的访问控制。",
              },
              image: "assets/cases/openshift-ai/rbac/research/roles-verbs-table.png",
              imageAlt: { en: "Roles and verbs mapping table", zh: "角色与操作动词映射表" },
            },
            {
              type: "bindingSplit",
              image: "assets/cases/openshift-ai/rbac/research/role-binding.png",
              imageAlt: { en: "Kubernetes RoleBinding example", zh: "Kubernetes RoleBinding 示例" },
              title: { en: "Role and role binding", zh: "Role 与 RoleBinding" },
              paragraphs: [
                {
                  en: "In Kubernetes RBAC, a role defines what actions are allowed on which resources, while a RoleBinding assigns that role to a specific user, group, or service account. They are kept separate so permissions can be reused and managed flexibly.",
                  zh: "在 Kubernetes RBAC 中，Role 定义允许对哪些资源执行哪些操作，RoleBinding 将该角色分配给特定用户、组或服务账户。两者分离以便灵活复用与管理权限。",
                },
                {
                  en: "A RoleBinding typically includes three core components: the role to be assigned, the subject (user/group/service account) receiving the role, and the specific resources the role applies to. The image shows an example of a role binding in K8S.",
                  zh: "RoleBinding 通常包含三个核心组件：要分配的角色、获得角色的主体（用户/组/服务账户），以及角色适用的具体资源。图示为 Kubernetes 中的 RoleBinding 示例。",
                },
              ],
            },
            {
              type: "insightRow",
              title: { en: "Insights from tech research", zh: "技术调研洞察" },
              columns: 5,
              items: [
                { en: "Aligns with Kubernetes-native RBAC, ensuring compatibility and future scalability.", zh: "对齐 Kubernetes 原生 RBAC，确保兼容性与未来可扩展性" },
                { en: "Solves real user pain points (e.g., unclear permission details) with user-centric features.", zh: "以用户为中心的功能解决真实痛点（如权限详情不清晰）" },
                { en: "Builds a secure, compliant foundation that meets enterprise requirements.", zh: "构建满足企业要求的安全合规基础" },
                { en: "Establishes feasibility analysis for future new role definitions and introductions.", zh: "为未来新角色定义与引入建立可行性分析" },
                { en: "Simplifies complexity by translating technical verbs into intuitive actions for users.", zh: "将技术动词转化为直观操作，简化复杂度" },
              ],
            },
          ],
        },
        {
          type: "section",
          title: { en: "User research", zh: "用户研究" },
          blocks: [
            {
              type: "journey",
              title: { en: "User journey map", zh: "用户旅程图" },
              body: {
                en: "This section outlines the full workflow for project admins to assign workbench access permissions to new team members. Existing users follow a similar process, ensuring consistent permission management across the team.",
                zh: "本节梳理项目管理员为新成员分配 Workbench 访问权限的完整流程。现有用户遵循类似流程，确保团队权限管理一致。",
              },
              steps: [
                { emoji: "😟", phase: { en: "Identify problem", zh: "识别问题" }, title: { en: "New hire onboarding", zh: "新员工入职" }, body: { en: "New team members need access to existing workbenches, but should not have permission to modify configurations.", zh: "新成员需要访问现有 Workbench，但不应拥有修改配置的权限。" } },
                { emoji: "🤔", phase: { en: "Find a solution", zh: "寻找方案" }, title: { en: "Review permissions", zh: "查看权限" }, bodyHtml: { en: 'The project admin logs into the RHOAI, navigates to the <strong>Permissions</strong> tab, and reviews available roles.', zh: "项目管理员登录 RHOAI，进入 <strong>Permissions</strong> 标签页并查看可用角色。" } },
                { emoji: "😊", phase: { en: "Configure permissions", zh: "配置权限" }, titleHtml: { en: 'Assign <em>Reader</em> role', zh: "分配 <em>Reader</em> 角色" }, bodyHtml: { en: 'Select the <strong>Workbench reader</strong> role, specify the target workbench name, and add the user.', zh: "选择 <strong>Workbench reader</strong> 角色，指定目标 Workbench 名称并添加用户。" } },
                { emoji: "✅", phase: { en: "Verify result", zh: "验证结果" }, title: { en: "Test access", zh: "测试访问" }, body: { en: "The new employee confirms they can view workbench details, while the edit button is disabled.", zh: "新员工确认可查看 Workbench 详情，且编辑按钮被禁用。" } },
                { emoji: "😌", phase: { en: "Ongoing management", zh: "持续管理" }, title: { en: "Permission audits", zh: "权限审计" }, body: { en: "Regularly review permission assignments to ensure compliance with security requirements.", zh: "定期审核权限分配，确保符合安全要求。" } },
              ],
            },
            {
              type: "pain",
              subtitle: { en: "Painpoints", zh: "痛点" },
              items: [
                { icon: "co-present.svg", title: { en: "Coarse permission granularity", zh: "权限粒度过粗" }, text: { en: "Existing roles (admin and edit) are too broad, violating the principle of least privilege and creating security risks.", zh: "现有角色（admin 与 edit）范围过宽，违反最小权限原则并带来安全风险。" } },
                { icon: "select-all.svg", title: { en: "Poor resource isolation", zh: "资源隔离不足" }, text: { en: "No effective isolation of resource access between users/groups in the same project, a key need for education and multi-tenant scenarios.", zh: "同一项目内用户/组之间缺乏有效资源访问隔离，是教育与多租户场景的关键需求。" } },
                { icon: "visibility-off.svg", title: { en: "Opaque role definitions", zh: "角色定义不透明" }, text: { en: "Custom role permissions are defined via complex Kubernetes APIs, lacking visualization and making audits difficult.", zh: "自定义角色权限通过复杂 Kubernetes API 定义，缺少可视化，审计困难。" } },
                { icon: "edit-off.svg", title: { en: "Fragmented management experience", zh: "管理体验割裂" }, text: { en: "Advanced permission tasks require switching to the OpenShift console, raising costs and breaking UX consistency.", zh: "高级权限任务需切换至 OpenShift 控制台，增加成本并影响体验一致性。" } },
              ],
            },
          ],
        },
        {
          type: "section",
          title: { en: "Competitor research", zh: "竞品调研" },
          blocks: [
            {
              type: "content",
              body: {
                en: "I thoroughly studied RBAC implementations on leading enterprise platforms, adopted best practices, and leveraged native Kubernetes capabilities. Competitors include Microsoft Azure, Google Cloud, Databricks, AWS, and RedHat—with emphasis on AI/ML workspace access control including Azure Machine Learning, SageMaker, Vertex AI, and Databricks Unity Catalog.",
                zh: "我深入研究领先企业平台的 RBAC 实现，采纳最佳实践并充分利用 Kubernetes 原生能力。竞品包括 Microsoft Azure、Google Cloud、Databricks、AWS 与 Red Hat，重点关注 Azure ML、SageMaker、Vertex AI 与 Databricks Unity Catalog 等 AI/ML 工作区访问控制。",
              },
            },
            {
              type: "competitorPanels",
              panels: [
                { src: "assets/cases/openshift-ai/rbac/research/competitor-01.png", alt: { en: "Azure RBAC reference", zh: "Azure RBAC 参考" } },
                { src: "assets/cases/openshift-ai/rbac/research/competitor-02.png", alt: { en: "Google Cloud RBAC reference", zh: "Google Cloud RBAC 参考" } },
                { src: "assets/cases/openshift-ai/rbac/research/competitor-03.png", alt: { en: "Databricks RBAC reference", zh: "Databricks RBAC 参考" } },
                { src: "assets/cases/openshift-ai/rbac/research/competitor-04.png", alt: { en: "AWS RBAC reference", zh: "AWS RBAC 参考" } },
                { src: "assets/cases/openshift-ai/rbac/research/competitor-05.png", alt: { en: "Red Hat RBAC reference", zh: "Red Hat RBAC 参考" } },
              ],
            },
            {
              type: "columns",
              columns: [
                {
                  title: { en: "Common pain points", zh: "常见痛点" },
                  intro: { en: "There are several common pain points in the fine-grained role authorization process.", zh: "细粒度角色授权流程中存在若干常见痛点。" },
                  bullets: [
                    { en: "Lack of search/filter capabilities in extensive permission lists.", zh: "冗长权限列表缺少搜索/筛选能力。" },
                    { en: "Unclear permission request paths for users without admin contact.", zh: "普通用户缺少清晰的权限申请路径。" },
                    { en: "Difficulty distinguishing users from groups in selection interfaces.", zh: "选择界面难以区分用户与组。" },
                    { en: "Complex documentation making it hard to identify the right permissions.", zh: "文档复杂，难以找到正确权限。" },
                    { en: "No permission simulation tools to test configurations (except limited support in AWS).", zh: "缺少权限模拟工具（AWS 支持有限）。" },
                  ],
                },
                {
                  title: { en: "Common role management patterns", zh: "常见角色管理模式" },
                  intro: { en: "All platforms share common patterns:", zh: "各平台共有以下模式：" },
                  bullets: [
                    {
                      label: { en: "Role types", zh: "角色类型" },
                      text: {
                        en: "A clear distinction between privileged admin roles (Admin, Contributor) and job function roles (granular resource permissions).",
                        zh: "特权管理角色（Admin、Contributor）与职能角色（细粒度资源权限）的清晰区分。",
                      },
                    },
                    {
                      label: { en: "Assignment methods", zh: "分配方式" },
                      text: {
                        en: "Support for direct assignment, group-based inheritance, and co-administrator designation.",
                        zh: "支持直接分配、组继承与共同管理员委派。",
                      },
                    },
                    {
                      label: { en: "Scope levels", zh: "作用域层级" },
                      text: {
                        en: "Multi-layered management, from management groups/subscriptions down to individual resources.",
                        zh: "从管理组/订阅到单个资源的多层管理。",
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: "content",
              spacingTop: 48,
              title: { en: "Inspiration from competitor analysis", zh: "竞品分析启发" },
              body: {
                en: "During discussions with the product and business team, we agreed to split collected inspirations and required features into two phases: MVP phase and Post-MVP phase. This allows us to fully focus on users' core needs in the MVP stage and make better use of the engineering team's development efforts.",
                zh: "与产品、业务团队讨论后，我们将收集的灵感与需求功能拆分为 MVP 与 Post-MVP 两阶段，以便在 MVP 阶段聚焦用户核心需求，并更高效地投入开发资源。",
              },
            },
            {
              type: "metrics",
              tone: "mvp",
              labelHtml: {
                en: 'Our focus in the <span class="fc-metrics__phase">MVP phase</span> is shown as below.',
                zh: '我们在 <span class="fc-metrics__phase">MVP 阶段</span> 的重点如下。',
              },
              items: [
                { num: "01", text: { en: "Build AI scenario-based role mapping on top of K8S RBAC", zh: "在 Kubernetes RBAC 之上构建 AI 场景角色映射" } },
                { num: "02", text: { en: "Offer out-of-the-box AI-exclusive roles for OpenShift AI console", zh: "为 OpenShift AI 控制台提供开箱即用的 AI 专属角色" } },
                { num: "03", text: { en: "Provide fine-grained permissions at the resource level", zh: "提供资源级细粒度权限" } },
                { num: "04", text: { en: "Predefined roles categorized by plugin source", zh: "按插件来源分类的预定义角色" } },
                { num: "05", text: { en: "Visualize permission rules within the OpenShift AI console", zh: "在 OpenShift AI 控制台内可视化权限规则" } },
                { num: "06", text: { en: "Follow the K8S architecture: Role + RoleBinding", zh: "遵循 Kubernetes 架构：Role + RoleBinding" } },
              ],
            },
            {
              type: "metrics",
              tone: "post",
              labelHtml: {
                en: 'For the <span class="fc-metrics__phase">Post-MVP phase</span>, we will extend and enrich the relevant functionalities as follows.',
                zh: '在 <span class="fc-metrics__phase">Post-MVP 阶段</span>，我们将按以下方向扩展与丰富相关功能。',
              },
              items: [
                { num: "01", text: { en: "Enable project admins to customize roles based on their needs", zh: "允许项目管理员按需自定义角色" } },
                { num: "02", text: { en: "Allow project admins to grant permissions to specific resource instances", zh: "允许为特定资源实例授权" } },
                { num: "03", text: { en: "Support role copy and quick configuration to improve admin efficiency", zh: "支持角色复制与快速配置" } },
                { num: "04", text: { en: "Allow end-users to view their roles and apply for new permissions", zh: "允许最终用户查看角色并申请新权限" } },
                { num: "05", text: { en: "Notify the end-users when permissions are changed", zh: "权限变更时通知最终用户" } },
              ],
            },
          ],
        },
        {
          type: "objectives",
          title: { en: "Design objectives", zh: "设计目标" },
          body: {
            en: "Based on customer insights, technical analysis, user research and competitive analysis, the core design objectives have been defined. Through discussions with PM, customer support and engineering teams, we have agreed to iterate and upgrade features in line with these established design goals.",
            zh: "基于客户洞察、技术分析、用户研究与竞品分析，已定义核心设计目标。通过与 PM、客户支持团队及开发团队讨论，就按既定目标迭代升级功能达成一致。",
          },
          cards: [
            { icon: "supervised-user-circle.svg", title: { en: "Granular control", zh: "细粒度控制" }, text: { en: "Enable fine-grained permission management for resources, allowing adminis to precisely control user permissions for view, edit, use, or delete actions.", zh: "为资源启用细粒度权限管理，使管理员能精确控制用户的查看、编辑、使用或删除权限。" } },
            { icon: "manage-accounts.svg", title: { en: "User management", zh: "用户管理" }, text: { en: "Streamlined role assignment processes, enabling the project admins to efficiently manage team permissions at scale.", zh: "简化角色分配流程，使项目管理员能高效管理大规模团队的权限。" } },
            { icon: "security.svg", title: { en: "Enterprise-grade security", zh: "企业级安全" }, text: { en: "Built on Kubernetes native RBAC, ensuring secure, auditable, and extensible access control across namespaces.", zh: "基于 Kubernetes 原生 RBAC，确保跨 namespace 安全、可审计且可扩展的访问控制。" } },
          ],
        },
        {
          type: "section",
          title: { en: "Design breakdown", zh: "设计拆解" },
          blocks: [
            null,
            {
              type: "assignmentHifi",
              title: { en: "Final hi-fi design of role assignment page", zh: "角色分配页面最终高保真设计" },
            },
          ],
        },
        { type: "usabilityTesting" },
        {
          type: "eventTracking",
          title: { en: "Event tracking design behind UX", zh: "体验背后的埋点设计" },
          heartTitle: { en: "Event tracking definition process", zh: "埋点定义流程" },
          heartBody: {
            en: "To enable data-driven design iteration, I established a user behavior tracking system for project-level RBAC using the HEART framework (Happiness, Engagement, Adoption, Retention, Task Success).",
            zh: "为实现数据驱动迭代，我基于 HEART 框架（Happiness、Engagement、Adoption、Retention、Task Success）为项目级 RBAC 建立用户行为追踪体系。",
          },
          process: [
            { icon: "event-tracking/insights.svg", text: { en: "Map out core user journeys", zh: "梳理核心用户旅程" } },
            { icon: "event-tracking/sticky-note-2.svg", text: { en: "Define interactive events for tracking", zh: "定义可追踪的交互事件" } },
            { icon: "event-tracking/inventory.svg", text: { en: "Deliver official event tracking documentation", zh: "交付官方埋点文档" } },
            { icon: "event-tracking/connect-without-contact.svg", text: { en: "Align requirements with research team", zh: "与研究团队对齐需求" } },
            { icon: "event-tracking/content-paste-search.svg", text: { en: "Validate design decisions with behavioral data", zh: "用行为数据验证设计决策" } },
            { icon: "event-tracking/published-with-changes.svg", text: { en: "Drive iterative optimization if needed", zh: "按需驱动迭代优化" } },
          ],
          exampleTitle: { en: "Example of event tracking specifications", zh: "埋点规格示例" },
          exampleBody: {
            en: "By implementing event tracking, I record user key actions, navigation paths, feature usage frequency, and drop-off points. This helps the team quantify performance, uncover real pain points, and continuously optimize the information architecture and interactions.",
            zh: "通过埋点记录关键操作、导航路径、功能使用频率与流失点，帮助团队量化表现、发现真实痛点并持续优化信息架构与交互。",
          },
          showMoreRow: true,
          groups: [
            {
              section: { en: "List view section", zh: "列表视图" },
              rows: [
                {
                  question: { en: "Are users actively reviewing the role's details in the list view?", zh: "用户是否在列表中主动查看角色详情？" },
                  kpi: { en: "Adoption", zh: "Adoption" },
                  eventName: "RBAC Role Details Clicked",
                  eventDesc: { en: "Measures clicks on the role name to open the role details modal and stay at the Role details tab.", zh: "统计点击角色名打开详情弹窗并停留在 Role details 标签的次数。" },
                  properties: [
                    { key: "role_type", value: "(ai_default_role | ai_custom_role | openshift_default_role | openshift_custom_role)" },
                    { key: "cluster_role:", value: "true/false" },
                  ],
                  screen: { en: "Triggered when a user opens a role's detail view from the role list", zh: "从角色列表打开详情时触发" },
                  priority: "high",
                },
              ],
            },
            {
              section: { en: "Role assignment section", zh: "角色分配" },
              rows: [
                {
                  question: { en: "How often do users initiate role assignment?", zh: "用户多久发起一次角色分配？" },
                  kpi: { en: "Engagement", zh: "Engagement" },
                  eventName: "RBAC Role Management Opened",
                  eventDesc: { en: "Measures clicks on Manage permissions to open the assignment page.", zh: "统计点击 Manage permissions 进入分配页面的次数。" },
                  properties: [{ key: "manage_permissions_button", value: "(toolbar | table row)" }],
                  screen: { en: "Triggered when a user clicks Manage permissions to start the assignment flow", zh: "点击 Manage permissions 开始分配流程时触发" },
                  priority: "low",
                },
                {
                  question: { en: "Do users rely on assignment status sorting to review scattered changes?", zh: "用户是否依赖 Assignment status 排序审查授权变更？" },
                  kpi: { en: "Adoption", zh: "Adoption" },
                  eventName: "RBAC Assignment Status Sorted",
                  eventDesc: { en: "Measures how many users sort the role assignment table by Assignment status.", zh: "统计使用 Assignment status 排序角色表的用户数。" },
                  properties: [
                    { key: "sort_column", value: "(assignment status)" },
                    { key: "sorting_status:", value: "true/false" },
                  ],
                  screen: { en: "Click on the Assignment status column header to sort the table", zh: "点击 Assignment status 列头排序表格" },
                  priority: "medium",
                },
              ],
            },
          ],
        },
        {
          type: "tags",
          items: { en: ["Enterprise AI", "RBAC", "Platform UX", "Event tracking"], zh: ["企业级 AI", "RBAC", "平台体验", "埋点设计"] },
        },
      ],
    },

    "model-details-v1": {
      id: "model-details-v1",
      version: 1,
      codeName: {
        en: "Validated Model's Details Design V1",
        zh: "Validated Models 详情页设计 V1",
      },
      template: "openshift",
      blocks: [
        {
          type: "hero",
          variant: "model",
          image: "assets/cases/openshift-ai/model-details/hero-illustration.png",
          illustrationWidth: 931,
          illustrationHeight: 514,
          product: { en: "Red Hat OpenShift AI 3.0", zh: "Red Hat OpenShift AI 3.0" },
          title: { en: "Validated Model's Details Design", zh: "Validated Models 详情页设计" },
          tagline: {
            en: "The validated model detail page is designed with refined information architecture and streamlined interactions to boost efficiency for data scientists and developers.",
            zh: "通过优化信息架构与交互流程，提升数据科学家与开发者在 Validated Models 详情页上的决策效率。",
          },
          meta: {
            role: { en: "End-to-end Designer", zh: "端到端设计师" },
            duration: { en: "12 Weeks", zh: "12 周" },
            platform: { en: "Web Application", zh: "Web 应用" },
            team: { en: "1 Designer, 3 Engineers, 2 PMs", zh: "1 设计师、3 工程师、2 PM" },
            productLabel: { en: "Red Hat OpenShift AI", zh: "Red Hat OpenShift AI" },
          },
          process: { en: PROCESS_MODEL, zh: PROCESS_MODEL_ZH, layout: "model-stagger" },
        },
        { type: "modelResearch" },
        { type: "modelIaMap" },
        { type: "modelDesignDetails" },
        {
          type: "eventTracking",
          title: { en: "Event tracking design behind UX", zh: "体验背后的埋点设计" },
          heartTitle: { en: "Event tracking definition process", zh: "埋点定义流程" },
          heartBodyHtml: {
            en: 'To enable data-driven design iteration, I established a user behavior tracking system for the Model Details page using the <strong>HEART</strong> framework (Happiness, Engagement, Adoption, Retention, Task Success). The flow is shown in the right panel.',
            zh: "为实现数据驱动迭代，我基于 <strong>HEART</strong> 框架（Happiness、Engagement、Adoption、Retention、Task Success）为 Model Details 页面建立用户行为追踪体系。流程见右侧面板。",
          },
          process: [
            { icon: "event-tracking/insights.svg", text: { en: "Map out core user journeys", zh: "梳理核心用户旅程" } },
            { icon: "event-tracking/sticky-note-2.svg", text: { en: "Define interactive events for tracking", zh: "定义可追踪的交互事件" } },
            { icon: "event-tracking/inventory.svg", text: { en: "Deliver official event tracking documentation", zh: "交付官方埋点文档" } },
            { icon: "event-tracking/connect-without-contact.svg", text: { en: "Align requirements with research team", zh: "与研究团队对齐需求" } },
            { icon: "event-tracking/content-paste-search.svg", text: { en: "Validate design decisions with behavioral data", zh: "用行为数据验证设计决策" } },
            { icon: "event-tracking/published-with-changes.svg", text: { en: "Drive iterative optimization if needed", zh: "按需驱动迭代优化" } },
          ],
          exampleTitle: { en: "Example of event tracking specifications", zh: "埋点规格示例" },
          exampleBody: {
            en: "By implementing event tracking, I will record user key actions, navigation paths, feature usage frequency, and drop-off points. This helps the team quantify performance, uncover real pain points, and continuously optimize the information architecture and interactions.",
            zh: "通过埋点记录关键操作、导航路径、功能使用频率与流失点，帮助团队量化表现、发现真实痛点并持续优化信息架构与交互。",
          },
          showMoreRow: true,
          groups: [
            {
              section: { en: "Hardware configuration", zh: "硬件配置" },
              rows: [
                {
                  question: { en: "Which column in the hardware configuration table is sorted by users?", zh: "用户会对硬件配置表的哪一列排序？" },
                  kpi: { en: "Engagement", zh: "Engagement" },
                  eventName: "Model Catalog Hardware Config Column Sorted",
                  eventDesc: {
                    en: "Tracks when a user sorts the hardware configuration table and captures which column was used for sorting.",
                    zh: "追踪用户对硬件配置表排序及所用列。",
                  },
                  properties: [{ key: "clickTarget; sorted_column", value: "(name of the column sorted)" }],
                  screen: { en: "Hardware configuration table", zh: "硬件配置表" },
                  priority: "high",
                },
                {
                  question: {
                    en: "Are users changing the hardware configuration in the 'Inference metrics' to compare performance?",
                    zh: "用户是否在 Inference metrics 中更改硬件配置以对比性能？",
                  },
                  kpi: { en: "Engagement", zh: "Engagement" },
                  eventName: "Model Catalog Inference Metrics Hardware Configured",
                  eventDesc: {
                    en: "Tracks when a user modifies the hardware configuration within the 'Inference metrics' view.",
                    zh: "追踪用户在 Inference metrics 视图中修改硬件配置。",
                  },
                  properties: [{ key: "Hardware configuration dropdown; Outcome; Success", value: "" }],
                  screen: { en: "Details page – Inference metrics (hardware selector)", zh: "详情页 – Inference metrics（硬件选择器）" },
                  priority: "high",
                },
                {
                  question: { en: "Which columns are selected to display in the table?", zh: "用户选择显示表格中的哪些列？" },
                  kpi: { en: "Adoption", zh: "Adoption" },
                  eventName: "Model Catalog Hardware Config Columns Displayed",
                  eventDesc: {
                    en: "Tracks which specific columns a user has selected to display in the hardware configuration table.",
                    zh: "追踪用户在硬件配置表中选择显示的列。",
                  },
                  properties: [
                    {
                      key: "column-title (checkboxValue); Selected-columns; Outcome (items changed + Save clicked); Success (selections applied)",
                      value: "",
                    },
                  ],
                  screen: { en: "Hardware configuration table – customize columns", zh: "硬件配置表 – 自定义列" },
                  priority: "medium",
                },
              ],
            },
          ],
        },
        {
          type: "tags",
          items: {
            en: ["Validated Models", "Information Architecture", "Benchmarks", "MLOps", "Event tracking"],
            zh: ["Validated Models", "信息架构", "Benchmark", "MLOps", "埋点设计"],
          },
        },
      ],
    },

    "deployment-tracking-v1": {
      id: "deployment-tracking-v1",
      version: 1,
      codeName: {
        en: "AI Model Deployment Tracking V1",
        zh: "AI 模型部署状态追踪 V1",
      },
      template: "openshift",
      blocks: [
        {
          type: "hero",
          variant: "deployment",
          image: "assets/cases/openshift-ai/deployment/hero-illustration.png",
          illustrationWidth: 943,
          illustrationHeight: 597,
          product: { en: "Red Hat OpenShift AI 3.0", zh: "Red Hat OpenShift AI 3.0" },
          title: {
            en: "AI Model Deployment Tracking",
            zh: "AI 模型部署状态追踪",
          },
          tagline: {
            en: "This design optimizes the model deployment tracking flow, clarifies progress status, simplifies error locating, and improves monitoring efficiency.",
            zh: "优化模型部署追踪流程，明确进度状态，简化错误定位，提升监控效率。",
          },
          meta: {
            role: { en: "End-to-end Designer", zh: "端到端设计师" },
            duration: { en: "6 Weeks", zh: "6 周" },
            platform: { en: "Web Application", zh: "Web 应用" },
            team: { en: "1 Designer, 4 Engineers, 1 PM", zh: "1 设计师、4 工程师、1 PM" },
            productLabel: { en: "Red Hat OpenShift AI", zh: "Red Hat OpenShift AI" },
          },
          process: { en: PROCESS_DEPLOY, zh: PROCESS_DEPLOY_ZH, layout: "deploy-stagger" },
        },
        { type: "deploymentResearch" },
        { type: "deploymentEvaluation" },
        { type: "deploymentSolutions" },
        { type: "deploymentBreakdown" },
        { type: "deploymentTradeoffs" },
        { type: "deploymentUx" },
        {
          type: "tags",
          items: {
            en: ["Deployment UX", "Status Design", "Error Handling", "Monitoring"],
            zh: ["部署体验", "状态设计", "错误处理", "监控"],
          },
        },
      ],
    },
  };

  window.applyRolesMappingBlock?.();
  window.applyRoleRevealBlock?.();
  window.applyRoleAssignmentBlock?.();

  function cloneOpenShiftCaseVersion(sourceId, targetId, version, codeName) {
    const src = window.CASE_OPENSHIFT_DATA[sourceId];
    if (!src) return;
    window.CASE_OPENSHIFT_DATA[targetId] = JSON.parse(JSON.stringify(src));
    const target = window.CASE_OPENSHIFT_DATA[targetId];
    target.id = targetId;
    target.version = version;
    target.codeName = codeName;
  }

  cloneOpenShiftCaseVersion("rbac-v1", "rbac-v2", 2, {
    en: "RBAC Design in AI Project V2",
    zh: "AI 项目中的 RBAC 权限设计 V2",
  });
  cloneOpenShiftCaseVersion("model-details-v1", "model-details-v2", 2, {
    en: "Validated Model's Details Design V2",
    zh: "Validated Models 详情页设计 V2",
  });
  cloneOpenShiftCaseVersion("deployment-tracking-v1", "deployment-tracking-v2", 2, {
    en: "AI Model Deployment Tracking V2",
    zh: "AI 模型部署状态追踪 V2",
  });
})();
