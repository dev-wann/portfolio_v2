'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../_redux';
import preferSlice, {
  THEME_ENUM,
  changeThemeDelayed,
} from '../../_redux/module/preferSlice';
import styles from './ThemeButton.module.scss';

export default function ThemeButton() {
  //redux
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.prefer.theme);
  const isClosing = useSelector(
    (state: RootState) => state.prefer.isHomeClosing
  );

  const themeRef = useRef<HTMLInputElement>(null);
  const path = usePathname();

  // initial theme setting
  useEffect(() => {
    let defaultTheme = localStorage.getItem('theme');
    if (!defaultTheme) {
      defaultTheme = window.matchMedia('(prefers-color-scheme: dark)')
        ? THEME_ENUM.DARK
        : THEME_ENUM.LIGHT;
    }
    dispatch(preferSlice.actions.changeTheme(defaultTheme));
  }, [dispatch]);

  //handle theme change
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isClosing) return;
    const newTheme = e.currentTarget.checked
      ? THEME_ENUM.DARK
      : THEME_ENUM.LIGHT;
    if (path === '/') {
      dispatch(changeThemeDelayed({ newTheme, time: 1600 }));
    } else {
      dispatch(preferSlice.actions.changeTheme(newTheme));
    }
  };

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
