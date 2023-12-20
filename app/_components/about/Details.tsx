import styles from './Details.module.scss';

export default function Details({ show }: { show: boolean }) {
  return (
    <div className={`${styles.detailsWrapper} ${show ? styles.show : ''}`}>
      <div className={styles.details}>Details</div>
    </div>
  );
}
