import type { ReactElement } from 'react';
import DashboardPage from '@/features/dashboard';
import InformationPage from '@/features/information';
import LandSearchPage from '@/features/land-search';
import MarketValuePage from '@/features/market-value';
import Ror1bPage from '@/features/ror1b';

// The only place that lists pages. To add one: create a feature folder, add a line here, add a tile in config/modules.ts.
export const routes: { path: string; element: ReactElement }[] = [
  { path: '/', element: <DashboardPage /> },
  { path: '/info', element: <InformationPage /> },
  { path: '/info/land-search', element: <LandSearchPage /> },
  { path: '/info/ror1b', element: <Ror1bPage /> },
  { path: '/info/market-value', element: <MarketValuePage /> },
];
