import client from '.tina/__generated__/client';
import { Post, PostQuery } from '.tina/__generated__/types';
import AppLink from '@/components/AppLink';
import DateText from '@/components/DateText';
import IconShare from '@/components/icons/IconShare';
import LogoGeometry from '@/components/icons/LogoGeometry';
import LogoText from '@/components/icons/LogoText';
import PostTag from '@/components/PostTag';
import PrettyLink from '@/components/PrettyLink';
import { copyToClipboard } from '@/lib';
import { MyPage } from '@/types/common';
import {
  Box,
  Button,
  Heading,
  Image,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  useColorMode,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
// @ts-ignore
import highlightStyle from 'react-syntax-highlighter/dist/cjs/styles/prism/one-light';
import BlockQuote from '@/components/markdown/BlockQuote';
import Divider from '@/components/Divider';

interface PostPageProps extends PageProps {
  tinaRequest: {
    data: { post: Post };
    variables: { relativePath: string };
    query: string;
  };
}

const CodeBlock = (props: any) => {
  return (
    <SyntaxHighlighter
      language={props?.lang ?? 'plaintext'}
      style={highlightStyle}
    >
      {props.value ?? ''}
    </SyntaxHighlighter>
  );
};

const components: Record<string, React.FC> = {
  h1: (props) => <Heading {...props} as="h1" />,
  h2: (props) => <Heading {...props} size="lg" as="h2" />,
  h3: (props) => <Heading {...props} size="lg" as="h3" />,
  ol: OrderedList,
  ul: UnorderedList,
  li: ListItem,
  p: Text,
  a: (props: any) => <PrettyLink href={props.url}>{props.children}</PrettyLink>,
  code_block: CodeBlock,
  img: (props: any) => {
    return <Image src={props.url} alt={props.alt} />;
  },
  blockquote: BlockQuote,
};

const PostPage: MyPage<PostPageProps> = ({ tinaRequest }) => {
  const { data } = useTina<{ post: Post }>(tinaRequest);
  const onShare = () => {
    copyToClipboard(window?.location?.href ?? '');
  };
  const { colorMode } = useColorMode();
  return (
    <Box className="post-page">
      <Button
        aria-label="share the content"
        mb="30px"
        onClick={onShare}
        leftIcon={<IconShare mr="9px" />}
      >
        Share
      </Button>

      <Wrap mb="30px">
        {data.post.tags?.map((tag) => (
          <AppLink href={`/posts?tags=${tag}&page=0`} key={tag}>
            <PostTag>#{tag}</PostTag>
          </AppLink>
        ))}
      </Wrap>
      <DateText
        value={data.post.datePublish}
        render={(datetext) => <Text>{datetext}</Text>}
      />
      <Heading variant="post" mt="9px">
        {data.post.title}
      </Heading>
      <Divider mt="9px" />
      <Box
        pt="50px"
        sx={{
          'h1,h2,h3,h4,h5': { fontFamily: 'Title' },
          '> * + *': {
            mt: '40px',
          },
          // 'nav.toc': { 'li + li': { mt: '5px' }, ol: { mt: '5px' } },
          li: { fontSize: '16px', fontWeight: '400' },
          'li + li': { mt: '20px' },
          p: { fontSize: '16px', fontWeight: '400', mt: '50px' },
          div: { fontSize: '16px', fontWeight: '400' },
          'img:not(.with-caption)': { borderRadius: '10px' },
          code: {
            fontSize: '13px',
          },
        }}
      >
        <TinaMarkdown content={data?.post?.body} components={components} />
      </Box>
      <VStack className="area-post-bottom" mt="20">
        <AppLink href="/posts">
          <LogoGeometry w="160px" h="68px" />
        </AppLink>
        <AppLink href="/posts">
          <LogoText w="78px" h="18px" />
        </AppLink>
      </VStack>
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
