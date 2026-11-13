import { useMutation } from '@tanstack/react-query';
import { PageContainer, PageHeader, ResultPanel } from '@/components/common';
import { SurveyKhataForm, type Selection } from '@/components/forms';
import { api } from '@/services';
import LandDetailsView from './components/LandDetailsView';

// Land Search Details: pick district > ... > khata, then POST /api/public-data/parsed.
export default function LandSearchPage() {
  const view = useMutation({
    mutationFn: (s: Selection) => api.landParsed({ villageId: s.loc.v, searchData: s.survey, district: s.loc.d, mandal: s.loc.m, khataNoIdselect: s.khata }),
  });
  const isEmpty = view.data && Object.keys(view.data.pattadarDetails).length + Object.keys(view.data.landDetails).length === 0;
  return (
    <PageContainer>
      <PageHeader title="Land Search Details" back="/info" />
      <SurveyKhataForm title="Land details search" submitLabel="Get land details" pending={view.isPending} onSubmit={view.mutate} onReset={view.reset} />
      <ResultPanel title="Land details" hasResult={view.data !== undefined} pending={view.isPending} error={view.error}
        pendingText="Fetching land details…" emptyText="The land details will show here after you select Get land details.">
        {view.data && (isEmpty
          ? <p>No land details were returned. The portal session or captcha may have expired.</p>
          : <LandDetailsView data={view.data} />)}
      </ResultPanel>
    </PageContainer>
  );
}
