import type { ScenePalette } from "@/lib/data";

const GRADIENTS: Record<ScenePalette, string> = {
  ocean: "from-[#38bdf8] via-[#0ea5e9] to-[#0c4a9e]",
  forest: "from-[#4ade80] via-[#16a34a] to-[#14532d]",
  sunset: "from-[#fbbf24] via-[#fb7185] to-[#9d174d]",
  mountain: "from-[#94a3b8] via-[#475569] to-[#0f172a]",
  desert: "from-[#fde68a] via-[#f59e0b] to-[#9a3412]",
  dusk: "from-[#818cf8] via-[#4338ca] to-[#1e1b4b]",
  coast: "from-[#67e8f9] via-[#0891b2] to-[#0c4a6e]",
  city: "from-[#64748b] via-[#334155] to-[#0f172a]",
};

const DUSK_STARS = Array.from({ length: 18 }, (_, i) => ({
  cx: (i * 37) % 200,
  cy: (i * 53) % 70,
  r: i % 3 === 0 ? 1.6 : 0.9,
}));

function SceneMotif({ palette }: { palette: ScenePalette }) {
  switch (palette) {
    case "ocean":
    case "coast":
      return (
        <svg viewBox="0 0 200 100" className="absolute inset-x-0 bottom-0 w-full opacity-70" preserveAspectRatio="none">
          <path d="M0 55 Q 25 40 50 55 T 100 55 T 150 55 T 200 55 V100 H0 Z" fill="rgba(255,255,255,0.18)" />
          <path d="M0 72 Q 25 60 50 72 T 100 72 T 150 72 T 200 72 V100 H0 Z" fill="rgba(255,255,255,0.28)" />
        </svg>
      );
    case "forest":
    case "mountain":
      return (
        <svg viewBox="0 0 200 100" className="absolute inset-x-0 bottom-0 w-full opacity-80" preserveAspectRatio="none">
          <path d="M0 80 L35 40 L60 62 L90 25 L120 58 L150 38 L200 80 Z" fill="rgba(255,255,255,0.16)" />
          <path d="M0 90 L45 58 L80 78 L115 48 L160 76 L200 55 V100 H0 Z" fill="rgba(255,255,255,0.22)" />
        </svg>
      );
    case "sunset":
    case "desert":
      return (
        <svg viewBox="0 0 200 100" className="absolute inset-0 h-full w-full opacity-80">
          <circle cx="100" cy="58" r="26" fill="rgba(255,255,255,0.3)" />
          <path d="M0 82 Q 50 62 100 80 T 200 78 V100 H0 Z" fill="rgba(0,0,0,0.12)" />
        </svg>
      );
    case "city":
      return (
        <svg viewBox="0 0 200 100" className="absolute inset-x-0 bottom-0 w-full opacity-70" preserveAspectRatio="none">
          <rect x="10" y="45" width="18" height="55" fill="rgba(255,255,255,0.15)" />
          <rect x="34" y="30" width="16" height="70" fill="rgba(255,255,255,0.22)" />
          <rect x="56" y="55" width="18" height="45" fill="rgba(255,255,255,0.15)" />
          <rect x="82" y="18" width="16" height="82" fill="rgba(255,255,255,0.26)" />
          <rect x="104" y="42" width="18" height="58" fill="rgba(255,255,255,0.15)" />
          <rect x="128" y="60" width="16" height="40" fill="rgba(255,255,255,0.2)" />
          <rect x="150" y="35" width="18" height="65" fill="rgba(255,255,255,0.15)" />
          <rect x="174" y="50" width="16" height="50" fill="rgba(255,255,255,0.22)" />
        </svg>
      );
    case "dusk":
      return (
        <svg viewBox="0 0 200 100" className="absolute inset-0 h-full w-full opacity-90">
          {DUSK_STARS.map((star, i) => (
            <circle key={i} cx={star.cx} cy={star.cy} r={star.r} fill="rgba(255,255,255,0.6)" />
          ))}
        </svg>
      );
    default:
      return null;
  }
}

export function Scene({
  palette,
  label,
  className = "",
  rounded = "rounded-[24px]",
}: {
  palette: ScenePalette;
  label?: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${GRADIENTS[palette]} ${rounded} ${className}`}
      role="img"
      aria-label={label ?? `${palette} scene illustration`}
    >
      <SceneMotif palette={palette} />
      {label ? (
        <span className="absolute bottom-3 left-3 rounded-full bg-ink-900/40 px-3 py-1 text-xs font-medium text-mist-100 backdrop-blur-sm">
          {label}
        </span>
      ) : null}
    </div>
  );
}
