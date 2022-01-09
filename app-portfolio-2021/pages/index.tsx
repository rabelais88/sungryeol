import PostSearch, { SearchResults } from '@/components/PostSearch';
import LayoutDefault from '@/layout/LayoutDefault';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Text, Image, Center, VStack, Link } from '@chakra-ui/react';
import NextLink, { LinkProps } from 'next/link';

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
      <Head>
        <title>지식공단 - Sungryeol</title>
        <meta property="og:title" content="지식공단"></meta>
        <meta
          name="description"
          property="og:description"
          content="home of sungryeol's blog"
        />
      </Head>
      <VStack spacing="10px" mt="30px" mb="40px">
        <Text
          letterSpacing="-0.085em"
          fontSize="20px"
          lineHeight="130%"
          textAlign="center"
        >
          박성렬 블로그 &amp; 포트폴리오
        </Text>
        <Center>
          <Image src="/logo-geometry.svg" alt="geometric logo of this blog" />
        </Center>
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
