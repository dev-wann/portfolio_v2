'use client';

import useLangString from '@/app/_hooks/useLangString';
import useWindowWidth from '@/app/_hooks/useWindowWidth';
import { RootState } from '@/app/_redux';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import styles from './Links.module.scss';

export default function Links() {
  const theme = useSelector((state: RootState) => state.prefer.theme);
  const windowWidth = useWindowWidth();
  const strs = useLangString('contact', 'links');

  let mainSize = 90;
  if (windowWidth && windowWidth <= 700 && windowWidth >= 600) mainSize = 70;
  if (windowWidth && windowWidth < 600) mainSize = 90;
  if (windowWidth && windowWidth < 340) mainSize = 60;
  const subSize = 40;

  // functions to generate images
  const genMainImg = (name: string) => {
    return (
      <div className={`${styles.mainImg} ${theme ? styles[theme] : ''}`}>
        <Image
          src={`/images/contact/${name}.svg`}
          alt={`${name} icon`}
          width={mainSize}
          height={mainSize}
        />
      </div>
    );
  };
  const genSubImg = (name: string, type: string, handler: () => void) => {
    return (
      <div
        className={`${styles.subImg} ${theme ? styles[theme] : ''}`}
        onClick={handler}
      >
        <Image
          src={`/images/contact/${type}.svg`}
          alt={`${name} ${type} icon`}
          width={subSize}
          height={subSize}
        />
        {type === 'copy' ? <p id={`${name}-copy`}>Copied</p> : <></>}
      </div>
    );
  };

  // event listeners
  let timeoutId: NodeJS.Timeout;
  const copyEmail = () => {
    const elem = document.querySelector('#email-copy');
    if (!elem) return;
    navigator.clipboard.writeText('swcho8220@gmail.com');

    elem.classList.remove(styles.animate);
    clearTimeout(timeoutId);
    setTimeout(() => {
      elem.classList.add(styles.animate);
      timeoutId = setTimeout(
        () => elem?.classList.remove(styles.animate),
        1000
      );
    });
  };
  const toEmail = () => {
    window.open('mailto:swcho8220@gmail.com');
  };
  const toLinkedIn = () => {
    window.open(
      'https://www.linkedin.com/in/seung-wan-cho-bb9175212/',
      '_blank'
    );
  };
  const toGithub = () => {
    window.open('https://github.com/dev-wann/', '_blank');
  };
  const toBlog = () => {
    window.open('https://dev-wann.tistory.com/', '_blank');
  };
  const toInstagram = () => {
    window.open('https://www.instagram.com/cswann1222/', '_blank');
  };

  // render
  return (
    <div className={styles.wrapper}>
      {/* <h2 className="observe text">One of these ways</h2> */}
      <div className={styles.grid}>
        <div className={`${styles.item} observe`}>
          {genMainImg('email')}
          <p>{strs ? strs['email'] : 'Email'}</p>
          <div className={styles.hover}>
            {genSubImg('email', 'copy', copyEmail)}
            {genSubImg('email', 'link', toEmail)}
          </div>
        </div>
        <div className={`${styles.item} observe`}>
          {genMainImg('linked-in')}
          <p>{strs ? strs['linkedin'] : 'LinkedIn'}</p>
          <div className={styles.hover}>
            {genSubImg('linked-in', 'link', toLinkedIn)}
          </div>
        </div>
        <div className={`${styles.item} observe`}>
          {genMainImg('github')}
          <p>{strs ? strs['github'] : 'GitHub'}</p>
          <div className={styles.hover}>
            {genSubImg('github', 'link', toGithub)}
          </div>
        </div>
        <div className={`${styles.item} observe`}>
          {genMainImg('blog')}
          <p>{strs ? strs['blog'] : 'Blog'}</p>
          <div className={styles.hover}>
            {genSubImg('blog', 'link', toBlog)}
          </div>
        </div>{' '}
        <div className={`${styles.item} observe`}>
          {genMainImg('instagram')}
          <p>{strs ? strs['insta'] : 'IG'}</p>
          <div className={styles.hover}>
            {genSubImg('instagram', 'link', toInstagram)}
          </div>
        </div>
      </div>
    </div>
  );
}
