const odooProjects = [
  {
    id: 'domain-aluminium',
    icon: 'fas fa-industry',
    title: 'Domain Aluminium ERP',
    fullName: 'Aluminium Manufacturing Management System',
    client: 'Domain Aluminium Manufacturing — Adama, Ethiopia',
    desc: 'Odoo-based manufacturing ERP for Domain Aluminium, covering production planning, raw material inventory, work order management, quality control, and manufacturing reporting workflows.',
    tags: ['Odoo 17', 'Manufacturing', 'Inventory', 'Quality Control', 'MRP'],
    status: 'testing',
    role: 'Odoo Module Developer',
    modules: ['Manufacturing', 'Inventory', 'Purchase', 'Quality'],
  },
  {
    id: 'kenema-odoo',
    icon: 'fas fa-pills',
    title: 'KPMS v2 — Odoo',
    fullName: 'Kenema Pharmacies Management System v2',
    client: 'Government — Kenema Pharmacies, Addis Ababa (54+ Branches)',
    desc: 'Second-generation pharmacy management system built on Odoo, managing 54+ government-owned pharmacy branches across Addis Ababa. Handles multi-branch inventory, prescription tracking, stock replenishment, and sales reporting.',
    tags: ['Odoo 17', 'Pharmacy', 'Multi-Branch', 'Inventory', 'Point of Sale'],
    status: 'deployed',
    role: 'Odoo Module Developer',
    modules: ['Inventory', 'Point of Sale', 'Purchase', 'Reporting'],
  },
  {
    id: 'romanat-hotel',
    icon: 'fas fa-hotel',
    title: 'Romanat Hotel ERP',
    fullName: 'Romanat Hotel Management System',
    client: 'Romanat Hotel — Addis Ababa, Ethiopia',
    desc: 'Full hotel management solution built on Odoo for Romanat Hotel, covering reservations, front-desk operations, housekeeping, billing, and financial reporting — all consolidated into a single platform.',
    tags: ['Odoo 18', 'Hotel Management', 'POS', 'Accounting', 'Reporting'],
    status: 'deployed',
    role: 'Odoo Module Developer',
    modules: ['Hotel', 'Point of Sale', 'Accounting', 'Employees'],
  },
  {
    id: 'triple-erp',
    icon: 'fas fa-cubes',
    title: 'Triple-Domain ERP',
    fullName: 'Construction, Import/Export & School ERP',
    client: 'Multi-Industry Client — Ethiopia',
    desc: 'A comprehensive three-in-one administrative ERP system on Odoo, integrating Construction project management, Import/Export trade operations, and School administrative management into a unified platform.',
    tags: ['Odoo 19', 'Construction', 'Import/Export', 'School Management', 'ERP'],
    status: 'deployed',
    role: 'Odoo Module Developer',
    modules: ['Project', 'Purchase', 'Sales', 'HR', 'Accounting'],
  },
];

const bahmniIntegrations = [
  {
    id: 'bahmni-chapa',
    icon: 'fas fa-credit-card',
    name: 'Bahmni × Chapa',
    desc: 'Integrated Bahmni-Odoo with Chapa payment gateway, enabling hospitals to collect patient fees, outpatient bills, and pharmacy payments directly through Chapa.',
  },
  {
    id: 'bahmni-telebirr',
    icon: 'fas fa-mobile-alt',
    name: 'Bahmni × Telebirr',
    desc: 'Connected Bahmni-Odoo with Telebirr (Ethio Telecom MiniApp & USSD), allowing patients to settle hospital bills via Ethiopia\'s leading mobile money platform.',
  },
];

function OdooStatusBadge({ status }) {
  if (status === 'testing') return (
    <span className="odoo-badge odoo-badge-testing">
      <i className="fas fa-flask" />
      Testing Phase
    </span>
  );
  if (status === 'deployed') return (
    <span className="odoo-badge odoo-badge-deployed">
      <i className="fas fa-server" />
      Deployed
    </span>
  );
  return (
    <span className="odoo-badge odoo-badge-live">
      <i className="fas fa-circle" style={{ fontSize: '0.5rem', color: '#22c55e' }} />
      Live
    </span>
  );
}

export default function OdooProjects() {
  return (
    <section className="section odoo-section" id="odoo">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-line" />
          <h2 className="section-title">
            Odoo <span>ERP</span> Projects
          </h2>
          <p className="section-subtitle">
            Custom Odoo module development across manufacturing, hospitality,
            pharma &amp; multi-industry ERP on versions 17, 18 &amp; 19
          </p>
        </div>

        {/* Odoo Version Banner */}
        <div className="odoo-version-bar">
          {['Odoo 17', 'Odoo 18', 'Odoo 19'].map((v) => (
            <span className="odoo-ver-pill" key={v}>
              <i className="fas fa-check-circle" />
              {v}
            </span>
          ))}
          <span className="odoo-ver-pill odoo-ver-pill-accent">
            <i className="fas fa-puzzle-piece" />
            Custom Module Dev
          </span>
          <span className="odoo-ver-pill odoo-ver-pill-accent">
            <i className="fas fa-link" />
            Bahmni-Odoo Integration
          </span>
        </div>

        {/* Projects Grid */}
        <div className="odoo-grid">
          {odooProjects.map((project) => (
            <div className="odoo-card" key={project.id} id={`odoo-project-${project.id}`}>
              {/* Top accent line with icon */}
              <div className="odoo-card-top">
                <div className="odoo-card-icon">
                  <i className={project.icon} />
                </div>
                <OdooStatusBadge status={project.status} />
              </div>

              <div className="odoo-card-body">
                <h3 className="odoo-card-title">{project.title}</h3>
                <div className="odoo-card-client">
                  <i className="fas fa-building" />
                  {project.client}
                </div>
                <p className="odoo-card-desc">{project.desc}</p>

                {/* Odoo Modules */}
                <div className="odoo-modules-label">
                  <i className="fas fa-puzzle-piece" />
                  Key Modules
                </div>
                <div className="odoo-modules-row">
                  {project.modules.map((m) => (
                    <span className="odoo-module-chip" key={m}>{m}</span>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="project-tags" style={{ marginTop: '12px' }}>
                  {project.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="odoo-card-footer">
                <div className="odoo-role-row">
                  <i className="fas fa-user-cog" style={{ color: 'var(--odoo-accent)' }} />
                  My role: <strong>{project.role}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bahmni-Odoo Payment Integration Highlight */}
        <div className="odoo-integration-block">
          <div className="odoo-integration-header">
            <div className="odoo-integration-icon">
              <i className="fas fa-plug" />
            </div>
            <div>
              <h3 className="odoo-integration-title">Bahmni-Odoo × Payment Gateway Integrations</h3>
              <p className="odoo-integration-sub">
                Integrated Bahmni-Odoo (hospital ERP) with Ethiopian payment gateways across multiple hospitals,
                enabling seamless digital patient billing.
              </p>
            </div>
          </div>
          <div className="odoo-integration-grid">
            {bahmniIntegrations.map((item) => (
              <div className="odoo-integ-card" key={item.id} id={`integration-${item.id}`}>
                <div className="odoo-integ-icon">
                  <i className={item.icon} />
                </div>
                <div>
                  <div className="odoo-integ-name">{item.name}</div>
                  <p className="odoo-integ-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
