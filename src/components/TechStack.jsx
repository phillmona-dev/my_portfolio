const techItems = [
  { icon: '☕', name: 'Java', color: '#f89820', level: 90 },
  { icon: '🍃', name: 'Spring Boot & Spring AI', color: '#6db33f', level: 88 },
  { icon: '⚛️', name: 'React & Next.js', color: '#61dafb', level: 78 },
  { icon: '🔗', name: 'Microservices', color: '#e8533a', level: 85 },
  { icon: '☸️', name: 'Kubernetes', color: '#326ce5', level: 70 },
  { icon: '♾️', name: 'CI/CD & DevOps', color: '#2088FF', level: 75 },
  { icon: '☁️', name: 'AWS, GCP, Azure', color: '#FF9900', level: 72 },
  { icon: '📊', name: 'Observability', color: '#E6522C', level: 70 },
  { icon: '🐳', name: 'Docker', color: '#2496ed', level: 80 },
  { icon: '🐘', name: 'PostgreSQL & MySQL', color: '#336791', level: 78 },
  { icon: '📡', name: 'REST API', color: '#e8533a', level: 92 },
  { icon: '🔌', name: 'OpenFn & Interop', color: '#e8533a', level: 80 },
  { icon: 'https://cdn.simpleicons.org/odoo/714b67', name: 'Odoo ERP', color: '#714b67', level: 82, isImg: true },
];

const tickerItems = [...techItems, ...techItems];

export default function TechStack() {
  return (
    <>
      {/* Ticker */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {tickerItems.map((item, i) => (
            <span className="ticker-item" key={i}>
              {item.isImg
                ? <img src={item.icon} alt={item.name} style={{ width: '1.2rem', height: '1.2rem', objectFit: 'contain' }} />
                : <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
              }
              {item.name}
              <span style={{ color: 'var(--border)', margin: '0 4px' }}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Full tech section */}
      <section className="section" id="tech">
        <div className="container">
          <div className="section-header">
            <div className="section-line" />
            <h2 className="section-title">Tech <span>Stack</span></h2>
            <p className="section-subtitle">
              Tools and technologies I use daily to build scalable full stack systems
            </p>
          </div>
          <div className="tech-grid">
            {techItems.map((tech, i) => (
              <div className="tech-card" key={i} id={`tech-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="tech-icon" style={{ fontSize: '2rem' }}>
                  {tech.isImg
                    ? <img src={tech.icon} alt={tech.name} style={{ width: '2rem', height: '2rem', objectFit: 'contain' }} />
                    : tech.icon
                  }
                </div>
                <span className="tech-name">{tech.name}</span>
                <div className="tech-level">
                  <div
                    className="tech-level-fill"
                    style={{ width: `${tech.level}%`, background: tech.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
