/**
 * Case study detail page — full-width Figma-faithful rendering.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "portfolio-lang";
  let lang = localStorage.getItem(STORAGE_KEY) || "en";

  const $ = (sel) => document.querySelector(sel);

  function t(key) {
    const parts = key.split(".");
    let obj = window.PORTFOLIO_I18N[lang];
    for (const p of parts) {
      if (!obj) return "";
      obj = obj[p];
    }
    return obj ?? "";
  }

  function tl(obj) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] || obj.en || "";
  }

  function renderCaseSection(section) {
    const body = section.body?.[lang]
      ? `<p class="case-section-body">${section.body[lang]}</p>`
      : "";
    const bullets = section.bullets?.[lang]?.length
      ? `<ul class="case-section-list">${section.bullets[lang].map((item) => `<li>${item}</li>`).join("")}</ul>`
      : "";
    const singleImage = section.image
      ? `<figure class="case-figure"><img src="${section.image}" alt="${section.imageAlt?.[lang] || ""}" loading="lazy"></figure>`
      : "";
    const gallery = section.images?.length
      ? `<div class="case-gallery">${section.images
          .map(
            (img) =>
              `<figure class="case-figure"><img src="${img.src}" alt="${img.alt?.[lang] || ""}" loading="lazy"></figure>`
          )
          .join("")}</div>`
      : "";

    return `
      <section class="case-section">
        <h4 class="case-section-title">${section.title[lang]}</h4>
        ${body}
        ${bullets}
        ${singleImage}
        ${gallery}
      </section>`;
  }

  function isCasePageV3() {
    return document.body?.dataset?.caseVersion === "3";
  }

  function renderKeycloakCase(cs) {
    const metaItems = [
      { label: t("work.metaRole"), value: cs.meta.role[lang] },
      { label: t("work.metaDuration"), value: cs.meta.duration[lang] },
      ...(isCasePageV3()
        ? []
        : [{ label: t("work.metaPlatform"), value: cs.meta.platform[lang] }]),
      { label: t("work.metaTeam"), value: cs.meta.team[lang] },
    ];

    const processHtml = cs.process?.[lang]?.length
      ? `
      <div class="case-process">
        <p class="case-process-label">${t("work.processTitle")}</p>
        <div class="case-process-tags">
          ${cs.process[lang].map((step) => `<span>${step}</span>`).join("")}
        </div>
      </div>`
      : "";

    const sectionsHtml = (cs.sections || []).map(renderCaseSection).join("");
    const linksHtml = cs.externalUrl
      ? `<div class="case-links"><a class="case-link case-link--article" href="${cs.externalUrl}" target="_blank" rel="noopener noreferrer">${t("work.readArticle")}</a></div>`
      : "";

    return `
      <article class="case-study">
        ${cs.heroImage ? `<figure class="case-hero"><img src="${cs.heroImage}" alt="" loading="lazy"></figure>` : ""}
        <span class="case-product-badge">${cs.product[lang]}</span>
        <h1 class="case-title">${cs.title[lang]}</h1>
        <p class="case-tagline">${cs.tagline[lang]}</p>
        <dl class="case-meta-grid">
          ${metaItems
            .map(
              (item) => `
            <div class="case-meta-item">
              <dt>${item.label}</dt>
              <dd>${item.value}</dd>
            </div>`
            )
            .join("")}
        </dl>
        ${processHtml}
        <div class="case-sections">${sectionsHtml}</div>
        <p class="case-impact-title">${t("work.outcomesTitle")}</p>
        <ul class="case-impact-list">
          ${cs.outcomes[lang].map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <div class="case-tags">
          ${cs.tags[lang].map((tag) => `<span>${tag}</span>`).join("")}
        </div>
        ${linksHtml}
      </article>`;
  }

  function renderCase() {
    const caseId =
      document.body.dataset.caseId || document.body.getAttribute("data-case-id");
    const root = document.getElementById("case-root");
    if (!caseId || !root) return;

    const cs = window.getCaseStudyById?.(caseId);
    if (!cs) {
      root.innerHTML = `<p class="case-page__error">Case study not found.</p>`;
      return;
    }

    try {
      const blogTitle =
        cs.template === "keycloak-blog" && window.KEYCLOAK_BLOG_ARTICLE?.blogTitle
          ? tl(window.KEYCLOAK_BLOG_ARTICLE.blogTitle)
          : tl(cs.title);
      document.title = `${blogTitle} — ${t("meta.title")}`;

      if (cs.template === "openshift" && window.renderOpenShiftCase) {
        root.innerHTML = window.renderOpenShiftCase(cs, lang);
      } else if (cs.template === "keycloak-blog" && window.renderKeycloakBlogCase) {
        root.innerHTML = window.renderKeycloakBlogCase(cs, lang, t);
      } else if (cs.template === "openshift") {
        root.innerHTML = `<p class="case-page__error">Case renderer failed to load.</p>`;
      } else {
        root.innerHTML = renderKeycloakCase(cs);
      }
    } catch (err) {
      console.error("Case render failed:", err);
      root.innerHTML = `<p class="case-page__error">Case study failed to render.</p>`;
    }

    const navCaseId = caseId.replace(/-v\d+$/, "-v1");
    const prev = window.getAdjacentCase?.(navCaseId, "prev");
    const next = window.getAdjacentCase?.(navCaseId, "next");
    const nav = document.getElementById("case-nav");
    if (nav && prev && next) {
      nav.innerHTML = `
        <a class="case-page-nav__link" href="${prev.href}">← ${tl(prev.title)}</a>
        <a class="case-page-nav__link" href="${next.href}">${tl(next.title)} →</a>`;
    }
  }

  function setLang(next) {
    lang = next;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    syncLangSwitch();
    renderStaticLabels();
    mountVersionSwitch();
    renderCase();
  }

  function syncLangSwitch() {
    const control = document.getElementById("lang-switch");
    if (!control) return;
    const isEn = lang === "en";
    control.setAttribute("aria-checked", String(isEn));
    control.setAttribute(
      "aria-label",
      isEn ? t("lang.switchAriaEn") : t("lang.switchAriaZh")
    );
    control.closest(".lang-switch")?.classList.toggle("is-en", isEn);
  }

  function renderStaticLabels() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (key === "backToWork") el.textContent = t("work.backToWork");
      if (key === "skip") el.textContent = t("skip");
    });
  }

  function redirectToDefaultVersionIfNeeded() {
    const caseId = document.body.dataset.caseId;
    const naming = window.getCaseDetailNaming?.(caseId);
    if (!naming || naming.version >= 3) return false;
    const v3Href = window.getCaseDetailDefaultHref?.(caseId);
    if (v3Href) {
      window.location.replace(v3Href);
      return true;
    }
    return false;
  }

  function mountVersionSwitch() {
    document.getElementById("case-version-switch")?.remove();
  }

  function init() {
    if (redirectToDefaultVersionIfNeeded()) return;

    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    syncLangSwitch();
    renderStaticLabels();
    mountVersionSwitch();
    renderCase();

    $("#lang-switch")?.addEventListener("click", () => {
      setLang(lang === "zh" ? "en" : "zh");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
