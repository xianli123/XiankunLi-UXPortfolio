(function () {
  "use strict";

  const STORAGE_KEY = "portfolio-lang";
  let lang = localStorage.getItem(STORAGE_KEY) || "en";

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  function showAllReveals() {
    $$(".reveal").forEach((el) => el.classList.add("visible"));
  }

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

  function setLang(next) {
    lang = next;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    syncLangSwitch();
    renderAll();
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

  const STATIC_MAP = {
    heroRole: "hero.role",
    heroName: "hero.name",
    heroTagline: "hero.tagline",
    heroCta: "hero.cta",
    aboutTitle: "about.title",
    experienceTitle: "about.experienceTitle",
    educationTitle: "about.educationTitle",
    projectsTitle: "about.projectsTitle",
    skillsTitle: "about.skillsTitle",
    toolsTitle: "about.toolsTitle",
    workTitle: "work.title",
    workSubtitle: "work.subtitle",
    contactTitle: "contact.title",
    contactSubtitle: "contact.subtitle",
    footerCopy: "footer.copy",
    phoneLabel: "contact.phoneLabel",
    skip: "skip",
  };

  function renderStatic() {
    document.title = t("meta.title");

    $$("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (STATIC_MAP[key]) {
        el.textContent = t(STATIC_MAP[key]);
      }
    });

    $$("[data-nav]").forEach((el) => {
      el.textContent = t(`nav.${el.dataset.nav}`);
    });
  }

  function renderCvEntry(entry, type) {
    const paragraphs = (entry.paragraphs || [])
      .map((p) => `<p class="cv-desc">${p}</p>`)
      .join("");

    if (type === "project") {
      const titleHtml = entry.url
        ? `<a href="${entry.url}" target="_blank" rel="noopener noreferrer">${entry.title}</a>`
        : entry.title;
      return `
        <article class="cv-entry cv-entry--project" style="--entry-accent: ${entry.color || "var(--color-brand)"}">
          <p class="cv-period">${entry.period}</p>
          <h4 class="cv-entry-title">${titleHtml}</h4>
          <p class="cv-subtitle">${entry.subtitle}</p>
          ${paragraphs || (entry.desc ? `<p class="cv-desc">${entry.desc}</p>` : "")}
        </article>`;
    }

    if (type === "education") {
      return `
        <article class="cv-entry">
          <p class="cv-period">${entry.period}</p>
          <h4 class="cv-entry-title">${entry.org}</h4>
          <p class="cv-degree">${entry.degree}</p>
          ${entry.desc ? `<p class="cv-desc">${entry.desc}</p>` : ""}
        </article>`;
    }

    return `
      <article class="cv-entry cv-entry--main">
        <p class="cv-period">${entry.period}</p>
        <h4 class="cv-entry-title">${entry.org}</h4>
        <p class="cv-desc">${entry.desc}</p>
      </article>`;
  }

  function renderCvResume() {
    const data = window.PORTFOLIO_I18N[lang].cv;
    const expContainer = document.getElementById("cv-experience");
    const eduContainer = document.getElementById("cv-education");

    if (expContainer) {
      const projectsHtml = data.projects
        .map((p) => renderCvEntry(p, "project"))
        .join("");

      expContainer.innerHTML = `
        ${renderCvEntry(data.experience, "main")}
        <div class="cv-subsection">
          <h4 class="cv-subsection-title">${t("about.projectsTitle")}</h4>
          ${projectsHtml}
        </div>
      `;
    }

    if (eduContainer) {
      eduContainer.innerHTML = data.education
        .map((e) => renderCvEntry(e, "education"))
        .join("");
    }
  }

  function renderCvList(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.className = "cv-list";
    container.innerHTML = items.map((s) => `<li>${s}</li>`).join("");
  }

  /* Irregular angles, radii, and sizes — less grid-like orbit layout */
  const HERO_ORBIT_LAYOUT = [
    { size: 94, ring: 0.91, angle: -118, pulse: 3.3, delay: 0.12 },
    { size: 68, ring: 0.52, angle: -22, pulse: 4, delay: 0.58 },
    { size: 86, ring: 0.74, angle: 67, pulse: 3.6, delay: 0.28 },
    { size: 62, ring: 0.88, angle: 156, pulse: 4.2, delay: 0.72 },
    { size: 80, ring: 0.46, angle: -168, pulse: 3.5, delay: 0.38 },
    { size: 72, ring: 0.69, angle: 218, pulse: 3.9, delay: 0.05 },
    { size: 58, ring: 0.83, angle: 8, pulse: 4.1, delay: 0.82 },
    { size: 76, ring: 0.58, angle: 134, pulse: 3.4, delay: 0.44 },
  ];

  const HERO_ORBIT_ACCENT_LABELS = new Set([
    "Competitor research",
    "竞品分析",
    "User research",
    "用户研究",
    "Usability testing",
    "可用性测试",
  ]);

  const HERO_ORBIT_SOFT_LABELS = new Set([
    "Technology analysis",
    "技术分析",
    "Project management",
    "设计项目管理",
    "Vibe coding",
  ]);

  function heroOrbitBubbleClass(label) {
    if (HERO_ORBIT_ACCENT_LABELS.has(label)) return " hero-orbit__bubble--accent";
    if (HERO_ORBIT_SOFT_LABELS.has(label)) return " hero-orbit__bubble--soft";
    return "";
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const HERO_ORBIT_SKIP = new Set([
    "Visual design",
    "视觉设计",
    "UX design",
    "交互设计",
  ]);

  function renderHeroOrbit(items) {
    const orbit = document.getElementById("hero-orbit");
    if (!orbit) return;

    orbit.querySelector(".hero-orbit__rotator")?.remove();

    const coreLabel = orbit.querySelector(".orbit-core__label");
    const centerText =
      items.find((label) => label === "UX design" || label === "交互设计") ||
      (lang === "zh" ? "交互设计" : "UX design");
    if (coreLabel) coreLabel.textContent = centerText;

    const orbitItems = items.filter((label) => !HERO_ORBIT_SKIP.has(label));

    const bubbles = orbitItems
      .map((label, i) => {
        const layout = HERO_ORBIT_LAYOUT[i % HERO_ORBIT_LAYOUT.length];
        const bubbleClass = heroOrbitBubbleClass(label);
        const isTechAnalysis =
          label === "Technology analysis" || label === "技术分析";
        const isProjectMgmt =
          label === "Project management" || label === "设计项目管理";
        const isUsabilityTesting =
          label === "Usability testing" || label === "可用性测试";
        let size = layout.size;
        if (isTechAnalysis) size -= 20;
        else if (isProjectMgmt) size += 10;
        else if (isUsabilityTesting) size += 10;
        const safe = escapeHtml(label);
        return `
        <li
          class="hero-orbit__item"
          style="--size: ${size}px; --ring: ${layout.ring}; --angle: ${layout.angle}deg; --pulse-dur: ${layout.pulse}s; --pulse-delay: ${layout.delay}s"
        >
          <span class="hero-orbit__item-pos">
            <span class="hero-orbit__face" tabindex="0" title="${safe}">
              <span class="hero-orbit__bubble${bubbleClass}">
                <span class="hero-orbit__label">${safe}</span>
              </span>
            </span>
          </span>
        </li>`;
      })
      .join("");

    const rotator = document.createElement("div");
    rotator.className = "hero-orbit__rotator";
    rotator.innerHTML = `<ul class="hero-orbit__items">${bubbles}</ul>`;
    orbit.appendChild(rotator);
  }

  function renderWorkCards() {
    const grid = document.getElementById("work-grid");
    const cases = window.CASE_INDEX || [];
    if (!grid || !cases.length) return;

    grid.innerHTML = cases
      .filter((item) => !item.hidden)
      .map(
        (item) => `
      <article class="work-card reveal" data-case-id="${item.id}">
        <a class="work-card__link" href="${item.href}">
          <div class="work-card__cover" style="--card-accent: ${item.color};${item.coverFit ? ` --cover-fit: ${item.coverFit};` : ""}${item.coverPosition ? ` --cover-position: ${item.coverPosition};` : ""}">
            ${
              item.coverImage
                ? `<img class="work-card__cover-img" src="${item.coverImage}" alt="" loading="lazy" decoding="async">`
                : `<span class="work-card__cover-label">${tl(item.title)}</span>`
            }
          </div>
          <div class="work-card__body">
            <p class="work-card__tags">${tl(item.tags)}</p>
            <h3 class="work-card__title">${tl(item.title)}</h3>
            <p class="work-card__excerpt">${tl(item.excerpt)}</p>
            <span class="work-card__cta">${t("work.viewCaseStudy")}</span>
          </div>
        </a>
      </article>`
      )
      .join("");
  }

  function initReveal() {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      $$(".reveal").forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    $$(".reveal").forEach((el) => observer.observe(el));
    showInViewReveals();
  }

  function showInViewReveals() {
    $$(".reveal").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("visible");
      }
    });
  }

  function resetReveal() {
    $$(".reveal").forEach((el) => el.classList.remove("visible"));
    initReveal();
  }

  function initHeader() {
    const header = $(".site-header");
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function renderAll() {
    renderStatic();
    renderCvResume();
    const data = window.PORTFOLIO_I18N[lang];
    renderCvList("skills-list", data.skills);
    renderHeroOrbit(data.skills);
    renderCvList("tools-list", data.tools);
    renderWorkCards();
    resetReveal();
  }

  function init() {
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js-ready");

    try {
      document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

      $(".lang-switch__control")?.addEventListener("click", () => {
        setLang(lang === "zh" ? "en" : "zh");
      });

      document.getElementById("lang-switch")?.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setLang(lang === "zh" ? "en" : "zh");
        }
      });

      syncLangSwitch();
      initHeader();
      renderAll();
    } catch (err) {
      console.error("Portfolio init failed:", err);
      showAllReveals();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
