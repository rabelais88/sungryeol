import { getPosts } from '@/services/PostService';
import { ReturnPromiseType } from '@/types';
import { GetServerSideProps, NextPage } from 'next';

interface IProps {
  keyword: string;
  tags: string[];
  page: number;
  pageSize: number;
  postsData: ReturnPromiseType<typeof getPosts>;
}

const Posts: NextPage<IProps> = ({
  keyword,
  tags,
  page,
  pageSize,
  postsData,
}) => {
  return (
    <div>
      <p>searching by {keyword}</p>
      <p>page {page}</p>
      {postsData.data.map((post) => (
        <li key={post.attributes.uid}>
          <b>{post.attributes.title}</b>
          <p>tags: {JSON.stringify(post.attributes.tags)}</p>
        </li>
      ))}
      <p>total articles: {postsData.meta.pagination.total}</p>
      <p>page size: {pageSize}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const keyword = `${context.query?.q ?? ''}`;
  const tags = `${context.query?.tags ?? ''}`
    .split(',')
    .filter((t) => t !== '');
  const page = context.query?.page ? Number(context.query?.page) : 1;
  const pageSize = context.query?.pageSize
    ? Number(context.query?.pageSize)
    : 10;
  if (isNaN(page) || isNaN(pageSize)) return { notFound: true };
  console.log({ keyword, page, tags, pageSize });
  const postsData = await getPosts({ page, pageSize, keyword, tagKeys: tags });
  return { props: { keyword, tags, page, pageSize, postsData } };
};

export default Posts;
