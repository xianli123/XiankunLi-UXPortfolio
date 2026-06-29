/**
 * Red Hat blog article — How we redesigned the Keycloak UI to increase efficiency
 * https://www.redhat.com/en/blog/keycloak-ui-architecture
 */
window.KEYCLOAK_BLOG_ARTICLE = {
  blogTitle: {
    en: "How we redesigned the Keycloak UI to increase efficiency",
    zh: "我们如何重新设计 Keycloak UI 以提升效率",
  },
  published: { en: "February 20, 2023", zh: "2023年2月20日" },
  author: { en: "Xiankun Li", zh: "李现昆" },
  readTime: { en: "5-minute read", zh: "5 分钟阅读" },
  categories: [
    { en: "Security", zh: "安全" },
    { en: "Professional development", zh: "专业发展" },
  ],
  externalUrl: "https://www.redhat.com/en/blog/keycloak-ui-architecture",
  blocks: [
    {
      type: "paragraph",
      text: {
        en: "When users rely on a product or service, their efficiency depends on its availability and ease of use. If the user interface (UI) is not user friendly, users may get stuck on how to use it effectively. At this point, user experience (UX) designs must improve the UI and help users get familiar with it quickly. This article explains how the Red Hat User Experience Design (UXD) team worked closely with an engineering team to make a UI easier to use and lower users' learning curve.",
        zh: "当用户依赖某款产品或服务时，其效率取决于可用性与易用性。若界面不够友好，用户往往难以高效使用。此时，用户体验（UX）设计需要改进界面，帮助用户尽快上手。本文介绍 Red Hat 用户体验设计（UXD）团队如何与开发团队紧密协作，让界面更易用、降低学习成本。",
      },
    },
    {
      type: "paragraph",
      text: {
        en: "Keycloak is an open source identity and access management (IAM) solution for modern applications and services. It is also the upstream for Red Hat Single Sign-On (RH-SSO).",
        zh: "Keycloak 是面向现代应用与服务的开源身份与访问管理（IAM）方案，也是 Red Hat Single Sign-On（RH-SSO）的上游。",
      },
    },
    {
      type: "related",
      text: {
        en: "Related reading: Use Keycloak SSO and TLS to build secure routes",
        zh: "相关阅读：使用 Keycloak SSO 与 TLS 构建安全路由",
      },
      href: "https://www.redhat.com/en/blog/use-keycloak-sso-and-tls-to-build-secure-routes",
    },
    {
      type: "paragraph",
      text: {
        en: "Applications often assign access and permissions to specific roles rather than individual users. A user can be associated with zero or more roles. But assigning multiple roles to users or groups one by one is time consuming and troublesome. Keycloak's composite role was created to address this problem.",
        zh: "应用通常将访问与权限赋予角色，而非逐个用户。用户可关联零个或多个角色，但逐个为用户或组分配多个角色既耗时又繁琐。Keycloak 的 composite role（复合角色）正是为解决这一问题而设计。",
      },
    },
    {
      type: "blockquote",
      text: {
        en: "A composite role is a role that can be associated with other roles. If a user or group is mapped to a composite role, all associated roles of the composite role will be inherited.",
        zh: "复合角色是一种可与其他角色关联的角色。若用户或组被映射到复合角色，将继承该复合角色的所有关联角色。",
      },
      cite: { en: "User story", zh: "用户故事" },
    },
    {
      type: "figure",
      src: "assets/cases/keycloak/02-CompositeRole.png",
      alt: {
        en: "Relationship between users and roles, with the super-role being a composite of other roles",
        zh: "用户与角色关系图，super-role 为复合了其他角色的复合角色",
      },
      caption: {
        en: "The figure below describes the relationship between the roles and users (user groups). The \"super-role\" is a composite role. The composite roles can also be associated with other composite roles.",
        zh: "下图描述角色与用户（用户组）之间的关系。「super-role」为复合角色，复合角色也可再关联其他复合角色。",
      },
    },
    {
      type: "paragraph",
      text: {
        en: "In the original UI, the composite role function could be hard for novice users to use, increasing the cost of learning. I'll break down why users may have found it confusing and how to optimize it.",
        zh: "在旧版界面中，复合角色功能对新手较难使用，学习成本较高。下文将分析困惑成因，并介绍优化思路。",
      },
    },
    {
      type: "heading",
      level: 2,
      text: {
        en: "Understanding users' pain points",
        zh: "理解用户痛点",
      },
    },
    {
      type: "paragraph",
      text: {
        en: "Before understanding why the original UI is not user friendly enough, you must understand the composite role's use case.",
        zh: "在理解旧版界面为何不够友好之前，需要先理解复合角色的使用场景。",
      },
    },
    {
      type: "blockquote",
      text: {
        en: "If I were an administrator, I would use the composite role function to associate various roles, including realm and client roles, so that I could manage these associated roles more easily. By matching users and the composite roles, I could manage many permissions and user access requirements.",
        zh: "若我是管理员，我会用复合角色功能关联各类角色（含 realm 与 client 角色），以便更轻松地管理这些关联角色。通过为用户分配复合角色，我能管理大量权限与访问需求。",
      },
      cite: { en: "Common user", zh: "常见使用场景" },
    },
    {
      type: "paragraph",
      text: {
        en: "The image below shows how to change a regular role to a composite role through associating roles.",
        zh: "下图展示如何通过关联角色将普通角色变为复合角色。",
      },
    },
    {
      type: "figure",
      src: "assets/cases/keycloak/03-Associates.png",
      alt: {
        en: "Composition of a composite role",
        zh: "复合角色的构成",
      },
      caption: {
        en: "Composition of a composite role",
        zh: "复合角色的构成",
      },
    },
    {
      type: "paragraph",
      text: {
        en: "The animation below shows the procedure in the old UI. The process is a bit complicated. Some pain points may ruin the user experience.",
        zh: "下方动图展示旧版界面中的操作流程，过程较为复杂，多个痛点都会影响使用体验。",
      },
    },
    {
      type: "figure",
      src: "assets/cases/keycloak/04-OldUI.gif",
      alt: {
        en: "GIF animation of old, complex UI",
        zh: "旧版复杂界面操作流程动图",
      },
      caption: {
        en: "GIF animation of old, complex UI",
        zh: "旧版复杂界面操作流程动图",
      },
      license: { en: "Xiankun [Kun] Li, CC BY-SA 4.0", zh: "李现昆，CC BY-SA 4.0" },
      fullSize: true,
    },
    {
      type: "heading",
      level: 3,
      text: {
        en: "1. Associating roles was difficult",
        zh: "1. 关联角色很困难",
      },
    },
    {
      type: "figure",
      src: "assets/cases/keycloak/05-OriginalUI.png",
      alt: {
        en: "The original UI with four boxes",
        zh: "旧版四框界面",
      },
      caption: {
        en: "In the old UI, there were four boxes for different types of roles.",
        zh: "旧版界面用四个框区分不同类型的角色。",
      },
    },
    {
      type: "paragraph",
      text: {
        en: "We asked users if they could quickly add roles at their first glimpse of the interface. Unfortunately, they didn't understand the boxes or how to assign roles. The users often didn't know they needed to filter the client before selecting the corresponding roles, especially when adding a client role. It was difficult for users to realize they could manage multiple roles simultaneously.",
        zh: "我们询问用户能否在第一眼就快速添加角色。遗憾的是，他们不理解这些框或如何分配角色，尤其添加 client role 时常不知道需先筛选 client。用户也很难意识到可以同时管理多个角色。",
      },
    },
    {
      type: "paragraph",
      text: {
        en: "Even as users became familiar with the UI over time, new problems hit them.",
        zh: "即使用户逐渐熟悉界面，仍会遇到新的问题。",
      },
    },
    {
      type: "heading",
      level: 3,
      text: {
        en: "2. Could not view all assigned roles directly",
        zh: "2. 无法直接查看所有已分配角色",
      },
    },
    {
      type: "paragraph",
      text: {
        en: "As the animation above demonstrates, if users wanted to go through all assigned roles, they first had to look at all associated realm roles, then view all the associated client roles individually. They could overlook the realm roles, which is not efficient.",
        zh: "如上动图所示，若要查看所有已分配角色，用户需先查看所有关联的 realm 角色，再逐个查看各 client 的关联角色，容易遗漏 realm 角色，效率低下。",
      },
    },
    {
      type: "paragraph",
      text: {
        en: "In addition, it was time consuming and confusing when users wanted to check if a specific role had been assigned. Users became lost in the clients and client roles.",
        zh: "此外，当用户想确认某角色是否已分配时，过程耗时且令人困惑，用户会在 client 与 client role 中迷失。",
      },
    },
    {
      type: "related",
      text: {
        en: "Learn about upcoming webinars, in-person events, and more opportunities to increase your knowledge at Red Hat events.",
        zh: "了解 Red Hat 活动中的线上研讨会、线下活动与学习机会。",
      },
      href: "https://www.redhat.com/en/events",
    },
    {
      type: "heading",
      level: 2,
      text: {
        en: "Redesigning to optimize users' experience",
        zh: "通过重新设计优化用户体验",
      },
    },
    {
      type: "paragraph",
      text: {
        en: "The above pain points diminished users' experience. Our team needed to optimize the interaction and find an elegant way to address issues. We made some changes based on users' psychology and habits after analyzing users' instincts. The main differences are listed below.",
        zh: "上述痛点削弱了用户体验。团队需要优化交互并找到更合适的解决方案。结合用户直觉与使用习惯，我们做出以下改动。",
      },
    },
    {
      type: "heading",
      level: 3,
      text: {
        en: "1. Display associated roles in a table view under the new tab",
        zh: "1. 在新 Tab 下以表格展示关联角色",
      },
    },
    {
      type: "paragraph",
      text: {
        en: "Users tend to view the data quickly rather than query data multiple times. We changed the associated roles boxes to a table displaying associated realm roles and client roles. This way, users can view all the associated roles efficiently. There is a prefixed label for client roles to indicate the client's name.",
        zh: "用户倾向于快速浏览数据，而非多次查询。我们将关联角色的框改为表格，统一展示 realm 与 client 角色，并为 client 角色添加前缀标签以标明 client 名称。",
      },
    },
    {
      type: "figure",
      src: "assets/cases/keycloak/06-associated-roles-table.png",
      alt: {
        en: "The new associated roles table is easier to read",
        zh: "新版关联角色表格更易阅读",
      },
      caption: {
        en: "The new associated roles table is easier to read",
        zh: "新版关联角色表格更易阅读",
      },
    },
    {
      type: "heading",
      level: 3,
      text: {
        en: "2. Make the call to action (CTA) clear",
        zh: "2. 让核心操作按钮更清晰",
      },
    },
    {
      type: "paragraph",
      text: {
        en: "Adding and removing associated roles is a core function of a composite role. So it is crucial for users to realize how to add and remove roles quickly.",
        zh: "添加与移除关联角色是复合角色的核心功能，让用户快速理解如何操作至关重要。",
      },
    },
    {
      type: "paragraph",
      text: {
        en: "Hick's Law states, \"It takes us longer to make a choice when we have numerous options.\" It took four actions in the original UI to reach the goal, and there were no obvious hints to help users decide what to do. We kept two buttons: Add role and Remove. The Add role button is more obvious than before. After clicking the Add role button, the roles selection modal is triggered.",
        zh: "希克定律指出：「选项越多，做决定越慢。」旧版需四步才能完成目标，且缺乏明显提示。我们保留两个按钮：Add role 与 Remove，Add role 更醒目，点击后打开角色选择弹窗。",
      },
    },
    {
      type: "figure",
      src: "assets/cases/keycloak/07-ChangesCTA.png",
      alt: {
        en: "CTA changes",
        zh: "操作按钮优化",
      },
      caption: {
        en: "CTA changes",
        zh: "操作按钮优化",
      },
    },
    {
      type: "heading",
      level: 3,
      text: {
        en: "3. Other changes",
        zh: "3. 其他改动",
      },
    },
    {
      type: "paragraph",
      text: {
        en: "We made other changes, including adding a search function and tabs.",
        zh: "我们还做了其他改动，包括搜索与 Tab 调整。",
      },
    },
    {
      type: "paragraph",
      text: {
        en: "The search function is an essential part of a data system. The principle of least effort tells us, \"People are looking for ways to complete tasks with the least possible effort.\" We added a search function to help users quickly view or check the associated roles, and fuzzy search is supported.",
        zh: "搜索是数据系统的重要组成。最小努力原则指出：「人们希望以最少努力完成任务。」我们增加搜索以帮助用户快速查看或核对关联角色，并支持模糊搜索。",
      },
    },
    {
      type: "figure",
      src: "assets/cases/keycloak/08-Searchbar.gif",
      alt: {
        en: "GIF of Search feature in the new UI",
        zh: "新版搜索功能动图",
      },
      caption: {
        en: "GIF of Search feature in the new UI",
        zh: "新版搜索功能动图",
      },
      license: { en: "Xiankun [Kun] Li, CC BY-SA 4.0", zh: "李现昆，CC BY-SA 4.0" },
      fullSize: true,
    },
    {
      type: "paragraph",
      text: {
        en: "In the old UI, the composite role was under the Settings tab, which was easy to overlook. We placed it in a more prominent position. As shown below, we separated the Associated roles from the Details page as a new tab.",
        zh: "旧版中，复合角色功能位于 Settings Tab，容易被忽略。我们将其置于更醒目的位置，并将 Associated roles 从 Details 页拆分为独立 Tab。",
      },
    },
    {
      type: "figure",
      src: "assets/cases/keycloak/09-NewTab.png",
      alt: {
        en: "New tab in the UI",
        zh: "界面中的新 Tab",
      },
      caption: {
        en: "New tab in the UI",
        zh: "界面中的新 Tab",
      },
    },
    {
      type: "heading",
      level: 2,
      text: {
        en: "Usability testing to evaluate the new UI",
        zh: "可用性测试评估新界面",
      },
    },
    {
      type: "paragraph",
      text: {
        en: "To avoid designer self-righteousness, we collected some users' honest feedback and opinions by conducting usability tests and user interviews to validate our design solution.",
        zh: "为避免设计师自说自话，我们通过可用性测试与用户访谈收集真实反馈，验证设计方案。",
      },
    },
    {
      type: "related",
      text: {
        en: "Learn how IT modernization can help alleviate technical debt.",
        zh: "了解 IT 现代化如何缓解技术债。",
      },
      href: "https://www.redhat.com/en/blog/it-modernization-technical-debt",
    },
    {
      type: "heading",
      level: 3,
      text: { en: "Experienced users", zh: "有经验用户" },
    },
    {
      type: "paragraph",
      text: {
        en: "We invited 10 Keycloak users to participate in usability testing. They used the new design and evaluated its usability according to their opinions. The maximum score of the evaluation was 7. According to the statistics after the rating, we can see that most users find the new design easy to use.",
        zh: "我们邀请 10 名 Keycloak 用户参与可用性测试，使用新设计并按主观感受评分（满分 7 分）。统计结果显示，多数用户认为新设计易于使用。",
      },
    },
    {
      type: "figure",
      src: "assets/cases/keycloak/10-TestingResult.png",
      alt: {
        en: "Usability evaluation results show difficulty of using the UI on a scale of 1-7 (10 responses)",
        zh: "可用性评估结果（1–7 分，10 份反馈）",
      },
      caption: {
        en: "Usability evaluation results show difficulty of using the UI on a scale of 1-7 (10 responses)",
        zh: "可用性评估结果（1–7 分，10 份反馈）",
      },
    },
    {
      type: "heading",
      level: 3,
      text: { en: "Novice users", zh: "新手用户" },
    },
    {
      type: "paragraph",
      text: {
        en: "We also invited 10 novice users to join our interviews after implementation. They had never used Keycloak before the interview. Participants tried the old and new UI versions. Each participant rated the two UIs based on their hands-on experience. The maximum evaluation score was 7 points.",
        zh: "新版上线后，我们还邀请 10 名从未使用过 Keycloak 的新手参与访谈，分别体验旧版与新版并评分（满分 7 分）。",
      },
    },
    {
      type: "paragraph",
      text: {
        en: "The results below show that the new design is more efficient than the old one. Novice users think the new design is more in tune with their instincts and habits than the old one. There are significant improvements in user usability and friendliness.",
        zh: "下图表明新设计比旧版更高效，更贴合新手直觉与习惯，在易用性与整体体验上有显著提升。",
      },
    },
    {
      type: "figure",
      src: "assets/cases/keycloak/11-InterviewResult-1.png",
      alt: {
        en: "Novice user interview results showing improved efficiency with the new UI",
        zh: "新手访谈：新界面效率提升",
      },
      caption: {
        en: "Novice user interview results showing improved efficiency with the new UI",
        zh: "新手访谈：新界面效率提升",
      },
    },
    {
      type: "figure",
      src: "assets/cases/keycloak/12-InterviewResult-2.png",
      alt: {
        en: "Novice user interview results showing improved ease of use with the new UI",
        zh: "新手访谈：新界面易用性提升",
      },
      caption: {
        en: "Novice user interview results showing improved ease of use with the new UI",
        zh: "新手访谈：新界面易用性提升",
      },
    },
    {
      type: "heading",
      level: 2,
      text: { en: "Wrapping up", zh: "总结" },
    },
    {
      type: "paragraph",
      text: {
        en: "Usability and ease of use are important factors in measuring user friendliness. In addition to fulfilling the functional requirements, users also need an effective user experience. In optimizing the composite role function, we achieved the following goals:",
        zh: "可用性与易用性是衡量体验质量的重要因素。除满足功能需求外，用户还需要顺畅有效的交互。在优化复合角色功能时，我们实现了以下目标：",
      },
    },
    {
      type: "list",
      items: [
        {
          en: "Keep the user interface concise and consistent, conforming to common users' cognition when displaying data.",
          zh: "保持界面简洁一致，在展示数据时符合用户常见认知。",
        },
        {
          en: "Reduce users' learning costs and show the main action more clearly.",
          zh: "降低学习成本，更清晰地呈现主要操作。",
        },
        {
          en: "Optimize the process of adding associated roles and support searching in the original table and the Add role modal.",
          zh: "优化添加关联角色的流程，并在表格与 Add role 弹窗中支持搜索。",
        },
      ],
    },
    {
      type: "related",
      text: {
        en: "Check out Red Hat Portfolio Architecture Center for a wide variety of reference architectures you can use.",
        zh: "前往 Red Hat Portfolio Architecture Center 查看各类参考架构。",
      },
      href: "https://www.redhat.com/architect/portfolio-architecture",
    },
    {
      type: "acknowledgments",
      text: {
        en: "None of this would have happened without support from Haley Wang, April Ma, the PatternFly team, and Keycloak UI developers. Thank you!",
        zh: "感谢 Haley Wang、April Ma、PatternFly 团队与 Keycloak UI 开发者的支持，没有他们就没有这一切。",
      },
    },
    {
      type: "author",
      name: { en: "Xiankun Li", zh: "李现昆" },
      bio: {
        en: "Kun works on the Red Hat Beijing UXD team. He has been designing and crafting user experiences at Red Hat since June 2019. He also works on focusing on the user experience improvement of Red Hat products, especially Keycloak (RHSSO).",
        zh: "Kun 就职于 Red Hat 北京 UXD 团队，自 2019 年 6 月起在 Red Hat 从事用户体验设计，尤其关注 Keycloak（RHSSO）等产品的体验改进。",
      },
      github: "https://github.com/xiankunWang",
    },
  ],
};
