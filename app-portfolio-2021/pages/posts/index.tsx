import PostSearch, {
  SearchBox,
  SearchPagination,
  TagListMenu,
  SearchResults,
} from '@/components/PostSearch';
import LayoutDefault from '@/layout/LayoutDefault';
import { Box, Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import LogoAnimated from '@/components/LogoAnimated';
import Header from '@/components/Header';

interface IProps {}
const Posts: NextPage<IProps> = ({}) => {
  return (
    <>
      <Header title="지식공단 - posts" description="browse postings" />
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
