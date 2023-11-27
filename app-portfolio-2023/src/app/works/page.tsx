import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';

import LayoutBase from '@/components/shared/LayoutBase';
import PrettyLink from '@/components/shared/PrettyLink';
import Tag from '@/components/shared/Tag';

// 1. Create a reader
const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  // 2. Read the "Posts" collection
  const works = await reader.collections.works.all();
  const tagsIdMap: Record<string, boolean> = {};
  works.forEach((work) => {
    (work.entry.tags ?? []).forEach((tagId) => {
      tagsIdMap[tagId] = true;
    });
  });
  const tagsId = Object.keys(tagsIdMap);
  return (
    <LayoutBase pageName="works">
      <h1 className="font-head text-3xl">WORKS</h1>
      <ul className="flex flex-col gap-3">
        <div className="flex flex-wrap">
          {tagsId.map((tagId) => (
            <Tag key={tagId}>#{tagId}</Tag>
          ))}
        </div>
        {works.map((work) => (
          <li key={work.slug}>
            <PrettyLink href={`/works/${work.slug}`}>
              {work.entry.title}
            </PrettyLink>
            <p>{work.entry.titleKr}</p>
            <div className="flex flex-wrap">
              {work.entry.tags.map((tagId) => (
                <Tag key={tagId}>#{tagId}</Tag>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </LayoutBase>
  );
}
