import { Container } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
const LayoutDefault: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Container className="layout-default" maxW="700px" pb="50px">
      {children}
    </Container>
  );
};

export default LayoutDefault;
