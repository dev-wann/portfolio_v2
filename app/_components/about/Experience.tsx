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

  // select0/select1 is set when item0/item1 is hovered
  // autoSelect is set by the scroll event when nothing's hovered
  const [select0, setSelect0] = useState(false);
  const [select1, setSelect1] = useState(false);
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
      if (top0 < windowHeight * 0.3) sel = -1;
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
  let select = '';
  if (select0) select = styles.select0;
  else if (select1) select = styles.select1;
  else if (autoSelect !== -1) select = styles[`select${autoSelect}`];

  // render
  return (
    <section className={gStyles.section}>
      <NeuTitle text="Experience" className="observe" />
      <div className={gStyles.content} style={{ marginBottom: 0 }}>
        {/* title */}
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
          {/* slide */}
          <div className={`${styles.slide} observe`}>
            <div className={styles.bg} />
            <div className={`${styles.toggle} ${select}`} />
            <div className={styles.scale}>
              <span>—&ensp;&apos;24</span>
              <span>—&ensp;&apos;23</span>
              <span>—&ensp;&apos;22</span>
              <span>—&ensp;&apos;21</span>
              <span>—&ensp;&apos;20</span>
              <span>—&ensp;&apos;19</span>
            </div>
          </div>

          {/* item0 */}
          <div
            className={`${styles.project} observe text`}
            onMouseEnter={() => setSelect0(true)}
            onMouseLeave={() => setSelect0(false)}
            ref={item0Ref}
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
            <p
              className={`${styles.period} ${
                select === styles.select0 ? styles.select0 : ''
              }`}
            >
              2021.02 ~ 2023.05
            </p>
            <p className={styles['project-desc']}>
              {strs?.superoffice || 'description'}
            </p>
          </div>

          {/* item1 */}
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
            <p
              className={`${styles.period} ${
                select === styles.select1 ? styles.select1 : ''
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
