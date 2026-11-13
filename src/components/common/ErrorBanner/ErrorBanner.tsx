import { ApiError } from '@/services';
import styles from './ErrorBanner.module.css';

export default function ErrorBanner({ error }: { error: unknown }) {
  if (!error) return null;
  const code = error instanceof ApiError ? error.code : 'ERROR';
  const message = error instanceof Error ? error.message : String(error);
  return <div className={styles.banner} role="alert"><b>{code}</b> {message}</div>;
}
