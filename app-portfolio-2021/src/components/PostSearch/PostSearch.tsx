// https://www.contentful.com/blog/2021/07/02/add-algolia-instantsearch-to-nextjs-app/
import {
  InstantSearch,
  InstantSearchProps,
  Configure,
} from 'react-instantsearch-dom';
import { SearchState } from 'react-instantsearch-core';
import AlgoliaService from '@/services/AlgoliaService';
import { SearchClient } from 'algoliasearch/lite';
import _debounce from 'lodash/debounce';
import useSearchQuery from '@/hooks/useSearchQuery';

interface IPostSearch
  extends Omit<
    InstantSearchProps,
    'indexName' | 'stalledSearchDelay' | 'searchClient'
  > {
  searchClient?: SearchClient;
}

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
