'use client';

import useCustomRouteTo from '@/app/_hooks/useCustomRouteTo';
import { AppDispatch, RootState } from '@/app/_redux';
import { changeStageAndPlay } from '@/app/_redux/module/homeStageSlice';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ControlButton.module.scss';

type Props = {
  size: string;
};

export default function ControlButton({ size }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.prefer.theme);
  const stage = useSelector((state: RootState) => state.homeStage.stage);
  const routeTo = useCustomRouteTo();

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
  if (stage === 'idle' || stage === 'ready' || stage === 'closing') {
    className += ' hide-box hide-text';
  } else if (stage === 'opening') {
    className += ' ' + styles.opening;
  }

  // select between skip & replay button
  const skip = (e: React.MouseEvent) => {
    if (theme) dispatch(changeStageAndPlay({ stage: 'pending', theme }));
  };
  const replay = (e: React.MouseEvent) => {
    if (!theme) return;
    dispatch(changeStageAndPlay({ stage: 'closing', theme }));
    setTimeout(
      () => dispatch(changeStageAndPlay({ stage: 'opening', theme })),
      2000
    );
  };
  let handleClick = (e: React.MouseEvent) => {};
  if (stage === 'opening' || stage === 'main') handleClick = skip;
  else if (stage === 'pending') handleClick = replay;

  return (
    <div
      className={`${styles.wrapper} ${size === 'small' ? styles.small : ''}`}
    >
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
