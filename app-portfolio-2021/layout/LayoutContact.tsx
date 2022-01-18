import { Container } from '@chakra-ui/react';
const LayoutContact: React.FC = ({ children }) => {
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
