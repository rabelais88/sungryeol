import PrettyLink from '@/components/shared/PrettyLink';
import { joinClass } from '@/utils';
import { useAlgoliaSearch, useAlgoliaSearchControl } from '@/utils/algolia';

interface PaginationProps extends PropsWithClass {
  searchResults: ReturnType<typeof useAlgoliaSearch>['searchResult'];
}
const Pagination = ({ searchResults, className }: PaginationProps) => {
  const pages = Array.from({ length: searchResults?.nbPages ?? 0 }).map(
    (_, i) => i
  );
  const { page, getPageUrl } = useAlgoliaSearchControl();
  return (
    <div className={joinClass('flex flex-wrap gap-2', className)}>
      {pages.map((i) => (
        <PrettyLink
          className="text-center w-[72px]"
          href={getPageUrl(i)}
          disabled={i === page}
          key={i}
        >
          {(i + 1).toString()}
        </PrettyLink>
      ))}
    </div>
  );
};

export default Pagination;
