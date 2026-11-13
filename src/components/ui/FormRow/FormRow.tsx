import type { ReactNode } from 'react';
import styles from './FormRow.module.css';

// Responsive row of form fields.
export default function FormRow({ children }: { children: ReactNode }) {
  return <div className={styles.row}>{children}</div>;
}
