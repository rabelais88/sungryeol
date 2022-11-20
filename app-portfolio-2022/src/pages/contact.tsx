import client from '.tina/__generated__/client';
import { Page, PageQuery } from '.tina/__generated__/types';
import ContactItem from '@/components/contact/ContactItem';
import ProfileVideo from '@/components/contact/ProfileVideo';
import { MyPage } from '@/types/common';
import { Box, Heading, Text } from '@chakra-ui/react';
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

const components = {
  ContactItem,
};

export const getStaticProps: GetStaticProps<ContactPageProps> = async () => {
  let data: Partial<PageQuery> = {};
  const variables = { relativePath: `contact.mdx` };
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
    <Box className="contact-page">
      <Box h="80px" />
      <ProfileVideo />
      <Heading
        mt="50px"
        fontSize="62px"
        lineHeight="93px"
        fontWeight="100"
        letterSpacing="-0.085em"
        textAlign="center"
        as="h1"
      >
        박성렬
      </Heading>
      <Text
        textAlign="center"
        fontFamily="Title"
        fontSize="28px"
        lineHeight="33.6px"
        fontWeight="400"
        mb="40px"
      >
        Park Sungryeol
      </Text>
      <Text
        textAlign="center"
        fontFamily="Title"
        fontSize="36px"
        lineHeight="120%"
        fontWeight="400"
        mb="15px"
      >
        FRONTEND / WEB
      </Text>
      <Text fontFamily="Title" fontSize="25px" mb="50px" textAlign="center">
        DEVELOPER
      </Text>
      <Box
        className="markdown-area"
        sx={{
          '> p + *': {
            mt: '50px',
          },
          p: {
            textAlign: 'center',
          },
        }}
      >
        <TinaMarkdown content={data?.page?.body} components={components} />
      </Box>
    </Box>
  );
};

ContactPage.defaultProps = { pageTitle: 'contact' };

export default ContactPage;
