import styles from './Loading.module.scss';

export default function Loading({ isLoading }: { isLoading: boolean }) {
  return (
    <div className={`${styles.wrapper} ${isLoading ? styles.loading : ''}`}>
      <div className={styles.circle} />
      <div className={styles.circle} />
      <div className={styles.circle} />
    </div>
  );
}
