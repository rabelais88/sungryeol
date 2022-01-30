import { connectRefinementList } from 'react-instantsearch-dom';
import useSearchQuery from '@/hooks/useSearchQuery';
import { Wrap, WrapItem } from '@chakra-ui/react';
import { PostTagControl } from '@/components/PostTag';

const TagListMenu = connectRefinementList((arg) => {
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

export default TagListMenu;
