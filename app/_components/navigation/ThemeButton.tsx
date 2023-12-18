'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../_redux';
import preferSlice, { THEME_ENUM } from '../../_redux/module/preferSlice';
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
        <Image
          src="/images/navigation/sun.svg"
          width={20}
          height={20}
          alt="light theme icon"
        />{' '}
        <Image
          src="/images/navigation/moon.svg"
          width={20}
          height={20}
          alt="dark theme icon"
        />
      </div>
      <label className={styles['switch-label']} htmlFor="theme-toggle" />
    </div>
  );
}
