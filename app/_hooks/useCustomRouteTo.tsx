import resStyle from '@/app/resume/resume.module.scss';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../_redux';
import { changeStageAndPlay } from '../_redux/module/homeStageSlice';
import preferSlice from '../_redux/module/preferSlice';
import { delay } from '../_utils';
import { clearPage, hideNavSelect } from './useIntersectionObserver';

export default function useCustomRouteTo() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const curPath = usePathname();
  const theme = useSelector((state: RootState) => state.prefer.theme);
  let isRouting = false;

  const routeTo = (newPath: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();

    // ignore transition to same page
    if (newPath === curPath) return;

    // ignore duplicated routing request
    if (isRouting) return;

    (async () => {
      if (curPath === '/') {
        // at home page, wait until closing sequence ends
        dispatch(preferSlice.actions.setHomeClosing(true));
        if (theme) dispatch(changeStageAndPlay({ stage: 'closing', theme }));
        isRouting = true;

        await delay(2000);

        dispatch(preferSlice.actions.setHomeClosing(false));
        if (theme) dispatch(changeStageAndPlay({ stage: 'idle', theme }));
      } else if (curPath === '/resume') {
        dispatch(preferSlice.actions.setHomeClosing(false));
        document.querySelector('#resume')?.classList.add(resStyle.hide);
        await delay(600);
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
