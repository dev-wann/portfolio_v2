'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BackgroundVideo from './_components/home/BackgroundVideo';
import ControlButton from './_components/home/ControlButton';
import Typing from './_components/home/Typing';
import { RootState } from './_redux';
import { VideoImageType } from './_utils/videoUtil';

export type StageType = keyof VideoImageType | 'idle' | 'ready' | 'pending';

export default function Home() {
  // stage order: idle -> ready -> opening -> main -> pending -> closing
  const [stage, setStage] = useState<StageType>('idle');
  const [stopFlag, setStopFlag] = useState(0);
  const setStop = () => {
    setStopFlag(stopFlag + 1);
  };

  // redux
  const theme = useSelector((state: RootState) => state.prefer.theme);
  const isClosing = useSelector(
    (state: RootState) => state.prefer.isHomeClosing
  );

  // resetart when theme changed
  useEffect(() => {
    if (theme) setStage('ready');
    return () => {
      setStop();
    };
  }, [theme]);

  // force closing stage
  useEffect(() => {
    if (!isClosing) return;
    setStop();
    setStage('closing');
  }, [isClosing]);

  return (
    <main>
      <BackgroundVideo stage={stage} setStage={setStage} stopFlag={stopFlag} />
      <Typing stage={stage} />
      <ControlButton stage={stage} setStage={setStage} setStop={setStop} />
    </main>
  );
}
