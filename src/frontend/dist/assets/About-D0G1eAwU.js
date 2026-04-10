import { j as jsxRuntimeExports, L as Link, r as reactExports } from "./index-DzRidtFL.js";
import { m as motion } from "./proxy-BkthkM3Z.js";
import { A as ArrowRight } from "./arrow-right-Cw4Ez0X1.js";
import { u as useInView } from "./use-in-view-B0A-stTm.js";
import "./createLucideIcon-CojMkoLo.js";
const SKILLS = [
  { label: "Interior Design", pct: 95 },
  { label: "Architectural Design", pct: 90 },
  { label: "Space Planning", pct: 85 },
  { label: "Renovation", pct: 80 },
  { label: "Project Management", pct: 75 }
];
const TIMELINE = [
  {
    year: "2012",
    event: "Wahid and Jasim meet studying architecture in Kuala Lumpur — a shared frustration with cookie-cutter design plants the seed."
  },
  {
    year: "2015",
    event: "d2u studio is founded. The name captures the founding principle: designing directly for you. First residential commissions follow within months."
  },
  {
    year: "2018",
    event: "The studio expands into boutique hospitality and commercial work, bringing the same warmth and precision to public spaces."
  },
  {
    year: "2020",
    event: "Recognition grows. The studio is shortlisted for three regional design awards and doubles its team."
  },
  {
    year: "2024",
    event: "60+ completed projects across Malaysia. Wahid and Jasim remain hands-on with every client — still designing from the heart."
  }
];
const VALUES = [
  {
    num: "01",
    name: "Craft",
    desc: "Every detail is deliberate. Lasting design is never rushed."
  },
  {
    num: "02",
    name: "Warmth",
    desc: "Spaces that feel lived-in from day one — through light, texture, material."
  },
  {
    num: "03",
    name: "Collaborative",
    desc: "Our best work emerges through listening. Clients become partners."
  },
  {
    num: "04",
    name: "Architecture",
    desc: "We design from the bones out. Structure informs every interior decision."
  }
];
function SkillBar({
  label,
  pct,
  delay
}) {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      className: "py-5",
      style: { borderBottom: "1px solid #1e1e1e" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                fontFamily: "var(--font-body),'DM Sans',sans-serif",
                fontSize: "0.8125rem",
                color: "#f0ede8",
                letterSpacing: "0.08em"
              },
              children: label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              style: {
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "1.125rem",
                fontWeight: 300,
                color: "#c9a84c"
              },
              children: [
                pct,
                "%"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              height: "1px",
              background: "#1e1e1e",
              width: "100%",
              position: "relative",
              overflow: "hidden"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { width: 0 },
                animate: inView ? { width: `${pct}%` } : { width: 0 },
                transition: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] },
                style: {
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "1px",
                  background: "#c9a84c"
                }
              }
            )
          }
        )
      ]
    }
  );
}
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: { background: "#0a0a0a", color: "#f0ede8", minHeight: "100vh" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: { paddingTop: "8rem", paddingBottom: "5rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 md:px-12 max-w-6xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              className: "text-label",
              style: { marginBottom: "1.75rem" },
              children: "About the Studio"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
              style: {
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontWeight: 300,
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "#f0ede8",
                maxWidth: "14ch",
                marginBottom: "3rem"
              },
              children: "The Story of D2U Studio"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.6, delay: 0.5 },
              style: { height: "1px", background: "#1e1e1e", width: "100%" }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: { paddingTop: "5rem", paddingBottom: "5rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 md:px-12 max-w-6xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, x: -24 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      fontFamily: "'Cormorant Garamond',Georgia,serif",
                      fontWeight: 700,
                      fontStyle: "italic",
                      fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                      lineHeight: 1.2,
                      color: "#f0ede8",
                      letterSpacing: "-0.01em"
                    },
                    children: '"Design is not just how it looks — it is how it works."'
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 24 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: {
                  duration: 0.8,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1]
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        fontFamily: "var(--font-body),'DM Sans',sans-serif",
                        fontSize: "0.9375rem",
                        lineHeight: 1.8,
                        color: "rgba(240,237,232,0.7)",
                        marginBottom: "1.25rem"
                      },
                      children: "d2u studio was founded on a single conviction: that thoughtful design changes lives. We don't approach a space as a canvas for our own expression — we approach it as a collaboration between architecture, material, light, and the people who will inhabit it."
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        fontFamily: "var(--font-body),'DM Sans',sans-serif",
                        fontSize: "0.9375rem",
                        lineHeight: 1.8,
                        color: "rgba(240,237,232,0.7)"
                      },
                      children: "Every project at d2u is guided by rigorous architectural thinking and an obsessive attention to craft. From the first sketch to the final handover, we believe the details are the design."
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 0.6, delay: 0.3 },
              style: {
                height: "1px",
                background: "#1e1e1e",
                width: "100%",
                marginTop: "4rem"
              }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: { paddingTop: "5rem", paddingBottom: "5rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 md:px-12 max-w-6xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: 8 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.5 },
                  className: "text-label",
                  style: { marginBottom: "1.5rem" },
                  children: "Expertise"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.7, delay: 0.1 },
                  style: {
                    fontFamily: "'Cormorant Garamond',Georgia,serif",
                    fontWeight: 300,
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.015em",
                    color: "#f0ede8"
                  },
                  children: [
                    "What We",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    "Do Best"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { borderTop: "1px solid #1e1e1e" } }),
              SKILLS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                SkillBar,
                {
                  label: s.label,
                  pct: s.pct,
                  delay: i * 0.12
                },
                s.label
              ))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 0.6 },
              style: {
                height: "1px",
                background: "#1e1e1e",
                width: "100%",
                marginTop: "4rem"
              }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: { paddingTop: "5rem", paddingBottom: "5rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 md:px-12 max-w-6xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 8 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "text-label",
              style: { marginBottom: "3rem" },
              children: "Milestones"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                borderLeft: "1px solid #1e1e1e",
                paddingLeft: "2.5rem",
                display: "flex",
                flexDirection: "column",
                gap: 0
              },
              children: TIMELINE.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: -20 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  transition: {
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  },
                  style: {
                    paddingBottom: i < TIMELINE.length - 1 ? "3rem" : 0,
                    position: "relative"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          position: "absolute",
                          left: "-2.75rem",
                          top: "0.35rem",
                          width: "5px",
                          height: "5px",
                          background: "#c9a84c",
                          borderRadius: "50%"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        style: {
                          fontFamily: "'Cormorant Garamond',Georgia,serif",
                          fontSize: "1.5rem",
                          fontWeight: 300,
                          color: "#c9a84c",
                          lineHeight: 1,
                          marginBottom: "0.6rem",
                          letterSpacing: "0.02em"
                        },
                        children: item.year
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        style: {
                          fontFamily: "var(--font-body),'DM Sans',sans-serif",
                          fontSize: "0.875rem",
                          lineHeight: 1.75,
                          color: "rgba(240,237,232,0.65)",
                          maxWidth: "52ch"
                        },
                        children: item.event
                      }
                    )
                  ]
                },
                item.year
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 0.6 },
              style: {
                height: "1px",
                background: "#1e1e1e",
                width: "100%",
                marginTop: "4rem"
              }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: { paddingTop: "5rem", paddingBottom: "5rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 md:px-12 max-w-6xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 8 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "text-label",
              style: { marginBottom: "3rem" },
              children: "The Founders"
            }
          ),
          [
            {
              name: "Wahid",
              title: "Co-Founder & Principal Architect",
              bio: "Wahid brings a rigorous architectural sensibility to every project. Trained in structural design, he sees buildings as systems — where every wall, window, and threshold serves both a functional and emotional purpose. He leads all architectural projects from schematic design through construction documentation, ensuring structural ambition and design intention remain aligned from first sketch to final handover.",
              initial: "W"
            },
            {
              name: "Jasim",
              title: "Co-Founder & Principal Designer",
              bio: "Jasim is the studio's eye for atmosphere. With a background in interior design and a deep knowledge of materials, finishes, and spatial storytelling, he shapes how each room is experienced — not just seen. He oversees all interior design work: furniture, space planning, material specification, and lighting strategy — delivering environments that feel intentional down to the last detail.",
              initial: "J"
            }
          ].map((founder, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  height: "1px",
                  background: "#1e1e1e",
                  marginBottom: "3.5rem"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 24 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: {
                  duration: 0.7,
                  delay: 0.05,
                  ease: [0.16, 1, 0.3, 1]
                },
                className: "flex flex-col md:flex-row gap-10 md:gap-16 items-start",
                style: { marginBottom: i < 1 ? "3.5rem" : 0 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        flexShrink: 0,
                        width: "min(250px, 100%)",
                        aspectRatio: "3/4",
                        overflow: "hidden",
                        background: "linear-gradient(135deg, #141414 0%, #1c1a14 100%)",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-start",
                        padding: "1.25rem"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontFamily: "'Cormorant Garamond',Georgia,serif",
                            fontSize: "4rem",
                            fontWeight: 300,
                            color: "rgba(201,168,76,0.25)",
                            lineHeight: 1
                          },
                          children: founder.initial
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, paddingTop: "0.5rem" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h2",
                      {
                        style: {
                          fontFamily: "'Cormorant Garamond',Georgia,serif",
                          fontWeight: 300,
                          fontSize: "clamp(2.5rem, 6vw, 4rem)",
                          lineHeight: 1,
                          letterSpacing: "-0.02em",
                          color: "#f0ede8",
                          marginBottom: "0.75rem"
                        },
                        children: founder.name
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-label",
                        style: { marginBottom: "1.75rem", color: "#c9a84c" },
                        children: founder.title
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        style: {
                          fontFamily: "var(--font-body),'DM Sans',sans-serif",
                          fontSize: "0.9375rem",
                          lineHeight: 1.8,
                          color: "rgba(240,237,232,0.65)",
                          maxWidth: "60ch"
                        },
                        children: founder.bio
                      }
                    )
                  ] })
                ]
              }
            )
          ] }, founder.name)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 0.6 },
              style: {
                height: "1px",
                background: "#1e1e1e",
                width: "100%",
                marginTop: "4rem"
              }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: { paddingTop: "5rem", paddingBottom: "5rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 md:px-12 max-w-6xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 8 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "text-label",
              style: { marginBottom: "3rem" },
              children: "What We Stand For"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-0", children: VALUES.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: {
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1]
              },
              style: {
                padding: "2.5rem 0",
                borderTop: "1px solid #1e1e1e",
                borderRight: i % 2 === 0 ? "1px solid #1e1e1e" : "none",
                paddingRight: i % 2 === 0 ? "2.5rem" : 0,
                paddingLeft: i % 2 === 1 ? "2.5rem" : 0
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      fontFamily: "'Cormorant Garamond',Georgia,serif",
                      fontSize: "1.5rem",
                      fontStyle: "italic",
                      fontWeight: 300,
                      color: "#c9a84c",
                      marginBottom: "0.75rem",
                      lineHeight: 1
                    },
                    children: v.num
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    style: {
                      fontFamily: "'Cormorant Garamond',Georgia,serif",
                      fontWeight: 300,
                      fontSize: "clamp(1.5rem, 3vw, 2rem)",
                      lineHeight: 1.1,
                      color: "#f0ede8",
                      marginBottom: "0.75rem",
                      letterSpacing: "-0.01em"
                    },
                    children: v.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      fontFamily: "var(--font-body),'DM Sans',sans-serif",
                      fontSize: "0.8125rem",
                      lineHeight: 1.7,
                      color: "rgba(240,237,232,0.55)"
                    },
                    children: v.desc
                  }
                )
              ]
            },
            v.num
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            style: {
              borderTop: "1px solid #1e1e1e",
              paddingTop: "5rem",
              paddingBottom: "5rem"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 md:px-12 max-w-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-start md:items-end justify-between gap-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.6 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label", style: { marginBottom: "1.25rem" }, children: "Start a Project" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h2",
                      {
                        style: {
                          fontFamily: "'Cormorant Garamond',Georgia,serif",
                          fontWeight: 300,
                          fontSize: "clamp(2rem, 5vw, 3.5rem)",
                          lineHeight: 1.05,
                          letterSpacing: "-0.02em",
                          color: "#f0ede8"
                        },
                        children: "Ready to work together?"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0 },
                  whileInView: { opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.5, delay: 0.2 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/contact",
                      "data-ocid": "about-cta-contact",
                      style: {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        fontFamily: "var(--font-body),'DM Sans',sans-serif",
                        fontSize: "0.8125rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#0a0a0a",
                        background: "#c9a84c",
                        padding: "0.875rem 2rem",
                        transition: "opacity 0.3s ease"
                      },
                      onMouseEnter: (e) => {
                        e.currentTarget.style.opacity = "0.85";
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.opacity = "1";
                      },
                      children: [
                        "Get in Touch",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
                      ]
                    }
                  )
                }
              )
            ] }) })
          }
        )
      ]
    }
  );
}
export {
  About as default
};
