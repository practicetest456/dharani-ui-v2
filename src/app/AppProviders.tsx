import type { ReactNode } from 'react';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 60 * 1000, retry: false, refetchOnWindowFocus: false } },
});

// Global providers. HashRouter: URLs look like /#/info/ror1b, so Spring Boot needs no extra routing config.
export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>{children}</HashRouter>
    </QueryClientProvider>
  );
}
