import client from '.tina/__generated__/client';
import { Page, PageQuery } from '.tina/__generated__/types';
import AppLink from '@/components/AppLink';
import { MyPage } from '@/types/common';
import { Box } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Marquee from 'react-fast-marquee';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

interface WorksPageProps extends PageProps {
  tinaRequest: {
    data: { page: Page };
    variables: { relativePath: string };
    query: string;
  };
}

export const getStaticProps: GetStaticProps<WorksPageProps> = async () => {
  let data: Partial<PageQuery> = {};
  const variables = { relativePath: `works.mdx` };
  let query: string = '';

  try {
    const res = await client.queries.page(variables);
    data = res.data;
    query = res.query;
  } catch {
    // swallow errors related to document creation
  }

  const tinaRequest = {
    data,
    variables,
    query,
  } as WorksPageProps['tinaRequest'];

  return {
    props: {
      tinaRequest,
    },
  };
};

const WorksPage: MyPage<WorksPageProps> = ({ tinaRequest }) => {
  const { data } = useTina<{ page: Page }>(tinaRequest);
  return (
    <Box>
      <Box height="30px" />
      <TinaMarkdown content={data?.page?.body} />
    </Box>
  );
};

WorksPage.defaultProps = {
  pageTitle: 'works',
  bodyPortal: (
    <AppLink
      externalUrl
      href="https://github.com/rabelais88/sungryeol"
      position="absolute"
      top="65px"
      bgColor="bg-pink"
      sx={{
        _hover: {
          textDecoration: 'none',
        },
      }}
    >
      <Marquee gradient={false}>
        {Array.from({ length: 3 }).map(
          () => 'check source of this blog at GITHUB - '
        )}
      </Marquee>
    </AppLink>
  ),
};

export default WorksPage;
