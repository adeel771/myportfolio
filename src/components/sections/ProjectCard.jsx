import { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GitBranch } from 'lucide-react';

export function ProjectCard({ project, dataFlipId }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((event) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    if (!centerX || !centerY) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) ` +
      `rotateY(${rotateY}deg) scale(1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = '';
    }
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    // Skip the 3D tilt on touch devices — it fights with scrolling and sticks.
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches) {
      card.style.transform = '';
      return undefined;
    }

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const githubConfigured =
    typeof project.github === 'string' &&
    project.github.startsWith('https://') &&
    !project.github.includes('example');

  const liveConfigured =
    typeof project.liveDemo === 'string' &&
    project.liveDemo.startsWith('https://') &&
    !project.liveDemo.includes('example');

  return (
    <article
      ref={cardRef}
      className="card project-card"
      data-flip-id={dataFlipId}
    >
      <div className="project__thumb">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title || 'Project preview'}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="project__thumb-placeholder"
            role="img"
            aria-label="No project preview available"
          >
            Project Preview
          </div>
        )}

        <div className="project__overlay" />

        <div className="project__badges">
          {project.featured && (
            <span className="tag tag--accent-2">Featured</span>
          )}

          {project.placeholder && (
            <span className="placeholder-badge">Example</span>
          )}
        </div>
      </div>

      <div className="project__body">
        <span className="tag tag--outline">
          {project.category || 'Project'}
        </span>

        <h3>{project.title}</h3>

        <p className="project__desc text-muted">
          {project.description}
        </p>

        <div className="project__tech">
          {(project.technologies || []).map((tech) => (
            <span key={tech} className="pill">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <footer className="project__footer">
        {project.caseStudy && project.slug && (
          <Link
            to={`/projects/${project.slug}`}
            className="btn btn--ghost btn--arrow"
          >
            Case study
            <ArrowRight className="btn-arrow" strokeWidth={2} />
          </Link>
        )}

        <div className="project__links">
          {githubConfigured && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
              aria-label={`GitHub repository for ${project.title}`}
              title="View source code"
            >
              <GitBranch size={16} />
            </a>
          )}

          {liveConfigured && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
              aria-label={`Live demo for ${project.title}`}
              title="Open live demo"
            >
              <ArrowRight size={16} />
            </a>
          )}
        </div>
      </footer>
    </article>
  );
}

export default ProjectCard;
