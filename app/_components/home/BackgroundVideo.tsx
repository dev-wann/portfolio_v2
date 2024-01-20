'use client';

import { AppDispatch, RootState } from '@/app/_redux';
import homeStageSlice from '@/app/_redux/module/homeStageSlice';
import { LANG_ENUM } from '@/app/_redux/module/preferSlice';
import { getCurrentVideo } from '@/app/_utils/stageUtil';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../loading/Loading';
import styles from './BackgroundVideo.module.scss';

export default function BackgroundVideo() {
  const dispatch = useDispatch<AppDispatch>();
  const stage = useSelector((state: RootState) => state.homeStage.stage);
  const videoType = useSelector(
    (state: RootState) => state.homeStage.videoType
  );
  const isLowPowerMode = useSelector(
    (state: RootState) => state.homeStage.isLowPowerMode
  );
  const theme = useSelector((state: RootState) => state.prefer.theme);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  // show/hide canvas according to the stage
  let stageClassname = '';
  switch (stage) {
    case 'opening':
      stageClassname = styles.opening;
      break;
    case 'closing':
      stageClassname = styles.closing;
      break;
    case 'idle':
    case 'ready':
      stageClassname = styles.hide;
      break;
    default:
      break;
  }
  stage === 'opening'
    ? styles.opening
    : stage === 'closing'
    ? styles.closing
    : '';

  // draw video to canvas
  useEffect(() => {
    if (!videoType || !canvasRef.current) return;

    const video = getCurrentVideo();
    if (!video) return;

    // play video
    const setFinished = () =>
      dispatch(homeStageSlice.actions.setStageFinished(true));
    video.addEventListener('ended', setFinished);
    video.play();

    // draw 30fps
    const context = canvasRef.current.getContext('2d');
    const intervalId = setInterval(
      () => context?.drawImage(video, 0, 0),
      1000 / 30
    );

    // cleanup
    return () => {
      video.removeEventListener('ended', setFinished);
      clearInterval(intervalId);
    };
  }, [videoType]);

  // strings for low-power mode fallback
  const lang = useSelector((state: RootState) => state.prefer.lang);
  const lowPowerStr =
    lang === LANG_ENUM.KOR
      ? '저전력 모드를 끄고 새로고침 해주세요'
      : 'Please turn off low battery mode and refresh';

  // render
  return (
    <div className={styles.wrapper}>
      {!isLowPowerMode ? (
        // canvas to draw video
        <canvas
          className={stageClassname}
          width={2146}
          height={1080}
          ref={canvasRef}
        />
      ) : (
        // fallback UI for low power mode
        <>
          <div className={`${styles['fallback-img']} ${stageClassname}`}>
            <Image
              src={`/images/home/typing-fallback-${theme}.webp`}
              width={2146}
              height={1080}
              alt="fallback image"
            />
          </div>
          <div className={`${styles['fallback-msg']} ${stageClassname}`}>
            {lowPowerStr}
          </div>
        </>
      )}
      <Loading isLoading={stage === 'idle' || stage === 'ready'} />
    </div>
  );
}
