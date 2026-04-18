const techItems = [
  { icon: '☕', name: 'Java', color: '#f89820', level: 90 },
  { icon: '🍃', name: 'Spring Boot', color: '#6db33f', level: 88 },
  { icon: '🔗', name: 'Microservices', color: '#e8533a', level: 85 },
  { icon: '🐍', name: 'Python', color: '#3572A5', level: 65 },
  { icon: '⚛️', name: 'React', color: '#61dafb', level: 55 },
  { icon: '🟨', name: 'JavaScript', color: '#f7df1e', level: 70 },
  { icon: '🟣', name: 'Odoo', color: '#714B67', level: 72 },
  { icon: '🔌', name: 'OpenFn', color: '#e8533a', level: 80 },
  { icon: '🐘', name: 'PostgreSQL', color: '#336791', level: 78 },
  { icon: '🐳', name: 'Docker', color: '#2496ed', level: 70 },
  { icon: '📡', name: 'REST API', color: '#e8533a', level: 92 },
  { icon: '🔐', name: 'Spring Security', color: '#6db33f', level: 82 },
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
              <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
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
              Tools and technologies I work with daily to build scalable systems
            </p>
          </div>
          <div className="tech-grid">
            {techItems.map((tech, i) => (
              <div className="tech-card" key={i} id={`tech-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="tech-icon" style={{ fontSize: '2rem' }}>
                  {tech.icon}
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
