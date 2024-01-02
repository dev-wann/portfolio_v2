import { THEME_ENUM } from '../_redux/module/preferSlice';

export type VideoImagesType = {
  opening: HTMLImageElement[];
  main: HTMLImageElement[];
  closing: HTMLImageElement[];
};

// cache
const cache: Record<string, VideoImagesType> = {};

// get video image data
export async function getVideoImages(theme: keyof typeof THEME_ENUM) {
  if (!cache[theme]) {
    await fetchVideoImages(theme).then((res) => {
      cache[theme] = res;
    });
  }
  return cache[theme];
}

// play video
export function playVideo(
  canvas: HTMLCanvasElement,
  images: HTMLImageElement[]
) {
  return new Promise((resolve) => {
    const context = canvas.getContext('2d');
    let idx = 0;
    const play = () => {
      if (idx === images.length) {
        resolve('');
        return;
      }
      context?.drawImage(images[idx], 0, 0);
      idx++;
      requestAnimationFrame(play);
    };
    play();
  });
}

async function fetchVideoImages(theme: keyof typeof THEME_ENUM) {
  const images: VideoImagesType = { opening: [], main: [], closing: [] };
  const promises: Promise<string>[] = [];

  // functions
  const load = (idx: number, type: keyof VideoImagesType) => {
    const promise = new Promise<string>((resolve) => {
      const img = new Image();
      img.src = pathMaker(idx, type);
      img.addEventListener('load', () => resolve(''));
      images[type].push(img);
    });
    promises.push(promise);
  };
  const pathMaker = (idx: number, type: keyof VideoImagesType) => {
    let name = String(idx);
    name = '0'.repeat(4 - name.length) + name;
    return `/images/home/typing-${type}-${theme}/${name}.webp`;
  };

  // load data
  if (theme === THEME_ENUM.DARK) {
    for (let i = 0; i <= 340; i++) load(i, 'opening');
    for (let i = 341; i <= 1121; i++) load(i, 'main');
    for (let i = 1140; i <= 1300; i++) load(i, 'closing');
  } else {
    for (let i = 40; i <= 340; i++) load(i, 'opening');
    for (let i = 341; i <= 1171; i++) load(i, 'main');
    for (let i = 1172; i <= 1312; i++) load(i, 'closing');
  }

  await Promise.all(promises);
  return images;
}
