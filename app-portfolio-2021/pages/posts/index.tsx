import PostSearch, {
  SearchBox,
  SearchPagination,
  TagListMenu,
  SearchResults,
} from '@/components/PostSearch';
import LayoutDefault from '@/layout/LayoutDefault';
import { Box, Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import LogoAnimated from '@/components/LogoAnimated';

interface IProps {}
const Posts: NextPage<IProps> = ({}) => {
  return (
    <>
      <Head>
        <title>지식공단 - posts</title>
        <meta property="og:title" content="지식공단 - browse postings"></meta>
        <meta
          name="description"
          property="og:description"
          content="글 열람하기"
        />
      </Head>
      <LayoutDefault>
        <Box height="50px" className="margin" />
        <LogoAnimated mx="auto" />
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
          <SearchPagination />
        </PostSearch>
      </LayoutDefault>
    </>
  );
};

export default Posts;
