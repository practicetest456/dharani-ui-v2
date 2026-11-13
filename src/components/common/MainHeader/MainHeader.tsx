import { Link, useLocation } from 'react-router-dom';
import { cx } from '@/utils/cx';
import styles from './MainHeader.module.css';

// Common header on every page. Inside any page it also shows a Home button that goes back to the Dashboard.
export default function MainHeader() {
  const { pathname } = useLocation();
  const inner = pathname !== '/';
  return (
    <header className={cx(styles.header, inner && styles.inner)}>
      <Link to="/" className={styles.brand} aria-label="Bhu Bharati home">
        <div>
          <h1>Bhu Bharati</h1>
          <p>Telangana - Land Records & Information Services</p>
        </div>
      </Link>

      {inner && (
        <Link to="/" className={styles.home} aria-label="Home">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 11.5 12 4l9 7.5" /><path d="M5 10v10h5v-6h4v6h5V10" />
          </svg>
          <span>Home</span>
        </Link>
      )}
    </header>
  );
}
