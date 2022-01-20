// https://www.contentful.com/blog/2021/07/02/add-algolia-instantsearch-to-nextjs-app/
import {
  InstantSearch,
  InstantSearchProps,
  Highlight,
  connectHits,
  connectSearchBox,
  connectPagination,
  connectRefinementList,
  Configure,
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
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import PostTag, { PostTagControl } from './PostTag';
import { Hit, SearchState } from 'react-instantsearch-core';
import { shortInternationalTime } from '@sungryeol/lib';
import NextLink from 'next/link';
import AlgoliaService from '@/services/AlgoliaService';
import { SearchClient } from 'algoliasearch/lite';
import _debounce from 'lodash/debounce';
import { useMemo } from 'react';
import useSearchQuery from '@/hooks/useSearchQuery';

export const SearchBox = connectSearchBox(({ refine }) => {
  const { setKeyword } = useSearchQuery();
  const debouncedOnChange = useMemo(
    () => _debounce(setKeyword, 500, { trailing: true }),
    [setKeyword]
  );
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
      sx={{ em: { bgColor: 'bg-yellow', fontStyle: 'normal' } }}
      inset="0"
      pt="9px"
      pb="27px"
      className="search-result-item"
    >
      <Box
        size="sm"
        fontWeight="400"
        mb={{ base: '3px', lg: '10px' }}
        fontSize="15px"
        lineHeight="18px"
        className="title-area"
      >
        <Text
          w="90px"
          mr="10px"
          as="span"
          display={{ base: 'block', lg: 'inline-block' }}
          mb={{ base: '15px', lg: '0' }}
          className="title-date"
        >
          {shortInternationalTime(new Date(hit.updatedAt))}
        </Text>
        <NextLink href={`/posts/${hit.uid}`} passHref>
          <Link display="inline-block" fontSize="15px" fontWeight="800">
            <Highlight hit={hit} attribute="title" tagName="em" />
          </Link>
        </NextLink>
      </Box>
      <Text
        fontWeight="200"
        mb="19px"
        fontSize="15px"
        ml={{ base: '0px', lg: '100px' }}
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        <Highlight hit={hit} attribute="content" tagName="em" />
      </Text>
      <HStack spacing="9px" ml={{ base: '0px', lg: '100px' }}>
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
export const SearchResults = connectHits<Hit<IArticle>>(({ hits }) => {
  return (
    <UnorderedList
      styleType="none"
      className="search-results"
      marginInlineStart="none"
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

export const SearchPagination = connectPagination(
  ({ currentRefinement, nbPages, refine, createURL }) => {
    const {
      searchQuery: { page },
      setPage,
    } = useSearchQuery();
    return (
      <HStack className="search-pagination" justify="flex-end">
        <Button
          variant="link"
          color="black"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>
        {Array.from({ length: nbPages }).map((_, i) => (
          <Button
            variant="link"
            key={i}
            className={page === i + 1 ? 'active' : ''}
            color="black"
            sx={{ '.active': { fontWeight: 'bold', color: 'pink.400' } }}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          variant="link"
          color="black"
          disabled={page >= nbPages}
          onClick={() => setPage(page + 1)}
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

export const TagListMenu = connectRefinementList((arg) => {
  const { items } = arg;
  const { toggleTag } = useSearchQuery();
  return (
    <Wrap className="tag-list-menu" justify="center">
      {items.map((item) => (
        <WrapItem key={item.label}>
          <PostTagControl
            data-is-refined={item.isRefined}
            active={item.isRefined}
            onClick={() => toggleTag(item.label)}
          >
            {item.label.split('||')[0].toUpperCase()}:{item.count}
          </PostTagControl>
        </WrapItem>
      ))}
    </Wrap>
  );
});

// component for seraching posts with Algolia
const PostSearch: React.FC<IPostSearch> = ({
  searchClient,
  children,
  ...props
}) => {
  const {
    searchQuery: { page, query, compositeTags },
  } = useSearchQuery();
  const searchState: SearchState = {
    page,
    query,
  };
  if (compositeTags.length >= 1) searchState.refinementList = { compositeTags };

  return (
    <InstantSearch
      {...props}
      searchClient={searchClient ?? new AlgoliaService().searchClient}
      indexName="post_updated_at"
      stalledSearchDelay={500}
      searchState={searchState}
    >
      <Configure hitsPerPage={8} />
      {children}
    </InstantSearch>
  );
};

export default PostSearch;
