const PALETTE = {
  'Agentic AI': { c1: '#22d3ee', c2: '#818cf8' },
  'Data Science': { c1: '#818cf8', c2: '#a78bfa' },
  'Full-Stack': { c1: '#22d3ee', c2: '#4ade80' },
  default: { c1: '#64748b', c2: '#94a3b8' },
}

function initials(title) {
  return title
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/**
 * Generates a deterministic SVG data-URI thumbnail for a project.
 * Keeps the portfolio dependency-free for images while looking intentional.
 */
export function svgThumbnail(project) {
  const { c1, c2 } = PALETTE[project.category] || PALETTE.default
  const text = initials(project.title)
  const width = 600
  const height = 400
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}" />
      <stop offset="100%" stop-color="${c2}" />
    </linearGradient>
    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="24" />
    </filter>
  </defs>
  <rect width="${width}" height="${height}" fill="#0a0a0c" />
  <circle cx="${width * 0.62}" cy="${height * 0.28}" r="${height * 0.55}" fill="url(#g)" filter="url(#blur)" />
  <circle cx="${width * 0.18}" cy="${height * 0.78}" r="${height * 0.35}" fill="url(#g)" filter="url(#blur)" style="mix-blend-mode: screen; opacity: 0.6" />
  <rect x="0" y="0" width="${width}" height="${height}" fill="rgba(10, 10, 12, 0.35)" />
  <rect x="0" y="0" width="${width}" height="${height}" fill="url(#g)" opacity="0.08" />
  <path d="M ${width * 0.12} ${height * 0.5} L ${width * 0.2} ${height * 0.62} L ${width * 0.28} ${height * 0.42}" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="${width * 0.12}" cy="${height * 0.5}" r="3" fill="rgba(255,255,255,0.5)" />
  <circle cx="${width * 0.2}" cy="${height * 0.62}" r="2.5" fill="rgba(255,255,255,0.4)" />
  <circle cx="${width * 0.28}" cy="${height * 0.42}" r="2" fill="rgba(255,255,255,0.35)" />
  <text x="${width / 2}" y="${height / 2 + 8}" font-family="var(--font-mono), monospace" font-size="42" font-weight="700" fill="rgba(255,255,255,0.55)" text-anchor="middle" letter-spacing="4">${text}</text>
  <text x="${width / 2}" y="${height - 56}" font-family="var(--font-mono), monospace" font-size="15" font-weight="700" fill="rgba(255,255,255,0.35)" text-anchor="middle" letter-spacing="2">${project.category}</text>
</svg>
`.trim()
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
