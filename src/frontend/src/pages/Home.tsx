import { Link } from "@tanstack/react-router";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { HeroSlideshow } from "../components/HeroSlideshow";
import { useHeroImages } from "../hooks/useHeroImages";
import { useFeaturedProjects } from "../hooks/useProjects";
import { CATEGORY_LABELS, type Project, type ProjectCategory } from "../types";

// ── Animated count-up ──────────────────────────────────────────────────────
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!inView) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setCount(target);
      return;
    }
    let start = 0;
    const duration = 1600;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ── Parallax hook ──────────────────────────────────────────────────────────
function useParallax(factor = 0.3) {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;
    const el = ref.current;
    if (!el) return;
    let rafId: number;
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

// ── Data ───────────────────────────────────────────────────────────────────
const STATS = [
  { value: 120, suffix: "+", label: "Projects" },
  { value: 12, suffix: "", label: "Years" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 4, suffix: "", label: "Awards" },
];

const SERVICES = [
  {
    num: "01",
    title: "Interior Design",
    desc: "Materiality, proportion, and light — crafted into spaces that endure.",
  },
  {
    num: "02",
    title: "Architectural Design",
    desc: "From concept through construction documents, built with precision.",
  },
  {
    num: "03",
    title: "Space Planning",
    desc: "Strategic layouts that maximise flow, function, and human comfort.",
  },
  {
    num: "04",
    title: "Renovation",
    desc: "Transformative work that honours character while elevating every detail.",
  },
];

const PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: 1n,
    title: "Al Baraka Residence",
    category: "Interior" as unknown as ProjectCategory,
    description:
      "A serene family home in Kuwait City with considered materiality throughout.",
    imageUrls: ["/assets/generated/hero-interior.dim_1400x900.jpg"],
    scope: "Full Interior Design",
    materials: [],
    outcomes: "",
    featured: true,
  },
  {
    id: 2n,
    title: "Seef District Office",
    category: "Architectural" as unknown as ProjectCategory,
    description:
      "A contemporary commercial space shaped by the logic of light.",
    imageUrls: ["/assets/generated/hero-interior.dim_1400x900.jpg"],
    scope: "Architectural Design & Fit-out",
    materials: [],
    outcomes: "",
    featured: true,
  },
  {
    id: 3n,
    title: "Marina Penthouse",
    category: "Interior" as unknown as ProjectCategory,
    description:
      "Luxury penthouse with panoramic skyline views and restrained palette.",
    imageUrls: ["/assets/generated/hero-interior.dim_1400x900.jpg"],
    scope: "Space Planning & Interior",
    materials: [],
    outcomes: "",
    featured: true,
  },
  {
    id: 4n,
    title: "Salmiya Cultural Centre",
    category: "Architectural" as unknown as ProjectCategory,
    description:
      "A civic anchor designed around community gathering and natural ventilation.",
    imageUrls: ["/assets/generated/hero-interior.dim_1400x900.jpg"],
    scope: "Architectural Design",
    materials: [],
    outcomes: "",
    featured: true,
  },
];

// ── Section Label ──────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        color: "#c9a84c",
        fontFamily: "var(--font-body)",
        fontSize: "0.65rem",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        marginBottom: "1.25rem",
      }}
    >
      {children}
    </motion.p>
  );
}

// ── Home Page ──────────────────────────────────────────────────────────────
export default function Home() {
  const { data: featured, isLoading } = useFeaturedProjects();
  const { data: heroImages = [] } = useHeroImages();
  const displayProjects =
    featured && featured.length > 0 ? featured : PLACEHOLDER_PROJECTS;
  const heroParallax = useParallax(0.4);

  return (
    <div style={{ background: "#0a0a0a", color: "#f0ede8" }}>
      {/* ── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section
        ref={heroParallax.ref as React.RefObject<HTMLElement>}
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
        data-ocid="hero-section"
      >
        <HeroSlideshow
          images={heroImages}
          parallaxOffset={heroParallax.offset}
        />

        {/* Bottom-right gradient ONLY — no full overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 2,
            background:
              "linear-gradient(to top left, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.35) 40%, transparent 70%)",
          }}
        />

        {/* Hero text */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            width: "100%",
            paddingBottom: "clamp(4rem, 8vh, 7rem)",
            paddingLeft: "clamp(1.5rem, 6vw, 6rem)",
            paddingRight: "clamp(1.5rem, 6vw, 6rem)",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              color: "#f0ede8",
              marginBottom: "1.5rem",
              maxWidth: "18ch",
            }}
            data-ocid="hero-heading"
          >
            Space. <br />
            Form. <br />
            Vision.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(240,237,232,0.55)",
            }}
            data-ocid="hero-sub"
          >
            D2U STUDIO — Architecture &amp; Interior Design
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{
            position: "absolute",
            bottom: "2.5rem",
            right: "2.5rem",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(240,237,232,0.35)",
              writingMode: "vertical-rl",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "4rem",
              background: "rgba(240,237,232,0.2)",
            }}
          />
        </motion.div>
      </section>

      {/* ── SECTION 2: STUDIO STATEMENT ─────────────────────────────────── */}
      <section
        style={{
          background: "#0a0a0a",
          padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 6vw, 6rem)",
        }}
        data-ocid="studio-statement"
      >
        <SectionLabel>The Studio</SectionLabel>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "end",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(2.8rem, 6.5vw, 6.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "#f0ede8",
              maxWidth: "22ch",
            }}
            data-ocid="statement-heading"
          >
            We design spaces that
            <br />
            transcend the ordinary.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ maxWidth: "38ch", marginLeft: "auto" }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                lineHeight: 1.85,
                color: "rgba(240,237,232,0.55)",
                textAlign: "right",
              }}
            >
              D2U Studio is an architecture and interior design practice founded
              on the belief that every space has the potential to elevate the
              lives of those within it. Working across Kuwait and the Gulf, we
              bring rigorous thinking and refined craft to each project — from
              intimate residences to civic institutions.
            </p>
          </motion.div>
        </div>
        <div
          style={{
            marginTop: "5rem",
            height: "1px",
            background: "rgba(240,237,232,0.08)",
          }}
        />
      </section>

      {/* ── SECTION 3: FEATURED PROJECTS ────────────────────────────────── */}
      <section
        style={{ background: "#0a0a0a", padding: "clamp(4rem, 10vh, 7rem) 0" }}
        data-ocid="featured-projects"
      >
        <div
          style={{
            padding: "0 clamp(1.5rem, 6vw, 6rem)",
            marginBottom: "3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <SectionLabel>Selected Work</SectionLabel>
          </div>
        </div>

        {/* Column headers */}
        <div
          style={{
            padding: "0 clamp(1.5rem, 6vw, 6rem)",
            display: "grid",
            gridTemplateColumns: "8rem 1fr",
            gap: "2rem",
            marginBottom: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(240,237,232,0.3)",
            }}
          >
            Index
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(240,237,232,0.3)",
            }}
          >
            Project
          </span>
        </div>

        <div
          style={{
            height: "1px",
            background: "rgba(240,237,232,0.08)",
            marginBottom: "0",
          }}
        />

        {isLoading
          ? ["sk-a", "sk-b", "sk-c"].map((id) => (
              <div
                key={id}
                style={{
                  height: "200px",
                  borderBottom: "1px solid rgba(240,237,232,0.08)",
                  background: "rgba(240,237,232,0.02)",
                }}
              />
            ))
          : displayProjects.map((project, i) => (
              <ProjectRow
                key={project.id.toString()}
                project={project}
                index={i}
              />
            ))}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            padding: "3rem clamp(1.5rem, 6vw, 6rem) 0",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link
            to="/projects"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#f0ede8",
              border: "1px solid rgba(240,237,232,0.2)",
              padding: "0.85rem 2rem",
              display: "inline-block",
              textDecoration: "none",
              transition: "border-color 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#c9a84c";
              (e.currentTarget as HTMLElement).style.color = "#c9a84c";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(240,237,232,0.2)";
              (e.currentTarget as HTMLElement).style.color = "#f0ede8";
            }}
            data-ocid="view-all-projects"
          >
            View All Projects
          </Link>
        </motion.div>
      </section>

      {/* ── SECTION 4: STATISTICS ───────────────────────────────────────── */}
      <section
        style={{
          background: "#0a0a0a",
          padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 6vw, 6rem)",
          borderTop: "1px solid rgba(240,237,232,0.08)",
          borderBottom: "1px solid rgba(240,237,232,0.08)",
        }}
        data-ocid="stats-section"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "3rem 2rem",
          }}
          className="md:!grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              data-ocid={`stat-${i}`}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
                  lineHeight: 1,
                  color: "#f0ede8",
                  marginBottom: "0.75rem",
                }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <div
                style={{
                  width: "2rem",
                  height: "1px",
                  background: "#c9a84c",
                  marginBottom: "0.75rem",
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(240,237,232,0.4)",
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SECTION 5: SERVICES ─────────────────────────────────────────── */}
      <section
        style={{
          background: "#0a0a0a",
          padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 6vw, 6rem)",
        }}
        data-ocid="services-section"
      >
        <SectionLabel>Our Services</SectionLabel>
        <div
          style={{
            height: "1px",
            background: "rgba(240,237,232,0.08)",
            marginBottom: "0",
          }}
        />
        {SERVICES.map((svc, i) => (
          <ServiceRow key={svc.num} svc={svc} index={i} />
        ))}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginTop: "3.5rem" }}
        >
          <Link
            to="/services"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#f0ede8",
              border: "1px solid rgba(240,237,232,0.2)",
              padding: "0.85rem 2rem",
              display: "inline-block",
              textDecoration: "none",
              transition: "border-color 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#c9a84c";
              (e.currentTarget as HTMLElement).style.color = "#c9a84c";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(240,237,232,0.2)";
              (e.currentTarget as HTMLElement).style.color = "#f0ede8";
            }}
            data-ocid="explore-services-link"
          >
            Explore Services
          </Link>
        </motion.div>
      </section>

      {/* ── SECTION 6: FOUNDERS ─────────────────────────────────────────── */}
      <section
        style={{
          background: "#0a0a0a",
          padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 6vw, 6rem)",
          borderTop: "1px solid rgba(240,237,232,0.08)",
        }}
        data-ocid="founders-section"
      >
        <SectionLabel>The Founders</SectionLabel>
        <FounderRow
          imageSrc="/assets/generated/founder-wahid.dim_600x700.jpg"
          name="Wahid"
          title="Co-founder & Design Director"
          bio="With over a decade of experience shaping residential and commercial interiors, Wahid brings a deep sensitivity to materiality and spatial hierarchy. His approach roots every project in the cultural context of its occupants — creating spaces that feel both timeless and intimately personal."
          quote="Good design is invisible — it simply makes life feel right."
          index={0}
        />
        <div
          style={{
            height: "1px",
            background: "rgba(240,237,232,0.08)",
            margin: "4rem 0",
          }}
        />
        <FounderRow
          imageSrc="/assets/generated/founder-jasim.dim_600x700.jpg"
          name="Jasim"
          title="Co-founder & Principal Architect"
          bio="Jasim's architectural practice spans residential villas, urban mixed-use developments, and bespoke commercial environments. He champions a philosophy where structure and aesthetics are inseparable — where every load-bearing decision is also a design decision."
          quote="Architecture is frozen music — every line carries a rhythm."
          index={1}
        />
      </section>

      {/* ── SECTION 7: INQUIRY CTA ──────────────────────────────────────── */}
      <section
        style={{
          background: "#0a0a0a",
          padding: "clamp(6rem, 14vh, 11rem) clamp(1.5rem, 6vw, 6rem)",
          borderTop: "1px solid rgba(240,237,232,0.08)",
          textAlign: "center",
        }}
        data-ocid="cta-section"
      >
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(3rem, 7vw, 6.5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            color: "#f0ede8",
            marginBottom: "2rem",
          }}
          data-ocid="cta-heading"
        >
          Let's Build
          <br />
          Something.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(240,237,232,0.4)",
            marginBottom: "3rem",
          }}
        >
          Tell us about your project
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <Link
            to="/contact"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#0a0a0a",
              background: "#c9a84c",
              padding: "1rem 3rem",
              display: "inline-block",
              textDecoration: "none",
              transition: "background 0.3s, transform 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#b8953f";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#c9a84c";
            }}
            data-ocid="cta-start-conversation"
          >
            Start a Conversation
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

// ── Project Row (editorial indexed format) ─────────────────────────────────
function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const fallback = "/assets/images/placeholder.svg";
  const img =
    project.imageUrls && project.imageUrls.length > 0
      ? project.imageUrls[0]
      : fallback;
  const num = `P.${String(index + 1).padStart(2, "0")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      data-ocid={`project-row-${project.id}`}
    >
      <Link
        to="/projects/$id"
        params={{ id: project.id.toString() }}
        style={{ textDecoration: "none", display: "block" }}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "grid",
            gridTemplateColumns: "8rem 1fr",
            gap: "2rem",
            alignItems: "center",
            padding: "clamp(1.5rem, 3vh, 2.5rem) clamp(1.5rem, 6vw, 6rem)",
            borderBottom: "1px solid rgba(240,237,232,0.08)",
            cursor: "pointer",
            transition: "background 0.3s",
            background: hovered ? "rgba(240,237,232,0.02)" : "transparent",
          }}
        >
          {/* Index number */}
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              color: hovered ? "#c9a84c" : "rgba(240,237,232,0.2)",
              transition: "color 0.3s",
              letterSpacing: "0.02em",
            }}
          >
            {num}
          </span>

          {/* Project info + image */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
              overflow: "hidden",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#c9a84c",
                  marginBottom: "0.5rem",
                }}
              >
                {CATEGORY_LABELS[project.category]}
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
                  color: "#f0ede8",
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {project.title}
              </h3>
              {project.scope && (
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    color: "rgba(240,237,232,0.35)",
                    marginTop: "0.35rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {project.scope}
                </p>
              )}
            </div>

            {/* Thumbnail */}
            <div
              style={{
                flexShrink: 0,
                width: "clamp(7rem, 14vw, 14rem)",
                height: "clamp(4.5rem, 8vw, 9rem)",
                overflow: "hidden",
                opacity: hovered ? 1 : 0.6,
                transition: "opacity 0.4s",
              }}
            >
              <img
                src={img}
                alt={project.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: hovered ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.6s ease",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fallback;
                }}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Service Row ────────────────────────────────────────────────────────────
function ServiceRow({
  svc,
  index,
}: { svc: { num: string; title: string; desc: string }; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.09 }}
      data-ocid={`service-row-${index}`}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "4rem 1fr auto",
          gap: "2rem",
          alignItems: "center",
          padding: "2rem 0",
          borderBottom: "1px solid rgba(240,237,232,0.08)",
          cursor: "default",
          transition: "background 0.3s",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.65rem",
            color: hovered ? "#c9a84c" : "rgba(240,237,232,0.25)",
            letterSpacing: "0.1em",
            transition: "color 0.3s",
          }}
        >
          {svc.num}
        </span>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)",
              color: "#f0ede8",
              letterSpacing: "-0.01em",
              marginBottom: "0.35rem",
            }}
          >
            {svc.title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              color: "rgba(240,237,232,0.4)",
              lineHeight: 1.65,
            }}
          >
            {svc.desc}
          </p>
        </div>
        <div
          style={{
            width: "2rem",
            height: "1px",
            background: hovered ? "#c9a84c" : "rgba(240,237,232,0.15)",
            transition: "background 0.3s, width 0.3s",
            flexShrink: 0,
          }}
        />
      </div>
    </motion.div>
  );
}

// ── Founder Row ────────────────────────────────────────────────────────────
function FounderRow({
  imageSrc,
  name,
  title,
  bio,
  quote,
  index,
}: {
  imageSrc: string;
  name: string;
  title: string;
  bio: string;
  quote: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay: index * 0.15 }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "3rem",
        alignItems: "start",
      }}
      className="md:!grid-cols-[2fr_3fr]"
      data-ocid={`founder-${name.toLowerCase()}`}
    >
      {/* Image — smaller 40% column */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          aspectRatio: "3/4",
          maxWidth: "340px",
        }}
      >
        <img
          src={imageSrc}
          alt={`${name} — ${title}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.background =
              "rgba(201,168,76,0.08)";
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(10,10,10,0.4) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Bio */}
      <div style={{ paddingTop: "1rem" }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#c9a84c",
            marginBottom: "1rem",
          }}
        >
          {title}
        </p>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            color: "#f0ede8",
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
            lineHeight: 1,
          }}
        >
          {name}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            lineHeight: 1.85,
            color: "rgba(240,237,232,0.55)",
            marginBottom: "2rem",
            maxWidth: "50ch",
          }}
        >
          {bio}
        </p>
        <blockquote
          style={{ borderLeft: "1px solid #c9a84c", paddingLeft: "1.25rem" }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.1rem",
              color: "rgba(240,237,232,0.5)",
              lineHeight: 1.6,
            }}
          >
            "{quote}"
          </p>
        </blockquote>
      </div>
    </motion.div>
  );
}
