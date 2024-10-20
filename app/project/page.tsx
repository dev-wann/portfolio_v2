'use client';

import { useEffect, useRef, useState } from 'react';
import ProjectItem from '../_components/project/ProjectItem';
import useIntersectionObserver from '../_hooks/useIntersectionObserver';
import useLangString from '../_hooks/useLangString';
import { generateProjectItems } from '../_utils/projectItemUtil';
import styles from './Project.module.scss';

export type ItemType = {
  id: string;
  title: string;
  info: string;
  org: string;
  period: string;
  descs: string[];
  skills: string[];
  fyi?: string[];
};

export default function Project() {
  useIntersectionObserver();
  const initRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(1);

  // items to render
  const strs = useLangString('project');
  const items = generateProjectItems(strs);

  useEffect(() => {
    // show second item first
    const scrollTarget = initRef.current?.offsetTop;
    if (window.location.hash === '' && scrollTarget) {
      setTimeout(() => scrollTo(0, scrollTarget));
    }

    // observer for sidebar tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = items.findIndex((item) => item.id === entry.target.id);
            setSelected(idx);
          }
        });
      },
      { threshold: 0.7 }
    );
    const targets = new Array(items.length)
      .fill('')
      .map((_, idx) => document.querySelector(`#${items[idx].id}`));
    targets.forEach((elem) => {
      if (elem) observer.observe(elem);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  // render
  return (
    <main className={styles.wrapper}>
      <Sidebar items={items} selected={selected} setSelected={setSelected} />
      {items.map((item, idx) => (
        <ProjectItem
          item={item}
          id={item.id}
          key={item.title}
          ref={idx === 1 ? initRef : undefined}
        />
      ))}
    </main>
  );
}

function Sidebar({
  items,
  selected,
  setSelected,
}: {
  items: ItemType[];
  selected: number;
  setSelected: (input: number) => void;
}) {
  const scrollToItem = (idx: number) => {
    const item = document.querySelector(`#${items[idx].id}`);
    if (item instanceof HTMLElement) {
      scrollTo({ top: item.offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles['sidebar-wrapper']}>
      <div className={styles.sidebar}>
        {items.map((_, idx) => (
          <button
            key={idx}
            className={(idx === selected ? styles.selected : '') + ' observe'}
            onClick={() => scrollToItem(idx)}
          />
        ))}
      </div>
    </div>
  );
}
