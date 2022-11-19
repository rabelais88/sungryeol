import { PostHit } from '@/types/common';
import { Box, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  InstantSearchProps,
  Pagination,
  RefinementList,
  SearchBox,
} from 'react-instantsearch-dom';
import { PostTagControl } from './PostTag';
import PrettyLink from './PrettyLink';

interface HitComponentProps {
  objectID: string;
  hit: PostHit;
}

const HitComponent: React.FC<HitComponentProps> = ({ hit }) => {
  return (
    <Box>
      <PrettyLink href={`/posts/${hit.objectID}`}>
        <Highlight attribute="title" hit={hit} />
      </PrettyLink>
      <Text>{hit.datePublish}</Text>
      <Highlight attribute="body" hit={hit} />
      <Wrap>
        {hit.tags?.map((tag) => (
          <WrapItem key={tag}>
            <PostTagControl>#{tag}</PostTagControl>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

// https://www.contentful.com/blog/add-algolia-instantsearch-to-nextjs-app/

const FindPosts: React.FC<InstantSearchProps> = (props) => {
  return (
    <InstantSearch {...props}>
      <Configure hitsPerPage={3} />
      <SearchBox />
      <RefinementList attribute="tags" />
      {/** @ts-ignore */}
      <Hits hitComponent={HitComponent} />
      <Pagination />
    </InstantSearch>
  );
};

export default FindPosts;
