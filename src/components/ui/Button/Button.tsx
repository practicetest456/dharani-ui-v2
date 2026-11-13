import type { ButtonHTMLAttributes } from 'react';
import { cx } from '@/utils/cx';
import styles from './Button.module.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' };

export default function Button({ variant = 'primary', type = 'button', className, ...rest }: Props) {
  return <button type={type} className={cx(styles.button, variant === 'secondary' && styles.secondary, className)} {...rest} />;
}
