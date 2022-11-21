import { mergeClass } from '@/lib';
import { Button, chakra, Tag, TagProps, useColorMode } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
const PostTag: React.FC<PropsWithChildren<TagProps>> = ({ children }) => {
  const { colorMode } = useColorMode();
  return (
    <Tag
      borderRadius="full"
      fontWeight="400"
      color={colorMode === 'light' ? 'black' : 'white'}
    >
      {children}
    </Tag>
  );
};

interface IPostTagControl extends TagProps {
  active?: boolean;
}

export const PostTagControl: React.FC<PropsWithChildren<IPostTagControl>> = ({
  children,
  active,
  ...props
}) => {
  const { colorMode } = useColorMode();
  return (
    <Button
      {...mergeClass('post-tag-control', active && 'active')}
      variant="unstyled"
      fontWeight="400"
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
          bgColor: colorMode === 'light' ? 'black' : 'white',
          color: colorMode === 'light' ? 'white' : 'black',
          fontWeight: 'bold',
        },
      }}
      _focus={{
        // shadow: 'outline',
        outline: 'none',
        boxShadow: 'inset 0 0 0 2px rgb(0,0,255,.3)',
      }}
      _hover={{
        bgColor: colorMode === 'light' ? 'yellow.100' : 'bg-pink',
        color: colorMode === 'light' ? 'black' : 'white',
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PostTag;
