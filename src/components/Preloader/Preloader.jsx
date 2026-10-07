import { useEffect, useRef, useState } from 'react';
import styles from './Preloader.module.css';
import { gsap, ScrollTrigger } from '../../lib/gsap.js';
import { useLenis } from '../../hooks/useLenis.js';
import { BRAND, HERO, PRODUCTS, LOOKBOOK, STORE } from '../../data/content.js';

const MIN_MS = 2200; // tempo mínimo na tela (evita um "piscar" se o site carregar rápido)
const MAX_MS = 10000; // limite de segurança: nunca fica preso se algo falhar

// Imagens críticas que precisam estar prontas antes de revelar o site
const CRITICAL = [
  HERO.background,
  HERO.model,
  PRODUCTS[0].image,
  PRODUCTS[1].image,
  LOOKBOOK[0].image,
  STORE.image,
];

const loadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => resolve(); // erro também libera (ex.: foto ainda não adicionada)
    img.src = src;
  });

const pageLoaded = () =>
  new Promise((resolve) => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', () => resolve(), { once: true });
  });

/**
 * Tela de carregamento. `onReveal` é chamado quando a cortina começa a subir,
 * para o Hero iniciar sua animação de entrada por trás dela.
 */
export default function Preloader({ onReveal }) {
  const lenis = useLenis();
  const lenisRef = useRef(null);
  lenisRef.current = lenis;
  const onRevealRef = useRef(onReveal);
  onRevealRef.current = onReveal;

  const [gone, setGone] = useState(false);
  const root = useRef(null);
  const content = useRef(null);
  const fill = useRef(null);
  const counter = useRef(null);

  // Trava o scroll enquanto carrega
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    lenis?.stop();
  }, [lenis]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    const tasks = [document.fonts?.ready ?? Promise.resolve(), pageLoaded(), ...CRITICAL.map(loadImage)];
    const total = tasks.length;
    let loaded = 0;
    let displayed = 0;
    let exiting = false;
    let tl;

    tasks.forEach((p) =>
      Promise.resolve(p).then(
        () => loaded++,
        () => loaded++
      )
    );

    const render = (v) => {
      if (counter.current) counter.current.textContent = String(Math.round(v)).padStart(3, '0');
      if (fill.current) fill.current.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
    };

    const finish = () => {
      document.documentElement.style.overflow = '';
      lenisRef.current?.start();
      ScrollTrigger.refresh();
      setGone(true);
    };

    const exit = () => {
      if (reduce) {
        onRevealRef.current?.();
        finish();
        return;
      }
      tl = gsap.timeline({ onComplete: finish });
      tl.to(content.current, { autoAlpha: 0, y: -24, duration: 0.6, ease: 'power2.in' })
        .call(() => onRevealRef.current?.(), null, '>-0.05')
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.15, ease: 'power4.inOut' }, '<');
    };

    const tick = () => {
      const elapsed = performance.now() - start;
      const real = (loaded / total) * 100;
      const timeCap = Math.min(100, (elapsed / (reduce ? 300 : MIN_MS)) * 100);
      const target = elapsed > MAX_MS ? 100 : Math.min(real, timeCap);

      displayed += (target - displayed) * 0.1;
      if (target >= 100 && displayed > 99.4) displayed = 100;
      render(displayed);

      if (displayed >= 100 && !exiting) {
        exiting = true;
        gsap.ticker.remove(tick);
        exit();
      }
    };

    render(0);
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      tl?.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={root} className={styles.root} role="status" aria-label="Carregando o site">
      <div ref={content} className={styles.content}>
        <p className={styles.top}>
          <span>{BRAND}</span>
          <span>Da rua pra rua</span>
        </p>

        <div className={styles.word} aria-hidden="true">
          <span className={styles.ghost}>{BRAND}</span>
          <span ref={fill} className={styles.fill}>
            {BRAND}
          </span>
        </div>

        <div className={styles.bottom}>
          <span className={styles.label}>Carregando a matéria</span>
          <span className={styles.count} aria-hidden="true">
            <span ref={counter}>000</span>
            <small>%</small>
          </span>
        </div>
      </div>
    </div>
  );
}
