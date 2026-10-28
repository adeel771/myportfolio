import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

import { useGSAP } from '../../hooks/useGSAP';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useLenis } from '../../hooks/useLenis';
import { supportsWebGL } from '../../utils/webgl';

import HeroConstellation from './HeroConstellation';
import HeroFallback from './HeroFallback';
import { Button } from '../common/Button';
import { personal } from '../../data/content';

const gsapCore = gsap.gsap || gsap.default || gsap;

const ROLES = [
  'Software Engineer',
  'Full-Stack Developer',
  'Agentic AI Engineer',
];

export default function Hero() {
  const heroRef = useRef(null);
  const roleTextRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);

  const webgl = supportsWebGL();
  const reducedMotion = useReducedMotion();
  const lenis = useLenis();

  const email = personal.email || '';
  const emailConfigured =
    email.length > 0 && !email.includes('example');

  const emailHref = emailConfigured ? `mailto:${email}` : '#contact';

  // Animate the role text without creating a new timeline on every render.
  useEffect(() => {
    const roleElement = roleTextRef.current;

    if (!roleElement || reducedMotion) {
      if (roleElement) {
        roleElement.textContent = ROLES[0];
      }
      setRoleIndex(0);
      return undefined;
    }

    const timeline = gsapCore.timeline({
      repeat: -1,
      repeatDelay: 2,
    });

    timeline
      .to(roleElement, {
        opacity: 0,
        y: -8,
        duration: 0.3,
        ease: 'power2.in',
      })
      .call(() => {
        setRoleIndex((previous) => (previous + 1) % ROLES.length);
      })
      .set(roleElement, { y: 8 })
      .to(roleElement, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
      });

    return () => {
      timeline.kill();
    };
  }, [reducedMotion]);

  // Keep the visible role text in sync with React state.
  useEffect(() => {
    if (roleTextRef.current) {
      roleTextRef.current.textContent = ROLES[roleIndex];
    }
  }, [roleIndex]);

  // Intro animation for the hero section, safely scoped in GSAP context
  useGSAP(
    (g) => {
      const hero = heroRef.current;
      if (!hero) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      const duration = prefersReducedMotion ? 0.01 : 0.8;

      const timeline = g.timeline({
        defaults: {
          ease: 'power3.out',
          duration,
        },
      });

      timeline
        .from(hero.querySelector('.hero__kicker'), {
          y: 24,
          opacity: 0,
        })
        .from(
          hero.querySelector('.hero__name'),
          { y: 30, opacity: 0 },
          '-=0.5'
        )
        .from(
          hero.querySelector('.hero__role'),
          { y: 20, opacity: 0 },
          '-=0.5'
        )
        .from(
          hero.querySelector('.hero__lead'),
          { y: 20, opacity: 0 },
          '-=0.5'
        )
        .from(
          hero.querySelector('.hero__ctas'),
          { y: 20, opacity: 0 },
          '-=0.5'
        )
        .from(
          hero.querySelector('.hero__scroll'),
          { y: 12, opacity: 0 },
          '-=0.3'
        );

      if (!prefersReducedMotion) {
        const canvas = hero.querySelector('.hero-canvas-wrap');

        if (canvas) {
          g.from(canvas, {
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out',
          });
        }
      }
    },
    []
  );

  // Smoothly scroll to the projects section.
  const handleViewWork = (event) => {
    event.preventDefault();

    if (lenis) {
      lenis.scrollTo('#projects', {
        offset: -88,
        duration: reducedMotion ? 0 : 1.1,
      });
      return;
    }

    const projects = document.querySelector('#projects');

    if (projects) {
      projects.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    } else {
      window.location.hash = 'projects';
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero"
      aria-label="Introduction"
    >
      <div className="hero-canvas-wrap" aria-hidden="true">
        {webgl ? <HeroConstellation /> : <HeroFallback />}
      </div>

      <div className="hero__content">
        <div className="hero__body">
          <div className="hero__kicker reveal">
            Creative Engineer
          </div>

          <h1 className="hero__name reveal">
            {personal.name || 'Adeel'}
            <span className="text-accent">.</span>
          </h1>

          <div className="hero__role reveal">
            <span
              ref={roleTextRef}
              id="hero-role"
              aria-live="polite"
              aria-atomic="true"
            >
              {ROLES[0]}
            </span>
          </div>

          <p className="hero__lead lead reveal">
            I build full-stack software, data pipelines, and autonomous
            Agentic AI systems — tools that think, adapt, and ship.
          </p>

          <div className="hero__ctas btn-group reveal">
            <Button
              href="#projects"
              variant="primary"
              arrow
              onClick={handleViewWork}
            >
              View Work
            </Button>

            <Button
              href={emailHref}
              variant="outline"
              aria-label={
                emailConfigured
                  ? 'Send me an email'
                  : 'Go to contact section'
              }
            >
              Get in Touch
            </Button>
          </div>

          <div
            className="hero__scroll scroll-indicator"
            aria-hidden="true"
          >
            <svg
              width="20"
              height="32"
              viewBox="0 0 20 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 5 L10 27" />
              <path d="M7 22 L10 27 L13 22" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
