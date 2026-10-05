import styles from './Marquee.module.css';

/**
 * Letreiro infinito em CSS puro (GPU, sem JS por frame).
 * Renderiza dois grupos idênticos e desloca -50% em loop contínuo.
 */
export default function Marquee({
  items = [],
  repeat = 6,
  speed = 40,
  reverse = false,
  bordered = false,
  className = '',
}) {
  const group = (hidden) => (
    <div className={styles.group} aria-hidden={hidden || undefined}>
      {Array.from({ length: repeat }).flatMap((_, r) =>
        items.map((text, i) => (
          <span key={`${r}-${i}`} className={styles.item}>
            {text}
            <i className={styles.dot} aria-hidden="true">
              ·
            </i>
          </span>
        ))
      )}
    </div>
  );

  const rootClass = [styles.root, bordered && styles.bordered, reverse && styles.reverse, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass} style={{ '--speed': `${speed}s` }}>
      <div className={styles.track}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
