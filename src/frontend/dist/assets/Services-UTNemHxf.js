import { j as jsxRuntimeExports, L as Link } from "./index-DzRidtFL.js";
import { S as ServiceType } from "./backend-DlF2G3t0.js";
import { m as motion } from "./proxy-BkthkM3Z.js";
const GOLD = "#c9a84c";
const BG = "#0a0a0a";
const FG = "#f0ede8";
const MUTED = "#6b6760";
const DIVIDER = "#1e1e1e";
const services = [
  {
    id: ServiceType.Interior,
    index: "01",
    label: "Interior Design",
    tagline: "Spaces that reflect who you are",
    description: [
      "We craft residential and commercial interiors that balance beauty with everyday function. Every space we design begins with understanding how you live, work, and feel — then translating that into a curated environment that resonates.",
      "From material palettes and bespoke furniture specifications to layered lighting and finishing details, our process is thorough and deeply personal. We source locally and globally, selecting pieces that stand the test of time rather than chase trends."
    ],
    steps: [
      {
        number: "01",
        title: "Concept Brief",
        description: "Deep-dive discovery session to align on your vision, lifestyle needs, and aesthetic preferences."
      },
      {
        number: "02",
        title: "Mood Boards & Direction",
        description: "Visual storytelling through curated mood boards, material references, and colour studies."
      },
      {
        number: "03",
        title: "3D Visualisation",
        description: "Photorealistic renders that let you experience your space before a single item is purchased."
      },
      {
        number: "04",
        title: "Procurement & Coordination",
        description: "End-to-end management of sourcing, ordering, and scheduling deliveries with precision."
      },
      {
        number: "05",
        title: "Installation & Reveal",
        description: "Supervised installation and final styling — we don't leave until every detail is perfect."
      }
    ],
    benefits: [
      "Cohesive design language across every room and surface",
      "Access to trade-only materials, furniture, and lighting",
      "Increased property value through intentional design",
      "Reduced decision fatigue with expert-led curation"
    ]
  },
  {
    id: ServiceType.Architectural,
    index: "02",
    label: "Architectural Design",
    tagline: "Form, structure, and lasting impact",
    description: [
      "Great architecture is more than structure — it's a statement of intent. Our architectural services span residential, commercial, and mixed-use projects, with a focus on spatial intelligence, facade character, and sustainable performance.",
      "We guide you through the full lifecycle of a project, from early feasibility and regulatory approvals to construction documentation and site supervision. Every decision is grounded in both technical rigour and design ambition."
    ],
    steps: [
      {
        number: "01",
        title: "Feasibility Study",
        description: "Site analysis, regulatory review, and initial massing studies to define what's possible."
      },
      {
        number: "02",
        title: "Schematic Design",
        description: "Conceptual floor plans, section sketches, and facade explorations to establish the design direction."
      },
      {
        number: "03",
        title: "Design Development",
        description: "Refined drawings, material specifications, structural coordination, and permit preparation."
      },
      {
        number: "04",
        title: "Construction Documents",
        description: "Comprehensive technical drawing package for contractor tendering and municipal approval."
      },
      {
        number: "05",
        title: "Site Supervision",
        description: "Regular site visits, contractor coordination, and quality assurance through to handover."
      }
    ],
    benefits: [
      "Permit-ready documentation that avoids costly delays",
      "Sustainable design principles that reduce running costs",
      "Distinctive facades that elevate neighbourhood context",
      "Full continuity from concept through to construction"
    ]
  },
  {
    id: ServiceType.SpacePlanning,
    index: "03",
    label: "Space Planning",
    tagline: "Every square metre earning its place",
    description: [
      "A well-planned space performs better than a beautiful one — ideally, it achieves both. Our space planning service focuses on optimising existing footprints to improve how people move, gather, and work within them.",
      "We analyse traffic flow, natural light, and zoning to develop open-plan configurations that feel both efficient and inviting. This service is particularly valuable for commercial fit-outs, home reconfigurations, and offices preparing for hybrid working patterns."
    ],
    steps: [
      {
        number: "01",
        title: "Space Audit",
        description: "Measured survey, occupancy review, and pain-point analysis of your current layout."
      },
      {
        number: "02",
        title: "Layout Concepts",
        description: "Multiple spatial configurations tested against your brief and workflow requirements."
      },
      {
        number: "03",
        title: "3D Planning Models",
        description: "Digital walkthroughs that reveal how the space will feel before any work begins."
      },
      {
        number: "04",
        title: "FF&E Integration",
        description: "Furniture, fixture, and equipment schedules coordinated directly into the spatial plan."
      },
      {
        number: "05",
        title: "Handover Package",
        description: "Final layout drawings and specifications ready for contractor or fit-out teams."
      }
    ],
    benefits: [
      "Maximised usable area without structural changes",
      "Improved natural light and ventilation through smart zoning",
      "Reduced operational friction through intuitive flow",
      "Scalable layouts that adapt to future changes in use"
    ]
  },
  {
    id: ServiceType.Renovation,
    index: "04",
    label: "Renovation",
    tagline: "Breathing new life into existing structures",
    description: [
      "Renovation is as much about respect as it is about reinvention. Whether we're undertaking a full-scale transformation or a targeted modern upgrade, we approach every project with sensitivity to what's worth preserving and what needs to evolve.",
      "Our renovation projects are managed in structured phases to minimise disruption, and every scope of works is developed collaboratively so you remain in control of decisions, budget, and timeline throughout."
    ],
    steps: [
      {
        number: "01",
        title: "Condition Assessment",
        description: "On-site inspection to document existing conditions, identify issues, and establish baseline scope."
      },
      {
        number: "02",
        title: "Scope of Works",
        description: "Detailed brief defining what will be removed, retained, repaired, and replaced."
      },
      {
        number: "03",
        title: "Material Selection",
        description: "Curated finishes, fixtures, and materials that honour the existing fabric while elevating it."
      },
      {
        number: "04",
        title: "Phased Delivery",
        description: "Structured project phasing to minimise disruption and enable partial occupancy if needed."
      },
      {
        number: "05",
        title: "Final Inspection",
        description: "Comprehensive walkthrough, snag resolution, and formal handover with maintenance guidelines."
      }
    ],
    benefits: [
      "Preserved heritage fabric with modern performance standards",
      "Phased delivery that reduces downtime and disruption",
      "Transparent scope and budget tracking throughout",
      "Long-term maintenance plans included at handover"
    ]
  },
  {
    id: ServiceType.Consultation,
    index: "05",
    label: "Design Consultation",
    tagline: "Clarity before commitment",
    description: [
      "Not every project requires a full design engagement. Our consultation service gives you direct access to our senior designers for focused, actionable guidance — whether you're reviewing a builder's proposal, selecting materials, or troubleshooting a stalled project.",
      "In a single session or a short series of workshops, we can help you make confident decisions, avoid costly mistakes, and understand what's truly possible within your brief and budget."
    ],
    steps: [
      {
        number: "01",
        title: "Pre-Session Brief",
        description: "You share plans, photos, references, and questions in advance so we can prepare meaningfully."
      },
      {
        number: "02",
        title: "Design Review Session",
        description: "Structured conversation reviewing your project with expert commentary and recommendations."
      },
      {
        number: "03",
        title: "Options Analysis",
        description: "We present alternatives and help you weigh trade-offs across budget, aesthetic, and programme."
      },
      {
        number: "04",
        title: "Written Summary",
        description: "Post-session notes capturing key decisions, recommendations, and next steps for your records."
      },
      {
        number: "05",
        title: "Follow-Up Support",
        description: "Optional follow-up session or email Q&A to address anything that arises after the meeting."
      }
    ],
    benefits: [
      "Expert guidance without a full-project commitment",
      "Avoid costly design or construction mistakes early",
      "Clear brief and direction before engaging contractors",
      "Flexible format — in-person or remote sessions available"
    ]
  }
];
function ServiceSection({
  service,
  idx
}) {
  const isEven = idx % 2 === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      id: service.id,
      initial: { opacity: 0, y: 48 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "1px", background: DIVIDER } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: BG,
              paddingTop: "5rem",
              paddingBottom: "5rem"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: { maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "grid",
                        gridTemplateColumns: "7rem 1fr",
                        gap: "2rem",
                        alignItems: "flex-start",
                        marginBottom: "3rem"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              fontFamily: "'Cormorant Garamond', serif",
                              fontSize: "clamp(3rem, 6vw, 5rem)",
                              fontStyle: "italic",
                              fontWeight: 300,
                              color: GOLD,
                              lineHeight: 1,
                              display: "block"
                            },
                            children: service.index
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "h2",
                            {
                              style: {
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                                fontWeight: 300,
                                color: FG,
                                lineHeight: 1.1,
                                marginBottom: "0.5rem",
                                letterSpacing: "-0.01em"
                              },
                              children: service.label
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              style: {
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "0.875rem",
                                color: MUTED,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                fontWeight: 400
                              },
                              children: service.tagline
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "grid",
                        gridTemplateColumns: isEven ? "1fr 1fr" : "1fr 1fr",
                        gap: "5rem",
                        alignItems: "flex-start"
                      },
                      className: "services-grid",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { order: isEven ? 0 : 1 }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginBottom: "2.5rem" }, children: service.description.map((para) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              style: {
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "1rem",
                                color: "#a09c97",
                                lineHeight: 1.85,
                                marginBottom: "1.25rem"
                              },
                              children: para
                            },
                            para.slice(0, 40)
                          )) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                style: {
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontSize: "0.7rem",
                                  letterSpacing: "0.14em",
                                  textTransform: "uppercase",
                                  color: GOLD,
                                  marginBottom: "1.25rem",
                                  fontWeight: 500
                                },
                                children: "What you gain"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: { listStyle: "none", padding: 0, margin: 0 }, children: service.benefits.map((benefit, benefitIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "li",
                              {
                                style: {
                                  display: "flex",
                                  alignItems: "baseline",
                                  gap: "0.75rem",
                                  paddingTop: "0.75rem",
                                  paddingBottom: "0.75rem",
                                  borderBottom: benefitIdx < service.benefits.length - 1 ? `1px solid ${DIVIDER}` : "none",
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontSize: "0.875rem",
                                  color: FG,
                                  lineHeight: 1.6
                                },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      style: {
                                        color: GOLD,
                                        flexShrink: 0,
                                        fontSize: "0.75rem"
                                      },
                                      children: "—"
                                    }
                                  ),
                                  benefit
                                ]
                              },
                              benefit
                            )) })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { order: isEven ? 1 : 0 }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              style: {
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "0.7rem",
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: GOLD,
                                marginBottom: "1.5rem",
                                fontWeight: 500
                              },
                              children: "Our Process"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { style: { listStyle: "none", padding: 0, margin: 0 }, children: service.steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "li",
                            {
                              style: {
                                display: "grid",
                                gridTemplateColumns: "3rem 1fr",
                                gap: "1rem",
                                paddingTop: "1.25rem",
                                paddingBottom: "1.25rem",
                                borderBottom: i < service.steps.length - 1 ? `1px solid ${DIVIDER}` : "none"
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    style: {
                                      fontFamily: "'Cormorant Garamond', serif",
                                      fontStyle: "italic",
                                      fontSize: "1.1rem",
                                      color: GOLD,
                                      opacity: 0.7,
                                      lineHeight: 1.4,
                                      fontWeight: 400
                                    },
                                    children: step.number
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "p",
                                    {
                                      style: {
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: "0.875rem",
                                        fontWeight: 500,
                                        color: FG,
                                        marginBottom: "0.25rem"
                                      },
                                      children: step.title
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "p",
                                    {
                                      style: {
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: "0.8rem",
                                        color: MUTED,
                                        lineHeight: 1.7
                                      },
                                      children: step.description
                                    }
                                  )
                                ] })
                              ]
                            },
                            step.number
                          )) })
                        ] })
                      ]
                    }
                  )
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function Services() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: BG, minHeight: "100vh" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        style: { background: BG, paddingTop: "8rem", paddingBottom: "4rem" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: { maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        style: {
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.7rem",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: GOLD,
                          marginBottom: "1.5rem",
                          fontWeight: 500
                        },
                        children: "What We Do"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h1",
                      {
                        style: {
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
                          fontWeight: 300,
                          color: FG,
                          lineHeight: 1,
                          letterSpacing: "-0.02em",
                          marginBottom: "2rem"
                        },
                        children: "Our Services"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        style: {
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "1rem",
                          color: MUTED,
                          lineHeight: 1.8,
                          maxWidth: "520px",
                          marginLeft: "auto",
                          textAlign: "right"
                        },
                        className: "services-intro",
                        children: "From concept to completion, d2u studio delivers considered design across five core disciplines — each grounded in craft, detail, and a genuine understanding of how people inhabit space."
                      }
                    )
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: { marginTop: "3.5rem", height: "1px", background: DIVIDER }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.nav,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] },
              style: {
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "2rem 2rem 0"
              },
              "aria-label": "Jump to service",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "0" }, children: services.map((service, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `#${service.id}`,
                  "data-ocid": `service-nav-${service.id}`,
                  onClick: (e) => {
                    var _a;
                    e.preventDefault();
                    (_a = document.getElementById(service.id)) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                  },
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.5rem 0",
                    marginRight: i < services.length - 1 ? "2.5rem" : 0,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    letterSpacing: "0.06em",
                    color: MUTED,
                    textDecoration: "none",
                    textTransform: "uppercase",
                    transition: "color 0.2s ease",
                    borderBottom: "1px solid transparent"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.color = FG;
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.color = MUTED;
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontFamily: "'Cormorant Garamond', serif",
                          fontStyle: "italic",
                          fontSize: "0.9rem",
                          color: GOLD,
                          opacity: 0.7
                        },
                        children: service.index
                      }
                    ),
                    service.label
                  ]
                },
                service.id
              )) })
            }
          )
        ]
      }
    ),
    services.map((service, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceSection, { service, idx }, service.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "1px", background: DIVIDER } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: { background: BG, padding: "6rem 2rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        style: { maxWidth: "700px", margin: "0 auto", textAlign: "center" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              style: {
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: GOLD,
                marginBottom: "1.5rem",
                fontWeight: 500
              },
              children: "Ready to Begin?"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "h2",
            {
              style: {
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 300,
                color: FG,
                lineHeight: 1.15,
                marginBottom: "1.5rem",
                letterSpacing: "-0.01em"
              },
              children: [
                "Let's build something",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("em", { style: { fontStyle: "italic", color: GOLD }, children: "remarkable" }),
                " ",
                "together"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              style: {
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.95rem",
                color: MUTED,
                lineHeight: 1.8,
                marginBottom: "2.5rem"
              },
              children: "Tell us about your project and we'll respond within 24 hours. No obligation — just a conversation about what's possible."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/contact",
              "data-ocid": "services-bottom-cta",
              style: {
                display: "inline-block",
                padding: "0.875rem 2.5rem",
                border: `1px solid ${GOLD}`,
                color: GOLD,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 500,
                transition: "all 0.25s ease",
                background: "transparent"
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.background = GOLD;
                e.currentTarget.style.color = BG;
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = GOLD;
              },
              children: "Get In Touch"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .services-grid > div {
            order: unset !important;
          }
          .services-intro {
            text-align: left !important;
            margin-left: 0 !important;
          }
        }
      ` })
  ] });
}
export {
  Services as default
};
