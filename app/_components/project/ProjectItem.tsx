'use client';

import useWindowWidth from '@/app/_hooks/useWindowWidth';
import { renderText } from '@/app/_utils';
import { ItemType } from '@/app/project/page';
import Image from 'next/image';
import { ForwardedRef, forwardRef } from 'react';
import NeuTitle from '../common/NeuTitle';
import styles from './ProjectItem.module.scss';

type Props = {
  item: ItemType;
  id: string;
};

const ProjectItem = forwardRef(
  ({ item, id }: Props, ref: ForwardedRef<HTMLElement>) => {
    const windowWidth = useWindowWidth();
    const isSmall = windowWidth && windowWidth < 600;

    // handle 'Coming Soon' part seperately
    if (item.title === 'Coming Soon..') {
      return <ComingSoon descs={item.descs} />;
    }

    const name = item.title
      .split('')
      .filter((val) => val !== ' ' && val !== '.')
      .join('');
    const images = [
      <Image
        src={`/images/project/${name}0.jpg`}
        width={320}
        height={180}
        alt={`image of ${item.title}`}
      />,
      <Image
        src={`/images/project/${name}1.jpg`}
        width={320}
        height={180}
        alt={`image of ${item.title}`}
      />,
    ];

    return (
      <section className={styles.section} ref={ref} id={id}>
        <NeuTitle text={String(item.title)} />
        <div className={`${styles.flex} ${isSmall ? styles.small : ''}`}>
          {/* representative image */}
          <div className={styles['image-outer']}>
            <div className={styles['image-inner']}>{images[0]}</div>
            <div className={styles['image-inner']}>{images[1]}</div>
          </div>
          {/* project info */}
          <div className={styles.info}>
            <div>
              <span>{item.org}</span>
              <span>{item.period}</span>
            </div>
            <div>{renderText(item.info)}</div>
            <p className={styles.skills}>
              {item.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </p>
          </div>
        </div>
        {/* description */}
        <div className={styles.desc}>
          <h2>What I did?</h2>
          <ul>
            {item.descs.map((desc, idx) => (
              <li key={idx}>{renderText(desc)}</li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
);

export default ProjectItem;

function ComingSoon({ descs }: { descs: string[] }) {
  return (
    <section style={{ marginTop: '5rem' }} id={'project0'}>
      <NeuTitle text="Coming Soon.." />
      <div className={styles['coming-soon']}>
        <div>
          <Image
            src="/images/project/ComingSoon.jpeg"
            width={500}
            height={500}
            alt="Coming Soon image"
            style={{
              objectFit: 'cover',
              filter: 'grayscale(1) brightness(109%)',
            }}
          />
        </div>
        <p>{descs[0]}</p>
      </div>
    </section>
  );
}
