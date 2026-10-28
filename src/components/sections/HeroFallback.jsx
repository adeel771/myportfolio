/**
 * CSS-only hero background when WebGL is unavailable.
 * Soft animated gradient blobs keep the premium feel without Three.js.
 */
export default function HeroFallback() {
  return (
    <div className="hero-fallback" aria-hidden="true">
      <div className="blob blob--1" />
      <div className="blob blob--2" />
      <div className="blob blob--3" />
      <div className="hero-fallback__grid" aria-hidden="true" />
    </div>
  )
}
