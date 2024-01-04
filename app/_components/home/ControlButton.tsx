'use client';

import useCustomRouteTo from '@/app/_hooks/useCustomRouter';
import useWindowWidth from '@/app/_hooks/useWindowWidth';
import { RootState } from '@/app/_redux';
import { StageType } from '@/app/page';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import styles from './ControlButton.module.scss';

type Props = {
  stage: StageType;
  setStage: (state: StageType) => void;
  setStop: () => void;
};

export default function ControlButton({ stage, setStage, setStop }: Props) {
  const routeTo = useCustomRouteTo();
  const theme = useSelector((state: RootState) => state.prefer.theme);

  const windowWidth = useWindowWidth();
  let size = '';
  if (windowWidth && windowWidth <= 700) size = styles.medium;
  if (windowWidth && windowWidth < 510) size = styles.small;
  if (windowWidth && windowWidth < 355) size = styles.xsmall;

  // icons
  const skipIcon = (
    <Image
      src="/images/home/skip.svg"
      alt="skip icon"
      fill
      style={{ objectFit: 'contain' }}
    />
  );
  const replayIcon = (
    <Image
      src="/images/home/replay.svg"
      alt="replay icon"
      fill
      style={{ objectFit: 'contain', paddingLeft: '3%' }}
    />
  );
  const nextIcon = (
    <Image
      src="/images/home/next.svg"
      alt="next page icon"
      fill
      style={{ objectFit: 'contain' }}
    />
  );

  let icon = skipIcon;
  let iconName = 'SKIP ';
  if (stage === 'closing' || stage === 'pending') {
    icon = replayIcon;
    iconName = 'REPLAY';
  }

  // button shape control
  let className = `${styles.btn} ${theme ? styles[theme] : ''}`;
  switch (stage) {
    case 'idle':
    case 'ready':
    case 'closing':
      className += ' hide-box hide-text';
      break;
    default:
      break;
  }

  // event handlers
  const skip = (e: React.MouseEvent) => {
    setStage('pending');
    setStop();
  };
  const replay = (e: React.MouseEvent) => {
    setStage('closing');
    setTimeout(() => {
      setStage('opening');
    }, 1600);
  };
  let handleClick = (e: React.MouseEvent) => {};
  if (stage === 'opening' || stage === 'main') handleClick = skip;
  else if (stage === 'pending') handleClick = handleClick = replay;

  return (
    <div className={`${styles.wrapper} ${size}`}>
      <button className={className} onClick={handleClick}>
        <div className={styles.icon}>{icon}</div>
        <span>{iconName}</span>
      </button>
      <button className={className} onClick={(e) => routeTo('/about', e)}>
        <div className={styles.icon}>{nextIcon}</div>
        <span>ABOUT ME</span>
      </button>
    </div>
  );
}
