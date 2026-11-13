import { PageContainer, PageHeader } from '@/components/common';
import { ModuleGrid } from '@/components/ui';
import { infoModules } from '@/config/modules';

export default function InformationPage() {
  return (
    <PageContainer>
      <PageHeader title="Information Modules" back="/" />
      <ModuleGrid items={infoModules} />
    </PageContainer>
  );
}
