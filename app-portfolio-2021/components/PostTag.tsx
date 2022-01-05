import { chakra, Tag } from '@chakra-ui/react';
const PostTag = chakra(Tag, {
  baseStyle: {
    size: 'lg',
    borderRadius: 'full',
    color: 'black',
    fontWeight: 200,
  },
});

export default PostTag;
