import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LangButton from './LangButton';
import styles from './Navigation.module.scss';
import ThemeButton from './ThemeButton';

export default function Navigation() {
  return (
    <nav className={`container-720 ${styles['nav-wrapper']}`}>
      <div className={styles.navigation}>
        <Routes />
        <ThemeButton />
        <LangButton />
      </div>
    </nav>
  );
}

const routes = [
  ['home', '/'],
  ['about', '/about'],
  ['project', '/project'],
  ['contact', '/contact'],
];

function Routes() {
  const pathname = usePathname();
  const selected = routes.findIndex((elem) => elem[1] === pathname);

  const selectedBg: React.CSSProperties = {
    marginLeft: `${(100 * selected) / routes.length}%`,
    width: `${100 / routes.length}%`,
  };

  return (
    <div className={styles.routes}>
      <div className={styles['selected-bg']} style={selectedBg} />

      {routes.map(([name, path], idx) => (
        <Link
          className={idx === selected ? styles.selected : ''}
          href={path}
          key={name}
        >
          {name.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
