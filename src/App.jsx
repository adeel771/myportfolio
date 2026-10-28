import { useEffect, useRef } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { gsap } from 'gsap';

import { LenisProvider, useLenis } from './hooks/useLenis';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Expertise from './components/sections/Expertise';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import AgenticAI from './components/sections/AgenticAI';
import Contact from './components/sections/Contact';

import ProjectDetail from './components/routes/ProjectDetail';

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <Skills />
      <Projects />
      <Experience />
      <AgenticAI />
      <Contact />
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const lenis = useLenis();
  const appRef = useRef(null);

  useEffect(() => {
    if (!appRef.current) return undefined;

    const tween = gsap.fromTo(
      appRef.current,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
        clearProps: 'transform',
      }
    );

    if (lenis) {
      lenis.scrollTo(0, { duration: 0.01 });
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      tween.kill();
    };
  }, [location.pathname, lenis]);

  return (
    <div className="app" ref={appRef}>
      <a href="#content" className="skip-link">
        Skip to content
      </a>

      <Navbar />

      <main id="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/projects/:slug"
            element={<ProjectDetail />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <LenisProvider>
        <AppContent />
      </LenisProvider>
    </HashRouter>
  );
}

export default App;