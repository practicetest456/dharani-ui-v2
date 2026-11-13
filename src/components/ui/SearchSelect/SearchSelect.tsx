import { useEffect, useMemo, useRef, useState } from 'react';
import Field, { controlClass } from '../Field';
import styles from './SearchSelect.module.css';

// Type-to-search dropdown (single choice). Fully styled by us, unlike the browser's native datalist.
export default function SearchSelect({ label, value, onChange, options, placeholder, disabled }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder?: string; disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLabelElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const q = value.trim().toLowerCase();
  const matches = useMemo(() => options.filter((o) => o.toLowerCase().includes(q)), [options, q]);
  const pick = (o: string) => { onChange(o); setOpen(false); };
  return (
    <div ref={ref as never}>
      <Field label={label}>
        <input type="text" className={controlClass} value={value} disabled={disabled} placeholder={placeholder} autoComplete="off"
          onFocus={() => setOpen(true)} onChange={(e) => { onChange(e.target.value); setOpen(true); }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false);
            if (e.key === 'Enter' && matches.length) { e.preventDefault(); pick(matches[0]); }
          }} />
        {open && !disabled && (
          <div className={styles.list} role="listbox">
            {matches.length
              ? matches.slice(0, 200).map((o) => <button type="button" key={o} role="option" aria-selected={o === value} className={styles.item} onClick={() => pick(o)}>{o}</button>)
              : <div className={styles.empty}>No match found.</div>}
          </div>
        )}
      </Field>
    </div>
  );
}
