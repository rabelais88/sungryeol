import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { useHits, Highlight } from 'react-instantsearch-hooks-web';
import { Hit, BaseHit } from 'instantsearch.js';
import CustomLink from '@/components/CustomLink';
import { IPostHit } from '@/types';
import DateText from '../DateText';

type PostHit = Hit<BaseHit & IPostHit>;

interface IResultProps {
  hit: PostHit;
}
const PostSearchResultDetail: React.FC<IResultProps> = ({ hit }) => {
  return (
    <ListItem w="100%" className="post-item" display="flex" alignItems="center">
      <CustomLink href={`/posts/${hit.uid}`}>
        <Text as="em">
          <Highlight hit={hit} attribute="title" />
        </Text>
      </CustomLink>
      <Box
        flex="1"
        display="inline-block"
        borderBottom="dashed 1px black"
        h="1px"
        mx="10px"
      />
      <DateText
        render={(formattedDate) => <Text>{formattedDate}</Text>}
        value={hit.updatedAt}
      />
    </ListItem>
  );
};

export default PostSearchResultDetail;
