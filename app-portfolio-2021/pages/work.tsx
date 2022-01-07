import { GetStaticProps, NextPage } from 'next';
import { MDXRemoteSerializeResult, MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { getWork } from '@/services/WorkService';
import LayoutDefault from '@/layout/LayoutDefault';
import MDXRender from '@/components/MDXRender';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';

interface IProps {
  mdxSource: MDXRemoteSerializeResult;
}

const Work: NextPage<IProps> = ({ mdxSource }) => {
  return (
    <LayoutDefault>
      <Head>
        <title>지식공단 - work</title>
      </Head>
      <Box height="50px" />
      <MDXRender mdxSource={mdxSource} />
    </LayoutDefault>
  );
};

export default Work;

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const req = await getWork();
  const mdxSource = await serialize(req);
  return { props: { mdxSource }, revalidate: 60 };
};
