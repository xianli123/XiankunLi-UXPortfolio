/**
 * RBAC — Usability testing (Figma 4080:41258)
 */
(function () {
  "use strict";

  const U = "assets/cases/openshift-ai/rbac/usability/";

  window.USABILITY_TESTING_DATA = {
    title: { en: "Usability testing", zh: "可用性测试" },
    background: {
      title: { en: "Background", zh: "背景" },
      body: {
        en: "Before new RHOAI RBAC shipped, I participated as a key UX designer in moderated usability testing. We co-defined the study plan with research, product and engineering, observed 6 remote 1:1 sessions, and translated findings into actionable design recommendations.",
        zh: "在新版 RHOAI RBAC 上线前，我作为核心 UX 设计师规划并参与了可用性测试。与研究、产品、工程共同制定方案，观察 6 场远程 1:1 测试，并将发现转化为可执行设计建议。",
      },
    },
    goals: {
      title: { en: "Goals & business context", zh: "目标与业务背景" },
      body: {
        en: "RBAC is central to scalable governance on RHOAI. When features ship in bundles, end-to-end permission and guardrail experiences can feel disjointed. This study clarified admin expectations for project-level permission management before the decision point.",
        zh: "RBAC 是 RHOAI 可扩展治理的核心。当功能以组合形式发布时，端到端权限与护栏体验可能显得割裂。本研究在决策点前验证了管理员对项目级权限管理的期望。",
      },
    },
    myRole: {
      title: { en: "My role on the study", zh: "我在研究中的角色" },
      body: {
        en: "A user research team member spearheaded the research initiative. I participated as a UX design stakeholder throughout the project.",
        zh: "用户研究团队成员主导测试流程，我作为 UX 设计师全程参与并记录细节。",
      },
      items: [
        {
          icon: U + "icon-edit-calendar.svg",
          text: {
            en: "Participated in plan review, user session observation and research result synthesis",
            zh: "参与方案评审、观察用户测试 session，并整理研究结果",
          },
        },
        {
          icon: U + "icon-fact-check.svg",
          text: {
            en: "Converted design hypotheses into practical testable user tasks",
            zh: "将设计假设转化为可测试用户任务",
          },
        },
        {
          icon: U + "icon-book.svg",
          text: {
            en: "Identified and recorded UI-related usability issues during research sessions",
            zh: "在研究 session 中识别并记录 UI 可用性问题",
          },
        },
        {
          icon: U + "icon-vertical-split.svg",
          text: {
            en: "Collaborated with the team to confirm issue severity and optimization priority",
            zh: "与团队协作确认问题严重性与优化优先级",
          },
        },
        {
          icon: U + "icon-upload-file.svg",
          text: {
            en: "Promoted key research insights to be incorporated into design iteration backlog",
            zh: "推动关键研究洞察纳入设计迭代 backlog",
          },
        },
      ],
    },
    executive: {
      title: { en: "Executive summary", zh: "执行摘要" },
      intro: {
        en: "We recruited project admins and security practitioners with daily RBAC experience to complete tasks on a clickable prototype.",
        zh: "我们招募具备日常 RBAC 经验的项目管理员与安全从业者，在可点击原型上完成任务。",
      },
      stats: [
        { value: "6", label: { en: "Sessions completed", zh: "完成测试场次" } },
        { value: "3", label: { en: "Core task scenarios", zh: "核心任务场景" } },
        { value: "100%", label: { en: "Completeness rating", zh: "完整度评分" } },
        { value: "5", label: { en: "Recommendations", zh: "优化建议" } },
      ],
      tasksTitle: { en: "Core prototype tasks", zh: "核心原型任务" },
      tasks: [
        { num: "01", text: { en: "Assign role to a new member", zh: "为新成员分配角色" } },
        { num: "02", text: { en: "Change John's roles", zh: "修改 John 的角色" } },
        { num: "03", text: { en: "Remove all roles from Gary", zh: "移除 Gary 的全部角色" } },
        { num: "04", text: { en: "Other small tasks", zh: "其他小任务" } },
      ],
    },
    praise: {
      title: { en: "What participants praised", zh: "参与者好评" },
      intro: {
        en: "The synthesis concluded the prototype tested well overall—most tasks were completed with little or no prompting. Below is praise participants voiced explicitly, grouped by UI area.",
        zh: "综合结论：原型整体表现良好，多数任务在少量或无提示下完成。以下为参与者按 UI 区域明确表达的肯定。",
      },
      featured: {
        stat: "100%",
        statLabel: { en: "Completeness rating", zh: "完整度评分" },
        text: {
          en: "Overall this is close to shippable—the remaining work is discoverability and form polish, not rethinking the core concept.",
          zh: "整体已接近可发布——剩余工作是可发现性与表单细节打磨，而非重新思考核心概念。",
        },
        author: { en: "Jeff H*****", zh: "Jeff H*****" },
        role: { en: "Provincial gov team lead", zh: "Provincial gov team lead" },
        photo: U + "featured-photo.png",
      },
      cards: [
        {
          html: {
            en: "The roles list isn't too noisy—the density is right and <strong>I can scan for what I need</strong>.",
            zh: "角色列表密度适中，<strong>我能快速扫到所需信息</strong>。",
          },
          author: { en: "Mar***", zh: "Mar***" },
          role: { en: "Energy sector incident response", zh: "Energy sector incident response" },
        },
        {
          html: {
            en: "<strong>Listing operations</strong> like Read, List, Watch is much clearer than assigning permissions on other systems we use.",
            zh: "<strong>列出 Read、List、Watch 等操作</strong>比我们使用的其他系统更清晰。",
          },
          author: { en: "Shr****", zh: "Shr****" },
          role: { en: "Azure security / IAM", zh: "Azure security / IAM" },
        },
        {
          html: {
            en: "<strong>Clustering roles by category</strong>—workbenches, pipelines, etc.—matches how we think about the platform.",
            zh: "<strong>按类别聚合角色</strong>（Workbench、Pipeline 等）符合我们对平台的认知。",
          },
          author: { en: "Ary***", zh: "Ary***" },
          role: { en: "IT Admin", zh: "IT Admin" },
        },
        {
          html: {
            en: "<strong>Assignment status</strong> is highly valuable—especially with multiple roles, you see what was assigned before and what changed.",
            zh: "<strong>Assignment status</strong> 非常有价值——多角色时可看到之前分配与变更。",
          },
          author: { en: "Lim***", zh: "Lim***" },
          role: { en: "Entra ID", zh: "Entra ID" },
        },
      ],
    },
    recommend: {
      title: { en: "What participants recommended", zh: "参与者建议" },
      cards: [
        {
          text: {
            en: "'Manage permissions' felt like managing what's already there — no obvious way to add someone new. It would be better to optimize the wording.",
            zh: "「Manage permissions」感觉像在管理已有权限——缺少明显添加入口，建议优化文案。",
          },
          author: { en: "Shr****", zh: "Shr****" },
          role: { en: "Azure security / IAM", zh: "Azure security / IAM" },
        },
        {
          text: {
            en: "Page bottom alert is not necessary. I prefer to place it in the confirmation popup box.",
            zh: "页面底部 alert 不必要，更希望放在确认弹窗中。",
          },
          author: { en: "Ary***", zh: "Ary***" },
          role: { en: "IT Admin", zh: "IT Admin" },
        },
        {
          html: {
            en: "It would be helpful to provide the unique identifier on <strong>Permissions</strong> table, e.g. adding email/username column to prevent same-name mistakes.",
            zh: "在 <strong>Permissions</strong> 表中提供唯一标识（如 email/username 列）有助于避免同名误操作。",
          },
          author: { en: "Jef*", zh: "Jef*" },
          role: { en: "Provincial gov team lead", zh: "Provincial gov team lead" },
        },
        {
          text: {
            en: "Displaying personal roles helps users easily understand their job responsibilities and accessible operational resources.",
            zh: "展示个人角色有助于理解职责与可访问资源。",
          },
          author: { en: "Mar***", zh: "Mar***" },
          role: { en: "Energy sector incident response", zh: "Energy sector incident response" },
        },
        {
          text: {
            en: "I have been thinking about a common scenario: enabling relevant personnel to process requests submitted by regular users, and exploring feasible solutions for this demand.",
            zh: "希望探索普通用户提交权限请求、相关人员处理的常见场景及可行方案。",
          },
          author: { en: "Mar***", zh: "Mar***" },
          role: { en: "Energy sector incident response", zh: "Energy sector incident response" },
        },
      ],
    },
    nextStep: {
      title: { en: "Next step ...", zh: "下一步 ..." },
      body: {
        en: "After the usability testing, we shared all findings with product managers and engineering teams. The test results proved that the design has addressed core user pain points and fully matched user demands. Only minor details remain to be optimized, which will not affect the official release of core functions. We will adopt a small-win strategy to gradually implement all user-suggested improvements.",
        zh: "可用性测试后，我们将全部发现同步给 PM 与开发团队。结果证明设计已解决核心痛点并满足用户需求。仅余细节优化，不影响核心功能正式发布。我们将采用小步迭代策略逐步落地用户建议。",
      },
    },
    assets: {
      quoteIcon: U + "icon-quote.svg",
    },
  };
})();
