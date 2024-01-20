'use client';

import { useEffect } from 'react';
import NeuTitle from '../_components/common/NeuTitle';
import DirectMessage from '../_components/contact/DirectMessage';
import Links from '../_components/contact/Links';
import useIntersectionObserver from '../_hooks/useIntersectionObserver';
import useWindowSize from '../_hooks/useWindowSize';
import styles from './Contact.module.scss';

export default function Contact() {
  useIntersectionObserver();
  const { windowWidth } = useWindowSize();
  const isSmall = !!(windowWidth && windowWidth < 600);

  useEffect(() => window.scrollTo(0, 0), []); // for mobile

  return (
    <div className={`${styles.wrapper} container-800`}>
      <NeuTitle text="Get in touch by.." className="observe" />
      <div className={`${styles.grid} ${isSmall ? styles.small : ''}`}>
        <Links />
        <Dividor isSmall={isSmall} />
        <DirectMessage />
      </div>
    </div>
  );
}

function Dividor({ isSmall }: { isSmall: boolean }) {
  return (
    <div className={`${styles['divide-wrapper']} observe`}>
      <div className={`${styles.divide} ${isSmall ? styles.small : ''}`}>
        <div />
        <span>or</span>
        <div />
      </div>
    </div>
  );
}
