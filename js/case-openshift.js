/**
 * OpenShift AI — Figma 1:1 HTML/CSS renderer (1920px design system).
 */
(function () {
  "use strict";

  const ICON = "assets/cases/openshift-ai/icons/";

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

  function htmlOrEsc(obj, lang) {
    if (obj?.html?.[lang] || obj?.html?.en) return obj.html[lang] || obj.html.en;
    return esc(t(obj, lang));
  }

  function quoteT(obj, lang) {
    return (window.caseQuoteT || t)(obj, lang);
  }

  function quoteHtmlOrEsc(obj, lang) {
    const html = window.caseQuoteHtml?.(obj, lang);
    if (obj?.html && html) return html;
    return esc(quoteT(obj?.text ?? obj, lang));
  }

  function renderHero(h, lang) {
    const variant = h.variant ? ` fc-hero--${h.variant}` : "";
    const mockHtml = h.mockup ? window.CASE_OPENSHIFT_MOCKUPS?.render(h.mockup) || "" : "";
    const visual = mockHtml
      ? `<figure class="fc-hero__visual fc-hero__visual--mock">${mockHtml}</figure>`
      : h.image
        ? `<figure class="fc-hero__visual"><img src="${esc(h.image)}" alt="" loading="eager" width="${h.illustrationWidth || ""}" height="${h.illustrationHeight || ""}"></figure>`
        : "";

    const copyBlock =
      h.variant === "deployment"
        ? `
          <div class="fc-hero__copy">
            <div class="fc-hero__copy-head">
              <div class="fc-hero__badge"><span>${esc(t(h.product, lang))}</span></div>
              <h1 class="fc-hero__title">${
                h.titleLines
                  ? (h.titleLines[lang] || h.titleLines.en || [])
                      .map((line) => `<span class="fc-hero__title-line">${esc(line)}</span>`)
                      .join("")
                  : esc(t(h.title, lang))
              }</h1>
            </div>
            <p class="fc-hero__tagline">${esc(t(h.tagline, lang))}</p>
          </div>`
        : "";

    return `
      <header class="fc-hero${variant}">
        <div class="fc-hero__stage">
          <div class="fc-hero__blobs" aria-hidden="true">
            <span class="fc-hero__blob fc-hero__blob--1"></span>
            <span class="fc-hero__blob fc-hero__blob--2"></span>
            <span class="fc-hero__blob fc-hero__blob--3"></span>
          </div>
          ${visual}
          ${
            copyBlock ||
            `<div class="fc-hero__badge"><span>${esc(t(h.product, lang))}</span></div>
          <h1 class="fc-hero__title">${
            h.titleLines
              ? (h.titleLines[lang] || h.titleLines.en || [])
                  .map((line) => `<span class="fc-hero__title-line">${esc(line)}</span>`)
                  .join("")
              : esc(t(h.title, lang))
          }</h1>
          <p class="fc-hero__tagline">${esc(t(h.tagline, lang))}</p>`
          }
        </div>
        <div class="fc-hero__foot">
          ${renderMeta(h.meta, lang)}
          ${renderProcess(h.process, lang)}
        </div>
      </header>`;
  }

  function isCasePageV3() {
    return document.body?.dataset?.caseVersion === "3";
  }

  function renderMeta(meta, lang) {
    if (!meta) return "";
    const pill = meta.productLabel
      ? `<span class="fc-meta__pill">${esc(t(meta.productLabel, lang))}</span>`
      : "";
    const items = [
      { label: "Role", value: t(meta.role, lang) },
      { label: "Duration", value: t(meta.duration, lang) },
      ...(isCasePageV3()
        ? []
        : [
            {
              label: "Platform",
              value: `<span class="fc-meta__platform">${esc(t(meta.platform, lang))}${pill}</span>`,
              html: true,
            },
          ]),
      { label: "Team", value: esc(t(meta.team, lang)) },
    ];
    return `
      <dl class="fc-meta">
        ${items
          .map(
            (item) => `
          <div class="fc-meta__item">
            <dt class="fc-meta__label">${esc(item.label)}</dt>
            <dd class="fc-meta__value">${item.html ? item.value : esc(item.value)}</dd>
          </div>`
          )
          .join("")}
      </dl>`;
  }

  function renderProcessTag(step, lang) {
    const label = esc(t(step.label, lang) || step.label);
    return `
      <span class="fc-process__tag">
        ${step.icon ? `<span class="fc-process__tag-icon"><img src="${ICON}${step.icon}" alt="" aria-hidden="true" width="24" height="24"></span>` : ""}
        <span class="fc-process__tag-label">${label}</span>
      </span>`;
  }

  function renderProcess(steps, lang) {
    const list = steps?.[lang] || steps?.en;
    if (!list?.length) return "";

    let tagsHtml;
    if (steps.layout === "rbac-stagger") {
      const row = (indices) => indices.map((i) => renderProcessTag(list[i], lang)).join("");
      tagsHtml = `
        <div class="fc-process__tags fc-process__tags--rbac">
          <div class="fc-process__row">${row([0, 1, 2, 3])}</div>
          <div class="fc-process__row fc-process__row--split">
            <div class="fc-process__row-group">${row([4, 5, 6])}</div>
            <div class="fc-process__row-group">${row([7, 8])}</div>
          </div>
        </div>`;
    } else if (steps.layout === "deploy-stagger") {
      const row = (indices) => indices.map((i) => renderProcessTag(list[i], lang)).join("");
      tagsHtml = `
        <div class="fc-process__tags fc-process__tags--deploy">
          <div class="fc-process__row">${row([0, 1, 2])}</div>
          <div class="fc-process__row fc-process__row--split">
            <div class="fc-process__row-group">${row([3, 4, 5])}</div>
            <div class="fc-process__row-group">${row([6, 7])}</div>
          </div>
        </div>`;
    } else if (steps.layout === "model-stagger") {
      const row = (indices) => indices.map((i) => renderProcessTag(list[i], lang)).join("");
      tagsHtml = `
        <div class="fc-process__tags fc-process__tags--model">
          <div class="fc-process__row">${row([0, 1, 2, 3])}</div>
          <div class="fc-process__row">${row([4, 5, 6, 7])}</div>
        </div>`;
    } else {
      tagsHtml = `
        <div class="fc-process__tags">
          ${list.map((step) => renderProcessTag(step, lang)).join("")}
        </div>`;
    }

    const processLabel = isCasePageV3()
      ? t(
          {
            en: "As the lead designer, I owned:",
            zh: "项目中的主要工作",
          },
          lang
        )
      : "Design process";

    return `
      <div class="fc-process${isCasePageV3() ? " fc-process--v3" : ""}">
        <p class="fc-process__label">${esc(processLabel)}</p>
        ${tagsHtml}
      </div>`;
  }

  function renderSplit(block, lang) {
    const rightItems = (block.right.items || [])
      .map((item) => {
        if (!item.icon) {
          return `<p class="fc-section__body">${esc(t(item.text, lang))}</p>`;
        }
        return `
              <div class="fc-icon-list__item">
                <img src="${ICON}${item.icon}" alt="" aria-hidden="true">
                <p class="fc-section__body">${esc(t(item.text, lang))}</p>
              </div>`;
      })
      .join("");

    return `
      <div class="fc-split">
        <div>
          <h3 class="fc-section__subtitle">${esc(t(block.left.title, lang))}</h3>
          <p class="fc-section__body">${esc(t(block.left.body, lang))}</p>
        </div>
        <div>
          <h3 class="fc-section__subtitle">${esc(t(block.right.title, lang))}</h3>
          <div class="fc-icon-list">${rightItems}</div>
        </div>
      </div>`;
  }

  function renderBand(block, lang) {
    return `
      <div class="fc-insight">
        <div>
          <h3 class="fc-section__subtitle">${esc(t(block.title, lang))}</h3>
          <p class="fc-section__body">${esc(t(block.body, lang))}</p>
        </div>
        <div class="fc-quotes">
          ${(block.quotes || [])
            .map(
              (q) => `
            <blockquote class="fc-quote">
              <img class="fc-quote__icon" src="${ICON}quote.svg" alt="" aria-hidden="true">
              <p class="fc-quote__text">${esc(quoteT(q.text, lang))}</p>
              <footer>
                <p class="fc-quote__author">${esc(t(q.author, lang))}</p>
                <p class="fc-quote__role">${esc(t(q.company, lang))}</p>
              </footer>
            </blockquote>`
            )
            .join("")}
        </div>
      </div>`;
  }

  function renderObjectives(block, lang) {
    const intro = block.body
      ? `<div class="fc-section__intro"><p class="fc-section__body">${esc(t(block.body, lang))}</p></div>`
      : "";
    return `
      <section class="fc-section fc-section--objectives">
        <h2 class="fc-section__title">${esc(t(block.title, lang))}</h2>
        ${intro}
        <div class="fc-card-grid fc-card-grid--objectives">
          ${(block.cards || [])
            .map(
              (card) => `
            <div class="fc-card-grid__cell">
              ${card.icon ? `<img class="fc-card-grid__icon" src="${ICON}${card.icon}" alt="" aria-hidden="true">` : ""}
              ${card.title ? `<p class="fc-card-grid__title">${esc(t(card.title, lang))}</p>` : ""}
              <p class="fc-card-grid__text">${esc(t(card.text, lang))}</p>
            </div>`
            )
            .join("")}
        </div>
      </section>`;
  }

  function renderPain(block, lang) {
    const title = block.title ? `<h2 class="fc-section__title">${esc(t(block.title, lang))}</h2>` : "";
    return `
      <div class="fc-pain">
        ${title}
        ${block.subtitle ? `<h3 class="fc-section__subtitle">${esc(t(block.subtitle, lang))}</h3>` : ""}
        <div class="fc-card-grid fc-card-grid--4 fc-card-grid--pain">
          ${(block.items || [])
            .map(
              (item) => `
            <div class="fc-card-grid__cell">
              ${item.icon ? `<img class="fc-card-grid__icon" src="${ICON}${item.icon}" alt="" aria-hidden="true">` : ""}
              <div>
                ${item.title ? `<p class="fc-card-grid__title">${esc(t(item.title, lang))}</p>` : ""}
                <p class="fc-card-grid__text">${esc(t(item.text, lang))}</p>
              </div>
            </div>`
            )
            .join("")}
        </div>
      </div>`;
  }

  function stepBody(step, lang) {
    if (step.bodyHtml?.[lang] || step.bodyHtml?.en) return step.bodyHtml[lang] || step.bodyHtml.en;
    return esc(t(step.body, lang));
  }

  function stepTitle(step, lang) {
    if (step.titleHtml?.[lang] || step.titleHtml?.en) return step.titleHtml[lang] || step.titleHtml.en;
    return esc(t(step.title, lang));
  }

  function renderJourney(block, lang) {
    const gradients = ["1", "2", "3", "4", "5"];
    const heading = block.title ? `<h3 class="fc-section__subtitle">${esc(t(block.title, lang))}</h3>` : "";
    return `
      <div class="fc-journey-wrap">
        ${heading}
        ${block.body ? `<p class="fc-section__body fc-section__intro">${esc(t(block.body, lang))}</p>` : ""}
        <div class="fc-journey">
          <div class="fc-journey__line" aria-hidden="true"></div>
          <div class="fc-journey__steps">
            ${(block.steps || [])
              .map(
                (step, i) => `
              <article class="fc-journey__step">
                <div class="fc-journey__emoji-wrap fc-journey__emoji-wrap--${gradients[i] || "1"}" aria-hidden="true">${step.emoji || ""}</div>
                <div class="fc-journey__card">
                  <p class="fc-journey__phase">${esc(t(step.phase, lang))}</p>
                  <h4 class="fc-journey__step-title">${stepTitle(step, lang)}</h4>
                  <p class="fc-journey__step-body">${stepBody(step, lang)}</p>
                </div>
              </article>`
              )
              .join("")}
          </div>
        </div>
      </div>`;
  }

  function phaseField(obj, lang) {
    if (obj?.html?.[lang] || obj?.html?.en) return obj.html[lang] || obj.html.en;
    return esc(t(obj, lang));
  }

  function renderModelResearch(_block, lang) {
    const d = window.MODEL_DETAILS_DATA?.research;
    if (!d) return "";
    const pc = d.projectContext;
    const ur = d.userResearch;
    const obj = d.objectives;

    const challengeList = (pc.challenges || [])
      .map((item) => `<li>${esc(t(item, lang))}</li>`)
      .join("");
    const goalList = (pc.goals || [])
      .map((item) => `<li>${esc(t(item, lang))}</li>`)
      .join("");

    const stories = (ur.stories || [])
      .map(
        (story) => `
        <div class="fc-model-story">
          <img class="fc-model-story__icon" src="${esc(story.icon)}" alt="" width="32" height="32" aria-hidden="true">
          <p class="fc-model-story__text">${story.html?.[lang] || story.html?.en || ""}</p>
        </div>`
      )
      .join("");

    const journeyCols = (ur.phases || [])
      .map(
        (ph) => `
        <article class="fc-model-journey__col fc-model-journey__col--${ph.tone}">
          <header class="fc-model-journey__head">${esc(t(ph.phase, lang))}</header>
          <p class="fc-model-journey__label">Phase objective</p>
          <p class="fc-model-journey__text">${esc(t(ph.objective, lang))}</p>
          <p class="fc-model-journey__label fc-model-journey__label--accent">Intent &amp; actions</p>
          <p class="fc-model-journey__text">${phaseField(ph.intent, lang)}</p>
          <p class="fc-model-journey__label fc-model-journey__label--accent">Risks &amp; friction</p>
          <p class="fc-model-journey__text">${esc(t(ph.risks, lang))}</p>
        </article>`
      )
      .join("");

    const objectiveCards = (obj.cards || [])
      .map(
        (card) => `
        <div class="fc-model-objectives__card">
          <img src="${esc(card.icon)}" alt="" width="32" height="32" aria-hidden="true">
          <p>${esc(t(card.text, lang))}</p>
        </div>`
      )
      .join("");

    const kw = (ur.persona.keywords || [])
      .map((k) => `<li>${esc(t(k, lang))}</li>`)
      .join("");

    const isModelDetailsV3 = document.body.dataset.caseId === "model-details-v3";
    const projectContextHtml =
      isModelDetailsV3 && window.renderModelProjectContextV3
        ? window.renderModelProjectContextV3(pc, lang)
        : `<div class="fc-model-context">
          <p class="fc-model-context__body">${htmlOrEsc(pc.body, lang)}</p>
          <div class="fc-model-context__cards">
            <div class="fc-model-context__card fc-model-context__card--challenge">
              <h3>Challenges</h3>
              <ul>${challengeList}</ul>
            </div>
            <div class="fc-model-context__card fc-model-context__card--goals">
              <h3>Goals</h3>
              <ul>${goalList}</ul>
            </div>
          </div>
        </div>
        ${
          window.renderModelPurposeV2
            ? window.renderModelPurposeV2(pc.purpose, lang)
            : `<div class="fc-model-purpose">
          <h3>${esc(t(pc.purpose.title, lang))}</h3>
          <p>${esc(t(pc.purpose.body, lang))}</p>
        </div>`
        }`;

    const objectivesHtml = window.renderModelObjectivesV2
      ? window.renderModelObjectivesV2(obj, lang)
      : `<h2 class="fc-section__title fc-model-research__gap--objectives">${esc(t(obj.title, lang))}</h2>
        <div class="fc-model-objectives">${objectiveCards}</div>`;

    const userResearchHtml =
      isModelDetailsV3 && window.renderModelUserResearchV3
        ? `<h2 class="fc-section__title fc-model-research__gap fc-model-research__gap--ur-v3">${esc(t(ur.title, lang))}</h2>
        ${window.renderModelUserResearchV3(ur, lang)}`
        : `
        <h2 class="fc-section__title fc-model-research__gap">${esc(t(ur.title, lang))}</h2>
        <h3 class="fc-section__subtitle">${esc(t(ur.personaTitle, lang))}</h3>
        <div class="fc-model-persona">
          <div class="fc-model-persona__card">
            <div class="fc-model-persona__head">
              <img src="${esc(ur.persona.photo)}" alt="" width="54" height="54">
              <div>
                <p class="fc-model-persona__name">${esc(t(ur.persona.name, lang))}</p>
                <p class="fc-model-persona__role">${esc(t(ur.persona.role, lang))}</p>
              </div>
            </div>
            <p class="fc-model-persona__body">${esc(t(ur.persona.body, lang))}</p>
            <p class="fc-model-persona__kw-title"><strong>Key words</strong></p>
            <ul class="fc-model-persona__kw">${kw}</ul>
          </div>
          <div class="fc-model-persona__stories">${stories}</div>
        </div>

        <h3 class="fc-section__subtitle fc-model-journey__title">${esc(t(ur.journeyTitle, lang))}</h3>
        <div class="fc-model-journey">
          <div class="fc-model-journey__grid">${journeyCols}</div>
        </div>`;

    const researchBodyHtml = isModelDetailsV3
      ? `${objectivesHtml}${userResearchHtml}`
      : `${userResearchHtml}${objectivesHtml}`;

    return `
      <section class="fc-section fc-model-research">
        <h2 class="fc-section__title">${esc(t(pc.title, lang))}</h2>
        ${projectContextHtml}

        ${researchBodyHtml}
      </section>`;
  }

  function renderModelIaMap(_block, lang) {
    if (window.renderModelIaMapV2) return window.renderModelIaMapV2(_block, lang);
    const d = window.MODEL_DETAILS_DATA?.iaMap;
    if (!d) return "";
    const goals = (d.goals || [])
      .map((g) => `<div class="fc-model-ia__goal"><p>${esc(t(g, lang))}</p></div>`)
      .join("");
    const paras = esc(t(d.body, lang)).split("\n\n").filter(Boolean);
    return `
      <section class="fc-section fc-model-ia">
        <div class="fc-model-ia__grid">
          <div class="fc-model-ia__copy">
            <h2 class="fc-section__title">${esc(t(d.title, lang))}</h2>
            ${paras.map((p) => `<p class="fc-model-ia__body">${p}</p>`).join("")}
            <h3 class="fc-model-ia__goals-title">${esc(t(d.goalsTitle, lang))}</h3>
            <div class="fc-model-ia__goals">${goals}</div>
          </div>
          <figure class="fc-model-ia__diagram">
            <img src="${esc(d.diagram)}" alt="IA map" loading="lazy" width="691" height="549">
          </figure>
        </div>
      </section>`;
  }

  function renderHeaderIaImg(asset, alt) {
    if (!asset?.src) return "";
    if (/\.svg$/i.test(asset.src)) {
      return `<img src="${esc(asset.src)}" alt="${esc(alt || "")}" loading="lazy" width="${asset.width}" height="${asset.height}">`;
    }
    const src2x = asset.src.replace(/\.png$/i, "@2x.png");
    return `<img src="${esc(asset.src)}" srcset="${esc(asset.src)} 1x, ${esc(src2x)} 2x" alt="${esc(alt || "")}" loading="lazy" width="${asset.width}" height="${asset.height}">`;
  }

  function renderV3StepTitle(step, title, lang, fallbackHtml) {
    if (window.renderFcDbStepTitleOr) {
      return window.renderFcDbStepTitleOr(step, title, lang, fallbackHtml);
    }
    return fallbackHtml;
  }

  function renderModelDesignPageHeader(h, lang) {
    if (!h) return "";
    const tabs = (h.tabs || [])
      .map(
        (tab) =>
          `<div class="fc-model-page-header__tab${tab.active ? " fc-model-page-header__tab--active" : ""}">
            <span class="fc-model-page-header__tab-label">${esc(t(tab.label, lang))}</span>
          </div>`
      )
      .join("");
    const markers = (h.markers || [])
      .map((m) => {
        const pos = m.right != null ? `right:${m.right}px;left:auto` : `left:${m.left}px`;
        return `<span class="fc-model-design__marker fc-model-page-header__marker" style="${pos};top:${m.top}px" aria-hidden="true">${m.num}</span>`;
      })
      .join("");
    return `
      <div class="fc-model-page-header" role="img" aria-label="Model details page header">
        ${markers}
        <div class="fc-model-page-header__inner">
          <nav class="fc-model-page-header__crumb" aria-label="Breadcrumb">
            <a class="fc-model-page-header__crumb-link" href="#">${esc(t(h.breadcrumbCatalog, lang))}</a>
            <span class="fc-model-page-header__crumb-sep" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 2.5L8 6L4.5 9.5" stroke="#151515" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="fc-model-page-header__crumb-current">${esc(t(h.modelName, lang))}</span>
          </nav>
          <div class="fc-model-page-header__hero">
            <img class="fc-model-page-header__icon" src="${esc(h.modelIcon)}" alt="" width="56" height="56" loading="lazy">
            <div class="fc-model-page-header__copy">
              <div class="fc-model-page-header__title-row">
                <h4 class="fc-model-page-header__title">${esc(t(h.modelName, lang))}</h4>
                <span class="fc-model-page-header__version">
                  <img class="fc-model-page-header__version-icon" src="${esc(h.tagIcon)}" alt="" width="14" height="14" loading="lazy">
                  <span>${esc(h.version)}</span>
                </span>
                <span class="fc-model-page-header__validated">${esc(t(h.validatedLabel, lang))}</span>
              </div>
              <p class="fc-model-page-header__desc">${esc(t(h.description, lang))}</p>
            </div>
            <div class="fc-model-page-header__actions">
              <button type="button" class="fc-model-page-header__btn fc-model-page-header__btn--primary">${esc(t(h.deployLabel, lang))}</button>
              <button type="button" class="fc-model-page-header__btn fc-model-page-header__btn--secondary">${esc(t(h.registerLabel, lang))}</button>
            </div>
          </div>
          <div class="fc-model-page-header__tabs">${tabs}</div>
        </div>
      </div>`;
  }

  function renderModelDesignHeaderIa(section, lang) {
    if (!section) return "";
    const goals = (section.userGoals || [])
      .map((g) => renderModelDesignGoalCol(g, lang))
      .join("");
    const mock = section.pageHeader ? renderModelDesignPageHeader(section.pageHeader, lang) : "";
    return `
      <div class="fc-model-design__header-ia-band">
        <div class="fc-model-design__header-ia-inner">
          <div class="fc-model-design__header-ia-top">
            ${renderV3StepTitle(
              "01",
              section.title,
              lang,
              `<h3 class="fc-model-design__heading-lg fc-model-design__heading-lg--in-band">${esc(t(section.title, lang))}</h3>`
            )}
            ${mock}
          </div>
          <div class="fc-model-design__goals">${goals}</div>
        </div>
      </div>`;
  }

  function renderModelDesignGoalCol(goal, lang) {
    const body = goal.html
      ? `<p class="fc-model-design__goal-text">${htmlOrEsc({ html: goal.html }, lang)}</p>`
      : `<p class="fc-model-design__goal-text">${esc(t(goal.body, lang))}</p>`;
    const mock = goal.mock
      ? `<figure class="fc-model-design__goal-mock">
          ${renderHeaderIaImg(goal.mock, goal.mock.alt)}
        </figure>`
      : "";
    return `
      <div class="fc-model-design__goal-col">
        <span class="fc-model-design__marker" aria-hidden="true">${goal.num}</span>
        <div class="fc-model-design__goal-col-body">
          ${body}
          ${mock}
        </div>
      </div>`;
  }

  function renderModelDesignOverviewIconList(items, lang) {
    const slotFromIcon = (icon) => {
      if (icon.includes("reorder")) return "reorder";
      if (icon.includes("offline-pin")) return "offline-pin";
      if (icon.includes("policy")) return "policy";
      return "default";
    };
    return (items || [])
      .map((item) => {
        const slot = slotFromIcon(item.icon);
        return `
        <div class="fc-model-design__icon-row fc-model-design__icon-row--overview">
          <span class="fc-model-design__icon-slot fc-model-design__icon-slot--${slot}" aria-hidden="true">
            <img class="fc-model-design__icon-slot-img" src="${esc(item.icon)}" alt="" loading="lazy">
          </span>
          <div class="fc-model-design__icon-row-body">
            <h4 class="fc-model-design__icon-row-title">${esc(t(item.title, lang))}</h4>
            <p class="fc-model-design__icon-row-text">${htmlOrEsc({ html: item.html }, lang)}</p>
          </div>
        </div>`;
      })
      .join("");
  }

  function renderModelDesignIconList(items, lang) {
    return (items || [])
      .map(
        (item) => `
        <div class="fc-model-design__icon-row">
          <img class="fc-model-design__icon-row-icon" src="${esc(item.icon)}" alt="" width="32" height="32" loading="lazy">
          <div class="fc-model-design__icon-row-body">
            <h4 class="fc-model-design__icon-row-title">${esc(t(item.title, lang))}</h4>
            <p class="fc-model-design__icon-row-text">${htmlOrEsc(item.body || item.html, lang)}</p>
          </div>
        </div>`
      )
      .join("");
  }

  function renderModelPerformanceIconList(items, lang) {
    const slotFromIcon = (item) =>
      item.iconSlot ||
      (item.icon.includes("display-settings")
        ? "display-settings"
        : item.icon.includes("compress")
          ? "compress"
          : item.icon.includes("playlist-add-circle")
            ? "playlist-add-circle"
            : "default");
    return (items || [])
      .map((item) => {
        const slot = slotFromIcon(item);
        return `
        <div class="fc-model-design__icon-row fc-model-design__icon-row--performance">
          <span class="fc-model-design__icon-slot fc-model-design__icon-slot--${slot}" aria-hidden="true">
            <img class="fc-model-design__icon-slot-img" src="${esc(item.icon)}" alt="" loading="lazy">
          </span>
          <div class="fc-model-design__icon-row-body">
            <h4 class="fc-model-design__icon-row-title">${esc(t(item.title, lang))}</h4>
            <p class="fc-model-design__icon-row-text">${htmlOrEsc(item.body || item.html, lang)}</p>
          </div>
        </div>`;
      })
      .join("");
  }

  function renderModelPerformanceWireframe() {
    const bar = (w, tone, extraClass, h) => {
      const hStyle = h ? `height:calc(${h} * var(--u));` : "";
      return `<span class="fc-model-perf-wf__bar fc-model-perf-wf__bar--${tone}${extraClass ? ` ${extraClass}` : ""}" style="width:calc(${w} * var(--u));${hStyle}"></span>`;
    };
    const absBar = (left, top, w, tone, blockH) => {
      const blockClass = blockH ? " fc-model-perf-wf__bar--block" : "";
      const h = blockH ? `height:calc(${blockH} * var(--u));` : "";
      return `<span class="fc-model-perf-wf__bar fc-model-perf-wf__bar--${tone}${blockClass} fc-model-perf-wf__bar--abs" style="left:calc(${left} * var(--u));top:calc(${top} * var(--u));width:calc(${w} * var(--u));${h}"></span>`;
    };

    const hwColLefts = [0, 65, 130, 195, 260, 325, 390, 455, 520, 585];
    const hwRowTops = [69, 83, 97, 111, 125, 139];
    const hwGrid = hwRowTops
      .map((top, rowIdx) =>
        hwColLefts
          .map((left, colIdx) => {
            const isLastCol = colIdx === 9;
            const isHeaderRow = rowIdx === 0;
            const w = isLastCol && !isHeaderRow ? 33 : 45;
            const tone = isHeaderRow ? "grid-dark" : isLastCol ? "accent" : "light";
            return absBar(20 + left, top, w, tone);
          })
          .join("")
      )
      .join("");

    const chartCol = (headerW, midW, blockW) =>
      `<div class="fc-model-perf-wf__chart-col">
        ${bar(headerW, "grid-dark")}
        ${bar(midW, "light")}
        ${bar(blockW, "light", "fc-model-perf-wf__bar--block", 24)}
      </div>`;

    const compCols = `<div class="fc-model-perf-wf__chart-row fc-model-perf-wf__chart-row--comp">${chartCol(121.5, 96, 48).repeat(4)}</div>`;
    const inferCols = `<div class="fc-model-perf-wf__chart-row fc-model-perf-wf__chart-row--infer">${chartCol(112.493, 88.884, 44.442).repeat(4)}</div>`;

    const vGroup = () =>
      `<div class="fc-model-perf-wf__vgroup">
        <span class="fc-model-perf-wf__vcol fc-model-perf-wf__vcol--tall"></span>
        <span class="fc-model-perf-wf__vcol fc-model-perf-wf__vcol--short"></span>
        <span class="fc-model-perf-wf__vcol fc-model-perf-wf__vcol--short"></span>
        <span class="fc-model-perf-wf__vcol fc-model-perf-wf__vcol--short"></span>
      </div>`;

    return `
      <div class="fc-model-perf-wf" aria-hidden="true">
        <p class="fc-model-perf-wf__tab-label">Performance insights tab</p>
        <div class="fc-model-perf-wf__stack">
          <div class="fc-model-perf-wf__card fc-model-perf-wf__card--hw">
            <p class="fc-model-perf-wf__card-title">Hardware configuration</p>
            <span class="fc-model-perf-wf__hw-pill fc-model-perf-wf__hw-pill--1"></span>
            <span class="fc-model-perf-wf__hw-pill fc-model-perf-wf__hw-pill--2"></span>
            <span class="fc-model-perf-wf__hw-pill fc-model-perf-wf__hw-pill--3"></span>
            <div class="fc-model-perf-wf__hw-grid">${hwGrid}</div>
          </div>
          <div class="fc-model-perf-wf__card fc-model-perf-wf__card--comp">
            <p class="fc-model-perf-wf__card-title">Compression level summary</p>
            ${compCols}
          </div>
          <div class="fc-model-perf-wf__card fc-model-perf-wf__card--advanced">
            <p class="fc-model-perf-wf__more-link"><span class="fc-model-perf-wf__more-chev">v </span>More performance data about the compressions</p>
            <div class="fc-model-perf-wf__subcard fc-model-perf-wf__subcard--infer">
              <p class="fc-model-perf-wf__card-title">Inference metrics</p>
              ${inferCols}
            </div>
            <div class="fc-model-perf-wf__subcard fc-model-perf-wf__subcard--accuracy">
              <p class="fc-model-perf-wf__card-title">Accuracy metrics</p>
              <div class="fc-model-perf-wf__vchart">
                ${Array.from({ length: 5 }, () => vGroup()).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  function renderModelPerformanceSection(section, lang) {
    if (!section) return "";
    const intro = (section.intro || [])
      .map((p) => `<p class="fc-model-design__lead fc-model-design__lead--performance">${esc(t(p, lang))}</p>`)
      .join("");
    return `
      <div class="fc-model-design__block fc-model-design__block--performance">
        ${renderV3StepTitle(
          "03",
          section.title,
          lang,
          `<h3 class="fc-model-design__heading-lg fc-model-design__heading-lg--performance">${esc(t(section.title, lang))}</h3>`
        )}
        <div class="fc-model-design__split fc-model-design__split--performance">
          <div class="fc-model-design__wireframe fc-model-design__wireframe--performance">
            ${renderModelPerformanceWireframe()}
          </div>
          <div class="fc-model-design__split-copy fc-model-design__split-copy--performance">
            ${intro}
            <div class="fc-model-design__icon-list fc-model-design__icon-list--performance">${renderModelPerformanceIconList(section.items, lang)}</div>
          </div>
        </div>
      </div>`;
  }

  function renderBenchmarkSolutionCard(solution, lang) {
    const copy = `
      <div class="fc-model-benchmark__sol-copy">
        <h4 class="fc-model-benchmark__sol-title">${esc(t(solution.title, lang))}</h4>
        <div class="fc-model-benchmark__sol-body">${htmlOrEsc(solution.body, lang)}</div>
      </div>`;
    let visual = "";
    if (solution.visual === "columns") {
      const im = solution.images;
      visual = `
        <div class="fc-model-benchmark__sol-visual fc-model-benchmark__sol-visual--columns">
          <img class="fc-model-benchmark__sol-table-bg" src="${esc(im.table)}" alt="" loading="lazy">
          <div class="fc-model-benchmark__sol-scrim" aria-hidden="true"></div>
          <img class="fc-model-benchmark__sol-modal" src="${esc(im.modal)}" alt="" loading="lazy">
          <img class="fc-model-benchmark__sol-pointer" src="${esc(im.pointer)}" alt="" loading="lazy">
          <span class="fc-model-benchmark__sol-arrow-h" aria-hidden="true">
            <svg viewBox="0 0 139.333 11.547" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0 5.7735C0 8.71902 2.38781 11.1068 5.33333 11.1068C8.27885 11.1068 10.6667 8.71902 10.6667 5.7735C10.6667 2.82798 8.27885 0.440169 5.33333 0.440169C2.38781 0.440169 0 2.82798 0 5.7735ZM139.333 5.7735L129.333 0V11.547L139.333 5.7735ZM5.33333 5.7735V6.7735H130.333V5.7735V4.7735H5.33333V5.7735Z" fill="#FF00FF"/>
            </svg>
          </span>
        </div>`;
    } else if (solution.visual === "filters") {
      const img = solution.image;
      visual = `
        <figure class="fc-model-benchmark__sol-visual fc-model-benchmark__sol-visual--filters">
          <img src="${esc(img.src)}" alt="${esc(img.alt || "")}" width="${img.width}" height="${img.height}" loading="lazy">
        </figure>`;
    } else if (solution.visual === "recommended") {
      const im = solution.images;
      visual = `
        <div class="fc-model-benchmark__sol-visual fc-model-benchmark__sol-visual--recommended">
          <img class="fc-model-benchmark__sol-rec-table" src="${esc(im.table)}" alt="" loading="lazy">
          <span class="fc-model-benchmark__sol-rec-highlight" aria-hidden="true"></span>
          <img class="fc-model-benchmark__sol-rec-badge" src="${esc(im.badge)}" alt="" loading="lazy">
          <span class="fc-model-benchmark__sol-arrow-v" aria-hidden="true">
            <span class="fc-model-benchmark__sol-arrow-v__graphic">
              <svg viewBox="0 0 149.333 11.547" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M0 5.7735C0 8.71902 2.38781 11.1068 5.33333 11.1068C8.27885 11.1068 10.6667 8.71902 10.6667 5.7735C10.6667 2.82798 8.27885 0.440169 5.33333 0.440169C2.38781 0.440169 0 2.82798 0 5.7735ZM149.333 5.7735L129.333 0V11.547L149.333 5.7735ZM5.33333 5.7735V6.7735H140.333V5.7735V4.7735H5.33333V5.7735Z" fill="#FF00FF"/>
              </svg>
            </span>
          </span>
        </div>`;
    }
    const mod =
      solution.visual === "columns"
        ? " fc-model-benchmark__sol-card--columns"
        : solution.visual === "filters"
          ? " fc-model-benchmark__sol-card--filters"
          : " fc-model-benchmark__sol-card--recommended";
    return `
      <article class="fc-model-benchmark__sol-card${mod}">
        ${copy}
        <div class="fc-model-benchmark__sol-media">${visual}</div>
      </article>`;
  }

  function renderModelBenchmarkHardware(section, lang) {
    if (!section) return "";
    const cs = section.challengeSolution;
    const challengeImg = cs.challenge.image;
    const solutions = (cs.solutions || [])
      .map((s) => renderBenchmarkSolutionCard(s, lang))
      .join("");
    const table = section.table;
    return `
      <div class="fc-model-design__block fc-model-design__block--benchmark">
        <h3 class="fc-model-design__heading-md fc-model-design__heading-md--benchmark">${esc(t(section.title, lang))}</h3>
        <p class="fc-model-design__lead fc-model-design__lead--benchmark">${esc(t(section.intro, lang))}</p>
        <figure class="fc-model-benchmark__table-frame">
          <img src="${esc(table.src)}" alt="${esc(table.alt || t(section.title, lang))}" width="${table.width}" height="${table.height}" loading="lazy">
        </figure>
        <div class="fc-model-benchmark__cs">
          <div class="fc-model-benchmark__cs-row fc-model-benchmark__cs-row--head">
            <div class="fc-model-benchmark__rail-pale" aria-hidden="true"></div>
            <div class="fc-model-benchmark__cs-head-body">
              <header class="fc-model-benchmark__cs-header">
                <div class="fc-model-benchmark__badge">
                  <span class="fc-model-benchmark__badge-icon" aria-hidden="true">
                    <img src="${esc(cs.badgeIcon)}" alt="" width="20" height="20" loading="lazy">
                  </span>
                  <span class="fc-model-benchmark__badge-text">${esc(t(cs.badge, lang))}</span>
                </div>
                <h4 class="fc-model-benchmark__cs-headline">${esc(t(cs.headline, lang))}</h4>
              </header>
              <div class="fc-model-benchmark__challenge">
                <span class="fc-model-benchmark__tag fc-model-benchmark__tag--challenge">Challenge</span>
                <div class="fc-model-benchmark__challenge-grid">
                  <div class="fc-model-benchmark__challenge-copy">${htmlOrEsc(cs.challenge, lang)}</div>
                  <figure class="fc-model-benchmark__challenge-visual">
                    <img src="${esc(challengeImg.src)}" alt="${esc(challengeImg.alt || "")}" width="${challengeImg.width}" height="${challengeImg.height}" loading="lazy">
                  </figure>
                </div>
              </div>
            </div>
          </div>
          <div class="fc-model-benchmark__cs-row fc-model-benchmark__cs-row--sol">
            <div class="fc-model-benchmark__rail-hot" aria-hidden="true"></div>
            <div class="fc-model-benchmark__cs-sol-body">
              <div class="fc-model-benchmark__solution-wrap">
                <span class="fc-model-benchmark__tag fc-model-benchmark__tag--solution">Solution</span>
                <div class="fc-model-benchmark__solutions">${solutions}</div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  function renderModelCompressionSection(section, lang) {
    if (!section) return "";
    const shot = section.screenshot;
    const arrows = section.arrows || {};
    const callout = section.callout || {};
    const notes = (section.notes || [])
      .map(
        (note) => `
        <p class="fc-model-compression__note" style="top:calc(${note.top} * var(--u));left:calc(${note.left} * var(--u));width:calc(${note.width} * var(--u))">${esc(t(note.body, lang))}</p>`
      )
      .join("");
    const calloutHtml = callout.src
      ? `
          <figure class="fc-model-compression__callout" style="top:calc(${callout.top} * var(--u));left:calc(${callout.left} * var(--u));width:calc(${callout.width} * var(--u));height:calc(${callout.height} * var(--u))">
            <img src="${esc(callout.src)}" alt="${esc(callout.alt || "")}" width="${callout.width}" height="${callout.height}" loading="lazy">
          </figure>`
      : "";
    return `
      <div class="fc-model-design__block fc-model-design__block--compression">
        <h3 class="fc-model-design__heading-md fc-model-compression__title">${esc(t(section.title, lang))}</h3>
        <div class="fc-model-compression__frame">
          <div class="fc-model-compression__left">
            <figure class="fc-model-compression__screen">
              <img src="${esc(shot.src)}" alt="${esc(shot.alt || t(section.title, lang))}" width="${shot.width}" height="${shot.height}" loading="lazy">
            </figure>
          </div>
          <div class="fc-model-compression__copy-bg" aria-hidden="true"></div>
          <aside class="fc-model-compression__copy">${calloutHtml}${notes}</aside>
          <div class="fc-model-compression__arrows" aria-hidden="true">
            <img class="fc-model-compression__arrow fc-model-compression__arrow--long" src="${esc(arrows.long)}" alt="" width="832" height="12" loading="lazy">
            <img class="fc-model-compression__arrow fc-model-compression__arrow--short-top" src="${esc(arrows.short)}" alt="" width="79" height="12" loading="lazy">
            <img class="fc-model-compression__arrow fc-model-compression__arrow--short-mid" src="${esc(arrows.short)}" alt="" width="79" height="12" loading="lazy">
            <img class="fc-model-compression__arrow fc-model-compression__arrow--vertical" src="${esc(arrows.vertical)}" alt="" width="79" height="230" loading="lazy">
            <img class="fc-model-compression__arrow fc-model-compression__arrow--curve" src="${esc(arrows.curve)}" alt="" width="160" height="128" loading="lazy">
          </div>
        </div>
      </div>`;
  }

  function renderModelPerformanceFinalSection(section, lang) {
    if (!section) return "";
    const shot = section.screenshot;
    const alt = esc(shot.alt || t(section.title, lang));
    return `
      <div class="fc-model-design__block fc-model-design__block--last fc-model-design__block--perf-final">
        <h3 class="fc-model-design__heading-md fc-model-perf-final__title">${esc(t(section.title, lang))}</h3>
        <div class="fc-model-perf-final__frame">
          <figure class="fc-model-perf-final__screen">
            <object class="fc-model-perf-final__screen__svg" data="${esc(shot.svg || shot.src)}" type="image/svg+xml" aria-label="${alt}">
              <img src="${esc(shot.src)}" alt="${alt}" width="${shot.width}" height="${shot.height}" loading="lazy">
            </object>
          </figure>
        </div>
      </div>`;
  }

  function renderModelOverviewWireframe() {
    const bar = (w, tone) =>
      `<span class="fc-model-overview-wf__bar fc-model-overview-wf__bar--${tone}" style="width:calc(${w} * var(--u))"></span>`;
    const pair = (shortW, longW) =>
      `<div class="fc-model-overview-wf__pair">${bar(shortW, "mid")}${bar(longW, "light")}</div>`;
    const detailRows = Array.from({ length: 5 }, () => pair(78, 116)).join("");
    const treeBar = (w, tone, indent) =>
      `<span class="fc-model-overview-wf__bar fc-model-overview-wf__bar--${tone} fc-model-overview-wf__bar--tree-${indent}" style="width:calc(${w} * var(--u))"></span>`;
    const treeRows = `
      <div class="fc-model-overview-wf__tree">
        ${treeBar(77, "mid", 0)}
        ${treeBar(105, "light", 1)}
        ${treeBar(77, "mid", 1)}
        ${treeBar(105, "light", 2)}
        ${treeBar(105, "light", 2)}
        ${treeBar(105, "light", 2)}
        ${treeBar(77, "mid", 3)}
        ${treeBar(105, "light", 3)}
      </div>`;

    return `
      <div class="fc-model-overview-wf" aria-hidden="true">
        <p class="fc-model-overview-wf__tab-label">Overview tab</p>
        <div class="fc-model-overview-wf__layout">
          <div class="fc-model-overview-wf__col fc-model-overview-wf__col--main">
            <div class="fc-model-overview-wf__card fc-model-overview-wf__card--desc">
              <p class="fc-model-overview-wf__card-title">Model description</p>
              ${bar(391, "light")}
              ${bar(155, "light")}
            </div>
            <div class="fc-model-overview-wf__card fc-model-overview-wf__card--model">
              <p class="fc-model-overview-wf__card-title">Model card</p>
              ${pair(41, 280)}
              ${pair(41, 280)}
              ${pair(41, 280)}
              ${bar(41, "mid")}
              <div class="fc-model-overview-wf__image-ph">
                <span class="fc-model-overview-wf__ph-corner fc-model-overview-wf__ph-corner--tl"></span>
                <span class="fc-model-overview-wf__ph-corner fc-model-overview-wf__ph-corner--tr"></span>
                <span class="fc-model-overview-wf__ph-corner fc-model-overview-wf__ph-corner--bl"></span>
                <span class="fc-model-overview-wf__ph-corner fc-model-overview-wf__ph-corner--br"></span>
                <svg class="fc-model-overview-wf__ph-icon" width="55" height="32" viewBox="0 0 55 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M6 26H49V8.5L38 18.5L28 11L6 26Z" fill="#959595"/>
                  <circle cx="17" cy="12" r="3.5" fill="#959595"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="fc-model-overview-wf__col fc-model-overview-wf__col--side">
            <div class="fc-model-overview-wf__card fc-model-overview-wf__card--details">
              <p class="fc-model-overview-wf__card-title">Model details</p>
              ${detailRows}
            </div>
            <div class="fc-model-overview-wf__card fc-model-overview-wf__card--hwp">
              <p class="fc-model-overview-wf__card-title">Recommended HWP</p>
              <div class="fc-model-overview-wf__hwp-row">
                <span class="fc-model-overview-wf__dot"></span>
                ${bar(77, "mid")}
              </div>
              ${bar(116, "light")}
              ${bar(199, "light")}
            </div>
            <div class="fc-model-overview-wf__card fc-model-overview-wf__card--tree">
              <p class="fc-model-overview-wf__card-title">Model tree</p>
              ${treeRows}
            </div>
          </div>
        </div>
      </div>`;
  }

  function renderModelChallengeSolution(section, lang) {
    if (!section) return "";
    const panels = (section.panels || [])
      .map((panel) => {
        const visual = panel.tableMap || panel.chart;
        const visualHtml = visual
          ? `<figure class="fc-model-challenge__visual">
              ${renderHeaderIaImg(visual, visual.alt || "")}
            </figure>`
          : "";
        const panelClass = panel.reverse
          ? " fc-model-challenge__panel--order"
          : " fc-model-challenge__panel--grouping";
        const copy = `
          <div class="fc-model-challenge__copy">
            <div class="fc-model-challenge__block">
              <span class="fc-model-challenge__tag fc-model-challenge__tag--challenge">Challenge</span>
              <p class="fc-model-challenge__question">${esc(t(panel.challenge, lang))}</p>
            </div>
            <div class="fc-model-challenge__block">
              <span class="fc-model-challenge__tag fc-model-challenge__tag--solution">Solution</span>
              <div class="fc-model-challenge__answer">${htmlOrEsc({ html: panel.solution.html }, lang)}</div>
            </div>
          </div>`;
        return `
          <div class="fc-model-challenge__panel${panelClass}${panel.reverse ? " fc-model-challenge__panel--reverse" : ""}">
            ${panel.reverse ? `${copy}${visualHtml}` : `${visualHtml}${copy}`}
          </div>`;
      })
      .join("");
    return `
      <div class="fc-model-design__block fc-model-design__block--challenge">
        <div class="fc-model-challenge">
          <div class="fc-model-challenge__badge">
            <span class="fc-model-challenge__badge-icon" aria-hidden="true">
              <img src="${esc(section.badgeIcon)}" alt="" width="24" height="24" loading="lazy">
            </span>
            <span class="fc-model-challenge__badge-text">${esc(t(section.badge, lang))}</span>
          </div>
          <div class="fc-model-challenge__panels">${panels}</div>
        </div>
      </div>`;
  }

  function renderModelDesignOverview(section, lang) {
    if (!section) return "";
    return `
      <div class="fc-model-design__block">
        ${renderV3StepTitle(
          "02",
          section.title,
          lang,
          `<h3 class="fc-model-design__heading-lg">${esc(t(section.title, lang))}</h3>`
        )}
        <div class="fc-model-design__split fc-model-design__split--overview">
          <div class="fc-model-design__wireframe fc-model-design__wireframe--overview">
            ${renderModelOverviewWireframe()}
          </div>
          <div class="fc-model-design__split-copy">
            <p class="fc-model-design__lead fc-model-design__lead--overview">${htmlOrEsc({ html: section.intro.html }, lang)}</p>
            <div class="fc-model-design__icon-list fc-model-design__icon-list--overview">${renderModelDesignOverviewIconList(section.items, lang)}</div>
          </div>
        </div>
      </div>`;
  }

  function renderModelDesignDetails(_block, lang) {
    const d = window.MODEL_DETAILS_DATA?.design;
    if (!d) return "";

    const headerIa = renderModelDesignHeaderIa(d.headerIa, lang);

    const overview = renderModelDesignOverview(d.overview, lang);

    const overviewFinal = d.overviewFinal?.image
      ? `
      <div class="fc-model-design__block">
        <h3 class="fc-model-design__heading-md">${esc(t(d.overviewFinal.title, lang))}</h3>
        ${renderFigmaSlice({
          src: d.overviewFinal.image.src,
          width: d.overviewFinal.image.width,
          height: d.overviewFinal.image.height,
          alt: t(d.overviewFinal.title, lang),
          inset: true,
          contentWidth: 1600,
          frameClass: "fc-model-design__slice--overview-final",
        })}
      </div>`
      : "";

    const challengeSolution = renderModelChallengeSolution(d.challengeSolution, lang);

    const performance = renderModelPerformanceSection(d.performance, lang);

    const compression = renderModelCompressionSection(d.compression, lang);

    const benchmark = renderModelBenchmarkHardware(d.benchmark, lang);

    const performanceFinal = renderModelPerformanceFinalSection(d.performanceFinal, lang);

    const lowerBand =
      performance || benchmark || compression || performanceFinal
        ? `<div class="fc-model-design__lower-band">
        ${performance}
        ${benchmark}
        ${compression}
        ${performanceFinal}
      </div>`
        : "";

    return `
      <section class="fc-section fc-model-design">
        <h2 class="fc-section__title">${esc(t(d.title, lang))}</h2>
        ${headerIa}
        ${overview}
        ${challengeSolution}
        ${overviewFinal}
        ${lowerBand}
      </section>`;
  }

  function renderContent(block, lang) {
    const gapClass = block.spacingTop ? ` fc-section__intro--gap-${block.spacingTop}` : "";
    return `
      <div class="fc-section__intro${gapClass}">
        ${block.title ? `<h3 class="fc-section__subtitle">${esc(t(block.title, lang))}</h3>` : ""}
        ${block.body ? `<p class="fc-section__body">${esc(t(block.body, lang))}</p>` : ""}
      </div>`;
  }

  function renderRolesMappingActions(actions, lang) {
    return (actions || [])
      .map((action) => {
        const label = esc(t(action.label, lang));
        const verbs = (action.verbs || [])
          .map((v) => esc(t(v, lang) || v))
          .join(", ");
        const verbsHtml = verbs
          ? `<span class="fc-roles-map__verbs">${verbs}</span>`
          : "";
        return `<div class="fc-roles-map__action"><span class="fc-roles-map__action-label">${label}</span>${verbsHtml}</div>`;
      })
      .join("");
  }

  function renderRolesMappingPriority(priority) {
    if (priority === "high") {
      return '<span class="fc-priority fc-priority--high">High</span>';
    }
    if (priority === "low") {
      return '<span class="fc-priority fc-priority--low">Low</span>';
    }
    return "";
  }

  function renderRolesMappingGroup(group, lang) {
    const rows = group.rows || [];
    return rows
      .map((row, index) => {
        const shade = row.shade ? " fc-roles-map__row--shade" : "";
        const roleCell =
          index === 0
            ? `<td class="fc-roles-map__role" rowspan="${rows.length}">
            <p class="fc-roles-map__role-name">${esc(t(group.role.name, lang))}</p>
            <p class="fc-roles-map__role-summary">${esc(t(group.role.summary, lang))}</p>
          </td>`
            : "";
        const desc =
          row.descriptionHtml?.[lang] ||
          row.descriptionHtml?.en ||
          esc(t(row.description, lang));
        return `<tr class="fc-roles-map__row${shade}">
          ${roleCell}
          <td class="fc-roles-map__cell fc-roles-map__cell--actions">
            <div class="fc-roles-map__actions">${renderRolesMappingActions(row.actions, lang)}</div>
          </td>
          <td class="fc-roles-map__cell">${esc(t(row.resources, lang))}</td>
          <td class="fc-roles-map__cell fc-roles-map__cell--desc">${desc}</td>
          <td class="fc-roles-map__cell fc-roles-map__cell--priority">${renderRolesMappingPriority(row.priority)}</td>
        </tr>`;
      })
      .join("");
  }

  function renderRoleRevealProsCons(items, lang) {
    if (!items?.length) return "";
    return `<ul class="fc-role-reveal__list">${items
      .map((item) => `<li>${esc(t(item, lang))}</li>`)
      .join("")}</ul>`;
  }

  function renderRoleRevealConcept(concept, lang) {
    const prosLabel = lang === "zh" ? "优点：" : "Pros: ";
    const consLabel = lang === "zh" ? "缺点：" : "Cons:";
    return `
      <article class="fc-role-reveal__concept">
        <div class="fc-role-reveal__concept-text">
          <div class="fc-role-reveal__concept-head">
            <img class="fc-role-reveal__concept-icon" src="${esc(concept.icon)}" alt="" width="32" height="32" loading="lazy">
            <h4 class="fc-role-reveal__concept-title">${esc(t(concept.title, lang))}</h4>
            <p class="fc-role-reveal__concept-desc">${esc(t(concept.description, lang))}</p>
          </div>
          <div class="fc-role-reveal__proscons">
            <p class="fc-role-reveal__proscons-label">${esc(prosLabel)}</p>
            ${renderRoleRevealProsCons(concept.pros, lang)}
            <p class="fc-role-reveal__proscons-label">${esc(consLabel)}</p>
            ${renderRoleRevealProsCons(concept.cons, lang)}
          </div>
        </div>
        <figure class="fc-role-reveal__concept-media">
          <img src="${esc(concept.image)}" alt="${esc(t(concept.imageAlt, lang))}" loading="lazy" width="840" height="400">
        </figure>
      </article>`;
  }

  function renderRoleReveal(block, lang) {
    const gapClass = block.spacingTop ? ` fc-role-reveal--gap-${block.spacingTop}` : "";
    const fd = block.finalDecision || {};
    const checkIcon = "assets/cases/openshift-ai/rbac/reveal/icon-check.svg";
    const reasonCols = (fd.reasons || [])
      .map(
        (reason) => `
        <div class="fc-role-reveal__decision-col fc-role-reveal__decision-col--item">
          <span class="fc-role-reveal__decision-icon" aria-hidden="true">
            <img src="${esc(checkIcon)}" alt="" width="18" height="18">
          </span>
          <p class="fc-role-reveal__decision-text">${esc(t(reason, lang))}</p>
        </div>`
      )
      .join("");

    return `
      <div class="fc-role-reveal${gapClass}">
        <header class="fc-role-reveal__explore">
          <div class="fc-role-reveal__intro">
            <h3 class="fc-section__subtitle">${esc(t(block.title, lang))}</h3>
            <p class="fc-section__body">${esc(t(block.intro, lang))}</p>
          </div>
          <div class="fc-role-reveal__concepts">
            ${(block.concepts || []).map((c) => renderRoleRevealConcept(c, lang)).join("")}
          </div>
        </header>
        <section class="fc-role-reveal__decision" aria-labelledby="fc-role-reveal-decision">
          <h4 class="fc-role-reveal__decision-title" id="fc-role-reveal-decision">${esc(t(fd.title, lang))}</h4>
          <div class="fc-role-reveal__decision-grid">
            <div class="fc-role-reveal__decision-col fc-role-reveal__decision-col--lead">
              <p class="fc-role-reveal__decision-text">${htmlOrEsc({ html: fd.leadHtml }, lang)}</p>
            </div>
            ${reasonCols}
          </div>
          ${
            fd.diagram
              ? `<figure class="fc-role-reveal__flow">
            <img src="${esc(fd.diagram)}" alt="${esc(t(fd.diagramAlt, lang))}" loading="lazy" width="1600" height="709">
          </figure>`
              : ""
          }
        </section>
        <section class="fc-role-reveal__hifi" aria-labelledby="fc-role-reveal-hifi">
          <h4 class="fc-role-reveal__section-label" id="fc-role-reveal-hifi">${esc(t(block.hifi?.title, lang))}</h4>
          <figure class="fc-role-reveal__hifi-figure">
            <img src="${esc(block.hifi?.image)}" alt="${esc(t(block.hifi?.imageAlt, lang))}" loading="lazy" width="1600" height="709">
          </figure>
        </section>
      </div>`;
  }

  function renderRbacAssignText(item, lang) {
    if (item?.html) return htmlOrEsc({ html: item.html }, lang);
    return esc(t(item, lang));
  }

  function renderRbacAssignAnnotation(item, lang, assets, index) {
    const marker =
      index != null
        ? `<span class="fc-rbac-assign__note-num" aria-hidden="true">${index}</span>`
        : `<img class="fc-rbac-assign__note-icon" src="${esc(assets.annotationOval)}" alt="" width="30" height="27" loading="lazy">`;
    return `
      <li class="fc-rbac-assign__note">
        ${marker}
        <p class="fc-rbac-assign__note-text">${renderRbacAssignText(item, lang)}</p>
      </li>`;
  }

  function renderRbacAssignRow(kind, title, lang) {
    const tag =
      kind === "challenge"
        ? "fc-rbac-assign__tag--challenge"
        : "fc-rbac-assign__tag--solution";
    const label = kind === "challenge" ? "Challenge" : "Solution";
    return `
      <div class="fc-rbac-assign__row">
        <span class="fc-rbac-assign__tag ${tag}">${label}</span>
        <h4 class="fc-rbac-assign__row-title">${esc(t(title, lang))}</h4>
      </div>`;
  }

  function renderRbacAssignStatusLegend(ch, lang) {
    const items = (ch.statusLegend || [])
      .map((row) => {
        const foot = row.footnote
          ? `<p class="fc-rbac-assign__status-foot">${esc(t(row.footnote, lang))}</p>`
          : "";
        const itemClass =
          row.variant === "unassigning-custom"
            ? " fc-rbac-assign__status-item--custom"
            : "";
        return `
          <li class="fc-rbac-assign__status-item${itemClass}">
            <div class="fc-rbac-assign__status-pill-col">
              <span class="fc-rbac-assign__status-pill fc-rbac-assign__status-pill--${esc(row.variant)}">${esc(t(row.label, lang))}</span>
              ${foot}
            </div>
            <p class="fc-rbac-assign__status-desc">${renderRbacAssignText(row.text, lang)}</p>
          </li>`;
      })
      .join("");
    return `
      <h5 class="fc-rbac-assign__status-heading">Assignment status</h5>
      <ul class="fc-rbac-assign__status-list">${items}</ul>`;
  }

  function renderRbacAssignVisual(ch, lang, assets) {
    switch (ch.visual) {
      case "typeahead":
        return "";
      case "roleTable":
        return "";
      case "assignmentStatus":
        return "";
      case "saveConfirm":
        return "";
      default:
        return "";
    }
  }

  function renderRbacAssignChallenge(ch, lang, assets) {
    const painBody = ch.painHtml
      ? `<p class="fc-rbac-assign__desc">${htmlOrEsc({ html: ch.painHtml }, lang)}</p>`
      : ch.painBody
        ? `<p class="fc-rbac-assign__desc">${esc(t(ch.painBody, lang))}</p>`
        : "";
    const solutionDescExtra = ch.solutionDescNarrow ? " fc-rbac-assign__desc--solution-narrow" : "";
    const solutionBody = ch.solutionHtml
      ? `<p class="fc-rbac-assign__desc fc-rbac-assign__desc--solution${solutionDescExtra}">${htmlOrEsc({ html: ch.solutionHtml }, lang)}</p>`
      : ch.solutionBody
        ? `<p class="fc-rbac-assign__desc fc-rbac-assign__desc--solution${solutionDescExtra}">${esc(t(ch.solutionBody, lang))}</p>`
        : "";

    if (ch.visual === "typeaheadV2") {
      return `
      <article class="fc-rbac-assign__challenge fc-rbac-assign__challenge--typeahead-v2">
        <div class="fc-rbac-assign__c1-stage">
          <div class="fc-rbac-assign__c1-grid">
            <div class="fc-rbac-assign__c1-band-label">
              <img src="${esc(assets.challengeIcon)}" alt="" width="16" height="16" loading="lazy">
              <span>Challenge and solution</span>
            </div>
            <div class="fc-rbac-assign__c1-left">
              <div class="fc-rbac-assign__c1-challenge">
                ${renderRbacAssignRow("challenge", ch.painTitle, lang)}
                ${painBody}
              </div>
              <div class="fc-rbac-assign__c1-solution">
                ${renderRbacAssignRow("solution", ch.solutionTitle, lang)}
                ${solutionBody}
                <p class="fc-rbac-assign__pf-ref">
                  <span>PF pattern reference:</span>
                  <a href="${esc(ch.pfLink)}" target="_blank" rel="noopener noreferrer">Typeahead</a>
                </p>
              </div>
            </div>
            <figure class="fc-rbac-assign__c1-mock fc-rbac-assign__c1-mock--v2">
              <div class="fc-rbac-assign__c1-card fc-rbac-assign__c1-card--back">
                <div class="fc-rbac-assign__crop fc-rbac-assign__crop--typeahead-default">
                  <img src="${esc(assets.typeaheadV2Default)}" alt="" loading="lazy" width="776" height="433">
                </div>
              </div>
              <div class="fc-rbac-assign__c1-card fc-rbac-assign__c1-card--front">
                <div class="fc-rbac-assign__crop fc-rbac-assign__crop--typeahead-active">
                  <img src="${esc(assets.typeaheadV2Active)}" alt="" loading="lazy" width="776" height="353">
                </div>
              </div>
            </figure>
          </div>
        </div>
      </article>`;
    }

    if (ch.visual === "typeahead") {
      const notes = (ch.annotations || [])
        .map((a, i) => renderRbacAssignAnnotation(a, lang, assets, i + 1))
        .join("");
      return `
      <article class="fc-rbac-assign__challenge fc-rbac-assign__challenge--typeahead">
        <div class="fc-rbac-assign__band-label">
          <img src="${esc(assets.challengeIcon)}" alt="" width="16" height="16" loading="lazy">
          <span>Challenge and solution</span>
        </div>
        ${renderRbacAssignRow("challenge", ch.painTitle, lang)}
        ${painBody}
        <div class="fc-rbac-assign__c1-stage">
          <div class="fc-rbac-assign__c1-grid">
            <div class="fc-rbac-assign__c1-copy">
              ${renderRbacAssignRow("solution", ch.solutionTitle, lang)}
              ${solutionBody}
            </div>
            <figure class="fc-rbac-assign__c1-mock">
              <img src="${esc(assets.typeaheadComposite)}" alt="" loading="lazy" width="864" height="844">
            </figure>
            <div class="fc-rbac-assign__c1-foot">
              <ul class="fc-rbac-assign__notes">${notes}</ul>
              <p class="fc-rbac-assign__pf-ref">
                <span>PF pattern reference:</span>
                <a href="${esc(ch.pfLink)}" target="_blank" rel="noopener noreferrer">Typeahead</a>
              </p>
            </div>
          </div>
        </div>
      </article>`;
    }

    if (ch.visual === "roleTableV2") {
      const annotationItems = (ch.annotations || [])
        .map(
          (a, index) => `
        <li class="fc-rbac-assign__c2-anno-item${index > 0 ? " fc-rbac-assign__c2-anno-item--divided" : ""}">
          ${renderRbacAssignText(a, lang)}
        </li>`
        )
        .join("");
      return `
      <article class="fc-rbac-assign__challenge fc-rbac-assign__challenge--role-table-v2">
        <div class="fc-rbac-assign__c2-stage">
          <div class="fc-rbac-assign__c2-grid">
            <div class="fc-rbac-assign__c2-band-label">
              <img src="${esc(assets.challengeIcon)}" alt="" width="16" height="16" loading="lazy">
              <span>Challenge and solution</span>
            </div>
            <div class="fc-rbac-assign__c2-left">
              <div class="fc-rbac-assign__c2-challenge">
                ${renderRbacAssignRow("challenge", ch.painTitle, lang)}
              </div>
              <div class="fc-rbac-assign__c2-solution">
                ${renderRbacAssignRow("solution", ch.solutionTitle, lang)}
              </div>
            </div>
            <div class="fc-rbac-assign__c2-explorations-v2" aria-hidden="true">
              <div class="fc-rbac-assign__crop fc-rbac-assign__crop--explorations-card">
                <img class="fc-rbac-assign__c2-explorations-card" src="${esc(assets.explorationsV2Card)}" alt="" loading="lazy" width="653" height="545">
              </div>
              <div class="fc-rbac-assign__crop fc-rbac-assign__crop--explorations-bg">
                <img class="fc-rbac-assign__c2-explorations-bg" src="${esc(assets.explorationsV2Bg)}" alt="" loading="lazy" width="1600" height="389">
              </div>
              <div class="fc-rbac-assign__c2-explorations-dim"></div>
              <span class="fc-rbac-assign__c2-explorations-label">Explorations</span>
            </div>
            <figure class="fc-rbac-assign__c2-mock fc-rbac-assign__c2-mock--v2">
              <img src="${esc(assets.roleTableV2Mock)}" alt="" loading="lazy" width="857" height="808">
              <div class="fc-rbac-assign__c2-anno-bar">
                <div class="fc-rbac-assign__c2-anno-glass" aria-hidden="true"></div>
                <ol class="fc-rbac-assign__c2-anno-list">${annotationItems}</ol>
              </div>
            </figure>
          </div>
        </div>
      </article>`;
    }

    if (ch.visual === "roleTable") {
      const notes = (ch.annotations || [])
        .map((a, i) => renderRbacAssignAnnotation(a, lang, assets, i + 1))
        .join("");
      return `
      <article class="fc-rbac-assign__challenge fc-rbac-assign__challenge--role-table">
        <div class="fc-rbac-assign__band-label">
          <img src="${esc(assets.challengeIcon)}" alt="" width="16" height="16" loading="lazy">
          <span>Challenge and solution</span>
        </div>
        ${renderRbacAssignRow("challenge", ch.painTitle, lang)}
        ${painBody}
        ${renderRbacAssignRow("solution", ch.solutionTitle, lang)}
        ${solutionBody}
        <div class="fc-rbac-assign__c2-stage">
          <div class="fc-rbac-assign__c2-grid">
            <div class="fc-rbac-assign__c2-foot">
              <ul class="fc-rbac-assign__notes">${notes}</ul>
            </div>
            <figure class="fc-rbac-assign__c2-mock">
              <img src="${esc(assets.roleTableCard)}" alt="" loading="lazy" width="857" height="808">
            </figure>
            <div class="fc-rbac-assign__c2-explorations" aria-hidden="true">
              <img src="${esc(assets.explorationsLayer)}" alt="" loading="lazy" width="1600" height="546">
            </div>
          </div>
        </div>
      </article>`;
    }

    if (ch.visual === "assignmentStatusV2") {
      return `
      <article class="fc-rbac-assign__challenge fc-rbac-assign__challenge--status-v2">
        <div class="fc-rbac-assign__c3-stage fc-rbac-assign__c3-stage--v2">
          <div class="fc-rbac-assign__c3-grid fc-rbac-assign__c3-grid--v2">
            <div class="fc-rbac-assign__c3-band-label">
              <img src="${esc(assets.challengeIcon)}" alt="" width="16" height="16" loading="lazy">
              <span>Challenge and solution</span>
            </div>
            <div class="fc-rbac-assign__c3-left">
              <div class="fc-rbac-assign__c3-challenge">
                ${renderRbacAssignRow("challenge", ch.painTitle, lang)}
              </div>
              <div class="fc-rbac-assign__c3-solution">
                ${renderRbacAssignRow("solution", ch.solutionTitle, lang)}
              </div>
            </div>
            <figure class="fc-rbac-assign__c3-mock-v2">
              <div class="fc-rbac-assign__crop fc-rbac-assign__crop--c3-ui">
                <img
                  class="fc-rbac-assign__c3-mock-v2__img"
                  src="${esc(assets.assignmentStatusV2Ui)}"
                  alt=""
                  loading="lazy"
                  width="776"
                  height="661">
              </div>
            </figure>
            <div class="fc-rbac-assign__c3-legend-v2">
              ${renderRbacAssignStatusLegend(ch, lang)}
            </div>
          </div>
        </div>
      </article>`;
    }

    if (ch.visual === "assignmentStatus") {
      return `
      <article class="fc-rbac-assign__challenge fc-rbac-assign__challenge--status">
        <div class="fc-rbac-assign__band-label">
          <img src="${esc(assets.challengeIcon)}" alt="" width="16" height="16" loading="lazy">
          <span>Challenge and solution</span>
        </div>
        ${renderRbacAssignRow("challenge", ch.painTitle, lang)}
        ${painBody}
        <div class="fc-rbac-assign__c3-stage">
          <div class="fc-rbac-assign__c3-grid">
            <div class="fc-rbac-assign__c3-copy">
              ${renderRbacAssignRow("solution", ch.solutionTitle, lang)}
              ${solutionBody}
              <div class="fc-rbac-assign__c3-legend">
                ${renderRbacAssignStatusLegend(ch, lang)}
              </div>
            </div>
            <figure class="fc-rbac-assign__c3-mock">
              <img
                class="fc-rbac-assign__c3-mock-img"
                src="${esc(assets.assignmentStatusUi)}"
                alt=""
                loading="lazy"
                width="776"
                height="661">
            </figure>
          </div>
        </div>
      </article>`;
    }

    if (ch.visual === "saveConfirmV2") {
      const solutionBodyC4 = ch.solutionHtml
        ? `<p class="fc-rbac-assign__desc fc-rbac-assign__desc--solution">${htmlOrEsc({ html: ch.solutionHtml }, lang)}</p>`
        : ch.solutionBody
          ? `<p class="fc-rbac-assign__desc fc-rbac-assign__desc--solution">${esc(t(ch.solutionBody, lang))}</p>`
          : "";
      return `
      <article class="fc-rbac-assign__challenge fc-rbac-assign__challenge--save-v2">
        <div class="fc-rbac-assign__c4-stage fc-rbac-assign__c4-stage--v2">
          <div class="fc-rbac-assign__c4-grid fc-rbac-assign__c4-grid--v2">
            <div class="fc-rbac-assign__c4-band-label">
              <img src="${esc(assets.challengeIcon)}" alt="" width="16" height="16" loading="lazy">
              <span>Challenge and solution</span>
            </div>
            <div class="fc-rbac-assign__c4-left">
              <div class="fc-rbac-assign__c4-challenge">
                ${renderRbacAssignRow("challenge", ch.painTitle, lang)}
              </div>
              <div class="fc-rbac-assign__c4-solution">
                ${renderRbacAssignRow("solution", ch.solutionTitle, lang)}
                ${solutionBodyC4}
              </div>
            </div>
            <figure class="fc-rbac-assign__c4-mock-v2">
              <div class="fc-rbac-assign__c4-composite-v2">
                <img
                  class="fc-rbac-assign__c4-composite-v2__bg"
                  src="${esc(assets.saveDialogV2Bg)}"
                  alt=""
                  loading="lazy"
                  width="888"
                  height="627">
                <img
                  class="fc-rbac-assign__c4-composite-v2__modal"
                  src="${esc(assets.saveDialogV2Modal)}"
                  alt=""
                  loading="lazy"
                  width="488"
                  height="565">
                <img
                  class="fc-rbac-assign__c4-composite-v2__arrow"
                  src="${esc(assets.saveDialogV2Arrow)}"
                  alt=""
                  loading="lazy"
                  width="279"
                  height="515">
              </div>
            </figure>
          </div>
        </div>
      </article>`;
    }

    if (ch.visual === "saveConfirm") {
      const solutionBodyC4 = ch.solutionHtml
        ? `<p class="fc-rbac-assign__desc fc-rbac-assign__desc--solution fc-rbac-assign__desc--solution-c4">${htmlOrEsc({ html: ch.solutionHtml }, lang)}</p>`
        : ch.solutionBody
          ? `<p class="fc-rbac-assign__desc fc-rbac-assign__desc--solution fc-rbac-assign__desc--solution-c4">${esc(t(ch.solutionBody, lang))}</p>`
          : "";
      return `
      <article class="fc-rbac-assign__challenge fc-rbac-assign__challenge--save">
        <div class="fc-rbac-assign__band-label">
          <img src="${esc(assets.challengeIcon)}" alt="" width="16" height="16" loading="lazy">
          <span>Challenge and solution</span>
        </div>
        ${renderRbacAssignRow("challenge", ch.painTitle, lang)}
        ${painBody}
        <div class="fc-rbac-assign__c4-stage">
          <div class="fc-rbac-assign__c4-grid">
            <div class="fc-rbac-assign__c4-copy">
              ${renderRbacAssignRow("solution", ch.solutionTitle, lang)}
              ${solutionBodyC4}
            </div>
            <figure class="fc-rbac-assign__c4-mock">
              <div class="fc-rbac-assign__c4-composite">
                <img
                  class="fc-rbac-assign__c4-bg"
                  src="${esc(assets.saveDialogBg)}"
                  alt=""
                  loading="lazy"
                  width="888"
                  height="627">
                <img
                  class="fc-rbac-assign__c4-modal"
                  src="${esc(assets.saveDialogModal)}"
                  alt=""
                  loading="lazy"
                  width="488"
                  height="565">
                <img
                  class="fc-rbac-assign__c4-arrow"
                  src="${esc(assets.saveDialogArrow)}"
                  alt=""
                  loading="lazy"
                  width="279"
                  height="515">
              </div>
            </figure>
          </div>
        </div>
      </article>`;
    }

    return `
      <article class="fc-rbac-assign__challenge">
        <div class="fc-rbac-assign__band-label">
          <img src="${esc(assets.challengeIcon)}" alt="" width="16" height="16" loading="lazy">
          <span>Challenge and solution</span>
        </div>
        ${renderRbacAssignRow("challenge", ch.painTitle, lang)}
        ${painBody}
        ${renderRbacAssignRow("solution", ch.solutionTitle, lang)}
        ${solutionBody}
        ${renderRbacAssignVisual(ch, lang, assets)}
      </article>`;
  }

  function renderRoleAssignment(block, lang) {
    const gapClass = block.spacingTop ? ` fc-rbac-assign--gap-${block.spacingTop}` : "";
    const v3Panel = block.layout === "v3-panel";
    const v3Class = v3Panel ? " fc-rbac-assign--v3" : "";
    const assets = block.assets || {};
    const challenges = (block.challenges || [])
      .map((ch) => renderRbacAssignChallenge(ch, lang, assets))
      .join("");

    if (v3Panel) {
      return `
      <div class="fc-rbac-assign${gapClass}${v3Class}">
        <header class="fc-rbac-assign__intro fc-rbac-assign__intro--v3-title">
          ${window.renderFcDbStepTitleOr?.(
            "03",
            block.title,
            lang,
            `<h3 class="fc-section__subtitle">${esc(t(block.title, lang))}</h3>`
          ) ?? `<h3 class="fc-section__subtitle">${esc(t(block.title, lang))}</h3>`}
        </header>
        <div class="fc-rbac-assign-v3__panel">
          <p class="fc-section__body fc-rbac-assign-v3__intro">${htmlOrEsc({ html: block.introHtml }, lang)}</p>
          ${challenges}
        </div>
      </div>`;
    }

    return `
      <div class="fc-rbac-assign${gapClass}">
        <header class="fc-rbac-assign__intro">
          <h3 class="fc-section__subtitle">${esc(t(block.title, lang))}</h3>
          <p class="fc-section__body">${htmlOrEsc({ html: block.introHtml }, lang)}</p>
        </header>
        ${challenges}
      </div>`;
  }

  function renderRolesMapping(block, lang) {
    const intro =
      block.introHtml?.[lang] ||
      block.introHtml?.en ||
      (block.intro ? `<p class="fc-section__body">${esc(t(block.intro, lang))}</p>` : "");
    const headerHtml = (block.headers || [])
      .map((h) => {
        const sub = h.subtitle
          ? `<span class="fc-roles-map__th-sub">${esc(t(h.subtitle, lang))}</span>`
          : "";
        return `<th><span class="fc-roles-map__th-main">${esc(t(h.title, lang))}</span>${sub}</th>`;
      })
      .join("");
    const bodyRows = (block.groups || []).map((g) => renderRolesMappingGroup(g, lang)).join("");

    return `
      <div class="fc-roles-map">
        ${block.title ? `<h3 class="fc-section__subtitle">${esc(t(block.title, lang))}</h3>` : ""}
        <div class="fc-section__intro">${intro}</div>
        <div class="fc-roles-map__wrap">
          <table class="fc-roles-map__table">
            <thead><tr>${headerHtml}</tr></thead>
            <tbody>${bodyRows}</tbody>
          </table>
        </div>
        ${block.footer ? `<p class="fc-section__body fc-roles-map__footer">${esc(t(block.footer, lang))}</p>` : ""}
      </div>`;
  }

  function renderTable(block, lang) {
    const rows = (block.rows || []).map((row) => {
      const cells = row.cells || row;
      return `<tr>${cells
        .map((cell) => {
          if (cell?.priority) {
            return `<td><span class="fc-priority fc-priority--${cell.priority}">${esc(cell.text)}</span></td>`;
          }
          if (cell?.rowspan) {
            return `<td rowspan="${cell.rowspan}">${htmlOrEsc(cell, lang) || esc(t(cell, lang) || cell)}</td>`;
          }
          return `<td>${htmlOrEsc(cell, lang) || esc(t(cell, lang) || cell)}</td>`;
        })
        .join("")}</tr>`;
    });

    return `
      <div class="fc-table-block">
        ${block.title ? `<h3 class="fc-section__subtitle">${esc(t(block.title, lang))}</h3>` : ""}
        ${block.body ? `<p class="fc-section__body">${esc(t(block.body, lang))}</p>` : ""}
        <div class="fc-table-wrap ${block.variant ? `fc-table-wrap--${block.variant}` : ""}">
          <table class="fc-table ${block.variant ? `fc-table--${block.variant}` : ""}">
            <thead><tr>${(block.headers || []).map((h) => `<th>${esc(t(h, lang))}</th>`).join("")}</tr></thead>
            <tbody>${rows.join("")}</tbody>
          </table>
        </div>
      </div>`;
  }

  function renderVerbTable(block, lang) {
    const visual = block.image
      ? `<figure class="fc-tech-split__figure"><img src="${esc(block.image)}" alt="${esc(t(block.imageAlt, lang))}" loading="lazy"></figure>`
      : renderTable({ headers: block.headers, rows: block.rows, variant: "verb" }, lang);
    return `
      <div class="fc-tech-split">
        <div class="fc-tech-split__text">
          <h3 class="fc-section__subtitle">${esc(t(block.title, lang))}</h3>
          <p class="fc-section__body">${esc(t(block.body, lang))}</p>
        </div>
        ${visual}
      </div>`;
  }

  function renderBindingSplit(block, lang) {
    const visual = block.image
      ? `<figure class="fc-binding-split__figure"><img src="${esc(block.image)}" alt="${esc(t(block.imageAlt, lang))}" loading="lazy"></figure>`
      : `<div class="fc-binding-split__visual">${window.CASE_OPENSHIFT_MOCKUPS?.render(block.visual || "rbac-binding") || ""}</div>`;
    return `
      <div class="fc-binding-split">
        ${visual}
        <div class="fc-binding-split__text">
          <h3 class="fc-section__subtitle">${esc(t(block.title, lang))}</h3>
          ${(block.paragraphs || [])
            .map((p) => `<p class="fc-section__body">${esc(t(p, lang))}</p>`)
            .join("")}
        </div>
      </div>`;
  }

  function renderInsightRow(block, lang) {
    const colCount = block.columns || block.items?.length || 5;
    return `
      <div class="fc-insight-row">
        ${block.title ? `<h3 class="fc-section__subtitle">${esc(t(block.title, lang))}</h3>` : ""}
        <div class="fc-card-grid fc-card-grid--${colCount}">
          ${(block.items || [])
            .map((item) => `<div class="fc-card-grid__cell"><p class="fc-card-grid__text">${esc(t(item, lang))}</p></div>`)
            .join("")}
        </div>
      </div>`;
  }

  function renderColumnBullet(b, lang) {
    if (b.label && b.text) {
      return `<li><span class="fc-list__label">${esc(t(b.label, lang))}:</span> ${esc(t(b.text, lang))}</li>`;
    }
    return `<li>${esc(t(b, lang))}</li>`;
  }

  function renderColumns(block, lang) {
    return `
      <div class="fc-columns">
        ${(block.columns || [])
          .map(
            (col) => `
          <div class="fc-columns__col">
            <h3 class="fc-section__subtitle">${esc(t(col.title, lang))}</h3>
            ${col.intro ? `<p class="fc-section__body">${esc(t(col.intro, lang))}</p>` : ""}
            <ul class="fc-list">
              ${(col.bullets || []).map((b) => renderColumnBullet(b, lang)).join("")}
            </ul>
          </div>`
          )
          .join("")}
      </div>`;
  }

  function renderMetrics(block, lang) {
    const labelHtml = block.labelHtml?.[lang] || block.labelHtml?.en;
    const label = labelHtml
      ? `<p class="fc-section__body fc-metrics__label">${labelHtml}</p>`
      : `<p class="fc-section__body fc-metrics__label">${esc(t(block.label, lang))}</p>`;
    return `
      <div class="fc-metrics">
        ${label}
        <div class="fc-metrics__grid fc-metrics__grid--${block.tone || "mvp"}">
          ${(block.items || [])
            .map(
              (item) => `
            <div class="fc-metrics__item">
              <p class="fc-metrics__num">${esc(item.num)}</p>
              <p class="fc-metrics__text">${esc(t(item.text, lang))}</p>
            </div>`
            )
            .join("")}
        </div>
      </div>`;
  }

  function renderStatsTasks(block, lang) {
    return `
      <div class="fc-exec">
        <div class="fc-exec__left">
          <h3 class="fc-section__subtitle">${esc(t(block.statsTitle, lang))}</h3>
          <p class="fc-section__body">${esc(t(block.statsIntro, lang))}</p>
          <div class="fc-stats">
            ${(block.stats || [])
              .map(
                (s) => `
              <div class="fc-stats__item">
                <p class="fc-stats__num">${esc(s.value)}</p>
                <p class="fc-stats__label">${esc(t(s.label, lang))}</p>
              </div>`
              )
              .join("")}
          </div>
        </div>
        <div class="fc-exec__right">
          <h3 class="fc-section__subtitle">${esc(t(block.tasksTitle, lang))}</h3>
          <ol class="fc-task-list">
            ${(block.tasks || [])
              .map((task) => `<li><span class="fc-task-list__num">${esc(task.num)}</span>${esc(t(task.text, lang))}</li>`)
              .join("")}
          </ol>
        </div>
      </div>`;
  }

  function renderFeedback(block, lang) {
    const featured = block.featured
      ? `
      <div class="fc-feedback-featured">
        <div class="fc-feedback-featured__stat">
          <p class="fc-feedback-featured__num">${esc(block.featured.stat)}</p>
          <p class="fc-feedback-featured__label">${esc(t(block.featured.statLabel, lang))}</p>
        </div>
        <blockquote class="fc-feedback-featured__quote">
          <img class="fc-quote__icon" src="${ICON}quote.svg" alt="" aria-hidden="true">
          <p>${esc(quoteT(block.featured.text, lang))}</p>
          <footer><strong>${esc(t(block.featured.author, lang))}</strong> · ${esc(t(block.featured.role, lang))}</footer>
        </blockquote>
      </div>`
      : "";

    const tone = block.variant === "praise" ? "purple" : "gray";
    return `
      <div class="fc-feedback">
        ${block.title ? `<h3 class="fc-section__subtitle">${esc(t(block.title, lang))}</h3>` : ""}
        ${block.intro ? `<p class="fc-section__body fc-section__intro">${esc(t(block.intro, lang))}</p>` : ""}
        ${featured}
        <div class="fc-feedback__grid fc-feedback__grid--${tone}">
          ${(block.cards || [])
            .map(
              (card) => `
            <blockquote class="fc-feedback__card">
              <p class="fc-feedback__text">${quoteHtmlOrEsc(card, lang)}</p>
              <footer>
                <p class="fc-feedback__author">${esc(t(card.author, lang))}</p>
                <p class="fc-feedback__role">${esc(t(card.role, lang))}</p>
              </footer>
            </blockquote>`
            )
            .join("")}
        </div>
      </div>`;
  }

  function renderRoleCards(block, lang) {
    return `
      <div class="fc-role-cards">
        ${(block.items || [])
          .map(
            (item) => `
          <article class="fc-role-card">
            <h4 class="fc-role-card__title">${esc(t(item.title, lang))}</h4>
            <p class="fc-role-card__desc">${esc(t(item.desc, lang))}</p>
            <ul class="fc-role-card__tags">
              ${(item.tags || []).map((tag) => `<li>${esc(t(tag, lang))}</li>`).join("")}
            </ul>
          </article>`
          )
          .join("")}
      </div>`;
  }

  function renderUiMockup(block, lang) {
    const html = window.CASE_OPENSHIFT_MOCKUPS?.render(block.variant) || "";
    return `
      <div class="fc-ui-block">
        ${block.title ? `<h3 class="fc-section__subtitle">${esc(t(block.title, lang))}</h3>` : ""}
        ${block.body ? `<p class="fc-section__body">${esc(t(block.body, lang))}</p>` : ""}
        ${html}
        ${block.caption ? `<p class="fc-ui-block__caption">${esc(t(block.caption, lang))}</p>` : ""}
      </div>`;
  }

  function renderAssignmentHifi(block, lang) {
    const H = "assets/cases/openshift-ai/rbac/hifi/";
    return `
      <div class="fc-assignment-hifi">
        <div class="fc-assignment-hifi__stage" aria-label="${esc(t(block.title, lang))}">
          <div class="fc-assignment-hifi__backdrop" aria-hidden="true">
            <div class="fc-assignment-hifi__bg-base"></div>
            <div class="fc-assignment-hifi__blob fc-assignment-hifi__blob--a"></div>
            <div class="fc-assignment-hifi__blob fc-assignment-hifi__blob--b"></div>
            <div class="fc-assignment-hifi__blob fc-assignment-hifi__blob--c"></div>
          </div>
          <h3 class="fc-assignment-hifi__title">${esc(t(block.title, lang))}</h3>
          <img
            class="fc-assignment-hifi__ghost fc-assignment-hifi__ghost--upper"
            src="${H}hifi-back-upper.png"
            alt=""
            loading="lazy"
            width="658"
            height="379">
          <img
            class="fc-assignment-hifi__ghost fc-assignment-hifi__ghost--lower"
            src="${H}hifi-back-lower.png"
            alt=""
            loading="lazy"
            width="658"
            height="379">
          <img
            class="fc-assignment-hifi__ghost fc-assignment-hifi__ghost--right"
            src="${H}hifi-back-right.png"
            alt=""
            loading="lazy"
            width="616"
            height="713">
          <figure class="fc-assignment-hifi__hero">
            <img
              src="${H}hifi-hero.png"
              alt=""
              loading="lazy"
              width="1020"
              height="768">
          </figure>
        </div>
      </div>`;
  }

  function renderUsabilityTesting(_block, lang) {
    const d = window.USABILITY_TESTING_DATA || {};
    const assets = d.assets || {};
    const roleItems = (d.myRole?.items || [])
      .map(
        (item) => `
        <div class="fc-usability__role-cell">
          <img class="fc-usability__role-icon" src="${esc(item.icon)}" alt="" width="48" height="48" loading="lazy">
          <p class="fc-usability__role-text">${esc(t(item.text, lang))}</p>
        </div>`
      )
      .join("");
    const execHtml = d.executive
      ? (() => {
          const stats = (d.executive.stats || [])
            .map(
              (s) => `
        <div class="fc-usability__stat">
          <p class="fc-usability__stat-num">${esc(s.value)}</p>
          <p class="fc-usability__stat-label">${esc(t(s.label, lang))}</p>
        </div>`
            )
            .join("");
          const tasks = (d.executive.tasks || [])
            .map(
              (task) => `
        <li class="fc-usability__task">
          <span class="fc-usability__task-num">${esc(task.num)}</span>
          <span class="fc-usability__task-text">${esc(t(task.text, lang))}</span>
        </li>`
            )
            .join("");
          return `
          <div class="fc-usability__exec">
            <div class="fc-usability__exec-left">
              <h3 class="fc-usability__h3">${esc(t(d.executive.title, lang))}</h3>
              <p class="fc-usability__body">${esc(t(d.executive.intro, lang))}</p>
              <div class="fc-usability__stats">${stats}</div>
            </div>
            <div class="fc-usability__exec-right">
              <h3 class="fc-usability__h3">${esc(t(d.executive.tasksTitle, lang))}</h3>
              <ol class="fc-usability__tasks">${tasks}</ol>
            </div>
          </div>`;
        })()
      : "";
    const praiseCards = (d.praise?.cards || [])
      .map(
        (card) => `
        <blockquote class="fc-usability__quote-card fc-usability__quote-card--lavender">
          <p class="fc-usability__quote-text">${quoteHtmlOrEsc(card, lang)}</p>
          <footer class="fc-usability__quote-foot">
            <p class="fc-usability__quote-author">${esc(t(card.author, lang))}</p>
            <p class="fc-usability__quote-role">${esc(t(card.role, lang))}</p>
          </footer>
        </blockquote>`
      )
      .join("");
    const recommendCards = (d.recommend?.cards || [])
      .map(
        (card) => `
        <blockquote class="fc-usability__quote-card fc-usability__quote-card--gray">
          <p class="fc-usability__quote-text">${quoteHtmlOrEsc(card, lang)}</p>
          <footer class="fc-usability__quote-foot">
            <p class="fc-usability__quote-author">${esc(t(card.author, lang))}</p>
            <p class="fc-usability__quote-role">${esc(t(card.role, lang))}</p>
          </footer>
        </blockquote>`
      )
      .join("");
    const f = d.praise?.featured || {};

    return `
      <section class="fc-section fc-usability">
        <h2 class="fc-usability__page-title">${esc(t(d.title, lang))}</h2>
        <div class="fc-usability__stack">
          <div class="fc-usability__intro">
            <div class="fc-usability__intro-col">
              <h3 class="fc-usability__h3">${esc(t(d.background?.title, lang))}</h3>
              <p class="fc-usability__body">${esc(t(d.background?.body, lang))}</p>
            </div>
            <div class="fc-usability__intro-col">
              <h3 class="fc-usability__h3">${esc(t(d.goals?.title, lang))}</h3>
              <p class="fc-usability__body">${esc(t(d.goals?.body, lang))}</p>
            </div>
          </div>
          <div class="fc-usability__my-role">
            <h3 class="fc-usability__h3">${esc(t(d.myRole?.title, lang))}</h3>
            <p class="fc-usability__body fc-usability__body--wide">${esc(t(d.myRole?.body, lang))}</p>
            <div class="fc-usability__role-strip">${roleItems}</div>
          </div>
          ${execHtml}
          <div class="fc-usability__praise">
            <h3 class="fc-usability__h3">${esc(t(d.praise?.title, lang))}</h3>
            <p class="fc-usability__body fc-usability__body--wide">${esc(t(d.praise?.intro, lang))}</p>
            <div class="fc-usability__featured">
              <div class="fc-usability__featured-photo">
                <img src="${esc(f.photo)}" alt="" loading="lazy" width="336" height="260">
                <div class="fc-usability__featured-stat">
                  <p class="fc-usability__featured-num">${esc(f.stat)}</p>
                  <p class="fc-usability__featured-label">${esc(t(f.statLabel, lang))}</p>
                </div>
              </div>
              <div class="fc-usability__featured-quote">
                <img class="fc-usability__quote-icon" src="${esc(assets.quoteIcon)}" alt="" width="32" height="27" loading="lazy">
                <p class="fc-usability__featured-text">${esc(quoteT(f.text, lang))}</p>
                <p class="fc-usability__featured-attr">
                  <span class="fc-usability__featured-dash">-- </span>
                  <strong>${esc(t(f.author, lang))}</strong>
                  <span> (${esc(t(f.role, lang))})</span>
                </p>
              </div>
            </div>
            <div class="fc-usability__quote-grid fc-usability__quote-grid--4">${praiseCards}</div>
          </div>
          <div class="fc-usability__recommend">
            <h3 class="fc-usability__h3">${esc(t(d.recommend?.title, lang))}</h3>
            <div class="fc-usability__quote-grid fc-usability__quote-grid--5">${recommendCards}</div>
          </div>
          <div class="fc-usability__next">
            <h3 class="fc-usability__h3">${esc(t(d.nextStep?.title, lang))}</h3>
            <p class="fc-usability__body fc-usability__body--wide">${esc(t(d.nextStep?.body, lang))}</p>
          </div>
        </div>
      </section>`;
  }

  function renderIssues(block, lang) {
    return `
      <div class="fc-issues">
        ${block.body ? `<p class="fc-section__body fc-section__intro">${esc(t(block.body, lang))}</p>` : ""}
        <div class="fc-issues__grid">
          ${(block.items || [])
            .map(
              (item) => `
            <article class="fc-issue-card">
              <h4 class="fc-issue-card__title">${esc(t(item.title, lang))}</h4>
              <p class="fc-issue-card__text">${esc(t(item.text, lang))}</p>
            </article>`
            )
            .join("")}
        </div>
      </div>`;
  }

  function renderTags(block, lang) {
    const tags = block.items?.[lang] || block.items?.en || [];
    return `<div class="fc-tags">${tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>`;
  }

  function renderPainSolution(block, lang) {
    const visual = block.figure
      ? renderFigure({ ...block.figure, variant: "hifi" }, lang)
      : block.mockup
        ? `<div class="fc-ps__mock">${window.CASE_OPENSHIFT_MOCKUPS?.render(block.mockup) || ""}</div>`
        : "";
    const showText = block.pain && block.solution && !block.figureOnly;
    return `
      <div class="fc-ps${block.figureOnly ? " fc-ps--figure-only" : ""}${block.bleed ? " fc-ps--bleed" : ""}">
        ${block.step ? `<p class="fc-ps__step">${esc(t(block.step, lang))}</p>` : ""}
        ${showText ? `
        <div class="fc-ps__grid">
          <div class="fc-ps__col">
            <span class="fc-ps__badge fc-ps__badge--pain">${esc(t(block.pain.badge, lang))}</span>
            <h4 class="fc-ps__title">${esc(t(block.pain.title, lang))}</h4>
            <p class="fc-ps__body">${esc(t(block.pain.body, lang))}</p>
          </div>
          <div class="fc-ps__col">
            <span class="fc-ps__badge fc-ps__badge--solution">${esc(t(block.solution.badge, lang))}</span>
            <h4 class="fc-ps__title">${esc(t(block.solution.title, lang))}</h4>
            <p class="fc-ps__body">${esc(t(block.solution.body, lang))}</p>
          </div>
        </div>` : ""}
        ${visual}
      </div>`;
  }

  function renderEventProps(props) {
    return (props || [])
      .map(
        (p) =>
          `<p class="fc-event-table__prop"><span class="fc-event-table__prop-key">${esc(p.key)}</span>${esc(p.value ? ` ${p.value}` : "")}</p>`
      )
      .join("");
  }

  function renderEventTracking(block, lang) {
    const rows = [];
    (block.groups || []).forEach((group) => {
      rows.push(`
        <tr class="fc-event-table__section">
          <td colspan="6">${esc(t(group.section, lang))}</td>
        </tr>`);
      (group.rows || []).forEach((row) => {
        rows.push(`
          <tr>
            <td class="fc-event-table__q">${esc(t(row.question, lang))}</td>
            <td>${esc(t(row.kpi, lang))}</td>
            <td class="fc-event-table__event">
              <p class="fc-event-table__event-name">${esc(row.eventName)}</p>
              <p class="fc-event-table__event-desc">${esc(t(row.eventDesc, lang))}</p>
            </td>
            <td class="fc-event-table__props">${renderEventProps(row.properties)}</td>
            <td>${esc(t(row.screen, lang))}</td>
            <td><span class="fc-priority fc-priority--${row.priority}">${esc(row.priority === "high" ? "High" : row.priority === "medium" ? "Medium" : "Low")}</span></td>
          </tr>`);
      });
    });
    if (block.showMoreRow) {
      rows.push(`
        <tr class="fc-event-table__more">
          <td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td><span class="fc-priority">Priority</span></td>
        </tr>`);
    }

    const processItems = (block.process || [])
      .map(
        (item) => `
        <li class="fc-event-process__item">
          <img src="${ICON}${item.icon}" alt="" width="32" height="32" aria-hidden="true">
          <span>${esc(t(item.text, lang))}</span>
        </li>`
      )
      .join("");

    const heartBody = block.heartBodyHtml?.[lang] || block.heartBodyHtml?.en || esc(t(block.heartBody, lang));

    return `
      <section class="fc-section fc-section--event">
        <h2 class="fc-section__title">${esc(t(block.title, lang))}</h2>
        <div class="fc-event-intro">
          <div class="fc-event-intro__left">
            <h3 class="fc-event-intro__subtitle">${esc(t(block.heartTitle, lang))}</h3>
            <p class="fc-section__body">${heartBody}</p>
          </div>
          <div class="fc-event-intro__right">
            <ul class="fc-event-process">${processItems}</ul>
          </div>
        </div>
        <h3 class="fc-event-example__title">${esc(t(block.exampleTitle, lang))}</h3>
        <p class="fc-section__body fc-event-example__body">${esc(t(block.exampleBody, lang))}</p>
        <div class="fc-event-table-wrap">
          <table class="fc-event-table">
            <thead>
              <tr>
                <th>Business &amp; design question</th>
                <th>KPI metrics category</th>
                <th><span class="fc-event-table__th-main">Event name</span><span class="fc-event-table__th-sub">Description</span></th>
                <th>Event properties</th>
                <th>Screen</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>${rows.join("")}</tbody>
          </table>
        </div>
      </section>`;
  }

  function renderFigure(block, lang) {
    const w = block.width || 1600;
    const h = block.height || 0;
    const contentW = block.contentWidth || (w > 1600 ? 1920 : 1600);
    const aspect = h > 0 ? `${w} / ${h}` : "";
    const variant = block.variant ? ` fc-figure--${block.variant}` : "";
    const style = aspect ? ` style="--hifi-aspect: ${aspect}; --hifi-content: ${contentW}"` : "";
    const caption = block.caption ? `<figcaption class="fc-figure__caption">${esc(t(block.caption, lang))}</figcaption>` : "";
    return `
      <figure class="fc-figure${variant}"${style}>
        <img src="${esc(block.src)}" alt="${esc(t(block.alt, lang) || block.alt || "")}" loading="lazy" width="${w}" ${h ? `height="${h}"` : ""}>
        ${caption}
      </figure>`;
  }

  function renderCompetitorPanels(block, lang) {
    if (block.mockup) {
      return `<div class="fc-competitor-panels">${window.CASE_OPENSHIFT_MOCKUPS?.render(block.mockup) || ""}</div>`;
    }
    return `
      <div class="fc-competitor-panels">
        ${(block.panels || [])
          .map(
            (p) => `
          <figure class="fc-competitor-panels__item">
            <img src="${esc(p.src)}" alt="${esc(t(p.alt, lang) || p.alt || "")}" loading="lazy">
          </figure>`
          )
          .join("")}
      </div>`;
  }

  /** Full-width Figma export — preserves exact layout, colors, and imagery */
  function renderFigmaSlice(block) {
    const w = block.width || 1920;
    const h = block.height || 0;
    const aspect = h > 0 ? `${w} / ${h}` : "1920 / 100";
    const alt = block.alt ? esc(block.alt) : "";
    const inset = block.inset === true;
    const alignStart = block.align === "start";
    const insetClass = inset ? ` fc-figma-slice--inset${alignStart ? " fc-figma-slice--align-start" : ""}` : "";
    const contentW = block.contentWidth || 1600;
    const padClass = block.padding ? ` fc-figma-slice--pad-${block.padding}` : "";
    const extraClass = block.frameClass ? ` ${block.frameClass}` : "";
    const insetStyle = inset ? ` style="--slice-aspect: ${aspect}; --slice-content: ${contentW}"` : ` style="--slice-aspect: ${aspect}"`;
    return `
      <figure class="fc-figma-slice${insetClass}${padClass}${extraClass}"${insetStyle}>
        <img src="${esc(block.src)}" alt="${alt}" loading="lazy" width="${w}" height="${h || ""}">
      </figure>`;
  }

  function renderSection(block, lang) {
    const band = block.band ? " fc-section--band" : "";
    return `
      <section class="fc-section${band}">
        ${block.title ? `<h2 class="fc-section__title">${esc(t(block.title, lang))}</h2>` : ""}
        ${renderBlocks(block.blocks, lang)}
      </section>`;
  }

  function renderBlock(block, lang) {
    switch (block.type) {
      case "hero":
        return renderHero(block, lang);
      case "section":
        return renderSection(block, lang);
      case "objectives":
        return renderObjectives(block, lang);
      case "pain":
        return renderPain(block, lang);
      case "journey":
        return renderJourney(block, lang);
      case "split":
        return renderSplit(block, lang);
      case "rbacProjectContextV2":
        return window.renderRbacProjectContextV2?.(block, lang) || "";
      case "rbacProjectContextV3":
        return window.renderRbacProjectContextV3?.(block, lang) || "";
      case "rbacTechResearchV2":
        return window.renderRbacTechResearchV2?.(block, lang) || "";
      case "rbacTechResearchV3":
        return window.renderRbacTechResearchV3?.(block, lang) || "";
      case "rbacUserResearchV3":
        return window.renderRbacUserResearchV3?.(block, lang) || "";
      case "rbacCompetitorResearchV2":
        return window.renderRbacCompetitorResearchV2?.(block, lang) || "";
      case "rbacObjectivesV2":
        return window.renderRbacObjectivesV2?.(block, lang) || "";
      case "rbacObjectivesV3":
        return window.renderRbacObjectivesV3?.(block, lang) || "";
      case "rbacInspirationV2":
        return window.renderRbacInspirationV2?.(block, lang) || "";
      case "rbacInspirationV3":
        return window.renderRbacInspirationV3?.(block, lang) || "";
      case "band":
        return renderBand(block, lang);
      case "content":
        return renderContent(block, lang);
      case "table":
        return renderTable(block, lang);
      case "rolesMapping":
        return renderRolesMapping(block, lang);
      case "rbacRolesMappingV3":
        return window.renderRbacRolesMappingV3?.(block, lang) || "";
      case "roleReveal":
        return renderRoleReveal(block, lang);
      case "rbacRoleRevealV2":
        return window.renderRbacRoleRevealV2?.(block, lang) || "";
      case "roleAssignment":
        return renderRoleAssignment(block, lang);
      case "verbTable":
        return renderVerbTable(block, lang);
      case "bindingSplit":
        return renderBindingSplit(block, lang);
      case "insightRow":
        return renderInsightRow(block, lang);
      case "columns":
        return renderColumns(block, lang);
      case "metrics":
        return renderMetrics(block, lang);
      case "statsTasks":
        return renderStatsTasks(block, lang);
      case "feedback":
        return renderFeedback(block, lang);
      case "roleCards":
        return renderRoleCards(block, lang);
      case "uiMockup":
        return renderUiMockup(block, lang);
      case "assignmentHifi":
        return renderAssignmentHifi(block, lang);
      case "usabilityTesting":
        if (document.body.dataset.caseId === "rbac-v3" && window.renderUsabilityTestingV3) {
          return window.renderUsabilityTestingV3(block, lang);
        }
        return renderUsabilityTesting(block, lang);
      case "usabilityTestingV3":
        return window.renderUsabilityTestingV3?.(block, lang) || "";
      case "modelResearch":
        return renderModelResearch(block, lang);
      case "modelIaMap":
        return renderModelIaMap(block, lang);
      case "modelDesignDetails":
        return renderModelDesignDetails(block, lang);
      case "issues":
        return renderIssues(block, lang);
      case "tags":
        return renderTags(block, lang);
      case "figure":
        return renderFigure(block, lang);
      case "competitorPanels":
        return renderCompetitorPanels(block, lang);
      case "figmaSlice":
        return renderFigmaSlice(block);
      case "painSolution":
        return renderPainSolution(block, lang);
      case "eventTracking":
        return renderEventTracking(block, lang);
      case "eventTrackingV3":
        return window.renderEventTrackingV3?.(block, lang) || "";
      case "eventTrackingModelV3":
        return window.renderModelEventTrackingV3?.(block, lang) || "";
      case "deploymentResearch":
        return window.renderDeploymentResearch?.(lang) || "";
      case "deploymentEvaluation":
        return window.renderDeploymentEvaluation?.(lang) || "";
      case "deploymentSolutions":
        return window.renderDeploymentSolutions?.(lang) || "";
      case "deploymentBreakdown":
        return window.renderDeploymentBreakdown?.(lang) || "";
      case "deploymentTradeoffs":
        return window.renderDeploymentTradeoffs?.(lang) || "";
      case "deploymentUx":
        if (document.body.dataset.caseId === "deployment-tracking-v3" && window.renderDeploymentUxV3) {
          return window.renderDeploymentUxV3(lang);
        }
        return window.renderDeploymentUx?.(lang) || "";
      default:
        return "";
    }
  }

  function renderBlocks(blocks, lang) {
    return (blocks || [])
      .filter((b) => b != null)
      .map((b) => renderBlock(b, lang))
      .join("");
  }

  window.renderOpenShiftCase = function (cs, lang) {
    return `<article class="fc">${renderBlocks(cs.blocks, lang)}</article>`;
  };
})();
