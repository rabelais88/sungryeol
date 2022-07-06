import { GetStaticProps, NextPage } from 'next';
import { MDXRemoteSerializeResult, MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { getWork } from '@/services/WorkService';
import LayoutDefault from '@/layout/LayoutDefault';
import MDXRender from '@/components/Markdown/MDXRender';
import { Box } from '@chakra-ui/react';
import Header from '@/components/Header';
import WorkBG from '@/components/webgl/WorkBG';

interface IProps {
  mdxSource: MDXRemoteSerializeResult;
}

const Work: NextPage<IProps> = ({ mdxSource }) => {
  return (
    <Box position="relative" width="100%">
      <LayoutDefault zIndex="1" position="absolute">
        <Header title="지식공단 - work" description="browsing works" />
        <Box height="50px" />
        <MDXRender mdxSource={mdxSource} />
      </LayoutDefault>
      <WorkBG
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100vh"
        overflowX="hidden"
      />
    </Box>
  );
};

export default Work;

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const req = await getWork();
  const mdxSource = await serialize(req);
  return { props: { mdxSource }, revalidate: 9 };
};
