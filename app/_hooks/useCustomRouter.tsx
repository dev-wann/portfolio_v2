import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { clearPage } from './useIntersectionObserver';

class CustomRouter {
  constructor(router: AppRouterInstance) {
    this.router = router;
  }
  router: AppRouterInstance;
  async push(url: string) {
    await clearPage();
    this.router.push(url);
  }
}

export default function useCustomRouter() {
  const router = useRouter();
  const customRouter = new CustomRouter(router);
  return customRouter;
}
