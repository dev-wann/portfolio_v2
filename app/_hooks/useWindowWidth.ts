import { useEffect, useState } from 'react';

export default function useWindowWidth() {
  // null means not loaded yet (== useEffect is not excuted)
  const [windowWidth, setWindowWidth] = useState<number>(
    window.visualViewport?.width || window.innerHeight
  );

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
