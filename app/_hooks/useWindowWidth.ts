import { useEffect, useState } from 'react';

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState<number>(360);

  function changeWindowSize() {
    let width = window.visualViewport?.width || window.innerHeight;
    setWindowWidth(width);
  }

  useEffect(() => {
    changeWindowSize();
    window.addEventListener('resize', changeWindowSize);
    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  }, []);

  return windowWidth;
}
