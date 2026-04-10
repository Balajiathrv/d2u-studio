import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  FolderOpen,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Settings,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useAdminSession } from "../hooks/useAdmin";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Hero Images", href: "/admin/hero", icon: Image },
  { label: "Projects", href: "/admin/projects", icon: FolderOpen },
  { label: "Inquiries", href: "/admin/inquiries", icon: Mail },
  { label: "Homepage Stats", href: "/admin/stats", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
] as const;

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const { clearAuthenticated } = useAdminSession();
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    clearAuthenticated();
    window.location.href = "/admin/login";
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
              />
            </svg>
          </div>
          <span className="font-display font-bold text-foreground text-sm">
            d2u studio
          </span>
        </Link>
        <p className="text-muted-foreground text-xs mt-1 pl-10">Admin</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Admin navigation">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = currentPath === href;
          return (
            <Link
              key={href}
              to={href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                active
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              data-ocid={`admin-nav-${label.toLowerCase().replace(/\s/g, "-")}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-border">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-smooth w-full"
          data-ocid="admin-logout"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden lg:flex flex-col w-60 bg-card border-r border-border flex-shrink-0">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
          role="button"
          tabIndex={-1}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-60 bg-card border-r border-border flex flex-col transition-transform duration-300 lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="font-display font-bold text-sm text-foreground">
            d2u studio Admin
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-card border-b border-border px-4 lg:px-8 py-4 flex items-center gap-4 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            data-ocid="admin-menu-toggle"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="font-display text-lg font-bold text-foreground flex-1">
            {title}
          </h1>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
