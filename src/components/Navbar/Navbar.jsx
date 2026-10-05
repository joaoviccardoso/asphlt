import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import Marquee from '../Marquee/Marquee.jsx';
import { useLenis } from '../../hooks/useLenis.js';
import { BRAND, MARQUEE_TEXT, NAV_LINKS } from '../../data/content.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  // Trava o scroll do Lenis enquanto o menu mobile está aberto.
  useEffect(() => {
    if (!lenis) return;
    open ? lenis.stop() : lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    if (lenis) {
      lenis.start();
      lenis.scrollTo(href, { offset: href === '#top' ? 0 : -60, duration: 1.4 });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={styles.root}>
      <Marquee items={[MARQUEE_TEXT, BRAND]} repeat={6} speed={55} className={styles.strip} />

      <div className={styles.bar}>
        <div className={styles.left}>
          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((o) => !o)}
            data-open={open}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={styles.links} aria-label="Principal">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <a href="#top" className={styles.logo} onClick={(e) => go(e, '#top')}>
          {BRAND}
        </a>

        <a href="#colecao" className={styles.bag} onClick={(e) => go(e, '#colecao')}>
          Sacola (0)
        </a>
      </div>

      <div
        id="menu-principal"
        className={`${styles.menu} ${open ? styles.menuOpen : ''}`}
        aria-hidden={!open}
      >
        <ul>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={(e) => go(e, l.href)} tabIndex={open ? 0 : -1}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
