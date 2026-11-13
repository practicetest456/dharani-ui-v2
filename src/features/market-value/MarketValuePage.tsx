import { useMutation } from '@tanstack/react-query';
import { PageContainer, PageHeader, ResultPanel } from '@/components/common';
import { SurveyKhataForm, type Selection } from '@/components/forms';
import { api } from '@/services';
import { inr, readFields } from '@/utils/format';
import styles from './MarketValuePage.module.css';

// View Market Value Of Lands: reuses the land details API and shows the market value for the chosen survey / khata.
export default function MarketValuePage() {
  const q = useMutation({
    mutationFn: async (s: Selection) => ({
      sel: s,
      data: await api.landParsed({ villageId: s.loc.v, searchData: s.survey, district: s.loc.d, mandal: s.loc.m, khataNoIdselect: s.khata }),
    }),
  });
  const d = q.data?.data, s = q.data?.sel;
  const land = d && readFields(d.landDetails);
  const owner = d && readFields(d.pattadarDetails);
  return (
    <PageContainer>
      <PageHeader title="Market Value Of Lands" back="/info" />
      <SurveyKhataForm title="Find market value" submitLabel="Get market value" pending={q.isPending} onSubmit={q.mutate} onReset={q.reset} />
      <ResultPanel title="Market value" hasResult={!!d} pending={q.isPending} error={q.error}
        pendingText="Fetching market value…" emptyText="The market value will show here after you select Get market value.">
        {s && land && owner && (
          <div className={styles.result}>
            <small className={styles.label}>Market value of survey no. {s.survey}</small>
            <b className={styles.value}>{inr(land.get('Market value'), 'Not available')}</b>
            <dl className={styles.facts}>
              {([['Khata No.', s.khata], ['Total extent (Ac. Gts)', land.get('Total Extent')], ['Land type', land.get('Land Type')],
                ['Nature of land', land.get('Nature')], ['Village', owner.get('Village')]] as const).map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v || '-'}</dd></div>
              ))}
            </dl>
          </div>
        )}
      </ResultPanel>
    </PageContainer>
  );
}
