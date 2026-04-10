import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { createActor } from "../backend";
import { CATEGORY_LABELS, ProjectCategory } from "../types";
import type { Project } from "../types";

// ── filter config ──────────────────────────────────────────────────────────
type FilterOption = "all" | ProjectCategory;

const FILTERS: { value: FilterOption; label: string }[] = [
  { value: "all", label: "All" },
  { value: ProjectCategory.Interior, label: "Interior" },
  { value: ProjectCategory.Architectural, label: "Architecture" },
  { value: ProjectCategory.SpacePlanning, label: "Space Planning" },
  { value: ProjectCategory.Renovation, label: "Renovation" },
];

// ── hook ──────────────────────────────────────────────────────────────────
function useFilteredProjects(category: ProjectCategory | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Project[]>({
    queryKey: ["projects", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProjects(category) as Promise<Project[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

// ── skeleton row ──────────────────────────────────────────────────────────
function RowSkeleton({ i }: { i: number }) {
  return (
    <div
      key={i}
      style={{ borderBottom: "1px solid #1e1e1e" }}
      className="flex flex-col md:flex-row items-start md:items-center gap-6 py-10 animate-pulse"
    >
      <div style={{ color: "#c9a84c", minWidth: "6rem" }} className="shrink-0">
        <div
          style={{
            background: "#1e1e1e",
            height: "2.5rem",
            width: "5rem",
            borderRadius: 2,
          }}
        />
      </div>
      <div className="flex-1 min-w-0 space-y-3">
        <div
          style={{
            background: "#1e1e1e",
            height: "1rem",
            width: "6rem",
            borderRadius: 2,
          }}
        />
        <div
          style={{
            background: "#1e1e1e",
            height: "2rem",
            width: "60%",
            borderRadius: 2,
          }}
        />
      </div>
      <div
        style={{ background: "#1e1e1e", borderRadius: 2 }}
        className="w-full md:w-[38%] shrink-0 aspect-video"
      />
    </div>
  );
}

// ── project row ───────────────────────────────────────────────────────────
function ProjectRow({ project, index }: { project: Project; index: number }) {
  const hasImage = project.imageUrls.length > 0;
  const label = CATEGORY_LABELS[project.category];
  const num = String(index + 1).padStart(2, "0");
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Link
        to="/projects/$id"
        params={{ id: project.id.toString() }}
        data-ocid={`project-row-${project.id}`}
        aria-label={`View ${project.title}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderBottom: "1px solid #1e1e1e",
          display: "block",
          textDecoration: "none",
        }}
        className="group"
      >
        {/* Mobile: image on top */}
        <div
          className="flex flex-col md:flex-row md:items-center gap-6 py-10"
          style={{ cursor: "pointer" }}
        >
          {/* Mobile image (top) */}
          <div
            className="block md:hidden w-full overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          >
            {hasImage ? (
              <img
                src={project.imageUrls[0]}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-500"
                style={{
                  filter: hovered ? "brightness(1.1)" : "brightness(0.85)",
                  transform: hovered ? "scale(1.03)" : "scale(1)",
                }}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: "#111", transition: "filter 0.4s" }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="4"
                    y="12"
                    width="40"
                    height="26"
                    rx="1"
                    stroke="#333"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M4 22l10-9 10 8 9-6 15 8"
                    stroke="#333"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Index number */}
          <div
            className="shrink-0 md:w-24"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: hovered ? "#d4b86a" : "#c9a84c",
              lineHeight: 1,
              transition: "color 0.3s",
            }}
          >
            P.{num}
          </div>

          {/* Title + category */}
          <div className="flex-1 min-w-0 space-y-2">
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#666",
              }}
            >
              {label}
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 500,
                color: hovered ? "#f0ede8" : "#c8c4be",
                lineHeight: 1.15,
                transition: "color 0.3s",
              }}
              className="truncate"
            >
              {project.title}
            </h2>
            {project.featured && (
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#c9a84c",
                  border: "1px solid #c9a84c33",
                  padding: "2px 8px",
                }}
              >
                Featured
              </span>
            )}
          </div>

          {/* Desktop image (right) */}
          <div
            className="hidden md:block shrink-0 overflow-hidden"
            style={{ width: "38%", aspectRatio: "4/3" }}
          >
            {hasImage ? (
              <img
                src={project.imageUrls[0]}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{
                  filter: hovered ? "brightness(1.1)" : "brightness(0.85)",
                  transform: hovered ? "scale(1.03)" : "scale(1)",
                  transition: "filter 0.45s ease, transform 0.45s ease",
                }}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: "#111",
                  transition: "background 0.4s",
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="4"
                    y="12"
                    width="40"
                    height="26"
                    rx="1"
                    stroke="#2a2a2a"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M4 22l10-9 10 8 9-6 15 8"
                    stroke="#2a2a2a"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── empty state ───────────────────────────────────────────────────────────
function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-32 text-center"
      data-ocid="projects-empty-state"
    >
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
          color: "#555",
          fontWeight: 400,
        }}
      >
        {filtered ? "No projects in this category" : "No projects found"}
      </p>
      {filtered && (
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8rem",
            color: "#444",
            marginTop: "0.75rem",
            letterSpacing: "0.05em",
          }}
        >
          Try a different filter to explore the portfolio.
        </p>
      )}
    </motion.div>
  );
}

// ── main page ──────────────────────────────────────────────────────────────
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");

  const categoryParam =
    activeFilter === "all" ? null : (activeFilter as ProjectCategory);
  const { data: projects, isLoading } = useFilteredProjects(categoryParam);
  const displayProjects = projects ?? [];

  return (
    <section
      style={{ background: "#0a0a0a", minHeight: "100vh" }}
      className="pt-32 md:pt-40"
    >
      <div
        className="mx-auto px-6 md:px-12 lg:px-16"
        style={{ maxWidth: "1400px" }}
      >
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10"
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#c9a84c",
              marginBottom: "1rem",
            }}
          >
            Our Work
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
              color: "#f0ede8",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
            }}
          >
            Selected Projects
          </h1>
        </motion.div>

        {/* Thin divider */}
        <div style={{ borderTop: "1px solid #1e1e1e", marginBottom: "2rem" }} />

        {/* Filter row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-8 mb-0"
          aria-label="Filter projects by category"
        >
          {FILTERS.map((f) => {
            const isActive = activeFilter === f.value;
            return (
              <button
                type="button"
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                data-ocid={`filter-${f.value}`}
                aria-pressed={isActive}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.75rem 0",
                  color: isActive ? "#c9a84c" : "#555",
                  borderBottom: isActive
                    ? "1px solid #c9a84c"
                    : "1px solid transparent",
                  transition: "color 0.25s, border-color 0.25s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.color = "#999";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.color = "#555";
                }}
              >
                {f.label}
              </button>
            );
          })}
        </motion.div>

        {/* Divider below filters */}
        <div
          style={{
            borderTop: "1px solid #1e1e1e",
            marginTop: "0",
            marginBottom: "0",
          }}
        />

        {/* Project list */}
        <div>
          {isLoading ? (
            <>
              {([0, 1, 2, 3] as const).map((i) => (
                <RowSkeleton key={i} i={i} />
              ))}
            </>
          ) : displayProjects.length === 0 ? (
            <EmptyState filtered={activeFilter !== "all"} />
          ) : (
            displayProjects.map((project, i) => (
              <ProjectRow
                key={project.id.toString()}
                project={project}
                index={i}
              />
            ))
          )}
        </div>

        {/* Bottom spacing */}
        <div style={{ paddingBottom: "6rem" }} />
      </div>
    </section>
  );
}
