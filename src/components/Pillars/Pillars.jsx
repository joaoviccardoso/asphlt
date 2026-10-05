import { useRef } from 'react';
import styles from './Pillars.module.css';
import { gsap, useGSAP } from '../../lib/gsap.js';
import { PILLARS } from '../../data/content.js';

export default function Pillars() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // As réguas dos artigos "se desenham" ao entrar na tela
        gsap.utils.toArray('[data-rule]').forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.3,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="materia" ref={root} className={styles.section} aria-labelledby="pilares-titulo">
      <p className={styles.kicker}>Doc. tech // Cartilha metodológica</p>
      <h2 id="pilares-titulo" className={styles.title}>
        Os três
        <br />
        pilares da matéria
      </h2>
      <span className={styles.divider} />

      <div className={styles.list}>
        {PILLARS.map((p) => (
          <article key={p.art} className={styles.article}>
            <span className={styles.rule} data-rule />
            <header className={styles.meta}>
              <span>{p.art}</span>
              <span>{p.material}</span>
            </header>

            <h3 className={styles.h3}>{p.title}</h3>

            {p.quote && <blockquote className={styles.quote}>“{p.quote}”</blockquote>}
            <p className={styles.body}>{p.body}</p>

            <dl className={styles.specs}>
              {p.specs.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
