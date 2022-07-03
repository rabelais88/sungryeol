import { Container } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
const LayoutContact: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Container
      className="layout-contact"
      maxW="700px"
      sx={{ '& > h1, & > p': { textAlign: 'center' } }}
      pb="50px"
    >
      {children}
    </Container>
  );
};

export default LayoutContact;
