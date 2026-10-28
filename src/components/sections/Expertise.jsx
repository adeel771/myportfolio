import { useRef } from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import { SectionHeader } from '../common/Section';
import { Code, Database, Brain, Sparkles, Layers, ShieldCheck } from 'lucide-react';

const EXPERTISE = [
  {
    icon: Code,
    title: 'Full-Stack Development',
    color: 'accent',
    body:
      'Responsive, resilient web applications built with React, modern TypeScript, and clean backend services.',
    tags: ['React', 'TypeScript', 'Node.js', 'REST & GraphQL'],
  },
  {
    icon: Brain,
    title: 'Agentic AI Systems',
    color: 'accent-2',
    body:
      'Multi-agent workflows, autonomous problem-solving, tool integration, and evaluation harnesses for LLM applications.',
    tags: ['LangChain', 'LangGraph', 'AutoGen', 'Tool Use'],
  },
  {
    icon: Database,
    title: 'Data Science & ML',
    color: 'accent',
    body:
      'Pipelines that transform messy data into production features: tabular modeling, NLP, and vector search embeddings.',
    tags: ['Python', 'Pandas', 'PyTorch', 'Vector DBs'],
  },
  {
    icon: Sparkles,
    title: 'Creative Interaction',
    color: 'accent-2',
    body:
      'Carefully crafted motion, 3D accents, and responsive physics that make digital products feel alive and memorable.',
    tags: ['Three.js', 'GSAP', 'Canvas', 'WebGL'],
  },
  {
    icon: Layers,
    title: 'Architecture & DevOps',
    color: 'accent',
    body:
      'Clean boundaries, containerized environments, CI/CD pipelines, and observability from day one.',
    tags: ['Docker', 'AWS', 'PostgreSQL', 'Redis'],
  },
  {
    icon: ShieldCheck,
    title: 'Quality & Craft',
    color: 'accent-2',
    body:
      'Typed codebases, test coverage, code review, and documentation as a default way of working.',
    tags: ['TypeScript', 'Testing', 'Reviews'],
  },
];

export default function Expertise() {
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
        stagger: 0.12,
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
    <section id="expertise" ref={ref} className="section">
      <div className="container">
        <SectionHeader
          kicker="What I do"
          heading="A few things I&rsquo;ve spent time mastering."
          description="I work across the stack, with data, and increasingly with autonomous systems."
        />

        <div className="expertise__grid">
          {EXPERTISE.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="card reveal--stagger expertise__item">
                <div className="expertise__icon">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <h3>{item.title}</h3>
                <p className="text-muted">{item.body}</p>
                <div className="expertise__tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className={`tag tag--${item.color}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
