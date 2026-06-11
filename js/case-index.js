/**
 * Case study index — card metadata and lookup for all featured work.
 * Detail page ids/hrefs follow CASE_DETAIL_NAMING in js/case-naming.js (…-v1).
 */
(function () {
  "use strict";

  window.CASE_INDEX = [
    {
      id: "rbac-v1",
      version: 1,
      codeName: {
        en: "RBAC Design in AI Project V1",
        zh: "AI 项目中的 RBAC 权限设计 V1",
      },
      href: "cases/rbac-v1.html",
      color: "#EE0000",
      coverImage: "assets/cases/openshift-ai/rbac/hero/hero-illustration.svg",
      coverFit: "contain",
      coverPosition: "center",
      title: { en: "RBAC Design in AI Project", zh: "AI 项目中的 RBAC 权限设计" },
      tags: {
        en: "User Research + UX/UI Design + Enterprise AI",
        zh: "用户研究 + 体验设计 + 企业级 AI",
      },
      excerpt: {
        en: "Designing an intuitive role-based access control system that empowers teams to manage permissions efficiently while maintaining security and clarity.",
        zh: "为 AI 项目设计直观的 RBAC 权限体系，帮助团队高效管理权限，同时保持安全边界与操作清晰度。",
      },
    },
    {
      id: "model-details-v1",
      version: 1,
      codeName: {
        en: "Validated Model's Details Design V1",
        zh: "Validated Models 详情页设计 V1",
      },
      href: "cases/model-details-v1.html",
      color: "#EE0000",
      coverImage: "assets/cases/openshift-ai/model-details/hero/hero-illustration.png",
      coverPosition: "left top",
      title: {
        en: "Validated Model's Details Design",
        zh: "Validated Models 详情页设计",
      },
      tags: {
        en: "Information Architecture + UX/UI Design + MLOps",
        zh: "信息架构 + 体验设计 + MLOps",
      },
      excerpt: {
        en: "Refined information architecture and streamlined interactions to boost efficiency for data scientists evaluating validated models.",
        zh: "通过优化信息架构与交互流程，提升数据科学家评估 Validated Models 的决策效率。",
      },
    },
    {
      id: "deployment-tracking-v1",
      version: 1,
      codeName: {
        en: "AI Model Deployment Tracking V1",
        zh: "AI 模型部署状态追踪 V1",
      },
      href: "cases/deployment-tracking-v1.html",
      color: "#EE0000",
      coverImage: "assets/cases/openshift-ai/deployment/hero-illustration.png",
      coverFit: "contain",
      coverPosition: "center",
      title: { en: "AI Model Deployment Tracking", zh: "AI 模型部署状态追踪" },
      tags: {
        en: "User Research + Status Design + Monitoring UX",
        zh: "用户研究 + 状态设计 + 监控体验",
      },
      excerpt: {
        en: "Optimizing the deployment tracking flow with clear progress stages, structured errors, and list patterns that surface health at a glance.",
        zh: "优化部署追踪流程，明确进度阶段，简化错误定位，提升监控效率。",
      },
    },
    {
      id: "keycloak-composite-role-v1",
      version: 1,
      codeName: {
        en: "Keycloak Composite Role UI Redesign V1",
        zh: "Keycloak Composite Role 界面重设计 V1",
      },
      hidden: true, // temporarily hidden on home page
      href: "cases/keycloak-v1.html",
      color: "#1F883D",
      coverImage: "assets/cases/keycloak/02-CompositeRole.png",
      coverPosition: "center top",
      title: {
        en: "Keycloak Composite Role UI Redesign",
        zh: "Keycloak Composite Role 界面重设计",
      },
      tags: {
        en: "Usability Testing + Interaction Design + PatternFly",
        zh: "可用性测试 + 交互设计 + PatternFly",
      },
      excerpt: {
        en: "Redesigning the composite role experience to reduce learning cost and make associated roles and core actions obvious for administrators.",
        zh: "重设计 Composite Role 体验，降低学习成本，在一处展示关联角色，让核心操作更加清晰。",
      },
    },
  ];

  window.getCaseStudyById = function (id) {
    if (window.CASE_OPENSHIFT_DATA?.[id]) {
      return window.CASE_OPENSHIFT_DATA[id];
    }
    const list = Array.isArray(window.CASE_STUDIES) ? window.CASE_STUDIES : [];
    return list.find((cs) => cs.id === id) || null;
  };

  window.getAdjacentCase = function (id, direction) {
    const idx = window.CASE_INDEX.findIndex((c) => c.id === id);
    if (idx < 0) return null;
    const next =
      direction === "prev"
        ? (idx - 1 + window.CASE_INDEX.length) % window.CASE_INDEX.length
        : (idx + 1) % window.CASE_INDEX.length;
    return window.CASE_INDEX[next];
  };
})();
