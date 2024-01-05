import styles from './Details.module.scss';

export default function Details({ show }: { show: boolean }) {
  return (
    <div className={`${styles.detailsWrapper} ${show ? styles.show : ''}`}>
      <div className={styles.details}>
        Sorry. I am still working on it.
        <br />I will complete this section as soon as possible.
      </div>
    </div>
  );
}
