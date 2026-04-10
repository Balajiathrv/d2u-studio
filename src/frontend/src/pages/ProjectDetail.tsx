import { Skeleton } from "@/components/ui/skeleton";
import { useProject } from "@/hooks/useProjects";
import { CATEGORY_LABELS } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

function ProjectDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <Skeleton className="w-full h-[55vh]" />
      <div className="container mx-auto px-6 md:px-10 max-w-5xl py-14">
        <Skeleton className="h-5 w-28 mb-8" />
        <Skeleton className="h-14 w-3/4 mb-4" />
        <Skeleton className="h-5 w-32 mb-10" />
        <Skeleton className="h-28 w-full mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center px-6">
        <p className="text-label text-primary mb-4">Project Not Found</p>
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-5 tracking-tight">
          We couldn't find this project
        </h1>
        <p className="font-body text-muted-foreground max-w-md mx-auto mb-10">
          The project you're looking for may have been moved or no longer
          exists. Browse all projects to find what you need.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary underline-offset-4 hover:underline transition-smooth"
          data-ocid="not-found-back-link"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </div>
    </div>
  );
}

const CATEGORY_HUE: Record<string, string> = {
  Interior: "var(--color-chart-3)",
  Architectural: "var(--color-accent)",
  "Space Planning": "var(--color-chart-4)",
  Renovation: "var(--color-chart-5)",
};

const HERO_GRADIENTS = [
  "from-[oklch(0.35_0.06_30)] via-[oklch(0.45_0.09_50)] to-[oklch(0.58_0.12_75)]",
  "from-[oklch(0.28_0.04_260)] via-[oklch(0.40_0.06_280)] to-[oklch(0.55_0.08_300)]",
  "from-[oklch(0.32_0.07_15)] via-[oklch(0.44_0.10_35)] to-[oklch(0.60_0.09_60)]",
];

export default function ProjectDetail() {
  const { id } = useParams({ from: "/projects/$id" });
  const numericId = BigInt(id);
  const { data: project, isLoading, isFetched } = useProject(numericId);

  if (isLoading || !isFetched) return <ProjectDetailSkeleton />;
  if (!project) return <NotFound />;

  const categoryLabel = CATEGORY_LABELS[project.category] ?? "Design";
  const badgeColor = CATEGORY_HUE[categoryLabel] ?? "var(--color-chart-3)";
  const heroGradient =
    HERO_GRADIENTS[Number(numericId) % HERO_GRADIENTS.length];
  const hasImage = project.imageUrls.length > 0;

  return (
    <div className="min-h-screen bg-background" data-ocid="project-detail">
      {/* Hero */}
      <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden">
        {hasImage ? (
          <img
            src={project.imageUrls[0]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${heroGradient}`} />
        )}
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-6 left-6 md:top-8 md:left-10"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-semibold font-body transition-smooth bg-black/20 hover:bg-black/35 backdrop-blur-sm rounded-full px-4 py-2"
            data-ocid="hero-back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Link>
        </motion.div>

        {/* Hero title overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="absolute bottom-8 left-6 md:bottom-12 md:left-10 right-6 md:right-10 max-w-3xl"
        >
          <span
            className="inline-block text-label text-xs px-3 py-1 rounded-full mb-4 font-semibold"
            style={{
              backgroundColor: badgeColor,
              color: "var(--color-foreground)",
              opacity: 0.9,
            }}
            data-ocid="category-badge"
          >
            {categoryLabel}
          </span>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight drop-shadow-sm">
            {project.title}
          </h1>
        </motion.div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-6 md:px-10 max-w-5xl py-14">
        {/* Description */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-16 max-w-3xl"
        >
          <p className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed">
            {project.description}
          </p>
        </motion.section>

        {/* Divider */}
        <div className="border-t border-border mb-16" />

        {/* Editorial Details — two column on md+ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14"
          data-ocid="project-details-grid"
        >
          {/* Scope */}
          <DetailBlock
            label="Scope of Work"
            content={project.scope}
            index={0}
          />

          {/* Materials */}
          <div>
            <p className="text-label text-primary mb-4 font-semibold tracking-widest text-xs">
              Materials
            </p>
            <ul className="space-y-2" data-ocid="materials-list">
              {project.materials.map((mat) => (
                <li
                  key={mat}
                  className="flex items-start gap-2 font-body text-foreground/80 text-sm"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-primary" />
                  {mat}
                </li>
              ))}
              {project.materials.length === 0 && (
                <li className="font-body text-muted-foreground text-sm">
                  Details available upon request
                </li>
              )}
            </ul>
          </div>

          {/* Outcomes */}
          <DetailBlock label="Outcomes" content={project.outcomes} index={2} />
        </motion.div>

        {/* Additional images */}
        {project.imageUrls.length > 1 && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mt-20"
          >
            <p className="text-label text-primary mb-6 text-xs font-semibold tracking-widest">
              Gallery
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.imageUrls.slice(1).map((url) => (
                <img
                  key={url}
                  src={url}
                  alt={`${project.title} — additional view`}
                  className="w-full aspect-video object-cover rounded-lg shadow-editorial"
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <p className="font-display text-xl md:text-2xl text-foreground mb-1">
              Interested in a similar project?
            </p>
            <p className="font-body text-sm text-muted-foreground">
              Reach out and we'll be in touch within 24 hours.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground font-body text-sm font-semibold px-6 py-3 rounded-md transition-smooth hover:opacity-90 hover:shadow-md"
            data-ocid="detail-cta-contact"
          >
            Start a Conversation
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function DetailBlock({
  label,
  content,
  index,
}: {
  label: string;
  content: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 + index * 0.08 }}
    >
      <p className="text-label text-primary mb-4 font-semibold tracking-widest text-xs">
        {label}
      </p>
      <p className="font-body text-foreground/80 text-sm leading-relaxed">
        {content || "Details available upon request"}
      </p>
    </motion.div>
  );
}
