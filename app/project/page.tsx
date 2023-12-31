'use client';

import { useEffect, useRef, useState } from 'react';
import ProjectItem from '../_components/project/ProjectItem';
import useLangString from '../_hooks/useLangString';
import styles from './Project.module.scss';

export type ItemType = {
  title: string;
  info?: string;
  org?: string;
  period?: string;
  descs: string[];
  skills: string[];
};

export default function Project() {
  // useIntersectionObserver();
  const strs = useLangString('project');
  const initRef = useRef<HTMLElement>(null);

  const [selected, setSelected] = useState(1);
  useEffect(() => {
    // show second item first
    if (initRef.current?.offsetTop) {
      scrollTo(0, initRef.current.offsetTop);
    }

    // observer for sidebar tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSelected(+entry.target.id.slice(-1));
          }
        });
      },
      { threshold: 0.7 }
    );
    const targets = new Array(items.length)
      .fill('')
      .map((_, idx) => document.querySelector(`#project${idx}`));
    targets.forEach((elem) => {
      if (elem) observer.observe(elem);
    });
  }, []);

  // items to render
  const items = [
    {
      title: 'Coming Soon..',
      info: '',
      org: strs?.personal,
      descs: strs ? [strs['CS-desc0'], strs['CS-desc1']] : [],
      skills: [],
    },
    {
      title: 'Portfolio Page',
      info: '',
      org: strs?.personal,
      period: '2023.12',
      descs: strs ? [] : [],
      skills: ['Next.js', 'TypeScript', 'SCSS', 'Redux'],
    },
    {
      title: 'SuperOffice',
      info: strs ? strs['SO-info'] : '',
      org: '@TmaxOffice',
      period: '2021.03 ~ 2023.05',
      descs: strs
        ? [
            strs['SO-desc0'],
            strs['SO-desc1'],
            strs['SO-desc2'],
            strs['SO-desc3'],
            strs['SO-desc4'],
            strs['SO-desc5'],
          ]
        : [],
      skills: ['React', 'TypeScript', 'MobX', 'Jest', 'GitLab'],
    },
    {
      title: 'ToOffice',
      info: strs ? strs['TO-info'] : '',
      org: '@TmaxA&C',
      period: '2019.08 ~ 2021.10',
      descs: strs
        ? [
            strs['TO-desc0'],
            strs['TO-desc1'],
            strs['TO-desc2'],
            strs['TO-desc3'],
            strs['TO-desc4'],
          ]
        : [],
      skills: ['C++', 'GitLab'],
    },
  ];

  // render
  return (
    <main className={styles.wrapper}>
      <Sidebar items={items} selected={selected} setSelected={setSelected} />
      {items.map((item, idx) => (
        <ProjectItem
          item={item}
          id={`project${idx}`}
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
    const item = document.querySelector(`#project${idx}`);
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
            className={idx === selected ? styles.selected : ''}
            onClick={() => {
              setSelected(idx);
              scrollToItem(idx);
            }}
          />
        ))}
      </div>
    </div>
  );
}
