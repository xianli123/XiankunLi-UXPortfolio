/**
 * Case study i18n helpers — user quotes stay in English on Chinese pages.
 */
(function () {
  "use strict";

  /** Quoted speech / testimonial body: always English when UI lang is zh. */
  function quoteT(obj, lang) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    if (lang === "zh") return obj.en ?? obj.zh ?? "";
    return obj[lang] || obj.en || "";
  }

  /** HTML quote blocks (may include <strong> etc.). */
  function quoteHtml(obj, lang) {
    if (obj?.html) {
      if (lang === "zh") return obj.html.en || obj.html.zh || "";
      return obj.html[lang] || obj.html.en || "";
    }
    return quoteT(obj?.text ?? obj, lang);
  }

  window.caseQuoteT = quoteT;
  window.caseQuoteHtml = quoteHtml;
})();
