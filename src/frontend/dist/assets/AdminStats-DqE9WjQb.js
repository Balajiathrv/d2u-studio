import { r as reactExports, j as jsxRuntimeExports } from "./index-CBlI_pYA.js";
import { B as Button } from "./useAdmin-DW0r7ewB.js";
import { I as Input } from "./input-DCaJLhzz.js";
import { L as Label } from "./label-BY4BsDCJ.js";
import { u as ue } from "./index-BrSu7Jru.js";
import { A as AdminLayout } from "./AdminLayout-DIdcn23t.js";
import { g as getStats, s as saveStats } from "./useStats-81xdeQt7.js";
import "./index-C_ITEkV0.js";
import "./useActor-D37ajxFm.js";
import "./useMutation-7xNeLzgT.js";
import "./backend-DY-Lu4s-.js";
import "./createLucideIcon-09Trm94k.js";
function AdminStats() {
  const [stats, setStats] = reactExports.useState(getStats);
  const [saving, setSaving] = reactExports.useState(false);
  const updateStat = (index, field, value) => {
    setStats(
      (prev) => prev.map(
        (s, i) => i === index ? {
          ...s,
          [field]: field === "value" ? Number(value) : value
        } : s
      )
    );
  };
  const handleSave = () => {
    setSaving(true);
    saveStats(stats);
    setTimeout(() => {
      setSaving(false);
      ue.success("Stats updated successfully");
    }, 400);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Homepage Stats", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Edit the four statistics shown on the homepage. Changes take effect immediately on save." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: stats.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-6 space-y-4",
        "data-ocid": `stat-editor-${i}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground text-base", children: [
            "Stat ",
            i + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `stat-value-${i}`, children: "Number Value" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: `stat-value-${i}`,
                  type: "number",
                  value: stat.value,
                  onChange: (e) => updateStat(i, "value", e.target.value),
                  "data-ocid": `stat-value-input-${i}`
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: `stat-suffix-${i}`, children: [
                "Suffix",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(+, %, etc.)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: `stat-suffix-${i}`,
                  value: stat.suffix,
                  onChange: (e) => updateStat(i, "suffix", e.target.value),
                  placeholder: "e.g. + or %",
                  maxLength: 5,
                  "data-ocid": `stat-suffix-input-${i}`
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `stat-label-${i}`, children: "Label" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: `stat-label-${i}`,
                  value: stat.label,
                  onChange: (e) => updateStat(i, "label", e.target.value),
                  placeholder: "e.g. Projects Completed",
                  "data-ocid": `stat-label-input-${i}`
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 pt-3 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1 uppercase tracking-wider", children: "Preview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                style: {
                  fontFamily: "var(--font-display), 'Palatino Linotype', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "2.5rem",
                  color: "#c9a84c",
                  lineHeight: 1
                },
                children: [
                  stat.value,
                  stat.suffix
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mt-1", children: stat.label })
          ] })
        ]
      },
      stat.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: handleSave,
        disabled: saving,
        "data-ocid": "save-stats-btn",
        className: "w-full sm:w-auto",
        children: saving ? "Saving…" : "Save Stats"
      }
    )
  ] }) });
}
export {
  AdminStats as default
};
