import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import preferSlice from '../_redux/module/preferSlice';
import { delay } from '../_utils';
import { clearPage, hideNavSelect } from './useIntersectionObserver';

export default function useCustomRouteTo() {
  const dispatch = useDispatch();
  const router = useRouter();
  const curPath = usePathname();

  const routeTo = (newPath: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();

    // ignore transition to same page
    if (newPath === curPath) return;

    (async () => {
      if (curPath === '/') {
        // at home page, wait until closing sequence ends
        dispatch(preferSlice.actions.setHomeClosing(true));
        await delay(1600);
        dispatch(preferSlice.actions.setHomeClosing(false));
      }
      push(router, newPath);
    })();
  };

  return routeTo;
}

async function push(router: AppRouterInstance, path: string) {
  hideNavSelect();
  await clearPage();
  router.push(path);
}
