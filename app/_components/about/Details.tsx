import { RootState } from '@/app/_redux';
import { getDetailItems } from '@/app/_utils/detailsUtil';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import DetailItem from './DetailItem';
import styles from './Details.module.scss';

export default function Details({ show }: { show: boolean }) {
  const lang = useSelector((state: RootState) => state.prefer.lang);
  const items = useMemo(() => {
    if (!lang) return [];
    return getDetailItems(lang);
  }, [lang]);

  // render
  return (
    <div className={`${styles.detailsWrapper} ${show ? styles.show : ''}`}>
      <div className={styles.details + ' observe_0'}>
        {items.map((item) => (
          <DetailItem item={item} key={`${item.title}-${lang}`} />
        ))}
      </div>
    </div>
  );
}
