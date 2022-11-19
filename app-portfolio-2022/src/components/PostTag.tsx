import { mergeClass } from '@/lib';
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
      {...mergeClass('post-tag-control', active && 'active')}
      variant="unstyled"
      fontWeight="200"
      cursor="pointer"
      borderRadius="full"
      border="solid 1px #718096"
      fontSize="13px"
      height="inherit"
      minH="1.5rem"
      minW="1.5rem"
      paddingLeft="5px"
      paddingRight="5px"
      sx={{
        '&.active': {
          bgColor: 'black',
          color: 'white',
          fontWeight: 'bold',
        },
      }}
      _focus={{
        // shadow: 'outline',
        outline: 'none',
        boxShadow: 'inset 0 0 0 2px rgb(0,0,255,.3)',
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
