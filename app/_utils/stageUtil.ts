import { ThemeValueType } from '../_redux/module/preferSlice';

// stage is changing in order
// if interrupted, closing stage is executed right away
export const StageList = [
  'idle',
  'ready',
  'opening',
  'main',
  'pending',
  'closing',
] as const;
export type StageType = (typeof StageList)[number];

export type VideoType = `${ThemeValueType}-${[
  'opening',
  'main',
  'closing'
][number]}`;

type StorageType = {
  opening: HTMLVideoElement;
  main: HTMLVideoElement;
  closing: HTMLVideoElement;
};

const storage: Record<string, StorageType> = {};

export async function prepareStage(stage: StageType, theme: ThemeValueType) {
  stopCurrentPlaying();

  switch (stage) {
    case 'ready':
      if (!storage[theme]) storage[theme] = await loadData(theme);
      break;
    default:
      prepareVideo(stage, theme);
      break;
  }
}

// load video data
async function loadData(theme: ThemeValueType) {
  const data: StorageType = {
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

// video related functions
let curVideo: HTMLVideoElement | null = null;
let curVideoType: string | null = null;

function prepareVideo(stage: StageType, theme: ThemeValueType) {
  if (stage === 'opening' || stage === 'main' || stage === 'closing') {
    curVideo = storage[theme][stage];
    curVideo.load();
    curVideo.pause();
    curVideoType = `${theme}-${stage}`;
  } else {
    curVideo = null;
    curVideoType = null;
  }
}

export function getCurrentVideo() {
  return curVideo;
}
export function getCurrentVideoType() {
  return curVideoType;
}

function stopCurrentPlaying() {
  curVideo?.pause();
  curVideo = null;
}
