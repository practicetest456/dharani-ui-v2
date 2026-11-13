import type { ReactNode } from 'react';
import Panel from '@/components/ui/Panel';
import ErrorBanner from '../ErrorBanner';
import styles from './ResultPanel.module.css';

// The box under a form that shows an API result (a PDF or details), passed as children.
export default function ResultPanel({ title, hasResult, pending, error, pendingText, emptyText, children }: {
  title: string; hasResult: boolean; pending: boolean; error: unknown; pendingText: string; emptyText: string; children: ReactNode;
}) {
  return (
    <Panel title={title} padded={false}>
      <div className={styles.output}>
        {pending ? <div className={styles.empty}>{pendingText}</div> : hasResult ? children : <div className={styles.empty}>{emptyText}</div>}
      </div>
      <ErrorBanner error={error} />
    </Panel>
  );
}
