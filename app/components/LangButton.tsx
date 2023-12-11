'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import langSlice, { LANG_ENUM } from '../redux/module/langSlice';
import styles from './LangButton.module.scss';

export default function LangButton() {
  const langRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.lang.data);

  useEffect(() => {
    // find language to apply at the first time
    let defaultLang = localStorage.getItem('lang');
    if (!defaultLang) defaultLang = navigator.language;
    if (!defaultLang) defaultLang = LANG_ENUM.ENG;

    // select language between english and korean
    if (!langRef.current) return;
    dispatch(langSlice.actions.changeLang(defaultLang));
  }, []);

  // handle language change
  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newLang = e.currentTarget.checked ? LANG_ENUM.KOR : LANG_ENUM.ENG;
      dispatch(langSlice.actions.changeLang(newLang));
    },
    []
  );

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
      <label
        className={styles['switch-label']}
        htmlFor="language-toggle"
      ></label>
      <span className={styles.on}>ENG</span>
      <span className={styles.off}>KOR</span>
    </div>
  );
}
