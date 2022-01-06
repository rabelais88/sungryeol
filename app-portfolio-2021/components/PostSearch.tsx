// https://www.contentful.com/blog/2021/07/02/add-algolia-instantsearch-to-nextjs-app/
import dynamic from 'next/dynamic';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Highlight, connectHits } from 'react-instantsearch-dom';
import { useMemo } from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import {
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  ListItem,
  UnorderedList,
  Heading,
  Text,
  HStack,
  Box,
  Link,
} from '@chakra-ui/react';
import PostTag from './PostTag';
import { Hit } from 'react-instantsearch-core';
import { shortInternationalTime } from '@sungryeol/lib';
import NextLink from 'next/link';

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

const Hit: React.FC<{ hit: any }> = ({ hit }) => <Highlight hit={hit} />;

// const Hits = connectStateResults(({ searchState, searchResults }) => {
//   const validQuery = searchState.query && searchState.query?.length >= 2;
//   if (searchResults?.hits?.length === 0 || !searchResults?.hits)
//     return <p>no result</p>;
//   return (
//     <ol>
//       {searchResults.hits.map((hit) => (
//         <li key={hit.uid}>
//           {hit.title}
//           {JSON.stringify(hit)}
//           {/* <Highlight hit={hit} /> */}
//         </li>
//       ))}
//     </ol>
//   );
// });

interface IArticle {
  updatedAt: string;
  uid: string;
  tags: {
    createdAt: string;
    id: number;
    key: string;
    label: string;
    updatedAt: string;
  }[];
}

const HitItem: React.FC<{ hit: Hit<IArticle> }> = ({ hit }) => {
  return (
    <ListItem
      key={hit.uid}
      sx={{ em: { bgColor: 'yellow.100', fontStyle: 'normal' } }}
      pt="9px"
      pb="27px"
      className="search-result-item"
    >
      <Box
        size="sm"
        fontWeight="400"
        mb="10px"
        fontSize="15px"
        lineHeight="18px"
        className="title-area"
      >
        <Text
          w="80px"
          mr="10px"
          as="span"
          display="inline-block"
          whiteSpace="nowrap"
        >
          {shortInternationalTime(new Date(hit.updatedAt))}
        </Text>
        <NextLink href={`/posts/${hit.uid}`} passHref>
          <Link display="inline-block" fontSize="15px" fontWeight="500">
            <Highlight hit={hit} attribute="title" tagName="em" />
          </Link>
        </NextLink>
      </Box>
      <Text
        fontWeight="200"
        mb="19px"
        fontSize="15px"
        ml="90px"
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        <Highlight hit={hit} attribute="content" tagName="em" />
      </Text>
      <HStack spacing="9px" ml="90px">
        {hit.tags.map((t, i) => (
          <PostTag key={[t.key, i].join('-')}>
            {(t.label ?? '').toUpperCase()}
          </PostTag>
        ))}
      </HStack>
    </ListItem>
  );
};

// same as react-instasearch-dom/Hits component
const SearchResults = connectHits<Hit<IArticle>>(({ hits }) => {
  return (
    <UnorderedList
      styleType="none"
      className="search-results"
      sx={{
        '.search-result-item + .search-result-item': {
          borderTop: 'solid 1px black',
        },
      }}
    >
      {hits.map((hit) => (
        <HitItem hit={hit} key={hit.objectID} />
      ))}
    </UnorderedList>
  );
});

// component for seraching posts with Algolia
const _PostSearch: React.FC = () => {
  const searchClient = useMemo(() => algoliasearch(appId, appKey), []);
  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="posts">
        <SearchBox />
        <SearchResults />
      </InstantSearch>
    </>
  );
};

// const PostSearch = dynamic(() => Promise.resolve(_PostSearch), { ssr: false });

export default _PostSearch;
