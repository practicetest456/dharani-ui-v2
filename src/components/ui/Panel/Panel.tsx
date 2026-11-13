import type { ReactNode } from 'react';
import styles from './Panel.module.css';

// White card with an optional green title bar. `padded={false}` lets the content touch the edges.
export default function Panel({ title, padded = true, children }: { title?: string; padded?: boolean; children: ReactNode }) {
  return (
    <section className={styles.panel}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {padded ? <div className={styles.body}>{children}</div> : children}
    </section>
  );
}
