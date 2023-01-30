import {
  Box,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { useState } from 'react';

const MockPhone: React.FC<{ image: string }> = ({ image }) => {
  const [open, setOpen] = useState(false);
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
