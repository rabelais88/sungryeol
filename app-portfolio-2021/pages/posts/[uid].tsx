import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getPost, getPostIndices } from '@/services/PostService';
import { ReturnPromiseType } from '@/types';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import LayoutDefault from '@/layout/LayoutDefault';
import MDXRender from '@/components/MDXRender';
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Link,
  useToast,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import IconShare from '@/components/icons/IconShare';
import copyToClipboard from '@/utils/copyToClipboard';
import Head from 'next/head';

interface IProps {
  post: ReturnPromiseType<typeof getPost>;
  mdxSource: MDXRemoteSerializeResult;
}

const Post: NextPage<IProps> = ({ post, mdxSource }) => {
  const toast = useToast();
  const onShare = () => {
    copyToClipboard(window?.location?.href);
    toast({ title: 'url copied to clipboard', isClosable: true });
  };
  return (
    <LayoutDefault>
      <Head>
        <title>지식공단 - {post.title}</title>
        <meta property="og:title" content={post.title} />
        <meta
          name="description"
          property="og:description"
          content={(post.content ?? '').slice(0, 20)}
        />
      </Head>
      <HStack mt="30px">
        <NextLink href="/posts" passHref>
          <Link textDecor="underline">Posts</Link>
        </NextLink>
        <Box flexGrow="1" />
        <Button leftIcon={<IconShare />} onClick={onShare}>
          Share
        </Button>
      </HStack>
      <Heading as="h1" fontFamily="Title" mt="10px">
        {post.title}
      </Heading>
      <Divider mt="10px" mb="10px" borderBottom="solid 1px black" />
      <MDXRender mdxSource={mdxSource} as="article" />
    </LayoutDefault>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const postIndices = await getPostIndices();
  const paths = postIndices.posts.data.map((p) => ({
    params: { uid: `${p?.attributes?.uid}` },
  }));
  return { paths, fallback: 'blocking' };
};

// graphql example
// https://github.com/vercel/next.js/discussions/10946
// https://github.com/prisma-labs/graphql-request
export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const uid = `${context?.params?.uid}`;
  const post = await getPost(uid);
  if (!post) return { notFound: true };
  const mdxSource = await serialize(post.content);
  return { props: { post, mdxSource }, revalidate: 60 };
};

export default Post;
