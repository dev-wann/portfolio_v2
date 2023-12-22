import Experience from '../_components/about/Experience';
import Profile from '../_components/about/Profile';
import Skills from '../_components/about/Skills';
import styles from './About.module.scss';

export default function About() {
  return (
    <main className={styles.wrapper}>
      <Profile />
      <Skills />
      <Experience />
    </main>
  );
}
