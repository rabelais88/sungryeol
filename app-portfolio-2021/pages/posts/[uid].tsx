import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getPost, getPostIndices } from '@/services/PostService';
import { ReturnPromiseType } from '@/types';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

interface IProps {
  post: ReturnPromiseType<typeof getPost>;
  mdxSource: MDXRemoteSerializeResult;
}

const Post: NextPage<IProps> = ({ post, mdxSource }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <MDXRemote
        {...mdxSource}
        // components={components}
      />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const postIndices = await getPostIndices();
  const paths = postIndices.posts.data.map((p) => ({
    params: { uid: `${p?.attributes?.uid}` },
  }));
  //   return { paths, fallback: 'blocking' };
  return { paths, fallback: false };
};

// graphql example
// https://github.com/vercel/next.js/discussions/10946
// https://github.com/prisma-labs/graphql-request
export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const uid = `${context?.params?.uid}`;
  const post = await getPost(uid);
  if (!post) return { notFound: true };
  const mdxSource = await serialize(post.content);
  return { props: { post, mdxSource } };
};

export default Post;
