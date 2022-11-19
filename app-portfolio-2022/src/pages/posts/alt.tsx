import { Post } from '.tina/__generated__/types';
import IconSearch from '@/components/icons/IconSearch';
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
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  Text,
  UnorderedList,
  useColorMode,
} from '@chakra-ui/react';
import { toNum } from '@sungryeol/lib';
import htmlParse from 'html-react-parser';
import { GetServerSideProps } from 'next';
import { useMemo } from 'react';
import _debounce from 'lodash/debounce';
import LogoGeometry from '@/components/icons/LogoGeometry';

interface PostsPageProps {
  searchResults: SearchResponse<Post>;
  tagsResult: SearchForFacetValuesResponse;
}
type PostHit = Hit<Post>;

const PostItem: React.FC<{ hit: PostHit }> = ({ hit }) => {
  const { colorMode } = useColorMode();
  const { addTag, removeTag, hasTag } = useQueryRoute();
  return (
    <ListItem
      className="post-item"
      py="9px"
      sx={{
        '& em': {
          bgColor: colorMode === 'light' ? 'bg-yellow' : 'bg-pink',
          color: colorMode === 'light' ? 'black' : 'white',
        },
        '.post-item + &': {
          borderTop: 'solid 1px black',
        },
      }}
    >
      <PrettyLink href={`/posts/${hit.objectID}`}>
        {htmlParse(hit._snippetResult?.title?.value as string)}
      </PrettyLink>
      <Text>{htmlParse(hit._snippetResult?.body?.value as string)}</Text>
      {hit.tags?.map((tag = '') => (
        <PostTagControl
          key={tag}
          active={hasTag(tag ?? '')}
          onClick={() => {
            if (hasTag(tag ?? '')) return removeTag(tag ?? '');
            addTag(tag ?? '');
          }}
        >
          {tag}
        </PostTagControl>
      ))}
      <Text>{hit.datePublish}</Text>
      {/* {<PostTagControl>{htmlParse(hit._highlightResult?.tags)}</PostTagControl>} */}
    </ListItem>
  );
};

const SearchBox = () => {
  const { keyword, setKeyword } = useQueryRoute();
  const debouncedSetKeyword = useMemo(
    () => _debounce(setKeyword, 200, { trailing: true }),
    []
  );

  return (
    <InputGroup>
      <Input
        type="search"
        defaultValue={keyword}
        onChange={(ev) => {
          debouncedSetKeyword(ev.target.value);
        }}
        placeholder={'keyword / 키워드'}
        sx={{
          _placeholder: {
            color: 'gray.300',
          },
          '&::-webkit-search-cancel-button': {
            height: '1em',
            width: '1em',
            borderRadius: '50em',
            background: `url(https://pro.fontawesome.com/releases/v5.10.0/svgs/solid/times-circle.svg) no-repeat 50% 50%`,
            backgroundSize: 'contain',
            opacity: 0,
            pointerEvents: 'none',
          },
        }}
      />
      <InputRightElement>
        <IconButton
          variant="ghost"
          sx={{ borderRadius: 0 }}
          aria-label="search"
        >
          <IconSearch />
        </IconButton>
      </InputRightElement>
    </InputGroup>
  );
};

const PostsPage: MyPage<PostsPageProps> = ({ searchResults }) => {
  return (
    <Box className="posts-page">
      <LogoGeometry w="160px" h="68px" />
      <SearchBox />
      <UnorderedList listStyleType="none" marginInlineStart="0px">
        {searchResults.hits.map((hit) => (
          <PostItem key={hit.objectID} hit={hit} />
        ))}
      </UnorderedList>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postIndex = algoliaClient.initIndex('post');
  const q = toStr(context.query.q);
  const tags = toStr(context.query.tag).split(',');
  const page = toNum(context.query.page);
  const size = toNum(context.query.size, 3);
  const searchResults = await postIndex.search(q, {
    page,
    tags,
    hitsPerPage: size,
  });
  return { props: { searchResults } };
};

export default PostsPage;
