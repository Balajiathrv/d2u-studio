import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-DzRidtFL.js";
import { u as useActor, a as useQuery } from "./useActor-CcxsRM0y.js";
import { c as createActor } from "./backend-DlF2G3t0.js";
import { u as useFeaturedProjects } from "./useProjects-vKQGh8lm.js";
import { C as CATEGORY_LABELS } from "./index-ZEwy3jUy.js";
import { m as motion } from "./proxy-BkthkM3Z.js";
import { u as useInView } from "./use-in-view-B0A-stTm.js";
import "./useMutation-DWs1NcrZ.js";
function HeroSlideshow({ images, parallaxOffset }) {
  const [current, setCurrent] = reactExports.useState(0);
  const [isTransitioning, setIsTransitioning] = reactExports.useState(false);
  const [isPaused, setIsPaused] = reactExports.useState(false);
  const intervalRef = reactExports.useRef(null);
  const count = images.length;
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
        images.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 transition-opacity duration-700 ease-in-out",
            style: {
              opacity: i === current ? 1 : 0,
              zIndex: i === current ? 1 : 0
            },
            "aria-hidden": i !== current,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src,
                alt: `d2u studio — slide ${i + 1}`,
                className: "w-full h-full object-cover",
                style: {
                  transform: `translateY(${parallaxOffset * 0.4}px)`,
                  willChange: "transform",
                  transition: "transform 0.05s linear"
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
            className: "absolute inset-x-0 bottom-0 z-[2] pointer-events-none",
            style: {
              height: "55%",
              background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2",
            role: "tablist",
            "aria-label": "Slide indicators",
            children: images.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => goTo(i),
                role: "tab",
                "aria-selected": i === current,
                "aria-label": `Go to slide ${i + 1}`,
                "data-ocid": `hero-dot-${i}`,
                className: `rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-primary-foreground/40 hover:bg-primary-foreground/70"}`
              },
              src
            ))
          }
        )
      ]
    }
  );
}
const DEFAULT_HERO_IMAGES = [
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=80"
];
function useHeroImages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["heroImages"],
    queryFn: async () => {
      if (!actor) return DEFAULT_HERO_IMAGES;
      const images = await actor.getHeroImages();
      return images.length > 0 ? images : DEFAULT_HERO_IMAGES;
    },
    enabled: !!actor && !isFetching,
    placeholderData: DEFAULT_HERO_IMAGES,
    staleTime: 1e3 * 60 * 5
  });
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
function useParallax(factor = 0.3) {
  const ref = reactExports.useRef(null);
  const [offset, setOffset] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;
    const el = ref.current;
    if (!el) return;
    let rafId;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        setOffset(center * factor);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [factor]);
  return { ref, offset };
}
const STATS = [
  { value: 120, suffix: "+", label: "Projects" },
  { value: 12, suffix: "", label: "Years" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 4, suffix: "", label: "Awards" }
];
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
    category: "Interior",
    description: "A serene family home in Kuwait City with considered materiality throughout.",
    imageUrls: ["/assets/generated/hero-interior.dim_1400x900.jpg"],
    scope: "Full Interior Design",
    materials: [],
    outcomes: "",
    featured: true
  },
  {
    id: 2n,
    title: "Seef District Office",
    category: "Architectural",
    description: "A contemporary commercial space shaped by the logic of light.",
    imageUrls: ["/assets/generated/hero-interior.dim_1400x900.jpg"],
    scope: "Architectural Design & Fit-out",
    materials: [],
    outcomes: "",
    featured: true
  },
  {
    id: 3n,
    title: "Marina Penthouse",
    category: "Interior",
    description: "Luxury penthouse with panoramic skyline views and restrained palette.",
    imageUrls: ["/assets/generated/hero-interior.dim_1400x900.jpg"],
    scope: "Space Planning & Interior",
    materials: [],
    outcomes: "",
    featured: true
  },
  {
    id: 4n,
    title: "Salmiya Cultural Centre",
    category: "Architectural",
    description: "A civic anchor designed around community gathering and natural ventilation.",
    imageUrls: ["/assets/generated/hero-interior.dim_1400x900.jpg"],
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
        fontFamily: "var(--font-body)",
        fontSize: "0.65rem",
        letterSpacing: "0.22em",
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
  const displayProjects = featured && featured.length > 0 ? featured : PLACEHOLDER_PROJECTS;
  const heroParallax = useParallax(0.4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "#0a0a0a", color: "#f0ede8" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        ref: heroParallax.ref,
        style: {
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden"
        },
        "data-ocid": "hero-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            HeroSlideshow,
            {
              images: heroImages,
              parallaxOffset: heroParallax.offset
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              style: {
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 2,
                background: "linear-gradient(to top left, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.35) 40%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                position: "relative",
                zIndex: 3,
                width: "100%",
                paddingBottom: "clamp(4rem, 8vh, 7rem)",
                paddingLeft: "clamp(1.5rem, 6vw, 6rem)",
                paddingRight: "clamp(1.5rem, 6vw, 6rem)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.h1,
                  {
                    initial: { opacity: 0, y: 48 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
                    style: {
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
                      lineHeight: 0.9,
                      letterSpacing: "-0.02em",
                      color: "#f0ede8",
                      marginBottom: "1.5rem",
                      maxWidth: "18ch"
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
                  motion.p,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.7, delay: 0.7 },
                    style: {
                      fontFamily: "var(--font-body)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "rgba(240,237,232,0.55)"
                    },
                    "data-ocid": "hero-sub",
                    children: "D2U STUDIO — Architecture & Interior Design"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 1.4, duration: 0.8 },
              style: {
                position: "absolute",
                bottom: "2.5rem",
                right: "2.5rem",
                zIndex: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem"
              },
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(240,237,232,0.35)",
                      writingMode: "vertical-rl"
                    },
                    children: "Scroll"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: "1px",
                      height: "4rem",
                      background: "rgba(240,237,232,0.2)"
                    }
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
          background: "#0a0a0a",
          padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 6vw, 6rem)"
        },
        "data-ocid": "studio-statement",
        children: [
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
                    initial: { opacity: 0, y: 36 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                    style: {
                      fontFamily: "var(--font-display)",
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
                      "transcend the ordinary."
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { duration: 0.7, delay: 0.2 },
                    style: { maxWidth: "38ch", marginLeft: "auto" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        style: {
                          fontFamily: "var(--font-body)",
                          fontSize: "0.9rem",
                          lineHeight: 1.85,
                          color: "rgba(240,237,232,0.55)",
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
                background: "rgba(240,237,232,0.08)"
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        style: { background: "#0a0a0a", padding: "clamp(4rem, 10vh, 7rem) 0" },
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
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Selected Work" }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                padding: "0 clamp(1.5rem, 6vw, 6rem)",
                display: "grid",
                gridTemplateColumns: "8rem 1fr",
                gap: "2rem",
                marginBottom: "1rem"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(240,237,232,0.3)"
                    },
                    children: "Index"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(240,237,232,0.3)"
                    },
                    children: "Project"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                height: "1px",
                background: "rgba(240,237,232,0.08)",
                marginBottom: "0"
              }
            }
          ),
          isLoading ? ["sk-a", "sk-b", "sk-c"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                height: "200px",
                borderBottom: "1px solid rgba(240,237,232,0.08)",
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
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
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
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#f0ede8",
                    border: "1px solid rgba(240,237,232,0.2)",
                    padding: "0.85rem 2rem",
                    display: "inline-block",
                    textDecoration: "none",
                    transition: "border-color 0.3s, color 0.3s"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.borderColor = "#c9a84c";
                    e.currentTarget.style.color = "#c9a84c";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.borderColor = "rgba(240,237,232,0.2)";
                    e.currentTarget.style.color = "#f0ede8";
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        style: {
          background: "#0a0a0a",
          padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 6vw, 6rem)",
          borderTop: "1px solid rgba(240,237,232,0.08)",
          borderBottom: "1px solid rgba(240,237,232,0.08)"
        },
        "data-ocid": "stats-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "3rem 2rem"
            },
            className: "md:!grid-cols-4",
            children: STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 24 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.6, delay: i * 0.1 },
                "data-ocid": `stat-${i}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        fontFamily: "var(--font-display)",
                        fontWeight: 300,
                        fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
                        lineHeight: 1,
                        color: "#f0ede8",
                        marginBottom: "0.75rem"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { target: stat.value, suffix: stat.suffix })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        width: "2rem",
                        height: "1px",
                        background: "#c9a84c",
                        marginBottom: "0.75rem"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        fontFamily: "var(--font-body)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(240,237,232,0.4)"
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
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        style: {
          background: "#0a0a0a",
          padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 6vw, 6rem)"
        },
        "data-ocid": "services-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Our Services" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                height: "1px",
                background: "rgba(240,237,232,0.08)",
                marginBottom: "0"
              }
            }
          ),
          SERVICES.map((svc, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceRow, { svc, index: i }, svc.num)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: 0.3 },
              style: { marginTop: "3.5rem" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/services",
                  style: {
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#f0ede8",
                    border: "1px solid rgba(240,237,232,0.2)",
                    padding: "0.85rem 2rem",
                    display: "inline-block",
                    textDecoration: "none",
                    transition: "border-color 0.3s, color 0.3s"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.borderColor = "#c9a84c";
                    e.currentTarget.style.color = "#c9a84c";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.borderColor = "rgba(240,237,232,0.2)";
                    e.currentTarget.style.color = "#f0ede8";
                  },
                  "data-ocid": "explore-services-link",
                  children: "Explore Services"
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
          background: "#0a0a0a",
          padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 6vw, 6rem)",
          borderTop: "1px solid rgba(240,237,232,0.08)"
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
                background: "rgba(240,237,232,0.08)",
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
          background: "#0a0a0a",
          padding: "clamp(6rem, 14vh, 11rem) clamp(1.5rem, 6vw, 6rem)",
          borderTop: "1px solid rgba(240,237,232,0.08)",
          textAlign: "center"
        },
        "data-ocid": "cta-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.h2,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              style: {
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(3rem, 7vw, 6.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                color: "#f0ede8",
                marginBottom: "2rem"
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
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.6, delay: 0.2 },
              style: {
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(240,237,232,0.4)",
                marginBottom: "3rem"
              },
              children: "Tell us about your project"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: 0.35 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/contact",
                  style: {
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#0a0a0a",
                    background: "#c9a84c",
                    padding: "1rem 3rem",
                    display: "inline-block",
                    textDecoration: "none",
                    transition: "background 0.3s, transform 0.3s"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.background = "#b8953f";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.background = "#c9a84c";
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
  const num = `P.${String(index + 1).padStart(2, "0")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
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
                display: "grid",
                gridTemplateColumns: "8rem 1fr",
                gap: "2rem",
                alignItems: "center",
                padding: "clamp(1.5rem, 3vh, 2.5rem) clamp(1.5rem, 6vw, 6rem)",
                borderBottom: "1px solid rgba(240,237,232,0.08)",
                cursor: "pointer",
                transition: "background 0.3s",
                background: hovered ? "rgba(240,237,232,0.02)" : "transparent"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontFamily: "var(--font-display)",
                      fontWeight: 300,
                      fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                      color: hovered ? "#c9a84c" : "rgba(240,237,232,0.2)",
                      transition: "color 0.3s",
                      letterSpacing: "0.02em"
                    },
                    children: num
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "2rem",
                      overflow: "hidden"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            style: {
                              fontFamily: "var(--font-body)",
                              fontSize: "0.6rem",
                              letterSpacing: "0.2em",
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
                              fontFamily: "var(--font-display)",
                              fontWeight: 300,
                              fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
                              color: "#f0ede8",
                              letterSpacing: "-0.01em",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis"
                            },
                            children: project.title
                          }
                        ),
                        project.scope && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            style: {
                              fontFamily: "var(--font-body)",
                              fontSize: "0.75rem",
                              color: "rgba(240,237,232,0.35)",
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
                            opacity: hovered ? 1 : 0.6,
                            transition: "opacity 0.4s"
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
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
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
            padding: "2rem 0",
            borderBottom: "1px solid rgba(240,237,232,0.08)",
            cursor: "default",
            transition: "background 0.3s"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  color: hovered ? "#c9a84c" : "rgba(240,237,232,0.25)",
                  letterSpacing: "0.1em",
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
                    fontFamily: "var(--font-display)",
                    fontWeight: 300,
                    fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)",
                    color: "#f0ede8",
                    letterSpacing: "-0.01em",
                    marginBottom: "0.35rem"
                  },
                  children: svc.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    color: "rgba(240,237,232,0.4)",
                    lineHeight: 1.65
                  },
                  children: svc.desc
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  width: "2rem",
                  height: "1px",
                  background: hovered ? "#c9a84c" : "rgba(240,237,232,0.15)",
                  transition: "background 0.3s, width 0.3s",
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
      initial: { opacity: 0, y: 32 },
      whileInView: { opacity: 1, y: 0 },
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
              maxWidth: "340px"
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
                    e.target.style.background = "rgba(201,168,76,0.08)";
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(10,10,10,0.4) 0%, transparent 50%)",
                    pointerEvents: "none"
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
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
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
                fontFamily: "var(--font-display)",
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
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                lineHeight: 1.85,
                color: "rgba(240,237,232,0.55)",
                marginBottom: "2rem",
                maxWidth: "50ch"
              },
              children: bio
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "blockquote",
            {
              style: { borderLeft: "1px solid #c9a84c", paddingLeft: "1.25rem" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  style: {
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "1.1rem",
                    color: "rgba(240,237,232,0.5)",
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
