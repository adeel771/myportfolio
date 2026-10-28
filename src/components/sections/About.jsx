import { useRef } from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import { SectionHeader } from '../common/Section';
import { Button } from '../common/Button';
import { personal } from '../../data/content';

export default function About() {
  const ref = useRef(null);

  useGSAP(
    ({ gsap: g }) => {
      const targets = ref.current?.querySelectorAll('.reveal, .reveal--stagger');
      if (!targets || !targets.length) return;

      g.from(targets, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });
    },
    []
  );

  return (
    <section id="about" ref={ref} className="section">
      <div className="container">
        <SectionHeader
          kicker="About me"
          heading="Engineering with intent."
          description={personal.bio}
        />

        <div className="about__grid">
          <div className="about__media card reveal--stagger">
            {personal.photo ? (
              <img
                className="about__photo"
                src={personal.photo}
                alt={`Portrait of ${personal.name}`}
                width="1036"
                height="1400"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="about__avatar">
                <span className="about__initials">{personal.name.charAt(0)}</span>
                <span className="visually-hidden">Profile placeholder — add your photo</span>
              </div>
            )}
          </div>

          <div className="about__copy reveal--stagger">
            <p className="lead">
              I&rsquo;m {personal.name} &mdash; <span className="text-gradient">{personal.headline}</span>,
              currently focused on <span className="text-accent-2">{personal.focus}</span>.
            </p>
            <p>
              I enjoy turning complex problems into usable products: shipping
              performant web applications, modeling data, and exploring how
              autonomous agents can take over repetitive engineering work.
            </p>
            <dl className="about__stats">
              <div className="about__stat">
                <dt>Practice</dt>
                <dd>Full-stack engineering · Data science · Agentic AI</dd>
              </div>
              <div className="about__stat">
                <dt>Location</dt>
                <dd>{personal.location}</dd>
              </div>
              <div className="about__stat">
                <dt>Availability</dt>
                <dd>Open to collaboration and new opportunities</dd>
              </div>
            </dl>
            <div className="btn-group" style={{ marginTop: 24 }}>
              {personal.resume && personal.resume !== '#' ? (
                <Button href={personal.resume} variant="outline" arrow target="_blank" rel="noopener noreferrer">
                  Download Résumé
                </Button>
              ) : (
                <Button variant="outline" arrow disabled title="Résumé not configured yet">
                  Download Résumé
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
