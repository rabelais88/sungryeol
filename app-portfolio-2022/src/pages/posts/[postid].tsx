import client from '.tina/__generated__/client';
import { Post, PostQuery } from '.tina/__generated__/types';
import AppLink from '@/components/AppLink';
import { MyPage } from '@/types/common';
import {
  Box,
  Heading,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

interface PostPageProps extends PageProps {
  tinaRequest: {
    data: { post: Post };
    variables: { relativePath: string };
    query: string;
  };
}

const components: Record<string, React.FC> = {
  h1: (props) => <Heading {...props} as="h1" />,
  h2: (props) => <Heading {...props} size="lg" as="h2" />,
  h3: (props) => <Heading {...props} size="lg" as="h3" />,
  ol: OrderedList,
  ul: UnorderedList,
  li: ListItem,
  p: Text,
};

const PostPage: MyPage<PostPageProps> = ({ tinaRequest }) => {
  const { data } = useTina<{ post: Post }>(tinaRequest);
  return (
    <Box className="post-page">
      <Heading variant="post">{data.post.title}</Heading>
      <Box
        sx={{
          'h1,h2,h3,h4,h5': { fontFamily: 'Title' },
          '* + h1,* + h2,* + h3,* + h4,* + h5, * + .callout, * + ul, * + ol': {
            mt: '40px',
          },
          // 'nav.toc': { 'li + li': { mt: '5px' }, ol: { mt: '5px' } },
          li: { fontSize: '16px', fontWeight: '400' },
          'li + li': { mt: '20px' },
          p: { fontSize: '16px', fontWeight: '400', mt: '50px' },
          div: { fontSize: '16px', fontWeight: '400' },
          'img:not(.with-caption)': { borderRadius: '10px' },
          blockquote: { borderLeft: 'solid 2px black', pl: '10px' },
        }}
      >
        <TinaMarkdown content={data?.post?.body} components={components} />
      </Box>
      <AppLink href="/posts">back to posts</AppLink>
    </Box>
  );
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  let data: Partial<PostQuery> = {};
  const variables = { relativePath: `${params?.postid}.md` };
  let query: string = '';

  try {
    const res = await client.queries.post(variables);
    data = res.data;
    query = res.query;
  } catch {
    // swallow errors related to document creation
  }

  const tinaRequest = {
    data,
    variables,
    query,
  } as PostPageProps['tinaRequest'];

  return {
    props: {
      tinaRequest,
      pageTitle: data?.post?.title,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await client.queries.postConnection();
  const postEdges = posts.data.postConnection.edges ?? [];

  return {
    paths: postEdges.map((post) => ({
      params: { postid: post?.node?._sys.filename },
    })),
    fallback: false,
  };
};

export default PostPage;
