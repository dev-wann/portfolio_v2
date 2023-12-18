import { useEffect, useState } from 'react';

export default function useWindowWidth() {
  // null means not loaded yet (== useEffect is not excuted)
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  function changeWindowSize() {
    setWindowWidth(window.innerWidth);
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
