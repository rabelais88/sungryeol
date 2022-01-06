// algolia service for server side rendering
// https://www.algolia.com/doc/guides/building-search-ui/going-further/server-side-rendering/react/
import algoliasearch, { SearchClient } from 'algoliasearch/lite';
import React from 'react';
import { findResultsState } from 'react-instantsearch-dom/server';

class AlgoliaService {
  searchClient: SearchClient;
  constructor() {
    this.searchClient = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? '',
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY ?? ''
    );
  }
  getInitialState(indexName: string, App: React.FC | any) {
    return findResultsState(App, {
      searchClient: this.searchClient,
      indexName,
    });
  }
}

export default AlgoliaService;
