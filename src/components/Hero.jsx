import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import profileImg from '../assets/profile.png';

const roles = [
  'Backend Developer',
  'Java & Spring Boot',
  'Microservices Architect',
  'Healthcare Tech Expert',
];

function useTypingEffect(words, speed = 100, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setText(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        if (charIndex > 0) {
          setText(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        } else {
          setDeleting(false);
          setWordIndex((w) => (w + 1) % words.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return text;
}

export default function Hero() {
  const typedText = useTypingEffect(roles);

  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-inner">
          {/* Content */}
          <div className="hero-content">
            <div className="hero-greeting">
              <span className="hero-greeting-text">Hello, World!</span>
              <span className="hero-dot" />
            </div>

            <h1 className="hero-name">
              I'm <span className="accent">Phillmon</span>
            </h1>

            <div className="hero-title-row">
              <span className="typed-text">{typedText}</span>
              <span className="hero-cursor" />
            </div>

            <div className="hero-meta">
              <span className="hero-meta-item">
                <i className="fas fa-map-marker-alt" />
                Addis Ababa, Ethiopia
              </span>
              <span className="hero-meta-item">
                <i className="fas fa-briefcase" />
                2+ Years Experience
              </span>
              <span className="hero-meta-item">
                <i className="fas fa-circle" style={{ color: '#22c55e', fontSize: '0.6rem' }} />
                Available for Opportunities
              </span>
            </div>

            <p className="hero-desc">
              Backend developer specializing in Java, Spring Boot, and Microservices.
              Building enterprise-grade healthcare &amp; insurance systems that serve
              millions across Ethiopia. Passionate about interoperability and impactful software.
            </p>

            <div className="hero-actions">
              <Link to="projects" smooth duration={600} offset={-70}>
                <button className="btn btn-primary" id="view-work-btn">
                  <i className="fas fa-rocket" />
                  View My Work
                </button>
              </Link>
              <Link to="contact" smooth duration={600} offset={-70}>
                <button className="btn btn-outline" id="contact-btn">
                  <i className="fas fa-envelope" />
                  Get In Touch
                </button>
              </Link>
            </div>
          </div>

          {/* Photo */}
          <div className="hero-image-wrap">
            <div className="hero-deco d1">&lt;/&gt;</div>
            <div className="hero-photo-ring">
              <img src={profileImg} alt="Phillmon - Backend Developer" className="hero-photo" />
            </div>
            <div className="hero-deco d2">{'{}'}</div>
          </div>
        </div>
      </div>

      <Link to="about" smooth duration={600} offset={-70} className="hero-scroll">
        <span>Scroll Down</span>
        <i className="fas fa-chevron-down" />
      </Link>
    </section>
  );
}
