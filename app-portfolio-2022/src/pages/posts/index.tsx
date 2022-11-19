import FindPosts from '@/components/FindPosts';
import { makeQuery } from '@/lib';
import {
  NEXT_PUBLIC_ALGOLIA_APP_ID,
  NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
} from '@/lib/env';
import { MyPage } from '@/types/common';
import algoliasearch from 'algoliasearch/lite';
import _debounce from 'lodash/debounce';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { InstantSearchProps } from 'react-instantsearch-dom';
import { findResultsState } from 'react-instantsearch-dom/server';

const searchClient = algoliasearch(
  NEXT_PUBLIC_ALGOLIA_APP_ID,
  NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

const SEARCH_DEBOUNCE_MS = 700;

interface PostPageProps {
  resultsState: InstantSearchProps['resultsState'];
  searchState: any;
}

const PostPage: MyPage<PostPageProps> = ({
  searchState: _searchState,
  resultsState,
}) => {
  const [searchState, setSearchState] = useState(_searchState);
  const router = useRouter();
  //   const debouncedSetState = useRef<NodeJS.Timeout>();
  const setSearchQuery = (nextSearchState: any) => {
    const query = makeQuery(nextSearchState);
    console.log(nextSearchState);
    router.push({ query });
  };
  const debouncedSetSearchQuery = useMemo(
    () => _debounce(setSearchQuery, SEARCH_DEBOUNCE_MS, { trailing: true }),
    []
  );

  return (
    <>
      <FindPosts
        searchClient={searchClient}
        indexName="post"
        createURL={(state) => makeQuery(state)}
        searchState={searchState}
        resultsState={resultsState}
        onSearchStateChange={(nextSearchState) => {
          debouncedSetSearchQuery(nextSearchState);
          setSearchState(nextSearchState);
        }}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PostPageProps> = async ({
  query,
}) => {
  const searchState = query;
  const resultsState = await findResultsState(FindPosts, {
    searchClient,
    indexName: 'post',
    searchState,
  });

  return {
    props: {
      resultsState: JSON.parse(
        JSON.stringify(resultsState)
      ) as InstantSearchProps['resultsState'],
      searchState,
      pageTitle: 'posts',
    },
  };
};

export default PostPage;
