import { useRef } from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import { SectionHeader } from '../common/Section';
import { agenticAI } from '../../data/content';

export default function AgenticAI() {
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
    <section id="agentic-ai" ref={ref} className="section">
      <div className="container">
        <SectionHeader
          kicker="Agentic AI"
          heading="Autonomous systems I&rsquo;m building."
          description={agenticAI.intro}
        />

        <div className="ai__intro card reveal--stagger">
          <p className="lead">{agenticAI.intro}</p>
        </div>

        <div className="ai__diagram reveal--stagger" aria-label="Agent system flow diagram">
          <svg className="ai__diagram-svg--wide" width="100%" height="220" viewBox="0 0 740 220" role="img" aria-labelledby="agent-diagram-title">
            <title id="agent-diagram-title">Agentic system flow: user request routes through an orchestrator to specialized agents and tools.</title>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#818cf8" />
              </marker>
              <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#17171f" />
                <stop offset="100%" stopColor="#111116" />
              </linearGradient>
            </defs>

            <g className="node">
              <rect x="30" y="90" width="130" height="60" rx="12" fill="url(#nodeGrad)" stroke="#334155" />
              <text x="95" y="110" font-family="monospace" font-size="12" fill="#22d3ee" textAnchor="middle">USER</text>
              <text x="95" y="130" font-family="monospace" font-size="11" fill="#94a3b8" textAnchor="middle">request</text>
            </g>

            <g className="node">
              <rect x="280" y="40" width="140" height="140" rx="24" fill="url(#nodeGrad)" stroke="#22d3ee" strokeWidth="1.5" />
              <text x="350" y="82" font-family="monospace" font-size="13" fontWeight="700" fill="#22d3ee" textAnchor="middle">ORCHESTRATOR</text>
              <text x="350" y="102" font-family="monospace" font-size="11" fill="#94a3b8" textAnchor="middle">plan · decide · delegate</text>
              <circle cx="322" cy="140" r="6" fill="#22d3ee" />
              <circle cx="350" cy="140" r="6" fill="#818cf8" />
              <circle cx="378" cy="140" r="6" fill="#22d3ee" />
            </g>

            <g className="node">
              <rect x="460" y="20" width="140" height="60" rx="12" fill="url(#nodeGrad)" stroke="#818cf8" />
              <text x="530" y="46" font-family="monospace" font-size="12" fill="#818cf8" textAnchor="middle">RESEARCH AGENT</text>
              <text x="530" y="64" font-family="monospace" font-size="11" fill="#94a3b8" textAnchor="middle">browse · read · cite</text>
            </g>
            <g className="node">
              <rect x="460" y="140" width="140" height="60" rx="12" fill="url(#nodeGrad)" stroke="#818cf8" />
              <text x="530" y="166" font-family="monospace" font-size="12" fill="#818cf8" textAnchor="middle">CODING AGENT</text>
              <text x="530" y="184" font-family="monospace" font-size="11" fill="#94a3b8" textAnchor="middle">write · review · test</text>
            </g>

            <g className="node">
              <rect x="280" y="190" width="140" height="20" rx="10" fill="#0a0a0c" stroke="#334155" />
              <text x="350" y="205" font-family="monospace" font-size="11" fill="#565662" textAnchor="middle">TOOLS: search · code · database</text>
            </g>

            <path d="M160 120 Q230 100 260 80" fill="none" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <path d="M350 180 Q350 195 350 198" fill="none" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <path d="M365 110 Q415 85 460 50" fill="none" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <path d="M365 110 Q415 175 460 170" fill="none" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <path d="M600 100 Q650 100 680 130" fill="none" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <text x="690" y="135" font-family="monospace" font-size="11" fill="#565662">RESULT</text>
          </svg>

          {/* Compact vertical variant for phones and narrow tablets. */}
          <svg className="ai__diagram-svg--tall" width="100%" height="470" viewBox="0 0 360 470" role="img" aria-labelledby="agent-diagram-title-mobile">
            <title id="agent-diagram-title-mobile">Agentic system flow: a user request reaches an orchestrator, which delegates to research and coding agents before returning a result.</title>
            <defs>
              <marker id="arrow-m" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#818cf8" />
              </marker>
              <linearGradient id="nodeGrad-m" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#17171f" />
                <stop offset="100%" stopColor="#111116" />
              </linearGradient>
            </defs>

            <g className="node">
              <rect x="110" y="6" width="140" height="48" rx="12" fill="url(#nodeGrad-m)" stroke="#334155" />
              <text x="180" y="27" font-family="monospace" font-size="12" fill="#22d3ee" textAnchor="middle">USER</text>
              <text x="180" y="44" font-family="monospace" font-size="10" fill="#94a3b8" textAnchor="middle">request</text>
            </g>

            <path d="M180 54 V76" fill="none" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-m)" />

            <g className="node">
              <rect x="80" y="80" width="200" height="88" rx="20" fill="url(#nodeGrad-m)" stroke="#22d3ee" strokeWidth="1.5" />
              <text x="180" y="106" font-family="monospace" font-size="13" fontWeight="700" fill="#22d3ee" textAnchor="middle">ORCHESTRATOR</text>
              <text x="180" y="126" font-family="monospace" font-size="10" fill="#94a3b8" textAnchor="middle">plan · decide · delegate</text>
              <circle cx="152" cy="148" r="5" fill="#22d3ee" />
              <circle cx="180" cy="148" r="5" fill="#818cf8" />
              <circle cx="208" cy="148" r="5" fill="#22d3ee" />
            </g>

            <path d="M180 168 V190" fill="none" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#arrow-m)" />

            <g className="node">
              <rect x="60" y="194" width="240" height="54" rx="12" fill="url(#nodeGrad-m)" stroke="#818cf8" />
              <text x="180" y="217" font-family="monospace" font-size="12" fill="#818cf8" textAnchor="middle">RESEARCH AGENT</text>
              <text x="180" y="235" font-family="monospace" font-size="10" fill="#94a3b8" textAnchor="middle">browse · read · cite</text>
            </g>

            <path d="M180 248 V268" fill="none" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arrow-m)" />

            <g className="node">
              <rect x="60" y="272" width="240" height="54" rx="12" fill="url(#nodeGrad-m)" stroke="#818cf8" />
              <text x="180" y="295" font-family="monospace" font-size="12" fill="#818cf8" textAnchor="middle">CODING AGENT</text>
              <text x="180" y="313" font-family="monospace" font-size="10" fill="#94a3b8" textAnchor="middle">write · review · test</text>
            </g>

            <path d="M180 326 V346" fill="none" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-m)" />

            <g className="node">
              <rect x="30" y="350" width="300" height="52" rx="12" fill="#0a0a0c" stroke="#334155" />
              <text x="180" y="373" font-family="monospace" font-size="11" fill="#565662" textAnchor="middle">TOOLS</text>
              <text x="180" y="390" font-family="monospace" font-size="10" fill="#565662" textAnchor="middle">search · code · database</text>
            </g>

            <path d="M180 402 V422" fill="none" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#arrow-m)" />

            <g className="node">
              <rect x="120" y="426" width="120" height="38" rx="10" fill="url(#nodeGrad-m)" stroke="#22d3ee" />
              <text x="180" y="450" font-family="monospace" font-size="11" fill="#22d3ee" textAnchor="middle">RESULT</text>
            </g>
          </svg>
        </div>

        <div className="ai__grid">
          {agenticAI.agents.map((agent) => (
            <div key={agent.title} className="card reveal--stagger ai__agent">
              <div className="ai__agent__header">
                <div>
                  <h3>{agent.title}</h3>
                  <span className={`status-badge status-badge--${agent.status === 'Production' ? 'production' : 'prototype'}`}>
                    {agent.status}
                  </span>
                </div>
              </div>
              <p className="text-muted">{agent.description}</p>
              <div className="ai__caps">
                <strong className="text-muted">Capabilities:</strong>
                {agent.capabilities.map((c) => (
                  <span key={c} className="pill">{c}</span>
                ))}
              </div>
              <div className="ai__tech">
                <strong className="text-muted">Stack:</strong>
                {agent.tech.map((t) => (
                  <span key={t} className="pill">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
