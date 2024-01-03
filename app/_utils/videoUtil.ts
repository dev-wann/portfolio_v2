import { THEME_ENUM, ThemeValueType } from '../_redux/module/preferSlice';

export type VideoImageType = {
  opening: HTMLImageElement[];
  main: HTMLVideoElement;
  closing: HTMLImageElement[];
};

// cache
const cache: Record<string, VideoImageType> = {};

// get video image data
export async function getVideoImages(theme: ThemeValueType) {
  if (!cache[theme]) {
    await fetchVideoImages(theme).then((res) => {
      cache[theme] = res;
    });
  }
  return cache[theme];
}

let cancelId: number | null;
let curVideo: HTMLVideoElement | null;
// play video
export function playVideo(
  canvas: HTMLCanvasElement,
  data: HTMLImageElement[] | HTMLVideoElement
) {
  const context = canvas.getContext('2d');

  // play video element
  if (data instanceof HTMLVideoElement) {
    curVideo = data;
    return new Promise((resolve) => {
      let isPlaying = true;
      data.addEventListener('ended', () => {
        isPlaying = false;
        curVideo = null;
        resolve('');
      });
      const play = () => {
        if (!isPlaying) return;
        context?.drawImage(data, 0, 0);
        cancelId = requestAnimationFrame(play);
      };
      data.addEventListener('play', () => {
        play();
      });
      data.play();
    });
  }

  // play image elements
  return new Promise((resolve) => {
    let idx = 0;
    const play = () => {
      if (idx === data.length) {
        resolve('');
        return;
      }
      context?.clearRect(0, 0, canvas.width, canvas.height);
      context?.drawImage(data[idx], 0, 0);
      idx++;
      cancelId = requestAnimationFrame(play);
    };
    play();
  });
}

// stop video
export function stopVideo() {
  if (cancelId) cancelAnimationFrame(cancelId);
  if (curVideo) curVideo.load();
  cancelId = null;
}

async function fetchVideoImages(theme: ThemeValueType) {
  const data: VideoImageType = {
    opening: [],
    main: document.createElement('video'),
    closing: [],
  };
  const promises: Promise<string>[] = [];

  // functions
  function load(type: keyof VideoImageType, idx?: number) {
    const promise = new Promise<string>((resolve) => {
      let elem = type === 'main' ? data.main : new Image();
      elem.src = pathMaker(type, idx);
      if (type === 'main') {
        (elem as HTMLVideoElement).muted = true;
        elem.addEventListener('loadeddata', () => resolve(''));
      } else if (elem instanceof HTMLImageElement) {
        elem.addEventListener('load', () => resolve(''));
        data[type].push(elem);
      }
    });
    promises.push(promise);
  }
  function pathMaker(type: keyof VideoImageType, idx?: number) {
    let name = '';
    if (type !== 'main') {
      name = String(idx);
      name = '/' + '0'.repeat(4 - name.length) + name;
    }
    return `/images/home/typing-${type}-${theme}${name}.${
      type === 'main' ? 'mp4' : 'webp'
    }`;
  }

  // load data
  load('main');
  if (theme === THEME_ENUM.DARK) {
    for (let i = 1; i <= 275; i++) load('opening', i);
    // speed up the video to sync with light mode
    for (let i = 1100; i <= 1250; i += 1.5) load('closing', Math.floor(i));
  } else {
    for (let i = 1; i <= 280; i++) load('opening', i);
    for (let i = 1111; i <= 1215; i++) load('closing', i);
  }

  await Promise.all(promises);
  return data;
}
