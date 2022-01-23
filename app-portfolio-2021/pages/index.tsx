// import PostSearch, { SearchResults } from '@/components/PostSearch';
import LayoutDefault from '@/layout/LayoutDefault';
import type { GetStaticProps, NextPage } from 'next';
import {
  Text,
  VStack,
  Link,
  Heading,
  Wrap,
  WrapItem,
  Box,
} from '@chakra-ui/react';
import NextLink, { LinkProps } from 'next/link';
import LogoAnimated from '@/components/LogoAnimated';
import Header from '@/components/Header';
import { findResultsState } from 'react-instantsearch-dom/server';
import AlgoliaService from '@/services/AlgoliaService';
import type { SearchState } from 'react-instantsearch-core';
import PostSearchAlt from '@/components/PostSearchAlt/index';
import { useMemo } from 'react';
import { getTags } from '@/services/TagService';
import { PostTagControl } from '@/components/PostTag';
import { ReturnPromiseType } from '@/types';
import { useRouter } from 'next/router';
import CustomLink from '@/components/CustomLink';

interface IProps {
  tags: ReturnPromiseType<typeof getTags>;
  // posts: ReturnPromiseType<typeof getPosts>;
  resultsState: any;
  searchState: SearchState;
}

const BigLink: React.FC<LinkProps> = ({ href, children }) => {
  return (
    <CustomLink
      fontFamily="Hammersmith One, sans-serif"
      fontSize="24px"
      lineHeight="150%"
      href={`${href}`}
    >
      {children}
    </CustomLink>
  );
};

const Home: NextPage<IProps> = ({ resultsState, searchState, tags }) => {
  const { searchClient } = useMemo(() => new AlgoliaService(), []);
  const router = useRouter();
  return (
    <LayoutDefault>
      <Header
        title="지식공단 - Sungryeol"
        description="home of Sungryeol's blog"
      />
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
        <BigLink href="/work">WORK</BigLink>
        <BigLink href="/contact">CONTACT</BigLink>
        <Box h="50px" />
        <PostSearchAlt
          resultsState={resultsState}
          searchState={searchState}
          searchClient={searchClient}
          indexName="post_updated_at"
        />
        <CustomLink href="/posts" fontFamily="Hammersmith One">
          More Articles...
        </CustomLink>
      </VStack>
    </LayoutDefault>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { searchClient } = new AlgoliaService();
  const searchState: SearchState = {};
  const resultsState = await findResultsState(PostSearchAlt, {
    searchClient,
    indexName: 'post_updated_at',
    searchState,
  });
  const tags = await getTags({ pageSize: 100 });
  return {
    props: {
      resultsState: JSON.parse(JSON.stringify(resultsState)),
      searchState,
      tags,
    },
    revalidate: 30,
  };
};

export default Home;
