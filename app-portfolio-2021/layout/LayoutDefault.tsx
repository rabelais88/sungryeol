import { Container } from '@chakra-ui/react';
const LayoutDefault: React.FC = ({ children }) => {
  return (
    <Container className="layout-default" maxW="700px">
      {children}
    </Container>
  );
};

export default LayoutDefault;
