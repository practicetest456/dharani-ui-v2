import { PageContainer, PageHeader } from '@/components/common';
import { ModuleGrid } from '@/components/ui';
import { dashboardModules } from '@/config/modules';

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader title="Dashboard" />
      <ModuleGrid items={dashboardModules} />
    </PageContainer>
  );
}
