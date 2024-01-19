'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BackgroundVideo from './_components/home/BackgroundVideo';
import ControlButton from './_components/home/ControlButton';
import Typing from './_components/home/Typing';
import useWindowSize from './_hooks/useWindowSize';
import { RootState } from './_redux';
import { VideoDataType } from './_utils/videoUtil';

export type StageType = keyof VideoDataType | 'idle' | 'ready' | 'pending';

export default function Home() {
  // stage order: idle -> ready -> opening -> main -> pending -> closing
  const [stage, setStage] = useState<StageType>('idle');
  const [stopFlag, setStopFlag] = useState(0);
  const setStop = () => {
    setStopFlag(stopFlag + 1);
  };

  // redux
  const theme = useSelector((state: RootState) => state.prefer.theme);
  const lang = useSelector((state: RootState) => state.prefer.lang);
  const isClosing = useSelector(
    (state: RootState) => state.prefer.isHomeClosing
  );

  // window size
  const { windowWidth, windowHeight } = useWindowSize();
  let size = '';
  if (windowWidth && windowHeight) {
    if (windowHeight >= windowWidth) size = 'small';
    if (windowWidth <= 510) size = 'small';
  }

  // resetart when theme/lang changed
  useEffect(() => {
    if (theme && lang) {
      setStop();
      setStage('ready');
    }
    return () => {
      setStop();
    };
  }, [theme, lang]);

  // force closing stage
  useEffect(() => {
    if (!isClosing) return;
    setStop();
    setStage('closing');
  }, [isClosing]);

  return (
    <main>
      <BackgroundVideo stage={stage} setStage={setStage} stopFlag={stopFlag} />
      <Typing stage={stage} size={size} />
      <ControlButton
        stage={stage}
        setStage={setStage}
        setStop={setStop}
        size={size}
      />
    </main>
  );
}
