import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FormRow, SelectField } from '@/components/ui';
import { ErrorBanner } from '@/components/common';
import { districts } from '@/config/districts';
import { api } from '@/services';
import { itemOptions } from '@/utils/format';
import { RadioGroup } from '@/components/ui';

export type Loc = { d: string; m: string; v: string };
export const emptyLoc: Loc = { d: '', m: '', v: '' };
export type Mode = 'vill' | 'mond' | 'dist';
const MODES = [{ value: 'vill', label: 'Generate 1B for village' }, { value: 'mond', label: 'Generate 1B for Mondal' }, { value: 'dist', label: 'Generate 1B for District' }];

// District > Mandal > Village. Mandals and villages come from /api/bhu_bharati; changing a parent clears its children.
export default function LocationSelect({ value, onChange, mode: modeProp, onModeChange }: { value: Loc; onChange: (l: Loc) => void; mode?: Mode; onModeChange?: (m: Mode) => void }) {
  const ms = useQuery({ queryKey: ['mandals', value.d], queryFn: () => api.mandals(value.d), enabled: !!value.d });
  const vs = useQuery({ queryKey: ['villages', value.m], queryFn: () => api.villages(value.m), enabled: !!value.m });
   const [localMode, setLocalMode] = useState<Mode>('vill');
   const mode = modeProp ?? localMode;
   const changeMode = (v: any) => {
     const next = (typeof v === 'string' ? v : v?.target?.value) as Mode;
     setLocalMode(next);
     onModeChange?.(next);
   };
  return (
    <>
    
      <ErrorBanner error={ms.error || vs.error} />
      <RadioGroup name="ror1b-mode" label="Generate" options={MODES} value={mode} onChange={changeMode} />
      <FormRow>
         {(() => {
          if (mode === 'vill') {
            return (
              <>
         <SelectField label="District" value={value.d} options={itemOptions(districts)} onChange={(d) => onChange({ d, m: '', v: '' })} />
        <SelectField label="Mandal" value={value.m} options={itemOptions(ms.data ?? [])} disabled={!value.d} onChange={(m) => onChange({ ...value, m, v: '' })} />
        <SelectField label="Village" value={value.v} options={itemOptions(vs.data ?? [])} disabled={!value.m} onChange={(v) => onChange({ ...value, v })} />
              </>
            );
          } else if (mode === 'mond') {
            return (
              <>
        <SelectField label="District" value={value.d} options={itemOptions(districts)} onChange={(d) => onChange({ d, m: '', v: '' })} />
        <SelectField label="Mandal" value={value.m} options={itemOptions(ms.data ?? [])} disabled={!value.d} onChange={(m) => onChange({ ...value, m, v: '' })} />
              </>
            );
          } else if (mode === 'dist') {
            return (
              <>
        <SelectField label="District" value={value.d} options={itemOptions(districts)} onChange={(d) => onChange({ d, m: '', v: '' })} />
              </>
            );
          }
          return null;
         })()}
              </FormRow>
    </>
  );
}