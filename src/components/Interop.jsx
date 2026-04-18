export default function Interop() {
  return (
    <section className="section interop-section" id="interop">
      <div className="container">
        <div className="section-header">
          <div className="section-line" />
          <h2 className="section-title">
            Integration & <span>Interoperability</span>
          </h2>
          <p className="section-subtitle">
            Bridging healthcare systems, payment infrastructure, and insurance
            platforms through modern integration standards
          </p>
        </div>

        <div className="interop-grid">

          {/* OpenFn */}
          <div className="interop-card" id="interop-openfn">
            <div className="interop-icon">
              <i className="fas fa-plug" />
            </div>
            <h3 className="interop-title">OpenFn Integration Platform</h3>
            <p className="interop-desc">
              Designed and implemented interoperability workflows using OpenFn — an open-source
              integration platform — to connect disparate healthcare and insurance systems.
              Enables seamless data exchange between providers, payers, and government systems
              without disrupting existing infrastructure.
            </p>
            <div className="project-tags" style={{ marginBottom: '20px' }}>
              <span className="tag">OpenFn</span>
              <span className="tag">HL7 FHIR</span>
              <span className="tag">REST API</span>
              <span className="tag">JSON Mapping</span>
              <span className="tag">ETL Pipelines</span>
            </div>
            <ul className="interop-list">
              <li>
                <i className="fas fa-check-circle" />
                Provider ↔ Payer claim data exchange
              </li>
              <li>
                <i className="fas fa-check-circle" />
                Real-time eligibility verification workflows
              </li>
              <li>
                <i className="fas fa-check-circle" />
                HealthConnect &lt;&gt; Insurance system bridges
              </li>
              <li>
                <i className="fas fa-check-circle" />
                CBHI enrollment & benefit sync pipelines
              </li>
            </ul>
          </div>

          {/* Chapa */}
          <div className="interop-card" id="interop-chapa">
            <div className="interop-icon">
              <i className="fas fa-credit-card" />
            </div>
            <h3 className="interop-title">Chapa Payment Gateway Integration</h3>
            <p className="interop-desc">
              Integrated the Chapa Payment Gateway into hospital EMR systems, enabling
              patients to pay for services digitally — reducing cash handling, improving
              revenue cycle management, and bringing modern payment infrastructure to
              Ethiopian public hospitals.
            </p>
            <div className="project-tags" style={{ marginBottom: '20px' }}>
              <span className="tag">Chapa API</span>
              <span className="tag">Spring Boot</span>
              <span className="tag">Webhooks</span>
              <span className="tag">Digital Payments</span>
              <span className="tag">EMR Integration</span>
            </div>
            <ul className="interop-list">
              <li>
                <i className="fas fa-hospital" />
                <span>
                  <strong>Saint Peter Hospital</strong>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Specialized hospital, Addis Ababa</span>
                </span>
              </li>
              <li>
                <i className="fas fa-hospital" />
                <span>
                  <strong>Saint Paul Hospital</strong>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Millennium Medical College, Addis Ababa</span>
                </span>
              </li>
              <li>
                <i className="fas fa-hospital" />
                <span>
                  <strong>Adama General Hospital</strong>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Adama, Oromia Region</span>
                </span>
              </li>
            </ul>
          </div>

          {/* HL7 / FHIR */}
          <div className="interop-card" id="interop-hl7">
            <div className="interop-icon">
              <i className="fas fa-exchange-alt" />
            </div>
            <h3 className="interop-title">Healthcare Data Standards</h3>
            <p className="interop-desc">
              Applied internationally recognized healthcare interoperability standards
              to ensure data consistency and portability across connected systems.
              This enables future-proof integration with any compliant system.
            </p>
            <div className="project-tags" style={{ marginBottom: '20px' }}>
              <span className="tag">HL7 FHIR</span>
              <span className="tag">ICD-10</span>
              <span className="tag">SNOMED CT</span>
              <span className="tag">OpenAPI 3.0</span>
            </div>
            <ul className="interop-list">
              <li>
                <i className="fas fa-check-circle" />
                FHIR R4 resource modeling
              </li>
              <li>
                <i className="fas fa-check-circle" />
                Standardized patient & encounter data structures
              </li>
              <li>
                <i className="fas fa-check-circle" />
                API-first design with OpenAPI specification
              </li>
            </ul>
          </div>

          {/* Architecture */}
          <div className="interop-card" id="interop-arch">
            <div className="interop-icon">
              <i className="fas fa-project-diagram" />
            </div>
            <h3 className="interop-title">Microservices Architecture</h3>
            <p className="interop-desc">
              Designed event-driven microservices systems with service discovery,
              API gateways, and distributed data management — ensuring fault tolerance
              and horizontal scalability for high-throughput healthcare workloads.
            </p>
            <div className="project-tags" style={{ marginBottom: '20px' }}>
              <span className="tag">Spring Cloud</span>
              <span className="tag">API Gateway</span>
              <span className="tag">Service Registry</span>
              <span className="tag">Docker</span>
            </div>
            <ul className="interop-list">
              <li>
                <i className="fas fa-check-circle" />
                Service discovery with Eureka
              </li>
              <li>
                <i className="fas fa-check-circle" />
                API gateway with Spring Cloud Gateway
              </li>
              <li>
                <i className="fas fa-check-circle" />
                JWT-based cross-service authentication
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
