import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';

import LayoutBase from '@/components/shared/LayoutBase';
import HeadlineItem from '../HeadlineItem';

// 1. Create a reader
const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  // 2. Read the "Posts" collection
  const posts = await reader.collections.posts.all();
  return (
    <LayoutBase pageName="posts">
      <h1 className="font-head text-3xl">POSTS</h1>
      <ul>
        {posts.map((post) => (
          <HeadlineItem
            key={post.slug}
            title={post.entry.title}
            publishedAt={post.entry.publishedAt ?? ''}
            href={`/posts/${post.slug}`}
          />
        ))}
      </ul>
    </LayoutBase>
  );
}
