import { parse } from 'yaml';
import fs from 'fs/promises';
import path from 'path';
import { Post } from '../../.tina/__generated__/types';
import algoliasearch from 'algoliasearch';
import dotenv from 'dotenv';

dotenv.config();
const {
  NEXT_PUBLIC_ALGOLIA_APP_ID,
  NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
  ALGOLIA_SEARCH_ADMIN_KEY,
} = process.env;

(async () => {
  console.log('searchIndexing!');
  console.log(`algolia app id:${NEXT_PUBLIC_ALGOLIA_APP_ID?.slice(0, 2)}****`);
  console.log(`algolia admin key:${ALGOLIA_SEARCH_ADMIN_KEY?.slice(0, 1)}****`);
  const postsPath = path.resolve('content', 'posts');
  const postFileNames = await fs.readdir(postsPath);
  const postsReadJob = postFileNames.map(async (fileName) => {
    const str = await fs.readFile(path.join(postsPath, fileName), 'utf8');
    const matches = /^-{3}\n([\s\S]+)-{3}\n([\s\S]+)/.exec(str);

    const frontmatterStr = (matches?.[1] ?? '').replace('---\n', '');
    const bodyStr = matches?.[2] ?? '';
    const postId = fileName.replace('.md', '');

    const frontmatter = parse(frontmatterStr) as Post;
    console.log(`reading ${fileName}`);
    return {
      ...frontmatter,
      objectID: postId,
      body: bodyStr,
    };
  });
  const posts = await Promise.all(postsReadJob);

  try {
    const client = algoliasearch(
      NEXT_PUBLIC_ALGOLIA_APP_ID ?? '',
      ALGOLIA_SEARCH_ADMIN_KEY ?? ''
    );
    const index = client.initIndex('post');
    const algoliaReq = await index.saveObjects(posts);
    console.log(`indexed total of ${algoliaReq.objectIDs.length} posts`);
  } catch (err) {
    console.error(err);
  }
})();

export default {};