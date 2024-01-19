'use client';

import { AppDispatch, RootState } from '@/app/_redux';
import homeStageSlice from '@/app/_redux/module/homeStageSlice';
import { getCurrentVideo } from '@/app/_utils/stageUtil';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './BackgroundVideo.module.scss';

export default function BackgroundVideo() {
  const dispatch = useDispatch<AppDispatch>();
  const stage = useSelector((state: RootState) => state.homeStage.stage);
  const videoType = useSelector(
    (state: RootState) => state.homeStage.videoType
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  // show/hide canvas according to the stage
  let canvasClassname = '';
  switch (stage) {
    case 'opening':
      canvasClassname = styles.opening;
      break;
    case 'closing':
      canvasClassname = styles.closing;
      break;
    case 'idle':
    case 'ready':
      canvasClassname = styles.hide;
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

  // render
  return (
    <div className={styles.wrapper}>
      <canvas
        className={canvasClassname}
        width={2146}
        height={1080}
        ref={canvasRef}
      />
    </div>
  );
}
