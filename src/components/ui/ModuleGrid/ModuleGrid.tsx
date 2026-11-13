import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Module } from '@/config/modules';
import styles from './ModuleGrid.module.css';

// Grid of tiles (Dashboard, Information Modules). A tile without `to` is a disabled placeholder.
export default function ModuleGrid({ items }: { items: Module[] }) {
  const navigate = useNavigate();
  return (
    <div className={styles.grid}>
      {items.map((m) => (
        <button key={m.title} className={styles.card} style={{ '--card-color': m.color } as CSSProperties}
          disabled={!m.to} onClick={() => m.to && navigate(m.to)}>
          <span className={styles.icon} aria-hidden="true">{m.icon}</span>
          <span><b className={styles.title}>{m.title}</b><small className={styles.desc}>{m.desc}</small></span>
          {m.soon && <span className={styles.soon}>Under construction</span>}
        </button>
      ))}
    </div>
  );
}
