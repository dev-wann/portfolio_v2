'use client';

import useLangString from '@/app/_hooks/useLangString';
import { renderText } from '@/app/_utils/utils';
import Image from 'next/image';
import { useState } from 'react';
import gStyles from './AboutGlobal.module.scss';
import Details from './Details';
import styles from './Profile.module.scss';

export default function Profile() {
  const strs = useLangString('about');
  const [showDetails, setShowDetails] = useState(false);

  const showStr = (
    <>
      <p>
        <span>Show Details</span>
        <Arrows dir="down" />
      </p>
    </>
  );
  const closeStr = (
    <>
      <p>
        <span>Close Details</span>
        <Arrows dir="up" />
      </p>
    </>
  );

  if (!strs) return <></>;

  return (
    <div className={gStyles.card}>
      <div className={styles.grid}>
        <h1>About me</h1>
        <div className={styles.img}>
          <Image
            src="/images/about/me.jpg"
            alt="picutre of seungwan cho"
            fill={true}
          />
        </div>
        <div className={styles.desc}>
          <p>{renderText(strs.desc0)}</p>
          <p>{renderText(strs.desc1)}</p>
          <p>{renderText(strs.desc2)}</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles['animate-hover']}>
          <p>
            <span>Go to Resume</span>
            <Arrows dir="right" />
          </p>
        </button>
        <button
          className={`${styles['animate-hover']} ${
            showDetails ? styles.open : ''
          }`}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showStr}
          {closeStr}
        </button>
      </div>
      <Details show={showDetails} />
    </div>
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
