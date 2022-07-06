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
  ListProps,
} from '@chakra-ui/react';
import Image, { ImageProps } from 'next/image';
import {
  MDXRemote,
  MDXRemoteProps,
  MDXRemoteSerializeResult,
} from 'next-mdx-remote';
import 'katex/dist/katex.min.css';
import makeShimmerUri from '@/utils/makeShimmerUri';
import CustomLink from '@/components/CustomLink';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

const _Code: React.FC<CodeProps> = ({ children, ...props }) => {
  const fullCode = /language-(\w+)/.exec(props.className || '');

  if (fullCode) {
    return <Code {...props}>{children}</Code>;
  }
  return (
    <Code {...props} bgColor="#f5f2f0" color="pink.500" data-code-inline="true">
      {children}
    </Code>
  );
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

type CustomImgProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & { caption?: string };
type BlurProps = Pick<
  ImageProps,
  'width' | 'height' | 'placeholder' | 'blurDataURL'
>;

const CustomImg: React.FC<CustomImgProps> = ({
  alt,
  src = '',
  placeholder,
  title,
  caption = '',
  ...props
}) => {
  const blurProps: BlurProps = {
    width: props?.width ?? 500,
    height: props?.height ?? 500,
    placeholder: 'blur',
  };
  blurProps.blurDataURL = makeShimmerUri(
    Number(blurProps.width),
    Number(blurProps.height)
  );
  ``;

  if (caption === '')
    return (
      <Image
        src={src}
        layout="responsive"
        alt={alt}
        {...blurProps}
        {...props}
        className="without-caption"
      />
    );

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDir="column"
      sx={{ img: { borderTopRadius: '10px' } }}
      as="span"
    >
      <Image
        src={src}
        alt={alt}
        layout="responsive"
        {...blurProps}
        {...props}
        className="with-caption"
      />
      <Text
        fontWeight="700"
        mb="15px"
        borderBottomRadius="10px"
        bgColor="gray.100"
        py="10px"
        px="20px"
        as="span"
      >
        {caption}
      </Text>
    </Box>
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
const components: MDXRemoteProps['components'] = {
  a: CustomLink,
  h1: (props: HeadingProps) => <_Heading {...props} as="h1" />,
  h2: (props: HeadingProps) => <_Heading {...props} size="lg" as="h2" />,
  h3: (props: HeadingProps) => <_Heading {...props} size="md" as="h3" />,
  li: ListItem,
  ol: OrderedList,
  ul: _UnorderedList,
  p: Text,
  div: _Div,
  callout: Callout,
  Callout,
  CustomImg: CustomImg,
  // todo: probably need to use hydrate() with mdx to bypass img issue
  // https://stackoverflow.com/questions/64007838/mdx-blog-just-displays-markdown-content-instead-of-rendering-it-while-using-mdx
  img: CustomImg,
  code: _Code,
};

interface IMDXRenderProps extends BoxProps {
  mdxSource: MDXRemoteSerializeResult;
}

const MDXRender: React.FC<IMDXRenderProps> = ({ mdxSource, ...props }) => (
  <Box
    {...props}
    className="mdx-render"
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
      'img:not(.with-caption)': { borderRadius: '10px' },
      blockquote: { borderLeft: 'solid 2px black', pl: '10px' },
    }}
  >
    <MDXRemote {...mdxSource} components={components} />
  </Box>
);

export default MDXRender;
