import Experience from '../_components/about/Experience';
import Profile from '../_components/about/Profile';
import Skill from '../_components/about/Skill';
import styles from './About.module.scss';

export default function About() {
  return (
    <main className={styles.wrapper}>
      <Profile />
      <Experience />
      <Skill />
    </main>
  );
}
