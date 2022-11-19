import client from '.tina/__generated__/client';
import { Page, PageQuery } from '.tina/__generated__/types';
import { MyPage } from '@/types/common';
import { Box } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

interface ContactPageProps extends PageProps {
  tinaRequest: {
    data: { page: Page };
    variables: { relativePath: string };
    query: string;
  };
}

export const getStaticProps: GetStaticProps<ContactPageProps> = async () => {
  let data: Partial<PageQuery> = {};
  const variables = { relativePath: `contact.md` };
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
  } as ContactPageProps['tinaRequest'];

  return {
    props: {
      tinaRequest,
    },
  };
};

const ContactPage: MyPage<ContactPageProps> = ({ tinaRequest }) => {
  const { data } = useTina<{ page: Page }>(tinaRequest);
  return (
    <Box>
      <TinaMarkdown content={data?.page?.body} />
    </Box>
  );
};

ContactPage.defaultProps = { pageTitle: 'contact' };

export default ContactPage;
