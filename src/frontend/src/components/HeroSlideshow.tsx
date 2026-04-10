import { useCallback, useEffect, useRef, useState } from "react";

interface HeroSlideshowProps {
  images: string[];
}

export function HeroSlideshow({ images }: HeroSlideshowProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Use generated hero image as default fallback slide
  const FALLBACK_SLIDES = [
    "/assets/generated/hero-interior.dim_1400x900.jpg",
    "/assets/generated/project-architecture-1.dim_1400x900.jpg",
    "/assets/generated/project-penthouse.dim_1400x900.jpg",
  ];
  const displayImages = images.length > 0 ? images : FALLBACK_SLIDES;
  const count = displayImages.length;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + count) % count);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [count, isTransitioning],
  );

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, count]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero image slideshow"
    >
      {/* ── Fallback dramatic background — always visible, even without images ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 70% 40%, rgba(201,168,76,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 20% 60%, rgba(15,12,8,0.9) 0%, transparent 70%),
            linear-gradient(135deg, #0a0a0a 0%, #111008 40%, #0e0c0a 70%, #0a0a0a 100%)
          `,
          zIndex: 0,
        }}
      />

      {/* ── Geometric decorative line art ── */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          opacity: 0,
          transition: "opacity 1s ease",
          pointerEvents: "none",
        }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Architectural grid lines */}
        <line
          x1="720"
          y1="0"
          x2="720"
          y2="900"
          stroke="#c9a84c"
          strokeWidth="0.5"
        />
        <line
          x1="0"
          y1="450"
          x2="1440"
          y2="450"
          stroke="#c9a84c"
          strokeWidth="0.5"
        />
        <rect
          x="320"
          y="150"
          width="800"
          height="600"
          stroke="#c9a84c"
          strokeWidth="0.5"
          fill="none"
        />
        <rect
          x="500"
          y="250"
          width="440"
          height="400"
          stroke="#c9a84c"
          strokeWidth="0.3"
          fill="none"
        />
        {/* Corner accents */}
        <line
          x1="320"
          y1="150"
          x2="380"
          y2="150"
          stroke="#c9a84c"
          strokeWidth="1"
        />
        <line
          x1="320"
          y1="150"
          x2="320"
          y2="210"
          stroke="#c9a84c"
          strokeWidth="1"
        />
        <line
          x1="1120"
          y1="150"
          x2="1060"
          y2="150"
          stroke="#c9a84c"
          strokeWidth="1"
        />
        <line
          x1="1120"
          y1="150"
          x2="1120"
          y2="210"
          stroke="#c9a84c"
          strokeWidth="1"
        />
        <line
          x1="320"
          y1="750"
          x2="380"
          y2="750"
          stroke="#c9a84c"
          strokeWidth="1"
        />
        <line
          x1="320"
          y1="750"
          x2="320"
          y2="690"
          stroke="#c9a84c"
          strokeWidth="1"
        />
        <line
          x1="1120"
          y1="750"
          x2="1060"
          y2="750"
          stroke="#c9a84c"
          strokeWidth="1"
        />
        <line
          x1="1120"
          y1="750"
          x2="1120"
          y2="690"
          stroke="#c9a84c"
          strokeWidth="1"
        />
      </svg>

      {/* ── Image slides ── */}
      {displayImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 2 : 1,
          }}
          aria-hidden={i !== current}
        >
          <img
            src={src}
            alt={`d2u studio — slide ${i + 1}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              willChange: "auto",
              transform: "none",
            }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* ── Bottom gradient for text readability ── */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "70%",
          background:
            "linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.65) 35%, rgba(5,5,5,0.2) 65%, transparent 100%)",
          zIndex: 3,
        }}
      />

      {/* ── Left vignette ── */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none"
        style={{
          width: "35%",
          background:
            "linear-gradient(to right, rgba(5,5,5,0.6) 0%, transparent 100%)",
          zIndex: 3,
        }}
      />

      {/* ── Dot indicators ── */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "50%",
          marginLeft: "-50%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          zIndex: 10,
          transform: "none",
          willChange: "auto",
        }}
        role="tablist"
        aria-label="Slide indicators"
      >
        {displayImages.map((src, i) => (
          <button
            type="button"
            key={src}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            data-ocid={`hero-dot-${i}`}
            style={{
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s",
              width: i === current ? "1.5rem" : "0.5rem",
              height: "0.5rem",
              backgroundColor:
                i === current ? "#c9a84c" : "rgba(201,168,76,0.35)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
