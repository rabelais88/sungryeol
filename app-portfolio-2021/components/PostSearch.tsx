// https://www.contentful.com/blog/2021/07/02/add-algolia-instantsearch-to-nextjs-app/
import dynamic from 'next/dynamic';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  // SearchBox,
  Hits,
} from 'react-instantsearch-dom';
import { useMemo } from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? '';
const appKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY ?? '';

const SearchBox = connectSearchBox(({ refine }) => {
  return (
    <input type="search" onChange={(e) => refine(e?.currentTarget?.value)} />
  );
});

// component for seraching posts with Algolia
const _PostSearch: React.FC = () => {
  const searchClient = useMemo(() => algoliasearch(appId, appKey), []);
  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="posts">
        <SearchBox />
        <Hits />
      </InstantSearch>
    </>
  );
};

const PostSearch = dynamic(() => Promise.resolve(_PostSearch), { ssr: false });

export default PostSearch;
