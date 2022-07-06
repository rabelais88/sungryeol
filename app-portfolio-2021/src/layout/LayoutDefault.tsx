import { Container, ContainerProps } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
const LayoutDefault: React.FC<PropsWithChildren<ContainerProps>> = ({
  children,
  ...props
}) => {
  return (
    <Container className="layout-default" maxW="700px" pb="50px" {...props}>
      {children}
    </Container>
  );
};

export default LayoutDefault;
