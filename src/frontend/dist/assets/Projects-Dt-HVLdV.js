import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-CBlI_pYA.js";
import { u as useActor, a as useQuery } from "./useActor-D37ajxFm.js";
import { P as ProjectCategory, c as createActor } from "./backend-DY-Lu4s-.js";
import { C as CATEGORY_LABELS } from "./index-CH_ek-so.js";
import { m as motion } from "./proxy-DA5jh4e_.js";
const FILTERS = [
  { value: "all", label: "All" },
  { value: ProjectCategory.Interior, label: "Interior" },
  { value: ProjectCategory.Architectural, label: "Architecture" },
  { value: ProjectCategory.SpacePlanning, label: "Space Planning" },
  { value: ProjectCategory.Renovation, label: "Renovation" }
];
function useFilteredProjects(category) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["projects", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProjects(category);
    },
    enabled: !!actor && !isFetching
  });
}
function RowSkeleton({ i }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: { borderBottom: "1px solid #1e1e1e" },
      className: "flex flex-col md:flex-row items-start md:items-center gap-6 py-10 animate-pulse",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#c9a84c", minWidth: "6rem" }, className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: "#1e1e1e",
              height: "2.5rem",
              width: "5rem",
              borderRadius: 2
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                background: "#1e1e1e",
                height: "1rem",
                width: "6rem",
                borderRadius: 2
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                background: "#1e1e1e",
                height: "2rem",
                width: "60%",
                borderRadius: 2
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: { background: "#1e1e1e", borderRadius: 2 },
            className: "w-full md:w-[38%] shrink-0 aspect-video"
          }
        )
      ]
    },
    i
  );
}
function ProjectRow({ project, index }) {
  const hasImage = project.imageUrls.length > 0;
  const label = CATEGORY_LABELS[project.category];
  const num = String(index + 1).padStart(2, "0");
  const [hovered, setHovered] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 32 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: {
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.25, 0.1, 0.25, 1]
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/projects/$id",
          params: { id: project.id.toString() },
          "data-ocid": `project-row-${project.id}`,
          "aria-label": `View ${project.title}`,
          onMouseEnter: () => setHovered(true),
          onMouseLeave: () => setHovered(false),
          style: {
            borderBottom: "1px solid #1e1e1e",
            display: "block",
            textDecoration: "none"
          },
          className: "group",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col md:flex-row md:items-center gap-6 py-10",
              style: { cursor: "pointer" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "block md:hidden w-full overflow-hidden",
                    style: { aspectRatio: "16/9" },
                    children: hasImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: project.imageUrls[0],
                        alt: project.title,
                        className: "w-full h-full object-cover transition-all duration-500",
                        style: {
                          filter: hovered ? "brightness(1.1)" : "brightness(0.85)",
                          transform: hovered ? "scale(1.03)" : "scale(1)"
                        }
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-full h-full flex items-center justify-center",
                        style: { background: "#111", transition: "filter 0.4s" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "svg",
                          {
                            width: "48",
                            height: "48",
                            viewBox: "0 0 48 48",
                            fill: "none",
                            "aria-hidden": "true",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "rect",
                                {
                                  x: "4",
                                  y: "12",
                                  width: "40",
                                  height: "26",
                                  rx: "1",
                                  stroke: "#333",
                                  strokeWidth: "1.5"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M4 22l10-9 10 8 9-6 15 8",
                                  stroke: "#333",
                                  strokeWidth: "1.5",
                                  strokeLinejoin: "round"
                                }
                              )
                            ]
                          }
                        )
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "shrink-0 md:w-24",
                    style: {
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      color: hovered ? "#d4b86a" : "#c9a84c",
                      lineHeight: 1,
                      transition: "color 0.3s"
                    },
                    children: [
                      "P.",
                      num
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#666"
                      },
                      children: label
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      style: {
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                        fontWeight: 500,
                        color: hovered ? "#f0ede8" : "#c8c4be",
                        lineHeight: 1.15,
                        transition: "color 0.3s"
                      },
                      className: "truncate",
                      children: project.title
                    }
                  ),
                  project.featured && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        display: "inline-block",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.6rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#c9a84c",
                        border: "1px solid #c9a84c33",
                        padding: "2px 8px"
                      },
                      children: "Featured"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "hidden md:block shrink-0 overflow-hidden",
                    style: { width: "38%", aspectRatio: "4/3" },
                    children: hasImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: project.imageUrls[0],
                        alt: project.title,
                        className: "w-full h-full object-cover",
                        style: {
                          filter: hovered ? "brightness(1.1)" : "brightness(0.85)",
                          transform: hovered ? "scale(1.03)" : "scale(1)",
                          transition: "filter 0.45s ease, transform 0.45s ease"
                        }
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-full h-full flex items-center justify-center",
                        style: {
                          background: "#111",
                          transition: "background 0.4s"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "svg",
                          {
                            width: "48",
                            height: "48",
                            viewBox: "0 0 48 48",
                            fill: "none",
                            "aria-hidden": "true",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "rect",
                                {
                                  x: "4",
                                  y: "12",
                                  width: "40",
                                  height: "26",
                                  rx: "1",
                                  stroke: "#2a2a2a",
                                  strokeWidth: "1.5"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M4 22l10-9 10 8 9-6 15 8",
                                  stroke: "#2a2a2a",
                                  strokeWidth: "1.5",
                                  strokeLinejoin: "round"
                                }
                              )
                            ]
                          }
                        )
                      }
                    )
                  }
                )
              ]
            }
          )
        }
      )
    }
  );
}
function EmptyState({ filtered }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "flex flex-col items-center justify-center py-32 text-center",
      "data-ocid": "projects-empty-state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            style: {
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "#555",
              fontWeight: 400
            },
            children: filtered ? "No projects in this category" : "No projects found"
          }
        ),
        filtered && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            style: {
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              color: "#444",
              marginTop: "0.75rem",
              letterSpacing: "0.05em"
            },
            children: "Try a different filter to explore the portfolio."
          }
        )
      ]
    }
  );
}
function Projects() {
  const [activeFilter, setActiveFilter] = reactExports.useState("all");
  const categoryParam = activeFilter === "all" ? null : activeFilter;
  const { data: projects, isLoading } = useFilteredProjects(categoryParam);
  const displayProjects = projects ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      style: { background: "#0a0a0a", minHeight: "100vh" },
      className: "pt-32 md:pt-40",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mx-auto px-6 md:px-12 lg:px-16",
          style: { maxWidth: "1400px" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
                className: "mb-10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#c9a84c",
                        marginBottom: "1rem"
                      },
                      children: "Our Work"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      style: {
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 400,
                        fontSize: "clamp(3.5rem, 9vw, 7rem)",
                        color: "#f0ede8",
                        lineHeight: 0.95,
                        letterSpacing: "-0.01em"
                      },
                      children: "Selected Projects"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { borderTop: "1px solid #1e1e1e", marginBottom: "2rem" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.5, delay: 0.2 },
                className: "flex flex-wrap gap-8 mb-0",
                "aria-label": "Filter projects by category",
                children: FILTERS.map((f) => {
                  const isActive = activeFilter === f.value;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setActiveFilter(f.value),
                      "data-ocid": `filter-${f.value}`,
                      "aria-pressed": isActive,
                      style: {
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0.75rem 0",
                        color: isActive ? "#c9a84c" : "#555",
                        borderBottom: isActive ? "1px solid #c9a84c" : "1px solid transparent",
                        transition: "color 0.25s, border-color 0.25s"
                      },
                      onMouseEnter: (e) => {
                        if (!isActive)
                          e.currentTarget.style.color = "#999";
                      },
                      onMouseLeave: (e) => {
                        if (!isActive)
                          e.currentTarget.style.color = "#555";
                      },
                      children: f.label
                    },
                    f.value
                  );
                })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  borderTop: "1px solid #1e1e1e",
                  marginTop: "0",
                  marginBottom: "0"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RowSkeleton, { i }, i)) }) : displayProjects.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { filtered: activeFilter !== "all" }) : displayProjects.map((project, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProjectRow,
              {
                project,
                index: i
              },
              project.id.toString()
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { paddingBottom: "6rem" } })
          ]
        }
      )
    }
  );
}
export {
  Projects as default
};
