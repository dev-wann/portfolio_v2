'use client';

import useLangString from '@/app/_hooks/useLangString';
import useWindowWidth from '@/app/_hooks/useWindowWidth';
import { RootState } from '@/app/_redux';
import { LANG_ENUM } from '@/app/_redux/module/preferSlice';
import { renderText } from '@/app/_utils';
import { useSelector } from 'react-redux';
import NeuTitle from '../common/NeuTitle';
import RoundImage from '../common/RoundImage';
import gStyles from './AboutGlobal.module.scss';
import styles from './Education.module.scss';

export function Education() {
  const strs = useLangString('about', 'edu');
  const windowWidth = useWindowWidth();
  const isSmall = windowWidth && windowWidth < 600 ? true : false;
  const isKor =
    useSelector((state: RootState) => state.prefer.lang) === LANG_ENUM.KOR;

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
        <div
          className={`${styles.desc} ${
            isSmall ? styles.small : ''
          } observe text`}
          style={isKor && !isSmall ? { marginLeft: '1.5rem' } : {}}
        >
          <h2 className={styles.univ}>
            {strs?.univ}
            <span className={styles.sub}>
              {strs ? renderText(strs.univLoc) : ''}
            </span>
          </h2>
          <div>
            <h3>{strs?.ms}</h3>
            <p className={styles.sub}>2017.03 ~ 2019.08</p>

            <h3>{strs?.bs}</h3>
            <p className={styles.sub}>2013.03 ~ 2017.02</p>
          </div>
        </div>
      </div>
    </section>
  );
}
