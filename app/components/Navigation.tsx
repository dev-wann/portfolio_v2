import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LangButton from './LangButton';
import styles from './Navigation.module.scss';

const routes = [
  ['home', '/'],
  ['about', '/about'],
  ['project', '/project'],
  ['contact', '/contact'],
];

export default function Navigation() {
  const pathname = usePathname();
  const selected = routes.findIndex((elem) => elem[1] === pathname);

  const selectedBg: React.CSSProperties = {
    marginLeft: `${(100 * selected) / routes.length}%`,
    width: `${100 / routes.length}%`,
  };

  return (
    <nav className={`container-720 ${styles['nav-wrapper']}`}>
      <div className={styles.navigation}>
        <div className={styles.routes}>
          <div className={styles['selected-bg']} style={selectedBg} />

          {routes.map(([name, path], idx) => (
            <Link
              className={idx === selected ? styles.selected : ''}
              href={path}
            >
              {name.toUpperCase()}
            </Link>
          ))}
        </div>
        <LangButton />
      </div>
    </nav>
  );
}
