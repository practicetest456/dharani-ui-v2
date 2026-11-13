export type Item = { id: number; name: string; telugu?: string };
export type Option = { value: string; label: string };
export type PdfQuery = { d: string; m: string; v: string; khatas?: string[] };
// Body of POST /api/public-data/parsed (PublicDataRequest). searchData = survey number.
export type LandRequest = { villageId: string; searchData: string; district: string; mandal: string; khataNoIdselect: string };
export type KhataResult = { surveyNo: string; khataNos: string[]; error: string | null };
// Response of /api/public-data/parsed (Ror1BLandDetails): two label -> value maps.
export type LandDetails = { pattadarDetails: Record<string, string>; landDetails: Record<string, string> };
