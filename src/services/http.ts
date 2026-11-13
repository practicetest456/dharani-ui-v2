export class ApiError extends Error {
  constructor(public code: string, message: string) { super(message); }
}

export async function http(path: string, init?: RequestInit): Promise<Response> {
  let r: Response;
  try { r = await fetch(path, init); } catch {
    throw new ApiError('NETWORK', 'Cannot reach the API. Check that the Spring Boot app is running.');
  }
  if (!r.ok) {
    let m = '';
    try { m = (await r.json()).message; } catch { /* body was not JSON */ }
    throw new ApiError('HTTP_' + r.status, m || 'The API returned an error.');
  }
  return r;
}

export const json = async <T,>(path: string) => (await http(path)).json() as Promise<T>;
