import styles from './DetailItemEnd.module.scss';

export default function DetailItemEnd() {
  const line = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="455"
      height="80"
      viewBox="0 0 455 80"
      fill="none"
    >
      <path
        d="M450 0V25C450 50 425 75 400 75H0"
        stroke="var(--color-primary-1)"
        stroke-width="10"
      />
    </svg>
  );

  const arrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="194"
      height="156"
      viewBox="0 0 194 156"
      fill="none"
    >
      <path
        d="M81.9225 87.8151L113.594 82.979C114.782 82.8012 116.036 83.1257 117.012 83.9743C118.776 85.5094 118.964 88.1864 117.425 89.9461L61.0126 154.553L60.5153 155.03C58.7139 156.518 56.0368 156.265 54.5482 154.468L0.963066 89.8618C0.209358 88.9289 -0.159675 87.6903 0.0654989 86.4204C0.478318 84.1303 2.68002 82.6046 4.97241 83.0165L31.815 87.8338C32.4686 82.224 33.8697 76.1056 35.9932 69.8094C41.5256 53.3793 52.0713 35.5015 67.3706 21.9731C82.82 8.31048 103.089 -0.943532 127.92 0.076718C136.965 0.441761 146.604 2.18274 156.802 5.57733C158.453 5.99541 159.758 7.39319 159.97 9.18097C160.245 11.5023 158.582 13.6083 156.258 13.8797C124.959 17.6019 106.81 29.6452 96.2742 44.534C86.8544 57.841 83.3423 73.6096 81.9225 87.8151Z"
        fill="var(--color-primary-1)"
      />
      <path
        d="M123 3.45176e-09H194V10H123V3.45176e-09Z"
        fill="var(--color-primary-1)"
      />
      <path
        d="M154 4.06396L192.45 0.0362954L193.492 9.98188L155.042 14.0095L154 4.06396Z"
        fill="var(--color-primary-1)"
      />
    </svg>
  );
  return (
    <div className={styles.wrapper}>
      <div className={styles.line}>{line}</div>
      <div className={styles.arrow}>{arrow}</div>
      <div className={styles.title}>
        <p>Keep Diving into the Web Development</p>
      </div>
    </div>
  );
}
