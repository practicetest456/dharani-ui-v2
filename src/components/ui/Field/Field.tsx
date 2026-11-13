import type { ReactNode } from 'react';
import { cx } from '@/utils/cx';
import styles from './Field.module.css';

// Class for any text control (select, input, trigger button) so every form control looks the same.
export const controlClass = styles.control;

// Label + required star + the control. One place to restyle every form field.
export default function Field({ label, required = true, as: Tag = 'label', className, children }: {
  label: string; required?: boolean; as?: 'label' | 'div'; className?: string; children: ReactNode;
}) {
  return (
    <Tag className={cx(styles.field, className)}>
      <span className={styles.label}>{label}{required && <> <i>*</i></>}</span>
      {children}
    </Tag>
  );
}
