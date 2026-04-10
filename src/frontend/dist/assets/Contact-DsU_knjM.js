import { r as reactExports, j as jsxRuntimeExports } from "./index-DzRidtFL.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B9MuBuRd.js";
import { b as useSubmitInquiry } from "./useProjects-vKQGh8lm.js";
import { S as SERVICE_LABELS } from "./index-ZEwy3jUy.js";
import { S as ServiceType } from "./backend-DlF2G3t0.js";
import { m as motion } from "./proxy-BkthkM3Z.js";
import "./index-CPwCoacN.js";
import "./chevron-up-DnP-00qN.js";
import "./createLucideIcon-CojMkoLo.js";
import "./useActor-CcxsRM0y.js";
import "./useMutation-DWs1NcrZ.js";
const SERVICE_OPTIONS = Object.entries(SERVICE_LABELS);
const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  projectDescription: "",
  serviceType: ServiceType.Consultation
};
function validate(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = "Full name is required.";
  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!data.projectDescription.trim())
    errors.projectDescription = "Please describe your project.";
  return errors;
}
const inputBase = {
  background: "transparent",
  border: "none",
  borderBottom: "1px solid #1e1e1e",
  borderRadius: 0,
  color: "#f0ede8",
  fontFamily: "var(--font-body), DM Sans, sans-serif",
  fontSize: "0.9375rem",
  padding: "0.75rem 0",
  width: "100%",
  outline: "none",
  transition: "border-color 0.2s ease"
};
const inputErrorStyle = {
  ...inputBase,
  borderBottom: "1px solid #c0392b"
};
const labelStyle = {
  display: "block",
  fontFamily: "var(--font-body), DM Sans, sans-serif",
  fontSize: "0.6875rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "#c9a84c",
  marginBottom: "0.5rem"
};
function SocialLink({ label }) {
  const [hovered, setHovered] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "a",
    {
      href: "https://d2ustudio.com",
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        fontFamily: "var(--font-body), DM Sans, sans-serif",
        fontSize: "0.75rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: hovered ? "#c9a84c" : "#555",
        textDecoration: "none",
        transition: "color 0.2s ease"
      },
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      children: label
    }
  );
}
function Contact() {
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const [touched, setTouched] = reactExports.useState({});
  const [submitted, setSubmitted] = reactExports.useState(false);
  const { mutate: submitInquiry, isPending } = useSubmitInquiry();
  function handleChange(field, value) {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) {
      setErrors(validate(updated));
    }
  }
  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(form));
  }
  function handleSubmit(e) {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      Object.keys(form).map((k) => [k, true])
    );
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    submitInquiry(form, { onSuccess: () => setSubmitted(true) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { style: { background: "#0a0a0a", minHeight: "100vh" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: { paddingTop: "8rem", paddingBottom: "4rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: { maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label", "data-ocid": "contact-eyebrow", children: "Get in Touch" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "h1",
                  {
                    style: {
                      fontFamily: "var(--font-display), Cormorant Garamond, Georgia, serif",
                      fontWeight: 300,
                      fontSize: "clamp(3rem, 8vw, 6.5rem)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      color: "#f0ede8",
                      marginTop: "1.25rem",
                      marginBottom: 0
                    },
                    children: [
                      "Let’s Build",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      "Something"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.6, delay: 0.5 },
              style: { marginTop: "3rem" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider-line" })
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: { paddingBottom: "6rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: { maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "4rem"
            },
            className: "contact-grid",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, x: -24 },
                  animate: { opacity: 1, x: 0 },
                  transition: {
                    duration: 0.7,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1]
                  },
                  style: { gridColumn: "1" },
                  className: "contact-info-col",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        style: {
                          fontFamily: "var(--font-display), Cormorant Garamond, Georgia, serif",
                          fontWeight: 300,
                          fontSize: "1.5rem",
                          color: "#f0ede8",
                          letterSpacing: "0.02em",
                          marginBottom: "2.5rem"
                        },
                        children: "d2u studio"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "ul",
                      {
                        style: { listStyle: "none", padding: 0, margin: 0 },
                        "data-ocid": "contact-details",
                        children: [
                          {
                            labelText: "Studio",
                            value: "Block 5, Al-Hamra Tower Complex\nKuwait City, Kuwait",
                            isHighlight: false
                          },
                          {
                            labelText: "Phone",
                            value: "+965 2234 5678",
                            isHighlight: true
                          },
                          {
                            labelText: "Email",
                            value: "hello@d2ustudio.com",
                            isHighlight: true
                          },
                          {
                            labelText: "Hours",
                            value: "Mon – Fri, 9am – 6pm",
                            isHighlight: false
                          }
                        ].map(({ labelText, value, isHighlight }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                          i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                height: "1px",
                                background: "#1e1e1e",
                                margin: "1.5rem 0"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              style: {
                                fontFamily: "var(--font-body), DM Sans, sans-serif",
                                fontSize: "0.6875rem",
                                letterSpacing: "0.3em",
                                textTransform: "uppercase",
                                color: isHighlight ? "#c9a84c" : "#555",
                                marginBottom: "0.4rem"
                              },
                              children: labelText
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              style: {
                                fontFamily: "var(--font-body), DM Sans, sans-serif",
                                fontSize: "0.9375rem",
                                color: "#f0ede8",
                                whiteSpace: "pre-line",
                                lineHeight: 1.6
                              },
                              children: value
                            }
                          )
                        ] }, labelText))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          height: "1px",
                          background: "#1e1e1e",
                          margin: "2rem 0"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: "2rem" }, children: ["Instagram", "LinkedIn", "Behance"].map((social) => /* @__PURE__ */ jsxRuntimeExports.jsx(SocialLink, { label: social }, social)) })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, x: 24 },
                  animate: { opacity: 1, x: 0 },
                  transition: {
                    duration: 0.7,
                    delay: 0.35,
                    ease: [0.16, 1, 0.3, 1]
                  },
                  className: "contact-form-col",
                  children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SuccessMessage,
                    {
                      onReset: () => {
                        setSubmitted(false);
                        setForm(EMPTY_FORM);
                        setTouched({});
                      }
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "form",
                    {
                      onSubmit: handleSubmit,
                      noValidate: true,
                      "data-ocid": "contact-form",
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: "2.5rem"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "name", style: labelStyle, children: [
                            "Full Name ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#c0392b" }, children: "*" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "name",
                              "data-ocid": "input-name",
                              placeholder: "e.g. Aisha Rahman",
                              value: form.name,
                              onChange: (e) => handleChange("name", e.target.value),
                              onBlur: () => handleBlur("name"),
                              "aria-invalid": !!errors.name,
                              style: errors.name ? inputErrorStyle : inputBase
                            }
                          ),
                          errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              style: {
                                color: "#c0392b",
                                fontSize: "0.8125rem",
                                marginTop: "0.4rem",
                                fontFamily: "var(--font-body), DM Sans, sans-serif"
                              },
                              children: errors.name
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "email", style: labelStyle, children: [
                            "Email Address ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#c0392b" }, children: "*" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "email",
                              type: "email",
                              "data-ocid": "input-email",
                              placeholder: "you@example.com",
                              value: form.email,
                              onChange: (e) => handleChange("email", e.target.value),
                              onBlur: () => handleBlur("email"),
                              "aria-invalid": !!errors.email,
                              style: errors.email ? inputErrorStyle : inputBase
                            }
                          ),
                          errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              style: {
                                color: "#c0392b",
                                fontSize: "0.8125rem",
                                marginTop: "0.4rem",
                                fontFamily: "var(--font-body), DM Sans, sans-serif"
                              },
                              children: errors.email
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "phone", style: labelStyle, children: [
                            "Phone",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                style: {
                                  color: "#555",
                                  letterSpacing: "0.1em",
                                  textTransform: "none"
                                },
                                children: "(optional)"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "phone",
                              type: "tel",
                              "data-ocid": "input-phone",
                              placeholder: "+965 XXXX XXXX",
                              value: form.phone,
                              onChange: (e) => handleChange("phone", e.target.value),
                              style: inputBase
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "service", style: labelStyle, children: "Service Type" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                borderBottom: "1px solid #1e1e1e",
                                paddingBottom: "0.25rem"
                              },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                Select,
                                {
                                  value: form.serviceType,
                                  onValueChange: (val) => handleChange("serviceType", val),
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      SelectTrigger,
                                      {
                                        id: "service",
                                        "data-ocid": "select-service",
                                        style: {
                                          background: "transparent",
                                          border: "none",
                                          borderRadius: 0,
                                          color: "#f0ede8",
                                          fontFamily: "var(--font-body), DM Sans, sans-serif",
                                          fontSize: "0.9375rem",
                                          padding: "0.5rem 0",
                                          boxShadow: "none"
                                        },
                                        className: "focus:ring-0 focus:ring-offset-0",
                                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a service" })
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      SelectContent,
                                      {
                                        style: {
                                          background: "#111",
                                          border: "1px solid #1e1e1e"
                                        },
                                        children: SERVICE_OPTIONS.map(([type, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          SelectItem,
                                          {
                                            value: type,
                                            "data-ocid": `service-option-${type}`,
                                            style: {
                                              fontFamily: "var(--font-body), DM Sans, sans-serif",
                                              color: "#f0ede8"
                                            },
                                            children: label
                                          },
                                          type
                                        ))
                                      }
                                    )
                                  ]
                                }
                              )
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "description", style: labelStyle, children: [
                            "Project Description",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#c0392b" }, children: "*" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "textarea",
                            {
                              id: "description",
                              "data-ocid": "input-description",
                              placeholder: "Tell us about your space, timeline, budget range, and what you hope to achieve…",
                              rows: 5,
                              value: form.projectDescription,
                              onChange: (e) => handleChange("projectDescription", e.target.value),
                              onBlur: () => handleBlur("projectDescription"),
                              "aria-invalid": !!errors.projectDescription,
                              style: {
                                ...inputBase,
                                resize: "none",
                                borderBottom: errors.projectDescription ? "1px solid #c0392b" : "1px solid #1e1e1e"
                              }
                            }
                          ),
                          errors.projectDescription && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              style: {
                                color: "#c0392b",
                                fontSize: "0.8125rem",
                                marginTop: "0.4rem",
                                fontFamily: "var(--font-body), DM Sans, sans-serif"
                              },
                              children: errors.projectDescription
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "submit",
                            disabled: isPending,
                            "data-ocid": "btn-submit-inquiry",
                            style: {
                              width: "100%",
                              padding: "1rem 0",
                              background: "transparent",
                              border: "1px solid #c9a84c",
                              color: "#c9a84c",
                              fontFamily: "var(--font-body), DM Sans, sans-serif",
                              fontSize: "0.6875rem",
                              letterSpacing: "0.3em",
                              textTransform: "uppercase",
                              cursor: isPending ? "not-allowed" : "pointer",
                              opacity: isPending ? 0.6 : 1,
                              transition: "background 0.25s ease, color 0.25s ease"
                            },
                            onMouseEnter: (e) => {
                              if (!isPending) {
                                e.currentTarget.style.background = "#c9a84c";
                                e.currentTarget.style.color = "#0a0a0a";
                              }
                            },
                            onMouseLeave: (e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "#c9a84c";
                            },
                            children: isPending ? "Sending…" : "Send Inquiry"
                          }
                        )
                      ]
                    }
                  )
                }
              )
            ]
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: { paddingBottom: "6rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: { maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider-line", style: { marginBottom: "4rem" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      fontFamily: "var(--font-display), Cormorant Garamond, Georgia, serif",
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                      color: "#f0ede8",
                      letterSpacing: "0.01em",
                      lineHeight: 1.3,
                      marginBottom: "1.25rem"
                    },
                    children: "“Good design is good business.”"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      fontFamily: "var(--font-body), DM Sans, sans-serif",
                      fontSize: "0.8125rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#555"
                    },
                    children: "Thomas J. Watson Jr. — IBM"
                  }
                )
              ] })
            ]
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @media (min-width: 900px) {
          .contact-grid {
            grid-template-columns: 2fr 3fr !important;
          }
          .contact-info-col {
            grid-column: 1 !important;
          }
          .contact-form-col {
            grid-column: 2 !important;
          }
        }
        input::placeholder,
        textarea::placeholder {
          color: #333;
          font-family: var(--font-body), DM Sans, sans-serif;
        }
        input:focus,
        textarea:focus {
          border-bottom-color: #c9a84c !important;
          outline: none;
        }
      ` })
  ] });
}
function SuccessMessage({ onReset }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
      style: { paddingTop: "2rem" },
      "data-ocid": "contact-success",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            style: {
              fontFamily: "var(--font-display), Cormorant Garamond, Georgia, serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "#f0ede8",
              lineHeight: 1.2,
              marginBottom: "1.5rem"
            },
            children: "Thank you — we’ll be in touch soon."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            style: {
              fontFamily: "var(--font-body), DM Sans, sans-serif",
              fontSize: "0.9375rem",
              color: "#888",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
              maxWidth: "420px"
            },
            children: "Wahid and Jasim will review your inquiry and respond within 1–2 business days."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onReset,
            "data-ocid": "btn-send-another",
            style: {
              padding: "0.875rem 2.5rem",
              background: "transparent",
              border: "1px solid #1e1e1e",
              color: "#f0ede8",
              fontFamily: "var(--font-body), DM Sans, sans-serif",
              fontSize: "0.6875rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "border-color 0.2s ease, color 0.2s ease"
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.borderColor = "#c9a84c";
              e.currentTarget.style.color = "#c9a84c";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.borderColor = "#1e1e1e";
              e.currentTarget.style.color = "#f0ede8";
            },
            children: "Send Another Inquiry"
          }
        )
      ]
    }
  );
}
export {
  Contact as default
};
