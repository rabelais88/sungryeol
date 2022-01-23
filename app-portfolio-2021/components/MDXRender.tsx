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
  chakra,
  ListProps,
} from '@chakra-ui/react';
import Image, { ImageProps } from 'next/image';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import PrismCodeStyle from '@/styles/PrismCodeStyle';
import 'katex/dist/katex.min.css';
import makeShimmerUri from '@/utils/makeShimmerUri';
import CustomLink from './CustomLink';

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

interface ICustomImgProps extends ImageProps {}

const Figure = chakra('figure');

const CustomImg: React.FC<ICustomImgProps> = ({
  alt,
  layout = 'intrinsic',
  width = 0,
  height = 0,
  src,
  ...props
}) => {
  const re = new RegExp(`${process.env.NEXT_PUBLIC_S3}`, 'g');
  const _src = `${src}`.replace(re, `${process.env.NEXT_PUBLIC_AWS_CDN}`);
  const blurProps: Pick<
    ImageProps,
    'width' | 'height' | 'placeholder' | 'blurDataURL'
  > = {};
  if (width > 0 && height > 0) {
    blurProps.width = width;
    blurProps.height = height;
    blurProps.placeholder = 'blur';
    blurProps.blurDataURL = makeShimmerUri(Number(width), Number(height));
  }

  if (!alt)
    return (
      <Image src={_src} alt={alt} layout={layout} {...blurProps} {...props} />
    );
  return (
    <Figure display="flex" justifyContent="center" flexDir="column">
      <Image src={_src} alt={alt} layout={layout} {...blurProps} {...props} />
      <Text fontWeight="700" mb="15px" as="figcaption">
        {alt}
      </Text>
    </Figure>
  );
};

const _UnorderedList: React.FC<ListProps> = ({ children, ...props }) => {
  return (
    <UnorderedList mt="20px" {...props}>
      {children}
    </UnorderedList>
  );
};

// https://mdxjs.com/table-of-components/
const components = {
  a: CustomLink,
  h1: (props: HeadingProps) => <Heading {...props} as="h1" />,
  h2: (props: HeadingProps) => <Heading {...props} size="lg" as="h2" />,
  h3: (props: HeadingProps) => <Heading {...props} size="md" as="h3" />,
  li: ListItem,
  ol: OrderedList,
  ul: _UnorderedList,
  p: Text,
  div: _Div,
  // https://stackoverflow.com/questions/67945559/next-mdx-remote-doesnt-pass-the-component
  inlineCode: _Code,
  callout: Callout,
  Callout,
  'custom-img': CustomImg,
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
      p: { fontSize: '16px', fontWeight: '400', mt: '50px' },
      div: { fontSize: '16px', fontWeight: '400' },
      img: { borderRadius: '10px' },
    }}
  >
    <MDXRemote {...mdxSource} components={components} />
  </Box>
);

export default MDXRender;
