import { r as reactExports, j as jsxRuntimeExports } from "./index-DzRidtFL.js";
import { l as useChangeAdminCredentials, B as Button } from "./useAdmin-BUScDUrx.js";
import { I as Input } from "./input-DnwcznmG.js";
import { L as Label } from "./label-BsdF6kA4.js";
import { u as ue } from "./index-GTnfYr97.js";
import { A as AdminLayout } from "./AdminLayout-DK9m942z.js";
import { c as createLucideIcon } from "./createLucideIcon-CojMkoLo.js";
import "./index-CPwCoacN.js";
import "./useActor-CcxsRM0y.js";
import "./useMutation-DWs1NcrZ.js";
import "./backend-DlF2G3t0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
function AdminSettings() {
  const [currentPassword, setCurrentPassword] = reactExports.useState("");
  const [newUsername, setNewUsername] = reactExports.useState("");
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const changeCredentials = useChangeAdminCredentials();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (!newUsername.trim()) {
      setError("Username cannot be empty.");
      return;
    }
    try {
      const result = await changeCredentials.mutateAsync({
        currentPassword,
        newUsername: newUsername.trim(),
        newPassword
      });
      if (result.__kind__ === "err") {
        setError(result.err);
        return;
      }
      ue.success("Credentials updated successfully. Please log in again.");
      setCurrentPassword("");
      setNewUsername("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        localStorage.removeItem("adminSession");
        window.location.href = "/admin/login";
      }, 1500);
    } catch {
      setError("Failed to update credentials. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Settings", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ShieldCheck,
          {
            className: "w-5 h-5 text-primary",
            "aria-hidden": "true"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-base", children: "Change Credentials" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: "Update your admin username and password" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "space-y-4",
          "data-ocid": "settings-credentials-form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "current-password", children: "Current Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "current-password",
                  type: "password",
                  value: currentPassword,
                  onChange: (e) => setCurrentPassword(e.target.value),
                  placeholder: "Your current password",
                  required: true,
                  autoComplete: "current-password",
                  className: "bg-background border-input",
                  "data-ocid": "settings-current-password"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "border-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-username", children: "New Username" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "new-username",
                  type: "text",
                  value: newUsername,
                  onChange: (e) => setNewUsername(e.target.value),
                  placeholder: "New admin username",
                  required: true,
                  autoComplete: "username",
                  className: "bg-background border-input",
                  "data-ocid": "settings-new-username"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-password", children: "New Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "new-password",
                  type: "password",
                  value: newPassword,
                  onChange: (e) => setNewPassword(e.target.value),
                  placeholder: "At least 8 characters",
                  required: true,
                  minLength: 8,
                  autoComplete: "new-password",
                  className: "bg-background border-input",
                  "data-ocid": "settings-new-password"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "confirm-password", children: "Confirm New Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "confirm-password",
                  type: "password",
                  value: confirmPassword,
                  onChange: (e) => setConfirmPassword(e.target.value),
                  placeholder: "Repeat new password",
                  required: true,
                  autoComplete: "new-password",
                  className: "bg-background border-input",
                  "data-ocid": "settings-confirm-password"
                }
              )
            ] }),
            error && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2",
                role: "alert",
                "data-ocid": "settings-error",
                children: error
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full",
                disabled: changeCredentials.isPending,
                "data-ocid": "settings-save-btn",
                children: changeCredentials.isPending ? "Saving…" : "Update Credentials"
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 border border-border rounded-xl p-4 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1 text-xs uppercase tracking-wider", children: "Security note" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "After updating credentials, you will be automatically logged out and required to sign in again with the new credentials." })
    ] })
  ] }) });
}
export {
  AdminSettings as default
};
