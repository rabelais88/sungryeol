import { Post } from '.tina/__generated__/types';
import { Hit } from '@algolia/client-search';
import { Box, ListItem, Text, useColorMode } from '@chakra-ui/react';
import DateText from '../DateText';
import PrettyLink from '../PrettyLink';

const PostItem: React.FC<{ hit: Hit<Post> }> = ({ hit }) => {
  const { colorMode } = useColorMode();
  return (
    <ListItem
      w="100%"
      className="post-item"
      display="flex"
      alignItems="center"
      sx={{
        '@media(max-width:700px)': {
          flexDir: 'column-reverse',
          alignItems: 'flex-start',
          '& .dashed-line': { display: 'none' },
          borderTop: 'solid 1px black',
        },
      }}
    >
      <PrettyLink href={`/posts/${hit.objectID}`} noUnderline>
        <Text as="b">{hit.title}</Text>
      </PrettyLink>
      <Box
        className="dashed-line"
        flex="1"
        display="inline-block"
        borderBottomWidth="1px"
        borderBottomStyle="dashed"
        borderBottomColor={colorMode === 'light' ? 'black' : 'white'}
        h="1px"
        mx="10px"
      />
      <DateText
        render={(strDate) => <Text>{strDate}</Text>}
        value={hit.datePublish}
      />
    </ListItem>
  );
};

export default PostItem;
