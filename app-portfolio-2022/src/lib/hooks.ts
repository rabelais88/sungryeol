import { useEffect, useState } from 'react';
import _debounce from 'lodash/debounce';
import { useRouter } from 'next/router';
import { toNum, toStr } from '@sungryeol/lib';
import { deleteProperty, mergeObj } from '.';

/**
 * @note https://www.devtwins.com/blog/sticky-navbar-hides-scroll
 * */
export const useDetectScrolled = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = _debounce(() => {
    const currentScrollPos = window.pageYOffset;
    setScrolled(currentScrollPos > 70);
    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

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
    router.push({ query: mergeObj(router.query, { q: keyword }) });
  };
  const setSize = (size?: number) => {
    if (size === undefined) {
      const query = deleteProperty(router.query, 'query');
      router.push({ query });
      return;
    }
    router.push({ query: mergeObj(router.query, { size: toStr(size) }) });
  };
  const setPage = (page?: number) => {
    if (page === undefined) {
      const query = deleteProperty(router.query, 'page');
      router.push({ query });
      return;
    }
    router.push({ query: mergeObj(router.query, { page: toStr(page) }) });
  };
  const addTag = (tag: string) => {
    const newTags = Array.from(new Set([...tags, tag]));
    router.push({ query: mergeObj(router.query, { tags: newTags.join(',') }) });
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t != tag);
    if (newTags.length === 0) {
      router.push({ query: deleteProperty(router.query, 'tags') });
      return;
    }
    router.push({ query: mergeObj(router.query, { tags: newTags }) });
  };

  const clearTags = () => {
    const query = deleteProperty(router.query, 'tags');
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
    keyword: q,
  };
};
