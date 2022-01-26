import { Box, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { SearchState, Configure } from 'react-instantsearch-core';
import {
  InstantSearch,
  InstantSearchProps,
  connectPagination,
} from 'react-instantsearch-dom';
import PostItems from './PostItems';
import Tags from './Tags';

interface IAlgoliaClientProps extends InstantSearchProps {
  searchState: SearchState;
  resultsState?: any;
}

// const Pagination = connectPagination((props) => {
//   console.log(props);
//   return <Box></Box>;
// });

const PostSearchAlt: React.FC<IAlgoliaClientProps> = (props) => {
  const {
    indexName,
    resultsState,
    searchClient,
    widgetsCollector,
    onSearchParameters,
    searchState: _ss,
    ...instantSearchProps
  } = props;
  const [searchState, setSearchState] = useState(props.searchState);
  return (
    <InstantSearch
      indexName={indexName}
      searchClient={searchClient}
      searchState={searchState}
      resultsState={resultsState}
      widgetsCollector={widgetsCollector}
      onSearchParameters={onSearchParameters}
      {...instantSearchProps}
    >
      <Configure hitsPerPage={8} />
      <Tags attribute="compositeTags" />
      <Heading fontFamily="Hammersmith One">RECENT ARTICLES</Heading>
      <PostItems />
      {/* <Pagination /> */}
    </InstantSearch>
  );
};

export default PostSearchAlt;
