'use client';

import { RootState } from '@/app/_redux';
import {
  VideoImageType,
  getVideoImages,
  playVideo,
  stopVideo,
} from '@/app/_utils/videoUtil';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './BackgroundVideo.module.scss';

type Props = {};

export default function BackgroundVideo({}: Props) {
  const [stage, setStage] = useState<keyof VideoImageType | 'ready' | 'finish'>(
    'finish'
  );
  const theme = useSelector((state: RootState) => state.prefer.theme);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // id to interrupt video playing promise
  const stopId = useRef<string | null>(null);
  const stopRequest = useRef<string[]>([]);

  // resetart when theme changed
  useEffect(() => {
    stopVideo();
    if (stopId.current) stopRequest.current.push(stopId.current);
    if (theme) setStage('ready');
  }, [theme]);

  // play closing before path or theme changes
  useEffect(() => {
    //TODO
  });

  // play video in order
  useEffect(() => {
    if (theme === null || stage === 'finish') return;
    if (stage === 'ready') {
      setStage('opening');
      return;
    }
    getVideoImages(theme).then(async (res) => {
      if (!canvasRef.current) return;
      const newId = window.crypto.randomUUID();
      stopId.current = newId;
      await playVideo(canvasRef.current, res[stage]);

      // stop by interruption
      const idx = stopRequest.current.indexOf(newId);
      if (idx !== -1) {
        stopRequest.current.splice(idx, 1);
        return;
      }

      // set next stage
      switch (stage) {
        case 'opening':
          setStage('main');
          break;
        case 'main':
          setStage('closing');
          break;
        case 'closing':
          setStage('finish');
        default:
          break;
      }
    });
  }, [stage]);

  // render
  return (
    <div className={styles.wrapper}>
      <canvas width={1920} height={1080} ref={canvasRef} />
    </div>
  );
}
