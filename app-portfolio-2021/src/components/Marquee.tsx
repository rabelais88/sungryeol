import { Box, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { PropsWithChildren } from 'react';
const MarqueeBar: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Box className="marquee-bar">
      <NextLink href="https://github.com/rabelais88" passHref>
        <Link
          className="marquee"
          position="relative"
          zIndex="1299"
          width="100%"
          maxW="100%"
          overflow="hidden"
          height="30px"
          bgColor="pink.400"
          sx={{
            '.track': {
              position: 'absolute',
              whiteSpace: 'nowrap',
              lineHeight: '30px',
              color: 'white',
            },
          }}
          display="flex"
        >
          <Box className="track" animation="marquee 10s linear infinite">
            {children}
          </Box>
          <Box
            className="track"
            animation="marquee2 10s linear infinite"
            position="absolute"
          >
            {children}
          </Box>
        </Link>
      </NextLink>
    </Box>
  );
};

export default MarqueeBar;
