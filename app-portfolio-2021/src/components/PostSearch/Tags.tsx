import useSearchQuery from '@/hooks/useSearchQuery';
import { Wrap, WrapItem } from '@chakra-ui/react';
import { PostTagControl } from '@/components/PostTag';
import { AlgoliaTags } from '@/services/AlgoliaService';

const PostSearchTags: React.FC<{ tagsResult: AlgoliaTags }> = ({
  tagsResult,
}) => {
  const { toggleTag, tagCount, resetTag, hasTag } = useSearchQuery();

  return (
    <Wrap
      className="post-search-tags"
      justify="center"
      spacing="4px"
      pt="15px"
      pb="5px"
    >
      {tagsResult.facetHits.map((tag) => (
        <WrapItem key={tag.value}>
          <PostTagControl
            data-is-refined={hasTag(tag.value)}
            active={hasTag(tag.value)}
            onClick={() => toggleTag(tag.value)}
          >
            {tag.value.split('||')[0].toUpperCase()}:{tag.count}
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
};

export default PostSearchTags;
