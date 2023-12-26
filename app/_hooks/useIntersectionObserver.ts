'use client';

import { useEffect } from 'react';

enum AnimateType {
  both,
  text,
  box,
}

type AnimateData = { elem: Element; type: AnimateType };

let targets: Element[] = [];
const animateQueue: AnimateData[] = [];

export default function useIntersectionObserver() {
  useEffect(() => {
    targets = Array.from(document.body.getElementsByClassName('observe'));
    const observer = new IntersectionObserver(callback, { threshold: 0.4 });
    targets.forEach((target) => {
      target.classList.add('hide-box', 'hide-text');
      observer.observe(target);
    });

    animate(animateQueue, observer);

    return () => {
      cleanUp(observer);
    };
  }, []);
}

export async function clearPage() {
  targets.forEach((target) => {
    target.classList.add('fade-out', 'hide-box', 'hide-text');
  });
  await delay(600);
}

// observer callback
function callback(
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = targets.find((item) => item === entry.target);
      if (!target) return;

      let type;
      if (target.classList.contains('text')) type = AnimateType.text;
      else if (target.classList.contains('box')) type = AnimateType.box;
      else type = AnimateType.both;
      animateQueue.push({ elem: target, type });

      // observe only once
      observer.unobserve(entry.target);
    }
  });
}

// clean up function for useEffect
function cleanUp(observer: IntersectionObserver) {
  observer.disconnect();
  animateQueue.splice(0, animateQueue.length);
  targets.splice(0, targets.length);
}

// animaitng functions
let isAnimating = false;
async function animate(queue: AnimateData[], observer: IntersectionObserver) {
  if (isAnimating) return;

  const item = queue.shift();
  if (item) {
    isAnimating = true;
    await show(item);
    isAnimating = false;
    animate(queue, observer);
  } else {
    setTimeout(() => {
      animate(queue, observer);
    }, 300);
  }
}

async function show({ elem, type }: AnimateData) {
  (elem as HTMLElement).style.visibility = 'visible';
  if (type === AnimateType.both || type === AnimateType.box) {
    elem?.classList?.remove('hide-box');
    await delay(200);
  }
  if (type === AnimateType.both || type === AnimateType.text) {
    elem?.classList?.remove('hide-text');
  }
  if (type !== AnimateType.both) await delay(200);
  await delay(200);
}

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
