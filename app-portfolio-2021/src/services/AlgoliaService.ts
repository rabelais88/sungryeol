// algolia service for server side rendering
// https://www.algolia.com/doc/guides/building-search-ui/going-further/server-side-rendering/react/
import algoliasearch, {
  AlgoliaSearchOptions,
  SearchClient,
} from 'algoliasearch/lite';
import {
  SearchResponse,
  Hit,
  HighlightResult,
  SearchForFacetValuesResponse,
} from '@algolia/client-search';
export type AlgoliaSearchResponse<T> = SearchResponse<T>;
export type AlgoliaHit<T> = Hit<T>;
export type AlgoliaHighlightResult<T> = HighlightResult<T>;
export type AlgoliaTags = SearchForFacetValuesResponse;

class AlgoliaService {
  searchClient: SearchClient;
  constructor(options?: AlgoliaSearchOptions) {
    this.searchClient = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? '',
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY ?? '',
      options
    );
  }

  search<T>(
    index: string,
    keyword?: string,
    _options?: {
      tags?: string[];
      /** starts from 0 */
      page?: number;
      itemsPerPage?: number;
    }
  ) {
    const indexed = this.searchClient.initIndex(index);
    const { tags, page, itemsPerPage } = _options ?? {};
    const facetFilters = (tags ?? []).map((t) => `compositeTags:${t}`);
    return indexed.search<T>(keyword ?? '', {
      hitsPerPage: itemsPerPage ?? 8,
      page: page ?? 0,
      facetFilters,
    });
  }
  searchPostTags(keyword?: string, options?: AlgoliaSearchOptions) {
    return this.searchClient
      .initIndex('post_updated_at')
      .searchForFacetValues('compositeTags', keyword ?? '', options);
  }
}

export default new AlgoliaService();
