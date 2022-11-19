import { Box, Image } from '@chakra-ui/react';

const MockPhone: React.FC<{ image: string }> = ({ image }) => {
  return (
    <Box
      className="mock-phone"
      borderRadius="20px"
      w="100px"
      h="173px"
      display="block"
      overflowY="hidden"
      position="relative"
      border="solid 4px #000"
      boxShadow="0 0 13px rgba(0,0,0,.3)"
      sx={{
        '&::after': {
          // notch
          display: 'block',
          position: 'absolute',
          top: 0,
          left: '50%',
          bgColor: '#000',
          content: '""',
          w: '35px',
          h: '13px',
          transform: 'translateX(-50%)',
          borderBottomRadius: '10px',
        },
      }}
    >
      <Image src={image} h="100%" />
    </Box>
  );
};

export default MockPhone;
