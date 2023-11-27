import LayoutBase from '@/components/shared/LayoutBase';
import Algolia from './Algolia';
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);
export default async function Page() {
  const tags = await reader.collections.tags.all();
  return (
    <LayoutBase pageName="search">
      <Algolia
        tags={tags.map((t) => ({ value: t.slug, label: t.entry.label }))}
      />
    </LayoutBase>
  );
}
