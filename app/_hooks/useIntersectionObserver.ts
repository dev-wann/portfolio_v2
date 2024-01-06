import { useEffect } from 'react';

enum AnimateType {
  both,
  text,
  box,
}

type AnimateData = { elem: Element; type: AnimateType };

const animateQueue: AnimateData[] = [];
let targets: Element[] = [];
let timeoutIds: NodeJS.Timeout[] = [];
let isAnimating = false;

export default function useIntersectionObserver() {
  useEffect(() => {
    targets = Array.from(document.body.getElementsByClassName('observe'));
    const observer = new IntersectionObserver(callback, { threshold: 0.4 });
    targets.forEach((target) => {
      if (target.classList.contains('text')) {
        target.classList.add('hide-text');
      } else if (target.classList.contains('box')) {
        target.classList.add('hide-box');
      } else {
        target.classList.add('hide-box', 'hide-text');
      }
      observer.observe(target);
    });

    animate(animateQueue, observer);

    return () => {
      cleanUp(observer);
    };
  }, []);
}

export async function clearPage() {
  // cancel timeouts
  timeoutIds.forEach((id) => clearTimeout(id));
  timeoutIds = [];

  // hide contents
  targets.forEach((target) => {
    target.classList.add('observe', 'fade-out', 'hide-box', 'hide-text');
  });
  await delay(400);
}

export function hideNavSelect() {
  const navSelect = document.body.querySelector('#nav-select');
  if (navSelect) navSelect.classList.add('fade-out', 'hide-box');
}

export function showNavSelect() {
  const navSelect = document.body.querySelector('#nav-select');
  if (navSelect) navSelect.classList.remove('fade-out', 'hide-box');
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
  isAnimating = false;
  targets.splice(0, targets.length);
}

// animaitng functions
async function animate(queue: AnimateData[], observer: IntersectionObserver) {
  if (isAnimating) return;

  const item = queue.shift();
  if (item) {
    isAnimating = true;
    await show(item);
    isAnimating = false;
    animate(queue, observer);
  } else {
    timeoutIds.push(
      setTimeout(() => {
        animate(queue, observer);
      }, 200)
    );
  }
}

async function show({ elem, type }: AnimateData) {
  (elem as HTMLElement).style.visibility = 'visible';
  (async () => {
    switch (type) {
      case AnimateType.both:
        elem?.classList?.remove('hide-box');
        await delay(200);
        elem?.classList?.remove('hide-text');
        break;
      case AnimateType.text:
      case AnimateType.box:
        elem?.classList?.remove('hide-box');
        elem?.classList?.remove('hide-text');
    }
  })();
  await delay(150);
}

function delay(ms: number) {
  return new Promise((res) => timeoutIds.push(setTimeout(res, ms)));
}
