import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function D2UWordmark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const d2uSizes = { sm: "1.25rem", md: "1.5rem", lg: "2.25rem" };
  const studioSizes = { sm: "0.55rem", md: "0.6rem", lg: "0.72rem" };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: "0.6rem",
        userSelect: "none",
      }}
    >
      <span
        style={{
          fontFamily:
            "var(--font-display), 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
          fontWeight: 700,
          fontStyle: "italic",
          fontSize: d2uSizes[size],
          letterSpacing: "-0.02em",
          color: "#f0ede8",
          lineHeight: 1,
        }}
      >
        D2U
      </span>
      <span
        style={{
          fontFamily:
            "var(--font-body), -apple-system, BlinkMacSystemFont, Arial, sans-serif",
          fontSize: studioSizes[size],
          fontWeight: 600,
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          color: "#c9a84c",
          lineHeight: 1,
        }}
      >
        STUDIO
      </span>
    </span>
  );
}

export { D2UWordmark };

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const pathnameRef = useRef(location.pathname);

  useEffect(() => {
    if (pathnameRef.current !== location.pathname) {
      pathnameRef.current = location.pathname;
      setMenuOpen(false);
    }
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        data-ocid="site-header"
        className="sticky top-0 z-50 w-full"
        style={{ backgroundColor: "#0c0c0a" }}
      >
        <div
          className="flex items-center justify-between h-16 px-6 md:px-12"
          style={{ borderBottom: "1px solid rgba(201,168,76,0.2)" }}
        >
          {/* Logo */}
          <Link to="/" data-ocid="nav-logo" className="group">
            <D2UWordmark size="md" />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-10"
            data-ocid="nav-desktop"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-body text-xs uppercase tracking-widest transition-colors duration-200"
                style={{
                  color:
                    location.pathname === link.to
                      ? "#c9a84c"
                      : "rgba(240,237,232,0.7)",
                  fontFamily:
                    "var(--font-body), -apple-system, Arial, sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#c9a84c";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    location.pathname === link.to
                      ? "#c9a84c"
                      : "rgba(240,237,232,0.65)";
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" data-ocid="nav-cta">
              <button
                type="button"
                className="font-body text-xs uppercase tracking-widest px-5 py-2 transition-all duration-300"
                style={{
                  border: "1px solid #c9a84c",
                  color: "#c9a84c",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "#c9a84c";
                  el.style.color = "#0a0a0a";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "transparent";
                  el.style.color = "#c9a84c";
                }}
              >
                Get in Touch
              </button>
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="md:hidden flex flex-col gap-[5px] p-2 focus-visible:outline-none"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            data-ocid="nav-mobile-toggle"
          >
            {menuOpen ? (
              <span
                className="font-body text-lg leading-none transition-colors duration-200"
                style={{ color: "#f0ede8" }}
              >
                ✕
              </span>
            ) : (
              <>
                <span
                  className="block w-6 h-px"
                  style={{ backgroundColor: "#f0ede8" }}
                />
                <span
                  className="block w-6 h-px"
                  style={{ backgroundColor: "#f0ede8" }}
                />
                <span
                  className="block w-6 h-px"
                  style={{ backgroundColor: "#f0ede8" }}
                />
              </>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center transition-all duration-500"
        style={{
          backgroundColor: "#080806",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
        }}
        data-ocid="nav-mobile"
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-display font-bold italic transition-all duration-200"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 4rem)",
                color: location.pathname === link.to ? "#c9a84c" : "#f0ede8",
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(12px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#c9a84c";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  location.pathname === link.to ? "#c9a84c" : "#f0ede8";
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="mt-4">
            <button
              type="button"
              className="font-body text-xs uppercase tracking-widest px-8 py-3 transition-all duration-300"
              style={{
                border: "1px solid #c9a84c",
                color: "#c9a84c",
                background: "transparent",
                cursor: "pointer",
                opacity: menuOpen ? 1 : 0,
                transitionDelay: menuOpen
                  ? `${NAV_LINKS.length * 60}ms`
                  : "0ms",
              }}
              data-ocid="nav-mobile-cta"
            >
              Get in Touch
            </button>
          </Link>
        </nav>

        <div
          className="absolute bottom-8 font-body text-xs uppercase tracking-widest"
          style={{ color: "rgba(240,237,232,0.3)" }}
        >
          Architecture & Interior Design
        </div>
      </div>
    </>
  );
}
