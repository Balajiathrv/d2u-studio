import { j as jsxRuntimeExports, S as Skeleton, r as reactExports } from "./index-CBlI_pYA.js";
import { B as Badge } from "./badge-T9A96ZCg.js";
import { A as AdminLayout } from "./AdminLayout-DIdcn23t.js";
import { c as useAdminInquiries } from "./useAdmin-DW0r7ewB.js";
import { S as SERVICE_LABELS } from "./index-CH_ek-so.js";
import { c as createLucideIcon } from "./createLucideIcon-09Trm94k.js";
import { a as ChevronUp, C as ChevronDown } from "./chevron-up-dfsSNmJT.js";
import "./index-C_ITEkV0.js";
import "./useActor-D37ajxFm.js";
import "./useMutation-7xNeLzgT.js";
import "./backend-DY-Lu4s-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
];
const Inbox = createLucideIcon("inbox", __iconNode);
function formatDate(ts) {
  const ms = Number(ts / 1000000n);
  if (Number.isNaN(ms) || ms === 0) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(ms));
}
function InquiryRow({ inquiry }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-border hover:bg-muted/20 transition-smooth",
        "data-ocid": `inquiry-row-${inquiry.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground font-medium truncate max-w-[140px]", children: inquiry.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground truncate max-w-[180px] hidden sm:table-cell", children: inquiry.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: SERVICE_LABELS[inquiry.serviceType] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs hidden lg:table-cell", children: formatDate(inquiry.timestamp) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setExpanded((v) => !v),
              "aria-label": expanded ? "Collapse details" : "Expand details",
              "aria-expanded": expanded,
              className: "text-muted-foreground hover:text-foreground transition-smooth",
              children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4", "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4", "aria-hidden": "true" })
            }
          ) })
        ]
      }
    ),
    expanded && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs uppercase tracking-wider font-medium mb-1", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: inquiry.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: inquiry.email }),
        inquiry.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: inquiry.phone })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs uppercase tracking-wider font-medium mb-1", children: "Service" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: SERVICE_LABELS[inquiry.serviceType] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1", children: formatDate(inquiry.timestamp) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs uppercase tracking-wider font-medium mb-1", children: "Project Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed", children: inquiry.projectDescription })
      ] })
    ] }) }) })
  ] });
}
function AdminInquiries() {
  const { data: inquiries, isLoading } = useAdminInquiries();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Inquiries", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
      (inquiries == null ? void 0 : inquiries.length) ?? 0,
      " inquiry",
      (inquiries == null ? void 0 : inquiries.length) !== 1 ? "ies" : "y",
      " received"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, k)) }) : !(inquiries == null ? void 0 : inquiries.length) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-12 text-center", "data-ocid": "inquiries-empty", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Inbox,
        {
          className: "w-8 h-8 text-muted-foreground mx-auto mb-3",
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No inquiries yet." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider hidden sm:table-cell", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider hidden md:table-cell", children: "Service" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider hidden lg:table-cell", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-8" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: inquiries.map((inq) => /* @__PURE__ */ jsxRuntimeExports.jsx(InquiryRow, { inquiry: inq }, inq.id.toString())) })
    ] }) }) })
  ] }) });
}
export {
  AdminInquiries as default
};
