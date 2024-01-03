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
  const theme = useSelector((state: RootState) => state.prefer.theme);
  const isClosing = useSelector(
    (state: RootState) => state.prefer.isHomeClosing
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // stage order: ready -> opening -> main -> pending -> closing
  const [stage, setStage] = useState<
    keyof VideoImageType | 'ready' | 'pending'
  >('ready');

  // id to interrupt promise while playing video
  const stopId = useRef<string | null>(null);
  const stopRequest = useRef<string[]>([]);
  const stopPlaying = () => {
    if (stopId.current) stopRequest.current.push(stopId.current);
    stopVideo();
  };

  // resetart when theme changed
  useEffect(() => {
    if (theme) setStage('opening');
    return stopPlaying;
  }, [theme]);

  // force closing stage
  useEffect(() => {
    if (!isClosing) return;
    stopPlaying();
    setStage('closing');
  }, [isClosing]);

  // play video in order
  useEffect(() => {
    if (theme === null || stage === 'ready' || stage === 'pending') return;

    // play video
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
      if (stage === 'opening') {
        setStage('main');
      } else if (stage === 'main') {
        setStage('pending');
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
