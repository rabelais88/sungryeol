import { IWorkMDXFrontMatter } from '@/types';
import { Box, Heading, List, ListItem } from '@chakra-ui/react';
import { promises as fs } from 'fs';
import { GetStaticProps, NextPage } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';

interface ResumeProps {
  works: IWorkMDXFrontMatter[];
}

const Resume: NextPage<ResumeProps> & { topBarHide: boolean } = ({ works }) => {
  return (
    <Box>
      <Heading>Resume</Heading>

      <Heading variant="h2">Works</Heading>
      <List>
        {works.map((w, i) => (
          <ListItem key={i}>{w.title}</ListItem>
        ))}
      </List>
    </Box>
  );
};

Resume.topBarHide = true;

export const getStaticProps: GetStaticProps<ResumeProps> = async () => {
  const filePath = path.join(process.cwd(), 'mdx', 'works');
  const filesPath = await (
    await fs.readdir(filePath)
  ).map((fp) => path.join(filePath, fp));
  const works = await Promise.all(
    filesPath.map(async (fp) => {
      const file = await fs.readFile(fp, 'utf8');
      const content = await serialize(file, { parseFrontmatter: true });
      return content.frontmatter as unknown as IWorkMDXFrontMatter;
    })
  );
  return { props: { works } };
};

export default Resume;
