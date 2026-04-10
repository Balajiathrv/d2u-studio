import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-CBlI_pYA.js";
import { u as useHeroImages } from "./useHeroImages-DjpRJu9P.js";
import { u as useFeaturedProjects } from "./useProjects-ByOXkw1i.js";
import { u as useStats } from "./useStats-81xdeQt7.js";
import { C as CATEGORY_LABELS } from "./index-CH_ek-so.js";
import { m as motion } from "./proxy-DA5jh4e_.js";
import { P as ProjectCategory } from "./backend-DY-Lu4s-.js";
import { u as useInView } from "./use-in-view-C39a45Ru.js";
import "./useActor-D37ajxFm.js";
import "./useMutation-7xNeLzgT.js";
function HeroSlideshow({ images }) {
  const [current, setCurrent] = reactExports.useState(0);
  const [isTransitioning, setIsTransitioning] = reactExports.useState(false);
  const [isPaused, setIsPaused] = reactExports.useState(false);
  const intervalRef = reactExports.useRef(null);
  const FALLBACK_SLIDES = [
    "/assets/generated/hero-interior.dim_1400x900.jpg",
    "/assets/generated/project-architecture-1.dim_1400x900.jpg",
    "/assets/generated/project-penthouse.dim_1400x900.jpg"
  ];
  const displayImages = images.length > 0 ? images : FALLBACK_SLIDES;
  const count = displayImages.length;
  const goTo = reactExports.useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + count) % count);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [count, isTransitioning]
  );
  reactExports.useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count);
    }, 4e3);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, count]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "absolute inset-0 overflow-hidden",
      onMouseEnter: () => setIsPaused(true),
      onMouseLeave: () => setIsPaused(false),
      "aria-label": "Hero image slideshow",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": "true",
            style: {
              position: "absolute",
              inset: 0,
              background: `
            radial-gradient(ellipse 80% 60% at 70% 40%, rgba(201,168,76,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 20% 60%, rgba(15,12,8,0.9) 0%, transparent 70%),
            linear-gradient(135deg, #0a0a0a 0%, #111008 40%, #0e0c0a 70%, #0a0a0a 100%)
          `,
              zIndex: 0
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            "aria-hidden": "true",
            style: {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
              opacity: 0,
              transition: "opacity 1s ease",
              pointerEvents: "none"
            },
            viewBox: "0 0 1440 900",
            preserveAspectRatio: "xMidYMid slice",
            fill: "none",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "720",
                  y1: "0",
                  x2: "720",
                  y2: "900",
                  stroke: "#c9a84c",
                  strokeWidth: "0.5"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "0",
                  y1: "450",
                  x2: "1440",
                  y2: "450",
                  stroke: "#c9a84c",
                  strokeWidth: "0.5"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: "320",
                  y: "150",
                  width: "800",
                  height: "600",
                  stroke: "#c9a84c",
                  strokeWidth: "0.5",
                  fill: "none"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: "500",
                  y: "250",
                  width: "440",
                  height: "400",
                  stroke: "#c9a84c",
                  strokeWidth: "0.3",
                  fill: "none"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "320",
                  y1: "150",
                  x2: "380",
                  y2: "150",
                  stroke: "#c9a84c",
                  strokeWidth: "1"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "320",
                  y1: "150",
                  x2: "320",
                  y2: "210",
                  stroke: "#c9a84c",
                  strokeWidth: "1"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "1120",
                  y1: "150",
                  x2: "1060",
                  y2: "150",
                  stroke: "#c9a84c",
                  strokeWidth: "1"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "1120",
                  y1: "150",
                  x2: "1120",
                  y2: "210",
                  stroke: "#c9a84c",
                  strokeWidth: "1"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "320",
                  y1: "750",
                  x2: "380",
                  y2: "750",
                  stroke: "#c9a84c",
                  strokeWidth: "1"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "320",
                  y1: "750",
                  x2: "320",
                  y2: "690",
                  stroke: "#c9a84c",
                  strokeWidth: "1"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "1120",
                  y1: "750",
                  x2: "1060",
                  y2: "750",
                  stroke: "#c9a84c",
                  strokeWidth: "1"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "1120",
                  y1: "750",
                  x2: "1120",
                  y2: "690",
                  stroke: "#c9a84c",
                  strokeWidth: "1"
                }
              )
            ]
          }
        ),
        displayImages.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 transition-opacity duration-700 ease-in-out",
            style: {
              opacity: i === current ? 1 : 0,
              zIndex: i === current ? 2 : 1
            },
            "aria-hidden": i !== current,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src,
                alt: `d2u studio — slide ${i + 1}`,
                style: {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  willChange: "auto",
                  transform: "none"
                },
                loading: i === 0 ? "eager" : "lazy"
              }
            )
          },
          src
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-x-0 bottom-0 pointer-events-none",
            style: {
              height: "70%",
              background: "linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.65) 35%, rgba(5,5,5,0.2) 65%, transparent 100%)",
              zIndex: 3
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-y-0 left-0 pointer-events-none",
            style: {
              width: "35%",
              background: "linear-gradient(to right, rgba(5,5,5,0.6) 0%, transparent 100%)",
              zIndex: 3
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              bottom: "1.5rem",
              left: "50%",
              marginLeft: "-50%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
              zIndex: 10,
              transform: "none",
              willChange: "auto"
            },
            role: "tablist",
            "aria-label": "Slide indicators",
            children: displayImages.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => goTo(i),
                role: "tab",
                "aria-selected": i === current,
                "aria-label": `Go to slide ${i + 1}`,
                "data-ocid": `hero-dot-${i}`,
                style: {
                  borderRadius: "9999px",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s",
                  width: i === current ? "1.5rem" : "0.5rem",
                  height: "0.5rem",
                  backgroundColor: i === current ? "#c9a84c" : "rgba(201,168,76,0.35)"
                }
              },
              src
            ))
          }
        )
      ]
    }
  );
}
function CountUp({ target, suffix = "" }) {
  const [count, setCount] = reactExports.useState(0);
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  reactExports.useEffect(() => {
    if (!inView) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setCount(target);
      return;
    }
    let start = 0;
    const duration = 1600;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ref, children: [
    count,
    suffix
  ] });
}
const SERVICES = [
  {
    num: "01",
    title: "Interior Design",
    desc: "Materiality, proportion, and light — crafted into spaces that endure."
  },
  {
    num: "02",
    title: "Architectural Design",
    desc: "From concept through construction documents, built with precision."
  },
  {
    num: "03",
    title: "Space Planning",
    desc: "Strategic layouts that maximise flow, function, and human comfort."
  },
  {
    num: "04",
    title: "Renovation",
    desc: "Transformative work that honours character while elevating every detail."
  }
];
const PLACEHOLDER_PROJECTS = [
  {
    id: 1n,
    title: "Al Baraka Residence",
    category: ProjectCategory.Interior,
    description: "A serene family home in Kuwait City with considered materiality throughout.",
    imageUrls: ["/assets/generated/project-interior-1.dim_1400x900.jpg"],
    scope: "Full Interior Design",
    materials: [],
    outcomes: "",
    featured: true
  },
  {
    id: 2n,
    title: "Seef District Office",
    category: ProjectCategory.Architectural,
    description: "A contemporary commercial space shaped by the logic of light.",
    imageUrls: ["/assets/generated/project-architecture-1.dim_1400x900.jpg"],
    scope: "Architectural Design & Fit-out",
    materials: [],
    outcomes: "",
    featured: true
  },
  {
    id: 3n,
    title: "Marina Penthouse",
    category: ProjectCategory.Interior,
    description: "Luxury penthouse with panoramic skyline views and restrained palette.",
    imageUrls: ["/assets/generated/project-penthouse.dim_1400x900.jpg"],
    scope: "Space Planning & Interior",
    materials: [],
    outcomes: "",
    featured: true
  },
  {
    id: 4n,
    title: "Salmiya Cultural Centre",
    category: ProjectCategory.Architectural,
    description: "A civic anchor designed around community gathering and natural ventilation.",
    imageUrls: ["/assets/generated/project-civic.dim_1400x900.jpg"],
    scope: "Architectural Design",
    materials: [],
    outcomes: "",
    featured: true
  }
];
function SectionLabel({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.p,
    {
      initial: { opacity: 0, x: -12 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true },
      transition: { duration: 0.5 },
      style: {
        color: "#c9a84c",
        fontFamily: "var(--font-body), -apple-system, Arial, sans-serif",
        fontSize: "0.65rem",
        fontWeight: 600,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        marginBottom: "1.25rem"
      },
      children
    }
  );
}
function Home() {
  const { data: featured, isLoading } = useFeaturedProjects();
  const { data: heroImages = [] } = useHeroImages();
  const stats = useStats();
  const displayProjects = featured && featured.length > 0 ? featured : PLACEHOLDER_PROJECTS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "#0a0a0a", color: "#f0ede8" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        style: {
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden"
        },
        "data-ocid": "hero-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSlideshow, { images: heroImages }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                position: "relative",
                zIndex: 10,
                width: "100%",
                paddingBottom: "clamp(4rem, 8vh, 7rem)",
                paddingLeft: "clamp(1.5rem, 6vw, 6rem)",
                paddingRight: "clamp(1.5rem, 6vw, 6rem)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { duration: 0.6, delay: 0.1 },
                    style: {
                      fontFamily: "var(--font-body), -apple-system, Arial, sans-serif",
                      fontSize: "0.6rem",
                      fontWeight: 600,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#c9a84c",
                      marginBottom: "1.25rem"
                    },
                    children: "D2U Studio — Kuwait"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.h1,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
                    style: {
                      fontFamily: "var(--font-display), 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "clamp(4rem, 10vw, 9.5rem)",
                      lineHeight: 0.88,
                      letterSpacing: "-0.02em",
                      color: "#f0ede8",
                      marginBottom: "2rem",
                      maxWidth: "18ch",
                      textShadow: "0 2px 40px rgba(0,0,0,0.6)"
                    },
                    "data-ocid": "hero-heading",
                    children: [
                      "Space. ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      "Form. ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      "Vision."
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, scaleX: 0 },
                    animate: { opacity: 1, scaleX: 1 },
                    transition: { duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] },
                    style: {
                      width: "4rem",
                      height: "1px",
                      background: "#c9a84c",
                      marginBottom: "1.5rem",
                      transformOrigin: "left center"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { duration: 0.7, delay: 0.85 },
                    style: {
                      fontFamily: "var(--font-body), -apple-system, Arial, sans-serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(240,237,232,0.75)"
                    },
                    "data-ocid": "hero-sub",
                    children: "Architecture & Interior Design"
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        style: {
          borderTop: "1px solid #3a3020",
          position: "relative",
          overflow: "hidden",
          padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 6vw, 6rem)"
        },
        "data-ocid": "studio-statement",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1920&q=80",
              alt: "",
              "aria-hidden": "true",
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                willChange: "auto",
                transform: "none"
              },
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              style: {
                position: "absolute",
                inset: 0,
                background: "rgba(5,4,2,0.75)",
                zIndex: 1
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              style: {
                position: "absolute",
                inset: 0,
                background: "linear-gradient(160deg, rgba(201,168,76,0.06) 0%, transparent 60%)",
                zIndex: 1
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              style: {
                position: "absolute",
                top: "-1rem",
                right: "clamp(1.5rem, 6vw, 6rem)",
                fontFamily: "var(--font-display), 'Palatino Linotype', Georgia, serif",
                fontSize: "clamp(12rem, 25vw, 22rem)",
                lineHeight: 1,
                color: "rgba(201,168,76,0.05)",
                fontWeight: 700,
                userSelect: "none",
                pointerEvents: "none",
                zIndex: 2
              },
              children: '"'
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", zIndex: 3 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "The Studio" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "3rem",
                  alignItems: "end"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.h2,
                    {
                      initial: { opacity: 0 },
                      whileInView: { opacity: 1 },
                      viewport: { once: true },
                      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                      style: {
                        fontFamily: "var(--font-display), 'Palatino Linotype', Georgia, serif",
                        fontWeight: 300,
                        fontSize: "clamp(2.8rem, 6.5vw, 6.5rem)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.01em",
                        color: "#f0ede8",
                        maxWidth: "22ch"
                      },
                      "data-ocid": "statement-heading",
                      children: [
                        "We design spaces that",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { style: { color: "#c9a84c", fontStyle: "italic" }, children: "transcend" }),
                        " ",
                        "the ordinary."
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0 },
                      whileInView: { opacity: 1 },
                      viewport: { once: true },
                      transition: { duration: 0.7, delay: 0.2 },
                      style: { maxWidth: "38ch", marginLeft: "auto" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          style: {
                            fontFamily: "var(--font-body), -apple-system, Arial, sans-serif",
                            fontSize: "0.95rem",
                            lineHeight: 1.85,
                            color: "rgba(240,237,232,0.78)",
                            textAlign: "right"
                          },
                          children: "D2U Studio is an architecture and interior design practice founded on the belief that every space has the potential to elevate the lives of those within it. Working across Kuwait and the Gulf, we bring rigorous thinking and refined craft to each project — from intimate residences to civic institutions."
                        }
                      )
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  marginTop: "5rem",
                  height: "1px",
                  background: "linear-gradient(to right, #c9a84c 0%, rgba(201,168,76,0.3) 40%, transparent 100%)"
                }
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        style: {
          background: "#0a0a0a",
          padding: "clamp(4rem, 10vh, 7rem) 0",
          borderTop: "1px solid #1a1a1a"
        },
        "data-ocid": "featured-projects",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                padding: "0 clamp(1.5rem, 6vw, 6rem)",
                marginBottom: "3rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Selected Work" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                padding: "0 clamp(1.5rem, 6vw, 6rem)",
                marginBottom: "1rem"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontFamily: "var(--font-body), Arial, sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(240,237,232,0.45)"
                  },
                  children: "Project"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                height: "1px",
                background: "rgba(201,168,76,0.35)",
                marginBottom: "0"
              }
            }
          ),
          isLoading ? ["sk-a", "sk-b", "sk-c"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                height: "200px",
                borderBottom: "1px solid #1e1e1e",
                background: "rgba(240,237,232,0.02)"
              }
            },
            id
          )) : displayProjects.map((project, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProjectRow,
            {
              project,
              index: i
            },
            project.id.toString()
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              style: {
                padding: "3rem clamp(1.5rem, 6vw, 6rem) 0",
                display: "flex",
                justifyContent: "flex-end"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/projects",
                  style: {
                    fontFamily: "var(--font-body), Arial, sans-serif",
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#f0ede8",
                    border: "1px solid rgba(201,168,76,0.5)",
                    padding: "0.9rem 2.25rem",
                    display: "inline-block",
                    textDecoration: "none",
                    transition: "border-color 0.3s, color 0.3s, background 0.3s"
                  },
                  onMouseEnter: (e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "#c9a84c";
                    el.style.color = "#0a0a0a";
                    el.style.background = "#c9a84c";
                  },
                  onMouseLeave: (e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "rgba(201,168,76,0.5)";
                    el.style.color = "#f0ede8";
                    el.style.background = "transparent";
                  },
                  "data-ocid": "view-all-projects",
                  children: "View All Projects"
                }
              )
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        style: {
          padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 6vw, 6rem)",
          borderTop: "1px solid rgba(201,168,76,0.35)",
          borderBottom: "1px solid rgba(201,168,76,0.35)",
          position: "relative",
          overflow: "hidden"
        },
        "data-ocid": "stats-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1920&q=80",
              alt: "",
              "aria-hidden": "true",
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                willChange: "auto",
                transform: "none"
              },
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              style: {
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, rgba(5,4,2,0.9) 0%, rgba(10,8,4,0.88) 50%, rgba(8,7,3,0.92) 100%)",
                zIndex: 1
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              style: {
                position: "absolute",
                right: "-2rem",
                bottom: "5%",
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(15rem, 28vw, 28rem)",
                lineHeight: 1,
                color: "rgba(201,168,76,0.04)",
                fontWeight: 700,
                userSelect: "none",
                pointerEvents: "none",
                letterSpacing: "-0.05em",
                zIndex: 2,
                transform: "none",
                willChange: "auto"
              },
              children: "12"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "3rem 2rem",
                position: "relative",
                zIndex: 3
              },
              className: "md:!grid-cols-4",
              children: stats.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  whileInView: { opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.6, delay: i * 0.1 },
                  "data-ocid": `stat-${i}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        style: {
                          fontFamily: "var(--font-display), 'Palatino Linotype', Georgia, serif",
                          fontWeight: 300,
                          fontStyle: "italic",
                          fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
                          lineHeight: 1,
                          color: "#c9a84c",
                          marginBottom: "0.75rem",
                          textShadow: "0 0 40px rgba(201,168,76,0.15)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { target: stat.value, suffix: stat.suffix })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          width: "2.5rem",
                          height: "1px",
                          background: "#c9a84c",
                          marginBottom: "0.75rem",
                          opacity: 0.6
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        style: {
                          fontFamily: "var(--font-body), Arial, sans-serif",
                          fontSize: "0.65rem",
                          fontWeight: 500,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "rgba(240,237,232,0.65)"
                        },
                        children: stat.label
                      }
                    )
                  ]
                },
                stat.label
              ))
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        style: {
          padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 6vw, 6rem)",
          position: "relative",
          overflow: "hidden"
        },
        "data-ocid": "services-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1920&q=80",
              alt: "",
              "aria-hidden": "true",
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                willChange: "auto",
                transform: "none"
              },
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              style: {
                position: "absolute",
                inset: 0,
                background: "rgba(5,4,2,0.88)",
                zIndex: 1
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", zIndex: 2 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Our Services" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  height: "1px",
                  background: "rgba(201,168,76,0.35)",
                  marginBottom: "0"
                }
              }
            ),
            SERVICES.map((svc, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceRow, { svc, index: i }, svc.num)),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0 },
                whileInView: { opacity: 1 },
                viewport: { once: true },
                transition: { duration: 0.5, delay: 0.3 },
                style: { marginTop: "3.5rem" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/services",
                    style: {
                      fontFamily: "var(--font-body), Arial, sans-serif",
                      fontSize: "0.72rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#c9a84c",
                      border: "1px solid #c9a84c",
                      padding: "0.9rem 2.25rem",
                      display: "inline-block",
                      textDecoration: "none",
                      transition: "background 0.3s, color 0.3s"
                    },
                    onMouseEnter: (e) => {
                      const el = e.currentTarget;
                      el.style.background = "#c9a84c";
                      el.style.color = "#0a0a0a";
                    },
                    onMouseLeave: (e) => {
                      const el = e.currentTarget;
                      el.style.background = "transparent";
                      el.style.color = "#c9a84c";
                    },
                    "data-ocid": "explore-services-link",
                    children: "Explore Services"
                  }
                )
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        style: {
          background: "#0e0d0b",
          padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 6vw, 6rem)",
          borderTop: "1px solid #2a2520",
          borderBottom: "1px solid #2a2520"
        },
        "data-ocid": "founders-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "The Founders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FounderRow,
            {
              imageSrc: "/assets/generated/founder-wahid.dim_600x700.jpg",
              name: "Wahid",
              title: "Co-founder & Design Director",
              bio: "With over a decade of experience shaping residential and commercial interiors, Wahid brings a deep sensitivity to materiality and spatial hierarchy. His approach roots every project in the cultural context of its occupants — creating spaces that feel both timeless and intimately personal.",
              quote: "Good design is invisible — it simply makes life feel right.",
              index: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                height: "1px",
                background: "linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)",
                margin: "4rem 0"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FounderRow,
            {
              imageSrc: "/assets/generated/founder-jasim.dim_600x700.jpg",
              name: "Jasim",
              title: "Co-founder & Principal Architect",
              bio: "Jasim's architectural practice spans residential villas, urban mixed-use developments, and bespoke commercial environments. He champions a philosophy where structure and aesthetics are inseparable — where every load-bearing decision is also a design decision.",
              quote: "Architecture is frozen music — every line carries a rhythm.",
              index: 1
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        style: {
          padding: "clamp(6rem, 14vh, 11rem) clamp(1.5rem, 6vw, 6rem)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid rgba(201,168,76,0.2)"
        },
        "data-ocid": "cta-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80",
              alt: "",
              "aria-hidden": "true",
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                willChange: "auto",
                transform: "none"
              },
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              style: {
                position: "absolute",
                inset: 0,
                background: "rgba(5,4,2,0.82)",
                zIndex: 1
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              style: {
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.04) 50%, transparent 75%)",
                pointerEvents: "none",
                zIndex: 2
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              style: {
                position: "absolute",
                top: 0,
                left: "calc(50% - 3rem)",
                width: "6rem",
                height: "1px",
                background: "#c9a84c",
                opacity: 0.7,
                zIndex: 3,
                transform: "none",
                willChange: "auto"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.h2,
            {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              style: {
                fontFamily: "var(--font-display), 'Palatino Linotype', Georgia, serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(3rem, 7vw, 6.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                color: "#f0ede8",
                marginBottom: "2rem",
                position: "relative",
                zIndex: 4
              },
              "data-ocid": "cta-heading",
              children: [
                "Let's Build",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "Something."
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 0.6, delay: 0.2 },
              style: {
                fontFamily: "var(--font-body), Arial, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(240,237,232,0.65)",
                marginBottom: "3rem",
                position: "relative",
                zIndex: 4
              },
              children: "Tell us about your project"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: 0.35 },
              style: { position: "relative", zIndex: 4 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/contact",
                  style: {
                    fontFamily: "var(--font-body), Arial, sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#0a0a0a",
                    background: "#c9a84c",
                    padding: "1.1rem 3.5rem",
                    display: "inline-block",
                    textDecoration: "none",
                    transition: "background 0.3s, transform 0.2s"
                  },
                  onMouseEnter: (e) => {
                    const el = e.currentTarget;
                    el.style.background = "#b8953f";
                    el.style.transform = "translateY(-2px)";
                  },
                  onMouseLeave: (e) => {
                    const el = e.currentTarget;
                    el.style.background = "#c9a84c";
                    el.style.transform = "translateY(0)";
                  },
                  "data-ocid": "cta-start-conversation",
                  children: "Start a Conversation"
                }
              )
            }
          )
        ]
      }
    )
  ] });
}
function ProjectRow({ project, index }) {
  const [hovered, setHovered] = reactExports.useState(false);
  const fallback = "/assets/images/placeholder.svg";
  const img = project.imageUrls && project.imageUrls.length > 0 ? project.imageUrls[0] : fallback;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true },
      transition: { duration: 0.55, delay: index * 0.08 },
      "data-ocid": `project-row-${project.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/projects/$id",
          params: { id: project.id.toString() },
          style: { textDecoration: "none", display: "block" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              onMouseEnter: () => setHovered(true),
              onMouseLeave: () => setHovered(false),
              style: {
                display: "flex",
                alignItems: "center",
                padding: "clamp(1.5rem, 3vh, 2.5rem) clamp(1.5rem, 6vw, 6rem)",
                borderBottom: "1px solid #232320",
                cursor: "pointer",
                transition: "background 0.3s",
                background: hovered ? "rgba(201,168,76,0.04)" : "transparent",
                gap: "2rem",
                overflow: "hidden"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        fontFamily: "var(--font-body), Arial, sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#c9a84c",
                        marginBottom: "0.5rem"
                      },
                      children: CATEGORY_LABELS[project.category]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      style: {
                        fontFamily: "var(--font-display), 'Palatino Linotype', Georgia, serif",
                        fontWeight: 300,
                        fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                        color: hovered ? "#f0ede8" : "#c8c4be",
                        letterSpacing: "-0.01em",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        transition: "color 0.3s"
                      },
                      children: project.title
                    }
                  ),
                  project.scope && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        fontFamily: "var(--font-body), Arial, sans-serif",
                        fontSize: "0.75rem",
                        color: "rgba(240,237,232,0.45)",
                        marginTop: "0.35rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      },
                      children: project.scope
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      flexShrink: 0,
                      width: "clamp(7rem, 14vw, 14rem)",
                      height: "clamp(4.5rem, 8vw, 9rem)",
                      overflow: "hidden",
                      opacity: hovered ? 1 : 0.65,
                      transition: "opacity 0.4s",
                      border: hovered ? "1px solid rgba(201,168,76,0.3)" : "1px solid transparent"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: img,
                        alt: project.title,
                        style: {
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transform: hovered ? "scale(1.05)" : "scale(1)",
                          transition: "transform 0.6s ease"
                        },
                        onError: (e) => {
                          e.target.src = fallback;
                        }
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
function ServiceRow({
  svc,
  index
}) {
  const [hovered, setHovered] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: index * 0.09 },
      "data-ocid": `service-row-${index}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onMouseEnter: () => setHovered(true),
          onMouseLeave: () => setHovered(false),
          style: {
            display: "grid",
            gridTemplateColumns: "4rem 1fr auto",
            gap: "2rem",
            alignItems: "center",
            padding: "2.25rem 0",
            borderBottom: "1px solid #232320",
            borderLeft: hovered ? "2px solid #c9a84c" : "2px solid transparent",
            paddingLeft: hovered ? "1.5rem" : "0",
            cursor: "default",
            transition: "border-color 0.3s, padding-left 0.3s, background 0.3s",
            background: hovered ? "rgba(201,168,76,0.02)" : "transparent"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  fontFamily: "var(--font-body), Arial, sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  color: hovered ? "#c9a84c" : "rgba(201,168,76,0.5)",
                  letterSpacing: "0.12em",
                  transition: "color 0.3s"
                },
                children: svc.num
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  style: {
                    fontFamily: "var(--font-display), 'Palatino Linotype', Georgia, serif",
                    fontWeight: 300,
                    fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)",
                    color: hovered ? "#f0ede8" : "#d8d4ce",
                    letterSpacing: "-0.01em",
                    marginBottom: "0.4rem",
                    transition: "color 0.3s"
                  },
                  children: svc.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontFamily: "var(--font-body), Arial, sans-serif",
                    fontSize: "0.82rem",
                    color: hovered ? "rgba(240,237,232,0.65)" : "rgba(240,237,232,0.45)",
                    lineHeight: 1.65,
                    transition: "color 0.3s"
                  },
                  children: svc.desc
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  width: hovered ? "3rem" : "1.5rem",
                  height: "1px",
                  background: hovered ? "#c9a84c" : "rgba(240,237,232,0.2)",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  flexShrink: 0
                }
              }
            )
          ]
        }
      )
    }
  );
}
function FounderRow({
  imageSrc,
  name,
  title,
  bio,
  quote,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true },
      transition: { duration: 0.75, delay: index * 0.15 },
      style: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "3rem",
        alignItems: "start"
      },
      className: "md:!grid-cols-[2fr_3fr]",
      "data-ocid": `founder-${name.toLowerCase()}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              position: "relative",
              overflow: "hidden",
              aspectRatio: "3/4",
              maxWidth: "340px",
              border: "1px solid rgba(201,168,76,0.15)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: imageSrc,
                  alt: `${name} — ${title}`,
                  style: {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                  },
                  onError: (e) => {
                    const el = e.target;
                    el.style.display = "none";
                    const parent = el.parentElement;
                    if (parent) {
                      parent.style.background = "linear-gradient(135deg, #141414 0%, #1c1a14 100%)";
                      parent.style.display = "flex";
                      parent.style.alignItems = "flex-end";
                      parent.style.justifyContent = "flex-start";
                      parent.style.padding = "1.5rem";
                      const monogram = document.createElement("span");
                      monogram.textContent = name[0];
                      monogram.style.cssText = `
                font-family: 'Cormorant Garamond', Georgia, serif;
                font-size: 5rem;
                font-weight: 300;
                color: rgba(201,168,76,0.3);
                line-height: 1;
              `;
                      parent.appendChild(monogram);
                    }
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 50%)",
                    pointerEvents: "none"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "2rem",
                    height: "1px",
                    background: "#c9a84c"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "1px",
                    height: "2rem",
                    background: "#c9a84c"
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { paddingTop: "1rem" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              style: {
                fontFamily: "var(--font-body), Arial, sans-serif",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#c9a84c",
                marginBottom: "1rem"
              },
              children: title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              style: {
                fontFamily: "var(--font-display), 'Palatino Linotype', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#f0ede8",
                letterSpacing: "-0.02em",
                marginBottom: "1.5rem",
                lineHeight: 1
              },
              children: name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              style: {
                fontFamily: "var(--font-body), -apple-system, Arial, sans-serif",
                fontSize: "0.9rem",
                lineHeight: 1.85,
                color: "rgba(240,237,232,0.65)",
                marginBottom: "2rem",
                maxWidth: "50ch"
              },
              children: bio
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "blockquote",
            {
              style: { borderLeft: "2px solid #c9a84c", paddingLeft: "1.5rem" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  style: {
                    fontFamily: "var(--font-display), 'Palatino Linotype', Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "1.15rem",
                    color: "rgba(240,237,232,0.65)",
                    lineHeight: 1.6
                  },
                  children: [
                    '"',
                    quote,
                    '"'
                  ]
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
export {
  Home as default
};
