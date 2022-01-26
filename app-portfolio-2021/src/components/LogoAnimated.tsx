import { AnimatePresence, motion } from 'framer-motion';
import { Box, BoxProps, Image } from '@chakra-ui/react';
const MotionBox = motion(Box);
const ImageBox = motion(Image);

const LogoAnimated: React.FC<BoxProps> = (props) => {
  return (
    <Box
      w="160px"
      h="68px"
      overflowX="hidden"
      position="relative"
      {...props}
      className="logo-animated"
    >
      <AnimatePresence>
        <MotionBox
          position="absolute"
          initial="hidden"
          whileInView="visible"
          h="100%"
          w="160px"
          overflow="hidden"
          borderBottomStyle="solid"
          borderBottomColor="black"
          variants={{
            hidden: {
              left: '-160px',
              opacity: 0,
              borderBottomWidth: '1px',
              transition: {
                when: 'afterChildren',
                duration: 0.4,
                ease: 'easeIn',
              },
            },
            visible: {
              left: '0px',
              opacity: 1,
              borderBottomWidth: '0px',
              transition: {
                when: 'beforeChildren',
                duration: 0.4,
                ease: 'easeIn',
              },
            },
          }}
        >
          <ImageBox
            src="/logo-geometry.svg"
            alt="geometric logo of blog"
            position="absolute"
            variants={{
              hidden: { bottom: '-68px', scale: 0.5 },
              visible: { bottom: '0px', scale: 1 },
              transition: { duration: 1, ease: 'easeIn' },
            }}
          />
        </MotionBox>
      </AnimatePresence>
    </Box>
  );
};

export default LogoAnimated;
