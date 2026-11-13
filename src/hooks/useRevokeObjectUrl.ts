import { useEffect } from 'react';

// Frees a blob URL (e.g. a generated PDF) when it is replaced or the page closes.
export function useRevokeObjectUrl(url?: string) {
  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);
}
