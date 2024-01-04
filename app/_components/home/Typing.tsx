'use client';

import useWindowWidth from '@/app/_hooks/useWindowWidth';
import { RootState } from '@/app/_redux';
import { ThemeValueType } from '@/app/_redux/module/preferSlice';
import { StageType } from '@/app/page';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { TypeAnimation } from 'react-type-animation';
import styles from './Typing.module.scss';

type Props = {
  stage: StageType;
};

export default function Typing({ stage }: Props) {
  const prevRef = useRef<React.JSX.Element | null>(null);
  const theme = useSelector((state: RootState) => state.prefer.theme);

  const windowWidth = useWindowWidth();
  let size = '';
  if (windowWidth && windowWidth < 510) size = styles.small;
  if (windowWidth && windowWidth < 355) size = styles.xsmall;

  let content: React.JSX.Element;
  switch (stage) {
    case 'idle':
    case 'ready':
      content = <></>;
      break;
    case 'opening':
      content = Opening(theme);
      break;
    case 'main':
      content = Main(theme);
      break;
    case 'closing':
      if (prevRef.current) {
        content = prevRef.current;
        break;
      }
    default: {
      // use pending stage as fallback
      content = <Pending />;
    }
  }

  let className = styles.wrapper + ' ' + size;
  if (stage === 'closing') {
    className += ' hide-text';
  } else {
    prevRef.current = content;
  }

  return <div className={className}>{content}</div>;
}

// components for each sequence
function Opening(theme: ThemeValueType | null) {
  let sequence;
  if (theme === 'dark') {
    sequence = [hideCursor, 4200, showCursor, 'Hello!  '];
  } else {
    sequence = [hideCursor, 3800, showCursor, 'Hello!  '];
  }
  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="h1"
      speed={{ type: 'keyStrokeDelayInMs', value: 150 }}
      className={styles['hide-cursor']}
    />
  );
}

function Main(theme: ThemeValueType | null) {
  let sequence, speed;
  if (theme === 'dark') {
    sequence = [
      hideCursor,
      1700,
      showCursor,
      'A Web Developer',
      1500,
      '',
      'A Software Engineer',
      1050,
      '',
      200,
      'Seungwan Cho',
    ];
    speed = 145;
  } else {
    sequence = [
      hideCursor,
      1350,
      showCursor,
      'A Web Developer',
      2000,
      '',
      200,
      'A Software Engineer',
      1600,
      '',
      200,
      'Seungwan Cho',
    ];
    speed = 148;
  }
  return (
    <>
      <div style={{ display: 'flex' }}>
        <h1>Hello!&ensp;</h1>
        <TypeAnimation
          sequence={[1000, "I'm", hideCursor]}
          speed={10}
          wrapper="h1"
        />
      </div>
      <TypeAnimation
        sequence={sequence}
        speed={{ type: 'keyStrokeDelayInMs', value: speed }}
        deletionSpeed={60}
        wrapper="h2"
      />
    </>
  );
}

function Pending() {
  const randNum = Math.floor(Math.random() * 3 + 1);
  const highlight = 'highlight-' + String(randNum);
  return (
    <>
      <h1>
        <span className={styles[highlight]}>Hello!&ensp;</span>
        <span>I'm</span>
      </h1>
      <h3 className={styles.expand}>A Web Developer</h3>
      <h3 className={styles.expand}>A Software Engineer</h3>
      <h2 className={styles[highlight]}>Seungwan Cho</h2>
    </>
  );
}

// show/hide typing cursor functions
function showCursor(elem: HTMLElement | null) {
  if (!elem) return;
  elem.classList.remove(styles['hide-cursor']);
}
function hideCursor(elem: HTMLElement | null) {
  if (!elem) return;
  elem.classList.add(styles['hide-cursor']);
}
