import { shortInternationalTime } from '@sungryeol/lib/dist';
import { IPostHit } from '@/types';
import { Box, Link, ListItem, Text } from '@chakra-ui/react';
import { Hit } from 'react-instantsearch-core';
import { Highlight } from 'react-instantsearch-dom';
import NextLink from 'next/link';

const PostItem: React.FC<{ hit: Hit<IPostHit> }> = ({ hit }) => {
  return (
    <ListItem w="100%" className="post-item" display="flex" alignItems="center">
      <NextLink href={`/posts/${hit.uid}`} passHref>
        <Link
          fontWeight="600"
          overflowX="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          <Highlight hit={hit} attribute="title" tagName="em" />
        </Link>
      </NextLink>
      <Box
        flex="1"
        display="inline-block"
        borderBottom="dashed 1px black"
        h="1px"
        mx="10px"
      />
      <Text>{shortInternationalTime(new Date(hit.updatedAt))}</Text>
    </ListItem>
  );
};

export default PostItem;
