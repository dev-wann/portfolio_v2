import { useEffect } from 'react';

enum AnimateType {
  both,
  text,
  box,
}

type AnimateData = { elem: Element; type: AnimateType };

const animateQueue: AnimateData[] = [];
let targets: Element[] = [];
let timeoutId: NodeJS.Timeout;
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
  clearTimeout(timeoutId);
  // hide contents
  targets.forEach((target) => {
    target.classList.add('observe', 'fade-out', 'hide-box', 'hide-text');
  });
  // hide nav selection
  const navSelect = document.body.querySelector('#nav-select');
  if (navSelect) navSelect.classList.add('fade-out', 'hide-box');
  await delay(500);
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
    timeoutId = setTimeout(() => {
      animate(queue, observer);
    }, 200);
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
  elem?.classList?.remove('observe');
  if (type !== AnimateType.both) await delay(200);
  await delay(200);
}

function delay(ms: number) {
  return new Promise((res) => (timeoutId = setTimeout(res, ms)));
}
