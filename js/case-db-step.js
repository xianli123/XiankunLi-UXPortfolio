/**
 * Numbered step title for V3 design breakdown sections (Figma 7262:16307).
 */
(function () {
  "use strict";

  const FC_DB_STEP_IMG = "assets/cases/openshift-ai/rbac/design-breakdown-v3/";

  window.FC_DB_STEP_CASES = ["rbac-v3", "model-details-v3", "deployment-tracking-v3"];

  window.isFcDbStepCase = function () {
    return window.FC_DB_STEP_CASES.includes(document.body?.dataset?.caseId);
  };

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

  window.renderFcDbStepTitle = function (step, title, lang) {
    const num = String(step).padStart(2, "0");
    return `
      <div class="fc-db-step">
        <div class="fc-db-step__badge" aria-hidden="true">
          <img class="fc-db-step__badge-shape" src="${FC_DB_STEP_IMG}step-badge.svg" alt="" width="72" height="72" loading="lazy">
          <span class="fc-db-step__badge-num">${num}</span>
        </div>
        <h3 class="fc-db-step__title">${esc(t(title, lang))}</h3>
      </div>`;
  };

  window.renderFcDbStepTitleOr = function (step, title, lang, fallbackHtml) {
    if (window.isFcDbStepCase?.() && window.renderFcDbStepTitle) {
      return window.renderFcDbStepTitle(step, title, lang);
    }
    return fallbackHtml;
  };

  window.renderRbacDbStepTitleV3 = window.renderFcDbStepTitle;
})();
