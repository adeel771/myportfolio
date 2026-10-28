import {
  useEffect,
  useState,
  createContext,
  useContext,
} from 'react';

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }

    const instance = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      easing: (t) => 1 - Math.pow(2, -10 * t),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 2,
    });

    const handleScroll = () => {
      ScrollTrigger.update();
      window.dispatchEvent(new Event('lenis-scroll'));
    };

    const updateLenis = (time) => {
      instance.raf(time * 1000);
    };

    instance.on('scroll', handleScroll);

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    // Refresh trigger positions after the page layout is ready.
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateLenis);
      instance.off('scroll', handleScroll);
      instance.destroy();

      setLenis(null);
    };
  }, [reducedMotion]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}

export default LenisProvider;
