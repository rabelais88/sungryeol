import NextLink, { LinkProps } from 'next/link';
import {
  Link,
  Heading,
  HeadingProps,
  ListItem,
  OrderedList,
  UnorderedList,
  Box,
  ListItemProps,
  BoxProps,
  TextProps,
  Text,
  ListProps,
} from '@chakra-ui/react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

const _Link: React.FC<LinkProps> = ({ children, href }) => {
  return (
    <NextLink href={href} passHref>
      <Link textDecor="underline">{children}</Link>
    </NextLink>
  );
};

// https://mdxjs.com/table-of-components/
const components = {
  a: _Link,
  h1: (props: HeadingProps) => <Heading as="h1" {...props} />,
  h2: (props: HeadingProps) => <Heading as="h2" {...props} size="lg" />,
  h3: (props: HeadingProps) => <Heading as="h3" {...props} size="md" />,
  li: (props: ListItemProps) => (
    <ListItem fontSize="16px" fontWeight="400" {...props} />
  ),
  ol: OrderedList,
  ul: (props: ListProps) => <UnorderedList {...props} />,
  p: (props: TextProps) => <Text fontSize="16px" fontWeight="300" {...props} />,
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
    }}
  >
    <MDXRemote {...mdxSource} components={components} />
  </Box>
);

export default MDXRender;
