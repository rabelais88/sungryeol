import { DocumentRenderer } from '@keystatic/core/renderer';

import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';
import LayoutBase from '@/components/shared/LayoutBase';
import MarkdownWrap from '@/components/shared/MarkdownWrap';
import Video from './Video';
import IconExternal from '@/components/icons/IconExternal';

const reader = createReader(process.cwd(), keystaticConfig);

type WorkPageProps = MyPageProps<['workid']>;

const getWork = (workid: string) => reader.collections.works.read(workid);
const getWorks = () => reader.collections.works.all();

export async function generateMetadata({ params: { workid } }: WorkPageProps) {
  const work = await getWork(workid);
  return {
    title: work?.title ?? 'untitled',
  };
}

export async function generateStaticParams() {
  const works = await getWorks();
  return works.map((work) => ({ workid: work.slug }));
}

export default async function WorkPage({ params: { workid } }: WorkPageProps) {
  const work = await getWork(workid);
  if (!work) return null;
  return (
    <LayoutBase pageName="work">
      <h1 className="font-head text-3xl mb-5">
        {work.title}
        <br />
        {work.titleKr}
      </h1>
      <div className="flex items-center mb-7">
        <span className="mr-3">LINKS</span>
        {work.urls.map((url, i) => (
          <a href={url} key={i} className="flex font-thin">
            <IconExternal className="w-6 h-6" />
            {(i + 1).toString()}
          </a>
        ))}
      </div>
      <MarkdownWrap>
        <DocumentRenderer document={await work.content()} />
      </MarkdownWrap>
      {work.videos.map((v, i) => (
        <Video url={v} key={i} />
      ))}
    </LayoutBase>
  );
}
