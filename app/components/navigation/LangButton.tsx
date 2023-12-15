'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import preferSlice, { LANG_ENUM } from '../../redux/module/preferSlice';
import styles from './LangButton.module.scss';

export default function LangButton() {
  const langRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.prefer.lang);

  // initial language setting
  useEffect(() => {
    let defaultLang = localStorage.getItem('lang');
    if (!defaultLang) {
      defaultLang =
        navigator.language === LANG_ENUM.KOR ? LANG_ENUM.KOR : LANG_ENUM.ENG;
    }
    dispatch(preferSlice.actions.changeLang(defaultLang));
  }, []);

  // handle language change
  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newLang = e.currentTarget.checked ? LANG_ENUM.KOR : LANG_ENUM.ENG;
      dispatch(preferSlice.actions.changeLang(newLang));
    },
    []
  );

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
