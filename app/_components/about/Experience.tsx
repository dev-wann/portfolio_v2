'use client';

import useCustomRouteTo from '@/app/_hooks/useCustomRouter';
import useLangString from '@/app/_hooks/useLangString';
import { renderText } from '@/app/_utils';
import { useState } from 'react';
import NeuTitle from '../common/NeuTitle';
import gStyles from './AboutGlobal.module.scss';
import styles from './Experience.module.scss';

export default function Experience() {
  const strs = useLangString('about', 'experience');
  const routeTo = useCustomRouteTo();

  const [select0, setSelect0] = useState(false);
  const [select1, setSelect1] = useState(false);
  const select = select0 ? styles.select0 : select1 ? styles.select1 : '';

  return (
    <section className={gStyles.section}>
      <NeuTitle text="Experience" className="observe" />
      <div className={gStyles.content} style={{ marginBottom: 0 }}>
        <div className="observe text">
          <div className={styles.role}>
            <h2>{strs?.role || 'Software Engineer'}&ensp;&nbsp;</h2>
            <h3 className={styles.company}>
              <span>@TmaxOffice, TmaxA&C </span>
              <span className={styles.help}>?</span>
              <span className={styles['help-desc']}>
                {strs ? renderText(strs.help) : 'Name changed by split-off'}
              </span>
            </h3>
          </div>
        </div>
        <div className={styles.grid}>
          <div className={`${styles.slide} observe`}>
            <div className={styles.bg} />
            <div className={`${styles.toggle} ${select}`} />
            <div className={styles.scale}>
              <span>—&ensp;'24</span>
              <span>—&ensp;'23</span>
              <span>—&ensp;'22</span>
              <span>—&ensp;'21</span>
              <span>—&ensp;'20</span>
              <span>—&ensp;'19</span>
            </div>
          </div>
          <div
            className={`${styles.project} observe text`}
            onMouseEnter={() => setSelect0(true)}
            onMouseLeave={() => setSelect0(false)}
          >
            <h3>
              SuperOffice {strs?.project || 'project'}
              <button
                className={styles['detail-btn']}
                onClick={(e) => routeTo('/project#project2', e)}
              >
                DETAIL &gt;
              </button>
            </h3>
            <p className={`${styles.period} ${select0 ? styles.select0 : ''}`}>
              2021.02 ~ 2023.05
            </p>
            <p className={styles['project-desc']}>
              {strs?.superoffice || 'description'}
            </p>
          </div>
          <div
            className={`${styles.project} observe text`}
            onMouseEnter={() => setSelect1(true)}
            onMouseLeave={() => setSelect1(false)}
          >
            <h3>
              ToOffice {strs?.project || 'project'}
              <button
                className={styles['detail-btn']}
                onClick={(e) => routeTo('/project#project3', e)}
              >
                DETAIL &gt;
              </button>
            </h3>
            <p className={`${styles.period} ${select1 ? styles.select1 : ''}`}>
              2019.08 ~ 2021.10
            </p>
            <p className={styles['project-desc']}>
              {strs?.tooffice || 'description'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
