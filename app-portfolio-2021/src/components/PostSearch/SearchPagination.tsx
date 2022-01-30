import { connectPagination } from 'react-instantsearch-dom';
import useSearchQuery from '@/hooks/useSearchQuery';
import { HStack } from '@chakra-ui/react';
import CustomLink from '@/components/CustomLink';
const SearchPagination = connectPagination(
  ({ currentRefinement, nbPages, refine, createURL }) => {
    const {
      searchQuery: { page },
      getPageUrl,
    } = useSearchQuery();
    return (
      <HStack className="search-pagination" justify="flex-end" spacing={3}>
        <CustomLink href={getPageUrl(page - 1)} disabled={page <= 1}>
          PREV
        </CustomLink>
        {Array.from({ length: nbPages }).map((_, i) => (
          <CustomLink
            href={getPageUrl(i + 1)}
            className={page === i + 1 ? 'active' : ''}
            px="5px"
            _before={{
              content: "''",
              position: 'absolute',
              bgColor: 'pink.100',
              bottom: '0px',
              left: '0px',
              w: '100%',
              h: '5px',
              zIndex: -1,
              transition: '.3s',
            }}
            sx={{ '&.active': { fontWeight: 'bold', color: 'pink.400' } }}
            key={i}
          >
            {i + 1}
          </CustomLink>
        ))}
        <CustomLink href={getPageUrl(page + 1)} disabled={page >= nbPages}>
          NEXT
        </CustomLink>
      </HStack>
    );
  }
);

export default SearchPagination;
