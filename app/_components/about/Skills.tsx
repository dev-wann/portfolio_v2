'use client';

import useLangString from '@/app/_hooks/useLangString';
import useWindowWidth from '@/app/_hooks/useWindowWidth';
import { RootState } from '@/app/_redux';
import { THEME_ENUM } from '@/app/_redux/module/preferSlice';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import NeuTitle from '../common/NeuTitle';
import gStyles from './AboutGlobal.module.scss';
import styles from './Skills.module.scss';

export default function Skill() {
  // responsive
  const windowWidth = useWindowWidth();
  const size = windowWidth && windowWidth < 600 ? 'small' : 'big';
  const imgSize = size === 'small' ? 25 : 50;

  const strs = useLangString('about', 'skills');
  const theme = useSelector((state: RootState) => state.prefer.theme);

  // create jsx for each skill category
  function createSkillItems(category: { name: string; src: string }[]) {
    const invertNextjs = (name: string) => {
      if (theme !== THEME_ENUM.DARK || name !== 'Next.js') return {};
      return { filter: 'invert(100%)' };
    };
    return (
      <div className={styles.category}>
        {category.map((item) => (
          <div className={styles.skill} key={item.name}>
            <Image
              src={item.src}
              width={imgSize}
              height={imgSize}
              alt={`${item.name} logo`}
              style={invertNextjs(item.name)}
            />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    );
  }

  // logo images
  const frontend = [
    { name: 'React', src: '/images/about/react.svg' },
    { name: 'Next.js', src: '/images/about/next-js.svg' },
    { name: 'TypeScript', src: '/images/about/ts.svg' },
    { name: 'HTML', src: '/images/about/html.svg' },
    { name: 'SCSS', src: '/images/about/scss.svg' },
    { name: 'JavaScript', src: 'images/about/js.svg' },
  ];
  const state = [
    { name: 'MobX', src: '/images/about/mobx.svg' },
    { name: 'Redux', src: '/images/about/redux.svg' },
  ];
  const backend = [
    { name: 'Node.js', src: `/images/about/node-js-${theme}.svg` },
    { name: 'MySQL', src: '/images/about/mysql.svg' },
  ];
  const others = [
    { name: 'Electron', src: '/images/about/electron.svg' },
    { name: 'Jest', src: '/images/about/jest.svg' },
    { name: 'Git', src: '/images/about/git.svg' },
  ];

  return (
    <section className={gStyles.section}>
      <NeuTitle text="Skills" className="observe" />
      <div className={styles.grid}>
        <GlowOnHoverBox>
          <h2>{strs?.frontend || 'Front-end'}</h2>
          <p>{strs?.frontDesc0 || 'description'}</p>
          <p>{strs?.frontDesc1 || ''}</p>
          {createSkillItems(frontend)}
        </GlowOnHoverBox>
        <GlowOnHoverBox>
          <h3>{strs?.state || 'State Management'}</h3>
          <p>{strs?.stateDesc || 'description'}</p>
          {createSkillItems(state)}
        </GlowOnHoverBox>
        <GlowOnHoverBox>
          <h2>{strs?.backend || 'Back-end'}</h2>
          <p>{strs?.backDesc || 'description'}</p>
          {createSkillItems(backend)}
        </GlowOnHoverBox>
        <GlowOnHoverBox>
          <h2>{strs?.others || 'Others'}</h2>
          <p>{strs?.othersDesc || 'description'}</p>
          {createSkillItems(others)}
        </GlowOnHoverBox>
        <GlowOnHoverBox className={styles.placeholder}>
          <div>&lt;/&gt;</div>
        </GlowOnHoverBox>
      </div>
    </section>
  );
}

function GlowOnHoverBox({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // update cursor position
  const chaseCursor = (e: React.MouseEvent) => {
    const elem = e.currentTarget as HTMLElement;
    const { x, y } = elem.getBoundingClientRect();
    elem.style.setProperty('--x', `${e.clientX - x}px`);
    elem.style.setProperty('--y', `${e.clientY - y}px`);
  };

  // highlight hovered item & dehighlight others
  const addSelect = (e: React.MouseEvent) => {
    (e.currentTarget as HTMLElement).classList.add(styles.select);
  };
  const removeSelect = (e: React.MouseEvent) => {
    (e.currentTarget as HTMLElement).classList.remove(styles.select);
  };

  const computedClassName = `${styles['glow-box']} ${styles['grid-item']} ${className} observe`;

  return (
    <div
      className={computedClassName}
      onMouseMove={chaseCursor}
      onMouseEnter={addSelect}
      onMouseLeave={removeSelect}
    >
      {children}
    </div>
  );
}
