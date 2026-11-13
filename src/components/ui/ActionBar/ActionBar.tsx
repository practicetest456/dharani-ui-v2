import type { ReactNode } from 'react';
import styles from './ActionBar.module.css';

// Row of buttons under a form.
export default function ActionBar({ children }: { children: ReactNode }) {
  return <div className={styles.bar}>{children}</div>;
}
