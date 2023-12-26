'use client';

import { Education } from '../_components/about/Education';
import Experience from '../_components/about/Experience';
import Profile from '../_components/about/Profile';
import Skills from '../_components/about/Skills';
import useIntersectionObserver from '../_hooks/useIntersectionObserver';
import styles from './About.module.scss';

export default function About() {
  useIntersectionObserver();

  return (
    <main className={styles.wrapper}>
      <Profile />
      <Skills />
      <Experience />
      <Education />
    </main>
  );
}
