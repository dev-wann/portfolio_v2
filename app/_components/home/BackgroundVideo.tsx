'use client';

import { RootState } from '@/app/_redux';
import {
  drawFallbackImage,
  getVideoImages,
  playVideo,
  stopVideo,
} from '@/app/_utils/videoUtil';
import { StageType } from '@/app/page';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './BackgroundVideo.module.scss';

type Props = {
  stage: StageType;
  setStage: (state: StageType) => void;
  stopFlag: number;
};

export default function BackgroundVideo({ stage, setStage, stopFlag }: Props) {
  const theme = useSelector((state: RootState) => state.prefer.theme);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  // id to interrupt promise while playing video
  const stopId = useRef<string | null>(null);
  const stopRequest = useRef<string[]>([]);

  useEffect(() => {
    if (stopId.current) stopRequest.current.push(stopId.current);
    stopVideo();
  }, [stopFlag]);

  // play video in order
  useEffect(() => {
    if (theme === null || stage === 'idle' || stage === 'pending') return;

    // play video
    getVideoImages(theme)
      .then(async (res) => {
        if (!canvasRef.current) return;
        const newId = window.crypto.randomUUID();
        if (stage !== 'ready') {
          stopId.current = newId;
          await playVideo(canvasRef.current, res[stage]);
        }

        // stop by interruption
        const idx = stopRequest.current.indexOf(newId);
        if (idx !== -1) {
          stopRequest.current.splice(idx, 1);
          return;
        }

        // set next stage
        if (stage === 'ready') {
          setStage('opening');
        } else if (stage === 'opening') {
          setStage('main');
        } else if (stage === 'main') {
          setStage('pending');
        }
      })
      .catch((error) => {
        setError(`Error: ${error}`);
        if (canvasRef.current) drawFallbackImage(canvasRef.current, theme);
        setStage('pending');
      });
  }, [stage, setStage]);

  // render
  return (
    <div className={styles.wrapper}>
      <canvas width={2146} height={1080} ref={canvasRef} />
      {error ? <div className={styles.error}>{error}</div> : <></>}
    </div>
  );
}
