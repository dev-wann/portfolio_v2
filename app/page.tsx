'use client';

import useLangString from './_hooks/useLangString';

export default function Home() {
  const strs = useLangString('home');
  if (!strs) return <></>;

  return (
    <main className="container-720">
      <p>{strs['greet-0']}</p>
      <p>{strs['greet-1']}</p>
      <p>{strs['greet-2']}</p>
    </main>
  );
}
