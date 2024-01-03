import useCustomRouter from '@/app/_hooks/useCustomRouter';
import { showNavSelect } from '@/app/_hooks/useIntersectionObserver';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import useWindowWidth from '../../_hooks/useWindowWidth';
import LangButton from './LangButton';
import styles from './Navigation.module.scss';
import ThemeButton from './ThemeButton';

type RouteToType = (e: React.MouseEvent, path: string) => void;

export default function Navigation() {
  // custom router
  const router = useCustomRouter();
  const routeTo = (e: React.MouseEvent, path: string) => {
    router.push(path);
    e.preventDefault();
  };

  // find selected page
  const pathname = usePathname();
  const selectIdx = routes.findIndex((elem) => elem[1] === pathname);

  const windowWidth = useWindowWidth(); // returns null when page is not loaded
  const isLoaded = windowWidth !== null;
  const isSmall = windowWidth ? windowWidth < 600 : false;

  useEffect(showNavSelect, [pathname]);

  return (
    <>
      <nav className={styles['nav-wrapper']}>
        <div className={`${styles.navigation} container-800`}>
          {isSmall ? (
            <RoutesSmall
              selectIdx={selectIdx}
              windowWidth={windowWidth}
              routeTo={routeTo}
            />
          ) : (
            <RoutesLarge selectIdx={selectIdx} routeTo={routeTo} />
          )}
          <ThemeButton />
          <LangButton />
        </div>
      </nav>
    </>
  );
}

// [pageName, pathname]
const routes = [
  ['home', '/'],
  ['about', '/about'],
  ['project', '/project'],
  ['contact', '/contact'],
];

function RoutesLarge({
  selectIdx,
  routeTo,
}: {
  selectIdx: number;
  routeTo: RouteToType;
}) {
  // compute style for selected background (inset box)
  const selectedBg: React.CSSProperties = {
    marginLeft: `${Math.max(100 * selectIdx, 0) / routes.length}%`,
    width: selectIdx < 0 ? 0 : `${100 / routes.length}%`,
  };

  return (
    <div className={styles['routes-large']}>
      <div
        className={styles['selected-bg-large']}
        style={selectedBg}
        id="nav-select"
      />
      {routes.map(([name, path], idx) => (
        <Link
          className={idx === selectIdx ? styles.selected : ''}
          href={path}
          key={name}
          onClick={(e) => routeTo(e, path)}
        >
          {name.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

function RoutesSmall({
  selectIdx,
  windowWidth,
  routeTo,
}: {
  selectIdx: number;
  windowWidth: number | null;
  routeTo: RouteToType;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setOpen] = useState(false);

  // compute style for selected background (inset box)
  const selectedBg: React.CSSProperties = {
    marginTop: `${50 + 30 * selectIdx}px`,
  };

  // open & close menu when menu button is clicked
  const toggleMenu = () => {
    if (!inputRef.current) return;
    const newVal = !inputRef.current.checked;
    inputRef.current.checked = newVal;
    setOpen(newVal);
    if (newVal) {
      document.body.classList.add('prevent-scroll');
    } else {
      document.body.classList.remove('prevent-scroll');
    }
  };

  // close menu when back-cover is clicked
  const closeMenu = () => {
    if (inputRef.current && inputRef.current.checked) {
      inputRef.current.checked = false;
      setOpen(false);
    }
    document.body.classList.remove('prevent-scroll');
  };

  // clear menu when screen gets bigger
  useEffect(() => {
    return closeMenu;
  }, []);

  return (
    <>
      <div className={styles['routes-small']}>
        <div className={styles['menu-toggle']} onClick={toggleMenu}>
          <input type="checkbox" ref={inputRef} />
          {/* divs to make hamburger shape */}
          <div className={styles.hamburger} />
          <div className={styles.hamburger} />
          <div className={styles.hamburger} />
          <span>MENU</span>
          {/* div for neumorphic background */}
          <div className={styles['menu-bg']} />
        </div>
      </div>
      {/* menu items */}
      <div className={`${styles['menu-items']} ${isOpen ? styles.open : ''}`}>
        <div
          className={styles['selected-bg-small']}
          style={selectedBg}
          id="nav-select"
        />
        {routes.map(([name, path], idx) => (
          <Link
            className={idx === selectIdx ? styles.selected : ''}
            href={path}
            key={name}
            onClick={(e) => routeTo(e, path)}
          >
            {name.toUpperCase()}
          </Link>
        ))}
      </div>

      {/* show page name when possible */}
      <div className={styles['small-title']}>
        {windowWidth && windowWidth < 400 ? (
          <></>
        ) : (
          routes[selectIdx][0].toUpperCase()
        )}
      </div>

      {/* back-cover to make contents dim */}
      <div
        className={`${styles['back-cover']} ${isOpen ? styles.open : ''}`}
        onClick={closeMenu}
        onMouseOver={(e) => e.stopPropagation()}
      />
    </>
  );
}
