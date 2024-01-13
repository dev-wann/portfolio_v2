import { RootState } from '@/app/_redux';
import { DetailItemType, getDetailItems } from '@/app/_utils/DetailsUtil';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DetailItem from './DetailItem';
import styles from './Details.module.scss';

export default function Details({ show }: { show: boolean }) {
  const [items, setItems] = useState<DetailItemType[]>([]);
  const lang = useSelector((state: RootState) => state.prefer.lang);

  useEffect(() => {
    if (!lang) return;
    getDetailItems(lang).then((res) => setItems(res));
  }, [lang]);

  // render
  return (
    <div className={`${styles.detailsWrapper} ${show ? styles.show : ''}`}>
      <div className={styles.details}>
        {items.map((item) => (
          <DetailItem item={item} key={item.title} />
        ))}
      </div>
    </div>
  );
}
