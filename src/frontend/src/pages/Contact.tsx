import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "motion/react";
import { useState } from "react";
import { useSubmitInquiry } from "../hooks/useProjects";
import { type InquiryFormData, SERVICE_LABELS, ServiceType } from "../types";

const SERVICE_OPTIONS = Object.entries(SERVICE_LABELS) as [
  ServiceType,
  string,
][];

const EMPTY_FORM: InquiryFormData = {
  name: "",
  email: "",
  phone: "",
  projectDescription: "",
  serviceType: ServiceType.Consultation,
};

interface FormErrors {
  name?: string;
  email?: string;
  projectDescription?: string;
}

function validate(data: InquiryFormData): FormErrors {
  const errors: FormErrors = {};
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

const inputBase: React.CSSProperties = {
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
  transition: "border-color 0.2s ease",
};

const inputErrorStyle: React.CSSProperties = {
  ...inputBase,
  borderBottom: "1px solid #c0392b",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-body), DM Sans, sans-serif",
  fontSize: "0.6875rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  color: "#c9a84c",
  marginBottom: "0.5rem",
};

function SocialLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="https://d2ustudio.com"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: "var(--font-body), DM Sans, sans-serif",
        fontSize: "0.75rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: hovered ? "#c9a84c" : "#555",
        textDecoration: "none",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </a>
  );
}

export default function Contact() {
  const [form, setForm] = useState<InquiryFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof InquiryFormData, boolean>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const { mutate: submitInquiry, isPending } = useSubmitInquiry();

  function handleChange(field: keyof InquiryFormData, value: string) {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) {
      setErrors(validate(updated));
    }
  }

  function handleBlur(field: keyof InquiryFormData) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(form));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      Object.keys(form).map((k) => [k, true]),
    ) as Partial<Record<keyof InquiryFormData, boolean>>;
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    submitInquiry(form, { onSuccess: () => setSubmitted(true) });
  }

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      {/* PAGE HEADER */}
      <section style={{ paddingTop: "8rem", paddingBottom: "4rem" }}>
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-label" data-ocid="contact-eyebrow">
              Get in Touch
            </p>
            <h1
              style={{
                fontFamily:
                  "var(--font-display), Cormorant Garamond, Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "#f0ede8",
                marginTop: "1.25rem",
                marginBottom: 0,
              }}
            >
              Let&rsquo;s Build
              <br />
              Something
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ marginTop: "3rem" }}
          >
            <div className="divider-line" />
          </motion.div>
        </div>
      </section>

      {/* TWO-COLUMN LAYOUT */}
      <section style={{ paddingBottom: "6rem" }}>
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "4rem",
            }}
            className="contact-grid"
          >
            {/* LEFT: Contact Info (40%) */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ gridColumn: "1" }}
              className="contact-info-col"
            >
              <div>
                <p
                  style={{
                    fontFamily:
                      "var(--font-display), Cormorant Garamond, Georgia, serif",
                    fontWeight: 300,
                    fontSize: "1.5rem",
                    color: "#f0ede8",
                    letterSpacing: "0.02em",
                    marginBottom: "2.5rem",
                  }}
                >
                  d2u studio
                </p>

                <ul
                  style={{ listStyle: "none", padding: 0, margin: 0 }}
                  data-ocid="contact-details"
                >
                  {[
                    {
                      labelText: "Studio",
                      value:
                        "Block 5, Al-Hamra Tower Complex\nKuwait City, Kuwait",
                      isHighlight: false,
                    },
                    {
                      labelText: "Phone",
                      value: "+965 2234 5678",
                      isHighlight: true,
                    },
                    {
                      labelText: "Email",
                      value: "hello@d2ustudio.com",
                      isHighlight: true,
                    },
                    {
                      labelText: "Hours",
                      value: "Mon – Fri, 9am – 6pm",
                      isHighlight: false,
                    },
                  ].map(({ labelText, value, isHighlight }, i) => (
                    <li key={labelText}>
                      {i > 0 && (
                        <div
                          style={{
                            height: "1px",
                            background: "#1e1e1e",
                            margin: "1.5rem 0",
                          }}
                        />
                      )}
                      <p
                        style={{
                          fontFamily: "var(--font-body), DM Sans, sans-serif",
                          fontSize: "0.6875rem",
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          color: isHighlight ? "#c9a84c" : "#555",
                          marginBottom: "0.4rem",
                        }}
                      >
                        {labelText}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-body), DM Sans, sans-serif",
                          fontSize: "0.9375rem",
                          color: "#f0ede8",
                          whiteSpace: "pre-line",
                          lineHeight: 1.6,
                        }}
                      >
                        {value}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* Social links */}
                <div
                  style={{
                    height: "1px",
                    background: "#1e1e1e",
                    margin: "2rem 0",
                  }}
                />
                <div style={{ display: "flex", gap: "2rem" }}>
                  {["Instagram", "LinkedIn", "Behance"].map((social) => (
                    <SocialLink key={social} label={social} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Inquiry Form (60%) */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="contact-form-col"
            >
              {submitted ? (
                <SuccessMessage
                  onReset={() => {
                    setSubmitted(false);
                    setForm(EMPTY_FORM);
                    setTouched({});
                  }}
                />
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  data-ocid="contact-form"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2.5rem",
                  }}
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="name" style={labelStyle}>
                      Full Name <span style={{ color: "#c0392b" }}>*</span>
                    </label>
                    <input
                      id="name"
                      data-ocid="input-name"
                      placeholder="e.g. Aisha Rahman"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      aria-invalid={!!errors.name}
                      style={errors.name ? inputErrorStyle : inputBase}
                    />
                    {errors.name && (
                      <p
                        style={{
                          color: "#c0392b",
                          fontSize: "0.8125rem",
                          marginTop: "0.4rem",
                          fontFamily: "var(--font-body), DM Sans, sans-serif",
                        }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" style={labelStyle}>
                      Email Address <span style={{ color: "#c0392b" }}>*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      data-ocid="input-email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      aria-invalid={!!errors.email}
                      style={errors.email ? inputErrorStyle : inputBase}
                    />
                    {errors.email && (
                      <p
                        style={{
                          color: "#c0392b",
                          fontSize: "0.8125rem",
                          marginTop: "0.4rem",
                          fontFamily: "var(--font-body), DM Sans, sans-serif",
                        }}
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" style={labelStyle}>
                      Phone{" "}
                      <span
                        style={{
                          color: "#555",
                          letterSpacing: "0.1em",
                          textTransform: "none",
                        }}
                      >
                        (optional)
                      </span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      data-ocid="input-phone"
                      placeholder="+965 XXXX XXXX"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      style={inputBase}
                    />
                  </div>

                  {/* Service Type */}
                  <div>
                    <label htmlFor="service" style={labelStyle}>
                      Service Type
                    </label>
                    <div
                      style={{
                        borderBottom: "1px solid #1e1e1e",
                        paddingBottom: "0.25rem",
                      }}
                    >
                      <Select
                        value={form.serviceType}
                        onValueChange={(val) =>
                          handleChange("serviceType", val)
                        }
                      >
                        <SelectTrigger
                          id="service"
                          data-ocid="select-service"
                          style={{
                            background: "transparent",
                            border: "none",
                            borderRadius: 0,
                            color: "#f0ede8",
                            fontFamily: "var(--font-body), DM Sans, sans-serif",
                            fontSize: "0.9375rem",
                            padding: "0.5rem 0",
                            boxShadow: "none",
                          }}
                          className="focus:ring-0 focus:ring-offset-0"
                        >
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent
                          style={{
                            background: "#111",
                            border: "1px solid #1e1e1e",
                          }}
                        >
                          {SERVICE_OPTIONS.map(([type, label]) => (
                            <SelectItem
                              key={type}
                              value={type}
                              data-ocid={`service-option-${type}`}
                              style={{
                                fontFamily:
                                  "var(--font-body), DM Sans, sans-serif",
                                color: "#f0ede8",
                              }}
                            >
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label htmlFor="description" style={labelStyle}>
                      Project Description{" "}
                      <span style={{ color: "#c0392b" }}>*</span>
                    </label>
                    <textarea
                      id="description"
                      data-ocid="input-description"
                      placeholder="Tell us about your space, timeline, budget range, and what you hope to achieve…"
                      rows={5}
                      value={form.projectDescription}
                      onChange={(e) =>
                        handleChange("projectDescription", e.target.value)
                      }
                      onBlur={() => handleBlur("projectDescription")}
                      aria-invalid={!!errors.projectDescription}
                      style={{
                        ...inputBase,
                        resize: "none",
                        borderBottom: errors.projectDescription
                          ? "1px solid #c0392b"
                          : "1px solid #1e1e1e",
                      }}
                    />
                    {errors.projectDescription && (
                      <p
                        style={{
                          color: "#c0392b",
                          fontSize: "0.8125rem",
                          marginTop: "0.4rem",
                          fontFamily: "var(--font-body), DM Sans, sans-serif",
                        }}
                      >
                        {errors.projectDescription}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isPending}
                    data-ocid="btn-submit-inquiry"
                    style={{
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
                      transition: "background 0.25s ease, color 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isPending) {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.background = "#c9a84c";
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "#0a0a0a";
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "transparent";
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "#c9a84c";
                    }}
                  >
                    {isPending ? "Sending…" : "Send Inquiry"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ paddingBottom: "6rem" }}>
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="divider-line" style={{ marginBottom: "4rem" }} />
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily:
                    "var(--font-display), Cormorant Garamond, Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                  color: "#f0ede8",
                  letterSpacing: "0.01em",
                  lineHeight: 1.3,
                  marginBottom: "1.25rem",
                }}
              >
                &ldquo;Good design is good business.&rdquo;
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body), DM Sans, sans-serif",
                  fontSize: "0.8125rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#555",
                }}
              >
                Thomas J. Watson Jr. — IBM
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Responsive grid CSS */}
      <style>{`
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
      `}</style>
    </main>
  );
}

function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ paddingTop: "2rem" }}
      data-ocid="contact-success"
    >
      <p
        style={{
          fontFamily: "var(--font-display), Cormorant Garamond, Georgia, serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
          color: "#f0ede8",
          lineHeight: 1.2,
          marginBottom: "1.5rem",
        }}
      >
        Thank you — we&rsquo;ll be in touch soon.
      </p>
      <p
        style={{
          fontFamily: "var(--font-body), DM Sans, sans-serif",
          fontSize: "0.9375rem",
          color: "#888",
          lineHeight: 1.7,
          marginBottom: "2.5rem",
          maxWidth: "420px",
        }}
      >
        Wahid and Jasim will review your inquiry and respond within 1–2 business
        days.
      </p>
      <button
        type="button"
        onClick={onReset}
        data-ocid="btn-send-another"
        style={{
          padding: "0.875rem 2.5rem",
          background: "transparent",
          border: "1px solid #1e1e1e",
          color: "#f0ede8",
          fontFamily: "var(--font-body), DM Sans, sans-serif",
          fontSize: "0.6875rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "border-color 0.2s ease, color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#c9a84c";
          (e.currentTarget as HTMLButtonElement).style.color = "#c9a84c";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#1e1e1e";
          (e.currentTarget as HTMLButtonElement).style.color = "#f0ede8";
        }}
      >
        Send Another Inquiry
      </button>
    </motion.div>
  );
}
