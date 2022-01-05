import PostSearch from '@/components/PostSearch';
import LayoutDefault from '@/layout/LayoutDefault';
import { getPosts } from '@/services/PostService';
import { getTags } from '@/services/TagService';
import { ReturnPromiseType } from '@/types';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import {
  Text,
  Image,
  Center,
  VStack,
  Link,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import NextLink, { LinkProps } from 'next/link';
import PostTag from '@/components/PostTag';

interface IProps {
  tags: ReturnPromiseType<typeof getTags>;
  posts: ReturnPromiseType<typeof getPosts>;
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

const Home: NextPage<IProps> = ({ tags, posts }) => {
  return (
    <div>
      <Head>
        <title>지식공단 - Sungryeol</title>
        <meta name="description" content="home of sungryeol's blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutDefault>
        <VStack spacing="10px" mt="30px">
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
        <Wrap spacing="10px" justify="center" mt="20px">
          {tags?.tags?.data?.map((tag) => (
            <WrapItem key={tag.attributes.key}>
              <PostTag>{tag.attributes.label.toUpperCase()}</PostTag>
            </WrapItem>
          ))}
        </Wrap>
        <Text textAlign="center" mt="20px" mb="20px">
          tags: {tags.tags.meta.pagination.total}
        </Text>
        <PostSearch />
        {/* {posts?.data?.map((post) => (
          <a href={`/posts/${post.attributes.uid}`} key={post?.attributes?.uid}>
            {post?.attributes?.title}
          </a>
        ))} */}
      </LayoutDefault>
    </div>
  );
};

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const tags = await getTags();
  const posts = await getPosts({ keyword: '' });
  return { props: { tags, posts } };
};

export default Home;
