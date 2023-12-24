'use client';

import useLangString from '@/app/_hooks/useLangString';
import useWindowWidth from '@/app/_hooks/useWindowWidth';
import Image from 'next/image';
import gStyles from './AboutGlobal.module.scss';
import styles from './Education.module.scss';
import NeuTitle from './NeuTitle';

export function Education() {
  const strs = useLangString('about', 'edu');
  const windowWidth = useWindowWidth();
  const isSmall = windowWidth && windowWidth < 600 ? true : false;

  const imgSize = 150;

  if (!strs) return <></>;

  return (
    <section className={gStyles.section}>
      <NeuTitle text="Education" />
      <div
        className={`${gStyles.content} ${styles.grid} ${
          isSmall ? styles.small : ''
        }`}
      >
        <div
          className={gStyles['round-img']}
          style={{ width: imgSize, height: imgSize }}
        >
          <Image
            src="/images/about/yonsei.jpg"
            width={imgSize}
            height={imgSize}
            alt="symbol of yonsei university"
          />
        </div>
        <div className={styles.desc}>
          <h2 className={styles.univ}>
            <span>{strs.univ}</span>
            <span className={styles.sub}>{strs['univ-loc']}</span>
          </h2>
          <h3>{strs.ms}</h3>
          <p className={styles.sub}>2017.03 ~ 2019.08</p>
          <h3>{strs.bs}</h3>
          <p className={styles.sub}>2013.03 ~ 2017.02</p>
        </div>
      </div>
    </section>
  );
}
