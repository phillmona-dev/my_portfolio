export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '4px', letterSpacing: '-0.02em' }}>
            Philly<span style={{ color: 'var(--accent)' }}>.</span>dev
          </div>
          <div className="footer-copy">
            © {year} Phillmon. Built with <span>❤️</span> in Ethiopia 🇪🇹
          </div>
        </div>
        <div className="footer-social">
          <a href="https://github.com/phillmona-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub" id="footer-github">
            <i className="fab fa-github" />
          </a>
          <a href="https://www.linkedin.com/in/filmon-kiros-a799252b0/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" id="footer-linkedin">
            <i className="fab fa-linkedin" />
          </a>
          <a href="mailto:phillipos1212@gmail.com" aria-label="Email" id="footer-email">
            <i className="fas fa-envelope" />
          </a>
          <a href="https://twitter.com/phillmona-dev" target="_blank" rel="noopener noreferrer" aria-label="Twitter" id="footer-twitter">
            <i className="fab fa-twitter" />
          </a>
        </div>
      </div>
    </footer>
  );
}
