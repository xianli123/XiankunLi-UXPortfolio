/**
 * CSS-only UI mockups for OpenShift case studies (no images).
 */
(function () {
  "use strict";

  function esc(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  window.CASE_OPENSHIFT_MOCKUPS = {
    rbacHero() {
      return `
        <div class="fc-mock fc-mock--rbac-hero" aria-hidden="true">
          <div class="fc-mock__chrome">
            <span class="fc-mock__dot"></span><span class="fc-mock__dot"></span><span class="fc-mock__dot"></span>
            <span class="fc-mock__url">OpenShift AI · Permissions</span>
          </div>
          <div class="fc-mock__body">
            <aside class="fc-mock__nav">
              <span>Overview</span><span>Workbenches</span><span class="is-active">Permissions</span><span>Settings</span>
            </aside>
            <div class="fc-mock__main">
              <div class="fc-mock__toolbar">
                <strong>Project permissions</strong>
                <button type="button" class="fc-mock__btn fc-mock__btn--primary">Manage permissions</button>
              </div>
              <table class="fc-mock__table">
                <thead><tr><th>Role</th><th>Category</th><th>Status</th></tr></thead>
                <tbody>
                  <tr><td>Workbench reader</td><td>Workbench</td><td><span class="fc-mock__pill fc-mock__pill--green">Assigned</span></td></tr>
                  <tr><td>Workbench updater</td><td>Workbench</td><td><span class="fc-mock__pill fc-mock__pill--gray">Unassigned</span></td></tr>
                  <tr><td>Pipeline maintainer</td><td>Pipeline</td><td><span class="fc-mock__pill fc-mock__pill--green">Assigned</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>`;
    },

    rbacTypeahead() {
      return `
        <div class="fc-mock fc-mock--typeahead" aria-hidden="true">
          <label class="fc-mock__label">User or group</label>
          <div class="fc-mock__typeahead">
            <input type="text" value="john" readonly tabindex="-1" />
            <ul class="fc-mock__dropdown">
              <li class="is-highlight"><strong>john.doe@example.com</strong> <span>User</span></li>
              <li><strong>john.smith@example.com</strong> <span>User</span></li>
              <li class="fc-mock__dropdown-add">+ Add new user or group "john"</li>
            </ul>
          </div>
          <p class="fc-mock__hint">Recently granted</p>
          <div class="fc-mock__chips">
            <button type="button" class="fc-mock__chip">data-science-team</button>
            <button type="button" class="fc-mock__chip">ml-admins</button>
          </div>
        </div>`;
    },

    rbacRoleTable() {
      return `
        <div class="fc-mock fc-mock--role-table" aria-hidden="true">
          <table class="fc-mock__table fc-mock__table--roles">
            <thead><tr><th></th><th>Role</th><th>Description</th><th>Assignment status ↕</th></tr></thead>
            <tbody>
              <tr><td><input type="checkbox" checked disabled /></td><td>Workbench maintainer</td><td>View and manage all workbenches</td><td><span class="fc-mock__pill fc-mock__pill--gray">Existing</span></td></tr>
              <tr><td><input type="checkbox" disabled /></td><td>Workbench updater</td><td>Modify workbench configuration</td><td><span class="fc-mock__pill fc-mock__pill--gray">Existing</span></td></tr>
              <tr><td><input type="checkbox" checked disabled /></td><td>Workbench reader</td><td>View named workbenches only</td><td><span class="fc-mock__pill fc-mock__pill--blue">New</span></td></tr>
            </tbody>
          </table>
        </div>`;
    },

    rbacAssignmentStatus() {
      return `
        <div class="fc-mock fc-mock--role-table fc-mock--status-focus" aria-hidden="true">
          <div class="fc-mock__section-head">
            <h4 class="fc-mock__section-title">Manage permissions</h4>
            <p class="fc-mock__section-desc">Sort by Assignment status to review scattered changes.</p>
          </div>
          <table class="fc-mock__table fc-mock__table--roles">
            <thead><tr><th></th><th>Role</th><th>Category</th><th>Assignment status ↕</th></tr></thead>
            <tbody>
              <tr><td><input type="checkbox" checked disabled /></td><td>Workbench reader</td><td>Workbench</td><td><span class="fc-mock__pill fc-mock__pill--gray">Existing</span></td></tr>
              <tr><td><input type="checkbox" checked disabled /></td><td>Pipeline maintainer</td><td>Pipeline</td><td><span class="fc-mock__pill fc-mock__pill--gray">Existing</span></td></tr>
              <tr><td><input type="checkbox" checked disabled /></td><td>Workbench updater</td><td>Workbench</td><td><span class="fc-mock__pill fc-mock__pill--blue">New</span></td></tr>
              <tr><td><input type="checkbox" disabled /></td><td>Workbench maintainer</td><td>Workbench</td><td><span class="fc-mock__pill fc-mock__pill--red">Revoked</span></td></tr>
            </tbody>
          </table>
        </div>`;
    },

    rbacCompetitorPanel(brand, title, rows) {
      const rowsHtml = rows
        .map((r) => `<div class="fc-mock__mini-row"><span>${esc(r)}</span><span class="fc-mock__pill fc-mock__pill--gray">Role</span></div>`)
        .join("");
      return `
        <div class="fc-mock fc-mock--competitor" aria-hidden="true">
          <div class="fc-mock__chrome">
            <span class="fc-mock__dot"></span><span class="fc-mock__dot"></span><span class="fc-mock__dot"></span>
            <span class="fc-mock__brand fc-mock__brand--${brand}">${esc(title)}</span>
          </div>
          <div class="fc-mock__mini-body">
            <div class="fc-mock__mini-toolbar"><span>Permissions / IAM</span><button type="button" class="fc-mock__btn fc-mock__btn--primary">Assign</button></div>
            <div class="fc-mock__mini-rows">${rowsHtml}</div>
          </div>
        </div>`;
    },

    rbacCompetitors() {
      return `
        <div class="fc-mock fc-mock--competitors" aria-hidden="true">
          ${this.rbacCompetitorPanel("azure", "Azure ML", ["Data Scientist", "Compute Operator", "ML Admin"])}
          ${this.rbacCompetitorPanel("gcp", "Google Cloud", ["Vertex AI User", "IAM Admin", "Service Account"])}
          ${this.rbacCompetitorPanel("databricks", "Databricks", ["Workspace Admin", "Catalog Reader", "Cluster Manager"])}
          ${this.rbacCompetitorPanel("aws", "AWS SageMaker", ["Studio User", "Model Deployer", "Lineage Viewer"])}
          ${this.rbacCompetitorPanel("rh", "OpenShift", ["Project Admin", "Workbench Reader", "Pipeline Editor"])}
        </div>`;
    },

    rbacRoleDetailExplore() {
      return `
        <div class="fc-mock fc-mock--role-explore" aria-hidden="true">
          <div class="fc-mock__concept fc-mock__concept--rejected">
            <span class="fc-mock__concept-tag fc-mock__concept-tag--no">Not selected</span>
            <p class="fc-mock__concept-title">Expandable row in table</p>
            <p class="fc-mock__concept-desc">Role details expand inline below the row. Saves a click but increases table height and hurts scanability when many roles are listed.</p>
            <div class="fc-mock__compare-ui">
              <div class="fc-mock__list-row is-expanded"><span>Workbench reader</span><span>▼</span></div>
              <div class="fc-mock__compare-detail">Verbs: Read, Get, List, Watch · Resource: named workbench</div>
            </div>
          </div>
          <div class="fc-mock__concept">
            <span class="fc-mock__concept-tag fc-mock__concept-tag--yes">Selected pattern</span>
            <p class="fc-mock__concept-title">Modal from role name link</p>
            <p class="fc-mock__concept-desc">Clicking the role name opens a modal with Role details and Assignees tabs—better hierarchy, reusable across list views, and keeps the table compact.</p>
            <div class="fc-mock__compare-ui">
              <div class="fc-mock__list-row"><span>Workbench reader ↗</span></div>
              <div class="fc-mock__modal">Role details · Assignees · Close (X)</div>
            </div>
          </div>
        </div>`;
    },

    rbacRoleCompare() {
      return `
        <div class="fc-mock fc-mock--compare" aria-hidden="true">
          <div class="fc-mock__compare-panel">
            <p class="fc-mock__compare-label">Pattern A · Expandable row</p>
            <div class="fc-mock__compare-ui">
              <div class="fc-mock__list-row is-expanded"><span>Workbench reader</span><span>▼</span></div>
              <div class="fc-mock__compare-detail">Role details · Verbs: Read, Get, List, Watch</div>
            </div>
          </div>
          <div class="fc-mock__compare-panel fc-mock__compare-panel--selected">
            <p class="fc-mock__compare-label">Pattern B · Modal (selected)</p>
            <div class="fc-mock__compare-ui">
              <div class="fc-mock__list-row"><span>Workbench reader</span><span>↗</span></div>
              <div class="fc-mock__modal">Role details modal with tabs</div>
            </div>
          </div>
        </div>`;
    },

    rbacSaveConfirm() {
      return `
        <div class="fc-mock fc-mock--confirm" aria-hidden="true">
          <div class="fc-mock__dialog">
            <h5>Review permission changes</h5>
            <ul class="fc-mock__change-list">
              <li><span class="fc-mock__pill fc-mock__pill--blue">Grant</span> Workbench reader → john.doe@example.com</li>
              <li><span class="fc-mock__pill fc-mock__pill--red">Revoke</span> Workbench maintainer → john.doe@example.com</li>
            </ul>
            <div class="fc-mock__warn">High-risk: revoking maintainer removes delete access.</div>
            <div class="fc-mock__dialog-actions">
              <button type="button" class="fc-mock__btn">Cancel</button>
              <button type="button" class="fc-mock__btn fc-mock__btn--primary">Save</button>
            </div>
          </div>
        </div>`;
    },

    rbacPermissions() {
      return `
        <div class="fc-mock fc-mock--rbac-perms fc-mock--assignment-page">
          <div class="fc-mock__chrome">
            <span class="fc-mock__dot"></span><span class="fc-mock__dot"></span><span class="fc-mock__dot"></span>
            <span class="fc-mock__url">OpenShift AI · Manage permissions</span>
          </div>
          <div class="fc-mock__body fc-mock__perms-layout">
            <div class="fc-mock__subject-panel">
              <label>User or group</label>
              <div class="fc-mock__typeahead">
                <input type="text" value="john.doe@example.com" readonly tabindex="-1" />
              </div>
              <p class="fc-mock__hint">Recently granted</p>
              <div class="fc-mock__chips">
                <button type="button" class="fc-mock__chip">data-science-team</button>
              </div>
            </div>
            <div>
              <div class="fc-mock__section-head">
                <h4 class="fc-mock__section-title">Roles for this subject</h4>
                <p class="fc-mock__section-desc">Batch-check roles, then Save or Cancel.</p>
              </div>
              <table class="fc-mock__table fc-mock__table--roles">
                <thead><tr><th></th><th>Role</th><th>Category</th><th>Assignment status</th></tr></thead>
                <tbody>
                  <tr><td><input type="checkbox" checked disabled /></td><td><a href="#">Workbench reader</a></td><td>Workbench</td><td><span class="fc-mock__pill fc-mock__pill--blue">New</span></td></tr>
                  <tr><td><input type="checkbox" checked disabled /></td><td><a href="#">Pipeline maintainer</a></td><td>Pipeline</td><td><span class="fc-mock__pill fc-mock__pill--gray">Existing</span></td></tr>
                  <tr><td><input type="checkbox" disabled /></td><td><a href="#">Workbench maintainer</a></td><td>Workbench</td><td><span class="fc-mock__pill fc-mock__pill--gray">Existing</span></td></tr>
                </tbody>
              </table>
              <div class="fc-mock__footer-bar">
                <button type="button" class="fc-mock__btn">Cancel</button>
                <button type="button" class="fc-mock__btn fc-mock__btn--primary">Save</button>
              </div>
            </div>
          </div>
        </div>`;
    },

    rbacBinding() {
      return `
        <div class="fc-mock fc-mock--binding" aria-hidden="true">
          <div class="fc-mock__binding-card">
            <p class="fc-mock__binding-label">RoleBinding</p>
            <div class="fc-mock__binding-row"><span>Role</span><code>workbench-reader</code></div>
            <div class="fc-mock__binding-row"><span>Subject</span><code>user: john.doe</code></div>
            <div class="fc-mock__binding-row"><span>Resource</span><code>workbench/demo</code></div>
          </div>
          <div class="fc-mock__binding-arrow">→</div>
          <div class="fc-mock__binding-users">
            <span class="fc-mock__avatar">JD</span>
            <span class="fc-mock__binding-role">Reader</span>
          </div>
        </div>`;
    },

    rbacBindingYaml() {
      return `
        <div class="fc-code" aria-hidden="true">
          <pre class="fc-code__pre"><code><span class="fc-code__comment"># GENERATED RoleBinding (for "All Workbenches" scenario)</span>
<span class="fc-code__key">kind</span>: RoleBinding
<span class="fc-code__key">apiVersion</span>: rbac.authorization.k8s.io/v1
<span class="fc-code__key">metadata</span>:
  <span class="fc-code__key">namespace</span>: team-ai-dev  <span class="fc-code__comment"># Bound within this Project</span>
  <span class="fc-code__key">name</span>: bob-all-workbench-reader-binding
<span class="fc-code__key">subjects</span>:
- <span class="fc-code__key">kind</span>: User
  <span class="fc-code__key">name</span>: deena  <span class="fc-code__comment"># User Bob</span>
  <span class="fc-code__key">apiGroup</span>: rbac.authorization.k8s.io
<span class="fc-code__key">roleRef</span>:
  <span class="fc-code__key">kind</span>: ClusterRole   <span class="fc-code__comment"># &lt;-- Key point: direct reference to a ClusterRole</span>
  <span class="fc-code__key">name</span>: workbench-general-reader  <span class="fc-code__comment"># Reference to the general template</span>
  <span class="fc-code__key">apiGroup</span>: rbac.authorization.k8s.io</code></pre>
        </div>`;
    },

    deploymentOld() {
      return `
        <div class="fc-mock fc-mock--deploy">
          <div class="fc-mock__list-head"><span>Model</span><span>Status</span><span>Updated</span></div>
          <div class="fc-mock__list-row fc-mock__list-row--old">
            <span>llama-2-chat</span>
            <span class="fc-mock__icon-only" title="Unknown">?</span>
            <span>2h ago</span>
          </div>
          <div class="fc-mock__list-row fc-mock__list-row--old">
            <span>granite-8b</span>
            <span class="fc-mock__icon-only fc-mock__icon-only--warn">!</span>
            <span>5h ago</span>
          </div>
          <p class="fc-mock__note">Original: ambiguous icons, no stage detail</p>
        </div>`;
    },

    deploymentNew() {
      return `
        <div class="fc-mock fc-mock--deploy">
          <div class="fc-mock__list-head"><span>Model</span><span>Deployment progress</span><span>Status</span></div>
          <div class="fc-mock__list-row">
            <span>llama-2-chat</span>
            <div class="fc-mock__progress">
              <span class="is-done"></span><span class="is-done"></span><span class="is-active"></span><span></span><span></span>
            </div>
            <span class="fc-mock__pill fc-mock__pill--blue">Deploying</span>
          </div>
          <div class="fc-mock__list-row">
            <span>granite-8b</span>
            <div class="fc-mock__progress">
              <span class="is-done"></span><span class="is-done"></span><span class="is-done"></span><span class="is-done"></span><span class="is-fail"></span>
            </div>
            <span class="fc-mock__pill fc-mock__pill--red">Failed</span>
          </div>
          <div class="fc-mock__error-box">
            <strong>Stage 5 · Model load failed</strong>
            <p>Image pull error — check registry credentials and retry.</p>
          </div>
        </div>`;
    },

    modelDetail() {
      return `
        <div class="fc-mock fc-mock--model">
          <div class="fc-mock__tabs">
            <span class="is-active">Overview</span><span>Benchmarks</span><span>Hardware profiles</span><span>Deploy</span>
          </div>
          <div class="fc-mock__model-grid">
            <div class="fc-mock__model-card">
              <p class="fc-mock__model-label">Latency (p99)</p>
              <p class="fc-mock__model-value">42 ms</p>
              <p class="fc-mock__model-sub">INT8 · A100</p>
            </div>
            <div class="fc-mock__model-card">
              <p class="fc-mock__model-label">Throughput</p>
              <p class="fc-mock__model-value">1.2k tok/s</p>
              <p class="fc-mock__model-sub">FP16 · L40S</p>
            </div>
            <div class="fc-mock__model-card fc-mock__model-card--highlight">
              <p class="fc-mock__model-label">Recommended HWP</p>
              <p class="fc-mock__model-value">NVIDIA L40S</p>
              <p class="fc-mock__model-sub">Best cost / performance</p>
            </div>
          </div>
          <table class="fc-mock__table fc-mock__table--compact">
            <thead><tr><th>Compression</th><th>Hardware</th><th>Latency</th><th>Accuracy</th></tr></thead>
            <tbody>
              <tr><td>INT8</td><td>A100</td><td>42 ms</td><td>98.2%</td></tr>
              <tr><td>FP16</td><td>L40S</td><td>38 ms</td><td>99.1%</td></tr>
            </tbody>
          </table>
        </div>`;
    },

    render(variant) {
      const map = {
        "rbac-hero": this.rbacHero,
        "rbac-permissions": this.rbacPermissions,
        "rbac-typeahead": this.rbacTypeahead,
        "rbac-role-table": this.rbacRoleTable,
        "rbac-assignment-status": this.rbacAssignmentStatus,
        "rbac-role-compare": this.rbacRoleCompare,
        "rbac-role-detail-explore": this.rbacRoleDetailExplore,
        "rbac-competitors": this.rbacCompetitors,
        "rbac-save-confirm": this.rbacSaveConfirm,
        "rbac-binding": this.rbacBinding,
        "rbac-binding-yaml": this.rbacBindingYaml,
        "deployment-old": this.deploymentOld,
        "deployment-new": this.deploymentNew,
        "model-detail": this.modelDetail,
      };
      const fn = map[variant];
      return fn ? fn.call(this) : "";
    },
  };
})();
