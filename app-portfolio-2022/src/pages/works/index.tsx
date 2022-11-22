import client from '.tina/__generated__/client';
import { Page, PageQuery } from '.tina/__generated__/types';
import AppLink from '@/components/AppLink';
import PrettyLink from '@/components/PrettyLink';
import { MyPage } from '@/types/common';
import {
  Box,
  Heading,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
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

const components: Record<string, React.FC> = {
  h1: (props) => <Heading {...props} as="h1" />,
  h2: (props) => <Heading {...props} size="lg" as="h2" />,
  h3: (props) => <Heading {...props} size="lg" as="h3" />,
  ol: OrderedList,
  ul: UnorderedList,
  li: ListItem,
  p: Text,
  a: (props: any) => <PrettyLink href={props.url}>{props.children}</PrettyLink>,
};

const WorksPage: MyPage<WorksPageProps> = ({ tinaRequest }) => {
  const { data } = useTina<{ page: Page }>(tinaRequest);
  return (
    <Box>
      <Box height="50px" className="margin" />
      <Box
        sx={{
          'h1,h2,h3,h4,h5': { fontFamily: 'Title' },
          '& > * + *': {
            mt: '40px',
          },
          li: { fontSize: '16px', fontWeight: '400' },
          'li + li': { mt: '20px' },
          p: { fontSize: '16px', fontWeight: '400', mt: '50px' },
          div: { fontSize: '16px', fontWeight: '400' },
        }}
      >
        <TinaMarkdown content={data?.page?.body} components={components} />
      </Box>
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
      w="100%"
    >
      <Marquee gradient={false}>
        {Array.from({ length: 20 }).map(
          () => 'check source of this blog at GITHUB - '
        )}
      </Marquee>
    </AppLink>
  ),
};

export default WorksPage;
