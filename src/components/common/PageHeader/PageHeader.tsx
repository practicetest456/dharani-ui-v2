import { Link } from 'react-router-dom';
import styles from './PageHeader.module.css';

export default function PageHeader({ title, back }: { title: string; back?: string }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <span className={styles.spacer} />
      {back && <Link className={styles.back} to={back}>Back</Link>}
    </div>
  );
}
