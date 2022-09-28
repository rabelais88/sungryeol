import { GetStaticProps, NextPage } from 'next';
import { MDXRemoteSerializeResult, MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { getWork } from '@/services/WorkService';
import LayoutDefault from '@/layout/LayoutDefault';
import MDXRender from '@/components/Markdown/MDXRender';
import { Box, List, ListItem } from '@chakra-ui/react';
import Header from '@/components/Header';
import WorkBG from '@/components/webgl/WorkBG';
import path from 'path';
import { promises as fs } from 'fs';
import CustomLink from '@/components/CustomLink';

interface Work {
  title: string;
  url: string;
}
interface IProps {
  mdxSource: MDXRemoteSerializeResult;
  works: Work[];
}

const Works: NextPage<IProps> = ({ mdxSource, works }) => {
  return (
    <Box position="relative" width="100%" data-page="works">
      <Box position="absolute" zIndex="1" width="100%">
        <LayoutDefault>
          <Header title="지식공단 - work" description="browsing works" />
          <Box height="50px" />
          <MDXRender mdxSource={mdxSource} />
          <List>
            {works.map(({ title, url }, i) => (
              <ListItem key={i}>
                <CustomLink href={['works', url].join('/')}>{title}</CustomLink>
              </ListItem>
            ))}
          </List>
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
  const mdxSource = await serialize(req);
  const worksMdxDir = path.join(process.cwd(), 'mdx', 'works');
  const filenames = await fs.readdir(worksMdxDir);
  const reTitle = /^(.+)\.mdx$/i;
  const worksJob = filenames.map(async (filename) => {
    const content = await fs.readFile(path.join(worksMdxDir, filename), 'utf8');
    const work = await serialize(content, { parseFrontmatter: true });
    const title = work.frontmatter?.title ?? '';
    const url = reTitle.exec(filename)?.[1] ?? '';
    return { title, url };
  });
  const works = await Promise.all(worksJob);
  return { props: { mdxSource, works }, revalidate: 9 };
};
