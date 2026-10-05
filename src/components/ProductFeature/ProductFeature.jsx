import { useEffect, useRef, useState } from 'react';
import styles from './ProductFeature.module.css';
import { gsap, useGSAP } from '../../lib/gsap.js';
import { LOOKBOOK } from '../../data/content.js';

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function ProductFeature() {
  const root = useRef(null);
  const busy = useRef(false);
  const first = useRef(true);
  const [index, setIndex] = useState(0);
  const slide = LOOKBOOK[index];

  // Pré-carrega as próximas imagens para a transição não "piscar"
  useEffect(() => {
    LOOKBOOK.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  /** 1) anima a saída → 2) troca o índice → 3) o useGSAP abaixo anima a entrada */
  const go = (dir) => {
    if (busy.current) return;
    busy.current = true;
    const next = (index + dir + LOOKBOOK.length) % LOOKBOOK.length;

    if (prefersReduced()) {
      setIndex(next);
      return;
    }

    const q = gsap.utils.selector(root);
    gsap
      .timeline({ onComplete: () => setIndex(next) })
      .to(q('[data-txt]'), { autoAlpha: 0, y: -12, duration: 0.35, stagger: 0.05, ease: 'power2.in' }, 0)
      .to(q('[data-img]'), { clipPath: 'inset(100% 0% 0% 0%)', duration: 0.6, ease: 'power3.in' }, 0);
  };

  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      const q = gsap.utils.selector(root);

      if (prefersReduced()) {
        gsap.set([...q('[data-img]'), ...q('[data-txt]')], { clearProps: 'all' });
        busy.current = false;
        return;
      }

      gsap
        .timeline({ onComplete: () => (busy.current = false) })
        .fromTo(
          q('[data-img]'),
          { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.06 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 0.95, ease: 'power3.out' },
          0
        )
        .fromTo(
          q('[data-txt]'),
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out' },
          0.3
        );
    },
    { scope: root, dependencies: [index], revertOnUpdate: false }
  );

  return (
    <section id="lookbook" ref={root} className={styles.section} aria-labelledby="lookbook-titulo">
      <p className={styles.eyebrow}>Feito para acompanhar você</p>
      <h2 id="lookbook-titulo" className={styles.title}>
        Do primeiro passo ao último destino.
      </h2>
      <span className={styles.rule} />

      <div className={styles.stage}>
        <div className={styles.figure}>
          <img className={styles.img} data-img src={slide.image} alt={slide.alt} decoding="async" />
        </div>

        <figure className={styles.quote} data-txt>
          <blockquote>“{slide.quote}”</blockquote>
          <figcaption>— {slide.manifesto}</figcaption>
        </figure>

        <div className={`${styles.item} ${styles.itemTop}`} data-txt>
          <p className={styles.itemName}>{slide.top.name}</p>
          <p className={styles.itemPrice}>{slide.top.price}</p>
        </div>

        <div className={`${styles.item} ${styles.itemBottom}`} data-txt>
          <p className={styles.itemName}>{slide.bottom.name}</p>
          <p className={styles.itemPrice}>{slide.bottom.price}</p>
        </div>

        <div className={styles.controls}>
          <button type="button" className={styles.next} onClick={() => go(1)}>
            <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 32V10l9 12 9-12v22" />
              <path d="M28 14h8M32 14v18" />
            </svg>
            <span>[ próximo ]</span>
          </button>
          <button type="button" className={styles.prev} onClick={() => go(-1)}>
            [ anterior ]
          </button>
        </div>

        <a href="#colecao" className={styles.all}>
          [ ver tudo ]
        </a>
      </div>

      <p className="visually-hidden" aria-live="polite">
        Look {index + 1} de {LOOKBOOK.length}
      </p>
    </section>
  );
}
