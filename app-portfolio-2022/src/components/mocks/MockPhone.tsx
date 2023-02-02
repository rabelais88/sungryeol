import {
  Box,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  useColorMode,
} from '@chakra-ui/react';
import { useState } from 'react';

const MockPhone: React.FC<{ image: string }> = ({ image }) => {
  const [open, setOpen] = useState(false);
  const { colorMode } = useColorMode();
  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <Image src={image} />
        </ModalContent>
      </Modal>
      <Box
        onClick={() => setOpen(true)}
        className="mock-phone"
        borderRadius="20px"
        w="100px"
        h="173px"
        display="block"
        overflowY="hidden"
        position="relative"
        borderWidth="4px"
        borderStyle="solid"
        borderColor={colorMode === 'light' ? '#000' : 'gray'}
        boxShadow="0 0 13px rgba(0,0,0,.3)"
        cursor="pointer"
        sx={{
          '&::after': {
            // notch
            display: 'block',
            position: 'absolute',
            top: 0,
            left: '50%',
            bgColor: colorMode === 'light' ? '#000' : 'gray',
            content: '""',
            w: '35px',
            h: '10px',
            transform: 'translateX(-50%)',
            borderBottomRadius: '8px',
          },
        }}
      >
        <Image
          src={image}
          h="auto"
          className="mock-phone-img"
          w="100%"
          objectFit="cover"
        />
      </Box>
    </>
  );
};

export default MockPhone;
