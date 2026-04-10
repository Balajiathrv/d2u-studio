import { u as useParams, j as jsxRuntimeExports, L as Link, S as Skeleton } from "./index-DzRidtFL.js";
import { a as useProject } from "./useProjects-vKQGh8lm.js";
import { C as CATEGORY_LABELS } from "./index-ZEwy3jUy.js";
import { m as motion } from "./proxy-BkthkM3Z.js";
import { c as createLucideIcon } from "./createLucideIcon-CojMkoLo.js";
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
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
function ProjectDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-[55vh]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 md:px-10 max-w-5xl py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28 mb-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-3/4 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32 mb-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full mb-16" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48" })
      ] })
    ] })
  ] });
}
function NotFound() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-primary mb-4", children: "Project Not Found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl text-foreground mb-5 tracking-tight", children: "We couldn't find this project" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground max-w-md mx-auto mb-10", children: "The project you're looking for may have been moved or no longer exists. Browse all projects to find what you need." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/projects",
        className: "inline-flex items-center gap-2 font-body text-sm font-semibold text-primary underline-offset-4 hover:underline transition-smooth",
        "data-ocid": "not-found-back-link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back to Projects"
        ]
      }
    )
  ] }) });
}
const CATEGORY_HUE = {
  Interior: "var(--color-chart-3)",
  Architectural: "var(--color-accent)",
  "Space Planning": "var(--color-chart-4)",
  Renovation: "var(--color-chart-5)"
};
const HERO_GRADIENTS = [
  "from-[oklch(0.35_0.06_30)] via-[oklch(0.45_0.09_50)] to-[oklch(0.58_0.12_75)]",
  "from-[oklch(0.28_0.04_260)] via-[oklch(0.40_0.06_280)] to-[oklch(0.55_0.08_300)]",
  "from-[oklch(0.32_0.07_15)] via-[oklch(0.44_0.10_35)] to-[oklch(0.60_0.09_60)]"
];
function ProjectDetail() {
  const { id } = useParams({ from: "/projects/$id" });
  const numericId = BigInt(id);
  const { data: project, isLoading, isFetched } = useProject(numericId);
  if (isLoading || !isFetched) return /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectDetailSkeleton, {});
  if (!project) return /* @__PURE__ */ jsxRuntimeExports.jsx(NotFound, {});
  const categoryLabel = CATEGORY_LABELS[project.category] ?? "Design";
  const badgeColor = CATEGORY_HUE[categoryLabel] ?? "var(--color-chart-3)";
  const heroGradient = HERO_GRADIENTS[Number(numericId) % HERO_GRADIENTS.length];
  const hasImage = project.imageUrls.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "project-detail", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-[55vh] md:h-[65vh] overflow-hidden", children: [
      hasImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: project.imageUrls[0],
          alt: project.title,
          className: "w-full h-full object-cover"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-full h-full bg-gradient-to-br ${heroGradient}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: -8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          className: "absolute top-6 left-6 md:top-8 md:left-10",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/projects",
              className: "inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-semibold font-body transition-smooth bg-black/20 hover:bg-black/35 backdrop-blur-sm rounded-full px-4 py-2",
              "data-ocid": "hero-back-link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "All Projects"
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.15 },
          className: "absolute bottom-8 left-6 md:bottom-12 md:left-10 right-6 md:right-10 max-w-3xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "inline-block text-label text-xs px-3 py-1 rounded-full mb-4 font-semibold",
                style: {
                  backgroundColor: badgeColor,
                  color: "var(--color-foreground)",
                  opacity: 0.9
                },
                "data-ocid": "category-badge",
                children: categoryLabel
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight drop-shadow-sm", children: project.title })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 md:px-10 max-w-5xl py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.section,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.25 },
          className: "mb-16 max-w-3xl",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-lg md:text-xl text-foreground/80 leading-relaxed", children: project.description })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border mb-16" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.35 },
          className: "grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14",
          "data-ocid": "project-details-grid",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DetailBlock,
              {
                label: "Scope of Work",
                content: project.scope,
                index: 0
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-primary mb-4 font-semibold tracking-widest text-xs", children: "Materials" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2", "data-ocid": "materials-list", children: [
                project.materials.map((mat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-start gap-2 font-body text-foreground/80 text-sm",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-primary" }),
                      mat
                    ]
                  },
                  mat
                )),
                project.materials.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "font-body text-muted-foreground text-sm", children: "Details available upon request" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DetailBlock, { label: "Outcomes", content: project.outcomes, index: 2 })
          ]
        }
      ),
      project.imageUrls.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.55 },
          className: "mt-20",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-primary mb-6 text-xs font-semibold tracking-widest", children: "Gallery" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: project.imageUrls.slice(1).map((url) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: url,
                alt: `${project.title} — additional view`,
                className: "w-full aspect-video object-cover rounded-lg shadow-editorial"
              },
              url
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: 0.1 },
          className: "mt-20 pt-10 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl md:text-2xl text-foreground mb-1", children: "Interested in a similar project?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground", children: "Reach out and we'll be in touch within 24 hours." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/contact",
                className: "shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground font-body text-sm font-semibold px-6 py-3 rounded-md transition-smooth hover:opacity-90 hover:shadow-md",
                "data-ocid": "detail-cta-contact",
                children: "Start a Conversation"
              }
            )
          ]
        }
      )
    ] })
  ] });
}
function DetailBlock({
  label,
  content,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: 0.35 + index * 0.08 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-primary mb-4 font-semibold tracking-widest text-xs", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-foreground/80 text-sm leading-relaxed", children: content || "Details available upon request" })
      ]
    }
  );
}
export {
  ProjectDetail as default
};
