import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
