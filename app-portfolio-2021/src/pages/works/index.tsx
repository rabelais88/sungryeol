import { GetStaticProps, NextPage } from 'next';
import { MDXRemoteSerializeResult, MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { getWork } from '@/services/WorkService';
import LayoutDefault from '@/layout/LayoutDefault';
import MDXRender from '@/components/Markdown/MDXRender';
import { Box } from '@chakra-ui/react';
import Header from '@/components/Header';
import WorkBG from '@/components/webgl/WorkBG';
import path from 'path';
import { promises as fs } from 'fs';

interface IProps {
  mdxSourceAPI: MDXRemoteSerializeResult;
  mdxSourceLocal: MDXRemoteSerializeResult;
}

const Works: NextPage<IProps> = ({ mdxSourceAPI, mdxSourceLocal }) => {
  return (
    <Box position="relative" width="100%" data-page="works">
      <Box position="absolute" zIndex="1" width="100%">
        <LayoutDefault>
          <Header title="지식공단 - work" description="browsing works" />
          <Box height="50px" />
          {/* work page from API */}
          <MDXRender mdxSource={mdxSourceAPI} />
          <Box height="30px" />
          {/* local work page */}
          <MDXRender mdxSource={mdxSourceLocal} />
        </LayoutDefault>
      </Box>
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

export default Works;

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const req = await getWork();
  const mdxSourceAPI = await serialize(req);
  const filePath = path.join(process.cwd(), 'mdx', 'works.mdx');
  const localContent = await fs.readFile(filePath, 'utf8');
  const mdxSourceLocal = await serialize(localContent);
  return { props: { mdxSourceAPI, mdxSourceLocal }, revalidate: 9 };
};
