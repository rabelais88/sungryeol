import algoliasearch from 'algoliasearch/lite';
import {
  NEXT_PUBLIC_ALGOLIA_APP_ID,
  NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
} from './env';

export const algoliaClient = algoliasearch(
  NEXT_PUBLIC_ALGOLIA_APP_ID ?? '',
  NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ?? ''
);
