import { useCallback, useEffect, useRef, useState } from "react";

interface HeroSlideshowProps {
  images: string[];
  parallaxOffset: number;
}

export function HeroSlideshow({ images, parallaxOffset }: HeroSlideshowProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = images.length;

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
      {/* Slides */}
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
          }}
          aria-hidden={i !== current}
        >
          <img
            src={src}
            alt={`d2u studio — slide ${i + 1}`}
            className="w-full h-full object-cover"
            style={{
              transform: `translateY(${parallaxOffset * 0.4}px)`,
              willChange: "transform",
              transition: "transform 0.05s linear",
            }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Bottom gradient for text readability only */}
      <div
        className="absolute inset-x-0 bottom-0 z-[2] pointer-events-none"
        style={{
          height: "55%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)",
        }}
      />

      {/* Dot indicators */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2"
        role="tablist"
        aria-label="Slide indicators"
      >
        {images.map((src, i) => (
          <button
            type="button"
            key={src}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            data-ocid={`hero-dot-${i}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-primary"
                : "w-2 h-2 bg-primary-foreground/40 hover:bg-primary-foreground/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
