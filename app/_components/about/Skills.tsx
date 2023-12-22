'use client';

import useWindowWidth from '@/app/_hooks/useWindowWidth';
import { RootState } from '@/app/_redux';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import gStyles from './AboutGlobal.module.scss';
import NeuTitle from './NeuTitle';
import styles from './Skills.module.scss';

export default function Skill() {
  // responsive
  const windowWidth = useWindowWidth();
  const size = windowWidth && windowWidth < 600 ? 'small' : 'big';
  const imgSize = size === 'small' ? 25 : 50;

  const theme = useSelector((state: RootState) => state.prefer.theme);

  // create jsx for each skill category
  function createSkillItems(category: { name: string; src: string }[]) {
    return (
      <div className={styles.category}>
        {category.map((item) => (
          <div className={styles.skill} key={item.name}>
            <Image
              src={item.src}
              width={imgSize}
              height={imgSize}
              alt={`${item.name} logo`}
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
    { name: 'SCSS', src: '/images/about/scss.svg' },
    { name: 'HTML', src: '/images/about/html.svg' },
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
    <div className={gStyles.section}>
      <NeuTitle text="Skills" />
      <div className={styles.grid}>
        <GlowOnHoverBox className={styles['grid-item']}>
          <p>Front-end</p>
          <p>description</p>
          {createSkillItems(frontend)}
        </GlowOnHoverBox>
        <GlowOnHoverBox className={styles['grid-item']}>
          <p>State Management</p>
          <p>description</p>
          {createSkillItems(state)}
        </GlowOnHoverBox>
        <GlowOnHoverBox className={styles['grid-item']}>
          <p>Back-end</p>
          <p>description</p>
          {createSkillItems(backend)}
        </GlowOnHoverBox>
        <GlowOnHoverBox className={styles['grid-item']}>
          <p>Others</p>
          <p>description</p>
          {createSkillItems(others)}
        </GlowOnHoverBox>
        <GlowOnHoverBox
          className={`${styles['grid-item']} ${styles.placeholder}`}
        >
          <div>&lt;/&gt;</div>
        </GlowOnHoverBox>
      </div>
    </div>
  );
}

function GlowOnHoverBox({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
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

  return (
    <div
      className={`${styles['glow-box']} ${className}`}
      onMouseMove={chaseCursor}
      onMouseEnter={addSelect}
      onMouseLeave={removeSelect}
    >
      {children}
    </div>
  );
}