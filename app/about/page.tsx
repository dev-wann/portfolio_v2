'use client';

import { Education } from '../_components/about/Education';
import Experience from '../_components/about/Experience';
import Profile from '../_components/about/Profile';
import Skills from '../_components/about/Skills';
import useIntersectionObserver from '../_hooks/useIntersectionObserver';

export default function About() {
  useIntersectionObserver();

  return (
    <main>
      <Profile />
      <Skills />
      <Experience />
      <Education />
    </main>
  );
}
