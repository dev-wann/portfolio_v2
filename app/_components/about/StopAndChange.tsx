import styles from './StopAndChange.module.scss';

export default function StopAndChange() {
  const outer = (
    <svg
      className={styles.outer}
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
    >
      <path d="M29.2893 1.97776e-07L70.7107 0L100 29.2893V70.7107L70.7107 100H29.2893L1.97776e-07 70.7107L0 29.2893L29.2893 1.97776e-07Z" />
    </svg>
  );

  const inner = (
    <svg
      className={styles.inner}
      xmlns="http://www.w3.org/2000/svg"
      width="90"
      height="90"
      viewBox="0 0 90 90"
      fill="none"
    >
      <g filter="url(#filter0_ii_3_142)">
        <path
          d="M26.3604 1.77998e-07L63.6396 0L90 26.3604V63.6396L63.6396 90H26.3604L1.77998e-07 63.6396L0 26.3604L26.3604 1.77998e-07Z"
          fill="#FF6961"
        />
      </g>
      <defs>
        <filter
          id="filter0_ii_3_142"
          x="-3"
          y="-3"
          width="96"
          height="96"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="3" dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_3_142"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-3" dy="-3" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_3_142"
            result="effect2_innerShadow_3_142"
          />
        </filter>
      </defs>
    </svg>
  );

  const lineLeft = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="855"
      height="55"
      viewBox="0 0 855 55"
      fill="none"
    >
      <path
        d="M855 50H55C30 50 5 25 5 0"
        stroke="var(--color-primary-1)"
        stroke-width="10"
      />
    </svg>
  );
  const lineRight = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="855"
      height="155"
      viewBox="0 0 855 155"
      fill="none"
    >
      <path
        d="M0 5H800C825 5 850 30 850 55V155"
        stroke="var(--color-primary-1)"
        stroke-width="10"
      />
    </svg>
  );

  return (
    <div className={styles.stopAndChange}>
      <div className={styles.stopsign}>
        {outer}
        {inner}
        <span>STOP</span>
      </div>
      <div className={styles.lineLeft}>{lineLeft}</div>
      <div className={styles.lineRight}>{lineRight}</div>
    </div>
  );
}
