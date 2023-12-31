'use client';

import useLangString from '@/app/_hooks/useLangString';
import useWindowWidth from '@/app/_hooks/useWindowWidth';
import NeuTitle from '../common/NeuTitle';
import RoundImage from '../common/RoundImage';
import gStyles from './AboutGlobal.module.scss';
import styles from './Education.module.scss';

export function Education() {
  const strs = useLangString('about', 'edu');
  const windowWidth = useWindowWidth();
  const isSmall = windowWidth && windowWidth < 600 ? true : false;

  return (
    <section className={gStyles.section}>
      <NeuTitle text="Education" className="observe" />
      <div
        className={`${gStyles.content} ${styles.grid} ${
          isSmall ? styles.small : ''
        }`}
      >
        <RoundImage
          src="/images/about/yonsei.jpg"
          size={150}
          alt="symbol of yonsei university"
          className="observe"
        />
        <div className={`${styles.desc} observe text`}>
          <h2 className={styles.univ}>
            {strs?.univ}
            <span className={styles.sub}>{strs ? strs['univ-loc'] : ''}</span>
          </h2>
          <h3>{strs?.ms}</h3>
          <p className={styles.sub}>2017.03 ~ 2019.08</p>
          <h3>{strs?.bs}</h3>
          <p className={styles.sub}>2013.03 ~ 2017.02</p>
        </div>
      </div>
    </section>
  );
}
