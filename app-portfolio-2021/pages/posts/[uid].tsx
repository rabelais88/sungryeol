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
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import IconShare from '@/components/icons/IconShare';
import copyToClipboard from '@/utils/copyToClipboard';
import Header from '@/components/Header';
import { useCallback, useMemo } from 'react';

import { PostTagControl } from '@/components/PostTag';
import { useRouter } from 'next/router';
import { mdxPostConfig } from '@/constants/mdxConfig';

interface IProps {
  post: ReturnPromiseType<typeof getPost>;
  mdxSource: MDXRemoteSerializeResult;
  preview: boolean;
}

const Post: NextPage<IProps> = ({ post, mdxSource, preview }) => {
  const toast = useToast();
  const onShare = () => {
    copyToClipboard(window?.location?.href);
    toast({ title: 'url copied to clipboard', isClosable: true });
  };
  const shortenedContent = useMemo(
    () => (post.content ?? '').slice(0, 20),
    [post.content]
  );
  const router = useRouter();
  const searchTag = useCallback(
    (tagLabel: string, tagKey: string) => () => {
      const tag = [tagKey, tagLabel].join('||');
      const query = new URLSearchParams({ tag }).toString();
      const url = ['/posts', query].join('?');
      router.push(url);
    },
    [router]
  );

  return (
    <LayoutDefault>
      <Header
        title={`지식공단 - ${post.title}`}
        description={shortenedContent}
      />
      {preview && (
        <NextLink href="/api/post-preview-exit" passHref>
          <Link
            display="flex"
            justifyContent="center"
            alignItems="center"
            textDecor="underline"
            bgColor="red"
            color="white"
            h="50px"
            textAlign="center"
          >
            you are previewing a post. click here to exit preview mode
          </Link>
        </NextLink>
      )}
      <HStack mt="30px">
        <NextLink href="/posts" passHref>
          <Link textDecor="underline">Posts</Link>
        </NextLink>
        <Box flexGrow="1" />
        <Button leftIcon={<IconShare />} onClick={onShare}>
          Share
        </Button>
      </HStack>
      <Wrap>
        {post?.tags?.data?.map((tag) => (
          <WrapItem key={tag?.attributes?.key}>
            <PostTagControl
              onClick={searchTag(tag?.attributes?.key, tag?.attributes?.label)}
            >
              {tag?.attributes?.label.toUpperCase()}
            </PostTagControl>
          </WrapItem>
        ))}
      </Wrap>
      <Heading as="h1" fontFamily="Title" mt="10px" letterSpacing="-4px">
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
  if (context.preview) {
    const post = await getPost(uid, true);
    if (!post) return { notFound: true };
    const content = post.content as string;
    return {
      props: {
        post,
        mdxSource: await serialize(content, mdxPostConfig),
        preview: true,
      },
    };
  }
  const post = await getPost(uid);
  if (!post) return { notFound: true };
  const content = post.content as string;
  const mdxSource = await serialize(content, mdxPostConfig);
  return { props: { post, mdxSource, preview: false }, revalidate: 60 };
};

export default Post;
