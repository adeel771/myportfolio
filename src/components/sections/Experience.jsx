import { useRef } from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import { SectionHeader } from '../common/Section';
import { experience } from '../../data/content';

export default function Experience() {
  const ref = useRef(null);

  useGSAP(
    ({ gsap: g }) => {
      const targets = ref.current?.querySelectorAll('.reveal, .reveal--stagger');
      if (!targets || !targets.length) return;

      g.from(targets, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.14,
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
    <section id="experience" ref={ref} className="section">
      <div className="container">
        <SectionHeader
          kicker="Experience"
          heading="Selected experience."
          description="Roles, companies, and dates are placeholders — update src/data/content.js."
        />

        <div className="experience__timeline">
          <div className="experience__line" />
          {experience.map((job, i) => (
            <div
              key={`${job.company}-${i}`}
              className={['experience__item', i % 2 === 0 ? 'experience__item--left' : 'experience__item--right'].join(' ')}
            >
              <div className="experience__dot" />
              <div className="card experience__card reveal--stagger">
                <div className="experience__meta">
                  <span className="tag tag--outline">{job.type}</span>
                  <span className="text-muted">{job.period}</span>
                  <span className="text-muted">{job.location}</span>
                </div>
                <h3>{job.role}</h3>
                <h4>{job.company}</h4>
                <ul className="experience__highlights">
                  {job.highlights.map((h) => (
                    <li key={h}>
                      <span className="text-muted">&mdash;</span> {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {experience.length === 0 && (
          <p className="text-muted text-center" style={{ marginTop: 40 }}>
            Add your experience in src/data/content.js.
          </p>
        )}
      </div>
    </section>
  );
}
