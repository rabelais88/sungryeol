import { useEffect, useState } from 'react';
import _debounce from 'lodash/debounce';
import { useRouter } from 'next/router';
import { toStr } from '@sungryeol/lib';
import { deleteProperty, mergeObj } from '@sungryeol/lib';

/**
 * @note https://www.devtwins.com/blog/sticky-navbar-hides-scroll
 * */
export const useDetectScrolled = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = _debounce(() => {
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos !== prevScrollPos)
      setScrolled(currentScrollPos > prevScrollPos);
    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, scrolled, handleScroll]);
  return scrolled;
};

export const useQueryRoute = () => {
  const router = useRouter();
  const q = toStr(router.query.q);
  // const size = toNum(router.query.size);
  // const page = toNum(router.query.page);
  const tags = toStr(router.query.tags).split(',');

  const setKeyword = (keyword?: string) => {
    router.push({ query: mergeObj(router.query, { q: keyword, page: '0' }) });
  };
  const setSize = (size?: number) => {
    if (size === undefined) {
      const query = deleteProperty(router.query, 'query');
      router.push({ query });
      return;
    }
    router.push({
      query: mergeObj(router.query, { size: toStr(size), page: '0' }),
    });
  };
  const setPage = (page?: number) => {
    if (page === undefined) {
      const query = deleteProperty(router.query, 'page');
      router.push({ query });
      return;
    }
    router.push({ query: mergeObj(router.query, { page: toStr(page) }) });
  };

  const setTag = (tag: string) => {
    router.push({
      query: mergeObj(router.query, { tags: [tag].join(','), page: '0' }),
    });
  };

  const addTag = (tag: string) => {
    const newTags = Array.from(new Set([...tags, tag])).filter((t) => t !== '');
    router.push({
      query: mergeObj(router.query, { tags: newTags.join(','), page: '0' }),
    });
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t != tag);
    if (newTags.length === 0) {
      router.push({ query: deleteProperty(router.query, 'tags') });
      return;
    }
    router.push({
      query: mergeObj(router.query, { tags: newTags, page: '0' }),
    });
  };

  const clearTags = () => {
    const query = deleteProperty(router.query, 'tags');
    query.page = '0';
    router.push({ query });
  };

  const hasTag = (tag: string) => {
    return !!tags.find((t) => t === tag);
  };

  return {
    setKeyword,
    setSize,
    setPage,
    addTag,
    removeTag,
    clearTags,
    hasTag,
    setTag,
    keyword: q,
  };
};

export const useRouteLoading = () => {
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
