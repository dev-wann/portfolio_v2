'use client';

import useCustomRouteTo from '@/app/_hooks/useCustomRouteTo';
import useLangString from '@/app/_hooks/useLangString';
import useWindowSize from '@/app/_hooks/useWindowSize';
import { renderText } from '@/app/_utils';
import { useEffect, useRef, useState } from 'react';
import NeuTitle from '../common/NeuTitle';
import gStyles from './AboutGlobal.module.scss';
import styles from './Experience.module.scss';

export default function Experience() {
  const strs = useLangString('about', 'experience');
  const routeTo = useCustomRouteTo();

  // autoSelect is set by the scroll event when nothing's hovered
  const [select, setSelect] = useState(-1);
  const [autoSelect, setAutoSelect] = useState(-1);

  const { windowHeight } = useWindowSize();
  const item0Ref = useRef<HTMLDivElement>(null);

  // scroll event for autoselect
  useEffect(() => {
    // event handler
    const handleScroll = () => {
      if (!item0Ref.current) return;
      const top0 = item0Ref.current.getBoundingClientRect().top;

      let sel = -1;
      if (top0 < windowHeight * 0.7) sel = 0;
      if (top0 < windowHeight * 0.5) sel = 1;
      if (top0 < windowHeight * 0.3) sel = 2;
      if (top0 < windowHeight * 0.1) sel = -1;
      setAutoSelect(sel);
    };

    // event handler with throttle
    let timeoutId: NodeJS.Timeout | null = null;
    const handleScrollThrottle = () => {
      if (timeoutId) return;
      handleScroll();
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, 100);
    };

    // add event listeners
    handleScroll();
    window.addEventListener('scroll', handleScrollThrottle);
    window.addEventListener('scrollend', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScrollThrottle);
      window.removeEventListener('scrollend', handleScroll);
    };
  }, [windowHeight]);

  // choose select
  const selected = select >= 0 ? select : autoSelect;
  const selectClass = selected >= 0 ? styles[`select${selected}`] : '';

  // render
  return (
    <section className={gStyles.section}>
      <NeuTitle text="Experience" className="observe" />
      <div className={`${gStyles.content} ${styles.content}`} style={{ marginBottom: 0 }}>
        {/* slide */}
        <div className={`${styles.slide} observe`}>
          <div className={styles.bg} />
          <div className={`${styles.bar} ${selectClass}`} />
          <div className={styles.scale}>
            <span>—&ensp;&apos;25</span>
            <span>—&ensp;&apos;24</span>
            <span>—&ensp;&apos;23</span>
            <span>—&ensp;&apos;22</span>
            <span>—&ensp;&apos;21</span>
            <span>—&ensp;&apos;20</span>
            <span>—&ensp;&apos;19</span>
          </div>
        </div>

        <div className={styles.projects}>
          {/* job title */}
          <div
            className={`${styles.role} ${select === 0 ? styles.strong : ''} observe text`}
          >
            <h3>{strs?.['role-frontend'] || 'Front-end Engineer'}</h3>
            <p className={styles.company}>@Buzzvil</p>
          </div>

          {/* BuzzBooster */}
          <div
            className={`${styles.project} observe text`}
            onMouseEnter={() => setSelect(0)}
            onMouseLeave={() => setSelect(-1)}
            ref={item0Ref}
          >
            <h4>
              BuzzBooster {strs?.project || 'project'}
              <button
                className={styles['detail-btn']}
                onClick={(e) => routeTo('/project#buzzbooster', e)}
              >
                DETAIL &gt;
              </button>
            </h4>
            <p
              className={`${styles.period} ${
                selected === 0 ? selectClass : ''
              }`}
            >
              2024.06 ~ Present
            </p>
            <p className={styles['project-desc']}>
              {strs?.buzzbooster || 'description'}
            </p>
          </div>

          {/* job title */}
          <div
            className={`${styles.role} ${
              select > 0 ? styles.strong : ''
            } observe text`}
          >
            <h3>{strs?.['role-software'] || 'Software Engineer'}</h3>
            <p className={styles.company}>
              <span>@TmaxOffice, TmaxA&C </span>
              <span className={styles.help}>?</span>
              <span className={styles['help-desc']}>
                {strs ? renderText(strs.help) : 'Name changed by split-off'}
              </span>
            </p>
          </div>

          {/* item1 */}
          <div
            className={`${styles.project} observe text`}
            onMouseEnter={() => setSelect(1)}
            onMouseLeave={() => setSelect(-1)}
          >
            <h4>
              SuperOffice {strs?.project || 'project'}
              <button
                className={styles['detail-btn']}
                onClick={(e) => routeTo('/project#superoffice', e)}
              >
                DETAIL &gt;
              </button>
            </h4>
            <p
              className={`${styles.period} ${
                selected === 1 ? selectClass : ''
              }`}
            >
              2021.02 ~ 2023.05
            </p>
            <p className={styles['project-desc']}>
              {strs?.superoffice || 'description'}
            </p>
          </div>

          {/* item2 */}
          <div
            className={`${styles.project} observe text`}
            onMouseEnter={() => setSelect(2)}
            onMouseLeave={() => setSelect(-1)}
          >
            <h4>
              ToOffice {strs?.project || 'project'}
              <button
                className={styles['detail-btn']}
                onClick={(e) => routeTo('/project#tooffice', e)}
              >
                DETAIL &gt;
              </button>
            </h4>
            <p
              className={`${styles.period} ${
                selected === 2 ? selectClass : ''
              }`}
            >
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
