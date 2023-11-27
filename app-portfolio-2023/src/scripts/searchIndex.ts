import algoliasearch from 'algoliasearch';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { parse } from 'yaml';
import { omit } from 'radash';
import { splitEveryN } from '../utils';
interface SearchablePost {
  title: string;
  visible: boolean;
  publishedAt: string;
  tags: string[];
  body: string;
}
interface SearchableWork {
  title: string;
  visible: boolean;
  publishedAt: string;
  publishedAtType: 'no-disclosure' | 'year-month' | 'year';
  urls: string[];
  body: string;
}
interface SearchableContact {
  body: string;
}

dotenv.config();
const {
  NEXT_PUBLIC_ALGOLIA_APP_ID,
  //   NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
  ALGOLIA_SEARCH_ADMIN_KEY,
} = process.env;

(async () => {
  console.log('searchIndexing!');
  console.log(`algolia app id:${NEXT_PUBLIC_ALGOLIA_APP_ID?.slice(0, 2)}****`);
  console.log(`algolia admin key:${ALGOLIA_SEARCH_ADMIN_KEY?.slice(0, 1)}****`);
  const postsPath = path.resolve('src', 'content', 'posts');
  const postFileNames = await fs.readdir(postsPath);
  const postsReadJob = postFileNames.map(async (fileName) => {
    const str = await fs.readFile(path.join(postsPath, fileName), 'utf8');
    const matches = /^-{3}\n([\s\S]+)-{3}\n([\s\S]+)/.exec(str);

    const frontmatterStr = (matches?.[1] ?? '').replace('---\n', '');
    const bodyStr = matches?.[2] ?? '';
    const postId = fileName.replace('.mdoc', '');

    const frontmatter = parse(frontmatterStr) as SearchablePost;
    const datePublishTimestamp =
      new Date(frontmatter?.publishedAt).getTime() / 1000;
    console.log(`reading post - ${fileName}`);
    return {
      ...frontmatter,
      // https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/sort-an-index-by-date/#configuring-virtual-replicas
      // algolia requires timestamp to sort the data by date
      datePublishTimestamp,
      type: 'post',
      slug: postId,
      objectID: postId,
      body: bodyStr,
    };
  });
  const posts = await Promise.all(postsReadJob);

  const worksPath = path.resolve('src', 'content', 'works');
  const workFileNames = await fs.readdir(worksPath);
  const worksReadJob = workFileNames.map(async (fileName) => {
    const str = await fs.readFile(path.join(worksPath, fileName), 'utf8');
    const matches = /^-{3}\n([\s\S]+)-{3}\n([\s\S]+)/.exec(str);

    const frontmatterStr = (matches?.[1] ?? '').replace('---\n', '');
    const bodyStr = matches?.[2] ?? '';
    const workId = fileName.replace('.mdoc', '');

    const frontmatter = parse(frontmatterStr) as SearchableWork;
    const datePublishTimestamp =
      new Date(frontmatter?.publishedAt).getTime() / 1000;
    console.log(`reading work - ${fileName}`);
    return {
      ...omit(frontmatter, ['urls']),
      datePublishTimestamp,
      tags: [],
      type: 'work',
      slug: workId,
      objectID: workId,
      body: bodyStr,
    };
  });

  type PostWork = { body: string; objectID: string; bodyIndex: number } & (
    | SearchablePost
    | SearchableWork
    | SearchableContact
  );
  const works = await Promise.all(worksReadJob);

  const readContact = async () => {
    const contentPath = path.resolve('src', 'content');
    const str = await fs.readFile(
      path.join(contentPath, 'contact.mdoc'),
      'utf8'
    );
    const matches = /^-{3}\n([\s\S]+)-{3}\n([\s\S]+)/.exec(str);

    // const frontmatterStr = (matches?.[1] ?? '').replace('---\n', '');
    const bodyStr = matches?.[2] ?? '';

    // const frontmatter = parse(frontmatterStr);
    return {
      body: bodyStr,
      objectID: 'contact',
      slug: 'contact',
      tags: [
        'github',
        'linkedin',
        'codepen',
        'instagram',
        'observablehq',
        'stackoverflow',
        'resume',
      ],
      type: 'contact',
    };
  };
  const contact = await readContact();

  const postWorks: PostWork[] = [];
  [...posts, ...works, contact].forEach((postWork) => {
    const paragraphs = splitEveryN(postWork.body, 800);
    paragraphs?.forEach((paragraph, i) => {
      postWorks.push({
        ...postWork,
        body: paragraph,
        objectID: `${postWork.slug}-${i}`,
        bodyIndex: i,
      });
    });
  });

  try {
    const client = algoliasearch(
      NEXT_PUBLIC_ALGOLIA_APP_ID ?? '',
      ALGOLIA_SEARCH_ADMIN_KEY ?? ''
    );
    const index = client.initIndex('posts-works');
    await index.clearObjects();
    console.log('indices reset!');
    const algoliaReq = await index.saveObjects(postWorks);
    console.log(`indexed total of ${algoliaReq.objectIDs.length} posts`);
  } catch (err) {
    console.error(err);
    // tell CI-CD of its failure
    process.exit(1);
  }
})();

export default {};
