'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import preferSlice, { THEME_ENUM } from '../redux/module/preferSlice';
import styles from './ThemeButton.module.scss';

export default function ThemeButton() {
  const themeRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.prefer.theme);

  // initial theme setting
  useEffect(() => {
    let defaultTheme = localStorage.getItem('theme');
    if (!defaultTheme) {
      defaultTheme = window.matchMedia('(prefers-color-scheme: dark)')
        ? THEME_ENUM.DARK
        : THEME_ENUM.LIGHT;
    }
    dispatch(preferSlice.actions.changeTheme(defaultTheme));
  }, []);

  //handle theme change
  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTheme = e.currentTarget.checked
        ? THEME_ENUM.DARK
        : THEME_ENUM.LIGHT;
      dispatch(preferSlice.actions.changeTheme(newTheme));
    },
    []
  );

  // set input checked state
  if (themeRef.current) {
    themeRef.current.checked = theme === THEME_ENUM.DARK;
  }

  return (
    <div className={styles.switch}>
      <input
        id="theme-toggle"
        className={styles['check-toggle']}
        type="checkbox"
        ref={themeRef}
        onChange={onChangeHandler}
      />
      <div className={styles.icons}>
        {sunIcon}
        {moonIcon}
      </div>
      <label className={styles['switch-label']} htmlFor="theme-toggle" />
    </div>
  );
}

const sunIcon = (
  <svg
    enableBackground="new 0 0 512 512"
    width="28px"
    height="28px"
    id="Layer_1"
    version="1.1"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g transform="scale(0.8)" transform-origin="50% 50%">
      <path
        d="M256,144c-61.75,0-112,50.25-112,112s50.25,112,112,112s112-50.25,112-112S317.75,144,256,144z M256,336    c-44.188,0-80-35.812-80-80c0-44.188,35.812-80,80-80c44.188,0,80,35.812,80,80C336,300.188,300.188,336,256,336z M256,112    c8.833,0,16-7.167,16-16V64c0-8.833-7.167-16-16-16s-16,7.167-16,16v32C240,104.833,247.167,112,256,112z M256,400    c-8.833,0-16,7.167-16,16v32c0,8.833,7.167,16,16,16s16-7.167,16-16v-32C272,407.167,264.833,400,256,400z M380.438,154.167    l22.625-22.625c6.25-6.25,6.25-16.375,0-22.625s-16.375-6.25-22.625,0l-22.625,22.625c-6.25,6.25-6.25,16.375,0,22.625    S374.188,160.417,380.438,154.167z M131.562,357.834l-22.625,22.625c-6.25,6.249-6.25,16.374,0,22.624s16.375,6.25,22.625,0    l22.625-22.624c6.25-6.271,6.25-16.376,0-22.625C147.938,351.583,137.812,351.562,131.562,357.834z M112,256    c0-8.833-7.167-16-16-16H64c-8.833,0-16,7.167-16,16s7.167,16,16,16h32C104.833,272,112,264.833,112,256z M448,240h-32    c-8.833,0-16,7.167-16,16s7.167,16,16,16h32c8.833,0,16-7.167,16-16S456.833,240,448,240z M131.541,154.167    c6.251,6.25,16.376,6.25,22.625,0c6.251-6.25,6.251-16.375,0-22.625l-22.625-22.625c-6.25-6.25-16.374-6.25-22.625,0    c-6.25,6.25-6.25,16.375,0,22.625L131.541,154.167z M380.459,357.812c-6.271-6.25-16.376-6.25-22.625,0    c-6.251,6.25-6.271,16.375,0,22.625l22.625,22.625c6.249,6.25,16.374,6.25,22.624,0s6.25-16.375,0-22.625L380.459,357.812z"
        fill="#1D1D1B"
      />
    </g>
  </svg>
);
const moonIcon = (
  <svg
    enable-background="new 0 0 512 512"
    width="28px"
    height="28px"
    id="Layer_1"
    version="1.1"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g transform="rotate(180)" transform-origin="50% 50%">
      <path
        d="M349.852,343.15c-49.875,49.916-131.083,49.916-181,0c-49.916-49.918-49.916-131.125,0-181.021  c13.209-13.187,29.312-23.25,47.832-29.812c5.834-2.042,12.293-0.562,16.625,3.792c4.376,4.375,5.855,10.833,3.793,16.625  c-12.542,35.375-4,73.666,22.25,99.917c26.209,26.228,64.5,34.75,99.916,22.25c5.792-2.062,12.271-0.582,16.625,3.793  c4.376,4.332,5.834,10.812,3.771,16.625C373.143,313.838,363.06,329.941,349.852,343.15z M191.477,184.754  c-37.438,37.438-37.438,98.354,0,135.771c40,40.021,108.125,36.416,143-8.168c-35.959,2.25-71.375-10.729-97.75-37.084  c-26.375-26.354-39.333-61.771-37.084-97.729C196.769,179.796,194.039,182.192,191.477,184.754z"
        fill="#e2e2e4"
      />
    </g>
  </svg>
);