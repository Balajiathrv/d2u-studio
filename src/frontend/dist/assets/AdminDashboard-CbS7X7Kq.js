import { j as jsxRuntimeExports, S as Skeleton, L as Link } from "./index-CBlI_pYA.js";
import { A as AdminLayout, I as Image, F as FolderOpen, M as Mail, C as ChartColumn } from "./AdminLayout-DIdcn23t.js";
import { b as useAdminProjects, c as useAdminInquiries } from "./useAdmin-DW0r7ewB.js";
import { u as useHeroImages } from "./useHeroImages-DjpRJu9P.js";
import { g as getStats } from "./useStats-81xdeQt7.js";
import { A as ArrowRight } from "./arrow-right-rRKoqk9e.js";
import "./createLucideIcon-09Trm94k.js";
import "./index-C_ITEkV0.js";
import "./useActor-D37ajxFm.js";
import "./useMutation-7xNeLzgT.js";
import "./backend-DY-Lu4s-.js";
function StatCard({
  label,
  value,
  icon: Icon,
  href
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: href,
      className: "bg-card border border-border rounded-xl p-6 flex items-center gap-4 hover:bg-muted/40 transition-smooth group",
      "data-ocid": `admin-stat-${label.toLowerCase().replace(/\s/g, "-")}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs font-medium uppercase tracking-wider", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-2xl font-bold font-display mt-0.5", children: value })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArrowRight,
          {
            className: "w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth",
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function AdminDashboard() {
  const { data: projects, isLoading: loadingProjects } = useAdminProjects();
  const { data: inquiries, isLoading: loadingInquiries } = useAdminInquiries();
  const { data: heroImages, isLoading: loadingHero } = useHeroImages();
  const stats = getStats();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Welcome to the d2u studio admin panel. Manage your content below." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      loadingHero ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Hero Images",
          value: (heroImages == null ? void 0 : heroImages.length) ?? 0,
          icon: Image,
          href: "/admin/hero"
        }
      ),
      loadingProjects ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Projects",
          value: (projects == null ? void 0 : projects.length) ?? 0,
          icon: FolderOpen,
          href: "/admin/projects"
        }
      ),
      loadingInquiries ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Inquiries",
          value: (inquiries == null ? void 0 : inquiries.length) ?? 0,
          icon: Mail,
          href: "/admin/inquiries"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Homepage Stats",
          value: `${stats.length} items`,
          icon: ChartColumn,
          href: "/admin/stats"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground mb-3", children: "Recent Inquiries" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: loadingInquiries ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: ["sk-a", "sk-b", "sk-c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, k)) }) : !(inquiries == null ? void 0 : inquiries.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "p-8 text-center text-muted-foreground text-sm",
          "data-ocid": "admin-no-inquiries",
          children: "No inquiries yet."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider hidden sm:table-cell", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider hidden md:table-cell", children: "Service" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: inquiries.slice(0, 5).map((inq) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border last:border-0 hover:bg-muted/20 transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground font-medium truncate max-w-[140px]", children: inq.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground truncate max-w-[180px] hidden sm:table-cell", children: inq.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden md:table-cell", children: inq.serviceType })
            ]
          },
          inq.id.toString()
        )) })
      ] }) }),
      ((inquiries == null ? void 0 : inquiries.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/admin/inquiries",
          className: "text-primary text-sm hover:underline",
          children: "View all inquiries →"
        }
      ) })
    ] })
  ] }) });
}
export {
  AdminDashboard as default
};
