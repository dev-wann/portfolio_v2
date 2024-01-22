import { AppDispatch } from '@/app/_redux';
import homeStageSlice from '@/app/_redux/module/homeStageSlice';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

export default function LowBatteryModeDetector() {
  const dispatch = useDispatch<AppDispatch>();
  const videoRef = useRef<HTMLVideoElement>(null);

  // detect and set low power mode
  useEffect(() => {
    videoRef.current?.play().catch((error) => {
      if (error.name === 'NotAllowedError') {
        dispatch(homeStageSlice.actions.setLowPowerMode(true));
      }
    });
    return () => {
      dispatch(homeStageSlice.actions.setLowPowerMode(false));
    };
  }, []);

  return (
    // dummy video to detect low power mode
    <video
      style={{ visibility: 'hidden' }}
      ref={videoRef}
      autoPlay
      muted
      playsInline
    />
  );
}
