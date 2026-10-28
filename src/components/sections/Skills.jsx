import { useRef, useMemo } from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import { Marquee } from '../../hooks/useMarquee';
import { SectionHeader } from '../common/Section';
import { skills } from '../../data/content';

export default function Skills() {
  const ref = useRef(null);

  // Build the marquee items: each skill repeated twice for a seamless loop with unique keys
  const allSkills = useMemo(() => {
    const names = skills.flatMap((cat) => cat.items.map((s) => s.name));
    return [...names, ...names].map((name, idx) => (
      <span key={`${name}-${idx}`} className="marquee-item">
        {name}
      </span>
    ));
  }, []);

  useGSAP(
    ({ gsap: g }) => {
      const targets = ref.current?.querySelectorAll('.reveal, .reveal--stagger');
      if (!targets || !targets.length) return;

      g.from(targets, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
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
    <section id="skills" ref={ref} className="section">
      <div className="container">
        <SectionHeader
          kicker="Toolbox"
          heading="Technologies I reach for."
          description="A selection of the tools in my regular rotation, grouped by practice."
        />

        <div className="skills__marquee">
          <Marquee items={allSkills} speed={30} />
        </div>

        <div className="skills__grid">
          {skills.map((category) => (
            <div key={category.category} className="card reveal--stagger">
              <div className="skills__cat">
                <span className={`tag tag--${category.color}`}>{category.category}</span>
                <span className="text-dim">{category.items.length} skills</span>
              </div>
              <div className="skills__list">
                {category.items.map((skill) => (
                  <span
                    key={skill.name}
                    className="pill"
                    title={`${skill.name} — ${skill.level}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
