import type { Item, LandDetails, LandRequest } from '@/types';

// Sample data for `npm run dev:mock` (no backend needed).
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const SURVEYS = ['1', '1/1', '1/2', '2', '3/A', '4', '5/1', '5/2', '6', '7/1', '8', '9'];
const KHATAS = ['346', '1333', '2050', ...Array.from({ length: 45 }, (_, i) => String(1001 + i))];
const MOCK_PDF = '%PDF-1.1\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 400 200]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj\n4 0 obj<</Length 44>>stream\nBT /F1 18 Tf 20 100 Td (Demo ROR-1B) Tj ET\nendstream endobj\n5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj\ntrailer<</Root 1 0 R>>\n';

export const mock = {
  mandals: async (): Promise<Item[]> =>
    (await sleep(150), [{ id: 193, name: 'Gajwel', telugu: 'గజ్వేల్' }, { id: 632, name: 'Akbarpet-Bhoompally' }]),
  villages: async (): Promise<Item[]> =>
    (await sleep(150), [{ id: 1007004, name: 'Ahmadipur', telugu: 'అహ్మదాపూర్' }, { id: 1007010, name: 'Sample Village' }]),
  surveys: async (): Promise<string[]> => (await sleep(150), SURVEYS),
  khatas: async (survey: string): Promise<string[]> => (await sleep(150), KHATAS.slice(0, 2 + (survey.length % 3))),
  allKhatas: async (): Promise<string[]> => (await sleep(200), KHATAS),
  landParsed: async (req: LandRequest): Promise<LandDetails> => {
    await sleep(300);
    return {
      pattadarDetails: { District: 'Siddipet', Mandal: 'Gajwel', Village: 'Ahmadipur', 'Pattadar / Authorised Person Name': 'Ramulu', "Father / Husband's Name": 'Narsaiah', 'Khata Number': req.khataNoIdselect },
      landDetails: { 'Total Extent (Ac. Gts)': '0.0500', 'Survey No./ Sub-Division No.': req.searchData, 'Land Status': 'Digital Signed', 'Nature of Land': 'Patta', 'Land Type': 'Agriculture Lands', 'Market value of Survey no.(in INR)': '675000.00' },
    };
  },
  pdf: async (): Promise<string> => (await sleep(300), URL.createObjectURL(new Blob([MOCK_PDF], { type: 'application/pdf' }))),
};
