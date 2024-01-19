'use client';

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
    if (isClosing) return;
    const newLang = e.currentTarget.checked ? LANG_ENUM.KOR : LANG_ENUM.ENG;
    if (path === '/') {
      dispatch(changeLangDelayed({ newLang, time: 2100 }));
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
