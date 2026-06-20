import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import profileImg from '../assets/profile.png';

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      {/* About */}
      <section className="section" id="about">
        <div className="container">
          <div className="about-grid">
            {/* Image */}
            <div className="about-image-wrap">
              <img src={profileImg} alt="Phillmon - Full Stack Engineer" className="about-photo" />
              <div className="about-accent-block" />
              <div className="about-exp-badge">
                <div className="num">2+</div>
                <div className="label">Years<br />Experience</div>
              </div>
            </div>

            {/* Content */}
            <div className="about-content">
              <span className="badge badge-accent" style={{ marginBottom: '16px' }}>
                <i className="fas fa-user" />
                About Me
              </span>
              <h3>Full Stack Engineer building <span style={{ color: 'var(--accent)' }}>impactful systems</span> for Ethiopia</h3>

              <p>
                I'm a passionate full stack engineer with over 2 years of hands-on experience building
                enterprise-grade systems in the healthcare and insurance sectors. I specialize in
                Java, Spring Boot, React, Next.js, and Microservices architecture.
              </p>
              <p>
                From powering insurance platforms for Niyala Insurance to building pharmacy
                management systems serving 54+ branches, my work directly impacts millions of
                people across Ethiopia. I thrive at the intersection of technology and healthcare.
              </p>

              <ul className="about-list">
                <li><i className="fas fa-check-circle" /> Java &amp; Spring Boot</li>
                <li><i className="fas fa-check-circle" /> React &amp; Next.js</li>
                <li><i className="fas fa-check-circle" /> Microservices Design</li>
                <li><i className="fas fa-check-circle" /> REST APIs &amp; OpenAPI</li>
                <li><i className="fas fa-check-circle" /> HL7 / Interoperability</li>
                <li><i className="fas fa-check-circle" /> PostgreSQL &amp; MySQL</li>
                <li><i className="fas fa-check-circle" /> Docker &amp; DevOps</li>
                <li><i className="fas fa-check-circle" /> Digital Payments</li>
              </ul>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="mailto:phillipos1212@gmail.com"
                  className="btn btn-primary"
                  id="hire-me-btn"
                >
                  <i className="fas fa-paper-plane" />
                  Contact Me
                </a>
                <a
                  href="/Filimon_Kiros_CV.pdf"
                  className="btn btn-outline"
                  id="download-cv-btn"
                  download="Filimon_Kiros_CV.pdf"
                >
                  <i className="fas fa-download" />
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-section" ref={ref}>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-users" /></div>
              <div className="stat-num">
                {inView && <CountUp end={2.4} decimals={1} duration={2} suffix="M+" />}
                {!inView && '0'}
              </div>
              <div className="stat-label">CBHI Members Insured</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-clinic-medical" /></div>
              <div className="stat-num">
                {inView && <CountUp end={54} duration={2} suffix="+" />}
                {!inView && '0'}
              </div>
              <div className="stat-label">Pharmacy Branches</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-hospital" /></div>
              <div className="stat-num">
                {inView && <CountUp end={3} duration={2} suffix="+" />}
                {!inView && '0'}
              </div>
              <div className="stat-label">Hospitals with Payment Integration</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-code" /></div>
              <div className="stat-num">
                {inView && <CountUp end={2} duration={2} suffix="+" />}
                {!inView && '0'}
              </div>
              <div className="stat-label">Years of Experience</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
