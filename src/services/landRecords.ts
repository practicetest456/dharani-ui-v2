import { USE_MOCK } from '@/config/env';
import type { LandDetails, LandRequest } from '@/types';
import { http } from './http';
import { mock } from './mock';

export const landRecordsApi = {
  // POST /api/public-data/parsed  ->  { pattadarDetails: {...}, landDetails: {...} }
  landParsed: async (req: LandRequest): Promise<LandDetails> => {
    if (USE_MOCK) return mock.landParsed(req);
    const r = await http('/api/public-data/parsed', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(req) });
    return r.json();
  },
};
