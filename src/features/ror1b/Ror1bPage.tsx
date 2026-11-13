import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ErrorBanner, PageContainer, PageHeader, ResultPanel } from '@/components/common';
import { LocationSelect, emptyLoc, type Loc } from '@/components/forms';
import { ActionBar, Button, MultiSelect, Panel, RadioGroup } from '@/components/ui';
import { useRevokeObjectUrl } from '@/hooks/useRevokeObjectUrl';
import { api } from '@/services';
import styles from './Ror1bPage.module.css';

type LocMode = 'vill' | 'mond' | 'dist';
type Scope = 'all' | 'some';
const SCOPES = [{ value: 'all', label: 'All records in the village' }, { value: 'some', label: 'Selected khata numbers' }];

// RoR1B: pick a village, then either every record in it or specific khata numbers.
export default function Ror1bPage() {
  const [loc, setLoc] = useState<Loc>(emptyLoc);
  const [lmode, setLmode] = useState<LocMode>('vill');
  const [scope, setScope] = useState<Scope>('all');
  const [sel, setSel] = useState<string[]>([]);
  const khatas = useQuery({ queryKey: ['khatas-all', loc.v], queryFn: () => api.allKhatas(loc.v), enabled: lmode === 'vill' && scope === 'some' && !!loc.v });
  const pdf = useMutation({
    mutationFn: () => {
      if (lmode === 'vill') {
        return api.pdf({ ...loc, khatas: scope === 'some' ? sel : [] });
      } else if (lmode === 'mond') {
        return api.savePdf({ d: loc.d, m: loc.m, v: '', khatas: [] });
      } else {
        return api.savePdf({ d: loc.d, m: '', v: '', khatas: [] });
      }
    },
  });
  useRevokeObjectUrl(pdf.data);
  const isReady = () => {
    if (lmode === 'vill') {
      return !!(loc.d && loc.m && loc.v && (scope === 'all' || sel.length > 0));
    } else if (lmode === 'mond') {
      return !!(loc.d && loc.m);
    } else {
      return !!loc.d;
    }
  };
  const ready = isReady();
  const reset = () => { setLoc(emptyLoc); setLmode('vill'); setScope('all'); setSel([]); pdf.reset(); };
  return (
    <PageContainer>
      <PageHeader title="RoR1B" back="/info" />
      <Panel>
        <LocationSelect value={loc} onChange={(l) => { setLoc(l); setSel([]); }} mode={lmode} onModeChange={(m) => { setLmode(m); setLoc(emptyLoc); setSel([]); setScope('all'); pdf.reset(); }} />
        {lmode === 'vill' && (
          <>
            <RadioGroup name="ror1b-scope" label="Records" options={SCOPES} value={scope} onChange={(v) => setScope(v as Scope)} />
            {scope === 'all'
              ? <p className={styles.hint}>A whole-village PDF can take a few minutes to generate.</p>
              : <>
                <ErrorBanner error={khatas.error} />
                <MultiSelect label="Khata No." unit="khata number" searchPlaceholder="Search khata number" renderOption={(k) => `Khata ${k}`}
                  options={khatas.data ?? []} value={sel} onChange={setSel} loading={khatas.isFetching} disabled={!loc.v} />
              </>}
          </>
        )}
        <ActionBar>
          {lmode === 'vill' ? (
            <Button disabled={!ready || pdf.isPending} onClick={() => pdf.mutate()}>Submit</Button>
          ) : (
            <Button disabled={!ready || pdf.isPending} onClick={() => pdf.mutate()}>Generate</Button>
          )}
          <Button variant="secondary" onClick={reset}>Reset</Button>
        </ActionBar>
      </Panel>
      <ResultPanel title="ROR-1B" hasResult={!!pdf.data} pending={pdf.isPending} error={pdf.error}
        pendingText="Generating ROR-1B…" emptyText="The ROR-1B PDF will show here after you select Submit.">
        <iframe title="ROR-1B PDF" src={pdf.data} />
      </ResultPanel>
    </PageContainer>
  );
}