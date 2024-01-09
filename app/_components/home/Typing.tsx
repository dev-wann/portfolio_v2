'use client';

import useLangString, { StrsType } from '@/app/_hooks/useLangString';
import { RootState } from '@/app/_redux';
import {
  LANG_ENUM,
  LangValueType,
  ThemeValueType,
} from '@/app/_redux/module/preferSlice';
import { renderText } from '@/app/_utils';
import {
  generateSequence,
  generateSpeed,
  hideCursor,
} from '@/app/_utils/sequenceGenerator';
import { StageType } from '@/app/page';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { TypeAnimation } from 'react-type-animation';
import styles from './Typing.module.scss';

type Props = {
  stage: StageType;
  size: string;
};

export default function Typing({ stage, size }: Props) {
  const prevRef = useRef<React.JSX.Element | null>(null);
  const theme = useSelector((state: RootState) => state.prefer.theme);
  const lang = useSelector((state: RootState) => state.prefer.lang);
  const strs = useLangString('home');

  if (!theme || !lang || !strs) return <></>;
  let content: React.JSX.Element = <></>;
  switch (stage) {
    case 'idle':
    case 'ready':
      content = <></>;
      break;
    case 'opening':
      content = Opening(theme, lang);
      break;
    case 'main':
      content = Main(theme, lang, strs);
      break;
    case 'closing':
      if (prevRef.current) {
        content = prevRef.current;
        break;
      }
    default: {
      // use pending stage as fallback
      content = Pending(lang, strs);
    }
  }

  let className = styles.wrapper;
  if (size === 'small') className += ' ' + styles.small;
  if (stage === 'closing') {
    className += ' hide-text';
  } else {
    prevRef.current = content;
  }

  return (
    <div className={className}>
      <div className={styles['wrap-placehold']}>
        <div className={styles.content}>{content}</div>
        <div className={styles.placeholder}>{Pending(lang, strs)}</div>
      </div>
    </div>
  );
}

// components for each sequence
function Opening(theme: ThemeValueType, lang: LangValueType) {
  return (
    <TypeAnimation
      sequence={generateSequence('opening', theme, lang)}
      wrapper="h1"
      speed={generateSpeed('opening', theme, lang)}
      className={styles['hide-cursor']}
    />
  );
}

function Main(theme: ThemeValueType, lang: LangValueType, strs: StrsType) {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <h1>{renderText(strs['hello'])}</h1>
        {lang === LANG_ENUM.ENG ? (
          <TypeAnimation
            sequence={[1000, "I'm", hideCursor]}
            speed={10}
            wrapper="h1"
          />
        ) : (
          <></>
        )}
      </div>
      <TypeAnimation
        sequence={generateSequence('main', theme, lang)}
        speed={generateSpeed('main', theme, lang)}
        deletionSpeed={60}
        wrapper="h2"
      />
    </>
  );
}

function Pending(lang: LangValueType, strs: StrsType) {
  const randNum = Math.floor(Math.random() * 3 + 1);
  const highlight = 'highlight-' + String(randNum);
  return (
    <>
      <h1>
        <span className={styles[highlight]}>{renderText(strs['hello'])}</span>
        {strs['iAm']}
      </h1>
      <h3 className={styles.expand}>{strs['webDev']}</h3>
      <h3 className={styles.expand}>{strs['softEng']}</h3>
      <h2>
        <span className={styles[highlight]}>{strs['swcho']}</span>
        {strs['ipnida']}
      </h2>
    </>
  );
}
