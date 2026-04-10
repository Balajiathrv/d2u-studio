import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  FolderOpen,
  ImageIcon,
  Mail,
} from "lucide-react";
import { AdminLayout } from "../../components/AdminLayout";
import { useAdminInquiries, useAdminProjects } from "../../hooks/useAdmin";
import { useHeroImages } from "../../hooks/useHeroImages";
import { getStats } from "../../hooks/useStats";

function StatCard({
  label,
  value,
  icon: Icon,
  href,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  href: string;
}) {
  return (
    <Link
      to={href}
      className="bg-card border border-border rounded-xl p-6 flex items-center gap-4 hover:bg-muted/40 transition-smooth group"
      data-ocid={`admin-stat-${label.toLowerCase().replace(/\s/g, "-")}`}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
          {label}
        </p>
        <p className="text-foreground text-2xl font-bold font-display mt-0.5">
          {value}
        </p>
      </div>
      <ArrowRight
        className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth"
        aria-hidden="true"
      />
    </Link>
  );
}

export default function AdminDashboard() {
  const { data: projects, isLoading: loadingProjects } = useAdminProjects();
  const { data: inquiries, isLoading: loadingInquiries } = useAdminInquiries();
  const { data: heroImages, isLoading: loadingHero } = useHeroImages();
  const stats = getStats();

  return (
    <AdminLayout title="Dashboard">
      <div className="max-w-4xl space-y-8">
        <div>
          <p className="text-muted-foreground text-sm">
            Welcome to the d2u studio admin panel. Manage your content below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loadingHero ? (
            <Skeleton className="h-24 rounded-xl" />
          ) : (
            <StatCard
              label="Hero Images"
              value={heroImages?.length ?? 0}
              icon={ImageIcon}
              href="/admin/hero"
            />
          )}
          {loadingProjects ? (
            <Skeleton className="h-24 rounded-xl" />
          ) : (
            <StatCard
              label="Projects"
              value={projects?.length ?? 0}
              icon={FolderOpen}
              href="/admin/projects"
            />
          )}
          {loadingInquiries ? (
            <Skeleton className="h-24 rounded-xl" />
          ) : (
            <StatCard
              label="Inquiries"
              value={inquiries?.length ?? 0}
              icon={Mail}
              href="/admin/inquiries"
            />
          )}
          <StatCard
            label="Homepage Stats"
            value={`${stats.length} items`}
            icon={BarChart3}
            href="/admin/stats"
          />
        </div>

        {/* Recent inquiries */}
        <div>
          <h2 className="font-display text-base font-semibold text-foreground mb-3">
            Recent Inquiries
          </h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {loadingInquiries ? (
              <div className="p-4 space-y-3">
                {["sk-a", "sk-b", "sk-c"].map((k) => (
                  <Skeleton key={k} className="h-10 w-full" />
                ))}
              </div>
            ) : !inquiries?.length ? (
              <div
                className="p-8 text-center text-muted-foreground text-sm"
                data-ocid="admin-no-inquiries"
              >
                No inquiries yet.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider hidden sm:table-cell">
                      Email
                    </th>
                    <th className="text-left px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider hidden md:table-cell">
                      Service
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.slice(0, 5).map((inq) => (
                    <tr
                      key={inq.id.toString()}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-smooth"
                    >
                      <td className="px-4 py-3 text-foreground font-medium truncate max-w-[140px]">
                        {inq.name}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground truncate max-w-[180px] hidden sm:table-cell">
                        {inq.email}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                        {inq.serviceType}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {(inquiries?.length ?? 0) > 0 && (
            <div className="mt-2 text-right">
              <Link
                to="/admin/inquiries"
                className="text-primary text-sm hover:underline"
              >
                View all inquiries →
              </Link>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
