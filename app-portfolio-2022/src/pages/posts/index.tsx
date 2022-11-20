import { Post } from '.tina/__generated__/types';
import AppLink from '@/components/AppLink';
import DateText from '@/components/DateText';
import LogoGeometry from '@/components/icons/LogoGeometry';
import SearchBox from '@/components/post/SearchBox';
import { PostTagControl } from '@/components/PostTag';
import PrettyLink from '@/components/PrettyLink';
import { toStr } from '@/lib';
import { algoliaClient } from '@/lib/algolia';
import { useQueryRoute } from '@/lib/hooks';
import { MyPage } from '@/types/common';
import {
  Hit,
  SearchForFacetValuesResponse,
  SearchResponse,
} from '@algolia/client-search';
import {
  Box,
  Center,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  useColorMode,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { toNum } from '@sungryeol/lib';
import htmlParse from 'html-react-parser';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

interface PostsPageProps {
  searchResults: SearchResponse<Post>;
  tagsResult: SearchForFacetValuesResponse;
  searchForFacetValuesResponse: SearchForFacetValuesResponse;
}
type PostHit = Hit<Post>;

const PostItem: React.FC<{ hit: PostHit }> = ({ hit }) => {
  const { colorMode } = useColorMode();
  const { setTag, clearTags, hasTag } = useQueryRoute();
  return (
    <ListItem
      className="post-item"
      pt="9px"
      pb="30px"
      sx={{
        '& em': {
          bgColor: colorMode === 'light' ? 'bg-yellow' : 'bg-pink',
          color: colorMode === 'light' ? 'black' : 'white',
        },
        '.post-item + &': {
          borderTop: 'solid 1px black',
        },
        '@media(max-width: 700px)': {
          '.top-area > span': {
            display: 'block',
            mb: '9px',
          },
          '& > *:not(.top-area)': {
            ml: '0',
          },
        },
      }}
    >
      <Box mb="9px" className="top-area" flexDir="row">
        <DateText
          value={hit.datePublish}
          render={(str) => (
            <Text w="100px" as="span" display="inline-block">
              {str}
            </Text>
          )}
        />
        <PrettyLink
          href={`/posts/${hit.objectID}`}
          fontWeight="bold"
          noUnderline
        >
          {htmlParse(hit._highlightResult?.title?.value as string)}
        </PrettyLink>
      </Box>
      <Text ml="100px" mb="30px">
        {htmlParse(hit._snippetResult?.body?.value as string)}
      </Text>
      <Wrap ml="100px">
        {hit.tags?.map((tag = '') => (
          <WrapItem key={tag}>
            <PostTagControl
              active={hasTag(tag ?? '')}
              onClick={() => {
                if (hasTag(tag ?? '')) return clearTags();
                setTag(tag ?? '');
              }}
            >
              #{tag}
            </PostTagControl>
          </WrapItem>
        ))}
      </Wrap>
    </ListItem>
  );
};

const Pagination: React.FC<{
  searchResults: PostsPageProps['searchResults'];
}> = ({ searchResults }) => {
  const router = useRouter();
  const pages = Array.from({ length: searchResults.nbPages }).map((_, i) => i);
  return (
    <Wrap>
      {pages.map((i) => (
        <WrapItem key={i} w="72px">
          <PrettyLink
            textAlign="center"
            w="100%"
            href={{ query: { ...router.query, page: i } }}
            disabled={i === toNum(router.query.page, 0)}
          >
            {toStr(i + 1)}
          </PrettyLink>
        </WrapItem>
      ))}
    </Wrap>
  );
};

const PostsPage: MyPage<PostsPageProps> = ({
  searchResults,
  searchForFacetValuesResponse,
}) => {
  const { setTag, hasTag, clearTags } = useQueryRoute();
  return (
    <Box className="posts-page">
      <Center>
        <AppLink href="/">
          <LogoGeometry w="160px" h="68px" />
        </AppLink>
      </Center>
      <Heading fontFamily="Title" fontSize="18" textAlign="center" mb="10px">
        Top 20 Tags
      </Heading>
      <Center>
        <Wrap mb="10px">
          {searchForFacetValuesResponse.facetHits.map((facetHit) => (
            <WrapItem key={facetHit.value}>
              <PostTagControl
                onClick={() => {
                  if (hasTag(facetHit.value)) return clearTags();
                  setTag(facetHit.value);
                }}
                active={hasTag(facetHit.value)}
              >
                #{facetHit.value}{' '}
                <Text
                  as="span"
                  fontSize=".8em"
                  color="gray.400"
                  fontWeight="500"
                >
                  {facetHit.count}
                </Text>
              </PostTagControl>
            </WrapItem>
          ))}
        </Wrap>
      </Center>
      <SearchBox />
      <UnorderedList listStyleType="none" marginInlineStart="0px">
        {searchResults.hits.map((hit) => (
          <PostItem key={hit.objectID} hit={hit} />
        ))}
      </UnorderedList>
      <Center>
        <Pagination searchResults={searchResults} />
      </Center>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postIndex = algoliaClient.initIndex('post');
  const q = toStr(context.query.q);
  const tags = toStr(context.query.tags)
    .split(',')
    .filter((t) => t !== '');
  const page = toNum(context.query.page);
  const size = toNum(context.query.size, 5);
  const tagsSize = toNum(context.query.tagsize, 20);
  const searchResults = await postIndex.search(q, {
    page,
    facetFilters: tags.map((t) => `tags:${t}`),
    hitsPerPage: size,
    attributesToHighlight: ['title'],
    attributesToSnippet: ['title:15', 'body:80'],
  });
  const searchForFacetValuesResponse = await postIndex.searchForFacetValues(
    'tags',
    '',
    {
      maxFacetHits: tagsSize,
      attributesToHighlight: [],
    }
  );
  return { props: { searchResults, searchForFacetValuesResponse } };
};

export default PostsPage;
