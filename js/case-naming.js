/**
 * Case study detail page — versioned code naming (not shown in case UI).
 *
 * Convention
 * ──────────
 * id        `{slug}-v{N}`              lookup key: data-case-id, CASE_INDEX, data stores
 * href      `cases/{slug}-v{N}.html`   detail page entry file
 * codeName  `{display title} V{N}`     dev/docs label only; hero & work cards keep `title`
 * version   `N`                        integer generation (current generation = 1)
 * title     unchanged                  user-facing copy on cards & case hero
 *
 * Adding V2 later: duplicate entry file + data block; keep V1 id/href stable.
 * V3 duplicates V2 entry + syncs patched data at end of *-v2.js loaders.
 */
(function () {
  "use strict";

  window.CASE_DETAIL_NAMING = {
    "rbac-v1": {
      slug: "rbac",
      version: 1,
      href: "cases/rbac-v1.html",
      codeName: {
        en: "RBAC Design in AI Project V1",
        zh: "AI 项目中的 RBAC 权限设计 V1",
      },
    },
    "model-details-v1": {
      slug: "model-details",
      version: 1,
      href: "cases/model-details-v1.html",
      codeName: {
        en: "Validated Model's Details Design V1",
        zh: "Validated Models 详情页设计 V1",
      },
    },
    "deployment-tracking-v1": {
      slug: "deployment-tracking",
      version: 1,
      href: "cases/deployment-tracking-v1.html",
      codeName: {
        en: "AI Model Deployment Tracking V1",
        zh: "AI 模型部署状态追踪 V1",
      },
    },
    "keycloak-composite-role-v1": {
      slug: "keycloak-composite-role",
      version: 1,
      href: "cases/keycloak-v1.html",
      codeName: {
        en: "Keycloak Composite Role UI Redesign V1",
        zh: "Keycloak Composite Role 界面重设计 V1",
      },
    },
    "rbac-v2": {
      slug: "rbac",
      version: 2,
      hidden: true,
      href: "cases/rbac-v2.html",
      codeName: {
        en: "RBAC Design in AI Project V2",
        zh: "AI 项目中的 RBAC 权限设计 V2",
      },
    },
    "model-details-v2": {
      slug: "model-details",
      version: 2,
      hidden: true,
      href: "cases/model-details-v2.html",
      codeName: {
        en: "Validated Model's Details Design V2",
        zh: "Validated Models 详情页设计 V2",
      },
    },
    "deployment-tracking-v2": {
      slug: "deployment-tracking",
      version: 2,
      hidden: true,
      href: "cases/deployment-tracking-v2.html",
      codeName: {
        en: "AI Model Deployment Tracking V2",
        zh: "AI 模型部署状态追踪 V2",
      },
    },
    "keycloak-composite-role-v2": {
      slug: "keycloak-composite-role",
      version: 2,
      hidden: true,
      href: "cases/keycloak-v2.html",
      codeName: {
        en: "Keycloak Composite Role UI Redesign V2",
        zh: "Keycloak Composite Role 界面重设计 V2",
      },
    },
    "rbac-v3": {
      slug: "rbac",
      version: 3,
      href: "cases/rbac-v3.html",
      codeName: {
        en: "RBAC Design in AI Project V3",
        zh: "AI 项目中的 RBAC 权限设计 V3",
      },
    },
    "model-details-v3": {
      slug: "model-details",
      version: 3,
      href: "cases/model-details-v3.html",
      codeName: {
        en: "Validated Model's Details Design V3",
        zh: "Validated Models 详情页设计 V3",
      },
    },
    "deployment-tracking-v3": {
      slug: "deployment-tracking",
      version: 3,
      href: "cases/deployment-tracking-v3.html",
      codeName: {
        en: "AI Model Deployment Tracking V3",
        zh: "AI 模型部署状态追踪 V3",
      },
    },
    "keycloak-composite-role-v3": {
      slug: "keycloak-composite-role",
      version: 3,
      href: "cases/keycloak-v3.html",
      codeName: {
        en: "Keycloak Composite Role UI Redesign V3",
        zh: "Keycloak Composite Role 界面重设计 V3",
      },
    },
  };

  window.getCaseDetailNaming = function (id) {
    return window.CASE_DETAIL_NAMING?.[id] || null;
  };

  /** Default public detail page href for a case (currently V3). */
  window.getCaseDetailDefaultHref = function (caseId) {
    const current = window.CASE_DETAIL_NAMING?.[caseId];
    if (!current?.slug) return null;
    const v3 = window.CASE_DETAIL_NAMING[`${current.slug}-v3`];
    return v3?.href || null;
  };

  /** V1/V2 pair for the same case slug (detail pages only). */
  window.getCaseDetailVersionPair = function (caseId) {
    const current = window.CASE_DETAIL_NAMING?.[caseId];
    if (!current?.slug) return null;
    const v1 = window.CASE_DETAIL_NAMING[`${current.slug}-v1`];
    const v2 = window.CASE_DETAIL_NAMING[`${current.slug}-v2`];
    if (!v1?.href || !v2?.href) return null;
    return {
      slug: current.slug,
      currentVersion: current.version,
      v1: { id: `${current.slug}-v1`, href: v1.href },
      v2: { id: `${current.slug}-v2`, href: v2.href },
    };
  };
})();
