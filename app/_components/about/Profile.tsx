'use client';

import useLangString from '@/app/_hooks/useLangString';
import useWindowWidth from '@/app/_hooks/useWindowWidth';
import { renderText } from '@/app/_utils/utils';
import Image from 'next/image';
import { useState } from 'react';
import gStyles from './AboutGlobal.module.scss';
import Details from './Details';
import NeuTitle from './NeuTitle';
import styles from './Profile.module.scss';

export default function Profile() {
  const strs = useLangString('about', 'profile');
  const [showDetails, setShowDetails] = useState(false);
  const windowWidth = useWindowWidth();
  const isSmall = windowWidth && windowWidth < 600;

  const showBtnContent = (
    <div>
      <span className={styles['btn-name']}>Show Details</span>
      <Arrows dir="down" />
    </div>
  );
  const closeBtnContent = (
    <div>
      <span className={styles['btn-name']}>Close Details</span>
      <Arrows dir="up" />
    </div>
  );

  if (!strs) return <></>;

  return (
    <section className={gStyles.section}>
      {/* Section Title */}
      <NeuTitle text="About me" />

      {/* Section Description */}
      <div
        className={` ${gStyles.content} ${styles.grid} ${
          isSmall ? styles.small : ''
        }`}
      >
        <div className={styles.desc}>
          <p>{renderText(strs.desc0)}</p>
          <p>{renderText(strs.desc1)}</p>
          <p>{renderText(strs.desc2)}</p>
        </div>
        <div className={gStyles['round-img']}>
          <Image
            src="/images/about/me.jpg"
            alt="picutre of seungwan cho"
            fill={true}
          />
        </div>
      </div>

      {/* Buttons below */}
      <div className={styles.buttons}>
        <button className={styles['animate-hover']}>
          <div>
            <span className={styles['btn-name']}>Go to Resume</span>
            <Arrows dir="right" />
          </div>
        </button>
        <button
          className={`${styles['animate-hover']} ${
            showDetails ? styles.open : ''
          }`}
          onClick={() => setShowDetails(!showDetails)}
        >
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
