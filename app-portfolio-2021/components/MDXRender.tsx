import NextLink, { LinkProps } from 'next/link';
import {
  Link,
  Heading,
  HeadingProps,
  ListItem,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

const LinkTest: React.FC<LinkProps> = ({ children, href }) => {
  return (
    <NextLink href={href} passHref>
      <Link>{children}</Link>
    </NextLink>
  );
};

// https://mdxjs.com/table-of-components/
const components = {
  a: LinkTest,
  h1: (props: HeadingProps) => <Heading as="h1" {...props} />,
  h2: (props: HeadingProps) => <Heading as="h2" {...props} size="lg" />,
  h3: (props: HeadingProps) => <Heading as="h3" {...props} size="md" />,
  li: ListItem,
  ol: OrderedList,
  ul: UnorderedList,
};

const MDXRender: React.FC<{ mdxSource: MDXRemoteSerializeResult }> = ({
  mdxSource,
}) => <MDXRemote {...mdxSource} components={components} />;

export default MDXRender;
