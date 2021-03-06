import { useRouter } from 'next/router';

export interface ISearchQuery {
  compositeTags: string[];
  page: number;
  query: string;
}

export interface ISearchQueryParams {
  compositeTags?: string;
  page?: string;
  q?: string;
}

const getUrl = (q: ISearchQuery) => {
  const newQ: ISearchQueryParams = {};
  if (q.query) newQ.q = q.query;
  if (q.page !== 1) newQ.page = q.page.toString();
  if (q.compositeTags.length >= 1)
    newQ.compositeTags = q.compositeTags.join(',');
  return [
    '/posts',
    new URLSearchParams(newQ as Record<string, string>).toString(),
  ].join('&');
};

const useSearchQuery = () => {
  const router = useRouter();
  const compositeTags = decodeURIComponent(`${router.query?.tag ?? ''}`)
    .split(',')
    .filter((t) => t !== '');
  const page = Number(router.query?.page ?? '1');
  const query = `${router.query?.q ?? ''}`;
  const searchQuery: ISearchQuery = { compositeTags, page, query };
  const pushSearchQuery = (q: ISearchQuery) => {
    router.push(getUrl(q));
  };
  const replaceSearchQuery = (q: ISearchQuery) => {
    router.replace(getUrl(q));
  };

  const hasTag = (tag: string) => {
    return compositeTags.findIndex((t) => t === tag) !== -1;
  };

  const getPageUrl = (page: number) => {
    const q = new URLSearchParams(router.query as Record<string, string>);
    if (page <= 0) {
      q.delete('page');
    } else {
      q.set('page', page.toString());
    }
    return `/posts?${q.toString()}`;
  };

  const setPage = (page: number) => {
    const url = getPageUrl(page);
    router.replace(url);
  };

  const setKeyword = (keyword: string) => {
    const q = new URLSearchParams(router.query as Record<string, string>);
    q.set('q', keyword);
    q.delete('page');
    router.replace(`/posts?${q.toString()}`);
  };

  const getResetTagUrl = () => {
    const q = new URLSearchParams(router.query as Record<string, string>);
    q.delete('tag');
    q.delete('page');
    return `/posts?${q.toString()}`;
  };
  const resetTag = () => {
    router.replace(getResetTagUrl());
  };

  const toggleTagUrl = (tag: string) => {
    const q = new URLSearchParams(router.query as Record<string, string>);
    q.delete('page');
    if (hasTag(tag)) {
      q.set('tag', compositeTags.filter((t) => t !== tag).join(','));
    } else {
      q.set('tag', [...compositeTags, tag].join(','));
    }
    return `/posts?${q.toString()}`;
  };

  const toggleTag = (tag: string) => {
    const url = toggleTagUrl(tag);
    router.replace(url);
  };

  const tagCount = compositeTags?.length ?? 0;

  return {
    searchQuery,
    pushSearchQuery,
    replaceSearchQuery,
    setKeyword,
    toggleTag,
    hasTag,
    setPage,
    toggleTagUrl,
    getPageUrl,
    tagCount,
    resetTag,
    getResetTagUrl,
  };
};

export default useSearchQuery;
