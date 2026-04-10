import { Link } from "@tanstack/react-router";
import { D2UWordmark } from "./Header";

const NAV_LINKS = [
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-ocid="site-footer"
      className="w-full"
      style={{ backgroundColor: "#0c0c0a" }}
    >
      {/* Gold top divider — full opacity, visible */}
      <div
        className="w-full h-px"
        style={{ backgroundColor: "#c9a84c", opacity: 0.6 }}
      />

      <div className="px-6 md:px-12 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 md:gap-0">
          {/* Left: D2U wordmark + tagline */}
          <div className="flex-1 max-w-sm">
            <Link to="/" data-ocid="footer-logo">
              <D2UWordmark size="lg" />
            </Link>
            <p
              className="font-body text-sm leading-relaxed mt-4"
              style={{ color: "rgba(240,237,232,0.45)", maxWidth: "280px" }}
            >
              Transforming spaces into extraordinary experiences. Architecture
              and interior design rooted in craft and intentionality.
            </p>
            <div className="mt-8 flex flex-col gap-2">
              <a
                href="mailto:hello@d2ustudio.com"
                className="font-body text-xs uppercase tracking-widest transition-colors duration-200"
                style={{ color: "rgba(240,237,232,0.4)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#c9a84c";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(240,237,232,0.4)";
                }}
                data-ocid="footer-email"
              >
                hello@d2ustudio.com
              </a>
              <a
                href="tel:+96522345678"
                className="font-body text-xs uppercase tracking-widest transition-colors duration-200"
                style={{ color: "rgba(240,237,232,0.4)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#c9a84c";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(240,237,232,0.4)";
                }}
                data-ocid="footer-phone"
              >
                +965 2234 5678
              </a>
              <span
                className="font-body text-xs uppercase tracking-widest"
                style={{ color: "rgba(240,237,232,0.4)" }}
                data-ocid="footer-address"
              >
                Kuwait City, Kuwait
              </span>
            </div>
          </div>

          {/* Right: Nav links */}
          <div className="flex flex-col gap-4">
            <span
              className="font-body text-[9px] uppercase tracking-[0.3em]"
              style={{ color: "#c9a84c" }}
            >
              Studio
            </span>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-body text-sm transition-colors duration-200"
                  style={{ color: "rgba(240,237,232,0.5)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#f0ede8";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(240,237,232,0.5)";
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          className="mt-16 pt-6 flex items-center justify-between"
          style={{ borderTop: "1px solid #1e1e1e" }}
        >
          <span
            className="font-body text-xs uppercase tracking-widest"
            style={{ color: "rgba(240,237,232,0.25)" }}
          >
            © {year} D2U Studio. All rights reserved.
          </span>
          <span
            className="font-body text-xs uppercase tracking-widest"
            style={{ color: "rgba(240,237,232,0.25)" }}
          >
            Architecture & Interior Design
          </span>
        </div>
      </div>
    </footer>
  );
}
