import { Box, Image } from '@chakra-ui/react';

const MockWindow: React.FC<{ image: string }> = ({ image }) => {
  return (
    <Box
      className="mock-window"
      w="400px"
      maxW="100%"
      boxShadow="0 0 13px rgba(0,0,0,.3)"
      borderRadius="15px"
    >
      <Box
        className="mock-win-title"
        display="block"
        w="100%"
        h="24px"
        sx={{
          '&::before': {
            display: 'block',
            position: 'absolute',
            content: '""',
            bgColor: 'yellow.100',
            borderRadius: '100%',
            border: 'solid 1px #000',
            w: '10px',
            h: '10px',
            t: '50%',
            transform: 'translate(10px,50%)',
          },
        }}
        borderTopRadius="15px"
        border="solid 2px #000"
        position="relative"
      ></Box>
      <Box
        className="mock-win-body"
        borderBottomRadius="15px"
        border="solid 2px #000"
        borderTop="none"
        h="200px"
        position="relative"
        overflowY="hidden"
      >
        <Image
          src={image}
          h="100%"
          w="100%"
          objectFit="cover"
          borderRadius="0"
          className="mock-win-img"
        />
      </Box>
    </Box>
  );
};

export default MockWindow;
