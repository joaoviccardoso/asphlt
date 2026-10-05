import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap.js';

const LenisContext = createContext(null);

/** Acesso à instância do Lenis (scrollTo, stop, start...). */
export const useLenis = () => useContext(LenisContext);

/**
 * Inicializa o Lenis e o sincroniza com o ScrollTrigger:
 *  1. Lenis avisa o ScrollTrigger a cada scroll;
 *  2. O Lenis é movido pelo ticker do GSAP (um único requestAnimationFrame);
 *  3. lagSmoothing(0) evita "saltos" após queda de FPS.
 */
export function SmoothScrollProvider({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: !reduceMotion,
      wheelMultiplier: 1,
    });

    const onTick = (time) => instance.raf(time * 1000);

    instance.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    // Recalcula posições quando fontes/imagens terminam de carregar.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      gsap.ticker.remove(onTick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
