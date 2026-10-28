import {
  useRef,
  useState,
  useMemo,
  useCallback,
  useLayoutEffect,
} from 'react';

import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

import { useGSAP } from '../../hooks/useGSAP';
import { SectionHeader } from '../common/Section';
import { ProjectCard } from './ProjectCard';
import { projects, filterCategories } from '../../data/content';
import { svgThumbnail } from '../../utils/svgThumbnail';

const gsapCore = gsap.gsap || gsap.default || gsap;
const FlipPlugin = Flip?.Flip || Flip?.default || Flip;

if (typeof window !== 'undefined' && gsapCore?.registerPlugin && FlipPlugin) {
  gsapCore.registerPlugin(FlipPlugin);
}

export default function Projects() {
  const ref = useRef(null);
  const flipStateRef = useRef(null);

  const [filter, setFilter] = useState('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return projects;

    return projects.filter((project) => project.category === filter);
  }, [filter]);

  // Generate a fallback thumbnail for projects without one.
  const projectsWithThumbs = useMemo(
    () =>
      filtered.map((project) => ({
        ...project,
        thumbnail: project.thumbnail || svgThumbnail(project),
      })),
    [filtered]
  );

  // Reveal project cards when the section enters the viewport.
  useGSAP(
    (g) => {
      const section = ref.current;
      if (!section) return;

      const cards = section.querySelectorAll('.project-card');
      if (!cards.length) return;

      g.from(cards, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    },
    []
  );

  // Capture the current card positions before changing the filter.
  const setFilterWithFlip = useCallback(
    (category) => {
      if (category === filter) return;

      const grid = ref.current?.querySelector('.projects__grid');

      if (grid) {
        const cards = grid.querySelectorAll('.project-card');
        flipStateRef.current = cards.length && FlipPlugin?.getState
          ? FlipPlugin.getState(cards)
          : null;
      }

      setFilter(category);
    },
    [filter]
  );

  // Animate cards that remain after React updates the grid.
  useLayoutEffect(() => {
    const previousState = flipStateRef.current;
    flipStateRef.current = null;

    if (!previousState || !ref.current || !FlipPlugin?.from) return;

    const grid = ref.current.querySelector('.projects__grid');
    if (!grid) return;

    const cards = grid.querySelectorAll('.project-card');
    if (!cards.length) return;

    FlipPlugin.from(previousState, {
      targets: cards,
      duration: 0.5,
      ease: 'power2.inOut',
      absolute: true,
      stagger: 0.04,
      scale: false,
    });
  }, [filter]);

  const hasPlaceholders = projects.some(
    (project) => project.placeholder
  );

  return (
    <section
      id="projects"
      ref={ref}
      className="section"
      aria-label="Projects"
    >
      <div className="container">
        <SectionHeader
          kicker="Selected work"
          heading="Things I've built."
          description={
            hasPlaceholders ? (
              <span>
                These are <strong>example</strong> projects — replace{' '}
                <code>src/data/content.js</code> with your real work.
              </span>
            ) : (
              'Explore my projects and selected work.'
            )
          }
        />

        <div className="projects__controls reveal">
          <div className="filter__group" aria-label="Filter projects">
            {filterCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={[
                  'pill',
                  filter === category ? 'pill--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setFilterWithFlip(category)}
                aria-pressed={filter === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="projects__grid" aria-live="polite">
          {projectsWithThumbs.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              dataFlipId={project.id}
            />
          ))}

          {projectsWithThumbs.length === 0 && (
            <div className="card">
              <p className="text-muted">
                No projects match the selected filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
