/**
 * RBAC — Define new roles and mapping table (Figma-faithful structure).
 */
(function () {
  "use strict";

  window.RBAC_ROLES_MAPPING_BLOCK = {
    type: "rolesMapping",
    title: { en: "Define new roles and mapping", zh: "定义新角色与映射" },
    introHtml: {
      en: 'I summarized supporting insights and defined new roles based on early technical research and business requirements. I then discussed and iterated the role definitions with PM and engineering teams. We finally agreed to launch three core roles first, namely <strong>resource maintainer</strong>, <strong>resource updater</strong> and <strong>resource reader</strong>. The table below shows some examples of workbench new roles.',
      zh: "我结合早期技术调研、业务需求与用户/竞品洞察定义新角色，并与 PM、开发团队讨论迭代角色定义。我们最终同意先上线三个核心角色：<strong>resource maintainer</strong>、<strong>resource updater</strong> 与 <strong>resource reader</strong>。下表展示部分 Workbench 新角色示例。",
    },
    headers: [
      {
        title: { en: "Role", zh: "角色" },
        subtitle: { en: "and what users can do with it", zh: "及用户可执行的操作" },
      },
      {
        title: { en: "Actions", zh: "操作" },
        subtitle: { en: "can be performed (verbs)", zh: "（动词）" },
      },
      {
        title: { en: "Resources", zh: "资源" },
        subtitle: { en: "that the user can access", zh: "用户可访问的范围" },
      },
      { title: { en: "Description", zh: "描述" } },
      { title: { en: "Priority", zh: "优先级" } },
    ],
    groups: [
      {
        role: {
          name: { en: "Workbench maintainer", zh: "Workbench maintainer" },
          summary: {
            en: "User can view and manage all workbenches. (All workbenches)",
            zh: "用户可查看并管理所有 Workbench。（所有 Workbench）",
          },
        },
        rows: [
          {
            actions: [
              { label: { en: "Create", zh: "Create" } },
              { label: { en: "Read", zh: "Read" }, verbs: ["Get", "List", "Watch"] },
              { label: { en: "Update", zh: "更新" }, verbs: ["Update", "Patch"] },
              { label: { en: "Delete", zh: "Delete" } },
            ],
            resources: {
              en: "Any workbench in a project(namespace)",
              zh: "项目（namespace）中的任意 Workbench",
            },
            descriptionHtml: {
              en: "Users who have the <strong>Workbench maintainer</strong> role will be able to view and manage all the workbenches in this namespace.",
              zh: "拥有 <strong>Workbench maintainer</strong> 角色的用户可查看并管理该命名空间中的所有 Workbench。",
            },
            priority: "high",
          },
        ],
      },
      {
        role: {
          name: { en: "Workbench updater", zh: "Workbench updater" },
          summary: {
            en: "User can view workbenches and modify workbench configuration, but not create or delete workbenches. (All workbenches or some specific ones)",
            zh: "用户可查看 Workbench 并修改配置，但不可创建或删除 Workbench。（所有或部分指定 Workbench）",
          },
        },
        rows: [
          {
            actions: [
              { label: { en: "Read", zh: "Read" }, verbs: ["Get", "List", "Watch"] },
              { label: { en: "Update", zh: "更新" }, verbs: ["Update", "Patch"] },
            ],
            resources: {
              en: "Any workbench in a project(namespace)",
              zh: "项目（namespace）中的任意 Workbench",
            },
            descriptionHtml: {
              en: "Users who have the <strong>Workbench updater</strong> role will be able to view all the workbenches in this namespace, open the workbench, start and stop the workbench, and modify the configuration of the workbench.",
              zh: "拥有 <strong>Workbench updater</strong> 角色的用户可查看该命名空间中所有 Workbench，并打开、启停及修改其配置。",
            },
            priority: "high",
          },
          {
            shade: true,
            actions: [
              { label: { en: "Read", zh: "Read" }, verbs: ["Get", "List", "Watch"] },
              { label: { en: "Update", zh: "更新" }, verbs: ["Update", "Patch"] },
            ],
            resources: {
              en: "Workbenches in a project (namespace) that match a specific name",
              zh: "项目中指定名称的 Workbench",
            },
            descriptionHtml: {
              en: 'Users who have the <strong>Workbench updater</strong> role for a workbench named "Foo" will be able to view the workbench named "Foo" in this namespace, open the workbench, start and stop the workbench, and modify the configuration of the workbench.',
              zh: '拥有针对名为 "Foo" 的 Workbench 的 <strong>Workbench updater</strong> 角色的用户，可在该命名空间中查看、打开、启停并修改该 Workbench 的配置。',
            },
            priority: "low",
          },
        ],
      },
      {
        role: {
          name: { en: "Workbench reader", zh: "Workbench reader" },
          summary: {
            en: "User can view and open workbenches without the ability to make any changes to the workbench configuration. (All workbenches or some specific ones)",
            zh: "用户可查看并打开 Workbench，但无法修改 Workbench 配置。（所有或部分指定 Workbench）",
          },
        },
        rows: [
          {
            actions: [{ label: { en: "Read", zh: "Read" }, verbs: ["Get", "List", "Watch"] }],
            resources: {
              en: "Any workbench in a project(namespace)",
              zh: "项目（namespace）中的任意 Workbench",
            },
            descriptionHtml: {
              en: "Users who have the <strong>Workbench reader</strong> role will be able to view all the workbenches in this namespace and open the workbenches",
              zh: "拥有 <strong>Workbench reader</strong> 角色的用户可查看该命名空间中所有 Workbench，并打开相应实例。",
            },
            priority: "high",
          },
          {
            shade: true,
            actions: [{ label: { en: "Read", zh: "Read" }, verbs: ["Get", "List", "Watch"] }],
            resources: {
              en: "Workbenches in a project (namespace) that match a specific name",
              zh: "项目中指定名称的 Workbench",
            },
            descriptionHtml: {
              en: "Users who have the <strong>Workbench reader</strong> role will be able to view and open some specified workbenches in this namespace, but cannot start/stop running the workbenches.",
              zh: "拥有 <strong>Workbench reader</strong> 角色的用户可查看并打开该命名空间中部分指定 Workbench，但无法启停已运行的 Workbench。",
            },
            priority: "low",
          },
        ],
      },
    ],
    footer: {
      en: "The capability of assigning permissions to specific individual resources will be postponed to future versions. This approach meets users' core needs quickly, reduces development costs, and also allows time for UX design validation and further optimization.",
      zh: "针对特定资源实例授权的能力将推迟至后续版本。该方案可快速满足用户核心需求、降低开发成本，并为 UX 设计验证与进一步优化留出时间。",
    },
  };

  window.applyRolesMappingBlock = function applyRolesMappingBlock() {
    const block = window.RBAC_ROLES_MAPPING_BLOCK;
    const rbac = window.CASE_OPENSHIFT_DATA?.["rbac-v1"];
    if (!block || !rbac) return;
    const section = rbac.blocks.find(
      (b) => b.type === "section" && b.title?.en === "Design breakdown"
    );
    if (!section?.blocks) return;
    const idx = section.blocks.findIndex((b) => b == null || b?.type === "rolesMapping");
    if (idx >= 0) section.blocks[idx] = block;
  };
})();
