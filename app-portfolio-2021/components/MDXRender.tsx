import NextLink, { LinkProps } from 'next/link';
import {
  Link,
  Heading,
  HeadingProps,
  ListItem,
  OrderedList,
  UnorderedList,
  Box,
  BoxProps,
  Text,
} from '@chakra-ui/react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import PrismCodeStyle from '@/styles/PrismCodeStyle';

const _Link: React.FC<LinkProps> = ({ children, href }) => {
  return (
    <NextLink href={href} passHref>
      <Link bgColor="pink.100" _hover={{ bgColor: 'yellow.100' }}>
        {children}
      </Link>
    </NextLink>
  );
};

// https://mdxjs.com/table-of-components/
const components = {
  a: _Link,
  h1: (props: HeadingProps) => <Heading {...props} as="h1" />,
  h2: (props: HeadingProps) => <Heading {...props} size="lg" as="h2" />,
  h3: (props: HeadingProps) => <Heading {...props} size="md" as="h3" />,
  li: ListItem,
  ol: OrderedList,
  ul: UnorderedList,
  p: Text,
  div: Box,
  wrapper: (props: any) => {
    return <PrismCodeStyle {...props} />;
  },
};

interface IMDXRenderProps extends BoxProps {
  mdxSource: MDXRemoteSerializeResult;
}

const MDXRender: React.FC<IMDXRenderProps> = ({ mdxSource, ...props }) => (
  <Box
    {...props}
    sx={{
      'h1,h2,h3,h4,h5': { fontFamily: 'Title' },
      '* + h1,* + h2,* + h3,* + h4,* + h5': { mt: '40px' },
      li: { fontSize: '16px', fontWeight: '400' },
      p: { fontSize: '16px', fontWeight: '300' },
      div: { fontSize: '16px', fontWeight: '300' },
    }}
  >
    <MDXRemote {...mdxSource} components={components} />
  </Box>
);

export default MDXRender;
