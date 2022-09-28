import LayoutDefault from '@/layout/LayoutDefault';
import type { GetStaticProps, NextPage } from 'next';
import {
  Text,
  VStack,
  Box,
  Heading,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { LinkProps } from 'next/link';
import LogoAnimated from '@/components/LogoAnimated';
import Header from '@/components/Header';
import { PropsWithChildren } from 'react';
import CustomLink from '@/components/CustomLink';
import AlgoliaService, {
  AlgoliaHit,
  AlgoliaSearchResponse,
  AlgoliaTags,
} from '@/services/AlgoliaService';
import { IPostHit } from '@/types';
import parse from 'html-react-parser';
import PostSearchTags from '@/components/PostSearch/Tags';
import DateText from '@/components/DateText';

interface IProps {
  searchResult: AlgoliaSearchResponse<IPostHit>;
  tagsResult: AlgoliaTags;
}

const BigLink: React.FC<PropsWithChildren<LinkProps>> = ({
  href,
  children,
}) => {
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

const Result: React.FC<{ hit: AlgoliaHit<IPostHit> }> = ({ hit }) => {
  return (
    <ListItem w="100%" className="post-item" display="flex" alignItems="center">
      <CustomLink href={`/posts/${hit.uid}`}>
        <Text as="em">{parse(hit._highlightResult?.title?.value ?? '')}</Text>
      </CustomLink>
      <Box
        flex="1"
        display="inline-block"
        borderBottom="dashed 1px black"
        h="1px"
        mx="10px"
      />
      <DateText
        render={(strDate) => <Text>{strDate}</Text>}
        value={hit.dateOverride || hit.updatedAt}
      />
    </ListItem>
  );
};

const PostSearchResults: React.FC<{
  searchResult: AlgoliaSearchResponse<IPostHit>;
}> = ({ searchResult }) => {
  return (
    <UnorderedList
      styleType="none"
      className="search-results"
      marginInlineStart="none"
      w="100%"
      sx={{
        '.search-result-item + .search-result-item': {
          borderTop: 'solid 1px black',
        },
      }}
    >
      {searchResult.hits.map((hit) => (
        <Result hit={hit} key={hit.objectID} />
      ))}
    </UnorderedList>
  );
};

const Home: NextPage<IProps> = ({ searchResult, tagsResult }) => {
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
        <BigLink href="/works">WORK</BigLink>
        <BigLink href="/contact">CONTACT</BigLink>
        <Box h="50px" />
        <Heading fontFamily="HammerSmith One">RECENT ARTICLES</Heading>
        <PostSearchResults searchResult={searchResult} />
        <PostSearchTags tagsResult={tagsResult} />
        <CustomLink href="/posts" fontFamily="Hammersmith One">
          More Articles...
        </CustomLink>
      </VStack>
    </LayoutDefault>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const searchResult = await AlgoliaService.search('post_updated_at', '', {
    page: 0,
    itemsPerPage: 5,
  });

  const tagsResult = await AlgoliaService.searchPostTags('');

  return {
    props: {
      searchResult,
      tagsResult,
    },
    revalidate: 9,
  };
};

export default Home;
