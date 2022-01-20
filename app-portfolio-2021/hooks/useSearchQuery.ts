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

  const setPage = (page: number) => {
    const q = new URLSearchParams(router.query as Record<string, string>);
    if (page <= 1) {
      q.delete('page');
    } else {
      q.set('page', page.toString());
    }
    router.replace(`/posts?${q.toString()}`);
  };

  const setKeyword = (keyword: string) => {
    const q = new URLSearchParams(router.query as Record<string, string>);
    q.set('q', keyword);
    q.delete('page');
    router.replace(`/posts?${q.toString()}`);
  };

  const toggleTag = (tag: string) => {
    const q = new URLSearchParams(router.query as Record<string, string>);
    q.delete('page');
    if (hasTag(tag)) {
      q.set('tag', compositeTags.filter((t) => t !== tag).join(','));
    } else {
      q.set('tag', [...compositeTags, tag].join(','));
    }
    router.replace(`/posts?${q.toString()}`);
  };

  return {
    searchQuery,
    pushSearchQuery,
    replaceSearchQuery,
    setKeyword,
    toggleTag,
    hasTag,
    setPage,
  };
};

export default useSearchQuery;
