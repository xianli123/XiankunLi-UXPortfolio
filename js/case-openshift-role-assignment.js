/**
 * RBAC — Design the role assignment process (Figma 3875:28899)
 */
(function () {
  "use strict";

  const A = "assets/cases/openshift-ai/rbac/assignment/";

  window.RBAC_ROLE_ASSIGNMENT_BLOCK = {
    type: "roleAssignment",
    spacingTop: 72,
    title: { en: "Design the role assignment process", zh: "设计角色分配流程" },
    introHtml: {
      en: 'The <strong>Manage permissions</strong> page handles core project-level RBAC editing. It uses a single-page transaction model: select a subject (user or group) at the top, batch-check roles in a table in the middle, and commit or discard with <span class="fc-rbac-assign__medium">Save / Cancel</span> at the bottom.',
      zh: "<strong>Manage permissions</strong> 页面负责项目级 RBAC 编辑，采用单页式编辑流程：顶部选择用户或组，中部表格批量勾选角色，底部通过 <span class=\"fc-rbac-assign__medium\">Save / Cancel</span> 提交或放弃。",
    },
    challenges: [
      {
        painHtml: {
          en: 'Limited by technical and security factors, OpenShift is <strong>unable to obtain the full user/group list</strong>, so project admins have to input user or group names manually. For existing granted users/groups, forced manual name entry raises extra administrative costs.',
          zh: "受技术与安全限制，OpenShift <strong>无法获取完整用户/组列表</strong>，项目管理员只能手动输入用户或组名。对已授权用户/组仍需重复手动输入，增加了管理成本。",
        },
        painTitle: {
          en: "Inefficiency caused by mandatory manual user/group input",
          zh: "必须手动输入用户/组，操作效率较低",
        },
        solutionTitle: {
          en: "Typeahead input for user/group selection",
          zh: "用户/组选择的自动补全输入",
        },
        solutionBody: {
          en: "To resolve the above pain point, a typeahead input solution has been introduced. Administrators can either select pre-authorized users from suggestions or manually enter new user/group names as needed.",
          zh: "为解决上述痛点，引入自动补全输入方案：管理员可从建议中选择已授权用户，或按需手动输入新用户/组。",
        },
        solutionDescNarrow: true,
        visual: "typeahead",
        annotations: [
          {
            en: "When project admins type in characters manually, the dropdown will automatically populate relevant matched options.",
            zh: "管理员输入时，下拉列表会自动显示匹配项。",
          },
          {
            html: {
              en: 'If project admins need to select a <strong>new user/group</strong>, the first option in the dropdown list will be the desired choice.',
              zh: "若需选择<strong>新用户/组</strong>，下拉列表首项即为所需选项。",
            },
          },
          {
            html: {
              en: 'If project admins need to select a user/group from <strong>existing granted subjects</strong>, the secondary section below enables them to quickly pick matching users or groups.',
              zh: "若需从<strong>已授权用户/组</strong>中选择，下方次级区域可快速匹配并选取。",
            },
          },
          {
            en: "Project admins can also directly click to bring up the dropdown and select pre-granted users/groups.",
            zh: "管理员也可直接点击唤起下拉并选择已授权用户/组。",
          },
        ],
        pfLink: "https://www.patternfly.org/components/menus/select/react-templates/#typeahead",
      },
      {
        painBody: {
          en: "In accordance with previous specifications, we will introduce around a dozen new predefined roles. During permission management, it becomes challenging to clearly list all available roles for project admins, guide them to make proper selections, and display detailed role information effectively.",
          zh: "按照此前方案，系统将提供十余个预定义角色。权限管理时，如何清晰列出可用角色、引导正确选择并有效展示角色详情，成为一大挑战。",
        },
        painTitle: {
          en: "Need a clear and easy-to-use role list",
          zh: "需要清晰易用的角色列表",
        },
        solutionHtml: {
          en: 'I explored multiple design solutions including single-list layout, tree view mode and the table view in the concept design phase, and finally adopted <strong>the table view</strong>. This mode features clearer data classification, intuitive information display and easier role detail viewing and operation.',
          zh: "在概念阶段探索了单列表、树形视图与表格视图等方案，最终采用<strong>表格视图</strong>，数据分类更清晰、信息展示更直观，也更便于查看角色详情与操作。",
        },
        solutionTitle: {
          en: "Table view layout with checkboxes",
          zh: "带复选框的表格视图布局",
        },
        visual: "roleTable",
        annotations: [
          {
            html: {
              en: "<strong>Checkboxes</strong> enable users to easily select or deselect roles without additional instructions.",
              zh: "<strong>复选框</strong> 使用户无需额外说明即可轻松勾选或取消勾选角色。",
            },
          },
          {
            html: {
              en: "The <strong>Description</strong> column briefly illustrates the permissions controlled by each role.",
              zh: "<strong>Description</strong> 列简要说明各角色控制的权限。",
            },
          },
          {
            en: "It supports sorting by role name and assignment status, making it easy to locate target roles and check role assignment status.",
            zh: "支持按角色名称与分配状态排序，便于定位目标角色并查看分配状态。",
          },
        ],
      },
      {
        painBody: {
          en: "Per previous definitions, nearly a dozen new predefined roles will be added. When managing role assignments, project admins struggle to quickly tell which roles are already granted to users/groups and which are not.",
          zh: "按照此前方案，系统将新增十余个预定义角色。管理角色分配时，管理员难以快速区分哪些角色已授予用户/组、哪些尚未授予。",
        },
        painTitle: {
          en: "Difficulty in distinguishing assignment status",
          zh: "难以区分分配状态",
        },
        solutionHtml: {
          en: "To improve list scannability, I implemented 'Assignment status' for roles. By allowing users to sort the list based on these statuses, they can quickly find what they need and manage assignments with ease.",
          zh: "为提升列表浏览效率，新增「Assignment status」列。用户可按状态排序，快速找到所需项并轻松管理分配。",
        },
        solutionTitle: {
          en: "Assignment status for assignment tracking",
          zh: "用于分配追踪的 Assignment status",
        },
        solutionDescNarrow: true,
        visual: "assignmentStatus",
        statusLegend: [
          {
            label: { en: "Assigned", zh: "Assigned" },
            variant: "assigned",
            text: {
              en: "The role has already been assigned to the user/group before opening this page.",
              zh: "打开页面前，该角色已分配给该用户/组。",
            },
          },
          {
            label: { en: "Assigning", zh: "Assigning" },
            variant: "assigning",
            text: {
              en: "The role will be assigned to the user/group after saving the changes.",
              zh: "保存变更后，该角色将分配给该用户/组。",
            },
          },
          {
            label: { en: "Unassigning", zh: "Unassigning" },
            variant: "unassigning",
            text: {
              en: "The AI role will be unassigned from the user/group after saving the changes.",
              zh: "保存变更后，将取消该用户/组的此 AI 角色分配。",
            },
          },
          {
            label: { en: "Unassigning", zh: "Unassigning" },
            variant: "unassigning-custom",
            text: {
              html: {
                en: 'The <strong>OpenShift custom role</strong> will be unassigned from the user/group after saving the changes.',
                zh: "保存变更后，将取消该用户/组的 <strong>OpenShift custom role</strong> 分配。",
              },
            },
            footnote: {
              en: "Role can only be re-assigned in OpenShift",
              zh: "该角色仅可在 OpenShift 中重新分配",
            },
          },
        ],
      },
      {
        painBody: {
          en: "Even though the assignment status shows role adjustments, project admins may lose track of numerous edits, which may cause wrong permission assignments and security risks. Hence it is challenging to let them quickly check all modifications.",
          zh: "即使有 Assignment status，批量修改仍可能被遗漏，导致误配与安全风险，因此需要让管理员快速核对全部变更。",
        },
        painTitle: {
          en: "Challenge of reviewing bulk role modifications",
          zh: "难以审查批量角色修改",
        },
        solutionHtml: {
          en: 'Once project admins complete role assignments and edits, clicking <strong>Save</strong> opens a confirmation popup that displays all modifications, including newly granted and revoked roles. Additional warning alerts will be provided for high-risk and destructive operations.',
          zh: "完成角色分配与编辑后，点击 <strong>Save</strong> 会打开确认弹窗，展示全部新增与撤销的变更，并对高风险/破坏性操作提供额外警告。",
        },
        solutionTitle: {
          en: "Save confirmation popup with change overview",
          zh: "带变更总览的保存确认弹窗",
        },
        visual: "saveConfirm",
      },
    ],
    assets: {
      typeaheadComposite: A + "typeahead-composite.png",
      typeaheadActive: A + "typeahead-active.png",
      typeaheadDefault: A + "typeahead-default.png",
      explorationsBg: A + "explorations-bg.png",
      explorationsOverlay: A + "explorations-overlay.png",
      explorationsLayer: A + "explorations-layer.png",
      roleTable: A + "role-table.png",
      roleTableCard: A + "role-table-card.png",
      assignmentStatusTable: A + "assignment-status-table.png",
      assignmentStatusUi: A + "assignment-status-ui.png",
      saveDialogBg: A + "save-dialog-bg.png",
      saveDialogModal: A + "save-dialog-modal.png",
      saveDialogArrow: A + "save-dialog-arrow.png",
      annotationOval: A + "annotation-oval.svg",
      challengeIcon: A + "challenge-icon.svg",
    },
  };

  window.applyRoleAssignmentBlock = function applyRoleAssignmentBlock() {
    const block = window.RBAC_ROLE_ASSIGNMENT_BLOCK;
    const rbac = window.CASE_OPENSHIFT_DATA?.["rbac-v1"];
    if (!block || !rbac) return;
    const section = rbac.blocks.find(
      (b) => b.type === "section" && b.title?.en === "Design breakdown"
    );
    if (!section?.blocks) return;
    const existing = section.blocks.findIndex((b) => b?.type === "roleAssignment");
    if (existing >= 0) {
      section.blocks[existing] = block;
      return;
    }
    const revealIdx = section.blocks.findIndex((b) => b?.type === "roleReveal");
    const insertAt = revealIdx >= 0 ? revealIdx + 1 : 1;
    const legacyIdx = section.blocks.findIndex(
      (b) =>
        b?.type === "content" &&
        b.title?.en === "Design the role assignment process"
    );
    if (legacyIdx >= 0) {
      let end = legacyIdx + 1;
      while (
        end < section.blocks.length &&
        (section.blocks[end]?.type === "painSolution" ||
          (section.blocks[end]?.type === "content" &&
            section.blocks[end].title?.en === "Design the role assignment process"))
      ) {
        end += 1;
      }
      section.blocks.splice(legacyIdx, end - legacyIdx, block);
      return;
    }
    section.blocks.splice(insertAt, 0, block);
  };
})();
