const projects = [
  {
    id: 'fetap',
    icon: 'fas fa-shield-alt',
    title: 'FETAP',
    fullName: 'Foreign Employment Term Assurance Platform',
    client: 'Niyala Insurance — Ethiopia',
    desc: 'End-to-end insurance platform for Ethiopian foreign employment workers, handling policy issuance, claims processing, and real-time premium calculations at scale.',
    tags: ['Java', 'Spring Boot', 'Microservices', 'PostgreSQL', 'REST API'],
    live: 'https://agency.niscofetap.com/',
    status: 'live',
    role: 'Backend Developer',
  },
  {
    id: 'kpms',
    icon: 'fas fa-pills',
    title: 'KPMS',
    fullName: 'Kenema Pharmacies Management System',
    client: 'Kenema Pharmacy Network — 54+ Branches',
    desc: 'Comprehensive pharmacy management system for the government-owned Kenema pharmacy network with 54+ branches across Ethiopia. Handles inventory, prescriptions, and multi-branch operations.',
    tags: ['Java', 'Spring Boot', 'MySQL', 'Microservices', 'REST API'],
    live: 'https://rx.kenemapharmacy.com/',
    status: 'live',
    role: 'Backend Developer',
  },
  {
    id: 'alert-hms',
    icon: 'fas fa-hospital',
    title: 'Alert Hospital Management System',
    fullName: 'Hospital Management & EMR Platform',
    client: 'Alert Hospital — Ethiopia',
    desc: 'Full-featured hospital management system with electronic medical records, patient workflows, appointment scheduling, and department coordination. Currently deployed and in active use.',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'EMR', 'HL7'],
    live: null,
    status: 'deployed',
    role: 'Backend Developer',
  },
  {
    id: 'healthconnect',
    icon: 'fas fa-heartbeat',
    title: 'HealthConnect',
    fullName: 'Healthcare Provider & Payer Connectivity Platform',
    client: 'Kenema Healthcare — Ethiopia',
    desc: 'Interoperability platform connecting healthcare providers with insurance payers. Enables seamless claim submission, pre-authorization, and real-time eligibility verification.',
    tags: ['Java', 'Spring Boot', 'Microservices', 'HL7', 'Interoperability', 'REST API'],
    live: 'https://hc.kenemapharmacy.com/',
    status: 'live',
    role: 'Backend + Interoperability',
  },
  {
    id: 'cbhi',
    icon: 'fas fa-users',
    title: 'CBHI Platform',
    fullName: 'Community-Based Health Insurance — Addis Ababa',
    client: 'Addis Ababa City Admin — 2.4M+ Members',
    desc: 'Massive-scale community health insurance platform managing 2.4 million+ insured members in Addis Ababa. Handles member enrollment, premium collection, claims, and benefit management.',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Microservices', 'Scalability'],
    live: 'https://addistest.cbhi.et/',
    status: 'live',
    role: 'Backend Developer',
  },
  {
    id: 'awash-claims',
    icon: 'fas fa-file-invoice',
    title: 'Awash Insurance Claims System',
    fullName: 'Awash Insurance Claim Management',
    client: 'Awash Insurance — Ethiopia',
    desc: 'Advanced claims management system for Awash Insurance, featuring automated claim processing pipelines, fraud detection, and multi-stage approval workflows.',
    tags: ['Java', 'Spring Boot', 'Microservices', 'PostgreSQL'],
    live: null,
    status: 'dev',
    role: 'Backend Developer',
  },
  {
    id: 'niyala-claims',
    icon: 'fas fa-clipboard-check',
    title: 'Niyala Insurance Claims System',
    fullName: 'Niyala Insurance Claim Management',
    client: 'Niyala Insurance — Ethiopia',
    desc: 'Claim management platform leveraging interoperability standards to streamline claim intake, medical validation, and insurer-provider communication for Niyala Insurance.',
    tags: ['Java', 'Spring Boot', 'OpenFn', 'REST API', 'Microservices'],
    live: null,
    status: 'dev',
    role: 'Backend Developer',
  },
];

function StatusBadge({ status }) {
  if (status === 'live') return (
    <span className="badge badge-accent" id={`status-live`}>
      <i className="fas fa-circle" style={{ fontSize: '0.5rem', color: '#22c55e' }} />
      Live
    </span>
  );
  if (status === 'dev') return (
    <span className="badge badge-dev">
      <i className="fas fa-code-branch" />
      In Development
    </span>
  );
  return (
    <span className="badge" style={{ background: 'rgba(100,100,100,0.1)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
      <i className="fas fa-server" />
      Deployed
    </span>
  );
}

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header">
          <div className="section-line" />
          <h2 className="section-title">My <span>Projects</span></h2>
          <p className="section-subtitle">
            Enterprise systems serving millions of users across Ethiopia's
            healthcare and insurance sectors
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id} id={`project-${project.id}`}>
              <div className="project-header">
                <div className="project-icon">
                  <i className={project.icon} />
                </div>
                <div className="project-badges">
                  <StatusBadge status={project.status} />
                </div>
              </div>

              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-client">
                  <i className="fas fa-building" />
                  {project.client}
                </div>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i className="fas fa-user-cog" style={{ color: 'var(--accent)' }} />
                  My role: <strong style={{ color: 'var(--text-secondary)' }}>{project.role}</strong>
                </div>
              </div>

              <div className="project-footer">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link primary"
                    id={`live-link-${project.id}`}
                  >
                    <i className="fas fa-external-link-alt" />
                    Live Demo
                  </a>
                ) : (
                  <span className="project-link secondary" style={{ cursor: 'default', opacity: 0.6 }}>
                    <i className="fas fa-lock" />
                    {project.status === 'dev' ? 'In Development' : 'Internal'}
                  </span>
                )}
                <span className="project-link secondary" style={{ marginLeft: 'auto', cursor: 'default' }}>
                  <i className="fas fa-code" />
                  {project.fullName.length > 28 ? project.fullName.slice(0, 28) + '…' : project.fullName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
