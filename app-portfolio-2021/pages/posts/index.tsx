import LogoGeometry from '@/components/icons/LogoGeometry';
import PostSearch from '@/components/PostSearch';
import PostTag from '@/components/PostTag';
import LayoutDefault from '@/layout/LayoutDefault';
import AlgoliaService from '@/services/AlgoliaService';
import { getPosts } from '@/services/PostService';
import { getTags } from '@/services/TagService';
import { ReturnPromiseType } from '@/types';
import { Heading, Wrap, WrapItem } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import { InstantSearchProps } from 'react-instantsearch-dom';
import { findResultsState } from 'react-instantsearch-dom/server';

interface IProps {
  keyword: string;
  tags: string[];
  page: number;
  pageSize: number;
  postsData: ReturnPromiseType<typeof getPosts>;
  tagsData: ReturnPromiseType<typeof getTags>;
}
const Posts: NextPage<IProps> = ({
  keyword,
  page,
  pageSize,
  postsData,
  tagsData,
}) => {
  return (
    <LayoutDefault>
      {/* <p>searching by {keyword}</p>
      <p>page {page}</p>
      {postsData.data.map((post) => (
        <li key={post.attributes.uid}>
          <b>{post.attributes.title}</b>
          <p>tags: {JSON.stringify(post.attributes.tags)}</p>
        </li>
      ))}
      <p>total articles: {postsData.meta.pagination.total}</p>
      <p>page size: {pageSize}</p> */}
      <LogoGeometry
        w="160px"
        h="68px"
        mx="auto"
        display="block"
        mt="30px"
        mb="10px"
      />
      <Heading
        fontFamily="'Hammersmith One', sans-serif"
        textAlign="center"
        fontSize="18px"
        lineHeight="27px"
        fontWeight="normal"
      >
        Top 20 Tags
      </Heading>
      <Wrap justify="center" my="10px">
        {tagsData?.tags?.data?.map((tag, i) => (
          <WrapItem key={i}>
            <PostTag>{tag?.attributes?.label?.toUpperCase()}</PostTag>
          </WrapItem>
        ))}
      </Wrap>
      <PostSearch />
    </LayoutDefault>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const keyword = `${context.query?.q ?? ''}`;
  const tags = `${context.query?.tags ?? ''}`
    .split(',')
    .filter((t) => t !== '');
  const page = context.query?.page ? Number(context.query?.page) : 1;
  const pageSize = context.query?.pageSize
    ? Number(context.query?.pageSize)
    : 10;
  console.log({ page, pageSize, keyword, tags });
  const postsData = await getPosts({ page, pageSize, keyword, tagKeys: tags });
  const tagsData = await getTags({ pageSize: 20 });
  const props: IProps = {
    keyword,
    tags,
    page,
    pageSize,
    postsData,
    tagsData,
  };
  return { props };
};

export default Posts;
