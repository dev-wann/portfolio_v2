'use client';

import { useSelector } from 'react-redux';
import { RootState } from './redux';
import strings from './strings.json';

export default function Home() {
  const lang = useSelector((state: RootState) => state.lang.data);
  if (!lang) return <></>;

  const str = strings[lang];

  return (
    <main>
      <p>{str[0]}</p>
      <p>{str[1]}</p>
    </main>
  );
}
