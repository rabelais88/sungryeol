import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const useRouteLoading = () => {
  const router = useRouter();
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    router.events.on('routeChangeStart', onLoadingStart);
    router.events.on('routeChangeError', onLoadingEnd);
    router.events.on('routeChangeComplete', onLoadingEnd);
    return () => {
      router.events.off('routeChangeStart', onLoadingStart);
      router.events.off('routeChangeError', onLoadingEnd);
      router.events.off('routeChangeComplete', onLoadingEnd);
    };
  }, []);

  const onLoadingStart = () => setRouteLoading(true);
  const onLoadingEnd = () => setRouteLoading(false);
  return { routeLoading };
};

export default useRouteLoading;
