import { IPostHit } from '@/types';
import { UnorderedList } from '@chakra-ui/react';
import { Hit } from 'react-instantsearch-core';
import { connectHits } from 'react-instantsearch-dom';
import PostItem from './PostItem';

const PostItems = connectHits<Hit<IPostHit>>(({ hits }) => {
  return (
    <UnorderedList
      styleType="none"
      className="post-items"
      marginInlineStart="none"
      w="100%"
      sx={{
        '.post-item + .post-item': {
          marginTop: '5px',
        },
      }}
    >
      {hits.map((hit) => (
        <PostItem hit={hit} key={hit.objectID} />
      ))}
    </UnorderedList>
  );
});

export default PostItems;
