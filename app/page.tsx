'use client';

import { useSelector } from 'react-redux';
import { RootState } from './_redux';
import strings from './strings.json';

export default function Home() {
  const lang = useSelector((state: RootState) => state.prefer.lang);
  if (!lang) return <></>;

  const strs = strings[lang];

  return (
    <main className="container-720">
      <p>{strs['greet-0']}</p>
      <p>{strs['greet-1']}</p>
      <p>{strs['greet-2']}</p>
    </main>
  );
}
