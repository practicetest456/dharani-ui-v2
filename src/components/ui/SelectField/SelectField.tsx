import type { Option } from '@/types';
import Field, { controlClass } from '../Field';

export default function SelectField({ label, value, onChange, options, disabled, placeholder = 'Select an option', required }: {
  label: string; value: string; onChange: (v: string) => void; options: Option[]; disabled?: boolean; placeholder?: string; required?: boolean;
}) {
  return (
    <Field label={label} required={required}>
      <select className={controlClass} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </Field>
  );
}
