import { useRef, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Mail, ArrowLeft } from 'lucide-react';

import { useGSAP } from '../../hooks/useGSAP';
import { SectionHeader } from '../common/Section';
import { Button } from '../common/Button';
import { projects, personal } from '../../data/content';
import { svgThumbnail } from '../../utils/svgThumbnail';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const ref = useRef(null);

  const project = useMemo(
    () => projects.find((item) => item.slug === slug) || null,
    [slug]
  );

  useGSAP(
    ({ gsap: g }) => {
      const section = ref.current;
      if (!section || !project) return;

      const elements = section.querySelectorAll('.detail__reveal, .reveal');

      g.timeline({
        defaults: {
          ease: 'power3.out',
          duration: 0.7,
        },
      }).from(elements, {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        clearProps: 'opacity,transform',
      });
    },
    [slug, project]
  );

  if (!project) {
    return (
      <section className="section">
        <div
          className="container text-center"
          style={{ paddingTop: 120 }}
        >
          <SectionHeader
            kicker="Oops"
            heading="Project not found."
            description="This project may have been moved or the link may be incorrect."
          />

          <Button
            variant="outline"
            arrow
            onClick={() => navigate('/')}
          >
            Back to work
          </Button>
        </div>
      </section>
    );
  }

  const thumbnail = project.thumbnail || svgThumbnail(project);

  const githubConfigured =
    typeof project.github === 'string' &&
    project.github.startsWith('https://') &&
    !project.github.includes('example');

  const liveConfigured =
    typeof project.liveDemo === 'string' &&
    project.liveDemo.startsWith('https://') &&
    !project.liveDemo.includes('example');

  const emailConfigured =
    typeof personal.email === 'string' &&
    personal.email.includes('@') &&
    !personal.email.includes('example');

  const relatedProjects = projects
    .filter((item) => item.id !== project.id)
    .slice(0, 3);

  return (
    <section
      id="project-detail"
      ref={ref}
      className="section"
    >
      <div className="container">
        <nav
          className="detail__nav reveal"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="detail__back">
            <ArrowLeft size={16} strokeWidth={2} />
            <span>Work</span>
          </Link>

          <span
            aria-hidden="true"
            style={{
              color: 'var(--color-text-muted)',
              margin: '0 8px',
            }}
          >
            &rsaquo;
          </span>

          <span aria-current="page">{project.title}</span>
        </nav>

        <SectionHeader
          kicker={project.category || 'Project'}
          heading={project.title}
          description={project.description}
          className="reveal"
        />

        <div className="detail__grid">
          <div className="detail__media card reveal">
            <img
              src={thumbnail}
              alt={`${project.title} preview`}
              className="detail__thumb"
              loading="eager"
              decoding="async"
            />

            <div className="detail__meta">
              {project.featured && (
                <span className="tag tag--accent-2">
                  Featured
                </span>
              )}

              {project.placeholder && (
                <span className="placeholder-badge">
                  Example project
                </span>
              )}

              {project.category && (
                <span className="tag tag--outline">
                  {project.category}
                </span>
              )}
            </div>
          </div>

          <div className="detail__copy reveal">
            <h3>The brief</h3>

            <p>
              {project.longDescription || project.description}
            </p>

            <div className="detail__tech">
              <h4>Technologies</h4>

              <div className="detail__tech__list">
                {(project.technologies || []).map((technology) => (
                  <span key={technology} className="pill">
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="detail__ctas btn-group"
              style={{ marginTop: 30 }}
            >
              {githubConfigured && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline btn--arrow"
                >
                  GitHub Repository
                  <ArrowRight
                    className="btn-arrow"
                    strokeWidth={2}
                  />
                </a>
              )}

              {liveConfigured && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--arrow"
                >
                  Live Demo
                  <ArrowRight
                    className="btn-arrow"
                    strokeWidth={2}
                  />
                </a>
              )}

              {emailConfigured && (
                <a
                  href={`mailto:${personal.email}?subject=${encodeURIComponent(
                    `Question about ${project.title}`
                  )}`}
                  className="btn btn--ghost btn--arrow"
                >
                  Ask About This Project
                  <Mail size={16} strokeWidth={2} />
                </a>
              )}

              {!githubConfigured &&
                !liveConfigured &&
                !emailConfigured && (
                  <p className="text-muted">
                    Project links are not configured yet. Update
                    {' '}
                    <code>src/data/content.js</code>.
                  </p>
                )}
            </div>
          </div>
        </div>

        {relatedProjects.length > 0 && (
          <div className="detail__related-section reveal">
            <h3>Related work</h3>

            <div className="projects__grid">
              {relatedProjects.map((item) => (
                <article
                  key={item.id}
                  className="card detail__related"
                >
                  <img
                    src={item.thumbnail || svgThumbnail(item)}
                    alt={`${item.title} preview`}
                    className="related__thumb"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="detail__body">
                    {item.category && (
                      <span className="tag tag--outline">
                        {item.category}
                      </span>
                    )}

                    <h3>{item.title}</h3>

                    <p className="project__desc text-muted">
                      {item.description}
                    </p>

                    {item.slug && (
                      <Link
                        to={`/projects/${item.slug}`}
                        className="btn btn--ghost btn--arrow"
                      >
                        View case study
                        <ArrowRight
                          className="btn-arrow"
                          strokeWidth={2}
                        />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
