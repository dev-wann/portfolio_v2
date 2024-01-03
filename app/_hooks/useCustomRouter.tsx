import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { clearPage, hideNavSelect } from './useIntersectionObserver';

class CustomRouter {
  constructor(router: AppRouterInstance) {
    this.router = router;
  }
  router: AppRouterInstance;
  async push(newPath: string) {
    const curPath = window.location.pathname;
    // ignore transition to same page
    if (newPath === curPath) return;

    hideNavSelect();
    await clearPage();
    this.router.push(newPath);
  }
}

export default function useCustomRouter() {
  const router = useRouter();
  const customRouter = new CustomRouter(router);
  return customRouter;
}
