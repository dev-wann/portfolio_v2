'use client';

import { RootState } from '@/app/_redux';
import {
  VideoImagesType,
  getVideoImages,
  playVideo,
} from '@/app/_utils/videoUtil';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './BackgroundVideo.module.scss';

type Props = {};

export default function BackgroundVideo({}: Props) {
  const [stage, setStage] = useState<keyof VideoImagesType>('opening');
  const theme = useSelector((state: RootState) => state.prefer.theme);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!theme) return;
    getVideoImages(theme).then(async (res) => {
      if (!canvasRef.current) return;
      await playVideo(canvasRef.current, res[stage]);
      switch (stage) {
        case 'opening':
          setStage('main');
          break;
        case 'main':
          setStage('closing');
          break;
        default:
          break;
      }
    });
  }, [theme, stage]);

  return (
    <div className={styles.wrapper}>
      <canvas width={960} height={540} ref={canvasRef} />
    </div>
  );
}
