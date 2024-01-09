import { useEffect, useState } from 'react';

export default function useWindowSize() {
  const [windowWidth, setWindowWidth] = useState<number>(1080);
  const [windowHeight, setWindowHeight] = useState<number>(720);

  function changeWindowSize() {
    const width = window.visualViewport?.width || window.innerWidth;
    const height = window.visualViewport?.height || window.innerHeight;
    setWindowWidth(width);
    setWindowHeight(height);
  }

  useEffect(() => {
    changeWindowSize();
    window.addEventListener('resize', changeWindowSize);
    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  }, []);

  return { windowWidth, windowHeight };
}
