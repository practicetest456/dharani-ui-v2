import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ActionBar, Button, FormRow, Panel, SearchSelect, SelectField } from '@/components/ui';
import { ErrorBanner } from '@/components/common';
import { api } from '@/services';
import LocationSelect, { emptyLoc, type Loc } from '../LocationSelect';

export type Selection = { loc: Loc; survey: string; khata: string };

// Shared form: district > mandal > village > survey no > khata no. Each page decides what happens on submit.
export default function SurveyKhataForm({ title, submitLabel, pending, onSubmit, onReset }: {
  title: string; submitLabel: string; pending: boolean; onSubmit: (s: Selection) => void; onReset: () => void;
}) {
  const [loc, setLoc] = useState<Loc>(emptyLoc);
  const [survey, setSurvey] = useState('');
  const [khata, setKhata] = useState('');
  const surveys = useQuery({ queryKey: ['surveys', loc.v], queryFn: () => api.surveys(loc.v), enabled: !!loc.v });
  const validSurvey = !!survey && !!surveys.data?.includes(survey);
  const khatas = useQuery({ queryKey: ['khatas', loc.v, survey], queryFn: () => api.khatas(loc.v, survey), enabled: validSurvey });
  const ready = loc.d && loc.m && loc.v && validSurvey && khata;
  const reset = () => { setLoc(emptyLoc); setSurvey(''); setKhata(''); onReset(); };
  return (
    <Panel title={title}>
      <LocationSelect value={loc} onChange={(l) => { setLoc(l); setSurvey(''); setKhata(''); }} />
      <ErrorBanner error={surveys.error || khatas.error} />
      <FormRow>
        <SearchSelect label="Survey No. / Sub-Division No." value={survey} options={surveys.data ?? []} disabled={!loc.v}
          placeholder={surveys.isFetching ? 'Loading survey numbers…' : 'Search survey number'}
          onChange={(s) => { setSurvey(s.trim()); setKhata(''); }} />
        <SelectField label="Khata No." value={khata} options={(khatas.data ?? []).map((k) => ({ value: k, label: k }))}
          placeholder={khatas.isFetching ? 'Loading…' : 'Select khata number'} disabled={!khatas.data?.length} onChange={setKhata} />
      </FormRow>
      <ActionBar>
        <Button disabled={!ready || pending} onClick={() => onSubmit({ loc, survey, khata })}>{submitLabel}</Button>
        <Button variant="secondary" onClick={reset}>Reset</Button>
      </ActionBar>
    </Panel>
  );
}
