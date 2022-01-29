import React from 'react';
import { Box, BoxProps, chakra, keyframes } from '@chakra-ui/react';
import CircularSvgLogo from './CircularSvgLogo';
import LogoGeometry from '../icons/LogoGeometry';

const SvgBg = chakra(CircularSvgLogo);

const rotate = keyframes`
  to{ transform: rotate(360deg); }
`;

const Loading: React.FC<BoxProps> = (props) => {
  return (
    <Box
      position="relative"
      className="loading"
      w="150px"
      h="150px"
      display="block"
      {...props}
    >
      <SvgBg
        w="150px"
        h="150px"
        className="svg-bg"
        animation={`${rotate} infinite 4s linear`}
      />
      <LogoGeometry
        w="128px"
        h="54.4px"
        left="50%"
        top="50%"
        transform="translate(-50%,-50%)"
        position="absolute"
      />
    </Box>
  );
};

export default Loading;
