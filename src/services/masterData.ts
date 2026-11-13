import { USE_MOCK } from '@/config/env';
import type { Item, KhataResult } from '@/types';
import { ApiError, json } from './http';
import { mock } from './mock';

const BASE = '/api/bhu_bharati'; // MasterDataController: all dependent dropdowns
const numeric = (a: string, b: string) => a.localeCompare(b, undefined, { numeric: true });

export const masterDataApi = {
  // GET /mandal/json?districtId=  ->  { metadata, items: [{id,name,telugu}] }
  mandals: async (districtId: string): Promise<Item[]> =>
    USE_MOCK ? mock.mandals() : (await json<{ items: Item[] }>(`${BASE}/mandal/json?districtId=${districtId}`)).items,
  // GET /village/json?mandalId=
  villages: async (mandalId: string): Promise<Item[]> =>
    USE_MOCK ? mock.villages() : (await json<{ items: Item[] }>(`${BASE}/village/json?mandalId=${mandalId}`)).items,
  // GET /surveyNo/json?villageId=  ->  string[]
  surveys: async (villageId: string): Promise<string[]> =>
    USE_MOCK ? mock.surveys() : json<string[]>(`${BASE}/surveyNo/json?villageId=${villageId}`),
  // GET /khata-numbers/single?surveyNo=&villageId=  ->  { surveyNo, khataNos, error }
  khatas: async (villageId: string, survey: string): Promise<string[]> => {
    if (USE_MOCK) return mock.khatas(survey);
    const r = await json<KhataResult>(`${BASE}/khata-numbers/single?surveyNo=${encodeURIComponent(survey)}&villageId=${villageId}`);
    if (r.error) throw new ApiError('PORTAL', r.error);
    return r.khataNos;
  },
  // GET /survey_khataNo/json?villageId=  ->  KhataResult[]  (slow for a big village)
  allKhatas: async (villageId: string): Promise<string[]> => {
    if (USE_MOCK) return mock.allKhatas();
    const rows = await json<KhataResult[]>(`${BASE}/survey_khataNo/json?villageId=${villageId}`);
    return [...new Set(rows.filter((x) => !x.error).flatMap((x) => x.khataNos))].sort(numeric);
  },
};
