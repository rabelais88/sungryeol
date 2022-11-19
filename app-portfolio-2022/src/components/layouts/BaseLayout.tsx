import { Container, Box } from '@chakra-ui/react';

const BaseLayout: PageLayout = ({ children }) => {
  return (
    <Box data-layout="base-layout">
      <Container maxW="700" pb="50px" pt="70px">
        {children}
      </Container>
    </Box>
  );
};

export default BaseLayout;
