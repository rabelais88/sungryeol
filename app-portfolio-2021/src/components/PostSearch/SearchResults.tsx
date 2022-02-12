import { IPostHit } from '@/types';
import { Highlight, connectHits, Snippet, Hit } from 'react-instantsearch-dom';
import {
  Box,
  ListItem,
  Text,
  Link,
  HStack,
  UnorderedList,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import PostTag from '@/components/PostTag';
import { shortInternationalTime } from '@sungryeol/lib';

const HitItem: React.FC<{ hit: Hit<IPostHit> }> = ({ hit }) => {
  return (
    <ListItem
      key={hit.uid}
      sx={{ em: { bgColor: 'bg-yellow', fontStyle: 'normal' } }}
      inset="0"
      pt="9px"
      pb="27px"
      className="search-result-item"
    >
      <Box
        size="sm"
        fontWeight="400"
        mb={{ base: '3px', lg: '10px' }}
        fontSize="15px"
        lineHeight="18px"
        className="title-area"
      >
        <Text
          w="90px"
          mr="10px"
          as="span"
          display={{ base: 'block', lg: 'inline-block' }}
          mb={{ base: '15px', lg: '0' }}
          className="title-date"
        >
          {shortInternationalTime(new Date(hit.updatedAt))}
        </Text>
        <NextLink href={`/posts/${hit.uid}`} passHref>
          <Link display="inline-block" fontSize="15px" fontWeight="800">
            <Highlight hit={hit} attribute="title" tagName="em" />
          </Link>
        </NextLink>
      </Box>
      <Text
        fontWeight="200"
        mb="19px"
        fontSize="15px"
        ml={{ base: '0px', lg: '100px' }}
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        {/* <Highlight hit={hit} attribute="content" tagName="em" /> */}
        {/* use snippet instead of highlight so that it can strip unused part of text */}
        <Snippet hit={hit} attribute="content" tagName="em" />
      </Text>
      <HStack spacing="9px" ml={{ base: '0px', lg: '100px' }}>
        {hit.tags.map((t, i) => (
          <PostTag key={[t.key, i].join('-')}>
            {(t.label ?? '').toUpperCase()}
          </PostTag>
        ))}
      </HStack>
    </ListItem>
  );
};

// same as react-instasearch-dom/Hits component
const SearchResults = connectHits<Hit<IPostHit>>(({ hits }) => {
  if (hits.length === 0) {
    return (
      <Text textAlign="center" mt="50px">
        no search result
      </Text>
    );
  }
  return (
    <UnorderedList
      styleType="none"
      className="search-results"
      marginInlineStart="none"
      sx={{
        '.search-result-item + .search-result-item': {
          borderTop: 'solid 1px black',
        },
      }}
    >
      {hits.map((hit) => (
        <HitItem hit={hit} key={hit.objectID} />
      ))}
    </UnorderedList>
  );
});

export default SearchResults;
