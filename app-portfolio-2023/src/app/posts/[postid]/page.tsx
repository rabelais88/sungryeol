import { DocumentRenderer } from '@keystatic/core/renderer';

import IconShare from '@/components/icons/IconShare';
import ButtonOutline from '@/components/shared/ButtonOutline';
import Divider from '@/components/shared/Divider';
import LayoutBase from '@/components/shared/LayoutBase';
import Tag from '@/components/shared/Tag';
import keystaticConfig from '@/keystatic.config';
import { formatDate, joinClass } from '@/utils';
import { createReader } from '@keystatic/core/reader';
import CustomImg from '@/components/markdown/CustomImg';
import { Code } from 'bright';
import MarkdownWrap from '@/components/shared/MarkdownWrap';

const reader = createReader(process.cwd(), keystaticConfig);

type PostPageProps = MyPageProps<['postid']>;

const getPost = (postid: string) => reader.collections.posts.read(postid);
const getTag = (tagId: string) => reader.collections.tags.read(tagId);
const getPosts = () => reader.collections.posts.all();

export async function generateMetadata({ params: { postid } }: PostPageProps) {
  const post = await getPost(postid);
  return {
    title: post?.title ?? 'untitled',
  };
}

const TagFromId = async ({ tagId }: { tagId: string }) => {
  const tag = await getTag(tagId);
  if (!tag) return <Tag>#{tagId}</Tag>;
  return <Tag>#{tag?.label}</Tag>;
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ postid: post.slug }));
}

export default async function Post({ params: { postid } }: PostPageProps) {
  const post = await getPost(postid);
  if (!post) return null;
  return (
    <LayoutBase pageName="post" className="items-start">
      <ButtonOutline className="mb-[30px] gap-4">
        <IconShare />
        Share
      </ButtonOutline>
      <div>
        {post.tags.map((tag) => (
          <TagFromId key={tag} tagId={tag} />
        ))}
      </div>
      <p className="font-sans font-light">
        {formatDate(post.publishedAt, 'YYYY.MMM.DD')}
      </p>
      <h1 className="font-head font-bold text-3xl">{post.title}</h1>
      <Divider />
      <MarkdownWrap>
        <DocumentRenderer
          document={await post.content()}
          renderers={{
            block: {
              image: ({ src, alt, title }) => (
                <CustomImg src={src} alt={alt} hostUrl={`/posts/${postid}`} />
              ),
              // @ts-ignore
              code: ({
                children,
                language,
              }: {
                language: string;
                children: React.ReactNode;
              }) => (
                <div className="relative group">
                  {language && (
                    <div className="absolute top-0 right-0 hidden group-hover:block bg-white p-2">
                      {language}
                    </div>
                  )}
                  <Code lang={language}>{children}</Code>
                </div>
              ),
            },
            inline: {
              code: ({ children }: { children: React.ReactNode }) => (
                <code data-inline>{children}</code>
              ),
            },
          }}
        />
      </MarkdownWrap>
    </LayoutBase>
  );
}
