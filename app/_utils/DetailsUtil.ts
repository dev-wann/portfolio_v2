import { LANG_ENUM, LangValueType } from '../_redux/module/preferSlice';

export type DetailItemType = {
  title: string;
  year: number;
  desc: string;
  mediaType: 'image' | 'video';
  media: HTMLImageElement | HTMLImageElement[];
  colors: { cur: string; next: string };
  position: 'left' | 'right';
};

const cache: Record<LangValueType, DetailItemType[] | null> = {
  [LANG_ENUM.ENG]: null,
  [LANG_ENUM.KOR]: null,
};

export async function getDetailItems(lang: LangValueType) {
  if (!lang) return [];
  if (!cache[lang]) cache[lang] = await loadDetailItems(lang);
  return cache[lang] as DetailItemType[];
}

async function loadDetailItems(lang: LangValueType) {
  const items: DetailItemType[] = [];
  for (let i = 0; i < data[lang].length; i++) {
    const item = data[lang][i];
    // const media = await createMedia(item.mediaSrc);
    const media = new Image();
    items.push({
      title: item.title,
      year: item.year,
      desc: item.desc,
      mediaType: item.mediaType,
      media,
      colors: item.colors,
      position: item.position,
    });
  }
  return items;
}

async function createMedia(src: string | readonly string[]) {
  let data: HTMLImageElement | HTMLImageElement[] = [];
  const promises = [];

  if (typeof src === 'string') {
    // load image
    promises.push(
      new Promise((resolve) => {
        data = document.createElement('img');
        data.src = src;
        data.addEventListener('load', () => resolve(''));
      })
    );
  } else {
    // load video
    data = [];
    src.map((s) => {
      promises.push(
        new Promise((resolve) => {
          const elem = document.createElement('img');
          elem.src = s;
          elem.addEventListener('load', () => resolve(''));
          (data as HTMLImageElement[]).push(elem);
        })
      );
    });
  }

  await Promise.all(promises);
  return data;
}

const bg = 'var(--color-bg)';
const orange = 'var(--color-primary-2)';
const green = 'var(--color-primary-1)';
const data = {
  [LANG_ENUM.ENG]: [
    {
      title: 'Born',
      year: 1994,
      desc: 'I was born in Seoul, South Korea, and lived in this beautiful city until I finish my MS degree.',
      mediaType: 'video',
      mediaSrc: new Array(240)
        .fill(undefined)
        .map(
          (_, i) =>
            `/images/about/detail-birth/${'0'.repeat(
              4 - String(i + 1).length
            )}${i + 1}.webp`
        ),
      colors: { cur: 'var(--color-bg)', next: 'var(--color-bg)' },
      position: 'right',
    },
    {
      title: 'Got into Yonsei University',
      year: 2013,
      desc: 'I majored electrical and electronic engineering',
      mediaType: 'image',
      mediaSrc: '/images/about/yonsei.jpg',
      colors: { cur: bg, next: orange },
      position: 'right',
    },
    {
      title: 'Start MS in EE',
      year: 2017,
      desc: 'MS degree, but found myself fascinated with making experimental setups and programs.',
      mediaType: 'image',
      mediaSrc: '',
      colors: { cur: orange, next: orange },
      position: 'right',
    },
    {
      title: 'Publish a paper',
      year: 2018,
      desc: 'wrote a paper and decided to code asdf sa ds dasf dsaf sda asd fsdaf sdaf asf asdf dsaf sad asf as fjdsfl asdl fasjf asl fjksaf lasd fsdlak fjaslf askf jaskljfas',
      mediaType: 'image',
      mediaSrc: '',
      colors: { cur: orange, next: orange },
      position: 'right',
    },
    {
      title: 'stop and change',
      year: 0,
      desc: '',
      mediaType: 'image',
      mediaSrc: '',
      colors: { cur: '', next: '' },
      position: 'right',
    },
    {
      title: 'Start career as developer',
      year: 2019,
      desc: 'got into tmax and made some stuffs sadfklasdjfl;asdfkjaslkfj',
      mediaType: 'image',
      mediaSrc: '',
      colors: { cur: green, next: green },
      position: 'left',
    },
    {
      title: 'Start web development',
      year: 2021,
      desc: 'got into tmax and made some stuffs sadfklasdjfl;asdfkjaslkfj',
      mediaType: 'image',
      mediaSrc: '',
      colors: { cur: green, next: green },
      position: 'left',
    },
    {
      title: 'end',
      year: 0,
      desc: '',
      mediaType: 'image',
      mediaSrc: '',
      colors: { cur: '', next: '' },
      position: 'left',
    },
  ],
  [LANG_ENUM.KOR]: [],
} as const;
