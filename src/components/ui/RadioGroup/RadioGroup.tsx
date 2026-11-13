import type { Option } from '@/types';
import styles from './RadioGroup.module.css';

export default function RadioGroup({ name, label, options, value, onChange }: {
  name: string; label: string; options: Option[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className={styles.group} role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <label key={o.value} className={styles.option}>
          <input type="radio" name={name} checked={value === o.value} onChange={() => onChange(o.value)} /> {o.label}
        </label>
      ))}
    </div>
  );
}
