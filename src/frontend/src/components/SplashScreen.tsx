import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"visible" | "fadeout">("visible");

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase("fadeout"), 3000);
    const completeTimer = setTimeout(() => onComplete(), 3700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="splash-root"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animation:
          phase === "fadeout"
            ? "splashFadeOut 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards"
            : undefined,
      }}
    >
      {/* D2U large wordmark */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation:
            "splashWordIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards",
          opacity: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(4rem, 12vw, 7rem)",
            fontWeight: 700,
            fontStyle: "italic",
            color: "#f0ede8",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          D2U
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', Arial, sans-serif",
            fontSize: "clamp(0.6rem, 1.5vw, 0.75rem)",
            fontWeight: 400,
            letterSpacing: "0.5em",
            color: "#c9a84c",
            textTransform: "uppercase",
            marginTop: "10px",
          }}
        >
          STUDIO
        </span>
      </div>

      {/* Animated gold line */}
      <div
        style={{
          marginTop: "24px",
          width: "80px",
          height: "1px",
          backgroundColor: "rgba(201,168,76,0.25)",
          overflow: "hidden",
          animation: "splashTextIn 0.4s ease 0.7s forwards",
          opacity: 0,
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "#c9a84c",
            animation:
              "splashBar 1.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards",
            width: "0%",
          }}
        />
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: "20px",
          animation:
            "splashTextIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards",
          opacity: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', Arial, sans-serif",
            fontSize: "0.65rem",
            fontWeight: 400,
            letterSpacing: "0.35em",
            color: "#c9a84c",
            textTransform: "uppercase",
          }}
        >
          Architecture &amp; Interior Design
        </span>
      </div>

      <style>{`
        @keyframes splashWordIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashTextIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes splashBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
