import LayoutDefault from '@/layout/LayoutDefault';
import { GetServerSideProps, NextPage } from 'next';
import LogoAnimated from '@/components/LogoAnimated';
import Header from '@/components/Header';
import AlgoliaService, {
  AlgoliaHit,
  AlgoliaSearchResponse,
  AlgoliaTags,
} from '@/services/AlgoliaService';
import { IPostHit } from '@/types';
import {
  Box,
  ListItem,
  Text,
  Link,
  HStack,
  UnorderedList,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import PostTag from '@/components/PostTag';
import { shortInternationalTime, toNum, toStr } from '@sungryeol/lib';
import parse from 'html-react-parser';
import { ChangeEventHandler, useMemo } from 'react';
import _debounce from 'lodash/debounce';
import useSearchQuery from '@/hooks/useSearchQuery';
import PostSearchTags from '@/components/PostSearch/Tags';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const PostItem: React.FC<{ hit: AlgoliaHit<IPostHit> }> = ({ hit }) => {
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
            {parse(hit._highlightResult?.title?.value ?? '')}
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
        {parse(hit._snippetResult?.content?.value ?? '')}
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

const Pagination: React.FC<{
  searchResults: AlgoliaSearchResponse<IPostHit>;
}> = ({ searchResults }) => {
  const currentPage = searchResults.page;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const { getPageUrl } = useSearchQuery();
  return (
    <Flex gap={2} justifyContent="center">
      {prevPage < currentPage && prevPage >= 0 && (
        <NextLink href={getPageUrl(prevPage)} passHref>
          <IconButton
            icon={<ArrowBackIcon />}
            as="a"
            aria-label="previous page"
          />
        </NextLink>
      )}
      <Button disabled>{currentPage + 1}</Button>
      {nextPage < searchResults.nbPages && (
        <NextLink href={getPageUrl(nextPage)} passHref>
          <IconButton
            icon={<ArrowForwardIcon />}
            as="a"
            aria-label="next page"
          />
        </NextLink>
      )}
    </Flex>
  );
};

const SearchBox: React.FC<{ defaultValue: string }> = ({ defaultValue }) => {
  const { setKeyword } = useSearchQuery();
  const debouncedOnChange = useMemo(
    () => _debounce(setKeyword, 500, { trailing: true }),
    [setKeyword]
  );

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    debouncedOnChange(e?.currentTarget?.value);

  return (
    <InputGroup>
      <InputLeftElement
        children={<Image src="/icons/search-oval.svg" alt="search icon" />}
      />
      <Input
        type="search"
        onChange={onChange}
        className="post-search--search-box"
        placeholder="Search Keywords, 검색어"
        defaultValue={defaultValue}
        sx={{
          '&:focus': {
            boxShadow: '0px 1px 0px 0px black !important',
            borderColor: 'black',
          },
        }}
      />
    </InputGroup>
  );
};

interface IProps {
  searchResults: AlgoliaSearchResponse<IPostHit>;
  tagsResult: AlgoliaTags;
}
const Posts: NextPage<IProps> = ({ searchResults, tagsResult }) => {
  return (
    <>
      <Header title="지식공단 - posts" description="browse postings" />
      <LayoutDefault>
        <Box height="50px" className="margin" />
        <LogoAnimated mx="auto" />
        <SearchBox defaultValue={searchResults.query} />
        <PostSearchTags tagsResult={tagsResult} />
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
          {searchResults.hits.map((hit) => (
            <PostItem hit={hit} key={hit.objectID} />
          ))}
        </UnorderedList>
        <Pagination searchResults={searchResults} />
      </LayoutDefault>
    </>
  );
};

// https://codesandbox.io/s/7pejpz?file=/pages/index.tsx
export const getServerSideProps: GetServerSideProps = async (context) => {
  const q = toStr(context?.query?.q);
  const tags = toStr(context.query.tag).split(',');
  const page = toNum(context.query.page);
  const size = toNum(context.query.size, 8);
  const searchResults = await AlgoliaService.search<IPostHit>(
    'post_updated_at',
    q,
    {
      page,
      itemsPerPage: size,
      tags,
    }
  );
  const tagsResult = await AlgoliaService.searchPostTags('');
  return {
    props: {
      tagsResult,
      searchResults,
    },
  };
};

export default Posts;
