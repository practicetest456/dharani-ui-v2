import { landRecordsApi } from './landRecords';
import { masterDataApi } from './masterData';
import { ror1bApi } from './ror1b';

export { ApiError } from './http';
// One object for pages to call: api.mandals(...), api.landParsed(...), api.pdf(...)
export const api = { ...masterDataApi, ...landRecordsApi, ...ror1bApi };
