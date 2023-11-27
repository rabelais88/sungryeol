// import Image from 'next/image';
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';

import IconLogoGeometry from '@/components/icons/IconLogoGeometry';
import PrettyLink from '@/components/shared/PrettyLink';
import HeadlineItem from './HeadlineItem';
import LayoutBase from '@/components/shared/LayoutBase';
import { getDiff } from '@/utils';

const reader = createReader(process.cwd(), keystaticConfig);
const getPosts = () => reader.collections.posts.all();

export default async function Home() {
  const _posts = await getPosts();
  const posts = _posts.sort((pa, pb) =>
    getDiff(pb.entry.publishedAt, pa.entry.publishedAt)
  );
  return (
    <LayoutBase pageName="main" className="items-center">
      <p className="text-xl">박성렬 블로그 & 포트폴리오</p>
      <IconLogoGeometry />
      <PrettyLink href="/search" className="mb-[20px]">
        SEARCH
      </PrettyLink>
      <PrettyLink href="/works" className="mb-[20px]">
        WORKS
      </PrettyLink>
      <PrettyLink href="/contact" className="mb-[40px]">
        CONTACT
      </PrettyLink>
      <h1 className="text-center mb-[30px] font-head text-2xl">
        RECENT ARTICLES
      </h1>
      <div className="flex flex-col gap-6 w-full">
        {posts.map((post) => (
          <HeadlineItem
            key={post.slug}
            title={post.entry?.title ?? 'no title'}
            href={`/posts/${post.slug}`}
            publishedAt={post.entry?.publishedAt ?? ''}
            // tags={post?.entry?.tags}
          />
        ))}
      </div>
    </LayoutBase>
  );
}
