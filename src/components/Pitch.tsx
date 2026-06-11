/** Terrain de football en SVG, vue de dessus. Remplit son conteneur. */
export function Pitch({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 240"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <rect width="400" height="240" fill="#1a6b3c" />
      {/* Bandes de tonte */}
      {Array.from({ length: 8 }, (_, i) => (
        <rect
          key={i}
          x={i * 50}
          width="25"
          height="240"
          fill="rgba(255,255,255,0.035)"
        />
      ))}
      <g
        fill="none"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      >
        {/* Limites du terrain */}
        <rect x="12" y="12" width="376" height="216" />
        {/* Ligne médiane + rond central */}
        <line x1="200" y1="12" x2="200" y2="228" />
        <circle cx="200" cy="120" r="34" />
        {/* Surface de réparation gauche */}
        <rect x="12" y="62" width="56" height="116" />
        <rect x="12" y="94" width="22" height="52" />
        {/* Surface de réparation droite */}
        <rect x="332" y="62" width="56" height="116" />
        <rect x="366" y="94" width="22" height="52" />
      </g>
      <g fill="rgba(255,255,255,0.6)">
        <circle cx="200" cy="120" r="2.5" />
        <circle cx="52" cy="120" r="2.5" />
        <circle cx="348" cy="120" r="2.5" />
      </g>
    </svg>
  )
}
