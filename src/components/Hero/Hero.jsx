import { useRef } from 'react';
import styles from './Hero.module.css';
import { gsap, useGSAP } from '../../lib/gsap.js';
import { HERO } from '../../data/content.js';

export default function Hero({ ready = true }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (!ready) return; // aguarda o Preloader
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Entrada orquestrada (um único momento): fundo → texto → modelo
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        tl.from('[data-hero="bg-img"]', { scale: 1.25, duration: 2.4, ease: 'power3.out' }, 0)
          .from('[data-hero="line"]', { yPercent: 118, duration: 1.4, stagger: 0.12 }, 0.2)
          .from('[data-hero="model"]', { yPercent: 14, autoAlpha: 0, duration: 1.5 }, 0.55);

        // Parallax sutil no scroll (sincronizado com o Lenis via ScrollTrigger)
        const scrub = {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        };
        gsap.to('[data-hero="bg"]', { yPercent: 10, ease: 'none', scrollTrigger: scrub });
        gsap.to('[data-hero="title"]', { yPercent: -14, ease: 'none', scrollTrigger: scrub });
        gsap.to('[data-hero="model-wrap"]', { yPercent: 6, ease: 'none', scrollTrigger: scrub });
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [ready] }
  );

  return (
    <section id="top" ref={root} className={styles.hero}>
      <div className={styles.bg} data-hero="bg">
        <img className={styles.bgImg} data-hero="bg-img" src={HERO.background} alt="" />
      </div>

      <h1 className={styles.title} data-hero="title" aria-label="A arquitetura do asfalto">
        {HERO.lines.map((line) => (
          <span key={line} className={styles.lineMask} aria-hidden="true">
            <span className={styles.line} data-hero="line">
              {line}
            </span>
          </span>
        ))}
      </h1>

      <div className={styles.modelWrap} data-hero="model-wrap">
        <img className={styles.model} data-hero="model" src={HERO.model} alt={HERO.modelAlt} />
      </div>
    </section>
  );
}
