import { Button, chakra, Tag, TagProps } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
const PostTag = chakra(Tag, {
  baseStyle: {
    borderRadius: 'full',
    color: 'black',
    fontWeight: 200,
  },
});

interface IPostTagControl extends TagProps {
  active?: boolean;
}

export const PostTagControl: React.FC<PropsWithChildren<IPostTagControl>> = ({
  children,
  active,
  ...props
}) => {
  return (
    <Button
      className={['post-tag-control', active ? 'active' : ''].join(' ')}
      variant="unstyled"
      fontWeight="200"
      cursor="pointer"
      borderRadius="full"
      border="solid 1px #718096"
      fontSize="sm"
      height="inherit"
      minH="1.5rem"
      minW="1.5rem"
      paddingLeft="5px"
      paddingRight="5px"
      sx={{
        '&.active': {
          bgColor: 'black',
          color: 'white',
        },
      }}
      _focus={{
        shadow: 'outline',
      }}
      _hover={{
        bgColor: 'yellow.100',
        color: 'black',
        fontWeight: 200,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PostTag;
