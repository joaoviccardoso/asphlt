import { useRef, useState } from 'react';
import styles from './Footer.module.css';
import Marquee from '../Marquee/Marquee.jsx';
import { gsap, useGSAP } from '../../lib/gsap.js';
import { useLenis } from '../../hooks/useLenis.js';
import { BRAND, MARQUEE_TEXT, NAV_LINKS, STORE } from '../../data/content.js';

// ⚠ Troque pelos perfis e páginas reais da marca.
const SOCIAL = [
  { label: 'Instagram', href: 'https://instagram.com/' },
  { label: 'TikTok', href: 'https://tiktok.com/' },
  { label: 'YouTube', href: 'https://youtube.com/' },
];

const LEGAL = [
  { label: 'Termos de uso', href: '#' },
  { label: 'Privacidade', href: '#' },
  { label: 'Trocas e devoluções', href: '#' },
];

export default function Footer() {
  const root = useRef(null);
  const lenis = useLenis();
  const [sent, setSent] = useState(false);

  const go = (e, href) => {
    e.preventDefault();
    if (lenis) lenis.scrollTo(href, { offset: href === '#top' ? 0 : -60, duration: 1.4 });
    else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: enviar o e-mail para a sua ferramenta (Mailchimp, Brevo, API própria...)
    setSent(true);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-letter]', {
          yPercent: 112,
          duration: 1.3,
          stagger: 0.07,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: root.current.querySelector('[data-wordmark]'),
            start: 'top 92%',
            once: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <footer ref={root} className={styles.footer}>
      <Marquee items={[MARQUEE_TEXT, BRAND]} bordered speed={50} reverse />

      <div className={styles.inner}>
        <section className={styles.newsletter} aria-labelledby="news-titulo">
          <p className={styles.label}>Lista de drops</p>
          <h2 id="news-titulo" className={styles.heading}>
            Cada tiragem sai uma vez.
            <br />
            <em>Não fique de fora.</em>
          </h2>

          <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
            <label htmlFor="footer-email" className="visually-hidden">
              Seu e-mail
            </label>
            <input
              id="footer-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="seu@email.com"
              disabled={sent}
            />
            <button type="submit" disabled={sent}>
              {sent ? '[ enviado ]' : '[ entrar ]'}
            </button>
          </form>
          <p className={styles.feedback} aria-live="polite">
            {sent ? 'Pronto. Você entra na lista do próximo drop.' : 'Aviso antes de abrir cada tiragem numerada. Sem spam.'}
          </p>
        </section>

        <nav className={styles.col} aria-label="Navegação do rodapé">
          <p className={styles.label}>Navegar</p>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={(e) => go(e, l.href)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <p className={styles.label}>Siga</p>
          <ul>
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <address className={`${styles.col} ${styles.address}`}>
          <p className={styles.label}>Visite</p>
          <p>{STORE.address}</p>
          <p>{STORE.hours}</p>
        </address>
      </div>

      <div className={styles.wordmark} data-wordmark aria-hidden="true">
        {BRAND.split('').map((ch, i) => (
          <span key={i} className={styles.letter} data-letter>
            {ch}
          </span>
        ))}
      </div>

      <div className={styles.legal}>
        <p>
          © {new Date().getFullYear()} {BRAND}. Todos os direitos reservados.
        </p>
        <ul>
          {LEGAL.map((l) => (
            <li key={l.label}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="#top" className={styles.top} onClick={(e) => go(e, '#top')}>
          [ voltar ao topo ↑ ]
        </a>
      </div>
    </footer>
  );
}
