// https://www.contentful.com/blog/2021/07/02/add-algolia-instantsearch-to-nextjs-app/
import dynamic from 'next/dynamic';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  // SearchBox,
  // Hits,
  connectStateResults,
} from 'react-instantsearch-dom';
import { useMemo } from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { Input, InputGroup, InputLeftElement, Image } from '@chakra-ui/react';

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? '';
const appKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY ?? '';

const SearchBox = connectSearchBox(({ refine }) => {
  return (
    <InputGroup>
      <InputLeftElement
        children={<Image src="/icons/search-oval.svg" alt="search icon" />}
      />
      <Input
        type="search"
        onChange={(e) => refine(e?.currentTarget?.value)}
        className="post-search--search-box"
        placeholder="Type keywords to search/검색하려는 단어를 입력하세요..."
      />
    </InputGroup>
  );
});

const Hits = connectStateResults(({ searchState, searchResults }) => {
  const validQuery = searchState.query && searchState.query?.length >= 2;
  if (searchResults?.hits?.length === 0 || !searchResults?.hits)
    return <p>no result</p>;
  return (
    <ol>
      {searchResults.hits.map((hit) => (
        <li key={hit.uid}>{hit.title}</li>
      ))}
    </ol>
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
