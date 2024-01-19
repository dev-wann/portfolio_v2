import { ThemeValueType } from '../_redux/module/preferSlice';

export type VideoDataType = {
  opening: HTMLVideoElement;
  main: HTMLVideoElement;
  closing: HTMLVideoElement;
};

// cache
const cache: Record<string, VideoDataType> = {};

// get video image data
export async function getVideoImages(theme: ThemeValueType) {
  if (!cache[theme]) {
    await fetchVideoImages(theme).then((res) => {
      cache[theme] = res;
    });
  }
  return cache[theme];
}

let clearId: NodeJS.Timeout | null;
let curVideo: HTMLVideoElement | null;
// play video
export function playVideo(canvas: HTMLCanvasElement, data: HTMLVideoElement) {
  return new Promise((resolve) => {
    curVideo = data;
    const context = canvas.getContext('2d');
    let isPlaying = true;

    // play video
    const draw = () => {
      if (!isPlaying) return;
      context?.drawImage(data, 0, 0);
      clearId = setTimeout(draw, 1000 / 30);
    };
    data.addEventListener('play', () => draw());

    // video end
    data.addEventListener('ended', () => {
      isPlaying = false;
      curVideo = null;
      resolve('');
    });

    data.load();
    setTimeout(() => {
      data.play();
    });
  });
}

export function drawFallbackImage(
  canvas: HTMLCanvasElement,
  theme: ThemeValueType
) {
  const img = new Image();
  img.src = `/images/home/typing-fallback-${theme}.webp`;
  img.addEventListener('load', () => {
    canvas.getContext('2d')?.drawImage(img, 0, 0);
  });
}

// stop video
export function stopVideo() {
  if (clearId) clearTimeout(clearId);
  curVideo?.pause();
  clearId = null;
}

async function fetchVideoImages(theme: ThemeValueType) {
  const data: VideoDataType = {
    opening: document.createElement('video'),
    main: document.createElement('video'),
    closing: document.createElement('video'),
  };

  // load videos
  const promises: Promise<string>[] = [];
  Object.entries(data).forEach(([stage, video]) => {
    const promise = new Promise<string>((resolve, reject) => {
      video.loop = false;
      video.muted = true;
      video.autoplay = true;
      video.playsInline = true;
      video.src = `/images/home/typing-${stage}-${theme}.mp4`;
      video.addEventListener('loadeddata', () => resolve('Video loaded'));
      video.addEventListener('error', () => reject('Fail to load video'));
    });
    promises.push(promise);
  });

  await Promise.all(promises);
  return data;
}
