import { useEffect, useMemo, useRef, useState } from 'react';
import Field, { controlClass } from '../Field';
import { cx } from '@/utils/cx';
import styles from './MultiSelect.module.css';

// Searchable dropdown where you can tick one or many options. `unit` is the noun used in its texts, e.g. "khata number".
export default function MultiSelect({ label, options, value, onChange, unit = 'item', searchPlaceholder = 'Search', renderOption = (o) => o, loading, disabled }: {
  label: string; options: string[]; value: string[]; onChange: (v: string[]) => void; unit?: string;
  searchPlaceholder?: string; renderOption?: (o: string) => string; loading?: boolean; disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const shown = useMemo(() => options.filter((o) => o.toLowerCase().includes(q.trim().toLowerCase())), [options, q]);
  const toggle = (o: string) => onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o]);
  const text = loading ? `Loading ${unit}s…` : value.length ? `${value.length} ${unit}${value.length > 1 ? 's' : ''} selected` : `Select ${unit}s`;
  return (
    <Field as="div" label={label} className={styles.root}>
      <div ref={ref} onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}>
        <button type="button" className={controlClass} aria-expanded={open} disabled={disabled || loading || !options.length} onClick={() => setOpen((o) => !o)}>{text}</button>
        {open && (
          <div className={styles.popup}>
            <input type="text" className={cx(controlClass)} autoFocus placeholder={searchPlaceholder} aria-label={searchPlaceholder} value={q} onChange={(e) => setQ(e.target.value)} />
            <div className={styles.actions}>
              <button type="button" onClick={() => onChange([...new Set([...value, ...shown])])}>Select all shown</button>
              <button type="button" onClick={() => onChange([])}>Clear</button>
            </div>
            <div className={styles.list}>
              {shown.length ? shown.map((o) => (
                <label key={o}><input type="checkbox" checked={value.includes(o)} onChange={() => toggle(o)} /> {renderOption(o)}</label>
              )) : <div className={styles.empty}>No match found.</div>}
            </div>
          </div>
        )}
        <div className={styles.chips}>
          {value.map((o) => <button type="button" key={o} aria-label={`Remove ${o}`} onClick={() => toggle(o)}>{o} ×</button>)}
        </div>
      </div>
    </Field>
  );
}
