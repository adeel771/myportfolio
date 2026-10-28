import { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const gsapCore = gsap.gsap || gsap.default || gsap;

if (typeof window !== 'undefined' && gsapCore && gsapCore.registerPlugin) {
  gsapCore.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Custom React hook for robust GSAP animation lifecycle and cleanup.
 * Uses GSAP Context (gsap.context) to track and automatically revert all animations,
 * tweens, timelines, and ScrollTriggers on unmount or dependency change.
 *
 * Supports all callback conventions used throughout the project:
 * - ({ gsap: g, ScrollTrigger }) => { ... }
 * - (g) => { ... }
 * - () => { ... }
 */
export function useGSAP(callback, dependencies = []) {
  const deps = Array.isArray(dependencies)
    ? dependencies
    : dependencies?.dependencies || [];
  const scope = Array.isArray(dependencies) ? undefined : dependencies?.scope;

  useIsomorphicLayoutEffect(() => {
    if (typeof callback !== 'function' || !gsapCore || typeof gsapCore.context !== 'function') {
      return undefined;
    }

    const contextParam = Object.assign(
      (...args) => gsapCore(...args),
      gsapCore,
      {
        gsap: gsapCore,
        ScrollTrigger,
      }
    );

    const ctx = gsapCore.context((self) => {
      contextParam.context = self;
      callback(contextParam, ScrollTrigger, self);
    }, scope);

    return () => {
      ctx.revert();
    };
  }, deps);
}

export default useGSAP;
