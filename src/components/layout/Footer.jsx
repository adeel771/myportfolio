import { personal } from '../../data/content';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="navbar__mark">A</div>

            <span className="navbar__name">
              Adeel<span className="text-accent">.</span>
            </span>

            <p className="footer__text text-muted">
              Engineering intelligent products — full-stack software,
              data science, and Agentic AI systems.
            </p>

            <div className="footer__social">
              {(personal.socials ?? []).map((social) => {
                const isConfigured = social.url && social.url !== '#' && !social.url.startsWith('[');
                const isExternal = isConfigured && /^https?:\/\//i.test(social.url);

                return (
                <a
                  key={social.name}
                  href={social.url || '#'}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="footer__link"
                  aria-label={social.name}
                  title={
                    social.placeholder || !social.url || social.url === '#' || social.url.startsWith('[')
                      ? 'Social link not configured yet'
                      : social.name
                  }
                  onClick={(event) => {
                    if (!social.url || social.url === '#' || social.url.startsWith('[')) {
                      event.preventDefault();
                    }
                  }}
                >
                  {social.name}
                </a>
                );
              })}
            </div>
          </div>

          <div className="footer__navigation">
            <nav className="footer__links" aria-label="Footer navigation">
              <a href="#projects" className="footer__link">Work</a>
              <a href="#agentic-ai" className="footer__link">Agentic AI</a>
              <a href="#experience" className="footer__link">Experience</a>
              <a href="#about" className="footer__link">About</a>
              <a href="#contact" className="footer__link">Contact</a>
            </nav>

            <div className="footer__links" style={{ marginTop: 20 }}>
              {personal.resume && personal.resume !== '#' && (
                <a
                  href={personal.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__link"
                >
                  Résumé
                </a>
              )}

              {personal.email && !personal.email.includes('example') && (
                <a
                  href={`mailto:${personal.email}`}
                  className="footer__link"
                >
                  Email
                </a>
              )}
            </div>
          </div>
        </div>

        
      </div>
    </footer>
  );
}

export default Footer;
