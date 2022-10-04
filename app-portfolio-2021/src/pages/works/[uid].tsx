import LayoutDefault from '@/layout/LayoutDefault';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import { promises as fs } from 'fs';
import {
  Box,
  Heading,
  HStack,
  Image,
  ImageProps,
  VStack,
} from '@chakra-ui/react';
import AppLink from '@/components/AppLink';
import CustomLink from '@/components/CustomLink';
import Video from '@/components/Video';

type MarkdownSource = MDXRemoteSerializeResult<Record<string, unknown>>;
interface IWorkMDXFrontMatter {
  title: string;
  captures?: {
    mobile: string[];
    desktop: string[];
    /** video embed url from vimeo */
    video: string[];
  };
  url?: string;
}

interface IProps {
  mdxSource: MarkdownSource;
}

const WorkImage: React.FC<ImageProps> = ({ src, ...props }) => {
  return (
    <Image src={['/images/works', src].join('/')} alt="work image" {...props} />
  );
};

const MockPhone: React.FC<{ image: string }> = ({ image }) => {
  return (
    <Box
      className="mock-phone"
      borderRadius="20px"
      w="100px"
      h="173px"
      display="block"
      overflowY="hidden"
      position="relative"
      border="solid 4px #000"
      boxShadow="0 0 13px rgba(0,0,0,.3)"
      sx={{
        '&::after': {
          // notch
          display: 'block',
          position: 'absolute',
          top: 0,
          left: '50%',
          bgColor: '#000',
          content: '""',
          w: '35px',
          h: '13px',
          transform: 'translateX(-50%)',
          borderBottomRadius: '10px',
        },
      }}
    >
      <WorkImage src={image} />
    </Box>
  );
};

const MockWindow: React.FC<{ image: string }> = ({ image }) => {
  return (
    <Box
      className="mock-window"
      w="400px"
      boxShadow="0 0 13px rgba(0,0,0,.3)"
      borderRadius="15px"
    >
      <Box
        className="mock-win-title"
        display="block"
        w="100%"
        h="24px"
        sx={{
          '&::before': {
            display: 'block',
            position: 'absolute',
            content: '""',
            bgColor: 'yellow.100',
            borderRadius: '100%',
            border: 'solid 1px #000',
            w: '10px',
            h: '10px',
            t: '50%',
            transform: 'translate(10px,50%)',
          },
        }}
        borderTopRadius="15px"
        border="solid 2px #000"
        position="relative"
      ></Box>
      <Box
        className="mock-win-body"
        borderBottomRadius="15px"
        border="solid 2px #000"
        borderTop="none"
        h="200px"
        position="relative"
        overflowY="hidden"
      >
        <WorkImage src={image} />
      </Box>
    </Box>
  );
};

const Work: NextPage<IProps> = ({ mdxSource }) => {
  const { frontmatter } = mdxSource;
  const fm = frontmatter as unknown as IWorkMDXFrontMatter | undefined;
  const mobileCaptures = fm?.captures?.mobile ?? [];
  const desktopCaptures = fm?.captures?.desktop ?? [];
  const videoCaptures = fm?.captures?.video ?? [];
  const url = fm?.url ?? '';
  return (
    <LayoutDefault data-page="works-uid">
      <HStack>
        <AppLink
          href="/works"
          variant="link"
          sx={{ textDecor: 'underline', fontWeight: 'bold', p: '16px', pl: 0 }}
        >
          Works
        </AppLink>
      </HStack>
      <Heading fontFamily="Title">{fm?.title ?? ''}</Heading>
      {url !== '' && <CustomLink href={url}>Visit Page</CustomLink>}
      <Box height="50px" />
      <MDXRemote
        {...mdxSource}
        components={{
          ul: ({ children }) => (
            <Box as="ul" marginInlineStart="5">
              {children}
            </Box>
          ),
        }}
      />
      <Box height="50px" />
      <VStack gap="30px">
        {mobileCaptures.length >= 1 &&
          mobileCaptures.map((capture, i) => (
            <MockPhone image={capture} key={i} />
          ))}
        {desktopCaptures.length >= 1 &&
          desktopCaptures.map((capture, i) => (
            <MockWindow image={capture} key={i} />
          ))}
        {videoCaptures.length >= 1 &&
          videoCaptures.map((videoUrl, i) => <Video url={videoUrl} key={i} />)}
      </VStack>
    </LayoutDefault>
  );
};
export default Work;

export const getStaticPaths: GetStaticPaths = async (context) => {
  const worksMdxDir = path.join(process.cwd(), 'mdx', 'works');
  const filenames = await fs.readdir(worksMdxDir);
  const reTitle = /^(.+)\.mdx$/i;
  const paths = filenames.map((filename) => ({
    params: { uid: reTitle.exec(filename)?.[1] ?? '' },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  // https://nextjs.org/docs/api-reference/data-fetching/get-static-props
  const uid = `${context?.params?.uid}`;
  const filename = path.join(process.cwd(), 'mdx', 'works', `${uid}.mdx`);
  const content = await fs.readFile(filename, 'utf8');

  const mdxSource = await serialize(content, { parseFrontmatter: true });
  return { props: { mdxSource } };
};
