'use client';

import useCustomRouteTo from '@/app/_hooks/useCustomRouter';
import useLangString from '@/app/_hooks/useLangString';
import useWindowWidth from '@/app/_hooks/useWindowWidth';
import { renderText } from '@/app/_utils';
import { useState } from 'react';
import NeuTitle from '../common/NeuTitle';
import RoundImage from '../common/RoundImage';
import gStyles from './AboutGlobal.module.scss';
import Details from './Details';
import styles from './Profile.module.scss';

export default function Profile() {
  const strs = useLangString('about', 'profile');
  const windowWidth = useWindowWidth();
  const routeTo = useCustomRouteTo();

  const [showDetails, setShowDetails] = useState(false);
  const isSmall = windowWidth && windowWidth < 600;

  // event listeners
  const toResume = () => {
    routeTo('/resume');
  };
  const showBtnContent = (
    <div>
      <span className={styles['btn-name']}>
        {strs?.detail || 'More Stories'}
      </span>
      <Arrows dir="down" />
    </div>
  );
  const closeBtnContent = (
    <div>
      <span className={styles['btn-name']}>
        {strs?.detailClose || 'Close Stories'}
      </span>
      <Arrows dir="up" />
    </div>
  );

  // render
  return (
    <section className={gStyles.section}>
      {/* Section Title */}
      <NeuTitle text="About me" className="observe" />

      {/* Section Description */}
      <div
        className={` ${gStyles.content} ${styles.grid} ${
          isSmall ? styles.small : ''
        }`}
      >
        <div className={`${styles.desc} observe text`}>
          <p>{renderText(strs?.desc0)}</p>
          <p>{renderText(strs?.desc1)}</p>
          <p>{renderText(strs?.desc2)}</p>
        </div>
        <RoundImage
          src="/images/about/me.jpg"
          alt="picutre of seungwan cho"
          size={250}
          className="observe"
        />
      </div>

      {/* Buttons below */}
      <div className={styles['button-wrapper']}>
        <button className={`${styles.btn} observe`} onClick={toResume}>
          <div className={styles['btn-outer-bg']} />
          <span className={styles['btn-name']}>
            {strs?.resume || 'Check Resume'}
          </span>
          <Arrows dir="right" />
        </button>
        <button
          className={`${styles.btn} ${showDetails ? styles.open : ''} observe`}
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className={styles['btn-outer-bg']} />
          <div className={styles['btn-inner-bg']} />
          {showBtnContent}
          {closeBtnContent}
        </button>
      </div>
      <Details show={showDetails} />
    </section>
  );
}

function Arrows({ dir }: { dir: string }) {
  let angle = dir === 'right' ? '-90deg' : dir === 'up' ? '180deg' : '';

  return (
    <div className={styles.arrows} style={{ transform: `rotate(${angle})` }}>
      <span className={styles['animate-target']}></span>
      <span className={styles['animate-target']}></span>
    </div>
  );
}
