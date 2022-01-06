// https://www.contentful.com/blog/2021/07/02/add-algolia-instantsearch-to-nextjs-app/
import {
  InstantSearch,
  InstantSearchProps,
  Highlight,
  connectHits,
  connectSearchBox,
  connectPagination,
} from 'react-instantsearch-dom';
import {
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  ListItem,
  UnorderedList,
  Text,
  HStack,
  Box,
  Link,
  Button,
} from '@chakra-ui/react';
import PostTag from './PostTag';
import { Hit } from 'react-instantsearch-core';
import { shortInternationalTime } from '@sungryeol/lib';
import NextLink from 'next/link';
import AlgoliaService from '@/services/AlgoliaService';
import { SearchClient } from 'algoliasearch/lite';
import _debounce from 'lodash/debounce'
import { useMemo } from 'react';

const SearchBox = connectSearchBox(({ refine }) => {
  const debouncedOnChange = useMemo(() => _debounce((target) => refine(target), 200, {trailing:true}), [refine]);
  return (
    <InputGroup>
      <InputLeftElement
        children={<Image src="/icons/search-oval.svg" alt="search icon" />}
      />
      <Input
        type="search"
        onChange={(e) => debouncedOnChange(e?.currentTarget?.value)}
        className="post-search--search-box"
        placeholder="Type keywords to search/검색하려는 단어를 입력하세요..."
        sx={{
          '&:focus': {
            boxShadow: '0px 1px 0px 0px black !important',
            borderColor: 'black',
          },
        }}
      />
    </InputGroup>
  );
});

const Hit: React.FC<{ hit: any }> = ({ hit }) => <Highlight hit={hit} />;

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

const SearchPagination = connectPagination(
  ({ currentRefinement, nbPages, refine, createURL }) => {
    return (
      <HStack className="search-pagination" justify="flex-end">
        <Button
          variant="link"
          color="black"
          disabled={currentRefinement <= 1}
          onClick={() => refine(currentRefinement - 1)}
        >
          Prev
        </Button>
        {Array.from({ length: nbPages }).map((_, i) => (
          <Button
            variant="link"
            key={i}
            className={currentRefinement === i + 1 ? 'active' : ''}
            color="black"
            sx={{ '.active': { fontWeight: 'bold', color: 'pink.400' } }}
            onClick={() => refine(i)}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          variant="link"
          color="black"
          disabled={currentRefinement >= nbPages}
          onClick={() => refine(currentRefinement + 1)}
        >
          Next
        </Button>
      </HStack>
    );
  }
);

interface IPostSearch
  extends Omit<
    InstantSearchProps,
    'indexName' | 'stalledSearchDelay' | 'searchClient'
  > {
  searchClient?: SearchClient;
}
// component for seraching posts with Algolia
const PostSearch: React.FC<IPostSearch> = ({ searchClient, ...props }) => {
  return (
    <InstantSearch
      {...props}
      searchClient={searchClient ?? new AlgoliaService().searchClient}
      indexName="posts"
      stalledSearchDelay={500}
    >
      <SearchBox />
      <SearchResults />
      <SearchPagination />
    </InstantSearch>
  );
};

export default PostSearch;
