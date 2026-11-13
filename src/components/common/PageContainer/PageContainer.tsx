import type { ReactNode } from 'react';
import styles from './PageContainer.module.css';

// Centers page content and sets its width. Wrap every page in this.
export default function PageContainer({ children }: { children: ReactNode }) {
  return <main className={styles.container}>{children}</main>;
}
