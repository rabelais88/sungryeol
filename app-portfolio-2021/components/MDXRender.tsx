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
  Code,
  CodeProps,
} from '@chakra-ui/react';
import Image, { ImageProps } from 'next/image';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import PrismCodeStyle from '@/styles/PrismCodeStyle';
import 'katex/dist/katex.min.css';

const _Link: React.FC<LinkProps> = ({ children, href }) => {
  return (
    <NextLink href={href} passHref>
      <Link bgColor="pink.100" _hover={{ bgColor: 'yellow.100' }}>
        {children}
      </Link>
    </NextLink>
  );
};

const _Code: React.FC<CodeProps> = ({ children, ...props }) => {
  return <Code {...props}>{children}</Code>;
};

const _Div: React.FC<BoxProps> = ({ children, ...props }) => {
  return <Box {...props}>{children}</Box>;
};

interface ICalloutProps extends BoxProps {
  mode?: 'info' | 'danger';
}

const Callout: React.FC<ICalloutProps> = ({
  children,
  mode = 'info',
  ...props
}) => {
  return (
    <Box
      className="callout"
      data-mode={mode}
      py="10px"
      px="10px"
      sx={{
        '&[data-mode="info"]': {
          borderLeft: 'solid 3px black',
          bgColor: 'rgba(0,0,0,.05)',
        },
        '&[data-mode="danger"]': {
          borderLeft: 'solid 3px red',
          bgColor: 'rgba(255,0,0,.15)',
        },
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

interface ICustomImgProps extends ImageProps {
  description?: string;
}

const CustomImg: React.FC<ICustomImgProps> = ({
  alt,
  layout = 'intrinsic',
  width,
  ...props
}) => {
  return (
    <figure>
      <Image alt={alt} layout={layout} width={width} {...props} />
      {alt && (
        <Text w={width} fontWeight="700" maxW="100%" mb="15px" as="figcaption">
          {alt}
        </Text>
      )}
    </figure>
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
  div: _Div,
  // https://stackoverflow.com/questions/67945559/next-mdx-remote-doesnt-pass-the-component
  inlineCode: _Code,
  Callout,
  CustomImg,
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
      p: { fontSize: '16px', fontWeight: '400' },
      div: { fontSize: '16px', fontWeight: '400' },
    }}
  >
    <MDXRemote {...mdxSource} components={components} />
  </Box>
);

export default MDXRender;
