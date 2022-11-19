import { MyPage } from '@/types/common';
import { Box } from '@chakra-ui/react';

const Home: MyPage = () => {
  return <Box>index page!</Box>;
};

Home.defaultProps = { bodyPortal: <Box>test!</Box> };
export default Home;
