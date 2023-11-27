import PrettyLink from '@/components/shared/PrettyLink';
import { formatDate, joinClass } from '@/utils';
import Link from 'next/link';

interface HeadlineItemProps {
  title: string;
  publishedAt: string;
  href: string;
  //   tags: { label: string; value: string }[];
}
const HeadlineItem = ({
  title,
  publishedAt,
  href, //   tags,
}: HeadlineItemProps) => {
  return (
    <div
      data-comp="headline-item"
      className={joinClass(
        'w-full flex flex-col-reverse items-start md:flex-row md:items-center border-t border-t-black-base md:border-none',
        'dark:border-white'
      )}
    >
      <PrettyLink href={href}>{title}</PrettyLink>
      <div className="hidden md:inline-block flex-1 border-b border-dashed border-b-black-base dark:border-b-white h-[1px] mx-[10px]" />
      <p>{formatDate(publishedAt, 'YYYY.MMM.DD').toUpperCase()}</p>
    </div>
  );
};

export default HeadlineItem;
