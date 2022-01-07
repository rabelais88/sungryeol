import { Box, Slide, VStack } from '@chakra-ui/react';
import LogoGeometry from './icons/LogoGeometry';
import MenuTab from './MenuTab';

interface IProps {
  visible?: boolean;
}

const Menu: React.FC<IProps> = ({ visible = false }) => {
  return (
    <Slide
      direction="left"
      in={visible}
      style={{ maxWidth: '228px', zIndex: 1300 }}
    >
      <Box height="50px" className="menu-margin" />
      <Box
        as="nav"
        bgColor="yellow.100"
        maxW="228px"
        w="100%"
        h="100%"
        p="29px"
        className="menu"
      >
        <LogoGeometry w="160px" h="68px" mx="auto" display="block" />
        <VStack alignItems="flex-start" mt="20px">
          <MenuTab href="/posts">posts</MenuTab>
          <MenuTab href="/work">work</MenuTab>
          <MenuTab href="/contact">contact</MenuTab>
        </VStack>
      </Box>
    </Slide>
  );
};

export default Menu;
