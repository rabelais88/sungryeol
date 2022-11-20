import client from '.tina/__generated__/client';
import { Work, WorkQuery } from '.tina/__generated__/types';
import AppLink from '@/components/AppLink';
import MockPhone from '@/components/mocks/MockPhone';
import Video from '@/components/Video';
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

interface WorkPageProps extends PageProps {
  tinaRequest: {
    data: { work: Work };
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
  Video: (props: any) => <Video url={props?.url ?? ''} />,
  MockPhone: (props: any) => <MockPhone image={props.image} />,
};

const WorkPage: MyPage<WorkPageProps> = ({ tinaRequest }) => {
  const { data } = useTina<{ work: Work }>(tinaRequest);
  return (
    <Box className="post-page">
      <Heading variant="post">{data.work.title}</Heading>
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
        <TinaMarkdown content={data?.work?.body} components={components} />
      </Box>
      <AppLink href="/works">back to works</AppLink>
    </Box>
  );
};

export const getStaticProps: GetStaticProps<WorkPageProps> = async ({
  params,
}) => {
  let data: Partial<WorkQuery> = {};
  const variables = { relativePath: `${params?.workid}.mdx` };
  let query: string = '';

  try {
    const res = await client.queries.work(variables);
    data = res.data;
    query = res.query;
  } catch {
    // swallow errors related to document creation
  }

  const tinaRequest = {
    data,
    variables,
    query,
  } as WorkPageProps['tinaRequest'];

  return {
    props: {
      tinaRequest,
      pageTitle: data?.work?.title ?? '',
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const works = await client.queries.workConnection();
  const workEdges = works.data.workConnection.edges ?? [];

  return {
    paths: workEdges.map((work) => ({
      params: { workid: work?.node?._sys.filename },
    })),
    fallback: false,
  };
};

export default WorkPage;
