import { Box, Tabs, Slide, TabList, Tab, VStack } from '@chakra-ui/react';
import LogoGeometry from './icons/LogoGeometry';

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
      <Box bgColor="yellow.100" maxW="228px" w="100%" h="100%" pt="50px">
        <VStack p="29px">
          <LogoGeometry w="160px" h="68px" mx="auto" />
          <Tabs orientation="vertical">
            <TabList mt="30px" sx={{}}>
              <Tab>Post</Tab>
              <Tab>Work</Tab>
              <Tab>Contact</Tab>
            </TabList>
          </Tabs>
        </VStack>
      </Box>
    </Slide>
  );
};

export default Menu;
