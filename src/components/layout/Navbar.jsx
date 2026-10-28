import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { useLenis } from '../../hooks/useLenis';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { navLinks } from '../../data/content';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();
  const reduced = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  const isProjectRoute = location.pathname.includes('/projects/');
  const currentActive = location.pathname !== '/' ? (isProjectRoute ? '#projects' : '') : activeHash;

  const scrollToSection = useCallback(
    (href) => {
      if (!href || !href.startsWith('#')) return;

      const scroll = () => {
        if (location.pathname !== '/') {
          navigate(`/${href}`);
          return;
        }
        if (lenis) {
          lenis.scrollTo(href, { offset: -80, duration: 1.1 });
        } else {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      setIsOpen(false);

      // Let the menu's scroll lock release before scrolling the page.
      requestAnimationFrame(() => requestAnimationFrame(scroll));
    },
    [lenis, location.pathname, navigate]
  );

  // Track scroll state + active section
  useEffect(() => {
    if (location.pathname !== '/') return;
    const onScroll = () => {
      const y = lenis ? (lenis.scroll || 0) : window.scrollY;
      setScrolled(y > 60);

      const sections = ['#hero', '#about', '#expertise', '#skills', '#projects', '#experience', '#agentic-ai', '#contact'];
      let active = '';
      for (const hash of sections) {
        const el = document.querySelector(hash);
        if (el) {
          const rect = el.getBoundingClientRect();
          const headerOffset = 100;
          if (rect.top <= headerOffset && rect.bottom >= headerOffset) {
            active = hash;
            break;
          }
        }
      }
      setActiveHash(active);
    };

    onScroll();
    if (lenis && !reduced) {
      lenis.on('scroll', onScroll);
      return () => lenis.off('scroll', onScroll);
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, [lenis, reduced, location.pathname]);

  // Close the menu whenever the user navigates to another route.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock the page behind the open menu and allow Escape to close it.
  useEffect(() => {
    if (!isOpen) return undefined;

    const root = document.documentElement;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    root.classList.add('menu-open');
    document.addEventListener('keydown', handleKeyDown);
    if (lenis) lenis.stop();

    return () => {
      root.classList.remove('menu-open');
      document.removeEventListener('keydown', handleKeyDown);
      if (lenis) lenis.start();
    };
  }, [isOpen, lenis]);

  // If the viewport grows past the mobile breakpoint, drop the open menu.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1025px)');
    const handleChange = (event) => {
      if (event.matches) setIsOpen(false);
    };

    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav
      className={[
        'navbar',
        scrolled ? 'navbar--scrolled' : '',
        isOpen ? 'navbar--menu-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Main navigation"
    >
      <div className="container">
        <a
          href="#hero"
          className="navbar__brand"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#hero');
          }}
        >
          <div className="navbar__mark">A</div>
          <span className="navbar__name">Adeel<span className="text-accent">.</span></span>
        </a>

        <div className="navbar__links">
          {navLinks.map((link) => {
            const isActive = currentActive === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                className={clsx('navbar__link', isActive && 'navbar__link--active')}
                onClick={(e) => {
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }
                }}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#contact"
            className="btn btn--primary btn--arrow"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
          >
            Contact
            <ArrowRight className="btn-arrow" strokeWidth={2.5} />
          </a>
        </div>

        <button
          className="navbar__burger"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          <span className="navbar__burger-line" />
          <span className="navbar__burger-line" />
          <span className="navbar__burger-line" />
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`}>
        <ul className="mobile-menu__list">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="mobile-menu__link"
                onClick={(e) => {
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
