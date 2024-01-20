import strings from '@/public/strings.json';
import Image from 'next/image';
import { LANG_ENUM, LangValueType } from '../_redux/module/preferSlice';

export type DetailItemType = {
  title: string;
  year: number;
  desc: string;
  img: React.JSX.Element | null;
  imgSmall?: React.JSX.Element | null;
  colors: { cur: string; next: string };
  position: 'left' | 'right';
};

const cache: Record<LangValueType, DetailItemType[] | null> = {
  [LANG_ENUM.ENG]: null,
  [LANG_ENUM.KOR]: null,
};

export function getDetailItems(lang: LangValueType) {
  if (!lang) return [];
  if (!cache[lang]) cache[lang] = loadDetailItems(lang);
  return cache[lang] as DetailItemType[];
}

function loadDetailItems(lang: LangValueType) {
  const items: DetailItemType[] = [];
  const strs = strings[lang].about.details;

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    if (item.id === 'stop and change' || item.id === 'end') {
      // exceptioin for special items
      items.push({
        title: item.id,
        year: 0,
        desc: '',
        img: null,
        colors: item.colors,
        position: item.position,
      });
    } else {
      // normal items
      const img = (
        <Image src={item.imgSrc} width={960} height={560} alt="item image" />
      );
      const imgSmall = item.imgSrcSmall ? (
        <Image
          src={item.imgSrcSmall}
          width={960}
          height={560}
          alt="item image"
        />
      ) : null;
      items.push({
        title: strs[`${item.id}-title`],
        year: item.year,
        desc: strs[`${item.id}-desc`],
        img,
        imgSmall,
        colors: item.colors,
        position: item.position,
      });
    }
  }
  return items;
}

const bg = 'var(--color-bg)';
const orange = 'var(--color-primary-2)';
const green = 'var(--color-primary-1)';
const data = [
  {
    id: 'birth',
    year: 1994,
    imgSrc: '/images/about/detail-birth.jpg',
    imgSrcSmall: '',
    colors: { cur: 'var(--color-bg)', next: 'var(--color-bg)' },
    position: 'right',
  },
  {
    id: 'bachelor',
    year: 2013,
    imgSrc: '/images/about/detail-bachelor.jpg',
    imgSrcSmall: '',
    colors: { cur: bg, next: orange },
    position: 'right',
  },
  {
    id: 'master',
    year: 2017,
    imgSrc: '/images/about/detail-master.jpg',
    imgSrcSmall: '',
    colors: { cur: orange, next: orange },
    position: 'right',
  },
  {
    id: 'paper',
    year: 2018,
    imgSrc: '/images/about/detail-paper.jpg',
    imgSrcSmall: '/images/about/detail-paper-small.jpg',
    colors: { cur: orange, next: orange },
    position: 'right',
  },
  {
    id: 'stop and change',
    year: 0,
    imgSrc: '',
    imgSrcSmall: '',
    colors: { cur: '', next: '' },
    position: 'right',
  },
  {
    id: 'tmaxanc',
    year: 2019,
    imgSrc: '/images/about/detail-tmaxanc.jpg',
    imgSrcSmall: '',
    colors: { cur: green, next: green },
    position: 'left',
  },
  {
    id: 'tmaxoffice',
    year: 2021,
    imgSrc: '/images/about/detail-tmaxoffice.jpg',
    imgSrcSmall: '',
    colors: { cur: green, next: green },
    position: 'left',
  },
  {
    id: 'end',
    year: 0,
    desc: '',
    imgSrc: '',
    imgSrcSmall: '',
    colors: { cur: '', next: '' },
    position: 'left',
  },
] as const;
