// https://www.contentful.com/blog/2021/07/02/add-algolia-instantsearch-to-nextjs-app/
import {
  InstantSearch,
  InstantSearchProps,
  connectPagination,
  connectRefinementList,
  Configure,
} from 'react-instantsearch-dom';
import { HStack, Wrap, WrapItem } from '@chakra-ui/react';
import { PostTagControl } from '@/components/PostTag';
import { Hit, SearchState } from 'react-instantsearch-core';
import AlgoliaService from '@/services/AlgoliaService';
import { SearchClient } from 'algoliasearch/lite';
import _debounce from 'lodash/debounce';
import useSearchQuery from '@/hooks/useSearchQuery';
import CustomLink from '@/components/CustomLink';

export const SearchPagination = connectPagination(
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

interface IPostSearch
  extends Omit<
    InstantSearchProps,
    'indexName' | 'stalledSearchDelay' | 'searchClient'
  > {
  searchClient?: SearchClient;
}

export const TagListMenu = connectRefinementList((arg) => {
  const { items } = arg;
  const { toggleTag, tagCount, resetTag } = useSearchQuery();
  return (
    <Wrap className="tag-list-menu" justify="center" spacing="4px">
      {items.map((item) => (
        <WrapItem key={item.label}>
          <PostTagControl
            data-is-refined={item.isRefined}
            active={item.isRefined}
            onClick={() => toggleTag(item.label)}
          >
            {item.label.split('||')[0].toUpperCase()}:{item.count}
          </PostTagControl>
        </WrapItem>
      ))}
      {tagCount >= 1 && (
        <WrapItem key="close-button">
          <PostTagControl onClick={resetTag}>X</PostTagControl>
        </WrapItem>
      )}
    </Wrap>
  );
});

// component for seraching posts with Algolia
const PostSearch: React.FC<IPostSearch> = ({
  searchClient,
  children,
  ...props
}) => {
  const {
    searchQuery: { page, query, compositeTags },
  } = useSearchQuery();
  const searchState: SearchState = {
    page,
    query,
  };
  if (compositeTags.length >= 1) searchState.refinementList = { compositeTags };

  return (
    <InstantSearch
      {...props}
      searchClient={searchClient ?? new AlgoliaService().searchClient}
      indexName="post_updated_at"
      stalledSearchDelay={500}
      searchState={searchState}
    >
      <Configure hitsPerPage={8} />
      {children}
    </InstantSearch>
  );
};

export default PostSearch;
