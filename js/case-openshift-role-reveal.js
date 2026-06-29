/**
 * RBAC — Reveal role details and assignees (Figma 3875:28829)
 */
(function () {
  "use strict";

  const ASSET = "assets/cases/openshift-ai/rbac/reveal/";

  window.RBAC_ROLE_REVEAL_BLOCK = {
    type: "roleReveal",
    spacingTop: 72,
    title: { en: "Reveal role details and assignees", zh: "展示角色详情与已分配对象" },
    intro: {
      en: "To determine the optimal pattern for displaying role details, I explored and iterated on multiple interaction approaches, then conducted a comparative analysis focusing on user experience, space efficiency, information hierarchy, and reusability. From multiple design explorations, I selected two representative solutions for detailed comparison as shown below.",
      zh: "为确定展示角色详情的最优模式，我探索并迭代多种交互方案，并从体验、空间效率、信息层级与可复用性等维度进行对比分析。经过多轮方案探索，我选取以下两种代表性方案进行详细对比。",
    },
    concepts: [
      {
        icon: ASSET + "icon-reject.svg",
        title: { en: "Conceptual design #01", zh: "概念设计 #01" },
        description: {
          en: "A right-side drawer embedded in the permissions list. Clicking the role name will trigger this panel.",
          zh: "在权限列表右侧嵌入抽屉面板。点击角色名称将触发该面板。",
        },
        pros: [
          { en: "Showing details and list at the same time", zh: "可同时查看详情与列表" },
          { en: "Not break users' workflow", zh: "不打断用户当前操作流程" },
        ],
        cons: [
          { en: "It occupies large screen space and compresses the main list", zh: "占用大量屏幕空间并压缩主列表" },
          { en: "Hierarchy is not clear enough", zh: "信息层级不够清晰" },
          { en: "Reusability is poor", zh: "可复用性较差" },
        ],
        image: ASSET + "concept-01.png",
        imageAlt: { en: "Drawer pattern for role details", zh: "角色详情抽屉方案" },
      },
      {
        icon: ASSET + "icon-selected.svg",
        title: { en: "Conceptual design #02", zh: "概念设计 #02" },
        description: {
          en: "A floating modal popup that appears on user trigger, with no permanent space occupation.",
          zh: "由用户操作触发的浮动弹窗，不常驻占用界面空间。",
        },
        pros: [
          { en: "Showing clear information hierarchy", zh: "信息层级清晰" },
          { en: "Providing a reusable component across scenarios", zh: "跨场景可复用的组件" },
          { en: "Easy to maintain the user's attention", zh: "更利于用户聚焦当前任务" },
        ],
        cons: [
          { en: "Slightly higher cost for cross-role comparisons", zh: "跨角色对比的操作成本略高" },
        ],
        image: ASSET + "concept-02.png",
        imageAlt: { en: "Modal pattern for role details", zh: "角色详情弹窗方案" },
      },
    ],
    finalDecision: {
      title: { en: "Final decision", zh: "最终决策" },
      leadHtml: {
        en: 'After discussion with stakeholders, we agreed that selecting <strong>the modal approach</strong> to prioritize core UX and scalability. Because:',
        zh: "与各团队讨论后，我们同意选择<strong>弹窗方案</strong>以优先保障核心体验与可扩展性。",
      },
      reasons: [
        {
          en: "It keeps the main permission list fully visible, ensuring the primary task is unobstructed.",
          zh: "主权限列表保持完全可见，确保核心任务不受阻碍。",
        },
        {
          en: "The modal provides a clean, layered experience, showing details only when needed.",
          zh: "弹窗提供清晰的分层体验，仅在需要时展示详情。",
        },
        {
          en: "It is a reusable component, supporting future use cases with consistent patterns.",
          zh: "作为可复用组件，以一致的交互模式支持后续场景。",
        },
      ],
      diagram: ASSET + "interaction-flow.png",
      diagramAlt: { en: "Interaction flow from role link to modal", zh: "从角色链接到弹窗的交互流程" },
    },
    hifi: {
      title: { en: "Final hi-fi design", zh: "最终高保真设计" },
      image: ASSET + "hifi-final.png",
      imageAlt: { en: "Role details and assignees modal views", zh: "角色详情与已分配对象弹窗视图" },
    },
  };

  window.applyRoleRevealBlock = function applyRoleRevealBlock() {
    const block = window.RBAC_ROLE_REVEAL_BLOCK;
    const rbac = window.CASE_OPENSHIFT_DATA?.["rbac-v1"];
    if (!block || !rbac) return;
    const section = rbac.blocks.find(
      (b) => b.type === "section" && b.title?.en === "Design breakdown"
    );
    if (!section?.blocks) return;
    const existing = section.blocks.findIndex((b) => b?.type === "roleReveal");
    if (existing >= 0) {
      section.blocks[existing] = block;
      return;
    }
    const mapIdx = section.blocks.findIndex((b) => b?.type === "rolesMapping");
    const insertAt = mapIdx >= 0 ? mapIdx + 1 : 1;
    section.blocks.splice(insertAt, 0, block);
  };
})();
