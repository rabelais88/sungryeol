import { Wrap, WrapItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { connectRefinementList } from 'react-instantsearch-dom';
import { PostTagControl } from '@/components/PostTag';

const Tags = connectRefinementList((arg) => {
  const router = useRouter();
  const { items } = arg;
  return (
    <Wrap className="tags" justify="center">
      {items.map((item) => (
        <WrapItem key={item.label}>
          <PostTagControl
            onClick={() => {
              const q = new URLSearchParams({ tag: item.label });
              router.push(`/posts?${q.toString()}`);
            }}
          >
            {item.label.split('||')[0].toUpperCase()}:{item.count}
          </PostTagControl>
        </WrapItem>
      ))}
    </Wrap>
  );
});

export default Tags;
