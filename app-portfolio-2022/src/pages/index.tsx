import { Post } from '.tina/__generated__/types';
import PostItem from '@/components/home/PostItem';
import LogoAnimated from '@/components/LogoAnimated';
import PrettyLink from '@/components/PrettyLink';
import { algoliaClient } from '@/lib/algolia';
import { MyPage } from '@/types/common';
import { SearchResponse } from '@algolia/client-search';
import { Box, Center, Heading, List, Text, VStack } from '@chakra-ui/react';
import { GetStaticProps } from 'next';

interface HomeProps {
  searchResponse: SearchResponse<Post>;
}

const Home: MyPage<HomeProps> = ({ searchResponse }) => {
  return (
    <Box className="home">
      <VStack spacing="10px" mt="30px" mb="40px">
        <Text
          letterSpacing="-0.085em"
          fontSize="20px"
          lineHeight="130%"
          textAlign="center"
        >
          박성렬 블로그 &amp; 포트폴리오
        </Text>
        <LogoAnimated mx="auto" />
        <PrettyLink href="/works">WORK</PrettyLink>
        <PrettyLink href="/contact">CONTACT</PrettyLink>
      </VStack>

      <Heading textAlign="center" mb="30px" fontFamily="Title">
        RECENT ARTICLES
      </Heading>
      <List
        sx={{
          '& .post-item + .post-item': { mt: '15px' },
        }}
      >
        {searchResponse?.hits?.map((hit) => (
          <PostItem key={hit.objectID} hit={hit} />
        ))}
      </List>
      <Center mt="30px">
        <PrettyLink fontFamily="Title" href="/posts">
          Read More Articles...
        </PrettyLink>
      </Center>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const index = await algoliaClient.initIndex('post');
  const searchResponse = await index.search('', {
    attributesToRetrieve: ['title', 'datePublish'],
    attributesToHighlight: [],
    attributesToSnippet: [],
    hitsPerPage: 7,
    page: 0,
  });

  return { props: { searchResponse } };
};

// Home.defaultProps = { bodyPortal: <Box>test!</Box> };
Home.defaultProps = { pageDescription: 'index page of portfolio & weblog' };
export default Home;
