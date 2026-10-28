

export const personal = {
  // UPDATE_ME: your full name
  name: 'Muhammad.Adeel',
  // UPDATE_ME: your professional headline
  headline: 'Software Engineer & Full-Stack Developer',
  focus: 'Data Science · Agentic AI',
  // UPDATE_ME: short blurb shown in the About section
  bio:
    'I build digital products, data pipelines, and autonomous systems. My work sits at the intersection of software engineering, data science, and Agentic AI — crafting tools that think, adapt, and ship.',
  // UPDATE_ME: your location (e.g. "Remote" or a city)
  location: '[Karachi, Pakistan / Remote]',
  // UPDATE_ME: your email address
  email: 'adeelrajpoot0343@gmail.com',
  // UPDATE_ME: link to your résumé/CV (PDF)
  resume: '/resume.pdf',
  // Profile photo shown in the About section
  photo: '/profile.png',
  // UPDATE_ME: set to true once you have replaced example projects with real work
  examplesMode: true,
  socials: [
    { name: 'GitHub', icon: 'Github', url: 'https://github.com/adeel771' },
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://www.linkedin.com/in/muhammadadeel771' },
    { name: 'Email', icon: 'Mail', url: 'mailto:adeelrajpoot0343@gmail.com' },
  ],
}

export const skills = [
  {
    category: 'Engineering',
    color: 'accent', // cyan
    items: [
      { name: 'React', level: 'Advanced' },
      { name: 'TypeScript', level: 'Advanced' },
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Python', level: 'Comfortable' },
      { name: 'PostgreSQL', level: 'Comfortable' },
      { name: 'Redis', level: 'Familiar' },
      { name: 'Docker', level: 'Familiar' },
      { name: 'AWS', level: 'Familiar' },
    ],
  },
  {
    category: 'Data Science',
    color: 'accent-2', // violet
    items: [
      { name: 'Pandas', level: 'Advanced' },
      { name: 'NumPy', level: 'Advanced' },
      { name: 'scikit-learn', level: 'Comfortable' },
      { name: 'PyTorch', level: 'Comfortable' },
      { name: 'Jupyter', level: 'Comfortable' },
      { name: 'MLflow', level: 'Familiar' },
      { name: 'Tableau', level: 'Familiar' },
      { name: 'SQL', level: 'Advanced' },
    ],
  },
  {
    category: 'Agentic AI',
    color: 'accent',
    items: [
      { name: 'LangChain', level: 'Comfortable' },
      { name: 'LangGraph', level: 'Comfortable' },
      { name: 'AutoGen', level: 'Familiar' },
      { name: 'CrewAI', level: 'Familiar' },
      { name: 'RAG pipelines', level: 'Comfortable' },
      { name: 'Vector databases', level: 'Comfortable' },
      { name: 'Tool use / function calling', level: 'Comfortable' },
      { name: 'LLM evaluation', level: 'Familiar' },
    ],
  },
]

export const experience = [
  {
    role: '[Software Engineer]',
    company: '[Company Name]',
    period: '[Start Date] – [End Date / Present]',
    type: 'Full-time',
    location: '[Location / Remote]',
    highlights: [
      '[Describe a key achievement or system you built]',
      '[Mention a technology or metric that mattered]',
      '[Share a collaboration or leadership moment]',
    ],
  },
  {
    role: '[Data Scientist / ML Engineer]',
    company: '[Company Name]',
    period: '[Start Date] – [End Date]',
    type: 'Contract',
    location: '[Location / Remote]',
    highlights: [
      '[Describe a model, pipeline, or analysis you shipped]',
      '[Mention the business or user impact]',
    ],
  },
]

export const agenticAI = {
  intro:
    'I am currently working on Agentic AI — autonomous systems that plan, use tools, and execute multi-step workflows with minimal supervision. Below are representative areas of exploration. Each entry is a placeholder until you add your real work.',
  agents: [
    {
      title: 'Autonomous Research Agent',
      status: 'Prototype',
      description:
        'An LLM-driven agent that browses, reads, and synthesizes research papers into structured briefings, with source verification and citation tracking.',
      capabilities: ['Web search & browsing', 'PDF parsing', 'Synthesis & briefing', 'Citation verification'],
      tech: ['LangGraph', 'Playwright', 'Vector DB', 'LLM eval'],
    },
    {
      title: 'Multi-Agent Coding System',
      status: 'Prototype',
      description:
        'A swarm of specialized agents (planner, coder, reviewer, tester) that collaborate to implement features and fix bugs across a codebase.',
      capabilities: ['Task decomposition', 'Code review', 'Test generation', 'PR automation'],
      tech: ['AutoGen', 'GitHub API', 'TypeScript', 'Docker'],
    },
    {
      title: 'RAG-Powered Knowledge Assistant',
      status: 'Production',
      description:
        'Retrieval-augmented generation pipeline over internal documentation, with re-ranking, conversation memory, and grounded answers.',
      capabilities: ['Document ingestion', 'Semantic search', 'Re-ranking', 'Grounded Q&A'],
      tech: ['LangChain', 'Pinecone', 'OpenAI', 'FastAPI'],
    },
  ],
}

export const projects = [
  {
    id: 'agentic-research-assistant',
    slug: 'agentic-research-assistant',
    title: 'Agentic Research Assistant',
    category: 'Agentic AI',
    description:
      'An autonomous research agent that browses the web, reads papers, and synthesizes structured briefings with verified citations.',
    longDescription: null,
    technologies: ['LangGraph', 'Playwright', 'Vector Database', 'TypeScript'],
    thumbnail: null,
    github: '[https://github.com/yourusername/agentic-research-assistant]',
    liveDemo: '[https://agentic-research.example.com]',
    featured: true,
    caseStudy: true,
    placeholder: true,
  },
  {
    id: 'multi-agent-coding-system',
    slug: 'multi-agent-coding-system',
    title: 'Multi-Agent Coding System',
    category: 'Agentic AI',
    description:
      'A collaborative swarm of coding agents that plans, implements, reviews, and tests features across a codebase.',
    longDescription: null,
    technologies: ['AutoGen', 'GitHub API', 'Docker', 'TypeScript'],
    thumbnail: null,
    github: '[https://github.com/yourusername/multi-agent-coding-system]',
    liveDemo: null,
    featured: true,
    caseStudy: true,
    placeholder: true,
  },
  {
    id: 'rag-knowledge-assistant',
    slug: 'rag-knowledge-assistant',
    title: 'RAG Knowledge Assistant',
    category: 'Data Science',
    description:
      'Retrieval-augmented generation pipeline over internal documentation with re-ranking and grounded, citable answers.',
    longDescription: null,
    technologies: ['LangChain', 'Pinecone', 'FastAPI', 'OpenAI'],
    thumbnail: null,
    github: '[https://github.com/yourusername/rag-knowledge-assistant]',
    liveDemo: null,
    featured: false,
    caseStudy: true,
    placeholder: true,
  },
  {
    id: 'ecommerce-platform',
    slug: 'ecommerce-platform',
    title: 'Full-Stack E-Commerce Platform',
    category: 'Full-Stack',
    description:
      'A performant e-commerce storefront with real-time inventory, Stripe checkout, and an admin dashboard.',
    longDescription: null,
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
    thumbnail: null,
    github: '[https://github.com/yourusername/ecommerce-platform]',
    liveDemo: '[https://shop.example.com]',
    featured: false,
    caseStudy: false,
    placeholder: true,
  },
  {
    id: 'ml-pipeline-dashboard',
    slug: 'ml-pipeline-dashboard',
    title: 'ML Pipeline Dashboard',
    category: 'Data Science',
    description:
      'Visual dashboard for experiment tracking, model comparison, and drift detection across training runs.',
    longDescription: null,
    technologies: ['Python', 'Pandas', 'MLflow', 'React', 'Plotly'],
    thumbnail: null,
    github: '[https://github.com/yourusername/ml-pipeline-dashboard]',
    liveDemo: null,
    featured: false,
    caseStudy: false,
    placeholder: true,
  },
]

export const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'AI Agents', href: '#agentic-ai' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const filterCategories = ['All', ...[...new Set(projects.map((p) => p.category))]]