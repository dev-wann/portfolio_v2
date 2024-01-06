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
    let size = '';
    if (windowWidth && windowWidth <= 810) size = styles.large;
    if (windowWidth && windowWidth <= 745) size = styles.medium;
    if (windowWidth && windowWidth < 600) size = styles.small;

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
        <NeuTitle text={String(item.title)} className="observe" />
        {/* project */}
        <div className="observe">
          <div className={`${styles.grid} ${size}`}>
            {/* representative image */}
            <div className={styles['image-outer']}>
              <div className={styles['image-inner']}>{images[0]}</div>
              <div className={styles['image-inner']}>{images[1]}</div>
            </div>
            {/* info about org and period */}
            <div className={styles.org}>
              <span>{item.org}</span>
              <span>{item.period}</span>
            </div>
            {/* info strings */}
            <div className={styles.info}>{renderText(item.info)}</div>
            <p className={styles.skills}>
              {item.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </p>
          </div>
        </div>

        {/* description */}
        <div className={styles.desc + ' observe'}>
          <h2>What was my role?</h2>
          <ul>
            {item.descs.map((desc, idx) => (
              <li key={idx}>{renderText(desc)}</li>
            ))}
          </ul>
          {/* For your information */}
          {item.fyi ? (
            <>
              <h3>FYI</h3>
              <ul>
                {item.fyi.map((fyi, idx) => (
                  <li key={idx}>{renderText(fyi)}</li>
                ))}
              </ul>
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
    );
  }
);

export default ProjectItem;

function ComingSoon({ descs }: { descs: string[] }) {
  return (
    <section className={styles.section} id={'project0'}>
      <NeuTitle text="Coming Soon.." className="observe" />
      <div className={styles['coming-soon'] + ' observe text'}>
        <div>
          <Image
            src="/images/project/UnderConstruction.png"
            width={736}
            height={736}
            alt="Coming Soon image"
          />
        </div>
        <p>{descs[0]}</p>
      </div>
    </section>
  );
}
