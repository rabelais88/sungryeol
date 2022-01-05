import {
  Box,
  Image,
  IconButton,
  HStack,
  LinkBox,
  LinkOverlay,
  Center,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import IconMenu from './icons/IconMenu';
import IconSearch from './icons/IconSearch';

interface ITopBarProps {
  visible?: boolean;
  onMenuToggle?: () => void;
}

const TopBar: React.FC<ITopBarProps> = ({
  visible = true,
  onMenuToggle = () => {},
}) => {
  return (
    <Box
      bgColor="yellow.100"
      className="top-bar"
      h="50px"
      left="0"
      right="0"
      position="fixed"
      borderBottom="solid 1px black"
    >
      <HStack h="100%" ml="18px">
        <IconButton
          borderRadius="0"
          aria-label="open or close menu"
          icon={<IconMenu w="32px" h="32px" />}
          variant="ghost"
          height="100%"
          _hover={{
            bgColor: 'black',
            '.chakra-icon': {
              fill: 'black',
              path: {
                fill: 'white',
              },
            },
          }}
          onClick={() => onMenuToggle()}
        />
        <LinkBox
          _hover={{
            bgColor: 'black',
            '.chakra-icon': {
              fill: 'black',
              path: {
                fill: 'white',
              },
            },
          }}
          h="100%"
          w="40px"
        >
          <NextLink href="/posts" passHref>
            <LinkOverlay
              h="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <IconSearch />
            </LinkOverlay>
          </NextLink>
        </LinkBox>
      </HStack>
      <Image
        src="/logo-text.svg"
        alt="text logo for this blog"
        position="absolute"
        right="29px"
        top="16px"
      />
    </Box>
  );
};

export default TopBar;
