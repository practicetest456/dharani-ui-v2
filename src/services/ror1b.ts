import { USE_MOCK } from '@/config/env';
import type { PdfQuery } from '@/types';
import { http } from './http';
import { mock } from './mock';

export const ror1bApi = {
  // GET /api/ror1b/optimized-pdf/generate/pdf?districtId=&mandalId=&villageId=&khataNumbers=  ->  PDF (object URL for an iframe)
  pdf: async (q: PdfQuery): Promise<string> => {
    if (USE_MOCK) return mock.pdf();
    const p = new URLSearchParams({ districtId: q.d, mandalId: q.m, villageId: q.v });
    (q.khatas ?? []).forEach((k) => p.append('khataNumbers', k));
    const r = await http(`/api/ror1b/optimized-pdf/generate/pdf?${p}`);
    return URL.createObjectURL(await r.blob());
  },

   // GET /api/ror1b/optimized-pdf/generate/pdf/saveAll?districtId=&mandalId=&villageId=&khataNumbers=  ->  PDF (object URL for an iframe)
  savePdf: async (q: PdfQuery): Promise<string> => {
    if (USE_MOCK) return mock.pdf();
    const p = new URLSearchParams({ districtId: q.d, mandalId: q.m, villageId: q.v });
    (q.khatas ?? []).forEach((k) => p.append('khataNumbers', k));
    const r = await http(`/api/ror1b/optimized-pdf/generate/pdf/saveAll?${p}`);
    return URL.createObjectURL(await r.blob());
  },
};
