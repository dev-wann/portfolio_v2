'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackgroundVideo from './_components/home/BackgroundVideo';
import ControlButton from './_components/home/ControlButton';
import Typing from './_components/home/Typing';
import useWindowSize from './_hooks/useWindowSize';
import { AppDispatch, RootState } from './_redux';
import {
  changeStageAndPlay,
  changeStageTo,
} from './_redux/module/homeStageSlice';
import { StageList } from './_utils/stageUtil';

export default function Home() {
  // redux
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.prefer.theme);
  const curStage = useSelector((state: RootState) => state.homeStage.stage);
  const isFinished = useSelector(
    (state: RootState) => state.homeStage.isStageFinished
  );

  // starter for the first page load
  useEffect(() => {
    if (!theme) return;
    if (curStage === 'idle') dispatch(changeStageTo({ stage: 'ready', theme }));
  }, [theme]);

  // stage control
  useEffect(() => {
    if (!theme || !isFinished) return;

    let nextStage = StageList[StageList.indexOf(curStage) + 1];
    switch (curStage) {
      case 'ready':
      case 'opening':
      case 'main':
        dispatch(changeStageAndPlay({ stage: nextStage, theme }));
        break;
      default:
        break;
    }
  }, [isFinished]);

  // window size
  const { windowWidth, windowHeight } = useWindowSize();
  let size = '';
  if (windowWidth && windowHeight) {
    if (windowHeight >= windowWidth) size = 'small';
    if (windowWidth <= 510) size = 'small';
  }

  return (
    <main>
      <BackgroundVideo />
      <Typing size={size} />
      <ControlButton size={size} />
    </main>
  );
}
