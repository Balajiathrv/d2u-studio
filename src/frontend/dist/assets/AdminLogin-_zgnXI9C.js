import { r as reactExports, j as jsxRuntimeExports } from "./index-DzRidtFL.js";
import { u as useValidateAdmin, B as Button, a as useAdminSession } from "./useAdmin-BUScDUrx.js";
import { I as Input } from "./input-DnwcznmG.js";
import { L as Label } from "./label-BsdF6kA4.js";
import "./index-CPwCoacN.js";
import "./useActor-CcxsRM0y.js";
import "./useMutation-DWs1NcrZ.js";
import "./backend-DlF2G3t0.js";
function AdminLogin() {
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const validate = useValidateAdmin();
  const { setAuthenticated } = useAdminSession();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const ok = await validate.mutateAsync({ username, password });
      if (ok) {
        setAuthenticated();
        window.location.href = "/admin";
      } else {
        setError("Invalid username or password.");
      }
    } catch {
      setError("Authentication failed. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/20 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          className: "w-7 h-7 text-primary",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          "aria-hidden": "true",
          role: "img",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "House icon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 1.5,
                d: "M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground tracking-tight", children: "d2u studio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Admin Portal" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "bg-card border border-border rounded-xl p-8 shadow-editorial space-y-5",
        "data-ocid": "admin-login-form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "username",
                className: "text-foreground text-sm font-medium",
                children: "Username"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "username",
                type: "text",
                value: username,
                onChange: (e) => setUsername(e.target.value),
                placeholder: "Enter username",
                autoComplete: "username",
                required: true,
                "data-ocid": "admin-username-input",
                className: "bg-background border-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "password",
                className: "text-foreground text-sm font-medium",
                children: "Password"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "password",
                type: "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: "Enter password",
                autoComplete: "current-password",
                required: true,
                "data-ocid": "admin-password-input",
                className: "bg-background border-input"
              }
            )
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2",
              role: "alert",
              "data-ocid": "admin-login-error",
              children: error
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "w-full",
              disabled: validate.isPending,
              "data-ocid": "admin-login-submit",
              children: validate.isPending ? "Signing in…" : "Sign in"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-muted-foreground text-xs mt-6", children: [
      "d2u studio © ",
      (/* @__PURE__ */ new Date()).getFullYear()
    ] })
  ] }) });
}
export {
  AdminLogin as default
};
