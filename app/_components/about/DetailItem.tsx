import { DetailItemType } from '@/app/_utils/DetailsUtil';
import { useEffect, useRef } from 'react';
import styles from './DetailItem.module.scss';
import DetailItemEnd from './DetailItemEnd';
import StopAndChange from './StopAndChange';

type Props = {
  item: DetailItemType;
};

export default function DetailItem({ item }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // exception for special items
  if (item.title === 'stop and change') return <StopAndChange />;
  if (item.title === 'end') return <DetailItemEnd />;

  // draw initial media to canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    if (item.mediaType === 'image' && item.media instanceof HTMLImageElement) {
      context?.drawImage(item.media, 0, 0);
    } else if (item.mediaType === 'video' && Array.isArray(item.media)) {
      context?.drawImage(item.media[0], 0, 0);
    }
  }, []);

  const linearGradient = `linear-gradient(to bottom, ${item.colors.cur} 20%, ${item.colors.next} 100%)`;

  return (
    <div className={`${styles.grid} ${styles[item.position]}`}>
      <p className={styles.year} style={{ background: item.colors.cur }}>
        {item.year}
      </p>
      <p className={styles.title}>{item.title}</p>
      <p className={styles.desc}>{item.desc}</p>
      <canvas
        className={styles.media}
        width={960}
        height={540}
        ref={canvasRef}
      />
      <div className={styles.line} style={{ background: linearGradient }} />
    </div>
  );
}
