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
      py="15px"
      px="15px"
      sx={{
        '&[data-mode="info"]': {
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
  longdesc?: string;
  caption?: string;
}

const Figure = chakra('figure');

const CustomImg: React.FC<ICustomImgProps> = ({
  alt,
  layout = 'intrinsic',
  width = 0,
  height = 0,
  src,
  ...props
}) => {
  // const re = new RegExp(`${process.env.NEXT_PUBLIC_S3}`, 'g');
  // const _src = `${src}`.replace(re, `${process.env.NEXT_PUBLIC_AWS_CDN}`);
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

  const caption = props.longdesc || props.caption;
  if (!caption)
    return (
      <Image
        src={src}
        layout={layout}
        alt={alt}
        {...blurProps}
        {...props}
        className="without-caption"
      />
    );
  return (
    <Figure
      display="flex"
      justifyContent="center"
      flexDir="column"
      sx={{ img: { borderTopRadius: '10px' } }}
    >
      <Image
        src={src}
        alt={alt}
        layout={layout}
        {...blurProps}
        {...props}
        className="with-caption"
      />
      <Text
        fontWeight="700"
        mb="15px"
        as="figcaption"
        borderBottomRadius="10px"
        bgColor="gray.100"
        py="10px"
        px="20px"
      >
        {caption}
      </Text>
    </Figure>
  );
};

const _UnorderedList: React.FC<ListProps> = ({ children, ...props }) => {
  return <UnorderedList {...props}>{children}</UnorderedList>;
};

const _Heading: React.FC<HeadingProps> = ({ children, id, ...props }) => {
  const encodedId = encodeURI(id ?? '');
  if (Array.isArray(children)) {
    const headLink = children[0] as JSX.Element;
    const text = children[1] as string;
    // const encodedId = encodeURI(headLink.props['href'].replace(/^#/, ''));
    return (
      <>
        {headLink}
        <Heading
          id={encodedId}
          _hover={{ _after: { content: '"#"', color: 'pink.100' } }}
          {...props}
        >
          <Link href={encodeURI(headLink.props['href'])}>{text}</Link>
        </Heading>
      </>
    );
  }
  return (
    <Heading
      {...props}
      id={encodedId}
      _hover={{ _after: { content: '"#"', color: 'pink.100' } }}
    >
      {children}
    </Heading>
  );
};

// https://mdxjs.com/table-of-components/
const components = {
  a: CustomLink,
  h1: (props: HeadingProps) => <_Heading {...props} as="h1" />,
  h2: (props: HeadingProps) => <_Heading {...props} size="lg" as="h2" />,
  h3: (props: HeadingProps) => <_Heading {...props} size="md" as="h3" />,
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
  img: CustomImg,
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
      '* + h1,* + h2,* + h3,* + h4,* + h5, * + .callout, * + ul, * + ol': {
        mt: '40px',
      },
      'nav.toc': { 'li + li': { mt: '5px' }, ol: { mt: '5px' } },
      li: { fontSize: '16px', fontWeight: '400' },
      'li + li': { mt: '20px' },
      p: { fontSize: '16px', fontWeight: '400', mt: '50px' },
      div: { fontSize: '16px', fontWeight: '400' },
      'img.without-caption': { borderRadius: '10px' },
      blockquote: { borderLeft: 'solid 2px black', pl: '10px' },
    }}
  >
    <MDXRemote {...mdxSource} components={components} />
  </Box>
);

export default MDXRender;
