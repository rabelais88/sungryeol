import { chakra, Tag, TagProps } from '@chakra-ui/react';
const PostTag = chakra(Tag, {
  baseStyle: {
    size: 'lg',
    borderRadius: 'full',
    color: 'black',
    fontWeight: 200,
  },
});

interface IPostTagControl extends TagProps {
  active?: boolean;
}

export const PostTagControl: React.FC<IPostTagControl> = ({
  children,
  active,
  ...props
}) => {
  return (
    <PostTag
      className={['post-tag-control', active ? 'active' : ''].join(' ')}
      cursor="pointer"
      sx={{
        '&.active': {
          bgColor: 'black',
          color: 'white',
          fontWeight: 400,
        },
      }}
      _hover={{
        bgColor: 'black',
        color: 'white',
        fontWeight: 400,
      }}
      {...props}
    >
      {children}
    </PostTag>
  );
};

export default PostTag;
