/**
 * Keycloak case — Red Hat blog article layout
 */
(function () {
  "use strict";

  function tl(obj, lang) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] || obj.en || "";
  }

  function quoteTl(obj, lang) {
    return (window.caseQuoteT || tl)(obj, lang);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderBlock(block, lang, t) {
    switch (block.type) {
      case "paragraph":
        return `<p class="rh-blog__p">${escapeHtml(tl(block.text, lang))}</p>`;

      case "heading": {
        const tag = block.level === 3 ? "h3" : "h2";
        const cls = block.level === 3 ? "rh-blog__h3" : "rh-blog__h2";
        return `<${tag} class="${cls}">${escapeHtml(tl(block.text, lang))}</${tag}>`;
      }

      case "blockquote":
        return `
          <blockquote class="rh-blog__quote">
            <p>${escapeHtml(quoteTl(block.text, lang))}</p>
            ${block.cite ? `<cite>—${escapeHtml(tl(block.cite, lang))}</cite>` : ""}
          </blockquote>`;

      case "related": {
        const label = escapeHtml(tl(block.text, lang));
        const inner = block.href
          ? `<a href="${block.href}" target="_blank" rel="noopener noreferrer">${label}</a>`
          : label;
        return `<aside class="rh-blog__related"><p>${inner}</p></aside>`;
      }

      case "figure": {
        const src = block.src;
        const alt = escapeHtml(tl(block.alt, lang));
        const cap = block.caption ? escapeHtml(tl(block.caption, lang)) : "";
        const license = block.license
          ? escapeHtml(tl(block.license, lang))
          : "";
        const figcaption = cap
          ? `<figcaption class="rh-blog__figcaption">${cap}</figcaption>`
          : "";
        const fullSize = block.fullSize
          ? `<p class="rh-blog__figure-full"><a href="${src}" target="_blank" rel="noopener noreferrer">${escapeHtml(
              t("keycloakBlog.openFullSize")
            )}</a>${license ? ` (${license})` : ""}</p>`
          : "";

        return `
          <figure class="rh-blog__figure">
            <img src="${src}" alt="${alt}" loading="lazy" />
            ${figcaption}
            ${fullSize}
          </figure>`;
      }

      case "list":
        return `<ul class="rh-blog__list">${(block.items || [])
          .map((item) => `<li>${escapeHtml(tl(item, lang))}</li>`)
          .join("")}</ul>`;

      case "acknowledgments":
        return `<p class="rh-blog__ack">${escapeHtml(tl(block.text, lang))}</p>`;

      case "author":
        return `
          <section class="rh-blog__author" aria-labelledby="rh-blog-author-title">
            <h2 id="rh-blog-author-title" class="rh-blog__author-title">${escapeHtml(
              t("keycloakBlog.aboutAuthor")
            )}</h2>
            <div class="rh-blog__author-card">
              <p class="rh-blog__author-name">${escapeHtml(tl(block.name, lang))}</p>
              <p class="rh-blog__author-bio">${escapeHtml(tl(block.bio, lang))}</p>
              ${
                block.github
                  ? `<p class="rh-blog__author-link"><a href="${block.github}" target="_blank" rel="noopener noreferrer">${escapeHtml(
                      t("keycloakBlog.githubProfile")
                    )}</a></p>`
                  : ""
              }
            </div>
          </section>`;

      default:
        return "";
    }
  }

  window.renderKeycloakBlogCase = function (cs, lang, t) {
    const article = window.KEYCLOAK_BLOG_ARTICLE;
    if (!article) return "";

    const categories = (article.categories || [])
      .map((c) => `<a class="rh-blog__category" href="#">${escapeHtml(tl(c, lang))}</a>`)
      .join("");

    const bodyHtml = (article.blocks || [])
      .map((b) => renderBlock(b, lang, t))
      .join("");

    const sourceLabel = t("keycloakBlog.viewOnRedHat");
    const sourceUrl = article.externalUrl || cs.externalUrl;

    return `
      <article class="rh-blog" style="--rh-accent: ${cs.color || "#1F883D"}">
        <header class="rh-blog__header">
          <p class="rh-blog__brand">Red Hat Blog</p>
          <h1 class="rh-blog__title">${escapeHtml(tl(article.blogTitle, lang))}</h1>
          <div class="rh-blog__meta">
            <time datetime="2023-02-20">${escapeHtml(tl(article.published, lang))}</time>
            <span class="rh-blog__meta-sep" aria-hidden="true">·</span>
            <span class="rh-blog__meta-author">${escapeHtml(tl(article.author, lang))}</span>
            <span class="rh-blog__meta-sep" aria-hidden="true">·</span>
            <span>${escapeHtml(tl(article.readTime, lang))}</span>
          </div>
          <div class="rh-blog__categories">${categories}</div>
        </header>
        <div class="rh-blog__body">
          ${bodyHtml}
        </div>
        <footer class="rh-blog__footer">
          <a class="rh-blog__source" href="${sourceUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(
            sourceLabel
          )} →</a>
        </footer>
      </article>`;
  };
})();
