import useSearchQuery from '@/hooks/useSearchQuery';
import { connectSearchBox } from 'react-instantsearch-dom';
import { useMemo } from 'react';
import _debounce from 'lodash/debounce';
import { Image, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';

const SearchBox = connectSearchBox(({ refine }) => {
  const { setKeyword } = useSearchQuery();
  const debouncedOnChange = useMemo(
    () => _debounce(setKeyword, 500, { trailing: true }),
    [setKeyword]
  );
  return (
    <InputGroup>
      <InputLeftElement
        children={<Image src="/icons/search-oval.svg" alt="search icon" />}
      />
      <Input
        type="search"
        onChange={(e) => debouncedOnChange(e?.currentTarget?.value)}
        className="post-search--search-box"
        placeholder="Type keywords to search/검색하려는 단어를 입력하세요..."
        sx={{
          '&:focus': {
            boxShadow: '0px 1px 0px 0px black !important',
            borderColor: 'black',
          },
        }}
      />
    </InputGroup>
  );
});

export default SearchBox;
