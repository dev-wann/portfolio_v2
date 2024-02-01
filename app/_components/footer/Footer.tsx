import useCustomRouteTo from '@/app/_hooks/useCustomRouteTo';
import useWindowSize from '@/app/_hooks/useWindowSize';
import { routes } from '@/app/_utils';
import resStyle from '@/app/resume/resume.module.scss';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.scss';

export default function Footer() {
  const { windowWidth } = useWindowSize();
  const size = windowWidth && windowWidth < 450 ? 'small' : '';

  // find prev/next page
  const path = usePathname();
  const curIdx = routes.findIndex((route) => route[1] === path);
  let prevIdx: number | null = null;
  let nextIdx: number | null = null;
  if (curIdx > 0) prevIdx = curIdx - 1;
  if (curIdx !== -1 && curIdx < routes.length - 1) nextIdx = curIdx + 1;

  // buttons to prev/next page
  const routesTo = useCustomRouteTo();
  const prevBtn =
    prevIdx === null ? (
      <div className={styles['btn-placeholder']} />
    ) : (
      <button
        className={styles.btn}
        onClick={() => routesTo(routes[prevIdx as number][1])}
      >
        &lt;&ensp;{routes[prevIdx][0].toUpperCase()}
      </button>
    );
  const nextBtn =
    nextIdx === null ? (
      <div className={styles['btn-placeholder']} />
    ) : (
      <button
        className={styles.btn}
        onClick={() => routesTo(routes[nextIdx as number][1])}
      >
        {routes[nextIdx][0].toUpperCase()}&ensp;&gt;
      </button>
    );

  // render
  return (
    <footer
      className="observe"
      style={path === '/' ? { visibility: 'hidden' } : undefined}
      id={resStyle.footer}
    >
      <div className={`${styles.footer} ${styles[size]}`}>
        {prevBtn}
        <span>Copyright © 2024 Seungwan Cho</span>
        {nextBtn}
      </div>
    </footer>
  );
}
