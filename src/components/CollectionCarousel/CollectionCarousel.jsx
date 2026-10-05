import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './CollectionCarousel.module.css';
import { gsap, useGSAP } from '../../lib/gsap.js';
import { PRODUCTS } from '../../data/content.js';

export default function CollectionCarousel() {
  const root = useRef(null);
  const track = useRef(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });
  const [scroll, setScroll] = useState({ p: 0, thumb: 0.3 });
  const [dragging, setDragging] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScroll({
      p: max > 0 ? el.scrollLeft / max : 0,
      thumb: el.scrollWidth ? el.clientWidth / el.scrollWidth : 1,
    });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const step = (dir) => {
    const el = track.current;
    const card = el.querySelector('[data-card]');
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  // Arrastar com o mouse (touch usa o scroll nativo)
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return;
    const el = track.current;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft };
    setDragging(true);
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    track.current.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const onPointerUp = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-card]', {
          xPercent: 14,
          autoAlpha: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: track.current, start: 'top 85%', once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const atStart = scroll.p <= 0.01;
  const atEnd = scroll.p >= 0.99;

  return (
    <section id="colecao" ref={root} className={styles.section} aria-labelledby="colecao-titulo">
      <div className={styles.head}>
        <h2 id="colecao-titulo" className={styles.title}>
          Nova coleção
        </h2>
        <div className={styles.arrows}>
          <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Peça anterior">
            ←
          </button>
          <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label="Próxima peça">
            →
          </button>
        </div>
      </div>

      <div
        ref={track}
        className={`${styles.track} ${dragging ? styles.dragging : ''}`}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Carrossel da nova coleção"
      >
        {PRODUCTS.map((p) => (
          <article key={p.id} className={styles.card} data-card>
            <img src={p.image} alt={p.name} loading="lazy" draggable="false" />
            <span className={styles.cardTag}>{p.tag}</span>
            <div className={styles.cardInfo}>
              <h3>{p.name}</h3>
              <p>{p.price}</p>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.foot}>
        <div
          className={styles.progress}
          style={{ '--p': scroll.p, '--w': `${scroll.thumb * 100}%` }}
          role="progressbar"
          aria-label="Progresso do carrossel"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(scroll.p * 100)}
        >
          <span className={styles.thumb} />
        </div>
        <a href="#colecao" className={styles.all}>
          (ver tudo)
        </a>
      </div>
    </section>
  );
}
