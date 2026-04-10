import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy, useState } from "react";
import { Layout } from "./components/Layout";
import { SplashScreen } from "./components/SplashScreen";

const HomePage = lazy(() => import("./pages/Home"));
const ProjectsPage = lazy(() => import("./pages/Projects"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetail"));
const ServicesPage = lazy(() => import("./pages/Services"));
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));

// Admin pages
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminHeroImagesPage = lazy(() => import("./pages/admin/AdminHeroImages"));
const AdminProjectsPage = lazy(() => import("./pages/admin/AdminProjects"));
const AdminInquiriesPage = lazy(() => import("./pages/admin/AdminInquiries"));
const AdminSettingsPage = lazy(() => import("./pages/admin/AdminSettings"));

function PageFallback() {
  return (
    <div className="container mx-auto px-4 py-24">
      <Skeleton className="h-64 w-full rounded-lg mb-6" />
      <Skeleton className="h-8 w-1/2 mb-3" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

function AdminFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Skeleton className="h-12 w-48" />
    </div>
  );
}

const isAdminAuthenticated = () =>
  typeof localStorage !== "undefined" &&
  localStorage.getItem("adminSession") === "true";

// Public root (with Layout)
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <HomePage />
    </Suspense>
  ),
});

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ProjectsPage />
    </Suspense>
  ),
});

const projectDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects/$id",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ProjectDetailPage />
    </Suspense>
  ),
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ServicesPage />
    </Suspense>
  ),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AboutPage />
    </Suspense>
  ),
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ContactPage />
    </Suspense>
  ),
});

// Admin root (no Layout wrapper)
const adminRootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<AdminFallback />}>
      <Outlet />
    </Suspense>
  ),
});

const adminLoginRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin/login",
  component: () => (
    <Suspense fallback={<AdminFallback />}>
      <AdminLoginPage />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin",
  beforeLoad: () => {
    if (!isAdminAuthenticated()) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: () => (
    <Suspense fallback={<AdminFallback />}>
      <AdminDashboardPage />
    </Suspense>
  ),
});

const adminHeroRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin/hero",
  beforeLoad: () => {
    if (!isAdminAuthenticated()) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: () => (
    <Suspense fallback={<AdminFallback />}>
      <AdminHeroImagesPage />
    </Suspense>
  ),
});

const adminProjectsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin/projects",
  beforeLoad: () => {
    if (!isAdminAuthenticated()) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: () => (
    <Suspense fallback={<AdminFallback />}>
      <AdminProjectsPage />
    </Suspense>
  ),
});

const adminInquiriesRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin/inquiries",
  beforeLoad: () => {
    if (!isAdminAuthenticated()) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: () => (
    <Suspense fallback={<AdminFallback />}>
      <AdminInquiriesPage />
    </Suspense>
  ),
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin/settings",
  beforeLoad: () => {
    if (!isAdminAuthenticated()) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: () => (
    <Suspense fallback={<AdminFallback />}>
      <AdminSettingsPage />
    </Suspense>
  ),
});

const publicRouteTree = rootRoute.addChildren([
  indexRoute,
  projectsRoute,
  projectDetailRoute,
  servicesRoute,
  aboutRoute,
  contactRoute,
]);

const adminRouteTree = adminRootRoute.addChildren([
  adminLoginRoute,
  adminRoute,
  adminHeroRoute,
  adminProjectsRoute,
  adminInquiriesRoute,
  adminSettingsRoute,
]);

// Determine which router to use based on path
const isAdminPath =
  typeof window !== "undefined" &&
  window.location.pathname.startsWith("/admin");

const router = createRouter({
  routeTree: isAdminPath ? adminRouteTree : publicRouteTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AppWithSplash() {
  const alreadyShown =
    typeof sessionStorage !== "undefined" &&
    sessionStorage.getItem("splashShown") === "true";

  const [showSplash, setShowSplash] = useState(!alreadyShown);

  const handleSplashComplete = () => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("splashShown", "true");
    }
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <RouterProvider router={router} />
    </>
  );
}

export default function App() {
  return <AppWithSplash />;
}
