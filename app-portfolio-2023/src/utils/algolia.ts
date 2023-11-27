import algoliasearch from 'algoliasearch';
import {
  NEXT_PUBLIC_ALGOLIA_APP_ID,
  NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
} from './env';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  SearchForFacetValuesResponse,
  SearchResponse,
} from '@algolia/client-search';
import { makeUrl, searchParamsToObj } from '.';

const algoliaClient = algoliasearch(
  NEXT_PUBLIC_ALGOLIA_APP_ID,
  NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

export const useAlgoliaSearchControl = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const q = searchParams.get('q') ?? '';
  const tags = (searchParams.get('tags') ?? '')
    .split(',')
    .filter((t) => t !== '');
  const page = Number(searchParams.get('page') ?? '0');
  const size = Number(searchParams.get('size') ?? '5');
  const tagsSize = Number(searchParams.get('tagsize') ?? '20');
  interface Query {
    q: string;
    tags: string;
    page: string;
    size: string;
    tagsSize: string;
  }
  const mergeQuery = (newQuery: Partial<Query>) => {
    const prevQuery = searchParamsToObj<Partial<Query>>(searchParams);
    const query = {
      ...prevQuery,
      ...newQuery,
    };
    return query;
  };
  const setKeyword = (newKeyword: string) => {
    const query = mergeQuery({ q: newKeyword, page: '0' });
    router.replace(makeUrl(pathname, query));
  };

  const getPageUrl = (page: number) => {
    const q = mergeQuery({ page: page.toString() });
    return makeUrl('/search', q);
  };

  const activeTagsMap = useMemo(
    () =>
      tags.reduce(
        (ac, cv) => ({ ...ac, [cv]: true }),
        {} as Record<string, boolean>
      ),
    [tags]
  );

  return {
    q,
    tags,
    page,
    size,
    tagsSize,
    setKeyword,
    getPageUrl,
    activeTagsMap,
  };
};

const postWorkIndex = algoliaClient.initIndex('posts-works');
type SearchablePostWork =
  | (SearchablePost & { type: 'post'; slug: string })
  | (SearchableWork & { type: 'work'; slug: string })
  | { type: 'contact'; body: string };
export const useAlgoliaSearch = () => {
  const searchControl = useAlgoliaSearchControl();

  const { q, tags, page, size } = searchControl;
  const [searchResult, setSearchResult] =
    useState<SearchResponse<SearchablePostWork>>();
  const [loading, setLoading] = useState(true);
  const updateSearch = async () => {
    setLoading(true);
    try {
      const result = await postWorkIndex.search<SearchablePostWork>(q, {
        page,
        facetFilters: tags.map((t) => `tags:${t}`),
        hitsPerPage: size,
        attributesToHighlight: ['title'],
        attributesToSnippet: ['body:80'],
      });
      setSearchResult(result);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    updateSearch();
  }, [q, ...tags, page, size]);
  return { searchResult, loading };
};

export const useAlgoliaSearchTags = () => {
  const { tagsSize } = useAlgoliaSearchControl();
  const [loading, setLoading] = useState(false);
  const [tagsSearchResult, setTagsSearchResult] =
    useState<SearchForFacetValuesResponse>();
  const updateSearch = async () => {
    setLoading(true);
    try {
      const searchForFacetValueResponse =
        await postWorkIndex.searchForFacetValues('tags', '', {
          maxFacetHits: tagsSize,
          attributesToHighlight: [],
        });
      setTagsSearchResult(searchForFacetValueResponse);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateSearch();
  }, [tagsSize]);
  return { tagsSearchResult, loading };
};
