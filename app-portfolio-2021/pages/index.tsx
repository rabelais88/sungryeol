import PostSearch, { SearchResults } from '@/components/PostSearch';
import LayoutDefault from '@/layout/LayoutDefault';
import type { NextPage } from 'next';
import { Text, VStack, Link } from '@chakra-ui/react';
import NextLink, { LinkProps } from 'next/link';
import LogoAnimated from '@/components/LogoAnimated';
import Header from '@/components/Header';

interface IProps {
  // tags: ReturnPromiseType<typeof getTags>;
  // posts: ReturnPromiseType<typeof getPosts>;
}

const BigLink: React.FC<LinkProps> = ({ href, children }) => {
  return (
    <NextLink href={href} passHref>
      <Link
        fontFamily="Hammersmith One, sans-serif"
        fontSize="24px"
        lineHeight="150%"
      >
        {children}
      </Link>
    </NextLink>
  );
};

const Home: NextPage<IProps> = ({}) => {
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
      </VStack>
      <PostSearch>
        <SearchResults />
      </PostSearch>
    </LayoutDefault>
  );
};

export default Home;
