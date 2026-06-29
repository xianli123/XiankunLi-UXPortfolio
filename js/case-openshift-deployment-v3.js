/**
 * Deployment tracking case study V3 — UX evaluation (Figma 7450:36449).
 * Loaded only on cases/deployment-tracking-v3.html.
 */
(function () {
  "use strict";

  const ICON = "assets/cases/openshift-ai/deployment/icons/";
  const METRIC_CIRCLE = "assets/cases/openshift-ai/rbac/event-tracking-v3/metric-circle-secondary.svg";
  const STRATEGY_ICON = "assets/cases/openshift-ai/deployment/ux-v3/strategy.svg";

  const USABILITY_V3 = {
    title: { en: "Usability testing", zh: "可用性测试" },
    introHtml: {
      en: "To evaluate whether the redesigned deployment tracking experience improved visibility and troubleshooting, usability testing (<strong>A/B testing</strong>) was conducted with enterprise AI engineers. The study focused on users' ability to understand deployment progress, identify failures, and determine next steps when issues occurred.",
      zh: "为评估重新设计的部署追踪体验是否提升了可见性与故障排查效率，我们与企业 AI 工程师进行了可用性测试（<strong>A/B 测试</strong>）。研究聚焦于用户理解部署进度、识别失败以及出现问题时确定后续步骤的能力。",
    },
    metrics: [
      {
        labelHtml: {
          en: "Time to identify<br>deployment status",
          zh: "识别部署状态<br>所需时间",
        },
        valueHtml: {
          en: '<p class="fc-deploy-ux-v3__metric-line"><span class="fc-deploy-ux-v3__metric-num">↓ 90%</span></p>',
          zh: '<p class="fc-deploy-ux-v3__metric-line"><span class="fc-deploy-ux-v3__metric-num">↓ 90%</span></p>',
        },
        heading: { en: "Faster status recognition", zh: "更快识别状态" },
        caption: {
          en: "Participants were able to identify the current deployment status more quickly.",
          zh: "参与者能够更快地识别当前部署状态。",
        },
      },
      {
        labelHtml: {
          en: "Time to locate<br>failed steps",
          zh: "定位失败步骤<br>所需时间",
        },
        valueHtml: {
          en: '<p class="fc-deploy-ux-v3__metric-line"><span class="fc-deploy-ux-v3__metric-num">↓ 97%</span></p>',
          zh: '<p class="fc-deploy-ux-v3__metric-line"><span class="fc-deploy-ux-v3__metric-num">↓ 97%</span></p>',
        },
        heading: { en: "Faster failure identification", zh: "更快定位失败" },
        caption: {
          en: "Participants spent less time locating the deployment step responsible for a failure.",
          zh: "参与者花费更少时间定位导致失败的部署步骤。",
        },
      },
      {
        labelHtml: {
          en: "Failure diagnosis accuracy",
          zh: "故障诊断准确率",
        },
        valueHtml: {
          en: '<p class="fc-deploy-ux-v3__metric-line"><span class="fc-deploy-ux-v3__metric-num">↑ 90%</span></p>',
          zh: '<p class="fc-deploy-ux-v3__metric-line"><span class="fc-deploy-ux-v3__metric-num">↑ 90%</span></p>',
        },
        heading: { en: "Improved failure diagnosis accuracy", zh: "故障诊断准确率提升" },
        caption: {
          en: "Participants were more successful in identifying the root cause of failures.",
          zh: "参与者更成功地识别失败的根本原因。",
        },
      },
    ],
    outro: {
      en: "The redesigned deployment tracking experience helped users understand deployment progress more clearly, identify failures more efficiently, and troubleshoot issues with greater confidence.",
      zh: "重新设计的部署追踪体验帮助用户更清晰地理解部署进度、更高效地识别失败，并在排查问题时更有把握。",
    },
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

  function quoteT(obj, lang) {
    const v = t(obj, lang);
    return typeof v === "string" ? v.replace(/\u2019/g, "'") : v;
  }

  function field(obj, lang) {
    if (obj?.html?.[lang] || obj?.html?.en) return obj.html[lang] || obj.html.en;
    if (obj?.text?.[lang] || obj?.text?.en) return esc(t(obj.text, lang));
    return esc(t(obj, lang));
  }

  function renderExtensionExamples(ext, lang) {
    return (ext.examples || [])
      .map((ex) => {
        const reverse = ex.layout === "visual-right";
        const steps = (ex.steps || [])
          .map(
            (step) => `
              <div class="fc-deploy-extension__step">
                <span class="fc-deploy-extension__step-num">${esc(step.num)}</span>
                <p class="fc-deploy-extension__step-text">${esc(t(step.text, lang))}</p>
              </div>`
          )
          .join("");
        const visual = ex.visual
          ? `<figure class="fc-deploy-extension__fig">
              <img src="${esc(ex.visual.src)}" alt="" loading="lazy" width="${ex.visual.width}" height="${ex.visual.height}">
            </figure>`
          : "";
        const inlineVisual = ex.inlineVisual
          ? `<figure class="fc-deploy-extension__inline">
              <img src="${esc(ex.inlineVisual.src)}" alt="" loading="lazy" width="${ex.inlineVisual.width}" height="${ex.inlineVisual.height}">
            </figure>`
          : "";
        return `
            <article class="fc-deploy-extension__card${reverse ? " fc-deploy-extension__card--reverse" : ""}">
              ${reverse ? "" : visual}
              <div class="fc-deploy-extension__copy">
                <h3 class="fc-deploy-extension__heading">${esc(t(ex.heading, lang))}</h3>
                <div class="fc-deploy-extension__body">${field(ex.body, lang)}</div>
                ${steps ? `<div class="fc-deploy-extension__steps">${steps}</div>` : ""}
                ${inlineVisual}
              </div>
              ${reverse ? visual : ""}
            </article>`;
      })
      .join("");
  }

  window.renderDeploymentUxV3 = function (lang) {
    const d = window.DEPLOYMENT_DATA?.ux;
    if (!d) return "";
    const ev = d.evaluation;
    const ext = d.extension;
    const usability = USABILITY_V3;

    const testimonials = (ev.testimonials || [])
      .map(
        (card) => `
        <blockquote class="fc-deploy-ux-v3__testimonial">
          <img class="fc-deploy-ux-v3__quote" src="${ICON}quote.svg" alt="" width="32" height="31" aria-hidden="true">
          <p class="fc-deploy-ux-v3__testimonial-text">${esc(quoteT(card.text, lang))}</p>
          <footer class="fc-deploy-ux-v3__testimonial-foot">
            <p class="fc-deploy-ux-v3__testimonial-author">${esc(t(card.author, lang))}</p>
            <p class="fc-deploy-ux-v3__testimonial-role">${esc(t(card.role, lang))}</p>
          </footer>
        </blockquote>`
      )
      .join("");

    const metrics = usability.metrics
      .map((metric) => {
        const labelHtml = metric.labelHtml?.[lang] || metric.labelHtml?.en || "";
        const valueHtml = metric.valueHtml?.[lang] || metric.valueHtml?.en || "";
        return `
        <article class="fc-deploy-ux-v3__metric">
          <div class="fc-deploy-ux-v3__metric-circle">
            <img class="fc-deploy-ux-v3__metric-circle-art" src="${METRIC_CIRCLE}" alt="" aria-hidden="true" width="260" height="260" loading="lazy">
            <div class="fc-deploy-ux-v3__metric-inner">
              <p class="fc-deploy-ux-v3__metric-label">${labelHtml}</p>
              <div class="fc-deploy-ux-v3__metric-value">${valueHtml}</div>
            </div>
          </div>
          <h4 class="fc-deploy-ux-v3__metric-heading">${esc(t(metric.heading, lang))}</h4>
          <p class="fc-deploy-ux-v3__metric-caption">${esc(t(metric.caption, lang))}</p>
        </article>`;
      })
      .join("");

    const usabilityIntro = usability.introHtml?.[lang] || usability.introHtml?.en || "";

    return `
      <section class="fc-section fc-deploy-ux-v3">
        <h2 class="fc-deploy-ux-v3__title">${esc(t(ev.title, lang))}</h2>

        <div class="fc-deploy-ux-v3__feedback">
          <h3 class="fc-deploy-ux-v3__subtitle">${esc(t(ev.subtitle, lang))}</h3>
          <p class="fc-deploy-ux-v3__intro">${field(ev.intro, lang)}</p>
          <div class="fc-deploy-ux-v3__testimonials">${testimonials}</div>
        </div>

        <div class="fc-deploy-ux-v3__usability">
          <h3 class="fc-deploy-ux-v3__results-title">${esc(t(usability.title, lang))}</h3>
          <p class="fc-deploy-ux-v3__usability-intro">${usabilityIntro}</p>
          <div class="fc-deploy-ux-v3__metrics">${metrics}</div>
          <div class="fc-deploy-ux-v3__usability-outro">
            <img class="fc-deploy-ux-v3__usability-outro-icon" src="${STRATEGY_ICON}" alt="" width="80" height="80" loading="lazy" aria-hidden="true">
            <p class="fc-deploy-ux-v3__usability-outro-text">${esc(t(usability.outro, lang))}</p>
          </div>
        </div>

        <h2 class="fc-section__title fc-deploy-ux__gap">${esc(t(ext.title, lang))}</h2>
        <div class="fc-deploy-extension-intro">${field(ext.intro, lang)}</div>
        <div class="fc-deploy-extension__examples">${renderExtensionExamples(ext, lang)}</div>
      </section>`;
  };
})();
