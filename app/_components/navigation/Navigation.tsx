import useCustomRouteTo from '@/app/_hooks/useCustomRouteTo';
import { showNavSelect } from '@/app/_hooks/useIntersectionObserver';
import { routes } from '@/app/_utils';
import resStyle from '@/app/resume/resume.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import useWindowSize from '../../_hooks/useWindowSize';
import LangButton from './LangButton';
import styles from './Navigation.module.scss';
import ThemeButton from './ThemeButton';

type RouteToType = (path: string, e?: React.MouseEvent) => void;

export default function Navigation() {
  const pathname = usePathname();
  const routeTo = useCustomRouteTo();
  const navRef = useRef<HTMLDivElement | null>(null);

  // find selected page
  const selectIdx = routes.findIndex((elem) => elem[1] === pathname);
  const { windowWidth } = useWindowSize(); // returns null when page is not loaded
  const isSmall = windowWidth ? windowWidth < 600 : false;

  // first appearance effect
  const isLoaded = !!windowWidth;
  useEffect(() => {
    if (!navRef.current) return;
    navRef.current.classList.remove('observe', 'hide-box', 'hide-text');
  }, [isLoaded]);

  // show nav selection after page transition finished
  useEffect(showNavSelect, [pathname]);

  return (
    <>
      <nav className={styles['nav-wrapper']} id={resStyle.nav}>
        <div
          className={`${styles.navigation} container-800 observe hide-box hide-text`}
          ref={navRef}
        >
          <div className={styles['nav-bg'] + ' container-800'} />
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
          onClick={(e) => routeTo(path, e)}
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
  let name = usePathname().slice(1) || 'home';
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setOpen] = useState(false);

  // compute style for selected background (inset box)
  const selectedBg: React.CSSProperties = {
    marginTop: `${50 + 30 * selectIdx}px`,
    visibility: selectIdx < 0 ? 'hidden' : 'visible',
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
        <button className={styles['menu-toggle']} onClick={toggleMenu}>
          <input type="checkbox" ref={inputRef} />
          {/* divs to make hamburger shape */}
          <div className={styles.hamburger} />
          <div className={styles.hamburger} />
          <div className={styles.hamburger} />
          <span>MENU</span>
          {/* div for neumorphic background */}
          <div className={styles['menu-bg']}>
            <div className={styles.outset} />
            <div className={styles.inset} />
          </div>
        </button>
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
            onClick={(e) => {
              closeMenu();
              routeTo(path, e);
            }}
          >
            {name.toUpperCase()}
          </Link>
        ))}
      </div>

      {/* show page name when possible */}
      <p className={styles['small-title']}>
        {windowWidth && windowWidth < 400 ? <></> : name.toUpperCase()}
      </p>

      {/* back-cover to make contents dim */}
      <div
        className={`${styles['back-cover']} ${isOpen ? styles.open : ''}`}
        onClick={closeMenu}
        onMouseOver={(e) => e.stopPropagation()}
      />
    </>
  );
}
