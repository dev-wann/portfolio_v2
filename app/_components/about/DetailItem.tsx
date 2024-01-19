import useWindowSize from '@/app/_hooks/useWindowSize';
import { renderText } from '@/app/_utils';
import { DetailItemType } from '@/app/_utils/detailsUtil';
import styles from './DetailItem.module.scss';
import DetailItemEnd from './DetailItemEnd';
import StopAndChange from './StopAndChange';

type Props = {
  item: DetailItemType;
};

export default function DetailItem({ item }: Props) {
  const { windowWidth } = useWindowSize();
  const size = windowWidth && windowWidth < 600 ? styles.small : '';

  // exception for special items
  if (item.title === 'stop and change') return <StopAndChange />;
  if (item.title === 'end') return <DetailItemEnd isSmall={size !== ''} />;

  const img = size === styles.small && item.imgSmall ? item.imgSmall : item.img;
  const lineGradient = `linear-gradient(to bottom, ${item.colors.cur} 20%, ${item.colors.next} 100%)`;

  return (
    <div className={`${styles.grid} ${styles[item.position]} ${size}`}>
      <p className={styles.year} style={{ background: item.colors.cur }}>
        {item.year}
      </p>
      <p className={styles.title}>{item.title}</p>
      <div className={styles.content}>
        <div className={styles.desc}>{renderText(item.desc)}</div>
        <div className={styles.media}>{img}</div>
      </div>
      <div className={styles.line} style={{ background: lineGradient }} />
    </div>
  );
}
