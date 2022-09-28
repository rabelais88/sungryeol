import { Box, useMediaQuery, VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import LogoGeometry from './icons/LogoGeometry';
import MenuTab from './MenuTab';

interface IProps {
  visible?: boolean;
}

const MotionBox = motion(Box);

const Menu: React.FC<IProps> = ({ visible = false }) => {
  const [isLargerThanTablet] = useMediaQuery('(min-width: 960px)'); // same as breakpoint.lg
  if (isLargerThanTablet)
    return (
      <Box
        position="fixed"
        left="0"
        width={visible ? '300px' : '0px'}
        top="0"
        bottom="0"
        zIndex="1300"
      >
        <AnimatePresence>
          {visible && (
            <MotionBox
              as="nav"
              bgColor="bg-yellow"
              p="29px"
              className="menu"
              height="100%"
              key="menu"
              position="absolute"
              width="300px"
              initial="hide"
              animate="show"
              exit="hide"
              variants={{
                show: { left: '0px' },
                hide: { left: '-300px' },
              }}
            >
              <Box height="50px" className="margin" />
              <LogoGeometry w="160px" h="68px" mx="auto" display="block" />
              <VStack alignItems="flex-start" mt="20px">
                <MenuTab href="/posts">posts</MenuTab>
                <MenuTab href="/works">work</MenuTab>
                <MenuTab href="/contact">contact</MenuTab>
              </VStack>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
    );

  // mobile
  return (
    <Box
      position="fixed"
      left="0"
      width={visible ? '100vw' : '0px'}
      top="0"
      bottom="0"
      zIndex="1300"
    >
      <AnimatePresence>
        {visible && (
          <MotionBox
            as="nav"
            bgColor="bg-yellow"
            p="29px"
            className="menu"
            height="100%"
            key="menu-mobile"
            position="absolute"
            width="100vw"
            initial="hide"
            animate="show"
            exit="hide"
            variants={{
              show: { left: '0px' },
              hide: { left: '-100vw' },
            }}
          >
            <Box height="50px" className="margin" />
            <LogoGeometry w="160px" h="68px" mx="auto" display="block" />
            <VStack alignItems="flex-start" mt="20px">
              <MenuTab href="/posts">posts</MenuTab>
              <MenuTab href="/works">work</MenuTab>
              <MenuTab href="/contact">contact</MenuTab>
            </VStack>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Menu;
