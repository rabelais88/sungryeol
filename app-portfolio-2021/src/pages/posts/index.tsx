import PostSearch from '@/components/PostSearch/PostSearch';
import TagListMenu from '@/components/PostSearch/TagListMenu';
import LoadingIndicator from '@/components/PostSearch/LoadingIndicator';
import SearchPagination from '@/components/PostSearch/SearchPagination';
import SearchResults from '@/components/PostSearch/SearchResults';
import SearchBox from '@/components/PostSearch/SearchBox';

import LayoutDefault from '@/layout/LayoutDefault';
import { Box, Heading } from '@chakra-ui/react';
import { GetStaticProps, NextPage } from 'next';
import LogoAnimated from '@/components/LogoAnimated';
import Header from '@/components/Header';
import dynamic from 'next/dynamic';

const PostSearchArea = () => {
  return (
    <PostSearch>
      <Heading
        fontFamily="'Hammersmith One', sans-serif"
        textAlign="center"
        fontSize="18px"
        lineHeight="27px"
        fontWeight="normal"
        mb="10px"
      >
        Tags
      </Heading>
      <TagListMenu attribute="compositeTags" />
      <Box height="20px" />
      <SearchBox />
      <SearchResults />
      <LoadingIndicator />
      <SearchPagination />
    </PostSearch>
  );
};

const ClientOnlyArea = dynamic(() => Promise.resolve(PostSearchArea), {
  ssr: false,
});

interface IProps {}
const Posts: NextPage<IProps> = ({}) => {
  return (
    <>
      <Header title="지식공단 - posts" description="browse postings" />
      <LayoutDefault>
        <Box height="50px" className="margin" />
        <LogoAnimated mx="auto" />
        <ClientOnlyArea />
      </LayoutDefault>
    </>
  );
};

export const getStaticProps: GetStaticProps = (context) => {
  return { props: {}, revalidate: 9 };
};

export default Posts;
