'use client';

import { useEffect, useState } from 'react';
import ProjectItem from '../_components/project/ProjectItem';
import styles from './Project.module.scss';

type Items = {
  idx: number;
}[];

export default function Project() {
  // useIntersectionObserver();
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    scrollTo(0, window.innerHeight / 2);
  }, []);

  const items = [{ idx: 1 }, { idx: 2 }, { idx: 3 }, { idx: 4 }];

  // render
  return (
    <main className={styles.wrapper}>
      <Sidebar items={items} selected={selected} setSelected={setSelected} />
      {items.map((item) => (
        <ProjectItem data={item} key={item.idx} />
      ))}
    </main>
  );
}

function Sidebar({
  items,
  selected,
  setSelected,
}: {
  items: Items;
  selected: number;
  setSelected: (input: number) => void;
}) {
  return (
    <div className={styles['sidebar-wrapper']}>
      <div className={styles.sidebar}>
        {items.map((_, idx) => (
          <button
            key={idx}
            className={idx === selected ? styles.selected : ''}
            onClick={() => setSelected(idx)}
          />
        ))}
      </div>
    </div>
  );
}
