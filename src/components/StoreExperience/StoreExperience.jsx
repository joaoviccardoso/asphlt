import { useRef, useState } from 'react';
import styles from './StoreExperience.module.css';
import Marquee from '../Marquee/Marquee.jsx';
import { gsap, useGSAP } from '../../lib/gsap.js';
import { BRAND, MARQUEE_TEXT, STORE } from '../../data/content.js';

const CLIP_FULL = 'inset(0% 0% 0% 0% round 0px)';
const CLIP_DESKTOP = 'inset(30% 29% 14% 29% round 28px)';
const CLIP_MOBILE = 'inset(25% 9% 30% 9% round 20px)';

export default function StoreExperience() {
  const root = useRef(null);
  const [mapActive, setMapActive] = useState(false);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const pin = q('[data-pin]')[0];
      const frame = q('[data-frame]');
      const img = q('[data-img]');
      const brand = q('[data-brand]');
      const copy = q('[data-copy]');
      const bars = q('[data-bar]');

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: '(max-width: 768px)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { isMobile, reduce } = ctx.conditions;
          const finalClip = isMobile ? CLIP_MOBILE : CLIP_DESKTOP;

          // Sem animação: já mostra o estado final
          if (reduce) {
            gsap.set(frame, { clipPath: finalClip });
            return;
          }

          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: pin,
              start: 'top top',
              end: '+=170%',
              scrub: 0.8,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // 1) Foto em tela cheia → encolhe (clip-path = sem reflow, só GPU)
          tl.fromTo(frame, { clipPath: CLIP_FULL }, { clipPath: finalClip, ease: 'power2.inOut', duration: 1 }, 0)
            .fromTo(img, { scale: 1.3 }, { scale: 1, ease: 'power2.inOut', duration: 1 }, 0)
            // 2) Marca + letreiros entram por cima
            .fromTo(brand, { autoAlpha: 0, yPercent: 35 }, { autoAlpha: 1, yPercent: 0, ease: 'power3.out', duration: 0.5 }, 0.35)
            .fromTo(bars, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, 0.5)
            // 3) Textos explicativos
            .fromTo(copy, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, ease: 'power3.out', duration: 0.5, stagger: 0.12 }, 0.6)
            // pausa no estado final antes de soltar o pin
            .to({}, { duration: 0.35 });
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(STORE.address)}&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STORE.address)}`;

  return (
    <section id="loja" ref={root} className={styles.section} aria-labelledby="loja-titulo">
      {/* Cena pinada */}
      <div className={styles.pin} data-pin>
        <div className={styles.frame} data-frame>
          <img className={styles.img} data-img src={STORE.image} alt={STORE.imageAlt} />
        </div>

        <div className={`${styles.overlay} ${styles.barTop}`} data-bar>
          <Marquee items={[MARQUEE_TEXT, BRAND]} bordered speed={45} />
        </div>

        <h2 id="loja-titulo" className={`${styles.overlay} ${styles.brand}`} data-brand>
          {BRAND}
        </h2>

        <div className={`${styles.overlay} ${styles.copy}`}>
          {STORE.copy.map((text, i) => (
            <p key={i} data-copy>
              {text}
            </p>
          ))}
        </div>

        <div className={`${styles.overlay} ${styles.barBottom}`} data-bar>
          <Marquee items={[MARQUEE_TEXT, BRAND]} bordered reverse speed={45} />
        </div>
      </div>

      {/* Mapa */}
      <div className={styles.visit}>
        <Marquee items={[MARQUEE_TEXT, BRAND]} bordered speed={45} />
        <div className={styles.visitInner}>
          <div className={styles.visitText}>
            <h3>Visite a loja</h3>
            <p>{STORE.address}</p>
            <p>{STORE.hours}</p>
            <a href={directions} target="_blank" rel="noopener noreferrer">
              Como chegar
            </a>
          </div>

          <div
            className={styles.map}
            onClick={() => setMapActive(true)}
            onMouseLeave={() => setMapActive(false)}
          >
            <iframe
              title={`Mapa da loja ${BRAND}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ pointerEvents: mapActive ? 'auto' : 'none' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
