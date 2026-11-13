import type { ReactNode } from 'react';
import type { LandDetails } from '@/types';
import { bi, dedupe, inr, none, readFields } from '@/utils/format';
import styles from './LandDetailsView.module.css';

const SummaryItem = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className={styles.summaryItem}><span>{label}</span><strong>{children}</strong></div>
);

const DetailRow = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className={styles.detailRow}><dt>{label}</dt><dd>{children}</dd></div>
);

const Location = ({ label, value }: { label: string; value: { en: string; te: string } }) => (
  <div className={styles.location}>
    <span>{label}</span>
    <strong>{value.en}{value.te && <> | {value.te}</>}</strong>
  </div>
);

export default function LandDetailsView({ data }: { data: LandDetails }) {
  const p = readFields(data.pattadarDetails);
  const l = readFields(data.landDetails);

  const village = bi(p.get('Village'));
  const mandal = bi(p.get('Mandal'));
  const district = bi(p.get('District'));

  const name = dedupe(p.get('Pattadar'));
  const father = dedupe(p.get('Father'));
  const ppb = p.get('PPB');
  const ekyc = p.get('eKYC');
  const khata = p.get('Khata');

  const survey = l.get('Survey No');
  const extent = l.get('Total Extent');
  const value = l.get('Market value');
  const status = l.get('Land Status');
  const nature = l.get('Nature');
  const cls = l.get('Classification');
  const type = l.get('Land Type');
  const tx = l.get('Transaction');

  const more = [...p.rest(), ...l.rest()]; // any field the portal adds later still shows up

  return (
    <article className={styles.record}>
      <header className={styles.locationHeader}>
        <Location label="District" value={district} />
        <Location label="Mandal" value={mandal} />
        <Location label="Village" value={village} />
      </header>

      <div className={styles.content}>
        <section className={styles.summary}>
          <SummaryItem label="Survey No.">{survey || '-'}</SummaryItem>
          <SummaryItem label="Khata No.">{khata || '-'}</SummaryItem>
          <SummaryItem label="Total extent (Ac. Gts)">{extent || '-'}</SummaryItem>
          <SummaryItem label="Market value">{inr(value)}</SummaryItem>
        </section>

        <div className={styles.detailsGrid}>
          <section className={styles.card}>
            <h2>PATTADAR DETAILS</h2>
            <dl>
              <DetailRow label="Name">{name || '-'}</DetailRow>
              <DetailRow label="Father / Husband">{father || '-'}</DetailRow>
              <DetailRow label="PPB number">{ppb || '-'}</DetailRow>
              <DetailRow label="eKYC status">{none(ekyc) ? 'Not available' : ekyc}</DetailRow>
            </dl>
          </section>

          <section className={styles.card}>
            <h2>LAND DETAILS</h2>
            <dl>
              <DetailRow label="Land status">{status || '-'}</DetailRow>
              <DetailRow label="Nature of land">{nature || '-'}</DetailRow>
              <DetailRow label="Classification of land">{cls || '-'}</DetailRow>
              <DetailRow label="Land type">{type || '-'}</DetailRow>
              <DetailRow label="Transaction status">{tx || '--'}</DetailRow>
              {more.map(([k, v]) => <DetailRow key={k} label={k}>{v || '-'}</DetailRow>)}
            </dl>
          </section>
        </div>

        <footer className={styles.footer}>
          <div className={styles.disclaimer}>
            <div><strong>Disclaimer - </strong>The information provided online is updated, and no physical visit is required.</div>
            <div>Click here for CERSAI for Asset Based Search.</div>
            <div><strong>Note : </strong>Records are updated as on - {new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}</div>
          </div>
        </footer>
      </div>
    </article>
  );
}
