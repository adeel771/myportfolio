import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const gsapCore = gsap.gsap || gsap.default || gsap;

/**
 * Infinite horizontal marquee. Pass items (already duplicated by the caller if
 * seamless looping is desired) and an optional speed in seconds per loop.
 */
export function Marquee({ items, speed = 25, className }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const anim = gsapCore.to(track, {
      xPercent: -50,
      duration: speed,
      repeat: -1,
      ease: 'none',
    });

    return () => {
      anim.kill();
    };
  }, [speed]);

  return (
    <div className={`marquee-wrap ${className || ''}`} aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
        {items}
      </div>
    </div>
  );
}

export default Marquee;


