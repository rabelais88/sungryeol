import { GetStaticProps, NextPage } from 'next';
import { MDXRemoteSerializeResult, MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { getWork } from '@/services/WorkService';
import LayoutDefault from '@/layout/LayoutDefault';
import MDXRender from '@/components/MDXRender';

interface IProps {
  mdxSource: MDXRemoteSerializeResult;
}

const Work: NextPage<IProps> = ({ mdxSource }) => {
  return (
    <LayoutDefault>
      <MDXRender mdxSource={mdxSource} />
    </LayoutDefault>
  );
};

export default Work;

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const req = await getWork();
  const mdxSource = await serialize(req);
  return { props: { mdxSource } };
};
