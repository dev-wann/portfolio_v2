'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import useLangString from '../_hooks/useLangString';
import { RootState } from '../_redux';
import { LANG_ENUM } from '../_redux/module/preferSlice';
import { renderText } from '../_utils';
import styles from './resume.module.scss';

export default function Resume() {
  const strs = useLangString('resume');
  const lang = useSelector((state: RootState) => state.prefer.lang);
  const langClassname = lang === LANG_ENUM.ENG ? styles.eng : '';

  // buttons
  const downloadBtn = <button>Download</button>;
  const printBtn = (
    <button
      className={styles['print-btn']}
      onClick={() => {
        window?.print();
      }}
    >
      <Image
        src="/images/about/print.svg"
        width={50}
        height={50}
        alt="print button"
      />
    </button>
  );

  // link to portfolio
  const link = (
    <Link
      href={'https://portfolio-dev-wann.vercel.app/'}
      target="_blank"
      prefetch={false}
    >
      <Image
        src="/images/contact/link.svg"
        width={23}
        height={23}
        alt="link to portfolio page"
        style={{ marginBottom: '-3px' }}
      />
    </Link>
  );

  // render
  return (
    <div className={`${styles['page-wrapper']} ${langClassname}`}>
      <div className={styles.page}>
        {/* buttons */}
        {printBtn}

        {/* header of the first page */}
        <div className={styles.header}>
          <h2>{strs?.header0}</h2>
          <h1>{strs?.header1}</h1>
        </div>
        <div className={styles.intro}>
          <div className={styles.about}>
            <p className={styles['intro-title']}>About</p>
            <p>{renderText(strs?.aboutDesc)}</p>
          </div>
          <div className={styles.interest}>
            <p className={styles['intro-title']}>Interest</p>
            <p>{renderText(strs?.interestDesc)}</p>
          </div>
          <div className={styles.contact}>
            <p className={styles['intro-title']}>Contact</p>
            <p>{renderText(strs?.contactDesc)}</p>
          </div>
        </div>

        <div className={styles.content}>
          {/* work experience */}
          <div className={styles.work}>
            <p className={styles.title}>Work Experience</p>
            <div className={styles['work-item']}>
              <p className={styles.subtitle}>{strs?.role}&ensp;@TmaxOffice</p>
              <p className={styles.period}>2020.08 ~ 2023.06</p>
              <div className={styles.desc}>{renderText(strs?.officeDesc)}</div>
              <ul className={styles.list}>
                <li>{strs?.officeList0}</li>
                <li>{strs?.officeList1}</li>
                <li>{strs?.officeList2}</li>
                <li>{strs?.officeList3}</li>
                <li>{strs?.officeList4}</li>
              </ul>
            </div>
            <div className={styles['work-item']}>
              <p className={styles.subtitle}>{strs?.role}&ensp;@TmaxA&C</p>
              <p className={styles.period}>2019.08 ~ 2020.08</p>
              <div className={styles.desc}>{renderText(strs?.ancDesc)}</div>
              <ul className={styles.list}>
                <li>{strs?.ancList0}</li>
                <li>{strs?.ancList1}</li>
                <li>{strs?.ancList2}</li>
                <li>{strs?.ancList3}</li>
              </ul>
            </div>
          </div>

          {/* other experience */}
          <div className={styles.other}>
            <p className={styles.title}>Other Experience</p>
            <p className={styles.subtitle}>
              {strs?.portfolio} {link}
            </p>
            <p className={styles.period}>2023.12 ~ 2024.01</p>
            <p className={styles.desc}>{renderText(strs?.portfolioDesc)}</p>
          </div>

          {/* skills */}
          <div className={styles.skills}>
            <p className={styles.title}>Skills</p>
            <p className={styles.skillCat}>Framework & library</p>
            <p className={styles.skillList}>React, Next.js, MobX, Redux</p>
            <p className={styles.skillCat}>Language</p>
            <p className={styles.skillList}>
              TypeScript, SCSS, HTML, JavaScript, CSS, C++
            </p>
            <p className={styles.skillCat}>Others</p>
            <p className={styles.skillList}>Jest, Electron, Git</p>
          </div>

          {/* education */}
          <div className={styles.edu}>
            <p className={styles.title}>Education</p>
            <p className={styles.degree}>{strs?.ms}</p>
            <p className={styles.yonsei}>{strs?.yonsei}</p>
            <p className={styles.period}>2017.03 ~ 2019.08</p>
            <p className={styles.degree}>{strs?.bs}</p>
            <p className={styles.yonsei}>{strs?.yonsei}</p>
            <p className={styles.period}>2013.03 ~ 2017.02</p>
          </div>
        </div>
      </div>
      <p className={styles.footnote}>{strs?.footnote}</p>
    </div>
  );
}
