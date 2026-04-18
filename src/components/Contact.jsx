import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Opens default mail client with prefilled content
    const mailto = `mailto:phillipos1212@gmail.com?subject=${encodeURIComponent(form.subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-line" />
          <h2 className="section-title">Get In <span>Touch</span></h2>
          <p className="section-subtitle">
            Open to new opportunities, collaborations, and interesting projects
          </p>
        </div>

        <div className="contact-inner">
          {/* Left Info */}
          <div className="contact-info">
            <h3>
              Let's build something <span style={{ color: 'var(--accent)' }}>great together</span>
            </h3>
            <p>
              I'm always excited to connect with fellow developers, potential clients,
              and tech enthusiasts. Whether you have a project in mind, want to discuss
              backend architecture, or just want to say hi — my inbox is open.
            </p>
            <p>
              Currently based in <strong>Addis Ababa, Ethiopia</strong> and open to
              remote opportunities worldwide.
            </p>

            <div className="contact-links">
              <a
                href="mailto:phillipos1212@gmail.com"
                className="contact-link-item"
                id="contact-email-link"
              >
                <div className="contact-link-icon">
                  <i className="fas fa-envelope" />
                </div>
                <div>
                  <div className="contact-link-label">Email</div>
                  <div className="contact-link-val">phillipos1212@gmail.com</div>
                </div>
                <i className="fas fa-arrow-right" style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.8rem' }} />
              </a>

              <a
                href="https://github.com/phillmona-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-item"
                id="contact-github-link"
              >
                <div className="contact-link-icon">
                  <i className="fab fa-github" />
                </div>
                <div>
                  <div className="contact-link-label">GitHub</div>
                  <div className="contact-link-val">github.com/phillmona-dev</div>
                </div>
                <i className="fas fa-arrow-right" style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.8rem' }} />
              </a>

              <a
                href="https://www.linkedin.com/in/filmon-kiros-a799252b0/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-item"
                id="contact-linkedin-link"
              >
                <div className="contact-link-icon">
                  <i className="fab fa-linkedin" />
                </div>
                <div>
                  <div className="contact-link-label">LinkedIn</div>
                  <div className="contact-link-val">linkedin.com/in/filmon-kiros-a799252b0</div>
                </div>
                <i className="fas fa-arrow-right" style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.8rem' }} />
              </a>

              <div className="contact-link-item" style={{ cursor: 'default' }}>
                <div className="contact-link-icon">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <div>
                  <div className="contact-link-label">Location</div>
                  <div className="contact-link-val">Addis Ababa, Ethiopia 🇪🇹</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form">
            <h3>
              <i className="fas fa-paper-plane" style={{ color: 'var(--accent)', marginRight: '10px' }} />
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} id="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Project collaboration / Opportunity"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or idea..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', paddingTop: '14px', paddingBottom: '14px' }}
                id="send-message-btn"
              >
                {sent ? (
                  <><i className="fas fa-check" /> Message Sent!</>
                ) : (
                  <><i className="fas fa-paper-plane" /> Send Message</>
                )}
              </button>
            </form>

            {/* Availability strip */}
            <div style={{
              marginTop: '20px',
              padding: '12px 16px',
              background: 'rgba(34, 197, 94, 0.07)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.83rem',
              color: 'var(--text-secondary)',
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', flexShrink: 0, boxShadow: '0 0 6px #22c55e' }} />
              Currently available for backend development projects &amp; collaborations
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
