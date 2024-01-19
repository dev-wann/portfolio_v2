'use client';

import {
  changeStageAndPlay,
  changeStageTo,
} from '@/app/_redux/module/homeStageSlice';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../_redux';
import preferSlice, {
  LANG_ENUM,
  changeLangDelayed,
} from '../../_redux/module/preferSlice';
import styles from './LangButton.module.scss';

export default function LangButton() {
  // redux
  const dispatch = useDispatch<AppDispatch>();
  const lang = useSelector((state: RootState) => state.prefer.lang);
  const theme = useSelector((state: RootState) => state.prefer.theme);
  const isClosing = useSelector(
    (state: RootState) => state.prefer.isHomeClosing
  );

  const langRef = useRef<HTMLInputElement>(null);
  const path = usePathname();

  // initial language setting
  useEffect(() => {
    let defaultLang = localStorage.getItem('lang');
    if (!defaultLang) {
      defaultLang =
        navigator.language === LANG_ENUM.KOR ? LANG_ENUM.KOR : LANG_ENUM.ENG;
    }
    dispatch(preferSlice.actions.changeLang(defaultLang));
  }, [dispatch]);

  // handle language change
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ignore duplicated requests
    if (isClosing) return;

    // new lang to apply
    const newLang = e.currentTarget.checked ? LANG_ENUM.KOR : LANG_ENUM.ENG;

    if (path === '/') {
      // in case of home, wait until closing sequence ends, and then start ready sequence
      if (theme) dispatch(changeStageAndPlay({ stage: 'closing', theme }));
      dispatch(changeLangDelayed({ newLang, time: 2100 })).then(() => {
        if (theme) dispatch(changeStageTo({ stage: 'ready', theme }));
      });
    } else {
      dispatch(preferSlice.actions.changeLang(newLang));
    }
  };
  // set input checked state
  if (langRef.current) {
    langRef.current.checked = lang === LANG_ENUM.KOR;
  }

  return (
    <div className={`${styles.switch} ${!lang ? styles.hidden : ''}`}>
      <input
        id="language-toggle"
        className={styles['check-toggle']}
        type="checkbox"
        ref={langRef}
        onChange={onChangeHandler}
      />
      <label className={styles['switch-label']} htmlFor="language-toggle" />
      <span className={styles.on}>ENG</span>
      <span className={styles.off}>KOR</span>
    </div>
  );
}
